import template from "./template.pug";
import Block from "../Block/Block";

interface InputProps {
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
    const clickEvent = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target && (target.classList.contains("input__eye") || target.closest(".input__eye"))) {
        const input = this.element.querySelector(".input__el") as HTMLInputElement;
        input.type = input.type === "password" ? "text" : "password";
      }
    };

    this.props.events = this.props.events || {};
    if(this.props.events.change) {
      this.props.events.change = Array.isArray(this.props.events.change) ? [...this.props.events.change, blurEvent] : [this.props.events.change, blurEvent];
    } else {
      this.props.events.change = blurEvent;
    }

    
    if(this.props.events.click) {
      this.props.events.click = Array.isArray(this.props.events.click) ? [...this.props.events.click, clickEvent] : [this.props.events.click, clickEvent];
    } else {
      this.props.events.click = clickEvent;
    }
  }

  componentUpdated(): void {
    if (this.value && this.element) {
      const input: HTMLInputElement | null = this.element.querySelector(".input__el");
      if (input) {
        input.value = this.value;
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Input as default, InputProps };
