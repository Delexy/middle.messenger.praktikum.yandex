import ProfileAPI from "../../API/ProfileAPI";
import { dataToJSON } from "../../utils/dataPrepare";

class ProfileEditAPI extends ProfileAPI {
  changeUser(data: Record<string, unknown>) {
    return this.HTTPEntity.put("/profile", {
      data: dataToJSON(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  changePhoto(data: FormData) {
    return this.HTTPEntity.put("/profile/avatar", {
      data
    });
  }
}

export default ProfileEditAPI;
