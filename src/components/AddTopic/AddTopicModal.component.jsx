import { Box, Button, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRef, useState } from "react";
import useLocalStorage from "../../hooks/localStorage.hook";
import AddTopicFields from "./AddTopicFields.component";
import AddTopicFooter from "./AddTopicFooter.component";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  boxShadow: 24,
  minHeight: 360,
  p: 4,
};

function AddTopicModal({ setTabValue }) {
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  let [customTopics, saveCustomTopics] = useLocalStorage("custom_topics", "[]");
  customTopics = JSON.parse(customTopics);
  const topicNameRef = useRef(null);
  const keywordsRef = useRef(null);

  const handleSave = () => {
    const newCustomTopic = {
      id:
        customTopics.length !== 0
          ? customTopics[customTopics.length - 1].id + 1
          : 1,
      description: topicNameRef.current,
      tags: keywordsRef.current,
      category: "custom",
    };
    saveCustomTopics(JSON.stringify([...customTopics, newCustomTopic]));
    setTabValue(1);
    setIsAddTopicModalOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="warning"
        startIcon={<AddIcon />}
        className="h-100"
        size="medium"
        disableElevation
        onClick={() => setIsAddTopicModalOpen(true)}
      >
        Add Topic
      </Button>
      <Modal
        open={isAddTopicModalOpen}
        onClose={() => setIsAddTopicModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h1>Add a Topic</h1>
          <AddTopicFields
            topicNameRef={topicNameRef}
            keywordsRef={keywordsRef}
          />
          <AddTopicFooter
            setIsAddTopicModalOpen={setIsAddTopicModalOpen}
            handleSave={handleSave}
          />
        </Box>
      </Modal>
    </>
  );
}

export default AddTopicModal;
