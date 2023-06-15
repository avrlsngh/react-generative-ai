import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { LinearProgress } from "@mui/material";

import { openai } from "../../App";
import BlogEditorFooter from "./BlogEditorFooter.component";
import useLocalStorage from "../../hooks/localStorage.hook";

const storage = getStorage();

function BlogEditor({ topic, setIsEditModalOpen }) {
  const editorRef = useRef(null);
  const openAIAPI = openai;
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [generatedText, setGeneratedText] = useState(null);
  const [editorText, saveEditorText] = useLocalStorage(
    `${topic.category}_topic_${topic.id}_editor_text`,
    null
  );
  const [isGeneratedByAI, saveIsGeneratedByAI] = useLocalStorage(
    `${topic.category}_topic_${topic.id}_generated`,
    false
  );

  const generateAIText = useCallback(() => {
    setIsGeneratingText(true);
    openAIAPI
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `Tell me about ${topic.description}` },
        ],
      })
      .then((data) => {
        const openAIResponse = data.data.choices[0].message.content || "";
        setGeneratedText(openAIResponse);
        setIsGeneratingText(false);
        saveIsGeneratedByAI(true);
      })
      .catch((err) => {
        console.error("Error in Open AI API: ", err);
      });
  }, []);

  useEffect(() => {
    if (!isGeneratedByAI) generateAIText();
  }, [topic]);

  const log = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };

  const handleDiscard = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = () => {
    const editorContent = log();
    saveEditorText(editorContent);
    setIsEditModalOpen(false);
  };
  return (
    <>
      <LinearProgress
        sx={{
          display: isGeneratingText ? "flex" : "none",
        }}
      />
      {isGeneratingText ? (
        <div className="flex justify-center w-100 mt-2">
          <p className="text-sm text-gray-400">
            Generating your amazing blog with AI...
          </p>
        </div>
      ) : (
        <>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={
              generatedText === null && editorText === null
                ? `<h2>${topic.description}</h2>\n<p>Write your amazing blog...<p>`
                : generatedText === null
                ? editorText
                : generatedText
            }
            plugins={
              "advlist autolink lists link image charmap print preview anchor media imagetools preview"
            }
            toolbar="undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image"
            init={{
              menubar: false,
              images_upload_handler: (blobInfo, progress) =>
                new Promise((resolve, reject) => {
                  const storageRef = ref(storage, blobInfo.filename());
                  uploadBytes(storageRef, blobInfo.blob()).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((imageURL) => {
                      resolve(imageURL);
                    });
                  });
                }),
              branding: false,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            apiKey={process.env.REACT_APP_TINY_MCE_KEY}
            get
          />
          <BlogEditorFooter
            handleDiscard={handleDiscard}
            handleSave={handleSave}
            generateAIText={generateAIText}
          />
        </>
      )}
    </>
  );
}

export default BlogEditor;
