import { getFormData } from "../../utils/dataPrepare";
import { default as Store } from "../../Modules/Store/Store";
import ChatsAPI from "./ChatsAPI";
import { default as UserAPI, UserType } from "../../API/UserAPI";
import ChatAPI from "../../API/ChatAPI";
import escapeHtml from "../../utils/escape";

class ChatsController {
  private activeChat: ChatAPI;

  async updateChats() {
    const { response, status } = await ChatsAPI.getChats();
    if (status === 200) {
      Store.set("chats", response);
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
      this.closeChat();
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

  async connectToChat(chatId: number) {
    const { status, response } = await ChatsAPI.getToken(chatId);
    if (status === 200 && response) {
      const token = `${response["token"]}`;
      this.activeChat = new ChatAPI(token, chatId);
      this.activeChat.connect();
    }
  }

  sendMessage(message: string) {
    this.activeChat.sendMessage(escapeHtml(message));
  }

  removeMessagesStory() {
    Store.set("activeChat.messages", []);
  }

  closeChat() {
    this.activeChat?.close();
    this.removeMessagesStory();
  }
}

export default new ChatsController();
