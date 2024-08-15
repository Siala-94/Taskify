import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["1", "2", "3", "4", "5"] },
    sections: { type: [String], required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    timeSpentOnTask: { type: Number, default: 0 }, // time in seconds
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
