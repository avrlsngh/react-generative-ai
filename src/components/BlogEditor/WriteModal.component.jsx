import { lazy, useCallback, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import useLocalStorage from "../../hooks/localStorage.hook";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  minHeight: "480px",
  p: 4,
};

const BlogEditor = lazy(() => import("./BlogEditor.component"));

function WriteModal({ topic }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editorText] = useLocalStorage(
    `${topic.category}_topic_${topic.id}_editor_text`
  );

  const toggleModal = useCallback(() => {
    setIsEditModalOpen(!isEditModalOpen);
  }, []);
  return (
    <>
      <Button
        variant="contained"
        color="warning"
        className="h-full"
        sx={{
          marginRight: "0.5rem",
        }}
        onClick={() => setIsEditModalOpen(true)}
        startIcon={<CreateIcon />}
        disableElevation
      >
        {editorText === null ? "Write" : "Edit"}
      </Button>
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {isEditModalOpen && (
            <BlogEditor topic={topic} setIsEditModalOpen={setIsEditModalOpen} />
          )}
        </Box>
      </Modal>
    </>
  );
}

export default WriteModal;
