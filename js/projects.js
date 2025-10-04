const d = document,
	$body = d.querySelector('body'),
	$darkBtn = d.querySelector('.dark-mode-btn'),
	$curriculumAncle = d.getElementById('curriculum-ancle'),
	$modalNotification = d.querySelector('.modal-notification'),
	$modalNotificationMessage = d.querySelector('.modal-notification small'),
	$modalCurriculumForm = d.querySelector('.email-send-modal'),
	$formEmailCurriculum = d.getElementById('email-form-curriculum'),
	$curriculumMessage = d.querySelector('.curriculum-message'),
	$politicsList = d.querySelector('.politics-list'),
	$curriculumTextEmail = d.querySelector('.curriculum-text-email'),
	$curriculumTextEmailContent = d.querySelector('.curriculum-text-email-content'),
	$hiddenTitle = d.querySelectorAll('.hidden-title')

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

async function sendEmail(submitBtn) {
	const serviceID = 'service_pik9mne',
		templateID = 'template_xfzrv13',
		publicKey = 'aWC6F_7PfAJcrh2SF',
		entity = $formEmailCurriculum.querySelector('input[name="entity"]').value,
		nameUser = $formEmailCurriculum.querySelector('input[name="name"]').value,
		email = $formEmailCurriculum.querySelector('input[name="email"]').value,
		jobApplication = $formEmailCurriculum.querySelector(
			'input[name="job_application"]'
		).value,
		messageOptional =
			$formEmailCurriculum.querySelector('textarea[name="message_optional"]')?.value ||
			'',
		$hiddenInputs = Array.from(d.querySelectorAll('.email-form-hidden-input'))

	let titleMessage = `Hola, soy ${nameUser}, me identifico con correo: ${email}. Represento a la entidad ${entity}. El motivo del mensaje es para solicitar su curriculum y determinar si aplica al empleo ${jobApplication}.`
	if (messageOptional.length > 0) {
		titleMessage += ` ${messageOptional}`
	}
	if (submitBtn.value !== 'Enviar') {
		submitBtn.value = 'Enviar'
		$hiddenInputs.forEach((el) => {
			el.classList.add('hidden')
		})
		$curriculumTextEmail.classList.remove('hidden')
		$curriculumTextEmailContent.innerText = `${titleMessage}`
		$politicsList.classList.remove('hidden')
		$hiddenTitle.forEach((el) => {
			el.classList.remove('hidden')
		})
	} else {
		params = {
			name: nameUser,
			title: titleMessage,
			email,
		}
		emailjs.init(publicKey)
		try {
			await emailjs.send(serviceID, templateID, params)
			$curriculumMessage.textContent = 'Correo enviado, pronto me contactaré contigo.'
		} catch (err) {
			$curriculumMessage.textContent = 'Correo no enviado, intenta más tarde.'
		}
		setTimeout(() => {
			location.reload()
		}, 1500)
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

function notifyCurriculum() {
	const isDark =
			$body.classList.contains('dark') || localStorage.getItem('dark-mode') === 'enabled',
		customModeStyleUserOn = isDark ? 'oscuro' : 'claro',
		customModeStyleUserOff = isDark ? 'claro' : 'oscuro',
		message = `Se descargará el curriculum en modo ${customModeStyleUserOn}. Si deseas el modo ${customModeStyleUserOff} actívalo.`
	pushNotification(message)
}

d.addEventListener('click', async (e) => {
	if (e.target.matches('.dark-mode-btn')) {
		toggleDarkMode()
	}
	if (e.target.matches('#curriculum-ancle') || e.target.matches('#curriculum-ancle *')) {
		updateCurriculumLink()
	}
	if (e.target.matches('#email-form-cancel-btn')) {
		location.reload()
	}
	if (e.target.matches('.get-curriculum-btn')) {
		toggleModalCurriculum()
	}
	if (e.target.matches('#email-form-submit-btn')) {
		if ($formEmailCurriculum.checkValidity()) {
			e.preventDefault()
			await sendEmail(e.target)
		}
	}
})
d.addEventListener('DOMContentLoaded', (e) => {
	$body.classList.toggle('body-hidden')
	localDarkMode()
})

d.addEventListener('keydown', (e) => {
	if (e.key.toLowerCase() === 'd') toggleDarkMode()
})
