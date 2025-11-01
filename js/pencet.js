/**
 * @link https://www.gavsblog.com/blog/detect-single-and-multiple-keypress-events-javascript
 */

globalThis.pencetActions = {};
globalThis.pencetEventCounts = {};
globalThis.pencetWatchCounts = {};

function pencetOn(value, watchCount, action) {
	pencetActions[value] = action
	pencetWatchCounts[value] = watchCount
}
function pencetOff(value) {
	delete pencetActions[value]
	delete pencetWatchCounts[value]
}

function pencetKeyup(event) {
	delete pencetEventCounts[event.code]
}
function pencetKeydown(event) {
	// console.debug(event)

	pencetEventCounts[event.code] ??= 0;
	pencetEventCounts[event.code]++;

	// console.debug(pencetEventCounts)
	if (
		pencetActions[event.code] &&
		pencetEventCounts[event.code] === pencetWatchCounts[event.code]
	) {
		pencetActions[event.code](event)
	}
}

document.addEventListener('keyup', pencetKeyup);
document.addEventListener('keydown', pencetKeydown);
