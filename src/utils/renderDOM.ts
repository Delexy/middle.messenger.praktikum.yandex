import RegistrationPage from '../pages/registration/RegistrationPage';
import AuthPage from '../pages/authentication/AuthPage';

const PAGES_ROUTES: Record<string, any> = {
	'/authentication': AuthPage,
  '/registration': RegistrationPage,
}

export default function renderDOM(root: Element, pageName: string): void {
  root.innerHTML = "";
  const Component = new PAGES_ROUTES[pageName]();
  root.appendChild(Component.getContent());
  Component.dispatchComponentDidMount();
}
