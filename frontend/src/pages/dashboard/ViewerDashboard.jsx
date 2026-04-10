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
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import {
  Search,
  Heart,
  Eye,
  Bookmark,
  Download,
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

export default function ViewerDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const publicDatasets = [
    {
      id: 1,
      title: "E-Commerce Behavior Dataset",
      description: "Comprehensive analysis of online shopping patterns",
      downloads: 1245,
      rating: 4.8,
      seller: "DataVendor Inc",
      isSaved: false,
    },
    {
      id: 2,
      title: "Social Media Impact Analysis",
      description: "Study on social media effects on mental health",
      downloads: 892,
      rating: 4.6,
      seller: "Research Labs",
      isSaved: true,
    },
    {
      id: 3,
      title: "AI Trends 2024",
      description: "Latest trends and developments in AI research",
      downloads: 2103,
      rating: 4.9,
      seller: "Tech Insights",
      isSaved: false,
    },
  ];

  const savedCollections = [
    {
      id: 1,
      name: "Marketing Research",
      datasetCount: 5,
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "AI & Machine Learning",
      datasetCount: 8,
      createdDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Consumer Behavior",
      datasetCount: 3,
      createdDate: "2024-01-05",
    },
  ];

  const viewingHistory = [
    {
      id: 1,
      title: "E-Commerce Behavior Dataset",
      seller: "DataVendor Inc",
      viewedDate: "2024-01-20",
    },
    {
      id: 2,
      title: "AI Trends 2024",
      seller: "Tech Insights",
      viewedDate: "2024-01-19",
    },
    {
      id: 3,
      title: "Social Media Impact Analysis",
      seller: "Research Labs",
      viewedDate: "2024-01-18",
    },
  ];

  const DatasetCard = ({ dataset }) => (
    <Card sx={{ backgroundColor: "white", height: "100%" }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {dataset.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
            {dataset.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flex: 1 }}>
            <Eye size={16} color="gray" />
            <Typography variant="caption" sx={{ color: "gray" }}>
              {dataset.downloads} views
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              ★ {dataset.rating}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: "gray", display: "block", mb: 2 }}>
          by {dataset.seller}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            startIcon={dataset.isSaved ? <Bookmark size={16} /> : <Bookmark size={16} />}
            sx={{
              flex: 1,
              color: dataset.isSaved ? PRIMARY_COLOR : "gray",
              backgroundColor: dataset.isSaved ? `${PRIMARY_COLOR}20` : "#f0f0f0",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            {dataset.isSaved ? "Saved" : "Save"}
          </Button>
          <Button
            size="small"
            startIcon={<Download size={16} />}
            sx={{
              flex: 1,
              color: "white",
              backgroundColor: PRIMARY_COLOR,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <DashboardLayout title="Browse Datasets">
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Search Section */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="gray" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>

          {/* Tabs Section */}
          <Card sx={{ backgroundColor: "white" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Browse Datasets" id="tab-0" />
                <Tab label="Saved Collections" id="tab-1" />
                <Tab label="Viewing History" id="tab-2" />
              </Tabs>
            </Box>

            {/* Browse Datasets */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Public Datasets
                </Typography>
                <Grid container spacing={2}>
                  {publicDatasets.map((dataset) => (
                    <Grid item xs={12} sm={6} md={4} key={dataset.id}>
                      <DatasetCard dataset={dataset} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>

            {/* Saved Collections */}
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Your Collections
                </Typography>
                <Grid container spacing={2}>
                  {savedCollections.map((collection) => (
                    <Grid item xs={12} sm={6} md={4} key={collection.id}>
                      <Card sx={{ backgroundColor: "#f8f9fa" }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {collection.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                            {collection.datasetCount} datasets
                          </Typography>
                          <Typography variant="caption" sx={{ color: "gray" }}>
                            Created: {collection.createdDate}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Button
                              fullWidth
                              size="small"
                              sx={{
                                color: PRIMARY_COLOR,
                                textTransform: "none",
                              }}
                            >
                              Open Collection
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>

            {/* Viewing History */}
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Recently Viewed
                </Typography>
                {viewingHistory.map((item) => (
                  <Card key={item.id} sx={{ mb: 2, backgroundColor: "white" }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                            by {item.seller}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "gray" }}>
                            Viewed: {item.viewedDate}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          sx={{
                            color: PRIMARY_COLOR,
                            textTransform: "none",
                          }}
                        >
                          View Again
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </TabPanel>
          </Card>
        </Container>
      </DashboardLayout>
    </PageLayout>
  );
}
