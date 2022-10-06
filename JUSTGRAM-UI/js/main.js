const commentInput = document.getElementsByClassName("feedReply")[0];
const pushBtn = document.getElementsByClassName("feedInput-left")[0];

console.log(commentInput, pushBtn);

const commentArray = Array.from(commentInput);
const commentButtonArray = Array.from(pushBtn);

console.log(commentArray, commentButtonArray);

commentButtonArray.forEach((button, index) => {
  button.addEventListner("click", () => {
    const input = document.getElementsByClassName("feedInput-left")[index];
    const commetList = document.getElementsByClassName("feedReply")[index];

    const commentCard = document.createElement("div");
    commentCard.classList.add("feedReply-ment");

    const nicknameSpan = document.createElement("span");
    nicknameSpan.classList.add("likeFont");
    nicknameSpan.textContent = "Kiminsee";

    const contentSpan = document.createElement("span");
    contentSpan.textContent = input.value;

    commentCard.append(nicknameSpan, contentSpan);
    commetList.append(commentCard);
  });
});
