import { getFormData } from "../../utils/dataPrepare";
import { default as Store } from "../../Modules/Store/Store";
import ChatsAPI from "./ChatsAPI";

class ChatsController {
  async updateChats() {
    const { response, status } = await ChatsAPI.getChats();
    if (status === 200) {
      Store.set("chats", response);
    } else {
    }
  }

  async addChat(data: FormData | undefined): Promise<boolean> {
    if (data) {
      const { status } = await ChatsAPI.addChat(getFormData(data));
      if (status === 200) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}

export default new ChatsController();
