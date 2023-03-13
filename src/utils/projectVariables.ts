export const userData: Record<string, string | null> = {
  email: "",
  login: "",
  first_name: "",
  display_name: "",
  second_name: "",
  phone: "",
  avatar: "",
};

export const fieldsNaming = {
  email: "Почта",
  login: "Логин",
  first_name: "Имя",
  second_name: "Фамилия",
  display_name: "Имя в чате",
  phone: "Телефон",
  avatar: "Аватар",
  password: "Пароль",
};

export const INPUT_VALIDATION_REGEXP: Record<string, RegExp> = {
  login: new RegExp(/^([A-Za-z0-9-_]{3,20})$/gm),
  first_name: new RegExp(/^([A-ZА-Я]){1}([A-Za-zА-Яа-я-])+$/gm),
  second_name: new RegExp(/^([A-ZА-Я]){1}([A-Za-zА-Яа-я-])+$/gm),
  email: new RegExp(/^\S+@\S+\.\S+$/gi),
  password: new RegExp(/^(?=.*[0-9])(?=.*[A-Z])([.\S]{8,40})$/g),
  phone: new RegExp(/^\+?[1-9][0-9]{10,15}$/gi),
  message: new RegExp(/^.+$/gim),
};

export const INPUT_ERRORS: Record<string, string> = {
  login: "Длина от 3 до 20 символов",
  first_name: "Поле введено неверно",
  second_name: "Поле введено неверно",
  email: "Email введён неверно",
  password: "Пароль должен быть от 8 до 40 символов",
  phone: "Телефон введён неверно",
};
