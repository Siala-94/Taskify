import React from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import Modal from "../atomic/Modal.jsx";
function Parent(props) {
  return (
    <>
      <details>
        <summary className="justify-items-end">{props.type}</summary>
        <ul>
          <li>
            <a>item 1</a>
          </li>
        </ul>
      </details>
    </>
  );
}
const CollapsableLeftMenu = () => {
  return (
    <>
      <ul className="menu bg-base-300  rounded-box w-45">
        <li>
          <Parent type="Favorites" addIcon={false} />
        </li>
        <li>
          <Parent type="Projects" addIcon={true} />
        </li>
      </ul>
    </>
  );
};

export default CollapsableLeftMenu;
