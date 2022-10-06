const feeds = document.querySelectorAll(".feed");


feeds.forEach(feed => {
  const input = feed.querySelector(".input-comment");
  ['keypress', 'click'].forEach((eventType) => {
    // 버튼이나 엔터로 댓글을 추가하는 리스너 추가
    feed.addEventListener(eventType, e => {
      console.log("event type: ", e.type);
      let {classList} = e.target;
      let {type} = e;
      if (type == "click" && !classList.contains("add-comment")) {
          return;
      }
      if (type == "keypress"
        &&(e.key != 'Enter' || !classList.contains("input-comment"))) {
        return;
      }
      if (!input.value) {
        return;
      }

      writeComment.call(feed, input.value, "leeSang");
      input.value = "";
    });


  })

  // 댓글 좋아요 터치 시 하트 색 변경하는 리스너 추가
  feed.addEventListener('click', (event) => {
    const {target} = event;
    const bHeartIcon = target.className.includes("bi-heart");
    if (!bHeartIcon)
      return;

    const bFilled = target.className.includes("bi-heart-fill");
    target.classList.toggle("bi-heart-fill", !bFilled);
    target.classList.toggle("bi-heart", bFilled);
  })

  // 휴지통 아이콘 터치 시 댓글 삭제하는 리스너 추가
  feed.addEventListener('click', (event) => {
    const {target} = event;
    const bTrashIcon = target.classList.contains("bi-trash3");
    if (!bTrashIcon)
      return;
    target.closest(".comment-text")?.remove();
  })
});



// json에 들어있는 코멘트를 feed에 넣음
fetch('../data/comments.json')
  .then(response => response.json())
  .then(obj => [...obj.comments].forEach((comment) => {
    writeComment.call(feeds[0], comment.comment , comment.username);
  }))


/**
 * @param {String} content : 코멘트 ex) "그게 아니고"
 * @param {String} wirter : 작성자 ex) "sangyun"
 * @return {Element}
  !! this가 feed라는 전제하에 동작함.
 */
function writeComment(content, writer) {
  console.dir(this);
  const comment_list = this.querySelector(".comment-list");
  let xmlString = `
  <div class="comment-text">
    <b class="comment-username">${writer}</b> <span>${content}</span>
    <i class="bi bi-trash3"></i>
    <i class="bi bi-heart"></i>
  </div>
  `;
  let doc = htmlToElement(xmlString);
  comment_list.append(doc);
}







/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}