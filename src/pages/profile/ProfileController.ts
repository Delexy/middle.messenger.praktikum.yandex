import { Router } from "../../Modules/Router/Router";
import Store from "../../Modules/Store/Store";
import { PAGES } from "../../utils/renderDOM";
import ProfileAPI from "./ProfileAPI";

class ProfileController {
	async logout() {
		const { status, response } = await ProfileAPI.logout();
		if(status === 200) {
			Store.delete('user');
			Router.go(PAGES['auth']);
		} else {
			alert(response);
		}
	}
	getUser() {
		const user = Store.getState().user;
		if(user && typeof user === 'object') {
			if('id' in user) {
				delete user['id'];
			}
			return user;
		} else {
			Router.go(PAGES['auth']);
		}
	}
}

export default new ProfileController();
