/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/system";
import Logo from "../assets/123.png"; // Replace with your logo file

const CustomBox = styled(Box)({
  width: 240,
  height: "100vh",
  backgroundColor: "#222",
  color: "#fff",
  paddingTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "fixed",
});

const CustomListItemIcon = styled(ListItemIcon)({
  color: "#fff",
});

const CustomListItemText = styled(ListItemText)({
  color: "#fff",
});

const CustomListItem = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const CustomLogo = styled("img")({
  width: "50%",
  padding: "10px",
  marginBottom: "20px",
});

const Sidebar = () => {
  return (
    <CustomBox>
      <CustomLogo src={Logo} alt="Logo" />
      <List>
        <CustomListItem button component={Link} to="/dashboard">
          <CustomListItemIcon>
            <DashboardIcon />
          </CustomListItemIcon>
          <CustomListItemText primary="Dashboard" />
        </CustomListItem>
        <CustomListItem button component={Link} to="/customer">
          <CustomListItemIcon>
            <PersonIcon />
          </CustomListItemIcon>
          <CustomListItemText primary="Customer" />
        </CustomListItem>
        {/* Add other sidebar items here */}
        <CustomListItem
          button
          component={Link}
          to="/logout"
          sx={{ mt: "auto" }}
        >
          <CustomListItemIcon>
            <LogoutIcon />
          </CustomListItemIcon>
          <CustomListItemText primary="Logout" />
        </CustomListItem>
      </List>
      <Divider />
    </CustomBox>
  );
};

export default Sidebar;
