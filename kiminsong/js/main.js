const commentInput = document.getElementsByClassName("feedReply");
const pushBtn = document.getElementsByClassName("feedInput-right");

const commentArray = Array.from(commentInput);
const commentButtonArray = Array.from(pushBtn);

commentButtonArray.forEach((button, index) => {
  button.addEventListner("click", () => {
    const input = document.getElementsByClassName("feedInput-left")[index];
    const commentList = document.getElementsByClassName("feedReply")[index];

    const commentCard = document.createElement("div");
    commentCard.classList.add("feedReply-ment");

    const nicknameSpan = document.createElement("span");
    nicknameSpan.textContent = "Kiminsee";

    const contentSpan = document.createElement("span");
    contentSpan.textContent = input.value;

    commentCard.append(nicknameSpan, contentSpan);
    commentList.append(commentCard);
  });
});
