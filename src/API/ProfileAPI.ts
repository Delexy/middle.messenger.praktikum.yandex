import BaseAPI from "./BaseAPI";

export default class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user');
  }
}
