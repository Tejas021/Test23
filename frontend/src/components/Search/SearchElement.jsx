import React from "react";
import { Link } from "react-router-dom";
import "./Search.scss";
export const SearchElement = ({ document }) => {
  return (
    <Link to={`/document/${document.id}`}>
      <div className="search-element bg-blue"> {document.title}</div>{" "}
    </Link>
  );
};
