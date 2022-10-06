


const feeds = document.querySelectorAll(".feed");

feeds.forEach(feed => {
  const input = feed.querySelector(".input-comment");
  ['keypress', 'click'].forEach((eventType) => {
    feed.addEventListener(eventType, e => {
      let {tagName, classList} = e.target;
      let {type} = e;
      if (type == "click" && tagName != "BUTTON") {
          return;
      }
      if (type == "keypress" && e.key != 'Enter') {
        return;
      }
      if (!input.value) {
        return;
      }

      writeComment.call(feed, input.value, "leeSang");
      input.value = "";
    });
  })
});

fetch('../data/comments.json')
  .then(response => response.json())
  .then(obj => [...obj.comments].forEach((comment) => {
    writeComment.call(feeds[0], comment.comment , comment.username);
  }))

function writeComment(content, writer) {
  // this == feed
  console.dir("this");
  console.dir(this);
  const comment_list = this.querySelector(".comment-list");
  let xmlString = `
  <div class="comment-text">
    <b class="comment-username">${writer}</b> <span>${content}</span>
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