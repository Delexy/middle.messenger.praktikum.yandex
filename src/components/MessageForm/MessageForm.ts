import template from "./template.pug";
import Block from "../Block/Block";

type MessageFormProps = {
  events?: Record<string, ((event?: Event) => void)>
};

class MessageForm extends Block {
  constructor(props?: MessageFormProps) {
    super(props);
  }

  submit(): void {
    const form = this.element as HTMLFormElement;
    const formData = new FormData(form);
    if(formData.get('message')) {
      console.log(Object.fromEntries(formData));
      form.reset();
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default MessageForm;
