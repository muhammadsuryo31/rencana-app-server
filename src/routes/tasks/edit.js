module.exports = {
  route: '/tasks/:id',
  handler: async(req, res, next) => {
    try {
      const { id } = req.params;
      const taskService = req.config.services.taskService

      await taskService.edit({ body: {...req.body, id}, user: req.user, config: req.config });

      res.status(200).json({
        message: "task is successfully edited"
      });
    } catch (error) {
      next(error)
    }
  }
}