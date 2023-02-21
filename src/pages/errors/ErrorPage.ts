import template from "./template.pug";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import { PAGES } from "../../utils/renderDOM"

type ErrorPageProps = {
  status: string | number;
  statusText: string;
};

class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  init() {
    this.children = {
      Link: new Button({ text: "На главную", href: PAGES.index, attributes: { class: "error-page__link" } }),
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ErrorPage;
