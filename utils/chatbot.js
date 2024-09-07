import { fetchUpcomingEvents, fetchMentorsBySkills } from "./firebase";

export async function getChatbotResponse(prompt) {
  try {
    // Handle event queries
    if (
      prompt.toLowerCase().includes("event") ||
      prompt.toLowerCase().includes("bootcamp")
    ) {
      const events = await fetchUpcomingEvents();
      if (events.length > 0) {
        const eventResponse = events
          .map(
            (event) => `
**Event**: ${event.title}
**Date**: ${event.date}
**Description**: ${event.description}
**Location**: ${event.location}
`
          )
          .join("\n\n");
        return `Here are the upcoming events:\n\n${eventResponse}`;
      } else {
        return "There are no upcoming events at the moment.";
      }
    }

    // Handle mentor queries
    const skillsKeywords = [
      "frontend",
      "backend",
      "react",
      "node.js",
      "css",
      "javascript",
      "python",
      "oop",
      "c++",
      "MERN",
      "Artificial Intelligence",
    ];
    const requestedSkills = skillsKeywords.filter((keyword) =>
      prompt.toLowerCase().includes(keyword.toLowerCase())
    );

    if (requestedSkills.length > 0) {
      // Fetch mentors based on the first requested skill
      const mentors = await fetchMentorsBySkills(requestedSkills[0]);
      if (mentors.length > 0) {
        const mentorResponse = mentors
          .map(
            (mentor) => `
**Name**: ${mentor.name}
**Skills**: ${mentor.skills.join(", ")}
**Email**: ${mentor.email}
**Phone**: ${mentor.phone}
**Bio**: ${mentor.bio}
`
          )
          .join("\n\n");
        return `Here are some mentors that match the skill "${requestedSkills[0]}":\n\n${mentorResponse}`;
      } else {
        return `Sorry, no mentors found with the skill "${requestedSkills[0]}"`;
      }
    }

    // Fallback to general response
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: [{ parts: [prompt] }] }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    const content =
      data.candidates[0]?.content?.parts[0]?.text ||
      generateFallbackResponse(prompt);
    return content;
  } catch (error) {
    console.error("Error communicating with the API:", error);
    return "There was an error processing your request. Please try again later.";
  }
}
