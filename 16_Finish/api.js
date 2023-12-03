import { token } from "./autorize.js";
import { apiGet } from "./main.js";

export function getTodo() {
  return fetch(
    "https://wedev-api.sky.pro/api/v2/artem-katkov/comments",
    {
      metod: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.json();
    })
}

export function postTodo({ textInApi, nameInApi, token }) {
  return fetch("https://wedev-api.sky.pro/api/v2/artem-katkov/comments"
    , {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: textInApi
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;"),
        name: nameInApi
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;"),
        forceError: true,
      })
    })
}

export function login({ login, password }) {
  console.log("Я в ЛОГИНЕ");
  console.log(login);
  console.log(password);
  return fetch("https://wedev-api.sky.pro/api/user/login"
    , {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Неверный логин или пароль");
      }
      return response.json();
    });
}

export function deleteCommentApi({ id }) {
  return fetch("https://wedev-api.sky.pro/api/v2/artem-katkov/comments/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response);
    if (response.status === 500) {
      throw new Error("Сервер не доступен")
    } else {
      return response.json();
    }
  });
}

export function toggleLike({ id }) {
  return fetch(`https://wedev-api.sky.pro/api/v2/artem-katkov/comments/${id}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export function register({ login, password, name }) {
  console.log("Я в регистрации");
  console.log(login);
  console.log(password);
  console.log(name);
  return fetch("https://wedev-api.sky.pro/api/user"
    , {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
        name,
      }),
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Такой пользователь уже существует");
      }
      return response.json();
    });
}