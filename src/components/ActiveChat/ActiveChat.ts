import template from "./template.pug";
import { userData } from "../../utils/projectVariables";
import Block from "../../components/Block/Block";
import Photo from "../../components/Photo/Photo";
import Message from "../Message/Message";
import SmallForm from "../SmallForm/SmallForm";
import Button from "../Button/Button";
import Input from "../Input/Input";
import FormImage from "../FormFile/FormFile";

type ActiveChatProps = {
  profileUrl?: string;
};

class ActiveChatPage extends Block {
  constructor(props?: ActiveChatProps) {
    super(props);
  }

  init() {
    this.props.user = userData;

    const changePhotoModal = new FormImage({
      isModal: true,
      title: "Изменить изображение",
      attributes: { id: "change-photo-modal", class: "" },
      events: {
        change: () => {
          if (changePhotoModal.validation()) {
            changePhotoModal.props.attributes.class = "is-active";
            changePhotoModal.props.title = "Файл загружен";
          }
        },
        submit: (event: Event) => {
          event.preventDefault();
          changePhotoModal.props.attributes.class = "is-active";
          if (changePhotoModal.validation()) {
            const formData = new FormData();
            formData.append("avatar", changePhotoModal.getFile());
            console.log(Object.fromEntries(formData));
            changePhotoModal.props.errorText = "";
          } else {
            changePhotoModal.props.errorText = "Нужно выбрать файл";
          }
        },
      },
    });
    const addPhotoModal = new FormImage({
      isModal: true,
      title: "Добавить изображение",
      attributes: { id: "add-photo-modal", class: "" },
      events: {
        change: () => {
          if (addPhotoModal.validation()) {
            addPhotoModal.props.attributes.class = "is-active";
            addPhotoModal.props.title = "Файл загружен";
          }
        },
        submit: (event: Event) => {
          event.preventDefault();
          addPhotoModal.props.attributes.class = "is-active";
          if (addPhotoModal.validation()) {
            const formData = new FormData();
            formData.append("photo", addPhotoModal.getFile());
            console.log(Object.fromEntries(formData));
            addPhotoModal.props.errorText = "";
          } else {
            addPhotoModal.props.errorText = "Нужно выбрать файл";
          }
        },
      },
    });
    const addFileModal = new FormImage({
      isModal: true,
      title: "Добавить файл",
      attributes: { id: "add-file-modal", class: "" },
      events: {
        change: () => {
          if (addFileModal.validation()) {
            addFileModal.props.attributes.class = "is-active";
            addFileModal.props.title = "Файл загружен";
          }
        },
        submit: (event: Event) => {
          event.preventDefault();
          addFileModal.props.attributes.class = "is-active";
          if (addFileModal.validation()) {
            const formData = new FormData();
            formData.append("photo", addFileModal.getFile());
            console.log(Object.fromEntries(formData));
            addFileModal.props.errorText = "";
          } else {
            addFileModal.props.errorText = "Нужно выбрать файл";
          }
        },
      },
    });

    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.user.avatar, attributes: { class: "chat-profile__img", alt: this.props.user.display_name } }),
      Messages: [
        new Message({ text: "Hello Hello Hello Hello Hello", time: "16:45", isIncoming: true }),
        new Message({
          text: "Hello Hello Hello Hello Hello",
          time: "16:45",
          isIncoming: true,
          isMedia: true,
          src: "https://funik.ru/wp-content/uploads/2018/10/27c13f31829a137aca6f.jpg",
        }),
        new Message({ text: "Hello Hello Hello Hello Hello", time: "16:45" }),
        new Message({
          text: "Hello Hello Hello Hello Hello",
          time: "16:45",
          isMedia: true,
          src: "https://funik.ru/wp-content/uploads/2018/10/27c13f31829a137aca6f.jpg",
        }),
      ],
      Modals: [
        new SmallForm({
          title: "Подтвердите действие",
          id: "confirm-modal",
          content: `
        <div class = "form-confirm__btns">
          <button class = "btn btn_cancel form-confirm__btn">Удалить</button>
          <button class = "btn form-confirm__btn">Оставить</button>
        </div>
        `,
        }),
        new SmallForm({
          title: "Добавить пользователя",
          id: "add-user-modal",
          input: new Input({ label: "Логин", attributes: { type: "text" } }),
          Button: new Button({ text: "Добавить", attributes: { class: "form-user__btn" } }),
        }),
        new SmallForm({
          title: "Удалить пользователя",
          id: "remove-user-modal",
          input: new Input({ label: "Логин", attributes: { type: "text" } }),
          Button: new Button({ text: "Удалить", attributes: { class: "form-user__btn btn_cancel" } }),
        }),
        changePhotoModal,
        addPhotoModal,
        addFileModal
      ],
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ActiveChatPage;
