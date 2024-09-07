"use client";

import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { collection, getDocs, query, where } from "firebase/firestore";
import { storage, db } from "../utils/firebase";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! Ask me anything about Dev Weekends, including our upcoming events, bootcamps, or let me help you find the best mentor based on your skills. How can I assist you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim()) {
      setMessage("");

      setMessages((messages) => [
        ...messages,
        { role: "user", content: message },
        { role: "assistant", content: "" },
      ]);

      try {
        let assistantMessage = "";

        // Check if the user is asking for events
        if (message.toLowerCase().includes("event")) {
          assistantMessage = await fetchEvents();
        }
        // Check if the user is asking for mentors
        else if (message.toLowerCase().includes("mentor")) {
          assistantMessage = await fetchMentors(message);
        }
        // Fallback for other queries
        else {
          assistantMessage = await fetchFromAPI(message);
        }

        // Update the assistant's message
        setMessages((messages) => {
          const updatedMessages = [...messages];
          updatedMessages[updatedMessages.length - 1].content =
            assistantMessage;
          return updatedMessages;
        });
      } catch (error) {
        console.error("Error communicating with the API:", error);
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: "There was an error. Please try again later.",
          },
        ]);
      }
    }
  };

  const fetchEvents = async () => {
    const eventsRef = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsRef);
    const eventsList = eventsSnapshot.docs.map((doc) => doc.data());

    if (eventsList.length === 0) {
      return "Currently, there are no upcoming events at Dev Weekends.";
    }

    let eventsMessage = "Here are the upcoming events at Dev Weekends:\n\n";
    eventsList.forEach((event, index) => {
      eventsMessage += `${index + 1}. **Title**: ${event.title}  \n\n`;
      eventsMessage += `   **Date**: ${event.date}  \n`;
      eventsMessage += `   **Location**: ${event.location}  \n`;
      eventsMessage += `   **Description**: ${event.description}  \n\n`;
    });

    return eventsMessage;
  };

  const fetchMentors = async (userMessage) => {
    const mentorsRef = collection(db, "mentors");

    // List of skills that the chatbot will match from the user's message
    const skills = [
      "React",
      "Node.js",
      "CSS",
      "JavaScript",
      "Python",
      "OOP",
      "C++",
      "MERN",
      "Artificial Intelligence",
    ];

    // Find any matching skills from the user's message
    const requestedSkills = skills.filter((skill) =>
      userMessage.toLowerCase().includes(skill.toLowerCase())
    );

    if (requestedSkills.length > 0) {
      // Use the first detected skill to search for mentors
      const q = query(
        mentorsRef,
        where("skills", "array-contains", requestedSkills[0])
      );
      const mentorsSnapshot = await getDocs(q);
      const mentorsList = mentorsSnapshot.docs.map((doc) => doc.data());

      if (mentorsList.length === 0) {
        return `Sorry, I couldn't find any mentors with the requested skill: ${requestedSkills[0]}`;
      }

      // Format mentors into a readable message using markdown line breaks (two spaces at the end)
      let mentorMessage = `Here are some mentors that match the skill "${requestedSkills[0]}":\n\n`;
      mentorsList.forEach((mentor) => {
        mentorMessage += `**Name**: ${mentor.name}  \n`; // Two spaces at the end to force a line break in markdown
        mentorMessage += `**Skills**: ${mentor.skills.join(", ")}  \n`;
        mentorMessage += `**Email**: ${mentor.email}  \n`;
        mentorMessage += `**Phone**: ${mentor.phone}  \n`;
        mentorMessage += `**Bio**: ${mentor.bio}  \n\n`;
      });

      return mentorMessage;
    }

    return "Please specify a skill to find mentors.";
  };

  const fetchFromAPI = async (userMessage) => {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          prompt: `You are a helpful assistant designed to support users navigating a platform (Dev Weekends). The user asked: "${userMessage}".`,
        },
      }),
    });

    const data = await response.json();
    return data.content || "I'm sorry, can I help with something else?";
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={3}
      sx={{
        backgroundColor: "#f2f2f2",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Stack
        direction="column"
        width="100%"
        maxWidth="600px"
        height="85vh"
        borderRadius={8}
        boxShadow={4}
        overflow="hidden"
        sx={{
          bgcolor: "#222",
          "@media (min-width: 768px)": {
            maxWidth: "800px",
          },
          "@media (min-width: 1024px)": {
            maxWidth: "1000px",
          },
        }}
      >
        <Box
          p={2}
          sx={{
            bgcolor: "#333",
            color: "#fff",
            borderRadius: "8px 8px 0 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
            }}
          >
            Personal Assistant from Dev Weekends
          </Typography>
        </Box>

        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          p={2}
          sx={{ overflowY: "auto", backgroundColor: "#f1f1f1" }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                msg.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 4,
                  boxShadow: 1,
                  maxWidth: "75%",
                  bgcolor: msg.role === "assistant" ? "#fff" : "#141414",
                  color: msg.role === "assistant" ? "#000" : "#fff",
                  alignSelf:
                    msg.role === "assistant" ? "flex-start" : "flex-end",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </Box>
            </Box>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          p={2}
          sx={{
            bgcolor: "#222",
            borderTop: "1px solid #444",
          }}
        >
          <TextField
            label="Type your message..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            sx={{
              bgcolor: "#444",
              color: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                color: "#fff",
              },
              "& .MuiInputLabel-root": {
                color: "#fff",
              },
            }}
          />

          <IconButton
            onClick={sendMessage}
            disabled={!message.trim()}
            sx={{
              borderRadius: "50%",
              bgcolor: "#fff",
              color: "#000",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SendIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
