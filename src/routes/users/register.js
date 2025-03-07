module.exports = {
  route: '/users/register',
  handler: async (req, res, next) => {
    try {
      const {
        email,
        firstName,
        lastName,
        password
      } = req.body
      const userService = req.config.services.userService
      const {
        jwtVerificationSecret,
        jwtVerificationTokenLifeCycle,
        emailApps,
        sendEmail,
        webAppBaseUrl
      } = req.config;
  
      await userService.register(
        {
          email,
          firstName,
          lastName,
          password,
          jwtVerificationSecret,
          jwtVerificationTokenLifeCycle,
          emailApps,
          sendEmail,
          webAppBaseUrl
        }
      );
      
      res.status(201).json({
        message: 'user successfully created'
      })
    } catch (error) {
      next(error)
    }
  }
};