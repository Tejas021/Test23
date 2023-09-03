import React from "react";

import "./GroupCard.css";
import { Link } from "react-router-dom";
const GroupCard = ({ group }) => {
  return (
    <div className="group-card bg-blue">
      <Link to={`/group/${group.id}`}>
        <h3>{group.title}</h3>
      </Link>
    </div>
  );
};

export default GroupCard;
