/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 최용성, mogmog83@lifeplanet.co.kr
 * FILE INFO   : mw.ASTx.js, /resources/js/
 * DESCRIPTION : 보안프로그램 관련 스크립트 영역
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 최용성  	2015-08-27		initial version
 * 정익재   2015-09-01		보안모듈 관련 함수 추가
 * ========================================================================== */

var astxE2eTmp="";
var astxErrMsg="이용에 불편을 드려 죄송합니다.\n계속 발생시 고객센터로 문의해주세요.(Tel 1566-0999)";
var astxPass="";
var astxPassDefault="@@astxPass@@";
//astx text 암호화된거 clear
var astxClear=function(id){
	if($("#Tk_"+id+"_checkbox").is(":checked")==false){
		$ASTX2.clearE2EText(document.getElementById(id));
	}else{
		$("#"+id).val("");
	}
};

//e2e 일경우는 데이터 생성후 callback 하는 함수(예: 계좌인증)
//transkey일때는 바로 callback 하는 함수(예: 계좌인증)
var getAstxCheckCallBack=function(arg,callback){
	
	var transchk="";
	var astxchk="";
	
	if(setInputTransKey!=null && setInputTransKey.length>0){
		for(var i=0;i<setInputTransKey.length;i++){
			if($("#Tk_"+setInputTransKey[i].id+"_checkbox").length>0 &&
					$("#Tk_"+setInputTransKey[i].id+"_checkbox").is(":checked")==true){
				transchk="Y";
			}else{
				astxchk="Y";
			}
		}
		if(astxchk=="Y"){
			getASTxE2eData("",arg,eval(callback));
		}else if(transchk=="Y" && astxchk==""){
			
			if ($.isFunction (callback)) {	// 콜백이 함수일때 오류나서 추가함.
				
				callback (arg);
			}
			else {
				
				eval(callback+ "(arg)");	
			}
		}
	}else{
		getASTxE2eData("",arg,eval(callback));
	} 
	
};

//object 형태에 암호화 된 데이터를 넘김
var getAstxCheck=function(obj){
	
	var jumin2="";
	
	var transchk="";
	var astxchk="";
	
	if(setInputTransKey!=null && setInputTransKey.length>0){
		for(var i=0;i<setInputTransKey.length;i++){
			if(i==0){
				if($(":checkbox[id^=Tk_]").eq(0).attr("id").indexOf("_")>-1){
					jumin2=$(":checkbox[id^=Tk_]").eq(0).attr("id").split("_")[1];
				}
				obj.jumin2=jumin2;	
			}
			
			if($("#Tk_"+setInputTransKey[i].id+"_checkbox").length>0){
				if($("#Tk_"+setInputTransKey[i].id+"_checkbox").is(":checked")){
					transchk="Y";
				}else{
					astxchk="Y";
				}
			}
		}
		if(transchk=="Y" && astxchk==""){
			getTransKeyFnc("OBJ","",obj);
		}else if(transchk=="" && astxchk=="Y"){
			getE2eFnc("OBJ","",obj);
		}else{
			//transkey 와 astx 둘다
			getE2eTranskeyFnc("OBJ","",obj);
		}
	}else{
		getE2eFnc("OBJ","",obj);
	}
	 
};
 
//문자 형태에 암호화 된 데이터를 넘김
var getAstxSTRCheck=function(obj,str){
	var jumin2="";
	
	var transchk="";
	var astxchk="";
	if(setInputTransKey!=null && setInputTransKey.length>0){
		for(var i=0;i<setInputTransKey.length;i++){
			if(i==0){
	//			jumin2=setInputTransKey[i].id;
				
				if($(":checkbox[id^=Tk_]").eq(0).attr("id").indexOf("_")>-1){
					jumin2=$(":checkbox[id^=Tk_]").eq(0).attr("id").split("_")[1];
				}
				obj.jumin2=jumin2;	
			}
			
			if($("#Tk_"+setInputTransKey[i].id+"_checkbox").length>0){
				if($("#Tk_"+setInputTransKey[i].id+"_checkbox").is(":checked")){
					transchk="Y";
				}else{
					astxchk="Y";
				}	
			}
			
		}
		if(transchk=="Y" && astxchk==""){
			return  getTransKeyFnc("STR","",str);
		}else if(transchk=="" && astxchk=="Y"){
			return getE2eFnc("STR","",str);
		}else{
			//transkey 와 astx 둘다
			return  getE2eTranskeyFnc("STR","",str);
		}
	}else{
		return getE2eFnc("STR","",str);
	}
};

//transkey 와 astx 둘다 사용할경우
var getE2eTranskeyFnc=function(type,arg,obj){
	var transSeq=0;
	for(var i=0;i<setInputTransKey.length;i++){
		if($("#Tk_"+setInputTransKey[i].id+"_checkbox").is(":checked")){
			var tansinputId=setInputTransKey[i].id;
			var transkeyId      = getTranskeyIdByInputId(tansinputId);
			var transkeyInputId = getTranskeyInputIdByInputId(tansinputId);
			var chiperData      = document.getElementById(transkeyInputId).value;
			if(type=="STR"){
				obj += "&transkeyId"+transSeq+"=" + transkeyId;
				obj += "&chiperData"+transSeq+"=" + chiperData;
				if(transSeq==0){
					obj += "&transkeyUuid=" + transkeyUuid;
					obj += "&transkeyChk=transkey";
					obj += "&transkeyCnt="+$(":checkbox[id^=Tk_]").filter(":checked").length;
					obj += "&e2e_data1="+astxE2eTmp;
				}
			}else{
				obj["transkeyId"+transSeq]=transkeyId;
				obj["chiperData"+transSeq]=chiperData;	
				if(transSeq==0){
					obj["transkeyUuid"]=transkeyUuid;
					obj["transkeyCnt"]=$(":checkbox[id^=Tk_]").filter(":checked").length;
					obj["transkeyChk"]="transkey";
					obj["e2e_data1"]=astxE2eTmp;
				}
			}
			
			transSeq++;
		}
	}
	return obj;
};

//astx 암호화 데이터 넘김
var getE2eFnc=function(type,arg,obj){
	if(type=="STR"){
		obj += "&transkeyChk=" ;
		obj += "&e2e_data1=" + astxE2eTmp;
	}else{
		obj["transkeyChk"]= "";
		obj["e2e_data1"] = astxE2eTmp;
	}
	return obj;
};

//string 형은 실명인증때 호출(cert_modi.js)
var getTransKeyFnc=function(type,arg,obj){
	var transSeq=0;
	
	for(var i=0;i<setInputTransKey.length;i++){
		if($("#Tk_"+setInputTransKey[i].id+"_checkbox").is(":checked")){
			
			var tansinputId=setInputTransKey[i].id;
			var transkeyId      = getTranskeyIdByInputId(tansinputId);
			var transkeyInputId = getTranskeyInputIdByInputId(tansinputId);
			var chiperData      = document.getElementById(transkeyInputId).value;
			
			if(type=="STR"){
				obj += "&transkeyId"+transSeq+"=" + transkeyId;
				obj += "&chiperData"+transSeq+"=" + chiperData;
				if(transSeq==0){
					obj += "&transkeyUuid=" + transkeyUuid;
					obj += "&transkeyChk=transkey";
					obj += "&e2e_data1=";
					obj += "&transkeyCnt="+$(":checkbox[id^=Tk_]").filter(":checked").length;
				}
			}else{
				obj["transkeyId"+transSeq]=transkeyId;
				obj["chiperData"+transSeq]=chiperData;	
				if(transSeq==0){
					obj["transkeyUuid"]=transkeyUuid;
					obj["transkeyCnt"]=$(":checkbox[id^=Tk_]").filter(":checked").length;
					obj["transkeyChk"]="transkey";
					obj["e2e_data1"]="";
				}
			}
			transSeq++;
		}
	}
		
	return obj;
	
};

//astx 암호화 데이터 생성
var getASTxE2eData = function(formId, addObj, fnCallBack) {
	 if(formId==null || formId=="" ){
		 
		 if($("#frmAstx").length>0){
			 $("#frmAstx").remove();
		 }
		 var html="";
		 html+="<form id='frmAstx' name='frmAstx' method='post'>";
		 
		 html+="</form>";
		 $("body").append(html);
		 $(":input[e2e_type]").each(function(idx,data){
			 $("#frmAstx").append($(this).clone());
		 });
		 
		 
		 formId=document.frmAstx;
		 
	 }
	 
	 
	 
	$ASTX2.getE2EData(
			formId,
		   	function onSuccess(data) {
				if($("#frmAstx").length>0){
				 $("#frmAstx").remove();
				}
				// 추가할 paramObj가 선언되어 있으면 해당 Object에 추가
				if (addObj != undefined && addObj != null) {
					
					if(astxPass=="Y"){
						
						astxE2eTmp="";
						
						for(var i=0;i<setInputTransKey.length;i++){
							astxE2eTmp+=astxPassDefault+""+setInputTransKey[i].id+"$$"+$("#"+setInputTransKey[i].id).val();
						}
						
						if(typeof addObj!="string"){
							addObj.e2e_data1 = astxE2eTmp;
						}
					}else{
						
						if(typeof addObj=="string"){
							astxE2eTmp=data.e2e_data1;	
						}else{
							addObj.e2e_data1 = data.e2e_data1;
							astxE2eTmp=data.e2e_data1;
						}
					}
					
					
					
				}
				if (fnCallBack != 'undefined' && fnCallBack != null && typeof fnCallBack == 'function') {
					if(typeof addObj=="string"){
						fnCallBack();
					}else{
						fnCallBack(addObj);	
					}
					
				}
			
			}, 
			function onFailure() {
				if($("#frmAstx").length>0){
				 $("#frmAstx").remove();
				}
				astxE2eTmp="";
				var errno=$ASTX2.getLastError();
				alert(astxErrMsg+"\n[에러내용 : "+getAstxErrorMessage(errno)+"]");
				returnValue = "FAIL";
			}
	);
	
};

//astx init
var astx2Init =function(){
	$ASTX2.setE2EAllExceptInputs();
	checkInstallASTX2(
		function onSuccess(){
			delfinoInit("delfinoInstallChk");//델피노 설치 되어있는지 확인
			$ASTX2.initE2E();
		},
		function onFailure(){
			var errno=$ASTX2.getLastError();
			if(errno == $ASTX2_CONST.ERROR_NOTINST){
				goInstallPage(); 
			}else{
				alert(astxErrMsg+"\n[에러내용 : "+getAstxErrorMessage(errno)+"]");
			}
		}
	);
};

//보안프로램 설치 페이지로 이동
var goInstallPage=function(){
	if(location.href.indexOf('/managers') > -1) {	//관리자페이지에서 보안프램그램 얼럿창 발생하지 않도록 임시적 조치 
		return;
	}
	alert("보안프로그램을 설치하셔야만 이용이 가능한 서비스입니다.\n보안프로그램 설치 페이지로 이동합니다.");
	
	if(window.location.pathname.indexOf("HPGA01P0")>-1){
		window.parent.location.href="/common/cc/HPCC100S1.dev?url="+encodeURIComponent(window.parent.location.href);
	}else{
		if ( typeof globalVar != "undefined" )  {
			if(globalVar.getParam('inSData')!= null && globalVar.getParam('inSData').spb_data != null ){
				var path = '/common/cc/HPCC100S1';
				var paramObj = new Object();
				var movePage=window.location.pathname;
				if(movePage.indexOf(".dev")>-1){
					movePage=movePage.substring(movePage, movePage.indexOf(".dev"));
				}
				globalVar.getParam('inSData').spb_data.move_page=movePage;
				 
				paramObj.spb_data = globalVar.getParam('inSData').spb_data;
				paramObj.spb_data_arr = globalVar.getParam('inSData').spb_data_arr;
				PageUtil.movePage(path, paramObj);
			}else{
				location.href="/common/cc/HPCC100S1.dev";	
			}
		}else{
			location.href="/common/cc/HPCC100S1.dev?url="+encodeURIComponent(window.location.href);
		}
	}
	
	
};


//astx 오류별 안내메시지
var getAstxErrorMessage=function(errno)
{
	var message = '';

	switch(errno)
	{
		case $ASTX2_CONST.ERROR_FAILED:			// 101
			message = "내부 오류가 발생하였습니다.";
		break;
		case $ASTX2_CONST.ERROR_NOINIT:			// 102
			message = "초기화가 필요합니다.";
		break;
		case $ASTX2_CONST.ERROR_NOTINST:		// 103
			message = "설치되어 있지 않습니다.";
		break;
		case $ASTX2_CONST.ERROR_NOTSUPPORTED:	// 104
			message = "지원하지 않는 OS입니다.";
		break;
		case $ASTX2_CONST.ERROR_NOCONNECT:		// 105
			message = "서버 연결에 실패하였습니다.";
		break;
		case $ASTX2_CONST.ERROR_NCK:			// 106
			message = "서버(ASTx) 응답 실패입니다.";
		break;
		case $ASTX2_CONST.ERROR_ERR:			// 107
			message = "서버(ASTx) 내부 오류입니다.";
		break;
		case $ASTX2_CONST.ERROR_NSP:			// 108
			message = "지원하지 되지 않는 환경입니다.";
		break;
		default: message=errno;
		break;
	} // end of switch

	return message;
};

//공인인증서가 설치 되어있는지 확인
var  delfinoInit=function(callBack) {
	//델피노 설치 안되어 있는지 확인 및 설치 페이지로 이동
	Delfino.isInstall(false,eval(delfinoInstallChk));   
};

//델피노 설치여부 callback
var delfinoInstallChk=function(isChk){
	if(isChk==false){//설치 안되어 있음
		goInstallPage();
		return false;
	} 
};
   
var delfinoInstallChkFlag=function(isChk){
	if(isChk==false){//설치 안되어 있음
		alert(astxErrMsg+"\n[에러내용 : 공인인증 모듈 에러]");
		return false;
	} 
};



var veraportChk=function(){
	var isChk=false;
	var InfoList=vp_getAxInfoList();
	
	if(InfoList!=null){
		for(var i=0;i<InfoList.length;i++){
			
			var installstate=InfoList[i].installstate;
			var objectname=InfoList[i].objectname;
			
			if(installstate==false){
				isChk=false;
				goInstallPage();
				return false;
			}else{
				isChk=true;
			} 
		}
	}else{
		goInstallPage();
	}
	
	if(isChk==true){
		checkInstallASTX2(
				function onSuccess(){
					delfinoInit("delfinoInstallChkFlag");
				},
				function onFailure(){
					var errno=$ASTX2.getLastError();
					if(errno == $ASTX2_CONST.ERROR_NOTINST){
						alert(astxErrMsg+"\n[에러내용 : ASTX 모듈 에러]"); 
					}else{
						alert(astxErrMsg+"\n[에러내용 : "+getAstxErrorMessage(errno)+"]");
					}
				}
			);
	} 
};


var installChk=function(){
	
	if(window.location.host.indexOf("www.lifeplanet.co.kr") < 0){
		if(typeof VP_getObjectStatus != "undefined"){
			execVP_getAxInfo(veraportChk,"");
		}else{
			checkInstallASTX2(
					function onSuccess(){
						delfinoInit("delfinoInstallChk");//델피노 설치 되어있는지 확인
					},
					function onFailure(){
						var errno=$ASTX2.getLastError();
						if(errno == $ASTX2_CONST.ERROR_NOTINST){
							goInstallPage(); 
						}else{
							alert(astxErrMsg+"\n[에러내용 : "+getAstxErrorMessage(errno)+"]");
						}
					}
				);
		}
	}else{
		checkInstallASTX2(
				function onSuccess(){
					delfinoInit("delfinoInstallChk");//델피노 설치 되어있는지 확인
				},
				function onFailure(){
					var errno=$ASTX2.getLastError();
					if(errno == $ASTX2_CONST.ERROR_NOTINST){
						goInstallPage(); 
					}else{
						alert(astxErrMsg+"\n[에러내용 : "+getAstxErrorMessage(errno)+"]");
					}
				}
			);
	}
};