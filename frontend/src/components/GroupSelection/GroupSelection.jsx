import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const GroupSelection = ({ documentId }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setselectedGroup] = useState(null);
  const option = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/group/all")
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/docgroup/", {
        documentId,
        groupId: option.current.value,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <select
        ref={option}
        value={selectedGroup}
        onChange={(e) => {
          setselectedGroup(e.target.value);
          console.log(option.current.value);
        }}
      >
        {groups.map((g) => (
          <option id={g.title} value={g.id} name={g.title}>
            {g.title}
          </option>
        ))}
      </select>

      <button onClick={() => handleSubmit()}>Add</button>
    </div>
  );
};

export default GroupSelection;
