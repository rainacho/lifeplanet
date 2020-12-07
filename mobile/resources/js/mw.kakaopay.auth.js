/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 이현주, leehyunju@lifeplanet.co.kr
 * FILE INFO   : mw.kakaopay.auth.js, /resources/js/
 * DESCRIPTION : 카카오페이 인증에서 사용하는 모듈
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 이현주  	2019-11-26		initial version
 * ========================================================================== */

/**
 * 카카오페이인증 관련 메소드 집합
 */
var KAKAOPAY_AUTH = (function(data) {
	var _public = {};
	var _private = {};
	
	_public.kakaopayAuthType = {
		LOGIN : 1,	// 로그인
		SUCO: 2,	// 청약
		PRS : 3 	// 유지
	};

	
	/**
	 * 카카오페이 서명요청 api
	 * @param 
	 * Json data
	 *   String isTest 테스트 여부(Y/N) (테스트 코드로 삭제 예정)
	 * 	 String type 로그인(1) / 청약(2) / 유지(3)
	 *   String hpNo 휴대폰번호 (카카오페이 계정)
	 *   String cstHanName 주문자 성명
	 *   String encrPsno 암호화된 주민번호
	 *   String signData 전자서명 데이터
	 *   String regiHpNo 휴대폰번호 (홈페이지에 가입된) - type=로그인(1)일 때 (테스트 코드로 삭제 예정)
	 * function successCallback
	 * function failCallback
	 * 
	 */
	_public.request = function(data, successCB, failCB){
		_private.transAction("request", data, successCB, failCB);
		
	};

	
	/**
	 * 카카오페이 서명인증 api
	 * 
	 * @param 
	 * Json data
	 *   String type 로그인(1) / 청약(2) / 유지(3)
	 *   String psno 주민번호 - type=청약(2)일 때
	 * function successCallback
	 * function failCallback
	 * 
	 */
	_public.verify = function(data, successCB, failCB) {
		_private.transAction("verify", data, successCB, failCB);
	};
	
	
	
	/**
	 * 카카오페이 인증 후 로그인 프로세스
	 * 
	 * @param 
	 * Json data
	 * function successCallback
	 * function failCallback
	 * 
	 */
	_public.kakaopayLogin = function(data, successCB, failCB) {
		_private.transAction("kakaopayLogin", data, successCB, failCB);
	};
	
	
	
	/**
	 * ajax 통신 함수
	 */
	_private.transAction = function(tradeKey, param, successCB, failCB) {
		
		var successCallback = function(data) {
			if(param.type == _public.kakaopayAuthType.LOGIN  && tradeKey == "verify") { // 로그인-인증 단계 (성공)
				// 웹로그
				if(typeof webLog != "undefined"  ) {
					webLog.runDsLoginFunc('14', 'success');
				}
			}
			
			if(param.type == _public.kakaopayAuthType.SUCO && tradeKey == "verify") { // 청약-인증 단계 (성공)
				// global 변수에 signData 값 저장
				var signedData = data.outData.frbuAhrzDalReqRslt[0].nonRepTknText;
				globalVar.setParam('kakaopayAuthSignedData', signedData);
			} 
			
			successCB(data);
		};
		
		var failureCallback = function(data) {
			if(param.type == _public.kakaopayAuthType.LOGIN  && tradeKey == "verify") { // 로그인-인증 단계 (성공)
				// 웹로그
				if(typeof webLog != "undefined"  ) {
					webLog.runDsLoginFunc('14', 'fail');
				}				
			}
			
			
			if (failCB != undefined) {
				failCB(data);
			
			} else {
				var oData = data.outData;
				if (oData.errorMsg != undefined) {
					alert(oData.errorMsg);
				}
			}
		};	
		

		var tranProp = util.clone(transaction.TRAN_COMM_PROP); 
		tranProp.url = '/common/thirdParty/KAKAOPayAuth';
		tranProp.tradeKey = tradeKey; 
			
//		if('1' == param.type) { // 추후 로그인의 경우 service code S315 사용할 예정 
//			param.serviceCode = "S315";
//		} else {
		param.serviceCode = "S310";
//		}
		
		tranProp.params = param; 
		tranProp.success = successCallback;
		tranProp.failure = failureCallback;
		tranProp.blockingFlag = true;
		transaction.callTran(tranProp);
			
	};
	
	
	
	return _public;

})();