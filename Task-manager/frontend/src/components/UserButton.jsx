import { auth } from "../firebase.js";
import React from "react";
import { signUserOut } from "../api/authenticationApi.js";

const UserButton = ({ user }) => {
  const handleSignOut = async () => {
    await signUserOut();
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button">
        <button className="btn bg-base-300 w-full border-base-300 hover:bg-base-100 flex items-center">
          <div className="avatar flex items-center">
            <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap ml-2 w-4/5">
              {user ? user.email : ""}
            </p>
          </div>
        </button>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <button onClick={handleSignOut}>Sign out</button>
        </li>
        <li>
          <button>Settings</button>
        </li>
      </ul>
    </div>
  );
};
export default UserButton;
