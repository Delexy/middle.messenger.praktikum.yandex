import HTTP from "../Modules/HTTPTransport/HTTPTransport"

export default class BaseAPI {
	protected HTTPEntity: HTTP;

	constructor(baseUrl?: string) {
		this.HTTPEntity = new HTTP(`https://ya-praktikum.tech/api/v2${baseUrl || ''}`);
	}
}
