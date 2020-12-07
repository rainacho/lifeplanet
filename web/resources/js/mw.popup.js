/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * FILE INFO   : mw.ppup.js, /resources/js/
 * ========================================================================== */

$(function(){

	// 상품안내하단 > [단체 할인 혜택]
	$(document).on ('click',"#btn_hppc058p1", function(){
		var option = {url : '/products/pc/HPPC058P1'};
		PageUtil.openPopup(option);
		return false;

	});

	// 어떤상품인가요? > [가입시 유의사항]
	$(document).on ('click', '#btn_hppc190p1', function(){
		var option = {url : '/products/pc/HPPC190P1'};
			PageUtil.openPopup(option);
			return false;
	});

	// 무엇을 보장해주나요? > 가입내용 > [제도성 특약]
	$(document).on ('click', 'a[id^=btn_hppc160p1]', function(){
		var url = '/products/pc/HPPC160P1';
		var option = {url : url};
		PageUtil.openPopup(option);
		return false;
	});

	// 무엇을 보장해주나요? > 보장내용 > [약관/상품설명서]
	$(document).on ('click', 'a[id^=btn_hpda01p1]', function(){
		var popSize 		= new Object();
			popSize.width 	= 640;
			popSize.height 	= 630;

		var paramObj			= new Object();
		var prdCd 	= "1000101";
		var prdScCd = "11";

		switch ($(this).prop("id")) {
			case  "btn_hpda01p1_11" :
					prdCd 	= "1000101";
					prdScCd = "11";
				   break;
			case  "btn_hpda01p1_11A" :
					prdCd 	= "1002301";
					prdScCd = "11";
				   break;
			case  "btn_hpda01p1_12" :
					prdCd 	= "1000201";
					prdScCd = "12";
					break;
			case  "btn_hpda01p1_21" :
					prdCd 	= "1004801";
					prdScCd = "21";
					break;
			case  "btn_hpda01p1_31" :
					prdCd 	= "1004701";
					prdScCd = "31";
					break;
			case  "btn_hpda01p1_33" :
					prdCd 	= "1005001";
					prdScCd = "33";
					break;
			case  "btn_hpda01p1_42A" :
					prdCd 	= "1000701";
					prdScCd = "42";
					break;
			case  "btn_hpda01p1_42B" :
					prdCd 	= "1001301";
					prdScCd = "42";
					break;
			case  "btn_hpda01p1_32" :
					prdCd 	= "1000801";
					prdScCd = "32";
					break;
			case  "btn_hpda01p1_32B" :
				prdCd 	= "1001402";
				prdScCd = "32";
				break;
			case  "btn_hpda01p1_43" :
				prdCd 	= "1001107";
				prdScCd = "43";
				break;
			case  "btn_hpda01p1_43B" :
				prdCd 	= "1001517";
				prdScCd = "43";
				break;
			case  "btn_hpda01p1_43N" :
				prdCd 	= "1003701";
				prdScCd = "43";
				break;
			case  "btn_hpda01p1_44" :
				prdCd 	= "1001201";
				prdScCd = "44";
				break;
			case  "btn_hpda01p1_45" :
				prdCd 	= "1004301";
				prdScCd = "45";
				break;	
			case  "btn_hpda01p1_61" :
				prdCd 	= "1001701";
				prdScCd = "61";
				break;
			case  "btn_hpda01p1_33B" :
				prdCd 	= "1003301";
				prdScCd = "33";
				break;
			case  "btn_hpda01p1_21B" :
				// 방카 연금보험 2로변경
				prdCd 	= "1004401";
				prdScCd = "21";
				break;
			case  "btn_hpda01p1_31B" :
				prdCd 	= "1004601";
				prdScCd = "31";
				break;
			case  "btn_hpda01p1_71" :
				prdCd 	= "1002801";
				prdScCd = "71";
				break;
			case  "btn_hpda01p1_81" :
				prdCd 	= "1002901";
				prdScCd = "81";
				break;
			case  "btn_hpda01p1_33DB" :
				prdCd 	= "1003101";
				prdScCd = "33";
				break;
			case  "btn_hpda01p1_11DB" :
				prdCd 	= "1003201";
				prdScCd = "11";
				break;
			case  "btn_hpda01p1_10036" :
				prdCd   = "1003601";
				prdScCd = "43";
				break;
			
			case  "btn_hpda01p1_10040" :
				prdCd   = "1004001";
				prdScCd = "43";
				break;
			case  "btn_hpda01p1_10041" :
				prdCd 	= "1004101";
				prdScCd = "45";
				break;	
			case  "btn_hpda01p1_10049" :
				prdCd 	= "1004901";
				prdScCd = "45";
				break;	
			case  "btn_hpda01p1_10045" :
				prdCd 	= "1004501";
				prdScCd = "45";
				break;				
			case  "btn_hpda01p1_10052" :
				prdCd 	= "1005201";
				prdScCd = "45";
				break;
			default : break;
		}

		paramObj.listRow	= "detail";
		paramObj.prdCd1		= prdCd;
		paramObj.prdScCd1	= prdScCd;
		util.wPopPage("/disclosure/good/HPDA01P1", popSize, paramObj);
		return false;
	});

	// 이벤트 > 교보문고 eBook 이벤트
	$(document).on ('click',"#btn_hpev100p1", function(){
		var option = {url : '/event/ev/HPEV100P1'};
		PageUtil.openPopup(option);
		return false;
	});

	// 퀵메뉴(상품안내) 보험용어사전
	$("a[id^=btn_hppa01p2]").bind("click", function(){
		var popSize 	= new Object();
		popSize.width 	= 700;
		popSize.height 	= 670;
		util.wPopPage("/products/common/HPPA01P2", popSize);

	});

	// 퀵메뉴(상품안내,청약),간편보험료,한도초과 페이지에서 띄우는
	// 전화상담 팝업
	$("a[id^=btn_hpct103p1]").bind("click", function(){
		var startDate = 20201008;
		var endDate =20201009;
		
		// 테스트서버는 노출되도록 수정
		if(location.href.indexOf('hpt')>-1){
			startDate = parseInt(util.getDate());
		}
		
		if( parseInt(util.getDate()) >= startDate && parseInt(util.getDate()) <= endDate ){
			alert("라이프플래닛 서버교체작업으로 상담예약접수가 어렵습니다.\n(2020.10.08(목)~ 2020.10.10(토))");
		}else{
			var option = {url : "/contact/ct/HPCT103P1.dev"};
		
			PageUtil.openPopup(option);
			return false;
		}

	});

	var councelGbn = "";
	// 퀵메뉴(상품안내,청약), 채팅상담 팝업
	$("a[id^=btn_hpct115s1], a[id^=btnHPCC41P1], #cal1btnHPCC41P1, #cal2btnHPCC41P1").bind("click", function(){
		MWPOPUP.counselTime();
		councelGbn = "chat";
	});

	// 퀵메뉴(상품안내,청약) 원격상담 팝업
	$("a[id^=btn_hpct120p1]").bind("click", function(){
		MWPOPUP.counselTime();
		councelGbn = "control";
	});

	// 장애인 전용보험 전환특약신청 안내팝업
	$("#btn_hpmu101p1").bind("click", function(){
		var option = {
				id 		 : 'popupwrap',
				type 	 : 'modal',
				location : 'external',
				content  : 'content1',
				width	 : 510,
				height	 : 670,
				url : '/mypage/mu/HPMU101P1',
				layerClass : 'HPMU101P1'
		};

		PageUtil.openPopup(option);
	});

	//전화상담//간편가입예약 클릭 시 (가입설계 화면에서 호출 시 로그인페이지 없음..)
//	$("#btnHPCT103P1").bind("click", function(){
	$("a[id^=btnHPCT103P1], #cal1btnHPCT103P1, #cal2btnHPCT103P1").bind("click", function(){

		/**  설계페이지에서 전화상담 팝업 클릭시 웹로그 적용 시작 */
		var urlPath = location.href;
		if ( (urlPath.indexOf('/products/pd/') > -1) || (urlPath.indexOf('/products/pe/') > -1) || (urlPath.indexOf('/bridge/bl/') > -1)) {
			var planId = location.href.split('/')[(location.href.split('/').length-1)].split('.')[0];
			var planGoodCd;
			switch (planId) {
				case 'HPPD100S1' : planGoodCd = '10001'; break;
				case 'HPPD200S1' : planGoodCd = '10002'; break;
				case 'HPPD300S1' : planGoodCd = '10048'; break;
				case 'HPPD400S1' : planGoodCd = '10047'; break;
				case 'HPPD500S1' : planGoodCd = '10007'; break;
				case 'HPPD600S1' : planGoodCd = '10008'; break;
				case 'HPPD700S1' : planGoodCd = '10050'; break;
				case 'HPPD800S1' : planGoodCd = '10011'; break;
				case 'HPPD900S1' : planGoodCd = '10012'; break;
				case 'HPPE300S1' : planGoodCd = '10017'; break;
				case 'HPPE400S1' : planGoodCd = '10023'; break;
				case 'HPPE500S1' : planGoodCd = '10028'; break;
				case 'HPPE600S1' : planGoodCd = '10029'; break;
				case 'HPBL115S1' : planGoodCd = '10023'; break;
				case 'HPBL150S1' : planGoodCd = '10001'; break;
				case 'HPBL160S1' : planGoodCd = '10004'; break;
				case 'HPBL180S1' : planGoodCd = '10050'; break;
				case 'HPBL190S1' : planGoodCd = '10011'; break;
				case 'HPBL230S1' : planGoodCd = '10050'; break;
				case 'HPPE700S1' : planGoodCd = '10037'; break;
				case 'HPPE800S1' : planGoodCd = '10043'; break;
				case 'HPPE900S1' : planGoodCd = '10041'; break;
				case 'HPPF100S1' : planGoodCd = '10049'; break;
				case 'HPPF200S1' : planGoodCd = '10052'; break;
				default : break;
			}
			// 웹로그
			webLog.runGAQ('전화상담가입하기', '버튼클릭', planGoodCd);
		}
		/**  설계페이지에서 전화상담 팝업 클릭시 웹로그 적용 끝 */

		var key = $(this).attr('data-key');
		var paramObj = {};
		if(key != "N"){
			paramObj.isWrite = "Y";
		}

		var option = {
				type : "modal",
				id : 'detailView',
				location : 'external',
				content : 'content1',
				url : "/contact/ct/HPCT103P1.dev",
				width: 750,
				height: 785
			};

		PageUtil.openPopup(option, paramObj);
	});

	//상품영역 보험용어 클릭 시 보험용어사전 팝업 호출 함수
	$(document).on ('click','.clickDicPop', function(){

		var searchVal = $(this).data("name");

		var src="/products/common/HPPA01P2";
		var paramObj = new Object();
			paramObj.qrySect = 2;
			paramObj.chkSect = 1;
			paramObj.searchVal = searchVal;

		util.wPopPage(src,'',paramObj);

	});

	// 묶음가입 이용방법안내 팝업(메인, 상품10종, 내설계함에서 호출. 20160901)
	$(document).on("click","[data-popid=multiContPop]",function(){
		window.open('/products/pc/HPPC601P1.dev', 'multiContPop', 'location=no,scrollbars=yes,menubar=no,toolbar=no,resizable=yes, width=670, height=650, top=0, left=0');
	});

	// 연금,연금저축,어린이저축 ‘저축성 보험 추가납입제도’ 란?
	$(document).on("click","[data-popid=btn_HPPD301P1]",function(){
		/** 저축성 보험 추가납입제도 팝업 시작 */
		var urlPath = location.href;
		var planGoodCd;
		if ( (urlPath.indexOf('/products/pd/') > -1) || (urlPath.indexOf('/products/pe/') > -1) || (urlPath.indexOf('/bridge/bb/') > -1) || (urlPath.indexOf('/bridge/bl/') > -1) ) {
			var planId = location.href.split('/')[(location.href.split('/').length-1)].split('.')[0];
			if (planId == 'HPPD300S1'|| planId == 'HPBB515S1'|| planId == 'HPBB565S1'|| planId == 'HPBB720S1'){
				//연금보험
				planGoodCd = '10048';
			}else if (planId == 'HPPD400S1'|| planId == 'HPBB510S1'|| planId == 'HPBB560S1'|| planId == 'HPBL160S1'){
				//연금저축보험
				planGoodCd = '10047';
			}else if (planId == 'HPPD600S1'){
				//어린이저축보험
				planGoodCd = '10008';
			}else{
				planGoodCd = 'default';
			}
		}
		/**  저축성 보험 추가납입제도 팝업 끝 */
		var option = {
				id 		 : 'popupwrap',
				type 	 : 'modal',
				location : 'external',
				content  : 'content1',
				width	 : 720,
				height	 : 650,
				url : '/products/pd/HPPD301P1'
		}
		, key = planGoodCd || '';
		PageUtil.openPopup(option , { key : key });
	});

	// 저축보험2 추가납입제도 팝업
	$(document).on("click","[data-popid=btn_HPPD302P1]",function(){
		var option = {
				id 		 : 'popupwrap',
				type 	 : 'modal',
				location : 'external',
				content  : 'content1',
				width	 : 720,
				height	 : 650,
				url : '/products/pd/HPPD302P1'
		};

		PageUtil.openPopup(option);
	});

	// 연금저축보험 광고영상보기
	$(document).on ('click', '#btn_hppd400p1', function(){
		var option = {
				id 		 : 'popupwrap',
				type 	 : 'modal',
				location : 'external',
				content  : 'content1',
				width	 : 700,
				height	 : 615,
				layerClass : 'HPPD400P1',
				url : '/products/pd/HPPD400P1'
			};
			PageUtil.openPopup(option);
			return false;
	});

	MWPOPUP = {

			objCutData : new Object,			// 커스텀한 Data

			counselTime : function(){
				var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
				tranProp.url        = '/contact/ct/HPCT000S1';           		// 트랜잭션 Url
				tranProp.tradeKey   = 'CONTACT_DATA';       						// 트랜잭션 TradeKey
				tranProp.success    = MWPOPUP.ajaxCallBackContactData;  			// Success Callback
				tranProp.failure    = MWPOPUP.failureCallbackSearch;  		// Failure Callback

				// 트랜잭션 실행
				transaction.callTran(tranProp);
			},

			/**
			 * AJAX 성공 CALLBACK  - 상담시간 관련
			 */
			ajaxCallBackContactData : function(response){

				//alert("상담시간 가져오기 시작!!!!");

				objCutData = {};

				MWPOPUP.objCutData = response.outData;

				//alert(MWPOPUP.objCutData);

				//상담시간에 따른 제어
				var server_time = util.getDateTime();
				var hour = server_time.substring(8,10);
				var min	 = server_time.substring(10,12);

				var chat_open = MWPOPUP.objCutData.contactData.chat_open;
				var chat_close = MWPOPUP.objCutData.contactData.chat_close;
				var chat_open_holi = MWPOPUP.objCutData.contactData.chat_open_holi;
				var chat_close_holi = MWPOPUP.objCutData.contactData.chat_close_holi;

				var remote_open = MWPOPUP.objCutData.contactData.remote_open;
				var remote_close = MWPOPUP.objCutData.contactData.remote_close;
				var remote_open_holi = MWPOPUP.objCutData.contactData.remote_open_holi;
				var remote_close_holi = MWPOPUP.objCutData.contactData.remote_close_holi;

				//holi_type 0: 평일, 1:일요일, 2:공휴일, 3:토요일
				var holi_type = MWPOPUP.objCutData.holi.hldycd;

				if(holi_type =='0'){ //평일

					//채팅상담
					if(councelGbn == "chat"){

						if (hour >= chat_open && hour < chat_close){//상담가능
							MWPOPUP.goodTimePop('chat');
						}else{
							MWPOPUP.badTimePop('chat');
						}
					//원격상담
					}else if(councelGbn == "control"){

						if (hour >= remote_open && hour < remote_close){//상담가능
							MWPOPUP.goodTimePop('control');
						}else{
							MWPOPUP.badTimePop('control');
						}
					}


				}else if (holi_type =='3'){ //토요일

					//채팅상담
					if(councelGbn == "chat"){

						if (hour >= chat_open_holi && hour < chat_close_holi){//상담가능
							MWPOPUP.goodTimePop('chat');
						}else{
							MWPOPUP.badTimePop('chat');
						}

					//원격상담
					}else if(councelGbn == "control"){

						if (hour >= remote_open_holi && hour < remote_close_holi){//상담가능
							MWPOPUP.goodTimePop('control');
						}else{
							MWPOPUP.badTimePop('control');
						}
					}

				}else{
					if(councelGbn == "chat"){
						MWPOPUP.badTimePop('chat');
					}else if(councelGbn == "control"){
						MWPOPUP.badTimePop('control');
					}
				}

			},

			/**
			 * AJAX 실패 Callback
			 */
			failureCallbackSearch : function(data) {

			},

			goodTimePop : function(gbn){
				if(gbn == "chat"){
					//var src="/contact/ct/HPCT115S1";//TO_BE 쿼크모드때문에 오류나는 부분이 있어서 임시로 AS-IS로 돌림
					var src="/contact/cnsl/HPCC41P1";
					var paramObj = new Object();
					var objPopOption = new Object();

					//objPopOption.width		=	"435";
					//objPopOption.height		= 	"485";
					//objPopOption.scrollbars = 	"no";

					util.wPopPage(src,objPopOption,paramObj);
				}else{
					window.open('http://help.lifeplanet.co.kr','원격상담지원', 'scrollbars=no,toolbar=no,location=yes,resizable=yes, width=450, height=523, top=300, left=500');
				}
			},

			badTimePop : function(gbn){
				var msg = "";
				if(gbn == "chat"){
					msg = "죄송합니다. 지금은 채팅상담시간이 아닙니다.\n";
					msg += "채팅상담시간은 평일 오전 9시 ~ 오후 6시,\n";
					msg += "토요일 오전 10시 ~ 오후 3시 입니다.";
				}else if(gbn == "control"){
					msg = "죄송합니다. 지금은 원격상담시간이 아닙니다.\n";
					msg += "원격상담시간은 평일 오전 9시 ~ 오후 8시,\n";
					msg += "토요일 오전 10시 ~ 오후 3시 입니다.";
				}
				alert(msg);
				return false;
			}

	};
});
/**
 * 해지환급금 팝업
 * */
this.Refund = (function (global, $) {
	var _public = {}
	, _private = {};

	_private.options = {
  		  'width'			: '750'
		, 'height'			: '650'
		, 'schoolEx'		: {}
		, 'prodInfo5sec' 	: new Map ()
		, 'banc'			: new Map ()
	};

	// 필요 데이터 초기화

	// 초등학교
	_private.options.schoolEx[ '0101' ] = {'str' : 7,  'end' : 12 };
	// 중학교
	_private.options.schoolEx[ '0102' ] = {'str' : 13, 'end' : 15 };
	// 고등학교
	_private.options.schoolEx[ '0103' ] = {'str' : 16, 'end' : 18 };
	// 대등학교
	_private.options.schoolEx[ '0104' ] = {'str' : 19, 'end' : 22 };
	// 유학
	_private.options.schoolEx[ '0105' ] = {'str' : 19, 'end' : 22 };
	// 사회진출
	_private.options.schoolEx[ '0106' ] = {'str' : 25, 'end' : 25 };

	//정기보험 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1000101", {"intyScCd":"01", "intyCd":3010001, "prodNm":"정기보험(순수보장형,표준체)"});
	_private.options.prodInfo5sec.put("1000111", {"intyScCd":"01", "intyCd":3010011, "prodNm":"정기보험(만기50%환급형,표준체)"});
	_private.options.prodInfo5sec.put("1000121", {"intyScCd":"01", "intyCd":3010021, "prodNm":"정기보험(만기100%환급형,표준체)"});

	_private.options.prodInfo5sec.put("1000102", {"intyScCd":"01", "intyCd":3010002, "prodNm":"정기보험(순수보장형,비흡연체)"});
	_private.options.prodInfo5sec.put("1000112", {"intyScCd":"01", "intyCd":3010012, "prodNm":"정기보험(만기50%환급형,비흡연체)"});
	_private.options.prodInfo5sec.put("1000122", {"intyScCd":"01", "intyCd":3010022, "prodNm":"정기보험(만기100%환급형,비흡연체)"});

	_private.options.prodInfo5sec.put("1000123", {"intyScCd":"01", "intyCd":3010097, "prodNm":"정기보험(순수보장형,건강체)"});
	_private.options.prodInfo5sec.put("1000125", {"intyScCd":"01", "intyCd":3010099, "prodNm":"정기보험(만기50%환급형,건강체)"});
	_private.options.prodInfo5sec.put("1000127", {"intyScCd":"01", "intyCd":3010101, "prodNm":"정기보험(만기100%환급형,건강체)"});

	_private.options.prodInfo5sec.put("1000124", {"intyScCd":"01", "intyCd":3010098, "prodNm":"정기보험(순수보장형,슈퍼건강체)"});
	_private.options.prodInfo5sec.put("1000126", {"intyScCd":"01", "intyCd":3010100, "prodNm":"정기보험(만기50%환급형,슈퍼건강체)"});
	_private.options.prodInfo5sec.put("1000128", {"intyScCd":"01", "intyCd":3010102, "prodNm":"정기보험(만기100%환급형,슈퍼건강체)"});



	//종신보험 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1000201", {"intyScCd":"01", "intyCd":3010023, "prodNm":"종신보험(체감형)_표준체"});
	_private.options.prodInfo5sec.put("1000202", {"intyScCd":"01", "intyCd":3010061, "prodNm":"종신보험(일반형)_표준체"});
	_private.options.prodInfo5sec.put("1000203", {"intyScCd":"01", "intyCd":3010066, "prodNm":"종신보험(체감형)_비흡연체"});
	_private.options.prodInfo5sec.put("1000204", {"intyScCd":"01", "intyCd":3010067, "prodNm":"종신보험(일반형)_비흡연체"});
	_private.options.prodInfo5sec.put("1000205", {"intyScCd":"01", "intyCd":3010136, "prodNm":"종신보험(체감형)_건강체"});
	_private.options.prodInfo5sec.put("1000206", {"intyScCd":"01", "intyCd":3010137, "prodNm":"종신보험(일반형)_건강체"});

	//연금,연금저축,꿈꾸는저축 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1000301", {"intyScCd":"01", "intyCd":3010024, "prodNm":"일반연금보험"});
	_private.options.prodInfo5sec.put("1000401", {"intyScCd":"01", "intyCd":3010025, "prodNm":"연금저축보험"});
	_private.options.prodInfo5sec.put("1004801", {"intyScCd":"01", "intyCd":3010182, "prodNm":"일반연금보험"});
	_private.options.prodInfo5sec.put("1004701", {"intyScCd":"01", "intyCd":3010181, "prodNm":"연금저축보험"});
	_private.options.prodInfo5sec.put("1001001", {"intyScCd":"01", "intyCd":3010069, "prodNm":"꿈꾸는저축보험"});
	_private.options.prodInfo5sec.put("1002501", {"intyScCd":"01", "intyCd":3010133, "prodNm":"꿈꾸는저축보험Ⅱ"});
	_private.options.prodInfo5sec.put("1005001", {"intyScCd":"01", "intyCd":3010186, "prodNm":"1년부터e저축보험"});	

	//어린이플러스(태아)
	_private.options.prodInfo5sec.put("1000701", {"intyScCd":"01", "intyCd":3010062, "prodNm":"플러스어린이보험(출생전,순수보장형)"});
	_private.options.prodInfo5sec.put("1000702", {"intyScCd":"01", "intyCd":3010063, "prodNm":"플러스어린이보험(출생전,50%환급형)"});
	_private.options.prodInfo5sec.put("1000703", {"intyScCd":"01", "intyCd":3010064, "prodNm":"플러스어린이보험(출생전,100%환급형)"});

	//어린이플러스(어린이)
	_private.options.prodInfo5sec.put("1000704", {"intyScCd":"01", "intyCd":3010062, "prodNm":"플러스어린이보험(출생후,순수보장형)"});
	_private.options.prodInfo5sec.put("1000705", {"intyScCd":"01", "intyCd":3010063, "prodNm":"플러스어린이보험(출생후,50%환급형)"});
	_private.options.prodInfo5sec.put("1000706", {"intyScCd":"01", "intyCd":3010064, "prodNm":"플러스어린이보험(출생후,100%환급형)"});

	//에듀케어
	_private.options.prodInfo5sec.put("1000801", {"intyScCd":"01", "intyCd":3010065, "prodNm":"어린이저축성보험"});

	// 암보험
	// 조건별 상품코드 정보
	_private.options.prodInfo5sec.put('1001101', {'intyScCd': '01', 'intyCd': 3010070, 'prodNm': '암보험(순수보장형)_표준체'});
	_private.options.prodInfo5sec.put('1001102', {'intyScCd': '01', 'intyCd': 3010071, 'prodNm': '암보험(순수보장형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001103', {'intyScCd': '01', 'intyCd': 3010072, 'prodNm': '암보험(만기50%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001104', {'intyScCd': '01', 'intyCd': 3010073, 'prodNm': '암보험(만기50%환급형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001105', {'intyScCd': '01', 'intyCd': 3010074, 'prodNm': '암보험(만기100%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001106', {'intyScCd': '01', 'intyCd': 3010075, 'prodNm': '암보험(만기100%환급형)_비흡연체'});

	_private.options.prodInfo5sec.put('1001107', {'intyScCd': '01', 'intyCd': 3010119, 'prodNm': '암보험Ⅲ(순수보장형)_표준체'});
	_private.options.prodInfo5sec.put('1001108', {'intyScCd': '01', 'intyCd': 3010120, 'prodNm': '암보험Ⅲ(순수보장형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001109', {'intyScCd': '01', 'intyCd': 3010121, 'prodNm': '암보험Ⅲ(만기50%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001110', {'intyScCd': '01', 'intyCd': 3010122, 'prodNm': '암보험Ⅲ(만기50%환급형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001111', {'intyScCd': '01', 'intyCd': 3010123, 'prodNm': '암보험Ⅲ(만기100%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001112', {'intyScCd': '01', 'intyCd': 3010124, 'prodNm': '암보험Ⅲ(만기100%환급형)_비흡연체'});

	// 100세까지비갱신암보험
	_private.options.prodInfo5sec.put('1003701', {'intyScCd': '01', 'intyCd': 3010164, 'prodNm': '무해지암보험(순수보장형)_표준체'});
	_private.options.prodInfo5sec.put('1003702', {'intyScCd': '01', 'intyCd': 3010165, 'prodNm': '무해지암보험(순수보장형)_비흡연체'});

	// 5대 성인병
	// 조건별 상품코드 정보
	_private.options.prodInfo5sec.put('1001201', {'intyScCd': '01', 'intyCd': 3010076, 'prodNm': '5대성인병보험(순수보장형)_표준체'});
	_private.options.prodInfo5sec.put('1001202', {'intyScCd': '01', 'intyCd': 3010077, 'prodNm': '5대성인병보험(순수보장형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001203', {'intyScCd': '01', 'intyCd': 3010078, 'prodNm': '5대성인병보험(만기50%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001204', {'intyScCd': '01', 'intyCd': 3010079, 'prodNm': '5대성인병보험(만기50%환급형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001205', {'intyScCd': '01', 'intyCd': 3010080, 'prodNm': '5대성인병보험(만기100%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001206', {'intyScCd': '01', 'intyCd': 3010081, 'prodNm': '5대성인병보험(만기100%환급형)_비흡연체'});

	//상해보험
	_private.options.prodInfo5sec.put("1001701", {"intyScCd": "01", "intyCd": 3010103, "prodNm":"상해보험(비위험)"});
	_private.options.prodInfo5sec.put("1001702", {"intyScCd": "01", "intyCd": 3010104, "prodNm":"상해보험(중위험)"});
	_private.options.prodInfo5sec.put("1001703", {"intyScCd": "01", "intyCd": 3010105, "prodNm":"상해보험(고위험)"});


	//자녀사랑정기보험 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1002301", {"intyScCd":"01", "intyCd":3010110, "prodNm":"자녀사랑정기보험(기본형,표준체)"});
	_private.options.prodInfo5sec.put("1002302", {"intyScCd":"01", "intyCd":3010111, "prodNm":"자녀사랑정기보험(기본형,흡연체)"});
	_private.options.prodInfo5sec.put("1002303", {"intyScCd":"01", "intyCd":3010112, "prodNm":"자녀사랑정기보험(기본형,건강체)"});
	_private.options.prodInfo5sec.put("1002304", {"intyScCd":"01", "intyCd":3010113, "prodNm":"자녀사랑정기보험(기본형,슈퍼건강체)"});

	_private.options.prodInfo5sec.put("1002305", {"intyScCd":"01", "intyCd":3010114, "prodNm":"자녀사랑정기보험(페이백형,표준체)"});
	_private.options.prodInfo5sec.put("1002306", {"intyScCd":"01", "intyCd":3010115, "prodNm":"자녀사랑정기보험(페이백형,흡연체)"});
	_private.options.prodInfo5sec.put("1002307", {"intyScCd":"01", "intyCd":3010116, "prodNm":"자녀사랑정기보험(페이백형,건강체)"});
	_private.options.prodInfo5sec.put("1002308", {"intyScCd":"01", "intyCd":3010117, "prodNm":"자녀사랑정기보험(페이백형,슈퍼건강체)"});


	// 입원비보험
	_private.options.prodInfo5sec.put("1002801", {"intyScCd":"01", "intyCd":3010139, "prodNm":"입원비보험(순수보장형)"});
	_private.options.prodInfo5sec.put("1002802", {"intyScCd":"01", "intyCd":3010140, "prodNm":"입원비보험(만기50%환급형)"});
	_private.options.prodInfo5sec.put("1002803", {"intyScCd":"01", "intyCd":3010141, "prodNm":"입원비보험(만기100%환급형)"});

	// 수술비보험
	_private.options.prodInfo5sec.put("1002901", {"intyScCd":"01", "intyCd":3010142, "prodNm":"수술비보험(순수보장형)"});
	_private.options.prodInfo5sec.put("1002902", {"intyScCd":"01", "intyCd":3010143, "prodNm":"수술비보험(만기50%환급형)"});
	_private.options.prodInfo5sec.put("1002903", {"intyScCd":"01", "intyCd":3010144, "prodNm":"수술비보험(만기100%환급형)"});

	// 만원부터m저축보험
	_private.options.prodInfo5sec.put("1003101", {"intyScCd":"01", "intyCd":3010146, "prodNm":"만원부터m저축보험"});

	// 펫보험
	_private.options.prodInfo5sec.put("1003201", {"intyScCd":"01", "intyCd":3010147, "prodNm":"펫사랑m정기보험(1종)"});
	
	// 건강치아보험
	_private.options.prodInfo5sec.put("1004301", {"intyScCd":"01", "intyCd":3010173, "prodNm":"e건강치아보험(순수보장형)"});

	// 미세먼지질병보험
	_private.options.prodInfo5sec.put("1004101", {"intyScCd":"01", "intyCd":3010168, "prodNm":"e미세먼지질병보험(순수보장형)"});
	
	// 여성건강보험
	_private.options.prodInfo5sec.put("1004901", {"intyScCd":"01", "intyCd":3010183, "prodNm":"여성건강보험(표준체,순수보장형)"});
	_private.options.prodInfo5sec.put("1004902", {"intyScCd":"01", "intyCd":3010184, "prodNm":"여성건강보험(만기50%환급형)"});
	_private.options.prodInfo5sec.put("1004903", {"intyScCd":"01", "intyCd":3010185, "prodNm":"여성건강보험(만기100%환급형)"});

	// 뇌·심장보험
	_private.options.prodInfo5sec.put("1005201", {"intyScCd":"01", "intyCd":3010189, "prodNm":"뇌·심장보험(표준체,순수보장형)"});

	//방카상품 여부 조회
	// b연금
	_private.options.banc.put ("1002001", true);
	// b연금저축
	_private.options.banc.put ("1002101", true);
	// b연금2
	_private.options.banc.put ("1004401", true);
	// b연금저축
	_private.options.banc.put ("1004601", true);

	/**
		기초 데이터 조회
	*/
	_private.getHiddenData = function (type) {

		var _execute = {
			'header' : function () {
//				var data = HPPAHeader.objOrgInSData.spb_data;
				var data = HPPAHeader.headerSpbArr[HPPAHeader.cancelIdx];

				data.spb_intyCd		= _private.options.prodInfo5sec.get (data.spb_goodCd).intyCd;
				data.spb_intyScCd	= _private.options.prodInfo5sec.get (data.spb_goodCd).intyScCd;
				return data;
			}
			, 'page' : function () {
				var $hiddenData = $('#hidden_input :input')
				, inData		= {};
				// key , value 셋팅
				$.each ($hiddenData, function (idx, data) {

					var $data = $(data);
					inData[ $data.attr ('id') ] = $data.val ();
				});

				return inData;
			}
			, 'global': function () {
				return globalVar.getParam('refund_data');
			}
		}
		, hiddenData = {};

		if (_execute.hasOwnProperty (type)) {

			hiddenData = _execute[ type ] ();
		}
		return hiddenData;
	};

	/**
		팝업 URL조회
	*/
	_private.getUrl = function (goodSmclCd) {

		var url = '/products/pc/HPPC121P1';

		if(goodSmclCd == "11" || goodSmclCd == "42" ||
		   goodSmclCd == "43" || goodSmclCd == "44" ||
		   goodSmclCd == "61" || goodSmclCd == "71" ||
		   goodSmclCd == "81" || goodSmclCd == "45" ){

			url = '/products/pc/HPPC120P1';
		}
		return url;
	};
	/**
	 * 데이터 구조화
	 * */
	_private.buildEduAmtData = function (data) {

		var cllgRgiExpn	= util.Number (data.spb_cllgRgiExpn)                 	// 대학등록비용
		, elscEduExpn   = util.Number (data.spb_elscEduExpn)                 	// 초등학교교육
		, mdscEduExpn   = util.Number (data.spb_mdscEduExpn)                	// 중학교교육비
		, hgscEduExpn   = util.Number (data.spb_hgscEduExpn)                 	// 고등학교교육
		, saRsrExpnWt   = util.Number (data.spb_saRsrExpnWtrAge)             	// 유학준비비용
		, saRsrExpn     = util.Number (data.spb_saRsrExpn)                   	// 유학준비비용
		, siGoExpn      = util.Number (data.spb_siGoExpn)                  		// 사회진출비용
		, mnnpEntAge	= data.spb_chldInsAge									// 주피보험자 보험나이
		, sourceData 	= []													// 소스데이터
		, eduData 		= []													// 최종결과물
		, i, length, sourceSingleData;											// LOOP변수, 단일데이터

		 //초등학교 elscEduExpn
		 if (util.Number (elscEduExpn) > 0) {
			 sourceData.push ({
				 'eduFuncScCdNm' 	: '0101'
				 , 'pyAmt'			: util.Number (elscEduExpn)
			 });
		 }

		 //중학교 mdscEduExpn
		 if (util.Number (mdscEduExpn) > 0) {
			 sourceData.push ({
				 'eduFuncScCdNm' 	: '0102'
				 , 'pyAmt'			: util.Number (mdscEduExpn)
			 });
		 }

		 //고등학교 hgscEduExpn
		 if (util.Number (hgscEduExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0103'
				, 'pyAmt'			: util.Number (hgscEduExpn)
			 });
		 }

		 //대학등록금
		 if (util.Number (cllgRgiExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0104'
				, 'pyAmt'			: util.Number (cllgRgiExpn)
			 });
		 }
		 //유학
		 if (util.Number (saRsrExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0105'
				, 'pyAmt'			: util.Number (saRsrExpn)
				, 'calScVal'		: util.Number (saRsrExpnWt)
			 });
		 }
		 //사회진출금
		 if (util.Number (siGoExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0106'
				, 'pyAmt'			: util.Number (siGoExpn)
			 });
		 }

		// 데이터 구조화
		for (i = 0, length = sourceData.length; i < length; i += 1) {

			sourceSingleData 	= sourceData[ i ];
			$.merge (eduData, _private.getRebuildSingleEduData (sourceSingleData, mnnpEntAge));
		}
		return eduData;
	},
	/**
	 * 나이대별 환급금 데이터 조회
	 *
	 * @param : amt, schoolCd, insAge
	 * */
	_private.getRebuildSingleEduData = function (sourceData, insAge) {

		// 초기화
		insAge 			= util.Number (insAge);								// 보험나이

		// 변수선언
		var term 		= 3													// 기본 기간
		, schoolCd		= sourceData.eduFuncScCdNm							// 구분코드
		, schoolData 	= _private.options.schoolEx[ schoolCd ]					// 데이터
		, pyAmt 		= util.Number (sourceData.pyAmt)					// 금액
		, calScVal		= util.Number (sourceData.calScVal)					// 적용 보험나이
		, minAge		= util.Number (schoolData.str)						// 시작나이
		, maxAge		= util.Number (schoolData.end)						// 종료나이
		, result = [], i, length;											// 결과, LOOP 변수

		// 보험나이 +3년 부터 중도인출이 가능하다.
		insAge += term;
		// 유학자금
		if (schoolCd == '0105') {

			result.push ({
				  'mdwyFuncDetaCd' 	: schoolCd
				, 'calScVal' 		: calScVal
				, 'pyAmt' 			: pyAmt
			});
		}
		// 그외
		else {

			i = insAge > minAge ? insAge : minAge;
			for (length = maxAge; i <= length; i += 1) {
				result.push ({
					  'mdwyFuncDetaCd'	: schoolCd
					, 'calScVal' 		: i
					, 'pyAmt' 			: pyAmt
				});
			}
		}
		return result;
	};
	/**
		해지환급금 데이터 생성
	*/
	_private.getRefundData = function (type, goodSmclCd) {

		var data 		= _private.getHiddenData (type)
		, refundMap 	= new Map()
		, today  		= util.getDate()
		, insurPayPer 	= data.spb_rlpmPeri          						//납입기간
		, inspd			= util.Number(data.spb_rinsPeri)   					//보험기간
		, mnnpEntAge  	= data.spb_plnnrInsAge								//설계자 보험나이
		, scnpEntAge	= data.spb_chldInsAge								//자녀 보험나이
		, inspdVal		= 0
		, insurPayPerVal= 0
		, planCd      	= ""
		, annOpnnAge  	= "0"
		, goalPmtPeri 	= "0"
		, goodCd		= data.spb_goodCd									//상품코드
		, intyCd 		= data.spb_intyCd  									//보종코드
		, intyScCd 		= data.spb_intyScCd									//보종구분코드
		, stmymd      	= ''												//기준일자
		, isBanc		= _private.options.banc.get (data.spb_goodCd) || false;		//방카슈랑스여부

		// 해지환급금 조회시 intyScCd 는 01로 처리
		intyScCd = '01';

		//기준일자
		stmymd = util.addDate(today , 'y', Number (insurPayPer));

		// 정기
		if (goodSmclCd == "11" || goodSmclCd == "43" ||
			goodSmclCd == "44" || goodSmclCd == "61" ||
			goodSmclCd == "71" || goodSmclCd == "81" || goodSmclCd == "45") {

			//세만기(보험기간)
			if(inspd > 49){
				inspdVal = inspd - mnnpEntAge;
			}
			//년만기(보험기간)
			else if(inspd < 50){
				inspdVal = inspd;
			}

			//세만기(납입기간)
			if(insurPayPer > 49){
				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			//년만기(납입기간)
			else if(insurPayPer < 50){
				insurPayPerVal = insurPayPer;
			}
		}
		// 종신
		else if (goodSmclCd == "12") {

			inspdVal = 999;

			//세만기(납입기간)
			if(insurPayPer > 49){
				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			//년만기(납입기간)
			else if(insurPayPer < 50){
				insurPayPerVal = insurPayPer;
			}

		}
		// 연금, 연금저축
		else if (goodSmclCd == "21" || goodSmclCd == "31") {

			//세만기(보험기간)
			if(inspd > 49){
				inspdVal = inspd - mnnpEntAge;
			}
			//년만기(보험기간)
			else if(inspd < 50){
				inspdVal = inspd;
			}

			inspdVal = 999;

			//세만기(납입기간)
			if(insurPayPer > 49){
				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			//년만기(납입기간)
			else if(insurPayPer < 50){
				insurPayPerVal = insurPayPer;
			}

			planCd 		= "02";
			annOpnnAge  = data.spb_annOpnnAge;
			goalPmtPeri = data.spb_goalPmtPeri;

			if (isBanc) {

				insurPayPerVal = insurPayPer;
			}
			else {

				//연금납입기간 (연금개시시점 - 현재보험나이)
				insurPayPerVal = Number(annOpnnAge) - Number(mnnpEntAge);
			}
		}
		//어린이플러스, 어린이에듀케어 [실보험기간 = 보험기간-어린이나이]
		//어린이플러스, 어린이에듀케어 [실납입기간 = 납입기간-어린이나이]
		else if (goodSmclCd == "42" || goodSmclCd == "32") {

			scnpEntAge = mnnpEntAge;
			mnnpEntAge = data.spb_chldInsAge;			//주피나이를 어린이로 변경

			// 보험기간
			// 세만기
			if ( data.spb_inspdTypeCd == '02') {

				inspdVal = inspd - mnnpEntAge;
			}
			// 년만기
			else {

				inspdVal = inspd;
			}

			// 납입기간
			// 세만기
			if ( data.spb_pmtpdTypeCd == '02') {

				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			// 년만기
			else {

				insurPayPerVal = insurPayPer;
			}
		}
		// e저축
		else if (goodSmclCd == "33" || goodSmclCd == "33_1") {

			insurPayPerVal 	= insurPayPer;
			inspdVal		= inspd;
		}

		refundMap.PLAN_CD     = planCd;
		refundMap.goodCd 	  = goodCd;          								// 상품코드
		refundMap.stdYmdTo    = stmymd;                               			// 기준일자

		// 에듀케어
		if (goodSmclCd == '32') {

			// 만기환급형
			var special = data.spb_trtyTypeText;
			var arr  = {};

			arr = special.split("|");

			refundMap.pltcInf_cnt = arr.length;                             	// 보종별정보건수

			var intyCdArr   	= "";
			var intyScCdArr 	= "";
			var EntAmtArr   	= "";
			var pltcPrmArr  	= "";
			var pmtCyclCdArr 	= "";
			var inspdArr    	= "";
			var pmtpdArr    	= "";

		    var mdwyFuncDetaCdArr    = '';                                  	// 중도자금세부코드
		    var mdwyFuncDetaCdArr_cnt  = 0;                                	 	// 중도자금세부코드개수
		    var calScValArr          = '';                                  	// 지급기준나이
		    var pyAmtArr             = '';                                  	// 지급금액

			for(var i=0; i<arr.length; i++){

				intyCdArr	+= arr[i].split(",")[0] + "/@";						// 보종코드
				intyScCdArr += arr[i].split(",")[1] + "/@";						// 보종구분코드
				EntAmtArr   += arr[i].split(",")[3] + "/@";						// 보종별가입금액
				pltcPrmArr  += arr[i].split(",")[4] + "/@";						// 보종별보험료


			    //주특약은 보험기간을 넣고
			    if(i == 0){
			    	inspdArr += arr[i].split(",")[5] + "/@";					// 보험기간
			    	pmtpdArr += arr[i].split(",")[6] + "/@";
			    }
			    //면책 특약은 주특약의 납입기간을  넣는다.
			    else if(arr[i].split(",")[0] == '3060001'){
			    	inspdArr += arr[i].split(",")[6] + "/@";
			    	pmtpdArr += arr[i].split(",")[6] + "/@";
			    }

				//납입주기코드 99:일시납, 12:연납, 01:월납
				if(data.spb_pmtCyclCd == "99"){
					pmtCyclCdArr += "99" + "/@";
				}else if(data.spb_pmtCyclCd == "12"){
					pmtCyclCdArr += "12" + "/@";
				}else if(data.spb_pmtCyclCd == "01"){
					pmtCyclCdArr += "01" + "/@";
				}
			}

			 var arrEduData = _private.buildEduAmtData (data);
			// 학자금이 있으면 설정
			if (!util.isNull (arrEduData) && arrEduData.length > 0 ) {

				mdwyFuncDetaCdArr_cnt = arrEduData.length;

				for (var i = 0; i < mdwyFuncDetaCdArr_cnt; i += 1) {

					eduData = arrEduData[ i ];

					mdwyFuncDetaCdArr += eduData.mdwyFuncDetaCd + '/@';
					calScValArr       += eduData.calScVal + '/@';
					pyAmtArr          += eduData.pyAmt + '/@';
				}

				refundMap.mdwyFuncDetaCdArr 	= mdwyFuncDetaCdArr;
				refundMap.mdwyWtrInf_cnt	 	= mdwyFuncDetaCdArr_cnt;
				refundMap.calScValArr       	= calScValArr;
				refundMap.pyAmtArr         		= pyAmtArr;
			}

			refundMap.intyCd	  = intyCdArr;							 		// (장바구니 없음)보종코드
			refundMap.intyScCd	  = intyScCdArr;                 		 		// (장바구니 없음)보종구분코드
			refundMap.conYmd      = today;                               		// 계약일자
			refundMap.inspd       = inspdVal;                      		 		// 보험기간  xx년
			refundMap.pmtpd       = insurPayPerVal;              		 		// 납입기간
			refundMap.susfPeri    = "000";                               		// 부양기간 0 set
			refundMap.pmtCyclCd   = pmtCyclCdArr;					 	 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
			refundMap.mnnpEntAge  = mnnpEntAge;									// 주피나이
			refundMap.scnpEntAge  = scnpEntAge;                             	// 종피나이
			refundMap.mnnpGndrCd  = data.spb_chldGndrCd;                		// 주피성별
			refundMap.scnpGndrCd  = data.spb_plnnrGndrCd;                   	// 종피성별
			refundMap.EntAmt      = EntAmtArr;  						 		// 보험가입금액(보종별가입금액)
			refundMap.pltcPrm     = pltcPrmArr;							 		// 목표월보험료(보종별보험료)
			refundMap.annOpnnAge  = annOpnnAge ;                         		// 연금개시나이(연금용)
			refundMap.goalPmtPeri = goalPmtPeri ;                        		// 목표납입기간(연금용)

			refundMap.inspdArr  = inspdArr;
			refundMap.pmtpdArr  = pmtpdArr;
		}
		//어린이플러스 태아일경우 특약 array
		else if(goodSmclCd == "42"){
			var special = data.spb_trtyTypeText;
			var arr  = {};

			arr = special.split("|");

			refundMap.pltcInf_cnt = arr.length;                            		// 보종별정보건수

			var intyCdArr   = "";
			var intyScCdArr = "";
			var EntAmtArr   = "";
			var pltcPrmArr  = "";
			var pmtCyclCdArr = "";
			var inspdArr    = "";
			var pmtpdArr    = "";

			for(var i=0; i<arr.length; i++){
				intyCdArr	+= arr[i].split(",")[0] + "/@";						// 보종코드
				intyScCdArr += arr[i].split(",")[1] + "/@";						// 보종구분코드
				EntAmtArr   += arr[i].split(",")[3] + "/@";						// 보종별가입금액
				pltcPrmArr  += arr[i].split(",")[4] + "/@";						// 보종별보험료

				//주특약은 보험기간을 넣고
				if(i == 0){
					inspdArr    += inspdVal + "/@";								// 보험기간
					pmtpdArr    += insurPayPerVal + "/@";						// 납입기간
					pmtCyclCdArr += data.spb_pmtCyclCd + '/@';
				}
				//주산기 특약은 1년을 넣는다.
				else if(arr[i].split(",")[0] == "3030002"
					|| arr[i].split(",")[0] == "3030003"){
					inspdArr += "1" + "/@";
					pmtpdArr += "0" + "/@";
					pmtCyclCdArr += "99" + "/@";
				}
			}

			refundMap.intyCd	  = intyCdArr;							 		// (장바구니 없음)보종코드
			refundMap.intyScCd	  = intyScCdArr;                 		 		// (장바구니 없음)보종구분코드
			refundMap.conYmd      = today;                               		// 계약일자
			refundMap.inspd       = inspdVal;                      		 		// 보험기간  xx년
			refundMap.pmtpd       = insurPayPerVal;              		 		// 납입기간
			refundMap.susfPeri    = "000";                               		// 부양기간 0 set
			refundMap.pmtCyclCd   = pmtCyclCdArr;					 	 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
			refundMap.mnnpEntAge  = mnnpEntAge;									// 주피나이
			refundMap.scnpEntAge  = '000'; 		                            	// 종피나이
			refundMap.mnnpGndrCd  = data.spb_chldGndrCd;                		// 주피성별
			refundMap.scnpGndrCd  = '0';			                    		// 종피성별
			refundMap.EntAmt      = EntAmtArr;  						 		// 보험가입금액(보종별가입금액)
			refundMap.pltcPrm     = pltcPrmArr;							 		// 목표월보험료(보종별보험료)
			refundMap.annOpnnAge  = annOpnnAge ;                         		// 연금개시나이(연금용)
			refundMap.goalPmtPeri = goalPmtPeri ;                        		// 목표납입기간(연금용)

			refundMap.inspdArr  = inspdArr;
			refundMap.pmtpdArr  = pmtpdArr;
		}
		// 정기, 연금, 연금저축, e저축
		else{
			//비갱신암보험이면서 해지환급금 비교일경우 일반암보험과 비교하기 위해서 데이터 설정
			if(goodSmclCd == "43" && data.cancGen != undefined && data.cancGen != "N"){
				refundMap.pltcInf_cnt = "1";                                 		// 보종별정보건수
				refundMap.intyCd	  = "3010164";								 		// (장바구니 없음)보종코드
				refundMap.intyScCd	  = "01";                 			 		// (장바구니 없음)보종구분코드
				refundMap.conYmd      = today;                               		// 계약일자
				refundMap.inspd       = "60";                      		 		// 보험기간  xx년
				refundMap.pmtpd       = "60";                      		// 납입기간
				refundMap.susfPeri    = "000";                               		// 부양기간 0 set
				refundMap.pmtCyclCd   = "01";					 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
				refundMap.mnnpEntAge  = 40;							 		// 주피나이
				refundMap.scnpEntAge  = "000";                               		// 종피나이
				refundMap.mnnpGndrCd  = data.cancGen;                			// 주피성별
				refundMap.scnpGndrCd  = "0" ;                                		// 종피성별
				refundMap.EntAmt      = util.Number('30000000');  	 		// 보험가입금액(보종별가입금액)
				if(data.cancGen == "1"){
					refundMap.pltcPrm     = "22170";						 		// 목표월보험료(보종별보험료)
				}else{
					refundMap.pltcPrm     = "13950";						 		// 목표월보험료(보종별보험료)
				}
				refundMap.annOpnnAge  = "0" ;                         		// 연금개시나이(연금용)
				refundMap.goalPmtPeri = "0" ;                        		// 목표납입기간(연금용)
				refundMap.goodCd      = "1003701" ;
				refundMap.exYn      = "Y" ;
			}else if(goodSmclCd == "45" && goodCd.indexOf("10052") > -1 &&data.cancGen != undefined && data.cancGen != "N"){
					refundMap.pltcInf_cnt = "1";                                 		// 보종별정보건수
					refundMap.intyCd	  = "3010189";								 		// (장바구니 없음)보종코드
					refundMap.intyScCd	  = "01";                 			 		// (장바구니 없음)보종구분코드
					refundMap.conYmd      = today;                               		// 계약일자
					refundMap.inspd       = "40";                      		 		// 보험기간  xx년
					refundMap.pmtpd       = "20";                      		// 납입기간
					refundMap.susfPeri    = "000";                               		// 부양기간 0 set
					refundMap.pmtCyclCd   = "01";					 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
					refundMap.mnnpEntAge  = 40;							 		// 주피나이
					refundMap.scnpEntAge  = "000";                               		// 종피나이
					refundMap.mnnpGndrCd  = data.cancGen;                			// 주피성별
					refundMap.scnpGndrCd  = "0" ;                                		// 종피성별
					refundMap.EntAmt      = util.Number('10000000');  	 		// 보험가입금액(보종별가입금액)
					if(data.cancGen == "1"){
						refundMap.pltcPrm     = "26950";						 		// 목표월보험료(보종별보험료)
					}else{
						refundMap.pltcPrm     = "19180";						 		// 목표월보험료(보종별보험료)
					}
					refundMap.annOpnnAge  = "0" ;                         		// 연금개시나이(연금용)
					refundMap.goalPmtPeri = "0" ;                        		// 목표납입기간(연금용)
					refundMap.goodCd      = "1005201" ;
					refundMap.exYn      = "Y" ;
			}else{
				refundMap.pltcInf_cnt = "1";                                 		// 보종별정보건수
				refundMap.intyCd	  = intyCd;								 		// (장바구니 없음)보종코드
				refundMap.intyScCd	  = intyScCd;                 			 		// (장바구니 없음)보종구분코드
				refundMap.conYmd      = today;                               		// 계약일자
				refundMap.inspd       = inspdVal;                      		 		// 보험기간  xx년
				refundMap.pmtpd       = insurPayPerVal;                      		// 납입기간
				refundMap.susfPeri    = "000";                               		// 부양기간 0 set
				refundMap.pmtCyclCd   = data.spb_pmtCyclCd;					 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
				refundMap.mnnpEntAge  = mnnpEntAge;							 		// 주피나이
				refundMap.scnpEntAge  = "000";                               		// 종피나이
				refundMap.mnnpGndrCd  = data.spb_plnnrGndrCd;                		// 주피성별
				refundMap.scnpGndrCd  = "0" ;                                		// 종피성별
				refundMap.EntAmt      = util.Number(data.spb_insEntAmt);  	 		// 보험가입금액(보종별가입금액)
				refundMap.pltcPrm     = data.spb_mmPrm;						 		// 목표월보험료(보종별보험료)
				refundMap.annOpnnAge  = annOpnnAge ;                         		// 연금개시나이(연금용)
				refundMap.goalPmtPeri = goalPmtPeri ;                        		// 목표납입기간(연금용)
			}
		}

		// 상품 소분류코드 추가
		refundMap.goodSmclCd = goodSmclCd;
		
		// 보기 납기 및 흡연여부 추가
		refundMap.inspdVal = data.spb_rinsPeri;
		refundMap.inspdScCd = data.spb_inspdTypeCd;
		refundMap.pmtpdVal = data.spb_rlpmPeri;
		refundMap.pmtpdScCd = data.spb_pmtpdTypeCd;
		
		refundMap.isBancYn = isBanc ? 'Y' : 'N';
		
		if(goodSmclCd == "43" && data.cancGen != undefined && data.cancGen != "N"){
			refundMap.inspdVal = '100';
			refundMap.inspdScCd = '02';
			refundMap.pmtpdVal = '100';
			refundMap.pmtpdScCd = '02';
		}
		
		return refundMap;
	};

	/**
		해지 환급금 팝업 열기
	*/
	_public.openPop = function (type, goodSmclCd) {

		var options = _private.options
		, popupSize = {
			  'width'	: options.width
			, 'height'	: options.height
		}
		, data = _private.getRefundData (type, goodSmclCd)
		, url = _private.getUrl (goodSmclCd);

		//100세까지 비갱신 암보험 환급금 예시일 경우 다음 페이지를 위해서 환급금관련 데이터 초기화
		if(data.exYn != undefined && data.exYn == "Y"){
			$("#cancGen").val("N");
		}
		// 에듀케어저축보험/교육자금 중도인출설계일 경우 팝업사이즈 변경
		if ( goodSmclCd == '32' && util.chkReturn(data.mdwyFuncDetaCdArr) ) {
			popupSize.width  = '990';
			popupSize.height = '650';
		}

		util.wPopPage (url, popupSize, data);
	};

	return _public;
}(this, jQuery));



/**
 * 휴일 안내 팝업
 * 2020.01.24 설 연휴 고객센터 관련 안내 팝업
 */
this.HoliDyPop = (function (global, $) {
	var _public = {}
	, _private = {};
	//설연휴
	_private.options = {
			url : "/common/cc/HPCC210P1"
			, width: 550
			, height: 630
	};

	_public.open = function () {
		if (util.getDateTime() < '20200207000000') {
			if ( util.getCookie('HPCC210P1_COOKIE') == '' ) {
				var options = _private.options
					, popupSize = {
						'width'	: options.width
						, 'height'	: options.height
					}
					, url = options.url;

				util.wPopPage (url, popupSize);
			}
		}
	};

	return _public;
}(this, jQuery));


