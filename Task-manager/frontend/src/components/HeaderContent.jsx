import React from "react";
import AddMemberModal from "./AddMemberModal.jsx";
import RemoveMemberModal from "./RemoveMemberModal.jsx";

const HeaderContent = ({
  project,
  setMembersButton,
  handleReload,
  membersButton,
  membersList,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-6xl ml-10">
        {project.name ? project.name : project}
      </div>
      <div className="mr-10">
        <button
          className="btn btn-xs bg-warning text-primary-content hover:bg-warning hover:text-primary-content items-center"
          onClick={() => {
            setMembersButton(!membersButton);
          }}
        >
          Members
        </button>
        {membersButton && (
          <div className="card gap-3 bg-base-300 -ml-10 w-32">
            <AddMemberModal
              project={project}
              reload={handleReload}
              eHandle={setMembersButton}
            />

            {membersList.map((member) => (
              <div key={member._id} className="flex flex-row">
                <RemoveMemberModal
                  projectID={project._id}
                  memberID={member._id}
                  reload={handleReload}
                  eHandle={setMembersButton}
                />

                <div className="w-32 overflow-hidden text-ellipsis whitespace-nowrap">
                  {member.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderContent;
