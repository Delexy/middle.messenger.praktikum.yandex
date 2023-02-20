import template from "./template.pug";
import { INPUT_VALIDATION_REGEXP } from "../../utils/projectVariables";
import Block from "../Block/Block";
import Input from "../Input/Input";

type FormProps = {
  title?: string;
  isModal?: boolean;
  inputs?: Block[];
  ActionBtn?: Block;
  events?: Record<string, unknown>;
  [key: string]: any;
};

const INPUT_ERRORS: Record<string, string> = {
  text: "Поле не должно быть пустым",
  password: "Пароль должен быть не менее 8 символов",
  email: "Email введён неверно",
  tel: "Телефон введён неверно",
};

class Form extends Block {
  isValid: boolean;

  constructor(props: FormProps) {
    super(props);
  }

  validation(): boolean {
    this.isValid = true;
    const inputs = Array.isArray(this.children.inputs) ? [...this.children.inputs] : [this.children.inputs];
    inputs.forEach((input: Input) => {
      const currentType: string = input.props.attributes.type;
      const inputIsValid = !!`${input.value}`.match(INPUT_VALIDATION_REGEXP[currentType]);

      if (!inputIsValid) {
        input.props.className = `${input.props.className} input_error`;
        input.props.error = INPUT_ERRORS[currentType];
        this.isValid = false;
      } else {
        input.props.className = input.props.className.replace(" input_error", "");
      }
    });

    return this.isValid;
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Form;
