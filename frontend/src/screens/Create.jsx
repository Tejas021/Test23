import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./Create.css";
import TagBubble from "../components/TagBubble";
const Create = () => {
  const user = { name: "tejas.ko" };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState({});
  const [accessLevel, setAccessLevel] = useState("private");
  const [selectedTags, setSelectedTags] = useState([]);

  const predefinedTags = ["update","new","flux","downgrade","deprecation"];

  const handleSaveDocument = () => {
    axios
      .post("http://localhost:8080/api/document", {
        title: title,
        tags: selectedTags,
        body: body,
        accessLevel: accessLevel,
        owner: user.name,
      })
      .then((res) => console.log(res.data));
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
    <div className="container create-container">
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
          modules={
            {
              toolbar: {  
                container: [  
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  
                  ['bold', 'italic', 'underline'],  
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],  
                  [{ 'align': [] }],  
                  ['link', 'image'],  
                  ['clean'],  
                  [{ 'color': [] }]  
                ]
              }
            }
          }
        />
      </div>

      <div className="create-right-section">
        <h3 className="subtitle">Add Tags:</h3>
        <div className="tag-selector-section">
      
      <h3>Select Tags:</h3>
            <select multiple value={selectedTags} onChange={handleTagSelection} className="select-tags">
              {predefinedTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
     

<div className="selected-tags">
{selectedTags?.map((tag) => (
            <TagBubble tag={tag}/>
          ))}
</div>

        </div>

        <h3 className="">Select Access Level:</h3>

    
          <select className="access-level" value={accessLevel} onChange={handleAccessLevelChange}>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>



          <h3 className="">Select Group:</h3> 

          <select className="access-level" value={accessLevel} onChange={handleAccessLevelChange}>
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
