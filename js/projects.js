const d = document,
	$body = d.querySelector('body'),
	$darkBtn = d.querySelector('.dark-mode-btn')

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

d.addEventListener('click', (e) => {
	if (e.target.matches('.dark-mode-btn')) {
		toggleDarkMode()
	}
})
d.addEventListener('DOMContentLoaded', (e) => {
	$body.classList.toggle('body-hidden')
	localDarkMode()
})

d.addEventListener('keydown', (e) => {
	if (e.key.toLowerCase() === 'd') toggleDarkMode()
})
