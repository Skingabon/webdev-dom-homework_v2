

export function getTodos() {
   return fetch("https://webdev-hw-api.vercel.app/api/todos", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
  };

  ///////////////////////////

  export function postTodo({ text }) {
    return fetch("https://webdev-hw-api.vercel.app/api/todos", {
        method: "POST",
        body: JSON.stringify({
          text: text, //можно оставить только  text т.к. названия одинаковые
        }),
      })
        .then((response) =>{
          return response.json();
        })
  };


  ///////////////////////