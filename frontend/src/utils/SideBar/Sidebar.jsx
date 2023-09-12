import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../../redux/reducers/pathSlice";

function Folder({ folder, currentPath }) {
  const dispatch = useDispatch();
  const path = currentPath
    ? `${currentPath}/${folder.toc_name}`
    : folder.toc_name;

  const handleFolderClick = () => {
    console.log(path);
    dispatch(setPath(path));
  };

  return (
    <div className="folder">
      <h5 onClick={handleFolderClick}>{folder.toc_name}</h5>
      {folder?.subfolders?.map((subfolder, index) => (
        <Link to={"/group"} state={{ group: subfolder, path: path }}>
          <Folder
            key={index}
            folder={subfolder}
            currentPath={path}
            //   onFolderClick={onFolderClick}
          />
        </Link>
      ))}
      {folder.documents?.map((file, index) => (
        <div key={index} className="file">
          <p>
            <Link to={`/document/${file.document_id}`}>
              {file.document_name}
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

const Sidebar = ({ tocs }) => {
  const tocss = useSelector((state) => state.toc.currentToc);
  return (
    <div className="sidebar-page">
      {/* {JSON.stringify(tocss)} */}
      {tocss?.map(
        (toc) => (
          <Folder folder={toc} currentPath="" />
        )
        // console.log(toc)
      )}
    </div>
  );
};

export default Sidebar;
