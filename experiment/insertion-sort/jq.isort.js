/*
Implementation with Javascript (and Learning) Insertion Sort Algorithm
By Anovsiradj <anov(dot)siradj22(at)gmail(dot)com>
version (date created): 20160101
License: Free (education purpose).
*/

var _log = document.getElementById("cl");
function _l(msg,b) {
	b = b || true;
	if(b) {
		_log.innerHTML += "\n"+msg;
	} else {
		_log.innerHTML = msg;
	}
}
var button_test;
function sort_test(e) {
	button_test = e;
	button_test.prop('disabled',true);
	$('#source').html($('#clone').html());
	$('#source > .qs1').isort();
	_log.innerHTML = "LOG:";
}

$.fn.isort = function() {
	'use strict';
	this.each(function(index) {
		$(this).each(function(index) {
			var _this = $(this),
				_that = _this.children(),
				_total = _this.children().length,
				_refer = [],
				_i_current,
				_i_next,
				_e_current,
				_e_next;

			// debug:1------------------------------
			var _revision_index = 0;
			var _e_revision = [];
			var _i_revision = [];
			var  _revision = function() {
				if (_revision_index < _i_revision.length) {
					_l(_i_revision[_revision_index]);
					_this.html(_e_revision[_revision_index]); // render
					_revision_index++;
				} else {
					button_test.prop('disabled',false);
					_revision_loop = null;
				}
			}
			// debug:0------------------------------

			var _toggle = function(_i) {
				if (_i < _total) {
					for (var _i2 = _i; _i2 >= 0; _i2--) {
						_i_current = _refer[_i2];
						_e_current = _that[_i2];
						_i_next = _refer[_i2+1];
						_e_next = _that[_i2+1];
						if (_refer[_i2+1] < _refer[_i2]) {
							_refer[_i2] = _i_next;
							_that[_i2] = _e_next;
							_refer[_i2+1] = _i_current;
							_that[_i2+1] = _e_current;

							// debug:1------------------------------
							var new_refer = _refer.slice();
							new_refer[_i2] = "<small style='background-color:red;'>"+new_refer[_i2]+"</small>";
							new_refer[_i2+1] = "<small style='background-color:red;'>"+new_refer[_i2+1]+"</small>";
							_e_revision.push(_that.slice());
							_i_revision.push(new_refer.slice());
							// debug:0------------------------------

						};
					};
					_toggle(_i+1);
				};
			};
			_this.children().each(function() {
				_refer.push(Number($(this).data('isort')));
			});
			_toggle(0);
			// _this.html(_that); // render

			// debug:1------------------------------
			var _revision_loop = setInterval(_revision,1000);
			// debug:0------------------------------

		});
	});
	return this;
}
$('#clone').html($('#source').html());
// $('#source > .qs1').isort();


/*
Konsep (pseudocode):
-------------------------
data = [4,2,1,3,5]

BeginSort:
	index_current = 4 -----> it's first data array
		> data = [ ,2,1,3,5]
	index_next = 2 -----> after first data array
		> data = [ , ,1,3,5]

	check is {index_next(2) < index_current(4)}
		true
			beginLoop
				> data [index_next(2), ,1,3,5]
				> data [index_next(2),index_current(4),1,3,5]
			endLoop
		false
			> data [index_current(4),index_next(2),1,3,5] -----> put it back
repeat BeginSort(start index_current = index_next);

data = [2,4,1,3,5]
BeginSort:
	index_current = 4
		> data [2, ,1,3,5]
	index_next = 1
		> data [2, , ,3,5]
	check is {index_next(2) < index_current(4)}
*/