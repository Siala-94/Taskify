import React from "react";
import InboxIcon from "../assets/icons/InboxIcon";
import TodayIcon from "../assets/icons/TodayIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
const LeftMenuTest = () => {
  return (
    <ul className="menu bg-base-300 rounded-box w-56">
      <li>
        <InboxIcon />
      </li>
      <li>
        <TodayIcon />
      </li>
      <li>
        <CalendarIcon text="Calendar" />
      </li>
    </ul>
  );
};

export default LeftMenuTest;
