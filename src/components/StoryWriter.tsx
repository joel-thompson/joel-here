import GPTApiKeyWrapper from "./GPTApiKeyWrapper";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGPTApiKey } from "../hooks/useGPTApiKey";

export const StoryWriter = () => {
  return (
    <GPTApiKeyWrapper>
      <WritingAssistant />
    </GPTApiKeyWrapper>
  );
};

// Define the structure of the API response data - this is probably wrong
interface StoryResponse {
  choices: [{ text: string }];
}

// Define the function for fetching the story from the API
const fetchStory = async ({
  prompt,
  apiKey,
}: {
  prompt: string;
  apiKey: string | null;
}) => {
  console.log({ apiKey });
  if (!apiKey) {
    throw new Error("API Key not set");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a writer. You specialize in short stories. You have been asked to write a story about the following prompt:",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    // Try to extract the error message from the response body
    let errorMessage = "Failed to fetch story"; // Default error message
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error.message;
    } catch (e) {
      errorMessage = "Error parsing error response:";
      console.error("Error parsing error response:", e);
    }
    throw new Error(errorMessage);
  }

  const data: StoryResponse = await response.json();
  return data.choices[0].text;
};

const WritingAssistant = () => {
  const [prompt, setPrompt] = useState<string>("");
  const mutation = useMutation({
    mutationFn: fetchStory,
  });

  const { apiKey } = useGPTApiKey();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = () => {
    mutation.mutate({ prompt, apiKey });
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={handleInputChange}
        placeholder="Enter your story idea, plot point, or character description here..."
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit} disabled={mutation.isPending}>
        {mutation.isPending ? "Generating..." : "Generate Story"}
      </button>
      <div>
        <h3>Generated Story:</h3>
        <p>{mutation.data ?? "Your story will appear here..."}</p>
        {mutation.isError && <p>Error: {mutation.error.message}</p>}
      </div>
    </div>
  );
};
