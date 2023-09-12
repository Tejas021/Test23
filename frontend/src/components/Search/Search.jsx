import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Search.scss";
import { SearchElement } from "./SearchElement";
import { ImCross } from "react-icons/im";
export const Search = () => {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = () => {
    setOpen(true);
    axios
      .get(`http://localhost:8080/api/documentsearch/?query=${query}`)
      .then((res) => setResults(res.data));
  };

  useEffect(() => {
    !(query === "") && handleSearch();
  }, [query]);

  return (
    <div className="search-parent">
      <div className="search-form">
        <input
          className="search-bar"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn search-button  bg-grey text-dark"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
      {open && (
        <div style={{ position: "relative" }} className="search-box-parent">
          <div className="search-relative bg-white">
            <p onClick={() => setOpen(false)} className="close-btn">
              <ImCross />
            </p>

            <div className="search-results bg-white">
              {results.map((res) => (
                <SearchElement document={res} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
