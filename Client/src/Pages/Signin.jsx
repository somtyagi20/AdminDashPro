/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import "./Signin.css";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/login",
        { email, password }
      );
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <LoginIcon sx={{ fontSize: 40 }} />
      <h2 className="signin-title">Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <TextField
            className="email-input"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-field">
          <TextField
            className="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button
          className="signin-button"
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#000000",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Signin;
