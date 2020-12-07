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
	
	// 로그 사용 여부 (true / false)
	_private.loggerEnable = false;
	
	// 에러 로그 사용 여부 (true / false)
	_private.errorLoggerEnable = false;
	
	// 인증서 스킵 여부 (개발/테스트 에서만 사용!)
	_private.isTest = false;
	
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