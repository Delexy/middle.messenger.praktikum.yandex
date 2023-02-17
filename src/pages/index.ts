import renderDOM from "../utils/renderDOM";

renderDOM(document.body, '/authentication');

document.addEventListener("click", function(event: Event) {
  const target = event.target as HTMLElement;
  const link = target.getAttribute('href');
  if(target && target.nodeName === "A" &&  link !== null) {
    event.preventDefault();
    renderDOM(document.body, link);
  }
});
