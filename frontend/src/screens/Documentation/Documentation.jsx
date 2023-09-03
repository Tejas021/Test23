import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Documentation.scss";
import TagBubble from "../../components/TagBubble/TagBubble";
import Axios from "axios";
import { useParams } from "react-router";
import GroupSelection from "../../components/GroupSelection/GroupSelection";
const Documentation = () => {
  const [doc, setDoc] = useState({
    id: 1,
    body: "loading please wait",
    title: "Loading",
    tags: ["wait"],
    accessLevel: "public",
    owner: "loading",
    createdAt: 1693320655000,
    updatedAt: 1693320655000,
  });

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/document/${id}`)
      .then((res) => setDoc(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container document-parent">
      <div className="document-left">
        <h1 className="document-title">{doc.title}</h1>
        <p className="timeago">Updated {moment(doc.updatedAt).fromNow()}</p>
        <div
          className="document-body"
          dangerouslySetInnerHTML={{ __html: doc.body }}
        />
      </div>
      <div className="document-right bg-blue">
        <h3 className="doc-sub">Tags :</h3>
        <div className="selected-tags ">
          {doc.tags?.map((tag) => (
            <TagBubble tag={tag} color={"bg-red"} />
          ))}
        </div>
        <h3 className="doc-sub">Created On :</h3>
        <p className="time info-val">{moment(doc.createdAt).format("LLL")}</p>
        <h3 className="doc-sub">Updated On :</h3>
        <p className="time info-val">{moment(doc.updatedAt).format("LLL")}</p>
        <h3 className="doc-sub">Owner :</h3>
        <p className="owner info-val">{doc.owner}</p>
        <h3 className="doc-sub">Access Level : </h3>
        <p className="access-level-disp info-val">{doc.accessLevel}</p>
        <p className="doc-sub">Add to a group</p>
        <GroupSelection documentId={doc.id} />
      </div>
    </div>
  );
};

export default Documentation;
