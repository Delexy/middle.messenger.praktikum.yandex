import template from "./template.pug";
import { userData } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import Message from "../Message/Message";

type ActiveChatProps = {
  profileUrl?: string;
};

class ActiveChatPage extends Block {
  constructor(props?: ActiveChatProps) {
    super(props);
  }

  init() {
    this.props.user = userData;

    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.user.avatar, attributes: { class: "chat-profile__img", alt: this.props.user.display_name } }),
      Messages: [
        new Message({ text: "Hello Hello Hello Hello Hello", time: "16:45", isIncoming: true }),
        new Message({ text: "Hello Hello Hello Hello Hello", time: "16:45", isIncoming: true, isMedia: true, src: "https://funik.ru/wp-content/uploads/2018/10/27c13f31829a137aca6f.jpg" }),
        new Message({ text: "Hello Hello Hello Hello Hello", time: "16:45" }),
        new Message({ text: "Hello Hello Hello Hello Hello", time: "16:45", isMedia: true, src: "https://funik.ru/wp-content/uploads/2018/10/27c13f31829a137aca6f.jpg" }),
      ],
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ActiveChatPage;
