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
  LinearProgress,
} from "@mui/material";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
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

export default function EditorDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const queue = [
    {
      id: 1,
      title: "Market Analysis 2024",
      submitter: "John Smith",
      submittedDate: "2024-01-20",
      status: "Pending Review",
      priority: "High",
    },
    {
      id: 2,
      title: "Consumer Behavior Study",
      submitter: "Sarah Johnson",
      submittedDate: "2024-01-19",
      status: "In Review",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Technology Trends",
      submitter: "Mike Chen",
      submittedDate: "2024-01-18",
      status: "Pending Review",
      priority: "Low",
    },
  ];

  const qualityChecks = [
    { id: 1, dataset: "E-Commerce Dataset", issue: "Missing metadata", severity: "High" },
    { id: 2, dataset: "Social Media Analysis", issue: "Incomplete documentation", severity: "Medium" },
    { id: 3, dataset: "AI Trends 2024", issue: "File format inconsistency", severity: "Low" },
  ];

  const approvals = [
    {
      id: 1,
      title: "Market Research Dataset",
      status: "Approved",
      reviewer: "You",
      date: "2024-01-18",
    },
    {
      id: 2,
      title: "Survey Results 2024",
      status: "Rejected",
      reviewer: "You",
      date: "2024-01-15",
    },
    {
      id: 3,
      title: "Product Feedback Data",
      status: "Approved",
      reviewer: "You",
      date: "2024-01-12",
    },
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
      <DashboardLayout title="Editor Dashboard">
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Stats Section */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={Clock} label="In Queue" value="8" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={AlertCircle} label="Quality Issues" value="3" color="#ef4444" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={CheckCircle} label="Approved" value="24" color="#10b981" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={TrendingUp} label="This Month" value="12" />
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Card sx={{ backgroundColor: "white" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Content Queue" id="tab-0" />
                <Tab label="Quality Checks" id="tab-1" />
                <Tab label="Approval History" id="tab-2" />
              </Tabs>
            </Box>

            {/* Content Queue */}
            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Pending Datasets
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Submitter</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Submitted Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {queue.map((item) => (
                      <TableRow key={item.id} sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.submitter}</TableCell>
                        <TableCell>{item.submittedDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            color={item.status === "In Review" ? "warning" : "default"}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.priority}
                            size="small"
                            variant="outlined"
                            color={item.priority === "High" ? "error" : "default"}
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" sx={{ color: PRIMARY_COLOR, textTransform: "none" }}>
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* Quality Checks */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Issues Found
              </Typography>
              {qualityChecks.map((check) => (
                <Card key={check.id} sx={{ mb: 2, backgroundColor: "white" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {check.dataset}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          {check.issue}
                        </Typography>
                      </Box>
                      <Chip
                        label={check.severity}
                        size="small"
                        color={
                          check.severity === "High"
                            ? "error"
                            : check.severity === "Medium"
                            ? "warning"
                            : "default"
                        }
                      />
                    </Box>
                    <Button size="small" sx={{ mt: 1, color: PRIMARY_COLOR, textTransform: "none" }}>
                      Notify Submitter
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabPanel>

            {/* Approval History */}
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Approval History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Review Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {approvals.map((approval) => (
                      <TableRow key={approval.id} sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                        <TableCell>{approval.title}</TableCell>
                        <TableCell>
                          <Chip
                            label={approval.status}
                            size="small"
                            icon={
                              approval.status === "Approved" ? (
                                <CheckCircle size={16} />
                              ) : (
                                <AlertCircle size={16} />
                              )
                            }
                            color={approval.status === "Approved" ? "success" : "error"}
                          />
                        </TableCell>
                        <TableCell>{approval.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Card>
        </Container>
      </DashboardLayout>
    </PageLayout>
  );
}
