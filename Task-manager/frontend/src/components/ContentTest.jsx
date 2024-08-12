import React from "react";
import Divider from "./Divider.jsx";
import Modal from "../atomic/Modal.jsx";
import TestModal from "./TestModal.jsx";

function Task(props) {
  return (
    <>
      <label htmlFor="my_modal_7">
        <h2>task</h2>
        <p>description</p>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
}

function ProjectContent(props) {
  return (
    <>
      <div className="flex-col w-4/5 border-neutral ">
        <h1 className="text-5xl text-left mt-3 mb-3 ml-3"> inbox</h1>
        <button className="btn btn-wide "> t</button>
        <div className="card flex-row">
          <TestModal />
        </div>
      </div>
    </>
  );
}

function TaskContent(props) {
  return (
    <>
      <div className="card bg-neutral  rounded w-3/5">
        <Divider text="section" />
        <Task
          name="task"
          description="testing out this task"
          labels={["new", "old"]}
          assigned
          to="Hassan"
        />
        <Task
          name="task"
          description="testing out this task"
          labels={["new", "old"]}
          assigned
          to="Hassan"
        />
        <Task
          name="task"
          description="testing out this task"
          labels={["new", "old"]}
          assigned
          to="Hassan"
        />
        <div className="card flex flex-row">
          <Modal text="add task" />
        </div>
        <Divider text="section" />
        <Task
          name="task"
          description="testing out this task"
          labels={["new", "old"]}
          assigned
          to="Hassan"
        />
        <Task
          name="task"
          description="testing out this task"
          labels={["new", "old"]}
          assigned
          to="Hassan"
        />
        <div className="card flex flex-row">
          <Modal text="add task" />
        </div>
      </div>
    </>
  );
}

const ContentTest = () => {
  return (
    <>
      <ProjectContent />

      <TaskContent taskID={[1, 2, 3]} />
    </>
  );
};

export default ContentTest;
