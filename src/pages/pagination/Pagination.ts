import template from "./template.pug";
import Block from "../../components/Block/Block";
import { PAGES } from "../../utils/renderDOM";
import Button from "../../components/Button/Button";

const btnStyle = "margin-bottom: 2rem;";

class PaginationPage extends Block {
  init() {
    this.children = {
      links: [
        new Button({ text: "Чаты", href: PAGES.index, attributes: { style: btnStyle } }),
        new Button({ text: "Авторизация", href: PAGES.auth, attributes: { style: btnStyle } }),
        new Button({ text: "Регистрация", href: PAGES.registration, attributes: { style: btnStyle } }),
        new Button({ text: "ЛК: Просмотр данных", href: PAGES.profile, attributes: { style: btnStyle } }),
        new Button({ text: "ЛК: Редактирование данных", href: PAGES.profileEdit, attributes: { style: btnStyle } }),
        new Button({ text: "ЛК: Редактирование пароля", href: PAGES.changePassword, attributes: { style: btnStyle } }),
        new Button({ text: "404", href: PAGES.unknown, attributes: { style: btnStyle } }),
        new Button({ text: "500", href: PAGES.serverError, attributes: { style: btnStyle } }),
      ],
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default PaginationPage;
