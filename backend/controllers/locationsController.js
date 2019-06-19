const createError = require('http-errors');
const Location = require('../models').location;
const User = require('../models').user;

const list = async (req, res, next) => {
  let locations;
  try {
    locations = await Location.findAll({
      include: [{
        model: User
      }]
    });
  }
  catch (error) {
    return next(new createError.InternalServerError(500));
  }
  return res.status(200).json({
    locations
  });
};

module.exports = {
  list
};
