module.exports = {
  route: '/categories/:categoryId',
  handler: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const categoryService = req.config.services.categoryService;
      const category = await categoryService.getOne({ category: { categoryId }, user: req.user, config: req.config })
      
      res.status(200).json({
        message: "category successfully queried",
        category
      });

    } catch (error) {
      next(error)
    }
  }
};
