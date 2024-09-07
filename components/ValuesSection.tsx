import React from "react";
import { Grid, Card, Typography, Box } from "@mui/material";
import { Users, ShieldCheck, Lightbulb } from "lucide-react";

const Values: React.FC = () => {
  const valuesData = [
    {
      title: "Community Engagement",
      description:
        "Fostering meaningful connections through community initiatives.",
      icon: <Users size={48} color="black" />,
    },
    {
      title: "Integrity and Trust",
      description: "Ensuring transparency and trust in all our initiatives.",
      icon: <ShieldCheck size={48} color="black" />,
    },
    {
      title: "Innovative Events",
      description:
        "Curating creative events to meet the needs of our community.",
      icon: <Lightbulb size={48} color="black" />,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        py: 8,
        px: 2,
        maxWidth: "1200px",
        mx: "auto",
      }}
      id="values"
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Our Values
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {valuesData.map((value, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                padding: 4,
                textAlign: "center",
                backgroundColor: "#f2f2f2",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box sx={{ marginBottom: 2 }}>{value.icon}</Box>
              <Typography variant="h6" component="div" fontWeight="bold">
                {value.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: 2 }}
              >
                {value.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Values;
