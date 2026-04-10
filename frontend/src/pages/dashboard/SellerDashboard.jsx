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
} from "@mui/material";
import {
  Upload,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
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

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const datasets = [
    {
      id: 1,
      title: "E-Commerce Behavior Dataset",
      status: "Published",
      downloads: 245,
      earnings: "$1,225.00",
      uploadDate: "2024-01-10",
    },
    {
      id: 2,
      title: "Social Media Impact Analysis",
      status: "Under Review",
      downloads: 0,
      earnings: "$0.00",
      uploadDate: "2024-01-15",
    },
    {
      id: 3,
      title: "AI Trends 2024",
      status: "Published",
      downloads: 189,
      earnings: "$945.00",
      uploadDate: "2024-01-05",
    },
  ];

  const salesData = [
    {
      id: 1,
      date: "2024-01-20",
      dataset: "E-Commerce Dataset",
      amount: "$29.99",
      buyer: "John Doe",
    },
    {
      id: 2,
      date: "2024-01-19",
      dataset: "AI Trends 2024",
      amount: "$39.99",
      buyer: "Jane Smith",
    },
    {
      id: 3,
      date: "2024-01-18",
      dataset: "E-Commerce Dataset",
      amount: "$29.99",
      buyer: "Bob Wilson",
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
      <DashboardLayout title="Seller Dashboard">
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Stats Section */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={Upload} label="Total Uploads" value="12" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={Eye} label="Total Views" value="1,245" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={DollarSign}
                label="Total Earnings"
                value="$4,800.00"
                color="#10b981"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={TrendingUp} label="Active Datasets" value="8" />
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Card sx={{ backgroundColor: "white" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="My Datasets" id="tab-0" />
                <Tab label="Sales Analytics" id="tab-1" />
                <Tab label="Earnings" id="tab-2" />
              </Tabs>
            </Box>

            {/* My Datasets */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Your Datasets
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  sx={{
                    backgroundColor: PRIMARY_COLOR,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Upload Dataset
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Downloads</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Earnings</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Upload Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasets.map((dataset) => (
                      <TableRow key={dataset.id} sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                        <TableCell>{dataset.title}</TableCell>
                        <TableCell>
                          <Chip
                            label={dataset.status}
                            size="small"
                            color={dataset.status === "Published" ? "success" : "default"}
                          />
                        </TableCell>
                        <TableCell>{dataset.downloads}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#10b981" }}>
                          {dataset.earnings}
                        </TableCell>
                        <TableCell>{dataset.uploadDate}</TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<Edit size={16} />} sx={{ color: PRIMARY_COLOR }}>
                            Edit
                          </Button>
                          <Button size="small" startIcon={<Trash2 size={16} />} sx={{ color: "#ef4444" }}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* Sales Analytics */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Sales
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Dataset</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Buyer</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesData.map((sale) => (
                      <TableRow key={sale.id} sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.dataset}</TableCell>
                        <TableCell>{sale.buyer}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#10b981" }}>
                          {sale.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* Earnings */}
            <TabPanel value={activeTab} index={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ backgroundColor: "#f8f9fa" }}>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                        Total Earnings
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "#10b981", mb: 2 }}>
                        $4,800.00
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: PRIMARY_COLOR,
                          color: PRIMARY_COLOR,
                          textTransform: "none",
                        }}
                      >
                        Withdraw Earnings
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ backgroundColor: "#f8f9fa" }}>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                        Pending Payout
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "#fbbf24", mb: 2 }}>
                        $150.00
                      </Typography>
                      <Typography variant="caption" sx={{ color: "gray" }}>
                        Payouts are processed monthly
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Card>
        </Container>
      </DashboardLayout>
    </PageLayout>
  );
}
