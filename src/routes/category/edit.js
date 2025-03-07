module.exports = {
  route: '/categories/:categoryId',
  handler: async(req, res, next) => {
    try {
      const { categoryId } = req.params;
      const categoryService = req.config.services.categoryService

      await categoryService.edit({ body: {...req.body, categoryId}, user: req.user, config: req.config });

      res.status(200).json({
        message: "category successfully edited"
      });
    } catch (error) {
      next(error)
    }
  }
}