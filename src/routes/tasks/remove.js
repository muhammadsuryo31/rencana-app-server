module.exports = {
  route: '/tasks/:taskId',
  handler: async(req, res, next) => {
    try {
      const { taskId } = req.params;
      const taskService = req.config.services.taskService;

      await taskService.remove({body: {taskId}, user: {...req.user}, config: {...req.config}});

      res.status(200).json({
        message: "task is successfully removed"
      });
    } catch (error) {
      next(error)
    }
  }
}