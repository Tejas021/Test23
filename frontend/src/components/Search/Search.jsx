import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Search.scss";
import { SearchElement } from "./SearchElement";
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn search-button  bg-green text-dark"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
      {open && (
        <div className="search-relative bg-white">
          <button onClick={() => setOpen(false)} className="btn bg-red">
            close
          </button>
          <div className="search-results bg-white">
            {results.map((res) => (
              <SearchElement document={res} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
