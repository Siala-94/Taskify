import React from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import Input from "../molecular/Input.jsx";
import PriorityIcon from "../assets/icons/PriorityIcon.jsx";
import CalendarIcon from "../assets/icons/CalendarIcon.jsx";
import LabelIcon from "../assets/icons/LabelIcon.jsx";
import PersonIcon from "../assets/icons/PersonIcon.jsx";
import ModalButton from "./ModalButton.jsx";
import Button from "./Button.jsx";

function DropDown(props) {
  return (
    <div className="dropdown dropdown-top">
      <div tabIndex={0} role="button" className="btn bg-neutral m-1">
        {props.children}
        {props.text}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      ></ul>
    </div>
  );
}

const Modal = (props) => {
  return (
    <div>
      {/* The button to open modal */}
      <label
        htmlFor="my_modal_7"
        className="btn btn-xs border-base-100 bg-base-100 hover:text-primary hover:bg-base-100 justify-start ml-4 "
      >
        <PlusIcon />
        {props.text}
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <p className="py-4">Task name</p>
          <Input type="text" />
          <p>Task description</p>
          <Input type="text" />

          <DropDown text="date">
            {" "}
            <CalendarIcon />{" "}
          </DropDown>
          <DropDown text="label">
            {" "}
            <LabelIcon />
          </DropDown>
          <DropDown text="priority">
            {" "}
            <PriorityIcon />{" "}
          </DropDown>

          <DropDown text="assign">
            <PersonIcon />{" "}
          </DropDown>
          <div className="hero flex justify-end">
            <Button className="btn bg-base-100 ">cancel</Button>
            <button className="btn bg-base-100 ">cancel</button>
            <button className="btn bg-base-100  ml-6"> submit</button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default Modal;
