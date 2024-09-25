const express = require("express");
const { connectToDB } = require("./config/db");
const config = require("./config/config.json");
const userRoutes = require("./routes/user.routes");
const bmrFormRoutes = require("./routes/bmr_form.routes");
const bmrRecords = require("./routes/bmr_records.routes");
const PrintControlRoutes = require("./routes/print_control.routes");
const messageRoutes = require("./routes/messages.routes");
const http = require("http");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const socketManager = require("./socket");
const Message = require("./models/messages.model");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*", // Ensure this matches the client's origin in production
    credentials: true,
  })
);
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "documents")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/user", userRoutes);
app.use("/bmr-form", bmrFormRoutes);
app.use("/bmr-record", bmrRecords);
app.use("/print-control", PrintControlRoutes);
app.use("/message", messageRoutes);

const io = socketManager.init(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("register", (userId) => {
    socket.join(userId.toString()); // Each user joins a room named after their userId
  });

  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Message.create({
        senderId: data.sender,
        receiverId: data.receiver,
        message: data.message,
      });
      socket.to(data.receiver.toString()).emit("receiveMessage", {
        sender: data.sender,
        message: data.message,
        messageId: newMessage.id,
        time: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error sending/receiving message:", error);
    }
  });

  socket.on("getMessages", async (data) => {
    try {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: data.userId, receiverId: data.otherUserId },
            { senderId: data.otherUserId, receiverId: data.userId },
          ],
        },
      });
      socket.emit("loadMessages", messages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(config.development.PORT, "0.0.0.0", async () => {
  connectToDB()
    .then(() => {
      console.log("Server is running at port: " + config.development.PORT);
    })
    .catch((e) => {
      console.log("Error in database connection", e);
    });
});
