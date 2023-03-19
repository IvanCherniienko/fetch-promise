const inputId = document.querySelector('.js-input')
const goBtn = document.querySelector('.js-btn')
const postBlock = document.querySelector('.js-post-div')
const commentsButton = document.querySelector('.js-comm-btn')
const commentsBlock = document.querySelector('.js-comments-div')

goBtn.addEventListener('click', function() {
  const postId = inputId.value

  if (postId < 1 || postId > 100) {
    alert('Validation incorrect')
    return
  }

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error status')
      }
      return response.json()
    })
    .then(post => {
      const postHtml = `<h2>${post.title}</h2><p>${post.body}</p>`
      postBlock.innerHTML = postHtml
      commentsButton.classList.remove("js-comm-btn")
      commentsButton.classList.add("block-open")
      commentsButton.addEventListener('click', function() {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error')
            }
            return response.json()
          })
          .then(comments => {
            let commentsHtml = '<ul>'
            comments.forEach(comment => {
              commentsHtml += `<li>${comment.body}</li>`
            })
            commentsHtml += '</ul>'
            commentsBlock.innerHTML = commentsHtml
          })
          .catch(error => {
            alert(error.message)
          })
      })
    })
    .catch(error => {
      alert(error.message)
    })
})






