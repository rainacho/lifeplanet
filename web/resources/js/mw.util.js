/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 기존 홈페이지 시스템
 * FILE INFO   : mw.util.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 util 함수 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 홈페이지 2014-11-20	 	initial version
 * 시스템
 * 권대준	2014-12-11		KDIMW에 맞도록 구조 수정  			
 * ========================================================================== */

/******************************************************************************
 * [NOTE] : 기존 홈페이지 시스템에서 사용하던 util.js를 기반으로 KDIMW에서 사용하는
 * 		    구조로 수정을 진행함. 한가지 파일에 너무 많은 util이 산재되어 있어서 
 *		    검색이 용이하지 않아 목적에 맞는 util 별로 구조를 분산함.
 *		  
 *		    - mw.util.js 		: util의 메인으로 object를 생성한다.		  
 *		    - mw.util.date.js 	: date 관련 유틸의 집합		  
 *		    - mw.util.mask.js 	: masking, formatter 관련 집합		  
 *		    - mw.util.object.js : object 관련 함수의 집합		  
 *		    - mw.util.string.js : string 관련 함수의 집합		  
 *		    - mw.util.event.js 	: event 관련 함수의 집합		  
 *
 ******************************************************************************/

/**
 * Util성 함수 정의
 * 
 * @author	권대준, djkwon@kico.co.kr
 */
var util = (function() {
    var _public = {};
    
    /**
     * 현재 페이지의 화면ID 반환
     * @return screenId
     */
    _public.getCurrentScreenId = function() {
    	var currentUrl = location.href;
    	return currentUrl.substring(currentUrl.lastIndexOf('/') + 1, currentUrl.indexOf('.dev'));
    };
    
    /**
     * Object의 Null 여부 체크
     * @param obj
     * @returns {Boolean}
     */
    _public.isNull = function(obj) {
    	
    	if (typeof obj == 'undefined' || obj == null || obj == '') {
    		return true;
    	} else {
    		return false;
    	}
    	
    };
    
    /**
     * 브라우저 종류를 리턴한다.
     * @returns	- String - 문자열 리턴 - ie:익스프로러,ff:파이어폭스,sf:사파리,op:오페라,cr:크롬
     */
    _public.getBw = function () {
    	if ($.browser.msie){
    		return "ie";
    	} else if ($.browser.mozilla){
    		return "ff";
    	} else if ($.browser.safari){
    		return "sf";
    	} else if ($.browser.opera){
    		return "op";
    	} else if ($.browser.chrome){
    		return "cr";
    	} else {
    		return "";
    	}
    	
    	return "";
    };

    /**
     * 브라우저 버전을 리턴한다.
     * @returns
     */
    _public.getBwVr = function () {
    	return $.browser.version;
    };

    
    /**
     * 파일 다운로드 기능
     * 
     * @param :
     *            fileName 다운로드 받을 파일명
     * 
     * downloadPathType는 다음을 참고하여 입력할 것 미입력 : /shrd001/homepage 0 보험약관 :
     * /shrd001/insuManual - 1 상품설명서 : /shrd001/goodsManual - 2 사업방법서 :
     * /shrd001/busiManual - 3 신청서류(마이페이지) : /shrd001/myApplyManual
     * 
     */
    _public.fileDownload = function(fileName, downloadPathType) {
    	downloadPathType = util.chkReturn(downloadPathType,"s");
    	// 공통 다운로드 cmd
    	var downloadCmd = "/common/file/FileDownload";
    	// 화면에 추가할 html text를 만든다.
    	var strHtml = "";
    	var iframe	= '<div id="downloadIFrameArea" style="display:none"><iframe id="downloadIFrameId" title="다운로드용 프레임"></iframe></div>';
    	// 화면에 다운로드 폼이 있을경우
    	if($("#downloadForm").length > 0){
    		downloadCmd += ".dev";
    		$("#downloadForm").attr("action",downloadCmd);
    		$("#fileName").val(fileName);
    		$("#downloadPathType").val(downloadPathType);
    	}
    	// 화면에 다운로드 폼이 없을경우
    	else{
    		strHtml += "<form id=\"downloadForm\" name=\"downloadForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\">";
    		strHtml += "<input name=\"fileName\" id=\"fileName\" type=\"hidden\" value=\"" + fileName + "\" />";
    		strHtml += "<input name=\"downloadPathType\" id=\"downloadPathType\" type=\"hidden\" value=\"" + downloadPathType + "\" />";
    		strHtml += "</form>";
    		
    		$("body").append(iframe);	// 화면에 form 등 생성
    		$("#downloadIFrameArea").append(strHtml);	// 화면에 form 등 생성
    	}
    	
    	$("#downloadForm").submit();	// submit
    };
    
    
    /**
     * 계약관련 파일 다운로드 기능
     * 
     * @param :
     *            fileName 다운로드 받을 파일명
     * 
     * downloadPathType는 다음을 참고하여 입력할 것 미입력 : /shrd001/homepage 0 보험약관 :
     * /shrd001/insuManual - 1 상품설명서 : /shrd001/goodsManual - 2 사업방법서 :
     * /shrd001/busiManual - 3 신청서류(마이페이지) : /shrd001/myApplyManual
     * 
     */
    _public.rxeDownload = function(insConno,fileName) {
//    	downloadPathType = util.chkReturn(downloadPathType,"s");
    	var downloadPathType = "20";
    	fileName = util.chkReturn(fileName,"s");
    	insConno = util.chkReturn(insConno,"s");
    	
    	if(insConno == "" || fileName == "" ){
    		alert("필수값이 누락되었습니다.")
    		return false;
    	}
    	
    	// 공통 다운로드 cmd
    	var downloadCmd = "/common/file/FileDownload";
    	// 화면에 추가할 html text를 만든다.
    	var strHtml = "";
    	var iframe	= '<div id="downloadIFrameArea" style="display:none"><iframe id="downloadIFrameId" title="다운로드용 프레임"></iframe></div>';
    	// 화면에 다운로드 폼이 있을경우
    	if($("#downloadForm").length > 0){
    		downloadCmd += ".dev";
    		$("#downloadForm").attr("action",downloadCmd);
    		$("#fileName").val(fileName);
    		$("#insConno").val(insConno);
    		$("#downloadPathType").val(downloadPathType);
    	}
    	// 화면에 다운로드 폼이 없을경우
    	else{
    		strHtml += "<form id=\"downloadForm\" name=\"downloadForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\">";
    		strHtml += "<input name=\"fileName\" id=\"fileName\" type=\"hidden\" value=\"" + fileName + "\" />";
    		strHtml += "<input name=\"downloadPathType\" id=\"downloadPathType\" type=\"hidden\" value=\"" + downloadPathType + "\" />";
    		strHtml += "<input name=\"insConno\" id=\"insConno\" type=\"hidden\" value=\"" + insConno + "\" />";
    		strHtml += "</form>";
    		
    		$("body").append(iframe);	// 화면에 form 등 생성
    		$("#downloadIFrameArea").append(strHtml);	// 화면에 form 등 생성
    	}
    	
    	$("#downloadForm").submit();	// submit
    };
    /**
     * 파일 다운로드 기능
     * 
     * @param :
     *            fileName 다운로드 받을 파일명
     * 
     * downloadPathType는 다음을 참고하여 입력할 것 미입력 : /shrd001/homepage 0 보험약관 :
     * /shrd001/insuManual - 1 상품설명서 : /shrd001/goodsManual - 2 사업방법서 :
     * /shrd001/busiManual - 3 신청서류(마이페이지) : /shrd001/myApplyManual
     * 
     */
    _public.fileDownload3 = function (fileName, downloadPathType,realFileName) {
    	downloadPathType = util_chkReturn(downloadPathType,"s");
    	// 공통 다운로드 cmd
    	var downloadCmd = "/common/file/FileDownload";
    	// 화면에 추가할 html text를 만든다.
    	var strHtml = "";
    	var iframe	= '<div id="downloadIFrameArea" style="display:none"><iframe id="downloadIFrameId" title="다운로드용 프레임"></iframe></div>';
    	// 화면에 다운로드 폼이 있을경우
    	if($("#downloadForm").length > 0){
    		downloadCmd += ".dev";
    		$("#downloadForm").attr("action",downloadCmd);
    		$("#fileName").val(fileName);
    		$("#realFileName").val(realFileName);
    		$("#downloadPathType").val(downloadPathType);
    	}
    	// 화면에 다운로드 폼이 없을경우
    	else{
    		strHtml += "<form id=\"downloadForm\" name=\"downloadForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\">";
    		strHtml += "<input name=\"fileName\" id=\"fileName\" type=\"hidden\" value=\"" + fileName + "\" />";
    		strHtml += "<input name=\"realFileName\" id=\"realFileName\" type=\"hidden\" value=\"" + realFileName + "\" />";
    		strHtml += "<input name=\"downloadPathType\" id=\"downloadPathType\" type=\"hidden\" value=\"" + downloadPathType + "\" />";
    		strHtml += "</form>";
    		
    		$("body").append(iframe);	// 화면에 form 등 생성
    		$("#downloadIFrameArea").append(strHtml);	// 화면에 form 등 생성
    	}
    	
    	$("#downloadForm").submit();	// submit
    };
    /**
     * 지정된 시간이 경과했을 때 callback을 실행한다.
     * @param : type, date(yyyymmdd), callback
     * */
    _public.timeTrigger = function (type, date, callback) {
    	
    	date =  util.Number (util.setZeroRight (date, 14));
    	
    	var _toDate = util.Number (util.getDateTime ())							// 오늘날짜및 시간 ex (yyyymmddHH24miss)
    	, _process = {
    		'gt' : function (date, callback) {
    			
    			if (_toDate > date) {
    				
    				callback ();
    			}
    		},
    		'lt' : function (date, callback) {
    			
    			if (_toDate < date) {
    				
    				callback ();
    			}
    		}
    	};
    	
    	// 해당처리가 존재할 때 처리
    	if (_process.hasOwnProperty (type)) {
    		
    		_process[ type ] (date, callback);
    	}
    	
    	return false;
    };
    
    /**
     * 임시 13자리 가입설계 번호 생성
     * @param pcd
     */
    _public.makeRandomDN = function() {
    	
    	
    	var date = util.getDate().substr(2,8);
        var time = util.getTime();
        var randomStr = '';
		for ( var i = 1; i <= 3; i++) {
			if (Math.floor(Math.random() * 100) + 10 > 50) {
				// 대문자 A-Z 랜덤 알파벳 생성
				randomStr += String.fromCharCode((Math.random() * 26) + 65);
			} else {
				// 소문자 a-z 랜덤 알파벳 생성
				randomStr += String.fromCharCode((Math.random() * 26) + 97);
			}
		}
        
    	
    	return date + time + randomStr;
    	
    	
    };
    
    //임시 이벤트 시간 체크
    _public.eventChk = function() {
 	   
        var today=util.getDate();
        var chk=true;
        var lastDay=Number("20150601");
        
        if(window.location.host.indexOf("localhost")>-1){
     	   lastDay=Number("20150526");
        }else if(window.location.host.indexOf("hpd.lifeplanet.co.kr")>-1){
     	   lastDay=Number("20150526");
        }else if(window.location.host.indexOf("hpt.lifeplanet.co.kr")>-1){
     	   lastDay=Number("20150528");    	   
        }else if(window.location.host.indexOf("www.lifeplanet.co.kr")>-1){
     	   lastDay=Number("20150601");
        }else{
     	   lastDay=Number("20150601");
        }

        if($.isNumeric(today)){
     	   if( Number(today) >= lastDay){
     		   chk=false;   
     	   }
        }
        return chk;
     	
     };
     _public.kyoboTimeChk=function(){
    	 var dataCode={};
    	 var sDay="";
    	 var sTime="";
    	 var eDay="";
    	 var eTime="";
    	 var sDateTime="";
    	 var eDateTime="";
    	 var alrtMsg="";
    	 
    	dataCode=Main.getCommonCode("11373");
    	//dataCode[0].cmnnCdHanNm="20151202000000";
    	//dataCode[1].cmnnCdHanNm="20151202180000";
    	 
    	 if(dataCode!=undefined && dataCode.length==2){
    		 if(dataCode[0].cmnnCdHanNm!=null && dataCode[0].cmnnCdHanNm.length>12){
    			 sDay=dataCode[0].cmnnCdHanNm.substring(0,8); 
        		 sTime=dataCode[0].cmnnCdHanNm.substring(8,12);	 
        		 sDateTime=dataCode[0].cmnnCdHanNm;	 
    		 }
    		 
    		 if(dataCode[1].cmnnCdHanNm!=null && dataCode[1].cmnnCdHanNm.length>12){
    			 eDay=dataCode[1].cmnnCdHanNm.substring(0,8); 
    			 eTime=dataCode[1].cmnnCdHanNm.substring(8,12);
    			 eDateTime=dataCode[1].cmnnCdHanNm;
    		 }
    	 }
    	 
    	 if(util.Number(sDateTime) > 0 && util.Number(eDateTime) >0 ){
    		 if(util.Number(util.getDateTime()) >= util.Number(sDateTime)  &&  util.Number(util.getDateTime()) <= util.Number(eDateTime)){
    			 alrtMsg="교보문고 시스템 교체 작업으로 인해 서비스 이용이\n불가하오니 작업완료 후 이용하여 주십시오.";
    			 alrtMsg+="\n(중단일시 : "+util.setFmDate(sDay,".")+" "+sTime.substring(0,2)+":"+sTime.substring(2,4)+" ~ "+util.setFmDate(eDay,".")+" "+eTime.substring(0,2)+":"+eTime.substring(2,4)+")";
    			 alert(alrtMsg);
    			 return false;
    		 }
    		  
    	 }
    	 
    	 return true;
    	 
     };
          
     /**
      * 로그인한 공인인증서 cert key값과 거래 도중 서명한 공인인증서 cert key 값 비교
      * @param loginKey
      * @param curKey
      * @returns {Boolean}
      */
     _public.certKeyCheck = function(loginKey, curKey){
     	
     	var result = "";
     	//todo... 테스트 서버에서는 인증서 체크하지 않고 pass 운영시 삭제하고 아래 ==>if(loginKey == curKey) 사용
     	var pass_url = location.href;
     	if((loginKey == curKey) ||pass_url.match("hpd.lifeplanet.co.kr") || pass_url.match("hpt.lifeplanet.co.kr")){ 
//     	if(loginKey == curKey){ 
     		result = true;
     	}else{
     		closeLoading();
     		alert("로그인한 공인인증서와 서명한 공인인증서가 동일하지 않습니다.");
     		result = false;
     	}
     	return result;
     };
     /**
      * RD 로 그린 PDF 파일을 다운로드 한다.
      */
     _public.fileDownloadForRD = function(objRDParamData, downloadCmd) {
     	
     	// 공통 다운로드 cmd
     	downloadCmd = downloadCmd || '/common/file/FileDownloadForRD'; 

     	// 데이터로 넘긴 파라메터에 대한 처리
     	var paramHtml = [];
     	for(key in objRDParamData) {
     		paramHtml.push("<input name=\"" + key + "\" id=\"" + key + "\" type=\"hidden\" value=\"" + objRDParamData[key] + "\" />");
     	}

     	// form 데이터를 생성한다.
     	var formHtml = "";
     	iframe	= '<div id="downloadForRDIFrameArea" style="display:none"><iframe id="downloadIFrameId" name="downloadIFrameId" title="다운로드용 프레임"></iframe></div>';

     	if($("#downloadForRDForm").length > 0){
     		// 화면에 다운로드 폼이 있을경우
     		downloadCmd += ".dev";
     		$("#downloadForRDForm").attr("action" ,downloadCmd); // cmd 를 재정의        		
     		$("#downloadForRDForm").html(paramHtml.join(''));     // 넘길 파라메터를 정의
     	}
     	else {
     		
 			formHtml += "<form id=\"downloadForRDForm\" name=\"downloadForRDForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\" target=\"downloadIFrameId\">";
    		formHtml += paramHtml.join('');
    		formHtml += "</form>";
    		
    		$("body").append(iframe);	// 화면에 form 등 생성
    		$("#downloadForRDIFrameArea").append(formHtml);	// 화면에 form 등 생성
     	}
     	$("#downloadForRDForm").submit();	// submit
     };

     /**
      * 브라우저 뒤로가기 버튼막기
      * 
      */
     _public.changeHashOnLoad = function () {
    	
     	// ie10 미만 forward처리, 나머지 별도 처리
     	if ($.browser.msie){
			$('body').bind('keydown',function(e){
			      if(e.keyCode==8 && 'INPUT'.indexOf(e.target.nodeName.toUpperCase())==-1 && 'TEXTAREA'.indexOf(e.target.nodeName.toUpperCase())==-1){
			    	  if(window.event){
			    		  window.event.returnValue = false;
			    		  if(window.navigator.userAgent.indexOf('rv:11') > -1) {//IE11 일경우 키보드 backspace 누룰경우 이전페이지로 이동하는거 방지
			    			  e.preventDefault();
			    		  }
			    	  }else{
			    		  e.preventDefault();
			    	  }
			      }    
			});
			window.history.forward(0);
     	} else {
     		if (typeof history.pushState === "function") {
     			history.pushState("jibberish", null, null);
     	        window.onpopstate = function () {
     	            history.pushState('newjibberish', null, null);
     	        };
     	    } else {
     	    	var ignoreHashChange = true;
     	        window.onhashchange = function () {
     	            if (!ignoreHashChange) {
     	                ignoreHashChange = true;
     	                window.location.hash = Math.random();
     	            } else {
     	                ignoreHashChange = false;   
     	            }
     	        };
     	    }
     	}
     	
     };     
    
    return _public;
})();