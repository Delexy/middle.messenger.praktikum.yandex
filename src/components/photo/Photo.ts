import template from "./template.pug";
import Block from "../Block/Block";
import defaultSrc from "../../utils/defaultPhoto";
import FormImage from "../FormImage/FormImage";

type PhotoProps = {
  title: string;
  photoSrc?: string;
  canChange?: boolean;
  attributes: {
    class?: string;
    alt: string;
  };
  events: any;
};

class Photo extends Block {
  constructor(props: PhotoProps) {
    super(props);
    if (!this.props.photoSrc) {
      this.props.photoSrc = defaultSrc;
    }
  }

  init(): void {
    if (this.props.canChange) {
      this.children.ChangePhotoModal = new FormImage({
        title: "Изменить аватар",
        isModal: true,
        currentImg: this.props.photoSrc,
        attributes: { class: "", id: "" },
        events: {
          submit: (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            const ModalEl = this.children.ChangePhotoModal as FormImage;
            if (ModalEl.validation()) {
              const formData = new FormData();
              formData.append("avatar", ModalEl.getFile());
              console.log(Object.fromEntries(formData));
              ModalEl.props.errorText = "";
            } else {
              ModalEl.props.errorText = "Нужно выбрать файл";
            }
          },
          click: (event: Event) => {
            event.stopPropagation();
						const target = event.target as HTMLElement;
            if (target && target?.classList.contains("form__close")) {
							const ModalEl = this.children.ChangePhotoModal as FormImage;
              ModalEl.element.classList.toggle("is-active");
            }
          },
        },
      });

      if (!this.props.events) {
        this.props.events = {};
      }

      this.props.events.click = () => {
        const ModalEl = this.children.ChangePhotoModal as FormImage;
        ModalEl.element.classList.toggle("is-active");
      };
    }
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Photo;
