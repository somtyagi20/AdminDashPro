/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  w;

  useEffect(() => {
    // Fetch customer data from the backend API
    axios
      .get("http://localhost:3000/api/v1/customers")
      .then((response) => {
        setCustomers(response.data);
        setFilteredCustomers(response.data);
        // Extract unique cities from customer data
        const uniqueCities = Array.from(
          new Set(response.data.map((customer) => customer.city))
        );
        setCities(uniqueCities);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    if (city === "") {
      // If no city is selected, display all customers
      setFilteredCustomers(customers);
    } else {
      // Filter customers based on selected city
      const filteredData = customers.filter((customer) => {
        return customer.city === city;
      });
      setFilteredCustomers(filteredData);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box mb={2}>
        <Tabs value={tabIndex} onChange={handleChangeTab}>
          <Tab label="All Customers" />
          <Tab label="Order History" />
        </Tabs>
      </Box>
      {tabIndex === 0 && (
        <>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <Button onClick={() => handleCityFilter("")}>All</Button>
            {cities.map((city) => (
              <Button key={city} onClick={() => handleCityFilter(city)}>
                {city}
              </Button>
            ))}
          </Box>
          <Box>
            {filteredCustomers.map((customer) => (
              <div key={customer.id}>
                <Typography variant="h6">{customer.name}</Typography>
                <Typography>Email: {customer.email}</Typography>
                <Typography>Phone: {customer.phone}</Typography>
                <Typography>City: {customer.city}</Typography>
                <Divider />
              </div>
            ))}
          </Box>
        </>
      )}
      {tabIndex === 1 && (
        <Box>
          <Typography variant="h6">Order History</Typography>
          {/* Add order history component here */}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
