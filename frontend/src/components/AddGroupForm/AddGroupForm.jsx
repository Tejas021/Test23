import React, { useState } from "react";
import "./AddGroupForm.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToc } from "../../redux/reducers/tocSlice";
const AddGroupForm = ({ folderPath }) => {
  const [groupData, setGroupData] = useState({ title: "", description: "" });

  const tocId = useSelector((state) => state.toc.currentToc[0].toc_id);
  const path = useSelector((state) => state.path.currentPath);
  const dispatch = useDispatch();
  const submitHandler = () => {
    axios
      .post(
        `http://localhost:8080/api/addFolderToToc/?tocId=${tocId}&folderName=${
          groupData.title
        }&folderPath=${removeRootPrefix(path)}`
      )
      .then((res) => dispatch(setToc([res.data])))
      .catch((err) => alert(err));
  };

  function removeRootPrefix(path) {
    const parts = path.split("/");
    if (parts.length > 1) {
      return parts.slice(1).join("/");
    }
    return path;
  }

  return (
    <div className="add-group-form">
      <h2>Add New Directory</h2>
      <input
        value={groupData.title}
        placeholder="Title"
        onChange={(e) => setGroupData({ ...groupData, title: e.target.value })}
      />

      <button onClick={() => submitHandler()} className="bg-green">
        Add
      </button>
    </div>
  );
};

export default AddGroupForm;
