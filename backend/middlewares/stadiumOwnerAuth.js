const JWTService = require('../services/JWTService');
const User = require('../models/userModel');
const UserDTO = require('../DTO/userDTO');

const stadiumOwnerAuth = async (req, res, next) => {
  try {
    // refresh, access token validation
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
      const error = {
        status: 401,
        message: 'Unauthorized',
      };

      return next(error);
    }

    // getting ID from access token
    let _id;

    try {
      _id = JWTService.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return next(error);
    }

    // finding user from db based on id and sending it with req to the controller
    let user;

    try {
      user = await User.findOne({ _id: _id });
    } catch (error) {
      return next(error);
    }

    const userDto = new UserDTO(user);

    // Check if the user is a stadium owner based on the isStadiumOwner flag
    if (!userDto.isStadiumOwner) {
      const error = {
        status: 403,
        message: 'Forbidden: Only stadium owners are allowed access.',
      };

      return next(error);
    }

    req.user = userDto;

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = stadiumOwnerAuth;
