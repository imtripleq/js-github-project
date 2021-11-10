//////// Define
// const search = document.querySelector("#search");
// const submit = document.querySelector("submit");
/////////

const dataUrl = "https://api.github.com/search/users?q=";

const getUser = (username) => {
  fetch(dataUrl + username)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.items);
      document.querySelector("#github-container").innerHTML = "";
      showGit(data);
    });
};

const searchActive = () => {
  document.querySelector("#github-form").addEventListener("submit", (e) => {
    const search = document.querySelector("#search").value;
    e.preventDefault();
    getUser(search);
  });
};

const showGit = (e) => {
  ///////// Create Git profile
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const a = document.createElement("a");
  const linktext = document.createTextNode("GitHub Url");
  const urlBtn = document.createElement("button");
  const search = document.querySelector("#search").value;
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(a);
  div.appendChild(img);
  div.appendChild(urlBtn);
  urlBtn.setAttribute("class", "btn-primary");
  urlBtn.setAttribute("type", "submit");
  urlBtn.innerText = "Get repo list";
  h2.innerHTML = `${e.items[0].login}`;
  p.innerHTML = `Id number: ${e.items[0].id}`;
  img.setAttribute("src", `${e.items[0].avatar_url}`);
  a.appendChild(linktext);
  a.title = "GitHub Url";
  a.href = `${e.items[0].html_url}`;
  document.querySelector("#github-container").appendChild(div);
  document.querySelector(".btn-primary").addEventListener("click", () => {
    console.log("clicked");

    repoList(search);
  });
};

//// Selecting button and append

////// Get repo list
const repoList = (gitUser) => {
  fetch(`https://api.github.com/users/${gitUser}/repos`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // data.forEach((a) => console.log(a.name));
      showRepoList(data);
      console.log(data);
    });
};

////// Appending to html
const showRepoList = (lists) => {
  lists.forEach((i) => {
    const ul = document.getElementById("repos-list");
    const li = document.createElement("li");
    li.innerHTML = i.name;
    ul.appendChild(li);

    // console.log(i.name);
  });
};

/////// Loader
document.addEventListener("DOMContentLoaded", () => {
  searchActive();
});
