/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.mxp.constants.js, /resources/js/mxp/
 * DESCRIPTION : MXP 모듈에서 사용하는 상수값 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2015-02-05		initial version
 * ========================================================================== */

/**
 * MXP Plugin 상수값
 */
var MXP_PLUGIN_CONST = (function() {
	var _public = {};
	var _private = {};
	
	var rprotcl = "https://";
	var rhpdmin	= "www.lifeplanet.co.kr";
	
	_private.Options = {
		DEV				: false,				//개발여부
		HOST 			: '',
	    G_INIT_SCR		: 'MBAA00S0',
	    G_CUR_SCR 		: '',
	    G_CUR_PATH 		: '',
	    PARAM			: {},					//parameters
	    CERTNAME		: '',					//발급기관 목록
	    XGATEADDR 		: '',					//암호화	
	    XGATE_PORT		: ':3443:38080',		//xgate port
		CERT_GET_ADDR	: '', 					//공인인증서 중계서버
		CERT_PORT		: '10500',				//공인인증서 중계포트
		CERTIFICATE     : '',
		HOMEPAGE		: rprotcl + rhpdmin,
		WEBTOONURL		: rprotcl + rhpdmin,
		CALLCENTER		: '1566-0999',
		CALLTITLE		: '라이프플래닛 고객센터',
		APPSHIELD		: ''
	};
	
	_public.messages = {
		title : '라이프플래닛',
		loading : '잠시만 기다려주십시오.',
		notfoundError : '요청한 페이지를 찾을 수 없습니다.',
		unauthorisedAccessError : '모든 정보는 안전하게 보관되며,\n인증받지 않은 접근은 차단합니다.',
		networkError : '서버와 연결하지 못했습니다.\n네트워크가 연결되어 있는지 확인하십시오.',
		requestTimeout : '서버로부터 응답이 없습니다.\n잠시 후 다시 시도하여 주십시오.',
		requestTimeoutInvokeProcedure : '서버로부터 응답이 지연되었습니다.\n잠시 후 다시 시도하여 주십시오.',
		unresponsiveHost : '서버로부터 응답이 없습니다.\n잠시 후 다시 시도하여 주십시오.',
		transactionFail : '서비스가 지연되고 있습니다.\n잠시 후 다시 시도하여 주십시오.',
		wasError : '서비스가 지연되고 있습니다.\n잠시 후 다시 시도하시기 바랍니다.',
		unexpectedError : '서비스에 불편을 드려 죄송합니다.\n잠시 후  다시 시도하여 주십시오.',
		informNotReady : '서비스 준비 중입니다.',
		informExit : '라이프플래닛을 종료합니다.',
		mTranKeyException : '보안키패드를 처리하기 위한 세션이 종료되었습니다.\n다시 한번 시도해주시기 바랍니다.',
		failtocertificate : '본인 인증을 처리하는데\n실패하였습니다.',
		rootDevice : '고객님의 기기는 탈옥(루팅)된 기기이므로\n사용할 수 없습니다.',
		informAlert : '경고'
	};
	
	/**
	 * version    : 앱 업데이트해야하는 최소버전 
	 * newVersion : 릴리즈된 최신버전(모바일앱 설정[MWCC500S1] 앱업데이트에 사용) 
	 * ***** 앱업데이트 하면 무조건 newVersion을 수정해줘야함 *******
	 * 
	 */
	_public.store = {
	    android : {
	    	version : '6.0.0',
	    	newVersion : '6.0.0',
	    	url : 'https://play.google.com/store/apps/details?id=com.kyobo.lifeplanet.insurance',
	    	message : '라이프플래닛 어플리케이션이\n업데이트 되었습니다.\n업데이트를 위해\nplay 스토어로 이동하시겠습니까?',
	    	stopMessage : '라이프플래닛 어플리케이션이 업데이트 되었습니다.\n안드로이드 운영체제(OS) 5.0버전 미만의 경우 서비스 지원 중단으로 업데이트가 불가능합니다.\n운영체제 버전 확인 후 어플리케이션을 다운로드해주시기 바랍니다.'
	    },
	    ios : {
	    	version : '4.4.0',
	    	newVersion : '4.4.0',
	    	url : 'http://itunes.apple.com/app/laipeupeullaenis-seumateuseobiseu/id840637440?mt=8',
	    	message : '라이프플래닛 어플리케이션이\n업데이트 되었습니다.\n업데이트를 위해\n앱스토어로 이동하시겠습니까?\n\niOS11이상에서는 앱스토어의 업데이트 화면을\n하단으로 쓸어내리면\n 업데이트 정보의 갱신이 이루어집니다.'
	    }
	};
	
	_public.OS = {
		// Device 별 OS 선언
	    'IOS'       : 'ios',
	    'ANDROID' : 'android',
	    'PREVIEW'   : 'preview'
	};
	
	_public.ACCESS_PATH = {
			
		// APP 버전
	    'APP_IOS'   	: 'APP_IOS',
	    'APP_ANDROID'   : 'APP_ANDROID',
	    
	    // WEB 버전
	    'WEB_IOS'   	: 'WEB_IOS',
	    'WEB_ANDROID'   : 'WEB_ANDROID',
	    'WEB_PC'   		: 'WEB_PC',
	    	
	    'APP' : 'APPLICATION',
	    'WEB' : 'WEB_BROSWER'
			
	};
	
	_public.getConfiguration = function(option) {
		
		return _private.Options[option];
	};
	
	_public.setConfiguration = function(platform) {
	
		var rdomain = 'm.lifeplanet.co.kr'; // 운영 도메인
		var veridomain = 'veriapp.lifeplanet.co.kr'; // 앱위변조확인 도메인
		//var veridomain = 'm.lifeplanet.co.kr'; // 앱위변조확인 도메인
		var devip 	= '10.65.2.105';
		var host 	= window.location.host;
		var protocol= window.location.protocol + '//';
		var mbport 	= '';
		var issuers = 'yessignCA,yessignCA Class 1,yessignCA Class 2,'							+
					  'signGATE CA,signGATE CA2,signGATE CA4,signGATE CA5,'					    +
					  'SignKorea CA,SignKorea CA2,SignKorea CA3,'   						    +	 
					  'CrossCertCA,CrossCert Certificate Authority,CrossCertCA2,CrossCertCA3,'	+
					  'TradeSignCA,TradeSignCA2,TradeSignCA3,'									+
					  'NCASign CA,NCASignCA'													;
					  

		if (host.indexOf(':')!=-1 ) {
			var tmp = host.split(':');
			host 	= tmp[0];
			mbport	= ':' + tmp[1];
		}
			
		var xas  	  = '/xasserver/';
		var xasport   = ':80';
		var xastranid = 'xasservice.do';
		var xasprotcl = 'http://';
		var devxasport   = ':8888';
		var secondaryveridomain = '10.60.20.153';
		var secondaryxasport   = ':8888';
		var secondaryxas = '/xasserver';
	
		
		if ( host.indexOf(rdomain)!=-1 ) { //운영
			_private.Options.CERTNAME 		= issuers;
			_private.Options.XGATEADDR		= rdomain + _private.Options.XGATE_PORT; 
			_private.Options.CERT_GET_ADDR 	= rhpdmin;
			//내부망일경우 앱위변조 오류로 인해 800포트로 강제로 설정 
			if(isInternalNetwork == true) {
				xasport = ':800';
			}
			if ( platform == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS ) {
				_private.Options.APPSHIELD	= xasprotcl + veridomain + xasport + xas + xastranid;
			} else if ( platform  == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID ) {
				_private.Options.APPSHIELD	= xasprotcl + veridomain + xasport + xas;
			}
	
			//AppShield 2차 검증 url
			_private.Options.XASSECONDCHECKURL	= xasprotcl + secondaryveridomain + secondaryxasport + secondaryxas;
		} else { //개발
			_private.Options.CERTNAME 		= issuers + ',yessignCA-Test Class 1,yessignCA-TEST';
			_private.Options.XGATEADDR		= host + _private.Options.XGATE_PORT;
			_private.Options.CERT_GET_ADDR	= host;
			
			if ( platform == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS ) {
				_private.Options.APPSHIELD	= xasprotcl + devip + devxasport + xas + xastranid;
			} else if ( platform  == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID ) {
				_private.Options.APPSHIELD	= xasprotcl + devip + devxasport + xas;
			}
			//AppShield 2차 검증 url
			_private.Options.XASSECONDCHECKURL = xasprotcl + devip + devxasport + xas;
		}

		_private.Options.HOST				= protocol + host + mbport + '/';
		
		return _private.Options;
	}; 
	
	return _public;
})();