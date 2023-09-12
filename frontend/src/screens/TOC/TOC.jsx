import React from "react";
import { useSelector } from "react-redux";

const TOCItem = ({ item, path, onItemClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderDocuments = () => {
    if (item.documents && item.documents.length > 0) {
      return (
        <ul>
          {item.documents.map((doc) => (
            <li key={doc.document_id}>{doc.document_name}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const renderSubfolders = () => {
    if (item.subfolders && item.subfolders.length > 0) {
      return (
        <ul>
          {item.subfolders.map((subfolder) => (
            <li key={subfolder.toc_id}>
              <TOCItem
                item={subfolder}
                path={path + " / " + subfolder.toc_name}
                onItemClick={onItemClick}
              />
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div>
      <div
        onClick={() => {
          toggleOpen();
          onItemClick(path + " / " + item.toc_name); // Trigger callback with updated path
        }}
        style={{ cursor: "pointer" }}
      >
        {item.toc_name}
        {item.subfolders && item.subfolders.length > 0 && (
          <span>{isOpen ? "-" : "+"}</span>
        )}
      </div>
      {isOpen && renderDocuments()}
      {isOpen && renderSubfolders()}
    </div>
  );
};

const TOC = () => {
  const tocData = useSelector((state) => state.toc.currentToc[0]);
  const [currentPath, setCurrentPath] = React.useState("");

  const handleItemClick = (path) => {
    setCurrentPath(path);
  };

  return (
    <div>
      <h1>Table of Contents</h1>
      <p>Current Path: {currentPath}</p>
      <TOCItem
        item={tocData}
        path={tocData.toc_name}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default TOC;
