function authAjaxExecSync(ca, refNum, authCode, callback) {

	var authXmlHttp = getXMLHttp();
	
	var d = new Date();
	var n = d.getTime();
	var url = AUTH_URL + '?timestamp' + n;
	var authToken = "";
	
	
	authXmlHttp.open("GET", url, false);
	authXmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=EUC-KR");
	authXmlHttp.setRequestHeader("Cashe-Control", "no-cache, must-revalidate");
	authXmlHttp.setRequestHeader("Pragma", "no-cache");
	authXmlHttp.onreadystatechange = function() {

		if (authXmlHttp.readyState == 4) {
			
			if (authXmlHttp.status == 200) {				
				authToken = authXmlHttp.responseText;
			} else {
				authAjaxExecCallback("FAIL", authXmlHttp.status);
				return false;
			}
		}
	};
	authXmlHttp.send(null);

	if(authToken != "") {
		authAjaxExecCallback("SUCCESS", authToken, ca, refNum, authCode, callback);
	}
}




/*Param : resultMsg(성공여부), result(싸이트 인증코드 or 에러코드)*/
function authAjaxExecCallback(resultMsg, result, ca, refNum, authCode, callback) {
	
	if (resultMsg == "SUCCESS") {
		/*싸이트 인증 후 앱프리를 호출하는 로직 추가, or 해당 싸이트에서 필요로 하는 로직 추가*/
		if (gSection == "issue") {
			callbackSignCertificate(encodeURIComponent(result) + "|" + encodeURIComponent(gSection), encodeURIComponent(result), encodeURIComponent(refNum), encodeURIComponent(authCode), encodeURIComponent(ca), encodeURIComponent(callback));
		} else if (gSection == "update1") {
			CALLBACK_SIGN = "callbackCertificate";
			callbackSign(encodeURIComponent(gPlainText), encodeURIComponent(result) + "|" + encodeURIComponent(gSection));
		} else if (gSection == "update2") {
			callbackSignCertificate(encodeURI(gSection), encodeURI(result), "", "", encodeURI(ca), encodeURI(callback));
		} else {
			callbackSign(encodeURIComponent(gPlainText), encodeURIComponent(result) + "|" + encodeURIComponent(gSection));
		}
		
		gPlainText = null;
		
	} else if (resultMsg == "FAIL") {
		alert("싸이트 인증코드 요청  실패[ERROR CODE : " + result + "]");
	} else if (resultMsg == "CANCEL") {
		alert("싸이트 인증코드 요청  타임아웃");
	}
	
}

