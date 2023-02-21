import { PAGES, default as renderDOM } from "../utils/renderDOM"

const globalRoot = document.querySelector("#app") as HTMLElement;

renderDOM(globalRoot, PAGES.pagination);

document.addEventListener("click", function(event: Event) {
  let target = event.target as HTMLElement;
  if(target.nodeName !== "A") {
    target = target.closest("a") || target;
  }
  const link = target.getAttribute('href');
  if(target && (target.closest("a") || target.nodeName === "A") &&  link !== null) {
    event.preventDefault();
    renderDOM(globalRoot, link);
  }
});
