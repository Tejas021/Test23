import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
import "./Home.scss";
import GroupCard from "../../components/GroupCard/GroupCard";
const Home = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    console.log("teS");
    axios
      .get("http://localhost:8080/api/document/byemail/tejas.ko@media.net")
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log("teS");
    axios
      .get("http://localhost:8080/api/document/all")
      .then((res) => setAllData(res.data));
  }, []);
  return (
    <div className="container">
      {console.log(JSON.stringify(data))}

      {/* SEARCH */}
      <div className="search-form">
        <input className="search-bar" />
        <button className="btn search-button  bg-green text-dark">
          Search
        </button>
      </div>

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
        {data.slice(0, 8)?.map((document) => (
          <DocumentCard color={"bg-green"} document={document} />
        ))}
      </div>
      <Link to={"/all/shared"}>See all</Link>

      <h2 className="subtitle">Your Groups :</h2>
      <div className="document-card-container">
        {data.slice(0, 8)?.map((document) => (
          <GroupCard group={{ title: "test" }} />
        ))}
      </div>
      <Link to={"/all/shared"}>See all</Link>
    </div>
  );
};

export default Home;
