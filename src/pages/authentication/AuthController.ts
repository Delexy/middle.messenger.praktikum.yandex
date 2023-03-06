import { default as Store } from "../../Modules/Store/Store";
import { Router } from "../../Modules/Router/Router";
import { getFormData } from "../../utils/dataPrepare";
import { PAGES } from "../../utils/renderDOM";
import AuthPageAPI from "./AuthPageAPI";
import globalAuthController from "../../Controllers/AuthController";

const AuthAPIEntity = new AuthPageAPI();

class AuthController extends globalAuthController {
  async signin(data: FormData) {
    const { login, password } = getFormData(data);
    if (login && password) {
      const { status, response } = await AuthAPIEntity.signin(login.toString(), password.toString());
      if (status === 200) {
        AuthAPIEntity.getUser().then(user => {
          Store.set("user", {...user});
          this.redirectToIndex();
        })
      } else {
        return { error: response?.reason };
      }
    }
  }

  async logout() {
    const { status, response } = await AuthAPIEntity.logout();

    if (status !== 200) {
      return response?.reason;
    }
    Store.delete("user");
    Router.go(PAGES.auth);
  }
}

export default AuthController;
