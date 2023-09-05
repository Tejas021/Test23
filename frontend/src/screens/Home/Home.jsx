import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
import "./Home.scss";
import GroupCard from "../../components/GroupCard/GroupCard";
import { useSelector } from "react-redux";
import { Search } from "../../components/Search/Search";
const Home = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [groups, setGroups] = useState([]);
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    console.log("teS");
    user &&
      axios
        .get(`http://localhost:8080/api/document/byemail/${user.email}`)
        .then((res) => setData(res.data));
  }, [user]);

  useEffect(() => {
    console.log("teS");
    axios
      .get("http://localhost:8080/api/document/all")
      .then((res) => setAllData(res.data));
  }, []);

  useEffect(() => {
    console.log("teS");
    axios
      .get("http://localhost:8080/api/group/all")
      .then((res) => setGroups(res.data));
  }, []);

  return (
    <div className="container">
      {console.log(JSON.stringify(data))}

      {/* SEARCH */}
      <Search />

      <button className="btn bg-blue add-button text-dark">
        <Link className="link add-button" to="/create">
          + Add Document
        </Link>{" "}
      </button>

      <h2 className="subtitle">All Documents:</h2>
      <div className="document-card-container">
        {allData
          .filter((data) => data.accessLevel === "public")
          .slice(0, 8)
          ?.map((document) => (
            <DocumentCard color={"bg-yellow"} document={document} />
          ))}
      </div>
      <Link to={"/all/all"}>See all</Link>

      <h2 className="subtitle">Your Documentations:</h2>
      <div className="document-card-container">
        {user
          ? data
              .slice(0, 8)
              ?.map((document) => (
                <DocumentCard color={"bg-green"} document={document} />
              ))
          : "Login to see your documents"}
      </div>
      {user && <Link to={"/all/shared"}>See all</Link>}

      <h2 className="subtitle">Your Groups :</h2>
      <div className="document-card-container">
        {groups.slice(0, 8)?.map((group) => (
          <GroupCard group={group} />
        ))}
      </div>
      <Link to={"/groups"}>See all</Link>
    </div>
  );
};

export default Home;
