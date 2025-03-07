module.exports = {
  route: '/tasks/:id',
  handler: async (req, res, next) => {
    try {
      const { id } = req.params;
      const taskService = req.config.services.taskService
      const task = await taskService.getOne({ task: { id }, user: req.user, config: req.config })
      
      res.status(200).json({
        message: "task successfully queried",
        task
      });

    } catch (error) {
      next(error)
    }
  }
};
