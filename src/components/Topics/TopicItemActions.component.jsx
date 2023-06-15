import { Button } from "@mui/material";
import WriteModal from "../BlogEditor/WriteModal.component";
import DeleteIcon from "@mui/icons-material/Delete";

function TopicItemActions({ topic, deleteTopic }) {
  return (
    <div className="h-full flex flex-row">
      <WriteModal topic={topic} />
      <Button
        variant="outlined"
        color="error"
        className="h-full"
        onClick={() => deleteTopic(topic)}
        startIcon={<DeleteIcon />}
        disableElevation
      >
        Delete
      </Button>
    </div>
  );
}

export default TopicItemActions;
