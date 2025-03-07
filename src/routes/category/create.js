module.exports = {
  route: '/categories',
  handler: async(req, res, next) => {
    try {
      const categoryService = req.config.services.categoryService;
      const newCategory = await categoryService.create({body: req.body, user: req.user, config: req.config});

      res.status(201).json({
        message: "category is successfully made",
        newCategory
      });
    } catch (error) {
      next(error)
    }
  }
}