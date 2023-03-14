import { default as Store } from "../Modules/Store/Store";
import { Router } from "../Modules/Router/Router";
import { PAGES } from "../utils/renderDOM";

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

  getUser() {
    const user = Store.getState().user;
    return user as Record<string, string>;
  }
}

export default AuthController;
