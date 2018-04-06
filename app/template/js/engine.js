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


	$('.tel').inputmask("+7(999)999-99-99");


	var thankcallback = '<div class="thank text-center"><p>В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей</p></div>';
	var errorTxt = 'Возникла ошибка при отправке заявки!';

	// validation forms
	$.validator.addMethod("validphone", function(value){
		if (Inputmask.isValid(value, { mask: '+7(999)999-99-99'})) return true
		else return false;
	},"");

	$('#callback-form').validate({
		rules: {
			name:{required : true},
			tel: {validphone:true}
		},
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					$(form).closest('.modal__body').html(thankcallback);
					startClock('callback');
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
					$('.sending').remove();
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});


	// форма обратной связи
	$('#order-form').validate({
		rules: {
			name:{required : true},
			tel: {validphone:true},
		},
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					$(form).html(thankcallback);
					startClock('order');
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
				},
				always: function(){
					$('.sending').remove();					
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});


	$('#totop').click(function (){
		$("body,html").animate({
			scrollTop:0
		}, 800);
		return false;
	});


	$('.btn-order').click(function(e){
		e.preventDefault();
		document.querySelector('#title').value = this.dataset.title;
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



$(function(){
	$('.policy input').click(function(){
		var $this = $(this),
			$submit = $this.closest('.form-policy');

		if ($this.is(':checked')){
			$submit.removeClass('disabled');
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').removeAttr('disabled');
		} else {
			$submit.addClass('disabled');
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').attr('disabled', true);
		}
	})
});


var timer,
	sec = 3;


function showTime(sendform){
	sec = sec-1;
	if (sec <=0) {
		stopClock();

		switch (sendform){
			case 'qorder-form':
				$('.qorder__box .thank').fadeOut('normal',function(){
					$('.qorder__box .thank').remove();
					$('.qorder__box .form-control, .qorder__box textarea').val('');
				});
				break;
			case 'feedback-form':
				$('.feedback .thank').fadeOut('normal',function(){
					$('.feedback .thank').remove();
					$('.feedback .form-control, .feedback textarea').val('');
					$('.feedback__form fieldset').show();
				});
				break;
			default:
			console.log(sendform);
				modal = $("#" + sendform);
				modal.find('.md-close').trigger('click');
				break;
		}
	}
}

function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(sendform){
	if (!timer)
		timer = window.setInterval("showTime('" + sendform + "')",1000);
}
