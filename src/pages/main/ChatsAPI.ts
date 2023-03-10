import BaseAPI from "../../API/BaseAPI";
import { dataToJSON } from "../../utils/dataPrepare";

class ChatsAPI extends BaseAPI {
  getChats() {
    return this.HTTPEntity.get("");
  }

  addChat(data: Record<string, unknown>) {
    return this.HTTPEntity.post("", {
      data: dataToJSON(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    });
  }

  removeChat(id: number) {
    return this.HTTPEntity.delete('', {
      data: dataToJSON({"chatId": id}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  }
}

export default new ChatsAPI("/chats");
