/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.webLog.js, /resources/js/
 * DESCRIPTION : 웹로그 관련 스크립트 영역
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2015-03-19		initial version
 * ========================================================================== */

/**
 * 클라이언트의 각종 설정 값들의 집합
 */
//Data Story 웹로그 가입설계 환경변수
var _n_p1   = "";
var _n_p2   = "";
var _n_p3   = "";	// 상품코드
var _n_p4   = "";   // 청약단계코드
var _n_p5   = "";	// 보험료  
var _n_p6   = "";    
var _n_p7   = "";   // 청약 설계번호 
var _n_text = "";	// 특정 Field Value
var _n_m1   = "";	// 인증유형 
var _n_m2   = "";	// 인증성공 여부 (success of fail)
var _n_m3   = "";	// 요소  Key Name
var _n_m4   = "";	// 요소 Value
var _n_m5   = "";	// 요소 Type 
var _n_m6   = "";	// Custom Value관련 Data 
var _n_m7   = "";	// B2C or B2C
var _n_inflow= "";	// inflow

var dsCustomData = ""; //커스텀 데이터
var _n_uid_attr1 = ""; //Data Story 성별 고객정보
var _n_uid_attr2 = ""; //Data Story 연령대 고객정보


var webLog = (function() {
	var _public = {};
	var _private = {};

	/**
	 * 서버 상태 체크
	 */
	_private.getServerStatus = function() {

		var host = location.host;

		if (host.indexOf('127.0.0.1') > -1 || host.indexOf('localhost') > -1
				|| host.indexOf('192.168') > -1) {
			return 'LOCAL';
		} else if (host.indexOf('10.65.2.105') > -1
				|| host.indexOf('hpd.lifeplanet.co.kr') > -1) {
			return 'DEV';
		} else if (host.indexOf('10.65.4.115') > -1
				|| host.indexOf('hpt.lifeplanet.co.kr') > -1) {
			return 'TEST';
		} else if (host.indexOf('218.52.186.82') > -1
				|| host.indexOf('www.lifeplanet.co.kr') > -1) {
			return 'PROD';
		} else {
			return 'PROD';
		}

	};

	/**
	 * GA 스크립트 실행
	 */
	_public.runGA = function() {

		try {

			if (_private.getServerStatus() != 'PROD') return;

			(function(i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function() {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
				a = s.createElement(o), m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script',
					'https://www.google-analytics.com/analytics.js', 'ga');

			ga('create', 'UA-45886559-2', 'auto');
			ga('require', 'GTM-NWCSWVG');  //구글 옵티마이즈 추가
			//ga('send', 'pageview'); // 20191122 GA Tag manage추가로 PV중복 방지
			
		} catch (e) {
			// to do...
		}
	};

	/**
	 * * GA 스크립트 삽입
	 */
	_public.runGAQ = function(action, label, category) {
		
		try {
			
			if (_private.getServerStatus() != 'PROD') return;
			
			var eventCategory = "";
			
			/**
			 * 2016년 기준 트래킹 코드는 category : legacy
			 * 2017년부터는 애드쿠아 요청에 따른 추가 등록
			 */ 
			if (arguments[2] != undefined) {
				eventCategory = arguments[2];
			} else {
				eventCategory = "legacy";
			}

			ga('send', 'event', eventCategory, action, label);
			
		} catch (e) {
			// to do...
		}
	};
	
	/**
	 * GA Tag Manager 스크립트 실행
	 */
	_public.runGATagMag = function() {
		try {
			if (_private.getServerStatus() != 'PROD') return;
			
			var noSrc  = "<noscript></noscript>";
			var tagSrc = "<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-PRRDG6G' height='0' width='0' title='태그매니저' style='display:none;visibility:hidden'></iframe>";//200617 웹접근성 수정
			
			(function(w,d,s,l,i){
				w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
				var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
				j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-PRRDG6G');
			
			$("body").append(noSrc);
			$("noscript").append(tagSrc);
		} catch (e) {
			// to do...
            console.log("GA Tag Manager Error")
		}
	};
	
	/**
	 * realClick inflow script
	 */
	_public.runRealClick = function() {

		try {
			
			if (_private.getServerStatus() != 'PROD') return;

			var dspu = "SR1bGlmZXBsYW5ldA"; // === (필수)광고주key
			var dspu, dspt, dspo, dspom;
			
			function loadanalJS_dsp(b, c) {
				
				var d = document.getElementsByTagName("head")[0], a = document.createElement("sc" + "ript");
				a.type = "text/javasc" + "ript";
				null != c && (a.charset = "UTF-8");
				a.src = b;
				a.async = "true";
				d.appendChild(a);
				
			};
			
			function loadanal_dsp(b) {
				loadanalJS_dsp(("https:" == document.location.protocol ? "https://" : "http://") + b, "UTF-8");
				//document.write('<span id=dsp_spn style=display:none;></span>');
			};
			
			loadanal_dsp("tk.realclick.co.kr/tk_comm.js?dspu=" + dspu + "&dspt=" + dspt + "&dspo=" + dspo + "&dspom=" + dspom);
			
		} catch (e) {
			// to do...
		}

	};
	
	/**
	 * realClick button event tracking
	 */
	_public.realClickBtnEvent = function() {

		try {
			
			if (_private.getServerStatus() != 'PROD') return;
			
			var dspu2 = "SR1bGlmZXBsYW5ldA"; // === (필수)광고주key (변경하지마세요) === 
			var dspt2 = "2"; // === (필수)전환구분( 2:기타구분 ) (변경하지마세요) === 
			var dspo2 = ""; // === (선택)구문번호( 미입력시 - 중복체크 안함. ) === 
			// var dspu2,dspt2,dspo2,dspom2; 
			var dspom2; 

			function loadanalJS_dsp2(b, c) {
				
				var d = document.getElementsByTagName("head")[0], a = document.createElement("sc" + "ript");
				a.type = "text/javasc" + "ript";
				null != c && (a.charset = "UTF-8");
				a.src = b;
				a.async = "true";
				d.appendChild(a);
				
			};
			
			function loadanal_dsp2(b) {
				loadanalJS_dsp2(("https:" == document.location.protocol ? "https://" : "http://") + b, "UTF-8");
				// document.write('<span id=dsp_spn style=display:none;></span>');
			};
			
			function call_dsp_track() {
				loadanal_dsp2("tk.realclick.co.kr/tk_comm.js?dspu=" + dspu2	+ "&dspt=" + dspt2 + "&dspo=" + dspo2 + "&dspom=" + dspom2);
			};
			
			call_dsp_track();
			
		} catch (e) {
			// to do...
		}

	};
	
	/**
	 * realClick DSP(retargeting)
	 */
	_public.runRealClickDSP = function() {

		try {
			
			if (_private.getServerStatus() != 'PROD') return;
			
			function dsp_loadrtgJS(b, c) {
				var d = document.getElementsByTagName("head")[0], a = document.createElement("script");
				a.type = "text/javascript";
				null != c && (a.charset = "euc-kr");
				a.src = b;
				a.async = "true";
				d.appendChild(a);
			};
			
			function dsp_load_rtg(b) {
				dsp_loadrtgJS(("https:" == document.location.protocol ? " https://"	: " http://") + b, "euc-kr");
			};
			
			dsp_load_rtg("realdmp.realclick.co.kr/rtarget/rtget.js?dsp_adid=lifeplanet");
			
		} catch (e) {
			// to do...
		}

	};
	
	_public.runPixel = function() {
		
		try {
			
			if (_private.getServerStatus() != 'PROD') return;
			
			!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
					n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
					document,'script','https://connect.facebook.net/en_US/fbevents.js');
			
			fbq('init', '1617914968512909'); // Insert your pixel ID here.
			fbq('track', 'PageView');
			
		} catch (e) {
			// to do...
		}

	};
	
	
	/**
	 * Facebook Pixel button event tracking
	 */
	_public.pixelClickBtnEvent = function() {
		
		try {
			
			if (_private.getServerStatus() != 'PROD') return;
			
			/**
			 * 2017.04.01부터는 기본 'Lead' 이외에 'ViewContent'가 추가됨
			 */
			var pixelTrackingType = '';
			 
			if (arguments[0] != undefined) {
				pixelTrackingType = arguments[0];
			} else {
				pixelTrackingType = 'Lead';
			}
			
			fbq('track', pixelTrackingType);
			
		} catch (e) {
			// to do...
		}

	};

	/**
	 * Criteo 스크립트 실행
	 */
	_public.runCriteo = function() {
		
		try{

			if (_private.getServerStatus() != 'PROD') return;
			
			function loadJS() {
				var d = document.getElementsByTagName("head")[0], a = document.createElement("script");
				a.type = "text/javascript";
				a.charset = "UTF-8";
				a.src = "//static.criteo.net/js/ld/ld.js";
				d.appendChild(a);
			};
			
			loadJS();
			
			var type = arguments[0];
			
			window.criteo_q = window.criteo_q || [];
			if (type == 'main'){			// 메인페이지 트래커
				window.criteo_q.push(
						{event : "setAccount", account : 13565 }, {event : "setSiteType", type : "d"}, 
						{event : "viewHome"}
				);	
			}else if (type == 'good'){		// 상품페이지 트래커
				window.criteo_q.push(
						{event : "setAccount", account : 13565 }, {event : "setSiteType", type : "d"}, 
						{event : "viewItem" , item : arguments[1] }
				);
			}else if (type == 'swt'){		// 구매전환페이지 트래커
				window.criteo_q.push(
						{event : "setAccount", account : 13565 }, {event : "setSiteType", type : "d"}, 
						{event : "trackTransaction" , id : new Date().getTime(), new_customer : "1", item : [{id : arguments[1] , price : arguments[2], quantity: "1"}] }
				);
			}
			
		} catch (e) {
			// to do...
		}

	};


	/**
	 * AceCounter 웹로그
	 * 
	 * @param param
	 */
	_public.runAceCounterWEB = function(param) {
		// 웹서버 취약성점검 조치로 AceCounter 서버사용불가
	};
	
	/**
	 * AceCounter 웹로그
	 * 가상url 파라미터 받아서 에이스카운터 유입스크립트 호출
	 * @param url
	 */
	_public.runAceCounterVirtual = function(url) {
		// 웹서버 취약성점검 조치로 AceCounter 서버사용불가
	};
	
	/**
	 *  Data Story 신규 웹로그 트래킹코드(페이지 유입될때 웹로그 적재)
	 *  @param
	 *  @return 
	 */
	_public.runDataStory = function() {
//		if (_private.getServerStatus() != 'PROD') return;
		
		_n_sid = location.hostname;
		_n_uid_cookie = "UID";
		_n_m7 = util.nvl(globalVar.getParam('busiTp'), 	'B2C'); 			   // B2C or B2B
		if(globalVar.getParam('inSData') != undefined) {
			_n_inflow = util.nvl(globalVar.getParam('inSData').inflow, 	'ZZ'); // inflow
		}
		if(!util.isNull(util.getCookie("dsGndrCd"))) {
			_n_uid_attr1 = util.getCookie("dsGndrCd");
			if(_n_uid_attr1 == "M") {
				_n_uid_attr1 = "남";
			}else {
				_n_uid_attr1 = "여";
			}
			util.deleteCookie("dsGndrCd");
		}
		if(!util.isNull(util.getCookie("dsCsAges"))) {
			_n_uid_attr2 = util.getCookie("dsCsAges");
			_n_uid_attr2 = _n_uid_attr2 + "대";
			util.deleteCookie("dsCsAges");
		}
		
		
		n_logging();
	};
	
	/**
	 *  Data Story 신규 웹로그 트래킹코드(변수형), 호출하면 변수에만 저장하고 페이지 이동시에 웹로그에 적재 
	 *  @param
	 *  @return 
	 */
	_public.runDsSetVar = function(param) {
//		if (_private.getServerStatus() != 'PROD') return;
		
		_private.setDsParam(param);
	};
	
	/**
	 *  Data Story 신규 웹로그 트래킹코드(함수형), 호출하면서 웹로그에 바로 적재
	 *  @param
	 *  @return 
	 */
	_public.runDsFunc = function(param) {
//		if (_private.getServerStatus() != 'PROD') return;
		
		action_logging(param);
	};
	
	
	/**
	 *  Data Story 웹로그 custom value들 트래킹코드(변수만 설정,로그적재는 페이지 로딩될때 자동으로 적재됨)
	 *  @param
	 *  @return 
	 */
	_public.runDsCustomVar = function(param) {
//		if (_private.getServerStatus() != 'PROD') return;
		
		if(respone && typeof response =='object') { 
			$.each(param, function(key, value){
			    n_setCustomParam(key, value);
			});
		}	
	};
	
	/**
	 *  Data Story 웹로그 custom value들 트래킹코드(변수 설정하면서 동시에 로그 적재)
	 *  @param
	 *  @return 
	 */
	_public.runDsCustomFunc = function(param) {
//		if (_private.getServerStatus() != 'PROD') return;
		var sendData = {};
		if(param != undefined && _private.isRunDSCustom(location.pathname)) {
			if(param && typeof param == 'object') {
				var nCount = 0
				$.each(param, function(key, value){
					if(key != "" && value != "") {
						if(typeof value === 'object' ) {
							value = JSON.stringify(value);
						}
						console.log('key:'+key+' value:'+value);
						if (typeof key === 'string' && typeof value === 'string') {
							sendData[key] = value;
						}
					}
				});
				if ( !$.isEmptyObject(sendData) ) {
					var sendStr = JSON.stringify(sendData);
					var regExp = /[\{\}\[\]\\\'\"]/gi;
					if(regExp.test(sendStr)) {
						var temp = sendStr.replace(regExp,"");
						sendStr = temp;
					}
					var obj = {_n_m6:sendStr};
					action_logging(obj);
				}
			}
		} 
	
	};	
	
	
	/**
	 * Data Story에 필요한 변수 설정 
	 * param(JSON Object)
	 * return()    
	 */
	_private.setDsParam = function(param) {
		var result = {};
		$.each(param, function(key, value){
		    if(key == "_n_p1") {
		    	_n_p1 = value;
		    	result._n_p1 = value;
		    } else if(key == "_n_p2") {
		    	_n_p2 = value;
		    	result._n_p2 = value;
		    } else if(key == "_n_p3") {
		    	_n_p3 = value;
		    	result._n_p3 = value;
		    } else if(key == "_n_p4") {
		    	_n_p4 = value;
		    	result._n_p4 = value;
		    } else if(key == "_n_p5") {
		    	_n_p5 = value;
		    	result._n_p5 = value;
		    } else if(key == "_n_p6") {
		    	_n_p6 = value;
		    	result._n_p6 = value;
		    } else if(key == "_n_p7") {
		    	_n_p7 = value;
		    	result._n_p7 = value;
		    } else if(key == "_n_text") {
		    	_n_text = value;
		    	result._n_text = value;
		    } else if(key == "_n_m1") {
		    	_n_m1 = value;
		    	result._n_m1 = value;
		    } else if(key == "_n_m2") {
		    	_n_m2 = value;
		    	result._n_m2 = value;
		    } else if(key == "_n_m3") {
		    	_n_m3 = value;
		    	result._n_m3 = value;
		    } else if(key == "_n_m4") {
		    	_n_m4 = value;
		    	result._n_m4 = value;
		    } else if(key == "_n_m5") {
		    	_n_m5 = value;
		    	result._n_m5 = value;
		    } else if(key == "_n_m6") {
		    	_n_m6 = value;
		    	result._n_m6 = value;
		    } else if(key == "_n_m7") {
		    	_n_m7 = value;
		    	result._n_m7 = value;
		    }
		});
		return result;
	}	
	
	/**
	 * Data Story 청약 웹로그 호출
	 */
	_public.sucoRunDsFunc = function (_n_p4, _n_text){
		
		var spb_goodCd = '';
		var dsData = {};
		
		if (globalVar.getParam('spb_data') != undefined){
			// 장바구니 데이터가 있는 경우
			spb_goodCd = globalVar.getParam('spb_data').spb_goodCd;  				//상품코드 
			dsData._n_p5 = globalVar.getParam('spb_data').spb_sumPrm;				//합계보험료 
			dsData._n_p7 = util.nvl(globalVar.getParam('spb_data').spb_entPlnno, 'empty');				//가입설계번호
			
		}else if (parent.globalVar.getParam('spb_data')!= undefined){
			// 팝업창에서 장바구니 데이터를 조회하는 경우
			spb_goodCd = parent.globalVar.getParam('spb_data').spb_goodCd;
			dsData._n_p5 = parent.globalVar.getParam('spb_data').spb_sumPrm;
			dsData._n_p7 = util.nvl(parent.globalVar.getParam('spb_data').spb_entPlnno, 'empty');
		}
		
		dsData._n_p3 =  spb_goodCd
		dsData._n_p4 = _n_p4;
		dsData._n_text = util.nvl(_n_text, 'empty');
		
		/**
		 * 웹로그 전역 변수 설정 
		 */
		_n_m7 = util.nvl(globalVar.getParam('busiTp'), 	''); 			   // B2C or B2B
		if(globalVar.getParam('inSData') != undefined) {
			_n_inflow = util.nvl(globalVar.getParam('inSData').inflow, 	'ZZ'); // inflow
		}
		
		_public.runDsFunc(dsData);
	}
	
	/**
	 * Data Story Custom Value 적재여부 페이지 판단
	 * 현재는 마이페이지의 대출, 계약변경만 적재  
	 */
	_private.isRunDSCustom = function(url) {
		if(url.indexOf('/mypage/ml') > -1 ) {	// 대출 
			return true;
		} else {
			return false;
		}
	}
	
	
	/**
	 * Data Story 청약 웹로그 페이지진입 변수설정
	 */
	_public.sucoRunDsSetVar = function (_n_p4){
		
		var spb_goodCd = '';
		var dsData = {};
		
		if (globalVar.getParam('spb_data') != undefined){
			// 장바구니 데이터가 있는 경우
			spb_goodCd = globalVar.getParam('spb_data').spb_goodCd;  //상품코드 
			dsData._n_p5 = globalVar.getParam('spb_data').spb_sumPrm;				//합계보험료 
			dsData._n_p7 = globalVar.getParam('spb_data').spb_entPlnno;				//가입설계번호
			
		}else if (parent.globalVar.getParam('spb_data')!= undefined){
			// 팝업창에서 장바구니 데이터를 조회하는 경우
			spb_goodCd = parent.globalVar.getParam('spb_data').spb_goodCd;
			dsData._n_p5 = parent.globalVar.getParam('spb_data').spb_sumPrm;
			dsData._n_p7 = parent.globalVar.getParam('spb_data').spb_entPlnno;
		}
		
		dsData._n_p3 =  spb_goodCd
		dsData._n_p4 = _n_p4;
		dsData._n_text = _n_text;
		
		_public.runDsFunc(dsData);
	};
	
	/**
	 * Data Story 청약 웹로그 페이지진입 변수설정
	 * @param ahrzMdCd : 인증방법코드 
	 * @param result   : success or fail 
	 */
	_public.runDsLoginFunc = function (ahrzMdCd , result) {
//		if (_private.getServerStatus() != 'PROD') return;
		
		var param = {};
		param._n_m1 = ahrzMdCd;
		param._n_m2 = result;
		_public.runDsFunc(param);
	};
	
	/**
	 * 청약 단계에서 청약데이터 및 설계데이터를 웹로그에 적재
	 * @param dsData    청약 웹로그 데이터 및 단계코드 
	 * @param spb_data  설계 데이터 
	 * @return 	  
	 */
	_public.runDsPlnSucoData = function(dsData, spb_data) {
		var sucoData = {};
		sucoData = _private.makeDsSucoData(spb_data, spb_data._n_p4);
		dsData = $.extend(dsData, sucoData);
		action_logging(dsData);
	};
	
	/**
	 * 설계/청약 단계에서 설계데이터를 웹로그 적재 데이터로 변환하는 내부함수 
	 * @param spb_data 설계데이터
	 * @param stagCd   단계코드 
	 * @return dsData  DS 적재용 데이터 
	 */
	_private.makeDsSucoData = function(spb_data, stagCd) {
		var dsData = {};
		dsData._n_s1	=	util.nvl(spb_data.spb_entPlnYmd, 	' '); //설계일자 
		dsData._n_s2	=	util.nvl(spb_data.spb_plnnrBrdt, 	' '); //생년월일 
		dsData._n_s3	=	util.nvl(spb_data.spb_plnnrInsAge, 	' '); //설계자보험나이 
		dsData._n_s4	=	util.nvl(spb_data.spb_plnnrGndrCd, 	' '); //설계자성별코드
		dsData._n_s5	=	util.nvl(spb_data.spb_chldBrdt, 	' '); //자녀생년월일
		dsData._n_s6	=	util.nvl(spb_data.spb_chldInsAge, 	' '); //자녀보험나이
		dsData._n_s7	=	util.nvl(spb_data.spb_chldGndrCd, 	' '); //자녀성별
		dsData._n_s8	=	util.nvl(spb_data.spb_fetaYn, 		' '); //태야여부(Y/N)
		dsData._n_s9	=	util.nvl(spb_data.spb_brParYmd, 	' '); //자녀출산예정일
		dsData._n_s10	=	util.nvl(spb_data.spb_insEntAmt, 	' '); //보험금  
		dsData._n_s11	=	util.nvl(spb_data.spb_inspdTypeCd, 		' '); //보험기간유형코드
		dsData._n_s12	=	util.nvl(spb_data.spb_pmtpdTypeCd,  ' '); //납입기간유형코드
		dsData._n_s13	=	util.nvl(spb_data.spb_pmtCyclCd,    ' '); //납입주기
		dsData._n_s14	=	util.nvl(spb_data.spb_eprtRfdrt,    ' '); //만기환급률 
		dsData._n_s15	=	util.nvl(spb_data.spb_prmPmtExcTrtyEntYn, ' '); //납입면제특약가입여부 
		dsData._n_s16	=	util.nvl(spb_data.spb_eprtRstAmt,    ' ');//만기보험금 
		if(dsData._n_s16 == " ") {
			dsData._n_s16	=	util.nvl(spb_data.spb_eprtEduAmt,' ');//만기보험금
		}
		dsData._n_s17	=	util.nvl(spb_data.spb_annOpnnAge,    ' '); //연금개시나이
		dsData._n_s18	=	util.nvl(spb_data.spb_goalPmtPeri,   ' '); //목표납입기간
		dsData._n_s19	=	util.nvl(spb_data.spb_whliAnnFmSlctCd,   ' ');//종신연금선택코드 
		dsData._n_s20	=	util.nvl(spb_data.spb_crtnAnnFmSlctCd,   ' ');//확정연금선택코드
		dsData._n_s21	=	util.nvl(spb_data.spb_goalAnnAmt,   ' '); //예상연금수령액 
		dsData._n_s22	=	util.nvl(spb_data.spb_smokYn,   ' ');  //흡연여부 
		dsData._n_s23	=	util.nvl(spb_data.spb_whliAnnFmSlctRto,   ' ');  //종신연금선택비율
		dsData._n_s24	=	util.nvl(spb_data.spb_crtnAnnFmSlctRto,   ' ');  //확정연금선택비율
		
		dsData._n_p3 	=	spb_data.spb_goodCd;					 //상품코드
		dsData._n_p4	=   stagCd;									 //청약설계단계코드(HP_CMNNCD의 CMNN_CD_TYPE_ID 10004참조) 
		dsData._n_p5	=	util.nvl(spb_data.spb_sumPrm, 		' '); //합계보험료
		if(globalVar.getParam('inSData') != undefined) {
			dsData._n_inflow = util.nvl(globalVar.getParam('inSData').inflow, 	'ZZ'); // inflow
		}
		dsData._n_m7 = util.nvl(globalVar.getParam('busiTp'), 	'B2C'); 			   // B2C or B2B
		return dsData;
	}
	
	/**
	 * Data Strory 상품 설계 웹로그 적재 
	 */
	
	_public.runDsPDFunc = function (param) {
//		if (_private.getServerStatus() != 'PROD') return;
		
		param.forEach(function(spb_data) {
			var dsData = {};
			dsData = _private.makeDsSucoData(spb_data, "0_1");			
			action_logging(dsData);
		});
	};
	
	/**
	 * Data Story Event 관련 데이터 적재
	 * @param labl : Label명 적재, 대분류
	 * @param clsf : Classify명 적재, 중분류
	 * @param actn : Action명 적재, 소분류     
	 */
	_public.runDsEvntFunc  = function(labl, clsf, actn) {
		var dsData = {};
		dsData._n_m8 = util.nvl(labl, 'empty'); 
		dsData._n_m9 = util.nvl(clsf, 'empty');
		dsData._n_m3 = util.nvl(actn, 'empty');
		action_logging(dsData);
	}	
	
	/**
	 * 페이지 전환시 input관련 요소들 Data Story에 적재할때 사용하는 함수
	 * param  objParam : 페이지이동시 inSData  
	 */
	
	_private.makeDsInptData = function(param, init) {
		var separator = ":";
		var postfix	  = ",";
		var isAppend  = false;
		/**
		 * 마이페이지에서 페이지 이동시 전달되는 파라미터를 적재하고자 하는 KeyName을 아래 배열에 추가 
		 */
		var insertKeyNm = ["mask_insConno"	//마스킹증권번호
		                   ,"rlpyAmt"		//대출  
		                   , "nrmlInt"		//정상이자   
		                   , "pllnAmt"		//상환금액  
		                   ];
		
		if(init) {
			dsCustomData = "";
		}
		$.each(param, function(key, value){
			if(value == undefined) {
				value = "";
			}
			if(typeof value === 'string' || typeof value === 'number') {
				if(value != "" ) {
					dupIndex = $.inArray(key, insertKeyNm);
					if (dupIndex > -1) {
						if(dsCustomData != "") {
							if(key == "mask_insConno" && dsCustomData.indexOf(value) > -1) {
								dsCustomData = dsCustomData;
							} else {
								dsCustomData = dsCustomData + postfix + key + separator + value;
							}
						} else {
							dsCustomData = key + separator + value;
						}
						isAppend = true;
					}
				}
			} else {
				if(dsCustomData != "" && isAppend == true) {
					dsCustomData = dsCustomData + "|"; // 같은 계층의 value 아닌경우 구분자 축가
				}
				return _private.makeDsInptData(value, false);
			}
		});
	}
	
	/**
	 * 마이페이지 페이지 이동시 특정 key값 Data Story 적재 
	 * param : inSData
	 */
	_public.runDsInputFunc = function (param) {
//		if (_private.getServerStatus() != 'PROD') return;
		
		if (param == undefined) return;
		dsCustomData = "";
		if(_private.isRunDSCustom(location.pathname)) {
			_private.makeDsInptData(param, true);
			if(dsCustomData != "") {
				var obj = {_n_m6:dsCustomData};
				action_logging(obj);
			}
		}
	};
	
	/**
	 * 웹로그 custom Key의 unique한 key Name 을 가져온다 
	 */
	_private.getUniqueKeyNm = function(data, key) {
		var postix = 1;
		while(1) {
			if(data.hasOwnProperty(key)) {
				i++;
				key = key + '_' + postix;
			}
			else {
				return key;
			}
		}
	}
	
	/**
	 * 웹로그 클릭이벤트 공통함수  
	 * type  : click 이벤트 타입
	 * value : 웹로그 data Dom 객체  
	 */
	_private.processWeblogEvnt = function(type, _this) {
//		if (_private.getServerStatus() != 'PROD') return;
		
		var param = {};		//Data Story에 적재되는 데이터 
		var jsonData = {};
		var actn	= ""; //GA의 action, DS weblog의 key name
		var labl	= ""; //GA의 label, DS 웹로그 사용하지 않음
		var clsf	= ""; //GA의 category, DS 웹로그 사용하지 않음
		
		var value = _this.attr(type);
		value = util.replaceAll(value, "'", "\"");
		jsonData = JSON.parse(value);
		actn	=	util.nvl(jsonData.actn, ''); 
		labl	=	util.nvl(jsonData.labl, '');  
		clsf	=	util.nvl(jsonData.clsf, ''); 
		
		//actn 파라미터가 존재하지 않을 경우 
		if(actn == "") {
			actn = _this.text();
		}
		
		//GA에 적재될 데이터가 존재하는 경우
		if(labl != "" && clsf !="") {		 
			if (_private.getServerStatus() == 'PROD') {
				ga('send', 'event', clsf, actn, labl);
			}
		}
		
		//Data Story에 데이터 적재
		param._n_m3 = actn;
		param._n_m8 = labl;
		param._n_m9 = clsf;
		if(type == "data-weblogselect") {	// Selector type인 경우 
			if(Picker != undefined) {
				param._n_m4 = Picker.getVal(param._n_m3);
			}
		} else {
			param._n_m4 = _this.val();
		}

		_public.runDsFunc(param);
	}
	
	
	/**
	 * Data Story click event 관련 웹로그 적재 
	 * 
	 */
	$(document).ready(function() {		
		$(document).on("click", "[data-weblogclick]", function(e){
			_private.processWeblogEvnt("data-weblogclick", $(this));
		});
		$(document).on("focusout", "[data-webloginput]", function(e){
			_private.processWeblogEvnt("data-webloginput", $(this));
		});
		$(document).on("click", "[data-weblogcheck]", function(e){
			_private.processWeblogEvnt("data-weblogcheck", $(this));
		});
		$(document).on("click", "[data-weblogradio]", function(e){
			_private.processWeblogEvnt("data-weblogradio", $(this));
		});
		$(document).on("change", "[data-weblogselect]", function(e){
			_private.processWeblogEvnt("data-weblogselect", $(this));
		});
	});
	
	return _public;
})();