import BaseAPI from "../../API/BaseAPI";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { dataToJSON } from "../../utils/dataPrepare";

class ChangePasswordAPI extends BaseAPI {
  changePassword(data: Record<string, unknown>) {
    return this.HTTPEntity.put("/password", {
      data: dataToJSON(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }
}

export default new ChangePasswordAPI("/user");
