import template from "./template.pug";
import { fieldsNaming } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import ProfileController from "./ProfileController";
import { default as Store, StoreEvents } from "../../Modules/Store/Store";
import { PAGES } from "../../utils/renderDOM";

type ProfileProps = {
  user?: Record<string, string | null>;
  userData?: string;
  backUrl?: string;
  changeProfileUrl?: string;
  changePasswordUrl?: string;
  fieldsNaming?: Record<string, string>;
};

class ProfilePage extends Block {
  constructor(props?: ProfileProps) {
    if (!props) {
      props = {};
    }
    props.user = ProfileController.getUser() as Record<string, string>;
    props.fieldsNaming = fieldsNaming;

    super(props);
  }

  init() {
    this.props.backUrl = PAGES['index'];
    this.props.changeProfileUrl = PAGES['profileEdit'];
    this.props.changePasswordUrl = PAGES['changePassword'];
    
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
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
