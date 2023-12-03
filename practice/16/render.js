

import { token } from "./api.js";
import { fetchAndRenderTasks, tasks } from "./main.js";

export function renderTodo() {
  const listElement = document.getElementById("list");//т.к. перменная listElement в этом модлуле не существует

  const tasksHtml = tasks
    .map((task) => {
      return `
        <li class="task">
          <p class="task-text">
            ${task.text}
            <button data-id="${task.id}" class="button delete-button">Удалить</button>
          </p>
        </li>`;
    })
    .join("");

  listElement.innerHTML = tasksHtml;
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = deleteButton.dataset.id;

      fetch("https://webdev-hw-api.vercel.app/api/v2/todos/" + id, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          fetchAndRenderTasks();
        });
    });
  }
}

