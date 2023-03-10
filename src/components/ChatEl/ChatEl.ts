import template from "./template.pug";
import Block from "../Block/Block";
import Photo from "../Photo/Photo";

type ChatElProps = {
  id: number;
  title: string;
  avatar: string;
  isActive?: boolean;
  lastMessage: string;
  messageCount: number;
  events?: Record<string, () => void>;
};

class ChatEl extends Block {
  constructor(props: ChatElProps) {
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
