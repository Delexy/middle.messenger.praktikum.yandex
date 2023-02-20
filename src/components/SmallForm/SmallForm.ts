import template from "./template.pug";
import Block from "../../components/Block/Block";

type SmallFormProps = {
  title: string;
  content?: string;
  input?: Block;
  Button?: Block;
  id?: string;
};

class SmallForm extends Block {
  constructor(props?: SmallFormProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default SmallForm;
