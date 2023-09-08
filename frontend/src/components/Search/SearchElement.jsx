import React from "react";
import { Link } from "react-router-dom";
import "./Search.scss";
export const SearchElement = ({ document }) => {
  return (
    <Link to={`/document/${document.id}`}>
      <div className="search-element ">
        <h4>{document.title}</h4>

        <p>
          {document.tags.map((tag) => (
            <span style={{ marginInline: "2px" }}>{tag}</span>
          ))}
        </p>
      </div>
    </Link>
  );
};
