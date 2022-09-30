// ————————————————————————————————————————————————————————————————————————————————
// Спільні дії для popup.js і options.js
// ————————————————————————————————————————————————————————————————————————————————

// Ідентифікатор планового закриття сповіщення
var timeout_id

// Закриття сповіщення
function hideMsgbox() {
	Array.from(document.getElementsByClassName('show')).forEach(
		el => el.classList.remove('show', 'success', 'error')
	)
}

// Мова інтерфейсу — виставлення текстівок при завантаженні popup/options
Array.from(document.querySelectorAll('[data-i18n]')).forEach(el => {
	el.innerText = chrome.i18n.getMessage(el.dataset.i18n)
})

Array.from(document.querySelectorAll('[data-i18n-placeholder]')).forEach(el => {
	el.placeholder = chrome.i18n.getMessage(el.dataset.i18nPlaceholder)
})


// ————————————————————————————————————————————————————————————————————————————————
// 
// ————————————————————————————————————————————————————————————————————————————————
function* filter(word, maxSize) {
	if (!maxSize || maxSize > DICTIONARY.length) maxSize = DICTIONARY.length
	let count = 0;
	let i = 0;
	while (count < maxSize && i < DICTIONARY.length) {
		if (DICTIONARY[i].n.includes(word)) {
			yield DICTIONARY[i]
			count++
		}
		i++
	}
}

// ————————————————————————————————————————————————————————————————————————————————
// 
// ————————————————————————————————————————————————————————————————————————————————
function search() {
	var word = INPUT_WORD.value.trim().toLowerCase()
	// var found = DICTIONARY.filter(a => a.n.includes(word))
	var found = word ? Array.from(filter(word, 100)) : []
	var res = ''
	for (var i = 0; i < found.length; i++) {
		res += '<p><b>'+(found[i].h?found[i].h:found[i].n)+'</b> — '+found[i].g+'</p>'
	}
	document.getElementById('result').innerHTML = res ? res : '—'
}

// ————————————————————————————————————————————————————————————————————————————————
// 
// ————————————————————————————————————————————————————————————————————————————————
const INPUT_WORD = document.getElementById('word')
INPUT_WORD.onchange = search
INPUT_WORD.focus()
