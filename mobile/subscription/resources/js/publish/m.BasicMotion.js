define(['fo', 'event'], function (fo, event) {
	var BasicMotion = {
		options: {},
	};

	BasicMotion.init = function () {
		//privateFn();
		addEventListener();
		setPageHeight();
		setNavigation();
		setContract();
		setPageScrollTop();
	};

	BasicMotion.pageHold = function (mode) {
		var container = $('.wrap');
		var conInner = $('#container_wrap');
		var win = $(window);
		var winScrollTop = win.scrollTop();

		switch (mode) {
			case 'hold':
				container.css({ overflow: 'hidden', height: win.height() + 'px' });
				conInner.css({ marginTop: -1 * winScrollTop + 'px' });
				container.data('fixed-scroll', winScrollTop);
				break;
			case 'release':
				container.css({ overflow: 'visible', height: 'auto' });
				conInner.css({ marginTop: 0 });
				win.scrollTop(container.data('fixed-scroll'));
				break;
		}
	};

	BasicMotion.toggleNavigation = function (mode) {
		var gnb = $('#gnb_wrap');
		switch (mode) {
			case 'open':
				gnb.stop().css('display', 'block').animate({ left: '0%' }, { duration: 500, easing: 'easeInOutCubic' });
				break;
			case 'close':
				//gnb.stop().animate({"left":"-100%"}, {duration:400, easing:"easeOutQuad", complete:function(){$(this).css("display", "none")}});// 200513 수정
				gnb.stop().animate({ left: '-100%' }, { duration: 400, easing: 'easeOutQuad' }); // 200513 수정
				break;
		}
	};

	$.fn.pageHold = function () {
		var winScrollTop = $(window).scrollTop();
		$(this)
			.wrap(
				'<div class="page_holder" style="position:fixed;left:0;top:0;width:100%;height:' +
					$(window).height() +
					'px;overflow:hidden;z-index:200;"></div>'
			)
			.css({ marginTop: -1 * winScrollTop + 'px' })
			.data('fixed-scroll', winScrollTop);
		//Case popup
		$(this).find('.popup').addClass('no_transition');
	};
	$.fn.pageRelease = function () {
		$(this).unwrap().css({ marginTop: 0 });
		$(window).scrollTop($(this).data('fixed-scroll'));
		$(this).data('fixed-scroll', null);
	};
	$.fn.visible = function (fixH) {
		var _thisO = $(this);

		var scrollT = $(window).scrollTop();
		var winH = $(window).height() - (fixH ? fixH : 0);
		var winP = scrollT + winH;

		var thisH = _thisO.outerHeight();
		var thisT = _thisO.offset().top + thisH / 2;

		if (thisT < scrollT || winP < thisT) {
			return false;
		} else {
			return true;
		}
	};
	$.fn.moveScroll = function () {
		var _this = $(this);
		$('html, body').animate(
			{
				scrollTop: _this.offset().top - 50,
			},
			500,
			'easeInOutExpo'
		);
	};
	$.fn.touchSwipe = function (options) {
		!options ? (options = {}) : null;

		// callBack
		var changeXfn = options['changeX'] || null;
		var changeYfn = options['changeY'] || null;

		var $container = document.querySelector(this.selector);
		var range = 10; //오차범위

		$container.addEventListener(
			'touchmove',
			function (e) {
				e.preventDefault();
			},
			false
		);
		$container.addEventListener('mousedown', startPoint, false);
		$container.addEventListener('touchstart', startPoint, false);
		$container.addEventListener('mouseup', currentPoint, false);
		$container.addEventListener('touchend', currentPoint, false);

		var directions = [];
		var touchPoint = { startX: null, currentX: null, startY: null, currentY: null };

		function changedTouchesJoin(e) {
			return e.changedTouches ? e.changedTouches[0] : e;
		}

		function startPoint(e) {
			touchPoint.startX = changedTouchesJoin(e).clientX;
			touchPoint.startY = changedTouchesJoin(e).clientY;
		}

		function currentPoint(e) {
			touchPoint.currentX = changedTouchesJoin(e).clientX;
			touchPoint.currentY = changedTouchesJoin(e).clientY;
			touchTransfer(e, range);
		}

		function touchTransfer(e, range) {
			if (touchPoint.startX >= 0 && touchPoint.startY >= 0) {
				var gapX = touchPoint.currentX - touchPoint.startX;
				if (gapX > range) {
					directions.push(1);
					//console.log("right");
					changeXfn ? changeXfn('right') : null;
				} else if (gapX < -1 * range) {
					directions.push(-1);
					//console.log("left");
					changeXfn ? changeXfn('left') : null;
				} else {
					directions.push(0);
					//console.log("gapX 오차범위")
					changeXfn ? changeXfn('gap') : null;
				}

				var gapY = touchPoint.currentY - touchPoint.startY;
				if (gapY > range) {
					directions.push(-1);
					//console.log("down");
					changeYfn ? changeYfn('down') : null;
				} else if (gapY < -1 * range) {
					directions.push(1);
					//console.log("up");
					changeYfn ? changeYfn('up') : null;
				} else {
					directions.push(0);
					//console.log("gapY 오차범위")
					changeYfn ? changeYfn('gap') : null;
				}

				touchPoint.startX = null;
				touchPoint.startY = null;
			}
			return directions;
		}
	};

	//private function
	var privateFn = function () {
		//console.log("privateFn");
		//console.log(this); //window
	};

	var addEventListener = function () {
		$(window).bind('resize', setPageHeight);
	};

	var setPageHeight = function () {
		$('.wrap').css('min-height', $(window).height());
		$('.subscription .scene').each(function () {
			var minH = $(window).height() - $('.products_header').height();
			$(this).css('min-height', minH);
		});
	};

	var setNavigation = function () {
		if ($('#gnb').length) {
			miniContentWrap = $('.mini_content .mini_content_wrapper');
			var conW = 0;
			miniContentWrap.find('.mini_item').each(function () {
				conW += $(this).outerWidth();
			});
			miniContentWrap.width(conW);
		}
	};

	var setContract = function () {
		menuContract = $('#gnb .menu .menu_contract .contract_items > li > a');
		menuContract.off('click').on('click', function () {
			menuContract.removeClass('active');
			$(this).addClass('active');
		});
	};

	var setPageScrollTop = function (e) {
		var win = $(window);
		var btnTop = $('.quick_wrap .btn_top');
		var btnPromotion = $('.quick_wrap .btn_promotion');

		if ($('#footer, .btn_fix, .subscription_progress').length) {
			$('.quick_wrap').addClass('over');
			if ($('#footer').length) {
				$(window).bind('scroll', pageScrollTop).trigger('scroll');
				btnTop.click(function (e) {
					$('html, body').animate(
						{
							scrollTop: 0,
						},
						600,
						'easeInOutExpo'
					);
				});
			} else {
				btnTop.remove();
			}
		} else {
			btnTop.remove();
		}
		/*
		if($(".wrap").height() >= $(window).height()*1.5){
			if($("#footer, .btn_fix, .subscription_progress").length){
				$(".quick_wrap").addClass("over");
			}
		}
		*/

		function pageScrollTop(e) {
			//$("#footer, .btn_fix, .subscription_progress").length ? $(".quick_wrap").addClass("over") : null;
			if (win.scrollTop() > win.height()) {
				btnTop.addClass('_on');
				$('.btn_talk').addClass('_up2'); // 180928 추가
			} else {
				btnTop.removeClass('_on');
				$('.btn_talk').removeClass('_up2'); // 180928 추가
			}
		}
	};

	BasicMotion.init();

	fo.addGlobal(BasicMotion, 'basicMotion');

	return BasicMotion;
});
