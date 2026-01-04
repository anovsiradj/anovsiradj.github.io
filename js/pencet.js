/**
 * pencet
 * 
 * value = simbol dari tombol yang dipencet (Q,W,E,R,T,Y,...)
 * index = simbol dan count dari tombol yang dipencet (Y1,X3,Z5,...)
 * 
 * @link https://www.gavsblog.com/blog/detect-single-and-multiple-keypress-events-javascript
 * @link https://www.martin-brennan.com/simulating-mouse-click-event-javascript/
 */

globalThis.pencetActions = {};
globalThis.pencetValueCounts = {};
globalThis.pencetIndexCounts = {};

function pencetOn(value, watchCount, action) {
	let index = `${value}${watchCount}`

	pencetActions[index] = action
	pencetIndexCounts[index] = watchCount
}
function pencetOff(value, watchCount) {
	let index = `${value}${watchCount}`

	delete pencetActions[index]
	delete pencetIndexCounts[index]
}

function pencetMainKeyup(event) {
	let value = event.code

	delete pencetValueCounts[value]
}

function pencetMainKeydown(event) {
	// console.debug(event)

	let value = event.code

	pencetValueCounts[value] ??= 0;
	pencetValueCounts[value]++;

	let watchCount = pencetValueCounts[value]
	let index = `${value}${watchCount}`

	console.debug(pencetValueCounts)
	if (
		pencetActions[index] &&
		pencetValueCounts[value] === pencetIndexCounts[index]
	) {
		pencetActions[index](event)
	}
}

function pencetMain() {
	document.addEventListener('keyup', pencetMainKeyup);
	document.addEventListener('keydown', pencetMainKeydown);
}
