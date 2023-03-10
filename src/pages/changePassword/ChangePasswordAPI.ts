import BaseAPI from "../../API/BaseAPI";
import { dataToJSON } from "../../utils/dataPrepare";

class ChangePasswordAPI extends BaseAPI {
  changePassword(data: Record<string, unknown>) {
    return this.HTTPEntity.put("/password", {
      data: dataToJSON(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
}

export default new ChangePasswordAPI('/user');
