import RegistrationPage from './registration/RegistrationPage';
const page = new RegistrationPage();


const app = document.body;
app.appendChild(page.getContent());
page.dispatchComponentDidMount();

