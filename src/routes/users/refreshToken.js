module.exports = {
  route: '/users/refresh-token',
  handler: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });
  
      const userService = req.config.services.userService
      const newToken = await userService.refreshToken(
        refreshToken,
        req.config.jwtRefreshSecret,
        req.config.jwtTokenLifeCycle,
        req.config.jwtSecret
      );
      
      res.cookie("accessToken", newToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: parseInt(req.config.jwtTokenLifeCycle, 10) * 60 * 1000
      });
      res.status(200).json({
        message: 'new access token created'
      })
    } catch (error) {
      next(error)
    }
  }
};