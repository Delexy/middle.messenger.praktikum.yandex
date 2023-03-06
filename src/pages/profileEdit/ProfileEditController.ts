import { Router } from "../../Modules/Router/Router";
import Store from "../../Modules/Store/Store";
import { getFormData } from "../../utils/dataPrepare";
import { PAGES } from "../../utils/renderDOM";
import ProfileEditAPI from "./ProfileEditAPI";

const ProfileEditAPIEntity = new ProfileEditAPI();

class ProfileEditController {
  async changeData(data: FormData) {
    const userData = getFormData(data);
    const { status, response } = await ProfileEditAPIEntity.changeUser(userData);
      if (status === 200) {
        Store.set('user', {...response});
        Router.go(PAGES['profile']);
      } else {
        return { error: response?.reason };
      }
  }
}

export default ProfileEditController;
