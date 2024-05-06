import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import CreateCustomerForm from "./Customer"; // Import the create customer form

const User = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <CustomerInformation />;
      case 1:
        return <PurchaseOrders />;
      case 2:
        return <ShippingDetails />;
      case 3:
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar onChangeTab={handleChangeTab} />
      <Box flexGrow={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Tabs value={tabIndex} onChange={handleChangeTab}>
          <Tab label="Customer Information" />
          <Tab label="Purchase Orders" />
          <Tab label="Shipping Details" />
          <Tab label="Order History" />
        </Tabs>
        {renderTabContent()}
        {/* Display the CreateCustomerForm when the "Customer Information" tab is selected */}
        {tabIndex === 0 && <CreateCustomerForm />}
      </Box>
    </div>
  );
};

const CustomerInformation = () => {
  // Logic to display customer information
  return (
    <Box>
      <Typography variant="h6">Customer Information</Typography>
      {/* Your customer information UI here */}
    </Box>
  );
};

const PurchaseOrders = () => {
  // Logic to display purchase orders
  return (
    <Box>
      <Typography variant="h6">Purchase Orders</Typography>
      {/* Your purchase orders UI here */}
    </Box>
  );
};

const ShippingDetails = () => {
  // Logic to display shipping details
  return (
    <Box>
      <Typography variant="h6">Shipping Details</Typography>
      {/* Your shipping details UI here */}
    </Box>
  );
};

const OrderHistory = () => {
  // Logic to display order history
  return (
    <Box>
      <Typography variant="h6">Order History</Typography>
      {/* Your order history UI here */}
    </Box>
  );
};

export default User;
