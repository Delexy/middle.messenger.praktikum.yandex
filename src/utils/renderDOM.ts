import RegistrationPage from '../pages/registration/RegistrationPage';
import AuthPage from '../pages/authentication/AuthPage';
import ErrorPage from '../pages/errors/ErrorPage';
import PaginationPage from '../pages/pagination/Pagination';
import ProfilePage from '../pages/profile/Profile';

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
  [PAGES.index]: 123,
  [PAGES.unknown]: new ErrorPage({ status: 404, statusText: "Страница ушла, но обещала вернуться"}), 
  [PAGES.serverError]: new ErrorPage({ status: 500, statusText: "У нас что-то поломалось, уже чиним"}), 
	[PAGES.auth]: new AuthPage(),
  [PAGES.registration]: new RegistrationPage(),
  [PAGES.pagination]: new PaginationPage(),
  [PAGES.profile]: new ProfilePage({backUrl: PAGES.index, changeProfileUrl: PAGES.profileEdit, changePasswordUrl: PAGES.changePassword}),
}

export default function renderDOM(root: Element, pageName: string): void {
  root.innerHTML = "";
  const Component = PAGES_ROUTES[pageName];
  root.appendChild(Component.getContent());
  Component.dispatchComponentDidMount();
}
