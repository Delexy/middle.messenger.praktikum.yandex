import ErrorPage from "./ErrorPage";

export default class serverErrorPage extends ErrorPage {
	constructor() {
		super({ status: 500, statusText: "У нас что-то поломалось, уже чиним"});
	}
}
