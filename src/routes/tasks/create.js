module.exports = {
  route: '/tasks',
  handler: async (req, res, next) => {
    try {
      const taskService = req.config.services.taskService
      await taskService.create({ body: req.body, user: req.user, config: req.config })

      res.status(201).json({
        message: "task is successfully made"
      });

    } catch (error) {
      next(error)
    }
  }
}