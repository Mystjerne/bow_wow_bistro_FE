import { Box } from "@mui/material";

export default function ReviewTile({
  reviewer_name,
  reviewer_image_src,
  review_text,
  borderRight,
  borderLeft,
}) {
  return (
    <Box
      height={300}
      width={300}
      my={4}
      //my is margin
      display="flex"
      flexDirection="column"
      alignItems="center"
      //gap is distance between items
      padding={2}
      //p is padding
      sx={{
        borderRight: borderRight ? "2px solid grey" : "none",
        borderLeft: borderLeft ? "2px solid grey" : "none",
      }}
    >
      <img
        src={reviewer_image_src}
        alt="reviewer_info"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "200px",
          maxHeight: "200px",
          borderRadius: "200px",
        }}
      />

      <p>{review_text}</p>

      <p>{reviewer_name}</p>
    </Box>
  );
}
