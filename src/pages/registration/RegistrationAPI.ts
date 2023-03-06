import AuthAPI from "../../API/AuthAPI";

class RegistrationAPI extends AuthAPI {
  signup(registrationData: Record<string, unknown>) {
    return this.HTTPEntity.post("/signup", {
      data: registrationData,
    });
  }
}

export default RegistrationAPI;
