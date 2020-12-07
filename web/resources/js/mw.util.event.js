/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 기존 홈페이지 시스템
 * FILE INFO   : mw.util.event.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 이벤트 관련 함수 집합
 * ========================================================================== */

/*******************************************************************************
 * Function List
 *******************************************************************************
 *
 * *** 페이지 오픈/이동 관련 함수 *********************************************
 *
 * util.getSearch   : GET 방식에서 해당 Key 값의 파라미터 Value 를 반환한다.
 * util.movePage	: form 방식으로 화면을 이동한다.
 * util.ajaxPage	: ajax 통신을한다.
 * util.wPopPage	: window 팝업을 띄운다.
 * util.modalPage	: modal 팝Date업을 띄운다.
 * util.closeModal		: modal 팝업을 닫는다.
 * util.ErrorModal	: Object에 ERROR_CODE와 ERROR_MSG가 있는지 판단하여 처리중 실패안내 페이지를 모달로 띄우고 false리턴한다.
 * util.wPopCkPage	: cookie key을 받아 저장된 날짜 이후에만 window 팝업을 연다.
 *
 * *** 이벤트 처리 함수 ********************************************************
 *
 * util.intDateValid	(조회화면 기간 조회 입력 필드 이벤트바인드)			: 날짜 조회시 시작일과 종료일 사이의 유효성을 체크한다
 * util.inputName 		(입력화면 이름입력 필드 이벤트바인드)				: 이름입력필드 초기화
 * util.inputEngName	(입력화면 영문이름입력 필드 이벤트바인드)			: 영문이름입력필드 초기화
 * util.inputNum 		(입력화면 숫자입력 필드 이벤트바인드)				: 숫자입력필드 초기화
 * util.inputAmt 		(입력화면 금액입력 필드 이벤트바인드)				: 금액입력필드 초기화
 * util.inputJumin1 	(입력화면 주민번호앞자리입력 필드 이벤트바인드)		: 주민번호앞자리입력필드 초기화
 * util.inputJumin2 	(입력화면 주민번호뒷자리입력 필드 이벤트바인드)		: 주민번호뒷자리입력필드 초기화
 * util.inputEmail1 	(입력화면 이메일아이디입력 필드 이벤트바인드)		: 이메일앞자리입력필드 초기화
 * util.inputEmail2 	(입력화면 이메일도메인입력 필드 이벤트바인드)		: 이메일뒷자리입력필드 초기화
 * util.inputTel2 		(입력화면 전화번호중간자리입력 필드 이벤트바인드)	: 전화번호중간자리입력필드 초기화
 * util.inputTel3 		(입력화면 전화번호뒷자리입력 필드 이벤트바인드)		: 전화번호뒷자리입력필드 초기
 * util.inputCardNum	(입력화면 신용카드번호입력 필드 이벤트바인드)		: 신용카드번호입력필드 초기
 * util.inputSecCard	(입력화면 보안카드번호입력 필드 이벤트바인드)		: 보안카드번호입력필드 초기
 *
 ******************************************************************************/

/*******************************************************************************
 * 페이지 오픈/이동 관련 함수
 ******************************************************************************/

/**
 * form 방식으로 화면을 이동한다.
 * 화면에 자동으로 form 및 input hidden을 생성하여 submit까지 실행한다.
 * @param strUrl	- String	- url을 입력한다. .dev등의 확장자는 입력하지 않는다.
 * @param objParam	- Object	- 파라메터로 넘길 Object, 함 수 호출시 입력하지 않으면 페이지 이동만 한다.
 *                                파라메터 Object 예
 *                                var obj = new Object();
 *                                obj.a = 1;
 *                                obj.b = 2;
 * @param strTarget	- String	- form의 타겟을 지정한다.
 *                                _blank : 새로운 창에 표시
 */

/**
 * searchKey : 파라미터Key
 */
util.getSearch = function(searchKey) {
	var search = window.location.search.replace('?','');

	var arr = search.split('&');
	for(i in arr) {
		var str = arr[i];
		var key = str.split('=')[0];
		var val = str.split('=')[1];
		if (key == searchKey) return val;
	}
	return '';
};
/**
 * @param strUrl
 * @param objParam
 * @param strTarget
 */
util.movePage = function (strUrl, objParam, strTarget, isNew){

	isNew = (isNew) ? isNew : false;

	if (util.chkReturn(strUrl, "s") == ""){
		logger.alert("이동할 URL이 설정되지 않았습니다.");
		return;
	}
	if (util.chkReturn(objParam, "s") == ""){
		objParam = new Object;
	}
	if (util.chkReturn(strTarget, "s") != ""){
		strTarget = "target=\"" + strTarget + "\"";
	} else {
		strTarget = "";
	}

	// 2017-04-07 :: GET 방식에 따른 주소라인에 파라미터 나열
	if (objParam['methodType'] != undefined && objParam['methodType'] != null && objParam['methodType'] == 'GET') {
		var strParam = '';
		// innovation 은 GET 방식에서 ORG_URL 을 항상 가지고 다녀야 함
		if (window.location.pathname.indexOf('/innovation') != -1) objParam.ORG_URL = util.getSearch('ORG_URL');

		var keys = jQuery.keys(objParam);
		if (keys.length > 0) strParam = '?';
		for(i in keys) {
			var key = keys[i];
			if (key == 'methodType') continue;
			var val = objParam[key];
			strParam += key + '=' + val + '&';
		}
		if (strUrl.indexOf('.dev') == -1) strUrl += '.dev';
		window.location.href = strUrl + strParam;
		return true;
	}

	// 객체 파라메터화
	/*
	 * var paramObj = new Object(); var objCnt = 0; for(var key in objParam){
	 * if(typeof(objParam[key]) == 'object'){ paramObj[key] = objParam[key];
	 * objCnt ++; } }
	 */

	// 스크린ID만들기
	// var startPoint = strUrl.lastIndexOf("/") + 1, endPoint = strUrl.length;
	// objParam["NAVI_ID"] = strUrl;

	// 화면에 추가할 html text를 만든다.
	$("#nextForm").remove();
	var strHtml = "";
	strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\"POST\" " + strTarget + " action=\"" + strUrl + ".dev\">";

	if(isNew){
		strHtml += "<input name=\"" + 'JSON_DATA' + "\" id=\"" + 'JSON_DATA' + "\" type=\"hidden\" value=\'" + JSON.stringify(objParam) + "\' />";
	// As-Is 방식 [메인에서 상세보기 > Get & makeInputTag]
	}else{
		strHtml += PageUtil.makeInputTag(objParam, "");// 데이터의 일반, 객체, 배열의 모든 종류의 타입
	}											// 체크하여 입력태그에 동적 추가
	// if(objCnt > 0) strHtml += "<input name=\"[paramObj]\" id=\"[paramObj]\"
	// type=\"hidden\" value=\'" + jQuery.stringify(paramObj) + "\' />";//배열이나
	// 오브젝트 파라메터 전송
	strHtml += "</form>";

	$("body").append(strHtml);	// 화면에 form 등 생성
	$("#nextForm").submit();	// submit
};


/**
 * ajax통신을 한다. Object data를 받아 처리하고 통신 성공시 특정 펑션을 호출하여 Object를 리턴한다.
 *
 * @param strUrl -
 *            String - 이동할 URL 주소, .ajax는 생략한다
 * @param objParam -
 *            Object - 파라메타 오브젝트, 파라메타가 없을경우 빈스트링 처리 objParam.noLoading 값을 true로
 *            주면 로딩 이미지 안나타남
 * @param strCallBack -
 *            String - 통신성공시 호출할 펑션명, 미입력시 callAjaxData 펑션을 무조건 호출한다.
 * @bNoLoadingChk - Boolean - ture 일경우 로딩 안나타남
 */
util.ajaxPage = function (strUrl, objParam, strCallBack){

	if (util.chkReturn(strUrl, "s") == ""){
		logger.alert("이동할 URL이 설정되지 않았습니다.");
		return;
	}

	if (util.chkReturn(objParam) == false){
		objParam = "";
	}

	$.ajax({
		"type"	: "POST" ,
		"url"	: strUrl + ".ajax",
		"data"	: objParam,
		"success" : function (data){
			// 2013.01.25 박태양 - ajax인 경우 결과가 text/html이기 때문에 Object로 변환한다.
			data = jQuery.parse(data);
			// Ajax 권한체크(2013.05.14 김상종)
			var error_code =((typeof data.result.outData)=="undefined"?false:data.result.outData.ERROR_CODE);
			if(error_code == "-HP00W0008"){
				logger.alert(data.result.outData.ERROR_MSG);
			}

			var outData = data.result;
			// 정상처리후 strCallBack 값이 있을경우 해당 펑션호출 없을경우 callAjaxData펑션 호출
			if (util.chkReturn(strCallBack, "s") != ""){
				closeLoading();	// 모달 로딩 종료

				if(typeof strCallBack === 'function'){
					strCallBack(outData);
				}else if(typeof strCallBack === 'string'){
					eval(strCallBack + '(data)');
				}
			} else {
				closeLoading();	// 모달 로딩 종료
				callAjaxData(data);
			}
		}
		,"error" : function (data){

			closeLoading();	// 모달 로딩 종료
// alert("util.ajaxPage : 관리자에게 문의 하세요 ");

		}
	});
};

/**
 * 팝업을 띄워 새로운 페이지를 연다. objOption의 width와 height 값은 필수 이다. objOption의 값을 세팅해주고자
 * 하면 함수에 해당 처리부분 추가 필요 단순 컨텐츠성을 jsp로 띄울때는 확장자를 붙인다. 확장자를 붙이면 서버를 타지 않고 바로 팝업을
 * 띄운다. objOption 예) var objPopOption = new Object(); objPopOption.width =
 * "400"; objPopOption.height = "200";
 *
 * @param strUrl -
 *            String - 팝업에서 띄울 URL, .dev의 확장자는 붙이지 않는다. 단순 컨텐츠성을 jsp로 띄울때는 확장자를
 *            붙인다.
 * @param objOption -
 *            Object - width, height 등의 팝업 옵션값
 * @param objParam -
 *            Object - 전달할 파라메타
 */
util.wPopPage = function (strUrl, objOption,  objParam){
	if (util.chkReturn(strUrl, "s") == ""){
		logger.alert("오픈할 URL을 입력해 주십시오.");
		return ;
	}

	var arrUrl = strUrl.split("/");
	if (arrUrl.length == 0) {
		logger.alert("오픈할 URL을 확인해 주십시오.");
		return ;
	}

	if (util.chkReturn(objOption, "s") == ""){
		objOption = {};
	}

	// 화면 ID
	var strId = "pop" + arrUrl[arrUrl.length - 1];
	var strEndText = ".dev";

	if (strId.substring(strId.length -4, strId.length) == ".jsp"){
		strId = strId.substring(0, strId.length -4);
		strEndText = ".jsp";
	}

	var strFlag = "";
	var popWidth = 850;
	var popHeight = 630;

	// 가로크기
	if(util.chkReturn(objOption.width, "s") == "") {
		// strFlag += "width=850";
		strFlag += "width=" + getNewPopW(strUrl);
	} else {
		strFlag += "width=" + objOption.width;
		popWidth = objOption.width;
	}

	// 세로크기
	if(util.chkReturn(objOption.height, "s") == "") {
		strFlag += ",height=" + getNewPopH(strUrl);
	} else {
		strFlag += ",height=" + objOption.height;
		popHeight = objOption.height;
	}

// var winHeight = $(window).height(); // // 현재창의 높이
// var winWidth = $(window).width(); // 현재창의 너비
	var winHeight =  window.outerHeight;	// 현재창의 높이
	var winWidth = window.outerWidth;	// 현재창의 너비
// var winHeight = window.screen.height; // 현재창의 높이
// var winWidth = window.screen.width; // 현재창의 너비


	var winX = window.screenX;// 현재창의 x좌표
	var winY = window.screenY; // 현재창의 y좌표
	var popX = winX + (winWidth - popWidth)/2;
	var popY = (winY + (winHeight - popHeight)/2);

	// 주소창이 활성화 (기본yes)
	if(util.chkReturn(objOption.location, "s") != "") {
		strFlag += ",location=" + objOption.location;
	} else {
		strFlag += ",location=yes";
	}

	// 사이즈 변경 (기본yes)
	if(util.chkReturn(objOption.resizable, "s") != "") {
		strFlag += ",resizable=" + objOption.resizable;
	} else {
		strFlag += ",resizable=yes";
	}

	// 스크롤바 (기본yes)
	if(util.chkReturn(objOption.scrollbars, "s") != "") {
		strFlag += ",scrollbars=" + objOption.scrollbars;
	} else {
		strFlag += ",scrollbars=yes";
	}

	// 상단위치
	if(util.chkReturn(objOption.top, "s") != "") {
		strFlag += ",top=" + objOption.top;
	}else{
		// strFlag += ",top=" + ((screen.height-objOption.height)/2);
		strFlag += ",top=" + popY;
	}

	// 좌측위치
	if(util.chkReturn(objOption.left, "s") != "") {
		strFlag += ",left=" + objOption.left;
	}else{
		// strFlag += ",left=" + ((screen.width-objOption.width)/2) ;
		strFlag += ",left=" + popX;
	}

	if(strUrl.indexOf("HPCC41P1") > 0){
		if(typeof talkOn == "undefined"  ){
			return;
		}
		var openPop = null;
		var strParam = talkOn.init();
		if( openPop != null && !openPop.closed ){
			openPop.focus();
			return;
		}
		openPop = window.open('https://talk.lifeplanet.co.kr/sharedfront/jsp/view/kyobo/jsp/main.jsp' + strParam, '상담톡신청', 'scrollbars=no,toolbar=no,resizable=yes, width=400, height=650, top=300, left=500');
		openPop.focus();
		return;
	}

	var popWin;
	if (strEndText == ".jsp"){	// .jsp 확장자가 붙은경우 서버를 통하지 않고 바로 팝업 돌출
		popWin = window.open(strUrl, strId, strFlag) ;
	} else {	// 폼을 동적 생성항 서버를 통한 팝업 돌출
		popWin = window.open("", strId, strFlag) ;

		// 객체 파라메터화
		/*
		 * var paramObj = new Object(); var objCnt = 0; for(var key in
		 * objParam){ if(typeof(objParam[key]) == 'object'){ paramObj[key] =
		 * objParam[key]; objCnt ++; } }
		 */

		if (strUrl.indexOf ('.dev') > -1) {
			strEndText = '';
		}

		// 화면에 추가할 html text를 만든다.
		var strHtml = "";
		strHtml += "<form id=\"popForm\" name=\"popForm\" method=\"POST\" target=\"" + strId + "\" action=\"" + strUrl + strEndText + " \">";
		strHtml += PageUtil.makeInputTag(objParam, "");// 데이터의 일반, 객체, 배열의 모든 종류의
													// 타입 체크하여 입력태그에 동적 추가
		// if(objCnt > 0) strHtml += "<input name=\"[paramObj]\"
		// id=\"[paramObj]\" type=\"hidden\" value=\'" +
		// jQuery.stringify(paramObj) + "\' />";//배열이나 오브젝트 파라메터 전송
		strHtml += "</form>";

		$("body").append(strHtml);	// 화면에 form 등 생성
		$("#popForm").submit();	// submit
		// $("#popForm").remove(); // 자동생성한 form등을 삭제한다.
		// IE 구버전에서 .remove가 정상 작동 안할 수 있으므로 스크립트 방식으로 삭제
		jQuery.remove("popForm");
	}

	if (popWin == null){
		logger.alert("팝업이 차단 되어 있습니다.\n원활한 서비스를 위해 팝업차단을 허용해 주세요.");
	}
	return popWin;
};

/**
 * cookie key을 받아 저장된 날짜 이후에만 window 팝업을 연다.
 */
util.wPopCkPage = function (strCookieKey, strUrl, objOption,  objParam){
	var strCkValue = "";
	strCkValue = util.getCookie(util.chkReturn(strCookieKey, "s"));

	if (strCkValue == ""){
		util.wPopPage(strUrl, objOption,  objParam);
	} else if (parseInt(strCkValue, 10) <= parseInt(util.getDate(), 10)){
		util.wPopPage(strUrl, objOption,  objParam);
	}

};

var u_context_ERROR_flag = false;	// 에러 여부
var u_context_ERROR_CODE = "";	// 에러 코드
var u_context_ERROR_MSG = "";	// 에러 메세지
/**
 * Object에 ERROR_CODE와 ERROR_MSG가 있는지 판단하여 처리중 실패안내 페이지를 모달로 띄우고 false리턴한다.
 * ERROR시 true를 리턴하고 모달팝업을 띄운다, 정상시 false를 리턴한다.
 * 사용예)
	if(util.ErrorModal(objCutData, "/mypage/conr/HPMB01S0")){	// 오류메세지 모달팝업화면 처리
		// 에러처리
		return ;
	}
	// 정상처리
 * @param objData	- Object	- 체크할 data
 * @param reUrl	- String	- 실패안내 페이지의 확인 버튼 클릭시 이동할 이동할 페이지 주소
 *                            미입력시 로그인시 각 서브매인, 비로그인시 시작화면으로 이동
 * @returns {Boolean}	error 이경우 true, 정상일 경우 false
 */
util.ErrorModal = function (objData, reUrl){
	u_context_ERROR_flag = false;
	u_context_ERROR_CODE = "";
	u_context_ERROR_MSG = "";

	if (objData == null || objData == undefined || objData.length == 0){
		logger.alert("처리중 오류가 발생하였습니다.");
		return true;
	}

	reUrl = util.chkReturn(reUrl, "s");

	util.chkObjKeyValue(objData);

	if (u_context_ERROR_flag == true && u_context_ERROR_MSG == ""){
		u_context_ERROR_MSG == "처리중 오류가 발생하였습니다.";
	}

	if (u_context_ERROR_flag){
		var u_objModealData = new Object();
		u_objModealData.strERROR_CODE = u_context_ERROR_CODE;
		u_objModealData.strERROR_MSG = util.setHtmlParsing(u_context_ERROR_MSG);
		u_objModealData.reUrl = reUrl;

		util.modalPage("/common/view/HPTA05P3", "", u_objModealData);
	}

	return u_context_ERROR_flag;
};

/**
 * 팝업닫기 호출함수(modal || window)
 *
 * @param event객체(고정값)
 */
util.closeModal = function (e){
	if($('#modal_ifrmWrap iframe',window.parent.document).length){
		$(parent.modalLauncher).focus();
		parent.modalLauncher = null;
		$('#modal_ifrmWrap iframe',window.parent.document).attr('src','');
		$('#modal_back',window.parent.document).remove();
		$('#modal_ifrmWrap',window.parent.document).remove();
	} else {
		$(window.parent).focus();
		window.close();
	}
// e.preventDefault();
// fn_preventDefaultHelper(e);
};

/* 팝업닫기에 해당하는 event.preventDefault 가 ie에 서 작동되지 않는점 보완한 함수 */
function fn_preventDefaultHelper(event){
	var browerVersion = window.navigator.userAgent;
	if( browerVersion.indexOf('Mozilla/4.0') >= 0 ){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}

/**
 * 팝업을 띄워 새로운 페이지를 연다. objOption의 width(default:800px)와 height(default:700px) 값은
 * 선택 이다. objOption의 값을 세팅해주고자 하면 함수에 해당 처리부분 추가 필요 objOption 예) var objOption =
 * new Object(); objOption.type = "window";//(default:modal) objOption.width =
 * "850"; objOption.height = "630";
 *
 * @param strUrl -
 *            String - 팝업에서 띄울 URL + parameter
 * @param objOption -
 *            Object - width, height 등의 팝업 옵션값
 * @param objData -
 *            Object - objData 값이 있을 경우 parameter를 자동 세팅한다.
 */
util.modalPage = function (strUrl, objOption, objData) {
	if(util.chkReturn(strUrl, "s") == "") {
		logger.alert("util.modalPage : 오픈할 URL을 확인해 주십시오.");
		return ;
	}
	/*
	 * if (strUrl.substring(strUrl.length -4, strUrl.length) != ".jsp" &&
	 * strUrl.substring(strUrl.length -4, strUrl.length) != ".dev"){ strUrl =
	 * strUrl + ".dev"; }
	 */

	if(strUrl.indexOf("?")>=0){

	} else if (strUrl.indexOf(".dev") >=0) {

	}else{
		if((strUrl.indexOf(".dev")>=0)||((strUrl.indexOf(".jsp")>=0))){
		}else{
			strUrl = strUrl + ".dev";
		}
	}

	// objData로 동적 parameter 생성
	if(util.chkReturn(objData, "s") != "") {
		/*
		var keys = [];

		for(var k in objData){	// object의 키값을 구한다.
			keys.push(k);
		}

		var nCountI = keys.length;
		var chkCount = 0;

		for (var i = 0; i<nCountI; i++){
			var strGetValue = eval("objData." + keys[i]);

			if (chkCount == 0){
				strUrl = strUrl + "?" +  keys[i] + "=" + strGetValue;
				chkCount = 1;
			} else {
				strUrl = strUrl + "&" +  keys[i] + "=" + strGetValue;
			}
		}
		*/
	}

	if (util.chkReturn(objOption, "s") == ""){
		objOption = {};
	}

	if(util.chkReturn(objOption.type, "s") == "") {
		objOption.type = "modal";
	}

	// 가로크기
	if(util.chkReturn(objOption.width, "s") == "") {
		objOption.width = getNewPopW(strUrl);
	}

	// 세로크기
	if(util.chkReturn(objOption.height, "s") == "") {
		objOption.height =  getNewPopH(strUrl);
	}

	// 로딩시 이미지 URL
	if(util.chkReturn(objOption.loadingImgUrl, "s") == "") {
		objOption.loadingImgUrl = "";
	}

	// 배경 투명도
	if(util.chkReturn(objOption.opacityBg, "s") == "") {
		objOption.opacityBg = 0.3;
	}

	// 청약 로딩 유무
	if(util.chkReturn(objOption.loadType, "s") == "") {
		objOption.loadType = false;
	}

	jQuery(this).JQmodal({
		popUrl:strUrl
		,type: objOption.type
		,width: objOption.width
		,height: objOption.height
		,loadingImgUrl: objOption.loadingImgUrl
		,opacityBg: objOption.opacityBg
		,loadType: objOption.loadType
		,closeBtnClass: objOption.closeBtnClass
		,bgColor: objOption.bgColor
		,objValue: objData
	});
};

/**
 * 날짜 조회 입력시 유효성 체크 날짜가 입력될경우 조회시작일이 현재일보다 이후이면 현재일 종료일보다 이후이면 종료일을 조회시작일로 맞춘다.
 * 조회종료일이 현재일보다 이후이면 현재일 시작일보다 이전이면 시작일을 조회종료일로 맞춘다.
 *
 *
 * ex ) util.intDateValid("sDate", "eDate");
 */
util.intDateValid = function (startDateId, endDateId){
	if(util.chkReturn(startDateId,"s")==""){
		startDateId = "startDate";
	}
	if(util.chkReturn(endDateId,"s")==""){
		endDateId 	= "endDate";
	}
	$startDate 	= $("#"+startDateId);
	$endDate 	= $("#"+endDateId);
	// 조회시작일 유효성 체크
	$startDate.unbind().bind("change", function(){
		if(!util.isValidDate($(this).val())){
			logger.alert("조회시작일이 현재일보다 커질 수 없습니다.");
			$(this).val(util.getDate('-'));
		}
		if(!util.isValidDate($(this).val(), $endDate.val())){
			// logger.alert("조회시작일이 조회종료일일보다 커질 수 없습니다.");
			$endDate.val($(this).val());
		}
	});
	// 조회종료일
	$endDate.unbind().bind("change", function(){
		if(!util.isValidDate($(this).val())){
			logger.alert("조회종료일이 현재일보다 커질 수 없습니다.");
			$(this).val(util.getDate('-'));
		}
		if(!util.isValidDate($startDate.val(), $(this).val())){
			// logger.alert("조회종료일이 조회시작일보다 이전일 수 없습니다.");
			$startDate.val($(this).val());
		}
	});
};

/**
 * 이름입력 필드에대한 함수 영역아이디
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputName("areaId01", "areaId02", "areaId03", ... );
 */
util.inputName = function (){
	var argElmt = util.inputName.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","25");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if(!util.inputKorChk($inpObj,{"msg":true,"num":false})){
				util.inputEventChk($inpObj);
			}
			else if($inpObj.val().length > 25){
				util.inputEventChk($inpObj,"이름의 최대 입력값은 25자입니다.");
			}
		});
	}
};

/**
 * 영문 이름입력 필드에대한 함수 영역아이디
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputEngName("areaId01", "areaId02", "areaId03", ... );
 */
util.inputEngName = function (){
	var argElmt = util.inputEngName.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","25");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if(!util.inputEngChk($inpObj,{"msg":true,"num":false,"space":true})){
				util.inputEventChk($inpObj);
			}
			else if($inpObj.val().length > 25){
				util.inputEventChk($inpObj,"이름의 최대 입력값은 25자입니다.");
			}
		});
	}
};
/**
 * 이름입력 필드에대한 함수 영역아이디
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputName("areaId01", "areaId02", "areaId03", ... );
 */
util.inputKor = function (){
	var argElmt = util.inputKor.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if(!util.inputKorChk($inpObj,{"msg":true,"num":true})){
				util.inputEventChk($inpObj);
			}
		});
	}
};

/**
 * 영문 이름입력 필드에대한 함수 영역아이디
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputEngName("areaId01", "areaId02", "areaId03", ... );
 */
util.inputEng = function (){
	var argElmt = util.inputEng.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if(!util.inputEngChk($inpObj,{"msg":true,"num":true,"space":true})){
				util.inputEventChk($inpObj);
			}
		});
	}
};

/**
 * 주민번호입력 전체 필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputJumin("areaId01", "areaId02", "areaId03", ... );
 */
util.inputJumin = function (){
	var argElmt = util.inputJumin.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","13");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if($inpObj.val()!="" && !util.isJuminno($inpObj.val())){
				util.inputEventChk($inpObj,"주민등록번호가 잘못되었습니다.");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 주민번호입력 전필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputJumin1("areaId01", "areaId02", "areaId03", ... );
 */
util.inputJumin1 = function (){
	var argElmt = util.inputJumin1.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);

		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			var jumini1 = $inpObj.val().length > 6 ? $inpObj.val().substring(2,8) : $inpObj.val();

			if($inpObj.val()!="" && !util.isJuminno(jumini1, "1")){
				util.inputEventChk($inpObj,"주민번호 앞자리가 잘못되었습니다.");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 주민번호입력 후필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputJumin2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputJumin2 = function (){
	var argElmt = util.inputJumin2.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","7");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if($inpObj.val()!="" && !util.isJuminno($inpObj.val(), "2")){
				util.inputEventChk($inpObj,"주민번호 뒷자리가 잘못되었습니다.");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 주민번호입력 후필드에대한 함수 사망보장 보험같은 경우 주민등록번호 6자리만 입력받습니다
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputJumin2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputJumin2_6 = function (){
	var argElmt = util.inputJumin2_6.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","6");
		$idArea.unbind().bind("focusout",function(e){
			//var $inpObj = $(this);

		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 보안카드 입력에대한 체크함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputSecCard("areaId01", "areaId02", "areaId03", ... );
 */
util.inputSecCard = function (){
	var argElmt = util.inputSecCard.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","2");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(!util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isSecCard($inpObj.val())){
				util.inputEventChk($inpObj,"보안카드번호가 잘못되었습니다.");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 카드번호 입력에대한 체크함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputCardNum("areaId01", "areaId02", "areaId03", ... );
 */
util.inputCardNum = function (){
	var argElmt = util.inputCardNum.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","4");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if($inpObj.val()!="" && !util.isCrdCard($inpObj.val(),"1")){
				util.inputEventChk($inpObj,"카드 비밀번호가 잘못되었습니다.");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 날짜 입력에대한 체크함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util_inputDate("areaId01", "areaId02", "areaId03", ... );
 */
util.inputDate8 = function () {
	var argElmt = util.inputDate8.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","8");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(!util_inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isDate($inpObj.val())){
				 util.inputEventChk($inpObj, "입력된 날짜를 다시 확인해주세요.");
			 }
		}).bind("keydown",function(e){
			return util.keyCodeNumChk (e, false);
		});
	}
};

/**
 * 금액필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputAmt("areaId01", "areaId02", "areaId03", ... );
 */
util.inputAmt = function (){
	var argElmt = util.inputAmt.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		util.inputAmtArea(argElmt[i]);
	}
};


/**
 * 금액필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputAmt("areaId01", {});
 */
util.inputAmtArea = function (areaId, option, $target){

	$target = $target || [];

	var numMax = 12;
	var commaMax = 15;
	if(typeof option == "object"){
		if(option.maxlength != undefined && !isNaN(option.maxlength)){
			numMax = Number(option.maxlength);
			commaMax = parseInt(numMax + ((numMax - 1)/3), 10);
		}
	}
	var $idArea = $target.length ? $target :$("#"+areaId);

	$idArea.attr("maxlength",commaMax);
	$idArea.css("text-align","right");
	$idArea.unbind().bind("focusout",function(e){
		var $inpObj = $(this);
		var inpAmt = $inpObj.val().replace(/[^0-9]/g,'');
		if(inpAmt.length > numMax){
			util.inputEventChk($inpObj,"금액은 최대 " + numMax + "자리까지 입력가능합니다.");
			inpAmt = inpAmt.substring(0,numMax);
		}
		if(inpAmt != ""){
			$inpObj.val(util.setCommas(Number(inpAmt)));
		}
	}).bind("keydown",function(e){
		/*
		 * var $inpObj = $(this); var initFlag = false; if($inpObj.val() == ""){
		 * initFlag = true; }
		 */
		return util.keyCodeNumChk(e, false);
	}).bind("keyup",function(e){
		var key = 0;
		if (window.event) key = window.event.keyCode;
		else if (e) key = e.which;

		if(key != 37 && key != 39){// 방향키 예외처리
			var $inpObj = $(this);
			util.inputNumChk($inpObj,{"msg":true,"type":"amt"});
		}
	});

};

/**
 * 숫자필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputNum("areaId01", "areaId02", "areaId03", ... );
 */
util.inputNum = function (){
	var argElmt = util.inputNum.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		util.inputNumArea(argElmt[i]);
	}
};

/**
 * 숫자필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputNum("areaId01", {});
 */
util.inputNumArea = function (areaId, option, $target){

	$target = $target || [];

	var numMax = 12;
	if(typeof option == "object"){
		if(option.maxlength != undefined && !isNaN(option.maxlength)){
			numMax = Number(option.maxlength);
		}
	}

	var $idArea = $target.length ? $target : $("#"+areaId);
	//$idArea.attr("maxlength",numMax);
	// 2015-02-13 숫자는 기본적으로 왼쪽에서 부터 입력되도록 수정
	//$idArea.css("text-align","right");
	$idArea.unbind().bind("focusout",function(e){
		var $inpObj = $(this);
		if(isNaN($inpObj.val())){
			util.inputEventChk($inpObj,"올바른 숫자가 아닙니다.");
		}
		else if($inpObj.val().length > numMax){
			util.inputEventChk($inpObj,"숫자는 최대 " + numMax + "자리까지 입력가능합니다.");
		}else{
// $inpObj.val(util.Number($inpObj.val()));

		}
	}).bind("keydown",function(e){
		return util.keyCodeNumChk(e, true);
	}).bind("keyup",function(e){
		var key = 0;
		if (window.event) key = window.event.keyCode;
		else if (e) key = e.which;

		if(key != 37 && key != 39){// 방향키 예외처리
			var $inpObj = $(this);
			util.inputNumChk($inpObj,{"msg":true,"type":"float"});
		}
	});

};
util.inputNumAreaUseSelector = function (selector, option) {

	var $target = $(selector);
	util.inputNumArea (null, option, $target);
};

util.inputNumArea2 = function (areaId, option, $target){

	$target = $target || [];

	var numMax = 12;
	if(typeof option == "object"){
		if(option.maxlength != undefined && !isNaN(option.maxlength)){
			numMax = Number(option.maxlength);
		}
	}

	var $idArea = $target.length ? $target : $("#"+areaId);
	//$idArea.attr("maxlength",numMax);
	// 2015-02-13 숫자는 기본적으로 왼쪽에서 부터 입력되도록 수정
	//$idArea.css("text-align","right");
	$idArea.unbind().bind("focusout",function(e){
		var $inpObj = $(this);
		if(isNaN($inpObj.val())){
			util.inputEventChk($inpObj,"올바른 숫자가 아닙니다.");
		}
	}).bind("keydown",function(e){
		return util.keyCodeNumChk(e, false);
	}).bind("keyup",function(e){
		var key = 0;
		if (window.event) key = window.event.keyCode;
		else if (e) key = e.which;

		if(key != 37 && key != 39){// 방향키 예외처리
			var $inpObj = $(this);
			return util.inputNumChk($inpObj,{"msg":false,"type":"natural"});
		}
	});
};

/**
 * 이메일 전체 필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputEmail("areaId01", "areaId02", "areaId03", ... );
 */
util.inputEmail = function (){
	var argElmt = util.inputEmail.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","30");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if($inpObj.val()!="" && !validate.isEmail($inpObj.val())){
				util.inputEventChk($inpObj,"잘못된 이메일 주소입니다.");
			}
			else if($inpObj.val().length > 30){
				util.inputEventChk($inpObj,"이메일의 최대 입력값은 30자입니다.");
			}
		});
	}
};

/**
 * 이메일 앞자리 필드에대한 함수
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputEmail1("areaId01", "areaId02", "areaId03", ... );
 */
util.inputEmail1 = function (){
	var argElmt = util.inputEmail1.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","30");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if($inpObj.val()!="" && !validate.isEmail($inpObj.val(),"1")){
				util.inputEventChk($inpObj,"잘못된 이메일 주소입니다.");
			}
			else if($inpObj.val().length > 30){
				util.inputEventChk($inpObj,"이메일의 최대 입력값은 30자입니다.");
			}
		});
	}
};

/**
 * 이메일 뒷자리 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputEmail2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputEmail2 = function (){
	var argElmt = util.inputEmail2.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","30");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if($inpObj.val()!="" && !validate.isEmail($inpObj.val(),"2")){
				// logger.alert("잘못된 이메일 주소입니다.");
				util.inputEventChk($inpObj,"잘못된 이메일 주소입니다.");
			}
			else if($inpObj.val().length > 30){
				util.inputEventChk($inpObj,"이메일의 최대 입력값은 30자입니다.");
			}else if($inpObj.val().toLowerCase().indexOf("yahoo.co.kr") != -1){
				util.inputEventChk($inpObj,"정확한 메일 전송을 위해 yahoo.co.kr도메인 계정은 사용하실 수 없습니다.");
			}
		});
	}
};

/**
 * 이메일 뒷자리 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputEmail2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputEmail3 = function (){
	var argElmt = util.inputEmail3.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","30");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			if($inpObj.val()!="" && !validate.isEmail($inpObj.val(),"2")){
				logger.alert("잘못된 이메일 주소입니다.");
				$inpObj.val("");
				$inpObj.focus();
			}
			else if($inpObj.val().length > 30){
				logger.alert("이메일의 최대 입력값은 30자입니다.");
				$inpObj.val("");
				$inpObj.focus();
			}
		});
	}
};

/**
 * 팩스번호 지역번호 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputTel2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputFax1 = function (){
	var argElmt = util.inputFax1.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","4");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isTelno($inpObj.val(),"1")){
				util.inputEventChk($inpObj,"팩스번호 지역번호를 확인해주세요");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 팩스번호 중간자리 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputTel2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputFax2 = function (){
	var argElmt = util.inputFax2.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","4");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isTelno($inpObj.val(),"2")){
				util.inputEventChk($inpObj,"팩스번호 앞자리를 확인해주세요");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 팩스번호 뒷자리 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputTel2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputFax3 = function (){
	var argElmt = util.inputFax3.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","4");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isTelno($inpObj.val(),"3")){
				util.inputEventChk($inpObj,"팩스번호 뒷자리를 확인해주세요");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};


/**
 * 전화번호 첫번째 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputTel1("areaId01", "areaId02", "areaId03", ... );
 */
util.inputTel1 = function (){
	var argElmt = util.inputTel1.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","3");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isTelno($inpObj.val(),"1")){
				util.inputEventChk($inpObj,"전화번호 국번이 잘못입력되었습니다.");
				$inpObj.val("");
				//logger.alert($("#"+argElmt[i]).val());
//				$("#"+argElmt[i]).val("");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 전화번호 가운데 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputTel2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputTel2 = function (){
	var argElmt = util.inputTel2.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","4");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isTelno($inpObj.val(),"2")){
				util.inputEventChk($inpObj,"전화번호 중간자리가 잘못입력되었습니다.");
				$inpObj.val("");
			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 전화번호 마지막 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputTel3("areaId01", "areaId02", "areaId03", ... );
 */
util.inputTel3 = function (){
	var argElmt = util.inputTel3.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","4");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !util.isTelno($inpObj.val(),"3")){
				util.inputEventChk($inpObj,"전화번호 마지막자리가 잘못 입력되었습니다.");
				$inpObj.val("");

			}
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * 전화번호 국번제외 필드에대한 함수 (직접입력)
 *
 * @param input영역에
 *            대한 id
 * @ex) util.inputTel2("areaId01", "areaId02", "areaId03", ... );
 */
util.inputTel2and3 = function (){
	var argElmt = util.inputTel2and3.arguments;
	var arglen 	= argElmt.length;

	for(var i=0; i<arglen; i++){
		var $idArea = $("#"+argElmt[i]);
		$idArea.attr("maxlength","8");
		$idArea.unbind().bind("focusout",function(e){
			var $inpObj = $(this);
			/*
			 * if(util.inputNumChk($inpObj,{"msg":true, "evt":e})){
			 * util.inputEventChk($inpObj); } else
			 */if($inpObj.val()!="" && !validate.isHpno2and3($inpObj.val())){
				 util.inputEventChk($inpObj,"전화번호가 잘못입력되었습니다.");
				 $inpObj.val("");
			 }
		}).bind("keydown",function(e){
			return util.keyCodeNumChk(e, false);
		});
	}
};

/**
 * Function : 숫자 Check 이벤트
 *
 * @param option
 *            ├─type : 입력숫자타입 ├─evt : 이벤트 처리시 ├─rep : 잘못된값 치환 └─msg : 입력체크시 메시지
 *            알림 설정 Note : 입력한 데이터의 숫자유효성 체크
 */
util.inputNumChk = function ($inpObject, option) {
	var chkFlag = true;
	var inpText = $inpObject.val() + '';
	var chkPattern = '';
	var replacePattern = '';

	if(typeof option != "object")	option 			= {};
	if(undefined==option.type)		option.type 	= "natural";
	if(undefined==option.rep)		option.rep 		= true;
	if(undefined==option.msg)		option.msg 		= false;

	/*
	 * if(option.evt != undefined){ return util.keyCodeNumChk(option.evt,
	 * chkFlag); //return chkFlag; }
	 */
	// 자연수
	if("natural" == option.type){
		chkPattern		= /[^0-9]/;
		replacePattern	= /[^0-9]/g;
	}
	// 금액
	else if("amt" == option.type){
		chkPattern		= /[^0-9,]/;
		replacePattern	= /[^0-9]/g;
	}
	// 정수
	else if("integer" == option.type){
		chkPattern		=  /^[+-]?\d*$/;
		// replacePattern = /[^0-9]/g;
	}
	// 실수
	else if("float" == option.type){
		// chkPattern = /^[+-]?\d+(\.?\d+)*$/;
		chkPattern		= /[^0-9\.\-]/;
		replacePattern	= /[^0-9\.\-]/g;
		// replacePattern = /[^0-9\-\.]/g;
	}


	if(chkPattern.test(inpText)){
		if(true == option.msg && utilChkInputAlertFlag){
			utilChkInputAlertFlag = false;
			logger.alert("숫자만 입력이 가능합니다.");
			utilChkInputAlertFlag = true;
		}
		chkFlag = false;
	}
	if(chkFlag&&option.rep){
		inpText = inpText.replace(replacePattern,'');
		// 자연수
		if("natural" == option.type){
		}
		// 금액
		else if("amt" == option.type){
			inpText = util.setCommas(inpText);
		}
		// 정수
		else if("integer" == option.type){
		}
		// 실수
		else if("float" == option.type){
		}
		$inpObject.val(inpText);
		return chkFlag;
	}

	// 자연수
	if("natural" == option.type){
	}
	// 금액
	else if("amt" == option.type){
		inpText = inpText.replace(replacePattern,'');
		inpText = util.setCommas(inpText);
		$inpObject.val(inpText);
	}
	// 정수
	else if("integer" == option.type){
	}
	// 실수
	else if("float" == option.type){
	}

	return chkFlag;
};

/**
 * 숫자만 입력 처리 ex) $("#id").bind("keydown",function(event){ return
 * util.inputNumChk(event, false); });
 */
util.keyCodeNumChk = function (e, decimal, initFlag) {

   var key;
   var keychar;
   if (window.event) {  // 익스와 파폭 체크 !
       key = window.event.keyCode;
   } else if (e) {
       key = e.which;
   } else {
       return true;
   }
   keychar = String.fromCharCode(key);
   if(initFlag && (key == 48 || key == 96)){
	   return false;
   }
   else if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27) || (key == 37) || (key == 39) || key == 46) {// 괄호
       return true;
   }
   else if(96 <= key && key <= 105) {// Num Key pad
  	 return true;
   }
   else if ((("0123456789").indexOf(keychar) > -1)) {// 키보드 자판 숫자. 단 특수문자도 같은
														// 키캐릭터라 입력됨
       return true;
   }
   else if (decimal && (key == 109 || key == 189 ||key == 110 || key == 190)) {// -
																				// .입력
       return true;
   }
   else
       return false;
};
//입력체크 알림 플래그. 중복 알림 방지용
var utilChkInputAlertFlag = true;
/**
 * Function : 한글영문 Check 이벤트
 *
 * @param option
 *            ├─symbol : 특수문자입력 ├─num : 숫자입력 ├─rep : 잘못된값 치환 └─msg : 입력체크시 메시지
 *            알림 설정 Note : 입력한 데이터의 한글및영문유효성 체크
 */
util.inputKorEngChk = function ($inpObject, option) {
	var chkFlag = true;
	var inpText = $inpObject.val() + '';

	if(typeof option != "object")	option 			= {};
	if(undefined==option.symbol)	option.symbol 	= false;
	if(undefined==option.num)		option.num 		= false;
	if(undefined==option.rep)		option.rep 		= true;
	if(undefined==option.msg)		option.msg 		= false;
	if(undefined==option.space)		option.space 	= false;

	var chkPatternStr		= "ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z";

	if( option.num == true)		chkPatternStr += "0-9";
	if( option.symbol == true)	chkPatternStr += "!@#$%^&?*\\\-_+=`~()\"';:,.|<>{}\\\/";
	if( option.space == true)	chkPatternStr += "\\\s";

	chkPatternStr = "[^" + chkPatternStr + "]";

	var chkPattern = new RegExp(chkPatternStr,['']);
	var replacePattern = new RegExp(chkPatternStr,['g']);


	if(chkPattern.test(inpText)){
		if(true == option.msg && utilChkInputAlertFlag){
			utilChkInputAlertFlag = false;
			logger.alert("특수문자는 입력이 불가능합니다.");
			utilChkInputAlertFlag = true;
		}
		if(true == option.rep){
			inpText = inpText.replace(replacePattern,'');
		}
		chkFlag = false;
	}
	$inpObject.val(inpText);
	return chkFlag;
};

/**
 * Function : 한글 Check 이벤트
 *
 * @param option
 *            ├─symbol : 특수문자입력 ├─num : 숫자입력 ├─rep : 잘못된값 치환 └─msg : 입력체크시 메시지
 *            알림 설정 Note : 입력한 데이터의 한글유효성 체크
 */
util.inputKorChk = function ($inpObject, option) {
	var chkFlag = true;
	var inpText = $inpObject.val() + '';
	var chkPattern;
	var replacePattern;

	if(typeof option != "object")	option 			= {};
	if(undefined==option.symbol)	option.symbol 	= false;
	if(undefined==option.num)		option.num 		= false;
	if(undefined==option.rep)		option.rep 		= true;
	if(undefined==option.msg)		option.msg 		= false;

	var chkPatternStr		= "ㄱ-ㅎㅏ-ㅣ가-힣";

	if( option.num == true)		chkPatternStr += "0-9";
	if( option.symbol == true)	chkPatternStr += "!@#$%^&?*\\\-_+=`~()\"';:,.|<>{}\\\/";
	if( option.space == true)	chkPatternStr += "\\\s";

	chkPatternStr = "[^" + chkPatternStr + "]";

	chkPattern = new RegExp(chkPatternStr,['']);
	replacePattern = new RegExp(chkPatternStr,['g']);


	if(chkPattern.test(inpText)){
		if(true == option.msg && utilChkInputAlertFlag){
			utilChkInputAlertFlag = false;
			logger.alert("한글만 입력이 가능합니다.");
			utilChkInputAlertFlag = true;
		}
		if(true == option.rep){
			inpText = inpText.replace(replacePattern,'');
		}
		chkFlag = false;
	}
	$inpObject.val(inpText);
	return chkFlag;
};

/**
 * Function : 영문 Check 이벤트
 *
 * @param option
 *            ├─symbol : 특수문자입력 ├─num : 숫자입력 ├─rep : 잘못된값 치환 └─msg : 입력체크시 메시지
 *            알림 설정 Note : 입력한 데이터의 영문유효성 체크
 */
util.inputEngChk = function ($inpObject, option) {
	var chkFlag = true;
	var inpText = $inpObject.val() + '';
	var chkPattern = '';
	var replacePattern = '';

	if(typeof option != "object")	option 			= {};
	if(undefined==option.symbol)	option.symbol 	= false;
	if(undefined==option.num)		option.num 		= false;
	if(undefined==option.rep)		option.rep 		= true;
	if(undefined==option.msg)		option.msg 		= false;
	if(undefined==option.space)		option.space 	= false;

	var chkPatternStr		= "a-zA-Z";

	if( option.num == true)		chkPatternStr += "0-9";
	if( option.symbol == true)	chkPatternStr += "!@#$%^&?*\\\-_+=`~()\"';:,.|<>{}\\\/";
	if( option.space == true)	chkPatternStr += "\\\s";

	chkPatternStr = "[^" + chkPatternStr + "]";

	chkPattern = new RegExp(chkPatternStr,['']);
	replacePattern = new RegExp(chkPatternStr,['g']);

	if(chkPattern.test(inpText)){
		if(true == option.msg && utilChkInputAlertFlag){
			utilChkInputAlertFlag = false;
			logger.alert("영문만 입력이 가능합니다.");
			utilChkInputAlertFlag = true;
		}
		if(true == option.rep){
			inpText = inpText.replace(replacePattern,'');
		}
		chkFlag = false;
	}
	$inpObject.val(inpText);
	return chkFlag;
};
/**
 * 주민번호 유효성 체크 (가벼운 유효성) 각 자리수에 들어갈 수 있는 숫자만 체크하여 결과를 반환합니다.
 *
 * @param juminno
 */
util.isJuminno = function (juminno, position) {
	// 주민번호 유효성 체크
	var regExp = new RegExp();
	if(undefined == position)	regExp =  /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))[1-8][0-9]{6}$/;
	else if("-" == position)	regExp =  /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-8][0-9]{6}$/;
	else if("1" == position)	regExp =  /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
	else if("2" == position)	regExp =  /^[1-8][0-9]{6}$/;

	if(!regExp.test(juminno)){
		return false;
	}
	return true;
};

/**
 * 신용카드번호 유효성 체크
 *
 * @param cardNo
 */
util.isCrdCard = function (cardNo, position) {
	var regExp = /^([0-9]{2})$/;
	if(undefined == position)	regExp = /^([0-9]{16})$/;
	else if("-" == position)	regExp = /^(([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{4}))$/;
	else if("1" == position)	regExp = /^([0-9]{4})$/;
	if(!regExp.test(cardNo)){
		return false;
	}
	return true;
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
util.setCommas = function (strNum, strReText) {
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
 * 입력된 문자열이 숫자와 '.'으로만 이루어져 있는가? 빈스트링은 문자로 본다.
 *
 * @param strNum
 * @returns {Boolean}
 */
util.isFloat = function (strNum) {
	// null, undefined, 빈스트링 체크
	if (util.chkReturn(strNum, "s") == ""){
		return false;
	}

	var cnt = 0;
	strNum = strNum + "";

	for (var i = 0; i < strNum.length; i++) {
		// Check that current character is number.
		var c = strNum.charAt(i);

		if (!util.isDigit(c)) {
			return true;
			if (c == "."){
				if (cnt > 1){return false;}
				else {cnt++;}
			} else {
				return false;
			}
		}
	}

	return true;
};

/**
 * 입력된 data가 null, undefined 인지 체크 판단하여 key 값에 따른 값을 리턴한다.
 *
 * @param data
 *            체크할 data
 * @param strReKey
 *            입력안할 경우 : 정상일경우 true, 비정상일 경우 false b : 정상일 경우 true, 비정상일 경우 false
 *            s : 정상일 경우 입력된 data 반환, 비정상일 경우 빈스트링 반환 n : 정상일 경우 입력된 data 반환,
 *            비정상일 경우 0 반환
 * @param returnData
 *            비정상일경우 리턴할 data
 * @param rePlusEnd -
 *            String - 접미어 설정 strReKey 값이 "s"일경우 입력된 값이 정상일 경우 접미어를 붙여서 리턴
 *            비정상이거나 빈스트링일 경우 returnData 값을 리턴
 */
util.chkReturn = function (data, strReKey, returnData, rePlusEnd) {

	var strType = jQuery.type(data);
	var bCheck = true;
	var bReturnData = true;
	var bRePlusEnd = false;
	var strRePlusEnd = "";

	if (strType == "null" || strType == "undefined") {
			bCheck = false;
	}

	if (jQuery.type(returnData) == "null" || jQuery.type(returnData) == "undefined"){
		bReturnData = false;
	}

	strType = jQuery.type(strReKey);

	if (strType == "null" || strType == "undefined" || strReKey == "b" || strReKey == "") {
		return bCheck;
	}

	if (rePlusEnd != null && rePlusEnd != undefined) {
		bRePlusEnd = true;
		strRePlusEnd = rePlusEnd;
	}

	if (bCheck == true) {
		if (strReKey == "s"){
			if (bRePlusEnd == true && data == ""){
				return returnData;
			} else if (bRePlusEnd == true){
				return data + strRePlusEnd;
			} else {
				if (data == "" && bReturnData == true){
					return returnData;
				} else {
					return data + "";
				}

			}
		} else {
			return data;
		}
	} else {
		if (strReKey == "s") {
			if (bReturnData){
				return returnData;
			} else {
				return "";
			}
		} else if (strReKey == "n") {
			if (bReturnData){
				return returnData;
			} else {
				return 0;
			}
		}
	}

	return bCheck;
};

/**
 * 입력된 문자열이 숫자로 이루어져 있는가? 빈스트링은 문자로 본다.
 *
 * @returns {Boolean}
 */
util.isDigit = function (strNum) {
	// null, undefined, 빈스트링 체크
	if (util.chkReturn(strNum, "s") == ""){
		return false;
	}

	var len = strNum.length;
	var c;

	for (var i = 0; i < len; i++) {
		c = strNum.charAt(i);
		if ((i == 0 && c == '-') || (c >= '0' && c <= '9')){
			;
		} else{
			return false;
		}
	}

	return true;
};

/**
 * 전화번호 유효성 체크
 *
 * @param telno
 *            숫자 2~4자리 0으로시작 + "-" + 숫자3~4자리 + "-" + 숫자4자리
 */
util.isTelno = function (telno, position) {
	// 전화번호 유효성 체크
	var regExp = new RegExp();
	if(undefined == position)	regExp =  /^(0([0-9]{1,3})([0-9]{3,4})([0-9]{4}))$/;
	else if("-" == position)	regExp =  /^(0([0-9]{1,3})-([0-9]{3,4})-([0-9]{4}))$/;
	else if("1" == position)	regExp =  /^(0([0-9]{1,3}))$/;
	else if("2" == position)	regExp =  /^([0-9]{3,4})$/;
	else if("3" == position)	regExp =  /^([0-9]{4})$/;
	else if("4" == position)	regExp =  /^([0-9]{2,3})$/;

	if(!regExp.test(telno)){
		return false;
	}
	return true;
};

/**
 * 날짜 유효성 체크. 입력날짜가 현재 또는 입력된 기준일보다 후일일 경우 false 기준일 또는 이전일 경우 true반환
 *
 * @param chkDate
 * @param stdDate
 * @returns {Boolean}
 */
util.isValidDate = function (chkDate, stdDate) {
	if(util.chkReturn(stdDate,"s")==""){
		stdDate = util.getDate();
	}
	stdDate = stdDate.replace(/[^0-9]/g,"");
	chkDate = chkDate.replace(/[^0-9]/g,"");
	if(util.isDate(chkDate) && stdDate >= chkDate ){
		return true;
	}
	return false;
};

/**
 * 입력영역의 이벤트를 체크하는 함수
 *
 * @param $inpObj
 * @param msg
 */
util.inputEventChk = function ($inpObj, msg){
	if(typeof(msg) == "string"){
		logger.alert(msg);
	}
	//if($inpObj.attr("type") == "password"){
		$inpObj.val('');
	// }
	$inpObj.focus();
};


/**
 * 예상 해지환급금 기본세팅 파라미터
 */
var objCancelParam = {
		// 정기보험(1,2,3,4), 자녀사랑정기보험(5,6,7)
		// 190225 정기보험조건변경 (80세만기 > 20년만기), 보험료변경
		// 200401 보험료변경
		"11":{
			// 남자
			"1":{
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010001","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"17000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 월납 기준, 만기환급형(환급률 100%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000121","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010021","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"96100","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010001","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"3083000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 일시납 기준, 만기환급형(환급률 100%)
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1000121","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010021","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"8232900","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 월납 기준,  만기환급형(환급률 50%)
				,"5":{"map":{},"PLAN_CD":"","goodCd":"1000111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010011","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"29100","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 일시납 기준,  만기환급형(환급률 50%)
				,"6":{"map":{},"PLAN_CD":"","goodCd":"1000111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010011","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"4486100","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
	
			}
			// 여자
			,"2":{
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010001","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"8100","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 월납 기준, 만기환급형(환급률 100%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000121","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010021","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"48700","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010001","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"1479400","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 일시납 기준, 만기환급형(환급률 100%)
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1000121","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010021","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"4098600","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 월납 기준,  만기환급형(환급률 50%)
				,"5":{"map":{},"PLAN_CD":"","goodCd":"1000111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010011","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"13900","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년만기, 20년납, 일시납 기준,  만기환급형(환급률 50%)
				,"6":{"map":{},"PLAN_CD":"","goodCd":"1000111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010011","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"2174100","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"11","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
			}
		}
		// 종신보험 190225 상품개정 보험료변경
		// 200401 보험료변경
		,"12":{
			// 남자
			"1":{
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 월납 기준, 체감형
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010023","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"99800","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 월납 기준, 일반형
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000202","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010061","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"194300","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 일시납 기준, 체감형
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010023","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"17113600","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 일시납 기준, 일반형
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1000202","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010061","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"34045800","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
			}
			// 여자
			,"2":{
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 월납 기준, 체감형
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010023","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"73700","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 월납 기준, 일반형
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000202","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010061","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"168900","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 일시납 기준, 체감형
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010023","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"12526600","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 보험가입금액 1억원, 20년납, 일시납 기준, 일반형
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1000202","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010061","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":100000000,"pltcPrm":"29719000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"12","inspdVal":"999","inspdScCd":"09","pmtpdVal":"20","pmtpdScCd":"01"}
			}
		}
		// 암보험 190225 상품개정 (진단보험금대비 가입금액 및 보험료변경)
		// 200401 상품개정(보험료변동)
		,"43":{
			// 남자
			"1":{
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1001107","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010119","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"34290","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 100%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1001111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010123","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"77790","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1001107","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010119","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"6078360","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 100%)
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1001111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010123","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"10329030","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}

				//100세까지 비갱신 암보험
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 100세만기, 전기납, 월납 기준, 순수보장형(환급률 0%)
				,"5":{"map":{},"PLAN_CD":"","goodCd":"1003701","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010164","intyScCd":"01","conYmd":"","inspd":60,"pmtpd":"60","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"22170","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","exYn":"Y","inspdVal":"100","inspdScCd":"02","pmtpdVal":"100","pmtpdScCd":"02"}
				
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 50%)
				,"11":{"map":{},"PLAN_CD":"","goodCd":"1001109","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010121","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"47610","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 50%)
				,"12":{"map":{},"PLAN_CD":"","goodCd":"1001109","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010121","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"7653090","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
	
			}
			// 여자
			,"2":{
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1001107","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010119","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"20880","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 100%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1001111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010123","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"47850","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1001107","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010119","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"3688620","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 100%)
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1001111","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010123","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"6268110","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}

				//100세까지 비갱신 암보험
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 2천만원, 보험가입금액 1천만원 기준, 100세만기, 전기납, 월납 기준, 순수보장형(환급률 0%)
				,"5":{"map":{},"PLAN_CD":"","goodCd":"1003701","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010164","intyScCd":"01","conYmd":"","inspd":60,"pmtpd":"60","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"13950","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","exYn":"Y","inspdVal":"100","inspdScCd":"02","pmtpdVal":"100","pmtpdScCd":"02"}
				
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 50%)
				,"11":{"map":{},"PLAN_CD":"","goodCd":"1001109","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010121","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"29100","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금(일반암 기준) 3천만원, 보험가입금액 3천만원 기준, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 50%)
				,"12":{"map":{},"PLAN_CD":"","goodCd":"1001109","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010121","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":30000000,"pltcPrm":"4644210","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"43","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
	
			}
		}
		// 5대성인병보험 (2019.04.01 상품개정)
		// 200401 상품개정(보험료변동)
		,"44":{
			// 남자
			"1":{
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1001201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010076","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"27180","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 100%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1001205","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010080","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"62220","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1001201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010076","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"4784120","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 100%)
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1001205","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010080","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"8129700","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 진단보험금 6백만원, 20세만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"5":{"map":{},"PLAN_CD":"","goodCd":"1001201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010076","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":6000000,"pltcPrm":"2382","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 50%)
				,"6":{"map":{},"PLAN_CD":"","goodCd":"1001203","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010078","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"37840","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 50%)
				,"7":{"map":{},"PLAN_CD":"","goodCd":"1001203","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010078","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"6023540","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			}
			// 여자
			,"2":{
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1001201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010076","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"13380","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 100%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1001205","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010080","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"30040","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1001201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010076","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"2402200","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 100%)
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1001205","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010080","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"4082080","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 표준체, 진단보험금 6백만원, 20세만기, 20년납, 일시납 기준, 순수보장형(환급률 0%)
				,"5":{"map":{},"PLAN_CD":"","goodCd":"1001201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010076","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":6000000,"pltcPrm":"1248","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 월납 기준, 만기환급형(환급률 50%)
				,"6":{"map":{},"PLAN_CD":"","goodCd":"1001203","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010078","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"18520","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 표준체, 진단보험금 2천만원, 80세만기, 20년납, 일시납 기준, 만기환급형(환급률 50%)
				,"7":{"map":{},"PLAN_CD":"","goodCd":"1001203","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010078","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"3024540","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"44","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			}
		}
		// 기타보험
		// 200401 상품개정(보험료변동)
		,"45":{
			// 남자
			"1":{
				// 치아보험
				// 40세, 10년만기, 전기납, 보험가입금액 1천만원 기준 
				"1":{"map":{},"PLAN_CD":"","goodCd":"1004301","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010173","intyScCd":"01","conYmd":"","inspd":10,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":10000000,"pltcPrm":"28050","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"10","inspdScCd":"01","pmtpdVal":"10","pmtpdScCd":"01"}
				// 미세먼지보험
				// 40세, 80세만기, 20년납, 보험가입금액 2천만원 기준
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1004101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010168","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":20,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"25520","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세, 80세만기, 일시납, 보험가입금액 2천만원 기준
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1004101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010168","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":0,"susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"4525820","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}	
				// 뇌·심장보험
				// 보험가입금액 1천만원, 40세가입, 80세만기 기준
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1005201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010189","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":40,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":10000000,"pltcPrm":"18780","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"40","pmtpdScCd":"00"}

			}
			// 여자
			,"2":{
				// 치아보험
				// 40세, 10년만기, 전기납, 보험가입금액 1천만원 기준
				"1":{"map":{},"PLAN_CD":"","goodCd":"1004301","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010173","intyScCd":"01","conYmd":"","inspd":10,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":10000000,"pltcPrm":"21100","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"10","inspdScCd":"01","pmtpdVal":"10","pmtpdScCd":"01"}
				// 미세먼지보험
				// 40세, 80세만기, 20년납, 보험가입금액 2천만원 기준
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1004101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010168","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":20,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"13520","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세, 80세만기, 20년납, 보험가입금액 2천만원 기준
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1004101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010168","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":0,"susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"2432180","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 여성건강보험
				// 40세, 80세만기, 20년납, 보험가입금액 2천만원 기준, 순수보장형(환급률 0%)
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1004901","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010183","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":20,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"27520","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세, 80세만기, 일시납, 보험가입금액 2천만원 기준, 순수보장형(환급률 0%)
				,"5":{"map":{},"PLAN_CD":"","goodCd":"1004901","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010183","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":0,"susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"4983800","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세, 80세만기, 20년납, 보험가입금액 2천만원 기준, 순수보장형(환급률 50%)
				,"6":{"map":{},"PLAN_CD":"","goodCd":"1004902","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010184","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":20,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"37900","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세, 80세만기, 일시납, 보험가입금액 2천만원 기준, 순수보장형(환급률 50%)
				,"7":{"map":{},"PLAN_CD":"","goodCd":"1004902","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010184","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":0,"susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"6274940","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세, 80세만기, 20년납, 보험가입금액 2천만원 기준, 순수보장형(환급률 100%)
				,"8":{"map":{},"PLAN_CD":"","goodCd":"1004903","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010185","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":20,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"60780","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세, 80세만기, 일시납, 보험가입금액 2천만원 기준, 순수보장형(환급률 100%)
				,"9":{"map":{},"PLAN_CD":"","goodCd":"1004903","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010185","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":0,"susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":20000000,"pltcPrm":"8469000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 뇌·심장보험
				// 보험가입금액 1천만원, 40세가입, 80세만기 기준
				,"10":{"map":{},"PLAN_CD":"","goodCd":"1005201","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010189","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":40,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":10000000,"pltcPrm":"13050","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"45","inspdVal":"80","inspdScCd":"02","pmtpdVal":"40","pmtpdScCd":"01"}
			}
		}
		// 연금보험 (2019.04.01 상품개정, 보험료변경)
		// 200401 상품개정(상품코드변경)
		,"21":{
			// 남자
			"1":{
				// 40세 가입, 월납보험료 30만원, 연금개시나이 60세, 10년납
				"1":{"map":{},"PLAN_CD":"02","goodCd":"1004801","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010182","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":20,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":36000000,"pltcPrm":"300000","annOpnnAge":"60","goalPmtPeri":"120","goodSmclCd":"21","inspdVal":"60","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
			}
			// 여자
			,"2":{
				// 40세 가입, 월납보험료 30만원, 연금개시나이 60세, 10년납
				"1":{"map":{},"PLAN_CD":"02","goodCd":"1004801","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010182","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":20,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":36000000,"pltcPrm":"300000","annOpnnAge":"60","goalPmtPeri":"120","goodSmclCd":"21","inspdVal":"60","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
			}
		}
		// 연금저축보험 (2019.04.01 상품개정, 보험료변경)
		// 200401 상품개정(상품코드변경)
		,"31":{
			// 남자
			"1":{
				// 40세 가입, 월납보험료 30만원, 연금개시나이 60세, 전기납
				"1":{"map":{},"PLAN_CD":"02","goodCd":"1004701","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010181","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":30,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"30","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":36000000,"pltcPrm":"300000","annOpnnAge":"60","goalPmtPeri":"240","goodSmclCd":"31","inspdVal":"60","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
			}
			// 여자
			,"2":{
				// 40세 가입, 월납보험료 30만원, 연금개시나이 60세, 전기납
				"1":{"map":{},"PLAN_CD":"02","goodCd":"1004701","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010181","intyScCd":"01","conYmd":"","inspd":999,"pmtpd":30,"susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"30","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":36000000,"pltcPrm":"300000","annOpnnAge":"60","goalPmtPeri":"240","goodSmclCd":"31","inspdVal":"60","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
			}
		}
		// 저축보험 190225 보험료 변경
		,"33":{
			// 남자
			"1":{
				// 40세 가입, 월납보험료 30만원, 10년만기, 전기납
				"1":{"map":{},"PLAN_CD":"","goodCd":"1005001","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010186","intyScCd":"01","conYmd":"","inspd":10,"pmtpd":"10","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":36000000,"pltcPrm":"300000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"33","inspdVal":"10","inspdScCd":"01","pmtpdVal":"10","pmtpdScCd":"01"}
				
				// 30세 가입, 월납보험료 9만원, 1년만기, 전기납 (m저축이벤트)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1003101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010146","intyScCd":"01","conYmd":"","inspd":1,"pmtpd":"1","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"30","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":1080000,"pltcPrm":"90000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"33","inspdVal":"1","inspdScCd":"01","pmtpdVal":"1","pmtpdScCd":"01"}
				
				// 30세 가입, 월납보험료 21만원, 2년만기, 전기납 (m저축이벤트)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1003101","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010146","intyScCd":"01","conYmd":"","inspd":2,"pmtpd":"2","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"30","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":5040000,"pltcPrm":"210000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"33","inspdVal":"2","inspdScCd":"01","pmtpdVal":"2","pmtpdScCd":"01"}
			}
			// 여자
			,"2":{
				// 40세 가입, 월납보험료 30만원, 10년만기, 전기납
				"1":{"map":{},"PLAN_CD":"","goodCd":"1005001","stdYmdTo":"0","pltcInf_cnt":"1","intyCd":"3010186","intyScCd":"01","conYmd":"","inspd":10,"pmtpd":"10","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":36000000,"pltcPrm":"300000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"33","inspdVal":"10","inspdScCd":"01","pmtpdVal":"10","pmtpdScCd":"01"}
			}
		}

		// 어린이보장보험(2019.04.01 상품개정, 보험료변경)
		,"42":{
			// 남자
			"1":{
				// 5세가입, 보험가입금액 1천만원, 30세만기, 10년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000704","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010062/@","intyScCd":"01/@","conYmd":"","inspd":25,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"5","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000/@","pltcPrm":"10660/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"25/@","pmtpdArr":"10/@","goodSmclCd":"42","inspdVal":"30","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
				// 5세가입, 보험가입금액 1천만원, 30세만기, 10년납, 월납 기준, 만기환급형(환급률 50%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000705","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010063/@","intyScCd":"01/@","conYmd":"","inspd":25,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"5","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000/@","pltcPrm":"16010/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"25/@","pmtpdArr":"10/@","goodSmclCd":"42","inspdVal":"30","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
				// 5세가입, 보험가입금액 1천만원, 30세만기, 10년납, 월납 기준, 만기환급형(환급률 100%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000706","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010064/@","intyScCd":"01/@","conYmd":"","inspd":25,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"5","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000/@","pltcPrm":"32560/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"25/@","pmtpdArr":"10/@","goodSmclCd":"42","inspdVal":"30","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
			}
			// 여자
			,"2":{
				// 5세가입, 보험가입금액 1천만원, 30세만기, 10년납, 월납 기준, 순수보장형(환급률 0%)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000704","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010062/@","intyScCd":"01/@","conYmd":"","inspd":25,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"5","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000/@","pltcPrm":"7580/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"25/@","pmtpdArr":"10/@","goodSmclCd":"42","inspdVal":"30","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
				// 5세가입, 보험가입금액 1천만원, 30세만기, 10년납, 월납 기준, 만기환급형(환급률 50%)
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000705","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010063/@","intyScCd":"01/@","conYmd":"","inspd":25,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"5","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000/@","pltcPrm":"11380/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"25/@","pmtpdArr":"10/@","goodSmclCd":"42","inspdVal":"30","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
				// 5세가입, 보험가입금액 1천만원, 30세만기, 10년납, 월납 기준, 만기환급형(환급률 100%)
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000706","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010064/@","intyScCd":"01/@","conYmd":"","inspd":25,"pmtpd":10,"susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"5","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000/@","pltcPrm":"23130/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"25/@","pmtpdArr":"10/@","goodSmclCd":"42","inspdVal":"30","inspdScCd":"02","pmtpdVal":"10","pmtpdScCd":"01"}
			}
		}
		// 어린이저축보험 (2019.04.01 상품개정, 보험가입금액 =기본보험료 *  MIN[납기, 10] * 12 )
		,"32":{
			// 남자
			"1":{
				// 교육자금 인출 미설계 (주계약만 가입 시) 주피보험자(가입자녀) 남자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월보험료 30만원, 22년 만기, 전기납 기준
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010065/@","intyScCd":"01/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"1","scnpGndrCd":"1","EntAmt":"36000000/@","pltcPrm":"300000/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@","pmtpdArr":"22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
				// 교육자금 인출 미설계 (주계약과 보험료 납입면제특약 동시 가입 시) 주피보험자(가입자녀) 남자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월 보험료 30만원, 보험료납입면제특약 월 보험료 4,248원, 22년 만기, 전기납 기준
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":2,"intyCd":"3010065/@3060001/@","intyScCd":"01/@03/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"1","scnpGndrCd":"1","EntAmt":"36000000/@300000/@","pltcPrm":"300000/@4302/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@22/@","pmtpdArr":"22/@22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
				// 교육자금 인출 설계 (주계약만 가입 시) 주피보험자(가입자녀) 남자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월 보험료 173,477원, 22년 만기, 전기납 기준
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":1,"mdwyFuncDetaCdArr":"0101/@0101/@0101/@0101/@0101/@0101/@0102/@0102/@0102/@0103/@0103/@0103/@0104/@0104/@0104/@0104/@","mdwyWtrInf_cnt":16,"calScValArr":"7/@8/@9/@10/@11/@12/@13/@14/@15/@16/@17/@18/@19/@20/@21/@22/@","pyAmtArr":"2000000/@2000000/@2000000/@2000000/@2000000/@2000000/@3000000/@3000000/@3000000/@3000000/@3000000/@3000000/@5000000/@5000000/@5000000/@5000000/@","intyCd":"3010065/@","intyScCd":"01/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"1","scnpGndrCd":"1","EntAmt":"20929560/@","pltcPrm":"174413/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@","pmtpdArr":"22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
				// 교육자금 인출 설계 (주계약과 보험료 납입면제특약 동시 가입 시) 주피보험자(가입자녀) 남자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월 보험료 173,477원, 보험료납입면제특약 월 보험료 2,456원, 22년 만기, 전기납 기준
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":2,"mdwyFuncDetaCdArr":"0101/@0101/@0101/@0101/@0101/@0101/@0102/@0102/@0102/@0103/@0103/@0103/@0104/@0104/@0104/@0104/@","mdwyWtrInf_cnt":16,"calScValArr":"7/@8/@9/@10/@11/@12/@13/@14/@15/@16/@17/@18/@19/@20/@21/@22/@","pyAmtArr":"2000000/@2000000/@2000000/@2000000/@2000000/@2000000/@3000000/@3000000/@3000000/@3000000/@3000000/@3000000/@5000000/@5000000/@5000000/@5000000/@","intyCd":"3010065/@3060001/@","intyScCd":"01/@03/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"1","scnpGndrCd":"1","EntAmt":"20929560/@174413/@","pltcPrm":"174413/@2501/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@22/@","pmtpdArr":"22/@22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
			}
			// 여자
			,"2":{
				// 교육자금 인출 미설계 (주계약만 가입 시) 주피보험자(가입자녀) 여자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월보험료 30만원, 22년 만기, 전기납 기준
				"1":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010065/@","intyScCd":"01/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"2","scnpGndrCd":"1","EntAmt":"36000000/@","pltcPrm":"300000/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@","pmtpdArr":"22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
				// 교육자금 인출 미설계 (주계약과 보험료 납입면제특약 동시 가입 시) 주피보험자(가입자녀) 여자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월 보험료 30만원, 보험료납입면제특약 월 보험료 4,248원, 22년 만기, 전기납 기준
				,"2":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":2,"intyCd":"3010065/@3060001/@","intyScCd":"01/@03/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"2","scnpGndrCd":"1","EntAmt":"36000000/@300000/@","pltcPrm":"300000/@4308/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@22/@","pmtpdArr":"22/@22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
				// 교육자금 인출 설계 (주계약만 가입 시) 주피보험자(가입자녀) 여자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월 보험료 173,477원, 22년 만기, 전기납 기준
				,"3":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":1,"mdwyFuncDetaCdArr":"0101/@0101/@0101/@0101/@0101/@0101/@0102/@0102/@0102/@0103/@0103/@0103/@0104/@0104/@0104/@0104/@","mdwyWtrInf_cnt":16,"calScValArr":"7/@8/@9/@10/@11/@12/@13/@14/@15/@16/@17/@18/@19/@20/@21/@22/@","pyAmtArr":"2000000/@2000000/@2000000/@2000000/@2000000/@2000000/@3000000/@3000000/@3000000/@3000000/@3000000/@3000000/@5000000/@5000000/@5000000/@5000000/@","intyCd":"3010065/@","intyScCd":"01/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"2","scnpGndrCd":"1","EntAmt":"20925960/@","pltcPrm":"174383/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@","pmtpdArr":"22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
				// 교육자금 인출 설계 (주계약과 보험료 납입면제특약 동시 가입 시) 주피보험자(가입자녀) 여자 0세, 종피보험자(가입부모) 남자 35세, 주계약 월 보험료 173,477원, 보험료납입면제특약 월 보험료 2,456원, 22년 만기, 전기납 기준
				,"4":{"map":{},"PLAN_CD":"","goodCd":"1000801","stdYmdTo":"0","pltcInf_cnt":2,"mdwyFuncDetaCdArr":"0101/@0101/@0101/@0101/@0101/@0101/@0102/@0102/@0102/@0103/@0103/@0103/@0104/@0104/@0104/@0104/@","mdwyWtrInf_cnt":16,"calScValArr":"7/@8/@9/@10/@11/@12/@13/@14/@15/@16/@17/@18/@19/@20/@21/@22/@","pyAmtArr":"2000000/@2000000/@2000000/@2000000/@2000000/@2000000/@3000000/@3000000/@3000000/@3000000/@3000000/@3000000/@5000000/@5000000/@5000000/@5000000/@","intyCd":"3010065/@3060001/@","intyScCd":"01/@03/@","conYmd":"","inspd":22,"pmtpd":"22","susfPeri":"000","pmtCyclCd":"01/@01/@","mnnpEntAge":"0","scnpEntAge":"35","mnnpGndrCd":"2","scnpGndrCd":"1","EntAmt":"20925960/@174383/@","pltcPrm":"174383/@2504/@","annOpnnAge":"0","goalPmtPeri":"0","inspdArr":"22/@22/@","pmtpdArr":"22/@22/@","goodSmclCd":"32","inspdVal":"22","inspdScCd":"01","pmtpdVal":"22","pmtpdScCd":"01"}
			}
		}
		// 상해보험
		// 200401 상품개정(보험료변동)
		,"61":{
			// 남자
			"1":{
				// 40세 가입, 20년 만기, 보험가입금액 5천만원, 비위험, 월납(20년)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1001701","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010103","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"50000000","pltcPrm":"3200","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"61","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 20년 만기, 보험가입금액 5천만원, 비위험, 일시납
			   ,"2":{"map":{},"PLAN_CD":"","goodCd":"1001701","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010103","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"50000000","pltcPrm":"516400","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"61","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
			   // m교통상해보험 40세, 3년 만기, 보험가입금액 200만원, 일시납
			   ,"3":{"map":{},"PLAN_CD":"","goodCd":"1001601","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010096","intyScCd":"01","conYmd":"","inspd":3,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"2000000","pltcPrm":"9500","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"61","inspdVal":"3","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
			}
			// 여자
			,"2":{
				// 40세 가입, 20년 만기, 보험가입금액 5천만원, 비위험, 월납(20년)
				"1":{"map":{},"PLAN_CD":"","goodCd":"1001701","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010103","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"50000000","pltcPrm":"1800","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"61","inspdVal":"20","inspdScCd":"01","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 20년 만기, 보험가입금액 5천만원, 비위험, 일시납
			   ,"2":{"map":{},"PLAN_CD":"","goodCd":"1001701","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010103","intyScCd":"01","conYmd":"","inspd":20,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"50000000","pltcPrm":"269200","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"61","inspdVal":"20","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
			   	// m교통상해보험 40세, 3년 만기, 보험가입금액 200만원, 일시납
			   ,"3":{"map":{},"PLAN_CD":"","goodCd":"1001601","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010096","intyScCd":"01","conYmd":"","inspd":3,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"2000000","pltcPrm":"4140","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"61","inspdVal":"3","inspdScCd":"01","pmtpdVal":"0","pmtpdScCd":"00"}
			}
		}
		// 입원비보험 -> 190225. 보험가입금액3천만원으로 변경
		// 200401 상품개정(보험료변동)
		,"71":{
			// 남자
			"1":{
				// 40세 가입, 80세 만기, 보험가입금액 3천만원, 월납(20년), 만기환급률 0% 
				"1":{"map":{},"PLAN_CD":"","goodCd":"1002801","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010139","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"14940","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 3천만원, 일시납, 만기환급률 0%
			   ,"2":{"map":{},"PLAN_CD":"","goodCd":"1002801","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010139","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"2623500","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			    // 40세 가입, 80세 만기, 보험가입금액 3천만원, 월납(20년), 만기환급률 100%
			   ,"3":{"map":{},"PLAN_CD":"","goodCd":"1002803","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010141","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"33060","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
			    // 40세 가입, 80세 만기, 보험가입금액 3천만원, 일시납, 만기환급률 100%
			   ,"4":{"map":{},"PLAN_CD":"","goodCd":"1002803","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010141","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"4458120","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			    // 40세 가입, 80세 만기, 보험가입금액 3천만원, 월납(20년), 만기환급률 50% 
			   ,"6":{"map":{},"PLAN_CD":"","goodCd":"1002802","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010140","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"20580","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 3천만원, 일시납, 만기환급률 50% 
			   ,"7":{"map":{},"PLAN_CD":"","goodCd":"1002802","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010140","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"3303150","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
 
			}
			// 여자
			,"2":{
				// 40세 가입, 80세 만기, 보험가입금액 3천만원, 월납(20년), 만기환급률 0%
				"1":{"map":{},"PLAN_CD":"","goodCd":"1002801","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010139","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"14940","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 3천만원, 일시납, 만기환급률 0%
			   ,"2":{"map":{},"PLAN_CD":"","goodCd":"1002801","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010139","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"2624580","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			    // 40세 가입, 80세 만기, 보험가입금액 3천만원, 월납(20년), 만기환급률 100%
			   ,"3":{"map":{},"PLAN_CD":"","goodCd":"1002803","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010141","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"33000","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
			    // 40세 가입, 80세 만기, 보험가입금액 3천만원, 일시납, 만기환급률 100%
			   ,"4":{"map":{},"PLAN_CD":"","goodCd":"1002803","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010141","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"4459980","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			   // 40세 가입, 80세 만기, 보험가입금액 3천만원, 월납(20년), 만기환급률 50% 
			   ,"6":{"map":{},"PLAN_CD":"","goodCd":"1002802","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010140","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"20580","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 3천만원, 일시납, 만기환급률 50% 
			   ,"7":{"map":{},"PLAN_CD":"","goodCd":"1002802","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010140","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"30000000","pltcPrm":"3304530","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"71","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			}
		}
		//수술비보험 -> 190225. 보험료변경 변경
		,"81":{
			// 남자
			"1":{
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 월납(20년), 만기환급률 0%
				"1":{"map":{},"PLAN_CD":"","goodCd":"1002901","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010142","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"5460","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 일시납, 만기환급률 0%
			   ,"2":{"map":{},"PLAN_CD":"","goodCd":"1002901","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010142","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"959330","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			    // 40세 가입, 80세 만기, 보험가입금액 1천만원, 월납(20년), 만기환급률 100%
			   ,"3":{"map":{},"PLAN_CD":"","goodCd":"1002903","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010144","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"12060","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
			    // 40세 가입, 80세 만기, 보험가입금액 1천만원, 일시납, 만기환급률 100%
			   ,"4":{"map":{},"PLAN_CD":"","goodCd":"1002903","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010144","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"1630200","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 월납(20년), 만기환급률 50% 
			   ,"6":{"map":{},"PLAN_CD":"","goodCd":"1002902","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010143","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"7510","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 일시납, 만기환급률 50% 
			   ,"7":{"map":{},"PLAN_CD":"","goodCd":"1002902","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010143","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"1","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"1207870","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}

			}
			// 여자
			,"2":{
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 월납(20년), 만기환급률 0%
				"1":{"map":{},"PLAN_CD":"","goodCd":"1002901","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010142","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"5270","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 일시납, 만기환급률 0%
			   ,"2":{"map":{},"PLAN_CD":"","goodCd":"1002901","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010142","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"927260","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}
			    // 40세 가입, 80세 만기, 보험가입금액 1천만원, 월납(20년), 만기환급률 100%
			   ,"3":{"map":{},"PLAN_CD":"","goodCd":"1002903","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010144","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"11640","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
			    // 40세 가입, 80세 만기, 보험가입금액 1천만원, 일시납, 만기환급률 100%
			   ,"4":{"map":{},"PLAN_CD":"","goodCd":"1002903","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010144","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"1575700","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}			
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 월납(20년), 만기환급률 50% 
			   ,"6":{"map":{},"PLAN_CD":"","goodCd":"1002902","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010143","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"20","susfPeri":"000","pmtCyclCd":"01","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"7260","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"20","pmtpdScCd":"01"}
				// 40세 가입, 80세 만기, 보험가입금액 1천만원, 일시납, 만기환급률 50% 
			   ,"7":{"map":{},"PLAN_CD":"","goodCd":"1002902","stdYmdTo":"0","pltcInf_cnt":1,"intyCd":"3010143","intyScCd":"01","conYmd":"","inspd":40,"pmtpd":"0","susfPeri":"000","pmtCyclCd":"99","mnnpEntAge":"40","scnpEntAge":"000","mnnpGndrCd":"2","scnpGndrCd":"0","EntAmt":"10000000","pltcPrm":"1167490","annOpnnAge":"0","goalPmtPeri":"0","goodSmclCd":"81","inspdVal":"80","inspdScCd":"02","pmtpdVal":"0","pmtpdScCd":"00"}

			}
				
			
		}
};


/**
 * 예상 해지환급금 팝업 호출
 *
 * @param e
 * @param data
 */
util.openCancelPopUp = function(e,data) {
	// goodSmclCd = {"11":정기보험,"12":종신보험,"43":암보험,"44":5대성인병,"61":상해보험,"21":연금보험,"31":연금저축보험,"33":저축보험,"42":어린이보장보험,"32":어린이저축보험}	// 관리자 버튼고정
	try {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	} catch(ex) {
	}
	var paramObj = null;
	try {
		paramObj = objCancelParam[data.goodSmclCd][data.mnnpGndrCd][data.basicSetGubun];
	} catch(ex) {
		alert('파라미터에 문제가 있습니다.\n다시 확인하시기 바랍니다.');
		return;
	}
	var popURL = "/products/pc/HPPC120P1"; // 정기보험,암보험,5대성인병,어린이보장보험, 상해보험
	var popSize = {width:"750",height:"650"};

	// popup URL 세팅
	if (paramObj.goodSmclCd == "12"
		|| paramObj.goodSmclCd == "21"
		|| paramObj.goodSmclCd == "31"
		|| paramObj.goodSmclCd == "32"
		|| paramObj.goodSmclCd == "33"
		) {
		popURL = "/products/pc/HPPC121P1"; // 종신보험,연금보험,연금저축보험,저축보험,어린이저축보험
	}
	// popup 사이즈 세팅
	if (paramObj.goodSmclCd == "32" && util.chkReturn(paramObj.mdwyFuncDetaCdArr)) {
		popSize = {width:"990",height:"650"};
	}

	// 오늘 날짜 세팅
	paramObj.conYmd = util.getDate();
	// 구코드 신코드 동일사용
	paramObj.insSbsnGoodSmclCd = paramObj.goodSmclCd;
	// 넘어온 파라미터 세팅
	$.each(data,function(key) {
		if (util.chkReturn(data[key])) {
			paramObj[key] = data[key];
		}
	});

	util.wPopPage(popURL,popSize,paramObj);
};


/**
 * 해지환급금 예시 데이터 가져오기
 * @param exStdCd 예시기준코드
*/
util.getRcsnRstAmtExData = function (exStdCd){
	
	var rcsnRstAmtDataEx = {};

	$.ajax({type        : "POST"
	       ,async       : false //동기방식
	       ,url         : "/common/cc/HPCommonUtil.ajax"
	       ,dataType    : "json"
	       ,data        : {"tradeKey" :"getRcsnRstAmtExData" , "exStdCd" :  exStdCd }
	       ,error       : function(data){ //통신 에러 발생시 처리
	    	   				alert("통신에러가 발생하였습니다.");
	       				  }
	       ,success     : function(data){ //통신 성공시 처리
	    	   					rcsnRstAmtDataEx = data.result.outData.rcsnRstAmtExData;
	       				  }
	        
	});
	
	return rcsnRstAmtDataEx;
};

/**
 * 예상 해지환급금 팝업 호출
 * 20.04.23 부터 신규 적용
 * @param exStdCd 예시기준코드
 */

util.openRcsnRstAmtDataExPopUp = function(exStdCd) {
	
	var paramObj = util.getRcsnRstAmtExData(exStdCd);
	
	var popURL = "/products/pc/HPPC120P1"; // 정기보험,암보험,5대성인병,어린이보장보험, 상해보험
	var popSize = {width:"750",height:"650"};

	// popup URL 세팅
	if (paramObj.goodSmclCd == "12"
		|| paramObj.goodSmclCd == "21"
		|| paramObj.goodSmclCd == "31"
		|| paramObj.goodSmclCd == "32"
		|| paramObj.goodSmclCd == "33"
		) {
		popURL = "/products/pc/HPPC121P1"; // 종신보험,연금보험,연금저축보험,저축보험,어린이저축보험
	}
	// popup 사이즈 세팅
	if (paramObj.goodSmclCd == "32" && util.chkReturn(paramObj.mdwyFuncDetaCdArr)) {
		popSize = {width:"990",height:"650"};
	}

	// 추가 Data Set 
	
	var intyScCdlen = paramObj.intyScCd.split('/@').length;
	
	paramObj.conYmd = util.getDate();
	paramObj.insSbsnGoodSmclCd = paramObj.goodSmclCd;
	paramObj.EntAmt = paramObj.entAmt;
	paramObj.mdwyWtrInf_cnt = paramObj.mdwyWtrInfCnt;
	paramObj.stdYmdTo = "0";
	paramObj.pltcInf_cnt = (intyScCdlen>'1')? intyScCdlen-1:'1';
	paramObj.PLAN_CD = ( paramObj.goodSmclCd =='21' || paramObj.goodSmclCd == '31')?"02":"";
	paramObj.susfPeri = "000";
	
	util.wPopPage(popURL,popSize,paramObj);
};

/**
 * 예상 연금수령액 기본세팅 파라미터
 */
var objExpectParam = {
	// 연금보험
	"21":{
		// 남자
		"1":{"objScCd":"102","intyCd":"3010182","strnItemNknmNm":"annMinDfrmPeri","strnItemAttrInqrCndt_cnt":"1","stdYmd":"","strnItemVal":"21","inflow":"ZZ","PLAN_CD":"02","objCd":"3010182","insSbsnGoodSmclCd":"21","intyScCd":"01","goodNm":"","sppoObjCd":"","goodCd":"1004801","iratData":{"aplStdIrat":"0","prdCd":"1004801","vldtOpnnYmd":"20160301","intyCd":"3010182","aplDetaCd":"F03","parPbanIratScCd":null,"milIratCd":"B02","pllnScCd":null,"aplRto":"100.59","milGutIrat":"0","flctIrat":"0","eprePeriLsthScCd":null,"aplIratCd":"B","vldtEndYmd":"99991231","eprePeriAbScCd":null,"parIratCd":"E03"},"annTypePyPeriInqrRslt_cnt":"7","periDef":"0","intyNm":"","prmTablUseYn":"N","paceMkIratRt":{"aplStdIrat":"0","flctIratScCd":"A03","vldtOpnnYmd":"20150101","pbanIratScCd":"Z","parPbanIratScCd":null,"aplRto":"0","milGutIrat":"0","flctIratScLrclCd":"A","flctIrat":"0","eprePeriLsthScCd":null,"vldtEndYmd":"99991231","eprePeriAbScCd":null,"dalDt":"20141226134750463000"},"annTypePyPeriInqrRslt":[{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"A01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010182"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"A02","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010182"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"A04","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010182"},{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"B02","annPyPeri":"10","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010182"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"B04","annPyPeri":"20","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010182"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"B08","annPyPeri":"100","annPyPeriScCd":"02","annInsKdCd":"B","intyCd":"3010182"},{"annGutPeri":"0","annGutPeriScCd":"ZZ","annPyTypeCd":"C01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"C","intyCd":"3010182"}],"list":{},"faqList":{},"pltcPrm":"300000","susfPeri":"0","scnpEntAge":"0","annPyPeriScCd":"99","annInsKdCd":"A","pmtpd":"20","goalAnnEstYn":"Y","noException":"Y","goalPmtPeri":"120","inspdScCd":"09","mpyPrm":"0","annPyPeri":"999","mnnpEntAge":"40","pmtCyclCd":"01","goalMmPrm":"0","goalAnnAmt":"0","tradeKey":"ATA001A03","pltcInf_cnt":"1","inspd":"999","annGutPeriScCd":"01","ageInspd":"99","annPyTypeCd":"A01","pmtPd_limit":"60","scnpGndrCd":"0","annPetInf_cnt":"1","psno1":"","conYmd":"","annGutPeri":"10","pltcInfSgca_cnt":"1","flctIrat":"0","mnnpGndrCd":"1","pmtpdScCd":"02","entInsAge":"40","annOpnnAge":"60","ageInspdType":"09","EntAmt":"36000000","annPyTypeSlctRto":"100","annPyTypeCd0":"A01","annPyTypeCd1":"","annPyTypeSlctRto0":"100","annPyTypeSlctRto1":"","annAnam0":"0","annAnam1":"0","annAnam":0,"annAnamStr":"0/@0","aplIrat":"0","pmGoalAnnAnam":0,"annOpnnPnti":"","goalPmtPeriLtch":"10년(50세 까지)","pmtpdLtch":"20년(60세 까지)","goalAnnAnam":0}
		// 여자
		,"2":{"objScCd":"102","intyCd":"3010182","strnItemNknmNm":"annMinDfrmPeri","strnItemAttrInqrCndt_cnt":"1","stdYmd":"","strnItemVal":"21","inflow":"ZZ","PLAN_CD":"02","objCd":"3010182","insSbsnGoodSmclCd":"21","intyScCd":"01","goodNm":"","sppoObjCd":"","goodCd":"1004801","iratData":{"aplStdIrat":"0","prdCd":"1004801","vldtOpnnYmd":"20160301","intyCd":"3010182","aplDetaCd":"F03","parPbanIratScCd":null,"milIratCd":"B02","pllnScCd":null,"aplRto":"100.59","milGutIrat":"0","flctIrat":"0","eprePeriLsthScCd":null,"aplIratCd":"B","vldtEndYmd":"99991231","eprePeriAbScCd":null,"parIratCd":"E03"},"annTypePyPeriInqrRslt_cnt":"7","periDef":"0","intyNm":"","prmTablUseYn":"N","paceMkIratRt":{"aplStdIrat":"0","flctIratScCd":"A03","vldtOpnnYmd":"20150101","pbanIratScCd":"Z","parPbanIratScCd":null,"aplRto":"0","milGutIrat":"0","flctIratScLrclCd":"A","flctIrat":"0","eprePeriLsthScCd":null,"vldtEndYmd":"99991231","eprePeriAbScCd":null,"dalDt":"20141226134750463000"},"annTypePyPeriInqrRslt":[{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"A01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010182"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"A02","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010182"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"A04","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010182"},{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"B02","annPyPeri":"10","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010182"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"B04","annPyPeri":"20","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010182"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"B08","annPyPeri":"100","annPyPeriScCd":"02","annInsKdCd":"B","intyCd":"3010182"},{"annGutPeri":"0","annGutPeriScCd":"ZZ","annPyTypeCd":"C01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"C","intyCd":"3010182"}],"list":{},"faqList":{},"pltcPrm":"300000","susfPeri":"0","scnpEntAge":"0","annPyPeriScCd":"99","annInsKdCd":"A","pmtpd":"20","goalAnnEstYn":"Y","noException":"Y","goalPmtPeri":"120","inspdScCd":"09","mpyPrm":"0","annPyPeri":"999","mnnpEntAge":"40","pmtCyclCd":"01","goalMmPrm":"0","goalAnnAmt":"0","tradeKey":"ATA001A03","pltcInf_cnt":"1","inspd":"999","annGutPeriScCd":"01","ageInspd":"99","annPyTypeCd":"A01","pmtPd_limit":"60","scnpGndrCd":"0","annPetInf_cnt":"1","psno1":"","conYmd":"","annGutPeri":"10","pltcInfSgca_cnt":"1","flctIrat":"0","mnnpGndrCd":"2","pmtpdScCd":"02","entInsAge":"40","annOpnnAge":"60","ageInspdType":"09","EntAmt":"36000000","annPyTypeSlctRto":"100","annPyTypeCd0":"A01","annPyTypeCd1":"","annPyTypeSlctRto0":"100","annPyTypeSlctRto1":"","annAnam0":"0","annAnam1":"0","annAnam":0,"annAnamStr":"0/@0","aplIrat":"0","pmGoalAnnAnam":0,"annOpnnPnti":"","goalPmtPeriLtch":"10년(50세 까지)","pmtpdLtch":"20년(60세 까지)","goalAnnAnam":0}
	}
	//연금저축보험
	,"31":{
		// 남자
		"1":{"objScCd":"102","intyCd":"3010181","strnItemNknmNm":"annMinDfrmPeri","strnItemAttrInqrCndt_cnt":"1","stdYmd":"","strnItemVal":"31","inflow":"ZZ","PLAN_CD":"02","objCd":"3010181","insSbsnGoodSmclCd":"31","intyScCd":"01","goodNm":"","sppoObjCd":"","goodCd":"1004701","iratData":{"aplStdIrat":"0","prdCd":"1004701","vldtOpnnYmd":"20160301","intyCd":"3010181","aplDetaCd":"F03","parPbanIratScCd":null,"milIratCd":"B02","pllnScCd":null,"aplRto":"100.59","milGutIrat":"0","flctIrat":"0","eprePeriLsthScCd":null,"aplIratCd":"B","vldtEndYmd":"99991231","eprePeriAbScCd":null,"parIratCd":"E03"},"annTypePyPeriInqrRslt_cnt":"7","periDef":"0","intyNm":"","prmTablUseYn":"N","paceMkIratRt":{"aplStdIrat":"0","flctIratScCd":"A03","vldtOpnnYmd":"20150101","pbanIratScCd":"Z","parPbanIratScCd":null,"aplRto":"0","milGutIrat":"0","flctIratScLrclCd":"A","flctIrat":"0","eprePeriLsthScCd":null,"vldtEndYmd":"99991231","eprePeriAbScCd":null,"dalDt":"20141226134750463000"},"annTypePyPeriInqrRslt":[{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"A01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010181"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"A02","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010181"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"A04","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010181"},{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"B02","annPyPeri":"10","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010181"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"B04","annPyPeri":"20","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010181"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"B08","annPyPeri":"100","annPyPeriScCd":"02","annInsKdCd":"B","intyCd":"3010181"},{"annGutPeri":"0","annGutPeriScCd":"ZZ","annPyTypeCd":"C01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"C","intyCd":"3010181"}],"list":{},"faqList":{},"pltcPrm":"300000","susfPeri":"0","scnpEntAge":"0","annPyPeriScCd":"99","annInsKdCd":"A","pmtpd":"30","goalAnnEstYn":"Y","noException":"Y","goalPmtPeri":"240","inspdScCd":"09","mpyPrm":"0","annPyPeri":"999","mnnpEntAge":"30","pmtCyclCd":"01","goalMmPrm":"0","goalAnnAmt":"0","tradeKey":"ATA001A03","pltcInf_cnt":"1","inspd":"999","annGutPeriScCd":"01","ageInspd":"99","annPyTypeCd":"A01","pmtPd_limit":"60","scnpGndrCd":"0","annPetInf_cnt":"1","psno1":"","conYmd":"","annGutPeri":"10","pltcInfSgca_cnt":"1","flctIrat":"0","mnnpGndrCd":"1","pmtpdScCd":"02","entInsAge":"30","annOpnnAge":"60","ageInspdType":"09","EntAmt":"36000000","annPyTypeSlctRto":"100","annPyTypeCd0":"A01","annPyTypeCd1":"","annPyTypeSlctRto0":"100","annPyTypeSlctRto1":"","annAnam0":"0","annAnam1":"0","annAnam":0,"annAnamStr":"0/@0","aplIrat":"0","pmGoalAnnAnam":0,"annOpnnPnti":"","goalPmtPeriLtch":"20년(50세 까지)","pmtpdLtch":"30년(60세 까지)","goalAnnAnam":0}
		// 여자
		,"2":{"objScCd":"102","intyCd":"3010181","strnItemNknmNm":"annMinDfrmPeri","strnItemAttrInqrCndt_cnt":"1","stdYmd":"","strnItemVal":"31","inflow":"ZZ","PLAN_CD":"02","objCd":"3010181","insSbsnGoodSmclCd":"31","intyScCd":"01","goodNm":"","sppoObjCd":"","goodCd":"1004701","iratData":{"aplStdIrat":"0","prdCd":"1004701","vldtOpnnYmd":"20160301","intyCd":"3010181","aplDetaCd":"F03","parPbanIratScCd":null,"milIratCd":"B02","pllnScCd":null,"aplRto":"100.59","milGutIrat":"0","flctIrat":"0","eprePeriLsthScCd":null,"aplIratCd":"B","vldtEndYmd":"99991231","eprePeriAbScCd":null,"parIratCd":"E03"},"annTypePyPeriInqrRslt_cnt":"7","periDef":"0","intyNm":"","prmTablUseYn":"N","paceMkIratRt":{"aplStdIrat":"0","flctIratScCd":"A03","vldtOpnnYmd":"20150101","pbanIratScCd":"Z","parPbanIratScCd":null,"aplRto":"0","milGutIrat":"0","flctIratScLrclCd":"A","flctIrat":"0","eprePeriLsthScCd":null,"vldtEndYmd":"99991231","eprePeriAbScCd":null,"dalDt":"20141226134750463000"},"annTypePyPeriInqrRslt":[{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"A01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010181"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"A02","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010181"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"A04","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"A","intyCd":"3010181"},{"annGutPeri":"10","annGutPeriScCd":"01","annPyTypeCd":"B02","annPyPeri":"10","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010181"},{"annGutPeri":"20","annGutPeriScCd":"01","annPyTypeCd":"B04","annPyPeri":"20","annPyPeriScCd":"01","annInsKdCd":"B","intyCd":"3010181"},{"annGutPeri":"100","annGutPeriScCd":"02","annPyTypeCd":"B08","annPyPeri":"100","annPyPeriScCd":"02","annInsKdCd":"B","intyCd":"3010181"},{"annGutPeri":"0","annGutPeriScCd":"ZZ","annPyTypeCd":"C01","annPyPeri":"999","annPyPeriScCd":"99","annInsKdCd":"C","intyCd":"3010181"}],"list":{},"faqList":{},"pltcPrm":"300000","susfPeri":"0","scnpEntAge":"0","annPyPeriScCd":"99","annInsKdCd":"A","pmtpd":"30","goalAnnEstYn":"Y","noException":"Y","goalPmtPeri":"240","inspdScCd":"09","mpyPrm":"0","annPyPeri":"999","mnnpEntAge":"30","pmtCyclCd":"01","goalMmPrm":"0","goalAnnAmt":"0","tradeKey":"ATA001A03","pltcInf_cnt":"1","inspd":"999","annGutPeriScCd":"01","ageInspd":"99","annPyTypeCd":"A01","pmtPd_limit":"60","scnpGndrCd":"0","annPetInf_cnt":"1","psno1":"","conYmd":"","annGutPeri":"10","pltcInfSgca_cnt":"1","flctIrat":"0","mnnpGndrCd":"2","pmtpdScCd":"02","entInsAge":"30","annOpnnAge":"60","ageInspdType":"09","EntAmt":"36000000","annPyTypeSlctRto":"100","annPyTypeCd0":"A01","annPyTypeCd1":"","annPyTypeSlctRto0":"100","annPyTypeSlctRto1":"","annAnam0":"0","annAnam1":"0","annAnam":0,"annAnamStr":"0/@0","aplIrat":"0","pmGoalAnnAnam":0,"annOpnnPnti":"","goalPmtPeriLtch":"20년(50세 까지)","pmtpdLtch":"30년(60세 까지)","goalAnnAnam":0}
	}
};

/**
 * 예상 연금수령액 팝업 호출
 *
 * @param e
 * @param data
 */
util.openExpectPopUp = function(e,data) {
	//insSbsnGoodSmclCd = {"21":연금보험,"31":연금저축보험}	// 관리자 버튼고정
	try {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	} catch(ex) {
	}
	var paramObj = null;
	try {
		paramObj = objExpectParam[data.insSbsnGoodSmclCd][data.mnnpGndrCd];
	} catch(ex) {
		alert('파라미터에 문제가 있습니다.\n다시 확인하시기 바랍니다.');
		return;
	}
	var popURL = "/products/pc/HPPC140P1"; // 예상연금수령액
	var popSize = {width:"750",height:"650"};

	// 오늘 날짜 세팅
	paramObj.conYmd = util.getDate();
	// 넘어온 파라미터 세팅
	$.each(data,function(key) {
		if (util.chkReturn(data[key])) {
			paramObj[key] = data[key];
		}
	});

	util.wPopPage(popURL,popSize,paramObj);
};