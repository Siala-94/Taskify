import Divider from "./Divider";
import PlusIcon from "../assets/icons/PlusIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
import PriorityIcon from "../assets/icons/PriorityIcon";
import LabelIcon from "../assets/icons/LabelIcon";
import Folder from "../assets/icons/Folder";
import { useState } from "react";

function DropDownButton({ text, children }) {
  return (
    <div className="flex dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-neutral btn-xs ">
        {children}
        {text}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}

function TaskAdder(props) {
  return (
    <div
      className="card-rounded flex  w-96 flex-row hover:text-primary text-primary "
      onClick={props.onClick}
    >
      <PlusIcon />
      <span className="text-sm font-extralight ">add task</span>
    </div>
  );
}

function ExpandedTaskAdder(props) {
  const [inputVal, setInputVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");

  const handleClick = () => {
    props.handleSetTasks(inputVal, descriptionVal);
    props.onClick(false);
    setInputVal("");
    setDescriptionVal("");
  };

  return (
    <div className="card w-fit bg-base-200 gap-2">
      <form>
        <label className="input input-primary input-xs flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="text-sm grow"
            placeholder="Task name"
          />
        </label>
        <label className="input input-primary input-xs flex items-center gap-2">
          <input
            type="text"
            value={descriptionVal}
            onChange={(e) => setDescriptionVal(e.target.value)}
            className="text-sm grow"
            placeholder="Task description"
          />
        </label>
      </form>

      <div className="card-actions flex-wrap bg-base-200">
        <DropDownButton text="Due date">
          <CalendarIcon />
        </DropDownButton>
        <DropDownButton text="Priority">
          <PriorityIcon />
        </DropDownButton>
        <DropDownButton text="Filter">
          <LabelIcon />
        </DropDownButton>
        <DropDownButton text="Project">
          <Folder />
        </DropDownButton>
      </div>
      <button className="btn btn-primary btn-xs" onClick={handleClick}>
        <span className="text text-sx">add</span>
      </button>
      <button className="btn btn-neutral btn-xs" onClick={props.onClick}>
        cancel
      </button>
    </div>
  );
}
function Tasks({ tasks, setTasks }) {
  if (tasks.length === 0) {
    return <></>;
  }

  function handleChecked(taskId) {
    const updatedTaskList = tasks.filter((t) => t.id !== taskId);
    setTimeout(() => {
      setTasks(updatedTaskList);
    }, 400);
  }

  return (
    <div className="card w-96  p-2">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => handleChecked(task.id)}
                className="checkbox hover:checkbox-primary"
              />
              <div className="card">
                <span className="label-text">{task.name}</span>
                <span className="text font-thin text-sm">
                  {task.description}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionName(props) {
  return <h1 className="text-4xl font-bold">{props.name}</h1>;
}

export default function Content(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [tasks, setTasks] = useState([]);

  function handleSetTasks(taskName, taskDescription) {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      description: taskDescription,
      isChecked: false,
    };
    setTasks([...tasks, newTask]);
  }
  return (
    <>
      <div className="card mt-5 ml-5 flex flex-col gap-5  w-full items-stretch">
        <SectionName name={props.section} />
        <Tasks tasks={tasks} setTasks={setTasks} />

        {isPressed ? (
          <ExpandedTaskAdder
            handleSetTasks={handleSetTasks}
            onClick={() => setIsPressed(!isPressed)}
          />
        ) : (
          <TaskAdder onClick={() => setIsPressed(!isPressed)} />
        )}
      </div>
    </>
  );
}
