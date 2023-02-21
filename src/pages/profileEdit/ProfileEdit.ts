import template from './template.pug';
import { userData, fieldsNaming } from '../../utils/projectVariables';
import Block from '../../components/Block/Block';
import Photo from '../../components/Photo1/Photo';
import Button from '../../components/Button1/Button';
import Form from '../../components/Form/Form';
import Input from '../../components/Input1/Input';

type ProfileEditProps = {
  user?: Record<string, string | null>,
  userData?: string
  backUrl: string,
  fieldsNaming?: Record<string, string>
  events?: any,
}

const INPUT_CLASS = "auth-form__input";

class ProfileEditPage extends Block {
	constructor(props?: ProfileEditProps) {
    if(props) {
      props.user = userData;
      props.fieldsNaming = fieldsNaming;
    }
		super(props);
	}

  init() {
    this.children = {
      Photo: new Photo({
        photoSrc: this.props.user.avatar,
        canChange: true,
        attributes: {
          alt: this.props.user.first_name
        }
      }),
      EditForm: new Form({
        inputs: [
          new Input({ label: "Почта", className: INPUT_CLASS, attributes: { value: this.props.user.email, placeholder: "Почта", type: "email", name: "email" } }),
          new Input({ label: "Логин", className: INPUT_CLASS, attributes: { value: this.props.user.login, placeholder: "Логин", name: "login" } }),
          new Input({ label: "Имя", className: INPUT_CLASS, attributes: { value: this.props.user.first_name, placeholder: "Имя", name: "first_name" } }),
          new Input({ label: "Имя в чате", className: INPUT_CLASS, attributes: { value: this.props.user.first_name, placeholder: "Имя", name: "display_name" } }),
          new Input({ label: "Фамилия", className: INPUT_CLASS, attributes: { value: this.props.user.second_name, placeholder: "Фамилия", name: "second_name" } }),
          new Input({ label: "Телефон", className: INPUT_CLASS, attributes: { value: this.props.user.phone, placeholder: "Телефон", type: "tel", name: "phone" } }),
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
              console.log(Object.fromEntries(data));
            }
          },
        },
      }),
      SaveBtn: new Button({ text: 'Сохранить', attributes: { class: "profile-page__btn-save", type: "submit" }})
    }
  }

	render() {
		return this.compile(template, this.props);
	}
}

export default ProfileEditPage;
