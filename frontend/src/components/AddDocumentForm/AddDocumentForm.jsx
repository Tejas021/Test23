import React, { useEffect, useState } from "react";
import "./AddDocumentForm.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToc } from "../../redux/reducers/tocSlice";
const AddDocumentForm = () => {
  const [groupData, setGroupData] = useState({ title: "", description: "" });
  const [docs, setDocs] = useState([]);
  const tocId = useSelector((state) => state.toc.currentToc[0].toc_id);
  const path = useSelector((state) => state.path.currentPath);
  const dispatch = useDispatch();
  const submitHandler = () => {
    axios
      .post(
        `http://localhost:8080/api/toc/?tocId=${tocId}&documentId=${groupData}&folderPath=${removeRootPrefix(
          path
        )}`
      )
      .then((res) => dispatch(setToc([res.data])))
      .catch((err) => alert(err));
    console.log(groupData);
  };

  function removeRootPrefix(path) {
    const parts = path.split("/");
    if (parts.length > 1) {
      return parts.slice(1).join("/");
    }
    return path;
  }

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    user &&
      axios
        .get(`http://localhost:8080/api/document/byemail/${user.email}`)
        .then((res) => setDocs(res.data));
  }, [user]);

  return (
    <div className="add-group-form">
      <h2>Add Document</h2>

      <select onChange={(e) => setGroupData(e.target.value)}>
        {docs.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.title}
            {doc.id}
          </option>
        ))}
      </select>

      <button onClick={() => submitHandler()} className="bg-green">
        Add
      </button>
    </div>
  );
};

export default AddDocumentForm;
