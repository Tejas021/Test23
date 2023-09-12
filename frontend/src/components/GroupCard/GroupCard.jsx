import React from "react";

import "./GroupCard.css";
import { Link } from "react-router-dom";
const GroupCard = ({ group, setCurrentToc, path }) => {
  return (
    <div className="group-card bg-blue" onClick={() => setCurrentToc([group])}>
      <Link to={``}>
        <h3>{group.toc_name}</h3>
      </Link>
    </div>
  );
};

export default GroupCard;
