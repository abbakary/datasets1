import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Settings,
  LogOut,
  Edit2,
  MessageSquare,
  HelpCircle,
  TrendingUp,
  BookOpen,
  BarChart3,
  Menu as MenuIcon,
} from "lucide-react";
import PageLayout from "../public/components/PageLayout";

const PRIMARY_COLOR = "#61C5C3";
const TOKEN_KEY = "dali-token";
const USER_KEY = "dali-user";

export default function UserProfile() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [settingsMenu, setSettingsMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editPhoneOpen, setEditPhoneOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");

  useEffect(() => {
    loadAuthUser();
  }, []);

  const loadAuthUser = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);

    if (token && user) {
      try {
        setAuthUser(JSON.parse(user));
        setPhoneInput(JSON.parse(user).phone || "");
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  };

  const handleSettingsClick = (event) => {
    setSettingsMenu(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsMenu(null);
  };

  const handleEditPhoneOpen = () => {
    setEditPhoneOpen(true);
    handleSettingsClose();
  };

  const handleEditPhoneClose = () => {
    setEditPhoneOpen(false);
  };

  const handleSavePhone = () => {
    if (authUser) {
      const updatedUser = { ...authUser, phone: phoneInput };
      setAuthUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      handleEditPhoneClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("auth:updated"));
    navigate("/login");
  };

  const menuItems = [
    { label: "Make Money", icon: TrendingUp, id: "make-money" },
    { label: "My Datasets", icon: BookOpen, id: "my-datasets" },
    { label: "Saved Collections", icon: BarChart3, id: "saved-collections" },
    { label: "Feedback", icon: MessageSquare, id: "feedback" },
    { label: "Help & FAQ", icon: HelpCircle, id: "faq" },
  ];

  const getInitials = () => {
    if (!authUser?.name) return "U";
    return authUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const ProfileSidebar = () => (
    <Box
      sx={{
        width: 250,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Settings button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="small"
          onClick={handleSettingsClick}
          sx={{ color: PRIMARY_COLOR }}
        >
          <Settings size={20} />
        </IconButton>
      </Box>

      {/* User Avatar Section */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <Avatar
          sx={{
            width: 90,
            height: 90,
            backgroundColor: PRIMARY_COLOR,
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {getInitials()}
        </Avatar>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, textAlign: "center", mt: 1 }}
        >
          {authUser?.name || "User"}
        </Typography>
        <Button
          size="small"
          startIcon={<Edit2 size={16} />}
          onClick={handleEditPhoneOpen}
          sx={{
            textTransform: "none",
            fontSize: "0.75rem",
            color: PRIMARY_COLOR,
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          {authUser?.phone ? "Edit Phone" : "Add Phone Number"}
        </Button>
        {authUser?.phone && (
          <Typography variant="body2" sx={{ color: "gray" }}>
            {authUser.phone}
          </Typography>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            onClick={() => {
              // Handle navigation based on id
              setDrawerOpen(false);
            }}
            sx={{
              p: 1.5,
              borderRadius: 1,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#e8f5f5",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: PRIMARY_COLOR }}>
              <item.icon size={20} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      {/* Logout Button */}
      <Button
        fullWidth
        startIcon={<LogOut size={18} />}
        onClick={handleLogout}
        sx={{
          mt: "auto",
          backgroundColor: "#f0f0f0",
          color: "#333",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );

  const MainContent = () => (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Welcome, {authUser?.name || "User"}!
      </Typography>
      <Typography variant="body1" sx={{ color: "gray", mb: 3 }}>
        Select an option from the menu to get started.
      </Typography>
      {/* Placeholder for dashboard content */}
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          textAlign: "center",
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1" sx={{ color: "gray" }}>
          Select a menu item to view more information
        </Typography>
      </Box>
    </Box>
  );

  return (
    <PageLayout>
      <Box sx={{ display: "flex" }}>
        {/* Desktop Sidebar */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <ProfileSidebar />
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <ProfileSidebar />
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Mobile Header */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              backgroundColor: "white",
              borderBottom: "1px solid #eee",
            }}
          >
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon size={24} />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Profile
            </Typography>
            <Box sx={{ width: 40 }} />
          </Box>

          <MainContent />
        </Box>
      </Box>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsMenu}
        open={Boolean(settingsMenu)}
        onClose={handleSettingsClose}
      >
        <MenuItem onClick={handleEditPhoneOpen}>
          <Edit2 size={18} style={{ marginRight: 8 }} />
          Edit Phone
        </MenuItem>
        <MenuItem onClick={handleSettingsClose}>
          <Settings size={18} style={{ marginRight: 8 }} />
          Account Settings
        </MenuItem>
      </Menu>

      {/* Edit Phone Dialog */}
      <Dialog open={editPhoneOpen} onClose={handleEditPhoneClose}>
        <DialogTitle>Edit Phone Number</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditPhoneClose}>Cancel</Button>
          <Button onClick={handleSavePhone} variant="contained" sx={{ backgroundColor: PRIMARY_COLOR }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
}
