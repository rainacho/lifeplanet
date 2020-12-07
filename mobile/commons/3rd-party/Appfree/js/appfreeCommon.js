var AGENT_ANDROID = "android";
var AGENT_IPHONE = "iphone";
var AGENT_WINDOWS = "Windows";
var AGENT_ETC = "etc";

var gSignMsg = "";
var g_auto_index;

var PARAM_1_NAME = "\x72\x65\x71\x5f\x69\x64";
var PARAM_2_NAME = "\x6d\x73\x67";
var PARAM_3_NAME = "\x73\x65\x72\x76\x65\x72\x5f\x63\x65\x72\x74";
var PARAM_4_NAME = "\x72\x65\x66\x5f\x6e\x75\x6d";
var PARAM_5_NAME = "\x61\x75\x74\x68\x5f\x63\x6f\x64\x65";
var PARAM_6_NAME = "\x63\x61";

var RETURN_ENCODING_NAME = "return_encoding";
//var RETURN_ENCODING = "base64"; 
//var RETURN_ENCODING = "hex_upper";
var RETURN_ENCODING = "hex_lower";


/*자동서명시 사용자가 입력 혹은 선택한 내용에 대한 확인을 위하여 사용자 뷰어용 html문 입력
사이트에서 전달 받은 html문을 autoHtml 전역변수에 담아 callbackSign에서 넘겨 준다.
(사용자 직접 수정 사항).*/
//autoHtml의 내용은 ' <--은 escape처리를 하거나 " <-- 으로 (오류가 발생)

//var autoHtml = "";

var autoHtml = encodeURIComponent('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'
	+ '<html>'
	+ '<head>'
	+ '<title> New Document </title>'
	+ '<meta charset="utf-8">'
	+ '</head>'
	+ '<body>'
	+ '<div class="sellPanel dealConfirm" style="color:#333;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">'
	+ '<table border="1" width="100%" style="margin-top: 8px;border: 0;border-top: 2px solid #E3EBF3;border-collapse: collapse;display: table;" summary="매도 주문 확인에 대한 계좌번호, 종목정보, 수량, 단가 등의 정보를 제공합니다.">'
	+ '<caption style="display:none;">매도 주문 확인</caption>'
	+ '<tbody>'
	+ '<tr>'
	+ '<th scope="colGroup" class="title" colspan="2" style="color: #003AD6;font-weight: bold;background:#F7FAFD;border:0;border-bottom: 1px solid #E3EBF3;padding: 2px 5px;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">매도</th>'
	+ '</tr>'
	+ '<tr>'
	+ '<th scope="row" style="background: #F7FAFD;border: 0;border-bottom:1px solid #E3EBF3;font-weight: normal;padding: 2px 5px;color: #333;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">계좌번호</th>'
	+ '<td style="border: 0;border-bottom:1px solid #E3EBF3;border-left:1px solid #E3EBF3;text-align: left;padding: 2px 5px;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px;  ">003-11-824106 위탁(SCMA)</td>'
	+ '</tr>'
	+ '<tr>'
	+ '<th scope="row" style="background: #F7FAFD;border: 0;border-bottom:1px solid #E3EBF3;font-weight: normal;padding: 2px 5px;color: #333;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">종목명</th>'
	+ '<td style="border: 0;border-bottom:1px solid #E3EBF3;border-left:1px solid #E3EBF3;text-align: left;padding: 2px 5px;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px;  ">삼성전자</td>'
	+ '</tr>'
	+ '<tr>'
	+ '<th scope="row" style="background: #F7FAFD;border: 0;border-bottom:1px solid #E3EBF3;font-weight: normal;padding: 2px 5px;color: #333;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">매매구분</th>'
	+ '<td style="border: 0;border-bottom:1px solid #E3EBF3;border-left:1px solid #E3EBF3;text-align: left;padding: 2px 5px;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px;  ">지정가</td>'
	+ '</tr>'
	+ '<tr>'
	+ '<th scope="row" style="background: #F7FAFD;border: 0;border-bottom:1px solid #E3EBF3;font-weight: normal;padding: 2px 5px;color: #333;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">체결조건</th>'
	+ '<td style="border: 0;border-bottom:1px solid #E3EBF3;border-left:1px solid #E3EBF3;text-align: left;padding: 2px 5px;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px;  ">없음</td>'
	+ '</tr>'
	+ '<tr>'
	+ '<th scope="row" style="background: #F7FAFD;border: 0;border-bottom:1px solid #E3EBF3;font-weight: normal;padding: 2px 5px;color: #333;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">매도수량</th>'
	+ '<td style="border: 0;border-bottom:1px solid #E3EBF3;border-left:1px solid #E3EBF3;text-align: left;padding: 2px 5px;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px;  ">111 주(계약)</td>'
	+ '</tr>'
	+ '<tr>'
	+ '<th scope="row" style="background: #F7FAFD;border: 0;border-bottom:1px solid #E3EBF3;font-weight: normal;padding: 2px 5px;color: #333;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px; ">매도단가</th>'
	+ '<td style="border: 0;border-bottom:1px solid #E3EBF3;border-left:1px solid #E3EBF3;text-align: left;padding: 2px 5px;line-height: 18px;font-family:dotum, sans-serif;font-size: 12px;  ">11원</td>'
	+ '</tr>'
	+ '</tbody>'
	+ '</table>'
	+ '<div class="confirm_btn" style="float:right;">'
	+ '</div>'
	+ '<div class="comment" style="clear: both;background:#F9F7F5;padding: 5px 3px 3px 8px;color:#333">'
	+ '<ul style="list-style: none;margin: 0;padding: 0;">'
	+ '<li>주문 전송 후 반드시 주문 및 체결 여부를 확인해주십시오.</li>'
	+ '<li>주문 및 체결 여부의 확인 소홀로 인하여 발생한 사항에 대해서 당사는 책임지지 않습니다.</li>'
	+ '</ul>'
	+ '</div>'
	+ '</div>'
	+ '</body>'
	+ '</html>');

var issuerList= "";
var oidList= "";

/*
var issuerList="CN=CrossCert Certificate Authority,OU=AccreditedCA,O=CrossCert,C=KR|"
					  +"CN=signGATE CA4,OU=AccreditedCA,O=KICA,C=KR|"
					  +"CN=CrossCertCA2,OU=AccreditedCA,O=CrossCert,C=KR|"
					  +"CN=SignKorea CA,OU=AccreditedCA,O=SignKorea,C=KR|"
					  +"CN=TradeSignCA,OU=AccreditedCA,O=TradeSign,C=KR|"
					  +"CN=NCASignCA,OU=AccreditedCA,O=NCASign,C=KR|"
					  +"CN=yessignCA Class 1,OU=AccreditedCA,O=yessign,C=kr|"
					  +"CN=signGATE CA2,OU=AccreditedCA,O=KICA,C=KR|"
					  +"CN=TradeSignCA2,OU=AccreditedCA,O=TradeSign,C=KR|"
					  +"CN=yessignCA,OU=AccreditedCA,O=yessign,C=kr|"
					  +"CN=SignKorea CA2,OU=AccreditedCA,O=SignKorea,C=KR|"
					  +"CN=signGATE CA,OU=AccreditedCA,O=KICA,C=KR|"
					  +"CN=CrossCertCA,OU=AccreditedCA,O=CrossCert,C=KR|";

var oidList="1.2.410.200005.1.1.1|"
			+"1.2.410.200005.1.1.5|"
			+"1.2.410.200005.1.1.6.2|"
			+"1.2.410.200004.5.2.1.2|"
			+"1.2.410.200005.1.1.4|"
			+"1.2.410.200004.5.2.1.1|"
			+"1.2.410.200004.5.2.1.7.3|"
			+"1.2.410.200004.5.2.1.7.1|"
			+"1.2.410.200004.5.1.1.5|"
			+"1.2.410.200004.5.1.1.7|"
			+"1.2.410.200004.5.1.1.9.2|"
			+"1.2.410.200004.5.3.1.9|"
			+"1.2.410.200004.5.3.1.2|"
			+"1.2.410.200004.5.4.1.1|"
			+"1.2.410.200004.5.4.1.2|"
			+"1.2.410.200004.5.4.1.103|"
			+"1.2.410.200012.1.1.1|"
			+"1.2.410.200012.1.1.3|"
			+"1.2.410.200012.1.1.105|";
*/
//------------------------------------------

var CANCEL_CALLBACK_METHOD = "cancel_callback_method";
var CALLBACK_METHOD = "callback_method";
var CALLBACK_CERTIFICATE = "callback_cert";
var CALLBACK_SIGN = "callback";
var CALLBACK_CANCEL = "cancel_callback";
var CHROME_PROTOCOL = "chrome_protocol";
var BROWSER_PROTOCOL = "browser_protocol";

var CHROME_JSESSION = "chrome_jsession";

var CHROME_SERVER = "chrome_server_url";
var SIGN_RELAY_SERVER = "sign_relay_server_url";
var CHROME_SERVER_URL = window.location.protocol+"//"+window.location.host+"/";

//싸이트에서 맞게 설정 가능(사용하지 않으면 기본으로 동작)
var CHROME_SERVER_TAIL = "chrome_server_tail_url";
var SIGN_RELAY_SERVER_TAIL = "sign_relay_server_tail_url";
var CHROME_SERVER_TAIL_URL = "appfreesign.do";

//-----------------------------------------------------------------------------
var AUTH_URL = window.location.protocol+"//"+window.location.host+"/commons/3rd-party/Appfree/jsp/af_auth.jsp";
var BRIDGE_URL = window.location.protocol+"//"+window.location.host+"/commons/3rd-party/Appfree/jsp/af_bridge.jsp";
//-----------------------------------------------------------------------------


var IS_CLUSTERING = "is_clustering";
var CLUSTERING_FLAGS = "yes";
var VIEW_FLAGS = "no"
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

var BROWSER_APP_NAME_LIST = ["NAVER", "DaumApp"];
var BROWSER_APP_SCHEME_LIST = ["naversearchapp://search?version=1", "daumapps://open"];
//var BROWSER_APP_NAME_LIST = ["NAVER"];
//var BROWSER_APP_SCHEME_LIST = ["naversearchapp://search?version=1"];

//-----------------------------------------------------------------------------

var gAppCheckCount = 0;
var gRequestCount = 0;
var gCheckInterval = null;
var gCheckTimeout = null;
var gFocusInterval = null;
var gChromeAppCheckInterval = null;

var gFormId = null;
var gSection = null;
var gPlainText  = null;

var jSessionId = null;

//기기 고유값 사용여부 설정
var gUseDeviceId = "no";


var PASS_PAGE = "pass_page";


var SIGN_FILE = "sign_file";


//-----------------------------------------------------------------------------
var SIGNING_TIMESTAMP_FLAG = "yes"
var SIGNING_TIMESTAMP = "signing_timestamp";
//-----------------------------------------------------------------------------

function sleep(milliseconds) {
	var start = new Date().getTime();
	for ( var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function init(formId) {

	if (formId === null || typeof formId !== 'string' || typeof formId === 'undefined') {
		formId = "";
	} else {
		gFormId = formId;
	}

	if (document.getElementById('\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65') == null) {
		var obj = document.createElement('\x69\x66\x72\x61\x6d\x65'), 
		att1 = document.createAttribute('\x69\x64'), 
		att2 = document.createAttribute('\x73\x72\x63'), 
		att3 = document.createAttribute('\x77\x69\x64\x74\x68'), 
		att4 = document.createAttribute('\x68\x65\x69\x67\x68\x74'),
		att5 = document.createAttribute('\x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72');

		att1.value = '\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65';
		att2.value = '';
		att3.value = '\x30';
		att4.value = '\x30';
		att5.value = '\x30';


		obj.setAttributeNode(att1);
		obj.setAttributeNode(att2);
		obj.setAttributeNode(att3);
		obj.setAttributeNode(att4);
		obj.setAttributeNode(att5);

		obj.style.diplay = 'none';
		obj.style.width = "0px";
		obj.style.height = "0px";
		obj.style.position = 'absolute';

		document.body.appendChild(obj);
	}
}

function getXMLHttp() {

	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		var xmlhttps = new Array("MSXML2.XMLHttp.7.0", "MSXML2.XMLhttp.6.0",
								"MSXML2.XMLhttp.5.0", "MSXML2.XMLhttp.4.0",
								"MSXML2.XMLhttp.3.0", "MSXML2.XMLhttp", "Microsoft.XMLHttp");
		for ( var i = 0; i < xmlhttps.length; i++) {
			try {
				var req = new ActiveXObject(xmlhttps[i]);
				return req;
			} catch (e) {
			}
		}
	}
}

function closeForIphone() {
	
	if(typeof popup != "undefined") {
		var interval = null;
		interval = setInterval(function(){try{window.focus(); popup.window.close();}catch(e){if(interval != null){clearInterval(interval);}}}, 1000);
	}
}

function goAppfreeInstallPage(){
	var agent = getSmartPhoneAgentKind();
	if (agent == AGENT_ANDROID) {
		document.location = "market://details?id=com.lumensoft.touchenappfree";
	} else if (agent == AGENT_IPHONE) {
		document.location = "http://itunes.apple.com/us/app/aebpeuli-touchen-appfree/id506292960?mt=8";
	}
	
}

function checkApp() {

	var agent = getSmartPhoneAgentKind();
	var version = getSmartPhoneIosVersion();
	
	if (gAppCheckCount == 7) {

		if (confirm("공인인증 모듈이 설치되어 있지 않습니다. 설치를 위해 설치페이지로 이동하시겠습니까?")) {
			goAppfreeInstallPage();
		} else {
			try{
				if(version != 8)
					cw();

				if(navigator.userAgent.indexOf("\x69\x50\x68\x6f\x6e\x65") != -1 && version >= 6) {
					opener.window.closeForIphone();
				}
			} catch(e) {};
		}
		
		return;
	}

	if (gAppCheckCount != 10) {
		gCheckTimeout = setTimeout(function() {
			if (agent == AGENT_IPHONE) {
				self.focus();
			}
			gAppCheckCount++;
			checkApp();
		}, 450);
	}
}

function appCheckCallback() {

	gAppCheckCount = 10;
	if (gCheckTimeout != null) {
		clearTimeout(gCheckTimeout);
	}
}

function checkAppIphone(obj) {

	setTimeout(function() {
		checkStop(obj);
	}, 3000);
}

function checkStop(obj) {

	if ((+new Date - obj - 3000) > 800) {
		appCheckCallback();
		try{
			cw();
		} catch(e) {};
	}
}

function checkAppAndroid() {
	if (document.getElementById('\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65')['\x63\x6f\x6e\x74\x65\x6e\x74\x44\x6f\x63\x75\x6d\x65\x6e\x74'] != null) {
		appCheckCallback();
	}
}

function post_to_url(path, params, method) {
	method = method || "\x70\x6f\x73\x74";
	var form = document.createElement("\x66\x6f\x72\x6d");
	form.setAttribute("\x6d\x65\x74\x68\x6f\x64", method);
	form.setAttribute("\x61\x63\x74\x69\x6f\x6e", path);

	for ( var key in params) {
		var hiddenField = document.createElement("\x69\x6e\x70\x75\x74");
		hiddenField.setAttribute("\x74\x79\x70\x65", "\x68\x69\x64\x64\x65\x6e");
		hiddenField.setAttribute("\x6e\x61\x6d\x65", key);
		hiddenField.setAttribute("\x76\x61\x6c\x75\x65", params[key]);
		form.appendChild(hiddenField);
		form.setAttribute("\x74\x61\x72\x67\x65\x74", "\x5f\x62\x6c\x61\x6e\x6b");
	}
	document.body.appendChild(form);
	form.submit();
	
}

function callbackSign(message, info) {
	var agent = navigator.userAgent;
	var cu = null;
	var agent = getSmartPhoneAgentKind();
	var version = getSmartPhoneIosVersion();
	var siteCodeType = "";

	if(info.indexOf("JSESSIONID")==-1){
		siteCodeType = info.substr(2, 1);
	}
	else{
		var jSessionId = null;
		var infoArr1 = new Array();
		infoArr1 = info.split("--");
		jSessionId = infoArr1[0];
		info = infoArr1[1];
		siteCodeType = info.substr(2,1);
	}
		
	var d = new Date();
	var n = d.getTime();
	
	eval(CALLBACK_SIGN + n + "= function() {" + CALLBACK_SIGN + "(arguments);" + CALLBACK_SIGN  + n +"=null;};");
	eval(CALLBACK_CANCEL + n + "= function() {" + CALLBACK_CANCEL + "(arguments);" + CALLBACK_CANCEL  + n +"=null;};");

	var requestUrls = "\x68\x74\x74\x70\x3a\x2f\x2f\x31\x32\x37\x2e\x30\x2e\x30\x2e\x31\x3a\x37\x30\x37\x30\x2f\x73\x69\x67\x6e\x2e\x68\x74\x6d\x6c\x3f" + n;
	if(agent == AGENT_ANDROID && (siteCodeType == "S" || siteCodeType == "W")){	
		gChromeAppCheckInterval = window.setInterval(function() {callCheckAppChrome(requestUrls);}, 500);
	}
	if (agent == AGENT_ANDROID || agent == AGENT_IPHONE) {
		
		cu = '\x61\x70\x70\x66\x72\x65\x65\x3a\x2f\x2f\x77\x77\x77\x2e\x6c\x75\x6d\x65\x6e\x73\x6f\x66\x74\x2e\x63\x6f\x6d\x2f\x3f';

		if(agent == AGENT_ANDROID && checkSupportChrome() || agent == AGENT_ANDROID && checkSupportBrowserApp()) {
			cu = '\x77\x77\x77\x2e\x6c\x75\x6d\x65\x6e\x73\x6f\x66\x74\x2e\x63\x6f\x6d\x2f\x3f';
		}

		cu = 	cu + CALLBACK_METHOD + '\x3d' + CALLBACK_SIGN  + n +'\x26' 
				+ PARAM_1_NAME + '\x3d' + info + '\x26'
				+ PARAM_2_NAME + '\x3d' + message + '\x26'
				+ RETURN_ENCODING_NAME + '\x3d' + RETURN_ENCODING + '\x26'
				+ CANCEL_CALLBACK_METHOD + '\x3d' + CALLBACK_CANCEL + n + '\x26'
				+ 'auto_index' + '\x3d' + g_auto_index + '\x26'
				+ 'auto_html' + '\x3d' + autoHtml + '\x26'
				+ 'view_plaintext' + '\x3d' + VIEW_FLAGS + '\x26'
				+ 'issuer' + '\x3d' + issuerList +'\x26'
				+ 'oid' + '\x3d' + oidList;
/*
		if(SIGNING_TIMESTAMP_FLAG == "yes") {
			cu= cu + '\x26' + SIGNING_TIMESTAMP + "\x3d" + "1439162708";	
		}

		if(g_auto_index != "" && g_auto_index != "start") {
			cu= cu + '\x26' + "reuse_index" + "\x3d" + g_auto_index;	
		}

	if (agent == AGENT_ANDROID) {
		gUseDeviceId = "yes";
		cu = cu + '\x26' + 'device_id' + '\x3d' + 'serialno_androidid_imei_imsi_simserialno_phoneno_wifimac';
	} else {
		gUseDeviceId = "yes";
		cu = cu + '\x26' + 'device_id' + '\x3d' + 'uuid_wifimac';
	}

	*/
		if(gSection.indexOf("vid1") != -1 || gSection.indexOf("vid2") != -1 || gSection.indexOf("signfilewithvid1") != -1 || gSection.indexOf("signfilewithvid2") != -1)
			cu = cu + '\x26' + PARAM_3_NAME + '\x3d' + encodeURIComponent(lifeplanetVid) + '\x26' + "idn=" + "";

		if(agent == AGENT_IPHONE) {

			 if(version < 9) {
				if(checkSupportChrome()) {
						cu = cu + '\x26' + CHROME_PROTOCOL + '\x3d' + encodeURIComponent("googlechrome://" + location.protocol + "://");
				} else if(checkSupportBrowserApp()) {
						cu = cu + '\x26' + BROWSER_PROTOCOL + '\x3d' + encodeURIComponent(getBrowserAppScheme());
				}
             } else {
					if(siteCodeType != "W") {
						if(checkSupportChrome()) {
							cu = cu + '\x26' + CHROME_PROTOCOL + '\x3d' + encodeURIComponent("googlechrome://" + location.protocol + "://");
						} else if(checkSupportBrowserApp()) {
							cu = cu + '\x26' + BROWSER_PROTOCOL + '\x3d' + encodeURIComponent(getBrowserAppScheme());
						}
							cu = cu + '\x26' + SIGN_RELAY_SERVER + '\x3d' + encodeURIComponent(CHROME_SERVER_URL);
							cu = cu + '\x26' + SIGN_RELAY_SERVER_TAIL + '\x3d' + CHROME_SERVER_TAIL_URL
							
							if(jSessionId != null)
									cu = cu + '\x26' + CHROME_JSESSION + '\x3d' + jSessionId + '\x26' + IS_CLUSTERING + '\x3d' + CLUSTERING_FLAGS;
			
					}
			}
	

		} else {
			if(checkSupportChrome()) {
				if(location.protocol == "https:" ) {
					cu = cu + '\x26' + CHROME_PROTOCOL + '\x3d' + encodeURIComponent("googlechrome://" + location.protocol + "://");
					cu = cu + '\x26' + CHROME_SERVER + '\x3d' + encodeURIComponent(CHROME_SERVER_URL);

					cu = cu + '\x26' + CHROME_SERVER_TAIL + '\x3d' + CHROME_SERVER_TAIL_URL
						
					if(jSessionId != null)
						cu = cu + '\x26' + CHROME_JSESSION + '\x3d' + jSessionId + '\x26' + IS_CLUSTERING + '\x3d' + CLUSTERING_FLAGS;
				}	
			}
		}

		if (agent == AGENT_IPHONE) {

                        if (version == 4 || checkSupportChrome() || siteCodeType == "W" ||  (siteCodeType == "S" && version < 9) || checkSupportBrowserApp()) {
								checkApp();
                                window.document.getElementById('\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65')['\x6f\x6e\x6c\x6f\x61\x64'] = checkAppIphone(+new Date());
                                window.document.getElementById('\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65')['\x73\x72\x63'] = cu;
                        } else if(version == 5){
                                post_to_url(BRIDGE_URL, {"\x53\x45\x52\x49\x45\x53" : "\x73\x69\x67\x6e", "\x43\x41\x4c\x4c\x5f\x55\x52\x4c" : cu}, "\x70\x6f\x73\x74");
                        } else if((version > 5 && version < 9) && (siteCodeType != "W" && siteCodeType != "S")) {

                                if(navigator.userAgent.indexOf("\x69\x50\x61\x64") != -1) {
                                        popup = window.open(BRIDGE_URL);
                                } else {

                                        if(version == 6)
                                                popup = window.open(BRIDGE_URL, "\x61\x70\x70\x66\x72\x65\x65", "", false);
                                }

                                popup = window.open(BRIDGE_URL + "\x3f\x53\x45\x52\x49\x45\x53\x3d\x62\x72\x69\x64\x67\x65", "\x61\x70\x70\x66\x72\x65\x65", "", false);
                                setTimeout(function(){window.focus();}, 1000);

                                var obj = document.createElement('\x69\x66\x72\x61\x6d\x65'),
                                att1 = document.createAttribute('\x69\x64'),
                                att2 = document.createAttribute('\x73\x72\x63'),
                                att3 = document.createAttribute('\x77\x69\x64\x74\x68'),
                                att4 = document.createAttribute('\x68\x65\x69\x67\x68\x74'),
                                att5 = document.createAttribute('\x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72');

                                att1.value = '\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65';
                                att2.value = '';
                                att3.value = '\x30';
                                att4.value = '\x30';
                                att5.value = '\x30';

                                obj.setAttributeNode(att1);
                                obj.setAttributeNode(att2);
                                obj.setAttributeNode(att3);
                                obj.setAttributeNode(att4);
                                obj.setAttributeNode(att5);

                                obj.style.diplay = 'none';
                                obj.style.width = "0px";
                                obj.style.height = "0px";
                                obj.style.position = 'absolute';

                                popup.document.body.appendChild(obj);
                                popup.document.getElementById('\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65').onload = checkAppIphone(+new Date());

                                if(navigator.userAgent.indexOf("\x69\x50\x68\x6f\x6e\x65") != -1 && version == 7) { 
                                        window.open(BRIDGE_URL);
                                        popup.focus();
								}							
                              
                                popup.document.getElementById('\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65').src=cu;

                                if(navigator.userAgent.indexOf("\x69\x50\x68\x6f\x6e\x65") != -1 && version == 6) {
                                        if(popup.window.confirm("앱프리를 실행합니다.")) {
                                        } else {
                                                popup.window.location.href=BRIDGE_URL;
                                                popup.opener.focus();
                                                return;
                                        }
                                }

                        } else if(version >= 9) {

				if(siteCodeType == "S") {
					window.location = cu;
				} else if(siteCodeType != "W") {
					post_to_url(BRIDGE_URL, {"\x53\x45\x52\x49\x45\x53" : "\x63\x61\x6c\x6c\x53\x63\x68\x65\x6d\x65\x46\x6f\x72\x69\x6f\x73\x39\x4d\x6f\x72\x65", "\x43\x41\x4c\x4c\x5f\x55\x52\x4c" : cu}, "\x70\x6f\x73\x74");
				}
			} 

			
		} else if (agent == AGENT_ANDROID) {

			if(checkSupportChrome() || checkSupportBrowserApp()) {
				window.location.href="\x69\x6e\x74\x65\x6e\x74\x3a\x2f\x2f" + cu + "\x23\x49\x6e\x74\x65\x6e\x74\x3b\x73\x63\x68\x65\x6d\x65\x3d\x61\x70\x70\x66\x72\x65\x65\x3b\x70\x61\x63\x6b\x61\x67\x65\x3d\x63\x6f\x6d\x2e\x6c\x75\x6d\x65\x6e\x73\x6f\x66\x74\x2e\x74\x6f\x75\x63\x68\x65\x6e\x61\x70\x70\x66\x72\x65\x65\x3b\x65\x6e\x64";
			} else {
				window.document.getElementById('\x64\x75\x6d\x6d\x79\x69\x66\x72\x61\x6d\x65')['\x73\x72\x63'] = cu;
				if (siteCodeType != "W" && siteCodeType != "S") {
					setTimeout("\x63\x68\x65\x63\x6b\x41\x70\x70\x41\x6e\x64\x72\x6f\x69\x64\x28\x29", 100);
				}
			}
		
		}	

		var signRequestUrl = "\x68\x74\x74\x70\x3a\x2f\x2f\x31\x32\x37\x2e\x30\x2e\x30\x2e\x31\x3a\x37\x30\x37\x30\x2f\x73\x69\x67\x6e\x2e\x68\x74\x6d\x6c\x3f"
				+ CALLBACK_METHOD + '\x3d' + CALLBACK_SIGN +'\x26' 
			   	+ PARAM_1_NAME + '\x3d' + info + '\x26'
			   	+ PARAM_2_NAME + '\x3d' + message;

		if (agent == AGENT_IPHONE) {

			if(version < 9 || siteCodeType == "W" || (siteCodeType == "S" && version < 9))  {
				
				window.setTimeout(function() {gCheckInterval = window.setInterval(function() {callSignUrl(signRequestUrl);}, 1300);}, 1300);
			} else {
				gCheckInterval = window.setInterval(function() {callSignUrlChrome(info);}, 5000);
			}

		} else if (agent == AGENT_ANDROID) {
			if(checkSupportChrome() && location.protocol == "https:") {
				gCheckInterval = window.setInterval(function() {callSignUrlChrome(info);}, 5000);
			} else {
				gCheckInterval = window.setInterval(function() {callSignUrl(signRequestUrl);}, 3000);
			}
		}
	
	}

}	

function callSignUrlChrome(info) {
	var d = new Date();
    var n = d.getTime();
	var sb = info.split("|");

	jQuery.get(CHROME_SERVER_URL + "appfreewebpage.do?authtoken=" + sb[0] + "&rnd=" + n,
		function(data,status){

			if(data === "INVALID_KEY" || data === "INVALID_ID" || data === "INVALID_TIME" || data === "INVALID_PWD") {
				if (gCheckInterval != null) {
					clearInterval(gCheckInterval);
					gCheckInterval = null;
				}

				if(data === "INVALID_TIME") {
					alert("시간이만료되었습니다. 앱프리를 다시 구동해주세요.");
				} else {
					alert("ERROR : " + data);
				}

			} else if(data === "SELECT FAIL") {
			} else {
				try{
                		eval(data);
				}catch(e){} 
			}
	});
}

function callSignUrl(signRequestUrl) {

	var agent = getSmartPhoneAgentKind();
	var version = getSmartPhoneIosVersion();
	
	if (agent == AGENT_IPHONE) {
		
		if(navigator.userAgent.indexOf("\x69\x50\x61\x64") != -1 && version >= 6) {
			window.setInterval(function() {popup.focus();}, 100);
		}
		
		++gRequestCount;
		if(gRequestCount > 13) {	
		//if(gRequestCount > 500) {	
			if (gCheckInterval != null) {
				window.clearInterval(gCheckInterval);
				gCheckInterval = null;
				
				if (gFocusInterval != null) {
					window.clearInterval(gFocusInterval);
					gFocusInterval = null;
				}
				return;
			}
		}
		
	} else if (agent == AGENT_ANDROID) {
		++gRequestCount;
		if (gRequestCount > 500) {
			if (gCheckInterval != null) {
				window.clearInterval(gCheckInterval);
				gCheckInterval = null;
				return;
			}
		}
	}

	var checkElement = document.getElementsByTagName("\x6e\x61\x63\x61\x6c\x6c");
	try {
		if (checkElement.length != 0) {
			checkElement[0].parentNode.removeChild(checkElement[0]);
		}
	} catch (e) {};

	var newHeadID = document.createElement("\x6e\x61\x63\x61\x6c\x6c");
	document.body.appendChild(newHeadID);

	var newTag = document.createElement('\x73\x63\x72\x69\x70\x74');
	newTag['\x74\x79\x70\x65'] = '\x74\x65\x78\x74\x2f\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74';
	newTag['\x73\x72\x63'] = signRequestUrl;
	newHeadID.appendChild(newTag);

	if (agent == AGENT_IPHONE) {
		if(navigator.userAgent.indexOf("\x69\x50\x61\x64") != -1) {
			window.focus();
		} else {
			gFocusInterval = setInterval("\x77\x69\x6e\x64\x6f\x77\x2e\x66\x6f\x63\x75\x73\x28\x29", 100);
		}
	}
}



function getSmartPhoneAgentKind() {

	var agentKind = "";
	var agent = navigator.userAgent;


	if (agent.indexOf("AppleWebKit") != -1 || agent.indexOf("Opera") != -1) {
		if (agent.indexOf("Android") != -1 || agent.indexOf("J2ME/MIDP") != -1) {
			agentKind = AGENT_ANDROID;
		} else if (agent.indexOf("iPhone") != -1) {
			agentKind = AGENT_IPHONE;
		} else if (agent.indexOf("iPad") != -1) {
			agentKind = AGENT_IPHONE;
		}
	} else {
		agentKind = AGENT_ETC;
	}
	
	return agentKind;
}

// 2016.09.13 수정
//function getSmartPhoneIosVersion() {
//	
//	var agentFullInfo = window.navigator.userAgent;
//	var index = agentFullInfo.search(/OS\s\d/gm);
//	var version = agentFullInfo.charAt(index + 3);
//
//	return version;
//}

function getSmartPhoneIosVersion() {

	var agentFullInfo = window.navigator.userAgent;
	var index = agentFullInfo.match(/OS\s\d+/gm);

	if (index == "undefined" || index == null) {
		return 0;
	}

	var version = index[0].match(/\d+/);

	return version;

} 

function getChromeVersion() {

        var agentFullInfo = window.navigator.userAgent;
        var index = agentFullInfo.search(/Chrome/gm);
        var version = agentFullInfo.charAt(index + 7);
        return version;
}


function checkSupportBrowserApp() {
	
	var agent = navigator.userAgent;
	var ret = false;
	for(var idx in BROWSER_APP_NAME_LIST) {
		if(agent.indexOf(BROWSER_APP_NAME_LIST[idx]) != -1) {
			ret = true;
		}
	}
	return ret;
}


function getBrowserAppScheme() {
	
	var agent = navigator.userAgent;
	var ret = "";

	for(var idx in BROWSER_APP_NAME_LIST) {
		if(agent.indexOf(BROWSER_APP_NAME_LIST[idx]) != -1) {
			ret = BROWSER_APP_SCHEME_LIST[idx];
		}
	}
	return ret;
}


function checkSupportChrome() {

	var agent = navigator.userAgent;
	var ret = false;

	if(agent.indexOf('CriOS') != -1 || agent.indexOf('Chrome') != -1) {
		ret = true;
	}
	
	return ret;
}



function checkAppChrome() {

	if (gChromeAppCheckInterval != null) {
		window.clearInterval(gChromeAppCheckInterval);
		gChromeAppCheckInterval = null;
	}
	appCheckCallback();
}



function callCheckAppChrome(requestUrl) {
	
	var checkElement = document.getElementsByTagName("\x6e\x61\x63\x61\x6c\x6c");
	try {
		if (checkElement.length != 0) {
			checkElement[0].parentNode.removeChild(checkElement[0]);
		}
	} catch (e) {};

	var newHeadID = document.createElement("\x6e\x61\x63\x61\x6c\x6c");
	document.body.appendChild(newHeadID);

	var newTag = document.createElement('\x73\x63\x72\x69\x70\x74');
	newTag['\x74\x79\x70\x65'] = '\x74\x65\x78\x74\x2f\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74';
	newTag['\x73\x72\x63'] = requestUrl;
	newHeadID.appendChild(newTag);
}

