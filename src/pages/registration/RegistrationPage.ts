import template from "./index.pug";
import Block from "../../components/Block/Block";
import Input from "../../components/Input/Input";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";

class RegistrationPage extends Block {
  init(): void {
    this.children = {
      RegistrationForm: new Form({
        title: "Регистрация",
        inputs: [new Input({ attributes: { type: "password" } }), new Input({ attributes: { name: 'login' } })],
				ActionBtn: new Button({
					text: "Зарегистрироваться",
					attributes: {
						type: "submit",
					},
				}),
				events: {
					submit: (event: SubmitEvent) => {
						event.preventDefault();
						(this.children.RegistrationForm as Form).validation();
					}
				}
      }),
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default RegistrationPage;
