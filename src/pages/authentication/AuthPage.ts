import template from "./template.pug";
import Block from "../../components/Block/Block";
import { PAGES } from "../../utils/renderDOM";
import Input from "../../components/Input/Input";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import AuthController from "./AuthController";
import Store from "../../Modules/Store/Store";

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
          submit: async (event: SubmitEvent) => {
            event.preventDefault();
            const currentForm = this.children.AuthForm as Form;
            if (currentForm.validation()) {
              const data = new FormData(event.target as HTMLFormElement);
              const response = await AuthController.signin(data);

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
    if(AuthController.isAuthed()){
      AuthController.redirectToIndex();
    }
  }
}

export default AuthPage;
