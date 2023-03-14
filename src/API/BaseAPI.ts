import HTTP from "../Modules/HTTPTransport/HTTPTransport"
import { apiBaseUrl } from "../utils/projectVariables";

export default class BaseAPI {
	protected HTTPEntity: HTTP;

	constructor(baseUrl?: string) {
		this.HTTPEntity = new HTTP(apiBaseUrl + `${baseUrl || ''}`);
	}
}
