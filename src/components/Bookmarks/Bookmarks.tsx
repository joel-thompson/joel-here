import {
  Box,
  Container,
  Link,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { z } from "zod";
import bookmarksDataJson from "./bookmarks.json";

// Zod schema for a single bookmark item
const bookmarkItemSchema = z.object({
  name: z.string(),
  url: z.string().url(), // Ensures the URL is a valid URL string
});

// Zod schema for the entire bookmarks data structure (categories mapping to arrays of items)
const bookmarksDataSchema = z.record(z.array(bookmarkItemSchema));

// Infer the TypeScript type from the Zod schema
type BookmarkData = z.infer<typeof bookmarksDataSchema>;

// Validate and parse the imported JSON data
let bookmarksData: BookmarkData;
try {
  bookmarksData = bookmarksDataSchema.parse(bookmarksDataJson);
} catch (error) {
  console.error("Error parsing bookmarks.json:", error);
  // Fallback to an empty object or handle error as appropriate for your app
  bookmarksData = {};
}

export const Bookmarks = () => {
  const theme = useTheme();
  const categories = Object.keys(bookmarksData);

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px`,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Bookmarks
        </Typography>

        {categories.map((category) => (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, textTransform: "capitalize" }}
            >
              {category}
            </Typography>
            {bookmarksData[category].map((item) => (
              <Box key={item.name} sx={{ mb: 1, pl: 2 }}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body1"
                >
                  {item.name}
                </Link>
              </Box>
            ))}
          </Box>
        ))}
      </Paper>
    </Container>
  );
};
