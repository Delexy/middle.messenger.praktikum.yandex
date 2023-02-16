import Button from "../components/button/Button";
import Input from "../components/input/Input";

const btn = new Button({
  text: "Hello"
});

const app = document.body;
let btnEl = btn.getContent();
app.appendChild(btnEl);

function rerender(componentEl, component) {
  componentEl.insertAdjacentElement('afterend', component.getContent());
  const temp = componentEl;
  componentEl = component.getContent();
  temp.remove();
  return componentEl;
}

setTimeout(() => {
  btn.setProps({
    text: 'newHello',
    events: {
      click: function(event) {
        console.log(event.target);
      }
    }
  });
  btnEl = rerender(btnEl, btn);
}, 1000);
