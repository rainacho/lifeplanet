/* ============================================================================
 *  LIFEPLANET Channel System
 *  Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ==============================================================================
 * DESCRIPTION : 360 플래닛 공통 함수 
 * ========================================================================== */

 
var planet = (function() {
    var _public = {};
    var _private = {};
     
     //360 로그인 팝업
    _public.goLoginPop = function(returnUrl,popURL) {
    	var url = "";
    	var popupURL = "/innovation/ic/HPIC120P1";
    	
    	if(!util.isNull(returnUrl)){
    		url = returnUrl;
    	}else{
    		url = _public.loactionURL();
    	}
    	
    	if(!util.isNull(popURL)){
    		popupURL = popURL;
    	}
    	
		
    	var option = {
    			type 	 	: "modal",
    			id 		 	: 'loginViewAll',
    			location 	: 'external',
    			content  	: 'content1',
    			url 		: popupURL,
    			width		: 500,
    			
    			height		: 750
    		};
    	
    	PageUtil.openPopup(option, {'returnUrl' : url } );
    	
    };
    
    //라이프플래닛 로그인
    _public.goLifePlanetLogin = function(url,popUrl) {
    	
    	if($("#modal_ifrmWrap",parent.document).length > 0){
    		PageUtil.closeModal();
    	}
    	
    	var paramData = new Object();
    	
    	if(!util.isNull(url)){
    		headerInnoUrl = url;
    		paramData.ssInnoLoginUrl = url;
    	}else{
    		
    		paramData.ssInnoLoginUrl = _public.loactionURL();
    		
    	}
    	
    	if(!util.isNull(popUrl)){
    		paramData.callPopUrl = popUrl;
    	}
    	
    	var option = {
    			type 	 	: "modal",
    			id 		 	: 'loginView',
    			location 	: 'external',
    			content  	: 'content1',
    			url 		: "/login/HPGA01P0",
    			layerClass  : "modal_login",
    			width		: 810,
    			height		: 770
    		};
    	
    	setTimeout(function(){
    		PageUtil.openPopup(option, paramData);
    	},200);
    	
    };
    
    //현재 URL 넘겨줌 
    _public.loactionURL = function() {
    	
    	var url =  window.location.pathname;
    	var search = window.location.search;

    	if(!util.isNull(search)){
    		url += search;
    	}
		
		
		return url;
    };
    
    //해당 상태코드 메시지명 리턴
    _public.mbDetaStatMsg = function(mbStatCd ,mbDetaStatCd) {
    	var rtnMsg= "";
    	
    	if(mbStatCd == "02"){
    		rtnMsg="탈퇴";
    	}else if(mbStatCd == "03"){
    		rtnMsg="강제탈퇴";
    	}else if(mbStatCd == "04"){
    		if(mbDetaStatCd == "0401"){
    			rtnMsg="경고";
    		}else if(mbDetaStatCd == "0402"){
    			rtnMsg="이벤트 등의 부정 참여 방지를 위해 360플래닛 탈퇴 1개월 이후 재가입이 가능합니다.\n문의사항이 있으시면 라이프플래닛 고객센터로 연락해주세요.";
    		}else if(mbDetaStatCd == "0403"){
    			rtnMsg="360플래닛 이용약관 위반으로 회원 가입이 어렵습니다.\n문의사항이 있으시면 라이프플래닛 고객센터로 연락해주세요.";
    		}
    		
    	 }
    	
    	 rtnMsg="이용에 불편을 드려 죄송합니다.\n로그인하신 계정은  고객센터로 문의해주세요.(Tel 1566-0999)";
    	
	      return rtnMsg;
	      
      };
    
    //라이프플래닛 로그인 여부
   _public.isLifeLogin = function() {
    	
	   var isLogin = false;
	   
	   if(globalVar.getParam("webLog")!=undefined){
		   isLogin = globalVar.getParam("webLog").isLogin;
	   }
		
		
		return isLogin;
    };
   
   
   _public.isPlanetChk = function() {
	   if(planetUser != "Y"){
		   alert("로그인후 이용 가능합니다.");
		   var url ="/innovation/ic/HPIC100S1";
			var data ={};
			data.callPopUrl="/innovation/ic/HPIC120P1";
			data.returnLoginURL =_public.loactionURL();
			PageUtil.movePage(url, data, "", "GET");
		   return false;
	   }
	   
	   return true;
   	
    };
    
    _public.isPlanetUser = function() {
    	return planetUser === "Y"
    };
    
    _public.moveToPlanetUserOnlyPage = function(url) {
  	  if(!planet.isPlanetUser()){
  		  if(confirm("해당 메뉴의 경우 회원만 이용 가능합니다. 로그인화면으로 이동 하시겠습니까?")){
  			goLoginPop(url);
  		  }
  	  }else{
  		  PageUtil.movePage(url);
  	  }
    };
   
   _public.seedHtml = function(){
	   	var html ="<i class=\"ic\">seed</i>";	
	   	return html;
   };
   
   _public.kyobobookPointHtml = function(){
	   return 'P';
   };
   
   _public.seedDataSet=function(){
	  
	   if(planetUser=="Y"){
		   
		   var seedHtml01 = planet.seedHtml();
		   var seedHtml02 = planet.seedHtml();
		   var nknm = globalVar.getParam("planetInfo").nknm;
		   
		   var usePosPoinAmt = globalVar.getParam("planetInfo").usePosPoinAmt;
		   var rrvParPoinAmt = globalVar.getParam("planetInfo").rrvParPoinAmt;
		   
		   var totPoinRrvCcn = globalVar.getParam("planetInfo").totPoinRrvCcn;
		   var poinRrvCcn = globalVar.getParam("planetInfo").poinRrvCcn;
		   
		   var entrCnt360 = globalVar.getParam("planetInfo").entrCnt360;
		   
		   $("[data-nknm=Y]").html(nknm);
		   
			if(location.href.indexOf('/innovation/') < 0){
				seedHtml01 = "<span class=\"seed18\">씨드</span>";
				seedHtml02 = "<span class=\"seed18 gr\">씨드</span>";
			}
		   
		   $("[data-usePosPoinAmt=Y]").html(planet.setCommas(usePosPoinAmt)+seedHtml01);
		   $("[data-rrvParPoinAmt=Y]").html(planet.setCommas(rrvParPoinAmt)+seedHtml02);
		   
		   $("[data-poinRrvCcn=Y]").html(planet.setCommas(poinRrvCcn)+"명");
		   $("[data-totPoinRrvCcn=Y]").html(planet.setCommas(totPoinRrvCcn)+"명");
		   
		   $("[data-entrCnt360=Y]").html(entrCnt360+"/5 <input type=\"hidden\" id=\"entrCnt360\" name=\"entrCnt360\" value=\""+entrCnt360+"\" />");
	   }
   };
   
   _public.rePointSet=function(){
	 //이전 as-is 페이지로 인한 ajax 바로 사용
	   $.ajax({type        : "POST"
	       		,async       : false //동기방식
	       		,url         : "/innovation/is/HPIS200S1.ajax"
	       		,dataType    : "json"
	       		,data        : {"tradeKey" :"retrieveSeedPointSession" }
	       		,error       : function(data){ //통신 에러 발생시 처리
	    	   				 
	       		}
	       		,success     : function(data){ //통신 성공시 처리
	       			var outData = data.result.outData;
	       			
	       			if(outData.planetInfo!=undefined){
	       				globalVar.setParam("planetInfo" , outData.planetInfo);
		       			planetUser = outData.planetUser;
		       			if($("[data-usePosPoinAmt=Y]").length >0 ){
		       			planet.seedDataSet();	
	       			}
	       				
				} 
	       }
	        
	});

   };
    	
   //적립 페이지 정보
   _public.rrvInfo = function(){
	    /*
	     	MK01	360플래닛 회원가입
			MK02	마케팅동의
			MK03	e-해피콜
			MK04	전담CS매니저 카톡친구맺기
			MK05	가입후기
			MK06	유지후기
			MK07	아이디어 제안
			MK08	라플의 질문 참여
			MK09	라플 추천
			MK10	360플래닛 회원 가입 초대
			MK11	모바일앱로그인
			MK25	라플공유
	    */
	   var rrvInfo = new Map();
	   
		rrvInfo.put("MK01", {"type":"popup" 	, "url" : "/innovation/ic/HPIC130P1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : ""});
		rrvInfo.put("MK02", {"type":"popup" 	, "url" : "/innovation/is/HPIS220P1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "02", "width" : "500" 	, "height":"650"}	);
		rrvInfo.put("MK03", {"type":"popup" 	, "url" : "/bridge/bl/HPBL211P1" 		,	"lifeLogin" : "Y"	, "plnetMbDtptScCd" : "02", "width" : "700" 	, "height":"650"}	);
		rrvInfo.put("MK04", {"type":"popup" 	, "url" : "/innovation/is/HPIS230P1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "02", "width" : "700" 	, "height":"650"}	);
		rrvInfo.put("MK05", {"type":"popup" 	, "url" : "/innovation/ip/HPIP110P1" 	,	"lifeLogin" : "Y"	, "plnetMbDtptScCd" : "02", "width" : "700" 	, "height":"650"}	);
		rrvInfo.put("MK07", {"type":"move" 		, "url" : "/innovation/ii/HPII100S1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "all"});
		rrvInfo.put("MK08", {"type":"move" 		, "url" : "/innovation/iq/HPIQ100S1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "all"});
		rrvInfo.put("MK09", {"type":"move" 		, "url" : "/innovation/is/HPIS210S1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "02"});
		rrvInfo.put("MK10", {"type":"move" 		, "url" : "/innovation/is/HPIS220S1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "all"});
		rrvInfo.put("MK11", {"type":"popup" 	, "url" : "/innovation/is/HPIS240P1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "02", "width" : "700" 	, "height":"650"}	);
		rrvInfo.put("MK12", {"type":"popup" 	, "url" : "/innovation/is/HPIS250P1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "02", "width" : "700" 	, "height":"650"}	);
		rrvInfo.put("MK25", {"type":"move" 		, "url" : "/innovation/is/HPIS210S1" 	,	"lifeLogin" : ""  	, "plnetMbDtptScCd" : "02"});
		
		return rrvInfo;
	   
   };
   
   
   _public.isFloat = function (strNum) {
   	// null, undefined, 빈스트링 체크
   	if (strNum == undefined || strNum == null || strNum == ""){
   		return false;
   	}
   	
   	var cnt = 0;
   	strNum = strNum + "";
   	
   	for (var i = 0; i < strNum.length; i++) {
   		// Check that current character is number.
   		var c = strNum.charAt(i);

   		if (!planet.isDigit(c)) {
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
   
   _public.isDigit = function (strNum) {
   	// null, undefined, 빈스트링 체크
   	if (strNum == undefined || strNum == null || strNum == ""){
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
   
   _public.setCommas = function (strNum, strReText){
		var bCheck = true;
		
		// 입력된 문자열이 숫자와 '.'으로만 이루어져 있는가? 빈스트링은 문자로 본다.
		if (planet.isFloat(strNum) == false){
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
			if (strReText == undefined || strReText == null || strReText == ""){
				return "";
			} else {
				return strReText;
			}
		}
	};
   

	_public.popupAddClass = function (){
		if(parent.location.href.indexOf('/innovation/') > -1 || parent.location.href.indexOf('/mypage/') > -1 || parent.location.href.indexOf('/HPBL610S1') > -1 ){
			$("#modal_ifrmWrap",parent.document).addClass("empty_pop");	
		}else{
			$("#modal_ifrmWrap",parent.document).addClass("pop_lifeplanet");
			$("#pop").removeClass("empty_pop").addClass("pop_lifeplanet");
		}
		
	};
	
	_public.my360Popup=function(){
		
		var option = {
				id : 'popupwrap',
				location : 'external',
				content : 'content1',
				width : 500,
				height : 650,
				url : '/innovation/ic/HPIC101P1.dev',
				pageParam : ""
		};

		PageUtil.openPopup(option);
		
	};
	
	// 당월 적립 가능한 경험후기 포인트 계산
	_public.eplgSeedTot = function(HpyEplgCnt) {
		var writableEntEplgCnt = util.Number(HpyEplgCnt.ableJpCnt1); // 보험가입후기 건수
		var noPointEntEplgCnt = util.Number(HpyEplgCnt.ableJpCnt4); // 보험가입후기 포인트 미지급 건수
		
		var entEplgPoint = _private.calcGatherableEntEplgPoint(writableEntEplgCnt, noPointEntEplgCnt);
		
		var writableContEplgCnt = util.Number(HpyEplgCnt.ableJpCnt2); // 계약관리후기 건수
		var writtenContEplgCntOnThisMonth = util.Number(HpyEplgCnt.ableJpCnt3); // 계약관리후기 이번달 작성건수
		
		var contEplgPoint = _private.calcGatherableContEplgPoint(writableContEplgCnt, writtenContEplgCntOnThisMonth);
		
		return entEplgPoint + contEplgPoint;
	};
	
	// 보험가입후기 작성으로 적립 가능한 포인트 계산
	_private.calcGatherableEntEplgPoint = function(writableEntEplgCnt, noPointEntEplgCnt) {
		var pointPerEntEplg = 1000;
		
		return Math.max(writableEntEplgCnt - noPointEntEplgCnt, 0) * pointPerEntEplg;
	};
	
	// 계약관리후기 작성으로 당월 적립 가능한 포인트 계산
	_private.calcGatherableContEplgPoint = function(writableContEplgCnt, writtenContEplgCntOnThisMonth) {
		var maxGatherableCntByContEplgEachMonth = 3; // 월별 포인트 적립이 가능한 계약관리후기 작성 횟수 최대치
		
		if(writtenContEplgCntOnThisMonth >= maxGatherableCntByContEplgEachMonth) {
			return 0;
		}
		
		var pointPerContEplg = 200;
		var remainedCnt = Math.max(maxGatherableCntByContEplgEachMonth - writtenContEplgCntOnThisMonth, 0);
		
		return Math.min(remainedCnt, writableContEplgCnt) * pointPerContEplg;
	};
	
	// 아이디어 작성하기 페이지로 이동
	_public.goToWriteIdea = function(url){
		util.movePage(url || "/innovation/ii/HPII120S1", {});
	};
	
	_private.successCallback = function(callbackData){
		
		var inSData = callbackData.inSData;
		var outData = callbackData.outData;
		
		if(util.isNull(inSData.tradeKey)){
			_private.failureCallback(callbackData);
			return;
		}
		
		switch(inSData.tradeKey){
			default:
				break;
		}
	};
	
	_private.failureCallback = function(callbackData){
		
		var iData = callbackData.inSData;
		var oData = callbackData.outData;
		
		switch(iData.tradeKey || 'default') {
			default :
				alert("잠시후 다시 시도해주시기 바랍니다.");
				break;
		}
	};
    
    return _public;
})();




$(document).ready(function() {
	try{
		
		if($("[data-usePosPoinAmt=Y]").length >0 ){
			planet.seedDataSet();	
		}
		 
				
		
		if(
		   location.pathname.indexOf("HPIY100S1") > -1 ||
		   location.pathname.indexOf("HPIY200S1") > -1 ||
		   location.pathname.indexOf("HPIY300S1") > -1 ||
		   location.pathname.indexOf("HPIY400S1") > -1 ||
		   location.pathname.indexOf("HPIS210S1") > -1 ||
		   location.pathname.indexOf("HPIS220S1") > -1 ||
		   location.pathname.indexOf('HPIS310S1') > -1){
			var callPopUrl= globalVar.getParam("inSData").callPopUrl;
			if(!util.isNull(callPopUrl) && planetUser != "Y"){
					
				var url ="/innovation/ic/HPIC100S1";
				var data ={};
				data.callPopUrl =callPopUrl;
				PageUtil.movePage(url, data, "", "GET");
	  			return false;
	  			
			}else if(!planet.isPlanetChk()){
					return false;	
			}
		} 
				
		if(location.pathname.indexOf('HPCC010P1') < 0 
			&&  location.pathname.indexOf('HPGA01P0') < 0
			&&  location.pathname.indexOf('HPGA01S0')  < 0
			&&  location.pathname.indexOf('HPCC010S1')  < 0){
			
			if($("#modal_ifrmWrap",parent.document).length < 1){
			    
				if(typeof globalVar != "undefined"  &&  
				    globalVar.getParam("inSData") != undefined  &&
					globalVar.getParam("inSData").callPopUrl !=undefined && 
					globalVar.getParam("inSData").callPopUrl != ""){
					
					var noPopup = "N";
					var popParamObj = {};
					var HPIC120P1 = "/innovation/ic/HPIC120P1";
					var HPIC130P1 = "/innovation/ic/HPIC130P1";
					var HPIC160P1 = "/innovation/ic/HPIC160P1";
					var popWidth = 500;
					var popheight = 700 ;
					
					if(globalVar.getParam("inSData").callPopUrl == HPIC120P1){
						if(planetUser == "Y"){
							noPopup = "Y";
							globalVar.getParam("inSData").callPopUrl = "";
						}else{
							if(globalVar.getParam("inSData").returnLoginURL != undefined ){
								popParamObj ={
										"returnUrl" : globalVar.getParam("inSData").returnLoginURL	
									};	
								
							}else{
								popParamObj ={
										"popAfter" : "Y"	
									};	
							}
							
						}
						
					}else if(globalVar.getParam("inSData").callPopUrl == HPIC130P1){
						if(planetUser=="N"){
							if(planet.isLifeLogin()){
								globalVar.getParam("inSData").callPopUrl = HPIC160P1;	
							}else{
								globalVar.getParam("inSData").callPopUrl = HPIC130P1;
							}
							
						}else{
							popParamObj ={
								"popAfter" : "Y"	
							};	
						}
						
					}else if(globalVar.getParam("inSData").callPopUrl == "/contact/ct/HPCT103P1.dev"||
								globalVar.getParam("inSData").callPopUrl == "/contact/ct/HPCT131P1.dev" ){
						popWidth=750;
						popWidth=720;
					}
					
					if(noPopup == "N"){
						setTimeout(function(){
							var option = {
					    			type 	 	: "modal",
					    			id 		 	: 'loginViewAll',
					    			location 	: 'external',
					    			content  	: 'content1',
					    			url 		:globalVar.getParam("inSData").callPopUrl,
					    			width		: popWidth,
					    			height		: popheight
					    		};
					    	
					    	PageUtil.openPopup(option , popParamObj);
						},1000);
					}
					
				}
			}
			
		}
		
	}catch(e){
		//alert("planetCommon : "+e);
	}
    	
});    	


if(location.pathname.indexOf("/hlno/HPCJ")  < 0){//건강검진 제출 제외

	//as-is 로 인한 함수 선언
	if(typeof Main == "undefined"  ){
		var Main = (function() {
			var _public = {};
			
			_public.onLoading = function(){
				if(location.href.indexOf("innovation") > -1){
		            $('#area_loading').show();
		        }else{
		            $('#loadingArea').show();
		        }
			};
			
			/**
			 * 기본 로딩창을 제거한다.
			 */
			_public.offLoading = function(){
				if(location.href.indexOf("innovation") > -1){
		            $('#area_loading').hide();
		        }else{
		            $('#loadingArea').hide();
		        }
			};
			return _public;
		})();
	
	}
	
	if(typeof util == "undefined"  ){
		var util = (function() {
			var _public = {};
			
			  _public.isNull = function(obj) {
			    	
			    	if (typeof obj == 'undefined' || obj == null || obj == '') {
			    		return true;
			    	} else {
			    		return false;
			    	}
			    	
			    };
			    
			    
			return _public;
		})();
	
	}
	
	if(typeof ssManager == "undefined"  ){
	
		var ssManager = (function() {
		    var _public = {};
		    var _private = {};
		    
		    _private.storage = sessionStorage;
		    
		    _public.setItem = function(key, data) {
		    	try{
			    	var jsonStr = JSON.stringify(data);
			    	_private.storage.setItem(key, jsonStr);
		    	}catch(e){
		    		logger.error(e);
		    	}
		    };
		    
		    _public.getItem = function(key){
		    	try{
			    	var strJSON = _private.storage.getItem(key);
			    	
			    	//strJSON이 undefiend일 경우 null 반환
			    	if(strJSON == 'undefined'){
			    		return;
			    	}
			    	
			    	return JSON.parse(strJSON);
		    	}catch(e){
		    		logger.error(e);
		    	}
		    };
		    
		    _public.remove = function(key){
		    	try{
		    		_private.storage.removeItem(key);
		    	}catch(e){
		    		logger.error(e);
		    	}
		    };
		    
		    _public.removeAll = function(){
		    	try{
		    		_private.storage.clear();
		    	}catch(e){
		    		logger.error(e);
		    	}
		    };
		    
		    
		    return _public;
		})();
		
	}
}
