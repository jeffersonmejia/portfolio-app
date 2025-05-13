const d = document,
  n = navigator,
  $listProgress = d.querySelectorAll('progress'),
  $listProgressText = d.querySelectorAll('.section-skills li'),
  $body = d.querySelector('body')

function typeValueProgress() {
  $listProgressText.forEach((p) => {
    $progressValue = p.querySelector('progress').dataset['value'] * 100
    $text = p.querySelector('small')
    $text.textContent = $progressValue + '%'
  })
}

function animateProgress() {
  $listProgress.forEach((progress) => {
    const value = progress.dataset['value']
    setTimeout(() => {
      progress.value = value
    }, 500)
  })
}

d.addEventListener('DOMContentLoaded', (e) => {
  typeValueProgress()
  animateProgress()
  $body.classList.toggle('body-hidden')
})
