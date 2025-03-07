const { HttpError } = require('../errors');

class TaskService{
  constructor(opts) {
    this.taskRepository = opts.taskRepository;
  }

  _validateData(data) {
    const allowedPriorities = ["low", "medium", "high"];
    if(!data.title){
      throw new Error('title cannot be empty');
    }
    if (!allowedPriorities.includes(data.priority)) {
      throw new Error(`Invalid priority`);
    }
    if(typeof data.status !== 'boolean'){
      throw new Error('invalid status')
    }
  }

  async remove(ctx){
    try {
      await this.taskRepository.remove(ctx);
    } catch (error) {
      console.log('error remove in taskService', error.message);

      throw new HttpError('fail removing task', 500);
    }
  }

  async getOne(ctx) {
    try {
      const task = await this.taskRepository.getOne({ taskId: ctx.task.id, userId: ctx.user.id })

      if(!task) throw new Error('Task not found');

      return task;
      
    } catch (error) {
      console.log('error in getOne taskService', error);

      if(error.message === 'Task not found'){
        throw new HttpError(error.message, 404);
      } else{
        throw new HttpError('fail to get task', 500)
      }
    }
  }

  async getAll(ctx) {
    try {
      const tasks = await this.taskRepository.getAll({
        userId: ctx.user.id,
        queryParams: ctx.queryParams
      }
    )

      return tasks;     
    } catch (error) {
      console.log('error in getAll taskService', error);

      throw new HttpError('fail to get task', 500)
    }
  }

  async edit(ctx){
    try {
      const {
        id,
        title,
        description,
        priority,
        dueDate,
        categories,
        status
      } = ctx.body
  
      const rawData = {
        title,
        description,
        priority,
        dueDate,
        categories,
        status
      };

      this._validateData(rawData);

      const taskData = {data: rawData, taskId: id, userId: ctx.user.id}; 

      await this.taskRepository.edit(taskData)
      
    } catch (error) {
      console.log('error in edit taskService', error);
      
      if(error.message === 'title cannot be empty' || error.message === 'Invalid priority' || error.message === 'invalid status'){
        throw new HttpError(`${error.message}`, 400);
      } else {
        throw new HttpError('error while editing task', 500);
      }
    }
  }

  async create(ctx) { 
    try {
      const {
        title,
        description,
        priority,
        dueDate,
        categories
      } = ctx.body
  
      const rawData = {
        title,
        description,
        priority,
        dueDate,
        status: false,
        categories
      };
  
      this._validateData(rawData);

      const taskData = {...rawData, userId: ctx.user.id};      

      await this.taskRepository.create({ taskData })
    } catch (error) {
      console.log('error in create taskService', error);
      
      if(error.message === 'title cannot be empty' || error.message === 'Invalid priority'){
        throw new HttpError(`${error.message}`, 400);
      }
    }
  }
}

module.exports = TaskService;
