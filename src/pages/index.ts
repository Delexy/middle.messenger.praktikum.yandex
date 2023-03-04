import { default as Router } from "../Modules/Router/Router";
import { PAGES_ROUTES } from "../utils/renderDOM"

const router = new Router("#app");

Object.keys(PAGES_ROUTES).forEach((pathname: string) => {
  router.use(pathname, PAGES_ROUTES[pathname]);
});

router.start();

document.addEventListener("click", function(event: Event) {
  let target = event.target as HTMLElement;
  if(target.nodeName !== "A") {
    target = target.closest("a") || target;
  }
  const link = target.getAttribute('href');
  if(target && (target.closest("a") || target.nodeName === "A") &&  link !== null) {
    event.preventDefault();
    router.go(link);
  }
});
