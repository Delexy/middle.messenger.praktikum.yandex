import { Router } from "../../Modules/Router/Router";
import { PAGES } from "../../utils/renderDOM";
import ProfileAPI from "./ProfileAPI";

class ProfileController {
	async logout() {
		const { status, response } = await ProfileAPI.logout();
		if(status === 200) {
			Router.go(PAGES['auth']);
		} else {
			alert(response);
		}
	}
	async getUser() {
		const { status, response } = await ProfileAPI.getUser();
		if(status === 200 && response) {
			delete response['id'];
			return response;
		} else {
			Router.go(PAGES['auth']);
		}
	}
}

export default new ProfileController();
