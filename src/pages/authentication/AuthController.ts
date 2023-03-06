import AuthAPIEntity from "../../API/AuthAPI";
import { default as Store } from "../../Modules/Store/Store";
import { Router } from "../../Modules/Router/Router";
import { getFormData } from "../../utils/dataPrepare";
import { PAGES } from "../../utils/renderDOM";

class AuthController {
  isAuthed() {
    const isAuthed = !!Store.getState().user;
    return isAuthed;
  }

  redirectToIndex() {
    Router.go(PAGES.index);
  }

  redirectToLogin() {
    Router.go(PAGES['auth']);
  }

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

  async signup(data: FormData) {
    const registrationData = getFormData(data);
    const response = await AuthAPIEntity.signup(registrationData);
    if (response.status === 200) {
      this.getUser();
      return this.redirectToIndex();
    } else {
      return { error: response.response?.reason };
    }
  }

  async getUser() {
    return Store.getState().user;
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

export default new AuthController();
