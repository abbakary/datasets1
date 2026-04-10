import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Box,
  Avatar,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  MoreVertical,
  ChevronUp,
  Calendar,
  FileIcon,
  HardDrive,
  Download,
  X,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import CategorySidebar from "../components/CategorySidebar";

const PRIMARY_COLOR = "#61C5C3";

// Default first category data
const DEFAULT_CATEGORY = {
  id: "agriculture",
  name: "Agriculture and Environment",
  icon: "🌾",
  datasetCount: 24,
  subcategories: [
    { id: "agriculture-sub", name: "Agriculture", datasetCount: 8 },
    { id: "fisheries", name: "Fisheries", datasetCount: 5 },
    { id: "forestry", name: "Forestry", datasetCount: 4 },
    { id: "environment", name: "Environment & Climate", datasetCount: 7 },
  ],
};

export default function DatasetsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

  const trendingDatasets = [
    {
      id: 1,
      title: "Liver Cirrhosis Disease Prediction Dataset",
      author: "zkskhurram",
      usability: "10.0",
      updated: "Updated a day ago",
      files: "2 Files (CSV)",
      size: "10 kB",
      downloads: "92 downloads",
      votes: 13,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=11",
        "https://i.pravatar.cc/40?img=14",
      ],
    },
    {
      id: 2,
      title: "Python OSV Vulnerabilities & CVSS Features",
      author: "Kanchana1990",
      usability: "10.0",
      updated: "Updated 14 hours ago",
      files: "3 Files (CSV)",
      size: "3 MB",
      downloads: "32 downloads",
      votes: 10,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=21",
        "https://i.pravatar.cc/40?img=25",
      ],
    },
    {
      id: 3,
      title: "Spotify Global Hits and Artist Analytics",
      author: "Eman Fatima",
      usability: "10.0",
      updated: "Updated 7 days ago",
      files: "3 Files (CSV)",
      size: "9 kB",
      downloads: "418 downloads",
      votes: 16,
      image:
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=31",
        "https://i.pravatar.cc/40?img=33",
      ],
    },
    {
      id: 4,
      title: "Student Mental Health and Burnout Dataset",
      author: "Mansehaj Preet",
      usability: "10.0",
      updated: "Updated 23 days ago",
      files: "1 File (CSV)",
      size: "3 MB",
      downloads: "742 downloads",
      votes: 16,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=41",
        "https://i.pravatar.cc/40?img=43",
      ],
    },
  ];

  const filteredDatasets = trendingDatasets.filter((dataset) => {
    const matchesSearch =
      dataset.title.toLowerCase().includes(search.toLowerCase()) ||
      dataset.author.toLowerCase().includes(search.toLowerCase());

    // If no category is selected, show all datasets
    if (!selectedCategory) {
      return matchesSearch;
    }

    // If a specific subcategory is selected
    if (selectedCategory.selectedSubcategory) {
      return (
        matchesSearch &&
        (dataset.title.toLowerCase().includes(selectedCategory.selectedSubcategory.name.toLowerCase()) ||
          dataset.title.toLowerCase().includes(selectedCategory.name.toLowerCase()))
      );
    }

    // If only main category is selected
    return (
      matchesSearch &&
      (dataset.title.toLowerCase().includes(selectedCategory.name.toLowerCase()) ||
        dataset.author.toLowerCase().includes(selectedCategory.name.toLowerCase()))
    );
  });

  return (
    <PageLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fb",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {/* Search Bar */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search datasets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: 50,
                  fontSize: "0.95rem",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#111827" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: 600,
                        color: PRIMARY_COLOR,
                        cursor: "pointer",
                      }}
                    >
                      <SlidersHorizontal size={18} />
                      <Typography
                        fontWeight={600}
                        sx={{ fontSize: "0.9rem", color: PRIMARY_COLOR }}
                      >
                        Filters
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Main Content Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "320px 1fr",
              },
              gap: 3,
            }}
          >
            {/* Sidebar */}
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />

            {/* Main Content */}
            <Box>
              {/* Category Header with Subcategory Chips */}
              <Box
                sx={{
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <TrendingUp size={20} color="#111827" />
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      All Datasets
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: PRIMARY_COLOR,
                      cursor: "pointer",
                    }}
                  >
                    See All
                  </Typography>
                </Box>

                {/* Subcategory Chips */}
                {selectedCategory && selectedCategory.subcategories && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.2,
                      flexWrap: "wrap",
                      mt: 2,
                    }}
                  >
                    {/* "All" chip for this category */}
                    <Chip
                      label={selectedCategory.name}
                      onClick={() => {
                        setSelectedCategory({
                          ...selectedCategory,
                          selectedSubcategory: null,
                        });
                      }}
                      variant={
                        !selectedCategory.selectedSubcategory
                          ? "filled"
                          : "outlined"
                      }
                      sx={{
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        height: 32,
                        px: 1,
                        backgroundColor:
                          !selectedCategory.selectedSubcategory
                            ? PRIMARY_COLOR
                            : "#fff",
                        color: !selectedCategory.selectedSubcategory
                          ? "#fff"
                          : "#374151",
                        borderColor: "#d1d5db",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: !selectedCategory.selectedSubcategory
                            ? PRIMARY_COLOR
                            : "#e6f7f6",
                        },
                      }}
                    />

                    {/* Subcategory chips */}
                    {selectedCategory.subcategories.map((subcategory) => (
                      <Chip
                        key={subcategory.id}
                        label={subcategory.name}
                        onClick={() => {
                          setSelectedCategory({
                            ...selectedCategory,
                            selectedSubcategory: subcategory,
                          });
                        }}
                        variant={
                          selectedCategory.selectedSubcategory?.id ===
                          subcategory.id
                            ? "filled"
                            : "outlined"
                        }
                        onDelete={
                          selectedCategory.selectedSubcategory?.id ===
                          subcategory.id
                            ? () => {
                                setSelectedCategory({
                                  ...selectedCategory,
                                  selectedSubcategory: null,
                                });
                              }
                            : undefined
                        }
                        deleteIcon={
                          selectedCategory.selectedSubcategory?.id ===
                          subcategory.id ? (
                            <X size={14} />
                          ) : undefined
                        }
                        sx={{
                          borderRadius: "6px",
                          fontSize: "0.85rem",
                          height: 32,
                          px: 1,
                          backgroundColor:
                            selectedCategory.selectedSubcategory?.id ===
                            subcategory.id
                              ? PRIMARY_COLOR
                              : "#fff",
                          color:
                            selectedCategory.selectedSubcategory?.id ===
                            subcategory.id
                              ? "#fff"
                              : "#374151",
                          borderColor: "#d1d5db",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor:
                              selectedCategory.selectedSubcategory?.id ===
                              subcategory.id
                                ? PRIMARY_COLOR
                                : "#e6f7f6",
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Datasets Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: 3,
                }}
              >
                {filteredDatasets.length > 0 ? (
                  filteredDatasets.map((dataset) => (
                    <DatasetCard key={dataset.id} dataset={dataset} />
                  ))
                ) : (
                  <Box
                    sx={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      py: 6,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#6b7280",
                        fontWeight: 500,
                      }}
                    >
                      No datasets found in this category
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
}

function DatasetCard({ dataset }) {
  const navigate = useNavigate();

  const handleOpenDataset = () => {
    navigate(`/dataset-info/${dataset.id}`, {
      state: {
        dataset,
      },
    });
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "none",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 24px rgba(97, 197, 195, 0.12)",
          borderColor: PRIMARY_COLOR,
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          height: 160,
          backgroundImage: `url(${dataset.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0)",
            transition: "backgroundColor 0.2s ease",
          },
          "&:hover::after": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      />

      <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Title and Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 1.5,
          }}
        >
          <Typography
            onClick={handleOpenDataset}
            sx={{
              fontSize: "0.98rem",
              fontWeight: 700,
              lineHeight: 1.4,
              color: "#111827",
              cursor: "pointer",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.2s ease",
              "&:hover": {
                color: PRIMARY_COLOR,
              },
            }}
          >
            {dataset.title}
          </Typography>

          <IconButton size="small" sx={{ mt: -0.5, minWidth: 32 }}>
            <MoreVertical size={16} />
          </IconButton>
        </Box>

        {/* Author */}
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "#1f2937",
            fontWeight: 500,
            mb: 1.2,
          }}
        >
          {dataset.author}
        </Typography>

        {/* Usability and Updated */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            mb: 1.5,
            fontSize: "0.8rem",
            color: "#6b7280",
          }}
        >
          <Typography sx={{ fontSize: "inherit" }}>
            Usability <b style={{ color: "#111827" }}>{dataset.usability}</b>
          </Typography>
          <Box sx={{ width: 1, height: 1, borderRadius: "50%", backgroundColor: "#d1d5db" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <Calendar size={14} />
            <Typography sx={{ fontSize: "inherit" }}>{dataset.updated}</Typography>
          </Box>
        </Box>

        {/* File Details - Spaced Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            mb: 2,
            pb: 2,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {/* File Type */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.4,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
            }}
          >
            <FileIcon size={16} style={{ color: PRIMARY_COLOR }} />
            <Typography sx={{ fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
              {dataset.files}
            </Typography>
          </Box>

          {/* Storage */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.4,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
            }}
          >
            <HardDrive size={16} style={{ color: PRIMARY_COLOR }} />
            <Typography sx={{ fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
              {dataset.size}
            </Typography>
          </Box>

          {/* Downloads */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.4,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
            }}
          >
            <Download size={16} style={{ color: PRIMARY_COLOR }} />
            <Typography sx={{ fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
              {dataset.downloads}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9fafb",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 0.4,
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid #d1d5db",
            }}
          >
            <ChevronUp size={14} />
          </Box>

          <Box sx={{ px: 1.2, py: 0.3 }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
              }}
            >
              {dataset.votes}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {dataset.avatars.map((avatar, index) => (
            <Avatar
              key={index}
              src={avatar}
              sx={{
                width: 24,
                height: 24,
                border: `2px solid ${PRIMARY_COLOR}`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}
