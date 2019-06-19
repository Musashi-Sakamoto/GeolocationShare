const createError = require('http-errors');
const Sequelize = require('sequelize');

const User = require('../models').user;
const Token = require('../models').token;
const { randomString, hashString } = require('../utils/stringUtil');
const { sendVerificationEmail } = require('../utils/sendEmail');

const { Op } = Sequelize;

const create = async (req, res, next) => {
  const {
    username,
    password,
    email
  } = req.body;

  if (username.trim().length === 0) {
    return next(new createError.BadRequest('Name not included.'));
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { username }
        ]
      }
    });
    if (user !== null) {
      return next(new createError.Conflict('User already exists.'));
    }
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return next(new createError.InternalServerError('DB Error [users create 1]'));
  }

  const hashedPassword = await hashString(password);

  let user;
  try {
    user = await User.create({
      username,
      email,
      password: hashedPassword
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error [users create 2]'));
  }

  try {
    const hashedString = await hashString(randomString(16));
    const verificationToken = await Token.create({
      user_id: user.id,
      token: hashedString
    });
    await sendVerificationEmail(user.email, verificationToken.token);
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return next(new createError.InternalServerError('DB Error [users create 3]'));
  }

  return res.status(201).json({
    user,
    password
  });
};

module.exports = {
  create
};
