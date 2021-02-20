define(['fo', 'event', 'basicMotion', 'commonFn', 'swiper'], function (fo, event, basicMotion, commonFn, swiper) {
	function SwiperCarousel(options) {
		var defaults = {};

		var _this = this;
		var element = (this.element = options.element);
		var options = $.extend(options, defaults);
		var Swiper = require('swiper');
		var mySwiper = new Swiper(options.element, options);

		/* SwiperCarousel.slideNext
		swiper 다음으로 넘김
		*/
		this.slideNext = function () {
			mySwiper.slideNext();
		};

		/* SwiperCarousel.slideNext
		swiper 변경 재 적용
		*/
		this.update = function () {
			mySwiper.update();
		};
	}

	//공용 swiper 함수 추가 200311 수정
	function setSwiperNew(options) {
		var element = (this.element = options.element);
		var defaults = {
			pagination: {
				el: '.paging .swiper-pagination',
			},
			loop: true,
		};

		var _this = this;
		var options = $.extend(options, defaults);
		var Swiper = require('swiper');

		var commonSwiper = new Swiper(element, options);

		/*$(".play_btn_wrap button").on("click", function(){
			if($(this).hasClass("btn_play")){
				commonSwiper.startAutoplay();
				$(this).hide().siblings().show();
			}else{
				commonSwiper.stopAutoplay();
				$(this).hide().siblings().show();
			};
		});*/

		this.update = function () {
			commonSwiper.update();
			commonSwiper.pagination.render();
			commonSwiper.pagination.update();
		};
	}

	fo.addPlugin(SwiperCarousel, '.swiper_carousel');
	//200311 수정 S
	fo.addPlugin(setSwiperNew, '.swiper_action');
	//200311 수정 E

	return [SwiperCarousel, setSwiperNew];
});
