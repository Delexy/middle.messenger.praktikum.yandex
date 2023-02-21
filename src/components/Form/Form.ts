import template from "./template.pug";
import Block from "../Block/Block";
import Input from "../Input1/Input";

type FormProps = {
  title?: string;
  isModal?: boolean;
  inputs?: Block[];
  ActionBtn?: Block;
  events?: Record<string, unknown>;
  [key: string]: any;
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
      if(!input.validation()) {
        this.isValid = false;
      }
    });

    return this.isValid;
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Form;
