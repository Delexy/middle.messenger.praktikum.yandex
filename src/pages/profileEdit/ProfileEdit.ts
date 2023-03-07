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
import { PAGES } from "../../utils/renderDOM";

const AuthControllerEntity = new AuthController();
const ProfileEditControllerE = new ProfileEditController();

type ProfileEditProps = {
  user?: Record<string, string | null>;
  backUrl?: string;
  fieldsNaming?: Record<string, string>;
  events?: any;
};

const INPUT_CLASS = "auth-form__input";

class ProfileEditPage extends Block {
  constructor(props?: ProfileEditProps) {
    if (!props) {
      props = {};
    }
    props.user = AuthControllerEntity.getUser();
    props.fieldsNaming = fieldsNaming;

    super(props);
  }

  init() {
    this.props.backUrl = PAGES['profile'];

    this.children = {
      Photo: new Photo({
        photoSrc: this.props.user?.avatar || null,
        canChange: true,
        attributes: {
          alt: this.props.user?.first_name || '',
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
            attributes: { value: this.props.user.display_name, placeholder: "Имя", name: "display_name" },
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
          submit: async (event: SubmitEvent) => {
            event.preventDefault();
            const currentForm = (this.children.EditForm as Form);
            if (currentForm.validation()) {
              const formData = new FormData(event.target as HTMLFormElement);
              const response = await ProfileEditControllerE.changeData(formData);

              currentForm.props.error = "";
              if (response && response.error) {
                currentForm.props.error = response.error;
              }
            }
          },
        },
      }),
      SaveBtn: new Button({ text: "Сохранить", attributes: { class: "profile-page__btn-save", type: "submit" } }),
    };
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount(): void {
    if (!AuthControllerEntity.isAuthed()) {
      AuthControllerEntity.redirectToLogin();
    }
  }
}

export default ProfileEditPage;
