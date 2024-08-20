import React, { useState, useEffect } from "react";
import axios from "axios";

import TaskContent, { Task } from "./TaskContent.jsx";
import CommentContent from "./CommentContent.jsx";

import { populateTaskList } from "../helpers/taskHelpers.js";
import { getTasksWithDate } from "../api/taskApi.js";

const UpcomingContent = ({ user, project }) => {
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
      const responseData = await getTasksWithDate(user._id);
      const populatedTasks = populateTaskList(responseData);
      setTaskList(populatedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleReload = async () => {
    await fetchTasks();
    setCurrentTask();
  };
  useEffect(() => {
    {
      handleReload();
    }
  }, []);

  const handleTaskSelection = (task) => {
    setCurrentTask(task);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="text-6xl ml-10">Upcoming</div>
      </div>
      <div className="divider"></div>

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

export default UpcomingContent;
