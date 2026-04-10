import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  ShoppingCart,
  Upload,
  CheckCircle,
  Users,
  Eye,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

const PRIMARY_COLOR = "#61C5C3";
const TOKEN_KEY = "dali-token";
const USER_KEY = "dali-user";

const ROLE_NAV_ITEMS = {
  buyer: [
    {
      label: "My Purchases",
      path: "/dashboard/buyer",
      icon: ShoppingCart,
    },
  ],
  seller: [
    {
      label: "Manage Datasets",
      path: "/dashboard/seller",
      icon: Upload,
    },
  ],
  editor: [
    {
      label: "Review Queue",
      path: "/dashboard/editor",
      icon: CheckCircle,
    },
  ],
  admin: [
    {
      label: "Platform Control",
      path: "/dashboard/admin",
      icon: Users,
    },
  ],
  viewer: [
    {
      label: "Browse Datasets",
      path: "/dashboard/viewer",
      icon: Eye,
    },
  ],
};

export default function RoleBasedNav({ currentPath }) {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const userRole = authUser?.role?.toLowerCase() || "viewer";
  const navItems = ROLE_NAV_ITEMS[userRole] || ROLE_NAV_ITEMS.viewer;

  const handleRoleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRoleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleRoleClose();
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
    <Box
      sx={{
        width: 280,
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #eee",
        p: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* User Info Section */}
      <Box sx={{ mb: 3, pb: 2, borderBottom: "1px solid #eee" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 2,
            cursor: "pointer",
          }}
          onClick={handleRoleClick}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: PRIMARY_COLOR,
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            {getInitials()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {authUser?.name || "User"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: PRIMARY_COLOR,
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {userRole}
            </Typography>
          </Box>
          <ChevronDown size={18} color="gray" />
        </Box>

        {/* Role Switcher Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleRoleClose}
        >
          {Object.entries(ROLE_NAV_ITEMS).map(([role, items]) => (
            <MenuItem
              key={role}
              onClick={() => {
                if (items[0]) {
                  handleNavigate(items[0].path);
                }
              }}
              sx={{ textTransform: "capitalize" }}
            >
              {role}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <ListItem
              button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                p: 1.5,
                mb: 1,
                borderRadius: 1,
                backgroundColor: isActive ? `${PRIMARY_COLOR}20` : "transparent",
                borderLeft: isActive ? `4px solid ${PRIMARY_COLOR}` : "4px solid transparent",
                pl: 1.25,
                "&:hover": {
                  backgroundColor: `${PRIMARY_COLOR}10`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: isActive ? PRIMARY_COLOR : "gray",
                }}
              >
                <Icon size={20} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? PRIMARY_COLOR : "#333",
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Menu Items */}
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem
          button
          onClick={() => navigate("/profile")}
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "gray" }}>
            <Settings size={20} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          button
          sx={{
            p: 1.5,
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "#ef4444" }}>
            <LogOut size={20} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "#ef4444" }} />
        </ListItem>
      </List>
    </Box>
  );
}
