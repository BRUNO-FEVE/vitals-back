/**
 * Standard API response format
 */
class ApiResponse {
  /**
   * Success response
   * @param {string} message - Success message
   * @param {*} data - Response data
   * @param {number} statusCode - HTTP status code
   * @returns {Object} Response object
   */
  static success(message = 'Success', data = {}, statusCode = 200) {
    return {
      success: true,
      message,
      data,
      statusCode
    };
  }

  /**
   * Error response
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {*} errors - Error details
   * @returns {Object} Response object
   */
  static error(message = 'Error', statusCode = 500, errors = null) {
    return {
      success: false,
      message,
      errors,
      statusCode
    };
  }
}

module.exports = ApiResponse;