const login_form = document.querySelector(".login-form");
const inputs = document.querySelectorAll(".login-form input");
const btn = document.querySelector("#login-btn");

login_form.addEventListener("input", (e) => {
  let valid_count = [...inputs].filter((input) =>
    input.checkValidity()
  ).length;

  btn.disabled = valid_count < 2;
  btn.classList.toggle("disabled", valid_count < 2);

});

login_form.addEventListener("submit", (e) => {
  let valid_count = [...inputs].filter((input) =>
    input.checkValidity()
  ).length;
  console.log("SUBMIT:" , valid_count);
  e.preventDefault();
});

[...inputs].forEach((input) => {
  input.addEventListener("invalid", () => {
    console.log("INVAL");
  });
});