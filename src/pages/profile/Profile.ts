import template from "./template.pug";
import { userData, fieldsNaming } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import ProfileController from "./ProfileController";
import { default as Store, StoreEvents } from "../../Modules/Store/Store";

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
        if (eTarget && eTarget?.id === "logout") {
          ProfileController.logout();
        }
      },
    };

    Store.on(StoreEvents.Updated, (path, newValue) => {
      if(path === "user") {
        this.props.user = newValue;
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount(): void {
    const user = ProfileController.getUser();
    if (user) {
      const avatarComponent = this.children.Photo as Photo;
      if ("avatar" in user) {
        if (user.avatar) {
          avatarComponent.props.photoSrc = user.avatar;
        }
        delete user["avatar"];
      }
      if ("first_name" in user) {
        avatarComponent.props.attributes.alt = user.first_name;
      }

      this.props.user = user;
    }
  }
}

export default ProfilePage;
