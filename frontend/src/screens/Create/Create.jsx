import React, { useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./Create.css";
import TagBubble from "../../components/TagBubble/TagBubble";

import { useSelector } from "react-redux";
import ReactQuillComponent from "../../components/ReactQuill/ReactQuillComponent";
import GoogleDocs from "../../components/GoogleDocs/GoogleDocs";
import { Gitlab } from "../../components/Gitlab/Gitlab";
const Create = () => {
  const user = useSelector((state) => state.auth.currentUser?.email);
  const [uploadType, setUploadType] = useState("quill");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [accessLevel, setAccessLevel] = useState("private");
  const [selectedTags, setSelectedTags] = useState([]);
  const predefinedTags = ["update", "new", "flux", "downgrade", "deprecation"];

  const resetState = () => {
    setTitle("");
    setBody();
    setAccessLevel("private");
    setSelectedTags([]);
  };

  const handleSaveDocument = () => {
    console.log(body);
    axios
      .post("http://localhost:8080/api/document", {
        title: title,
        tags: selectedTags,
        body: body,
        accessLevel: accessLevel,
        owner: user ? user : "anon",
      })
      .then((res) => resetState())
      .catch((err) => alert(err));
  };

  const handleAccessLevelChange = (event) => {
    setAccessLevel(event.target.value);
  };

  const handleTagSelection = (event) => {
    const selectedTag = event.target.value;
    if (selectedTags.includes(selectedTag)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== selectedTag));
    } else {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  return (
    <div className=" create-container homez">
      <div className="create-left-section">
        <h2 className="create-title">Create a New Documentation</h2>

        <h3 className="create-subtitle">Enter the title:</h3>

        <input
          className="title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h3 className="create-subtitle">Select Creation Method :</h3>
        <div className="tabs">
          <div
            className={`tab ${uploadType === "quill" ? "tab-active" : ""}`}
            onClick={() => setUploadType("quill")}
          >
            Write
          </div>
          <div
            className={`tab ${uploadType === "docs" ? "tab-active" : ""}`}
            onClick={() => setUploadType("docs")}
          >
            Google Docs
          </div>
          <div
            className={`tab ${uploadType === "gitlab" ? "tab-active" : ""}`}
            onClick={() => setUploadType("gitlab")}
          >
            Git Lab
          </div>
        </div>

        {/* <button
          className="btn bg-yellow toggleButton"
          onClick={() => setUploadType("quill")}
        >
          Write
        </button>
        <button
          className="btn bg-blue toggleButton"
          onClick={() => setUploadType("docs")}
        >
          GoogleDocs
        </button>
        <button
          className="btn bg-red toggleButton"
          onClick={() => setUploadType("gitlab")}
        >
          GitLab
        </button> */}

        {uploadType === "quill" ? (
          <ReactQuillComponent body={body} setBody={setBody} />
        ) : uploadType === "docs" ? (
          <GoogleDocs body={body} setBody={setBody} />
        ) : (
          <Gitlab body={body} setBody={setBody} />
        )}
      </div>

      <div className="create-right-section">
        <h3 className="create-subtitle">Add Tags:</h3>
        <div className="tag-selector-section bg-blue">
          <h3>Select Tags:</h3>
          <select
            multiple
            value={selectedTags}
            onChange={handleTagSelection}
            className="select-tags bg-grey"
          >
            {predefinedTags.map((tag) => (
              <option key={tag} value={tag} style={{ width: "50%" }}>
                {tag}
              </option>
            ))}
          </select>

          <div className="selected-tags ">
            {selectedTags?.map((tag) => (
              <TagBubble color={"bg-red"} tag={tag} />
            ))}
          </div>
        </div>

        <h3 className="">Select Access Level:</h3>

        <select
          className="access-level bg-grey"
          value={accessLevel}
          onChange={handleAccessLevelChange}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        {/* <h3 className="">Select Group:</h3>

        <select
          className="access-level bg-blue"
          value={accessLevel}
          onChange={handleAccessLevelChange}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select> */}

        <div className="button-section">
          <button
            className="btn save-btn bg-grey"
            onClick={() => handleSaveDocument()}
          >
            Save
          </button>
          <button
            className="btn publish-btn bg-blue"
            onClick={() => {
              console.log(document, body);
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
