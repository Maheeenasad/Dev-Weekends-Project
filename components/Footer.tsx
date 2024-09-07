import React from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  GitHub,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#141414",
        color: "#fff",
        pt: 4,
        textAlign: "center",
      }}
    >
      {/* Social Media Icons */}
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: 1,
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <Facebook sx={{ color: "#141414", fontSize: "30px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: 1,
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <Instagram sx={{ color: "#141414", fontSize: "30px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: 1,
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <Twitter sx={{ color: "#141414", fontSize: "30px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            href="https://github.com"
            target="_blank"
            aria-label="GitHub"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: 1,
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <GitHub sx={{ color: "#141414", fontSize: "30px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            href="https://youtube.com"
            target="_blank"
            aria-label="YouTube"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: 1,
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <YouTube sx={{ color: "#141414", fontSize: "30px" }} />
          </IconButton>
        </Grid>
      </Grid>

      {/* Navigation Links */}
      <Grid container justifyContent="center" spacing={4} sx={{ mb: 2 }}>
        <Grid item>
          <Link href="/" passHref>
            <Typography sx={{ cursor: "pointer", color: "#fff" }}>
              Home
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="#values" passHref>
            <Typography sx={{ cursor: "pointer", color: "#fff" }}>
              Our Values
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="#events" passHref>
            <Typography sx={{ cursor: "pointer", color: "#fff" }}>
              Events/Bootcamps
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="#blog" passHref>
            <Typography sx={{ cursor: "pointer", color: "#fff" }}>
              Blogs
            </Typography>
          </Link>
        </Grid>
      </Grid>

      {/* Copyright with different background */}
      <Box sx={{ backgroundColor: "#000", py: 2, mt: 0 }}>
        <Typography variant="body2" sx={{ color: "#fff" }}>
          Copyright ©2024, All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
