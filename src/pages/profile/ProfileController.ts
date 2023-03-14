import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { Router } from "../../Modules/Router/Router";
import Store from "../../Modules/Store/Store";
import { PAGES } from "../../utils/renderDOM";
import ProfileAPI from "./ProfileAPI";

class ProfileController {
	async logout() {
		const { status, response } = await ProfileAPI.logout();
		if(status === 200) {
			Store.set('user', undefined);
      setTimeout(() => {
        Router.go(PAGES['auth']);
      });
		} else {
      if(response) {
        new ErrorHandler(response.toString()).show();
      }
		}
	}
}

export default new ProfileController();
