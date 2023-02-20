import RegistrationPage from '../pages/registration/RegistrationPage';
import AuthPage from '../pages/authentication/AuthPage';
import ErrorPage from '../pages/errors/ErrorPage';
import PaginationPage from '../pages/pagination/Pagination';
import ProfilePage from '../pages/profile/Profile';
import ProfileEditPage from '../pages/profileEdit/ProfileEdit';
import ChangePasswordPage from '../pages/changePassword/ChangePassword';
import ChatsPage from '../pages/main/Chats';

export const enum PAGES {
  index = '/index',
  unknown = '/404',
  serverError = '/500',
  auth = '/auth',
  registration = '/registration',
  pagination = '/pagination',
  profile = '/profile',
  profileEdit = '/profile/edit',
  changePassword = '/change-password'
}

const PAGES_ROUTES: Record<string, any> = {
  [PAGES.index]: new ChatsPage({ profileUrl: PAGES["profile"] }),
  [PAGES.unknown]: new ErrorPage({ status: 404, statusText: "Страница ушла, но обещала вернуться"}), 
  [PAGES.serverError]: new ErrorPage({ status: 500, statusText: "У нас что-то поломалось, уже чиним"}), 
	[PAGES.auth]: new AuthPage(),
  [PAGES.registration]: new RegistrationPage(),
  [PAGES.pagination]: new PaginationPage(),
  [PAGES.profile]: new ProfilePage({backUrl: PAGES.index, changeProfileUrl: PAGES.profileEdit, changePasswordUrl: PAGES.changePassword}),
  [PAGES.profileEdit]: new ProfileEditPage({ backUrl: PAGES.index }),
  [PAGES.changePassword]: new ChangePasswordPage({ backUrl: PAGES.index }),
}

export default function renderDOM(root: Element, pageName: string): void {
  root.innerHTML = "";
  const Component = PAGES_ROUTES[pageName];
  root.appendChild(Component.getContent());
  Component.dispatchComponentDidMount();
}
