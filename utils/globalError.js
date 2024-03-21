module.exports = function globalEror(error, req, res, next) {
  if (!error.isOperational) {
    console.log(error);
    error.message = 'Sorry Something went wrong on the server';
  }

  if (error.isWebError) return res.status(200).render('system/error', { error });

  res.status(200).json(error);
};
