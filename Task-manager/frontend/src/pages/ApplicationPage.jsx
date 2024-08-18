import React, { useState, useEffect } from "react";
import LeftMenu from "../components/LeftMenu.jsx";
import ContentTest from "../components/ContentTest.jsx";
import Divider from "../components/Divider.jsx";
import AddProjectModal from "../components/AddProjectModal.jsx";
import { auth } from "../firebase.js";

import { Link, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { getProjectByObjectIds } from "../api/userApi.js";
import AddSubProjectModal from "../components/AddSubProjectModal.jsx";
import RemoveProjectModal from "../components/RemoveProjectModal.jsx";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon.jsx";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon.jsx";
import LeftProjectMenu from "../components/LeftProjectMenu.jsx";
import Logo from "../components/Logo.jsx";
import UserButton from "../components/UserButton.jsx";
import InboxContent from "../components/InboxContent.jsx";
import TodayContent from "../components/TodayContent.jsx";
import UpcomingContent from "../components/UpcomingContent.jsx";

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
    setProject("Inbox");
    auth ? navigate("/application") : navigate("/");
  };

  return (
    <div className="flex">
      <div className="card rounded-none bg-base-300 h-screen w-60">
        <Logo handleLinkClick={handleLinkClick} />

        <UserButton user={user} />
        <Divider />
        <LeftMenu handlerFunction={handleSetProject} />
        <LeftProjectMenu
          user={user}
          fetchProjects={fetchProjects}
          handleSetProject={handleSetProject}
          projectList={projectList}
        />
      </div>

      {(() => {
        switch (project) {
          case "Inbox":
            return <InboxContent />;
          case "Today":
            return <TodayContent />;
          case "Upcoming":
            return <UpcomingContent />;
          case null:
            return <InboxContent />;
          case undefined:
            return <InboxContent />;
          default:
            return <ContentTest user={user} project={project} />;
        }
      })()}
    </div>
  );
};

export default ApplicationPage;
