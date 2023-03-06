import BaseAPI from "./BaseAPI";

class AuthAPI extends BaseAPI {
  signin(login: string, password: string) {
    return this.HTTPEntity.post("/signin", {
      data: { login, password },
    });
  }

  signup(registrationData: Record<string, unknown>) {
    return this.HTTPEntity.post("/signup", {
      data: registrationData,
    });
  }

  async getUser() {
    return this.HTTPEntity.get("/user");
  }

  logout() {
    return this.HTTPEntity.post("/logout");
  }
}

export default new AuthAPI('/auth');
