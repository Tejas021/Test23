import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Gitlab.scss";
import axios from "axios";
export const Gitlab = ({ body, setBody }) => {
  const repos = [
    {
      projectId: 49044838,
      link: "https://gitlab.com/test8150136/documentation_management_project",
    },
  ];

  const [query, setQuery] = useState("");

  const [temp, setTemp] = useState("");
  const markdown = useRef();

  useEffect(() => {
    setBody(markdown.current.children[1].innerHTML);
  }, [temp]);

  function findProjectIdBranchAndFilePath(link, storedData) {
    let foundProjectId = null;
    let foundBranch = null;
    let filePath = null;

    for (const item of storedData) {
      if (link.startsWith(item.link)) {
        // Check if the given link starts with the stored link
        foundProjectId = item.projectId;

        // Extract the remaining part of the link after 'management_project/'
        const remainingLink = link.slice(item.link.length);

        // Split the remaining link into branch and filepath parts
        const parts = remainingLink.split("/blob/");

        if (parts.length === 2) {
          let foundBranchFile = parts[1].split("?")[0];
          foundBranch = foundBranchFile.split("/")[0];
          filePath = foundBranchFile.slice(foundBranch.length + 1);
        }
      }
    }

    return {
      projectId: foundProjectId,
      branch: foundBranch,
      filePath: filePath.replace(/\//g, "%2F"),
    };
  }

  const handleSubmit = () => {
    const { projectId, branch, filePath } = findProjectIdBranchAndFilePath(
      query,
      repos
    );
    axios
      .get(
        "https://gitlab.com/api/v4/projects/" +
          projectId +
          "/repository/files/" +
          filePath +
          "/raw/?ref=" +
          branch
      )
      .then((res) => setTemp(res.data))
      // .then(setBody(JSON.stringify(markdown.current.children[1])))

      .catch((err) => console.log(err));
  };

  return (
    <div className="gitlab-parent" ref={markdown}>
      <h3 className="create-subtitle">Import from Gitlab :</h3>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Gitlab link"
        className="googledocs-link"
      />

      <button onClick={() => handleSubmit()} className="btn bg-blue pop-button">
        Populate
      </button>
      <h3 className="create-subtitle">Preview:</h3>
      <div>
        <ReactMarkdown>{temp}</ReactMarkdown>
      </div>
    </div>
  );
};
