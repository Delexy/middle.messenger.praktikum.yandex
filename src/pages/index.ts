import renderDOM from "../utils/renderDOM";
import { PAGES } from "../utils/renderDOM"

renderDOM(document.body, PAGES.profile);

document.addEventListener("click", function(event: Event) {
  const target = event.target as HTMLElement;
  const link = target.getAttribute('href');
  if(target && target.nodeName === "A" &&  link !== null) {
    event.preventDefault();
    renderDOM(document.body, link);
  }
});
