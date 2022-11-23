window.onload = function () {
  const formElement = document.getElementById("github-form");
  const submitButton = formElement.lastElementChild;
  const searchInp = document.getElementById("search");
  const repoButton = document.createElement("input");
  repoButton.setAttribute("id", "repoBtn");
  repoButton.setAttribute("type", "submit");
  repoButton.setAttribute("name", "submitRepo");
  formElement.appendChild(repoButton);

  repoBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    showUserRepo();
  })

  function showUserList() {
    const userLists = document.getElementById("user-list");

    let getMeth = {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };

    fetch(`https://api.github.com/search/users?q=${searchInp.value}`, getMeth)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.items);
        data.items.map((user) => {
          userLists.innerHTML += `<li id="userID"><a href="#">${user.login}</a><br><a href=${user.html_url}>${user.html_url}</i><br><img src=${user.avatar_url} /></li><br>`;
        });
        userID.addEventListener("click", (event) => {
          console.log("click");
            event.preventDefault();
            showUserRepo();
          });
      });
  }

  function showUserRepo() {
    const respoLists = document.getElementById("repos-list");

    fetch(`https://api.github.com/users/${searchInp.value}/repos`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        data.map((repo)=>{
            respoLists.innerHTML += `<li>${repo.name}</li>`
        })
      });
  }

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(searchInp.value);
    showUserList();
  });

  
};
