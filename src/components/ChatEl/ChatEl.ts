import template from "./template.pug";
import Block from "../Block/Block";
import Photo from "../Photo/Photo";
import Store from "../../Modules/Store/Store";

type ChatElProps = {
  id: number;
  title: string;
  avatar: string;
  isActive?: boolean;
  last_message?: Record<string, unknown>;
  isUserMessageLast?: boolean;
  date?: string;
  messageCount?: number;
  events?: Record<string, () => void>;
};

function dateIsToday(date: Date) {
  const inputDate = new Date(date);
  const todaysDate = new Date();
  if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
}

class ChatEl extends Block {
  constructor(props: ChatElProps) {
    if (props.last_message) {
      const messageDate = new Date(`${props.last_message.time}`);
      props.date = dateIsToday(messageDate)
        ? `${messageDate.getHours()}:${messageDate.getMinutes() < 10 ? "0" : ""}${messageDate.getMinutes()}`
        : `${messageDate.toLocaleString("ru", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          })}`;
      props.messageCount = Number(props.last_message.unread_message);
      const user = Store.getState().user as Record<string, unknown> | null;
      if (user && user?.id) {
        props.isUserMessageLast = user.display_name === (props.last_message.user as Record<string, unknown>)?.display_name;
      }
    }
    super(props);
  }

  init(): void {
    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.avatar, attributes: { class: "chat-el__img", alt: this.props.title } }),
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatEl;
