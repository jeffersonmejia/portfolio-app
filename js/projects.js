const d = document,
  $body = d.querySelector('body')

d.addEventListener('DOMContentLoaded', (e) => {
  $body.classList.toggle('body-hidden')
})
