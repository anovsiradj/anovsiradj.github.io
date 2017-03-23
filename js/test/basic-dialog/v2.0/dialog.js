/**
* Dialog-v2.0.js
* Copyright (C) 2014 by Mayendra Costanov
* All rights reserved.
*/

function close_dialog(ID) {
	document.getElementById(ID).style.display="";
	document.getElementById("moved").style.left="0px";
	document.getElementById("moved").style.top="0px";
}
function show_dialog(ID) {
	document.getElementById(ID).style.display="block";
	document.getElementById("moved").style["position"]="relative";

}

// document.getElementById("moved").style["width"]="inherit";
// document.getElementById(ID).className = "dialog";
// document.getElementById(ID).style.opacity="1";
//document.getElementById(ID).className = document.getElementById(ID).className + " animation";