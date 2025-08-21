//GLOBAL SCOPE CTES.
const d = document,
  n = navigator,
  w = window,
  $listProgress = d.querySelectorAll("progress"),
  $listProgressText = d.querySelectorAll(".section-skills li"),
  $body = d.querySelector("body"),
  $headers = document.querySelectorAll(
    ".section-experience h2, .section-education h2, .section-skills h2"
  ),
  $headerAncle = d.getElementById("header-btn"),
  $audioSpeaking = d.getElementById("audio-speaking"),
  $btnSpeaker = d.getElementById("speaker-btn"),
  $boxTranscript = d.getElementById("box-transcript");
//GLOBAL SCOPE VARS
let intervalAudioSpeaking = null,
  timer = null,
  isPlayingAudioSpeaking = false;

function changeLinkHeader() {
  if (w.innerWidth >= 700) {
    $headerAncle.href = "#section-education";
  }
}

function typeValueProgress() {
  $listProgressText.forEach((p) => {
    $progressValue = p.querySelector("progress").dataset["value"] * 100;
    $text = p.querySelector("small");
    $text.textContent = $progressValue + "%";
  });
}

function animateProgress() {
  $listProgress.forEach((progress) => {
    const value = progress.dataset["value"];
    setTimeout(() => {
      progress.value = value;
    }, 500);
  });
}

function disableTranscript() {
  $boxTranscript.querySelectorAll("li").forEach((li) => {
    li.classList.add("hidden");
  });
  $boxTranscript.classList.add("hidden-opacity");
  clearInterval(timer);
}

function enableTranscript() {
  let currentTime = 50,
    intervalTime = 1000;
  $boxTranscript.classList.remove("hidden-opacity");
  const items = $boxTranscript.querySelectorAll("li");
  timer = setInterval(() => {
    items.forEach((li) => {
      const start = parseInt(li.getAttribute("data-start"), 10);
      const end = parseInt(li.getAttribute("data-end"), 10);
      if (currentTime <= start && currentTime >= end) {
        li.classList.remove("hidden");
      } else {
        li.classList.add("hidden");
      }
    });
    currentTime--;
    if (currentTime < 0) {
      clearInterval(timer);
    }
  }, intervalTime);
}

function playAudioSpeaking() {
  const $speakerText = $btnSpeaker.querySelector("span"),
    $speakerImg = $btnSpeaker.querySelector("img");
  if ($audioSpeaking.preload === "none" && $audioSpeaking.readyState === 0) {
    $audioSpeaking.load();
  }
  let timeAudio = Math.round($audioSpeaking.duration || 0);
  if (isPlayingAudioSpeaking) {
    $audioSpeaking.pause();
    $audioSpeaking.currentTime = 0;
    $speakerText.textContent = "Escuchar";
    $speakerImg.src = "./assets/img/icons/speaking-icon.png";
    clearInterval(intervalAudioSpeaking);
    isPlayingAudioSpeaking = false;
    disableTranscript();
  } else if ($speakerText.textContent.includes("Escuchar")) {
    $audioSpeaking.play().then(() => {
      timeAudio = Math.round($audioSpeaking.duration);

      $speakerText.textContent = `Detener (${timeAudio})s`;
      $speakerImg.src = "./assets/img/icons/stop-sound-icon.png";
      isPlayingAudioSpeaking = true;
      enableTranscript();

      intervalAudioSpeaking = setInterval(() => {
        if (timeAudio > 0) {
          $speakerText.textContent = `Detener (${timeAudio})s`;
          $speakerImg.src = "./assets/img/icons/stop-sound-icon.png";
          timeAudio = timeAudio - 1;
        } else {
          $audioSpeaking.pause();
          $audioSpeaking.currentTime = 0;
          $speakerText.textContent = "Escuchar";
          $speakerImg.src = "./assets/img/icons/speaking-icon.png";
          clearInterval(intervalAudioSpeaking);
          isPlayingAudioSpeaking = false;
          disableTranscript();
        }
      }, 1000);
    });
  }
}

d.addEventListener("DOMContentLoaded", (e) => {
  typeValueProgress();
  animateProgress();
  $body.classList.toggle("body-hidden");
});

d.addEventListener("click", (e) => {
  if (e.target.matches("#speaker-btn") || e.target.matches("#speaker-btn *")) {
    playAudioSpeaking();
  }
});

w.addEventListener("scroll", () => {
  $headers.forEach((header) => {
    const rect = header.getBoundingClientRect();
    const isAtTopOrAbove = rect.top <= 0;
    const isVisible = rect.bottom > 0;

    if (isAtTopOrAbove && isVisible) {
      header.classList.add("sticky-on");
    } else {
      header.classList.remove("sticky-on");
    }
  });
});
changeLinkHeader();
