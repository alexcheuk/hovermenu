(function($){
	var hovermenu_method = {
		init: function(opt) {
			$('body').append($('<div id="hovermenu">'));
			$(document).on('click', function(e){
				hovermenu_method.openMenu();
				return (e.button == 1);
			}).on('keydown', function(e){
				if(e.keyCode==17){
					hovermenu_method.openMenu();
				}
			});
		},

		openMenu: function(){

		}
	}

	$.hovermenu = function(method) {
		if (hovermenu_method[method]) {
			return hovermenu_method[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return hovermenu_method.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on HoverMenu ');
		}
	};


})(jQuery);

$(function(){
	$.hovermenu('init');
})
