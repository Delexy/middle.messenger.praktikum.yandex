import ProfileAPI from "../../API/ProfileAPI";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { dataToJSON } from "../../utils/dataPrepare";

class ProfileEditAPI extends ProfileAPI {
  changeUser(data: Record<string, unknown>) {
    return this.HTTPEntity.put("/profile", {
      data: dataToJSON(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }
  changePhoto(data: FormData) {
    return this.HTTPEntity.put("/profile/avatar", {
      data,
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }
}

export default ProfileEditAPI;
