import React, { useState } from "react";
import "./AddGroupForm.scss";
import axios from "axios";
const AddGroupForm = () => {
  const [groupData, setGroupData] = useState({ title: "", description: "" });

  const submitHandler = () => {
    axios
      .post("http://localhost:8080/api/group/", groupData)
      .then((res) => console.log(res.data))
      .catch((err) => alert(err));
  };

  return (
    <div className="add-group-form">
      <h2>Add New Directory</h2>
      <input
        value={groupData.title}
        placeholder="Title"
        onChange={(e) => setGroupData({ ...groupData, title: e.target.value })}
      />
      <input
        value={groupData.description}
        placeholder="Description"
        onChange={(e) =>
          setGroupData({ ...groupData, description: e.target.value })
        }
      />
      <button onClick={() => submitHandler()} className="bg-green">
        Add
      </button>
    </div>
  );
};

export default AddGroupForm;
