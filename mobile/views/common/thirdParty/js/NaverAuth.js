/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 이현민, hminlee@lifeplanet.co.kr
 * FILE INFO   : NaverAuth, common/thirdParty/js/
 * DESCRIPTION : 네이버인증 공통모듈 
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 이현주  	2020-10-21		initial version
 * ========================================================================== */

/**
 * 네이버인증 관련 메소드 집합
 */
var NaverAuth = (function(data) {
	var _public = {};
	var _private = {};
	var successCB = null;
	var failCB = null;
	var inSData;
		
	_public.naverAuthType = {
		LOGIN : 1,	// 로그인
		SUCO: 2,	// 청약
		PRS : 3 	// 유지
	};

	
	/**
	 * 네이버인증 요청 api
	 * @param 
	 * Json data
	 *   String isTest 테스트 여부(Y/N) (테스트 코드로 삭제 예정)
	 *   String hpNo 휴대폰번호 (카카오페이 계정)
	 *   String cstHanName 주문자 성명
	 *   String encrPsno 암호화된 주민번호
	 *   String signData 전자서명 데이터
	 *   String regiHpNo 휴대폰번호 (홈페이지에 가입된) - type=로그인(1)일 때 (테스트 코드로 삭제 예정)
	 * function successCallback
	 * function failCallback
	 * 
	 */
	_public.request = function(data, successCB, failCB) {
		NaverAuth.inSData = {};
		NaverAuth.successCB = successCB;
		NaverAuth.failCB = failCB;	
		var isValid =  _private.isValidCheck(data);
		
		if(MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) { 
			NaverAuth.requstNativeApp(data);
		} else {
		
			
			if(isValid) {
				var openVar = window.open();
				_private.transAction("retrieveEst", data, 
					function(outData){
						var oData = outData.outData;
						if(oData != undefined) {
							var openUrl = oData.openUrl;
							openVar.location = openUrl;
						} else {
							alert('네이버인증이 실패하였습니다.\n계속 발생시 고객센터로 문의해주세요.(Tel 1566-0999)');
						}
					}, 
					failCB);
			}
		}
		
	};

	/**
	 * 네이버인증 검증 
	 * 
	 * @param 
	 * Json data
	 *   String type 로그인(1) / 청약(2) / 유지(3)
	 *   String psno 주민번호 - type=청약(2)일 때
	 * function successCallback
	 * function failCallback
	 * 
	 */
	
	_public.recvTxId = function(txId) {
		var data = {};
		data.txId = txId;
		NaverAuth.inSData = $.extend(NaverAuth.inSData, data);
		_private.transAction("verifyAuth", NaverAuth.inSData, NaverAuth.successCB, NaverAuth.failCB);
	};
	
	/**
	 * NativeApp인경우 App to App방식으로 네이버인증 요청 
	 */
	_public.requstNativeApp = function(data) {
		Mxp.exec(null, null, 'LifeplanetPlugin', 'requestNaverAuth', [data]);
	};
	
	/**
	 * Native App에서 Naver 인증 처리 완료 후 처리되는 함수 
	 */
	_public.onResultNativeApp = function(data) {
		var outData = {};
		console.log('NaverAuth onResultNativeApp:' + JSON.stringify(data));
		outData.outData = data;
		_private.transAction("setSessionDt", outData.outData, 
			function() {
				NaverAuth.successCB(outData);
			}, NaverAuth.failCB);

	};
	
	/**
	 *  네이버 인증 공통 에러처리 함수 
	 */
	_public.onFailResult = function(data) {
		var oData = data.outData;
		var errMsg = oData.ERROR_MSG;
		if (errMsg) {
			alert (errMsg);
		}
	};
	
	
	/**
	 * ajax 통신 함수
	 */
	_private.transAction = function(tradeKey, param, successCB, failCB) {
		var successCallback = function(data) {	
			successCB(data);
		};
		
		var failureCallback = function(data) {			
			if (failCB != undefined) {
				failCB(data);
			} else {
				var oData = data.outData;
				if (oData.errorMsg != undefined) {
					alert(oData.errorMsg);
				}
			}
		};	
		
		param.authType = NaverAuth.naverAuthType;
		var tranProp = util.clone(transaction.TRAN_COMM_PROP); 
		tranProp.url = '/common/thirdParty/NaverAuthResult';
		tranProp.tradeKey = tradeKey; 
		tranProp.params = param; 
		tranProp.success = successCallback;
		tranProp.failure = NaverAuth.onFailResult;
		transaction.callTran(tranProp);
			
	};
	
	_private.isValidCheck = function(data) {
		//청약인경우 필수 파라미터 체크 
		if(NaverAuth.naverAuthType == NaverAuth.naverAuthType.SUCO) {
			if(util.isNull(data.hpNo) || util.isNull(data.cstHanName) || util.isNull(data.encrPsno) || util.isNull(data.signData)) {
				alert('필수입력값이 존재하지 않습니다.\n계속 발생시 고객센터로 문의해주세요.(Tel 1566-0999)');
				return false;
			}
			
		} else if(NaverAuth.naverAuthType == NaverAuth.naverAuthType.PRS) {
			if(util.isNull(data.signData)) {
				alert('필수입력값이 존재하지 않습니다.\n계속 발생시 고객센터로 문의해주세요.(Tel 1566-0999)');
				return false;
			}
		}
		NaverAuth.inSData = data;
		return true;
	};
	

		
	
	return _public;

})();