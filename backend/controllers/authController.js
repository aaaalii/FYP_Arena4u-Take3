const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWTService = require("../services/JWTService");
const UserDTO = require("../DTO/userDTO");
const RefreshToken = require("../models/token");
const Joi = require('joi');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const phoneNumberPattern = /^[0-9]{1,11}$/;

async function signup(req, res, next) {

  const userRegisterationSchema = Joi.object({
    username: Joi.string().max(30).required(),
    phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
    password: Joi.string().pattern(passwordPattern).required(),
    isStadiumOwner: Joi.string()
  });
  const { error } = userRegisterationSchema.validate(req.body);

  // 2. if error in validation -> return error via middleware
  if (error) {
    return next(error);
  }
  const { username, password, phoneNumber, isStadiumOwner } = req.body;

  // 3. if email or username is already registered -> return an error
  try {
    const usernameInUse = await User.exists({ username });

    if (usernameInUse) {
      const error = {
        status: 409,
        message: "Username not available, choose another username!",
      };

      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  // 4. password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  let accessToken, refreshToken, user;

  try {
    const userToRegister = new User({
      username,
      phoneNumber,
      isStadiumOwner: isStadiumOwner === "on", // 'on' when checkbox is checked,
      password: hashedPassword,
    });

    user = await userToRegister.save();

    // generating tokens, we are using ID as a payload to generate token, so during verifying we can get this ID.
    accessToken = JWTService.assignAccessToken({ _id: user._id, isStadiumOwner: user.isStadiumOwner }, "30m");

    refreshToken = JWTService.assignRefreshToken({ _id: user._id, isStadiumOwner: user.isStadiumOwner }, "60m");
  } catch (error) {
    return next(error);
  }

  // store refresh token in db
  await JWTService.storeRefreshToken(refreshToken, user._id);

  // send tokens in cookies
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  // sending response, using DTO (Data transfer object) to secure user data
  const userDTO = new UserDTO(user);

  return res.status(201).json({ user: userDTO, auth: true });

  
}

async function login(req, res, next) {

  const userRegisterationSchema = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().pattern(passwordPattern).required(),
  });
  const { error } = userRegisterationSchema.validate(req.body);

  // 2. if error in validation -> return error via middleware
  if (error) {
    return next(error);
  }

  const { username, password } = req.body;

  // const username = req.body.username
  // const password = req.body.password

  let user;

  try {
    // match username
    user = await User.findOne({ username: username });

    if (!user) {
      const error = {
        status: 401,
        message: "Invalid username",
      };

      return next(error);
    }

    // match password
    // req.body.password -> hash -> match

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error = {
        status: 401,
        message: "Invalid password",
      };

      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  const accessToken = JWTService.assignAccessToken({ _id: user._id }, "30m");
  const refreshToken = JWTService.assignRefreshToken({ _id: user._id }, "60m");

  // update refresh token in database
  try {
    await RefreshToken.updateOne(
      {
        _id: user._id,
      },
      { token: refreshToken },
      { upsert: true } // upsert: true, if already exist then update, else create new
    );
  } catch (error) {
    return next(error);
  }

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24, // One day
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  const userDto = new UserDTO(user);

  return res.status(200).json({ user: userDto, auth: true });
}

async function logout(req, res, next){

  console.log(req.user);

  // delete refresh token from db
  const {refreshToken} = req.cookies;

  try {
    await RefreshToken.deleteOne({ token: refreshToken });
  } catch (error) {
    return next(error);
  }

  // delete cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  // response
  res.status(200).json({ user: null, auth: false });
}

module.exports = { signup, login, logout };
