import AuthAPIEntity from "../../API/AuthAPI";
import { Router } from "../../Modules/Router/Router";
import { getFormData } from "../../utils/dataPrepare";
import { PAGES } from "../../utils/renderDOM";

class AuthController {
  private _isAuthed = false;

  checkAuth() {
    return this._isAuthed;
  }

  redirectToIndex() {
    Router.go(PAGES.index);
  }

  async signin(data: FormData) {
    const { login, password } = getFormData(data);
    if (login && password) {
      const response = await AuthAPIEntity.signin(login.toString(), password.toString());
      if (response.status === 200) {
        this._isAuthed = true;
        this.redirectToIndex();
      } else {
        return { error: response.response?.reason };
      }

    }
  }

  async signup(data: FormData) {
    const registrationData = getFormData(data);
    const response = await AuthAPIEntity.signup(registrationData);
    return response.status === 200 ? this.redirectToIndex() : { error: response.response?.reason };
  }

  async getUser() {
    const {response, status} = await AuthAPIEntity.getUser();
    
		if(status === 200) {
			return response;
		} else {
			return null;
		}
  }

  async logout() {
    const {status, response} = await AuthAPIEntity.logout();
    
		if(status !== 200) {
			return response?.reason;
		}
		Router.go(PAGES.auth);
  }
}

export default new AuthController();
