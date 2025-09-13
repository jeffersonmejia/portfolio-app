const d = document,
	$body = d.querySelector('body'),
	$darkBtn = d.querySelector('.dark-mode-btn'),
	$curriculumAncle = d.getElementById('curriculum-ancle'),
	$modalNotification = d.querySelector('.modal-notification'),
	$modalNotificationMessage = d.querySelector('.modal-notification small')

function toggleDarkMode() {
	if (!$body.classList.contains('dark')) {
		$body.classList.toggle('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/light.svg')
		localStorage.setItem('dark-mode', 'enabled')
	} else {
		$body.classList.toggle('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/dark.svg')
		localStorage.setItem('dark-mode', 'disabled')
	}
}

function localDarkMode() {
	const darkMode = localStorage.getItem('dark-mode')
	if (darkMode === 'enabled') {
		$body.classList.add('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/light.svg')
	} else {
		$body.classList.remove('dark')
		$darkBtn.setAttribute('src', 'assets/img/icons/dark.svg')
	}
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

d.addEventListener('click', (e) => {
	if (e.target.matches('.dark-mode-btn')) {
		toggleDarkMode()
	}
	if (e.target.matches('#curriculum-ancle') || e.target.matches('#curriculum-ancle *')) {
		updateCurriculumLink()
	}
})
d.addEventListener('DOMContentLoaded', (e) => {
	$body.classList.toggle('body-hidden')
	localDarkMode()
})

d.addEventListener('keydown', (e) => {
	if (e.key.toLowerCase() === 'd') toggleDarkMode()
})
