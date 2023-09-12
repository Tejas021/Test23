import React, { useEffect, useState } from "react";
import GroupCard from "../../components/GroupCard/GroupCard";
import "./Groups.scss";
import AddGroupForm from "../../components/AddGroupForm/AddGroupForm";
import axios from "axios";
import Sidebar from "../../utils/SideBar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToc } from "../../redux/reducers/tocSlice";
const Groups = () => {
  const [groupToggle, setGroupToggle] = useState(false);
  const [groups, setGroups] = useState([]);
  const [currentToc, setCurrentToc] = useState([]);
  const path = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToc(null));
    axios
      .get("http://localhost:8080/api/toc/?tocId=0")
      .then((res) => setGroups(parseJsonArray(res.data)))
      .catch((err) => console.log(err));
  }, []);

  const parseJsonArray = (arrayOfStrings) => {
    return arrayOfStrings.map((arr) => JSON.parse(arr));
  };
  return (
    <div className="container">
      <button
        onClick={() => setGroupToggle(!groupToggle)}
        className="btn bg-red "
      >
        Add group
      </button>
      {groupToggle && <AddGroupForm />}

      <div className="groups-parent">
        <div className="group-sidebar">
          <h2>Overview:</h2>
          <Sidebar tocs={currentToc} />
        </div>

        <div className="group-container">
          <h2>Your Groups:</h2>
          {groups.map((group) => (
            <Link to="/group/" state={{ group, path }}>
              <div onClick={() => dispatch(setToc([group]))}>
                <GroupCard
                  group={group}
                  path={path}
                  setCurrentToc={setCurrentToc}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
