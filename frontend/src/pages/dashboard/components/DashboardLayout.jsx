import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  LogOut,
  Menu as MenuIcon,
  User,
  Settings,
} from "lucide-react";
import logo from "../../../assets/dali-data-logo.png";

const PRIMARY_COLOR = "#61C5C3";
const TOKEN_KEY = "dali-token";
const USER_KEY = "dali-user";

export default function DashboardLayout({ title, children }) {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadAuthUser();
  }, []);

  const loadAuthUser = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);

    if (token && user) {
      try {
        setAuthUser(JSON.parse(user));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  };

  const handleUserMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setUserMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("auth:updated"));
    navigate("/login");
  };

  const getInitials = () => {
    if (!authUser?.name) return "U";
    return authUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Box sx={{ backgroundColor: "#f6f7fb", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="Dali Data" style={{ height: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#333",
                display: { xs: "none", sm: "block" },
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" }, color: "#333" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon size={24} />
          </IconButton>

          {/* User Menu */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleUserMenuClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#333",
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: PRIMARY_COLOR,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {getInitials()}
              </Avatar>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#333",
                  display: { xs: "none", md: "block" },
                }}
              >
                {authUser?.name || "User"}
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu Dropdown */}
      <Menu
        anchorEl={userMenu}
        open={Boolean(userMenu)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={() => handleNavigate("/profile")}>
          <User size={18} style={{ marginRight: 8 }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <Settings size={18} style={{ marginRight: 8 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogOut size={18} style={{ marginRight: 8 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: "100%", p: 2 }}>
          <ListItem
            button
            onClick={() => {
              handleNavigate("/profile");
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <User size={20} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <Settings size={20} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}
