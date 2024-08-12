import React, { useState } from "react";
import LeftMenu from "../components/LeftMenu.jsx";
import Content from "../components/Content.jsx";
import Divider from "../components/Divider.jsx";
import CollapsableLeftMenu from "../components/CollapsableLeftMenu.jsx";
import Logo from "../atomic/Logo.jsx";
import ContentTest from "../components/ContentTest.jsx";
import Modal from "../atomic/Modal.jsx";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const ApplicationPage = ({ user }) => {
  const [project, setProject] = useState("");

  const handleSetProject = (projectName) => {
    setProject(projectName);
  };
  const handleSignOut = (e) => {
    try {
      signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="flex ">
        <div className="card rounded-none bg-base-300  h-screen w-1/5">
          <div className="navbar shadow-lg bg-base-300">
            <Link to="/" className=" text-primary text-3xl">
              Taskify
            </Link>
          </div>
          <div className="avatar items-center bg-primary">
            <div className="ring-base-100 ring-offset-secondary h-6 w-6 rounded-full m-4 ring ring-offset-1">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
            <p className="text-xs ">{user.reloadUserInfo.email}</p>
          </div>
          <LeftMenu handlerFunction={handleSetProject} />
          <ul className="menu bg-base-300 rounded-box w-45">
            <li>
              <details className="">
                <summary className="justify-items-start ">Projects</summary>
                <ul>
                  <li></li>
                </ul>
              </details>
            </li>
          </ul>
          <div className="flex mt-auto gap-3">
            <button onClick={handleSignOut}>sign out</button>
            <button>settings</button>
          </div>
        </div>
        <div className="card flex-row w-full">
          <Content section={project ? project : "inbox"} />
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
