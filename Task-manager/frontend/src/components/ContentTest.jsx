import React, { useState, useEffect } from "react";
import axios from "axios";
import Divider from "./Divider.jsx";
import CalendarIcon from "../assets/icons/CalendarIcon.jsx";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon.jsx";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon.jsx";
import AddTaskModal from "./AddTaskModal.jsx";
import AddSubTaskModal from "./AddSubTaskModal.jsx";
import AddMemberModal from "./AddMemberModal.jsx";
import RemoveMemberModal from "./RemoveMemberModal.jsx";
import TaskContent, { Task } from "./TaskContent.jsx";

const HeaderContent = ({
  project,
  setMembersButton,
  handleReload,
  membersButton,
  membersList,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-6xl ml-10">
        {project.name ? project.name : project}
      </div>
      <div className="mr-10">
        <button
          className="btn btn-xs bg-warning text-primary-content hover:bg-warning hover:text-primary-content items-center"
          onClick={() => {
            setMembersButton(!membersButton);
          }}
        >
          Members
        </button>
        {membersButton && (
          <div className="card gap-3 bg-base-300 -ml-10 w-32">
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

                <div className="w-32 overflow-hidden text-ellipsis whitespace-nowrap">
                  {member.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CurrentTaskContent = ({
  user,
  project,
  handleTaskSelection,
  currentTask,
  fetchTasks,
}) => {
  return (
    <>
      {currentTask && (
        <>
          <div className="card-content w-full flex flex-row">
            <textarea
              className="textarea w-full textarea-primary justify-end"
              placeholder="write a comment"
            ></textarea>
          </div>
        </>
      )}
    </>
  );
};

const ContentTest = ({ user, project }) => {
  const [taskList, setTaskList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [membersButton, setMembersButton] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

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
        const res = await axios.get(`http://localhost:3000/ouid/${member}`);
        temp.push(res.data);
      }

      setMembersList(temp);
    } catch (error) {
      console.error("Error fetching members data:", error);
    }
  };

  useEffect(() => {
    if (project._id) {
      fetchTasks();
      fetchMembersData();
      setCurrentTask();
    }
  }, [project]);

  const handleReload = async () => {
    await fetchMembersData();
  };

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

      <Divider />

      <AddTaskModal user={user} project={project} reload={fetchTasks} />

      <div className="mt-4 flex h-4/5 flex-row w-full">
        <div className="w-full">
          <TaskContent
            taskList={taskList}
            fetchTasks={fetchTasks}
            user={user}
            project={project}
            handleTaskSelection={handleTaskSelection}
          />
        </div>
        {currentTask && (
          <div className="card w-full  shadow-lg shadow-base-300 mr-2 ml-36 p-4">
            <CurrentTaskContent
              user={user}
              fetchTasks={fetchTasks}
              project={project}
              handleTaskSelection={handleTaskSelection}
              currentTask={currentTask}
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentTest;
