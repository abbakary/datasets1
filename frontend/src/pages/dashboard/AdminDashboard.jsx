import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Users,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Ban,
  CheckCircle,
} from "lucide-react";
import PageLayout from "../public/components/PageLayout";
import DashboardLayout from "./components/DashboardLayout";

const PRIMARY_COLOR = "#61C5C3";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "Seller",
      joinDate: "2023-12-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      role: "Buyer",
      joinDate: "2024-01-05",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Editor",
      joinDate: "2024-01-10",
      status: "Suspended",
    },
  ];

  const flaggedContent = [
    {
      id: 1,
      title: "E-Commerce Dataset",
      submitter: "User123",
      reason: "Copyright violation",
      reportedDate: "2024-01-20",
      status: "Pending",
    },
    {
      id: 2,
      title: "Survey Data 2024",
      submitter: "User456",
      reason: "Inappropriate content",
      reportedDate: "2024-01-18",
      status: "Approved",
    },
    {
      id: 3,
      title: "AI Research Dataset",
      submitter: "User789",
      reason: "Spam",
      reportedDate: "2024-01-15",
      status: "Rejected",
    },
  ];

  const platformStats = [
    { label: "Total Users", value: "1,245" },
    { label: "Total Datasets", value: "342" },
    { label: "Monthly Revenue", value: "$28,450" },
    { label: "Active Transactions", value: "156" },
  ];

  const StatCard = ({ icon: Icon, label, value, color = PRIMARY_COLOR }) => (
    <Card sx={{ backgroundColor: "white", borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              backgroundColor: `${color}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={24} color={color} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <DashboardLayout title="Admin Dashboard">
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Stats Section */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={Users} label="Total Users" value="1,245" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={BarChart3} label="Total Datasets" value="342" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={TrendingUp}
                label="Monthly Revenue"
                value="$28,450"
                color="#10b981"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={AlertTriangle}
                label="Flagged Content"
                value="12"
                color="#ef4444"
              />
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Card sx={{ backgroundColor: "white" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="User Management" id="tab-0" />
                <Tab label="Content Moderation" id="tab-1" />
                <Tab label="Platform Reports" id="tab-2" />
              </Tabs>
            </Box>

            {/* User Management */}
            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                User Accounts
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Join Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            size="small"
                            color={user.status === "Active" ? "success" : "error"}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            startIcon={<Ban size={16} />}
                            sx={{ color: "#ef4444", textTransform: "none" }}
                          >
                            {user.status === "Active" ? "Suspend" : "Restore"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* Content Moderation */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Flagged Content
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Dataset</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Submitter</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Reported Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {flaggedContent.map((content) => (
                      <TableRow key={content.id} sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                        <TableCell>{content.title}</TableCell>
                        <TableCell>{content.submitter}</TableCell>
                        <TableCell>{content.reason}</TableCell>
                        <TableCell>{content.reportedDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={content.status}
                            size="small"
                            color={
                              content.status === "Approved"
                                ? "success"
                                : content.status === "Pending"
                                ? "warning"
                                : "error"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            startIcon={<CheckCircle size={16} />}
                            sx={{ color: "#10b981", textTransform: "none" }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            startIcon={<Ban size={16} />}
                            sx={{ color: "#ef4444", textTransform: "none" }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* Platform Reports */}
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Platform Statistics
              </Typography>
              <Grid container spacing={3}>
                {platformStats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ backgroundColor: "#f8f9fa" }}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: PRIMARY_COLOR }}>
                          {stat.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Card sx={{ backgroundColor: "#f8f9fa", p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    System Settings
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Allow new dataset uploads"
                    sx={{ display: "block", mb: 1 }}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable user registrations"
                    sx={{ display: "block", mb: 1 }}
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Maintenance mode"
                    sx={{ display: "block" }}
                  />
                </Card>
              </Box>
            </TabPanel>
          </Card>
        </Container>
      </DashboardLayout>
    </PageLayout>
  );
}
