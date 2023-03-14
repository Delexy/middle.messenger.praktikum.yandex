import { getFormData } from "../../utils/dataPrepare";
import AuthController from "../../Controllers/AuthController";
import RegistrationAPI from "./RegistrationAPI";

const RegistrationAPIEntity = new RegistrationAPI();

class RegistrationController extends AuthController {
  async signup(data: FormData) {
    const registrationData = getFormData(data);
    const response = await RegistrationAPIEntity.signup(registrationData);
    if (response.status === 200) {
      this.getUser();
      return this.redirectToIndex();
    } else {
      return { error: response.response?.reason };
    }
  }
}

export default RegistrationController;
