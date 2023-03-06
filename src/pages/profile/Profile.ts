import template from "./template.pug";
import { userData, fieldsNaming } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import ProfileController from "./ProfileController";

type ProfileProps = {
  user?: Record<string, string | null>;
  userData?: string;
  backUrl: string;
  changeProfileUrl: string;
  changePasswordUrl: string;
  fieldsNaming?: Record<string, string>;
};

class ProfilePage extends Block {
  constructor(props?: ProfileProps) {
    if (props) {
      props.user = userData;
      props.fieldsNaming = fieldsNaming;
    }

    super(props);
  }

  init() {
    this.children = {
      Photo: new Photo({
        photoSrc: "",
        attributes: {
          alt: "",
        },
      }),
    };

    this.props.events = {
      click: (event: Event) => {
        event.preventDefault();
        const eTarget = event.target as HTMLElement | null;
        if(eTarget && eTarget?.id === 'logout') {
          ProfileController.logout();
        }
      }
    }

    ProfileController.getUser().then((user) => {
      if (user) {
        if (user.avatar) {
          const avatarComponent = this.children.Photo as Photo;
          avatarComponent.props.photoSrc = user.avatar;
          avatarComponent.props.attributes.alt = user.first_name;
        }

        delete user["avatar"];
        this.props.user = user;
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
