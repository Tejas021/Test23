import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./GoogleDocs.scss";
const GoogleDocs = ({ body, setBody }) => {
  const [googleDocsLink, setGoogleDocsLink] = useState("");

  const oauthtoken = useSelector(
    (state) => state.auth.currentUser.access_token
  );
  const fetchDocument = () => {
    const docId = googleDocsLink.split("/")[5];

    console.log(docId, oauthtoken);
    axios
      .get(
        `http://localhost:8080/api/googleapi/?token=${oauthtoken}&documentId=${docId}`
      )
      .then((res) => {
        console.log(res.data);
        setBody(res.data);
      });
  };

  return (
    <div className="googledocs-body">
      <h3 className="create-subtitle">Preview:</h3>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
      <h3 className="create-subtitle">Import from google drive :</h3>
      <input
        className="googledocs-link"
        value={googleDocsLink}
        placeholder="Google Docs Link"
        onChange={(e) => setGoogleDocsLink(e.target.value)}
      />
      <button className="btn bg-blue" onClick={fetchDocument}>
        Populate
      </button>{" "}
    </div>
  );
};

export default GoogleDocs;
