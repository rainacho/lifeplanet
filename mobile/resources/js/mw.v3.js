/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 이현주, leehyunju@lifeplanet.co.kr
 * FILE INFO   : mw.v3.js, /resources/js/
 * DESCRIPTION : V3 실행 모듈
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 이현주  	2020-02-03		initial version
 * ========================================================================== */

/**
 * V3 관련 메소드 집합
 *
 */
var V3 = (function(data) {
	var _public = {};
	var _private = {};
	
	_public.keepAliveIntervalId = null;
	_public.retryCount;
	
	/**
	 * V3 실행 초기화
	 * @param boolean setTouchEvent
	 */
	_public.init = function(setTouchEvent) {
			console.log("[V3]   init");
			
//			if (remoteAddr == '223.38.54.128' || remoteAddr == '223.38.54.98' || remoteAddr == '39.7.48.21' || remoteAddr == '117.111.23.189' || 
//					 remoteAddr == '116.122.149.2' || remoteAddr == '223.38.54.27' || remoteAddr == '117.111.20.155' 
//			) {
				
				MXP_PLUGIN_CONST.setConfiguration(MXP_PLUGIN.getOSInfo().name);
				if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID && navigator.userAgent.indexOf('MXP') < 0) { 
				
					var v3Run = sessionStorage.getItem("V3Run");
					console.log("v3Run " + v3Run);
					
					Main.offLoading();
					_public.retryCount = 0;
				
					if (sessionStorage.getItem("V3Run") === "Y") { // V3 실행중
						_public.setKeepAliveState("Y");
						
					} else { // V3 실행중 아님
						// Chrome 자체 버그로 인해 touch 이벤트 이후 V3 실행되도록 수정
						if(setTouchEvent) {
							$(document).on('touchstart.v3', function() {
								$(window).unbind('beforeunload');
								$(document).off('touchstart.v3');
									
								_public.start();
							});
							
						} else {
								$(window).unbind('beforeunload');
								$(document).off('touchstart.v3');
									
								_public.start();
									
						}
					}
					
				}
//			}
		
	};
	
	
	/**
	 * V3 실행 요청
	 * 
	 */
	_public.start = function() {
		
		try{
		    $.ajax({type   : "POST"
		      ,async       : true //비동기방식
		      ,url         : "/common/thirdParty/V3.ajax"
		      ,dataType    : "json"
		      ,data        : {"tradeKey" :"getAuthKey"  }
		      ,error       : function(data){ //통신 에러 발생시 처리
		      }
		      ,success     : function(data){ //통신 성공시 처리
				   console.log("[V3]   start");
				    
				   _public.setKeepAliveState("N");
					mpl_start(data.result.outData.authkey, data.result.outData.tmstmp);
		      }
		   });
		}catch(e){_public.setErrorLog("mpl_start", e);}		
		
		
	};
	
	
	/**
	 * V3 앱 실행 유지
	 * 	
	 */
	_public.keepAlive = function() {
		try {
			console.log("[V3]   keepAlive");

			var token = mpl_token();
			var cd = mpl_enc_param();
			mpl_load(token, cd);
		
		} catch(e) {
			_public.setErrorLog("mpl_load", e);
				
		}
	};
	
	
	/**
	 * V3 실행 유지 등록/해제
	 * 
	 * @param String type 등록 Y / 해제 N
	 */
	_public.setKeepAliveState = function(type) {
		
		if(type == "N") {	// 해제
			if(_public.keepAliveIntervalId) {
				clearInterval(_public.keepAliveIntervalId);
				_public.keepAliveIntervalId = null;
			}
			
		} else if(type == "Y") {	// 등록
			if(!_public.keepAliveIntervalId) {
				_public.keepAlive();
				_public.keepAliveIntervalId = setInterval(V3.keepAlive, 10000);
			 }
		} 

	}
 
	

	/**
	 * V3 종료 요청
	 */
	_public.stop = function() {
		try {
			console.log("[V3]   stop");

			_public.setKeepAliveState("N");
			mpl_stop();

		} catch(e) {
			_public.setErrorLog("mpl_stop", e);
		}
		
	};
	

	/**
	 * 에러 로그 출력
	 * @param String error_msg 에러메세지 
	 */
	_public.setErrorLog = function(errorType, errorMsg) {
		if (logger.logEnabled()) {
			logger.log('[ V3 ERROR ]');
			logger.log(errorType);
			logger.log(errorMsg);
		}
	};
	
	
	/**
	 * V3 인증키 생성
	 */
	_private.getAuthKey = function(callback) {
		var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
		tranProp.url        = '/common/thirdParty/V3';           		// 트랜잭션 Url
		tranProp.tradeKey   = 'getAuthKey';       						// 트랜잭션 TradeKey
		tranProp.blockingFlag = false;                             		// 트랜잭션 로딩창
		tranProp.success    = callback;

		transaction.callTran(tranProp);
		
	};
	
	return _public;

})();



/**
 * V3 mpl_start 요청 후 받는 callback 
 * 
 * @param int res_code: XHR(XML Http Response)
 * @param int res_dtl: AhnLab Response
	[EXTERNAL]
	0 SUCCESS
	70 HTTP REQUEST SENDING FAILED
	71 HTTP REQUEST SENDING FAILED WHEN INITIALIZING
	72 HTTP REQUEST SENDING FAILED WHEN CONNECTING
	73 HTTP REQUEST SENDING FAILED WHEN SENDING WEB_STATUS
	83 STATUS_NOT_EXIST - 통신 에러 or 미설치
	99 UNKNOWN_ERROR
*/
function _callback_ahnlab(res_code, res_dtl) {
	console.log("[V3]   _callback_ahnlab");
	console.log(res_code);
	console.log(res_dtl);
	
	
	if(res_code == 200 && res_dtl == 0) { // 정상 케이스
		
		sessionStorage.setItem("V3Run", "Y");
		V3.setKeepAliveState("Y");	// V3 실행 유지
	
	} else { // 실패 케이스
		sessionStorage.setItem("V3Run", "N");
		V3.setKeepAliveState("N");
		
		V3.setErrorLog("_callback_ahnlab", res_code + " " + res_dtl);
		
		if(res_code != 200) {	// XHR 에러 - res_dtl 70, 71, 72, 73 
			
			
		} else {	// V3 에러 - res_dtl 83, 99
			switch(res_dtl) {
				case 83:	// 미설치 또는 통신에러
//					if (V3.retryCount < 3) {
//						V3.retryCount++;
//						V3.start();
//					}
					break;
					
				default:	
					break;
			}
		}
	
	}
};






