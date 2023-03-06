import BaseAPI from "../../API/BaseAPI";
import AuthAPI from "../../API/AuthAPI"

const AuthAPIEntity = new AuthAPI();

class ProfileAPI extends BaseAPI {
	logout() {
		return AuthAPIEntity.logout();
	}
	getUser() {
		return AuthAPIEntity.getUser();
	}
}

export default new ProfileAPI('');
