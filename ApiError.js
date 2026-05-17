class ApiError extends Error{
    /** 
     * @param {number} statusCode errorCode HTTP status code
     * @param {string} message Error message 
     * @param {boolean} isOperation whether error whether expected (operational) or programmer error
     */
      constructor(statusCode, message, isOperational = true){
          super(message);
          this.statusCode = statusCode;
          this.isOperational = isOperational; 
          Error.captureStackTrace(this, this.constructor);
          
      }
}
module.exports = ApiError;