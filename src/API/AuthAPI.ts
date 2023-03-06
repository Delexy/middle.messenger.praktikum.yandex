import BaseAPI from "./BaseAPI";

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async getUser() {
    const { status, response } = await this.HTTPEntity.get("/user");

    if(status === 200) {
      return response;
    } else {
      return null;
    }
  }

  logout() {
    return this.HTTPEntity.post("/logout");
  }
}

export default AuthAPI;
