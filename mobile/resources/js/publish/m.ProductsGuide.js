define(['fo', 'event', 'basicMotion', 'commonFn', 'swiper_old'], function (fo, event, basicMotion, commonFn, swiper) {
	function productsGuide(options) {
		var _this = this;
		var element = (this.element = options.element);
		var win = $(window);
		var winW = win.width();
		var winH = win.height();
		var lastScroll = 0;

		function init() {
			//2019-10-23 수정
			if ($('.premium_check_wrap .premium_check_pop').length > 0) {
				//보장분석설계 예외처리를 위한 조건.
				prodCalulation();
			}
		}

		/* prodCalulation
		하단 보험료 계산하기 버튼 설정
		*/
		var prodCalulation = function () {
			var target = $('.premium_check_wrap .premium_check_pop');
			var targetHeight = $('.premium_check_wrap .premium_check_pop').outerHeight();

			$(target).css('bottom', '-' + targetHeight + 'px');
			$(document).on('click', '.premium_check_btn a', function (e) {
				$(target).addClass('on').animate({ bottom: '0px' }, 300, 'easeInCubic');
				if (MXP_PLUGIN.isIOS()) {
					$('#footer').css('position', 'absolute');
					$('.page_dim').css('position', 'absolute');
				}

				pageDimOn();
				e.preventDefault();
			});

			$(target)
				.find('.btn_premium_close')
				.touchSwipe({
					changeY: function (pos) {
						switch (pos) {
							case 'down':
							case 'gap':
								targetHeight = $('.premium_check_wrap .premium_check_pop').outerHeight();
								$(target)
									.removeClass('on')
									.animate({ bottom: '-' + targetHeight + 'px' }, 300, 'easeInCubic');
								$('#footer').css('position', 'fixed');
								$('.page_dim').css('position', 'fixed');
								pageDimOff();
								break;
						}
					},
				});
		};

		var pageDimOn = function () {
			$('.page_dim').addClass('on');
			basicMotion.pageHold('hold');
		};

		var pageDimOff = function () {
			basicMotion.pageHold('release');
			$('.page_dim').removeClass('on');
		};

		/* setMotion
		안내 컨텐츠 애니메이션 설정
		*/
		function setMotion() {
			var motionBox = $('.product_motion');

			var agent = navigator.userAgent.toUpperCase(),
				version = 0,
				len = 0;

			if (agent.indexOf('ANDROID') > -1) {
				version = util.replaceAll(agent.match(/ANDROID\s+([\d\.]+)/i)[0], 'ANDROID ', '');
				len = version.length >= 3 ? 3 : version.length;
				version = version.substring(0, len);
				version = util.Number(version);
				if (version <= 5) {
					//안드로이드 버전 5이하일 경우
					$('.hero_carousel .hero_bg img').hide();
					win.on('scroll', function () {
						motionBox.length > 0 ? null : (motionBox = $('.product_motion'));
						motionBox.each(function () {
							var _thisO = $(this);
							if (!_thisO.hasClass('end_motion')) {
								_thisO.addClass('end_motion');
							}
						});
					});
					setTimeout(function () {
						$('.product_floating').hide();
					}, 5000);
					return false;
				} else {
					//안드로이드 버전 5.1 이상일 경우
					win.on('scroll', function () {
						var scrollT = $(this).scrollTop();
						var direction = scrollT > lastScroll ? 'DOWN' : 'UP';

						motionBox.length > 0 ? null : (motionBox = $('.product_motion'));
						motionBox.each(function () {
							var _thisO = $(this);

							if (_thisO.visible(50)) {
								if (!_thisO.hasClass('start_motion')) {
									_thisO.addClass('start_motion');
								}
							} else {
								/* 방향 상관없이 한번만 재생
								if (_thisO.hasClass("start_motion")) {
									_thisO.removeClass("start_motion");
								}*/
							}
						});

						lastScroll = scrollT;
					});
					return true;
				}
			} else {
				win.on('scroll', function () {
					var scrollT = $(this).scrollTop();
					var direction = scrollT > lastScroll ? 'DOWN' : 'UP';

					motionBox.length > 0 ? null : (motionBox = $('.product_motion'));
					motionBox.each(function () {
						var _thisO = $(this);

						if (_thisO.visible(50)) {
							if (!_thisO.hasClass('start_motion')) {
								_thisO.addClass('start_motion');
							}
						} else {
							/* 방향 상관없이 한번만 재생
							if (_thisO.hasClass("start_motion")) {
								_thisO.removeClass("start_motion");
							}*/
						}
					});

					lastScroll = scrollT;
				});
				return true;
			}
		}

		/* setSwiper
		상단 swiper 설정
		*/
		function setSwiper() {
			var visualSwiper = new Swiper('.visual_swiper', {
				pagination: '.pagination_wrap .swiper-pagination',
				speed: 600, // 2018-04-12 speed 추가
				autoplay: 3000,
				loop: true,
				onAutoplayStart: function () {
					$('.play_btn_wrap .btn_play').hide();
					$('.play_btn_wrap .btn_stop').show();
				},
				onAutoplayStop: function () {
					$('.play_btn_wrap .btn_play').show();
					$('.play_btn_wrap .btn_stop').hide();
				},
			});

			$('.play_btn_wrap button').on('click', function () {
				if ($(this).hasClass('btn_play')) {
					visualSwiper.startAutoplay();
					$(this).hide().siblings().show();
				} else {
					visualSwiper.stopAutoplay();
					$(this).hide().siblings().show();
				}
			});
		}

		/* setSwiper
		화면스크롤 시 상단 효과 설정
		*/
		function heroScroll() {
			var hero = $('.hero_carousel');
			var heroHeight = $(hero).outerHeight();

			win.on('scroll', function () {
				var top = $(this).scrollTop();
				console.log('scroll: ', top); //0~335
				// var opacity = (top / heroHeight) * 100;
				// opacity = opacity / 100;
				if (top <= heroHeight) {
					//$(hero).css({"transform":"translateY("+ (0.4*top)+"px)"}).find(".hero_bg").css({"height":(100-top/8)+"%", "bottom":(0.4*top)+"px"}).next(".hero_dim").css("opacity", opacity.toFixed(1));
					// $(hero)
					// 	.css({ transform: 'translateY(0px)' })
					// 	.find('.hero_bg')
					// 	.css({ height: 100 - top / 8 + '%' })
					// 	.next('.hero_dim')
					// 	.css('opacity', opacity.toFixed(1));

					$(hero).find('.hero_bg');
					// .css('width', 100 - top + '%');
					console.log('width::', 100 - top + '%');
				}
			});

			// win.on('scroll', function () {
			// 	var top = $(this).scrollTop();
			// 	var opacity = (top / heroHeight) * 100;
			// 	opacity = opacity / 100;
			// 	if (top >= heroHeight + 20) {
			// 		$(hero).find('.hero_bg').hide();
			// 	} else {
			// 		$(hero).find('.hero_bg').show();
			// 		$(hero)
			// 			.find('.hero_title, .hero_con')
			// 			.css('opacity', 1 - opacity.toFixed(1));
			// 	}
			// });
			var top = $(this).scrollTop();
			if (top >= heroHeight + 20) {
				$(hero).find('.hero_bg').hide();
			} else {
				$(hero).find('.hero_bg').show();
			}
		}

		/* 개발에서 처리함. */
		/* function setRadioTab(){
			$(document).on("click", ".tab_radio input[type='radio']", function(){
				var parent = $(this).closest(".tab_radio_wrap");
				var target= $(this).data("tab-name");

				$(parent).find("." + target).show().siblings(".tab_radio_cont").hide();
			});
		}; */

		// 190218 삭제

		init();
		setSwiper();
		heroScroll();
		//setRadioTab();
		// 190218 삭제
		setMotion();
	}

	fo.addPlugin(productsGuide, '.guide');

	return productsGuide;
});
