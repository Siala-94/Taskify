import React, { useState, useEffect } from "react";
import AddProjectModal from "./AddProjectModal";
import AddSubProjectModal from "../components/AddSubProjectModal.jsx";
import RemoveProjectModal from "../components/RemoveProjectModal.jsx";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon.jsx";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon.jsx";

const Project = ({ user, project, handlerFunction, reload }) => {
  if (!user) return null;

  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const handleToggle = (projectId) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  return (
    <ul>
      {project.map((pl) => (
        <li
          className="justify-between bg-base-300 hover:bg-base-100"
          key={pl._id}
        >
          <div className="flex ">
            <div className="flex w-9 flex-row">
              <AddSubProjectModal
                user={user}
                projectID={pl._id}
                reload={reload}
              />
              <RemoveProjectModal projectID={pl._id} reload={reload} />
            </div>

            <div className="flex w-4/5 items-center">
              <div className="ml-2 flex-1">
                <span
                  className="cursor-pointer p-2 rounded"
                  onClick={() => handlerFunction(pl)}
                >
                  {pl.name}
                </span>
              </div>
              <button
                className="btn btn-xs bg-base-300 border border-base-300  hover:text-primary hover:border-base-100"
                onClick={() => handleToggle(pl._id)}
              >
                {expandedProjectId === pl._id ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </button>
            </div>
          </div>

          {expandedProjectId === pl._id && pl.subProjects && (
            <Project
              user={user}
              project={pl.subProjects}
              handlerFunction={handlerFunction}
              reload={reload}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

const LeftProjectMenu = ({
  user,
  projectList,
  handleSetProject,
  fetchProjects,
}) => {
  return (
    <ul className="menu bg-base-300 rounded-box w-45">
      <li>
        <AddProjectModal user={user} reload={fetchProjects} />
        <details>
          <summary className=" justify-items-start ">Projects</summary>

          <Project
            user={user}
            project={projectList}
            handlerFunction={handleSetProject}
            reload={fetchProjects}
          />
        </details>
      </li>
    </ul>
  );
};

export default LeftProjectMenu;
