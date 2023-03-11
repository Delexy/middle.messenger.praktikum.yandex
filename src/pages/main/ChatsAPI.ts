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
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  removeChat(id: number) {
    return this.HTTPEntity.delete("", {
      data: dataToJSON({ chatId: id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  addUser(chatId: number, userId: number) {
    return this.HTTPEntity.put("/users", {
      data: dataToJSON({ chatId, users: [userId] }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  removeUser(chatId: number, userId: number) {
    return this.HTTPEntity.delete("/users", {
      data: dataToJSON({ chatId, users: [userId] }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  getToken(chatId: number) {
    return this.HTTPEntity.post(`/token/${chatId}`);
  }
}

export default new ChatsAPI("/chats");
