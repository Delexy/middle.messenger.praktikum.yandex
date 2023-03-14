import BaseAPI from "../../API/BaseAPI";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { dataToJSON } from "../../utils/dataPrepare";

class ChatsAPI extends BaseAPI {
  getChats() {
    return this.HTTPEntity.get("").catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }

  addChat(data: Record<string, unknown>) {
    return this.HTTPEntity.post("", {
      data: dataToJSON(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }

  removeChat(id: number) {
    return this.HTTPEntity.delete("", {
      data: dataToJSON({ chatId: id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }

  addUser(chatId: number, userId: number) {
    return this.HTTPEntity.put("/users", {
      data: dataToJSON({ chatId, users: [userId] }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }

  removeUser(chatId: number, userId: number) {
    return this.HTTPEntity.delete("/users", {
      data: dataToJSON({ chatId, users: [userId] }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }

  getToken(chatId: number) {
    return this.HTTPEntity.post(`/token/${chatId}`).catch((err) => {
      return new ErrorHandler(err.message).returnErrorResponse();
    });
  }
}

export default new ChatsAPI("/chats");
