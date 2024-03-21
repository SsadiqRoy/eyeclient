const AppError = require('../utils/appError');
const { getRequest } = require('../utils/model');
const { catchAsync } = require('../utils/utils');

exports.protect = catchAsync(async (req, res, next) => {
  try {
    // console.log(req.cookies);

    const response = await getRequest(`${process.env.api_url}/users/login`, req);

    req.user = response.data;
    res.locals.user = response.data;

    next();
  } catch (error) {
    const message = error.message || error._message || 'No Error Message - protect middleware';
    const remedy = 'Please log in to get access';
    throw new AppError(message, 403, { remedy, isWebError: true });
  }
});
