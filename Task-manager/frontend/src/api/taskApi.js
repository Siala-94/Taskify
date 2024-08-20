import axios from "axios";

const URL = "http://localhost:3000";

export const getTasksWithNoProject = async (userID) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/task/get/inbox/${userID}`
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const getTasksByProjectID = async (ProjectID) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/task/get/allTasks/${ProjectID}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const getTasksWithTodayDate = async (userID) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/task/get/tasksWithTodayDate/${userID}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const getTasksWithDate = async (userID) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/task/get/tasksWithDate/${userID}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const deleteTask = async (taskID) => {
  try {
    await axios.delete(`http://localhost:3000/task/delete/${taskID}`);
  } catch (error) {
    console.error(`Error deleting task ${taskID}:`, error);
  }
};

export const addComment = async (taskID, body) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/task/put/comment/${taskID}`,
      body
    );
    return res;
  } catch (error) {
    alert(error.message);
  }
};

export const addSubTask = async (taskID, body) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/task/add/${taskID}`,
      body
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const editTask = async (taskID, body) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/task/put/task/${taskID}`,
      body
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
