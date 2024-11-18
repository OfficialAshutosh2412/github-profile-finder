let searchButton = document.getElementById("search");
let section = document.getElementById("dataBody");
searchButton.addEventListener("click", () => {
  section.innerHTML = `<span class="loader"></span>`;
  let username = document.getElementById("username").value;
  if (username == "") {
    section.innerHTML = `<h1 class="error empty"><i class="fa-solid fa-circle-exclamation"></i> Finder is empty</h1>`;
    return;
  }
  fetchData(username);
});

async function fetchData(username) {
  let api = `https://api.github.com/users/${username}`;
  let res = await fetch(api);
  let data = await res.json();
  if (res.status === 200) {
    sectionBody(data);
  } else {
    section.innerHTML = `<h1 class="error"><i class="fa-regular fa-circle-xmark"></i> User not found</h1>`;
  }
}

function sectionBody({
  name,
  avatar_url,
  bio,
  followers,
  following,
  public_repos,
  html_url,
}) {
  let bodyofsection = `
        <div class="left">
            <img
                src="${avatar_url}"
                alt=""
            />
            <h1>${name == null ? "Name not given" : name}</h1>
            <p>
                ${bio == null ? "Bio not given" : bio}
            </p>
            <div class="data">
                <div>
                    <h2>Followers</h2>
                    <p>${followers == null ? 0 : followers}</p>
                </div>
                <div>
                    <h2>Followings</h2>
                    <p>${following == null ? 0 : following}</p>
                </div>
                <div>
                    <h2>Repos</h2>
                    <p>${public_repos == null ? 0 : public_repos}</p>
                </div>
            </div>
            <a href="${html_url}" target="_blank">visit profile</a>
      </div>
    `;
  section.innerHTML = bodyofsection;
}
