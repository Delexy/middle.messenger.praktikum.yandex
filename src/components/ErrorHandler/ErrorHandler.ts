class ErrorHandler {
  
  constructor(public message: string, public title?:string) {}

  show() {
    console.error(this.message);
  }

  returnErrorResponse() {
    return { status: 0, response: null, error: this.message }
  }
}

export default ErrorHandler;
