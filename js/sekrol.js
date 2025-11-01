
/**
 * @link https://gist.github.com/sabapathygithub/e6ca2c0fd06c21c5fb608b9a172ca3c4
 */

globalThis.sekrolAutoDownRecur = false

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
