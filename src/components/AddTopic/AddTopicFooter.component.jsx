import { Button } from "@mui/material";

function AddTopicFooter({ setIsAddTopicModalOpen, handleSave }) {
  return (
    <div className="flex w-100 justify-end mt-6">
      <Button
        size="large"
        variant="outlined"
        color="error"
        sx={{ marginRight: 2 }}
        onClick={() => setIsAddTopicModalOpen(false)}
      >
        Discard
      </Button>
      <Button
        size="large"
        color="warning"
        variant="contained"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
}

export default AddTopicFooter;
