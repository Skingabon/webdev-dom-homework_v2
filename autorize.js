import { login, register } from './api.js';
import { renderComment } from './render.js';
export let userName = localStorage.getItem('user');
export let userLogin = localStorage.getItem('login');
export let token = localStorage.getItem('token');
export const setToken = (newToken) => {
    token = newToken;
};

export function autorizeRender(isLoginMode = true) {
    const appHTML = document.getElementById('app');
    const loginHTML = `<div class = 'autorizeForm'> 
        <h1 class = 'form-title'>Форма ${
            isLoginMode ? 'Входа' : 'Регистрации'
        }</h1>
        <div>
        ${
            isLoginMode
                ? ''
                : `
            <input type="text" 
class="add-form-name" 
placeholder="Введите ваше имя" 
id="input-name2" />
            `
        }
      <input type="text" 
      class="add-form-text" 
      placeholder="Введите ваш логин" 
      id="input-login"></textarea>
        <input type="password" 
        class="add-form-text" 
        placeholder="Введите ваш пароль" 
        id="input-password"></textarea>
        <div class="add-form-row">
        <button class="add-form-button" id="login-button">${
            isLoginMode ? 'Войти' : 'Зарегистрироваться'
        }</button>
        <button class="add-form-button" id="toggle-button">Перейти ${
            isLoginMode ? 'к регистрации' : 'ко входу'
        } </button>
</div>
</div>
        `;
    appHTML.innerHTML = loginHTML;

    document.getElementById('toggle-button').addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        console.log('Я в кнопке перейти к регистрации');
        autorizeRender(isLoginMode);
    });

    document.getElementById('login-button').addEventListener('click', () => {
        if (isLoginMode) {
            const loginForm = document.getElementById('input-login').value;
            const passwordForm =
                document.getElementById('input-password').value;
            if (!loginForm) {
                alert('Введите Ваш логин');
                return;
            }
            if (!passwordForm) {
                alert('Введите Ваш пароль');
                return;
            }
            login({
                login: loginForm,
                password: passwordForm,
            })
                .then((response) => {
                    token = response.user.token;
                    userName = response.user.name;
                    console.log(userName);
                    localStorage.setItem('user', userName);
                    localStorage.setItem('token', token);
                    renderComment();
                })
                .catch((error) => {
                    alert(error.message);
                });
        } else {
            const nameForm = document.getElementById('input-name2').value;
            const loginForm = document.getElementById('input-login').value;
            const passwordForm =
                document.getElementById('input-password').value;

            if (!nameForm) {
                alert('Введите Ваше имя');
                return;
            }
            if (!loginForm) {
                alert('Введите Ваш логин');
                return;
            }
            if (!passwordForm) {
                alert('Введите Ваш пароль');
                return;
            }
            register({
                login: loginForm,
                password: passwordForm,
                name: nameForm,
            })
                .then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    token = user.user.token;
                    userName = user.user.name;
                    localStorage.setItem('user', userName);
                    localStorage.setItem('token', token);
                    renderComment();
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    });
}
autorizeRender();
