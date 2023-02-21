export const userData: Record<string, string | null> = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
	display_name: 'Иван',
  second_name: 'Иванов',
  phone: '+79099673030',
	avatar: '',
}

export const fieldsNaming = {
	email: 'Почта',
	login: 'Логин',
	first_name: 'Имя',
	second_name: 'Фамилия',
	display_name: 'Имя в чате',
	phone: 'Телефон',
	avatar: 'Аватар',
  password: 'Пароль'
}

export const INPUT_VALIDATION_REGEXP: Record<string, RegExp> = {
  login: new RegExp(/^([A-Z]|[А-Я])([^.^$*+?()[{|/]+?){3,19}/gm),
  first_name: new RegExp(/^([A-Z]|[А-Я])[^.^$*+?()[{|/]+/gm),
  second_name: new RegExp(/^([A-Z]|[А-Я])[^.^$*+?()[{|/]+/gm),
  email: new RegExp(/^\S+@\S+\.\S+$/gi),  
  password: new RegExp(/.{8,40}/g),
  phone: new RegExp(/^\+?[1-9][0-9]{10,15}$/gi),
};
