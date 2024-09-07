import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const blogPosts = [
  {
    title: "Why JavaScript is the Language of the Web",
    description:
      "An in-depth look at why JavaScript continues to dominate web development and the rise of modern frameworks.",
    imageUrl: "/assets/javascript.png",
    link: "https://medium.com/@emperorbrains/understanding-the-fundamentals-of-javascript-a-beginners-guide-abcdfdc271d0#:~:text=JavaScript%20is%20a%20scripting%20language,an%20automatically%20generated%20Facebook%20timeline.",
  },
  {
    title: "Getting Started with Cloud Computing",
    description:
      "A beginner's guide to cloud computing, how it works, and why it's important in today's tech landscape.",
    imageUrl: "/assets/cloud-computing.png",
    link: "https://rit-17.medium.com/getting-started-with-cloud-computing-%EF%B8%8F-25670ccab618",
  },
  {
    title: "Exploring the World of Machine Learning",
    description:
      "How machine learning is transforming industries and the potential it holds for the future.",
    imageUrl: "/assets/machine-learning.png",
    link: "https://medium.com/itnext/intelligent-compilers-machine-learning-powered-compiler-autotuning-929ae8fe407f",
  },
  {
    title: "The Future of AI in Healthcare",
    description:
      "How artificial intelligence is revolutionizing healthcare and what we can expect in the coming years.",
    imageUrl: "/assets/ai-heathcare.png",
    link: "https://medium.com/@agile.cadre.testing/ai-in-heathcare-what-matters-what-doesnt-a47f79a7fcad",
  },
  {
    title: "Cybersecurity in the Modern World",
    description:
      "An overview of modern cybersecurity practices and the growing need for security professionals.",
    imageUrl: "/assets/cyber-security.png",
    link: "https://medium.com/@flyingmum/ai-cybersecurity-hugging-face-flying-8c2e1b553357",
  },
  {
    title: "The Rise of Quantum Computing",
    description:
      "A beginner's guide to understanding quantum computing and its future potential.",
    imageUrl: "/assets/quantum-computing.png",
    link: "https://medium.com/@wayne.anderson/quantum-computing-unlocking-the-power-of-subatomic-particles-to-transform-technology-e81e9930c4fb",
  },
];

const Blog: React.FC = () => {
  return (
    <Box sx={{ padding: "40px 16px", backgroundColor: "#F4F4F5" }} id="blog">
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Tech Community Blogs
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Stay up-to-date with the latest trends in technology by reading our
        community blogs.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {blogPosts.map((post, index) => (
          <Grid item key={index} xs={12} md={6} lg={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
                padding: "20px",
                "& .MuiCardContent-root": {
                  paddingBottom: "16px !important", 
                },
              }}
            >
              <CardMedia
                component="img"
                image={post.imageUrl}
                alt={post.title}
                sx={{
                  height: 200,
                  objectFit: "cover",
                  marginBottom: "16px",
                  width: "100%", 
                }}
              />
              <CardContent
                sx={{
                  width: "100%",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  fontWeight="bold"
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {post.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000", 
                    color: "#fff", 
                    textTransform: "none",
                    padding: "10px 20px",
                    width: "fit-content",
                    margin: "0 auto",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                  href={post.link}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
