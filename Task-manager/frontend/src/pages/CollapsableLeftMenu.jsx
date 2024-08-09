import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import Modal from "../atomic/Modal.jsx";
import TestModal from "../components/TestModal.jsx";

function Project(props) {
  const [hover, setHover] = useState();
  return (
    <ul>
      <li>
        <details>
          <summary
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            className="justify-items-start"
          >
            {hover ? <TestModal hoverHandler={setHover} /> : <></>}

            {props.name}
          </summary>
          <ul>{props.children}</ul>
        </details>
      </li>
    </ul>
  );
}

const CollapsableLeftMenu = () => {
  const [projects, setProjects] = useState("");
  return (
    <>
      <ul className="menu bg-base-300  rounded-box w-45">
        <li>
          <details>
            <summary className="justify-items-start">Favorites</summary>
          </details>
        </li>
        <Project name="Projects" />
      </ul>
    </>
  );
};

export default CollapsableLeftMenu;
