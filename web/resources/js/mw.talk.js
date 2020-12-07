/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * FILE INFO   : mw.talk.js, /resources/js/
 * DESCRIPTION : 상담톡 관련 js
 * ========================================================================== */

var talkOn = (function(){

	var _public   = {};
	var _private  = {};
	var talkParam = {};

	_public.getHolydayInfo = function() {

		_private.objParam = new Object();

		var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
		$.extend(  // 상담시간에 따라 상담챗 or 챗봇 분기
				tranProp
				, {
					url: '/contact/ct/HPCT000S1'		// 트랜잭션 Url
					, tradeKey: 'CONTACT_DATA'				// 트랜잭션 TradeKey
					, params: _private.objParam	// 트랜잭션 Parameter
					, asyncFlag : false
					, success: function (response) {			// Success Callback
						var openPop = null;

						var objCutData = {};

						objCutData = response.outData;

						var talk_tel_yn = bannerTimeCheck(objCutData); // 상담가능 여부

						/* 181015 고객센터 상담톡 챗봇상담 분기  */
						$('[data-dupid=talkOn]').off('click').on('click', function () {
							var strParam = talkOn.init();
							talk_tel_yn = bannerTimeCheck(objCutData); // 상담가능 여부

							if( openPop != null && !openPop.closed ){
								openPop.focus();
								return;
							}
							
							var chatDiv = $(this).attr("data-value");	// 상담톡, 챗봇상담 구분
							if (chatDiv == "01") {
								openPop = window.open('http://pf.kakao.com/_zxjPxexh/chat', '교보 라이프플래닛 챗봇', 'scrollbars=no,toolbar=no,resizable=yes, width=400, height=650, top=300, left=500');
							} else if (chatDiv == "02") {
								openPop = window.open('https://talk.lifeplanet.co.kr/sharedfront/jsp/view/kyobo/jsp/main.jsp' + strParam, '상담톡신청', 'scrollbars=no,toolbar=no,resizable=yes, width=400, height=650, top=300, left=500');
							} else {
								if (talk_tel_yn == "Y"){//상담가능 (상담톡)
									openPop = window.open('https://talk.lifeplanet.co.kr/sharedfront/jsp/view/kyobo/jsp/main.jsp' + strParam, '상담톡신청', 'scrollbars=no,toolbar=no,resizable=yes, width=400, height=650, top=300, left=500');
								}else{
									openPop = window.open('http://pf.kakao.com/_zxjPxexh/chat', '교보 라이프플래닛 챗봇', 'scrollbars=no,toolbar=no,resizable=yes, width=400, height=650, top=300, left=500');
								}
							}
							openPop.focus();
						});

						/* //181015 고객센터 챗봇분기  */

						/* 170209 trigger Event 상담톡 */
						var triggerHtml = '';
							triggerHtml += '<div class="talk_banner">';
							triggerHtml += '	<div class="talk_top">';

							if (talk_tel_yn == "Y"){
								/* 상담가능 (상담톡) */
								triggerHtml += '		<a href="javascript:;" id="talkOnBanner"><img src="/resources/images/common/img_talk.png" alt="상담톡 - 무엇을 도와드릴까요?" /></a>';
							}else{
								/* 상담시간 종료 (챗봇) */
								triggerHtml += '		<a href="javascript:;" id="talkOnBanner"><img src="/resources/images/common/img_chatbot.png" alt="라이프플래닛 상담챗봇입니다" /></a>';
							}

							triggerHtml += '	</div>';
							triggerHtml += '	<div class="talk_bottom">';
							triggerHtml += '		<input id="talkCheckPub" type="checkbox" />';
							triggerHtml += '		<span><label for="talkCheckPub"><img src="/resources/images/common/txt_talk.png" alt="오늘 하루 열지 않음" /></label></span>';
							triggerHtml += '		<button type="button" class="btn_talk_close">닫기</button>';
							triggerHtml += '	</div>';
							triggerHtml += '</div>';

						$("body").append(triggerHtml);

						$("#talkOnBanner").off("click").on("click", function(){
							$(".talk_banner").fadeOut(400);
							var strParam = talkOn.init();
							talk_tel_yn = bannerTimeCheck(objCutData); // 상담가능 여부

							if( openPop != null && !openPop.closed ){
								openPop.focus();
								return;
							}

							if (talk_tel_yn == "Y"){//상담가능 (상담톡)
								openPop = window.open('https://talk.lifeplanet.co.kr/sharedfront/jsp/view/kyobo/jsp/main.jsp' + strParam, '상담톡신청', 'scrollbars=no,toolbar=no,resizable=yes, width=400, height=650, top=300, left=500');
							}else{
								openPop = window.open('http://pf.kakao.com/_zxjPxexh/chat', '교보 라이프플래닛 챗봇', 'scrollbars=no,toolbar=no,resizable=yes, width=400, height=650, top=300, left=500');
							}
							openPop.focus();
						});

						$(".btn_talk_close").off("click").on("click", function(){
							if ( $('#talkCheckPub').is(':checked') ) {
								util.setCookie('BANNER_TALK_ON_N', '1days', { expires : '1'} );
							}
							$(".talk_banner").fadeOut(400);
						});
					}
				}
		);
		transaction.callTran(tranProp);
	};

	_private.getRequest = function () {


		var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);
		tranProp.url        = '/common/cc/TalkLoginCheck';
		tranProp.asyncFlag  = false,
		tranProp.success    = _private.susscessCallBack;
		tranProp.failure    = _private.failureCallback;

		// 트랜잭션 실행
		transaction.callTran(tranProp);
	};

	_private.susscessCallBack = function (data) {
		var rsData = data.outData;
		talkParam.isLogin		 = util.nvl(rsData.isLogin,"");
		talkParam.customerName 	 = util.nvl(rsData.csNm,"");
		talkParam.customerNo	 = util.nvl(rsData.cstNo,"");
		talkParam.customerTel	 = util.nvl(rsData.cstHp,"");
	};


	_private.pageTitle = function () {

		var url		 = location.href;
		var urlPath  = location.href.split('/')[location.href.split('/').length-1].split('.')[0];
		var setTitle = '';

		// 설계페이지
		if ( url.indexOf('/products/pd/') > -1 || url.indexOf('/products/pe/') > -1 || url.indexOf('/bridge/bl/') > -1 || url.indexOf('/products/pf/') > -1) {

			setTitle	= '상품설계_';

			if (urlPath == 'HPPD100S1') 		{ setTitle = '정기보험';
			} else if (urlPath == 'HPPD200S1')  { setTitle = '종신보험';
			} else if (urlPath == 'HPPD300S1')  { setTitle = '연금보험';
			} else if (urlPath == 'HPPD400S1')  { setTitle = '연금저축보험';
			} else if (urlPath == 'HPPD500S1')  { setTitle = '플러스어린이보험';
			} else if (urlPath == 'HPPD600S1')  { setTitle = '에듀케어저축보험';
			} else if (urlPath == 'HPPD700S1')  { setTitle = '저축보험';
			} else if (urlPath == 'HPPD800S1')  { setTitle = '암보험';
			} else if (urlPath == 'HPPD900S1')  { setTitle = '5대성인병보험';
			} else if (urlPath == 'HPPE300S1')  { setTitle = '상해보험';
			} else if (urlPath == 'HPPE400S1')  { setTitle = '자녀사랑정기보험';
			} else if (urlPath == 'HPPE500S1')  { setTitle = '입원비보험';
			} else if (urlPath == 'HPPE600S1')  { setTitle = '수술비보험';
			} else if (urlPath == 'HPBL190S1')  { setTitle = '암보험';
			} else if (urlPath == 'HPPE800S1')  { setTitle = '치아보험';
			} else if (urlPath == 'HPPE900S1')  { setTitle = '미세먼지질병보험';
			} else if (urlPath == 'HPPF100S1')  { setTitle = '여성건강보험';
			} else if (urlPath == 'HPPF200S1')  { setTitle = '뇌·심장보험';
			}

		// 청약페이지
		} else if ( url.indexOf('/products/pa/') > -1 ) {

			var spb_data	= globalVar.getParam('spb_data') || '';
			var goodCd 		= spb_data.spb_goodCd || '';
			goodCd			= util.subStrL(goodCd, 5, '');

			setTitle		= '청약_';

			if ( goodCd == '10001' ) 		{ setTitle += '정기보험';
			} else if ( goodCd == '10002' ) { setTitle += '종신보험';
			} else if ( goodCd == '10003' || goodCd == '10048') { setTitle += '연금보험';
			} else if ( goodCd == '10004' || goodCd == '10047') { setTitle += '연금저축보험';
			} else if ( goodCd == '10007' ) { setTitle += '플러스어린이보험';
			} else if ( goodCd == '10008' ) { setTitle += '에듀케어저축보험';
			} else if ( goodCd == '10010' ) { setTitle += '저축보험';
			} else if ( goodCd == '10011' ) { setTitle += '암보험';
			} else if ( goodCd == '10012' ) { setTitle += '5대성인병보험';
			} else if ( goodCd == '10017' ) { setTitle += '상해보험';
			} else if ( goodCd == '10023' ) { setTitle += '자녀사랑정기보험';
			} else if ( goodCd == '10028' ) { setTitle += '입원비보험';
			} else if ( goodCd == '10029' ) { setTitle += '수술비보험';
			} else if ( goodCd == '10043' ) { setTitle += '치아보험';
			} else if ( goodCd == '10041' ) { setTitle += '미세먼지질병보험';
			} else if ( goodCd == '10049' ) { setTitle += '여성건강보험';
			} else if ( goodCd == '10052' ) { setTitle += '뇌·심장보험';
			}

		} else {
			setTitle = $('title').text().replace(/\s/g, '');
		}

		return setTitle;

	};

	_private.getStrParam = function () {

		talkParam.pageName	 = _private.pageTitle(_private.getRequest());

		var strReturn	 = '?';
		strReturn  		+= 'customerName='	+ util.nvl(encodeURIComponent(talkParam.customerName),"");
		strReturn  		+= '&customerNo='	+ util.nvl(talkParam.customerNo,"");
		strReturn  		+= '&customerTel='	+ util.nvl(talkParam.customerTel,"");
		strReturn  		+= '&pageName='		+ encodeURIComponent(talkParam.pageName);
		strReturn  		+= '&inChannelId='	+ 'CHNL0000000001';

		_private.resetOption();

		return strReturn;

	};

	_private.resetOption = function () {
		talkParam  = {
				customerName	: '',
				customerNo		: '',
				customerTel		: '',
				pageName		: ''
		};
	};

	_public.init = function () {
		return _private.getStrParam();
	};

	return _public;

})();

function bannerTimeCheck(objCutData){

	//상담시간에 따른 제어
	var server_time = new Date();
	var hour = server_time.getHours();

	// 평일 상담시작 시간
	var chat_open = objCutData.contactData.chat_open;
	// 평일 상담종료 시간
	var chat_close = objCutData.contactData.chat_close;
	// 주말 상담시작 시간
	var chat_open_holi = objCutData.contactData.chat_open_holi;
	// 평일 상담종료 시간
	var chat_close_holi = objCutData.contactData.chat_close_holi;

	// 평일: 0, 토요일 : 3, 공휴일 : 2
	var holi_type = objCutData.holi.hldycd;

	var fn_talk_tel_yn = "N";  // 상담시간 여부

	if(util.Number(holi_type) == 0){
		if(hour >= chat_open && hour < chat_close){
			fn_talk_tel_yn = "Y";
		}
	}else if(util.Number(holi_type) == 3){
		if(hour >= chat_open_holi && hour < chat_close_holi){
			fn_talk_tel_yn = "Y";
		}
	}
	return fn_talk_tel_yn;
}

function triggerShow(){
	//$(".talk_banner").fadeIn(1000);
	$(".talk_banner").css({
		right:"-200px"
	}).show();
	$(".talk_banner").animate({
		right: "20px"
	},800,"easeOutBack");//easeOutElastic
};


function bannerCheck(){

	if (util.getCookie('BANNER_TALK_ON') != '' ) {//기존 쿠기 삭제
		util.setCookie('BANNER_TALK_ON', '1days', { expires : -1} );
	}
	
	if (util.getCookie('BANNER_TALK_ON_N') != '' ) {
		return false;
	};
	//현재화면ID
	var curId 		= location.href.split('/')[location.href.split('/').length-1].split('.')[0];
	var isCurIdPop	= curId.substring(curId.length-2).indexOf('P') > -1;

	if ( location.href.indexOf("/contact/") > -1 && !isCurIdPop ) {				// 고객센터?
		setTimeout(triggerShow,20000);
	} else if ( location.href.indexOf("/mypage/mf/HPMF") > -1 ){					// 마이페이지 증명서 상담톡 x
		$(".talk_banner").remove();
	} else if ( location.href.indexOf("/mypage/") > -1 && isCurIdPop ){			// 마이페이지 && 팝업 O 상담톡 X

	} else if ( location.href.indexOf("/login/HPGA01P0") > -1 && isCurIdPop ){	// 로그인 팝업 상담톡 X

	} else if ( location.href.indexOf("/print/issuer") > -1 ) {					// 프린트 팝업 상담톡 X

	} else if ( location.href.indexOf("/mypage/") > -1 && !isCurIdPop ){		// 마이페이지 && 팝업 X
		setTimeout(triggerShow,20000);
	} else if ( location.href.indexOf("/products/pa/") > -1 && !isCurIdPop ){	// 청약
		setTimeout(triggerShow,60000);
	} else if (  !isCurIdPop && 												// 설계페이지, 메인페이지 처리
				( location.href.indexOf("/products/pd/") > -1
					|| location.href.indexOf("/products/pe/HPPE300S1") > -1
					|| location.href.indexOf("/products/pe/HPPE400S1") > -1
					|| location.href.indexOf("/common/ce/HPCE010S1") > -1
					|| location.href.indexOf("/startmain/main") > -1
			    )
		    ) {
		if(curId == "HPCE010S1" || curId == "main" ){
			// 190212 삭제
			setTimeout(triggerShow,10000);
			return false;
		}
		setTimeout(triggerShow,10000);
	} else if ( isCurIdPop ) {

	} else if (
				location.href.indexOf("/bridge/bl/HPBL150S1") > -1		// 정기vs종신 브릿지 페이지 X
				|| location.href.indexOf("/bridge/bl/HPBL160S1") > -1 	// 연금저축 페이지 X
				|| location.href.indexOf("/bridge/bl/HPBL170S1") > -1 	// 건강체 캠페인 이벤트 페이지 X
				|| location.href.indexOf("/bridge/bl/HPBL180S1") > -1 	// 저축 랜딩 페이지 X
				|| location.href.indexOf("/bridge/bl/HPBL190S1") > -1 	// 암보험 랜딩 페이지 X
				|| location.href.indexOf("/bridge/bl/HPBL230S1") > -1 	// 저축 랜딩(고액가입) 페이지 X
			) {

	} else {
		setTimeout(triggerShow,20000);
	}
};



$(document).ready(function () {
	talkOn.getHolydayInfo();
	bannerCheck();
});