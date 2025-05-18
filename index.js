const d = document,
  n = navigator,
  w = window,
  $listProgress = d.querySelectorAll('progress'),
  $listProgressText = d.querySelectorAll('.section-skills li'),
  $body = d.querySelector('body'),
  $headers = document.querySelectorAll(
    '.section-experience h2, .section-education h2, .section-skills h2'
  )

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

w.addEventListener('scroll', () => {
  $headers.forEach((header) => {
    const rect = header.getBoundingClientRect()
    const isAtTopOrAbove = rect.top <= 0
    const isVisible = rect.bottom > 0

    if (isAtTopOrAbove && isVisible) {
      header.classList.add('sticky-on')
    } else {
      header.classList.remove('sticky-on')
    }
  })
})
