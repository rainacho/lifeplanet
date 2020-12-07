/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 기존 홈페이지 시스템
 * FILE INFO   : mw.util.object.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 Object 관련 함수 집합
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
 * *** Object 관련 함수 ********************************************************
 * 
 * util.clone				: JSON 타입 Object를 deep copy한다.
 * util.delKeyObj			: JSON 타입 Object의 원소(키)를 삭제한다.
 * util.lengthObj			: JSON 타입 Object의 길이를 반환한다.
 * util.concatObj			: JSON 타입 Object를 서로 연결한다.
 * 
 * jQuery 확장, script 확장 구현부
 * jQuery.extend
 * 		- jQuery.stringify	: JSON.stringify 브라우저 호환용 확장부	
 * 		- jQuery.parse		: JSON.parse 브라우저 호환용 확장부
 * 		- jQuery.keys		: Object.keys 브라우저 호환용 확장부
 * 		- remove			: jQuery의 remove가 IE구버전에서 하위 엘리멘탈만 삭제하는 경우가 있음.
 * 		- removeChild		: 특정 엘리먼트의 ID를 넘겨주면 그 하위 엘리먼트를 삭제한다.
 * Array
 * Array.prototype.unique	: 배열의 중복요소 제거
 * 
 * Map			: 	javascript Map 을 HashMap으로 확장
 * Map.prototype
 * 
 * util.setCookie	: 쿠키를 저장한다.
 * util.getCookie	: 쿠키를 꺼낸다.
 * util.deleteCookie: 쿠키를 삭제한다.
 ******************************************************************************/

/**
 * JSONObject 연결. JSON객체를 연결하여 반환한다. 두개의 JSON객체를 연결하여 반환
 * 
 * @param :
 *            jsonObject1, jsonObject2, jsonObject3, ...
 * @ex : util.concatObj(jsonObject1, jsonObject2, jsonObject3, ... );
 */
util.concatObj = function (){
	var argElmt = util.concatObj.arguments;
	var arglen 	= argElmt.length;
	
	// 타입검사
	for(var i=0; i<arglen; i++){
		if(typeof argElmt[i] != "object"){
			alert("입력하신 데이터는 객체타입이 아닙니다. 입력값을 확인하세요.#2");
			return {};
		}
	}
	
	var returnObj = {};
	
	for(var i=0; i<arglen; i++){
		var obj = argElmt[i];
		for(var item in obj){
			returnObj[item] = obj[item];
		}
	}
	
	return util.clone(returnObj);
};

/**
 * JSONObject 원소삭제 오브젝트 내의 키값을 갖는 데이터를 삭제하여 결과 반환
 * 
 * @param :
 *            jsonObject , key1, key2, key3 ...
 * @ex : util.delKeyObj(jsonObject , key1, key2, key3 ...);
 */
util.delKeyObj = function (){
	var argElmt = util.delKeyObj.arguments;
	var arglen 	= argElmt.length;

	if(arglen < 2 || typeof argElmt[0] != "object"){
		alert("util.delKeyObj함수 형식에 맞지않는 입력값입니다.");
		return {};
	}
	
	var key, copyFlag = true, obj = argElmt[0], returnObj = {};

	for(var item in obj){
		for(var i=1; i<arglen; i++){
			key = argElmt[i];
			if(item == key){
				copyFlag = false;
				break;
			}
		}
		if(copyFlag){
			returnObj[item] = obj[item];
		}
		copyFlag = true;
	}
	return returnObj;
};

/**
 * JSONObject 길이반환 문자열일 경우 문자길이, 숫자일경우 자릿수반환, 이외의 경우 0반환
 * 
 * @param :
 *            jsonObject
 */
util.lengthObj = function (obj){
	var length = 0;
	if(typeof obj == "object"){
		if(obj.constructor == Array){
			length = obj.length;
		}else{
			for(var item in obj){
				length ++;
			}
		}
	}else if(typeof obj == "string"){
		length = obj.length;
	}else if(typeof obj == "number"){
		obj = '' + obj;
		if(obj.indexOf('.')==-1){
			length = obj.length;
		}else{
			length = obj.substring(0, obj.indexOf('.')).length;
		}
	}
	return length;
};


/**
 * 주민번호를 입력받아 보험가입나이와 성별을 반환합니다
 * 
 * @param 주민번호
 * @result { country : 국적 (내국인 : 1 외국인 : 2) countryNm : 국적 (내외국인, 외국인) korAge :
 *         한국나이 fullAge : 만나이 insuAge : 보험가입나이 sex : 성별코드 (남1 여2) sexNm : 성별코드이름
 *         남자, 여자 birthDay : 생년월일
 * 
 */
util.getUserInfo = function (juminno, gndrCd){
	var nowDate = util.getDate();
	
	// 반환 데이터
	var returnObj = {
			"country" : "",
			"countryNm" : "",
			"sex" : "",
			"sexNm" : "",
			"birthDay" : "",
			"fullAge" : "",
			"korAge" : "",
			"insuAge" : ""
	};
	// 입력데이터가 숫자가 아닐경우
	if(isNaN(juminno) || typeof(juminno) != "string"){
		return returnObj; 
	}
	// 주민번호 앞자리만 입력 (생년월일일 경우)
	if(juminno.length == 6){
		
		gndrCd = gndrCd != undefined ? gndrCd : "1";// 성별입력이 없을경우 남성으로 처리
		
		var nowYY = Number(nowDate.substring(2,4));// 현재년도2자리
		var birthYY = Number(juminno.substring(0,2));// 생년년도2자리
		if(birthYY < nowYY){
			returnObj.birthDay = "20" + juminno;
			juminno += String(util.Number(gndrCd) + 2);
		}else{
			returnObj.birthDay = "19" + juminno;
			juminno += String(gndrCd);
		}
		// 성별설정
		if(gndrCd == "1"){
			returnObj.sex 	= "1";
			returnObj.sexNm = "남자";
		}else if(gndrCd == "2"){
			returnObj.sex 	= "2";
			returnObj.sexNm = "여자";
		}
	}
	// 주민번호 앞자리 + 뒷자리 1번째 자리까지 입력 또는 전체 주민번호 입력일 경우
	else if(juminno.length == 7 || juminno.length == 13){
		var userGb = Number(juminno.substr(6,1));
		// 내외국인 구분
		if(1 <= userGb && userGb <= 4){
			returnObj.country = "1";
			returnObj.countryNm = "내국인";
		}else if(5 <= userGb && userGb <= 8){
			returnObj.country = "2";
			returnObj.countryNm = "외국인";
		}
		// 생년월일설정
		if((userGb%4) <= 2){
			returnObj.birthDay 	= 19 + juminno.substring(0,6);
		}else{
			returnObj.birthDay 	= 20 + juminno.substring(0,6);
		}
		// 성별설정
		if(userGb%2 == 1){
			returnObj.sex 	= "1";
			returnObj.sexNm = "남자";
		}else{
			returnObj.sex 	= "2";
			returnObj.sexNm = "여자";
		}
	}
	//var fullAge = (String(Number(nowDate) - Number(returnObj.birthDay)).substr(0, 2));
	//var korAge 	= Number(nowDate.substr(0,4)) - Number(returnObj.birthDay.substr(0,4)) + 1;
	var fullAge =util.getRealAge(juminno);
	var korAge =fullAge;
	var insuAge	= util.entAgeCal(juminno);
	//alert(nowDate +"==="+returnObj.birthDay+"==="+fullAge+"==="+korAge+"==="+insuAge);
	returnObj.fullAge 	= fullAge;
	returnObj.korAge 	= korAge;
	returnObj.insuAge 	= insuAge;
	return returnObj;
};

/*******************************************************************************
 * jQuery 확장 구현부
 ******************************************************************************/

/**
 * jQuery 확장 브라우저별 호환이 안되는 기능에 대해 직접 구현하여 jQuery에 확장하여 사용할 경우 추가되는 부분
 * 
 */

jQuery.extend({
	// JSON.stringify구현 JSON.Stringify 5대 브라우저 호환용
	stringify  : function stringify(obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			if (t == "string") obj = '"' + obj + '"';
			return String(obj);        
		} else {
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n];                
				t = typeof(v);
				if (obj.hasOwnProperty(n)) {
					if (t == "string") v = '"' + v.replace(/"/g,"\\\"").replace(/'/g,"\\\'") + '"'; // " 또는
																									// '
																									// 입력시
																									// json이
																									// 깨지는
																									// 문제
																									// 처리
					else if (t == "object" && v !== null) 
						v = jQuery.stringify(v);                    
					json.push((arr ? "" : '"' + n + '":') + String(v));                
				}            
			}            
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}    
	},
	// JSON.parse구현 JSON.parse 5대 브라우저 호환용
	parse  : function parse(str) {
		// 이곳에서 에러가 발생할 경우 대부분 입력값이 잘못된경우입니다.
		// 해당 스트링을 JSON.parse해보시고 같은 에러가 발생한다면 화면에서 수정해주세요
		if(typeof(str) != 'string' || (str.substring(0,1) != "{" && str.substring(0,1) != "[")){
			/*
			alert("입력하신 데이터는 parsing이 불가능 합니다. json객체 타입의 문자열을 입력하세요 " +
					"\n 예상되는 이유 1: 통신에러, 네비게이터 에러시 결과가 HTML형식으로 나올경우 " +
					"\n 예상되는 이유 2: 넣어준 값이 undefined거나 일반 스트링이나 일반 오브젝트일 경우" +
					"\n 해당 내용에 로그를 찍어서 확인하시고 화면에서 수정하시면 됩니다." +
					"\n 입력하신 스트링 :" + str);
			*/
			alert("입력하신 데이터는 Parsing이 불가능 합니다.\n다시 시도해 주세요.");
			return str;
		}
		return eval("(" + str + ")");
	},
	// Object.keys구현 Object.keys 5대 브라우저 호환용
	keys  : function keys(obj) {
		var arr = new Array();
		for(var item in obj){
			arr[arr.length] = item;
		}
		return arr;
	},
	// jQuery의 remove가 IE구버전에서 하위 엘리멘탈만 삭제하는 경우가 있음.
	// 본 함수는 JQuery.remove("id"); 로 사용하는 javascript 기반이다.
	// object 형식의 엘리먼트에 id가 있다면 처리할 수 있도록 수정 - 20130122 정헌태
	remove : function remove(strId) {
		if (util.chkReturn(strId, "s") != ""){
			if (jQuery.type(strId) == "object"){
				if (util.chkReturn(strId.attr("id"), "s") != ""){
					strId = strId.attr("id");
				}
			}
			
			var oPopForm = document.getElementById(strId);
			
			if (util.chkReturn(oPopForm, "s") == ""){
				return;
			} else {
				oPopForm.parentNode.removeChild(oPopForm);
			}
		} else {
			alert("jQuery.remove() : 잘못된 값으로 해당 function을 호출하였습니다.#1");
		}
	},
	// 특정 엘리먼트의 ID를 넘겨주면 그 하위 엘리먼트를 삭제한다.
	removeChild : function removeChild(tagId){
		if (util.chkReturn(tagId, "s") == ""){
			return ;
		}
		
		var elemId = "";
		
		if (jQuery.type(tagId) == "object"){
			if (util.chkReturn(tagId.attr("id"), "s") != ""){
				elemId = tagId.attr("id");
			}
		} else {
			elemId = tagId;
		}
		
		var elem = document.getElementById(elemId); 
		
		if (util.chkReturn(elem, "s") != ""){
			while (elem.hasChildNodes()){
				elem.removeChild(elem.lastChild );
			}
		} else {
			return;
		}
	} 	
});

/**
 * Array확장 배열의 원소를 중복제거하여 반환받는다.
 * 
 * @returns {Array}
 */
/*
 * Array.prototype.unique = function() { var uniqueObj = {}; for(var item=0;
 * item<this.length; item++) { if(typeof uniqueObj[this[item]] == "undefined")
 * uniqueObj[this[item]] = 1; } this.length = 0; for(var item in uniqueObj)
 * this[this.length] = item; return this; }
 */


/**
 * javascript Map 을 HashMap으로 확장
 */
Map = function() {
	this.map = new Object();
};


/**
 * javascript Map.prototype
 */
Map.prototype = {
	put : function(key, value) {
		this.map[key] = value;
	},
	set : function(key, value) {
		this.map[key] = value;
	},
	get : function(key) {
		return this.map[key];
	},
	containsKey : function(key) {
		return key in this.map;
	},
	containsValue : function(value) {
		for ( var prop in this.map) {
			if (this.map[prop] == value)
				return true;
		}
		return false;
	},
	isEmpty : function(key) {
		return (this.size() == 0);
	},
	clear : function() {
		for ( var prop in this.map) {
			delete this.map[prop];
		}
	},
	remove : function(key) {
		delete this.map[key];
	},
	keys : function() {
		var keys = new Array();
		for ( var prop in this.map) {
			keys.push(prop);
		}
		return keys;
	},
	values : function() {
		var values = new Array();
		for ( var prop in this.map) {
			values.push(this.map[prop]);
		}
		return values;
	},
	size : function() {
		var count = 0;
		for ( var prop in this.map) {
			count++;
		}
		return count;
	}
};

/**
 * 쿠키를 저장한다.
 * @param strCkName	String - 쿠키에 저장될 키값
 * @param strCkValue	String - 쿠키에 저잘될 키값에 해당하는 값
 */
util.setCookie = function (strCkName, strCkValue, strCkOption){
	
	strCkOption = strCkOption || '';
	var expireDay = 365;
	
	if ( !(util.chkReturn(strCkOption.expires, "s") == "") ) {
		expireDay = util.Number(strCkOption.expires);
	}
	
	var expire = new Date();
    expire.setDate(expire.getDate() + expireDay);
    cookies = strCkName + '=' + escape(strCkValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(strCkValue)를 합니다.
    cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
};

/**
 * 쿠키를 꺼낸다.
 * @param strCkName	String - 꺼낼 키값
 * @returns
 */
util.getCookie = function (strCkName){
	 strCkName = strCkName + '=';
     var cookieData = document.cookie;
     var start = cookieData.indexOf(strCkName);
     var strCkValue = '';
     
     if(start != -1){
          start += strCkName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          strCkValue = cookieData.substring(start, end);
     }
    
     return unescape(strCkValue);
};

/**
 * 쿠키를 꺼낸다.
 * @param strCkName	String - 삭제할 키값
 * @returns
 */
util.deleteCookie = function (strCkName){
	  var expireDate = new Date();
	  //어제 날짜를 쿠키 소멸 날짜로 설정한다.
	  expireDate.setDate( expireDate.getDate() - 1 );
	  document.cookie = strCkName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
};


/**
 * Object 를 Clone 하여 반환 한다.
 * @param obj
 * @returns
 */
util.clone = function(obj) {
	
	if (typeof obj != "object") {
		alert("입력하신 데이터는 객체타입이 아닙니다. 입력값을 확인하세요.");
		return obj;
	} else {
		return JSON.parse(JSON.stringify(obj));
	}
	
};
/**
 * Object를 연결하여 반환한다.
 * @returns
 */
util.concat = function() {
	
	var argElmt = arguments;
	var arglen 	= argElmt.length;
	
	// 타입검사
	for (var i=0; i<arglen; i++) {
		if (typeof argElmt[i] != "object") {
			alert("입력하신 데이터는 객체타입이 아닙니다. 입력값을 확인하세요.#2");
			return {};
		}
	}
	
	var returnObj = {};
	
	for (var i=0; i<arglen; i++) {
		var obj = argElmt[i];
		for (var item in obj) {
			returnObj[item] = obj[item];
		}
	}
	
	return util.clone(returnObj);
	
};

/**
 * array를 key값과 함께 반환한다.
 * @returns
 */
util.makeArrayAddKey = function(inputArr, inputKey) {
	
	if (util.isNull(inputArr) || util.isNull(inputKey)) {
		return;
	}
	
	var returnArr = [];
	for ( var i = 0; i < inputArr.length; i++) {
		var tempObj= {};
		
		tempObj[inputKey] = inputArr[i];
		returnArr.push(tempObj);
	}
	
	return returnArr;
	
};