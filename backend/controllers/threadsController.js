const createError = require('http-errors');
const Thread = require('../models').thread;

const list = async (req, res, next) => {
  const { limit, offset } = req.query;

  let threads;
  try {
    threads = await Thread.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }
  catch (error) {
    return next(new createError.InternalServerError(500));
  }
  return res.status(200).json({
    threads: threads.rows,
    count: threads.count
  });
};

module.exports = {
  list
};
