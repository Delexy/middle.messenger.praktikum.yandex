import template from "./template.pug";
import { userData } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import ChatEl from "../../components/ChatEl/ChatEl";
import ActiveChatPage from "../../components/ActiveChat/ActiveChat";
import SmallForm from "../../components/SmallForm/SmallForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AuthController from "../authentication/AuthController";
import { PAGES } from "../../utils/renderDOM";

const AuthControllerEntity = new AuthController();

type ChatsPageProps = {
  profileUrl: string;
};

const chatText =
  "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ";

class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);
  }

  init() {
    this.props.user = userData;
    this.props.profileUrl = PAGES['profile'];

    const addChatModal = new SmallForm({
      title: "Добавить чат",
      id: "add-chat-modal",
      input: new Input({ label: "Название чата", attributes: { type: "text" } }),
      Button: new Button({ text: "Добавить", attributes: { class: "form-user__btn" } }),
      events: {
        submit: (event: Event) => {
          addChatModal.submit(event);
        },
      },
    });

    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.user.avatar, attributes: { class: "chat-profile__img", alt: this.props.user.first_name } }),
      ChatsList: [
        new ChatEl({
          isActive: false,
          user: userData,
          isUserMessageLast: false,
          time: "16:45",
          messageCount: 0,
          text: chatText,
          events: { click: this.chooseChat.bind(this) },
        }),
        new ChatEl({
          isActive: false,
          user: userData,
          isUserMessageLast: false,
          time: "16:45",
          messageCount: 5,
          text: chatText,
          events: { click: this.chooseChat.bind(this) },
        }),
      ],
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

  chooseChat(event: Event): void {
    let target = event.target as HTMLElement;
    target = target.closest(".chat-el") || target;
    if (target.classList.contains("is-active")) {
      return;
    }
    this.element.querySelector(".chat-el.is-active")?.classList.remove("is-active");
    target.classList.add("is-active");

    this.children.ActiveChat = new ActiveChatPage();
    this.props.ActiveChat = this.children.ActiveChat;
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

  componentDidMount(): void {
    if(!AuthControllerEntity.isAuthed()){
      AuthControllerEntity.redirectToLogin();
    }
  }
}

export default ChatsPage;
