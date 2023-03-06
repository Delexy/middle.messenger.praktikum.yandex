import BaseAPI from "../../API/BaseAPI";
import AuthAPIEntity from "../../API/AuthAPI"

class ProfileAPI extends BaseAPI {
	logout() {
		return AuthAPIEntity.logout();
	}
	getUser() {
		return AuthAPIEntity.getUser();
	}
}

export default new ProfileAPI('');
