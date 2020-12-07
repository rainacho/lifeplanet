/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 최용성, mogmog83@lifeplanet.co.kr
 * FILE INFO   : mw.delfino.js, /resources/js/
 * DESCRIPTION : delpino(공인인증모듈) 관련 스크립트 영역
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 최용성  	2015-08-27		initial version
 * ========================================================================== */

/*******************************************************************************
*  공통 전역 변수 선언부                                                       *
********************************************************************************/
var certType  = ""; // 인증구분(업무)
var loginType = "";	// 로그인타입
var callBack; 		// 콜백함수 
var widAgrEvdnDatm;

var testType  = ""; // 테스트 서버에서 접속했을 경우 공인인증 유효성 체크를 무시하기 위한 변수

var psno = "0000000000000";	// 주민등록번호

/*******************************************************************************
*  함수 선언부                                                                 *
********************************************************************************/
/**
 * 홈페이지 로그인 페이지에서 사용하는 함수
 * HPGA01S0에서 사용
 * 주민등록 번호를 서버에서 확인할 경우
 * 서명값 && 주민번호 && VID
 * 사용법 arg1 : 서명필드 object(없을경우 "")
 *      arg2 : 콜백함수
 *      certType : "00" -> 홈페이지
 *      loginType : "CERT" -> 공인인증 로그인(계약회원) 
 */
var fn_cert_rrn_vid_Login = function(arg1, arg2) {
	
	testType   = "R";	
	certType   = "00";
	loginType  = "CERT";
	callBack   = arg2; 
	
	
	Delfino.login("login=vidLogin", cert_callback);
	
};

/**
 * 서명값 && VID (관리자)
 * 사용법  arg1 : 서명값 필드 Object
 *       arg2 : 콜백함수
 *       certType : "02" -> 관리자 
 */
var fn_cert_vid = function(arg1, arg2) {
	
	certType   = "02";
	loginType  = "CERT";
	callBack   = arg2; 

	
	Delfino.login("login=vidLogin", cert_callback);
	
};

/**
 * 주민등록 번호를 서버에서 확인할 경우(홈페이지) - 로그인 외 사용
 * 서명값 && 주민번호 && VID
 * 사용법 arg1 : 서명필드 object(없을경우 "")
 *      arg2 : 콜백함수
 *      certType : "00" -> 홈페이지
 *      loginType : "ETC" -> 로그인 외에서 공인인증(예 : 마이페이지)  
 */
var fn_cert_rrn_vid = function(arg1, arg2) {
	
	/* todo.. 테스트 서버 공인인증 무시.. 실제 운영시 삭제*/
	var pass_url = location.href;
	if (pass_url.match("hpt.lifeplanet.co.kr")
			|| pass_url.match("hpd.lifeplanet.co.kr")
			|| pass_url.match("localhost:8080")) {
			
			testType   = "T";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
		}else{
			testType   = "R";	
		}
	
	certType   = "00";
	loginType  = "ETC";
	callBack   = arg2; 

	
	 if(pinURLChk() && vPinLogin == "Y"){ //핀인증으로 로그인 했을때
		 runPinCertification(callBack , null);
		 return;
	 }else if(vFpLogin == "Y" && pinURLChk()){ //지문인증으로 로그인 했을때
		 runFpCertification(callBack , null);
		 return;
	 }else if(vNaverLogin == "Y" && pinURLChk()){ //네이버인증으로 로그인 했을때
		 runNaverCertification(callBack , null);
		 return;
	 }
	
	
	Delfino.login("login=vidLogin", cert_callback);
	
};

/**
 * 주민등록 번호를 서버에서 확인할 경우(홈페이지 -고객센터 -건강검진표 제출)
 * 서명값 && 주민번호 && VID
 * 사용법 arg1 : 서명필드 object(없을경우 "")
 *       arg2 : 콜백함수
 *       arg3 : 주민등록번호
 *       certType : "04" -> 고객센터
 */
var fn_cert_rrn_vid_psno = function(arg1, arg2, arg3) {
	
	var pass_url = location.href;
	if(pass_url.match("hpt.lifeplanet.co.kr") || pass_url.match("hpd.lifeplanet.co.kr") || pass_url.match("localhost")){
		testType ="T";
	}else{
		testType   = "R";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}
	
	certType  = "04";
	loginType = "ETC";
	callBack  = arg2; 
	
	if(arg3 != undefined){
		psno = arg3;
	}
	
	
	 if(pinURLChk() && vPinLogin == "Y"){ //핀인증으로 로그인 했을때
		 runPinCertification(callBack , null);
		 return;
	 }else if(vFpLogin == "Y" && pinURLChk()){ //지문인증으로 로그인 했을때
		 runFpCertification(callBack , null);
		 return;
	 }else if(vNaverLogin == "Y" && pinURLChk()){ //네이버인증으로 로그인 했을때
		 runNaverCertification(callBack , null);
		 return;
	 }
	
	
	Delfino.login("login=vidLogin", cert_callback);

};

/**
 * 주민등록 번호를 서버에서 확인할 경우(청약) - 연금저축 제외
 * 서명값 && 주민번호 && VID
 * 사용법 arg1 : 서명필드 object(없을경우 "")
 *      arg2 : 콜백함수
 *      certType : "01" -> 청약(연금저축 제외)
 *      loginType : "CERT" -> 공인인증 로그인(계약회원)
 */
var fn_subscribe_rrn_vid = function(arg1, arg2) {
	
	var pass_url = location.href;
	if(pass_url.match("hpt.lifeplanet.co.kr") || pass_url.match("hpd.lifeplanet.co.kr")){
		testType   = "T";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}else{
		testType   = "R";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}
	
	var argVal = "";

	if(arg1 != ""){
		argVal = arg1.val();
	}
	
	certType  = "01";
	loginType = "CERT"; //청약 완료 후 로그인
	callBack  = arg2;
	
	//Delfino.login("login=vidLogin", cert_callback);
	
	 if(pinURLChk() && vPinLogin == "Y"){ //핀인증으로 로그인 했을때
		 runPinCertification(callBack , null);
		 return;
	 }else if(vFpLogin == "Y" && pinURLChk()){ //지문인증으로 로그인 했을때
		 runFpCertification(callBack , null);
		 return;
	 }else if(vNaverLogin == "Y" && pinURLChk()){ //네이버인증으로 로그인 했을때
		 runNaverCertification(callBack , null);
		 return;
	 }
	
	
	Delfino.sign(argVal, cert_callback, {resetCertificate:true, cacheCert:true}); 
	
};

var fn_subscribe_rrn_Psno = function(arg1, arg2) {
	
	var pass_url = location.href;
	if(pass_url.match("hpt.lifeplanet.co.kr") || pass_url.match("hpd.lifeplanet.co.kr")){
		testType   = "T";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}else{
		testType   = "R";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}
	
	certType   = "03";
	
	if(globalVar.getParam("PSNO2id")!=undefined ){
		if($("#Tk_"+globalVar.getParam("PSNO2id")+"_checkbox").is(":checked")){
			var tmpObj={};
			tmpObj.jumin2=globalVar.getParam("PSNO2id");
			certType+=getTransKeyFnc("STR",tmpObj,"");
		}else{
			certType +="&e2e_data1="+astxE2eTmp;
		}
		certType +="&PSNO2id="+globalVar.getParam("PSNO2id")+"&PSNO1="+globalVar.getParam("PSNO1"); 	
	}else if(globalVar.getParam("PSNO")!=undefined){
		certType +="&PSNO="+globalVar.getParam("PSNO");
	}
	
	var argVal = "";
	
	if(arg1 != ""){
		argVal = arg1.val();
	}
	
	callBack   = arg2;
	
	 
	
	
	
	 if(pinURLChk() && vPinLogin == "Y"){ //핀인증으로 로그인 했을때
		 runPinCertification(callBack , null);
		 return;
	 }else if(vFpLogin == "Y" && pinURLChk()){ //지문인증으로 로그인 했을때
		 runFpCertification(callBack , null);
		 return;
	 }else if(vNaverLogin == "Y" && pinURLChk()){ //네이버인증으로 로그인 했을때
		 runNaverCertification(callBack , null);
		 return;
	 }
	
	
	Delfino.sign(argVal, cert_callback, {resetCertificate:true, cacheCert:true}); 
	
};



//인수특약신청 dn 값 추출로 인한 testType을 무조건 R로
var fn_subscribe_rrn_vid_hpmb = function(arg1, arg2) {
	
	var pass_url = location.href;
	if(pass_url.match("hpt.lifeplanet.co.kr") || pass_url.match("hpd.lifeplanet.co.kr")){
		testType   = "T";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}else{
		testType   = "R";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}
	
	var argVal = "";

	if(arg1 != ""){
		argVal = arg1.val();
	}
	
	certType  = "03";
	loginType = "CERT"; //청약 완료 후 로그인
	callBack  = arg2;
	
	//Delfino.login("login=vidLogin", cert_callback);
	
	 if(pinURLChk() && vPinLogin == "Y"){ //핀인증으로 로그인 했을때

		 if(argVal != ""){
			 runPinCertification(callBack , {"noEvidenceSignData" :argVal});
		 }else{
			 runPinCertification(callBack , null);
		 }
		 
		 
		 return;
	 }else if(vFpLogin == "Y" && pinURLChk()){ //지문인증으로 로그인 했을때
		 runFpCertification(callBack , null);
		 return;
	 }else if(vNaverLogin == "Y" && pinURLChk()){ //네이버인증으로 로그인 했을때
		 runNaverCertification(callBack , null);
		 return;
	 }
	
	Delfino.sign(argVal, cert_callback, {resetCertificate:true, cacheCert:true}); 
	
};

/**
 * 주민등록 번호를 서버에서 확인할 경우(청약 - 연금 저축 - 납입 한도 조회)
 * 서명값 && 주민번호 && VID
 * 사용법 arg1 : 서명필드 object(없을경우 "")
 *      arg2 : 콜백함수
 *      certType : "03" -> 청약(연금저축 - 납인한도 조회)
 *      PSNO : 주민등록번호
 */
var fn_cert_rrn_vid_31 = function(arg1, arg2) {
	
	/* todo.. 테스트 서버 공인인증 무시.. 실제 운영시 삭제*/
	var pass_url = location.href;
	if(pass_url.match("hpt.lifeplanet.co.kr") || pass_url.match("hpd.lifeplanet.co.kr")){
		testType   = "T";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}else{
		testType   = "R";	// todo... 운영반영시 testType 삭제 필요 'testType   = "T";'은 테스트용
	}
	
	certType   = "03";
	if(globalVar.getParam("PSNO2id")!=undefined ){
		if($("#Tk_"+globalVar.getParam("PSNO2id")+"_checkbox").is(":checked")){
			var tmpObj={};
			tmpObj.jumin2=globalVar.getParam("PSNO2id");
			certType+=getTransKeyFnc("STR",tmpObj,"");
		}else{
			certType +="&e2e_data1="+astxE2eTmp;
		}
		certType +="&PSNO2id="+globalVar.getParam("PSNO2id")+"&PSNO1="+globalVar.getParam("PSNO1"); 	
	}else if(globalVar.getParam("PSNO")!=undefined){
		certType +="&PSNO="+globalVar.getParam("PSNO");
	}
	
	callBack   = arg2;
	var argVal = "";
	if(arg1 != ""){
		argVal = arg1.val();
	}
	
	
	 if(pinURLChk() && vPinLogin == "Y"){ //핀인증으로 로그인 했을때
		 runPinCertification(callBack , null);
		 return;
	 }else if(vFpLogin == "Y" && pinURLChk()){ //지문인증으로 로그인 했을때
		 runFpCertification(callBack , null);
		 return;
	 }else if(vNaverLogin == "Y" && pinURLChk()){ //네이버인증으로 로그인 했을때
		 runNaverCertification(callBack , null);
		 return;
	 }
	
	Delfino.login("login=vidLogin", cert_callback);
	
};

/**
 * 공인인증 시 콜백함수
 * HPGA01S0에서 사용
 * 주민등록 번호를 서버에서 확인할 경우
 * 서명값 && 주민번호 && VID
 * 사용법 arg1 : 서명필드 object(없을경우 "")
 *      arg2 : 콜백함수
 *      certType : "00" -> 홈페이지
 *      loginType : "CERT" -> 공인인증 로그인(계약회원) 
 */
var cert_callback = function(cert, vid) {
 
	if (vid == undefined) {
		vid = cert.vidRandom;
	}
	
	if (cert.status == 0) return;
	
	if (cert.status != 1) {
		if (Delfino.isPasswordError(result.status)) alert("비밀번호 오류 횟수 초과됨"); //v1.1.6,0 over & DelfinoConfig.passwordError = true
		alert("error:" + result.message + "[" + result.status + "]");
		return;
	}
	var addParam="";
	if( certType  == "04" && loginType == "ETC"){
		addParam= psno;
	}
	
	$.ajax({
		type        : "POST"
       ,async       : true
       ,url         : "/common/sign/HPSignManager.ajax"
       ,dataType    : "json"
       ,timeout     : 60000 //제한시간 지정
       ,cache       : false  //true, false
       ,data        : "cstPgrsYn=Y&vid=" + vid + "&cert=" + cert.signData + "&certType=" + certType + "&testType=" + testType+ "&loginType=" + loginType+addParam //서버에 보낼 파라메터
       ,contentType : "application/x-www-form-urlencoded; charset=UTF-8"
       ,error       : function(request, status, error){ //통신 에러 발생시 처리
    	   				closeLoading();
    	   				alert("공인인증 중 통신 오류가 발생하였습니다.");
    	   				return false;
       				  }
       ,success     : function(response, status, request){ //통신 성공시 처리
			    	   
    	   			   var error_code = response.result.outData.error_code;
			    	   var error_msg  = response.result.outData.error_msg;
			    	   
			    	   if(error_code === "00"){
			    		   if(isMyPage()){
			    			   if(typeof callBack === "function"){
//	    	   						callBack(response);
	    	   						applyCIA005A05(response,callBack);
	    	   						return false;
	    	   					}else if(typeof callBack === "string"){
//	    	   						eval(callBack + "(response)");
	    	   						applyCIA005A05(response,eval(callBack));
	    	   						return false;
	    	   					}
			    		   }else{
			    			   if(typeof callBack === "function"){
	    	   						callBack(response);
	    	   						return false;
	    	   					}else if(typeof callBack === "string"){
	    	   						eval(callBack + "(response)");
	    	   						return false;
	    	   					}   
			    		   }
    	   					
    	   			   }else{
    	   					closeLoading();
    	   					
							if(error_code === "50"){
    	   						if(confirm(error_msg)) {
    	   							parent.location.href = "/common/view/HPTA01S2.dev";
    	   							return false;
    	   						}
        	   				} else if(error_code === "60"){
    	   					  callbackHPCC300P1();
    	 			    	  return false;
        	   				} else{
        	   					alert(error_msg);
        	   				}
    	   					
    	   					return false;
    	   				}
       				  }
       ,beforeSend  : function(){ //통신을 시작할때 처리
    	   				showLoading(); // 로딩 시작 
       				  }
       ,complete    : function() { //통신이 완료된 후 처리
						/**
    	   				 * 청약에서는 공인인증 완료후 로딩이 끊기면 안되서 기존에 주석처리함.
    	   				 * 공인인증 하고 페이지가 전환되는 경우에는 로딩종료 안되어도 이슈가 없음.
    	   				 * 
    	   				 * but 마이페이지에서 증명서 관련 페이지에서 공인인증후 팝업을 띄우고나서, 
    	   				 * 바닥페이지에서 로딩이 계속 도는 현상 발생.
    	   				 * 마이페이지 증명서발급 url에서는 공인인증후 로딩종료 시켜줌.(20160614 jeha)
    	   				 */ 
						if(location.href.indexOf("/mypage/iss/") > -1){
							closeLoading(); // 로딩종료
						}
       				  }
	});

};

var withoutConfirmSignForevdnDatm = function(objSignData, userCallback) {
	
	callBack = userCallback;
	widAgrEvdnDatm = {'signCertParam' : $.isArray (objSignData) ? objSignData : [objSignData]};
	
	var i = 0 
	, length = 0
	, singleData = {}
	, arrSignData = []
	, arrBankCode = []
	, signData = '';
	
	// 빈 오브젝트 일 때 dummy 데이터 처리
	if ($.isEmptyObject (widAgrEvdnDatm.signCertParam[ 0 ])) {
		
		widAgrEvdnDatm.signCertParam.length = 0;
		arrSignData[ 0 ] = 'ONLY_CERT';
		arrBankCode[ 0 ] = 'ONLY_CERT';
	}
	
	for (i = 0, length = widAgrEvdnDatm.signCertParam.length; i < length; i += 1) {
		
		singleData = widAgrEvdnDatm.signCertParam[ i ];
		arrSignData.push (_fnParseSignString (singleData));
		arrBankCode.push (singleData.bankCd);
	}
	// delfinoBiz 유효성체크용 인출할 대상 계좌(고객의계좌)가 1개이므로 bank코드는 가장 첫번째 계좌 사용
	widAgrEvdnDatm.bankCd = arrBankCode[ 0 ];
	signData = arrSignData.join (' || ');
	
	
	 if(pinURLChk() && vPinLogin == "Y"){ //핀인증으로 로그인 했을때
		 widAgrEvdnDatm.signData=signData;
		 runPinCertification(userCallback , widAgrEvdnDatm);
		 return;
	 }else if(vFpLogin == "Y" && pinURLChk()){ //지문인증으로 로그인 했을때
		 widAgrEvdnDatm.signData=signData;
		 runFpCertification(userCallback , widAgrEvdnDatm);
		 return;
	 }else if(vNaverLogin == "Y" && pinURLChk()){ //네이버인증으로 로그인 했을때
		 widAgrEvdnDatm.signData=signData;
		 runNaverCertification(userCallback , widAgrEvdnDatm);
		 return;
	 }
	
	
	Delfino.sign(signData, createEvidenceData, {resetCertificate:true, cacheCert:true});
};
var createEvidenceData = function(cert, vid) {
	
	if (vid == undefined) {
		vid = cert.vidRandom;
	}
	
	if (cert.status == 0) return;
	
	if (cert.status != 1) {
		if (Delfino.isPasswordError(result.status)) alert("비밀번호 오류 횟수 초과됨"); //v1.1.6,0 over & DelfinoConfig.passwordError = true
		alert("error:" + result.message + "[" + result.status + "]");
		return;
	}
	
	var fnCallback = $.isFunction (callBack) ? callBack : window[ callBack ] 
	, arrCurrParam = $.makeArray (arguments)
	, tradeKey = 'createEvidenceData';
	
	widAgrEvdnDatm.signData = cert.signData;
	widAgrEvdnDatm.vidRandom = vid;
	
	if(widAgrEvdnDatm.signCertParam.length && widAgrEvdnDatm.signCertParam[ 0 ].PSNO != undefined){
		
		widAgrEvdnDatm.PSNO =widAgrEvdnDatm.signCertParam[ 0 ].PSNO;
		tradeKey = "createEvidenceDataDN";
	}
	
	var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
	tranProp.url        = '/common/sign/HPSignManager';           		// 트랜잭션 Url
	tranProp.tradeKey   = tradeKey;						// 트랜잭션 TradeKey
	tranProp.params     = widAgrEvdnDatm;                      // 트랜잭션 Parameter
	/**
	 * 별도의 함수로 추출할 경우 cert와 vid를 전역변수에 담아야 하기때문에 익명함수로 처리 한다.
	 * */
	tranProp.success    = function (data) {
		
		data = data || {'outData' : {}};
		data.outData.cert = cert;
		data.outData.vid = vid;
		
		if ($.isFunction (fnCallback)) {
			  if(isMyPage()){
				  applyCIA005A05(data,fnCallback);
			  }else{
				  fnCallback.call (this, data);				  
			  }
		}
	};	 														// Success Callback
	tranProp.failure    = _fnCreateEvidenceDataFailure;
	transaction.callTran(tranProp);
};

/**
 * 함수명의 시작이 _로 시작할 경우 타 함수 내부에서 호출되는 함수
 * */
/**
 * data Object를 sign문자열로 파싱한다.
 * */
var _fnParseSignString = function (data) {
	
	var signData = '';
	
	if ((data.mask_acowPsno).length == 13) {
		
		data.mask_acowPsno = data.mask_acowPsno.substring(0,6);
	}
	
	signData = "이용기관명 : 교보라이프플래닛생명"
		+ " 요금출금은행 : " + data.bankCd
		+ " 출금계좌번호 : " + data.mask_bankAcno
		+ " 출금계좌 예금주명 : " + data.mask_acowNm
		+ " 예금주 생년월일 : " + data.mask_acowPsno;
	
	if (data.mask_insConno != null && data.mask_insConno.length > 0) {
		
		signData += " 보험증권번호 : " + data.mask_insConno;
	}	
	if (data.extraEtc != null && data.extraEtc.length > 0) {
		
		signData += " 비고 : " + data.extraEtc;
	}	
	return signData;
};
/**
 * createEvidenceData 요청 실패 함수
 * */
var _fnCreateEvidenceDataFailure = function (data) {
	
	alert(data.outData.ERROR_MSG);
	return;
};


var mypageAlert0 =  function(){
	 if(location.pathname.indexOf('/mypage/') > -1){
			if(typeof ahnlabEsyAhrzLogin != "undefined"  ){
			if(ahnlabEsyAhrzLogin == "Y"){
				//결제취소 , 책임보상 
				if(location.pathname.indexOf('HPMM400S1') > -1 ||
				   location.pathname.indexOf('HPMM500S1') > -1 ||
				   location.pathname.indexOf('HPMM300S1') > -1 ){
					alert("PIN인증으로 청약하신 경우는 고객센터(1566-0999)에서 처리 가능합니다.");
				}else if(location.pathname.indexOf('mypage') > -1){
					alert("고객님께서는 PIN인증으로 로그인 하셨습니다.\n 업무처리를 위해서는 공인인증서가 필요합니다.\n※ PIN인증을 통한 업무처리는 6월 중순 이후부터 반영 예정입니다.");	
				}
			}	
		}
	}
	
};


//핀인증 출금동의 자료 생성
var createEvidencePINData = function(signedData , widAgrEvdnData) {

	var widAgrEvdnDatm = $.extend (widAgrEvdnData, signedData);
	
	var fnCallback = $.isFunction (callBack) ? callBack : window[ callBack ];

	var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);
	tranProp.url        = '/common/thirdParty/VESTPIN';			    // 트랜잭션 Url
	tranProp.tradeKey   = 'createEvidencePINData';
	tranProp.params     = widAgrEvdnDatm;					// 트랜잭션 Parameter
	/**
	 * 별도의 함수로 추출할 경우 signedData를 전역변수에 담아야 하기때문에 익명함수로 처리 한다.
	 * */
	tranProp.success    = function (data) {

		if ($.isFunction (fnCallback)) {
			 if(isMyPage()){
				 applyCIA005A05(data,fnCallback);
			 }else{
				 fnCallback.call (this, data);
			 }
		}
	};
	tranProp.failure 	= _fnCreateEvidenceDataFailure;		// Failure Callback

	transaction.callTran(tranProp);
};

//지문인증 출금동의 자료 생성
var createEvidenceFPData = function(signedData, widAgrEvdnData, dvceAhrzMtpt) {

	var widAgrEvdnDatm = $.extend (widAgrEvdnData, signedData);
	var fnCallback = $.isFunction (callBack) ? callBack : window[ callBack ];

	var tranProp		= util.clone(transaction.TRAN_COMM_PROP);
	tranProp.url			= '/common/thirdParty/FIDOWeb';	// 트랜잭션 Url
	tranProp.tradeKey= 'createEvidenceFPData';
	tranProp.params	= widAgrEvdnDatm;						// 트랜잭션 Parameter
	/**
	 * 별도의 함수로 추출할 경우 signedData를 전역변수에 담아야 하기때문에 익명함수로 처리 한다.
	 * */
	tranProp.success    = function (data) {

		if ($.isFunction (fnCallback)) {
			 if(isMyPage()){
				 applyCIA005A05(data,fnCallback,dvceAhrzMtpt);
			 }else{
				 fnCallback.call (this, data);
			 }
		}
	};
	tranProp.failure 	= _fnCreateEvidenceDataFailure;		// Failure Callback

	transaction.callTran(tranProp);
};

//핀인증요청
var runPinCertification = function(callback,param){
	var regChk= "Y";
	var vPinCreateEvidenceYN ="N";
	var signdataStr="";
	var isPopup=false;
	var popupOption = {};
	
	
	if(param !=null && param.signData!=undefined ){//전자서명&출금동의자료 생성
		vPinCreateEvidenceYN="Y";
		signdataStr=param.signData;
		
		if(pinNoSignDataChk(signdataStr) =="Y"){
			signdataStr="전자서명합니다.";
		}
	}else if(param !=null && param.noEvidenceSignData!=undefined ){//전자서명
		signdataStr=param.noEvidenceSignData;
	}else{
		signdataStr="전자서명합니다.";
	} 
	
	
	if($("#modalIfm",parent.document).length > 0){
		isPopup = true;
		popupOption = parent.globalVar.getParam('popupOption');
	}
	 
	if(isPopup){
		globalVar.setParam('vPinCallback' , parent.runPinCertificationPopupRtn);
		globalVar.setParam('vPinPopCallback' , callback);
		globalVar.setParam('vPinPopOption' , popupOption);
	}else{
		globalVar.setParam('vPinCallback' , callback);	
	}
	
	globalVar.setParam('vPinSignData' , param);
	globalVar.setParam('vPinSignCert' , signdataStr);
	globalVar.setParam('vPinCreateEvidenceYN', vPinCreateEvidenceYN);
	globalVar.setParam('vPinRegChk', regChk);
//	globalVar.setParam('vPinMnnpNm', globalVar.getParam('spb_data').spb_mnnpNm);
	globalVar.setParam('vPinCiKey', vPinCikey);
	globalVar.setParam('runPinCertification', "Y");
	
	 
		
		var option = {
				id			: 'pop'							,
				location	: 'external'					,
				content		: 'content1'					,
				url : '/mypage/mc/HPMC220P1.dev' ,
				width		: 430							,
				height		: 440							,
				strTit 		: "비밀번호(PIN) 인증"
		};

		
		if(isPopup){
			var popParam ={};
			
			$.each(globalVar.keySet(), function(idx,data){
				if(data!=null && data.indexOf("vPin") > -1){
					popParam[data]= globalVar.getParam(data); 
				}
			});
			
			
			parent.pinRunPopup(option,popParam,{});
			PageUtil.closeModal();
			
		}else{
			PageUtil.openPopup(option);	
		}
		
	
};

//네이버인증 요청 
var runNaverCertification = function(callback,param){
	var regChk= "Y";
	var naverCreateEvidenceYN ="N";
	var signdataStr="";
	var isPopup=false;
	var popupOption = {};

	if(param !=null && param.signData!=undefined ){//전자서명&출금동의자료 생성
		naverCreateEvidenceYN="Y";
		signdataStr=param.signData;
		
		if(pinNoSignDataChk(signdataStr) =="Y"){
			signdataStr="전자서명합니다.";
		}
	}else if(param !=null && param.noEvidenceSignData!=undefined ){//전자서명
		signdataStr=param.noEvidenceSignData;
	}else{
		signdataStr="전자서명합니다.";
	} 
	if(param == null){
		param ={};
	}
	param.type = "3"; // 인증 타입 (로그인/쳥약/유지)
	param.signData = signdataStr;
	
	globalVar.setParam('naverAuthData' , param);	
	globalVar.setParam('naverAuthCallback' , callback);	
	globalVar.setParam('naverSignData' , signdataStr);
	globalVar.setParam('naverCreateEvidenceYN', naverCreateEvidenceYN);
	globalVar.setParam('runNaverCertification', "Y");

		
	// 네이버 인증 팝업 띄우기
	var option = {
			id        	: 'popupwrap',
			location  	: 'external',
			content   	: 'content1',
			isToBeParam : true,
			url       	: '/common/cc/HPCC010P6',
			width	  	: '450',
			height	  	: '600'
	};

			PageUtil.openPopup(option,param);
	
};

//지문인증요청
var runFpCertification = function(callback,param){
	
	var regChk= "Y";
	var vFpCreateEvidenceYN ="N";	// 출금동의자료 생성 여부
	var signdataStr="";
	
	var isPopup=false;
	var popupOption = {};
	
	if(param !=null && param.signData!=undefined ){//전자서명&출금동의자료 생성
		vFpCreateEvidenceYN="Y";
		signdataStr=param.signData;
	}else if(param !=null && param.noEvidenceSignData!=undefined ){//전자서명
		signdataStr=param.noEvidenceSignData;
	}else{
		signdataStr="전자서명합니다.";
	} 
	
	// 팝업에서 PC지문인증 팝업(HPCC010P3)을 호출했을 경우
	if($("#modalIfm", parent.document).length > 0){
		isPopup = true;
		popupOption = parent.globalVar.getParam('popupOption');
	}
	
	if(isPopup){
		globalVar.setParam('vFpCallback' , parent.runFpCertificationPopupRtn);
		globalVar.setParam('vFpPopCallback' , callback);
		globalVar.setParam('vFpPopOption' , popupOption);
	}else{
		globalVar.setParam('vFpCallback' , callback);	
	}
	
	globalVar.setParam('vFpSignData' , param);
	globalVar.setParam('vFpSignCert' , signdataStr);
	globalVar.setParam('vFpCreateEvidenceYN', vFpCreateEvidenceYN);
	globalVar.setParam('vFpRegChk', regChk);
	globalVar.setParam('runFpCertification', "Y");
	
	var option = {
			id			: 'pop',
			location	: 'external',
			content	: 'content1',
			url			: '/common/cc/HPCC010P3.dev',
			width	  	: 450,
	};
	
	var popParam ={};
	if(isPopup){
		
		$.each(globalVar.keySet(), function(idx,data){
			if(data!=null && data.indexOf("vFp") > -1){
				popParam[data]= globalVar.getParam(data); 
			}
			if(data!=null && data.indexOf("vPinPopParam") > -1){
				popParam[data]= globalVar.getParam(data); 
			}
		});
		
		var paramObj = {};
		paramObj.type = "auth";
		paramObj.signData = signdataStr;
		parent.pinRunPopup(option,popParam,paramObj);
		PageUtil.closeModal();
		
	}else{
		popParam.type = "auth";
		popParam.signData = signdataStr;
		PageUtil.openPopup(option, popParam);
	}
};


var pinRunPopup = function(option,popParam,paramObj){
	
	setTimeout(function(){
		if(popParam!=undefined){
			for( var tmp in popParam) {
				globalVar.setParam(tmp, popParam[tmp]);
			}
		}
		PageUtil.openPopup(option,paramObj);
	},500);
};

// 지문인증 완료 후, 로그인 팝업 OPEN
var fpLoginRunPopup = function(option,popParam,paramObj,callback){
	
	setTimeout(function(){
		if(popParam!=undefined){
			for( var tmp in popParam) {
				globalVar.setParam(tmp, popParam[tmp]);
			}
		}
		PageUtil.openPopup(option,paramObj);
	},500);
};

var runPinCertificationPopupRtn =  function(params){
	//HPMA233P1.js  팝업에서 본인인증시 참고

	var vPinPopOption = globalVar.getParam('vPinPopOption');

	globalVar.setParam('vPinPopCallback' , undefined);
	globalVar.setParam('vPinPopOption' , undefined);
	
	var popParam ={};
	
	$.each(globalVar.keySet(), function(idx,data){
		if(data!=null && data.indexOf("vPinPopParam") > -1){
			popParam =  globalVar.getParam(data);
		}
	});
	
	popParam.runPinAuth = "Y";
	
	globalVar.setParam('vPinPopParam' , undefined);
	
	parent.pinRunPopup(vPinPopOption,{},popParam);
//	PageUtil.closeModal();
};

var runFpCertificationPopupRtn =  function(params){
	//HPCC010P3.js  팝업에서 본인인증시 참고

	var vPinPopOption = globalVar.getParam('vFpPopOption');

	globalVar.setParam('vFpPopCallback' , undefined);
	globalVar.setParam('vFpPopOption' , undefined);
	globalVar.setParam('vFpPopPop' , undefined);
	
	var popParam ={};
	$.each(globalVar.keySet(), function(idx,data){
		if(data!=null && data.indexOf("vPinPopParam") > -1){
			popParam =  globalVar.getParam(data);
		}
	});
	
	popParam.runPinAuth = "Y";
	globalVar.setParam('vPinPopParam' , undefined);
	
	parent.pinRunPopup(vPinPopOption,{},popParam);
};

var pinNoSignDataChk =  function(signData){
	
	var vPinSignCert = util.nvl(signData,"");
	var chkRtn ="N";
	
	if(vPinSignCert == "" || vPinSignCert == "ONLY_CERT" ){
		chkRtn="Y";
	}
	
	return chkRtn;
};


//핀 URL 체크
var pinURLChk = function(){

	var urlChk = false;

	if(location.pathname.indexOf('/mypage/') > -1){
		urlChk=true;
	}else if(location.pathname.indexOf('/innovation/is/HPIS220P1') > -1){
		urlChk=true;
	}

	return urlChk;
};

var pinSignCallback = function (prmSignedData){
	
	var vPinCreateEvidenceYN = globalVar.getParam('vPinCreateEvidenceYN');
	
	globalVar.setParam('vPinPrmSignedData' , prmSignedData);
	
	if(vPinCreateEvidenceYN == "Y"){
		callBack= globalVar.getParam('vPinCallback');
		var widAgrEvdnDatmData = globalVar.getParam('vPinSignData');
		var signedData = {signData : globalVar.getParam('vPinPrmSignedData')};
		createEvidencePINData(signedData,widAgrEvdnDatmData);
	}else{
		var callback =  globalVar.getParam('vPinCallback');
		if(isMyPage()){
			applyCIA005A05({},callback);
		}else{
			callback();
		}
	}
	
};

// 지문인증 callback함수
var fpSignCallback = function(data){
	
	var fdRspnCd = data.outData.fdRspnCd;
	var vFpCreateEvidenceYN = globalVar.getParam('vFpCreateEvidenceYN');
	var dvceAhrzMtpt = data.outData.dvceAhrzMtpt;	// 단말인증방식(100 : 지문, 200 : faceID)
	
	if(fdRspnCd== "0000"){
		if(vFpCreateEvidenceYN == "Y"){
			callBack= globalVar.getParam('vFpCallback');
			var widAgrEvdnDatmData = globalVar.getParam('vFpSignData');
			var signedData = {signData : JSON.stringify(data.outData.traPatiHash) }; // 거래내역HASH
			widAgrEvdnDatmData = $.extend (widAgrEvdnDatmData, data);
			createEvidenceFPData(signedData,widAgrEvdnDatmData,dvceAhrzMtpt);
		}else{
			var callback =  globalVar.getParam('vFpCallback');
			if(isMyPage()){
				applyCIA005A05({},callback,dvceAhrzMtpt);
			}else{
				callback();
			}
		}
	}else{
		MXP_PLUGIN.FIDOError.getMessage(fdRspnCd); 
	}
};

// 로그인 팝업 지문인증 완료 callback 함수
var fpLogCallback = function(data){
	
	if($("#modal_ifrmWrap",parent.document).length > 0){
		PageUtil.closeModal();
	}
	
	var vFpPopOption = globalVar.getParam('vFpPopOption');
	var callback		= globalVar.getParam('vFpPopCallback');
	globalVar.setParam('vFpPopOption' , undefined);
	globalVar.setParam('vFpPopPop' , undefined);
	
	parent.fpLoginRunPopup(vFpPopOption,{},data,callback);
	
};

var callbackHPCC300P1 = function(){
	
	if(location.pathname.indexOf('HPGA01P0') > -1){
			parent.popupHPCC300P1(400);
			PageUtil.closeModal();
	   }else{
		   popupHPCC300P1(0);
	   }
	
};

var popupHPCC300P1 = function(time){
	
	setTimeout(function(){
		   var option = {
					id        : 'popupwrap',
					location  : 'external',
					content   : 'content1',
					width		: 600							,
					height		: 400							,
					url       : '/common/cc/HPCC300P1.dev'
			};

			PageUtil.openPopup(option);	 
	},time);
		   
};

var applyCIA005A05 = function (params , callback, dvceAhrzMtpt){
	var reqData = {};
	var ahrzMdCd= "01";
	
	var fncCall  = function(){
		callback(params);
	};
	
	if(vPinLogin == "Y"){
		ahrzMdCd="13";
	}else if(vFpLogin == "Y"){
			
		// dvceAhrzMtpt=단말인증방식(100:지문인증, 200:faceID인증)
		if(dvceAhrzMtpt != null && dvceAhrzMtpt != undefined){
			if(dvceAhrzMtpt == "100"){
				ahrzMdCd="11";
			}else if(dvceAhrzMtpt == "200"){
				ahrzMdCd="12";
			}			
		}
	}
	
	var hpScrnId = location.pathname;
	hpScrnId = hpScrnId.substring(hpScrnId.lastIndexOf("/")+1,hpScrnId.lastIndexOf("."));
	
	reqData.hpScrnId =hpScrnId;
	reqData.ahrzMdCd =ahrzMdCd;
	
	//트랜젝션 셋팅
	var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
	tranProp.url        = '/common/cc/HPCommonUtil';           		// 트랜잭션 Url
	tranProp.tradeKey   = "applyCIA005A05";       		// 트랜잭션 TradeKey
	tranProp.params     = reqData;                            		// 트랜잭션 Parameter
	tranProp.success    = function(data){
		fncCall();
	};
	tranProp.failure    = function(data){
		fncCall();
	};
//	tranProp.loadFlag     = false;
	
	//트랜잭션 실행
	transaction.callTran(tranProp);
	
};
 

//마이페이지 체크
var isMyPage = function(){

	var urlChk = false;

	if(location.pathname.indexOf('/mypage/') > -1){
		urlChk=true;
	}

	return urlChk;

};

// psno : 입력한 주민등록번호
/*
var cert_callback2 = function(cert, vid) {
	
	if (vid == undefined) {
		vid = cert.vidRandom;
	}
	
	if (cert.status == 0) return;
	
	if (cert.status != 1) {
		if (Delfino.isPasswordError(result.status)) alert("비밀번호 오류 횟수 초과됨"); //v1.1.6,0 over & DelfinoConfig.passwordError = true
		alert("error:" + result.message + "[" + result.status + "]");
		return;
	}
	
	$.ajax({type        : "POST"
	       ,async       : true
	       ,url         : "/common/sign/HPSignManager.ajax"
	       ,dataType    : "json"
	       ,timeout     : 60000 //제한시간 지정
	       ,cache       : false  //true, false
	       ,data        : "vid=" + vid + "&cert=" + cert + "&certType=" + certType + "&testType=" + testType+"&psno=" + psno //서버에 보낼 파라메터
	       ,contentType : "application/x-www-form-urlencoded; charset=UTF-8"
	       ,error       : function(request, status, error){ //통신 에러 발생시 처리
	    	   				alert("공인인증 중 통신 오류가 발생하였습니다.");
	    	   				return false;
	       				  }
	       ,success     : function(response, status, request){ //통신 성공시 처리
	    	   				if(response.result.outData.error_code == "00"){
	    	   					if(typeof callBack === "function"){
	    	   						callBack(response);
	    	   						return false;
	    	   					}else if(typeof callBack === "string"){
	    	   						eval(callBack + "(response)");
	    	   						return false;
	    	   					}
	    	   				}else{
	    	   					alert(response.result.outData.error_msg);
	    	   					return false;
	    	   				} 
	       				  }
	       ,beforeSend  : function(){ //통신을 시작할때 처리
	    	   				showLoading(); // 로딩 시작 
	       				  }
	       ,complete    : function() { //통신이 완료된 후 처리
	    	   				closeLoading(); // 로딩종료
	       				  }
	});

};*/





