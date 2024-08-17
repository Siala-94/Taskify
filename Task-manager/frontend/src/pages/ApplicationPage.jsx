import React, { useState, useEffect } from "react";
import LeftMenu from "../components/LeftMenu.jsx";
import ContentTest from "../components/ContentTest.jsx";
import Divider from "../components/Divider.jsx";
import AddProjectModal from "../components/AddProjectModal.jsx";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getProjectByObjectIds } from "../api/userApi.js";
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
        <li className="justify-between" key={pl._id}>
          <div className="flex items-center">
            <div className="ml-2 flex-1">
              <AddSubProjectModal
                user={user}
                projectID={pl._id}
                reload={reload}
              />
              <RemoveProjectModal projectID={pl._id} reload={reload} />
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

const ApplicationPage = ({ user }) => {
  const [project, setProject] = useState("inbox");
  const [projectList, setProjectList] = useState([]);
  const navigate = useNavigate();

  const populateProjectList = (projects) => {
    const projectMap = new Map();

    projects.forEach((project) => {
      projectMap.set(project._id, { ...project, subProjects: [] });
    });

    projects.forEach((project) => {
      if (project.subProjects && project.subProjects.length > 0) {
        project.subProjects.forEach((subProjectId) => {
          if (projectMap.has(subProjectId)) {
            projectMap
              .get(project._id)
              .subProjects.push(projectMap.get(subProjectId));
          }
        });
      }
    });

    const nestedProjects = projects.filter(
      (project) => !projects.some((p) => p.subProjects.includes(project._id))
    );

    return nestedProjects.map((project) => projectMap.get(project._id));
  };

  const fetchProjects = async () => {
    if (!user || !user._id) return;

    try {
      const projectLists = await getProjectByObjectIds(user._id);

      const populatedList = populateProjectList(projectLists);
      setProjectList(populatedList);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const startLongPolling = () => {
    const poll = async () => {
      await fetchProjects(); // Fetch and update the project list
      setTimeout(poll, 5000); // Wait for 5 seconds before polling again
    };

    poll();
  };

  useEffect(() => {
    if (user) {
      startLongPolling(); // Start polling when user is available
    }
  }, [user]);

  const handleSetProject = (project) => {
    setProject(project);
  };

  const handleLinkClick = () => {
    setProject("inbox");
    auth ? navigate("/application") : navigate("/");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex">
      <div className="card rounded-none bg-base-300 h-screen w-60">
        <div className="navbar bg-base-300">
          <button
            className="btn flex hover:bg-base-100 items-center bg-base-300 border-base-300 text-primary text-3xl"
            onClick={handleLinkClick}
          >
            Taskify
          </button>
        </div>

        <div className="dropdown">
          <div tabIndex={0} role="button">
            <button className="btn bg-base-300 w-full border-base-300 hover:bg-base-100 flex items-center">
              <div className="avatar flex items-center">
                <div className="ring-base-100 ml-3 ring-offset-secondary h-6 w-6 rounded-full ring ring-offset-1">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="avatar"
                  />
                </div>
                <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap ml-2 w-2/5">
                  {user ? user.email : "Guest"}
                </p>
              </div>
            </button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <button onClick={handleSignOut}>Sign out</button>
            </li>
            <li>
              <button>Settings</button>
            </li>
          </ul>
        </div>

        <Divider />
        <LeftMenu handlerFunction={handleSetProject} />
        <ul className="menu bg-base-300 rounded-box w-45">
          <li>
            <details>
              <summary className="justify-items-start hover:bg-base-300">
                Projects
              </summary>
              <AddProjectModal user={user} reload={fetchProjects} />
              <Project
                user={user}
                project={projectList}
                handlerFunction={handleSetProject}
                reload={fetchProjects}
              />
            </details>
          </li>
        </ul>
      </div>

      <ContentTest user={user} project={project} />
    </div>
  );
};

export default ApplicationPage;
