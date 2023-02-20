import template from "./template.pug";
import Block from "../Block/Block";

type MessageProps = {
  text: string;
  time: string;
  isIncoming?: boolean;
  isMedia?: boolean;
  src?: string;
  events?: any;
};

class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Message;
