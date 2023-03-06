import { Router } from "../Modules/Router/Router";
import { PAGES_ROUTES } from "../utils/renderDOM"


Object.keys(PAGES_ROUTES).forEach((pathname: string) => {
  Router.use(pathname, PAGES_ROUTES[pathname]);
});

Router.start();

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
