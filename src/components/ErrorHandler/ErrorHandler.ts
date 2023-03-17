class ErrorHandler {
  public message: string;
  public title?: string;
  
  constructor(message: string, title: string) {
    this.message = message;
    this.title = title;
  }

  show() {
    console.error(this.message);
  }

  returnErrorResponse() {
    return { status: 0, response: null, error: this.message }
  }
}

export default ErrorHandler;
