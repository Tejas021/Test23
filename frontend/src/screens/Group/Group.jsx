import React, { useEffect, useState } from "react";
import "./Group.scss";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
import AddGroupForm from "../../components/AddGroupForm/AddGroupForm";
import Sidebar from "../../utils/SideBar/Sidebar";
import { useDispatch } from "react-redux";
import { setPath } from "../../redux/reducers/pathSlice";
import AddDocumentForm from "../../components/AddDocumentForm/AddDocumentForm";
const Group = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({});
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [docs, setDocs] = useState();
  const [newDirectory, setNewDirectory] = useState("");
  // const children = [
  //   { id: 6, name: "some", type: "directory" },
  //   { id: 4, name: "inner", type: "directory" },
  //   { id: 45, name: "file", type: "file" },
  // ];

  const state = useLocation().state;
  const dispatch = useDispatch();

  let path = "";
  if (state.path) {
    path = `${state.path}/${state.group.toc_name}`;
    dispatch(setPath(path));
  } else {
    path = state.group.toc_name;
  }
  // useEffect(() => {
  //   const path = state.path
  //     ? `${state.path}/${data?.toc_name}`
  //     : `${data?.toc_name}`;
  // });

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/api/group/${id}`)
  //     .then((res) => setGroupData(res.data))
  //     .catch((err) => console.log(err));
  // }, [id]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/api/docgroup/?groupId=${id}`)
  //     .then((res) => setDocs(res.data))
  //     .catch((err) => console.log(err));
  // }, [id]);

  const addFolderToTheDirectory = () => {
    axios.post("", { parentId: id, folderName: newDirectory });
  };

  return (
    <div className="container group-parent">
      {/* <div className="top-level-group-info">
        <h1>{groupData.title}</h1>
        <p>{groupData.description}</p>
      </div> */}

      {/* <div className="document-card-container">
        {docs?.slice(0, 8)?.map((document) => (
          <DocumentCard color={"bg-yellow"} document={document} />
        ))}
      </div> */}

      {/* <div className="toc">
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
      </div> */}
      <div className="group-sidebar">
        <Sidebar tocs={[state.group]} />
      </div>

      <div className="toc">
        <button
          className="btn bg-blue"
          onClick={() => setShowDocumentForm(!showDocumentForm)}
        >
          Add Documentation
        </button>
        <button
          className="btn bg-grey"
          onClick={() => setShowFolderForm(!showFolderForm)}
        >
          Add Folder
        </button>
        {showFolderForm && <AddGroupForm />}
        {showDocumentForm && <AddDocumentForm />}
        <div>{JSON.stringify(path)}</div>
        <h1 className="document-title">{state.group.toc_name}</h1>
        {state.group.subfolders.map((folder) => (
          <Link to={"/group/"} state={{ group: folder, path: path }}>
            {" "}
            <div className="directory">
              <p>{folder.toc_name}</p>
            </div>{" "}
          </Link>
        ))}
        {state.group.documents.map((folder) => (
          <Link
            to={`/document/${folder.document_id}`}
            state={{ group: folder }}
          >
            <div className="file">
              <p>{folder.document_name}</p>
            </div>{" "}
          </Link>
        ))}
      </div>
      {/* <Link to={"/all/all"}>See all</Link> */}
    </div>
  );
};

export default Group;
