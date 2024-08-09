import React from "react";

const Task = () => {
  return (
    <>
      <div
        className="card flex flex-row items-start rounded"
        onClick={() => {}}
      >
        <div className="card-compact">
          <h4 className="card-title m-2 text-lg">
            {" "}
            <input type="checkbox" className="checkbox" /> task
          </h4>
          <p className="ml-10 text-xs">
            description and then sdjkbjka sdf sdkjf aakfsjk f{" "}
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <ModalTest />
    </>
  );
};

export default Task;
