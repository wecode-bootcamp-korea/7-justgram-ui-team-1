const commentList = document.getElementsByClassName("feed-comment-list");
const commentButtonList = document.getElementsByClassName(
  "feed-comment-input-button"
);
const commentInputList = document.getElementsByClassName("feed-comment-input");

const commentArray = Array.from(commentList);
const commentButtonArray = Array.from(commentButtonList);
const commentInputArray = Array.from(commentInputList);

commentButtonArray.forEach((button, index) => {
  button.addEventListener("click", () => {
    const input = document.getElementsByClassName("feed-comment-input")[index];
    const commentList =
      document.getElementsByClassName("feed-comment-list")[index];

    updateCommentListDOM(input.value, commentList, "jtree03");
    input.value = "";
  });
});

commentInputArray.forEach((input, index) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const commentList =
        document.getElementsByClassName("feed-comment-list")[index];

      updateCommentListDOM(input.value, commentList, "jtree03");
      input.value = "";
    }
  });
});

function updateCommentListDOM(value, commentList, writer) {
  const commentCard = document.createElement("div");
  commentCard.classList.add("feed-comment-card");

  const nicknameSpan = document.createElement("span");
  nicknameSpan.classList.add("highlight");
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
          document.getElementsByClassName("feed-comment-list")[
            comment.feedIndex
          ];
        updateCommentListDOM(comment.content, commentList, comment.nickname);
      });
    });
}
getCommentList();
