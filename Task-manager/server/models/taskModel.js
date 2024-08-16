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
    priority: { type: String, enum: ["p1", "p2", "p3", "p4"] },
    sections: { type: [String], required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    subTask: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    timeSpentOnTask: { type: Number, default: 0 }, // time in seconds
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
