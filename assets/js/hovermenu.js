(function($){
	var hovermenu = {
		initX:0,
		initY:0,
		currentQuad: null,
		init: function(opt) {
			hovermenu.menu = $('#hovermenu');
			// hovermenu.menu = $('<div id="hovermenu">');

			// $('body').append(hovermenu.menu);

			$(document).on('mousedown', function(event){
				_.openMenu(event);
				// return (event.button == 1);
			}).on('mouseup', function(event){
				_.closeMenu(event);
			});
		},
	}

	var _ = {
		openMenu: function(event){
			hovermenu.initX = event.clientX;
			hovermenu.initY = event.clientY;

			if(hovermenu.closeTimer){
				clearTimeout(hovermenu.closeTimer);
			}

			hovermenu.menu.css({
				'left' : (event.clientX-115)+'px',
				'top' : (event.clientY-115)+'px'
			});

			hovermenu.menu.show();

			$(document).on('mousemove', function(event){
				_.onDrag(event);
			});

			setTimeout(function(){
				hovermenu.menu.removeClass('initial');
			},1);
		},

		closeMenu: function(){
			hovermenu.menu.addClass('initial');
			hovermenu.currentQuad = null;

			$(document).off('mousemove');

			hovermenu.closeTimer = setTimeout(function(){
				hovermenu.menu.hide();
				hovermenu.menu.children('.hm-btn').removeClass('active');
			},200);
		},

		onDrag: function(event){
			if(Math.abs(event.clientY - hovermenu.initY)>15 && Math.abs(event.clientX - hovermenu.initX)>15){
				var dir = "";
				var top = (hovermenu.initY > event.clientY) ? "t" : "b";
				var left = (hovermenu.initX > event.clientX) ? "l" : "r";

				if(!hovermenu.currentQuad || hovermenu.currentQuad!=top+left){
					hovermenu.menu.children('.hm-btn').removeClass('active');
					hovermenu.menu.children('.'+top+left).addClass('active');
					hovermenu.currentQuad = top+left;
				}
			}else{
				hovermenu.menu.children('.hm-btn').removeClass('active');
				hovermenu.currentQuad = null;
			}
		}
	}

	$.hovermenu = function(method) {
		if (hovermenu[method]) {
			return hovermenu[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return hovermenu.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on HoverMenu ');
		}
	};


})(jQuery);

$(function(){
	$.hovermenu('init');
})
