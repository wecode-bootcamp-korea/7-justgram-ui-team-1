const inputId = document.querySelector("#idOn");
const inputPassword = document.querySelector("#pwOn");
const button = document.querySelector(".btn");

function loginBtn() {
  let idValue = inputId.value;
  let passwordValue = inputPassword.value;

  if (idValue.length > 0 && passwordValue.length > 0) {
    button.disabled = false;
    button.style.backgroundColor = "#1c7ed6";
  } else {
    button.disabled = true;
    button.style.backgroundColor = "#bfdffd";
  }
}

inputId.addEventListener("keyup", loginBtn);
inputPassword.addEventListener("keyup", loginBtn);