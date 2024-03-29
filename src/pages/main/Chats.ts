import template from "./template.pug";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import ChatEl from "../../components/ChatEl/ChatEl";
import ActiveChatPage from "../../components/ActiveChat/ActiveChat";
import SmallForm from "../../components/SmallForm/SmallForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AuthController from "../authentication/AuthController";
import { PAGES } from "../../utils/renderDOM";
import { connect } from "../../Modules/Store/Store";
import ChatsController from "./ChatsController";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";

const AuthControllerEntity = new AuthController();

type ChatsPageProps = {
  profileUrl: string;
  chats?: ChatEl[];
};

class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);
  }

  async init() {
    this.props.profileUrl = PAGES["profile"];

    const addChatModal = new SmallForm({
      title: "Добавить чат",
      id: "add-chat-modal",
      input: new Input({ label: "Название чата", attributes: { type: "text", name: "title" } }),
      Button: new Button({ text: "Добавить", attributes: { class: "form-user__btn" } }),
      events: {
        submit: async (event: Event) => {
          if (await ChatsController.addChat(addChatModal.getData(event))) {
            addChatModal.reset();
            addChatModal.hide();
            this.updateChats();
          }
        },
      },
    });

    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.user.avatar, attributes: { class: "chat-profile__img", alt: this.props.user.first_name } }),
      ChatsList: [],
      Modals: [addChatModal],
    };

    if (!this.props.events) {
      this.props.events = {};
    }

    this.props.events.click = [
      this.openMenu,
      (event: Event) => {
        let target = event.target as HTMLElement;
        target = target.closest("[data-modal]") || target;
        document.querySelector(`#${target.dataset.modal}`)?.classList.add("is-active");
      },
      (event: Event) => {
        const target = event.target as Element;
        const actionBtn = target.closest("[data-close]");
        if (actionBtn) {
          actionBtn.parentElement?.classList.remove("is-active");
        }
      },
    ];
  }

  async updateChats() {
    await ChatsController.updateChats();
    this.children.ChatsList = [];

    for (const key in this.props.chats) {
      const chat = this.props.chats[key];
      this.children.ChatsList.push(
        new ChatEl({
          ...chat,
          isActive: (this.children.ActiveChat as Block)?.props.id === chat.id,
          events: {
            click: this.chooseChat.bind(this, chat),
          },
        })
      );
    }
    this.props.ChatsList = this.children.ChatsList;
  }

  closeChat() {
    if(this.children.ActiveChat) {
      this.element.querySelector(".chat-el.is-active")?.classList.remove("is-active");
      ChatsController.closeChat();
      (this.children.ActiveChat as Block).unmount();
      delete this.children.ActiveChat;
      delete this.props.ActiveChat;
    }
  }

  async chooseChat(chat: Record<string, unknown>, event: Event) {
    let target = event.target as HTMLElement;
    target = target.closest(".chat-el") || target;
    if (target.classList.contains("is-active")) {
      return;
    }
    this.closeChat();
    target.classList.add("is-active");

    ChatsController.removeMessagesStory();
    await ChatsController.connectToChat(Number(chat.id));

    const activeChatOptions = {
      ...chat,
      events: {
        "remove-chat": async () => {
          if (await ChatsController.removeChat(Number(chat.id))) {
            this.closeChat();
            this.updateChats();
          }
        },
        "add-user": async (event: CustomEvent) => {
          const userLogin = event.detail;
          const { error } = await ChatsController.addUser(Number(chat.id), userLogin);
          if (error) {
            return new ErrorHandler(error).show();
          }
        },
        "remove-user": async (event: CustomEvent) => {
          const userLogin = event.detail;
          const { error } = await ChatsController.removeUser(Number(chat.id), userLogin);
          if (error) {
            return new ErrorHandler(error).show();
          }
        },
        "send-message": (event: CustomEvent) => {
          const message = event.detail;
          ChatsController.sendMessage(message);
        },
        "updated": () => {
          this.updateChats();
        },
      },
    };


    if(this.children.ActiveChat) {
      (this.children.ActiveChat as Block).setProps(activeChatOptions);
    } else {
      this.children.ActiveChat = new ActiveChatPage(activeChatOptions);
      this.props.ActiveChat = this.children.ActiveChat;
      this.children.ActiveChat.dispatchComponentDidMount();
    }
  
  }

  openMenu(event: Event): void {
    let target = event.target as HTMLElement;
    target = target.closest(".chat-message__menu") || target.closest(".chat-user__menu") || target;
    if (target.classList.length > 0) {
      const menuBtn = target.querySelector(`.${Array.from(target.classList).join(".")} > [class*=actions]`) || null;
      if (menuBtn) {
        menuBtn.classList.toggle("is-active");
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }

  async componentDidMount() {
    if (!AuthControllerEntity.isAuthed()) {
      return AuthControllerEntity.redirectToLogin();
    }
    this.updateChats();
  }
}

export default connect(ChatsPage, (state) => {
  return { user: { ...state.user! }, chats: { ...state.chats! } };
});
