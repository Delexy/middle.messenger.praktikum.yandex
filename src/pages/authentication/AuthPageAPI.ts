import AuthAPI from "../../API/AuthAPI";

class AuthPageAPI extends AuthAPI {
  signin(login: string, password: string) {
    return this.HTTPEntity.post("/signin", {
      data: { login, password },
    });
  }
}

export default AuthPageAPI;
