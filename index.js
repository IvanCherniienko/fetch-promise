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

// function getPost(postId) {
//   return new Promise(function(resolve, reject) {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', `https://jsonplaceholder.typicode.com/posts/${postId}`)
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         const post = JSON.parse(xhr.responseText)
//         resolve(post)
//       } else {
//         reject(new Error(`Error ${xhr.status}`))
//       }
//     }
//     xhr.onerror = function() {
//       reject(new Error('Error'))
//     }
//     xhr.send()
//   })
// }

// function getComments(postId) {
//   return new Promise(function(resolve, reject) {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         const comments = JSON.parse(xhr.responseText)
//         resolve(comments)
//       } else {
//         reject(new Error(`Error ${xhr.status}`))
//       }
//     }
//     xhr.onerror = function() {
//       reject(new Error('Error'))
//     }
//     xhr.send()
//   })
// }

// goBtn.addEventListener('click', function() {
//   const postId = inputId.value

//   if (postId < 1 || postId > 100) {
//     alert('Validation incorrect')
//     return
//   }

// getPost(postId)
//   .then(function(post) {
//     const postHtml = `<h2>${post.title}</h2><p>${post.body}</p>`
//     postBlock.innerHTML = postHtml

//     commentsButton.classList.remove("js-comm-btn")
//     commentsButton.classList.add("block-open")

//     commentsButton.addEventListener('click', function() {
//       getComments(post.id)
//         .then(function(comments) {
//           let commentsHtml = '<ul>'
//           comments.forEach(function(comment) {
//             commentsHtml += `<li>${comment.body}</li>`
//           })
//           commentsHtml += '</ul>'
//           commentsBlock.innerHTML = commentsHtml
//         })
//         .catch(function(error) {
//           alert(error.message)
//         })
//     })
//   })
//   .catch(function(error) {
//     alert(error.message)
//   })
// })