import template from './template.pug';
import Block from '../../components/Block/Block';
import Photo from '../../components/Photo/Photo';

type ProfileProps = {
  user?: Record<string, string>,
  userData?: string
  backUrl: string,
  changeProfileUrl: string,
  changePasswordUrl: string,
}

const userData = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  phone: '+79099673030',
}


// .profile-list__el
// p.profile-list__name= data[0]
// p.profile-list__value= data[1]

class ProfilePage extends Block {
	constructor(props?: ProfileProps) {
		super(props);
	}

  init() {
    this.props.user = userData;
    this.props.userData = this.compileUserData(),
    this.children = {
      Photo: new Photo({
        title: userData.first_name,
        attributes: {
          alt: userData.first_name
        }
      }),
    }
  }

  compileUserData(): string {
    return `
      <div class = "profile-list__el">
        <p class = "profile-list__name">Почта</p>
        <p class = "profile-list__value">${this.props.user.email}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Логин</p>
        <p class = "profile-list__value">${this.props.user.login}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Имя</p>
        <p class = "profile-list__value">${this.props.user.first_name}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Фамилия</p>
        <p class = "profile-list__value">${this.props.user.second_name}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Имя в чате</p>
        <p class = "profile-list__value">${this.props.user.login}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Телефон</p>
        <p class = "profile-list__value">${this.props.user.phone}</p>
      </div>
    `;
  }

	render() {
		return this.compile(template, this.props);
	}
}

export default ProfilePage;
