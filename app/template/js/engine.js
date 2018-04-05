$(document).ready(function(){
	$('#catcarousel').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		appendArrows: '.catscarousel-nav .container',
		prevArrow : '<button type="button" class="slick-prev" aria-label="Назад"></button>',
		nextArrow: '<button class="slick-next" aria-label="Вперед" type="button"></button>',
		autoplay: true,
		autoplaySpeed: 2000
	});


	$('#slogans').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true, 
		arrows: false,
		autoplay: false,
		autoplaySpeed: 2000
	});

	// // карусель
	// $('#foo1').owlCarousel({
	// 	loop:false,
	// 	nav:true,
	// 	dots: false,
	// 	items:3,
	// 	startPosition : 2,
	// 	stagePadding : 250,
	// 	navText: ["", ""],
	// 	onInitialized: function (event) {
	// 		refreshFirstLastVisible(event);
	// 	},
	// 	onChanged: function (event) {
	// 		refreshFirstLastVisible(event);
	// 	},
	// 	responsive:{
	// 		0:{
	// 			items:1,
	// 			stagePadding: 20
	// 		},
	// 		900:{
	// 			items:2,
	// 			stagePadding: 0
	// 		},
	// 		992:{
	// 			items:1
	// 		},
	// 		1250:{
	// 			items:2
	// 		},
	// 		1550:{
	// 			items:3
	// 		}
	// 	}
	// });


	$('#totop').click(function (){
		$("body,html").animate({
			scrollTop:0
		}, 800);
		return false;
	});

	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				h = $(document).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				$('#navbar').height('auto');
			};
		init();
	});	
});

// =заглушка для IE
//event listener: DOM ready
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
//call plugin function after DOM ready
addLoadEvent(function(){
	outdatedBrowser({
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform',
		languagePath: '/outdatedbrowser/lang/ru.html'
	})
});
// =/заглушка для IE
