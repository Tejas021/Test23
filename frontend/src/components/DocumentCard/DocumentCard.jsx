import React from "react";
import "./DocumentCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const DocumentCard = ({ document, color }) => {
  const user = useSelector((state) => state.auth.currentUser);
  console.log(user);
  return (
    <div
      className={`document-card ${
        user || document.accessLevel === "public" ? color : "bg-grey"
      }`}
    >
      <Link
        to={
          user || document.accessLevel === "public"
            ? `/document/${document.id}`
            : "/"
        }
      >
        <h4>{document.title}</h4>
        <p>{document.owner}</p>
      </Link>
    </div>
  );
};

export default DocumentCard;
