module.exports = {
  route: '/users/verify/:token',
  handler: async (req, res, next) => {
    try {
      const { token } = req.params;
      const userService = req.config.services.userService
      const { jwtVerificationSecret } = req.config;
    
      await userService.verify(token, jwtVerificationSecret);
    
      res.status(200).json({ message: "Email verified successfully! You can now log in." });
    } catch (error) {
      next(error)
    }
  }
};