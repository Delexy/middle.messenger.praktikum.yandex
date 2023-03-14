import template from "./template.pug";
import Block from "../../components/Block/Block";

type SmallFormProps = {
  title: string;
  content?: string;
  input?: Block;
  Button?: Block;
  id?: string;
  events?: any;
};

class SmallForm extends Block {
  constructor(props?: SmallFormProps) {
    super(props);
  }

  getData(event?: Event): FormData | undefined {
    event!.preventDefault();
    if (this.children.input) {
      if (this.children.input) {
        const formData = new FormData(this.element as HTMLFormElement);
        return formData;
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }

  reset() {
    (this.element as HTMLFormElement).reset();
  }

  show() {
    this.element.classList.add("is-active");
  }

  hide() {
    this.element.classList.remove("is-active");
  }
}

export default SmallForm;
