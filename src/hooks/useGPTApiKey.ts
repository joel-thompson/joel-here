import { useLocalStorage } from "@uidotdev/usehooks";

export const useGPTApiKey = () => {
  const [apiKey, setApiKey] = useLocalStorage<string | null>(
    "gpt-api-key",
    null
  );

  return { apiKey, setApiKey };
};
