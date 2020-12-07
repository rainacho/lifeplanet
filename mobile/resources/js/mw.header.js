/* ============================================================================
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * DESCRIPTION : 공통으로 사용되는 Javascript 파일
 * ============================================================================*/
var CCData = null; // 페이지별 함수 구분을 위한 object 선언
var CCData_PAGE_VARIABLE = null; // 페이지별 Context 변수 선언

//=============================================================================
// 페이지 Init 함수
//=============================================================================
getCCData = function (resGlobalPram) {
	initPage = (function () {
		CCData.printData();
	})();

	initEvent = (function () {
		CCData.eventBinder();
		CCData.eventHandler();
	})();
};

//=============================================================================
// 페이지 기능 정의 함수
//=============================================================================

var CCData = {
	spbCertYn: 'N',
	naYnParam: 'N',
	/**
		페이지 시작
	*/
	printData: function () {
		var urlPath = parent.location.href;

		if (
			urlPath.indexOf('/products/pg/') > -1 &&
			globalVar.getParam('inSData').inflow != 'QH' &&
			globalVar.getParam('inSData').inflow != 'QI' &&
			globalVar.getParam('inSData').inflow != 'CM'
		) {
			//설계 페이지 '무엇이든 물어보세요' 추가
			$('.design_result').append('<p id="counselMsgWrap" class="counsel_msg_wrap"></p>');
			//해당 페이지 유입시 '상담예약하기' 툴팁 추가
			counselNoti('counsel_tip_noti');
		}

		var spbCertYn = $('.btn_basket em.cnt').data('cert');
		CCData.spbCertYn = spbCertYn != 'Y' ? 'N' : 'Y';

		// 카카오페이로 넘어온 경우 공유하기 및 장바구니 삭제
		// if (window.WAVE) {
		// 	if (WAVE.UserAgent.isKakaoPayApp() || WAVE.UserAgent.isKakaoTalkApp()) {
		// 		// 카카오페이 or 카카오톡 앱인 경우
		// 		$('#kakaoPrdInfoBack').show();
		// 		$('.header_hamburger').hide();
		// 		$('.btn_sns_share').hide();
		// 		$('.btn_basket').hide();
		// 		$('.btn_fix').removeClass('btn_area2'); // 상품설계 장바구니 버튼 삭제
		// 		$('#btn_').hide();
		// 		$('body').addClass('kp_ui'); // 카카오페이 클래스 추가
		// 	}
		// }

		// if (globalVar.getParam('inSData').inflow == 'CM' || globalVar.getParam('inSData').inflow == 'QI') {
		// 	$('.btn_sns_share').hide();
		// 	$('.btn_basket').hide();
		// 	$('.btn_counsel').hide();
		// 	$('#btn_').hide();
		// 	$('.btn_fix').removeClass('btn_area2'); // 상품설계 장바구니 버튼 삭제

		// 	if (globalVar.getParam('inSData').inflow == 'CM') {
		// 		$('body').addClass('bm_ui'); // 보핍 클래스 추가
		// 	}
		// }
	},
	/**
		이벤트 바인더
	*/
	eventBinder: function () {
		//메뉴 선택(이탈)
		var currentURL = location.pathname;
		var pageCd = currentURL.split('.')[0].split('/')[2];
		var pageNm = currentURL.split('.')[0].split('/')[3];
		if (pageCd == 'pg') {
			// 설계 랜딩페이지 인 경우에만 바인딩
			$('.header_hamburger')
				.unbind('click')
				.bind('click', function () {
					if (globalVar.getParam('inSData').inflow == 'QH') {
						PageUtil.movePage('/analysis/an/AN00000S.dev');
						return;
					} else if (globalVar.getParam('inSData').inflow == 'QI') {
						PageUtil.movePage('/analysis/na/NA01101S.dev');
						return;
					} else if (globalVar.getParam('inSData').inflow == 'CM') {
						if (pageNm == 'PG01100S') {
							PageUtil.movePage('/products/pg/PG01002S.dev');
						} else {
							PageUtil.movePage('/products/pg/PG37003S.dev');
						}
						return;
					} else if (util.getCookie('POPUP_CT00513L') != 'Y') {
						webLog.runGAQ('이탈-바른보장 안내', '팝업호출', '바른보장TF-이탈');
						PageUtil.openLayerPopup('/common/ct/CT00513L.dev', true);
					} else {
						// GNB 재선언
						fo.global.commonFn.setGnb();
					}
				});
		}

		//상담예약하기
		$('[data-dupid="counselReserve"]')
			.unbind('click')
			.bind('click', function () {
				CCData.insertTrackingCd('상담예약하기');

				var urlPath = parent.location.href;

				if (urlPath.indexOf('/analysis/na/') > -1) {
					//바른보장 경우, 전화상담예약 접수화면으로 바로이동
					var url = '/contact/ta/TA00121P.dev';
					var param = {
						naYnParam: CCData.naYnParam,
					};
					fo.global.commonFn.callPopup(url, callBackFn, param);
				}
			});

		//전화상담 예약 팝업
		$('#telContactPop1,#telContactPop2')
			.unbind('click')
			.bind('click', function () {
				var url = '/contact/ta/TA00121P.dev';
				var param = {
					naYnParam: CCData.naYnParam,
				};
				fo.global.commonFn.callPopup(url, callBackFn, param);
				CCData.insertTrackingCd('상담예약');
			});

		//상담예약하기 - 무엇이든 물어보세요 클릭
		$('#counselMsgWrap')
			.unbind('click')
			.bind('click', function () {
				var url = '/contact/ta/TA00121P.dev';
				var param = {
					naYnParam: CCData.naYnParam,
				};
				fo.global.commonFn.callPopup(url, callBackFn, param);
				CCData.insertTrackingCd('상담예약하기-msg');
			});

		//전화상담
		$('[data-dupid="callContact"]')
			.unbind('click')
			.bind('click', function () {
				CCData.insertTrackingCd('전화상담');
			});

		//장바구니 팝업
		$('#CC06060P1')
			.unbind('click')
			.bind('click', function () {
				webLog.runGAQ('장바구니바로확인', '버튼클릭', '00000');
				webLog.runDsFunc({ _n_p4: 'cart_click' });
				if (CCData.spbCertYn == 'Y') {
					//장바구니 SMS 인증 사용자
					PageUtil.movePage('/common/cc/CC06000S.dev');
				} else {
					//장바구니 SMS 미인증 사용자
					fo.global.commonFn.callPopup('/common/cc/CC06060P.dev', callBackFn);
				}
				//			fo.global.commonFn.callPopup('/common/cc/CC06060P.dev', callBackFn);

				//			console.log("globalVar.getParam('hndTphno') : "+globalVar.getParam('hndTphno'));
				//			console.log("globalV                                                    ar.getParam('outData').spbCertYn : " + globalVar.getParam('outData').spbCertYn);
				//
				//			//핸드폰번호가 존재하지 않을 경우
				//			if(util.isNull(CCData.param.hndTphno) || util.isNull(CCData.param.spbCertYn) || CCData.param.spbCertYn != 'Y'
				//			|| (!util.isNull(CCData.param.hndTphno) && CCData.param.hndTphno.length != 10 && CCData.param.hndTphno.length != 11)) {
				//				setTimeout(function(){
				//					fo.global.commonFn.callPopup('/common/cc/CC06050P.dev', callBackFn,CCData.param);
				//				}, 500);
				//			} else {
				//				PageUtil.movePage('/common/cc/CC06000S.dev');
				//			}
			});

		//장바구니 팝업
		$('#CC06060P2')
			.unbind('click')
			.bind('click', function () {
				webLog.runGAQ('장바구니바로확인', '버튼클릭', '00000');
				webLog.runDsFunc({ _n_p4: 'cart_click' });
				if (CCData.spbCertYn == 'Y') {
					//장바구니 SMS 인증 사용자
					PageUtil.movePage('/common/cc/CC06000S.dev');
				} else {
					//장바구니 SMS 미인증 사용자
					fo.global.commonFn.callPopup('/common/cc/CC06060P.dev', callBackFn);
				}
				//			fo.global.commonFn.callPopup('/common/cc/CC06060P.dev', callBackFn);
				//			console.log("globalVar.getParam('hndTphno') : "+globalVar.getParam('hndTphno'));
				//			console.log("globalVar.getParam('outData').spbCertYn : " + globalVar.getParam('outData').spbCertYn);
				//
				//			//핸드폰번호가 존재하지 않을 경우
				//			if(util.isNull(CCData.param.hndTphno) || util.isNull(CCData.param.spbCertYn) || CCData.param.spbCertYn != 'Y'
				//				|| (!util.isNull(CCData.param.hndTphno) && CCData.param.hndTphno.length != 10 && CCData.param.hndTphno.length != 11)) {
				//					setTimeout(function(){
				//						fo.global.commonFn.callPopup('/common/cc/CC06060P.dev', callBackFn);
				//					}, 500);
				//			} else {
				//				PageUtil.movePage('/common/cc/CC06000S.dev');
				//			}
			});
		$('#kakaoPrdInfoBack')
			.off('click')
			.on('click', function () {
				PageUtil.movePage('/analysis/an/AN00000S.dev');
				return;
			});

		$('.btn_history_back')
			.off('click')
			.on('click', function () {
				var currentURL = location.pathname;
				var pageCd = currentURL.split('.')[0].split('/')[2];
				var pageNm = currentURL.split('.')[0].split('/')[3];
				var chPageNm,
					moveBackPageNm = '';
				var moveBackUrl = sessionStorage.getItem('moveBackUrl');
				var isInbyu = globalVar.getParam('inSData').inflow == 'QH' ? true : false;
				var isIoneB = globalVar.getParam('inSData').inflow == 'QI' ? true : false;
				var isBomap = globalVar.getParam('inSData').inflow == 'CM' ? true : false;

				if (pageCd == 'pa') {
					return false;
				}

				switch (pageCd) {
					case 'pg':
						if (!isInbyu && util.getCookie('POPUP_CT00513L') != 'Y') {
							util.setCookie('POPUP_CT00513L', 'Y', { expires: 1 });
							PageUtil.openLayerPopup('/common/ct/CT00513L.dev', true);
						} else {
							if (isInbyu) {
								PageUtil.movePage('/analysis/an/AN00000S.dev');
								return;
							} else if (isIoneB) {
								PageUtil.movePage('/analysis/na/NA01101S.dev');
								return;
							} else if (isBomap) {
								if (pageNm == 'PG01100S') {
									PageUtil.movePage('/products/pg/PG01002S.dev');
								} else {
									PageUtil.movePage('/products/pg/PG37003S.dev');
								}
								return;
							} else if (document.referrer.indexOf('/analysis/na/') > -1) {
								history.back();
							}
							if (moveBackUrl !== null && moveBackUrl !== undefined) {
								moveBackPageNm = moveBackUrl.split('/')[3];
							}
							//100세암 전략상품의 경우
							if (
								(moveBackPageNm == 'PG37002S' && (pageNm == 'PG37200S' || pageNm == 'PG37300S')) ||
								(moveBackPageNm == 'PG37001S' && pageNm == 'PG37100S')
							) {
								chPageNm = moveBackPageNm;
							} else {
								chPageNm = util.replaceAll(pageNm, '100S', '000S');
							}

							moveURL = '/products/pg/' + chPageNm;
							PageUtil.movePage(moveURL);
						}
						break;

					case 'na':
						if (pageNm == 'NA01000S') {
							moveURL = '/common/cm/CM01000S';
							PageUtil.movePage(moveURL);
						} else {
							moveURL = '/analysis/na/NA01000S';
							PageUtil.movePage(moveURL);
							//history.back();
						}
						break;

					case 'nb':
						if (pageNm == 'NB01000S') {
							moveURL = '/common/cm/CM01000S';
						} else if (pageNm == 'NB04000S') {
							if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
								moveURL = '/analysis/nb/NB01000S';
							} else {
								moveURL = '/analysis/nb/NB01001S';
							}
						} else {
							moveURL = '/analysis/nb/NB01000S';
						}
						PageUtil.movePage(moveURL);
						break;
					case 'cc':
						if (pageNm == 'CC06000S') {
							moveURL = '/common/cm/CM01000S';
						} else {
							moveURL = '/common/cc/CC06000S';
						}
						PageUtil.movePage(moveURL);
						break;

					default:
						moveURL = '/common/cm/CM01000S';
						PageUtil.movePage(moveURL);
						break;
				}
				//PageUtil.movePage(moveURL);
			});
	},
	/**
		이벤트 핸들러
	*/
	eventHandler: function () {},
	/**
		유입화면에 따라 웹로그 적재
	*/
	insertTrackingCd: function (action) {
		var urlPath = parent.location.href;

		if (urlPath.indexOf('/products/pg/') > -1) {
			webLog.runGAQ(action, '버튼클릭', '바른보장TF-pg');
		} else if (urlPath.indexOf('/analysis/na/') > -1) {
			webLog.runGAQ(action, '버튼클릭', '바른보장TF-na');
		} else {
			webLog.runGAQ(action, '버튼클릭', '00000');
		}
	},
};

//상담안내 재노출을 위한 스크립트 counselNoti("counsel_tip_noti");
function counselNoti(obj, t) {
	var el = $('.' + obj);

	if (t == 1) {
		//바른보장 설계결과 유입 - case1
		el.text('분석결과 전문상담 ');
	} else if (t == 2) {
		//바른보장 가입내역 팝업닫기 - case2
		el.text('보험 리모델링 받기');
	} else if (t == 3) {
		//바른보장 추천내역 팝업닫기 - case3
		el.text('꼭 맞는 보험 상담');
	}
	//상품안내 & 보험료설계결과 "상담예약하기" - case4
	el.addClass('ing')
		.stop()
		.delay(3500)
		.queue(function () {
			$(this).removeClass('ing');
			$(this).dequeue();
		});
}

$(document).ready(function () {
	getCCData();
});

//아이원뱅크 header back
// if(globalVar.getParam('inSData').inflow == "QI"){

// 	var urlPath = parent.location.href;
// 	//상품설계의 경우 팝업닫기
// 	if(urlPath.indexOf('/products/pg/') > -1){
// 		if(typeof uf_back !== 'function'){
// 			uf_back = function(){
// 				if($(".popup_wrap").is(":visible")){
// 					var id = $(".popup_wrap").attr("data-popup-id");
// 					if($(".popup_wrap").length > 1){
// 						id = $(".popup_wrap").eq($(".popup_wrap").length-1).attr("data-popup-id");
// 					}
// 					$('.btn_popup_close').click();
// 				}else if($(".design_detail_section").is(":visible")){
// 					$('.btn_close').click();
// 				}else{
// 					PageUtil.movePage('/analysis/na/NA01101S.dev');
// 				}
// 			}
// 		}
// 	}
// }
