import template from "./template.pug";
import { fieldsNaming } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import ProfileController from "./ProfileController";
import { connect } from "../../Modules/Store/Store";
import { PAGES } from "../../utils/renderDOM";
import deepEqual from "../../utils/deepEqual";

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
    props.fieldsNaming = fieldsNaming;

    super(props);
  }

  init() {
    this.props.backUrl = PAGES["index"];
    this.props.changeProfileUrl = PAGES["profileEdit"];
    this.props.changePasswordUrl = PAGES["changePassword"];

    this.children = {
      Photo: new Photo({
        photoSrc: this.props.user?.avatar || null,
        attributes: {
          alt: this.props.user?.first_name || "",
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

  componentDidUpdate(oldProps?: unknown, newProps?: unknown): boolean {
    if(deepEqual(oldProps as Record<string, any>, newProps)) {
      return false;
    }

    if(this.children.Photo && this.props.user?.avatar) {
      (this.children.Photo as Photo).props.photoSrc = `https://ya-praktikum.tech/api/v2/resources${this.props.user?.avatar}`;
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default connect(ProfilePage, (state) => {
  return { user: { ...state.user! } };
});
