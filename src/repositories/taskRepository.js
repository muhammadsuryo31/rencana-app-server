const moment = require("moment");
const mongoose = require("mongoose");

class TaskRepository{
  constructor(opts){
    this.TaskModel = opts.TaskModel;
  }

  async remove(ctx){
    try {
      const { body: {taskId}, user: { id } } = ctx;
      
      await this.TaskModel.deleteOne({ _id: taskId, userId: id });
    } catch (error) {
      console.log('error remove in taskRepository', error)

      throw new Error('error while removing task')
    }
  }

  async getOne(ctx){
    try {
      const { taskId, userId } = ctx;
      const task = await this.TaskModel.findOne({ _id: taskId, userId }).populate("categories", "title color");

      return task;
    } catch (error) {
      console.log('error in getOne taskRepository', error);

      throw new Error('error while getting task')
    }
  }

  async getAll(ctx){
    const { userId, queryParams } = ctx;
    const { task, priority, category } = queryParams;

    const today = moment().startOf("day").toDate();
    const tomorrow = moment().add(1, "day").startOf("day").toDate();

    let query = { userId, priority };

    if (category && category !== "all" && mongoose.Types.ObjectId.isValid(category)) {
      query.categories = category;
    }

    if (task === "today") {
      query.dueDate = { $gte: today, $lt: tomorrow };
    } else if (task === "upcoming") {
      query.dueDate = { $gte: tomorrow }; // Tasks due after today
    } else if (task === "overdue") {
      query.dueDate = { $lt: today }; // Tasks due before today (overdue)
    }

    try {
      const tasks = await this.TaskModel.find(query).select("title priority status")
      
      return tasks;
    } catch (error) {
      console.log('error in getAll taskRepository', error);

      throw new Error('error while getting tasks')
    }
  }

  async create(ctx){
    const { taskData } = ctx;
    
    try {
      await this.TaskModel.create(taskData);
      
    } catch (error) {
      console.log('error in create taskRepository', error);

      throw new Error('error while creating tasks');
    }
  }

  async edit(ctx){
    try {
      const { data, taskId, userId } = ctx;
      
      await this.TaskModel.findByIdAndUpdate(
        { _id: taskId, userId },
        { $set: {...data, updatedAt: Date.now()} }, 
        { runValidators: true }
      );;
    } catch (error) {
      console.log('error in edit taskRepository', error);

      throw new Error('error while editing tasks');
    }
  }
}

module.exports = TaskRepository;
