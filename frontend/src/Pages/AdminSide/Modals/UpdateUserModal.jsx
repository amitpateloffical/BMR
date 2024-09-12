import React, { useState, useEffect } from "react";
import Select from "react-select";
import AtmInput from "../../../AtmComponents/AtmInput";
import AtmButton from "../../../AtmComponents/AtmButton";
import { useDispatch } from "react-redux";
import { addUser } from "../../../userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
    rolesArray: [],
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://192.168.1.21:7000/user/get-all-roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const roleOptions = response.data.response.map((role) => ({
          value: role.role_id,
          label: role.role,
        }));
        setRoles(roleOptions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    if (!formData.profile_pic)
      newErrors.profile_pic = "Profile picture is required";
    if (formData.rolesArray.length === 0)
      newErrors.rolesArray = "At least one role must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      rolesArray: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profile_pic", formData.profile_pic);
    formData.rolesArray.forEach((role) => {
      formDataToSend.append("rolesArray", role);
    });

    axios
      .post("http://192.168.1.21:7000/user/add-user", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("User added successfully!");
        dispatch(addUser(response.data.user));
        setFormData({
          name: "",
          email: "",
          password: "",
          profile_pic: null,
          rolesArray: [],
        });
        setErrors({});
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 500);
      })
      .catch((error) => {
        console.error(error);
        toast.error("User Already Registered");
      });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_pic: e.target.files[0] });
  };

  return (
    <div>
      <div id="main-form-container">
        <div
          id="config-form-document-page"
          className="shadow-sm md:shadow-md lg:shadow-lg xl:shadow-xl 2xl:shadow-2xl inset-shadow-1 p-6"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold text-blue-600">
              Duplicate User
            </h2>
            <div className="group-input" style={{ margin: "15px" }}>
              <AtmInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                labelClassName="text-blue-500"
                error={errors.name}
              />
            </div>
            <div className="group-input" style={{ margin: "15px" }}>
              <AtmInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                labelClassName="text-blue-500"
                error={errors.email}
              />
            </div>
            <div className="group-input" style={{ margin: "15px" }}>
              <AtmInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                labelClassName="text-blue-500"
                error={errors.password}
              />
            </div>
            <div className="group-input" style={{ margin: "15px" }}>
              <AtmInput
                label="Profile Pic"
                type="file"
                name="profile_pic"
                id="profile_pic"
                onChange={handleFileChange}
                labelClassName="text-blue-500"
                error={errors.profile_pic}
              />
            </div>
            <div className="group-input" style={{ margin: "15px" }}>
              <label htmlFor="roles" className="text-blue-500">
                Roles
              </label>
              <Select
                name="roles"
                options={roles}
                value={roles.filter((option) =>
                  formData.rolesArray.includes(option.value)
                )}
                isMulti
                onChange={handleSelectChange}
              />
              {errors.rolesArray && (
                <p className="text-red-500 text-sm">{errors.rolesArray}</p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <AtmButton label="Add User" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
