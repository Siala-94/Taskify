import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import Modal from "../atomic/Modal.jsx";
import TestModal from "../components/TestModal.jsx";

function Project({ project, projects, addProject }) {
  const [hover, setHover] = useState(false);

  const findProjectById = (id) => {
    return projects.find((proj) => proj.projectid === id);
  };

  return (
    <li>
      <details>
        <summary
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="justify-items-start"
        >
          {hover ? (
            <TestModal projectId={project.projectid} addProject={addProject} />
          ) : null}
          {project.projectname}
        </summary>
        {project.subprojects.length > 0 && (
          <ul>
            {project.subprojects.map((subprojectId) => {
              const subproject = findProjectById(subprojectId);
              return (
                <Project
                  key={subprojectId}
                  project={subproject}
                  projects={projects}
                  addProject={addProject}
                />
              );
            })}
          </ul>
        )}
      </details>
    </li>
  );
}

const CollapsableLeftMenu = () => {
  const [projects, setProjects] = useState([
    {
      projectid: 1,
      projectname: "project 1",
      subprojects: [3, 4],
    },
    {
      projectid: 2,
      projectname: "project 2",
      subprojects: [5],
    },
    {
      projectid: 3,
      projectname: "project 3",
      subprojects: [6],
    },
    {
      projectid: 4,
      projectname: "project 4",
      subprojects: [],
    },
    {
      projectid: 5,
      projectname: "project 5",
      subprojects: [7, 8],
    },
    {
      projectid: 6,
      projectname: "project 6",
      subprojects: [],
    },
    {
      projectid: 7,
      projectname: "project 7",
      subprojects: [],
    },
    {
      projectid: 8,
      projectname: "project 8",
      subprojects: [],
    },
  ]);

  const addProject = (parentId, projectName) => {
    const newProjectId = projects.length + 1;
    const newProject = {
      projectid: newProjectId,
      projectname: projectName,
      subprojects: [],
    };

    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject];
      const parentProject = updatedProjects.find(
        (proj) => proj.projectid === parentId
      );
      parentProject.subprojects.push(newProjectId);
      return updatedProjects;
    });
  };

  const getTopLevelProjects = (projects) => {
    const subprojectIds = new Set();
    projects.forEach((project) => {
      project.subprojects.forEach((id) => subprojectIds.add(id));
    });
    return projects.filter((project) => !subprojectIds.has(project.projectid));
  };

  return (
    <>
      <ul className="menu bg-base-300 rounded-box w-45">
        <li>
          <details>
            <summary className="justify-items-start">Favorites</summary>
          </details>
        </li>
        {getTopLevelProjects(projects).map((project) => (
          <Project
            key={project.projectid}
            project={project}
            projects={projects}
            addProject={addProject}
          />
        ))}
      </ul>
      <div className="border-l-2 border-base-100 ml-3 pl-4">s</div>
    </>
  );
};

export default CollapsableLeftMenu;
