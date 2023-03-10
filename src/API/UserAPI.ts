import { dataToJSON } from "../utils/dataPrepare";
import BaseAPI from "./BaseAPI";

export type UserType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  searchByLogin(login: string) {
    return this.HTTPEntity.post("/search", {
      data: dataToJSON({ login }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }
}

export default new UserAPI();
