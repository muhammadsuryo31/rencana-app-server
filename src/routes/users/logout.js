module.exports = {
  route: '/users/logout',
  handler: async (req, res, next) => {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.json({ message: "Logged out successfully" });
  }
};