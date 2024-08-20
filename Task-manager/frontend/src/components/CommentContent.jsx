import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { getUserByObjectID } from "../api/projectApi";
import { addComment } from "../api/taskApi";

const CommentContent = ({
  user,
  project,
  handleTaskSelection,
  handleReload,
  handleSetCommentsIsOpen,
  currentTask,
  fetchTasks,
}) => {
  const [comment, setComment] = useState("");
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    if (currentTask) {
      // Fetch user names for all comments' createdBy
      const fetchUserNames = async () => {
        const userIds = currentTask.comments.map(
          (comment) => comment.createdBy
        );
        const uniqueUserIds = [...new Set(userIds)];

        const userNameMapping = {};
        await Promise.all(
          uniqueUserIds.map(async (uid) => {
            const responseData = await getUserByObjectID(uid);
            console.log(responseData);
            userNameMapping[uid] = responseData.email; //
          })
        );

        setUserNames(userNameMapping);
      };

      fetchUserNames();
    }
  }, [currentTask]);

  const handleXClick = () => {
    handleSetCommentsIsOpen(false);
  };

  const handleOnClick = async () => {
    const taskID = currentTask._id;
    const body = { comment: comment, user: user };
    const res = await addComment(taskID, body);
    handleReload();
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("YY-MM-DD HH:mm");
  };

  return (
    <>
      {currentTask && (
        <div className="card-content indicator w-full flex flex-col">
          <button
            className=" indicator-item indicator-start badge bg-base-100"
            onClick={handleXClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <div className="mt-7  items-start flex flex-col">
            <span className="font-bold"> {currentTask.name} </span>
            <span className="font-thin">{currentTask.description}</span>
            <div className="divider"></div>
            <div className="flex gap-7">
              {" "}
              <span className="font-extralight flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                {currentTask.dueDate &&
                  dayjs(currentTask.dueDate).format("YY-MM-DD")}
              </span>
              <span className="font-extralight">! {currentTask.priority}</span>
              <span>{console.log(currentTask)}</span>
            </div>
          </div>
          <textarea
            className="textarea textarea-primary mt-7 w-full justify-end"
            placeholder="write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex flex-row justify-end">
            <button
              className="btn btn-sm bg-primary mt-1 text-primary-content"
              onClick={handleOnClick}
            >
              comment
            </button>
          </div>
          <div className="h-1/2 overflow-y-auto border border-base-300">
            {[...currentTask.comments]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((s) => (
                <div
                  className="flex mt-4 flex-col hero items-start"
                  key={s._id}
                >
                  <span className="font-bold">
                    {userNames[s.createdBy] || "Loading..."}
                  </span>
                  <span className="font-thin">{formatDate(s.createdAt)}</span>
                  <span className="font-thin">{s.text}</span>
                  <div className="divider"></div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentContent;
