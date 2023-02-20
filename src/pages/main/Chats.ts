import template from "./template.pug";
import { userData } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import ChatEl from "../../components/ChatEl/ChatEl";
import ActiveChatPage from "../../components/ActiveChat/ActiveChat";

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
    this.props.events = {
      click: [
        this.openMenu,
      ]
    }

    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.user.avatar, attributes: { class: "chat-profile__img", alt: this.props.user.first_name } }),
      ChatsList: [
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 0, text: chatText, events: { click: this.chooseChat.bind(this) } }),
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 5, text: chatText, events: { click: this.chooseChat.bind(this) } }),
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 0, text: chatText, events: { click: this.chooseChat.bind(this) } }),
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 3, text: chatText, events: { click: this.chooseChat.bind(this) } }),
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 0, text: chatText, events: { click: this.chooseChat.bind(this) } }),
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 2, text: chatText, events: { click: this.chooseChat.bind(this) } }),
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 0, text: chatText, events: { click: this.chooseChat.bind(this) } }),
        new ChatEl({ isActive: false, user: userData, isUserMessageLast: false, time: "16:45", messageCount: 1, text: chatText, events: { click: this.chooseChat.bind(this) } }),
      ],
    };
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
    target = target.querySelector(`.${Array.from(target.classList).join('.')} > [class*=actions]`) || target;
    target.classList.toggle('is-active');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatsPage;
