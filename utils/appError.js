class AppError extends Error {
  constructor(message, statusCode, options) {
    super(message);

    // this.message = message
    this._message = message;
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'failed' : 'error';
    this.code = options?.code;
    this.textCode = options?.textCode;
    this.url = options?.url;
    this.isOperational = true;
    this.isWebError = options?.isWebError || false;
    this.remedy = options?.remedy || '';

    Error.captureStackTrace(this, constructor);
  }
}

module.exports = AppError;
