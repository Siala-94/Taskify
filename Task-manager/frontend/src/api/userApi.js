import axios from "axios";

const URL = "http://localhost:3000";

export const getUserById = async (uid) => {
  try {
    const res = await axios.get(`${URL}/uid/${uid}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectByObjectIds = async (ObjectId) => {
  try {
    const response = await axios.get(`${URL}/project/get/${ObjectId}`);

    return response.data;
  } catch (error) {
    console.error;
  }
};
