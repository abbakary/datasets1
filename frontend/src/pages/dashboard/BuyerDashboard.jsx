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
} from "@mui/material";
import {
  Download,
  Heart,
  ShoppingCart,
  TrendingUp,
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

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const purchases = [
    {
      id: 1,
      title: "E-Commerce Behavior Dataset",
      price: "$29.99",
      purchaseDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      title: "Social Media Impact Analysis",
      price: "$49.99",
      purchaseDate: "2024-01-10",
      status: "Active",
    },
    {
      id: 3,
      title: "AI Trends 2024",
      price: "$39.99",
      purchaseDate: "2024-01-05",
      status: "Active",
    },
  ];

  const collections = [
    {
      id: 1,
      name: "Marketing Datasets",
      datasets: 5,
      lastModified: "2024-01-20",
    },
    {
      id: 2,
      name: "AI & ML Research",
      datasets: 8,
      lastModified: "2024-01-18",
    },
    {
      id: 3,
      name: "Social Science Studies",
      datasets: 3,
      lastModified: "2024-01-12",
    },
  ];

  const downloads = [
    {
      id: 1,
      datasetTitle: "E-Commerce Behavior Dataset",
      downloadDate: "2024-01-20",
      fileSize: "2.5 GB",
    },
    {
      id: 2,
      datasetTitle: "Social Media Impact Analysis",
      downloadDate: "2024-01-19",
      fileSize: "1.8 GB",
    },
    {
      id: 3,
      datasetTitle: "AI Trends 2024",
      downloadDate: "2024-01-15",
      fileSize: "3.2 GB",
    },
  ];

  const StatCard = ({ icon: Icon, label, value }) => (
    <Card sx={{ backgroundColor: "white", borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              backgroundColor: `${PRIMARY_COLOR}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={24} color={PRIMARY_COLOR} />
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

  const PurchaseCard = ({ item }) => (
    <Card sx={{ mb: 2, backgroundColor: "white" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              Purchased: {item.purchaseDate}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip label={item.status} size="small" color="success" />
              <Typography variant="body2" sx={{ fontWeight: 600, color: PRIMARY_COLOR }}>
                {item.price}
              </Typography>
            </Box>
          </Box>
          <Button
            startIcon={<Download size={18} />}
            size="small"
            sx={{ color: PRIMARY_COLOR, textTransform: "none" }}
          >
            Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <DashboardLayout title="Buyer Dashboard">
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Stats Section */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={ShoppingCart} label="Total Purchases" value="12" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={Heart} label="Saved Datasets" value="8" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={Download} label="Downloaded" value="18" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard icon={TrendingUp} label="Collections" value="5" />
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Card sx={{ backgroundColor: "white" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="My Purchases" id="tab-0" />
                <Tab label="Saved Collections" id="tab-1" />
                <Tab label="Download History" id="tab-2" />
              </Tabs>
            </Box>

            {/* My Purchases */}
            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Your Purchases
              </Typography>
              {purchases.map((purchase) => (
                <PurchaseCard key={purchase.id} item={purchase} />
              ))}
            </TabPanel>

            {/* Saved Collections */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Your Collections
              </Typography>
              <Grid container spacing={2}>
                {collections.map((collection) => (
                  <Grid item xs={12} sm={6} md={4} key={collection.id}>
                    <Card sx={{ backgroundColor: "#f8f9fa" }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {collection.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                          {collection.datasets} datasets
                        </Typography>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                          Last modified: {collection.lastModified}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Download History */}
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Download History
              </Typography>
              {downloads.map((download) => (
                <Card key={download.id} sx={{ mb: 2, backgroundColor: "white" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {download.datasetTitle}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          Downloaded: {download.downloadDate}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: PRIMARY_COLOR }}>
                        {download.fileSize}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </TabPanel>
          </Card>
        </Container>
      </DashboardLayout>
    </PageLayout>
  );
}
