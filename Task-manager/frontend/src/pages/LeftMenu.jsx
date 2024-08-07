import React, { useState } from "react";
import InboxIcon from "../assets/icons/InboxIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
import TodayIcon from "../assets/icons/TodayIcon";
import ForwardIcon from "../assets/icons/ForwardIcon";
import Divider from "./Divider";

function NavButton({ name, Icon, onClick, section }) {
  let color = name == section ? "bg-primary/10 text-primary" : "";
  console.log(color);

  return (
    <li onClick={onClick} className={`menu-item rounded box ${color}`}>
      <div className="flex items-center space-x-2">
        <Icon />
        <span>{name}</span>
      </div>
    </li>
  );
}

function CollapseNavButton({ name, children }) {
  return (
    <details className="collapse collapse-arrow hover:bg-base-100 bg-base-100">
      <summary className="collapse-title text-sm font-thin">{name}</summary>
      <div className="collapse-content">{children}</div>
    </details>
  );
}

export default function LeftMenu({ section, eHandler }) {
  return (
    <div className="card h-screen bg-base-100 ">
      <ul className="menu bg-base w-56">
        <NavButton
          name="Inbox"
          Icon={InboxIcon}
          onClick={() => eHandler("Inbox")}
          section={section}
        />
        <NavButton
          name="Today"
          Icon={TodayIcon}
          onClick={() => eHandler("Today")}
          section={section}
        />
        <NavButton
          name="Calendar"
          Icon={CalendarIcon}
          onClick={() => eHandler("Calendar")}
          section={section}
        />

        <Divider />
        <CollapseNavButton name="Projects">
          {/* Add nested project items here */}
        </CollapseNavButton>
        <CollapseNavButton name="Labels">
          {/* Add nested filter items here */}
        </CollapseNavButton>
      </ul>
    </div>
  );
}
