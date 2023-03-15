import template from "./template.pug";
import Block from "../../components/Block/Block";
import { PAGES } from "../../utils/renderDOM";
import Input from "../../components/Input/Input";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import RegistrationController from "./RegistrationController";

const RegistrationControllerEntity = new RegistrationController();

const INPUT_CLASS = "auth-form__input";

class RegistrationPage extends Block {
  init(): void {
    this.children = {
      RegistrationForm: new Form({
        title: "Регистрация",
        inputs: [
          new Input({ label: "Почта", className: INPUT_CLASS, attributes: { placeholder: "Почта", type: "email", name: "email" } }),
          new Input({ label: "Логин", className: INPUT_CLASS, attributes: { placeholder: "Логин", name: "login" } }),
          new Input({ label: "Имя", className: INPUT_CLASS, attributes: { placeholder: "Имя", name: "first_name" } }),
          new Input({ label: "Фамилия", className: INPUT_CLASS, attributes: { placeholder: "Фамилия", name: "second_name" } }),
          new Input({ label: "Телефон", className: INPUT_CLASS, attributes: { placeholder: "Телефон", type: "tel", name: "phone" } }),
          new Input({ label: "Пароль", className: INPUT_CLASS, attributes: { placeholder: "Пароль", type: "password", name: "password" } }),
        ],
        ActionBtn: new Button({
          text: "Зарегистрироваться",
          attributes: {
            type: "submit",
          },
        }),
        Link: `<a class="auth-form__register" href="${PAGES.auth}">Войти</a>`,
        events: {
          submit: async (event: SubmitEvent) => {
            event.preventDefault();
            const currentForm = this.children.RegistrationForm as Form;
            if (currentForm.validation()) {
              const data = new FormData(event.target as HTMLFormElement);
              const response = await RegistrationControllerEntity.signup(data);

              currentForm.props.error = "";
              if (response && response.error) {
                currentForm.props.error = response.error;
              }
            }
          },
        },
      }),
    };
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount(): void {
    if (RegistrationControllerEntity.isAuthed()) {
      RegistrationControllerEntity.redirectToIndex();
    }
  }
}

export default RegistrationPage;
