import { deleteCommentApi, login } from './api.js';
import { autorizeRender, token, userName } from './autorize.js';
import { addComment, addLikeEventListeners, apiGet, comments, oncommentClickEventListener } from './main.js'

export const renderComment = () => {

  const appHTML = document.getElementById('app');
  const buttonAutorize = '<button class="autorize-button"> Авторизоваться </button>';
  const formAccesUser = `<div class="add-form">
  <input type="text" class="add-form-name" placeholder="Введите ваше имя" 
  value = ${userName}
  readonly
  id="input-name" />
  <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    id="input-comment"></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="add-button">Написать</button>
    <button class="add-form-button" id="delete-button">Удалить</button>
    <button class="add-form-button" id="exit-button">Выход</button>
  </div>
  </div>`
  const commentsHTML = comments.map((comment, index) => {

    return `
    <li data-index="${index}" class="comment">

          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.data}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span data-index="${index}" class="likes-counter">${comment.like}</span>
              <button data-index="${index}" class="like-button 
              ${comment.isLiked ? 'active-like' : ''}"></button>
            </div>
          </div>
        </li>`;
  }).join('');
  appHTML.innerHTML = `
    <div class="api-loader hidden">
      <span>Данные загружаются, нужно немного подождать...</span>
    </div>

  <ul class="comments" id="list">
  
  ${commentsHTML}
  </ul>
  <div class="comment-add hidden">
      <span>Комментарий добавляется...</span>
    </div>
    <div class="internet-error hidden">
      <span>Неполадки с Интеренетом. Отправьте комментарий позже...</span>
    </div>

${(!token) ? buttonAutorize : formAccesUser}
`
  if (token) { addComment() }
  if (!token) {
    console.log(token);
    const autorizeButton = document.querySelector('.autorize-button');
    autorizeButton.addEventListener('click', () => {
      autorizeRender();
    })
  }

  function deleteComment() {
    if (!token) return;
    const deleteButtonComment = document.getElementById("delete-button");
    deleteButtonComment.addEventListener("click", () => {
      deleteCommentApi({ id: comments[comments.length - 1].id }).then(() => {
        apiGet({ comments });
      }).catch((err) => {
      });
    })
  }
  deleteComment();
  addLikeEventListeners();
  oncommentClickEventListener();
};