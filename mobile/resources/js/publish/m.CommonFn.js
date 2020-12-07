define(['fo', 'event', 'basicMotion'], function (fo, event, basicMotion) {
	var CommonFn = {
		options: {
			args: arguments,
		},
	};

	function init() {
		setGnbButtons();
		setPopupButtons();
		setTooltipButtons();
		counselButton();
		contFix();
		setInputFocus();
		countToggle();
		radioButton();
		radioButton2();
		tabButton();
		setAccordion();
		//setGnbTab(); 200601 수정
		setGnbTabRenew(); //200601 수정
		//initToggleDisplay();
		toggleArea();
		toggleConfirm();
		inputFocus();
		inputSearch();
		setOrientationInfo();
		setSize();
		// setToneAndManner();

		toastCopy();
	}

	/* CommonFn.callPopup
	ajax를 통해 팝업 마크업을 화면에 그림
	id: ajax 연결 ID(현재는 URL로 쓰임)
	callBackFn: 팝업 이후 실행 함수
	paramObj: 개발파트 사용 파라메터
	loadingKey: 팝업 로딩중 보여줄 로딩종류Key
	*/
	CommonFn.callPopup = function (id, callBackFn, paramObj, loadingKey) {
		paramObj === undefined ? (paramObj = {}) : paramObj;
		$.ajax({
			url: id,
			method: 'POST',
			dataType: 'text',
			data: { JSON_DATA: JSON.stringify(paramObj, null, 2) },
			beforeSend: function () {
				fnLoading_Show(loadingKey);
			},
		}).done(function (data) {
			fnLoading_Hide();
			basicMotion.pageHold('hold');

			var popupWrap = $('<div />', {
				class: 'popup_wrap',
				style: 'min-height:' + $(window).height() + 'px;z-index:' + getHighestZ('div'),
				'data-popup-id': id,
				html: data,
			});

			$('.popup_area .popup_wrap').last().pageHold();
			$('.popup_area')
				.append(popupWrap)
				.show(function () {
					popupWrap.find('.popup').css({ top: '0%' });
				});

			setTimeout(function () {
				$(window).scrollTop(1); /* popup scroll top */
			}, 1000);

			callBackFn !== undefined ? callBackFn(id) : null;

			if ($('.design_detail_section').length && $('.design_detail_section').is(':visible')) {
				$('.design_detail_section').css('overflow-y', 'hidden');
			}

			/* header fixed after popup open*/
			setTimeout(function () {
				//2018-05-03 수정 | if(!popupWrap.find(".popup.close").length){} 추가
				if (!popupWrap.find('.popup.close').length) {
					var cloneTitle = popupWrap.find('.popup_title, .popup_title_header').clone().addClass('clone');
					popupWrap
						.find('.popup_title, .popup_title_header')
						.not('.clone')
						.find('h1')
						.css({ color: 'transparent' })
						.next('.btn_popup_close')
						.css({ display: 'none' });
					if (popupWrap.find('.popup_title').length) {
						popupWrap.find('.popup_content_wrap').prepend(cloneTitle);
					} else {
						popupWrap.find('.popup_title_wrap').prepend(cloneTitle);
					}
					$(window).scrollTop(0); /* popup scroll top */
				}
				//2018-05-13 수정 | 삼성인터넷 | 키보드가 열려있는 상태에서 짧은 팝업을 열었을때 height가 모자라게보이는 현상 수정
				if ($('.popup_area .popup_wrap').height() < $(window).height()) {
					$('.popup_area .popup_wrap').height($(window).height());
				}
			}, 400);

			//2018-05-02 수정 | 안드로이드 크롬, 삼성 브라우저 팝업 하단 여백 수정
			if (/Android/i.test(navigator.userAgent) && navigator.userAgent.toLowerCase().indexOf('gecko) chrome') != -1) {
				//크롬 + 삼성 인터넷 - indexOf("chrome") || only 크롬 -  indexOf("gecko) chrome")
				if ($('.popup_area .popup_wrap .dimmed').height() > $(window).height()) {
					/* only 크롬 주소 표시줄이 없을때 */
					$('.popup_wrap').css('min-height', $('.popup_area .popup_wrap .dimmed').height() + 'px');
				}
			}
		});
	};
	/* CommonFn.removePopup
	id: data-popup-id 에 매칭되는 팝업을 닫음(remove)
	*/
	//2018-05-03 수정 | 닫히는 모션 추가
	CommonFn.removePopup = function (id) {
		var popupArea = $('.popup_area').find('.popup_wrap[data-popup-id="' + id + '"]');
		var currentTop = Math.round((popupArea.find('.popup').offset().top / $(window).height()) * 100);

		popupArea
			.find('.popup')
			.css({
				top: currentTop + '%',
				'animation-duration': 0.004 * (100 - currentTop) + 's',
			})
			.addClass('close');
		popupArea
			.find('.dimmed')
			.css({
				opacity: 1 - currentTop * 0.01,
				'animation-duration': 0.004 * (100 - currentTop) + 's',
			})
			.addClass('close');

		/*$("html, body").animate({
			"scrollTop": 0
		}, 4*(100-currentTop));*/
		$('html, body').scrollTop(0);

		if (popupArea.find('.popup_title.clone, .popup_title_header.clone').length) {
			popupArea.find('.popup_title, .popup_title_header').find('h1').removeAttr('style').next('.btn_popup_close').removeAttr('style');
			popupArea.find('.popup_title.clone, .popup_title_header.clone').remove();
		}

		popupArea.delay(4 * (100 - currentTop)).queue(function () {
			$(this).remove();
			if ($('.popup_area .popup_wrap').length) {
				$('.popup_area .popup_wrap').last().pageRelease();
			} else {
				basicMotion.pageHold('release');
				if ($('.design_detail_section').length && $('.design_detail_section').is(':visible')) {
					$('.design_detail_section').css('overflow-y', 'auto');
				}
			}
		});
	};

	/* CommonFn.callTooltip
	ajax를 통해 툴팁 마크업을 화면에 그림
	id: ajax 연결 ID(현재는 URL로 쓰임)
	*/
	CommonFn.callTooltip = function (id) {
		if (!$('.tip_content[data-tooltip-id="' + id + '"]').length) {
			$.ajax({
				url: id,
				dataType: 'html',
			}).done(function (data) {
				var tooltipContent = $(data).attr('data-tooltip-id', id);
				$('.tooltip .tip_content_wrap > .tip_content').remove();
				$('.tooltip .tip_content_wrap ').prepend(tooltipContent);
				setTimeout(function () {
					$('.tooltip').addClass('_active').find('.tip_content').focus();
					basicMotion.pageHold('hold');
				}, 100);
			});
		} else {
			$('.tooltip').addClass('_active').find('.tip_content').focus();
			basicMotion.pageHold('hold');
		}

		if ($('.design_detail_section').length && $('.design_detail_section').is(':visible')) {
			$('.design_detail_section').css('overflow-y', 'hidden');
		}
	};

	/* CommonFn.removeTooltip
	현재 화면의 툴팁을 닫음(remove)
	*/
	CommonFn.removeTooltip = function () {
		$('.tooltip').removeClass('_active');
		if ($('.tip_content.double').index() != -1) {
			//
		} else {
			if (!$('.popup_area .popup_wrap').length) {
				basicMotion.pageHold('release');
			}

			if ($('.design_detail_section').length && $('.design_detail_section').is(':visible')) {
				$('.design_detail_section').css('overflow-y', 'auto');
			}
		}
	};

	/* CommonFn.rollingNumber
	el 오브젝트의 text를 number 까지 증가하는 모션
	*/
	CommonFn.rollingNumber = function (el, number) {
		var number = number ? number : $(el).data('number') ? $(el).data('number') : $(el).text();

		if ($(el).length) {
			if (isNaN(number)) {
				number = number.replace(/,/g, '');
			}

			$({ val: 0 })
				.stop()
				.animate(
					{ val: number },
					{
						duration: 1000,
						easing: 'swing',
						step: function (now, obj) {
							var now = Math.ceil(now).toLocaleString('en').split('.')[0];
							$(el).text(now);
						},
					}
				);
		}
	};

	/* CommonFn.moveGraph
	opt 오브젝트의 width를 json data 혹은 data-graph-percent 속성 수치의 %만큼 증가하는 모션
	*/
	CommonFn.moveGraph = function (opt, json) {
		var $target = opt ? $(opt) : $('[data-graph-percent]');

		$target.each(function (i) {
			var data = json ? json[i].value : $(this).data('graphPercent');

			if (data > 100) {
				data = 100;
			}

			$(this)
				.stop()
				.animate(
					{
						width: data + '%',
					},
					800
				);
		});
	};

	/* CommonFn.removeGraph
	opt 오브젝트의 width를 0으로 적용시킴
	*/
	CommonFn.removeGraph = function (opt) {
		var $target = opt ? $(opt) : $('[data-graph-percent]');

		$target.stop().css('width', 0);
	};

	/* CommonFn.setDisplay
	targetArr 의 selector 들을 보이거나 닫는 모션
	mode : "show", "hide"
	*/
	CommonFn.setDisplay = function (targetArr, mode) {
		var options = {
			duration: 400,
			easing: 'swing',
		};

		targetArr = targetArr.split('|');

		$.each(targetArr, function (index, opt) {
			opt = $.trim(opt);
			if ($(opt).length) {
				if (mode === 'show') {
					$(opt).stop().slideDown(options);
				} else if (mode === 'hide') {
					$(opt).stop().slideUp(options);
				}
			}
		});
	};

	/* CommonFn.moveScrollTo
	화면 스크롤 이동 함수
	param ::
	"top": 페이지 최상단으로 스크롤
	"bottom": 페이지 최하단으로 스크롤
	실제 selector: 해당 셀렉터 위치로 스크롤
	*/
	CommonFn.moveScrollTo = function (selector) {
		var targetTop = 0;
		switch (selector) {
			case 'top':
				targetTop = 0;
				break;
			case 'bottom':
				//2018-04-30 수정 | 청약일때 .subscription .scene_item._active 추가
				targetTop = $('.subscription .scene_item').length
					? $('.subscription .scene_item._active').height() - $('.wrap').height()
					: $('.wrap').height();
				break;
			default:
				$(selector).length ? (targetTop = $(selector).offset().top - 50) : null;
				break;
		}
		$('html, body').animate(
			{
				scrollTop: targetTop,
			},
			500,
			'easeInOutExpo'
		);
	};

	/* CommonFn.closeCounsel
	상단 상담하기 레이어 닫기
	*/
	CommonFn.closeCounsel = function () {
		if ($('#header_products .counsel .btn_counsel').hasClass('on')) {
			$('#header_products .counsel .btn_counsel').removeClass('on').siblings('ul').hide();
		}
	};

	//private function

	/* setGnbButtons 200601 수정
	GNB 버튼 동작 설정
	*/
	var setGnbButtons = function () {
		$('.header_hamburger').click(function (e) {
			// V3 init
			//			MXP_PLUGIN_CONST.setConfiguration(MXP_PLUGIN.getOSInfo().name);
			//			// 20191206 모바일웹 V3 최신버전(v.2.5.5.8) 종료문제로 인해 임시적으로 실행되지 않도록 수정
			//			if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID && navigator.userAgent.indexOf('MXP') < 0) {
			//				var setTouchEvent = false;
			//				V3.init(setTouchEvent);
			//			}

			/* 바른보장TF로 인한 분기처리 */
			var currentURL = location.pathname;
			var pageCd = currentURL.split('.')[0].split('/')[2];
			if (pageCd == 'pg' && util.getCookie('POPUP_CT00513L') != 'Y') {
				util.setCookie('POPUP_CT00513L', 'Y', { expires: 1 });
			} else {
				var gnbHeight1 = $('.gnb_header').height();
				var gnbHeight2 = $(window).height() - gnbHeight1;

				$('#gnb').addClass('open');
				$('#gnb_wrap > .gnb_body').css('height', gnbHeight2);
				basicMotion.toggleNavigation('open');
				basicMotion.pageHold('hold');
				$('#gnb .swiper_carousel').each(function () {
					if ($(this).data('plugin_SwiperCarousel')) {
						$(this).data('plugin_SwiperCarousel').object.update();
					}
				});
				e.preventDefault();
			}
		});

		//닫기
		$('.btn_gnb_close, .gnb_dim').click(function (e) {
			$('#gnb').removeClass('open');
			basicMotion.toggleNavigation('close');
			basicMotion.pageHold('release');
			e.preventDefault();
		});

		//애니메이션 처리
		$('#gnb .gnb_body > .r_nav > div > ul > li a').on('click', function (e) {
			var touchX, touchY;
			var scaleSize = $(this).innerWidth() / $(this).innerHeight() + 2;
			touchX = e.offsetX;
			touchY = e.offsetY;
			cssValChange('ckx', touchX + 'px');
			cssValChange('cky', touchY + 'px');
			cssValChange('size', scaleSize);

			$(this)
				.addClass('active')
				.delay(300)
				.queue(function () {
					$(this).removeClass('active');
					$(this).dequeue();
				});
		});

		//3뎁스
		$('#gnb .dep3 > a').click(function (e) {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').next().stop(true, true).slideUp(300);
			} else {
				$(this).addClass('on').next().stop(true, true).slideDown(300);
			}
			e.preventDefault();
		});

		$(window).resize(function () {
			var gnbHeight1 = $('.gnb_header').height();
			var gnbHeight2 = $('#gnb_wrap').height() - gnbHeight1;
			$('#gnb_wrap > .gnb_body').css('height', gnbHeight2);
		});
	};

	//css x,y 변수 전달. 200601 수정
	function cssValChange(id, value) {
		const style = document.documentElement.style;
		style.setProperty('--' + id, value);
	}

	/* Gnb 설정 함수 추가 */
	CommonFn.setGnb = function () {
		$('#gnb').addClass('open');
		basicMotion.toggleNavigation('open');
		basicMotion.pageHold('hold');
		$('#gnb .swiper_carousel').each(function () {
			if ($(this).data('plugin_SwiperCarousel')) {
				$(this).data('plugin_SwiperCarousel').object.update();
			}
		});
	};

	/* setPopupButtons
	팝업 열기 버튼 설정
	*/
	var setPopupButtons = function () {
		/* 전역으로 제어 history 
		$(document).on('click', '.btn_popup', function (e) {
			CommonFn.callPopup($(this).data('popup-id'));
			$('.popup_area .popup_wrap').last().pageHold();
			if (!$(this).is('input')) {
				e.preventDefault();
			}
		});*/
		$(document).on('click', ' .btn_popup_close, .popup .dimmed', function (e) {
			CommonFn.removePopup($(this).parents('.popup_wrap').data('popup-id'));
			/*$(".popup_area .popup_wrap").last().pageRelease();*/
			e.preventDefault();
		});

		$(document).on('click', ' .btn_modal_close, .modal_area .dim_panel', function (e) {
			$(this).closest('.modal_area').addClass('none');
			e.preventDefault();
		});
	};

	/* setTooltipButtons
	툴팁 열기 버튼 설정
	*/
	var setTooltipButtons = function () {
		$(document).on('click', 'a[data-tooltip-id], button[data-tooltip-id], span[data-tooltip-id]', function (e) {
			//180726 수정
			CommonFn.callTooltip($(this).data('tooltip-id'));
			$('.popup_area .popup_wrap').last().pageHold();
			if (!$(this).is('input')) {
				e.preventDefault();
			}
		});
		$(document).on('click', '.btn_tooltip_close', function (e) {
			CommonFn.removeTooltip();
			$('.popup_area .popup_wrap').last().pageRelease();
			e.preventDefault();
		});
	};

	/* getHighestZ
	현재 화면의 최대 z-index 찾기
	*/
	var getHighestZ = function (selector) {
		var max = 0;
		$(selector).each(function (i, el) {
			var z;
			max = Math.max(isNaN((z = parseInt($(this).css('z-index')))) ? 0 : z, max);
		});
		return max;
	};

	/* counselButton
	상단 상담하기 버튼 설정
	*/
	var counselButton = function () {
		$('#header_products .counsel .btn_counsel, #header_main .counsel .btn_counsel').on('click', function () {
			$(this).toggleClass('on').next().fadeToggle(300);
		});
	};

	/* contFix
	페이지가 화면보다 높이가 작은경우 .cont_fix 태그의 높이를 화면에 맞춤
	*/
	var contFix = function () {
		if ($('.cont_fix').length) {
			var winH = $(window).height();
			$('.cont_fix').css('min-height', winH - 50 + 'px');
		}
	};

	/* setInputFocus
	인풋 요소의 포커스 동작 설정
	*/
	var setInputFocus = function () {
		$(document)
			.on('focus', '.ipt input', function () {
				var _this = $(this);
				var parent = $(_this).closest('.ipt');

				if (!$(_this).attr('readonly')) {
					$(parent).addClass('focus');
				}
			})
			.on('focusout', '.ipt input', function () {
				var _this = $(this);
				var parent = $(_this).closest('.ipt');

				if (!$(_this).attr('readonly')) {
					$(parent).addClass('leave');
					setTimeout(function () {
						$(parent).removeClass('focus leave');
					}, 400);
				}
			});
	};

	/* countToggle
	인증번호 입력필드의 남은시간 표시 관련 설정
	*/
	var countToggle = function () {
		$(document)
			.on('focusin', '.ipt_count input', function () {
				$(this).siblings('.count').hide();
			})
			.on('focusout', '.ipt_count input', function () {
				var _this = $(this);
				if ($(_this).val() == '') {
					$(this).siblings('.count').show();
				}
			});
	};

	/* radioButton
	2가지 선택지의 라디오 버튼의 경우 스타일, 동작 관련 설정
	*/
	var radioButton = function () {
		$(document).on('click', '.radio_type2 input', function (e) {
			var _this = $(this);
			switch (_this.closest($('.radio')).index()) {
				// 181001 수정 (시작)
				case 0:
					_this.closest('.radio_type2').removeClass('_right _last').addClass('_left');
					break;
				case 1:
					_this.closest('.radio_type2').removeClass('_left _last').addClass('_right');
					break;
				case 2:
					_this.closest('.radio_type2').removeClass('_left _right').addClass('_last');
					break;
				// 181001 수정 (끝)
			}
		});
		$(document).on('change', '.radio_type2', function (e) {
			$(e.currentTarget)
				.find('[data-toggle-id]')
				.each(function () {
					var id = $(this).data('toggle-id');

					if ($(this).is(':checked')) {
						$(id).data('toggle-display', false);
					} else {
						$(id).data('toggle-display', true);
					}
					setToggleDisplay(id);
				});
		});
	};

	/* radioButton2
	이체일 다수 선택지의 라디오 버튼의 경우 스타일, 동작 관련 설정
	*/
	var radioButton2 = function () {
		$(document).on('click', '.radio_type5 input', function (e) {
			var radioArray = $('.radio_type5 input').length;
			var _this = $(this);

			for (var j = 0; j < radioArray; j++) {
				switch (_this.closest($('.radio')).index()) {
					case j:
						_this
							.closest('.radio_type5')
							.removeClass()
							.addClass('radio_type5 _focus0' + (j + 1));
						break;
				}
			}
		});
	};

	/* CommonFn.initToggleDisplay
	각 태그의 data-toggle-id 속성의 값과 매칭되는
	toggle-id 값을 가진 태그가 toggle 클래스를 가진 경우
	CommonFn.setDisplay 를 실행시킴
	*/
	CommonFn.initToggleDisplay = function () {
		$('[data-toggle-id]').each(function () {
			if ($(this).hasClass('toggle')) {
				setToggleDisplay($(this).data('toggle-id'));
			}
		});
	};

	/* setToggleDisplay
	CommonFn.setDisplay 동작 설정
	*/
	var setToggleDisplay = function (selector) {
		var target = $(selector);
		if (target.data('toggle-display')) {
			CommonFn.setDisplay(selector, 'hide');
			target.data('toggle-display', false);
		} else {
			CommonFn.setDisplay(selector, 'show');
			target.data('toggle-display', true);
		}
	};

	/* toastCopy
	공유하기 시 '링크복사' 레이어 활성화
	*/
	var toastCopy = function () {
		var area_sharebox = $('.area_sharebox');
		$('.area_sharebox .copy').click(function (e) {
			if (!$(area_sharebox).is('._active')) {
				$(area_sharebox)
					.addClass('_active')
					.stop()
					.delay(2000)
					.queue(function () {
						$(area_sharebox).removeClass('_active');
					});
			}
		});
	};

	/* tabButton
	탭 버튼 관련 설정
	*/
	var tabButton = function () {
		$(document).on('click', "[class*='tab_type'] li a", function (e) {
			var hash = this.hash;
			$(this).closest('ul').find('li').removeClass('on');
			$(this).closest('li').addClass('on');
			$(hash).show().siblings('.tab_cont').hide();
			//2018-04-30 수정 | 보장내역 tab_type1 클릭 시, 스크롤 상단으로 이동하도록 변경
			if ($(this).closest('div.popup_table_st6').length && $(this).closest('.tab_type2').length != 1) {
				CommonFn.moveScrollTo('top');
			}
			e.preventDefault();
		});
	};

	/* setAccordion
	[class*='accordion_'] 속성을 가진 태그의 아코디언 기능 설정
	*/
	var setAccordion = function () {
		/* 현재 쓰이는지 확인 */
		$("[class*='accordion_'].on").find('.accor_cont').height('auto');

		$("[class*='accordion_'] .accor_tit")
			.off('click')
			.on('click', function (e) {
				if (!$(e.target).hasClass('accor_tit')) return;

				var _this = $(this);
				var accordion = $(_this).closest("[class*='accordion_type']");
				var contH = $(accordion).find('.accor_cont .inner').outerHeight();

				if ($(accordion).hasClass('on')) {
					$(accordion).removeClass('on').find('.accor_cont').stop().animate({ height: '0px' }, 400, 'swing');
				} else {
					$(accordion)
						.addClass('on')
						.find('.accor_cont')
						.stop()
						.animate({ height: contH + 'px' }, 400, 'swing');
				}
				e.preventDefault();
			});

		$('.accordion').each(function (i, el) {
			var accordion = $(this);
			var items = accordion.children();
			var buttons = items.find('> a');

			buttons.click(function (e) {
				if (!$(this).next('ul').length) return;

				if ($(this).hasClass('active')) {
					$(this).parent().removeClass('_on');
					$(this).next('ul').slideUp({ duration: 400, easing: 'easeOutCubic' });
					$(this).removeClass('active');
					e.preventDefault();
					return;
				}
				var curIndex = $(this).parent().index();
				items.each(function (j, el) {
					if (j == curIndex) {
						$(this).addClass('_on');
						$(this).find('> a').addClass('active').next('ul').slideDown({ duration: 400, easing: 'easeOutCubic' });
					} else {
						$(this).removeClass('_on');
						$(this).find('> a').removeClass('active').next('ul').slideUp({ duration: 400, easing: 'easeOutCubic' });
					}
				});
				e.preventDefault();
			});
		});
	};

	CommonFn.setAccordion = function () {
		/* 현재 쓰이는지 확인 */
		$("[class*='accordion_'].on").find('.accor_cont').height('auto');

		$("[class*='accordion_'] .accor_tit")
			.off('click')
			.on('click', function (e) {
				if (!$(e.target).hasClass('accor_tit')) return;

				var _this = $(this);
				var accordion = $(_this).closest("[class*='accordion_type']");
				var contH = $(accordion).find('.accor_cont .inner').outerHeight();

				if ($(accordion).hasClass('on')) {
					$(accordion).removeClass('on').find('.accor_cont').stop().animate({ height: '0px' }, 400, 'swing');
				} else {
					$(accordion)
						.addClass('on')
						.find('.accor_cont')
						.stop()
						.animate({ height: contH + 'px' }, 400, 'swing');
				}
				e.preventDefault();
			});

		$('.accordion').each(function (i, el) {
			var accordion = $(this);
			var items = accordion.children();
			var buttons = items.find('> a');

			buttons.click(function (e) {
				if (!$(this).next('ul').length) return;

				if ($(this).hasClass('active')) {
					$(this).parent().removeClass('_on');
					$(this).next('ul').slideUp({ duration: 400, easing: 'easeOutCubic' });
					$(this).removeClass('active');
					e.preventDefault();
					return;
				}
				var curIndex = $(this).parent().index();
				items.each(function (j, el) {
					if (j == curIndex) {
						$(this).addClass('_on');
						$(this).find('> a').addClass('active').next('ul').slideDown({ duration: 400, easing: 'easeOutCubic' });
					} else {
						$(this).removeClass('_on');
						$(this).find('> a').removeClass('active').next('ul').slideUp({ duration: 400, easing: 'easeOutCubic' });
					}
				});
				e.preventDefault();
			});
		});
	};

	/* 단순 accordion 함수 2019-09-10 
	  (setAccordion의 충돌현상 발생으로 해당 함수 추가함)
	*/
	CommonFn.accordionNew = function () {
		$('.accordion_new .accor_tit')
			.off('click')
			.on('click', function (e) {
				e.preventDefault();
				$(this).parents('.accordion_new').toggleClass('on');
				$(this).parents('.accordion_new').find('.accor_cont').slideToggle();
			});
	};

	/* 
	GNB 의 계약상품, 보험관리 탭의 설정
	*/
	var setGnbTab = function () {
		if ($('#gnb').length) {
			var gnb = $('#gnb');
			var gnbHeader = gnb.find('.gnb_header');
			var category = gnb.find('.category');
			category.find('.btn_gnb_product').click(function (e) {
				if (!category.hasClass('products')) {
					gnb.find('.menu_products').fadeIn(1400);
					gnb.find('.menu_contract').hide();
					category.removeClass('contract').addClass('products');
				}
				e.preventDefault();
			});
			category.find('.btn_gnb_contract').click(function (e) {
				//if(gnbHeader.hasClass("login")){
				if (!category.hasClass('contract')) {
					gnb.find('.menu_products').hide();
					gnb.find('.menu_contract').fadeIn(1400);
					category.removeClass('products').addClass('contract');
				}
				e.preventDefault();
				//}
			});
		}
	};

	/* setGnbTabRenew 200601 수정
	GNB 리뉴얼 버전
	*/
	var setGnbTabRenew = function () {
		var gnb = $('#gnb');
		var gnbTab = $('#gnbTab');
		//var gnbHeight1 = $(".gnb_header").height();
		//var gnbHeader = gnb.find(".gnb_header");
		var category = gnb.find('.gnb_state');

		/* //최근본상품 sizing mw.goodsCookie.js 로 이관
		if($("#gnb_goodsCookie > a").length > 0){
			var latestWidth =  0;
			var len = $("#gnb_goodsCookie > a").length;
			for(var i = 0; i < len; i++){
				latestWidth += $("#gnb_goodsCookie > a").eq(i).outerWidth(true);
			}
			$("#gnb_goodsCookie").css("width",latestWidth+10);
		}
		*/

		//1depth click
		gnbTab.find('li > a').on('click', function (e) {
			var obj = $(this).attr('href');
			var idx = $(this).parent().index();
			var touchX, touchY;
			var scaleSize = $(this).innerWidth() / $(this).innerHeight() + 1;
			touchX = e.offsetX;
			touchY = e.offsetY;

			if ($(this).hasClass('on')) return false; //중복 트리거 방지
			gnbTab.find('li > a').removeClass('on');
			$('#gnb .r_nav > .dep2').hide();
			cssValChange('ckx', touchX + 'px');
			cssValChange('cky', touchY + 'px');
			cssValChange('size', scaleSize);

			$(this).addClass('on');
			gnb.find('.r_nav').scrollTop(0);
			$(obj).fadeIn();
			if (obj == '#menu03') {
				//이벤트 메뉴 내 스와이프 배너
				//$("#gnb .swiper_carousel").data("plugin_SwiperCarousel").object.update();
				$('#gnb .swiper_carousel').each(function () {
					if ($(this).data('plugin_SwiperCarousel')) {
						$(this).data('plugin_SwiperCarousel').object.update();
					}
				});
			}

			if (idx == 0) {
				//상품
				category.removeClass('contract').addClass('products');
			} else if (idx == 1) {
				//계약관리
				category.removeClass('products').addClass('contract');
			} else {
				category.removeClass('contract').removeClass('products');
			}
			e.preventDefault();
		});
	};

	/* toggleArea
	라디오 버튼 동작에 연결되는 display 설정
	*/
	var toggleArea = function () {
		$(document).on('click', '.btn_toggle:not(input[type=radio])', function () {
			var $this = $(this);
			var toggleId = $this.data('toggleId');

			if (!$this.hasClass('toggle')) {
				CommonFn.setDisplay(toggleId, 'show');
				$this.addClass('toggle');
			} else {
				CommonFn.setDisplay(toggleId, 'hide');
				$this.removeClass('toggle');
			}
		});
	};

	var toggleConfirm = function () {
		$(".btn_tgl_confirm [data-role='confirm']").on('click', function () {
			var complete = $(this).siblings("[data-role='complete']");
			$(this).hide();
			$(complete).show();
		});
	};

	/* inputFocus
	인풋 요소 포커스 이벤트에 연결된 스크롤 기능, ios chrome 에서 동작시키지 않음
	*/
	var inputFocus = function () {
		$(document).on('focusin', 'input[type=text], input[type=tel]', function () {
			//2018-05-16 추가
			//ios 10이상부터 일부 크롬 브라우저가 gecko) chrome에서 gecko) crios로 변경됨
			if (
				/iPhone Os 11/i.test(navigator.userAgent) &&
				(navigator.userAgent.toLowerCase().indexOf('gecko) chrome') == -1 ||
					navigator.userAgent.toLowerCase().indexOf('gecko) crios') == -1)
			) {
				//console.log("ios11 safari :: default scroll...")
			} else {
				//2018-04-30 수정 | 보험료 계산 input 제외
				if (!$(this).parents('#layerPopupArea' || '.premium_check_wrap').length) {
					//2018-05-02 수정 | 바른보장 input data-scroll-top
					if ($(this).data('scroll-top') != undefined) {
						if ($(this).data('scroll-top') != 'disable') {
							$('html, body').animate(
								{
									scrollTop: $(this).data('scroll-top'),
								},
								500,
								'easeInOutExpo'
							);
						}
					} else {
						$(this).moveScroll();
					}
				}
			}
		});
	};

	/* inputSearch
	search 타입 인풋 요소 clear버튼 설정
	*/
	var inputSearch = function () {
		$(document).on('change keyup paste focusin focusout', 'input.ipt_search', function (event) {
			switch (event.type) {
				case 'focusout':
					$(this).next('.btn_clear').fadeOut(200);
					break;
				default:
					$(this).val().length ? $(this).next('.btn_clear').fadeIn(200) : $(this).next('.btn_clear').fadeOut(200);
					break;
			}
		});
	};

	/* setOrientationInfo
	모바일 가로모드 안내 레이어 설정
	*/
	var setOrientationInfo = function () {
		/*  */
		var orient01 = '';
		orient01 += '<div id="screen_off" class="dimbg">';
		orient01 += '   <div class="mode_box"><span class="icon100 icon_warning"></span>모바일은 세로모드에 최적화되어 있습니다.</div>';
		orient01 += '</div>';

		$('body').append(orient01);

		var isMobile = /Android|webOS|iPhone|iPad|iPod|Linux|BlackBerry/i.test(navigator.userAgent) ? true : false;

		// 모바일이 아닐때만 작동
		if (!isMobile) {
			$('#screen_off').css({ display: 'none' });
			$('body').css({ overflowY: 'scroll', overflowX: 'hidden' });
		}

		if (/iPhone|iPad/i.test(navigator.userAgent)) {
			$(window).on('orientationchange load', function () {
				if (window.matchMedia('(orientation: landscape)').matches) {
					$('body').on('touchmove', function (e) {
						e.preventDefault();
					});
				} else {
					$('body').off('touchmove');
				}
			});
		}
	};

	var setSize = function () {
		var setWidth = $(window).width();
		var setHeight = $(window).height();
		if (setHeight <= 480) {
			$('body').addClass('type_480');
		}
	};

	// var setToneAndManner = function(){
	// 	var inflow = globalVar.getParam("inSData").inflow;
	// 	var clpOrgno = globalVar.getParam("inSData").clpOrgno;

	// 	// 톤앤매너
	// 	if (inflow == 'WL' || inflow == 'WT' || inflow == 'QH' || inflow == 'WU'){
	// 		// 카카오페이
	// 		$("body").addClass("kp_ui");

	// 		// CI 로고
	// 		if (location.href.indexOf('/pg/') > -1 && location.href.indexOf('000S') > -1){
	// 			var hero_bg_html = '';
	// 			hero_bg_html  += "<div class='banner_kakao_logo'>";
	// 			hero_bg_html  += "	<img src='/resources/images/common/img_logo_kakao_v191204.png' alt='payxlifeplanet 로고' />";
	// 			hero_bg_html  += "</div>";
	// 			$(".hero_bg").append(hero_bg_html);
	// 		}

	// 	}else if (inflow=='YI' &&  clpOrgno == 'ABH'){
	// 		// 리브메이트
	// 		$("body").addClass("kb_ui");

	// 	}else if (inflow=='YI' &&  clpOrgno == 'HIS'){
	// 		// CI 로고
	// 		if (location.href.indexOf('/pg/') > -1 && location.href.indexOf('000S') > -1){
	// 			var hero_bg_html = '';
	// 			hero_bg_html  += "<div class='banner_his_logo'>";
	// 			hero_bg_html  += "	<img src='/resources/images/common/img_logo_his_v201104.png' alt='HISxlifeplanet 로고' />";
	// 			hero_bg_html  += "</div>";
	// 			$(".hero_bg").append(hero_bg_html);
	// 		}

	// 	}else if (inflow =='CM'){
	// 		// 보맵
	// 		$("body").addClass("bm_ui");

	// 	}else if(inflow =='QI'){
	// 		// 아이원뱅크
	// 		$("body").addClass(inflow);
	// 	}
	// }

	init();

	fo.addGlobal(CommonFn, 'commonFn');

	return CommonFn;
});
