import AuthAPI from "../API/AuthAPI";
import { Router } from "../Modules/Router/Router";
import Store from "../Modules/Store/Store";
import { PAGES, PAGES_ROUTES } from "../utils/renderDOM"
import ChatsAPI from "./main/ChatsAPI";

const AuthAPIEntity = new AuthAPI();

Object.keys(PAGES_ROUTES).forEach((pathname: string) => {
  Router.use(pathname, PAGES_ROUTES[pathname]);
});

AuthAPIEntity.getUser().then(user => {
  if(user) {
    Store.set('user', user);
    
    setInterval(() => {
      AuthAPIEntity.getUser().then(user => {
        if(!user) {
          Store.set('user', undefined);
          Router.go(PAGES['auth'])
        } else {
          Store.set('user', {...user});
        }
      });
    }, 5000);
  }
  Router.start();
});

document.addEventListener("click", function(event: Event) {
  let target = event.target as HTMLElement;
  if(target.nodeName !== "A") {
    target = target.closest("a") || target;
  }
  const link = target.getAttribute('href');
  if(target && (target.closest("a") || target.nodeName === "A") &&  link !== null) {
    event.preventDefault();
    Router.go(link);
  }
});
