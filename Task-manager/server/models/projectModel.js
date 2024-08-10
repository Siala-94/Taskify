import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    parentProject: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // For subprojects
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
