const d = document,
  n = navigator,
  w = window,
  $listProgress = d.querySelectorAll('progress'),
  $listProgressText = d.querySelectorAll('.section-skills li'),
  $body = d.querySelector('body'),
  $headers = document.querySelectorAll(
    '.section-experience h2, .section-education h2, .section-skills h2'
  ),
  $headerAncle = d.getElementById('header-btn'),
  $audioSpeaking = d.getElementById('audio-speaking'),
  $btnSpeaker = d.getElementById('speaker-btn')
let intervalAudioSpeaking = null

function changeLinkHeader() {
  if (w.innerWidth >= 700) {
    $headerAncle.href = '#section-education'
  }
}

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

function playAudioSpeaking() {
  const $speakerText = $btnSpeaker.querySelector('span'),
    $speakerImg = $btnSpeaker.querySelector('img')
  let timeAudio = Math.round($audioSpeaking.duration)
  //audio.playbackRate = 2.0
  if ($speakerText.textContent.includes('Escuchar')) {
    intervalAudioSpeaking = setInterval(() => {
      if (timeAudio > 0) {
        $speakerText.textContent = `Detener (${timeAudio})s`
        $speakerImg.src = './img/icons/stop-sound-icon.png'
        $audioSpeaking.play()
        timeAudio = timeAudio - 1
      } else {
        $audioSpeaking.pause()
        $audioSpeaking.currentTime = 0
        $speakerText.textContent = 'Escuchar'
        $speakerImg.src = './img/icons/speaking-icon.png'
        clearInterval(intervalAudioSpeaking)
      }
    }, 1020)
  } else {
    $audioSpeaking.pause()
    $audioSpeaking.currentTime = 0
    $speakerText.textContent = 'Escuchar'
    $speakerImg.src = './img/icons/speaking-icon.png'
    clearInterval(intervalAudioSpeaking)
  }
}

d.addEventListener('DOMContentLoaded', (e) => {
  typeValueProgress()
  animateProgress()
  $body.classList.toggle('body-hidden')
})

d.addEventListener('click', (e) => {
  if (e.target.matches('#speaker-btn') || e.target.matches('#speaker-btn *')) {
    playAudioSpeaking()
  }
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
changeLinkHeader()
