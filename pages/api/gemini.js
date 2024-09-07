import fetch from "node-fetch";

// This API route handles the communication with the Gemini API
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Extract the prompt from the request body
      const { prompt } = req.body.data;
      console.log("Prompt received:", prompt);

      // Define the API endpoint with the API key
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        console.error("API key is missing");
        return res.status(500).json({ error: "API key is not configured" });
      }
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

      // Prepare the request body for the API call
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };
      // Log the request body for debugging
      console.log("Request body:", requestBody);

      // Make the request to the Gemini API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error details:", errorDetails);
        return res
          .status(response.status)
          .json({ error: "Error communicating with the API" });
      }

      // Parse the response JSON
      const data = await response.json();
      console.log("API response data:", data);

      // Validate the structure of the response
      if (
        !data ||
        !Array.isArray(data.candidates) ||
        data.candidates.length === 0
      ) {
        console.warn("Unexpected response structure:", data);
        throw new Error("Unexpected response structure");
      }

      // Extract the response text from the API, with a fallback mechanism
      const content =
        data.candidates[0]?.content?.parts[0]?.text ||
        generateFallbackResponse(prompt);
      console.log("Extracted content:", content);

      // Send the content as the API response
      res.status(200).json({ content });
    } catch (error) {
      console.error("Error communicating with the API:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function generateFallbackResponse(prompt) {
  console.log("Generating fallback response for:", prompt);

  if (prompt.toLowerCase().includes("event")) {
    return "Our next Dev Weekends event is happening soon. You can check out our upcoming workshops, hackathons, and bootcamps on our events page.";
  } else if (prompt.toLowerCase().includes("history")) {
    return "Dev Weekends was founded to create opportunities for developers to grow, connect, and learn. Would you like to know more about our values?";
  } else if (prompt.toLowerCase().includes("values")) {
    return "At Dev Weekends, we believe in collaboration, innovation, and growth. You can read more about our values on the 'Our Values' page.";
  } else {
    return "I'm here to assist you with any questions about Dev Weekends. You can ask about our upcoming events, history, or values.";
  }
}
