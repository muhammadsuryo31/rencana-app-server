module.exports = {
  route: '/tasks',
  handler: async(req, res, next) => {
    const { task, priority, category } = req.query
    try {
      const taskService = req.config.services.taskService
      const tasks = await taskService.getAll({ user: req.user, config: req.config, queryParams: { task, priority, category } })

      res.status(200).json({
        message: "tasks successfully queried",
        tasks
      });
    } catch (error) {
      next(error)
    }
  }
}