module.exports = {
  route: '/categories',
  handler: async (req, res, next) => {
    try {
      
      const categoryService = req.config.services.categoryService;
      const categories = await categoryService.getAll({ user: req.user, config: req.config })
      
      res.status(200).json({
        message: "category successfully queried",
        categories
      });

    } catch (error) {
      next(error)
    }
  }
};
