import { fetchAndRenderTasks } from "./main.js";

const host = "https://webdev-hw-api.vercel.app/api/v2/todos";
export let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

export function getTodos() {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        // password = prompt("Введите верный пароль");
        fetchAndRenderTasks();
        throw new Error('Нет авторизации');
      }
      return response.json();
    })
};

///////////////////////////

export function postTodo({ text }) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text: text, //можно оставить только  text т.к. названия одинаковые
    }),
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
};



///////////////////////

// export function deleteTodo({ id }) {
//   fetch("https://webdev-hw-api.vercel.app/api/v2/todos/" + id, {
//     method: "DELETE",
//     headers: {
//       Authorization: password,
//     },
//   }).then((response) => {
//     return response.json();
//   })
// }