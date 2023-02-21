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

  submit(event: Event): void {
    if (this.children.input) {
      event.preventDefault();
      if(this.children.input) {
        const formData = new FormData(this.element as HTMLFormElement);
        console.log(Object.fromEntries(formData));
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default SmallForm;
