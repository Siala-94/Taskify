import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

export const addProject = async (req, res) => {
  console.log("incoming request to add project");
  const { name, members, parentProject } = req.body;
  console.log("request body", req.body);

  try {
    const newProject = new Project({
      name,
      members,
    });

    const savedProject = await newProject.save();
    // Update each user in the members array
    await User.updateMany(
      { _id: { $in: members } }, // Find users whose _id is in the members array
      { $push: { projects: savedProject._id } } // Push the project _id to their projects array
    );
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeSubProjects = async (subProjectIds) => {
  for (const subProjectId of subProjectIds) {
    const subProject = await Project.findByIdAndDelete(subProjectId);

    if (subProject) {
      // Recursively remove subprojects
      if (subProject.subProjects && subProject.subProjects.length > 0) {
        await removeSubProjects(subProject.subProjects);
      }

      // Update each user in the members array to remove the subproject reference
      await User.updateMany(
        { _id: { $in: subProject.members } }, // Find users whose _id is in the members array
        { $pull: { projects: subProjectId } } // Remove the subproject _id from their projects array
      );
    }
  }
};

export const removeProject = async (req, res) => {
  console.log("incoming request to remove project");
  const { projectId } = req.params;
  console.log("request params", req.params);

  try {
    // Find the project to be removed
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove all subprojects recursively
    if (project.subProjects && project.subProjects.length > 0) {
      await removeSubProjects(project.subProjects);
    }

    // Remove the main project
    await Project.findByIdAndDelete(projectId);

    // Update each user in the members array to remove the project reference
    await User.updateMany(
      { _id: { $in: project.members } }, // Find users whose _id is in the members array
      { $pull: { projects: projectId } } // Remove the project _id from their projects array
    );

    res
      .status(200)
      .json({ message: "Project and its subprojects removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectByUserObjectId = async (req, res) => {
  console.log("Request parameters:", req.params);
  const { objectId } = req.params;
  if (!objectId) {
    return res.status(400).json({ error: "uid is required" });
  }

  try {
    const user = await Project.find({ members: objectId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user); // Sending JSON response
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: error.message }); // Sending JSON error response
  }
};

export const addSubProject = async (req, res) => {
  console.log("incoming request to add subproject");
  const { projectId } = req.params;
  const { name, members } = req.body;
  console.log("request body", req.body);

  try {
    // Create the new subproject
    const newSubProject = new Project({
      name,
      members,
    });

    const savedSubProject = await newSubProject.save();

    // Update the parent project to include the new subproject
    const parentProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { subProjects: savedSubProject._id } },
      { new: true } // Return the updated document
    );

    if (!parentProject) {
      return res.status(404).json({ message: "Parent project not found" });
    }

    // Update each user in the members array
    await User.updateMany(
      { _id: { $in: members } }, // Find users whose _id is in the members array
      { $push: { projects: savedSubProject._id } } // Push the subproject _id to their projects array
    );

    res.status(201).json({ parentProject, subProject: savedSubProject });
  } catch (error) {
    console.error("Error adding subproject:", error);
    res.status(500).json({ message: error.message });
  }
};
