const replyList = document.getElementsByClassName("feedReply");
const commentButton = document.getElementsByClassName("feedInput-right");
const commentInputList = document.getElementsByClassName("feedInput-left");

const commentArray = Array.from(replyList);
const commentButtonArray = Array.from(commentButton);
const commentInputArray = Array.from(commentInputList);

commentButtonArray.forEach((button, index) => {
  button.addEventListener("click", () => {
    const input = document.getElementsByClassName("feedInput-left")[index];
    const commentList = document.getElementsByClassName("feedReply")[index];

    updateCommentListDom(input.value, commentList, "Kiminsee");
    input.value = "";
  });
});

commentInputArray.forEach((input, index) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const commentList = document.getElementsByClassName("feedReply")[index];

      updateCommentListDom(input.value, commentList, "Kiminsee");
      input.value = "";
    }
  });
});

function updateCommentListDom(value, commentList, writer) {
  const commentCard = document.createElement("div");
  commentCard.classList.add("feedReply-ment");

  const nicknameSpan = document.createElement("span");
  nicknameSpan.classList.add("likeFont");
  nicknameSpan.textContent = writer;

  const contentSpan = document.createElement("span");
  contentSpan.textContent = value;

  commentCard.append(nicknameSpan, contentSpan);
  commentList.append(commentCard);
}

function getCommentList() {
  fetch("./data/comments.json")
    .then((res) => res.json())
    .then((json) => {
      json.forEach((comment) => {
        const commentList =
          document.getElementsByClassName("feedReply")[comment.feedIndex];
        updateCommentListDom(comment.content, commentList, comment.nickname);
      });
    });
}
getCommentList();
