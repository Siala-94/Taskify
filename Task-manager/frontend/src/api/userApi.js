import axios from "axios";

const URL = "http://localhost:3000";

export const getUserById = async (uid) => {
  try {
    const res = await axios.get(`${URL}/uid/${uid}`);

    const data = res.data;
    return data;
  } catch (error) {
    console.error("here", error);
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

export const saveUserToDB = async (uid, email) => {
  try {
    const res = await axios.post("http://localhost:3000/register/add", {
      firebaseUid: uid,
      email: email,
      projects: [],
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};
