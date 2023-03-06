import ProfileAPI from "../../API/ProfileAPI";

class ProfileEditAPI extends ProfileAPI {
  changeUser(data: Record<string, unknown>) {
    return this.HTTPEntity.put('/profile', data);    
  }
}

export default ProfileEditAPI;
