import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const events = [
  {
    title: "Front-End Bootcamp",
    date: "June 1 - July 15",
    description:
      "Learn the latest front-end technologies and build professional-grade web applications.",
    buttonText: "Learn More",
  },
  {
    title: "Data Science Meetup",
    date: "June 10, 2025",
    description:
      "Join our monthly data science meetup and learn from industry experts.",
    buttonText: "RSVP",
  },
  {
    title: "UI/UX Design Bootcamp",
    date: "July 1 - August 15",
    description:
      "Dive into the world of User experience design and create visually stunning interfaces.",
    buttonText: "Learn More",
  },
  {
    title: "Women in Tech Networking Event",
    date: "December 15, 2024",
    description:
      "Connect with other women in tech industry and learn from their experiences.",
    buttonText: "RSVP",
  },
];

const Events: React.FC = () => {
  return (
    <Box id="events" sx={{ backgroundColor: "#F4F4F5", padding: "40px 16px" }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Explore Our Upcoming Bootcamps and Events
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Join us for our upcoming bootcamps and events, where you can learn new
        skills, network with industry professionals, and be a part of our
        vibrant community.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {events.map((event, index) => (
          <Grid item key={index} xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                padding: "20px",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": { boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" },
              }}
            >
              <CardContent sx={{ paddingBottom: "16px" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                  sx={{ marginTop: "8px" }}
                >
                  {event.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#6c757d",
                    }}
                  >
                    <CalendarTodayIcon
                      sx={{ fontSize: "16px", marginRight: "4px" }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {event.date}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#000!important",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#333!important",
                      },
                      borderRadius: "20px",
                      textTransform: "none",
                      padding: "6px 16px",
                    }}
                  >
                    {event.buttonText}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Events;
