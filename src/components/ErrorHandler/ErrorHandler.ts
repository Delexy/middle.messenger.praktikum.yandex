class ErrorHandler {
  
  constructor(public message: string, public title?:string) {}

  show() {
    console.log(this.message);
  }
}

export default ErrorHandler;
