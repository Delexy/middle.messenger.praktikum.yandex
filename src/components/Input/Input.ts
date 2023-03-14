import template from "./template.pug";
import Block from "../Block/Block";
import { INPUT_VALIDATION_REGEXP, INPUT_ERRORS } from "../../utils/projectVariables";

interface InputProps {
  label?: string;
  className?: string;
  attributes?: Record<string, unknown>;
  error?: string;
}

class Input extends Block {
  value: string;

  constructor(props: InputProps) {
    super(props);
    this.props.attributes.type = props.attributes?.type || "text";
    this.value = this.props.attributes.value || "";
  }

  validation(): boolean {
    let inputIsValid = true;
    if (this.props.attributes.name) {
      inputIsValid = !!`${this.value}`.match(INPUT_VALIDATION_REGEXP[this.props.attributes.name]);

      if (!inputIsValid) {
        if(!this.props.className.includes("input_error")) {
          this.props.className = `${this.props.className || ""} input_error`;
          this.props.error = INPUT_ERRORS[this.props.attributes.name];
        }
        inputIsValid = false;
      } else {
        if(this.props.className) {
          this.props.className = this.props.className.replace(" input_error", "");
        }
      }
    }

    return inputIsValid;
  }

  init() {
    const blurEvent: (e: InputEvent) => void = (event: InputEvent) => {
      if (event.target && (event.target as Element).nodeName === "INPUT") {
        this.value = (event.target as HTMLInputElement).value;
        this.props.attributes.value = this.value;
      }
      this.validation();
    };
    const clickEvent = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target && (target.classList.contains("input__eye") || target.closest(".input__eye"))) {
        const input = this.element.querySelector(".input__el") as HTMLInputElement;
        input.type = input.type === "password" ? "text" : "password";
      }
    };

    this.props.events = this.props.events || {};
    if (this.props.events.change) {
      this.props.events.change = Array.isArray(this.props.events.change) ? [...this.props.events.change, blurEvent] : [this.props.events.change, blurEvent];
    } else {
      this.props.events.change = blurEvent;
    }

    if (this.props.events.click) {
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
