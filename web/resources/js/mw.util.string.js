/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 기존 홈페이지 시스템
 * FILE INFO   : mw.util.string.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 문자열 관련 함수 집합
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
 * *** 문자열 관련 함수 ********************************************************
 *
 * util.lTrim		: 문자열 좌측의 공백 제거 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 * util.mTrim		: 문자열 중간의 공백 제거 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 * util.rTrim		: 문자열 우측의 공백 제거 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 * util.trim		: 공백 제거(좌우) 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 * util.replaceAll	: 문자열 치환
 * util.subStrL		: 입력된 str을 입력받은 길이만큼 왼쪽에서부터 잘라서 return 한다.
 * util.subStrR		: 입력된 str을 입력받은 길이만큼 오른쪽에서부터 잘라서 return 한다.
 * util.setJuminBar	: 주민등록 번호 '-'를 추가한다.
 * util.setHtmlParsing	: html 특사 문자코드등을 html로 변환 한다.
 * util.setHtmlParsing2	: html 특사 문자코드,엔터 등을 text 변환 한다.
 * util.parseToBrTag : HTML entity 이루어진 br 태그를 html 형태로 변환
 * util.setStrCutDot : 일정길이 만큼 텍스트를 잘라내고 접미어를 붙인다.
 * util.removeSpace : 문자열 사이에 있는 space를 삭제함.
 * util.calcBytes   : 문자열길이 체크.영문인지 한글인지 체크해서 길이를 반환
 * util.getBytesLength : 설정한 byte 길이까지 문자열을 잘라서 반환
 *
 ******************************************************************************/

/**
 * 문자열 좌측의 공백 제거 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 *
 * @param strParam
 * @returns
 */
util.lTrim = function (strParam) {
	if (util.chkReturn(strParam, "s") == ""){
		return "";
	}

	while (strParam.substring(0, 1) == ' '){
		strParam = strParam.substring(1, strParam.length);
	}

	return strParam;
};

/**
 * 문자열 중간의 공백 제거 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 *
 * @param strParam
 * @returns
 */
util.mTrim = function (strParam) {
	if (util.chkReturn(strParam, "s") == ""){
		return "";
	}

	for ( var i = 0; i < strParam.length; i++) {
		if (strParam.substring(i, i + 1) == ' ')
			strParam = strParam.substring(0, i) + strParam.substring(i + 1, strParam.length);
	}
	return strParam;
};

/**
 * 문자열 우측의 공백 제거 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 *
 * @param strParam
 * @returns
 */
util.rTrim = function (strParam) {
	if (util.chkReturn(strParam, "s") == ""){
		return "";
	}

	while (strParam.substring(strParam.length - 1, strParam.length) == ' ')
		strParam = strParam.substring(0, strParam.length - 1);
	return strParam;
};

/**
 * 공백 제거(좌우) 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 *
 * @param strParam
 * @returns {String}
 */
util.trim = function (strParam){
	if (util.chkReturn(strParam, "s") == ""){
		return "";
	}

	var strReData = "";
	strReData = util.lTrim(strParam);
	strReData = util.rTrim(strReData);

	return strReData;
};

/**
 * 좌측에 공백 추가
 *
 * @param str
 * @param len
 * @param chr
 * @returns {String}
 */
util.lpad = function (str, len, chr){

	str += '';
	len = len>>0;

	if (!str || !chr || !len || str.length >= len) {

		return str;
	}

	while (str.length < len) {

		str = '0' + str;
	}

	return str;
};


/**
 * 문자열 치환
 *
 * @param strString -
 *            String - 대상 문자열
 * @param strChar -
 *            String - 변경할 문자열
 * @param strChar -
 *            String - 변경될 문자열
 * @returns 변경된 문자열
 */
util.replaceAll = function (strString, strAfter, strNext) {

	if (util.chkReturn(strString) == false){
		return "";
	}

	if (util.chkReturn(strAfter, "s") == "" || util.chkReturn(strNext) == false){
		alert("파라메타를 확인해 주세요.");
	}

	// if (strAfter == "."){ // '.'은 정규식으로 처리되지 않아 별도 처리
		var tmpStr = strString;
		while(tmpStr.indexOf(strAfter) != -1) {
			tmpStr = tmpStr.replace(strAfter, strNext);
		}
		return tmpStr;
	// }

	// return strString.replace(eval("/" + strAfter + "/gi"), strNext);
};

/**
 * 입력된 str을 입력받은 길이만큼 왼쪽에서부터 잘라서 return 한다.
 *
 * @param str -
 *            String - 대상 문자열
 * @param len -
 *            Integer - 자를 길이
 * @returns
 */
util.subStrL = function (str, len, strToken) {
	if (util.chkReturn(str) == false || util.chkReturn(len, "s") == ""){
		// alert("util.subStr : 파라메터를 확인해 주십시오.");
		if (util.chkReturn(strToken, "s") == ""){
			return "";
		} else {
			return strToken;
		}
	}

	str = str.substr(0, len);
	return str;
};


/**
 * 입력된 str을 입력받은 길이만큼 오른쪽에서부터 잘라서 return 한다.
 *
 * @param str -
 *            String - 대상 문자열
 * @param len -
 *            Integer - 자를 길이
 * @param strToken -
 *            String - 예외시 대체 문자열
 * @returns
 */
util.subStrR = function (str, len, strToken) {
	if (util.chkReturn(str) == false || util.chkReturn(len, "s") == ""){
		// alert("util.subStrR : 파라메터를 확인해 주십시오.");
		if (util.chkReturn(strToken, "s") == ""){
			return "";
		} else {
			return strToken;
		}
	}

	str = str.substr(str.length - len, str.length);
	return str;
};

/**
 * 주민등록 번호 '-'를 추가한다.
 *
 * @param strJumin -
 *            String - 문자열 주민등록번호
 */
util.setJuminBar = function (strJumin){
	if (util.chkReturn(strJumin, "s") == ""){
		return "";
	}

	var strJuminC = strJumin + "";
	if (strJuminC.length < 13){
		return strJumin;
	} else if (strJuminC.length >= 13){
		strJuminC = util.replaceAll(strJuminC, "-", "");
		if (strJuminC.length != 13){
			return strJumin;
		}
	}

	return strJuminC.substring(0, 6) + "-" + strJuminC.substring(6, 13);
};

util.getBankNm = function (strData){

	if (util.chkReturn(strData, "") == ""){
		return "";
	}

	if (strData.indexOf("(") != -1){
		return strData.split("(")[0];
	}

	return strData;

};

/**
 * 좌측에 0 채우기
 *
 * @param input
 *            숫자 (문자열 또는 숫자)
 * @param cipher
 *            자릿수 (10자리이면 10입력)
 * @returns 55 입력 10자리로 호출시 0000000055를 리턴
 */
util.setZero = function (input, cipher){
	if(isNaN(input)){
		return input;
	}
	input 			= String(input);
	var inputLen 	= input.length; // 입력값 자릿수
	var zeroLen 	= cipher - inputLen;

	if(zeroLen <= 0){
		return input;
	}

	var zeroStr = "";
	for(var i=0; i<zeroLen; i++){
		zeroStr += "0";
	}
	return zeroStr + input;

};
/**
 * 좌측에 0 채우기
 *
 * @param input
 *            숫자 (문자열 또는 숫자)
 * @param cipher
 *            자릿수 (10자리이면 10입력)
 * @returns 55 입력 10자리로 호출시 0000000055를 리턴
 */
util.setZeroRight = function (input, cipher){
	if(isNaN(input)){
		return input;
	}
	input 			= String(input);
	var inputLen 	= input.length; // 입력값 자릿수
	var zeroLen 	= cipher - inputLen;

	if(zeroLen <= 0){
		return input;
	}

	var zeroStr = "";
	for(var i=0; i<zeroLen; i++){
		zeroStr += "0";
	}
	return input + zeroStr ;

};


/**
 * 특수문자등 html형식의 문자를 text타입으로 파싱한다
 * @param strHtmlData
 * @returns
 */
util.getHtmlText = function (strHtmlData){
	util.setHtmlParsing(strHtmlData);

};

util.getHtmlText2 = function (strHtmlData){
	return util.setHtmlParsing2(strHtmlData);

};

/**
 * 특수문자 코드표의 html code를 symbol data로 파싱 한다.
 * 필요한 것만 추가 하였으면 더 필요시 추가 필요.
 * @param strData
 * @returns
 */
util.setDefaultHtmlEntityNumberParsing = function (strData){
	strData = util.replaceAll(strData, "&#33;", "!");
	strData = util.replaceAll(strData, "&#34;", '"');
	strData = util.replaceAll(strData, "&#35;", "#");
	strData = util.replaceAll(strData, "&#36;", "$");
	strData = util.replaceAll(strData, "&#37;", "%");
	strData = util.replaceAll(strData, "&#38;", "&");
	strData = util.replaceAll(strData, "&#39;", "'");
	strData = util.replaceAll(strData, "&#40;", "(");
	strData = util.replaceAll(strData, "&#41;", ")");
	strData = util.replaceAll(strData, "&#42;", "*");
	strData = util.replaceAll(strData, "&#43;", "+");
	strData = util.replaceAll(strData, "&#44;", ",");
	strData = util.replaceAll(strData, "&#45;", "-");
	strData = util.replaceAll(strData, "&#46;", ".");
	strData = util.replaceAll(strData, "&#47;", "/");

	strData = util.replaceAll(strData, "&#58;", ":");
	strData = util.replaceAll(strData, "&#59;", ";");
	strData = util.replaceAll(strData, "&#60;", "<");
	strData = util.replaceAll(strData, "&#61;", "=");
	strData = util.replaceAll(strData, "&#62;", ">");
	strData = util.replaceAll(strData, "&#63;", "?");
	strData = util.replaceAll(strData, "&#64;", "@");

	strData = util.replaceAll(strData, "&#91;", "[");
	strData = util.replaceAll(strData, "&#92;", "\\");
	strData = util.replaceAll(strData, "&#93;", "]");
	strData = util.replaceAll(strData, "&#94;", "^");
	strData = util.replaceAll(strData, "&#95;", "_");
	strData = util.replaceAll(strData, "&#96;", "`");

	strData = util.replaceAll(strData, "&#123;", "{");
	strData = util.replaceAll(strData, "&#124;", "|");
	strData = util.replaceAll(strData, "&#125;", "}");
	strData = util.replaceAll(strData, "&#126;", "~");

	return strData;
};



/**
 * html특수문자 코드등을 html text로 변환한다.
 */
util.setHtmlParsing = function (strData){
	strData = util.setDefaultHtmlEntityNumberParsing(strData);	// 특수문자 코드표의 html code를 symbol data로 파싱

	// Entity Name parsing
	strData = util.replaceAll(strData, "&amp;", "&");
	strData = util.replaceAll(strData, "&lt;", "<");
	strData = util.replaceAll(strData, "&gt;", ">");
	strData = util.replaceAll(strData, "&nbsp;", " ");

	strData = util.replaceAll(strData, "\r\n", "<br />");
	strData = util.replaceAll(strData, "\\n", "<br />");
	//strData = strData.replace(/(\n)/g,"<br />");
	strData = strData.replace(/\r/g,"<br />");

	return strData;
};

/**
 * html특수문자 코드등을 html text로 변환한다.
 * textarea용...
 */
util.setHtmlParsing2 = function (strData){
	strData = util.setDefaultHtmlEntityNumberParsing(strData);	// 특수문자 코드표의 html code를 symbol data로 파싱

	// Entity Name parsing
	strData = util.replaceAll(strData, "&amp;", "&");
	strData = util.replaceAll(strData, "&lt;", "<");
	strData = util.replaceAll(strData, "&gt;", ">");
	strData = util.replaceAll(strData, "&nbsp;", " ");

	var ua = window.navigator.userAgent;
	if (ua.indexOf("MSIE") > -1) {
		strData = util.replaceAll(strData, "\r\n", "\r");
		strData = util.replaceAll(strData, "\n", "\r");
	}

	return strData;
};

/**
 * html특수문자 코드등을 html text로 변환한다.
 * namo edit용
 */
util.setHtmlParsingNamo = function (strData){
	strData = util.setDefaultHtmlEntityNumberParsing(strData);	// 특수문자 코드표의 html code를 symbol data로 파싱

	// Entity Name parsing
	strData = util.replaceAll(strData, "&amp;", "&");
	strData = util.replaceAll(strData, "&lt;", "<");
	strData = util.replaceAll(strData, "&gt;", ">");
//	strData = util.replaceAll(strData, "&nbsp;", " ");	// 제외

	strData = util.replaceAll(strData, "\r\n", "<br />");
	strData = util.replaceAll(strData, "\n;", "<br />");
	strData = strData.replace(/(\n)/g,"<br />");
	strData = strData.replace(/\r/g,"<br />");

	return strData;
};

/**
 * HTML entity로 이루어진 br 태그를 html 형태로 변환
 * &lt;br \/&gt; ==> <br />
 * @param target - string: 변환할 문자열
 */
util.parseToBrTag = function(target) {

	var src = target;

	if(util.isNull(target)){
		return target;
	}

	src = src.replace(/&lt;br \/&gt;/g, "<br />");

	return src;
}

/**
 * 일정길이 만큼 텍스트를 잘라내고 접미어를 붙인다.
 * @param strTxt	- String - 문자열
 * @param nCutLng	- Integer - 잘라낼 길이
 * @param strReTxt	- String - 접미어 : 미입력시 '...'
 * @returns
 */
util.setStrCutDot = function (strTxt, nCutLng, strReTxt){
	var strText = util.chkReturn(strTxt, "s");
	var nCutLeng = util.chkReturn(nCutLng, "n");
	var strReText = util.chkReturn(strReTxt, "s", "...");
	var nStrTextLen = strText.length;

	if (nCutLeng == 0 || nStrTextLen < nCutLeng){
		return strText;
	}

	return strText.substring(0, nCutLeng) + strReText;
};

/**
 * 문자열 사이에 있는 space를 삭제함.
 * @param source
 * @returns
 */
util.removeSpace = function(source) {

	if ( ! util.isNull(sources)) {
		var spaces = /\s/g;
		return source.replace(spaces, '');
	} else {
		return source;
	}

};

/**
 * 입력데이터가 숫자이거나 숫자형 문자열일 경우 숫자를 반환, 그외의 경우 0을 반환하는 함수 0으로 반환되는 경우 null,
 * undefined, 문자열이면서 숫자형태가 아닌 데이터, 오브젝트 등.
 *
 * @param num
 * @returns returnNum
 */
util.Number = function(num) {
	var returnNum = 0;
	/*
	 * if(typeof num == "string"){ if((!/[^0-9\.\-]/.test(num)) &&
	 * (num.indexOf(".")==num.lastIndexOf(".")) &&
	 * (num.indexOf("-")==-1||num.indexOf("-")==0) ){ returnNum = Number(num); }
	 * }else if(typeof num == "number"){ returnNum = num; }
	 */
	if(!isNaN(num)){
		returnNum = Number(num);
	}
	return returnNum;
};


/**
 * 입력된 숫자를 한글단위로 만든다 입력 : 숫자, 또는 숫자형 문자, 단위 출력 : 한글숫자 예) 111 입력시 백십일 출력
 *
 * @param str
 *            숫자, 또는 숫자형 문자
 * @param unit
 *            단위. 1000 입력후 111 입력시 십일만천 출력
 * @returns {String}
 */
util.makeHanNum = function(str, unit) {
	// 단위 배열
	var unitTen 	= ["","일","이","삼","사","오","육","칠","팔","구"];// 십단위 10 (0~9)
	var unitTenThd 	= ["","십","백","천"];// 만단위수
	var unitLimit 	= ["","만","억","조","경","해"];// 이후단위 가변적 - 한계단위수
	var hanAmt 		= "";//

	str = String(str).replace(/[^0-9]/g,"");// 금액등의 입력에 대한 체크로 입력데이터를 숫자로 치환
	str = unit == undefined ? str : String(str * unit);
	strLen = str.length;// 숫자 자리수

	var curUnitTenThd	= 0;// 최초단위의 만단위수
	var curUnitLimit 	= 0;// 최초단위의 한계단위수

	var limitViewCnt = 0;		// 현재 변환중인 자릿수 저장
	var limitViewFlag = [false,true,true,true,true,true];	// 만단위를 표시할지에 대한 플래그

	// 숫자의 가장 뒷자리 부터 숫자를 체크하여 한글로 바꾼다)
	for(var i = strLen-1;i >= 0; i--){
		var limitFlag 	= curUnitLimit % 4 == 0 ? 1 : 0;// 한계단위 체크 1일경우 만단위 출력하는
														// 경우
		var curUT 		= Number(str.charAt(i));// 10단위
		var curUTT 		= curUT == 0 ? 0 : curUnitTenThd % 4;// 10000단위
		var curUL		= parseInt(curUnitLimit / 4, 10) * limitFlag;// 한계단위

		// 만단위 (10,000~99,990,000)의 숫자가 없을경우 억단위 이상일경우 '만'을 지워주기 위한 처리
		if(curUT != 0){
			limitViewFlag[parseInt(limitViewCnt/4, 10)] = false;
		}

		if(curUT == 1 && limitFlag == 0) curUT = 0;

		hanAmt 	= unitTen[curUT]
				+ unitTenThd[curUTT]
				+ unitLimit[curUL]
				+ hanAmt;

		curUnitTenThd++;
		curUnitLimit++;
		limitViewCnt++;
	}
	// 만단위 삭제여부에 따라 치환
	for(var i=1; i<limitViewFlag.length; i++){
		if(limitViewFlag[i]){
			hanAmt = hanAmt.replace(unitLimit[i], '');
		}
	}
	return hanAmt;
};


/**
 * html형 특수문자 치환
 * @param strData
 * @returns
 */
util.getNamoReplace = function(strData){
	strData = util.replaceAll(strData , '&lt;', "<");
	strData = util.replaceAll(strData , '&#34;', '"');
	strData = util.replaceAll(strData , '&#39;', "'");
	strData = util.replaceAll(strData , '&gt;', ">");

	return strData;
};

/**
 * nvl 처리
 */
util.nvl = function (ogStr, rpStr) {

	if (util.isNull(ogStr)) {
		return rpStr;
	} else {
		return ogStr;
	}

};


/**
 * 문자열길이 체크.영문인지 한글인지 체크해서 길이를 반환
 */
util.calcBytes = function(Value){
  var tcount = 0;

  var tmpStr = new String(Value);
  var temp = tmpStr.length;

  var onechar;
  for ( k=0; k<temp; k++ )
  {
    onechar = tmpStr.charAt(k);
    if (escape(onechar).length > 4)
    {
      tcount += 3;// 한글
    }
    else
    {
      tcount += 1;// 영문
    }
  }

  return tcount;
};
/**
 * 금액 텍스트화
 * @returns {String}
 */
util.makeMoneyTxt = function (amt){
	var insuAmt = util.floor((util.floor(amt,0))/100000000,4);
		insuAmt = (insuAmt.split("."));
	var insuAmt1 = insuAmt[0];
	var insuAmt2 = insuAmt[1];
	var insuAmtTxt = (Number(insuAmt1)>0 ? Number(insuAmt1)+"억":"") + (Number(insuAmt2)>0 ? Number(insuAmt2)+"만":"")+"원";

	return insuAmtTxt;
};

/**
 * 금액 텍스트화
 * @returns {String}
 * */
util.makeMoneyTxt2 = function (amt, isLabel) {

	isLabel = isLabel || false;

	var fullAmtTxt = Math.floor ((Math.floor (amt)/100000)) + ''
	, arrAmtLabel = ['억', '천', '백', '십']
	, arrAmt = []
	, arrResultText = []
	, fixValue = 4;


	if (!amt) {
		return '';
	}

	arrAmt = fullAmtTxt.split ('');
	fixValue -= arrAmt.length;

	$.each (arrAmt, function (idx, amt) {

		if (amt == '0') {
			return true;
		}
		arrResultText.push (amt);
		arrResultText.push (arrAmtLabel[ idx + fixValue ]);
	});

	// 억단위 이하 금액이 있을 때 + '만원'을 붙인다.
	if (isLabel && !(arrResultText.length == 2 && arrResultText[ 1 ] == '억')) {

		arrResultText.push ('만원');
	}
	return arrResultText.join ('');
};

util.makeMoneyTxt4 = function (amt) {
	
	var fullAmtTxt = Math.floor ((Math.floor (amt)/1000000)) + ''
	, arrAmtLabel = ['억', '천', '백']
	, arrAmt = []
	, arrResultText = []
	, fixValue = 3; 
	
	if (!amt) {
		return '0';
	}
	
	arrAmt = fullAmtTxt.split ('');
	fixValue -= arrAmt.length;
	
	$.each (arrAmt, function (idx, amt) {
		
		if (amt == '0') {
			return true;
		}
		arrResultText.push (amt);
		arrResultText.push (arrAmtLabel[ idx + fixValue ]);
	});
	
	if(util.Number(amt)<100000000){
		return arrResultText.join ('')+"만";	
	}else{
		return arrResultText.join ('');
	}
};

util.getBytesLength = function(str, bytesLength) {
	var result = '';
	var byte  = 0;

	for(i in str) {
		byte += util.calcBytes(str[i]);
		if (byte <= bytesLength) result += str[i];
		else break;
	}
	return result;
};