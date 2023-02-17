import template from "./template.pug";
import { default as Block, PropsObjT } from "../Block/Block";

interface InputProps extends PropsObjT {
  label?: string;
  className?: string;
  attributes?: any;
  error?: string;
}

class Input extends Block {
  value: string;

  constructor(props: InputProps) {
    super(props);
    this.props.attributes.type = props.attributes.type || "text";
    this.value = "";
  }

  init() {
    const blurEvent: (e: InputEvent) => void = (event: InputEvent) => {
      if (event.target && (event.target as Element).nodeName === "INPUT") this.value = (event.target as HTMLInputElement).value;
    };
    this.props.events = this.props.events || {};
    this.props.events.change = blurEvent;

    this.props.events.click = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target && (target.classList.contains("input__eye") || target.closest(".input__eye"))) {
        const input = this.element.querySelector(".input__el") as HTMLInputElement;
        input.type = input.type === "password" ? "text" : "password";
      }
    };
  }

  componentUpdated(): void {
    if (this.value && this.element) {
      const input: HTMLInputElement | null = this.element.querySelector(".input__el");
      if (input) {
        input.value = this.value;
      }
    }
  }

  componentDidMount(): void {}

  render() {
    return this.compile(template, this.props);
  }
}

export { Input as default, InputProps };
