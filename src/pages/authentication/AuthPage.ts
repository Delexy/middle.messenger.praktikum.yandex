import template from "./template.pug";
import Block from "../../components/Block/Block";
import { PAGES } from "../../utils/renderDOM"
import Input from "../../components/Input/Input";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";

const INPUT_CLASS = "auth-form__input";

class AuthPage extends Block {
  init(): void {
    this.children = {
      AuthForm: new Form({
        title: "Авторизация",
        inputs: [
          new Input({ label: "Логин", className: INPUT_CLASS, attributes: { placeholder: "Логин", name: "login" } }),
          new Input({ label: "Пароль", className: INPUT_CLASS, attributes: { placeholder: "Пароль", type: "password", name: "password" } }),
        ],
        ActionBtn: new Button({
          text: "Войти",
          attributes: {
            type: "submit",
          },
        }),
        Link: `<a class="auth-form__register" href="${PAGES.registration}">Зарегистрироваться</a>`,
        events: {
          submit: (event: SubmitEvent) => {
            event.preventDefault();
            if ((this.children.AuthForm as Form).validation()) {
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

export default AuthPage;
