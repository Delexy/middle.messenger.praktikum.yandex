import template from "./template.pug";
import Block from "../../components/Block/Block";
import { PAGES } from "../../utils/renderDOM"
import Input from "../../components/Input/Input";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";

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
          new Input({ label: "Телефон", className: INPUT_CLASS, attributes: { placeholder: "Телефон", type: "phone", name: "phone" } }),
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
          submit: (event: SubmitEvent) => {
            event.preventDefault();
            if ((this.children.RegistrationForm as Form).validation()) {
              const data = new FormData(event.target as HTMLFormElement);
              console.log(Object.fromEntries(data));
            }
          },
        },
      }),
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default RegistrationPage;
