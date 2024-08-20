import React, { useState, useEffect } from "react";

import TaskModal from "./TaskModal.jsx";
import TaskContent from "./TaskContent.jsx";
import CommentContent from "./CommentContent.jsx";
import HeaderContent from "./HeaderContent.jsx";
import { populateTaskList } from "../helpers/taskHelpers.js";
import { getUserByObjectID } from "../api/projectApi.js";
import { getTasksByProjectID } from "../api/taskApi.js";

const ProjectContent = ({ user, project }) => {
  const [taskList, setTaskList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [membersButton, setMembersButton] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const handleSetCommentsIsOpen = (e) => {
    setCommentsIsOpen(e);
  };

  const fetchTasks = async () => {
    try {
      // Fetch tasks for the selected project
      const responseData = await getTasksByProjectID(project._id);
      const populatedTasks = populateTaskList(responseData);
      setTaskList(populatedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchMembersData = async () => {
    try {
      const temp = [];

      for (const member of project.members) {
        const responseData = await getUserByObjectID(member);
        temp.push(responseData);
      }

      setMembersList(temp);
    } catch (error) {
      console.error("Error fetching members data:", error);
    }
  };

  const handleReload = async () => {
    await fetchMembersData();
    await fetchTasks();
    await fetchMembersData();
    setCurrentTask(null);
  };

  useEffect(() => {
    if (project._id) {
      handleReload();
    }
  }, [project]);

  const handleTaskSelection = (task) => {
    setCurrentTask(task);
  };

  return (
    <div className="flex flex-col w-full">
      <HeaderContent
        project={project}
        setMembersButton={setMembersButton}
        handleReload={handleReload}
        membersButton={membersButton}
        membersList={membersList}
      />

      <div className="divider"></div>

      <TaskModal user={user} project={project} reload={fetchTasks} type="add" />

      <div className="mt-4 flex h-4/5 flex-row w-full">
        <div className="w-full">
          <TaskContent
            taskList={taskList}
            fetchTasks={fetchTasks}
            user={user}
            project={project}
            handleTaskSelection={handleTaskSelection}
            handleSetCommentsIsOpen={handleSetCommentsIsOpen}
          />
        </div>
        {currentTask && commentsIsOpen && (
          <div className="card w-full shadow-lg shadow-base-300 mr-2 p-4">
            <CommentContent
              user={user}
              fetchTasks={fetchTasks}
              handleTaskSelection={handleTaskSelection}
              currentTask={currentTask}
              handleSetCommentsIsOpen={handleSetCommentsIsOpen}
              handleReload={handleReload}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContent;
