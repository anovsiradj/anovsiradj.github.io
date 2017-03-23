//refference
//http://jsfiddle.net/kMudG/
$.avzFnavi = function() {
    $(".avz-fnavi").each(function(){
		$(this).parent().css("position","relative");
        var _c = $(this).html();
        $(this).html("<div class=\"avz-fnavi-content\">"+_c+"</div>");
        $(this).append("<div class=\"avz-fnavi-hadle\">+</div>");
        var _pt = $(this).parent().css("padding-top");
        _pt = _pt.match(/^[0-9]+/);
        _pt = Number(_pt)+10;
        $(this).parent().css({
            "padding-top":_pt+"px"
        });
    }).show();
    $(".avz-fnavi-hadle").on("click",function(){
        if($(this).parent().children(".avz-fnavi-content").css("display") === "none") {
            $(this).parent().children(".avz-fnavi-content").slideDown({
                start:function() {
                    $(this).parent().addClass("avz-fnavi-ceil");
                }
            });
        } else {
            $(this).parent().children(".avz-fnavi-content").slideUp({
                done:function() {
                    $(this).parent().removeClass("avz-fnavi-ceil");
                }
            });
        }
    });
}
