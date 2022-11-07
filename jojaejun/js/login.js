const idInput = document.getElementById("login-input-id");
const pwInput = document.getElementById("login-input-pw");
const loginButton = document.getElementsByClassName("login-button")[0];

let idValue = "";
let pwValue = "";

idInput.addEventListener("input", (e) => {
  idValue = e.target.value;

  updateLoginButtonDOM();
});

pwInput.addEventListener("input", (e) => {
  pwValue = e.target.value;

  updateLoginButtonDOM();
});

function updateLoginButtonDOM() {
  if (idValue !== "" && idValue.includes("@") && pwValue !== "") {
    loginButton.disabled = false;
    loginButton.style.cursor = "pointer";
  } else {
    loginButton.disabled = true;
    loginButton.style.cursor = "not-allowed";
  }
}
