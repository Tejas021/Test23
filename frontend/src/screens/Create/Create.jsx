import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./Create.css";
import TagBubble from "../../components/TagBubble/TagBubble";

import { useDispatch, useSelector } from "react-redux";
const Create = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser.email);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState({});
  const [googleDocsLink, setGoogleDocsLink] = useState("");
  const [accessLevel, setAccessLevel] = useState("private");
  const [selectedTags, setSelectedTags] = useState([]);
  const [groupId, setGroupId] = useState({});
  const predefinedTags = ["update", "new", "flux", "downgrade", "deprecation"];
  const oauthtoken = useSelector(
    (state) => state.auth.currentUser.access_token
  );

  const resetState = () => {
    setTitle("");
    setBody("");
    setGoogleDocsLink("");
    setAccessLevel("private");
    setSelectedTags([]);
  };

  const fetchDocument = () => {
    const docId = googleDocsLink.split("/")[5];

    console.log(docId, oauthtoken);
    axios
      .get(
        `http://localhost:8080/api/googleapi/?token=${oauthtoken}&documentId=${docId}`
      )
      .then((res) => {
        setBody(extractPlainText(res.data));
        setTitle(res.data.title);
      });
  };

  const handleSaveDocument = () => {
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

  const extractPlainText = (document) => {
    let plainText = "";

    if (document.body && document.body.content) {
      document.body.content.forEach((content) => {
        if (content.paragraph && content.paragraph.elements) {
          content.paragraph.elements.forEach((element) => {
            if (element.textRun && element.textRun.content) {
              plainText += element.textRun.content;
            }
          });
        }
      });
    }

    return plainText;
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
    <div className="container create-container homez">
      <div className="create-left-section">
        <h2 className="create-title">Create a New Documentation</h2>

        <h3>Enter the title:</h3>

        <input
          className="title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h3>Complete Writing : </h3>

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

        <h3 className="">Import from google drive :</h3>
        <input
          className="googledocs-link"
          value={googleDocsLink}
          onChange={(e) => setGoogleDocsLink(e.target.value)}
        />
        <button className="btn bg-blue" onClick={fetchDocument}>
          Populate
        </button>
      </div>

      <div className="create-right-section">
        <h3 className="subtitle">Add Tags:</h3>
        <div className="tag-selector-section bg-blue">
          <h3>Select Tags:</h3>
          <select
            multiple
            value={selectedTags}
            onChange={handleTagSelection}
            className="select-tags bg-red"
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
          className="access-level bg-red"
          value={accessLevel}
          onChange={handleAccessLevelChange}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <h3 className="">Select Group:</h3>

        <select
          className="access-level bg-yellow"
          value={accessLevel}
          onChange={handleAccessLevelChange}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <div className="button-section">
          <button
            className="btn save-btn bg-yellow"
            onClick={() => handleSaveDocument()}
          >
            Save
          </button>
          <button
            className="btn publish-btn bg-green"
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
