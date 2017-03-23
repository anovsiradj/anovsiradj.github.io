$(function() {

	var where = "E",from = "E",A,B,C,D,_A,_B,_C,_D;
	function n(e) {
		var r;
		if(isNaN(e) === true) {
			r = '0';
		} else {
			r = e;
		}
		return Number(r);
	}

	function forAB() {
		C = n($("#C").val());
		D = n($("#D").val());
		if(A !== 0 && B !== 0) {
			if(where == "D") {
				findC();
			}
			if(where == "C") {
				findD();
			}
		}
	}

	function findC() {
		_C = (A*D)/B;
		$("#C").val(_C);
	}

	function findD() {
		_D = (C*B)/A;
		$("#D").val(_D);
	}
	$("#A").on("keyup",function() {
		A = n($(this).val());
		B = n($("#B").val());
		forAB();
	}); // end-A event

	$("#B").on("keyup",function() {
		A = n($("#A").val());
		B = n($(this).val());
		forAB();
	}); // end-B event

	$("#C").on("keyup",function() {
		A = n($("#A").val());
		B = n($("#B").val());
		C = n($(this).val());
		if(A !== 0 && B !== 0 && C !== 0) {
			findD();
			inpActive();
		}
	}); // end-C event

	$("#D").on("keyup",function() {
		A = n($("#A").val());
		B = n($("#B").val());
		D = n($(this).val());
		if(A !== 0 && B !== 0 && D !== 0) {
			findC();
			inpActive();
		}
	}); // end-D event
	$("#C").on("input",function() {
		where = "C";
		from= "D";
	});

	$("#D").on("input",function() {
		where = "D";
		from = "C";
	});

	function inpActive() {
	    $("#C, #D").css("background-color","#fff");
	    $("#"+from).css("background-color","#ccc");
	};

});
