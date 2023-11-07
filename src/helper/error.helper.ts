/** @format */
import { ApiError } from '../types/error.type';

export default class ErrorHelper {
  static CreateErrorResponse(error: any): string {
    if (error.response) {
      const apiError = error.response.data as ApiError;
      const message = `${apiError.title}: ${apiError.details}`;
      return message;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return (error.request as XMLHttpRequest).statusText;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
}
