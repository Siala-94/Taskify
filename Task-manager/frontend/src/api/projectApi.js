import axios from "axios";

const URL = "http://localhost:3000";

export const getUserByObjectID = async (objectID) => {
  try {
    const response = await axios.get(`http://localhost:3000/ouid/${objectID}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const getProjectByUserObjectId = async (objectID) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/project/get/${objectID}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};
