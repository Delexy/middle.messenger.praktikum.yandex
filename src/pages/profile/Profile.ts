import template from './template.pug';
import { userData, fieldsNaming } from '../../utils/projectVariables';
import Block from '../../components/Block/Block';
import Photo from '../../components/Photo/Photo';

type ProfileProps = {
  user?: Record<string, string>,
  userData?: string
  backUrl: string,
  changeProfileUrl: string,
  changePasswordUrl: string,
  fieldsNaming?: Record<string, string>
}

class ProfilePage extends Block {
	constructor(props?: ProfileProps) {
    if(props) {
      props.user = userData;
      props.fieldsNaming = fieldsNaming;
    }

		super(props);
    
	}

  init() {
    this.children = {
      Photo: new Photo({
        title: this.props.user.first_name,
        photoSrc: this.props.user.avatar,
        attributes: {
          alt: this.props.user.first_name
        }
      }),
    }
  }

  compileUserData(): string {
    return `
      <div class = "profile-list__el">
        <p class = "profile-list__name">Почта</p>
        <p class = "profile-list__value">${this.props.fieldsNaming.email}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Логин</p>
        <p class = "profile-list__value">${this.props.fieldsNaming.login}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Имя</p>
        <p class = "profile-list__value">${this.props.fieldsNaming.first_name}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Фамилия</p>
        <p class = "profile-list__value">${this.props.fieldsNaming.second_name}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Имя в чате</p>
        <p class = "profile-list__value">${this.props.fieldsNaming.login}</p>
      </div>
      <div class = "profile-list__el">
        <p class = "profile-list__name">Телефон</p>
        <p class = "profile-list__value">${this.props.fieldsNaming.phone}</p>
      </div>
    `;
  }

	render() {
		return this.compile(template, this.props);
	}
}

export default ProfilePage;
