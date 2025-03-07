module.exports = {
  route: '/users',
  handler: (requestAnimationFrame, res, next) => {
    try {
      const userData = requestAnimationFrame.user;

      res.status(200).json({
        message: 'user data successfully queried',
        user: userData
      });

    } catch (error) {
      throw new HttpError('fail to get userData', 500);
    }
  }
}