import AuthAPI from "../../API/AuthAPI";
import { dataToJSON } from "../../utils/dataPrepare";

class RegistrationAPI extends AuthAPI {
  signup(registrationData: Record<string, unknown>) {
    return this.HTTPEntity.post("/signup", {
      data: dataToJSON(registrationData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
}

export default RegistrationAPI;
