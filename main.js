import { getTodo, postTodo, toggleLike } from "./api.js";
import { renderComment } from "./render.js";
import { setToken, token, userName } from "./autorize.js";
import { format } from "date-fns";
const buttonElement = document.getElementById("add-button");

export let comments = [];

const createDate = format(new Date(comments.created_at), "MM///dd-yyyy hh:mm");
const now = new Date();
format(now, "MM-dd-yyyy hh:mm"); // 03-26-2023 10:33

function correctDate(date) {
  let currentDate = new Date(date);
  let todayDay = currentDate.getDate();
  let todayMonth = currentDate.getMonth() + 1;
  let todayYear = String(currentDate.getFullYear()).slice(-2);
  let todayHours = currentDate.getHours();
  let todayMinutes = currentDate.getMinutes();
  todayDay = todayDay < 10 ? "0" + todayDay : todayDay;
  todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
  todayHours = todayHours < 10 ? "0" + todayHours : todayHours;
  todayMinutes = todayMinutes < 10 ? "0" + todayMinutes : todayMinutes;

  let formattedDate = `${todayDay}.${todayMonth}.${todayYear} ${todayHours}:${todayMinutes} `;
  return formattedDate;
}

export function apiFormHide() {
  //Порячу форму добавления коментария
  //console.log("apiFormHide");
  const apiFormHide = document.querySelector(".add-form");
  apiFormHide.classList.add("hidden");
}

export function apiFormShow() {
  //Показываю форму добавления коментария

  const apiFormShow = document.querySelector(".add-form");
  apiFormShow.classList.remove("hidden");
}

function showCommentLoading() {
  //Показываю (удаляю в стилях блок) временный текст до загрузки комментариев

  const showCommentLoading = document.querySelector(".api-loader");
  showCommentLoading.classList.remove("hidden");
}

function hideCommentLoading() {
  //Удаляю (возвращаю блок) временный текст до загрузки комментариев
  const hideCommentLoading = document.querySelector(".api-loader");
  hideCommentLoading.classList.add("hidden");
}

function showCommentAdd() {
  const showCommentAdd = document.querySelector(".comment-add");
  showCommentAdd.classList.remove("hidden");
}

function hideCommentAdd() {
  const hideCommentAdd = document.querySelector(".comment-add");
  hideCommentAdd.classList.add("hidden");
}

export function showInternetError() {
  const showInternetError = document.querySelector(".internet-error");
  showInternetError.classList.remove("hidden");
}
export function hideInternetError() {
  const hideInternetError = document.querySelector(".internet-error");
  hideInternetError.classList.add("hidden");
}

export function hideAutorizeForm() {
  const hideCommentLoading = document.querySelector(".autorizeForm");
  hideCommentLoading.classList.add("hidden");
}

export function apiGet() {
  renderComment();
  showCommentLoading();
  getTodo().then((responseData) => {
    console.log(responseData);

    const apiComment = responseData.comments.map((comment) => {
      return {
        id: comment.id,
        name: comment.author.name,
        data: createDate(comment.date),
        text: comment.text,
        like: comment.likes,
        isLiked: comment.isLiked,
      };
    });
    comments = apiComment;
    hideCommentLoading();
    renderComment();
  });
}

apiGet();

export function addComment() {
  const buttonElement = document.getElementById("add-button");
  const nameInputElemnt = document.getElementById("input-name");
  const commentInputElement = document.getElementById("input-comment");
  const buttonExit = document.getElementById("exit-button");

  buttonExit.addEventListener("click", () => {
    // alert("До свидания. Возвращайтесь.");

    localStorage.removeItem("token");
    setToken(null);
    return apiGet(); //перерендерить
  });

  buttonElement.addEventListener("click", () => {
    nameInputElemnt.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElemnt.value === "" || commentInputElement.value === "") {
      alert("Заполните ИМЯ и ваш комментарий, пожалуйста.");
      return;
    }

    hideInternetError();
    showCommentAdd();

    postTodo({
      textInApi: commentInputElement.value,
      nameInApi: nameInputElemnt.value,
      token,
    })
      .then((response) => {
        hideCommentAdd();
        if (response.status === 500) {
          throw new Error("500");
        }
        if (response.status === 400) {
          throw new Error("400");
        }

        apiFormShow();
        nameInputElemnt.value = "";
        commentInputElement.value = "";
        apiGet();
        hideCommentLoading();
      })
      .catch((error) => {
        if (error.message === "500") {
          alert("Сервер сломаааался.");
        }
        if (error.message === "400") {
          alert("Имя и комментарий должны быть не короче 3 символов.");
        }
        if (error.message === "Failed to fetch") {
          showInternetError();
          alert("Кажется, у вас сломался интернет, попробуйте позже.");
        }
        console.warn(error);
      });
  });
}

//Написал функцию. которая инициализирует обработчики кликов по кнопкам Лайк
///////НУЖНО ПЕРЕДАТЬ В РЕНДЕР МОДУЛЬ В КАЧЕСТВЕ ПАРАМЕТРА

export function addLikeEventListeners() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleLike({ id: comments[index].id }).then(() => {
        apiGet();
      });
    });
  });
}

addLikeEventListeners();

// ///////НУЖНО ПЕРЕДАТЬ В РЕНДЕР МОДУЛЬ В КАЧЕСТВЕ ПАРАМЕТРА
export function oncommentClickEventListener() {
  const commentUpdate = document.querySelectorAll(".comment");
  for (const comment of commentUpdate) {
    comment.addEventListener("click", () => {
      const commentInputElement = document.getElementById("input-comment");
      console.log("Нажал на коментарий");
      let index = comment.dataset.index;
      let object = comments[index];
      if (userName === comments[index].name) {
        return;
      }
      commentInputElement.value = `${object.text} // ${object.name}`;
      console.log(commentInputElement.value);
    });
  }
}
