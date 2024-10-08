import React, { useState } from "react";
import { Modal, Box, Typography, TextField } from "@mui/material";
import AtmButton from "../../../AtmComponents/AtmButton";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config.json";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ResetPasswordModal = ({ user, onClose, id, setAllUsers }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    // Client-side validation
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setError(""); // Clear previous errors

    const data = {
      user_id: user.user_id,
      current_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    };

    axios
      .post(`${BASE_URL}/user/reset-password`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      })
      .then((response) => {
        onClose();
        setTimeout(() => {
          toast.success("Password Changed Successfully");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Password Change Failed");
        console.error(error);
      });
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Reset Password
        </Typography>
        <form onSubmit={handleReset}>
          <TextField
            label="Current Password"
            name="current_password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            name="new_password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            type="password"
            name="confirm_new_password"
            label="Confirm New Password"
            fullWidth
            margin="normal"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" margin="normal">
              {error}
            </Typography>
          )}
          <div className="flex pt-5 gap-3 h-16">
            <AtmButton
              onClick={onClose}
              label="Cancel"
              type="button"
              className="bg-red-500 hover:bg-red-600 h-fit w-full"
            />
            <AtmButton
              label="Reset"
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 h-fit w-full"
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModal;
