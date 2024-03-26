/** @format */
import { ApiError } from '../types/error.type';
import { Alert } from '../types/passkey-tester.types';

export default class ErrorHelper {
  static CreateErrorResponse(error: any): string {
    if (error.response) {
      const apiError = error.response.data as ApiError;
      return `${apiError.title}: ${apiError.details}`;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error);
      return `${error.message}. Code: ${(error.request as XMLHttpRequest).status} Details: ${
        (error.request as XMLHttpRequest).statusText
      }`;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }

  static ShowErrorAlert(err: any, showAlert: (alert: Alert) => void): void {
    showAlert({
      show: true,
      type: 'danger',
      message: ErrorHelper.CreateErrorResponse(err),
    });
  }
}
