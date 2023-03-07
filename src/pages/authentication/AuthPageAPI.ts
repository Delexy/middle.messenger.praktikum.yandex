import AuthAPI from "../../API/AuthAPI";
import { dataToJSON } from "../../utils/dataPrepare";

class AuthPageAPI extends AuthAPI {
  signin(login: string, password: string) {
    return this.HTTPEntity.post("/signin", {
      data: dataToJSON({ login, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }
}

export default AuthPageAPI;
