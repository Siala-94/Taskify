import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskModal from "./AddTaskModal.jsx";
import TaskContent, { Task } from "./TaskContent.jsx";
import CommentContent from "./CommentContent.jsx";
import HeaderContent from "./HeaderContent.jsx";

const InboxContent = ({ user, project }) => {
  const [taskList, setTaskList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [membersButton, setMembersButton] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const handleSetCommentsIsOpen = (e) => {
    setCommentsIsOpen(e);
  };
  const populateTaskList = (tasks) => {
    const taskMap = new Map();

    tasks.forEach((task) => {
      taskMap.set(task._id, { ...task, subTasks: [] });
    });

    tasks.forEach((task) => {
      if (task.subTask && task.subTask.length > 0) {
        task.subTask.forEach((subTaskId) => {
          const subTask = taskMap.get(subTaskId);
          if (subTask) {
            taskMap.get(task._id).subTasks.push(subTask);
          }
        });
      }
    });

    const nestedTasks = tasks
      .filter(
        (task) => !tasks.some((t) => t.subTask && t.subTask.includes(task._id))
      )
      .map((task) => taskMap.get(task._id));

    return nestedTasks;
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/task/get/inbox/${user._id}`
      );

      const populatedTasks = populateTaskList(response.data);
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
        <div className="text-6xl ml-10">Inbox</div>
      </div>
      <div className="divider"></div>

      <AddTaskModal user={user} project={project} reload={fetchTasks} />

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

export default InboxContent;
