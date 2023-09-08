import React, { useEffect, useState } from "react";
import "./Group.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
import AddGroupForm from "../../components/AddGroupForm/AddGroupForm";
const Group = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [docs, setDocs] = useState();
  const [newDirectory, setNewDirectory] = useState("");
  const children = [
    { id: 6, name: "some", type: "directory" },
    { id: 4, name: "inner", type: "directory" },
    { id: 45, name: "file", type: "file" },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/group/${id}`)
      .then((res) => setGroupData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/docgroup/?groupId=${id}`)
      .then((res) => setDocs(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const addFolderToTheDirectory = () => {
    axios.post("", { parentId: id, folderName: newDirectory });
  };

  return (
    <div className="container group-parent">
      <div className="top-level-group-info">
        <h1>{groupData.title}</h1>
        <p>{groupData.description}</p>
      </div>

      {/* <div className="document-card-container">
        {docs?.slice(0, 8)?.map((document) => (
          <DocumentCard color={"bg-yellow"} document={document} />
        ))}
      </div> */}
      <button className="btn bg-blue">Add Documentation</button>
      <button className="btn bg-grey" onClick={() => setShowForm(!showForm)}>
        Add Folder
      </button>

      {showForm && <AddGroupForm />}
      <div className="toc">
        <h2>Table Of Content</h2>
        {children.map((child) => (
          <Link
            to={
              child.type === "directory"
                ? `/group/${child.id}`
                : `/document/${child.id}`
            }
          >
            <div className={child.type === "directory" ? "directory" : " file"}>
              <h3> {child.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* <Link to={"/all/all"}>See all</Link> */}
    </div>
  );
};

export default Group;
