import ErrorHandler from "../components/ErrorHandler/ErrorHandler";
import BaseAPI from "./BaseAPI";

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  async getUser() {
    try {
      const { status, response } = await this.HTTPEntity.get("/user");
      if (status === 200) {
        return response;
      }
    } catch (err) {
      new ErrorHandler(err.message).show();
    }
    return null;
  }

  logout() {
    return this.HTTPEntity.post("/logout").catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }
}

export default AuthAPI;
