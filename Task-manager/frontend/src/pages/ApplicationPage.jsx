import React from "react";
import LeftMenuTest from "./LeftMenuTest";
import Content from "./Content";
import Divider from "./Divider";
import CollapsableLeftMenu from "./CollapsableLeftMenu";
import Logo from "../atomic/Logo.jsx";
import ContentTest from "./ContentTest.jsx";

const ApplicationPage = () => {
  return (
    <div className="flex ">
      <div className="card bg-base-300  h-screen w-1/5">
        <Logo base="bg-base-300" />
        <LeftMenuTest />

        <CollapsableLeftMenu />
      </div>
      <div className="card flex-row w-full">
        <Content section={"inbox"} />
        <div className="bg-base-100 border-l border-primary w-2/4">
          <p className="text-center">something</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
