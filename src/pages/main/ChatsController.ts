import { getFormData } from "../../utils/dataPrepare";
import { default as Store } from "../../Modules/Store/Store";
import ChatsAPI from "./ChatsAPI";
import { default as UserAPI, UserType } from "../../API/UserAPI";

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

  async removeChat(id: number): Promise<boolean> {
    const { status } = await ChatsAPI.removeChat(id);
    if (status === 200) {
      return true;
    }
    return false;
  }

  async addUser(chatId: number, userLogin: string) {
    const { status, response } = await UserAPI.searchByLogin(userLogin);
    if (status === 200) {
      if (response && Array.isArray(response)) {
        const user = response.shift() as UserType;
        const userId = user.id;
        if (await ChatsAPI.addUser(chatId, userId)) {
          return { error: "" };
        }
      }
    } else {
      return { error: "Ошибка на сервере!" };
    }
    return { error: "Пользователь не найден!" };
  }

  async removeUser(chatId: number, userLogin: string) {
    const { status, response } = await UserAPI.searchByLogin(userLogin);
    if (status === 200) {
      if (response && Array.isArray(response)) {
        const user = response.shift() as UserType;
        const userId = user.id;
        if (await ChatsAPI.removeUser(chatId, userId)) {
          return { error: "" };
        }
      }
    } else {
      return { error: "Ошибка на сервере!" };
    }
    return { error: "Пользователь не найден!" };
  }
}

export default new ChatsController();
