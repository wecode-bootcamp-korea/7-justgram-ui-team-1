const login_form = document.querySelector(".login-form");
const inputs = document.querySelectorAll(".login-form input");
const btn = document.querySelector("#login-btn");

// input이 모두 valid하면 true 반환
function isAllValid(list) {
  let valid_count = [...list].filter((item) =>
    item.checkValidity()
  ).length;
  return list.length == valid_count;
}

// 폼 업데이트
function updateFormStatus() {
  btn.disabled = !isAllValid(inputs);
  btn.classList.toggle("disabled", !isAllValid(inputs));
}

// 리스너 등록
login_form.addEventListener("input", updateFormStatus);

login_form.addEventListener("submit", () => {
  updateFormStatus();
  console.log("SUBMIT:" , valid_count);
  e.preventDefault();
});


// invalid 리스너 테스트
[...inputs].forEach((input) => {
  input.addEventListener("invalid", () => {
    console.log("INVAL");
  });
});