import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    subProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // For subprojects
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);
export default Project;
