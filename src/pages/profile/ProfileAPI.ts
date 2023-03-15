import AuthAPI from "../../API/AuthAPI"

class ProfileAPI extends AuthAPI {
	logout() {
		return super.logout();
	}
}

export default new ProfileAPI();
