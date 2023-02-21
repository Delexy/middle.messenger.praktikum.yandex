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
  login: "Длина от 3 до 20 символов, первая буква заглавная",
  first_name: "Поле введено неверно",
  second_name: "Поле введено неверно",
  email: "Email введён неверно",  
  password: "Пароль должен быть от 8 до 40 символов",
  phone: "Телефон введён неверно",
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
      const currentName: string = input.props.attributes.name;
      const inputIsValid = !!`${input.value}`.match(INPUT_VALIDATION_REGEXP[currentName]);

      if (!inputIsValid) {
        input.props.className = `${input.props.className} input_error`;
        input.props.error = INPUT_ERRORS[currentName];
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
