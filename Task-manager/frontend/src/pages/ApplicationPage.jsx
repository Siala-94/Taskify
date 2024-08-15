import React, { useState, useEffect } from "react";
import LeftMenu from "../components/LeftMenu.jsx";
import Content from "../components/Content.jsx";
import Divider from "../components/Divider.jsx";
import CollapsableLeftMenu from "../components/CollapsableLeftMenu.jsx";
import Logo from "../atomic/Logo.jsx";
import ContentTest from "../components/ContentTest.jsx";
import AddProjectModal from "../components/AddProjectModal.jsx";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import PlusIcon from "../assets/icons/PlusIcon.jsx";
import { getProjectByObjectIds } from "../api/userApi.js";
import AddSubProjectModal from "../components/AddSubProjectModal.jsx";
import RemoveProjectModal from "../components/RemoveProjectModal.jsx";
import EllipsisVertical from "../assets/icons/EllipsisVertical.jsx";

const Project = ({ user, project, handlerFunction, reload }) => {
  if (!user) return null; // Ensure user is defined
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ul>
      {project.map((pl) => (
        <li className=" justify-between" key={pl._id}>
          <details>
            <summary
              className="hover:bg-base-300"
              onClick={() => {
                handlerFunction(pl);
              }}
            >
              <div className="flex  ">
                <AddSubProjectModal
                  user={user}
                  projectID={pl._id}
                  reload={reload}
                />
                <RemoveProjectModal projectID={pl._id} reload={reload} />
              </div>

              {pl.name}
            </summary>
            {pl.subProjects && (
              <Project
                user={user}
                project={pl.subProjects}
                handlerFunction={handlerFunction}
              />
            )}
          </details>
        </li>
      ))}
    </ul>
  );
};

const ApplicationPage = ({ user }) => {
  const [project, setProject] = useState("");
  const [projectList, setProjectList] = useState([]);
  const navigate = useNavigate();

  const populateProjectList = (projects) => {
    const projectMap = new Map();

    projects.forEach((project) => {
      projectMap.set(project._id, { ...project, subProjects: [] });
    });

    const nestedProjects = [];

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

    projects.forEach((project) => {
      const isSubProject = projects.some((p) =>
        p.subProjects.includes(project._id)
      );
      if (!isSubProject) {
        nestedProjects.push(projectMap.get(project._id));
      }
    });

    return nestedProjects;
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

  useEffect(() => {
    fetchProjects();
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
      <div className="card rounded-none bg-base-300 h-screen w-1/5">
        <div className="navbar bg-base-300">
          <button
            className="btn flex hover:bg-base-100 items-center bg-base-300 border-base-300 text-primary text-3xl"
            onClick={handleLinkClick}
          >
            Taskify
          </button>
        </div>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="">
            <button className="btn bg-base-300 border-base-300 ml-2 mr-2 hover:bg-base-100 flex items-center">
              <div className="avatar flex items-center">
                <div className="ring-base-100 ring-offset-secondary h-6 w-6 rounded-full ring ring-offset-1">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="avatar"
                  />
                </div>
                <p className="text-xs ml-2">{user ? user.email : "Guest"}</p>
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
        <ul className="menu bg-base-300  rounded-box w-45">
          <li>
            <details className=" ">
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

      {/* <Content user={user} section={project ? project : "inbox"} /> */}
      <ContentTest user={user} project={project} />
    </div>
  );
};

export default ApplicationPage;
