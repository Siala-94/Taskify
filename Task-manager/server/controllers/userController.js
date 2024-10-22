import User from "../models/userModel.js";

export const addUser = async (req, res) => {
  console.log("Incoming request to add user");
  const { firebaseUid, email, projectsIDs } = req.body;
  console.log("Request body:", req.body);

  try {
    const newUser = new User({ firebaseUid, email, projectsIDs });
    await newUser.save();
    console.log("Saved new user:", newUser);
    res.status(201).json(newUser); // Sending JSON response
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: error.message }); // Sending JSON error response
  }
};

export const getUserById = async (req, res) => {
  console.log("Request parameters:", req.params);
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }

  try {
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user); // Sending JSON response
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: error.message }); // Sending JSON error response
  }
};

export const getUserByOID = async (req, res) => {
  console.log("Request parameters:", req.params);
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }

  try {
    const user = await User.findOne({ _id: uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user); // Sending JSON response
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: error.message }); // Sending JSON error response
  }
};

export const getUserByEmail = async (req, res) => {
  console.log("Request parameters:", req.params);
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user); // Sending JSON response
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: error.message }); // Sending JSON error response
  }
};
