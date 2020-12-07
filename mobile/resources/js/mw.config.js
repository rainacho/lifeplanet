/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.config.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 configration 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2014-11-20		initial version
 * ========================================================================== */

/**
 * 클라이언트의 각종 설정 값들의 집합
 */
var config = (function() {
	var _public = {};
	var _private = {};
	
	//=====================================================================
	// 공통 설정 값 START
	// * config 외부에서 변경할 수 없도록 private 으로 설정됨 *
	//=====================================================================
	
	// 에러 로그 사용 여부 (true / false)
	_private.errorLoggerEnable = true;
	
	/**
	 * 서버 상태 체크
	 */
	_private.getServerStatus = function() {
		
		var host = location.host;
		
		if ( host.indexOf('127.0.0.1') > -1 
		  || host.indexOf('localhost') > -1
		  || host.indexOf('192.168') > -1) {
			return 'LOCAL';
		} else if (host.indexOf('10.65.2.105') > -1
				|| host.indexOf('mwd.lifeplanet.co.kr') > -1) {
			return 'DEV';
		} else if (host.indexOf('10.65.4.115') > -1
				|| host.indexOf('mwt.lifeplanet.co.kr') > -1) {
			return 'TEST';
		} else if (host.indexOf('10.60.20.153') > -1
				|| host.indexOf('m.lifeplanet.co.kr') > -1) {
			return 'PROD';
		}
	};
	
	/**
	 * 서버 URL 반환
	 * */
	_private.getServerUrl = function () {
		
		var _serverUrlMapper = {
			'LOCAL' : 'http://localhost',
			'DEV' 	: 'http://mwd.lifeplanet.co.kr',
			'TEST' 	: 'https://mwt.lifeplanet.co.kr:444',
			'PROD' 	: 'https://m.lifeplanet.co.kr:444'
		}
		, serverStatus = _private.getServerStatus ()
		, serverUrl = _serverUrlMapper[ serverStatus ];
		
		return serverUrl;
	};
	
	if(_private.getServerStatus() == 'PROD') {
		
		// 로그 사용 여부 (true / false)
		_private.loggerEnable = true;
		
		// 인증서 모듈(Appfree or XecureSmart) 실행 여부
		_private.excuteCertModule = true;
		
		// 인증서 정합성 체크 여부 (인증서 모듈이 실행되지 않으면 무시됨)
		_private.validExecuteFlag = true;

		// 본인인증 체크 여부 ( 체크하지 않을 경우 패스 모듈 동작 )
		_private.personalCertFlag = true;

	} else if(_private.getServerStatus() == 'TEST') {
		
		// 로그 사용 여부 (true / false)
		_private.loggerEnable = true;
		
		// 인증서 모듈(Appfree or XecureSmart) 실행 여부
		if(location.pathname.indexOf("/mypage/") > -1){
			_private.excuteCertModule = false;	
		}else{
			_private.excuteCertModule = true;
		}
		
		// 인증서 정합성 체크 여부 (인증서 모듈이 실행되지 않으면 무시됨)
		_private.validExecuteFlag = true;

		// 본인인증 체크 여부 ( 체크하지 않을 경우 패스 모듈 동작 )
		_private.personalCertFlag = true;

	} else if(_private.getServerStatus() == 'DEV') {
		
		// 로그 사용 여부 (true / false)
		_private.loggerEnable = true;
		
		// 인증서 모듈(Appfree or XecureSmart) 실행 여부
		_private.excuteCertModule = true;
		
		// 인증서 정합성 체크 여부 (인증서 모듈이 실행되지 않으면 무시됨)
		_private.validExecuteFlag = true;

		// 본인인증 체크 여부 ( 체크하지 않을 경우 패스 모듈 동작 )
		_private.personalCertFlag = true;

	} else {
		
		// 로그 사용 여부 (true / false)
		_private.loggerEnable = true;

		// 인증서 모듈(Appfree or XecureSmart) 실행 여부
		_private.excuteCertModule = true;
		
		// 인증서 정합성 체크 여부 (인증서 모듈이 실행되지 않으면 무시됨)
		_private.validExecuteFlag = true;

		// 본인인증 체크 여부 ( 체크하지 않을 경우 패스 모듈 동작 )
		_private.personalCertFlag = true;

	}
	
	
	// (예제) Context 값
	_private.context = 'CONTEXT';
	
	//=====================================================================
	// 공통 설정 값 END
	//=====================================================================
	
	/**
	 * 설정명을 통하여 설정값을 취득하는 함수
	 */
	_public.getEnv = function(configName) {
		return _private[configName];
	};
	
	return _public;
})();

/**
 * 클라이언트의 각종 상수의 집합
 */
var constants = (function() {
	var _public = {};
	var _private = {};
	
	//=====================================================================
	// 상수값 START
	// * constants 외부에서 변경할 수 없도록 private 으로 설정됨 *
	//=====================================================================
	
	// Command Parameter 정의 : tradeKey로 사용된다.
	_private.CREATE 	= 'create'; 	// 생성
	_private.RETRIEVE 	= 'retrieve';	// 조회
	_private.UPDATE 	= 'update';		// 수정
	_private.DELETE 	= 'delete';		// 삭제
	_private.SAVE 		= 'save';		// 저장
	
	//=====================================================================
	// 상수값 END
	//=====================================================================
	
	/**
	 * 설정명을 통하여 설정값을 취득하는 함수
	 */
	_public.getVal = function(constantsName) {
		return _private[constantsName];
	};
	
	return _public;
})();