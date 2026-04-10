import { useState } from "react";
import { Box, Typography, Paper, Badge } from "@mui/material";

const PRIMARY_COLOR = "#61C5C3";

const categoriesData = [
  {
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
  },
  {
    id: "trade",
    name: "Trade and Industry",
    icon: "🏭",
    datasetCount: 18,
    subcategories: [
      { id: "trade-sub", name: "Trade & Commerce", datasetCount: 5 },
      { id: "import", name: "Import", datasetCount: 3 },
      { id: "export", name: "Export", datasetCount: 3 },
      { id: "manufacturing", name: "Manufacturing", datasetCount: 4 },
      { id: "industrial", name: "Industrial Development", datasetCount: 3 },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure and Transport",
    icon: "🚧",
    datasetCount: 22,
    subcategories: [
      { id: "air-transport", name: "Air Transport", datasetCount: 4 },
      { id: "marine-transport", name: "Marine Transport", datasetCount: 3 },
      { id: "land-transport", name: "Land Transport", datasetCount: 5 },
      { id: "public-transport", name: "Public Transport", datasetCount: 3 },
      { id: "logistics", name: "Logistics & Supply Chain", datasetCount: 4 },
      { id: "construction", name: "Construction", datasetCount: 3 },
    ],
  },
  {
    id: "social",
    name: "Social Services",
    icon: "🏥",
    datasetCount: 20,
    subcategories: [
      { id: "health", name: "Health", datasetCount: 6 },
      { id: "pharmaceuticals", name: "Pharmaceuticals", datasetCount: 3 },
      { id: "education", name: "Education", datasetCount: 5 },
      { id: "research", name: "Research & Innovation", datasetCount: 4 },
      { id: "sports", name: "Sports", datasetCount: 2 },
    ],
  },
  {
    id: "ict",
    name: "ICT and Digital Economy",
    icon: "💻",
    datasetCount: 16,
    subcategories: [
      { id: "ict-telecom", name: "ICT / Telecommunications", datasetCount: 8 },
      { id: "digital-economy", name: "Digital Economy / Technology", datasetCount: 8 },
    ],
  },
  {
    id: "finance",
    name: "Finance and Investment",
    icon: "💰",
    datasetCount: 14,
    subcategories: [
      { id: "finance-banking", name: "Finance & Banking", datasetCount: 8 },
      { id: "insurance", name: "Insurance", datasetCount: 6 },
    ],
  },
  {
    id: "energy",
    name: "Natural Resources and Energy",
    icon: "⚡",
    datasetCount: 17,
    subcategories: [
      { id: "energy", name: "Energy (Electricity, Oil, Gas, Renewables)", datasetCount: 8 },
      { id: "mining", name: "Mining", datasetCount: 4 },
      { id: "natural-resources", name: "Natural Resources", datasetCount: 5 },
    ],
  },
  {
    id: "governance",
    name: "Governance and Public Sector",
    icon: "🏛️",
    datasetCount: 19,
    subcategories: [
      { id: "defense", name: "Defense", datasetCount: 3 },
      { id: "security", name: "Security / Police", datasetCount: 4 },
      { id: "justice", name: "Justice / Legal", datasetCount: 3 },
      { id: "public-admin", name: "Public Administration", datasetCount: 5 },
      { id: "local-government", name: "Local Government", datasetCount: 4 },
    ],
  },
  {
    id: "urban",
    name: "Urban Development and Housing",
    icon: "🏙️",
    datasetCount: 12,
    subcategories: [
      { id: "urban-dev", name: "Urban Development", datasetCount: 4 },
      { id: "real-estate", name: "Real Estate / Housing", datasetCount: 5 },
      { id: "rural-dev", name: "Rural Development", datasetCount: 3 },
    ],
  },
  {
    id: "tourism",
    name: "Tourism and Culture",
    icon: "🌍",
    datasetCount: 11,
    subcategories: [
      { id: "tourism-sub", name: "Tourism", datasetCount: 5 },
      { id: "hospitality", name: "Hospitality", datasetCount: 3 },
      { id: "culture", name: "Culture and Arts", datasetCount: 3 },
    ],
  },
];

export default function CategorySidebar({ onCategorySelect, selectedCategory }) {
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  const handleSelectCategory = (category) => {
    onCategorySelect({
      ...category,
      selectedSubcategory: null,
    });
  };

  const handleSelectSubcategory = (parentCategory, subcategory) => {
    onCategorySelect({
      ...parentCategory,
      selectedSubcategory: subcategory,
    });
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: 320,
        },
        pr: {
          xs: 0,
          md: 3,
        },
        mb: {
          xs: 3,
          md: 0,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#111827",
              mb: 2,
            }}
          >
            Categories
          </Typography>
        </Box>

        <Box
          sx={{
            maxHeight: "calc(100vh - 300px)",
            overflowY: "auto",
            overflowX: "visible",
            pr: 0.5,
            // Hide scrollbar but keep scrolling functionality
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#d1d5db",
              borderRadius: "3px",
              "&:hover": {
                background: "#9ca3af",
              },
            },
            // Firefox
            scrollbarWidth: "thin",
            scrollbarColor: "#d1d5db transparent",
          }}
        >
          {categoriesData.map((category) => {
            const isSelected =
              selectedCategory?.id === category.id &&
              !selectedCategory?.selectedSubcategory;
            const isHovered = hoveredCategoryId === category.id;

            return (
              <Box
                key={category.id}
                onMouseEnter={() => setHoveredCategoryId(category.id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
                sx={{
                  position: "relative",
                  overflow: "visible",
                }}
              >
                {/* Category Item */}
                <Box
                  onClick={() => handleSelectCategory(category)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2.5,
                    py: 1.8,
                    cursor: "pointer",
                    backgroundColor: isSelected ? "#e6f7f6" : "transparent",
                    borderLeft: isSelected
                      ? `4px solid ${PRIMARY_COLOR}`
                      : "4px solid transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#f0fffe",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "1.3rem", flexShrink: 0 }}>
                    {category.icon}
                  </Typography>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: isSelected ? PRIMARY_COLOR : "#111827",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: "#6b7280",
                        mt: 0.3,
                      }}
                    >
                      {category.datasetCount} datasets
                    </Typography>
                  </Box>
                </Box>

                {/* Hover Submenu - Shows on hover */}
                {isHovered && (
                  <Box
                    sx={{
                      position: "fixed",
                      left: {
                        xs: "50%",
                        md: "calc(100% + 12px)",
                      },
                      top: {
                        xs: "50%",
                        md: "auto",
                      },
                      transform: {
                        xs: "translate(-50%, -50%)",
                        md: "none",
                      },
                      minWidth: { xs: 280, md: 260 },
                      maxWidth: 300,
                      backgroundColor: "#fff",
                      border: `2px solid ${PRIMARY_COLOR}`,
                      borderRadius: "12px",
                      boxShadow: "0 12px 32px rgba(97, 197, 195, 0.15)",
                      zIndex: 999,
                      py: 1,
                      animation: "fadeIn 0.2s ease-in-out",
                      "@keyframes fadeIn": {
                        from: {
                          opacity: 0,
                          transform: "scale(0.95)",
                        },
                        to: {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                      },
                    }}
                  >
                    {category.subcategories.map((subcategory) => {
                      const isSubSelected =
                        selectedCategory?.selectedSubcategory?.id ===
                        subcategory.id;

                      return (
                        <Box
                          key={subcategory.id}
                          onClick={() =>
                            handleSelectSubcategory(category, subcategory)
                          }
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.2,
                            px: 2.5,
                            py: 1.1,
                            cursor: "pointer",
                            backgroundColor: isSubSelected
                              ? "#e6f7f6"
                              : "transparent",
                            color: isSubSelected ? PRIMARY_COLOR : "#374151",
                            transition: "all 0.15s ease",
                            "&:hover": {
                              backgroundColor: "#f3fffe",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.9rem",
                              fontWeight: isSubSelected ? 600 : 500,
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {subcategory.name}
                          </Typography>
                          <Badge
                            badgeContent={subcategory.datasetCount}
                            sx={{
                              "& .MuiBadge-badge": {
                                backgroundColor: isSubSelected
                                  ? PRIMARY_COLOR
                                  : "#d1d5db",
                                color: isSubSelected ? "#fff" : "#374151",
                                fontSize: "0.65rem",
                                height: 18,
                                minWidth: 18,
                                padding: "0 3px",
                                fontWeight: 700,
                              },
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
