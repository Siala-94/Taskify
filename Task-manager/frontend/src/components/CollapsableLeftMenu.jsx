import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon.jsx";
import Modal from "../atomic/Modal.jsx";
import TestModal from "./TestModal.jsx";

const CollapsableLeftMenu = () => {
  return (
    <>
      <ul className="menu bg-base-300 rounded-box w-45">
        <li>
          <details>
            <summary className="justify-items-start">Projects</summary>
            {/* alla projects visas här med <ul><li> componenter*/}
          </details>
        </li>
      </ul>
    </>
  );
};

export default CollapsableLeftMenu;
