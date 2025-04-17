module.exports = {
  route: '/users/login',
  handler: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const {
        jwtSecret,
        jwtRefreshSecret,
        jwtTokenLifeCycle,
        jwtRefreshTokenLifeCycle,
        secureCookie
      } = req.config;
      
      const userService = req.config.services.userService
      const { accessToken, refreshToken } = await userService.login({
        email,
        password,
        jwtSecret,
        jwtRefreshSecret,
        jwtTokenLifeCycle,
        jwtRefreshTokenLifeCycle
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: "Strict",
        maxAge: parseInt(jwtRefreshTokenLifeCycle, 10) * 24 * 60 * 60 * 1000
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: "Strict",
        maxAge: parseInt(jwtTokenLifeCycle, 10) * 60 * 1000
      });

      res.status(200).json({
        message: "Login successful"
      });

    } catch (error) {
      next(error)
    }
  }
};