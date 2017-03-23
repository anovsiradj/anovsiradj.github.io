/*
Cari karakter: <?
lalu ganti dengan "<?php"
Lalu dapatkan karakter berikutnya, yaitu "=" (sama-dengan) "<?=" atau " " (spasi) "<? "
Dan jika karakter berikutnya adalah "=" (sama-dengan), maka di imbuhi kata "echo"
*/

var rx_phpshorta = /\&lt\;\?(\=|\s)\s?/g;

function phpshorta_parse(str) {
	return String(str).replace(rx_phpshorta, function(src, group1) {
		var res_src = '&lt;?php ';
		if (group1 === '=') {
			res_src += 'echo ';
		}
		return '<span class="mark" title="' + src + '">' + res_src + '</span>';
	});
}

var dataset = document.getElementsByTagName('iframe')[0];

var temp = document.getElementsByTagName('div')[0];
var input = document.getElementsByTagName('textarea')[0];
var output = document.getElementsByTagName('pre')[0];

input.onchange = function() {
	temp.textContent = this.value;
	output.innerHTML = phpshorta_parse(temp.innerHTML);
};

dataset.onload = function() {
	input.value = dataset.contentDocument.body.textContent;
	input.onchange();
};

// didn't work. why?
/*
output.onclick = function() {
	copy(this.textContent);
	document.execCommand('copy', this.textContent);
}
*/
