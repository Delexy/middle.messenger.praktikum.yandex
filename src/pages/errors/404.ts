import ErrorPage from "./ErrorPage";

export default class unknownPage extends ErrorPage {
	constructor() {
		super({ status: 404, statusText: "Страница ушла, но обещала вернуться"});
	}
}
