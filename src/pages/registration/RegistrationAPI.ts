import AuthAPI from "../../API/AuthAPI";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { dataToJSON } from "../../utils/dataPrepare";

class RegistrationAPI extends AuthAPI {
  signup(registrationData: Record<string, unknown>) {
    return this.HTTPEntity.post("/signup", {
      data: dataToJSON(registrationData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }
}

export default RegistrationAPI;
