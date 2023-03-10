import ChatsAPI from "../../pages/main/ChatsAPI";

class ActiveChatController {
  async removeChat(id: number) {
    const { status } = await ChatsAPI.removeChat(id);
    if (status === 200) {
      return true;
    } else {
      return false;
    }
  }
}

export default new ActiveChatController();
