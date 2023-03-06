import template from "./template.pug";
import { userData, fieldsNaming } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import AuthController from "../authentication/AuthController";
import ProfileEditController from "./ProfileEditController";
import { default as Store, StoreEvents } from "../../Modules/Store/Store";

const AuthControllerEntity = new AuthController();
const ProfileEditControllerE = new ProfileEditController();

type ProfileEditProps = {
  user?: Record<string, string | null>;
  userData?: string;
  backUrl: string;
  fieldsNaming?: Record<string, string>;
  events?: any;
};

const INPUT_CLASS = "auth-form__input";

class ProfileEditPage extends Block {
  constructor(props?: ProfileEditProps) {
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
        canChange: true,
        attributes: {
          alt: "",
        },
      }),
      EditForm: new Form({
        inputs: [
          new Input({
            label: "Почта",
            className: INPUT_CLASS,
            attributes: { value: this.props.user.email, placeholder: "Почта", type: "email", name: "email" },
          }),
          new Input({ label: "Логин", className: INPUT_CLASS, attributes: { value: this.props.user.login, placeholder: "Логин", name: "login" } }),
          new Input({ label: "Имя", className: INPUT_CLASS, attributes: { value: this.props.user.first_name, placeholder: "Имя", name: "first_name" } }),
          new Input({
            label: "Имя в чате",
            className: INPUT_CLASS,
            attributes: { value: this.props.user.first_name, placeholder: "Имя", name: "display_name" },
          }),
          new Input({
            label: "Фамилия",
            className: INPUT_CLASS,
            attributes: { value: this.props.user.second_name, placeholder: "Фамилия", name: "second_name" },
          }),
          new Input({
            label: "Телефон",
            className: INPUT_CLASS,
            attributes: { value: this.props.user.phone, placeholder: "Телефон", type: "tel", name: "phone" },
          }),
        ],
        ActionBtn: new Button({
          text: "Изменить",
          attributes: {
            type: "submit",
          },
        }),
        Link: ``,
        events: {
          submit: (event: SubmitEvent) => {
            event.preventDefault();
            if ((this.children.EditForm as Form).validation()) {
              const data = new FormData(event.target as HTMLFormElement);
              ProfileEditControllerE.changeData(data);
            }
          },
        },
      }),
      SaveBtn: new Button({ text: "Сохранить", attributes: { class: "profile-page__btn-save", type: "submit" } }),
    };

    Store.on(StoreEvents.Updated, (path, newValue) => {
      if (path === "user") {
        this.props.user = newValue;
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount(): void {
    if (!AuthControllerEntity.isAuthed()) {
      AuthControllerEntity.redirectToLogin();
    }

    const user = AuthControllerEntity.getUser();
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

export default ProfileEditPage;
