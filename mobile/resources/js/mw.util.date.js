/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 기존 홈페이지 시스템
 * FILE INFO   : mw.util.date.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 날짜 관련 함수 집합
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
 * *** 날짜 처리 관련 함수 *****************************************************
 * 
 * util.isDate		: 입력된 문자열이 YYYYMMDD의 날짜형식인지 확인한다.
 * util.isDate6		: 입력된 문자열이 YYYYMM의 날짜형식인지 확인한다.
 * util.setFmDate	: YYYYMMDD 형식 문자열을 YYYY-MM-DD 형식으로 변환 - strToken 미입력시는 "-"으로 기본 파싱하며 값이 있을경우 해당값으로 파싱
 * util.setDotFmDate: YYYYMMDD 형식 문자열을 YYYY.MM.DD 형식으로 변환 - strToken 미입력시는 "-"으로 기본 파싱하며 값이 있을경우 해당값으로 파싱
 * util.setFmDateTime : 년월일시분초(yyyyMMddHHmmss) 를 yyyy-MM-dd HH:mm:ss 포메팅한다. 혹은 yyyyMMddHHmm를 yyyy-MM-dd HH:mm로 변경
 * 						변수 nType을 6을 세팅할경우 yyyy-MM-dd만 리턴
 * 						변수 nType을 12을 세팅할경우 yyyy-MM-dd HH:mm만 리턴
 * util.getDate		: 서버 날짜를 yyyyMMdd 형식으로 추출한다. - strToken 값을 줄경우 해당 구분자를 삽입한다.
 * util.getTime		: 서버 시간을 HHmm 형식으로 추출한다. - strToken 값을 줄경우 해당 구분자를 삽입하고, strSec 값을 줄경우 초까지 리턴
 * util.getDateTime	: 서버 날짜와 시간을 가져온다. yyyyMMddHHmmss형식으로 리턴한다.
 * util.addDate		: yyyyMMdd 타입의 날짜를 받아 년,월,일에 날짜를 더하거나 뺀다. - 변수 strReType에 'n'을 세팅하면 int형으로 리턴한다.
 *  
 * *** 달력관련 함수 **********************************************************
 * 
 * util.setCalendar1j	: Input Calendar 조회 시작일 1주전 날짜, 조회 종료일 금일 날짜 세팅
 * util.setCalendar15d	: Input Calendar 조회 시작일 15일전 날짜, 조회 종료일 금일 날짜 세팅
 * util.setCalendar1m	: Input Calendar 조회 시작일 1개월전 날짜, 조회 종료일 금일 날짜 세팅
 * util.setCalendar3m	: Input Calendar 조회 시작일 3개월전 날짜, 조회 종료일 금일 날짜 세팅
 * util.setCalendarDate	: 조회시작일, 조회종료일 inputbox에 날짜를 세팅한다.(util.setCalendar1j 등에서 사용 한다.)
 * util.chkDateStartUp	: 조회시작일과 조회종료일을 비교하여 조회 시작일이 조회종료일 이후일경우 false 리턴
 * util.chkDateToDay	: 조회일이 금일 이후 날짜인지 판단하여 이후일경우 false 리턴
 * util.chkDateGap		: 조회시작일과 조회종료일이 특정 일수 차이인지 판단하여 범위 밖일경우 false 리턴
 * util.chkCalendar01	: 조회시작일과 조회종료일이 있는 두개의 Calendard의 벨리데이션 체크를 한다.(특정 일수 차이 1년으로 고정되어 있음.)
 * 
 ******************************************************************************/

/*******************************************************************************
 * 날짜 처리 관련 함수
 ******************************************************************************/

/**
 * 서버 날짜와 시간을 가져온다. yyyyMMddHHmmss형식으로 리턴한다.
 * @returns {String}
 */
util.getDateTime = function () {
	var dtServerDate = util.getServerTime();
	
	var strYear = "" + dtServerDate.getFullYear();
	var strMonth = "" + (dtServerDate.getMonth() + 1);
	var strDay = "" + dtServerDate.getDate();
	var strHour = "" + dtServerDate.getHours();
	var strMinute = "" +  dtServerDate.getMinutes();
	var strSecond = "" +  dtServerDate.getSeconds();
	
	if (strMonth.length == 1) {strMonth = "0" + strMonth;}
    if (strDay.length == 1) {strDay = "0" + strDay;}
    if (strHour.length == 1) {strHour = "0" + strHour;}
	if (strMinute.length == 1) {strMinute = "0" + strMinute;}
	if (strSecond.length == 1) {strSecond = "0" + strSecond;}
	
	return strYear + strMonth + strDay + strHour + strMinute + strSecond;
};

/**
 * 서버 시간 Object를 가져 옵니다
 */
util.getServerTime = function () {
	var dtServerDate = null;
	
	/**
	 * 2015-01-02 권대준 수정
	 * TODO: 서버 시간을 로컬시간 획득으로 수정.
	 * 		 추후 변경 해야 함.
	 */
	dtServerDate = new Date();
	
	/*
	if(navigator.appName.indexOf("Microsoft")!=-1){
		
		// 임시. 익스플로어에서 로컬 시간 사용.
		dtServerDate = new Date();
		
	}else{
		var xhr = new XMLHttpRequest();
		var url = location.protocol + "//" +location.host+"/common/view/MAXINACTIVEINTERVAL.ajax";
		
		xhr.open("POST",url, false);
		//xhr.open("POST", location.protocol + "//" +location.host+"/products/common/saveWeblog.ajax", false);
		
		//xhr.open("POST", location.host+"?inflow="+inflow, false);
		
		xhr.send(null);
		
		dtServerDate = new Date(xhr.getResponseHeader("Date"));
		
	}
	*/
	
	return dtServerDate;
};

/**
 * 서버 시간을 HHmm 형식으로 추출한다. strToken 값을 줄경우 해당 구분자를 삽입한다. strSec 값을 줄경우 초까지 리턴
 * 
 * @param strToken -
 *            String - 구분자 값, ":"을 입력하면 HH:mm 형태로 리턴
 * @param strSec -
 *            String - "s"삽입할 경우 초단위까지 리턴하게 된다.
 * @returns {String} - 시간형식의 문자열
 */
util.getTime = function (strToken, strSec) {
	//var xhr = new XMLHttpRequest();
	/*
	 * if ((location.host).indexOf("localhost") == -1){
	 * xhr.open("POST",location.host, false); } else { xhr.open("POST",
	 * location.protocol + "//" + location.host, false); }
	 */
	/*
	xhr.open("POST", location.protocol + "//" + location.host, false);  
	xhr.send(null);
	
	var dtServerDate = new Date(xhr.getResponseHeader("Date"));
	
	
	 * 임시. 익스플로어에서 로컬 시간 사용.
	
	if(navigator.appName.indexOf("Microsoft")!=-1){
		dtServerDate = new Date();
	}
	 */
	
	
	var dtServerDate = util.getServerTime();
	
	var strHour = "" + dtServerDate.getHours();
	var strMinute = "" +  dtServerDate.getMinutes();
	var strSecond = "" +  dtServerDate.getSeconds();
	
	if (strHour.length == 1) {strHour = "0" + strHour;}
	if (strMinute.length == 1) {strMinute = "0" + strMinute;}
	if (strSecond.length == 1) {strSecond = "0" + strSecond;}
	
	var strNextToken = "";
	if (util.chkReturn(strToken, "s") != ""){
		strNextToken = strToken;
	}
	
	if (util.chkReturn(strSec, "s") != ""){
		return strHour + strNextToken + strMinute + strNextToken + strSecond;
	}
	
	return strHour + strNextToken + strMinute;// + strNextToken + strSecond;
};

/**
 * 서버 날짜를 yyyyMMdd 형식으로 추출한다. strToken 값을 줄경우 해당 구분자를 삽입한다.
 * 
 * @param strToken -
 *            String - 구분자 값, "-"을 입력하면 yyyy-MM-dd 형태로 리턴 "년월일"로 입력시 yyyy년 MM월
 *            dd일 형태로 리턴
 * @returns {String} - 날짜형식의 문자열
 */
util.getDate = function (strToken) {
	/*
	 * if ((location.host).indexOf("localhost") == -1){
	 * xhr.open("POST",location.host, false); } else { xhr.open("POST",
	 * location.protocol + "//" + location.host, false); }
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", location.protocol + "//" + location.host, false);
	xhr.send(null);
	
	var dtServerDate = new Date(xhr.getResponseHeader("Date"));
	2013-05-23 강종철 
	아래 로직으로 수정합니다 
	 */
	
	 
	var dtServerDate =util.getServerTime();
	 
	
	var strYear = "" + dtServerDate.getFullYear();
	var strMonth = "" + (dtServerDate.getMonth() + 1);
	var strDay = "" + dtServerDate.getDate();
	
	if (strMonth.length == 1) {strMonth = "0" + strMonth;}
    if (strDay.length == 1) {strDay = "0" + strDay;}
    
    var strNextToken = "";
    if (util.chkReturn(strToken, "s") != ""){
    	if (strToken == "년월일"){
    		return strYear + "년 " + strMonth + "월 " + strDay + "일";
    	} else {
    		strNextToken = strToken;
    	}
    }
    
    return strYear + strNextToken + strMonth + strNextToken + strDay;
};

/**
 * 입력된 문자열이 yyyyMMdd의 날짜형식인지 확인한다.
 * 
 * @param -
 *            String - "YYYYMMDD" 형식의 날짜 스트링
 * @returns - Boolean - 날짜형식일경우 true, 날짜가 아닐경우 false
 */
util.isDate = function (curdate) {
	var i, year, month, day;

	if (util.chkReturn(curdate) == false || curdate.length < 8){
		return false;
	}

	for (i = 0; i < curdate.length; i++) {
		if ((curdate.charAt(i) < "0") || (curdate.charAt(i) > "9")) {
			return false;
		}
	}

	if (util.lTrim(curdate.substring(0, 4), "0").length == 0){
		return false;
	} else {
		year = parseInt(util.lTrim(curdate.substring(0, 4), "0"), 10);
	}

	if (util.lTrim(curdate.substring(4, 6), "0").length == 0){
		return false;
	} else {
		month = parseInt(util.lTrim(curdate.substring(4, 6), "0"), 10);
	}

	if (util.lTrim(curdate.substring(6, 8), "0").length == 0){
		return false;
	} else {
		day = parseInt(util.lTrim(curdate.substring(6, 8), "0"), 10);
	}

	if (year == 0){
		return false;
	}
	if (month == 0 || month > 12){
		return false;
	}

	if (day == 0 || day > util.getLastDay(year, month)){
		return false;
	}

	return true;
};

/**
 * 입력된 문자열이 yyyyMM의 날짜형식인지 확인한다.
 * 
 * @param -
 *            String - "YYYYMM" 형식의 날짜 스트링
 * @returns - Boolean - 날짜형식일경우 true, 날짜가 아닐경우 false
 */
util.isDate6 = function (curdate) {
	var i, year, month, day;

	if (util.chkReturn(curdate) == false || curdate.length < 6){
		return false;
	}

	for (i = 0; i < curdate.length; i++) {
		if ((curdate.charAt(i) < "0") || (curdate.charAt(i) > "9")) {
			return false;
		}
	}

	if (util.lTrim(curdate.substring(0, 4), "0").length == 0){
		return false;
	} else {
		year = parseInt(util.lTrim(curdate.substring(0, 4), "0"), 10);
	}

	if (util.lTrim(curdate.substring(4, 6), "0").length == 0){
		return false;
	} else {
		month = parseInt(util.lTrim(curdate.substring(4, 6), "0"), 10);
	}

	if (month > 12){
		return false;
	}
	
	return true;
};

/**
 * 해당 년월의 마지막날 구하기
 */
util.getLastDay = function (year, month) {
	var day = new Date(new Date(year, month, 1)- 86400000).getDate();
	if(year == 9999){
		day = 99;
	}
	if(day.length == 1){
		day = "0"+day;
	}
	return day;
};

/**
 * YYYYMMDD 형식 문자열을 YYYY-MM-DD 형식으로 변환 strToken 미입력시는 "-"으로 기본 파싱하며 값이 있을경우
 * 해당값으로 파싱
 * 
 * @param strDate -
 *            String - YYYYMMDD 형식으로 문자열
 * @param strToken -
 *            String - "."등 형식으로 변환 원할경우 사용, 미입력시 "-"로 파싱 "년월일"일 경우 "YYYY년 MM월
 *            DD일"로 리턴한다.
 * @returns String - 변경된 문자열
 */
util.setFmDate = function (strDate, strToken) {

	if (util.chkReturn(strDate, "s") == ""){
		return "";
	}
	
	var date = util.replaceAll(strDate, "-", "");
	date = util.replaceAll(date, ".", "");
	
	if (util.isDate6(date) == false){
		message.alert('COM014');
		return strDate;
	} 
	
	if (date.length == 8 && util.isDate(date) == false) {
		message.alert('COM014');
		return strDate;
	}
	
	var strSetToken = "-";
	if (util.chkReturn(strToken) == true){
		strSetToken = strToken;
	}

	var strYear = date.substring(0, 4);
	var strMonth = date.substring(4, 6);
	var strDay = "";
	
	if (date.length == 8){
		strDay = date.substring(6, 8);
		if (strSetToken == "년월일"){
			return strYear + "년 " + strMonth + "월 " + strDay + "일";
		} else {
			return strYear + strSetToken + strMonth + strSetToken + strDay;
		}
	}
	
	return strYear + strSetToken + strMonth;
};

/**
 * YYYYMMDD 형식 문자열을 YYYY-MM-DD 형식으로 변환 strToken 미입력시는 "-"으로 기본 파싱하며 값이 있을경우
 * 해당값으로 파싱
 * 
 * @param strDate -
 *            String - YYYYMMDD 형식으로 문자열
 * @param strToken -
 *            String - "."등 형식으로 변환 원할경우 사용, 미입력시 "-"로 파싱 "년월일"일 경우 "YYYY년 MM월
 *            DD일"로 리턴한다.
 * @returns String - 변경된 문자열
 */
util.setDotFmDate = function (strDate, strToken) {

	if (util.chkReturn(strDate, "s") == ""){
		return "";
	}
	
	var date = util.replaceAll(strDate, "-", "");
		date = util.replaceAll(date, ".", "");
	
	if (util.isDate6(date) == false){
		message.alert('COM014');
		return strDate;
	}
	
	if (date.length == 8 && util.isDate(date) == false) {
		message.alert('COM014');
		return strDate;
	}
	
	var strSetToken = ".";
	if (util.chkReturn(strToken) == true){
		strSetToken = strToken;
	}

	var strYear 	= date.substring(0, 4);
	var strMonth 	= date.substring(4, 6);
	var strDay		= "";
	
	if (date.length == 8){
		strDay = date.substring(6, 8);
		if (strSetToken == "년월일"){
			return strYear + "년 " + strMonth + "월 " + strDay + "일";
		} else {
			return strYear + strSetToken + strMonth + strSetToken + strDay;
		}
	}
	
	return strYear + strSetToken + strMonth;
};

/**
 * 년월일시분초(yyyyMMddHHmmss) 를 yyyy-MM-dd HH:mm:ss 포메팅한다. 혹은 yyyyMMddHHmm를
 * yyyy-MM-dd HH:mm로 변경 변수 nType을 6을 세팅할경우 yyyy-MM-dd만 리턴 변수 nType을 12을 세팅할경우
 * yyyy-MM-dd HH:mm만 리턴
 * 
 * @param strDateTime -
 *            String - 길이 12 or 14의 문자열 혹은 숫자
 * @param nType -
 *            Integer - 보일 타입
 * @returns yyyy-MM-dd HH:mm:ss 포메팅된 문자열
 */
util.setFmDateTime = function (strDateTime, nType) {
	var strOrgDataTime = "";
	var strDate = "";
	var strTime = "";
	var nLength = 0;
	
	if (util.chkReturn(strDateTime, "s") == ""){
		return "";
	}
	
	strOrgDataTime = strDateTime + "";
	nLength = strOrgDataTime.length;
	
	if (nLength != 14 && nLength != 12){
		return strDateTime;
	}
	
	strDate = strOrgDataTime.substring(0,8);
	strDate = util.setFmDate(strDate);
	
	if (util.chkReturn(nType, "s") == ""){
		nType = nLength;
	} else if (nType != 12 && nType != 6){
		nType = nLength;
	}
	
	if (nType == 6){
		return strDate;
	}
	
	if (nLength == 12 || nType == 12){
		strTime = strOrgDataTime.substring(8,12);
	} else {
		strTime = strOrgDataTime.substring(8,14);
	}
	
	
	
	if (nLength == 12 || nType == 12){
		strTime = strTime.substring(0,2) + ":" + strTime.substring(2,4);
	} else {
		strTime = strTime.substring(0,2) + ":" + strTime.substring(2,4) + ":" + strTime.substring(4,6);
	}
		
	return strDate + " " + strTime;
};

/**
 * yyyyMMdd 타입의 날짜를 받아 년,월,일에 날짜를 더하거나 뺀다. 변수 strReType에 'n'을 세팅하면 int형으로 리턴한다.
 * 
 * @param strDate -
 *            String - yyyyMMdd 형태의 날짜 스트링
 * @param strType -
 *            String - 더하거나 뺄 곳, 년: "y", 월: "m", 일: "d"
 * @param nValue -
 *            Intger - 더하건 뺄 값
 * @param strReType -
 *            String - 입력하지 않거나 빈스트링일경우 문자형 리턴, "n"등 입력할경우 int형 리턴
 * @returns 문자열 혹은 number 형 yyyyMMdd 리턴
 */
util.addDate = function (strDate, strType, nValue, strReType) {
	if (util.isDate(strDate) == false){
		message.alert('COM014');
		return strDate;
	}
	
	if (util.chkReturn(strType, "s") == "" || util.chkReturn(nValue, "s") == "" || jQuery.type(nValue) != "number"){
		message.alert('COM018');
		return strDate;
	}
	 
	var nYear = parseInt(strDate.substring(0, 4), 10);
	var nMonty = parseInt(strDate.substring(4, 6) - 1, 10);
	var nDate =  parseInt(strDate.substring(6, 8), 10);
	
	if (strType == "y"){
		nYear = nYear + nValue;
	} else if (strType == "m"){
		nMonty = nMonty + nValue;
	} else if (strType == "d"){
		nDate = nDate + nValue;
	}
	
	var dtInDate = new Date(nYear, nMonty, nDate);
	var strYear = "" + dtInDate.getFullYear();
	var strMonth = "" + (dtInDate.getMonth() + 1);
	var strDay = "" + dtInDate.getDate();
	
	if (strMonth.length == 1) {strMonth = "0" + strMonth;}
    if (strDay.length == 1) {strDay = "0" + strDay;}
	
    if (util.chkReturn(strReType, "s") != ""){
    	return parseInt(strYear + strMonth + strDay, 10);
    }
    
    return strYear + strMonth + strDay;
};


/**
 * Input Calendar 조회 시작일 7일전 날짜, 조회 종료일 금일 날짜 세팅 strStartCalendarId,
 * strEndCalendarId 미입력시 조회 시작일 클레스 calendar, 조회종료일 클레스 calendar2 로 잡고 세팅함
 * strStartCalendarId, strEndCalendarId 각 inputBox의 아이디를 넣어주면 해당 input 박스에 값 세팅
 * strStartCalendarId 만 입력할 경우 해당 곳에만 조회 시작일 7일전 날짜 세팅
 * 
 * @param strStartCalendarId -
 *            String - Calendar inputBox ID
 * @param strEndCalendarId -
 *            String - Calendar inputBox ID
 */
util.setCalendar1j = function (strStartCalendarId, strEndCalendarId) {
	util.setCalendarDate("d", -7, strStartCalendarId, strEndCalendarId);
};

/**
 * Input Calendar 조회 시작일 15일전 날짜, 조회 종료일 금일 날짜 세팅 strStartCalendarId,
 * strEndCalendarId 미입력시 조회 시작일 클레스 calendar, 조회종료일 클레스 calendar2 로 잡고 세팅함
 * strStartCalendarId, strEndCalendarId 각 inputBox의 아이디를 넣어주면 해당 input 박스에 값 세팅
 * strStartCalendarId 만 입력할 경우 해당 곳에만 조회 시작일 7일전 날짜 세팅
 * 
 * @param strStartCalendarId -
 *            String - Calendar inputBox ID
 * @param strEndCalendarId -
 *            String - Calendar inputBox ID
 */
util.setCalendar15d = function (strStartCalendarId, strEndCalendarId) {
	util.setCalendarDate("d", -15, strStartCalendarId, strEndCalendarId);
};

/**
 * Input Calendar 조회 시작일 1개월전 날짜, 조회 종료일 금일 날짜 세팅 strStartCalendarId,
 * strEndCalendarId 미입력시 조회 시작일 클레스 calendar, 조회종료일 클레스 calendar2 로 잡고 세팅함
 * strStartCalendarId, strEndCalendarId 각 inputBox의 아이디를 넣어주면 해당 input 박스에 값 세팅
 * strStartCalendarId 만 입력할 경우 해당 곳에만 조회 시작일 7일전 날짜 세팅
 * 
 * @param strStartCalendarId -
 *            String - Calendar inputBox ID
 * @param strEndCalendarId -
 *            String - Calendar inputBox ID
 */
util.setCalendar1m = function (strStartCalendarId, strEndCalendarId) {
	util.setCalendarDate("m", -1, strStartCalendarId, strEndCalendarId);
};

/**
 * Input Calendar 조회 시작일 3개월전 날짜, 조회 종료일 금일 날짜 세팅 strStartCalendarId,
 * strEndCalendarId 미입력시 조회 시작일 클레스 calendar, 조회종료일 클레스 calendar2 로 잡고 세팅함
 * strStartCalendarId, strEndCalendarId 각 inputBox의 아이디를 넣어주면 해당 input 박스에 값 세팅
 * strStartCalendarId 만 입력할 경우 해당 곳에만 조회 시작일 7일전 날짜 세팅
 * 
 * @param strStartCalendarId -
 *            String - Calendar inputBox ID
 * @param strEndCalendarId -
 *            String - Calendar inputBox ID
 */
util.setCalendar3m = function (strStartCalendarId, strEndCalendarId) {
	util.setCalendarDate("m", -3, strStartCalendarId, strEndCalendarId);
};

/**
 * 조회시작일, 조회종료일 inputbox에 날짜를 세팅한다.(util.setCalendar1j 등에서 사용 한다.)
 * 
 * @param strType
 * @param nValue
 * @param strStartCalendarId
 * @param strEndCalendarId
 */
util.setCalendarDate = function (strType, nValue, strStartCalendarId, strEndCalendarId) {
	if (util.chkReturn(strStartCalendarId, "s") == "" && util.chkReturn(strEndCalendarId, "s") == ""){
		$(".calendar").val(util.setFmDate(util.addDate(util.getDate(), strType, nValue)));
		$(".calendar2").val(util.getDate("-"));
	} else if (util.chkReturn(strStartCalendarId, "s") != "" && util.chkReturn(strEndCalendarId, "s") != ""){
		$("#" + strStartCalendarId).val(util.setFmDate(util.addDate(util.getDate(), strType, nValue)));
		$("#" + strEndCalendarId).val(util.getDate("-"));
	} else if (util.chkReturn(strStartCalendarId, "s") != "" && util.chkReturn(strEndCalendarId, "s") == ""){
		$("#" + strStartCalendarId).val(util.setFmDate(util.addDate(util.getDate(), strType, nValue)));
	}
};

/**
 * 두 날짜의 차이를 일자로 구한다.(조회 종료일 - 조회 시작일)
 * 
 * @param strStartCalendarId -
 *            조회 시작일(날짜 ex.2002-01-01)
 * @param strEndCalendarId -
 *            조회 종료일(날짜 ex.2002-01-01)
 * @param strType -
 *            String - 리턴 년: "y", 월: "m", 일: "d"
 * @return 기간에 해당하는 일자
 */
util.getDateRange = function (strStartCalendarId, strEndCalendarId, strType) {
	var result = "";
    var FORMAT = "-";

    // FORMAT을 포함한 길이 체크
    if (strStartCalendarId.length != 10 || strEndCalendarId.length != 10)
        return null;


    // FORMAT이 있는지 체크
    if (strStartCalendarId.indexOf(FORMAT) < 0 || strEndCalendarId.indexOf(FORMAT) < 0)
        return null;

    // 년도, 월, 일로 분리
    var start_dt = strStartCalendarId.split(FORMAT);
    var end_dt = strEndCalendarId.split(FORMAT);

    // 월 - 1(자바스크립트는 월이 0부터 시작하기 때문에...)
    // Number()를 이용하여 08, 09월을 10진수로 인식하게 함.
    start_dt[1] = (Number(start_dt[1]) - 1) + "";
    end_dt[1] = (Number(end_dt[1]) - 1) + "";

    var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2]);
    var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2]);
    var interval = (to_dt.getTime() - from_dt.getTime());

    // 년
    if (strType == 'y') {
    	result = interval / 1000 / 60 / 60 / 24 / 30 / 12;
    	
    // 월
    } else if (strType == 'm') {
    	result = interval / 1000 / 60 / 60 / 24 / 30;
    
    // 일
    } else if (strType == 'm'){
    	result = interval / 1000 / 60 / 60 / 24;

    // 일
    } else {
    	result = interval / 1000 / 60 / 60 / 24;
    }

    return Math.floor(result);
};

/**
 * 조회시작일과 조회종료일을 비교하여 조회 시작일이 조회종료일 이후일경우 false 리턴 "조회시작일이 조회종료일 이후 입니다."
 * 
 * @param strStartDay -
 *            String - yyyyMMdd 혹은 yyyy-MM-dd형식의 문자열
 * @param strEndDay -
 *            String - yyyyMMdd 혹은 yyyy-MM-dd형식의 문자열
 * @returns {Boolean} - 정상일경우 true, 비정상일 경우 false
 */
util.chkDateStartUp = function (strStartDay, strEndDay) {
	if (util.chkReturn(strStartDay, "s") == "" || util.chkReturn(strEndDay, "s") == ""){
		message.alert('COM014');
		return false;
	}
	
	var nStartDay = parseInt(util.replaceAll(strStartDay, "-", ""), 10);
	var nEndDay = parseInt(util.replaceAll(strEndDay, "-", ""), 10);
	
	if (nStartDay > nEndDay){
		return false;
	} else {
		return true;
	}
};

/**
 * 조회일이 금일 이후 날짜인지 판단하여 이후일경우 false 리턴 "조회기간은 금일 이후로 선택할 수 없습니다."
 * 
 * @param strDay -
 *            String - yyyyMMdd 혹은 yyyy-MM-dd형식의 문자열
 * @returns {Boolean} - 정상일경우 true, 비정상일 경우 false
 */
util.chkDateToDay = function (strDay) {
	if (util.chkReturn(strDay, "s") == ""){
		message.alert('COM014');
		return false;
	}
	
	var nStartDay = parseInt(util.replaceAll(strDay, "-", ""), 10);
	var nEndDay = parseInt(util.getDate(), 10);
	
	if (nStartDay > nEndDay){
		return false;
	} else {
		return true;
	}
};

/**
 * 조회시작일과 조회종료일이 특정 일수 차이인지 판단하여 범위 밖일경우 false 리턴 조회종료일에 특정 일수를 가감하여 조회시작일과
 * 비교하도록 되어 있음. "조회기간을 1년 이내로 설정해 주세요."
 * 
 * @param strStartDay -
 *            String - yyyyMMdd 혹은 yyyy-MM-dd형식의 문자열
 * @param strEndDay -
 *            String - yyyyMMdd 혹은 yyyy-MM-dd형식의 문자열
 * @param strType -
 *            String - y 년, m 월, d 일
 * @param nValue -
 *            Integer - 가감할 숫자
 * @returns {Boolean} - 정상일경우 true, 비정상일 경우 false
 */
util.chkDateGap = function (strStartDay, strEndDay, strType, nValue) {
	if (util.chkReturn(strStartDay, "s") == "" || util.chkReturn(strEndDay, "s") == ""){
		message.alert('COM014');
		return false;
	}
	
	var nStartDay = parseInt(util.replaceAll(strStartDay, "-", ""), 10);
	var nEndDay = util.addDate(util.replaceAll(strEndDay, "-", ""), strType, nValue, "n");
	
	if (nStartDay < nEndDay){
		return false;
	} else {
		return true;
	}
};

/**
 * 조회시작일과 조회종료일이 있는 두개의 Calendard의 벨리데이션 체크를 한다.(특정 일수 차이 1년으로 고정되어 있음.) 조회시작일과
 * 조회종료일을 비교하여 조회 시작일이 조회종료일 이후일경우 체크 조회일이 금일 이후 날짜인지 판단하여 이후일경우 체크 조회시작일과
 * 조회종료일이 특정 일수 차이인지 판단하여 범위 밖일경우 체크 class calendar, calendar2를 기본 체크하며, 파라메타값을
 * 줄경우 id로 체크
 * 
 * @param strStartCalendarId -
 *            String - 조회시작일 input의 id
 * @param strEndCalendarId -
 *            String - 조회종료일 input의 id
 * @returns {Boolean} - 정상일경우 true, 비정상일 경우 false
 */
util.chkCalendar01 = function (strStartCalendarId, strEndCalendarId) {
	var strStartKey = ".calendar";
	var strEndKey = ".calendar2";
	
	if (util.chkReturn(strStartCalendarId, "s") != "") {
		strStartKey = "#" + strStartCalendarId;
	}
	
	if (util.chkReturn(strEndCalendarId, "s") != "") {
		strEndKey = "#" + strEndCalendarId;
	}
	
	if (!util.chkDateToDay($(strStartKey).val())) {
		message.alert('COM019');
		
		$(strStartKey).focus();
		return false;
	}
	
	if (!util.chkDateToDay($(strEndKey).val())) {
		message.alert('COM019');
		$(strEndKey).focus();
		return false;
	}
	
	if (!util.chkDateStartUp($(strStartKey).val(), $(strEndKey).val())) {
		message.alert('VLD026');
		$(strStartKey).focus();
		return false;
	}
	
	if (!util.chkDateGap($(strStartKey).val(), $(strEndKey).val(), "y", -1)) {
		message.alert('VLD027');
		$(strStartKey).focus();
		return false;
	}
	
	return true;
};

util.seBrithYear = function (dateString){
	
	if((dateString.length==13)||(dateString.length==7)||(dateString.length==6)){
		//util.getGndrCd(dateString);
	/*
		var yy = dateString.substr(0,2);
		
		var sex =dateString.substr(6,1);
		
		if((sex=="1")||(sex=="2")||(sex=="5")||(sex=="6")){
			dateString = "19" + dateString.substring(0,6);
		}else if((sex=="3")||(sex=="4")||(sex=="7")||(sex=="8")){
			dateString = "20" + dateString.substring(0,6);
		}
	*/
		var sex =dateString.substr(6,1);
		
		//현재년도 
		var nowDate = util.getDate();
		var nowY2 = nowDate.substr(2,2);
		var nowY1 = nowDate.substr(0,2);
		var Y1="";
		var Y2 = dateString.substr(0,2);
		
		if(Number(nowY2)<Number(Y2) && ((sex=="1")||(sex=="2")||(sex=="5")||(sex=="6"))){
			Y1 = (Number(nowY1)-1)+"";
			
		}else if(Number(nowY2)>=Number(Y2)){
			Y1 = nowY1;
		}else if((sex=="3")||(sex=="4")||(sex=="7")||(sex=="8")){
			Y1 = nowY1;
		}
		
		dateString = Y1+ dateString.substring(0,6);
		
		return dateString;
		
	}else{
		message.alert('VLD028');
	} 
};

/*
 * 보험 나이를 계산 합니다 AgeUtil.getInsuAge를 참고하여 만들었습니다 2013-04-02 강종철 수정
 */
util.entAgeCal = function (dateString) {
 
	dateString=util.replaceAll(dateString,"-", "");
	
	if(util.isJuminno(dateString.substring(0,6),1)==false){
		 
		return false;
	}
	
	var age=0;
	
	$.ajax({type        : "POST"
	       ,async       : false //동기방식
	       ,url         : "/common/cc/MWCommonUtil.ajax"
	       ,dataType    : "json"
	       ,data        : {"tradeKey" :"getInsuAge" , "frontJuminNum" :  dateString }
	       ,error       : function(data){ //통신 에러 발생시 처리
	    	   				alert("통신에러가 발생하였습니다.");
	       				  }
	       ,success     : function(data){ //통신 성공시 처리
	    	   				if(data.result.outData.ERROR_MSG!=undefined && data.result.outData.ERROR_MSG!=""){
	    	   					logger.alert(data.result.outData.ERROR_MSG);
	    	   					age=0;
	    	   					return false;
	    	   				}
			  				age=util.Number(data.result.outData.insuAge);
	       				  }
	        
	});

	 return age;
};

/**
 * 만나이를 계산합니다 보험 가입이 만 19세부터 가입이 가능해서 보험나이가 19세이더라도 가입이 불가능 해서 에러가 발생하는 부분이 있어
 * 해당 로직을 추가해 보험금 확인을 불가하게 만들려고 추가합니다 dateString : 8902021(생년월일+성별)
 */

util.getRealAge = function( dateString ){  	
	
	if(util.isJuminno(dateString.substring(0,6),1)==false){
		return false;
	}
	
    // 기준일자
	var sdDate = new Date(util.setFmDate(util.getDate(),"/"));
  
    if((dateString.length==13)||(dateString.length==7)||(dateString.length==6)){
    	
		dateString = util.seBrithYear(dateString);
	}
    
    var	jmDate = new Date(util.setFmDate(dateString,"/"));	
    
    var age = sdDate.getFullYear() - jmDate.getFullYear();
    
    if ( sdDate.getMonth() < jmDate.getMonth() ) age--;
    if ( 
    	( sdDate.getMonth() == jmDate.getMonth() ) 
    	&& 
    	( sdDate.getDate() < jmDate.getDate() )
        ) age--;
    
  
    return age;
};
/**
 * 생년월일 (yymmdd)날짜를 입력받아 yyyymmdd형태의 날짜로 출력
 *
 * @input  : string yymmdd
 * @output : string yyyymmdd
 */

util.getFullYear = function (dateString) {
	
	var resultDateString = '19'
	, shortYear
	, age;

	if (!dateString) {
		return 0;
	}

	// 단순 나이계산이므로 성별은 남자로 고정
	age = util.entAgeCal (dateString + '1');
	shortYear = (new Date ().getFullYear () + '').substring (2, 4);

	if (age <= shortYear) {

		resultDateString = '20';
	}
	
	resultDateString += dateString;

	if (resultDateString > util.getDate()){
        resultDateString ='19' + resultDateString.substring(2);
    }
    
	return resultDateString;	
};

/**
 * 생년월일(yymmdd)와 주민등록번호 앞자리를 입력받아 생년월일이 올바른지 확인
 */
util.isValidBrdt = function(brdtYYMMDD, gndrCd) {
	brdtYYMMDD = brdtYYMMDD || '';
	gndrCd = gndrCd || '';
	
	if(brdtYYMMDD.length !== 6 || gndrCd.length !== 1)
		return false;

	try {
		var brdtYYYYMMDD = util.convertBrdtYYMMDDtoYYYYMMDD(brdtYYMMDD, gndrCd);
		var todayYYYYMMDD = util.getDate();
		
		return todayYYYYMMDD >= brdtYYYYMMDD;
		
	} catch(e) {
		logger.error(e);
		return false;
	}
};

/**
 * 생년월일(yymmdd)과 주민등록번호 앞자리를 입력 받아 생년월일을 yyyymmdd로 변환
 */
util.convertBrdtYYMMDDtoYYYYMMDD = function(brdtYYMMDD, gndrCd) {
	brdtYYMMDD = brdtYYMMDD || '';
	gndrCd = gndrCd || '';
	
	if(brdtYYMMDD.length !== 6 || gndrCd.length !== 1)
		throw '파라미터 형식이 올바르지 않습니다.';
	
	var bornIn1800s = [0, 9];
	var bornIn1900s = [1, 2, 5, 6];
	var bornIn2000s = [3, 4, 7, 8];
	
	var isIncludes = function(array, item) {
		for(var i = 0; i < array.length; i++) {
			if(array[i] === item)
				return true;
		}
		return false;
	}
	
	gndrCd = Number(gndrCd);
	
	if(isIncludes(bornIn1800s, gndrCd)) {
		return '18' + brdtYYMMDD;
	} else if(isIncludes(bornIn1900s, gndrCd)) {
		return '19' + brdtYYMMDD;
	} else if(isIncludes(bornIn2000s, gndrCd)) {
		return '20' + brdtYYMMDD;
	} else {
		return '';
	}
};

/*
 * 상령일자 조회
 */
util.getRectDate = function (dateString) {
 
	dateString=util.replaceAll(dateString,"-", "");
	
	if (dateString.length == 6){
		dateString = util.getFullYear(dateString);
	}
	
	var rectDate='';
	
	$.ajax({type        : "POST"
	       ,async       : false //동기방식
	       ,url         : "/common/cc/MWCommonUtil.ajax"
	       ,dataType    : "json"
	       ,data        : {"tradeKey" :"getRectDate" , "frontJuminNum" :  dateString }
	       ,error       : function(data){ //통신 에러 발생시 처리
	    	   				alert("통신에러가 발생하였습니다.");
	       				  }
	       ,success     : function(data){ //통신 성공시 처리
				    	   if(data.result.outData.ERROR_MSG!=undefined && data.result.outData.ERROR_MSG!=""){
			  					logger.alert(data.result.outData.ERROR_MSG);
			  					return false;
			  				}
				    	   rectDate = data.result.outData.rectDate;
	       				  }
	        
	});

	 return rectDate;
};