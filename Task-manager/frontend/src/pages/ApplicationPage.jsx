import React, { useState, useEffect } from "react";
import LeftMenu from "../components/LeftMenu.jsx";
import ProjectContent from "../components/ProjectContent.jsx";
import Divider from "../components/Divider.jsx";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { getProjectByObjectIds } from "../api/userApi.js";
import LeftProjectMenu from "../components/LeftProjectMenu.jsx";
import Logo from "../components/Logo.jsx";
import UserButton from "../components/UserButton.jsx";
import InboxContent from "../components/InboxContent.jsx";
import TodayContent from "../components/TodayContent.jsx";
import UpcomingContent from "../components/UpcomingContent.jsx";

const ApplicationPage = ({ user }) => {
  const [project, setProject] = useState("Inbox");
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
            return <InboxContent user={user} project={project} />;
          case "Today":
            return <TodayContent user={user} project={project} />;
          case "Upcoming":
            return <UpcomingContent user={user} project={project} />;
          case null:
            return <InboxContent />;
          case undefined:
            return <InboxContent />;
          default:
            return <ProjectContent user={user} project={project} />;
        }
      })()}
    </div>
  );
};

export default ApplicationPage;
