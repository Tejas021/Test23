import React from "react";
import ReactQuill from "react-quill";
import "./ReactQuillComponent.scss";
const ReactQuillComponent = ({ body, setBody }) => {
  return (
    <>
      <h3 className="create-subtitle">Complete Writing : </h3>
      <ReactQuill
        className="body-input"
        theme="snow"
        value={body}
        onChange={setBody}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"],
              [{ color: [] }],
            ],
          },
        }}
      />
    </>
  );
};

export default ReactQuillComponent;
