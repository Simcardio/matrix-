const logger = require ('.../config/logger');
const ApiError = require('.../errors/ApiError');

/**
 * Centralized error handling middleware for Express.
 * Differentiates between operational errors and unexpected errors.
 */

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError){
        // Log expected (operational) errors as warnings
        logger.warn(`Operational error: ${err.message}`);
        return res.status(err.statusCode).json({error: err.message});
    }
    // Log unexpected errors as errors with stack trace
    logger.error('Unexpected error', err);
      // Send generic 500 Internal Server Error response
    res.status(500).json({error: 'Internal Server Error'});
};
  module.exports = errorHandler;