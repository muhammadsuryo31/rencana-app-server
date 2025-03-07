module.exports = {
  route: '/categories/:categoryId',
  handler: async(req, res, next) => {
    try {
      const { categoryId } = req.params;
      const categoryService = req.config.services.categoryService;

      await categoryService.remove({body: {categoryId}, user: {...req.user}, config: {...req.config}});

      res.status(200).json({
        message: "category is successfully removed"
      });
    } catch (error) {
      next(error)
    }
  }
}