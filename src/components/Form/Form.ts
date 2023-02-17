import template from "./template.pug";
import Block from "../Block/Block";
import Input from "../Input/Input";

type FormPropsT = {
  title: string;
  isModal: boolean;
  inputs: Block[];
  actionBtn: Block;
};

const INPUT_VALIDATION_REGEXP: Record<string, RegExp> = {
  text: new RegExp(/.+/gi),
  password: new RegExp(/.{8,}/g),
  email: new RegExp(/^\S+@\S+\.\S+$/gi),
  phone: new RegExp(/^\+?[1-9][0-9]{7,14}$/gi),
};

const INPUT_ERRORS: Record<string, string> = {
  text: "Поле не должно быть пустым",
  password: "Пароль должен быть не менее 8 символов",
  email: "Email введён неверно",
  phone: "Телефон введён неверно",
};

class Form extends Block {
  isValid: boolean;

  validation(): boolean {
    this.isValid = true;
    const inputs = Array.isArray(this.children.inputs) ? [...this.children.inputs] : [this.children.inputs];
    inputs.forEach((input: Input) => {
      const currentType: string = input.props.attributes.type;
      const inputIsValid = INPUT_VALIDATION_REGEXP[currentType].exec(input.value);

      console.log(INPUT_VALIDATION_REGEXP[currentType], input.value);

      if (!inputIsValid) {
        input.setProps({
          className: "input_error",
          error: INPUT_ERRORS[currentType],
        });
        this.isValid = false;
      } else {
        input.setProps({
          className: undefined,
          error: undefined,
        });
      }
    });

    return this.isValid;
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Form;
