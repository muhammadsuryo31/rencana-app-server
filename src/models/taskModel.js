const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    description: { type: String },
    status: { type: Boolean, default: false },
    priority: { type: String },
    dueDate: { type: Date, default: Date.now },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subtasks: [
      {
        title: { type: String },
        status: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
);

taskSchema.index({ userId: 1 });
taskSchema.index({ userId: 1, dueDate: 1, categories: 1, priority: 1 });

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;