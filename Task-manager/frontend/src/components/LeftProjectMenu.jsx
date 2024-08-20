import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";

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
        <li className="bg-base-300 hover:bg-base-300" key={pl._id}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center w-full">
              <ProjectModal
                user={user}
                projectID={pl._id}
                reload={reload}
                type="subproject"
              />
              <RemoveProjectModal projectID={pl._id} reload={reload} />

              <button
                className={`btn border  border-base-300 btn-sm bg-base-300 items-start justify-start cursor-pointer hover:bg-base-100  p-2 rounded flex-grow`}
                onClick={() => handlerFunction(pl)}
              >
                {pl.name}
              </button>
            </div>

            <button
              className="btn btn-xs bg-base-300 border border-base-300 hover:text-primary hover:border-base-300"
              onClick={() => handleToggle(pl._id)}
            >
              {expandedProjectId === pl._id ? (
                <ChevronDownIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </button>
          </div>

          {expandedProjectId === pl._id && pl.subProjects && (
            <div className="pl-4">
              <Project
                user={user}
                project={pl.subProjects}
                handlerFunction={handlerFunction}
                reload={reload}
                type="project"
              />
            </div>
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
  const [expandedProjectButton, setExpandedProjectButton] = useState(false);
  return (
    <div className="max-w-sm">
      <ProjectModal user={user} reload={fetchProjects} />
      <div className="flex pl-2 pt-2 flex-row justify-between w-full w-text-base">
        <span>Projects</span>
        <div
          className=" bg-base-300 pr-2  hover:bg-base-300 hover:text-primary hover:border-base-100"
          onClick={() => setExpandedProjectButton(!expandedProjectButton)}
        >
          {expandedProjectButton ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </div>
      </div>
      {expandedProjectButton && (
        <div className=" pt-2 w-full">
          <Project
            user={user}
            project={projectList}
            handlerFunction={handleSetProject}
            reload={fetchProjects}
          />
        </div>
      )}
    </div>
  );
};

export default LeftProjectMenu;
