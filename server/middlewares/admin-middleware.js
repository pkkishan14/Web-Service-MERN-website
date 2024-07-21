const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user);
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin." });
    }
    // res.status(200).json({ msg: req.user });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
