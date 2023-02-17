import template from "./template.pug";
import { default as Block, PropsObjT } from "../Block/Block";

interface InputPropsT extends PropsObjT {
  label?: string;
  className?: string;
  attributes?: any;
  error?: string;
}

class Input extends Block {
  value: string;

  constructor(props: InputPropsT) {
    super(props);
    this.props.attributes.type = props.attributes.type || "text";
  }

  init() {
    const blurEvent: ((e: InputEvent) => void) = (event: InputEvent) => {
      if (event.target && (event.target as Element).nodeName === "INPUT") this.value = (event.target as HTMLInputElement).value;
    };
    this.props.events = this.props.events || {};
    this.props.events.focusout = blurEvent;
  }

  componentUpdated(): void {
    if (this.value && this.element) {
      const input: HTMLInputElement | null = this.element.querySelector(".input__el");
      if(input) {
        input.value = this.value;
      }
    }
  }

  componentDidMount(): void {
    if (this.props?.attributes?.type === "password") {
      this.element.querySelector(".input__eye")?.addEventListener("click", () => {
        const input = this.element.querySelector(".input__el") as HTMLInputElement;
        input.type = input.type === "password" ? "text" : "password";
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Input as default, InputPropsT };
