import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
  override handleError(error: any): void {
    alert(error);

    console.log(
      'This is from AppErrorHandler class that extends ErrorHandler',
      error
    );
  }
}
