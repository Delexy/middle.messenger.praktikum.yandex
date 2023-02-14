import compileTemplate from "./profile/index.pug";

const app = document.body;

const pageProps = {
  userData: [
    ["Почта", "pochta@yan1dex.ru"],
    ["Логин", "ivanivanov"],
    ["Имя", "Иван"],
    ["Фамилия", "Иванов"],
    ["Имя в чате", "Иван"],
    ["Телефон", "+7 (909) 967 30 30"],
  ],
  userImg: "https://i.pinimg.com/236x/14/47/14/144714db6b6c2ee70e77273691de5f50.jpg",
};

app.insertAdjacentHTML('beforeend', compileTemplate(pageProps));

pageProps.userData[0][1] = "Почта";

setTimeout(() => {
  app.insertAdjacentHTML('beforeend', compileTemplate(pageProps));
}, 2000);
