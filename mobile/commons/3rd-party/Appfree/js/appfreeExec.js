var callbackfn = '';
var cancel_callbackFn = '';
function appfreeExec(section, isAutoIndex, signSourceData, _callbackfn, _cancel_callbackFn) {
	
	callbackfn = _callbackfn;
	cancel_callbackFn = _cancel_callbackFn;

	var agent = getSmartPhoneAgentKind();
	
	if (agent == AGENT_ANDROID || agent == AGENT_IPHONE) {

		if (gCheckInterval != null) {
			clearInterval(gCheckInterval);
			gCheckInterval = null;
		}

		if(signSourceData == "") {
			signSourceData = section;
		}
		
		gRequestCount = 0;
		gAppCheckCount = 0;
		gSection = section;
		gPlainText = signSourceData;
		g_auto_index = isAutoIndex;
		
		authAjaxExecSync();
		
	} else {
		alert("스마트폰에서만 지원됩니다");
	}
	return false;
}

function callback() {
	
	var version = getSmartPhoneIosVersion();
	var agent = getSmartPhoneAgentKind();
	
	var tempArr = arguments[0];
	arguments = tempArr;
	
	//checkFirewall(0);
	appCheckCallback();
	
	if(gCheckInterval != null) {
		clearTimeout(gCheckInterval);
		gCheckInterval = null;
	}
	
	if (agent == AGENT_IPHONE) {
		
		if (gFocusInterval != null) {
			window.clearInterval(gFocusInterval);
			gFocusInterval = null;
		}
		
		if(version <= 5) {
			sleep(2000);
		}
		window.focus();
	}
	
	if(arguments.length == 2)
		g_auto_index = arguments[1];
	else if(arguments.length == 3)
		g_auto_index = arguments[2];
	
	if (callbackfn != '') {
		callbackfn(arguments[0], arguments[1]);
	}
	
//	autoIndex = encodeURIComponent(g_auto_index);
//	if (gFormId !== "") {
//		formName = document.getElementById(gFormId);
//		if (formName !== null) {
//			formName.signed_msg.value = decodeURI(arguments[0]);
//			formName.vid_msg.value = decodeURI(arguments[1]);

	//		if(formName.signed_msg.value != "")
	//			formName.submit();
			
//		}
//	}
}

function cancel_callback() {
	
	var version = getSmartPhoneIosVersion();
	var agent = getSmartPhoneAgentKind();
	
	appCheckCallback();	//2013.08.21 추가
	
	if(gCheckInterval != null) {
		clearTimeout(gCheckInterval);
		gCheckInterval = null;
	}
	
	if (agent == AGENT_IPHONE) {
		
		if (gFocusInterval != null) {
			window.clearInterval(gFocusInterval);
			gFocusInterval = null;
		}
		
		if(version <= 5) {
			sleep(2000);
		}
		window.focus();
	}
	
	/*여기 밑으로 소스 적용*/
	
	if (cancel_callbackFn != '') {
		cancel_callbackFn(arguments[0], arguments[1]);
	}
}


