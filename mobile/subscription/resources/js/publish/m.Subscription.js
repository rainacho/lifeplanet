define(['fo', 'event', 'basicMotion', 'commonFn', 'swiper_old'], function (fo, event, basicMotion, commonFn, swiper) {
	function Subscription(options) {
		var _this = this;
		var element = (this.element = options.element);
		var win = $(window);
		var winW = win.width();
		var winH = win.height();
		var scrollNum = 0;
		var progressBox = $(element).find('.subscription_progress');
		var fixedScroll = 0;
		var sceneArea = $(element).find('.scene_area');
		var scene = sceneArea.find('.scene_item');
		var sceneTotal = scene.length - 1;
		var sceneNum = 0;

		function init() {
			// prodCalulation2();
			fixProgressbarTop();
		}

		/* 
		프로그래스바 헤더 설정
		*/

		var fixProgressbarTop = function () {
			var _height;

			$(window).scroll(function () {
				_height = $(document).scrollTop(); //실시간으로 스크롤의 높이를 측정

				if (_height > 40) {
					$('.indicator_wrapper').addClass('fixed');
				} else {
					$('.indicator_wrapper').removeClass('fixed');
				}
			});
		};

		/* prodCalulation2
		하단 SNS 공유하기 레이어 팝업
		*/
		// var prodCalulation2 = function () {
		// 	var target = $('.sns_share_wrap .sns_share_pop');
		// 	var targetHeight = $('.sns_share_wrap .sns_share_pop').outerHeight();

		// 	$(target).css('bottom', '-' + targetHeight + 'px');
		// 	$(document).on('click', '.btn_share2', function (e) {
		// 		$(target).addClass('on').animate({ bottom: '0px' }, 300, 'easeInCubic');
		// 		$('#sns_share').css('position', 'absolute');
		// 		$('.page_dim').css('position', 'absolute');
		// 		pageDimOn();
		// 		e.preventDefault();
		// 	});

		// 	$(target)
		// 		.find('.btn_sns_share_close')
		// 		.touchSwipe({
		// 			changeY: function (pos) {
		// 				switch (pos) {
		// 					case 'down':
		// 					case 'gap':
		// 						targetHeight = $('.sns_share_wrap .sns_share_pop').outerHeight();
		// 						$(target)
		// 							.removeClass('on')
		// 							.animate({ bottom: '-' + targetHeight + 'px' }, 300, 'easeInCubic');
		// 						$('#sns_share').css('position', 'fixed');
		// 						$('.page_dim').css('position', 'fixed');
		// 						pageDimOff();
		// 						break;
		// 				}
		// 			},
		// 		});
		// };

		var pageDimOn = function () {
			$('.page_dim').addClass('on');
			basicMotion.pageHold('hold');
		};

		var pageDimOff = function () {
			basicMotion.pageHold('release');
			$('.page_dim').removeClass('on');
		};

		/* Subscription.fnPageSet
		화면 초기 설정, scene index 변경 시 재실행
		*/
		this.fnPageSet = function () {
			scene = sceneArea.find('.scene_item');
			sceneTotal = scene.length - 1;
			scene.each(function () {
				var minH = $(window).height() - $('.products_header').height();
				$(this).css('min-height', minH);
				if ($(this).index() != sceneNum) {
					$(this).hide();
				} else {
					$(this).addClass('_active');
				}
			});
			win.scroll(function () {
				scrollNum = win.scrollTop();
			});
		};

		/* Subscription.readyNext
		setNextAble("on") 실행으로 버튼이 활성화 되어있을 시 다음 화면으로 전환
		sceneMoveFlag ::
		false : 화면 전환되지 않음
		*/
		this.readyNext = function (sceneMoveFlag) {
			if (progressBox.find('.progress_next')) {
				progressBox.find('.progress_next').addClass('_active');
				progressBox.find('.progress_next').animate(
					{
						height: '50px',
					},
					200,
					function () {
						progressBox.find('.progress_next .btn_next').fadeOut(200);
						progressBox.find('.check_mark .sa_success').addClass('_animate');
						setTimeout(function () {
							typeof sceneMoveFlag == 'boolean' && !sceneMoveFlag ? null /*do nothing*/ : _this.sceneMove('next');
						}, 800);
					}
				);
			}
		};

		/* 
		프로그래스바 상태(진행율, 현재단계) 설정
		*/

		this.changeProgressbar = function (status) {
			var _checkStep;
			var _changedStep;
			var _tdelay = 1000;
			var _procNum = $('#procNum');

			if (status == 'next') {
				$('.scene_item').each(function (index, item) {
					if ($(item).hasClass('_active')) {
						_checkStep = $(item).attr('data-step');
						_changedStep = Number(_checkStep) + 1;
						console.log(_changedStep);
					}

					return _changedStep;
				});
			} else if (status == 'prev') {
				$('.scene_item').each(function (index, item) {
					if ($(item).hasClass('_active')) {
						_checkStep = $(item).attr('data-step');
						_changedStep = Number(_checkStep) - 1;
						console.log(_changedStep);
					}

					return _changedStep;
				});
			}

			switch (_changedStep) {
				case 1:
					console.log('1단계');
					$('#progress #bar').css('width', '0%');
					_procNum.html('0');
					$('#progress #bar')
						.addClass('_on')
						.delay(_tdelay)
						.queue(function (next) {
							$(this).removeClass('_on');
							next();
						});
					break;
				case 2:
					console.log('2단계');
					_procNum.html('10');
					$('#progress #bar').css('width', '10%');
					$('#progress #bar')
						.addClass('_on')
						.delay(_tdelay)
						.queue(function (next) {
							$(this).removeClass('_on');
							next();
						});
					break;
				case 3:
					console.log('3단계');
					_procNum.html('20');
					$('#progress #bar').css('width', '20%');
					$('#progress #bar')
						.addClass('_on')
						.delay(_tdelay)
						.queue(function (next) {
							$(this).removeClass('_on');
							next();
						});
					break;
				case 4:
					console.log('4단계');
					_procNum.html('30');
					$('#progress #bar').css('width', '30%');
					$('#progress #bar')
						.addClass('_on')
						.delay(_tdelay)
						.queue(function (next) {
							$(this).removeClass('_on');
							next();
						});
					break;
				case 5:
					console.log('5단계');
					_procNum.html('40');
					$('#progress #bar').css('width', '40%');
					$('#progress #bar')
						.addClass('_on')
						.delay(_tdelay)
						.queue(function (next) {
							$(this).removeClass('_on');
							next();
						});
					break;

				default:
					console.log('현재 단계를 알 수 없습니다.');
			}
		};

		/* Subscription.sceneMove
		화면 강제 전환 동작 (버튼 모션 제외)
		mode ::
		"next" : 다음 화면으로 전환
		"prev" : 이전 화면으로 전환
		*/
		this.sceneMove = function (mode) {
			if (mode == 'next') {
				scene.eq(sceneNum + 1).show(function () {
					scene
						.eq(sceneNum)
						.css({
							overflow: 'hidden',
							height: winH + 'px',
							transform: 'translate(0, 0) scale(0.8)',
						})
						.removeClass('_active')
						.addClass('_complete');

					scene
						.eq(sceneNum)
						.find('.scene')
						.css({
							marginTop: -scrollNum + 'px',
						});
					win.scrollTop(0);
					$('.subscription_progress').addClass('_hide');

					scene
						.eq(sceneNum + 1)
						.addClass('_active')
						.css({
							overflow: 'visible',
							height: 'auto',
							transform: 'translate(0, 0) scale(1)',
						});
				});

				setTimeout(function () {
					$('.check_mark .sa_success').removeClass('_animate');
					$('.subscription_progress .progress_next').removeClass('_on _active').find('.btn_next').fadeIn(200);
				}, 400);

				setTimeout(function () {
					scene.eq(sceneNum).find('.scene').css({
						marginTop: '0px',
					});
					if (scene.eq(sceneNum + 1).hasClass('_complete')) {
						$('.subscription_progress .progress_next').addClass('_on');
					}
					$('.subscription_progress').removeClass('_hide');

					$(window).trigger('resize');

					sceneNum = sceneNum + 1;
				}, 800);
			} else if (mode == 'prev') {
				scene.eq(sceneNum - 1).show();
				scene
					.eq(sceneNum)
					.css({
						overflow: 'hidden',
						height: winH + 'px',
						transform: 'translate(100%, 0) scale(1)',
					})
					.delay(1000)
					.fadeOut(0);

				scene.eq(sceneNum).removeClass('_active');
				scene
					.eq(sceneNum)
					.find('.scene')
					.css({
						marginTop: -scrollNum + 'px',
					});
				win.scrollTop(0);
				$('.subscription_progress').addClass('_hide');
				scene
					.eq(sceneNum - 1)
					.addClass('_active')
					.css({
						overflow: 'visible',
						height: 'auto',
						transform: 'translate(0, 0) scale(1)',
					});

				setTimeout(function () {
					$('.subscription_progress .progress_next').removeClass('_on _active');
					scene.eq(sceneNum).find('.scene').css({
						marginTop: '0px',
					});
				}, 400);

				setTimeout(function () {
					if (scene.eq(sceneNum - 1).hasClass('_complete')) {
						$('.subscription_progress .progress_next').addClass('_on');
					}
					$('.subscription_progress').removeClass('_hide');
					sceneNum = sceneNum - 1;
				}, 800);
			}
			// commonFn.closeCounsel();
		};

		/* Subscription.getSceneNum
		현재 보여지는 scene_item 인덱스 가져옴
		*/
		this.getSceneNum = function () {
			return sceneNum;
		};

		/* Subscription.getSceneTotal
		현재 scene_item 갯수를 가져옴
		*/
		this.getSceneTotal = function () {
			return sceneTotal;
		};

		/* Subscription.setNextAble
		다음 버튼 기능, 모션 활성화
		*/
		this.setNextAble = function (mode) {
			switch (mode) {
				case 'on':
					progressBox.find('.progress_next').addClass('_on');
					break;
				case 'off':
					progressBox.find('.progress_next').removeClass('_on');
					break;
			}
		};

		//Swiper Object Reference

		/* Subscription.subscriptionSwiper
		2단계 고지항목 swiper Object
		hideItem : 해당 슬라이드 가림
		showItem : 해당 슬라이드 보임
		lockItem : 현재 슬라이드 이후로 넘어가지 않게 함
		unlockAll : 전체 슬라이드 넘어가게 됨 (이어서 가입 용)
		slideNext : 다음 슬라이드로 넘김
		slideTo : 해당 idx 슬라이드로 이동
		*/
		this.subscriptionSwiper = {
			hideItem: function (idx) {
				$(subscriptionSwiper.slides[idx]).addClass('none');
				subscriptionSwiper.update();
			},
			showItem: function (idx) {
				$(subscriptionSwiper.slides[idx]).removeClass('none');
				subscriptionSwiper.update();
			},
			lockItem: function () {
				$(subscriptionSwiper.slides).each(function (i) {
					if (i >= subscriptionSwiper.activeIndex) {
						$(this).addClass('not_answered');
					} else {
						$(this).removeClass('not_answered');
					}
				});
				subscriptionSwiper.lockSwipeToNext();
			},
			unlockAll: function () {
				$(subscriptionSwiper.slides).each(function (i) {
					$(this).removeClass('not_answered');
				});
				subscriptionSwiper.unlockSwipeToNext();
			},
			slideNext: function () {
				var target = subscriptionSwiper.slides[subscriptionSwiper.activeIndex];
				$(target).removeClass('not_answered');
				setTimeout(function () {
					subscriptionSwiper.slideNext();
				}, 300);
			},
			slideTo: function (index) {
				subscriptionSwiper.slideTo(index);
			},
		};

		this.fnPageSet();

		// Private Function
		setProgressButton();
		setSwiper();

		var subscriptionSwiper;

		/* setProgressButton
		이전버튼 설정
		*/
		function setProgressButton() {
			/* 개발 validation 때문에 제어권 넘김 */
			progressBox.find('.btn_next').click(function (e) {
				if (_this.getSceneNum() < _this.getSceneTotal()) {
					_this.readyNext();
					_this.changeProgressbar('next');

					e.preventDefault();
				}
			});
			progressBox.find('.btn_prev').click(function (e) {
				if (_this.getSceneNum() > 0) {
					_this.changeProgressbar('prev');
					_this.sceneMove('prev');

					e.preventDefault();
				}
			});
		}

		/* setSwiper
		2단계 슬라이드 설정
		*/
		function setSwiper() {
			var mySwiper = new Swiper('.subscription .subscription_swiper', {
				pagination: '.pagination_wrap .swiper-pagination',
				preventClicks: false,
				preventClicksPropagation: false,
				releaseFormElements: false,
				allowSwipeToNext: false,
				onTransitionEnd: function (e) {
					var target = e.slides[e.activeIndex];
					if ($(target).hasClass('not_answered')) {
						e.lockSwipeToNext();
					} else {
						e.unlockSwipeToNext();
					}
					if ($('#typeA > .scene_area > .scene_item').hasClass('_active')) {
						if (PA00400S != undefined) {
							PA00400S.slideSpbNmCheck();
						}
					}
				},
			});
			subscriptionSwiper = mySwiper;

			/*$("body").find(".plan_swiper").each(function(i, el){
				var planSwiper = new Swiper(".plan_swiper", {
					 nextButton:'.swiper-button-next',
					 prevButton:'.swiper-button-prev',
					 onSlideChangeEnd:function(e){
						 var index = planSwiper.activeIndex;
						 $(".plan_item_container .plan_item").each(function(i, el){
							 if(i == index){
								 $(this).removeClass("none");
							 }else{
								 $(this).addClass("none");
							 }
						 })
					 }
				});

			});*/
		}

		/* 아이폰 X 대응 */
		var ratio = window.devicePixelRatio || 1;
		var screen = {
			width: window.screen.width * ratio,
			height: window.screen.height * ratio,
		};
		var iosCheck = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; //ios Device 체크

		/* 200603 토스 주석처리
		if (screen.width == 1125 && screen.height === 2436) { 				// iPhone X / Xs Detection
			if (globalVar.getParam('inSData').userToken != undefined || globalVar.getParam('inSData').t != undefined) {$("body").addClass("toss_ios_x");}
		} else if (screen.width == 1242 && screen.height === 2688) {		// iPhone Xs Max
			if (globalVar.getParam('inSData').userToken != undefined || globalVar.getParam('inSData').t != undefined) {$("body").addClass("toss_ios_x");}
		} else if (screen.width == 828 && screen.height === 1792) {		    // iPhone Xr
			if (globalVar.getParam('inSData').userToken != undefined || globalVar.getParam('inSData').t != undefined) {$("body").addClass("toss_ios_x");}
		} else {
			//return false;
		}
		*/
		/* 아이폰 X 대응 */

		//카카오 웹뷰 유입
		// if (iosCheck && globalVar.getParam('inSData').inflow == 'QH') {
		// 	kpayCheck();
		// }

		// function kpayCheck() {
		// 	if (!WAVE.UserAgent.isKakaoPayApp() || !WAVE.UserAgent.isKakaoTalkApp()) {
		// 		// 카카오페이 or 카카오톡 앱이 아닌경우
		// 		return false;
		// 	}

		// 	if (screen.width == 1125 && screen.height === 2436) {
		// 		// iPhone X / Xs Detection
		// 		$('body').addClass('iosX');
		// 	} else if (screen.width == 1242 && screen.height === 2688) {
		// 		// iPhone Xs Max
		// 		$('body').addClass('iosX');
		// 	} else if (screen.width == 828 && screen.height === 1792) {
		// 		// iPhone Xr
		// 		$('body').addClass('iosX');
		// 	} else {
		// 		//return false;
		// 	}
		// }

		init();
	}

	fo.addPlugin(Subscription, '.subscription');

	return Subscription;
});
