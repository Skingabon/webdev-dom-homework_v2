
import { getTodos, postTodo } from './api.js';
import { sanitizeHtml } from './sanitizeHtml.js';
import { renderTodo } from './render.js';


    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    export let tasks = [];

    ////////////////////перенес запрос GET  в модуль
    export const fetchAndRenderTasks = () => {
     getTodos().then((responseData) => {
          tasks = responseData.todos;
          renderTodo();
          return true;
        });
    }
///////////////////////перенес РЕНДЕР  в модуль

    // const renderTasks = () => {
    //   const tasksHtml = tasks
    //     .map((task) => {
    //       return `
    //       <li class="task">
    //         <p class="task-text">
    //           ${task.text}
    //           <button data-id="${task.id}" class="button delete-button">Удалить</button>
    //         </p>
    //       </li>`;
    //     })
    //     .join("");

    //   listElement.innerHTML = tasksHtml;
    //   const deleteButtons = document.querySelectorAll(".delete-button");

    //   for (const deleteButton of deleteButtons) {
    //     deleteButton.addEventListener("click", (event) => {
    //       event.stopPropagation();

    //       const id = deleteButton.dataset.id;

    //       fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
    //         method: "DELETE",
    //       })
    //         .then((response) => {
    //           return response.json();
    //         })
    //         .then(() => {
    //           fetchAndRenderTasks();
    //         });
    //     });
    //   }
    // };

    fetchAndRenderTasks();

    buttonElement.addEventListener("click", () => {
      if (textInputElement.value === "") {
        return;
      }

      buttonElement.disabled = true;
      buttonElement.textContent = "Элемент добавлятся...";

      // fetch("https://webdev-hw-api.vercel.app/api/todos", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     text: textInputElement.value,
      //   }),
      // })
      //   .then((response) =>{
      //     return response.json();
      //   })
        postTodo({ 
          text: textInputElement.value,
        }).then(() => {
          return fetchAndRenderTasks();
        })
        .then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = "Добавить";
          textInputElement.value = "";
        });

      // renderTasks();
    });



    const tasksHtml = tasks
    .map((task) => {
      return `
      <li class="task">
        <p class="task-text">
       ${sanitizeHtml(task.text)}
          <button data-id="${task.id}" class="button delete-button">Удалить</button>
        </p>
      </li>`;
    })
    .join("");
