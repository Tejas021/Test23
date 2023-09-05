import React, { useEffect, useState } from "react";
import "./Group.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
const Group = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({});
  const [docs, setDocs] = useState();
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

  return (
    <div className="container group-parent">
      <h1>{groupData.title}</h1>
      <p>{groupData.description}</p>
      <h3>Documents:</h3>
      <div className="document-card-container">
        {docs?.slice(0, 8)?.map((document) => (
          <DocumentCard color={"bg-yellow"} document={document} />
        ))}
      </div>
      {/* <Link to={"/all/all"}>See all</Link> */}
    </div>
  );
};

export default Group;
