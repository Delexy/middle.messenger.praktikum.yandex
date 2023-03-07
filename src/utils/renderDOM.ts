import RegistrationPage from '../pages/registration/RegistrationPage';
import AuthPage from '../pages/authentication/AuthPage';
import ErrorPage from '../pages/errors/ErrorPage';
import PaginationPage from '../pages/pagination/Pagination';
import ProfilePage from '../pages/profile/Profile';
import ProfileEditPage from '../pages/profileEdit/ProfileEdit';
import ChangePasswordPage from '../pages/changePassword/ChangePassword';
import ChatsPage from '../pages/main/Chats';
import Block from '../components/Block/Block';
import unknownPage from '../pages/errors/404';
import serverErrorPage from '../pages/errors/500';

export const enum PAGES {
  index = '/messenger',
  unknown = '/404',
  serverError = '/500',
  auth = '/',
  registration = '/sign-up',
  pagination = '/pagination',
  profile = '/settings',
  profileEdit = '/settings/edit',
  changePassword = '/change-password'
}

// export const PAGES_ROUTES: Record<string, Block> = {
//   [PAGES.index]: new ChatsPage({ profileUrl: PAGES["profile"] }),
//   [PAGES.unknown]: new ErrorPage({ status: 404, statusText: "Страница ушла, но обещала вернуться"}), 
//   [PAGES.serverError]: new ErrorPage({ status: 500, statusText: "У нас что-то поломалось, уже чиним"}), 
// 	[PAGES.auth]: new AuthPage(),
//   [PAGES.registration]: new RegistrationPage(),
//   [PAGES.pagination]: new PaginationPage(),
//   [PAGES.profile]: new ProfilePage({backUrl: PAGES.index, changeProfileUrl: PAGES.profileEdit, changePasswordUrl: PAGES.changePassword}),
//   [PAGES.profileEdit]: new ProfileEditPage({ backUrl: PAGES.profile }),
//   [PAGES.changePassword]: new ChangePasswordPage({ backUrl: PAGES.profile }),
// }

export const PAGES_ROUTES: Record<string, typeof Block> = {
  [PAGES.index]: ChatsPage,
  [PAGES.unknown]: unknownPage, 
  [PAGES.serverError]: serverErrorPage, 
	[PAGES.auth]: AuthPage,
  [PAGES.registration]: RegistrationPage,
  [PAGES.pagination]: PaginationPage,
  [PAGES.profile]: ProfilePage,
  [PAGES.profileEdit]: ProfileEditPage,
  [PAGES.changePassword]: ChangePasswordPage,
}

export default function renderDOM(rootQuery: string, Component: Block): void {
  const root = document.querySelector(rootQuery);
  if(root) {
    root.appendChild(Component.getContent());
    Component.dispatchComponentDidMount();
  }
}
