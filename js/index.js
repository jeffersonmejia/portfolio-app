//GLOBAL SCOPE CTES.
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
	$btnSpeaker = d.getElementById('speaker-btn'),
	$boxTranscript = d.getElementById('box-transcript'),
	$darkBtn = d.querySelector('.dark-mode-btn'),
	$modalCertificate = d.querySelector('.modal-certificate'),
	$modalCertificateTitle = $modalCertificate.querySelector('.modal-certificate-title'),
	$modalCertificateLogo = $modalCertificate.querySelector('.modal-certificate-logo'),
	$modalCertificateLogoName = $modalCertificate.querySelector(
		'.modal-certificate-logo-name'
	),
	$modalCertificateDate = $modalCertificate.querySelector('.modal-certificate-date'),
	$modalCertificateImg = $modalCertificate.querySelector('.modal-certificate-img'),
	$modalCertificateDescription = $modalCertificate.querySelector(
		'.modal-certificate-description'
	),
	$curriculumAncle = d.getElementById('curriculum-ancle'),
	$modalNotification = d.querySelector('.modal-notification'),
	$modalNotificationMessage = d.querySelector('.modal-notification small'),
	$modalCurriculumForm = d.querySelector('.email-send-modal'),
	$formEmailCurriculum = d.getElementById('email-form-curriculum'),
	$curriculumMessage = d.querySelector('.curriculum-message')

//GLOBAL SCOPE VARS
let intervalAudioSpeaking = null,
	timer = null,
	isPlayingAudioSpeaking = false

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

function disableTranscript() {
	$boxTranscript.querySelectorAll('li').forEach((li) => {
		li.classList.add('hidden')
	})
	$boxTranscript.classList.add('hidden-opacity')
	clearInterval(timer)
}

function enableTranscript() {
	let currentTime = 50,
		intervalTime = 1000
	$boxTranscript.classList.remove('hidden-opacity')
	const items = $boxTranscript.querySelectorAll('li')
	timer = setInterval(() => {
		items.forEach((li) => {
			const start = parseInt(li.getAttribute('data-start'), 10)
			const end = parseInt(li.getAttribute('data-end'), 10)
			if (currentTime <= start && currentTime >= end) {
				li.classList.remove('hidden')
			} else {
				li.classList.add('hidden')
			}
		})
		currentTime--
		if (currentTime < 0) {
			clearInterval(timer)
		}
	}, intervalTime)
}

function playAudioSpeaking() {
	const $speakerText = $btnSpeaker.querySelector('span'),
		$speakerImg = $btnSpeaker.querySelector('img')
	if ($audioSpeaking.preload === 'none' && $audioSpeaking.readyState === 0) {
		$audioSpeaking.load()
	}
	let timeAudio = Math.round($audioSpeaking.duration || 0)
	if (isPlayingAudioSpeaking) {
		$audioSpeaking.pause()
		$audioSpeaking.currentTime = 0
		$speakerText.textContent = 'Escuchar'
		$speakerImg.src = './assets/img/icons/speaking-icon.png'
		clearInterval(intervalAudioSpeaking)
		isPlayingAudioSpeaking = false
		disableTranscript()
	} else if ($speakerText.textContent.includes('Escuchar')) {
		$audioSpeaking.play().then(() => {
			timeAudio = Math.round($audioSpeaking.duration)

			$speakerText.textContent = `Detener (${timeAudio})s`
			$speakerImg.src = './assets/img/icons/stop-sound-icon.png'
			isPlayingAudioSpeaking = true
			enableTranscript()

			intervalAudioSpeaking = setInterval(() => {
				if (timeAudio > 0) {
					$speakerText.textContent = `Detener (${timeAudio})s`
					$speakerImg.src = './assets/img/icons/stop-sound-icon.png'
					timeAudio = timeAudio - 1
				} else {
					$audioSpeaking.pause()
					$audioSpeaking.currentTime = 0
					$speakerText.textContent = 'Escuchar'
					$speakerImg.src = './assets/img/icons/speaking-icon.png'
					clearInterval(intervalAudioSpeaking)
					isPlayingAudioSpeaking = false
					disableTranscript()
				}
			}, 1000)
		})
	}
}
function toggleDarkMode() {
	const $iconsPlatzi = d.querySelectorAll('img[src*="platzi"]')
	if (!$body.classList.contains('dark')) {
		$body.classList.toggle('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/light.svg')
		$iconsPlatzi.forEach((img) =>
			img.setAttribute('src', 'assets/img/icons/platzi-icon-dark.png')
		)
		localStorage.setItem('dark-mode', 'enabled')
	} else {
		$body.classList.toggle('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/dark.svg')
		$iconsPlatzi.forEach((img) =>
			img.setAttribute('src', 'assets/img/icons/platzi-icon.png')
		)
		localStorage.setItem('dark-mode', 'disabled')
	}
}

function localDarkMode() {
	const darkMode = localStorage.getItem('dark-mode')
	const $iconsPlatzi = d.querySelectorAll('img[src*="platzi"]')
	if (darkMode === 'enabled') {
		$body.classList.add('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/light.svg')
		$iconsPlatzi.forEach((img) =>
			img.setAttribute('src', 'assets/img/icons/platzi-icon-dark.png')
		)
	} else {
		$body.classList.remove('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/dark.svg')
		$iconsPlatzi.forEach((img) =>
			img.setAttribute('src', 'assets/img/icons/platzi-icon.png')
		)
	}
}

function openCertificateModal(article) {
	const title = article.querySelector('.training-title').textContent
	const logoSrc = article.querySelector('.training-logo-src').src
	const logoName = article.querySelector('.training-logo-name').textContent
	const date = article.querySelector('.training-date-year').textContent
	const imgSrc = article.querySelector('.training-certificate-img').src
	const description = article.querySelector('p[itemprop="description"]').textContent

	$modalCertificateTitle.textContent = title
	$modalCertificateLogo.src = logoSrc
	$modalCertificateLogoName.textContent = logoName
	$modalCertificateDate.textContent = date
	$modalCertificateImg.src = imgSrc
	$modalCertificateDescription.textContent = description

	$modalCertificate.classList.add('modal-certificate-active')
	$body.style.overflowY = 'hidden'
}

function closeModal() {
	$modalCertificate.classList.remove('modal-certificate-active')
	$body.style.overflowY = 'scroll'
}
function updateCurriculumLink() {
	const isDark =
		$body.classList.contains('dark') || localStorage.getItem('dark-mode') === 'enabled'
	if (isDark) {
		$curriculumAncle.href = 'assets/docs/curriculum-dark.pdf'
	} else {
		$curriculumAncle.href = 'assets/docs/curriculum-light.pdf'
	}
	notifyCurriculum()
}

function pushNotification(message) {
	if (!$modalNotification.classList.contains('.modal-notification-active')) {
		$modalNotification.classList.add('modal-notification-active')
		$modalNotificationMessage.textContent = message
		setTimeout(() => {
			$modalNotification.classList.remove('modal-notification-active')
		}, 4500)
	} else {
		$modalNotification.classList.remove('modal-notification-active')
		$modalNotificationMessage.textContent = ''
	}
	$darkBtn.classList.add('beat-anim')
	setTimeout(() => {
		$darkBtn.classList.remove('beat-anim')
	}, 3000)
}

function notifyCurriculum() {
	const isDark =
			$body.classList.contains('dark') || localStorage.getItem('dark-mode') === 'enabled',
		customModeStyleUserOn = isDark ? 'oscuro' : 'claro',
		customModeStyleUserOff = isDark ? 'claro' : 'oscuro',
		message = `Se descargará el curriculum en modo ${customModeStyleUserOn}. Si deseas el modo ${customModeStyleUserOff} actívalo.`
	pushNotification(message)
}

async function sendEmail() {
	const serviceID = 'service_pik9mne'
	const templateID = 'template_xfzrv13'
	const publicKey = 'aWC6F_7PfAJcrh2SF'

	const $inputEmail = $formEmailCurriculum.querySelector('input[type="text"]')
	const $inputMessage = $formEmailCurriculum.querySelector('textarea')
	const params = {
		name: 'Usuario',
		title: $inputMessage.value,
		email: $inputEmail.value,
	}

	emailjs.init(publicKey)
	try {
		await emailjs.send(serviceID, templateID, params)
		$curriculumMessage.textContent = 'Correo enviado, pronto me contactaré contigo.'
	} catch (err) {
		$curriculumMessage.textContent = 'Correo no enviado, intenta más tarde.'
	}
}

function toggleModalCurriculum() {
	const $inputEmail = $formEmailCurriculum.querySelector('input[type="text"]')
	const $inputMessage = $formEmailCurriculum.querySelector('textarea')
	$inputEmail.value = ''
	$inputMessage.value = ''
	$inputMessage.value = ''
	$modalCurriculumForm.classList.toggle('hidden')
}

d.addEventListener('DOMContentLoaded', (e) => {
	$body.classList.toggle('body-hidden')
	localDarkMode()
})

d.addEventListener('click', async (e) => {
	if (e.target.matches('#curriculum-ancle') || e.target.matches('#curriculum-ancle *')) {
		updateCurriculumLink()
	}
	if (
		e.target.matches('#email-form-cancel-btn') ||
		e.target.matches('.get-curriculum-btn')
	) {
		toggleModalCurriculum()
	}
	if (e.target.matches('#email-form-submit-btn')) {
		e.preventDefault()
		await sendEmail()
	}

	if (e.target.matches('#speaker-btn') || e.target.matches('#speaker-btn *')) {
		playAudioSpeaking()
	}
	if (e.target.matches('.dark-mode-btn')) {
		toggleDarkMode()
	}
	if (e.target.matches('.training-certificate-img')) {
		openCertificateModal(e.target.parentElement)
	}
	if (e.target.matches('.close-certificate-modal')) {
		closeModal()
	}
})
d.addEventListener('keydown', (e) => {
	const tag = e.target.tagName.toLowerCase()
	if (tag !== 'input' && tag !== 'textarea' && e.key.toLowerCase() === 'd') {
		toggleDarkMode()
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
w.addEventListener('resize', () => {
	if (
		w.innerWidth < 800 &&
		$modalCertificate.classList.contains('modal-certificate-active')
	) {
		$modalCertificate.classList.remove('modal-certificate-active')
		$body.style.overflowY = 'scroll'
	}
})

//changeLinkHeader()
