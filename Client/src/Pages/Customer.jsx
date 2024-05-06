/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const CreateCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a POST request to the backend API with form data
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/createCustomer",
        formData
      );
      console.log(response.data); // Log response data to the console
      alert("Customer created successfully!"); // Show success message
      // Optionally, you can clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
      });
    } catch (error) {
      console.error("Error creating customer:", error); // Log error to the console
      alert("Failed to create customer: " + error.message); // Show error message
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        padding: 2,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create Customer
      </Typography>
      {/* Text fields for user input */}
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
      />
      {/* Button to submit the form */}
      <Box mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCustomerForm;
