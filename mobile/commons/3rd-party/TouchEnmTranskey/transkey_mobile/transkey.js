/*
 * mTranskey
 * Copyright(C)2013 RaonSecure Co., Ltd.
 * Version 4.6.2
 * 2014-2-21
 */


//config
var transkey_url='/commons/3rd-party/TouchEnmTranskey/transkey_mobile';
var transkey_surl='/mtranskeyServlet';
var mtk_useButton=false;
var mtk_useTranskey=true;
var useFakeKey=false;
//config

document.write('<script type="text/javascript" src="'+transkey_url+'/rsa_oaep_files/rsa_oaep-min.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/sha256.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/core-min.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/jsbn-min.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/TranskeyLibPack_op.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_surl+'?op=getToken&'+new Date().getTime()+'"></script>');


var transkey=[];

var mtk=null;

var tk_btn_arr=[];

/*
 * 기존 Init 함수
function initmTranskey(){
	setMaxDigits(131);	
	if(mtk==null){
		transkey.objs= new Array();
		mtk = new mTranskey();
		if(!mtk.generateSessionKey(transkey_surl)){
			return false;
		}
		mtk.getClientWidth();
	}

	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++){
		var input = inputs.item(i);
		if(input.getAttribute("data-tk-kbdType")!=null&&transkey[input.id]==null)
			mtk.setKeyboard(inputs.item(i));
	}
	if(window.addEventListener){
		window.addEventListener("resize", function(){
			mtk.getClientWidth();
			if(mtk.now!=null){
				if(!mtk.checkWidthSize(mtk.now.width)){
					mtk.reSize(mtk.now);
				 }
				 var div = mtk.now.div;	
				 
				 mtk.setPosition();
				if(mtk.now.useTranskey)
					div.style.display="block";
			}
				
		}, false);
	}else{
		window.attachEvent("onresize", function(){
			mtk.getClientWidth();
			if(mtk.now!=null){
				if(!mtk.checkWidthSize(mtk.now.width)){
					mtk.reSize(mtk.now);
				 }
				 var div = mtk.now.div;
				 
				 mtk.setPosition();
				 if(mtk.now.useTranskey)
					 div.style.display="block";
			}
		});
	}

}
*/
/**
 * 2015-03-12 라온시큐어 이호석
 * 다른곳 클릭시 키패드 내려가는 부분 추가
 */
function initmTranskey() {
	setMaxDigits(131);
	if (mtk == null) {
		transkey.objs = new Array();
		mtk = new mTranskey();
		if (!mtk.generateSessionKey(transkey_surl)) {
			return false;
		}
		mtk.getClientWidth();
		if (document.addEventListener) {
			document.addEventListener("mousedown", checkTransKey, false);
		} else if (document.attachEvent) {
			document.attachEvent("onmousedown", checkTransKey);
		}
	}

	var inputs = document.getElementsByTagName("input");
	for ( var i = 0; i < inputs.length; i++) {
		var input = inputs.item(i);
		if (input.getAttribute("data-tk-kbdType") != null
				&& transkey[input.id] == null)
			mtk.setKeyboard(inputs.item(i));
	}
	if (window.addEventListener) {
		window.addEventListener("resize", function() {
			mtk.getClientWidth();
			if (mtk.now != null) {
				if (!mtk.checkWidthSize(mtk.now.width)) {
					mtk.reSize(mtk.now);
				}
				var div = mtk.now.div;

				mtk.setPosition();
				if (mtk.now.useTranskey)
					div.style.display = "block";
			}

		}, false);
	} else {
		window.attachEvent("onresize", function() {
			mtk.getClientWidth();
			if (mtk.now != null) {
				if (!mtk.checkWidthSize(mtk.now.width)) {
					mtk.reSize(mtk.now);
				}
				var div = mtk.now.div;

				mtk.setPosition();
				if (mtk.now.useTranskey)
					div.style.display = "block";
			}
		});
	}

}


if (typeof XMLHttpRequest == "undefined") {
	XMLHttpRequest = function() {
    	try { 
    		return new ActiveXObject("Msxml2.XMLHTTP.6.0"); 
		} catch(e) {
		};
		
    	try { 
    		return new ActiveXObject("Msxml2.XMLHTTP.3.0"); 
		} catch(e) {
		};
		
    	try { 
    		return new ActiveXObject("Msxml2.XMLHTTP"); 
		} catch(e) {
		};
		
    	try { 
    		return new ActiveXObject("Microsoft.XMLHTTP"); 
		}  catch(e) {
		};
 
    	throw new Error("This browser does not support XMLHttpRequest or XMLHTTP.");
	};
};


function mTranskeyObj(inputObj, width, div, keyType, keyboardType, dataType){
	this.ele=null;
	this.allocate=false;
	this.id=inputObj.id;
	this.keyboardType=keyboardType+"Mobile";
	this.width=width;
	this.div=div;
	this.lowerDiv=div.children["mtk_"+this.id+"_lower"];
	this.upperDiv=div.children["mtk_"+this.id+"_upper"];
	this.specialDiv=div.children["mtk_"+this.id+"_special"];
	this.keyTypeIndex=""; // "l ","u ","s ",""
	this.useUpper=false;
	this.useLower=false;
	this.useCaps=false;
	this.useSpecial=false;
	this.keyType=keyType;
	this.cap=false;
	this.special=false;
	this.useTranskey=mtk_useTranskey;
	this.useButton=false;
	this.button=null;
	this.inputObj=inputObj;
	this.hidden=document.getElementById("transkey_"+inputObj.id);
	this.hmac=document.getElementById("transkey_HM_"+inputObj.id);
	this.fieldType=inputObj.type;
	this.bgImgChecked=false;
	this.imgWidth="";
	
	this.allocation = function(){
		var request = new XMLHttpRequest();
		request.open("GET", getUrl("allocation", this, "")+"&"+new GenKey().tk_getrnd_int(), false);
		try {
			request.send();
		} catch(e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}
		if (request.readyState == 4 && request.status == 200) {
			this.allocate=true;
			this.setUrl();
		}
	};
	
	this.setUrl = function(){
		if(this.keyboardType=="numberMobile"){
			var url = getUrl("getKey", this, "single");			
			this.div.style.backgroundImage="url('"+url+"')";
			this.div.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+url+"', sizingMethod='scale')";
		}else{
			var url = getUrl("getKey", this, "lower");			
			this.lowerDiv.style.backgroundImage="url('"+url+"')";
			this.lowerDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+url+"', sizingMethod='scale')";	
			var bgImg = new Image();
			bgImg.src= url;
			url = getUrl("getKey", this, "upper");			
			this.upperDiv.style.backgroundImage="url('"+url+"')";
			this.upperDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+url+"', sizingMethod='scale')";
			url = getUrl("getKey", this, "special");			
			this.specialDiv.style.backgroundImage="url('"+url+"')";
			this.specialDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+url+"', sizingMethod='scale')";
		}
	};
	
	this.setDataType = function(dataType){
		if(keyboardType=="number")
			return;
		
		if(dataType==null){
			this.useCaps=true;
			this.useSpecial=true;
			this.useLower=true;
			this.useUpper=true;
		}else{
			for(var i=0; dataType.length>i; i++){

				switch(dataType.charAt(i)){
				case 'a':
					this.useLower=true;
					break;
				case 'A':
					this.useUpper=true;
					break;
				case '@' :
					this.useSpecial=true;
					break;
				}
			}
			if(this.useLower&&this.useUpper)
				this.useCaps=true;
			if(!this.useLower&&!this.useUpper)
				this.useSpecial=false;
				
		}		
	};
	
	function getUrl(op, o, keyType){
		return transkey_surl+"?op="+op+"&name="+o.id+"&keyType="+keyType+"&keyboardType="+o.keyboardType+"&fieldType="
		+o.fieldType+"&inputName="+o.inputObj.name+"&transkeyUuid="+mtk.transkeyUuid+"&TK_requestToken="+TK_requestToken;
	}
	
	this.setWidth(width);
	this.setDataType(dataType);
	this.setKeyType(keyType);
	this.allocation();

}

mTranskeyObj.prototype.setButton = function(useB){
	this.useButton=useB;
	this.button = document.getElementById(this.inputObj.id+"_tk_btn");
	if(useB){
		if(mtk_useTranskey){
			this.button.className = "tk_btn_";
			this.button.setAttribute("data-tk-btnValue","true");

		}else{
			this.button.className = "tk_btn";
			this.button.setAttribute("data-tk-btnValue","false");
		}
		
		tk_btn_arr[this.button.id]=this.id;
		
		if(this.button.addEventListener ){
			this.button.addEventListener("click", mtk.buttonListener, false);
		}else{
			this.button.attachEvent("onclick", mtk.buttonListener);
		}

		
	}
};

mTranskeyObj.prototype.setKeyType = function(keyT){
	this.keyType = keyT;
	if(keyT=="single"){
		this.keyTypeIndex = "";
	}else{
		this[keyT+"Div"].style.display="block";
		this.keyTypeIndex = keyT.charAt(0)+" ";
		
		if(keyT=="upper")
			this.cap=true;
		else if(keyT=="special")
			this.special=true;
	}


};

mTranskeyObj.prototype.setWidth = function(width){
	if(width>=600&&!mtk.horizontal){
		this.width=600;
	}else if(width>=360)
		this.width=360;
	else
		this.width=320;
};

mTranskeyObj.prototype.setQwertyKey = function(key){
	this.lowerDiv.style.display="none";			
	this.upperDiv.style.display="none";	
	this.specialDiv.style.display="none";
	this[key+"Div"].style.display="block";
};

mTranskeyObj.prototype.clear = function(){
	
	this.inputObj.value = "";		
	 
	this.hidden.value = "";
	
	this.hmac.value = "";
};

mTranskeyObj.prototype.setDiv = function(div){
	this.div=div;
	this.lowerDiv=div.children["mtk_"+this.id+"_lower"];
	this.upperDiv=div.children["mtk_"+this.id+"_upper"];
	this.specialDiv=div.children["mtk_"+this.id+"_special"];
};


function mTranskey(){
	var startEvent;
	this.isiPad = navigator.userAgent.indexOf("iPad")>-1;

	if ('ontouchstart' in document.documentElement) {
		if(navigator.userAgent.indexOf("Android 4.0")>-1){
			startEvent="onmousedown";
		}
		else{
			startEvent="ontouchstart";
		}
	} else {
		startEvent="onmousedown";
	}
	

	var sessionKey = [, , , , , , , , , , , , , , , ];
	var genKey = new GenKey();
	var useCert = "true";
	var cert_pub = "-----BEGIN CERTIFICATE-----MIIDMTCCAhmgAwIBAgIJAOYjCX4wgWKlMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMRUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQuMB4XDTE1MDEyOTA5MjAyMVoXDTI1MDEyNjA5MjAyMVowLTELMAkGA1UEBhMCS1IxDjAMBgNVBAoTBXVwbHVzMQ4wDAYDVQQDEwV1cGx1czCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKC+ckZuh+uTrii3jzBEy6WNVcKpjtALSn1Ee3Mp+g8CLHH+JZslYqzArh8RbWjEgyHXNH3743Dm/VQOyafMT42cmtymawS4hur/sXedHzdF0E46y0o/nic6cakaAOIFlQ+tdekYsMg41wKBrXdnmOA301NFo6tXGwSb5QHXhU2hbbF/p7ABmwp1Cd++aBTs++saSxDjM5S/FKcyUkPbnBkJ9jKOb6eoZK7LrfrHVgdSLwMRvtoFFxw3e646GsE3F6pkWbG/RHKGCvYr9T6hCeDKHJKDAoCqtSvpraEjdaw7kgDgbSrDZ1t7yZo3+vBg6E0s5s9PUjqSKU0mi06pwesCAwEAAaMaMBgwCQYDVR0TBAIwADALBgNVHQ8EBAMCBeAwDQYJKoZIhvcNAQELBQADggEBAAg88Y01z5mxYnu3ikdKaj8By3T1uZePCX7/BQmGBH4TCfmB6mc7oOxIIED4rrl9/iZuqmFLpzOPN80uNi4X/YiQ33lSfAydwfjO4xWTOweLDDMKDAOS580YkldlLSdyYJdeqVh3g51YbYkJfwgLj6uoVhQwiYG9HwVbGW7xGC7/SOyr88A4AajiU5NhEAEwA2jz0nbT53WnIynGYAXSotPIcJvPlObtK3PxTjfh+PTWxVOVsQvq+d8RA6O/fxpIUSwkolb5+RaKYLOJuszwNOObJyr8/m4wDjadjtzVrz8ZWzatFbAJEPkewruhFtn9vwVZQmLpbKYRT+VVm28gKLc=-----END CERTIFICATE-----";
	var cert_ca = "-----BEGIN CERTIFICATE-----MIIEHjCCAwagAwIBAgIJALcMNEp1tPYgMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMRUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQuMB4XDTEzMDIwNzA5MDYyNVoXDTQzMDEzMTA5MDYyNVowZzELMAkGA1UEBhMCS1IxHTAbBgNVBAoTFFJhb25TZWN1cmUgQ28uLCBMdGQuMRowGAYDVQQLExFRdWFsaXR5IEFzc3VyYW5jZTEdMBsGA1UEAxMUUmFvblNlY3VyZSBDby4sIEx0ZC4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqB0MsUuAi7pWVmRWaCS7kAactycMghmOM7RiMbmXyHmatXJbrtOlNrGH8Xl4fdkCJjyUE2829zQy+lTJ2O3Uo3Nn7zK3+3Um9nDQXN2tapambthOXs0aHjnRCtuLMOSPlAx06o0yHP1nOGaV7hfY9PyJjIVh9Lk/oFp5A+wsi0wiQ+INMDrm/6xZrooEY7/TLMnE4v+nr+cpIf3hSrvI1gGTykFtGCy2Le1huqaTKkE9K0CF/Sd8Kvebj6R+MhlieDXiMZXZD++pRmd4cAmGAmnGn4YdJMyh16TCccPjT60KkMv84uNVjXBvnar8ZlzRQSgIhwp1KkRiMErMbVWCnAgMBAAGjgcwwgckwHQYDVR0OBBYEFPzIDKwqK4PCklaP6Mq4YXdq8McyMIGZBgNVHSMEgZEwgY6AFPzIDKwqK4PCklaP6Mq4YXdq8McyoWukaTBnMQswCQYDVQQGEwJLUjEdMBsGA1UEChMUUmFvblNlY3VyZSBDby4sIEx0ZC4xGjAYBgNVBAsTEVF1YWxpdHkgQXNzdXJhbmNlMR0wGwYDVQQDExRSYW9uU2VjdXJlIENvLiwgTHRkLoIJALcMNEp1tPYgMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHBRlEB4nu/gHwVFRzqbFOloR7aB0xIaMDykMWtovXHUQcTmmGyYQn0bMWaGVCD7SgRh1FisfciJzLP7f8OI5f7rA2tiBZD1PBtLMU7MytGIYlV/gcfWPbnqBVsKDm15AEUqH7ZahOm7np4d5Fr87r1bj2baXQPKSNd9yjh89fl6LthWLEQRYKKwhPYAA/QkeB2RE9MftmuOXJ6MnYyyx5xEZK2ofqwrRBvDmV/PjwdCSxhloiJVFHrp8lKPCsZywJ3v9IPpudjgBQ7SWqhDcPNo2diGB2dQ252g36K1H7u3aT9Xha33MFQXTTEDzVDhaXzaGk7X6T9v25dsOyOaLAo=-----END CERTIFICATE-----";
	rng = new SecureRandom();
	var mKey = new Array();
	mKey["qwertyMobile"] = null;
	mKey["numberMobile"] = null;
	this.now = null;
	this.fakeKey = null;
	this.getTextEnd=false;
	this.cssText = new Array();
	this.cssText["qwertyMobile"] = new Array();
	this.cssText["numberMobile"] = new Array();
	this.transkeyUuid;
	this.clientWidth;
	this.horizontal = false;
	this.webkitTapHighlightColor="";
	var genSessionKey = "";
	this.generateSessionKey = function(url) {
		
		if(genSessionKey.length>0)
			return true;
		
		var vCA =  verifyCA();
		
		if( vCA == false || vCA =="expired"){
			if(vCA==false)
				alert("transkey : CA 검증이 실패 하였습니다. 프로그램이 정상작동 하지 않을 수 있습니다.");
			return false;
		}
		
		var pKey = _x509_getPublicKeyHexArrayFromCertPEM(cert_pub);

		var n = pKey[0];
		var k = 256; // length of n in bytes
		var e = pKey[1];
		
		this.transkeyUuid = genKey.tk_sh1prng();
		
		
		genSessionKey = genKey.GenerateKey(128);

		
		for(var i=0; i<16; i++)	{
			sessionKey[i] = Number("0x0" + genSessionKey.charAt(i));
		}

		var encSessionKey = phpbb_encrypt2048(genSessionKey, k, e, n);
			
		var operation = "setSessionKey";
		var request = new XMLHttpRequest();
		request.open("POST", url, false);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		try {
			request.send("op=" + operation + "&key=" + encSessionKey + "&transkeyUuid=" + this.transkeyUuid+ "&useCert=" + useCert+"&TK_requestToken="+TK_requestToken+ "&mode=Mobile");
		} catch(e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}
		
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseXML) {
				var result = request.responseXML.firstChild;
				for ( var i = 0; i < result.childNodes.length; i++) {
					var node = result.childNodes[i];
					if (node.tagName == "script") {
						for ( var j = 0; j < node.childNodes.length; j++) {
							eval(node.childNodes[j].nodeValue);
						}
					}
				}
				mKey["qwertyMobile"] = qwertyMobile;
				mKey["numberMobile"] = numberMobile;
			}
			return true;
		}else{
			return false;
		}
		
		
	};
	
	this.inputFillEncData = function(input){
		var tkObj = transkey[input.id];
		var hidden = tkObj.hidden.value;
		var hmac = "";

		var maxSize = input.value.length+genKey.tk_getrnd_int()%10;			
		
		var geo = "d 0 0";
		
		for(var j=input.value.length; j<maxSize; j++)
		{	
			var encrypted = SeedEnc(geo);
			hidden += "$" + encrypted;
		}
		
		hmac = hex_hmac_sha1(genSessionKey, hidden);
		
		var value = {};
		value["hidden"]=hidden;
		value["hmac"]=hmac;
		
		return value;
		
	};
	
	this.fillEncData = function()
	{
		for(var i=0;transkey.objs.length>i;i++){
			var tk = transkey[transkey.objs[i]];
			var hidden = tk.hidden;
			var HM = tk.hmac;
			var input = tk.inputObj;
			if(HM.value.length==0){
				var maxSize = input.value.length;				
				
				geo = "d 0 0";
				

				for(var j=input.value.length; j<maxSize; j++)
				{	
					var encrypted = SeedEnc(geo);
					hidden.value += "$" + encrypted;
				}		

				HM.value = hex_hmac_sha1(genSessionKey, hidden.value);
			}
			
		}
		

	};
	
	this.getEncData = function(index){
		var key = mKey[mtk.now.keyboardType][index];
		var x = key.xpoints[0];
		var y = key.ypoints[0];		
		var geo = this.now.keyTypeIndex + x + " " + y;
		return SeedEnc(geo);
	};
	
	this.getClientWidth = function(){
		if(window.orientation==0||window.orientation==180){
			this.horizontal = false;
		}else{
			this.horizontal = true;
		}
		if(this.isiPad){
			this.horizontal = false;
		}
		var div = document.createElement("div");
		div.setAttribute("id", "mtk");
		document.body.appendChild(div);
		if(div.addEventListener)
			div.addEventListener("touchstart", function(){}, false);
		div.style.width="100%";
		this.clientWidth = div.clientWidth;
		document.body.removeChild(div);
	};
	
	this.checkWidthSize = function(size){
			
		var width;
		if(this.clientWidth>=600&&!mtk.horizontal){
			width=600;
		}else if(this.clientWidth>=360)
			width=360;
		else
			width=320;
		
		if(size==width)
			return true;
		else
			return false;
	};

	
	 
	 this.setPosition = function(){
		 var div = this.now.div;	 
		 var inputObj = this.now.inputObj;
		 var xy = inputObj.getAttribute("data-tk-kbdxy");
		 if(xy == undefined){
			 var point = getOffsetPoint(inputObj);
				 div.style.top = point.y+inputObj.offsetHeight+"px";
			 var left = this.clientWidth/2 - this.now.width/2;
			 if(left<0)
				 left = 0;
			 div.style.left = left+"px";
		 }else{
			 var point = new Array();
			 point = xy.split(" ");
			 div.style.top = point[1]+"px";
			 div.style.left = point[0]+"px";
		 }
	 };
	
	 this.setHiddenField = function(inputObj){
		if(inputObj.form.children.transkeyUuid==null){
			var uuid = document.createElement("input");
			uuid.setAttribute("type", "hidden");
			uuid.setAttribute("id", "transkeyUuid");
			uuid.setAttribute("name", "transkeyUuid");
			uuid.value=this.transkeyUuid;
			inputObj.form.appendChild(uuid);
		}
		var hidden = document.createElement("input");
		hidden.setAttribute("type", "hidden");
		hidden.setAttribute("id", "transkey_"+inputObj.id);
		hidden.setAttribute("name", "transkey_"+inputObj.id);
		hidden.setAttribute("value", "");
		var hmac = document.createElement("input");
		hmac.setAttribute("type", "hidden");
		hmac.setAttribute("id", "transkey_HM_"+inputObj.id);
		hmac.setAttribute("name", "transkey_HM_"+inputObj.id);
		hmac.setAttribute("value", "");
		inputObj.form.appendChild(hidden);
		inputObj.form.appendChild(hmac);
	};
	
	this.setKeyType = function(dataType){
		if(dataType==undefined){
			return "lower";
		}
		switch(dataType.charAt(0)){
		case 'a':
			return "lower";
		case 'A':
			return "upper";
		case '@' :
			return "special";
		}
		
	};
	
	this.getText = function(encrypted, ele){
		var request = new XMLHttpRequest();
		request.open("POST", transkey_surl+"?op=letter&transkeyUuid="+this.transkeyUuid+"&name="+this.now.id+"&value=" +encrypted+"&TK_requestToken="+TK_requestToken+"&"+genKey.tk_getrnd_int(), false);
		request.send();
		if (request.readyState == 4 && request.status == 200) {
			mtk.now.inputObj.value = mtk.now.inputObj.value + request.responseText;
			}

	};
	
	
	this.getFakeKey = function(){
		var rnd1,rnd2;
		if(this.now.keyboardType=="numberMobile"){
			rnd1 = getRandomValue(2);
			rnd2 = getRandomValue(6);
			
		}else{
			rnd1 = getRandomValue(4)+3;
			rnd2 = getRandomValue(11);
			if(rnd1==6){
				if(rnd2==0)
					rnd2=rnd2+1;
				else if(rnd2>8)
					rnd2=rnd2-getRandomValue(6);
			}
		}
		return mtk.now.div.children[rnd1].children[rnd2];
	};
	
    function getRandomValue(range) {

       var ramdomNum = new GenKey().tk_getrnd_int() % range;

        return ramdomNum;



    }
	
	this.setQwertyMobileCss = function(){
		var qwertyCss = "";

		
		if(this.clientWidth>=600&&!this.horizontal){
			qwertyCss = "transkey_qwerty3";
		}else if(this.clientWidth>=360){
			qwertyCss = "transkey_qwerty2";
		}else{
			qwertyCss = "transkey_qwerty1";
		}
		
		this.cssText["qwertyMobile"].div = "transkey_div "+qwertyCss+"_div";
		this.cssText["qwertyMobile"].layout = qwertyCss+"_layout";
		this.cssText["qwertyMobile"].row = qwertyCss+"_row";
		this.cssText["qwertyMobile"].key1 = qwertyCss+"_key1";
		this.cssText["qwertyMobile"].key2 = qwertyCss+"_key2";
		this.cssText["qwertyMobile"].del = qwertyCss+"_del";
		this.cssText["qwertyMobile"].sp = qwertyCss+"_sp";
		this.cssText["qwertyMobile"].clear = qwertyCss+"_clear";
		this.cssText["qwertyMobile"].done = qwertyCss+"_done";
		
	};
	
	this.setNumberMobileCss = function(){
		var numberCss="";
		if(this.clientWidth>=600&&!this.horizontal){
			numberCss = "transkey_number3";
		}else if(this.clientWidth>=360){
			numberCss = "transkey_number2";
		}else{
			numberCss = "transkey_number1";
		}
		
		this.cssText["numberMobile"].div = "transkey_div "+numberCss+"_div";
		this.cssText["numberMobile"].row = numberCss+"_row";
		this.cssText["numberMobile"].key1 = numberCss+"_key1";
		this.cssText["numberMobile"].key2 = numberCss+"_key2";
		this.cssText["numberMobile"].del = numberCss+"_del";
		this.cssText["numberMobile"].clear = numberCss+"_clear";
		this.cssText["numberMobile"].done = numberCss+"_done";
	};
	
	this.setQwertyMobileLayout = function(id, div){
		this.setQwertyMobileCss();
		div.className=this.cssText.qwertyMobile.div;
		div.innerHTML = qwertyMobileLayout(id, this.cssText.qwertyMobile);
	};
	
	this.setNumberMobileLayout = function(id, div){
		this.setNumberMobileCss();
		div.className=this.cssText.numberMobile.div;
		div.innerHTML = numberMobileLayout(id, this.cssText.numberMobile);
	};
	
	function offsetPoint() {
		this.x = 0;
		this.y = 0;
	}

	function getOffsetPoint(Element) {

        var point = new offsetPoint();

        point.x = 0;
        point.y = 0;

        while (Element) {
            point.x += Element.offsetLeft;
            point.y += Element.offsetTop;

            Element = Element.offsetParent;

            if (Element.tagName == "BODY")
                break;
        }

        return point;
	}

	
	function SeedEnc(geo) {	
		var iv = [0x4d, 0x6f, 0x62, 0x69, 0x6c, 0x65, 0x54, 0x72, 0x61, 0x6e, 0x73, 0x4b, 0x65, 0x79, 0x31, 0x30];	// "MobileTransKey10"	  
		var inData = new Array(16);
		var outData = new Array(16);
		var roundKey = new Array(32);
	  
		for(var i=0; i<geo.length; i++)
		{			
			if(geo.charAt(i) == "l" || geo.charAt(i) == "u" || geo.charAt(i) == "s" || geo.charAt(i) == "d")
			{
				inData[i] = Number(geo.charCodeAt(i));
				continue;
			}
			else if(geo.charAt(i) == " ")
			{ 
				inData[i] = Number(geo.charCodeAt(i));
				continue;
			}
			inData[i] = Number(geo.charAt(i).toString(16));
		}
		inData[geo.length] = 32;		//" "
		inData[geo.length + 1] = 101;	//e
		var rndInt = genKey.tk_getrnd_int();
		inData[geo.length + 2] = rndInt % 100;

		Seed.SeedSetKey(roundKey, sessionKey);
		Seed.SeedEncryptCbc(roundKey, iv, inData, 16, outData);

		var encodedData = new Array(16);
		for(var i=0; i<16; i++)
		{
			encodedData[i] = Number(outData[i]).toString(16);
		}		

		return encodedData;
	}
	
	function Key() {
		this.name = "";
		
		this.npoints = 0;
		this.xpoints = new Array();
		this.ypoints = new Array();
		
		this.addPoint = function(x, y) {
			this.npoints++;
			this.xpoints.push(x);
			this.ypoints.push(y);
		};
		
		this.contains = function(x, y) {
			var startx = this.xpoints[0];
			var starty = this.ypoints[0];
			
			var endx = this.xpoints[2];
			var endy = this.ypoints[2];
			
			if ( startx < x && starty < y )
			{
				if ( endx > x && endy > y )
				{
					return 1;
				}
			}
			
			return 0;
		};
	}

	function qwertyMobileLayout(id, cssText){
		var layout = '<span id="mtk_'+id+'_lower" class="transkey_layout '+cssText.layout+'"></span>'+
		'<span id="mtk_'+id+'_upper" class="transkey_layout '+cssText.layout+'"></span>'+
		'<span id="mtk_'+id+'_special" class="transkey_layout '+cssText.layout+'"></span>'+
			'<div id="mtk_'+id+'_Row0" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 0);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 1);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 2);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 3);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 4);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 5);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 6);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 7);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 8);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 9);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 10);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row1" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 11);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 12);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 13);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 14);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 15);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 16);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 17);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 18);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 19);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 20);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 21);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row2" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 22);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 23);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 24);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 25);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 26);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 27);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 28);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 29);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 30);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 31);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 32);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row3" class="transkey_row '+cssText.row+'">'+
			'<div id="mtk_cp" '+startEvent+'="mtk.cap(event, this);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 33);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 34);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 35);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 36);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 37);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 38);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 39);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 40);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.del(event, this);"  class="transkey_key '+cssText.del+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row4" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.sp(event, this);"  class="transkey_key '+cssText.sp+'"></div>'+
			'<div '+startEvent+'="mtk.clear(event, this);"  class="transkey_key '+cssText.clear+'"></div>'+
			'<div '+startEvent+'="mtk.done(event, this);"  class="transkey_key '+cssText.done+'"></div>'+
			'</div>';
		
		return layout;
	}
	function numberMobileLayout(id, cssText){
		var layout = '<div id="mtk_'+id+'_Row0" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 0);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 1);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 2);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 3);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 4);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 5);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row1" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 6);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 7);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 8);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 9);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 10);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 11);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row2" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.clear(event, this);"  class="transkey_key '+cssText.clear+'"></div>'+
			'<div '+startEvent+'="mtk.del(event, this);"  class="transkey_key '+cssText.del+'"></div>'+
			'<div '+startEvent+'="mtk.done(event, this);"  class="transkey_key '+cssText.done+'"></div>'+		
			'</div>';
		return layout;
	}
	
	function pack(source)
	{
	   var temp = "";
	   for (var i = 0; i < source.length; i+=2)
	   {
	      temp+= String.fromCharCode(parseInt(source.substring(i, i + 2), 16));
	   }
	   return temp;
	}

	function char2hex(source)
	{
	   var hex = "";
	   for (var i = 0; i < source.length; i+=1)
	   {
	      temp = source[i].toString(16);
	      switch (temp.length)
	      {
	         case 1:
	            temp = "0" + temp;
	            break;
	         case 0:
	           temp = "00";
	      }
	      hex+= temp;
	   }
	   return hex;
	}

	function xor(a, b)
	{
	   var length = Math.min(a.length, b.length);
	   var temp = "";
	   for (var i = 0; i < length; i++)
	   {
	      temp+= String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i));
	   }
	   length = Math.max(a.length, b.length) - length;
	   for (var i = 0; i < length; i++)
	   {
	      temp+= "\x00";
	   }
	   return temp;
	}

	function mgf1(mgfSeed, maskLen)
	{
	   var t = "";
	   var hLen = 20;
	   var count = Math.ceil(maskLen / hLen);
	   for (var i = 0; i < count; i++)
	   {
	      var c = String.fromCharCode((i >> 24) & 0xFF, (i >> 16) & 0xFF, (i >> 8) & 0xFF, i & 0xFF);
	      t+= pack(sha1Hash(mgfSeed + c));
	   }

	   return t.substring(0, maskLen);
	}

	function rsaes_oaep_encrypt(m, n, k, e)
	{
	   var hLen = 20;


	   var mLen = m.length;
	   if (mLen > k - 2 * hLen - 2)
	   {
	   	alert("too long");
	   }

	   var lHash = "\xda\x39\xa3\xee\x5e\x6b\x4b\x0d\x32\x55\xbf\xef\x95\x60\x18\x90\xaf\xd8\x07\x09"; // pack(sha1Hash(""))

	   var ps = "";
	   var temp = k - mLen - 2 * hLen - 2;
	   for (var i = 0; i < temp; i++)
	   {
	      ps+= "\x00";
	   }

	   var db = lHash + ps + "\x01" + m;
	   var seed = "";
	   for (var i = 0; i < hLen + 4; i+=4)
	   {
	      temp = new Array(4);
	      rng.nextBytes(temp);
	      seed+= String.fromCharCode(temp[0], temp[1], temp[2], temp[3]);
	   }
	   seed = seed.substring(4 - seed.length % 4);
	   var dbMask = mgf1(seed, k - hLen - 1);
	   var maskedDB = xor(db, dbMask);
	   var seedMask = mgf1(maskedDB, hLen);
	   var maskedSeed = xor(seed, seedMask);
	   var em = "\x00" + maskedSeed + maskedDB;

	   m = new Array();
	   for (i = 0; i < em.length; i++)
	   {
	      m[i] = em.charCodeAt(i);
	   }
	   m = new BigInteger(m, 256);
	   c = m.modPow(e, n);
	   c = c.toString(16);
	   if (c.length & 1)
	   {
	      c = "0" + c;
	   }

	   return c;
	}

	function pkcs7pad(plaintext)
	{
	   var pad = 16 - (plaintext.length & 15);
	   for (var i = 0; i < pad; i++)
	   {
	      plaintext+= String.fromCharCode(pad);
	   }
	   return plaintext;
	}

	function aes_encrypt(plaintext, key, iv)
	{
	   var ciphertext = new Array();
	   plaintext = pkcs7pad(plaintext);
	   key = new keyExpansion(key);
	   for (var i = 0; i < plaintext.length; i+=16)
	   {
	      var block = new Array(16);
	      for (var j = 0; j < 16; j++)
	      {
	         block[j] = plaintext.charCodeAt(i + j) ^ iv[j];
	      }
	      block = AESencrypt(block, key);
	      for (var j = 0; j < 16; j++)
	      {
	         iv[j] = block[j];
	      }
	      ciphertext = ciphertext.concat(block);
	   }
	   return ciphertext;
	}

	function phpbb_encrypt1024(plaintext)
	{
	   var temp = new Array(32);
	   rng.nextBytes(temp);
	   var iv = temp.slice(0, 16);
	   var key = "";
	   for (var i = 16; i < 32; i++) // eg. temp.slice(16, 32)
	   {
	      key+= String.fromCharCode(temp[i]);
	   }

	   var n = new BigInteger("00a52ebc98a9583a90b14d34c009d436996b590561224dd1f41bd262f17dbb70f0fe9d289e60a3c31f1f70a193ad93f0a77e9a491e91de9f9a7f1197d1ffadf6814b3e46d77903a8f687849662528cdc3ea5c7c8f3bdf8fb8d118f01441ce317bb969d8d35119d2d28c8c07cbcfb28919387bd8ee67174fb1c0b2d6b87dfa73f35", 16);
	   var k = 128; // length of n in bytes
	   var e = new BigInteger("010001", 16);

	   frm1.key1.value = rsaes_oaep_encrypt(plaintext, n, k, e);
	   frm1.iv1.value = char2hex(iv);
	   frm1.data1.value = char2hex(aes_encrypt(plaintext, key, iv));
	}


	function phpbb_encrypt2048(plaintext, k, e, n)
	{
	   var temp = new Array(32);
	   rng.nextBytes(temp);
	   var key = "";
	   for (var i = 16; i < 32; i++) // eg. temp.slice(16, 32)
	   {
	      key+= String.fromCharCode(temp[i]);
	   }

	   var _e = new BigInteger(e, 16);
	   var _n = new BigInteger(n, 16);
	   
	   return rsaes_oaep_encrypt(plaintext, _n, k, _e);
	}
	//=======================================================//

	function makeHexToArrayByte(hexString)
	{
		var len = hexString.length/2;
		var result = Array(len);
		for (var i = 0; i < len; i++)
		result[i] = parseInt(hexString.substring(2*i, 2*i+2),16);
		return result;
	}

	function getTodayDate(){
		 var _date  = new Date();
		 var _year  = "" + _date.getFullYear();
		 var _month = "" + (_date.getMonth() + 1);
		 var _day   = "" + _date.getDate();

		 if( _month.length == 1 ) _month = "0" + _month;
		 if( ( _day.length ) == 1 ) _day = "0" + _day;

		 var tmp = "" + _year.substring(2, 4) + _month + _day;
		 return tmp;
	}
	
	function verifyCA() 
	{
		var x509_pub = new X509();
		x509_pub.readCertPEM(cert_pub);
	  	
		var NotBefore = x509_pub.getNotBefore();
		var NotAfter = x509_pub.getNotAfter();
		var Signature = x509_pub.getSignature();
		var CertInfo = x509_pub.getCertInfo();
		var abCertInfo = CryptoJS.enc.Hex.parse(CertInfo);
		var abHash =  CryptoJS.SHA256(abCertInfo).toString();
		
		var todayDate = getTodayDate();		
		if(todayDate < NotBefore.substring(0, 6) || todayDate >= NotAfter.substring(0, 6)) {
			alert("transkey : 인증서 유효기간이 만료되었습니다.");
			return "expired";
		}
			
		var x509_ca = new X509();
		x509_ca.readCertPEM(cert_ca);

		var isValid = x509_ca.subjectPublicKeyRSA.verifyString(abHash, Signature);
		if (isValid) {
			return true;
		} else {
			return false;
		}
	}
}





mTranskey.prototype.setKeyboard = function(inputObj){
	var div = document.createElement("div");
	div.setAttribute("id", "mtk_"+inputObj.id);
	div.setAttribute("class", "transkey");
	var keyboardType = inputObj.getAttribute("data-tk-kbdType");
	var dataType = inputObj.getAttribute("data-tk-dataType");
	var keyType;
	if(keyboardType=="qwerty"){
		this.setQwertyMobileLayout(inputObj.id, div);
		keyType = this.setKeyType(dataType);
	}
	else{
		this.setNumberMobileLayout(inputObj.id, div);
		keyType="single";
	}
	div.style.backgroundImage="url("+transkey_url+"/images/loading.gif)";
	
	this.setHiddenField(inputObj);
	
	transkey[inputObj.id] = new mTranskeyObj(inputObj, this.clientWidth, div, keyType, keyboardType, dataType);
	
	transkey[inputObj.id].setButton(mtk_useButton);
	
	transkey.objs.push(inputObj.id);

	document.body.appendChild(div);
	
	
};

mTranskey.prototype.onKeyboard = function(inputObj){
	 document.body.height="100%";
	 this.webkitTapHighlightColor=document.body.style.webkitTapHighlightColor;
	 document.body.style.webkitTapHighlightColor="rgba(0,0,0,0)";
	 
	 if(this.now!=null)
		 this.close();
	 
	 this.now = transkey[inputObj.id];
	 
	 if(!this.now.allocate)
		 this.now.allocation();
		 
	 if(this.now!=null&&this.now.useTranskey){
		 if(!this.checkWidthSize(this.now.width)){
			 this.reSize(this.now);
		 }
			 
		 this.now.clear();
		 var div = this.now.div;	 
		 inputObj.disabled=true;
		 
		 this.setPosition();
		 

		div.style.display="block";
		
		inputObj.blur();

		

	 }
	 
 };
 
mTranskey.prototype.start = function(e, ele, index){
		mtk.keyPress(e, ele, useFakeKey);

		
		var encrypted = mtk.getEncData(index);
		if(mtk.now.fieldType=="text")
			mtk.getText(encrypted, ele);
		else
			mtk.now.inputObj.value = mtk.now.inputObj.value + "*";
		mtk.now.hidden.value += "$" + encrypted;
		if(mtk.now.inputObj.maxLength>0){
			if (mtk.now.inputObj.value.length >= mtk.now.inputObj.maxLength) {
				this.close();
				return;
			}
		}
};

mTranskey.prototype.del = function(e, ele){
		mtk.keyPress(e, ele, false);
		
		mtk.now.inputObj.value = mtk.now.inputObj.value.substring(0, mtk.now.inputObj.value.length - 1);
		 
		var pos = mtk.now.hidden.value.lastIndexOf('$');
		mtk.now.hidden.value = mtk.now.hidden.value.substring(0, pos);
};
	
mTranskey.prototype.sp = function(e, ele){
	if(mtk.now.useSpecial){
		mtk.keyPress(e, ele, false);
		if(mtk.now.special){
			if(mtk.now.cap||!mtk.now.useLower)
				mtk.now.setKeyType("upper");
			else
				mtk.now.setKeyType("lower");
			mtk.now.special=false;
		}else{
			mtk.now.setKeyType("special");
			mtk.now.special=true;
		}
		
		mtk.now.setQwertyKey(mtk.now.keyType);
		
		

	}else{
		this.alert("sp");
	}
};

mTranskey.prototype.getFakeKey = function(){
	var rnd1,rnd2;
	if(this.now.keyboardType=="numberMobile"){
		rnd1 = getRandomValue(2);
		rnd2 = getRandomValue(6);
		
	}else{
		rnd1 = getRandomValue(4)+3;
		rnd2 = getRandomValue(11);
		if(rnd1==6){
			if(rnd2==0)
				rnd2=rnd2+1;
			else if(rnd2>8)
				rnd2=rnd2-getRandomValue(6);
		}
	}
	return mtk.now.div.children[rnd1].children[rnd2];
};

mTranskey.prototype.fakeKeyPress = function(fakeKey){
	try{
		if(this.fakeKey!=null){
			this.fakeKey.style.backgroundColor="";
			this.fakeKey.style.borderColor="";
		}
		this.fakeKey = fakeKey;
		fakeKey.style.backgroundColor="rgba(22, 176, 236, 0.63)";
		fakeKey.style.borderColor="#00CED1";
	}catch(ee){
		
	}


	
};

mTranskey.prototype.keyPress = function(e, ele, useFK){

	try{
		if(this.ele!=null){
			this.ele.style.backgroundColor="";
			this.ele.style.borderColor="";
		}
		this.ele=ele;
		if(e.preventDefault)
			e.preventDefault();
		var fakeKey=null;
		if(useFK){
			fakeKey = this.getFakeKey();
			mtk.fakeKeyPress(fakeKey);
		}
			
		
		ele.style.backgroundColor="rgba(22, 176, 236, 0.63)";
		ele.style.borderColor="#00CED1";
		setTimeout(function(){
			ele.style.backgroundColor="";
			ele.style.borderColor="";
			if(useFK){
				fakeKey.style.backgroundColor="";
				fakeKey.style.borderColor="";
			}

		},500);
	}catch(ee){
		
	}
	
	return false;


};



mTranskey.prototype.clear = function(e, ele){
	mtk.keyPress(e, ele, false);		
	mtk.now.clear();
};

mTranskey.prototype.cap = function(e, ele){
	if(mtk.now.useCaps){
		mtk.keyPress(e, ele, false);
		if(mtk.now.cap){
			mtk.now.setKeyType("lower");
			mtk.now.cap = false;
		}else{
			mtk.now.setKeyType("upper");
			mtk.now.cap = true;
		}					
		
		mtk.now.setQwertyKey(mtk.now.keyType);
		mtk.now.special=false;
	}else{
		this.alert("cap");
	}
};
	
mTranskey.prototype.close = function(){
	document.body.style.webkitTapHighlightColor=mtk.webkitTapHighlightColor;
	mtk.now.inputObj.disabled=false;
	mtk.now.div.style.display="none";
	mtk.now=null;
	return false;
};

mTranskey.prototype.done = function(e, ele){
	mtk.keyPress(e, ele, false);
	document.body.style.webkitTapHighlightColor=mtk.webkitTapHighlightColor;
	mtk.now.inputObj.disabled=false;
	setTimeout(function(){
		mtk.now.div.style.display="none";
		mtk.now=null;
	},500);
	return false;
};
	
mTranskey.prototype.alert = function(cmd){
	if(cmd=="setKeyboard")
		alert("transkey : qwerty키보드는 text타입을 지원하지 않습니다.");
	else
		alert("해당키는 사용 할 수 없습니다.");
};


mTranskey.prototype.buttonListener = function(e){
	var obj;
	if (e.type == "text" || e.type == "password") {
		obj = event;
	} else {
		e = e ? e : window.event;
		obj = e.target ? e.target : e.srcElement;
	}
	var id = tk_btn_arr[obj.id];
	
	var v = obj.getAttribute("data-tk-btnValue");
	if(v=="true"){
		obj.className = "tk_btn";
		transkey[id].clear();
		transkey[id].useTranskey=false;
		transkey[id].inputObj.readOnly=false;
		if(mtk.now!=null)
			mtk.close();
		obj.setAttribute("data-tk-btnValue","false");
	}else{
		obj.className = "tk_btn_";
		transkey[id].useTranskey=true;
		transkey[id].inputObj.readOnly=true;
		mtk.onKeyboard(transkey[id].inputObj);
		obj.setAttribute("data-tk-btnValue","true");

	}
	
};

mTranskey.prototype.reSize = function(transkeyObj){
	
	document.body.removeChild(transkeyObj.div);
	var div = document.createElement("div");
	div.setAttribute("id", "mtk_"+transkeyObj.id);
	div.setAttribute("class", "transkey");
	var keyboardType = transkeyObj.inputObj.getAttribute("data-tk-kbdType");
	var dataType = transkeyObj.inputObj.getAttribute("data-tk-dataType");
	var keyType;
	if(keyboardType=="qwerty"){
		this.setQwertyMobileLayout(transkeyObj.inputObj.id, div);
		keyType = this.setKeyType(dataType);
	}
	else{
		this.setNumberMobileLayout(transkeyObj.inputObj.id, div);
		keyType = "single";
	}
	div.style.backgroundImage="url("+transkey_url+"/images/loading.gif)";
	document.body.appendChild(div);
	

	transkeyObj.setDiv(div);
	transkeyObj.setWidth(this.clientWidth);
	transkeyObj.setKeyType(keyType);
	transkeyObj.setUrl();
};
		
/* 클릭시 가상키패드 닫히는 함수1*/
function tk_contains(parent, child, deep)

{
    if (parent == child)
          return true;

    var items = parent.children;
    var count = items.length;

    for ( var i = 0; i < count; i++) {
          if (items[i] == child)
                 return true;
          if (deep == true && tk_contains(items[i], child, deep))
                 return true;
    }
    return false;
}
/* 클릭시 가상키패드 닫히는 함수2*/
function checkTransKey(nsEvent) {

    var inputObj;

    if (nsEvent.type == "text" || nsEvent.type == "password") {
          inputObj = event;
    } else {
          nsEvent = nsEvent ? nsEvent : window.event;
          inputObj = nsEvent.target ? nsEvent.target : nsEvent.srcElement;
    }
    
    if(mtk.now!=null){
        var transkeyDiv = mtk.now.div;

        if (tk_contains(transkeyDiv, inputObj, true) == false) {
        	mtk.close(); 
        }
    }
}