import template from "./template.pug";
import Block from "../Block/Block";
import PhotoInput from "../PhotoInput/PhotoInput";
import Button from "../Button/Button";

type FormImageProps = {
  title: string;
  isModal?: boolean;
  errorText?: string;
  currentImg?: string;
  events?: Record<string, unknown>;
  attributes: {
    class: string,
    id: string,
  }
  [key: string]: any;
};

class FormImage extends Block {
  constructor(props: FormImageProps) {
    super(props);
  }

  init(): void {
    this.children = {
      PhotoInput: new PhotoInput({ title: "Выбрать файл на компьютере", name: "avatar", attributes: { class: "form-image__input" } }),
      SaveBtn: new Button({ text: "Поменять", attributes: { class: "form-image__btn" } })
    };
  }

  validation(): boolean {
    if(!(this.children.PhotoInput as PhotoInput).value) {
      return false;
    }
    return true;
  }

  getFile() {
    return (this.children.PhotoInput as PhotoInput).value;
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default FormImage;
