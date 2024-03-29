import template from "./template.pug";
import { INPUT_VALIDATION_REGEXP } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import Button from "../../components/Button/Button";
import AuthController from "../authentication/AuthController";
import { PAGES } from "../../utils/renderDOM";
import { connect } from "../../Modules/Store/Store";
import ChangePasswordController from "./ChangePasswordController";

const AuthControllerEntity = new AuthController();

type ChangePasswordProps = {
  user?: Record<string, string | null>;
  userData?: string;
  backUrl: string;
  fieldsNaming?: Record<string, string>;
  events?: any;
};

class ChangePasswordPage extends Block {
  constructor(props?: ChangePasswordProps) {
    if (props) {
      props.events = {
        submit: (event: Event) => {
          event.preventDefault();
          const formIsValid = this.validate();
          if (formIsValid && event.target) {
            const formData = new FormData(event.target as HTMLFormElement);
            ChangePasswordController.changePassword(formData);
          }
        },
      };
    }
    super(props);
  }

  init() {
    this.props.backUrl = PAGES["profile"];

    this.children = {
      Photo: new Photo({
        photoSrc: this.props.user?.avatar || null,
        canChange: false,
        attributes: {
          alt: this.props.user?.first_name || "",
        },
      }),
      SaveBtn: new Button({ text: "Сохранить", attributes: { class: "profile-page__btn-save", type: "submit" } }),
    };
  }

  validate(): boolean {
    let isValid = true;
    const inputs = this.element.querySelectorAll("input[name]");
    inputs.forEach((input: HTMLInputElement) => {
      const currentType: string = input.type;
      const inputIsValid = `${input.value}`.match(INPUT_VALIDATION_REGEXP[currentType]);

      if (!inputIsValid) {
        input.parentElement?.classList.add("is-error");
        isValid = false;
      } else {
        input.parentElement?.classList.remove("is-error");
      }
    });

    const passElement = this.element.querySelector("input[name=newPassword]") as HTMLInputElement;
    const confirmElement = this.element.querySelector("input[name=confirmPassword]") as HTMLInputElement;

    if (passElement.value !== confirmElement.value) {
      passElement.parentElement?.classList.add("is-error");
      confirmElement.parentElement?.classList.add("is-error");
      isValid = false;
    }

    return isValid;
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

export default connect(ChangePasswordPage, (state) => {
  return { user: { ...state.user! } };
});
