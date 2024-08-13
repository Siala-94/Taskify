import React, { useState } from "react";
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

const ApplicationPage = ({ user }) => {
  const [project, setProject] = useState("");
  const navigate = useNavigate();

  const handleSetProject = (projectName) => {
    setProject(projectName);
  };

  const handleLinkClick = () => {
    setProject("inbox");
    auth ? navigate("/application") : navigate("/"); // Ensure it navigates to the application route
  };

  const handleSignOut = async (e) => {
    try {
      await signOut(auth);
      navigate("/"); // Navigate to the home page after signing out
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
        <Divider />
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

        <LeftMenu handlerFunction={handleSetProject} />
        <ul className="menu bg-base-300 rounded-box w-45">
          <AddProjectModal user={user} />
          <li>
            <details className="">
              <summary className="justify-items-start">Projects</summary>
              <ul>
                <li>{console.log(user.projects)}</li>
              </ul>
            </details>
          </li>
        </ul>
        <div className="flex mt-auto gap-3">
          <button onClick={handleSignOut}>Sign out</button>
          <button>Settings</button>
        </div>
      </div>
      <div className="card flex-row w-full">
        <Content section={project ? project : "inbox"} />
      </div>
    </div>
  );
};

export default ApplicationPage;
