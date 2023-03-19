const inputId = document.querySelector('.js-input')
const goBtn = document.querySelector('.js-btn')
const postBlock = document.querySelector('.js-post-div')
const commentsButton = document.querySelector('.js-comm-btn')
const commentsBlock = document.querySelector('.js-comments-div')

async function getPost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  if (!response.status == 200) {
    alert('Error status')
  }
  const post = await response.json()
  return post
}

async function getComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  if (!response.status == 200) {
    alert('Error')
  }
  const comments = await response.json()
  return comments
}

goBtn.addEventListener('click', async function() {
  const postId = inputId.value

  if (postId < 1 || postId > 100) {
    alert('Validation incorrect')
    return
  }

  try {
    const post = await getPost(postId)
    const postHtml = `<h2>${post.title}</h2><p>${post.body}</p>`
    postBlock.innerHTML = postHtml

    commentsButton.classList.remove("js-comm-btn")
    commentsButton.classList.add("block-open")

    commentsButton.addEventListener('click', async function() {
      try {
        const comments = await getComments(post.id)

        let commentsHtml = '<ul>'
        comments.forEach(comment => {
          commentsHtml += `<li>${comment.body}</li>`
        })
        commentsHtml += '</ul>'
        commentsBlock.innerHTML = commentsHtml
      } catch (error) {
        alert(error.message)
      }
    })
  } catch (error) {
    alert(error.message)
  }
})
