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
