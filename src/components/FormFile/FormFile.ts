import template from "./template.pug";
import Block from "../Block/Block";
import FileInput from "../FileInput/FileInput";
import Button from "../Button/Button";

type FormFileProps = {
  title: string;
  isModal?: boolean;
  errorText?: string;
  currentImg?: string;
  events?: Record<string, unknown>;
  name?: string;
  accept?: string;
  attributes: {
    class: string;
    id: string;
  };
  [key: string]: any;
};

class FormFile extends Block {
  constructor(props: FormFileProps) {
    super(props);
  }

  init(): void {
    this.children = {
      FileInput: new FileInput({ title: "Выбрать файл на компьютере", accept: this.props.accept || '', name: this.props.name || "avatar", attributes: { class: "form-image__input" } }),
      SaveBtn: new Button({ text: "Поменять", attributes: { class: "form-image__btn" } }),
    };
  }

  validation(): boolean {
    if (!(this.children.FileInput as FileInput).value) {
      return false;
    }
    return true;
  }

  submit(event: Event): void {
    event.preventDefault();
    const form = this.element as HTMLFormElement;
    this.props.attributes.class = "is-active";
    if (this.validation()) {
      const formData = new FormData(form);
      console.log(Object.fromEntries(formData));
      this.props.errorText = "";
      form.reset();
    } else {
      this.props.errorText = "Нужно выбрать файл";
    }
  }

  getFile() {
    return (this.children.FileInput as FileInput).value;
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default FormFile;
