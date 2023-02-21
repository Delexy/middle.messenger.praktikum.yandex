import template from "./template.pug";
import Block from "../Block/Block";
import Photo from "../Photo1/Photo";
import { userData } from "../../utils/projectVariables";

type ChatElProps = {
  isActive?: boolean;
  user: Record<string, string | null>;
  isUserMessageLast: boolean;
  time: string;
  text: string;
  messageCount: number;
  events?: Record<string, (() => void)>
};

class ChatEl extends Block {
  constructor(props: ChatElProps) {
    props.user = userData;
    super(props);
  }

  init(): void {
    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.user.avatar, attributes: { class: 'chat-el__img', alt: this.props.user.first_name } }),
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatEl;
