(function($){
	var hovermenu = {
		initX:0,
		initY:0,
		currentQuad: null,

		init: function(opt) {
			
			$('body').append(hovermenu.menu = _.createMenu());

			hovermenu.options = opt;

			if(hovermenu.options.buttons){
				hovermenu.setButtons(opt.buttons);
			}

			// $(document).on('mousedown', function(event){
			// 	_.openMenu(event);
			// }).on('mouseup', function(event){
			// 	_.closeMenu(event);
			// });

			$(document).on('mousemove', function(event){
				hovermenu.currentMouseX = event.clientX;
				hovermenu.currentMouseY = event.clientY;
			});

			$(document).on('keydown', function(event){
				if(event.keyCode==17 && !hovermenu.isOpened) _.openMenu(event);
			}).on('keyup', function(event){
				_.closeMenu(event);
			});
		},

		setButtons: function(buttonsObj){
			for(var i in buttonsObj){
				hovermenu.menu
					.children(_.strFormat('.{{pos}}',{pos:i})).children('.hm-text')
					.html(_.strFormat('<i class="{{icon}}"></i><span>{{text}}</span>', {icon:buttonsObj[i].icon, text:buttonsObj[i].text}));
			}
		}
	}

	var _ = {

		createMenu: function(){
			var menu = $('<div id="hovermenu" class="initial">');
			var btnHtmlStr = "";
			var btnInnerHtml = '<div class="hm-pie"></div><div class="hm-text"></div>';
			var t = "tb", left = "rl";
			for(var tb in t){
				for(var lr in left){
					btnHtmlStr+='<div class="hm-btn '+t[tb]+left[lr]+'">'+btnInnerHtml+'</div>';
				}
			}
			menu.append(btnHtmlStr);
			return menu;
		},

		openMenu: function(event){
			hovermenu.initX = hovermenu.currentMouseX;
			hovermenu.initY = hovermenu.currentMouseY;

			hovermenu.isOpened = true;

			if(hovermenu.closeTimer){
				clearTimeout(hovermenu.closeTimer);
			}

			hovermenu.menu.css({
				'left' : (hovermenu.currentMouseX-115)+'px',
				'top' : (hovermenu.currentMouseY-115)+'px'
			});

			hovermenu.menu.show();

			$(document).on('mousemove', _.onDrag);

			setTimeout(function(){
				hovermenu.menu.removeClass('initial');
			},1);
		},

		closeMenu: function(){
			hovermenu.isOpened = false;

			var btnCallback = hovermenu.currentQuad;

			if(hovermenu.options.buttons && hovermenu.options.buttons[btnCallback]){
				if(hovermenu.options.buttons[btnCallback].callback)  hovermenu.options.buttons[btnCallback].callback();
			}

			hovermenu.menu.addClass('initial');
			hovermenu.currentQuad = null;

			$(document).off('mousemove', _.onDrag);

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
		},

		strFormat: function(str, objVar){
			for(var i in objVar){
				var re = new RegExp("{{\\s*"+i+"\\s*}}","g");
				str = str.replace(re, objVar[i]);
			}
			return str;
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
	$.hovermenu('init',{
		buttons:{
			"tl":{icon:"icon-thumbs-up", text:"LIKE", callback: function(){showAction("LIKED !");}},
			"tr":{icon:"icon-share-alt", text:"SHARE", callback: function(){showAction("SHARED !");}},
			"bl":{icon:"icon-home", text:"HOME", callback: function(){window.location = "http://alexcheuk.com"; }},
			"br":{icon:"icon-github", text:"FORK", callback: function(){window.open("https://github.com/alexcheuk/hovermenu","_blank");}}
		}
	});

	function showAction(txt){
		$('.action').stop().css("opacity","1").text(txt).show().fadeOut(3000, function(){ $(this).text("CLICK ANY WHERE ON THE PAGE!").css("opacity","1").show(); });
	}
})
