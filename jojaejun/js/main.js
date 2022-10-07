const commentList = document.getElementsByClassName("feed-comment-list");
const commentButtonList = document.getElementsByClassName("feed-comment-input-button");

const commentArray = Array.from(commentList);
const commentButtonArray = Array.from(commentButtonList);

commentButtonArray.forEach((button, index) => {
  button.addEventListener("click", () => {
    const input = document.getElementsByClassName("feed-comment-input")[index];
    const commentList = document.getElementsByClassName("feed-comment-list")[index];

    const commentCard = document.createElement("div");
    commentCard.classList.add("feed-comment-card");

    const nicknameSpan = document.createElement("span");
    nicknameSpan.classList.add("highlight");
    nicknameSpan.textContent = "jtree03";

    const contentSpan = document.createElement("span");
    contentSpan.textContent = input.value;

    commentCard.append(nicknameSpan, contentSpan);
    commentList.append(commentCard);
  });
});
