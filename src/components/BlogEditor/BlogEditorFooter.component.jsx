import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import ReplayIcon from "@mui/icons-material/Replay";

function BlogEditorFooter({ handleDiscard, handleSave, generateAIText }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 4,
      }}
    >
      <div>
        <Button
          size="large"
          variant="outlined"
          color="info"
          startIcon={<ReplayIcon />}
          onClick={generateAIText}
        >
          Generate Again
        </Button>
      </div>
      <div>
        <Button
          size="large"
          variant="outlined"
          color="error"
          sx={{ marginRight: 2 }}
          startIcon={<CloseIcon />}
          onClick={handleDiscard}
        >
          Discard
        </Button>
        <Button
          size="large"
          color="warning"
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}

export default BlogEditorFooter;
