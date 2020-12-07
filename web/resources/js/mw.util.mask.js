/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 기존 홈페이지 시스템
 * FILE INFO   : mw.util.mask.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 Masking, Formatter 관련 함수 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 홈페이지 2014-11-20	 	initial version
 * 시스템
 * 권대준	2014-12-11		KDIMW에 맞도록 구조 수정  			
 * ========================================================================== */

/*******************************************************************************
 * Function List
 *******************************************************************************
 *
 * *** 마스크 처리 관련 함수 ***************************************************
 * 
 * util.telMask		: 전화 번호 Mask 처리(구분자 "-" 삽입되어 리턴)(구분자 "-" 삽입된 것도 처리가능)
 * util.regMask		: 주민등록번호 Mask 처리(구분자 "-" 삽입되어 리턴)(구분자 "-" 삽입된 것도 처리가능)
 * util.nameMask	: 성명 Mask 처리(앞뒤 마지막 글자를 재외하고 모두 '*'처리, 외자의 경우 뒷자리만 처리)
 * util.contNoMask	: 증권번호 Mask 처리
 * util.emailMask	: 이메일 Mask 처리
 * util.acctMask	: 계좌번호 Mask 처리 - '-'가 업을 경우 뒤 4자리 마스크처리, 있을경우 마지막 '-'이후 마스크 처리
 * util.addrMask	: 주소 Mask 처리 - 전체 주소
 * util.addrMaskTwo : 주소 Mask 처리 - 기본 주소와 상세 주소가 나누어진 경우
 * util.addrEtcAddr : 기타주소 Mask 처리 - 기타주소길이만큼 *처리
 * 
 * *** 데이터 포메터 관련 함수 **************************************************
 * 
 * util.setCommas	: 숫자의 3자리 자릿수 컴마 표시를 한다.(소수형도 같이 사용 가능) - 입력된 값이 null, undefined, 빈스트링일 경우 대체 텍스트를 표시할 수 있다.
 * util.getCommas	: 숫자의 3자리 자릿수 컴마 삭제를 한다.(소수형도 같이 사용 가능) - 입력된 값이 null, undefined, 빈스트링일 경우 대체 텍스트를 표시할 수 있다.
 * util.setCommaInput : 텍스트 필드에 입력한 값에 3자리마다 콤마(,)를 붙인다.
 * util.ceil	: 소수점 이하 올림하여 몇자리까지 나오게 한다. (입력된 자리수 보다 작을경우 '0'을 붙여 리턴, 마지막 파라메타에 따라 숫자형 리턴)
 * util.round	: 소수점 이하 반올림하여 몇자리까지 나오게 한다. (입력된 자리수 보다 작을경우 '0'을 붙여 리턴, 마지막 파라메타에 따라 숫자형 리턴)
 * util.floor	: 소수점 이하 버림하여 몇자리까지 나오게 한다. (입력된 자리수 보다 작을경우 '0'을 붙여 리턴, 마지막 파라메타에 따라 숫자형 리턴)
 * util.setRate	: 비율 기본형으로 리턴한다. 모든 데이터는 소수점 2자리까지 버림하여 출력됨 - 표준출력
 * util.setEmpty: 문자열 기본형으로 리턴.
 * util.setNum	: 숫자 및 금액 기본입력형 리턴, bType을 true로 주면 자리수 표시된 정수로 리턴한다.
 * util.setZero	: 숫자형 문자열의 자릿수를 입력받아 왼쪽을 0으로 채운다.
 * util.setMoneyKorFormat : 금액을 입력 받아서 한글 단위를 붙여줌 (억,만,천) - 단위 미만은 절사
 * util.setGadrKorStr : 성별코드에 따라서 남성, 여성을 붙여줌
 * 
 ******************************************************************************/

/*******************************************************************************
 * 마스크 처리 관련 함수
 ******************************************************************************/

/**
 * 전화 번호 Mask 처리(구분자 "-" 삽입되어 리턴)(구분자 "-" 삽입된 것도 처리가능)
 * 
 * @param tel_no -
 *            String - 전화번호 문자열
 * @returns '-'가 붙어 있는 마스킹된 전화번호
 */
util.telMask = function (tel_no) {
	if (util.chkReturn(tel_no, "s") == ""){
		alert("파라메타를 확인해 주십시오.");
		return "";
	}
	
	var strTemp = "****";
	
	if (tel_no.indexOf("-") != -1) { // 전화번호에 - 가있다면
		var arrTemp = tel_no.split("-");

		if (arrTemp.length >= 2) {
			strTemp = (arrTemp[1].length == 3) ? '***' : '****';
		}
		
		if (arrTemp.length == 1) {
			return (util.subStrL(tel_no, tel_no.length - 4) + strTemp);
		} else if (arrTemp.length == 2) {
			return (arrTemp[0] + "-" + strTemp + "-" + util.subStrR(tel_no, 4));
		} else {
			return (arrTemp[0] + "-" + strTemp + "-" + arrTemp[2]);
		}
	} else {
		if (tel_no.substr(0, 2) == "01") {
			if (tel_no.length == 10) {
				return util.subStrL(tel_no, 3) + "-***-" + util.subStrR(tel_no, 4);
			} else {
				return util.subStrL(tel_no, 3) + "-****-" + util.subStrL(tel_no, 4);
			}
		} else if (tel_no.substr(0, 2) == "02") {
			if (tel_no.length == 9) {
				return util.subStrL(tel_no, 2) + "-***-" + util.subStrR(tel_no, 4);
			} else {
				return util.subStrL(tel_no, 2) + "-****-" + util.subStrR(tel_no, 4);
			}
		} else if (tel_no.substr(0, 2) == "03" || tel_no.substr(0, 2) == "04" 
			|| tel_no.substr(0, 2) == "05" || tel_no.substr(0, 2) == "06") {
			return util.subStrL(tel_no, 3) + "-***-" + util.subStrR(tel_no, 4);
		} else {
			alert("정상적인 파라메타인지 확인해 주십시오.");
			return tel_no;
		}
	}
};

/**
 * 주민등록번호 Mask 처리(구분자 "-" 삽입되어 리턴)(구분자 "-" 삽입된 것도 처리가능)
 * 
 * @param reg_no -
 *            String - 주민등록번호 문자열
 * @returns '-'가 붙어 있는 마스킹된 주민등록번호
 */
util.regMask = function (reg_no) {
	if (util.chkReturn(reg_no, "s") == ""){
		// alert("util.regMask : 파라메타를 확인해 주십시오.");
		return "-";
	}
	
	var strTemp = "******";

	if (reg_no.indexOf("-") == -1) { // 주민번호에 - 가없다면
		return (util.subStrL(reg_no, 6) + "-" + reg_no.substr(6, 1) + strTemp);
	} else {
		reg_no = util.replaceAll(reg_no,"-", "");
		return (util.subStrL(reg_no, 6) + "-" + reg_no.substr(6, 1) + strTemp);
	}
};

/**
 * 성명 Mask 처리(앞뒤 마지막 글자를 재외하고 모두 '*'처리, 외자의 경우 뒷자리만 처리)
 * 
 * @param custname -
 *            String - 성명 문자열
 * @returns 마스크 처리된 성명
 */
util.nameMask = function (custname) {
	custname = new String(custname);
	var length = custname.length;
	var first = custname.substring(0, 1);
	var last = custname.substring(length - 1, length);
	var asterisk = '';
	
	if (custname.length > 2){	// 성명이 두자 초과인 경우
		for ( var i = 0; i < length - 2; i++) {
			asterisk = asterisk + '*';
		}
		custname = first + asterisk + last;
	} else {
		custname = first + "*";
	}
	
	return custname;
};

/**
 * 증권번호 Mask 처리
 * 
 * @param obj -
 *            String - 증권번호 문자열
 * @returns 마스크처리된 증권번호 문자열
 */
util.contNoMask = function (obj) {
	if (util.chkReturn(obj, "s") == ""){
		return "";
	}
	
	obj = util.replaceAll(obj, "-", "");
	var length = obj.length;
	
	if (length > 9){
		return obj.substring(0, length-7) + "****" + obj.substring(length -3, length);
	} else if (length <= 9 && length >= 7){
		return obj.substring(0, length-6) + "****" + obj.substring(length -2, length);
	} else {
		return obj;
	}
};

/**
 * 이메일 Mask 처리
 * 
 * @param addr -
 *            String - 이메일 문자열
 * @returns 마스크처리된 이메일 문자열
 */
util.emailMask = function (addr) {
	if (util.chkReturn(addr, "s") == ""){
		return "";
	}
	
	if (addr.indexOf("@") == -1){
		alert("이메일을 확인해 주세요.");
		return "";
	}
	
	var splitValue = addr.split("@");
	var nLength = splitValue[0].length;
	var first = splitValue[0];
		
	if (nLength > 2){
		return splitValue[0].substring(0, nLength -2) + "**@" + splitValue[1];
	} else if (nLength <= 2){
		return splitValue[0].substring(0, nLength -1) + "*@" + splitValue[1];
	} 

	return "";
};

/**
 * 계좌번호 Mask 처리 - '-'가 업을 경우 뒤 4자리 마스크처리, 있을경우 마지막 '-'이후 마스크 처리
 * 
 * @param value -
 *            String - 계좌번호 문자열
 * @returns
 */
util.acctMask = function (value) {
	if (util.chkReturn(value, "s") == ""){
		return "";
	}
	
	if (value.length <= 5){
		return value;
	}
	
	if (value.indexOf("-") != -1){	// '-'가 있을 경우
		var arrTemp = value.split("-");
		var strReText = "";
		for (var i = 0; i < arrTemp.length; i++){
			if (i != arrTemp.length - 1){
				strReText = strReText + arrTemp[i] + "-";
			} else {
				var strLast = "";
				for (var j = 0; j < arrTemp[i].length; j++){
					strLast = strLast + "*";
				}
				
				strReText = strReText + strLast;
			}
		}
		return strReText;
	} else {
		return value.substring(0, value.length -4) + "****";
	}
	
	return "";
};

/**
 * 주소 Mask 처리 - 전체 주소
 * "동 ", "읍 ", "면 ", "가 "로 찾아 뒤에는 모두 마스크 처리
 * 해당 케이스가 없을경우 " "으로 찾아 세번째 이후는 모두 마스크 처리
 * @param addr -
 *            String - 주소 문자열
 * @returns
 */
util.addrMask = function (addr) {
	if (util.chkReturn(addr, "s") == ""){
		return "";
	}
	
	var strStAddr = "";
	var strEndMask = "";
	var indexDong = addr.indexOf("동 ");
	var indexUb = addr.indexOf("읍 ");
	var indexMyun = addr.indexOf("면 ");
	var indexGa = addr.indexOf("가 ");
	
	if (indexDong == -1 && indexUb == -1 && indexMyun == -1 && indexGa == -1){
		// 동, 읍, 면, 가 로 검색 불가시
		var arrAddr = addr.split(" ");	// 스페이스로 배열
		
		if (arrAddr.length > 3){	// 3번째 이상 마스크가 있을 경우
			var strEndAddr = "";
			var nCount = 0;
			
			// 마스크 처리를 위해 3번째 이상 텍스트 합침
			for (var i = 3; i < arrAddr.length; i++){	
				if (strEndAddr == ""){
					strEndAddr = arrAddr[i];
				} else {
					strEndAddr = strEndAddr + " " + arrAddr[i];
				}
			}
			
			// 텍스트 길이만큼 마스크 표시
			for (var i = 0; i < strEndAddr.length; i++){	
				strEndMask += "*";
			}
			
			// 주소 앞부분 합치기 위한 자릿수 체크
			if (arrAddr.length > 3){
				nCount = 3;
			} else {
				nCount = arrAddr.length;
			}
				
			// 주소 앞부분 합침
			for (var i = 0; i < nCount ; i++){
				strStAddr = strStAddr + " " + arrAddr[i];
			}
			
		} else {
			return addr;
		}
	} else {
		var nIndexKey = -1;
		var nTotalLength = 0;
		
		if (indexDong != -1){
			nIndexKey = indexDong;	// 동
		} else if (indexUb != -1){
			nIndexKey = indexUb;	// 읍
		} else if (indexMyun != -1){
			nIndexKey = indexMyun;	// 면
		} else if (indexGa != -1){
			nIndexKey = indexGa;	// 가
		} 
		
		nTotalLength = addr.length;	// 전체길이
		
		if (nIndexKey == -1){
			return addr;
		}
		
		strStAddr = addr.substring(0, nIndexKey+1);
		strEndMask = "";
		
		// 텍스트 길이만큼 마스크 표시
		for (var i = 0; i < addr.substring(nIndexKey+2, nTotalLength).length; i++){	
			strEndMask += "*";
		}
		
	}
	
	// 마스크 처리 부분이 없을 경우 바로 리턴
	if (strEndMask.length == 0){
		return strStAddr;
	} 
	
	// 마스크 처리부와 합쳐 리턴
	return strStAddr + " " + strEndMask;
	
};

/**
 * 기타주소 Mask 처리 - 기타주소길이만큼 *처리
 */
util.addrEtcAddr = function (etcAddr){
	if (util.chkReturn(etcAddr, "s") == ""){
		return "";
	}
	
	var strEndMask = "";
	// 텍스트 길이만큼 마스크 표시
	for (var i = 0; i < etcAddr.length; i++){	
		strEndMask += "*";
	}
	
	// 마스크 처리부와 합쳐 리턴
	return strEndMask;
};

/**
 * 주소 Mask 처리 - 기본 주소와 상세 주소가 나누어진 경우
 * "동 ", "읍 ", "면 ", "가 "로 찾아 뒤에는 모두 마스크 처리
 * 해당 케이스가 없을경우 " "으로 찾아 세번째 이후는 모두 마스크 처리
 * @param addr1 -	String - 기본 주소 문자열
 * @param addr1 -	String - 상세 주소 문자열
 * @returns
 */
util.addrMaskTwo = function (addr1, addr2) {
	
	if (util.chkReturn(addr1, "s") == ""){
		return "";
	}
	
	if (util.chkReturn(addr2, "s") == ""){
		return "";
	}
	
	return util.addrMask(addr1 + " " + addr2);
};


/*******************************************************************************
 * 데이터 포메터 관련 함수
 ******************************************************************************/

/**
 * 소수점 이하 올림하여 몇자리까지 나오게 한다. (입력된 자리수 보다 작을경우 '0'을 붙여 리턴, 마지막 파라메타에 따라 숫자형 리턴)
 * 
 * @param param - -
 *            변환할 data
 * @param nKey -
 *            Integer - 리턴할 자리수, 0일경우 올림처리 후 소수점이하 안보임
 * @param bNoStr -
 *            Boolean - true일 경우 숫자형 리턴, 미입력시 문자형
 * @returns
 */
util.ceil = function (param, nKey, bNoStr){
	if (util.chkReturn(param, "s") == ""){
		return "";
	} else if (util.chkReturn(nKey, "s") == "" || nKey < 0){
		return param;
	}
	
	var nCipher = 1;
	for (var i = 0; i < nKey; i++){
		nCipher = nCipher * 10; 
	}
	
	if (util.chkReturn(bNoStr) == true && bNoStr == true){	// 숫자형으로 리턴을 원할경우 바로
															// 계산하여 리턴
		return (Math.ceil(Math.round(param * nCipher))) / nCipher;
	} else {
		var arrNumData = ((Math.ceil(Math.round(param * nCipher))) / nCipher).toString().split(".");
		
		if (nKey == 0){	// 자리수가 0일경우 앞 정수부문 리턴
			return arrNumData[0];
		}
		
		var nCountLen = 0;	// 뒷자리 length 초기화
		if (util.chkReturn(arrNumData[1], "s") != ""){	// 뒷자리 null, undefined
														// 체크
			nCountLen = arrNumData[1].length;	// 뒷자리 length값 세팅
		} else {
			arrNumData[1] = "";	// 뒷자리 빈스트링 세팅
		}
		
		for(nCountLen; nCountLen < nKey; nCountLen++){
			arrNumData[1] = arrNumData[1] + "0";	// 원하는 자리수 만큼 0을 붙임
		}
		
		return arrNumData[0] + "." + arrNumData[1];
		
	}
	
	return "";
};

/**
 * 소수점 이하 반올림하여 몇자리까지 나오게 한다. (입력된 자리수 보다 작을경우 '0'을 붙여 리턴, 마지막 파라메타에 따라 숫자형 리턴)
 * 
 * @param param - -
 *            변환할 data
 * @param nKey -
 *            Integer - 리턴할 자리수, 0일경우 반올림처리 후 소수점이하 안보임
 * @param bNoStr -
 *            Boolean - true일 경우 숫자형 리턴, 미입력시 문자형
 * @returns
 */
util.round = function (param, nKey, bNoStr){
	if (util.chkReturn(param, "s") == ""){
		return "";
	} else if (util.chkReturn(nKey, "s") == "" || nKey < 0){
		return param;
	}
	
	var nCipher = 1;
	for (var i = 0; i < nKey; i++){
		nCipher = nCipher * 10; 
	}
	
	if (util.chkReturn(bNoStr) == true && bNoStr == true){	// 숫자형으로 리턴을 원할경우 바로
															// 계산하여 리턴
		return (Math.round(param * nCipher)) / nCipher;
	} else {
		var arrNumData = ((Math.round(param * nCipher)) / nCipher).toString().split(".");
		
		if (nKey == 0){	// 자리수가 0일경우 앞 정수부문 리턴
			return arrNumData[0];
		}
		
		var nCountLen = 0;	// 뒷자리 length 초기화
		if (util.chkReturn(arrNumData[1], "s") != ""){	// 뒷자리 null, undefined
														// 체크
			nCountLen = arrNumData[1].length;	// 뒷자리 length값 세팅
		} else {
			arrNumData[1] = "";	// 뒷자리 빈스트링 세팅
		}
		
		for(nCountLen; nCountLen < nKey; nCountLen++){
			arrNumData[1] = arrNumData[1] + "0";	// 원하는 자리수 만큼 0을 붙임
		}
		
		return arrNumData[0] + "." + arrNumData[1];
		
	}
	
	return "";
};

/**
 * 소수점 이하 버림하여 몇자리까지 나오게 한다. (입력된 자리수 보다 작을경우 '0'을 붙여 리턴, 마지막 파라메타에 따라 숫자형 리턴)
 * 
 * @param param - -
 *            변환할 data
 * @param nKey -
 *            Integer - 리턴할 자리수, 0일경우 버림처리 후 소수점이하 안보임
 * @param bNoStr -
 *            Boolean - true일 경우 숫자형 리턴, 미입력시 문자형
 * @returns
 */
util.floor = function (value, nKey, bNoStr){
	
	/*if (util.chkReturn(param, "s") == ""){
		return "";
	} else if (util.chkReturn(nKey, "s") == "" || nKey < 0){
		return param;
	}
	
	var nCipher = 1;
	for (var i = 0; i < nKey; i++){
		nCipher = nCipher * 10; 
	}
	
	if (util.chkReturn(bNoStr) == true && bNoStr == true){	// 숫자형으로 리턴을 원할경우 바로
															// 계산하여 리턴
		return (Math.floor(Math.round(param * nCipher))) / nCipher;
	} else {
		var arrNumData = ((Math.floor(Math.round (param * nCipher))) / nCipher).toString().split(".");
		
		if (nKey == 0){	// 자리수가 0일경우 앞 정수부문 리턴
			return arrNumData[0];
		}
		
		var nCountLen = 0;	// 뒷자리 length 초기화
		if (util.chkReturn(arrNumData[1], "s") != ""){	// 뒷자리 null, undefined
														// 체크
			nCountLen = arrNumData[1].length;	// 뒷자리 length값 세팅
		} else {
			arrNumData[1] = "";	// 뒷자리 빈스트링 세팅
		}
		
		for(nCountLen; nCountLen < nKey; nCountLen++){
			arrNumData[1] = arrNumData[1] + "0";	// 원하는 자리수 만큼 0을 붙임
		}
		
		return arrNumData[0] + "." + arrNumData[1];
		
	}
	
	return "";*/
	
	value += '';
	nKey = nKey>>0;

	var arrValue = value.split ('.')
	, arrValueUnderZero = (arrValue[ 1 ] || '').split ('')
	, arrResult = []
	, i , length;

	for (i = 0, length = (nKey - arrValueUnderZero.length); i < length; i += 1) {

		arrValueUnderZero.push ('0');
	}

	arrValueUnderZero.length = nKey;

	arrResult[ 0 ] = arrValue[ 0 ];

	if (arrValueUnderZero.length > 0) {

		arrResult[ 1 ] = arrValueUnderZero.join ('');
	}
	return bNoStr ? (arrResult.join ('.') * 1) : arrResult.join ('.');
};

/**
 * 숫자의 3자리 자릿수 컴마 표시를 한다.(소수형도 같이 사용 가능) 입력된 값이 null, undefined, 빈스트링일 경우 대체
 * 텍스트를 표시할 수 있다.
 * 
 * @param strNum -
 *            String - 숫자형 문자열
 * @param strReText -
 *            String - 입력된 숫자형 문자열이 null, undefined일경우 대체 텍스트 미입력시 빈스트링 리턴
 * @returns
 */
util.setCommas = function (strNum, strReText){
	var bCheck = true;
	
	// 입력된 문자열이 숫자와 '.'으로만 이루어져 있는가? 빈스트링은 문자로 본다.
	if (util.isFloat(strNum) == false){
		bCheck = false;
	}
	
	if (bCheck){
		// strNum = String(Number(strNum));//13-
		strNum = strNum + "";
		var strfirstNum = strNum.split(".")[0];
		var strBackNum = "";

		if (strNum.split(".").length != 1){
			strBackNum = "." + strNum.split(".")[1];
		}
		
		var re = /,|\s+/g;
		strfirstNum = strfirstNum.replace(re, "");

	    re = /(-?\d+)(\d{3})/;
	    while (re.test(strfirstNum)) {
	    	strfirstNum = strfirstNum.replace(re, "$1,$2");
	    }
	    
	    return strfirstNum + strBackNum;
	} else {
		if (util.chkReturn(strReText, "s") == ""){
			return "";
		} else {
			return strReText;
		}
	}
};

/**
 * 숫자의 3자리 자릿수 컴마 삭제를 한다.(소수형도 같이 사용 가능) 입력된 값이 null, undefined, 빈스트링일 경우 대체
 * 텍스트를 표시할 수 있다.
 * 
 * @param strNum -
 *            String - 숫자형 문자열
 * @param strReText -
 *            String - 입력된 숫자형 문자열이 null, undefined일경우 대체 텍스트 미입력시 빈스트링 리턴
 * @returns
 */
util.getCommas = function (strNum, strReText){
	var bCheck = true;
	
	// null, undefined, 빈스트링 체크
	if (util.chkReturn(strNum, "s") == ""){
		bCheck = false;
	}
	
	if (bCheck){
		var re = /,/g;
	    return strNum.replace(re, "");
	} else {
		// null, undefined, 빈스트링 체크
		if (util.chkReturn(strReText, "s") == ""){
			return "";
		} else {
			return strReText;
		}
	}
};


/**
 * 텍스트 필드에 입력한 값에 3자리마다 콤마(,)를 붙인다. 텍스트 필드에 아래를 기입한다. onkeyup="toMoney(this)"
 * 
 * @param field
 *            텍스트 필드
 */
util.setCommaInput = function (field) {
    var value = field.value;
    
    if (util.chkReturn(value, "s") == ""){
    	return "";
    }
    	
    
    var indexOfPoint = value.indexOf(".");
    if (indexOfPoint == -1) {
// field.value = formatCommas(value);
    	field.value = util.setCommas(value);
    	
    } else {
// field.value = formatCommas(value.substring(0, indexOfPoint)) +
    	field.value = util.setCommas(value.substring(0, indexOfPoint)) +
                        value.substring(indexOfPoint, value.length);
    }
};

/**
 * 숫자 및 금액 기본입력형 리턴, bType을 true로 주면 자리수 표시된 정수(금액)로 리턴한다.
 * 
 * @param num
 * @returns
 */
util.setNum = function (num, bType){
	if (util.chkReturn(num, "s") == ""){
		return 0;
	}
	if(isNaN(String(num).replace(/[,]/g,""))){
		return 0;
	}
	if (num == ""){
		return 0;
	}
	if (util.chkReturn(bType)){
		if (bType){
			return util.setCommas(util.floor(num, 0));
		}
	} else {
		return num;
	}
	
	return num;
};

/**
 * 비율 표시. 소숫점 2자리 이하를 버림하여 소수점 2자리까지 표시 데이터를 넣으면 숫자형이 아닐 경우 0.00 으로 출력 (문자열일 경우
 * 숫자형 변환이 가능할 경우 해당 숫자 출력) bType을 true로 주면 자리수 표시된 정수로 리턴한다.
 * 
 * @param rate
 * @returns
 */
util.setRate = function (rate, bType){
	rate = Number(rate);
	if(isNaN(rate)){
		rate = 0.00;
	}
//	rate = Math.floor(rate * 100) / 100;	
	rate = util.floor(rate, 2, true);
	
	if (util.chkReturn(bType)){
		return util.setCommas(rate.toFixed(2));
	} else {
		return rate.toFixed(2);
	}
};

/**
 * 빈값을 -로 출력하는 함수 데이터가 출력이 가능한 형태이면 해당값을 출력하고 이외의 경우나 공백일 경우는 - 를 출력한다.
 * 
 * @param str
 * @returns
 */
util.setEmpty = function (str){
	if((typeof str == "string" && str.replace(/[\s]/g,"") != "") || typeof str == "number"){
		return str;
	}
	else{
		return "-";
	}
};

/**
 * 금액을 입력 받아서 한글 단위를 붙여줌 (억,만,천) - 단위 미만은 절사
 * @param money
 * @return Formatting Kor Money 
 */
util.setMoneyKorFormat = function( vMoney , vSect ){
	
	var vThousand 		= ''; 
	var vTenThousand 	= ''; 
	var vHundredMillion	= '';
	var vReturnVal		= '';
	
	if( util.setNum( vMoney ) <= 0 ){
	
		return "0원";
		
	}else{
		
		//금액을 단위별로 조합하여 출력
		if( undefined !== vSect && vSect == '2' ){
		
			if ( util.setNum( vMoney ) >= 1000 ) {
				
				vThousand 		= (Math.floor(util.setNum( vMoney ) / 1000) * 1000) 
									- (Math.floor(util.setNum( vMoney ) / 10000) * 10000);
				
				vThousand 		= Math.floor(util.setNum( vThousand ) / 1000);
				
				if( vThousand > 0 ){
					
					vThousand 		= vThousand + "천";
				
				}else{
					
					vThousand 		= "";
					
				}
			}
			
			if ( util.setNum( vMoney ) >= 10000 ) {
				
				vTenThousand 	= (Math.floor(util.setNum( vMoney ) / 10000) * 10000) 
									- (Math.floor(util.setNum( vMoney ) / 100000000) * 100000000);
				
				vTenThousand 	= Math.floor(util.setNum( vTenThousand ) / 10000);
				
				if( vTenThousand > 0 ){
					
					vTenThousand 	= vTenThousand + "만";
				
				}else{
					
					vTenThousand 	= "";
					
				}
				
			}
	
			if( util.setNum( vMoney ) >= 100000000 ) {
				
				vHundredMillion = Math.floor(util.setNum( vMoney ) / 100000000);
				
				if( vHundredMillion > 0 ){
					
					vHundredMillion	= vHundredMillion + "억";
				
				}else{
					
					vHundredMillion	= "";
					
				}
				
			}
			
			vReturnVal = vHundredMillion + vTenThousand + vThousand;
			
		}else if( undefined !== vSect && vSect == '3' ){
		
			if ( util.setNum( vMoney ) >= 1000 ) {
				
				vThousand 		= (Math.floor(util.setNum( vMoney ) / 1000) * 1000) 
									- (Math.floor(util.setNum( vMoney ) / 10000) * 10000);
				
				vThousand 		= Math.floor(util.setNum( vThousand ) / 1000);
				
				if( vThousand > 0 ){
					
					vThousand 		= vThousand + "천";
				
				}else{
					
					vThousand 		= "";
					
				}
			}else{
				vThousand = util.setNum(vMoney);
			}
			
			if ( util.setNum( vMoney ) >= 10000 ) {
				
				vTenThousand 	= (Math.floor(util.setNum( vMoney ) / 10000) * 10000) 
									- (Math.floor(util.setNum( vMoney ) / 100000000) * 100000000);
				
				vTenThousand 	= Math.floor(util.setNum( vTenThousand ) / 10000);
				
				if( vTenThousand > 0 ){
					
					vTenThousand 	= util.setCommas(vTenThousand) + "만";
				
				}else{
					
					vTenThousand 	= "";
					
				}
				
			}
	
			if( util.setNum( vMoney ) >= 100000000 ) {
				
				vHundredMillion = Math.floor(util.setNum( vMoney ) / 100000000);
				
				if( vHundredMillion > 0 ){
					
					vHundredMillion	= vHundredMillion + "억";
				
				}else{
					
					vHundredMillion	= "";
					
				}
				
			}
			
			vReturnVal = vHundredMillion + vTenThousand + vThousand;
			
		}
		
		//각 단위 미만 절사
		else {
			
			if( util.setNum( vMoney ) >= 100000000 ) {
				
				vHundredMillion = Math.floor(util.setNum( vMoney ) / 100000000);
				
				vReturnVal 		= vHundredMillion + "억원";
				
			}else if ( util.setNum( vMoney ) >= 10000 ) {
				
				vTenThousand 	= Math.floor(util.setNum( vMoney ) / 10000);
				
				vReturnVal 		= vTenThousand + "만원";
				
			}else if ( util.setNum( vMoney ) >= 1000 ) {
				
				vThousand 		= Math.floor(util.setNum( vMoney ) / 1000);
				
				vReturnVal 		= vThousand + "천원";
				
			}
		}
	}
	
	return vReturnVal;
};

/**
 * 성별코드에 따라서 남성, 여성을 붙여줌
 * @param vGndr
 * @return Gender Text
 */
util.setGadrKorStr = function( vGndr ){
	
	var vGadrKorStr	= '';
	var vReturnVal	= '';
	
	if (util.chkReturn(vGndr, "s") == ""){
		alert('성별코드를 확인해주세요.');
		return '';
	}
	
	//성별분류
	if( vGndr == "1" || vGndr == "3" || vGndr == "5" || vGndr == "7" ){
		
		vReturnVal	= '남성';
		
	}else if( vGndr == "2" || vGndr == "4" || vGndr == "6" || vGndr == "8" ){
		
		vReturnVal	= '여성';
		
	}else{
		
		vReturnVal	= '성별미확인';
		
	}
	
	
	return vReturnVal;
};

