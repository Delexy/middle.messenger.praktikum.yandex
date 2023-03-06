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

export default new AuthAPI('/auth');
