
/**
 * @link https://gist.github.com/sabapathygithub/e6ca2c0fd06c21c5fb608b9a172ca3c4
 */

globalThis.sekrolAutoDownRecur = false
globalThis.sekrolHandles = []

function sekrolAutoDown(delay, pixel, elem, root) {
	if (sekrolAutoDownRecur) {
		return
	}

	elem ??= document.documentElement
	root ??= document.body

	let recur = function () {
		sekrolAutoDownRecur = true

		window.scrollBy({
			top: pixel,
			behavior: 'smooth',
		});
		setTimeout(recur, delay)
	};

	setTimeout(recur, delay)
}

function sekrolIsTop(elemen) {
	elemen ??= document.scrollingElement

	let pos = Math.ceil(elemen.scrollTop)

	return (pos <= 1)
}

function sekrolIsBot(elemen) {
	elemen ??= document.scrollingElement

	let pos0 = Math.ceil(elemen.scrollTop + elemen.clientHeight)
	let pos1 = elemen.scrollHeight

	return (pos0 >= pos1)
}

function sekrolOn(handle) {
	sekrolHandles.push(handle)
}

function sekrolOff() {
	sekrolHandles = []
}

function sekrolHandle(event) {
	sekrolHandles.forEach(handle => handle(event))
}

function sekrolMain() {
	document.addEventListener('scrollend', sekrolHandle);
}
