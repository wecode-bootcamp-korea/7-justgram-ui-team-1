const replyList = document.getElementsByClassName("feedReply");
const commentButton = document.getElementsByClassName("feedInput-right");

const commentArray = Array.from(replyList);
const commentButtonArray = Array.from(commentButton);

commentButtonArray.forEach((button, index) => {
  button.addEventListener("click", () => {
    const input = document.getElementsByClassName("feedInput-left")[index];
    const commentList = document.getElementsByClassName("feedReply")[index];

    const commentCard = document.createElement("div");
    commentCard.classList.add("feedReply-ment");

    const nicknameSpan = document.createElement("span");
    nicknameSpan.classList.add("likeFont");
    nicknameSpan.textContent = "Kiminsee";

    const contentSpan = document.createElement("span");
    contentSpan.textContent = input.value;

    commentCard.append(nicknameSpan, contentSpan);
    commentList.append(commentCard);

    input.value = "";
  });
});
