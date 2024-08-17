import React, { useState, useEffect } from "react";
import axios from "axios";
import Divider from "./Divider.jsx";
import CalendarIcon from "../assets/icons/CalendarIcon.jsx";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon.jsx";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon.jsx";
import AddTaskModal from "./AddTaskModal.jsx";
import AddSubTaskModal from "./AddSubTaskModal.jsx";
import AddMemberModal from "./AddMemberModal.jsx";
import TrashIcon from "../assets/icons/TrashIcon.jsx";
import RemoveMemberModal from "./RemoveMemberModal.jsx";

const Task = ({ task, reload, user, project }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}:${month}:${day}`;
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/task/delete/${task._id}`);
      console.log(`Task ${task._id} deleted successfully`);
      reload();
    } catch (error) {
      console.error(`Error deleting task ${task._id}:`, error);
    }
  };

  return (
    <li>
      <div className="ml-5 mr-10 flex justify-">
        <div className="flex bg-base-300/20 flex-row items-center border rounded-full border-neutral mt-2">
          <AddSubTaskModal
            user={user}
            project={project}
            reload={reload}
            parentTaskID={task._id}
          />
          <button
            className="btn btn-xs bg-base-100 border border-base-100 hover:bg-base-100 hover:text-primary hover:border-base-100"
            onClick={handleToggle}
          >
            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </button>
          <button className="flex mt-2">
            <input
              className="checkbox ml-2"
              type="checkbox"
              onChange={handleDelete}
            />
          </button>
          <div className="flex flex-col ml-2">
            <span>{task.name}</span>
            <span className="text-xs w-36 overflow-hidden text-ellipsis whitespace-nowrap">
              {task.description}
            </span>
          </div>
          <div className="flex flex-row ml-10">
            <span className="badge text-xs flex items-center">
              <CalendarIcon />
              <span className="ml-1">{formatDate(task.dueDate)}</span>
            </span>
            <span className="badge text-xs ml-2">{task.assignedTo}</span>
            <span className="badge text-xs ml-2">{task.priority}</span>
          </div>
        </div>
      </div>

      {isOpen && task.subTask && task.subTask.length > 0 && (
        <ul className="ml-6">
          {task.subTasks.map((subtask) => (
            <Task
              key={subtask._id}
              task={subtask}
              reload={reload}
              user={user}
              project={project}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const ContentTest = ({ user, project, reloadProject }) => {
  const [taskList, setTaskList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [membersButton, setMembersButton] = useState(false);

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
        `http://localhost:3000/task/get/allTasks/${project._id}`
      );

      const populatedTasks = populateTaskList(response.data);
      setTaskList(populatedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchMembersData = async () => {
    try {
      const temp = [];

      for (const member of project.members) {
        console.log("Fetching data for member ID:", member);
        const res = await axios.get(`http://localhost:3000/ouid/${member}`);
        console.log("Data received for member:", res.data);
        temp.push(res.data);
      }

      setMembersList(temp);
      console.log("Final members list:", temp); // Check what members are being set
    } catch (error) {
      console.error("Error fetching members data:", error);
    }
  };

  useEffect(() => {
    if (project._id) {
      fetchTasks();
      fetchMembersData();
    }
  }, [project]);

  const handleReload = async () => {
    console.log("Reloading members...");
    await fetchMembersData();
    console.log("Members reloaded:", membersList);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="text-6xl ml-10">
          {project.name ? project.name : project}
        </div>
        <div className="mr-10">
          <button
            className="btn btn-xs items-center"
            onClick={() => {
              setMembersButton(!membersButton);
            }}
          >
            members
          </button>
          {membersButton && (
            <div className=" bg-base-300 -ml-10  w-32">
              <AddMemberModal
                project={project}
                reload={handleReload}
                eHandle={setMembersButton}
              />

              {membersList.map((member) => (
                <div key={member._id} className="flex flex-row">
                  <RemoveMemberModal
                    projectID={project._id}
                    memberID={member._id}
                    reload={handleReload}
                    eHandle={setMembersButton}
                  />

                  <div className=" w-32 overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.email}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Divider />

      <div className="w-1/3">
        <AddTaskModal user={user} project={project} reload={fetchTasks} />
      </div>

      <div className="mt-4 w-full">
        <ul>
          {taskList.map((task) => (
            <Task
              key={task._id}
              task={task}
              reload={fetchTasks}
              user={user}
              project={project}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentTest;
