import template from './template.pug';
import { userData, fieldsNaming, INPUT_VALIDATION_REGEXP } from '../../utils/projectVariables';
import Block from '../../components/Block/Block';
import Photo from '../../components/Photo/Photo';
import Button from '../../components/Button/Button';

type ProfileEditProps = {
  user?: Record<string, string>,
  userData?: string
  backUrl: string,
  fieldsNaming?: Record<string, string>
  events?: any,
}

class ProfileEditPage extends Block {
	constructor(props?: ProfileEditProps) {
    if(props) {
      props.user = userData;
      props.fieldsNaming = fieldsNaming;
      props.events = {
        submit: (event: Event) => {
          event.preventDefault();
          const formIsValid = this.validate();
          if(formIsValid && event.target) {
            const formData = new FormData(event.target as HTMLFormElement);
            console.log(Object.fromEntries(formData));
          }
        }
      }
    }
		super(props);
	}

  validate(): boolean {
    let isValid = true;
    const inputs = this.element.querySelectorAll("input[name]");
    inputs.forEach((input: HTMLInputElement) => {
      const currentType: string = input.type;
      const inputIsValid = `${input.value}`.match(INPUT_VALIDATION_REGEXP[currentType]);

      if (!inputIsValid) {
        input.parentElement?.classList.add('is-error');
        isValid = false;
      } else {
        input.parentElement?.classList.remove('is-error');
      }
    });

    return isValid;
  }

  init() {
    this.children = {
      Photo: new Photo({
        title: this.props.user.first_name,
        photoSrc: this.props.user.avatar,
        canChange: true,
        attributes: {
          alt: this.props.user.first_name
        }
      }),
      SaveBtn: new Button({ text: 'Сохранить', attributes: { class: "profile-page__btn-save", type: "submit" }})
    }
  }

	render() {
		return this.compile(template, this.props);
	}
}

export default ProfileEditPage;
