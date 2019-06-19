const createError = require('http-errors');
const Comment = require('../models').comment;
const User = require('../models').user;

const list = async (req, res, next) => {
  const { thread_id } = req.params;
  const { limit, offset } = req.query;
  let comments;
  try {
    comments = await Comment.findAll({
      where: {
        thread_id
      },
      limit: Number(limit),
      offset: Number(offset),
      include: [{
        model: User
      }]
    });
  }
  catch (error) {
    return next(new createError.InternalServerError(500));
  }
  return res.status(200).json({
    comments
  });
};

module.exports = {
  list
};
