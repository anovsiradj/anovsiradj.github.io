function totip() {
	var x = this;
	var getPover = x.getAttribute("data-totip");
	var wrapPover = document.createElement("span");
	var valPover = document.createTextNode(getPover);
	wrapPover.appendChild(valPover);
	x.appendChild(wrapPover);
	wrapPover.className = "totip-value";

	var a = x.offsetWidth,b = wrapPover.offsetWidth;
	var c = Math.floor((a-b)/2);
	wrapPover.style['left'] = c+"px";

	x.onmouseout = function() {
		childPover = x.children;
		for(var i=0; i <= childPover.length; i++) {
			x.removeChild(childPover[i]);
		}
	}
}
window.onload = function() {
	var obj = document.getElementsByClassName("totip");
	for(var i=0;i<obj.length;i++){
		obj[i].addEventListener('mouseover', totip, false);
	}
}
//http://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
