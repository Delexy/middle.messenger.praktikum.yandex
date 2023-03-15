import template from "./template.pug";
import Block from "../../components/Block/Block";
import Photo from "../Photo/Photo";
import Message from "../Message/Message";
import SmallForm from "../SmallForm/SmallForm";
import Button from "../Button/Button";
import Input from "../Input/Input";
import FormFile from "../FormFile/FormFile";
import MessageForm from "../MessageForm/MessageForm";
import store, { connect } from "../../Modules/Store/Store";
import deepEqual from "../../utils/deepEqual";

type ActiveChatProps = {
  avatar?: string;
  title?: string;
  id?: number;
  events?: Record<string, (...args: unknown[]) => void>;
};

class ActiveChatPage extends Block {
  constructor(props?: ActiveChatProps) {
    super(props);
  }

  init() {
    const changePhotoModal = new FormFile({
      isModal: true,
      title: "Изменить изображение",
      accept: "image/*",
      attributes: { id: "change-photo-modal", class: "" },
      events: {
        change: () => {
          if (changePhotoModal.validation()) {
            changePhotoModal.props.attributes.class = "is-active";
            changePhotoModal.props.title = "Файл загружен";
          }
        },
        submit: () => {
          // changePhotoModal.submit(event);
        },
      },
    });
    const addPhotoModal = new FormFile({
      isModal: true,
      title: "Добавить изображение",
      name: "file",
      accept: "image/*,video/*",
      attributes: { id: "add-photo-modal", class: "" },
      events: {
        change: () => {
          if (addPhotoModal.validation()) {
            addPhotoModal.props.attributes.class = "is-active";
            addPhotoModal.props.title = "Файл загружен";
          }
        },
        submit: () => {
          // addPhotoModal.submit();
        },
      },
    });
    const addFileModal = new FormFile({
      isModal: true,
      title: "Добавить файл",
      attributes: { id: "add-file-modal", class: "" },
      name: "file",
      events: {
        change: () => {
          if (addFileModal.validation()) {
            addFileModal.props.attributes.class = "is-active";
            addFileModal.props.title = "Файл загружен";
          }
        },
        submit: () => {
          // addFileModal.submit();
        },
      },
    });
    const addUserModal = new SmallForm({
      title: "Добавить пользователя",
      id: "add-user-modal",
      input: new Input({ label: "Логин", attributes: { type: "text", name: "user-login" } }),
      Button: new Button({ text: "Добавить", attributes: { class: "form-user__btn" } }),
      events: {
        submit: (event: Event) => {
          const data = addUserModal.getData(event);
          this.element.dispatchEvent(
            new CustomEvent("add-user", {
              detail: data?.get("user-login"),
            })
          );
          addUserModal.reset();
          addUserModal.hide();
        },
      },
    });
    const removeUserModal = new SmallForm({
      title: "Удалить пользователя",
      id: "remove-user-modal",
      input: new Input({ label: "Логин", attributes: { type: "text", name: "user-login" } }),
      Button: new Button({ text: "Удалить", attributes: { class: "form-user__btn btn_cancel" } }),
      events: {
        submit: (event: Event) => {
          const data = removeUserModal.getData(event);
          this.element.dispatchEvent(
            new CustomEvent("remove-user", {
              detail: data?.get("user-login"),
            })
          );
          removeUserModal.reset();
          removeUserModal.hide();
        },
      },
    });
    const MessageFormElement = new MessageForm({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          MessageFormElement.submit();
        },
      },
    });
    const removeChatModal = new SmallForm({
      title: "Подтвердите действие",
      id: "confirm-modal",
      content: `
    <div class = "form-confirm__btns">
      <button class = "btn btn_cancel form-confirm__btn">Удалить</button>
      <button class = "btn form-confirm__btn">Оставить</button>
    </div>
    `,
      events: {
        click: (event?: Event) => {
          event?.preventDefault();
          const target = event!.target as HTMLElement | null;
          if (target && target.classList.contains("btn_cancel")) {
            this.element.dispatchEvent(new Event("remove-chat"));
            return removeChatModal.hide();
          }
          if (target && target.classList.contains("form-confirm__btn")) {
            removeChatModal.hide();
          }
        },
      },
    });

    this.children = {
      UserPhoto: new Photo({ photoSrc: this.props.avatar, attributes: { class: "chat-profile__img", alt: this.props.title } }),
      Messages: [],
      Modals: [removeChatModal, removeUserModal, addUserModal, changePhotoModal, addPhotoModal, addFileModal],
      MessageFormEl: MessageFormElement,
    };
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!deepEqual(oldProps, newProps)) {
      this.fillMessages();
      this.element.dispatchEvent(new CustomEvent("updated"));
      return true;
    }

    return false;
  }

  fillMessages() {
    if (this.props.activeChat?.messages) {
      this.children.Messages = [];
      const currentUser = store.getState().user as Record<string, unknown>;
      this.props.activeChat.messages.forEach((message: Record<string, unknown>) => {
        const isCurrentUser = currentUser.id === message.user_id;
        const messageTime = new Date(`${message.time}`);
        const messageBlock = new Message({
          text: `${message.content}`,
          time: `${messageTime.getHours()}:${messageTime.getMinutes() < 10 ? "0" : ""}${messageTime.getMinutes()}`,
          isIncoming: !isCurrentUser,
        });
        (this.children.Messages as Block[]).push(messageBlock);
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default connect(ActiveChatPage, (state) => {
  return {
    activeChat: { ...state.activeChat! },
  };
});
