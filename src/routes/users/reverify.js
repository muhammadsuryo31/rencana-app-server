module.exports = {
  route: '/users/reverify',
  handler: async (req, res, next) => {
    try {
      const userService = req.config.services.userService
      await userService.reverify({...req.body, ...req.config});
  
      res.status(200).json({ message: "Reverification link successfully sent to your email!" });
    } catch (error) {
      next(error)
    }
  }
};