/*
 * Transkey
 * Copyright(c) 2012, RaonSECURE.
 * Version 4.5 - 20121031
 * 
 */

document.ondragstart = function(e) {
	return false;
};

var useTransKey = true;
var selectIMG = "0"; //button "1" BTN | "0" NOBTN
var operaversion;
	var vindex;
	vindex = navigator.userAgent.indexOf("Version/");
	//alert(vindex);
	operaversion = parseInt(navigator.userAgent.substr(vindex+8,2));
	//alert(operaversion);
	
if(navigator.platform.match('Win') == 'Win'){
	if (navigator.userAgent.indexOf("Opera") > -1 && operaversion > 11) {
	var setTkEvent = true; // true 일 경우 input focus 시 가상키보드 사용\
	}
	else{
		var setTkEvent = true;
	}
}
	else {
		var setTkEvent = true;
}

var setTkEvent_check = true;
var selectIMG_crt = "0"; //인증서 연동 키보드 button "1" BTN | "0" NOBTN
var setTkEvent_crt = true; //

setMaxDigits(131);
var rsaKey;

transkeyPressedColor = "gray";


// cross-browser setting
var isMac = false;
var userAgent = navigator.userAgent;

if (userAgent.indexOf('Mac') > -1) {
	isMac = true;
}

var isFireFox = false;
var isSafari = false;
var isChrome = false;
var isOpera = false;
var isSafari3ver = false;
var isIE9 = false;
var userAgent = navigator.userAgent;

if (userAgent.indexOf('Chrome') > -1)
	isChrome = true;
else if (userAgent.indexOf('Version/3.') > -1 && userAgent.indexOf('Safari') > 0)
	isSafari3ver = true;
else if (userAgent.indexOf('Firefox') > 0)
	isFireFox = true;
else if (userAgent.indexOf('Safari') > 0)
	isSafari = true;
else if (navigator.appName == 'Opera') {
	isOpera = true;
	isFirstUseMultyCusor = false;
} else if (navigator.appName.indexOf("MSIE 9"))
	isIE9 = true;

if (typeof XMLHttpRequest == "undefined") {
	XMLHttpRequest = function() {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) {
		}
		;

		try {
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} catch (e) {
		}
		;

		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
		}
		;

		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
		}
		;

		throw new Error("This browser does not support XMLHttpRequest or XMLHTTP.");
	};
};

if (typeof (document.importNode) == "undefined") {
	document.importNode = function(node, deep) {
		var tmp;
		if (node.nodeName == "#text") {
			return document.createTextNode(node.data);
		} else {
			if (node.nodeName == "tbody" || node.nodeName == "tr") {
				tmp = document.createElement("table");
			} else if (node.nodeName == "td") {
				tmp = document.createElement("tr");
			} else if (node.nodeName == "option") {
				tmp = document.createElement("select");
			} else {
				tmp = document.createElement("div");
			}

			if (deep) {
				tmp.innerHTML = node.xml ? node.xml : node.outerHTML;
			} else {
				tmp.innerHTML = node.xml ? node.cloneNode(false).xml : node.cloneNode(false).outerHTML;
			}

			return tmp.getElementsByTagName("*")[0];
		}
	};
};

var sessionKey = [ , , , , , , , , , , , , , , , ];
var sessionKeyCRT = [ , , , , , , , , , , , , , , , ];
var transkeyUuid;
var transkeyUuidForCRT;
function generateSessionKey(url) {

	transkeyUuid = new GenKey().tk_sh1prng();

	if (rsaKey == null) {
		var request = new XMLHttpRequest();
		request.open("POST", url + "?op=getPublicRsaKey", false);
		request.send();

		if (request.readyState == 4 && request.status == 200) {
			rsaKey = new RSAKeyPair(request.responseText.split('||')[0], "", request.responseText.split('||')[1]);
		}
	}
	
	
	var genSessionKey = new GenKey().GenerateKey(128);

	for ( var i = 0; i < 16; i++) {
		sessionKey[i] = Number("0x0" + genSessionKey.charAt(i));
	}

	var encSessionKey = encryptedString(rsaKey, genSessionKey);
	
	var operation = "setSessionKey";
	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	try {
		request.send("op=" + operation + "&key=" + encSessionKey + "&transkeyUuid=" + transkeyUuid);
	} catch (e) {
		alert("TransKey error: Cannot load TransKey. Network is not available.");
		return false;
	}
}

function generateSessionKeyForCRT(url) {

	transkeyUuidForCRT = new GenKey().tk_sh1prng();

	if (rsaKey == null) {
		var request = new XMLHttpRequest();
		request.open("POST", url + "?op=getPublicRsaKey", false);
		request.send();

		if (request.readyState == 4 && request.status == 200) {
			rsaKey = new RSAKeyPair(request.responseText.split('||')[0], "", request.responseText.split('||')[1]);
		}
	}

	var genSessionKey = new GenKey().GenerateKey(128);

	for ( var i = 0; i < 16; i++) {
		sessionKeyCRT[i] = Number("0x0" + genSessionKey.charAt(i));
	}

	var encSessionKey = encryptedString(rsaKey, genSessionKey);
	
	var operation = "setSessionKey";
	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	try {
		request.send("op=" + operation + "&key=" + encSessionKey + "&transkeyUuid=" + transkeyUuidForCRT);
	} catch (e) {
		alert("TransKey error: Cannot load TransKey. Network is not available.");
		return false;
	}
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
		var hits = 0;
		var lastx = this.xpoints[this.npoints - 1];
		var lasty = this.ypoints[this.npoints - 1];
		var curx = 0;
		var cury = 0;
		for ( var i = 0; i < this.npoints; lastx = curx, lasty = cury, i++) {
			curx = this.xpoints[i];
			cury = this.ypoints[i];
			if (cury == lasty) {
				continue;
			}
			var leftx = 0;
			if (curx < lastx) {
				if (x >= lastx) {
					continue;
				}
				leftx = curx;
			} else {
				if (x >= curx) {
					continue;
				}
				leftx = lastx;
			}

			var test1 = 0;
			var test2 = 0;
			if (cury < lasty) {
				if (y < cury || y >= lasty) {
					continue;
				}
				if (x < leftx) {
					hits++;
					continue;
				}
				test1 = x - curx;
				test2 = y - cury;
			} else {
				if (y < lasty || y >= cury) {
					continue;
				}
				if (x < leftx) {
					hits++;
					continue;
				}
				test1 = x - lastx;
				test2 = y - lasty;
			}
			if (test1 < (test2 / (lasty - cury) * (lastx - curx))) {
				hits++;
			}
		}
		return ((hits & 1) != 0);
	};
};

function Popup(xpoints, ypoints, url, options) {
	this.xpoints = xpoints;
	this.ypoints = ypoints;
	this.url = url;
	this.options = options;
	this.contains = function(x, y) {
		var key = new Key();
		key.npoints = Math.min(xpoints.length, ypoints.length);
		key.xpoints = this.xpoints;
		key.ypoints = this.ypoints;
		return key.contains(x, y);
	};
	this.popup = function() {
		window.open(url, "_blank", options);
	};
};

function blurLayout(name) {
	if(transKeyObj==null)
		return;
	
	var layerLowerDivObj, layerUpperDivObj, layerSingleDivObj;
	layerLowerDivObj = document.getElementById(name + '_layoutLower');
	layerUpperDivObj = document.getElementById(name + '_layoutUpper');
	layerSingleDivObj = document.getElementById(name + '_layoutSingle');
	var fakeMouseDivObj, visibleFakeMouse;
	fakeMouseDivObj = document.getElementById(name + '_fakeMouseDiv');

	// no:103
	if (fakeMouseDivObj != null && fakeMouseDivObj.style.visibility == "hidden") {
		if (this.isMultiCusorClick) {
			visibleFakeMouse = true;
		} else {
			visibleFakeMouse = false;
		}
	} else {
		visibleFakeMouse = true;
	}

//	document.getElementById(name + '_btnClickDiv').style.visibility = "hidden";
//	document.getElementById(name + '_fakeBtnClickDiv').style.visibility = "hidden";
	var blankOverDivObj;
	var blankOverChromeDivObj;
	blankOverDivObj = document.getElementById(name + '_blankOverDiv');
	blankOverChromeDivObj = document.getElementById(name + '_blankOverChromeDiv');

	if (visibleFakeMouse) {
		if (layerLowerDivObj != null && layerLowerDivObj.style.visibility == "visible") {
			if (layerLowerDivObj.filters)
				layerLowerDivObj.style.filter = "alpha(opacity:" + 50 + ")";
			else
				layerLowerDivObj.style.opacity = 0.5;
		} else if (layerUpperDivObj != null && layerUpperDivObj.style.visibility == "visible") {
			if (layerUpperDivObj.filters)
				layerUpperDivObj.style.filter = "alpha(opacity:" + 50 + ")";
			else
				layerUpperDivObj.style.opacity = 0.5;
		} else if (layerSingleDivObj != null && layerSingleDivObj.style.visibility == "visible") {
			if (layerSingleDivObj.filters)
				layerSingleDivObj.style.filter = "alpha(opacity:" + 50 + ")";
			else
				layerSingleDivObj.style.opacity = 0.5;
		}

		if (isChrome == true) {
			blankOverChromeDivObj.style.visibility = "visible";
			blankOverChromeDivObj.style.zIndex = "1011";
		} else {
			blankOverDivObj.style.visibility = "visible";
			blankOverDivObj.style.zIndex = "1011";
		}

//		document.getElementById(name + '_btnClickDiv').style.visibility = "hidden";
//		document.getElementById(name + '_fakeBtnClickDiv').style.visibility = "hidden";
	}
}


var transKeyObj = null;
function TransKey(name, x, y, url, keyboardType, maxSize, fieldType, inputObject, opt) {
	if(opt==undefined)
		opt=new Array();
	var _d = document;
	this.name = name;
	this.x = x;
	this.y = y;
	this.url = url;
	this.keyboardType = keyboardType;
	this.maxSize = maxSize;
	this.fieldType = fieldType;
	this.keys = new Array();
	this.popup = null;
	this.isDisabled = false;
	this.isMousePressed = false;
	this.isPressed = false;
	this.jg = null;
	this.layoutLower = null;
	this.layoutUpper = null;
	this.layoutSingle = null;
	this.blankDivObj = null;
	this.blankOverDivObj = null;
	this.blankChromeDivObj = null;
	this.blankOverChromeDivObj = null;
	this.osMouseDivObj = null;
	this.fakeMouseDivObj = null;
	this.btnClickDivObj = null;
	this.fakeBtnClickDivObj = null;
	this.mouseOneDivObj = null;
	this.mouseTwoDivObj = null;
	this.indexDivObj = null;
	this.indexCloseDivObj = null;
	this.useTransKey = useTransKey;
	this.selectIMG = "0";
	this.isCrt = keyboardType;
	this.setTkEvent = setTkEvent;
	if(this.isCrt == "qwerty_crt"||this.isCrt == "number_crt")
    	this.useTransKey = true;// 2013.12.10 공인인증서에서 가상키패드 default 사용
	if(this.isCrt == "qwerty_crt"||this.isCrt == "number_crt")
	this.setTkEvent = setTkEvent_crt;
	this.syncDmFld = opt.syncDmFld==undefined?"":opt.syncDmFld;
		
	this.input = inputObject;
	if(inputObject == null){
		_d.getElementById(this.name).getElementsByTagName("input")[0].id = this.name+"_input";
		this.input = _d.getElementById(this.name).getElementsByTagName("input")[0];	
	}
	
	if(this.setTkEvent==true){
		var obj = _d.getElementById(this.input.id);
		var addEvent;
		var attachEvent;
		if(this.isCrt == "qwerty_crt"||this.isCrt == "number_crt"){							
			addEvent = "click";
			attachEvent = "onclick";
			obj.readOnly="true"; // 2013.12.11 가상키패드 readOnly 처리 
		}else{
			addEvent = "focus";
			attachEvent = "onfocus";
		}
		if (obj.addEventListener) {
			obj.addEventListener(addEvent, showTransKey, false);
		} else if (obj.attachEvent) {
			obj.attachEvent(attachEvent, showTransKey);
		}
		
	} 


	this.isMultiCusorClick = false;
	this.load = function(operation) {
		if (typeof (operation) == "undefined")
			operation = "load";

		var transkey = this;
		var request = new XMLHttpRequest();
		request.open("POST", url, false);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		try {
			if (this.keyboardType == 'qwerty_crt'||this.keyboardType == 'number_crt') {
				if(operation=="allocate"){
					if(this.keyboardType == 'qwerty_crt')
						this.keyboardType = 'qwerty';
					else if(this.keyboardType == 'number_crt')
						this.keyboardType = 'number';
					request.send("op=" + operation + "&name=" + this.name + "&keyboardType=" + keyboardType + "&fieldType=" + this.fieldType + "&maxSize=" + this.maxSize + "&x=" + this.x + "&y=" + this.y
							+ "&transkeyUuid=" + transkeyUuidForCRT );
				}else{
					request.send("op=" + operation + "&name=" + this.name + "&keyboardType=" + keyboardType + "&fieldType=" + this.fieldType + "&maxSize=" + this.maxSize + "&x=" + this.x + "&y=" + this.y
							+ "&transkeyUuid=" + transkeyUuidForCRT );
					
				}
			}else{
				request.send("op=" + operation + "&name=" + this.name + "&keyboardType=" + keyboardType + "&fieldType=" + this.fieldType + "&maxSize=" + this.maxSize + "&x=" + this.x + "&y=" + this.y
						+ "&transkeyUuid=" + transkeyUuid );
			}

		} catch (e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}

		if (request.readyState == 4 && request.status == 200) {
			if (request.responseXML) {
				var template = document.getElementById(transkey.name);
				var result = request.responseXML.firstChild;
				if(result==null){ 
					$("#"+transkey.name+"_checkbox").attr("disabled",true);
					return false;
				}
				for ( var i = 0; i < result.childNodes.length; i++) {
					var node = result.childNodes[i];
					if (node.tagName == "script") {
						for ( var j = 0; j < node.childNodes.length; j++) {
							eval(node.childNodes[j].nodeValue);
						}
					}else if(node.tagName == "input"){
						var tmp = document.createElement(node.tagName);
						for(var k=0; node.attributes.length>k; k++){
							tmp.setAttribute(node.attributes[k].name, node.attributes[k].value);
						}
						template.appendChild(tmp);
					} else {
						var tmp, tmp2;
						try {
							tmp2 = document.importNode(node, true);
						} catch (e) {
							if (node.nodeName == "#text") {
								return document.createTextNode(node.data);
							} else {
								if (node.nodeName == "tbody" || node.nodeName == "tr") {
									tmp2 = document.createElement("table");
								} else if (node.nodeName == "td") {
									tmp2 = document.createElement("tr");
								} else if (node.nodeName == "option") {
									tmp2 = document.createElement("select");
								} else {
									tmp2 = document.createElement("div");
								}
								if (true) {
									tmp2.innerHTML = node.xml ? node.xml : node.outerHTML;
								} else {
									tmp2.innerHTML = node.xml ? node.cloneNode(false).xml : node.cloneNode(false).outerHTML;
								}
								tmp2 = tmp2.getElementsByTagName("*")[0];
							}
						}											
							tmp = document.createElement(node.tagName);							
							tmp.appendChild(tmp2);
							tmp.innerHTML = tmp.innerHTML;
							template.appendChild(tmp.firstChild);
					}
				}
			}else{
				$("#"+transkey.name+"_checkbox").attr("disabled",true);
				return false;
			}

			if((this.isCrt == "qwerty"||this.isCrt == "number")&&selectIMG=="1"){
				this.addButton();
			}
			if((this.isCrt == "qwerty_crt"||this.isCrt == "number_crt")&&selectIMG_crt=="1"){
				this.addButton();
			}
			return true;
		} else {
			location.href = transkeyErrorUrl;
			// return false;
		}

	};

	this.setVisible = function(isVisible, bVisible) {
		if (this.isDisabled == true)
			return;

		if (isVisible != false) {
			if (transKeyObj != null) {
				transKeyObj.setVisible(false, "temp");
				transKeyObj.setMode(false);
			}
			transKeyObj = this;
		}

		this.blankDivObj = document.getElementById(this.name + "_blankDiv");
		this.blankOverDivObj = document.getElementById(this.name + "_blankOverDiv");
		this.osMouseDivObj = document.getElementById(this.name + "_osMouseDiv");
		this.fakeMouseDivObj = document.getElementById(this.name + "_fakeMouseDiv");
//		this.btnClickDivObj = document.getElementById(this.name + "_btnClickDiv");
//		this.fakeBtnClickDivObj = document.getElementById(this.name + "_fakeBtnClickDiv");

		if (isVisible == "callIndex") {
			this.mouseOneDivObj = document.getElementById(this.name + "_mouseOneDiv");
			this.mouseTwoDivObj = document.getElementById(this.name + "_mouseTwoDiv");
			this.indexDivObj = document.getElementById(this.name + '_indexDiv');
			this.indexCloseDivObj = document.getElementById(this.name + '_indexCloseDiv');

			if (bVisible == "true") {
				this.indexDivObj.style.visibility = "visible";
				this.mouseOneDivObj.style.visibility = "visible";
				this.mouseTwoDivObj.style.visibility = "visible";
				this.indexCloseDivObj.style.visibility = "visible";
				this.indexDivObj.style.zIndex = "1";
				this.mouseOneDivObj.style.zIndex = "2";
				this.mouseTwoDivObj.style.zIndex = "3";
				this.indexCloseDivObj.style.zIndex = "4";
			} else {
				this.indexDivObj.style.visibility = "hidden";
				this.mouseOneDivObj.style.visibility = "hidden";
				this.mouseTwoDivObj.style.visibility = "hidden";
				this.indexCloseDivObj.style.visibility = "hidden";
			}
		} else if (isVisible) {

			this.setPosition(this.x, this.y);
			
			var kbd = this.isCrt;
			

			if (this.layoutLower == null && this.layoutUpper == null && this.layoutSingle == null) {
				this.load("allocate");
				this.layoutLower = document.getElementById(this.name + "_layoutLower");
				this.layoutUpper = document.getElementById(this.name + "_layoutUpper");
				this.layoutSingle = document.getElementById(this.name + "_layoutSingle");
				this.singleMouseTypeDivObj = document.getElementById(this.name + "_singleMouseTypeDiv");
				this.multiMouseTypeDivObj = document.getElementById(this.name + "_multiMouseTypeDiv");
				
				if (this.layoutLower != null && this.layoutUpper != null) {
					if(kbd == "qwerty_crt"){
						this.layoutLower.getElementsByTagName("img")[0].src = url + "?op=lowerLayout&name=" + this.name + "&dummy=" + new GenKey().tk_getrnd_int() + "&transkeyUuid=" + transkeyUuidForCRT;
						this.layoutUpper.getElementsByTagName("img")[0].src = url + "?op=upperLayout&name=" + this.name + "&dummy=" + new GenKey().tk_getrnd_int() + "&transkeyUuid=" + transkeyUuidForCRT;
					}else{
						this.layoutLower.getElementsByTagName("img")[0].src = url + "?op=lowerLayout&name=" + this.name + "&dummy=" + new GenKey().tk_getrnd_int() + "&transkeyUuid=" + transkeyUuid;
						this.layoutUpper.getElementsByTagName("img")[0].src = url + "?op=upperLayout&name=" + this.name + "&dummy=" + new GenKey().tk_getrnd_int() + "&transkeyUuid=" + transkeyUuid;
					}
				} else if (this.layoutSingle != null) {
					if(kbd == "number_crt")
						this.layoutSingle.getElementsByTagName("img")[0].src = url + "?op=singleLayout&name=" + this.name + "&dummy=" + new GenKey().tk_getrnd_int() + "&transkeyUuid=" + transkeyUuidForCRT;
					else
						this.layoutSingle.getElementsByTagName("img")[0].src = url + "?op=singleLayout&name=" + this.name + "&dummy=" + new GenKey().tk_getrnd_int() + "&transkeyUuid=" + transkeyUuid;
				} else {
					alert("TransKey error: Cannot initialize virtual keyboard's layout.\nLayout count is " + subLayouts.length);
					return;
				}
			}

			// Clear jg
			if (this.jg != null)
				this.jg.clear();

			// Set layout's visibility
			if (this.layoutLower != null && this.layoutUpper != null) {
				this.layoutLower.style.visibility = "visible";
				if (navigator.appName == 'Opera') {
					this.multiMouseTypeDivObj.style.visibility = "hidden";
				} else {
					this.multiMouseTypeDivObj.style.visibility = "visible";
				}
				this.multiMouseTypeDivObj.style.zIndex = "1011";
				this.layoutLower.style.zIndex = "1009";
				// ************************************************//
				this.layoutLower.style.cursor = "default";
				this.multiMouseTypeDivObj.style.cursor = "default";
				// ************************************************//
				if (this.layoutLower.filters)
					this.layoutLower.style.filter = "alpha(opacity:" + 100 + ")";
				else
					this.layoutLower.style.opacity = 1.0;

				this.layoutUpper.style.visibility = "hidden";
//				this.btnClickDivObj.style.visibility = "hidden";
//				this.fakeBtnClickDivObj.style.visibility = "hidden";
				this.jg = new jsGraphics(this.layoutLower);

				if (isChrome == true) {
					this.blankChromeDivObj = document.getElementById(this.name + "_blankChromeDiv");
					this.blankChromeDivObj.style.visibility = "visible";
					this.blankChromeDivObj.style.zIndex = "1";
					// ************************************************//
					this.blankChromeDivObj.style.cursor = "default";
					// ************************************************//
				} else {
					this.blankDivObj = document.getElementById(this.name + "_blankDiv");
					if (navigator.appName == 'Opera') {
						this.blankDivObj.style.visibility = "hidden";
					} else {
						this.blankDivObj.style.visibility = "visible";
					}

					this.blankDivObj.style.zIndex = "1";
					// ************************************************//
					this.blankDivObj.style.cursor = "default";
					// ************************************************//
				}

			} else if (this.layoutSingle != null) {
				this.layoutSingle.style.visibility = "visible";
				if (navigator.appName == 'Opera') {
					this.multiMouseTypeDivObj.style.visibility = "hidden";
				} else {
					this.multiMouseTypeDivObj.style.visibility = "visible";
				}
				this.multiMouseTypeDivObj.style.zIndex = "1011";
				this.layoutSingle.style.zIndex = "1009";
				// ************************************************//
				this.layoutSingle.style.cursor = "default";
				this.multiMouseTypeDivObj.style.cursor = "default";
				// ************************************************//

				if (this.layoutSingle.filters)
					this.layoutSingle.style.filter = "alpha(opacity:" + 100 + ")";
				else
					this.layoutSingle.style.opacity = 1.0;

//				this.jg = new jsGraphics(this.layoutSingle);

				if (isChrome == true) {
					this.blankChromeDivObj = document.getElementById(this.name + "_blankChromeDiv");
					this.blankChromeDivObj.style.visibility = "visible";
					this.blankChromeDivObj.style.zIndex = "1";
					// ************************************************//
					this.blankChromeDivObj.style.cursor = "default";
					// ************************************************//
				} else {
					this.blankDivObj = document.getElementById(this.name + "_blankDiv");
					if (navigator.appName == 'Opera') {
						this.blankDivObj.style.visibility = "hidden";
					} else {
						this.blankDivObj.style.visibility = "visible";
					}
					this.blankDivObj.style.zIndex = "1";
					// ************************************************//
					this.blankDivObj.style.cursor = "default";
					// ************************************************//
				}
			}
			this.setMode(true);
		} else {
			this.layout = document.getElementById(this.name + "_layout");
			if (navigator.appName == "Opera") {
				this.layout.style.position = "";
			}
			if (this.layoutLower != null && this.layoutUpper != null) {
				this.layoutLower.style.visibility = "hidden";
				this.layoutUpper.style.visibility = "hidden";
				if (isChrome == true) {
					this.blankOverChromeDivObj = document.getElementById(this.name + "_blankOverChromeDiv");
					this.blankChromeDivObj.style.visibility = "hidden";
					this.blankOverChromeDivObj.style.visibility = "hidden";
				} else {
					this.blankDivObj.style.visibility = "hidden";
					this.blankOverDivObj.style.visibility = "hidden";
				}

				this.osMouseDivObj.style.visibility = "hidden";
				this.fakeMouseDivObj.style.visibility = "hidden";
//				this.btnClickDivObj.style.visibility = "hidden";
//				this.fakeBtnClickDivObj.style.visibility = "hidden";
				this.singleMouseTypeDivObj.style.visibility = "hidden";
				this.multiMouseTypeDivObj.style.visibility = "hidden";
			} else if (this.layoutSingle != null) {
				this.layoutSingle.style.visibility = "hidden";
				if (isChrome == true) {
					this.blankOverChromeDivObj = document.getElementById(this.name + "_blankOverChromeDiv");
					this.blankChromeDivObj.style.visibility = "hidden";
					this.blankOverChromeDivObj.style.visibility = "hidden";
				} else {
					this.blankDivObj.style.visibility = "hidden";
					this.blankOverDivObj.style.visibility = "hidden";
				}

				this.osMouseDivObj.style.visibility = "hidden";
				this.fakeMouseDivObj.style.visibility = "hidden";
//				this.btnClickDivObj.style.visibility = "hidden";
//				this.fakeBtnClickDivObj.style.visibility = "hidden";
				this.singleMouseTypeDivObj.style.visibility = "hidden";
				this.multiMouseTypeDivObj.style.visibility = "hidden";
			} else if (this.mouseOneDivObj != null && this.mouseTwoDivObj != null) {
				this.mouseOneDivObj.style.visibility = "hidden";
				this.mouseTwoDivObj.style.visibility = "hidden";
				this.indexDivObj.style.visibility = "hidden";
				this.indexCloseDivObj.style.visibility = "hidden";
				this.mouseOneDivObj = null;
				this.mouseTwoDivObj = null;
				this.indexDivObj = null;
				this.indexCloseDivObj = null;
			}
		}
		this.isMousePressed = false;
	};

	this.getKey = function(x, y) {
		for ( var i = 0; i < this.keys.length; i++) {
			if (this.keys[i].contains(x, y)) {
				return this.keys[i];
			}
		}
		return null;
	};

	this.pressKey = function(event) {

		this.isMousePressed = true;
		var x = 0;
		var y = 0;
		// TODO: overflow hidden ?덉쇅 援щЦ
		if (event.offsetX != null || event.offsetY != null) {
			x = event.offsetX + 1;
			y = event.offsetY + 1;
		} else if (event.layerX != null || event.layerY != null) {
			x = event.layerX - 2;
			y = event.layerY - 2;
		}

		var key = this.getKey(x, y);
		if (key != null) {
			var applyOpacity = false;
			if (this.keyboardType == 'qwerty') {
				var layerLowerDivObj, layerUpperDivObj;
				layerLowerDivObj = document.getElementById(this.name + '_layoutLower');
				layerUpperDivObj = document.getElementById(this.name + '_layoutUpper');
				var fakeMouseDivObj, visibleFakeMouse;
				fakeMouseDivObj = document.getElementById(this.name + '_fakeMouseDiv');
				if (fakeMouseDivObj.style.visibility == "hidden") {
					visibleFakeMouse = false;
				}

				if (layerLowerDivObj.style.visibility == "visible") {
					if (layerLowerDivObj.filters) {
						if (layerLowerDivObj.style.filter == "alpha(opacity:" + 50 + ")") {
							applyOpacity = true;
						}
					} else {
						if (layerLowerDivObj.style.opacity == 0.5) {
							applyOpacity = true;
						}
					}
				} else {
					if (layerUpperDivObj.filters) {
						if (layerUpperDivObj.style.filter == "alpha(opacity:" + 50 + ")") {
							applyOpacity = true;
						}
					} else {
						if (layerUpperDivObj.style.opacity == 0.5) {
							applyOpacity = true;
						}
					}
				}
			} else {
				var layerSingleDivObj;
				layerSingleDivObj = document.getElementById(this.name + '_layoutSingle');
				var fakeMouseDivObj, visibleFakeMouse;
				fakeMouseDivObj = document.getElementById(this.name + '_fakeMouseDiv');

				if (fakeMouseDivObj.style.visibility == "hidden") {
					visibleFakeMouse = false;
				}
				if (layerSingleDivObj.filters) {
					if (layerSingleDivObj.style.filter == "alpha(opacity:" + 50 + ")") {
						applyOpacity = true;
					}
				} else {
					if (layerSingleDivObj.style.opacity == 0.5) {
						applyOpacity = true;
					}
				}
			}

			if (key.name == "backspace" || key.name == "caps" || key.name == "close" || applyOpacity == true) {

			} else {
				this.isPressed = true;
			}
		}
	};

	this.LButtonUp = function(event) {
		this.isMousePressed = false;
	};

	this.releaseKey = function(event) {
		if (this.isPressed) {
			this.isPressed = false;
			if (this.jg != null) {
				setTimeout(function() {
					this.blurLayout(name);
				}, 100);
			}
		}
	};

	this.enterKey = function(event) {
		var x = 0;
		var y = 0;
		// TODO: overflow hidden 
		if (event.offsetX != null || event.offsetY != null) {
			x = event.offsetX + 1;
			y = event.offsetY + 1;
		} else if (event.layerX != null || event.layerY != null) {
			x = event.layerX - 2;
			y = event.layerY - 2;
		}
			x = parseInt(x);		
      y = parseInt(y); //IE10
            
		var applyOpacity = false;
		if (this.keyboardType == 'qwerty') {
			var layerLowerDivObj, layerUpperDivObj;
			layerLowerDivObj = document.getElementById(this.name + '_layoutLower');
			layerUpperDivObj = document.getElementById(this.name + '_layoutUpper');
			if (layerLowerDivObj.style.visibility == "visible") {
				if (layerLowerDivObj.filters) {
					if (layerLowerDivObj.style.filter == "alpha(opacity:" + 50 + ")") {
						applyOpacity = true;
					}
				} else {
					if (layerLowerDivObj.style.opacity == 0.5) {
						applyOpacity = true;
					}
				}
			} else {
				if (layerUpperDivObj.filters) {
					if (layerUpperDivObj.style.filter == "alpha(opacity:" + 50 + ")") {
						applyOpacity = true;
					}
				} else {
					if (layerUpperDivObj.style.opacity == 0.5) {
						applyOpacity = true;
					}
				}
			}
		} else {
			var layerSingleDivObj;
			layerSingleDivObj = document.getElementById(this.name + '_layoutSingle');
			if (layerSingleDivObj.filters) {
				if (layerSingleDivObj.style.filter == "alpha(opacity:" + 50 + ")") {
					applyOpacity = true;
				}
			} else {
				if (layerSingleDivObj.style.opacity == 0.5) {
					applyOpacity = true;
				}
			}
		}

		var key = this.getKey(x, y);
		if (key != null) {
			if (!applyOpacity) {
				if (key.name == "backspace") {
					if (this.syncDmFld) {
							if(document.getElementById(this.syncDmFld).length == 2) {
								document.getElementById(this.syncDmFld).value = "0";
							} else {
								document.getElementById(this.syncDmFld).value = "";
							}
					}
					this.backspace();
				} else if (key.name == "clear") {
					this.clear();
				} else if (key.name == "caps") {
					this.caps();
				} else if (key.name == "close") {
					this.close();
					
					if(this.input.getAttribute("kbd")=="qwerty_crt"||this.input.getAttribute("kbd")=="number_crt"){
						
						if(this.keyboardType == "qwerty"){
							if (this.onCompleteClose () == false)
							{
								return false;
								}
						}else if(this.keyboardType == "number"){
							if (this.onCompleteClose () == false)
							{
								return false;
								}
						}
					}
				} else if (key.name == "directType") {
					this.directType();
					if (event.preventDefault)
						event.preventDefault();
					if (event.stopPropagation)
						event.stopPropagation();

					event.returnValue = false;
					event.cancelBubble = true;
					return;
				} else if (key.name == "enter") {
					var encSubmit = this.input.getAttribute("encSubmit");
					if (encSubmit != null) {
						eval(encSubmit);
					} else {
						this.close();
					}
				} else if (key.name == "crtenter") {
					
					this.close();
					
					if(this.keyboardType == "qwerty"){
						if (this.onCompleteInput () == false)
						{
							return false;
							}
					}else if(this.keyboardType == "number"){
						if (this.onCompleteClose () == false)
						{
							return false;
							}
					}
					
					transKeyObj = null;
					
					
					
				} else {

					var input = _d.getElementById(this.input.id);
//					var getName = document.getElementById(this.name);
					if(this.fieldType == 'text'){
						if(isPlainTextMode == '1'){
							input.value = input.value + this.dummy(input.value);
						}
						
					}else{
						input.value = input.value + this.dummy(input.value);
					}

					var hidden = document.getElementById("transkey_" + this.name);
					var geo;
					if (this.layoutLower != null && this.layoutLower.style.visibility == "visible")
						geo = "l " + x + " " + y;
					else if (this.layoutUpper != null && this.layoutUpper.style.visibility == "visible")
						geo = "u " + x + " " + y;
					else
						geo = x + " " + y;
//					this.input = document.getElementById(this.name + "_input");
					
					var encrypted;
					
					if(this.isCrt=="qwerty_crt"||this.isCrt=="number_crt")
						encrypted = SeedEnc(geo, sessionKeyCRT);
					else
					    encrypted = SeedEnc(geo, sessionKey);
					hidden.value += " " + encrypted;
					this.onEnter(input.value.length - 1, encrypted);

					if (input.value.length >= maxSize) {
						this.close();
						return;
					}
				}
			}

			var userAgent = navigator.userAgent;
			if ((userAgent.indexOf('Linux') > -1 || userAgent.indexOf('Mac') > -1) && userAgent.indexOf('Chrome') > -1)
				this.releaseKey();
		} else {
			if (this.popup != null && this.popup.contains(x, y))
				this.popup.popup();
			else
				this.onClick(x, y);
		}
	};

	// ===================================================================================//
	function SeedEnc(geo, ssKey) {
		var iv = [ 0x4d, 0x6f, 0x62, 0x69, 0x6c, 0x65, 0x54, 0x72, 0x61, 0x6e, 0x73, 0x4b, 0x65, 0x79, 0x31, 0x30 ]; // "MobileTransKey10"
		var inData = new Array(16);
		var outData = new Array(16);
		var roundKey = new Array(32);
		var plainData = new Array(16);

		for ( var i = 0; i < geo.length; i++) {
			if (geo.charAt(i) == "l" || geo.charAt(i) == "u") {
				inData[i] = Number(geo.charCodeAt(i));
				continue;
			} else if (geo.charAt(i) == " ") {
				inData[i] = Number(geo.charCodeAt(i));
				continue;
			}
			inData[i] = Number(geo.charAt(i)).toString(16);
		}
		inData[geo.length] = 32; // " "
		inData[geo.length + 1] = 101; // e
		Seed.SeedSetKey(roundKey, ssKey);
		Seed.SeedEncryptCbc(roundKey, iv, inData, 16, outData);

		var encodedData = new Array(16);
		for ( var i = 0; i < 16; i++) {
			encodedData[i] = Number(outData[i]).toString(16);
		}

		return encodedData;
	}
	// ===================================================================================//

	this.backspace = function() {
		var input = _d.getElementById(this.input.id);
		input.value = input.value.substring(0, input.value.length - 1);

		var hidden = _d.getElementById("transkey_" + this.name);
		var pos = hidden.value.lastIndexOf(' ');
		hidden.value = hidden.value.substring(0, pos);
		this.onBackspace(input.value.length);
	};

	this.directType = function() {
		var inpObj = _d.getElementById(this.input.id);
		this.isDisabled = true;
		this.clear();
		this.close();
		transKeyObj = null;
		inpObj.value = "";
		if (inpObj.setActive)
			inpObj.setActive();
		else
			inpObj.focus();
	};

	this.clear = function() {
		var inputObj = _d.getElementById(this.input.id);
		inputObj.value = "";
		var hidden = _d.getElementById("transkey_" + this.name);
		if(hidden!=null)
			hidden.value = "";
		this.onClear();
	};

	this.caps = function() {
		if (this.layoutLower.style.visibility == "visible") {
			this.layoutLower.style.visibility = "hidden";
			this.layoutUpper.style.visibility = "visible";
			this.layoutUpper.style.zIndex = "1009";
			this.jg.clear();
			this.jg = new jsGraphics(this.layoutUpper);
		} else {
			this.layoutLower.style.visibility = "visible";
			this.layoutUpper.style.visibility = "hidden";
			this.layoutLower.style.zIndex = "1009";
			this.jg.clear();
			this.jg = new jsGraphics(this.layoutLower);
		}

		if (isChrome == true) {
			var blankChromeDivObj = document.getElementById(this.name + "_blankChromeDiv");
			blankChromeDivObj.style.zIndex = "1";
		}
	};

	this.close = function() {
		
		if(this.selectIMG=="1"){
			var el = document.getElementById(this.name+'_toggle'); 
			el.src = transkey_url+'/images/btn_m_mouse.gif'; 
		}

		this.layout = document.getElementById(this.name + "_layout");
		if (navigator.appName == "Opera") {
			this.layout.style.position = "";
		}

		transKeyObj = null;
		this.blankDivObj = document.getElementById(this.name + "_blankDiv");
		this.blankOverDivObj = document.getElementById(this.name + "_blankOverDiv");
		this.blankChromeDivObj = document.getElementById(this.name + "_blankChromeDiv");
		this.blankOverChromeDivObj = document.getElementById(this.name + "_blankOverChromeDiv");

		if (this.layoutLower != null && this.layoutUpper != null) {
			this.setMouseInfo(null, 'normalMouse');
			this.layoutLower.style.visibility = "hidden";
			this.layoutUpper.style.visibility = "hidden";

			if (isChrome == true) {
				this.blankChromeDivObj.style.visibility = "hidden";
				this.blankOverChromeDivObj.style.visibility = "hidden";
			} else {
				this.blankDivObj.style.visibility = "hidden";
				this.blankOverDivObj.style.visibility = "hidden";
			}
			this.osMouseDivObj.style.visibility = "hidden";
			this.fakeMouseDivObj.style.visibility = "hidden";
//			this.btnClickDivObj.style.visibility = "hidden";
//			this.fakeBtnClickDivObj.style.visibility = "hidden";
			this.singleMouseTypeDivObj.style.visibility = "hidden";
			this.multiMouseTypeDivObj.style.visibility = "hidden";

			this.layoutLower = null;
			this.layoutUpper = null;

			if (isChrome == true) {
				this.blankChromeDivObj = null;
				this.blankOverChromeDivObj = null;
			} else {
				this.blankDivObj = null;
				this.blankOverDivObj = null;
			}
			this.osMouseDivObj = null;
			this.fakeMouseDivObj = null;
			
//			this.btnClickDivObj = null;
//			this.fakeBtnClickDivObj = null;
		} else if (this.layoutSingle != null) {
			this.layoutSingle.style.visibility = "hidden";
			if (isChrome == true) {
				this.blankChromeDivObj.style.visibility = "hidden";
				this.blankOverChromeDivObj.style.visibility = "hidden";
			} else {
				this.blankDivObj.style.visibility = "hidden";
				this.blankOverDivObj.style.visibility = "hidden";
			}

			this.osMouseDivObj.style.visibility = "hidden";
			this.fakeMouseDivObj.style.visibility = "hidden";
//			this.btnClickDivObj.style.visibility = "hidden";
//			this.fakeBtnClickDivObj.style.visibility = "hidden";
			this.singleMouseTypeDivObj.style.visibility = "hidden";
			this.multiMouseTypeDivObj.style.visibility = "hidden";
			this.layoutSingle = null;
		} else if (this.mouseOneDivObj != null && this.mouseTwoDivObj != null) {
			this.mouseOneDivObj.style.visibility = "hidden";
			this.mouseTwoDivObj.style.visibility = "hidden";
			this.indexDivObj.style.visibility = "hidden";
			this.indexCloseDivObj.style.visibility = "hidden";
			this.mouseOneDivObj = null;
			this.mouseTwoDivObj = null;
			this.indexDivObj = null;
			this.indexCloseDivObj = null;
		}

		if (this.jg != null)
			this.jg.clear();

		this.jg = null;
		this.isMousePressed = false;
//		this.onClose();
		
	};

	this.equals = function(transkey) {
		var request = new XMLHttpRequest();
		request.open("POST", url, false);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send("op=equals&name1=" + this.name + "&value1=" + document.getElementById("transkey_" + this.name).value + "&name2=" + transkey.name + "&value2="
				+ document.getElementById("transkey_" + transkey.name).value + "&transkeyUuid=" + transkeyUuid);
		return request.responseText;
	};
	
	this.getHiddenData = function(){
		return _d.getElementById("transkey_"+this.name).value;
	};

	this.getCipherData = function(xecureRandomData) {
		var aCipher = null;
		var aCipherArray = null;
		var aInputValue = null;
		var encXecureRanData = null;
		var aRequest = null;

		aInputValue = document.getElementById("transkey_" + this.name).value;
		if (aInputValue == null || aInputValue == "") {
			aCipher = "";
			return aCipher;
		}

		encXecureRanData = encryptedString(rsaKey, xecureRandomData);
		
		var sPort = location.port;
		if(sPort.length<=0)
			sPort = '80';

		aRequest = new XMLHttpRequest();
		aRequest.open("POST", url, false);
		aRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		aRequest.send("op=getPlainText&name=" + this.name + "&value=" + aInputValue + "&encXecureRanData=" + encXecureRanData + "&transkeyUuid=" + transkeyUuidForCRT + "&sPort=" + sPort);

		if (aRequest.readyState != 4 || aRequest.status != 200) {
			aCipher = "";
			return aCipher;
		}

		aCipher = aRequest.responseText.replace(/\n/gi, '');
		aCipherArray = aCipher.split(',');

		aCipher = "";
		for ( var i = 0; i < aCipherArray.length - 1; i++) {
			if (aCipherArray[i].length == 1) {
				aCipher += '0';
			}

			aCipher += aCipherArray[i];
		}

		return aCipher;
	};

	this.checkRealMouseOutLayer = function(e, debugMsg) {
		if (debugMsg == 'twin') {
			if (e) {
				var osMouseDivObj = document.getElementById(this.name + '_osMouseDiv');
				if (isFireFox == true) {
					if (((e.layerX + 1) >= qwertyLayerWidth) || (e.layerY >= qwertyLayerHeight)) {
						this.hideAllMouse();
					}
				} else {
					if ((parseInt(osMouseDivObj.style.left) + (e.layerX + 1) >= qwertyLayerWidth) || (parseInt(osMouseDivObj.style.top) + e.layerY >= qwertyLayerHeight)) {
						this.hideAllMouse();
					}
				}
			} else {
				if (((event.x + 1) >= qwertyLayerWidth) || (event.y >= qwertyLayerHeight) || event.y <= 0) {
					this.hideAllMouse();
				}
			}
		} else if (debugMsg == 'single') {
			if (e) {
				var osMouseDivObj = document.getElementById(this.name + '_osMouseDiv');
				if (isFireFox == true) {
					if (((e.layerX + 1) >= singleLayerWidth) || (e.layerY >= singleLayerHeight)) {
						this.hideAllMouse();
					}
				} else {
					if ((parseInt(osMouseDivObj.style.left) + (e.layerX + 1) >= singleLayerWidth) || (parseInt(osMouseDivObj.style.top) + e.layerY >= singleLayerHeight)) {
						this.hideAllMouse();
					}
				}
			} else {
				if (((event.x + 1) >= singleLayerWidth) || (event.y >= singleLayerHeight)) {
					this.hideAllMouse();
				}
			}
		}
	};

	this.visibleLayout = function(event, isBlankOver) {
		if (this.layoutLower != null && this.layoutLower.style.visibility == "visible") {
			if (this.layoutLower.filters)
				this.layoutLower.style.filter = "alpha(opacity:" + 100 + ")";
			else
				this.layoutLower.style.opacity = 1.0;
		} else if (this.layoutUpper != null && this.layoutUpper.style.visibility == "visible") {
			if (this.layoutUpper.filters)
				this.layoutUpper.style.filter = "alpha(opacity:" + 100 + ")";
			else
				this.layoutUpper.style.opacity = 1.0;
		} else {
			if (this.layoutSingle.filters)
				this.layoutSingle.style.filter = "alpha(opacity:" + 100 + ")";
			else
				this.layoutSingle.style.opacity = 1.0;
		}

		var blankOverDivObj = document.getElementById(this.name + "_blankOverDiv");
		var blankOverChromeDivObj = document.getElementById(this.name + "_blankOverChromeDiv");

		if (isChrome == true) {
			if (blankOverChromeDivObj != null && isBlankOver == 'blankOverChromeDiv') {
				blankOverChromeDivObj.style.visibility = "hidden";
			}
		} else {
			if (blankOverDivObj != null && isBlankOver == 'blankOverDiv') {
				blankOverDivObj.style.visibility = "hidden";
			}
		}
	};

	this.setMultiMouse = function(isMultiMouse) {
		if (isMultiMouse) {
			nIsMultiMouse = true;
		} else {
			nIsMultiMouse = false;
		}
	};

	this.setMouseInfo = function(event, isMultiMouse) {
		if (isMultiMouse == 'close') {
			this.setVisible('callIndex', 'false');
			this.onClose();
		} else {
			if (isMultiMouse == 'normalMouse') {
				this.singleMouseTypeDivObj.style.visibility = "hidden";
				if (navigator.appName == 'Opera') {
					this.multiMouseTypeDivObj.style.visibility = "hidden";
				} else {
					this.multiMouseTypeDivObj.style.visibility = "visible";
				}

				this.setMultiMouse(false);

				// **********************//
				this.singleMouseTypeDivObj.style.cursor = "default";
				this.multiMouseTypeDivObj.style.cursor = "default";
				if (isChrome) {
					this.blankChromeDivObj.style.cursor = "default";
					this.blankOverChromeDivObj.style.cursor = "default";
				} else {
					this.blankDivObj.style.cursor = "default";
					this.blankOverDivObj.style.cursor = "default";
				}

				if (this.layoutLower != null || this.layoutUpper != null) {
					this.layoutUpper.style.cursor = "default";
					this.layoutLower.style.cursor = "default";
				} else if (this.layoutSingle != null) {
					this.layoutSingle.style.cursor = "default";
				}
				// **********************//
			} else {
				this.osMouseDivObj = document.getElementById(this.name + '_osMouseDiv');
				this.fakeMouseDivObj = document.getElementById(this.name + '_fakeMouseDiv');
				this.blankDivObj = document.getElementById(this.name + "_blankDiv");
				// *********************************************//
				this.blankOverDivObj = document.getElementById(this.name + "_blankOverDiv");
				// *********************************************//
//				this.btnClickDivObj = document.getElementById(this.name + "_btnClickDiv");
//				this.fakeBtnClickDivObj = document.getElementById(this.name + "_fakeBtnClickDiv");
				if (isOpera == true) {
					alert("Opera can not support using multimouse");
				} else {
					this.multiMouseTypeDivObj.style.visibility = "hidden";
					this.singleMouseTypeDivObj.style.visibility = "visible";
					this.singleMouseTypeDivObj.style.zIndex = "1011";
					this.setMultiMouse(true);
					// **********************//
					if (isChrome) {
						if ((this.layoutLower != null && this.layoutLower.style.visibility == "visible") || (this.layoutUpper != null && this.layoutUpper.style.visibility == "visible")) {
							// if(isMac == true){
							// this.singleMouseTypeDivObj.style.cursor =
							// "url(''),none";
							// this.multiMouseTypeDivObj.style.cursor =
							// "url(''),none";
							// this.blankChromeDivObj.style.cursor =
							// "url(''),none";
							// this.blankOverChromeDivObj.style.cursor =
							// "url(''),none";
							// this.osMouseDivObj.style.cursor = "url(''),none";
							// this.fakeMouseDivObj.style.cursor =
							// "url(''),none";
							// this.btnClickDivObj.style.cursor =
							// "url(''),none";
							// this.fakeBtnClickDivObj.style.cursor =
							// "url(''),none";
							// this.layoutLower.style.cursor = "url(''),none";
							// this.layoutUpper.style.cursor = "url(''),none";
							//
							// //
							// ***************************************************//
							// this.singleMouseTypeDivObj.style.cursor =
							// "url(''),none";
							// //
							// ***************************************************//
							// }else{
							this.singleMouseTypeDivObj.style.cursor = "url(''),none";
							this.multiMouseTypeDivObj.style.cursor = "url(''),none";
							// ***************************************************//
							this.blankChromeDivObj.style.cursor = "url(''),none";
							this.blankOverChromeDivObj = document.getElementById(name + '_blankOverChromeDiv');
							this.blankOverChromeDivObj.style.cursor = "url(''),none";
							// ***************************************************//
							this.osMouseDivObj.style.cursor = "url(''),none";
							this.fakeMouseDivObj.style.cursor = "url(''),none";
//							this.btnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible_ch.gif'),auto";
//							this.fakeBtnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible_ch.gif'),auto";
							this.layoutLower.style.cursor = "url(''),none";
							this.layoutUpper.style.cursor = "url(''),none";
							// ***************************************************//
							this.singleMouseTypeDivObj.style.cursor = "url(''),none";
							// ***************************************************//
							// }
						} else {
							this.singleMouseTypeDivObj.style.cursor = "url(''),none";
							this.multiMouseTypeDivObj.style.cursor = "url(''),none";
							// ***************************************************//
							this.blankChromeDivObj.style.cursor = "url(''),none";
							this.blankOverChromeDivObj = document.getElementById(name + '_blankOverChromeDiv');
							this.blankOverChromeDivObj.style.cursor = "url(''),none";
							// ***************************************************//
							this.osMouseDivObj.style.cursor = "url(''),none";
							this.fakeMouseDivObj.style.cursor = "url(''),none";
//							this.btnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible_ch.gif'),auto";
//							this.fakeBtnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible_ch.gif'),auto";
							this.layoutSingle.style.cursor = "url(''),none";
							// ***************************************************//
							this.singleMouseTypeDivObj.style.cursor = "url(''),none";
							// ***************************************************//
						}
					} else {
						var blankDivObj = document.getElementById(this.name + "_blankDiv");
						if ((this.layoutLower != null && this.layoutLower.style.visibility == "visible") || (this.layoutUpper != null && this.layoutUpper.style.visibility == "visible")) {
							if (isFireFox == true) {
								this.singleMouseTypeDivObj.style.cursor = "url(''),none";
								this.multiMouseTypeDivObj.style.cursor = "url(''),none";
								this.blankDivObj.style.cursor = "url(''),none";
								this.blankOverDivObj.style.cursor = "url(''),none";
								this.osMouseDivObj.style.cursor = "url(''),none";
								this.fakeMouseDivObj.style.cursor = "url(''),none";
//								this.btnClickDivObj.style.cursor = "url(''),none";
//								this.fakeBtnClickDivObj.style.cursor = "url(''),none";
								this.layoutLower.style.cursor = "url(''),none";
								this.layoutUpper.style.cursor = "url(''),none";
							} else if (isSafari == true) {
								this.singleMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.multiMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.blankDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.blankOverDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.osMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.fakeMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
//								this.btnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
//								this.fakeBtnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.layoutLower.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.layoutUpper.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
							} else {
								this.singleMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.multiMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.blankDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.blankOverDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.osMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.fakeMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
//								this.btnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
//								this.fakeBtnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.layoutLower.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.layoutUpper.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
							}
						} else {
							if (isFireFox == true) {
								this.singleMouseTypeDivObj.style.cursor = "url(''),none";
								this.multiMouseTypeDivObj.style.cursor = "url(''),none";
								this.blankDivObj.style.cursor = "url(''),none";
								this.blankOverDivObj.style.cursor = "url(''),none";
								this.osMouseDivObj.style.cursor = "url(''),none";
								this.fakeMouseDivObj.style.cursor = "url(''),none";
//								this.btnClickDivObj.style.cursor = "url(''),none";
//								this.fakeBtnClickDivObj.style.cursor = "url(''),none";
								this.layoutSingle.style.cursor = "url(''),none";
							} else if (isSafari == true) {
								this.singleMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.multiMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.blankDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.blankOverDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.osMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.fakeMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
//								this.btnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
//								this.fakeBtnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
								this.layoutSingle.style.cursor = "url('" + transkey_url + "/images/invisible.gif'),auto";
							} else {
								this.singleMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.multiMouseTypeDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.blankDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.blankOverDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.osMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.fakeMouseDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
//								this.btnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
//								this.fakeBtnClickDivObj.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
								this.layoutSingle.style.cursor = "url('" + transkey_url + "/images/invisible.cur'),auto";
							}
						}
					}
				}
			}
		}
	};

	this.hideAllMouse = function(event, msg) {
		this.osMouseDivObj = document.getElementById(name + '_osMouseDiv');
		this.fakeMouseDivObj = document.getElementById(name + '_fakeMouseDiv');
		this.fakeMouseDivObj.style.visibility = "hidden";
		this.osMouseDivObj.style.visibility = "hidden";
	};

	this.showAllMouse = function(e, debugMsg, keyboardStyle) {
		// console.log(this.osMouseDivObj.style.left+","+this.osMouseDivObj.style.top);
		// TODO:
		if (nIsMultiMouse == true) {
			if ((this.layoutLower != null && this.layoutLower.style.visibility == "visible") || (this.layoutUpper != null && this.layoutUpper.style.visibility == "visible")
					|| (this.layoutSingle != null && this.layoutSingle.style.visibility == "visible")) {
				if (nIsMultiMouse == true) {
					this.osMouseDivObj.style.zIndex = "1010";
					this.fakeMouseDivObj.style.zIndex = "1010";
					this.blankDivObj.style.zIndex = "1011";
					if (e) {

						var pointX = e.offsetX;
						var pointY = e.offsetY;

						if (e.offsetX == null || e.offsetY == null) {
							pointX = e.layerX;
							pointY = e.layerY;
						}

						if (nIsMultiMouse == true) {
							if (debugMsg == 'mouseMoveOnOsMouseDiv') {
								if (isFireFox == true && this.isMousePressed == true) {
								} else {
									if (keyboardStyle == 'twin')
										this.fakeMouseDivObj.style.left = qwertyLayerX + (qwertyLayerX - (parseInt(this.osMouseDivObj.style.left) + pointX)) + 'px'; // 90
									else
										this.fakeMouseDivObj.style.left = singleLayerX + (singleLayerX - (parseInt(this.osMouseDivObj.style.left) + pointX)) + 'px'; // 90

									this.fakeMouseDivObj.style.top = parseInt(this.fakeMouseDivObj.style.top) + pointY + 'px';
									this.fakeMouseDivObj.style.visibility = "visible";
								}
							} else if (debugMsg == 'mouseMoveOnFakeMouseDiv') {
								if (keyboardStyle == 'twin') {
									this.fakeMouseDivObj.style.left = qwertyLayerX + (qwertyLayerX - (parseInt(this.fakeMouseDivObj.style.left) + pointX)) + 'px'; // 90
								} else
									this.fakeMouseDivObj.style.left = singleLayerX + (singleLayerX - (parseInt(this.fakeMouseDivObj.style.left) + pointX)) + 'px'; // 90

								this.fakeMouseDivObj.style.top = parseInt(this.fakeMouseDivObj.style.top) + pointY + 'px';
								this.fakeMouseDivObj.style.visibility = "visible";
							} else if (debugMsg == 'mouseOverOnBtnClickDiv') {
//								if (isFireFox == true) {
//									this.fakeMouseDivObj.style.visibility = "visible";
//								} else {
//									if (keyboardStyle == 'twin')
//										this.fakeMouseDivObj.style.left = qwertyLayerX + (qwertyLayerX - (parseInt(this.btnClickDivObj.style.left) + pointX)) + 'px'; // 90
//									else
//										this.fakeMouseDivObj.style.left = singleLayerX + (singleLayerX - (parseInt(this.btnClickDivObj.style.left) + pointX)) + 'px'; // 90
//
//									this.fakeMouseDivObj.style.top = parseInt(this.fakeBtnClickDivObj.style.top) + pointY + 'px';
//									this.fakeMouseDivObj.style.visibility = "visible";
//								}
							} else {
								if (keyboardStyle == 'twin')
									this.fakeMouseDivObj.style.left = qwertyLayerX + (qwertyLayerX - pointX) + 'px';
								else
									this.fakeMouseDivObj.style.left = singleLayerX + (singleLayerX - pointX) + 'px';

								this.fakeMouseDivObj.style.top = pointY + 'px';
								this.fakeMouseDivObj.style.visibility = "visible";
							}
						}

						if (debugMsg == 'mouseMoveOnOsMouseDiv') {
							if (isFireFox == true && this.isMousePressed == true) {

							} else {
								this.osMouseDivObj.style.left = parseInt(this.osMouseDivObj.style.left) + pointX + 1 + 'px';
								this.osMouseDivObj.style.top = parseInt(this.osMouseDivObj.style.top) + pointY + 'px';
								this.osMouseDivObj.style.visibility = "visible";
							}
						} else if (debugMsg == 'mouseMoveOnFakeMouseDiv') {
							this.osMouseDivObj.style.left = parseInt(this.fakeMouseDivObj.style.left) + pointX + 1 + 'px';
							this.osMouseDivObj.style.top = parseInt(this.osMouseDivObj.style.top) + pointY + 'px';
							this.osMouseDivObj.style.visibility = "visible";
						} else if (debugMsg == 'mouseOverOnBtnClickDiv') {
//							if (isFireFox == true) {
//								this.osMouseDivObj.style.visibility = "visible";
//							} else {
//								this.osMouseDivObj.style.left = parseInt(this.btnClickDivObj.style.left) + pointX + 1 + 'px';
//								this.osMouseDivObj.style.top = parseInt(this.btnClickDivObj.style.top) + pointY + 'px';
//								this.osMouseDivObj.style.visibility = "visible";
//							}
						} else {
							this.osMouseDivObj.style.left = pointX + 1 + 'px';
							this.osMouseDivObj.style.top = pointY + 'px';
							this.osMouseDivObj.style.visibility = "visible";
						}

						if (isIE9) {
							if (debugMsg == 'mouseMoveOnLayoutLowerDiv' && this.isMousePressed == true) {
								if (nIsMultiMouse == true) {
									if (keyboardStyle == 'twin')
										this.fakeMouseDivObj.style.pixelLeft = qwertyLayerX + (qwertyLayerX - pointX + 1);
									else
										this.fakeMouseDivObj.style.pixelLeft = singleLayerX + (singleLayerX - pointX + 1);
									this.fakeMouseDivObj.style.pixelTop = pointY;
									this.fakeMouseDivObj.style.visibility = "visible";
								}

								this.osMouseDivObj.style.pixelLeft = pointX + 1;
								this.osMouseDivObj.style.pixelTop = pointY;
								this.osMouseDivObj.style.visibility = "visible";
							}
						}
					} else {
						if (debugMsg == 'mouseMoveOnLayoutLowerDiv') {
							if (nIsMultiMouse == true) {
								if (keyboardStyle == 'twin')
									this.fakeMouseDivObj.style.pixelLeft = qwertyLayerX + (qwertyLayerX - event.offsetX + 1);
								else
									this.fakeMouseDivObj.style.pixelLeft = singleLayerX + (singleLayerX - event.offsetX + 1);
								this.fakeMouseDivObj.style.pixelTop = event.offsetY;
								this.fakeMouseDivObj.style.visibility = "visible";
							}

							this.osMouseDivObj.style.pixelLeft = event.offsetX + 1;
							this.osMouseDivObj.style.pixelTop = event.offsetY;
							this.osMouseDivObj.style.visibility = "visible";
						} else if (debugMsg == 'mouseMoveOnOsMouseDiv') {
							if (nIsMultiMouse == true) {
								if (keyboardStyle == 'twin')
									this.fakeMouseDivObj.style.pixelLeft = qwertyLayerX + (qwertyLayerX - (parseInt(this.osMouseDivObj.style.left) + event.offsetX) + 1); // 90
								else
									this.fakeMouseDivObj.style.pixelLeft = singleLayerX + (singleLayerX - (parseInt(this.osMouseDivObj.style.left) + event.offsetX) + 1); // 90

								this.fakeMouseDivObj.style.pixelTop = parseInt(this.osMouseDivObj.style.top) + event.offsetY;
								this.fakeMouseDivObj.style.visibility = "visible";
							}

							this.osMouseDivObj.style.pixelLeft = parseInt(this.osMouseDivObj.style.left) + event.offsetX + 1;
							this.osMouseDivObj.style.pixelTop = parseInt(this.osMouseDivObj.style.top) + event.offsetY;
							this.osMouseDivObj.style.visibility = "visible";
						} else if (debugMsg == 'mouseMoveOnFakeMouseDiv') {
							// no:101
							if (nIsMultiMouse == true) {
								if (keyboardStyle == 'twin')
									this.fakeMouseDivObj.style.pixelLeft = qwertyLayerX + (qwertyLayerX - (parseInt(this.fakeMouseDivObj.style.left) + event.offsetX) + 1);
								else
									this.fakeMouseDivObj.style.pixelLeft = singleLayerX + (singleLayerX - (parseInt(this.fakeMouseDivObj.style.left) + event.offsetX) + 1);

								this.fakeMouseDivObj.style.pixelTop = parseInt(this.fakeMouseDivObj.style.top) + event.offsetY;
								this.fakeMouseDivObj.style.visibility = "visible";
							}
							this.osMouseDivObj.style.pixelLeft = parseInt(this.fakeMouseDivObj.style.left) + event.offsetX + 1;
							this.osMouseDivObj.style.pixelTop = parseInt(this.fakeMouseDivObj.style.top) + event.offsetY;
							this.osMouseDivObj.style.visibility = "visible";

						} else {
							// no:102
							if (!(event.srcElement.id == 'osMouseImg' || event.srcElement.id == 'btnClickImg')) {
								if (nIsMultiMouse == true) {
									if (keyboardStyle == 'twin')
										this.fakeMouseDivObj.style.pixelLeft = qwertyLayerX + (qwertyLayerX - event.x + 1);
									else
										this.fakeMouseDivObj.style.pixelLeft = singleLayerX + (singleLayerX - event.x + 1);
									this.fakeMouseDivObj.style.pixelTop = event.y;
									this.fakeMouseDivObj.style.visibility = "visible";
								}

								this.osMouseDivObj.style.pixelLeft = event.x + 1;
								this.osMouseDivObj.style.pixelTop = event.y;
								this.osMouseDivObj.style.visibility = "visible";
							}
						}
					}
				}
			}
		}
	};

	this.getCipherData_xc = function(xecureRandomData) {
		var aCipher = null;
		var aCipherArray = null;
		var aInputValue = null;
		var encXecureRanData = null;
		var aRequest = null;

		aInputValue = document.getElementById("transkey_" + this.name).value;
		if (aInputValue == null || aInputValue == "") {
			aCipher = "";
			return aCipher;
		}

		encXecureRanData = encryptedString(rsaKey, xecureRandomData);
		
		var sPort = location.port;
		if(sPort.length<=0)
			sPort = '80';

		aRequest = new XMLHttpRequest();
		aRequest.open("POST", url, false);
		aRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		aRequest.send("op=getPlainText&name=" + this.name + "&value=" + aInputValue + "&encXecureRanData=" + encXecureRanData + "&transkeyUuid=" + transkeyUuid + "&sPort=" + sPort);

		if (aRequest.readyState != 4 || aRequest.status != 200) {
			aCipher = "";
			return aCipher;
		}

		aCipher = aRequest.responseText.replace(/\n/gi, '');
		aCipherArray = aCipher.split(',');

		aCipher = "";
		for ( var i = 0; i < aCipherArray.length - 1; i++) {
			if (aCipherArray[i].length == 1) {
				aCipher += '0';
			}

			aCipher += aCipherArray[i];
		}

		return aCipher;
	};

	this.setMode = function(isMouse) {
	};

	this.dummy = function(value) {
		if (this.syncDmFld) {
			document.getElementById(this.syncDmFld).value += "0";
		}
		return value.length % 2 == 0 ? "0" : "0";
	};

	this.onClose = function() {
	};

	this.onClick = function(x, y) {
	};

	this.onEnter = function(idx, encrypted) {
	};

	this.onBackspace = function(idx) {
	};

	this.onClear = function() {
		if (this.syncDmFld) {
			document.getElementById(this.syncDmFld).value = "";
		}
	};
	
	this.onClickToggle = function(){
		if(this.useTransKey){
			var el = document.getElementById(this.name+'_toggle');
			var isChecked = el.src.substring(el.src.length - 'btn_m_mouse.gif'.length) == 'btn_m_mouse.gif'; 
			el.src = isChecked ? transkey_url+'/images/btn_m_keyboard.gif' : transkey_url+'/images/btn_m_mouse.gif'; 
			this.clear(); 
			if(isChecked){
				this.setVisible(isChecked, 'temp');
				this.setMultiMouse(false);
				} 
			if(!isChecked)
				this.close(); 
			this.setMode(isChecked); 
//			if(!isChecked) 
//				_d.getElementById(this.input.id).focus();
		}
		
	};
	
	this.onClickCheckbox = function(eventObj){
		var inputObj = eventObj.target ? eventObj.target : eventObj.srcElement;;
		var isChecked = inputObj.checked; 
		this.useTransKey = isChecked;
		//KJS
		_d.getElementById(this.name+"_check").value = isChecked==true?"transkey":"e2e";
		if(isChecked) {
			_d.getElementById(this.input.id).readOnly = true;
				if($ASTX2.mE2EInst != null){
					$ASTX2.subE2EObject(document.getElementById(this.input.id));	
				}
		}	else {
		 _d.getElementById(this.input.id).readOnly = false;
		 if($ASTX2.mE2EInst != null){
			 $ASTX2.addE2EObject(document.getElementById(this.input.id)); //E2E 대상 필드 동적 추가
	         $ASTX2.resetE2E(); //다시 E2E 필드 on시 포커스
	         $ASTX2.clearE2EText(document.getElementById(this.input.id));
		 }
		}
		showTransKeyBtn("transkey."+this.name);
		if(navigator.platform.match('Win') == 'Win'){ //키보드보안 멀티 브라우저 지원 일 경우 KJS
			//if(navigator.appName == 'Microsoft Internet Explorer'){ //키보드보안 IE만 지원 할 경우 KJS
                if(!isChecked) 
                {
                	this.clear();
                }
    }
    //KJS
	};

	
	this.addEvent = function(addEvent, attachEvent){
		if(!this.setTkEvent){
			var input = _d.getElementById(this.input.id);
			if (input.addEventListener) {
				input.addEventListener(addEvent, showTransKey, false);
			} else if (input.attachEvent) {
				input.attachEvent(attachEvent, showTransKey);
			}
			this.setTkEvent = true;
		}
	};
	
	this.removeEvent = function(removeEvent, dettachEvent){
		if(this.setTkEvent){
			var input = _d.getElementById(this.input.id);
			if (input.removeEventListener) {
				input.removeEventListener (removeEvent, showTransKey, false);
			} else if (input.detachEvent) {
				input.detachEvent(dettachEvent, showTransKey);
			}
			this.setTkEvent = false;
		}
	};
	
	this.addButton = function(){
		if(this.selectIMG=="0"){
				var divObj = _d.getElementById(this.name);
				var inputObj = _d.getElementById(this.input.id);
				var btn = document.createElement("span");
				btn.id = this.name+"_button";
				var onClick = ""; 
					if(this.isCrt =="number_crt"||this.isCrt =="qwerty_crt"){
						onClick = this.name+".onClickToggle();";
					}else{
						onClick = "transkey."+this.name+".onClickToggle();";
					}
				btn.innerHTML = "<img class='TranskeyToggle' alt='' style='vertical-align:middle; cursor:pointer;' id='"
					+this.name+"_toggle' onclick='"
					+onClick+"' src='"
					+transkey_url+"/images/btn_m_mouse.gif' border='0'>";		
				divObj.insertBefore(btn, inputObj.nextSibling);
				this.selectIMG="1";
		}
		if(inputObj) {
			_d.getElementById(this.input.id).readOnly = false;
		}	else {
		 _d.getElementById(this.input.id).readOnly = true;
		}
	};
	
	this.removeButton = function(){
		if(this.selectIMG=="1"){
			var divObj = _d.getElementById(this.name);
			var btn = _d.getElementById(this.name+"_button");
			divObj.removeChild(btn);
			this.selectIMG="0";
			
		}	
	};
	
	this.setPosition = function(x, y){
		var inputObj = _d.getElementById(this.input.id);
		if(isPlainTextMode == '1'){
			if (this.input.type == "text")
				inputObj = _d.getElementById(this.name + "_layoutText");
		}
		var p = getOffsetPoint(inputObj);
		p.x=p.x+x;
		p.y=p.y+inputObj.offsetHeight+y;
		this.layout = _d.getElementById(this.name+"_layout");
		this.layout.style.position = "absolute"; // 2013.05.24
		this.layout.style.left = p.x+"px";
		this.layout.style.top = p.y+"px";
	};
	this.load();

};


function showTransKey(eventObj) {

		var inputObj;
		if (eventObj.type == "text" || eventObj.type == "password") {
			inputObj = event;
		} else {
			eventObj = eventObj ? eventObj : window.event;
			inputObj = eventObj.target ? eventObj.target : eventObj.srcElement;
		}
		
	
			
	
		var tid = "transkey."+inputObj.parentNode.id;
		if(eval(tid)==null)
			tid = inputObj.parentNode.id;
		if(eval(tid+".useTransKey")){
			if(eval("transkey."+inputObj.parentNode.id)==null||eval("transkey."+inputObj.parentNode.id)=="undefined")
				tid = inputObj.parentNode.id;
			if (eval(tid + ".isDisabled") != false) {
				return true;
			}
		
			
		
				eval(tid + ".clear();");
				eval(tid + ".setMode(true);");
				if (isFirstUseMultyCusor == 1) {
					eval(tid + ".setMultiMouse(true);");
					eval(tid + ".setVisible(true, 'temp');");
					eval(tid + ".setMouseInfo(null, 'multiMouse');");
				} else {
					eval(tid + ".setMultiMouse(false);");
					eval(tid + ".setVisible(true, 'temp');");
				}
				window.focus();
		}
	
}

function showTransKeyBtn(TranKeyId) {
		var tid = eval(TranKeyId);
		if(tid.useTransKey){
			if (tid.isDisabled != false) {
				return true;
			}
	
			tid.clear();
			tid.setMode(true);
			if (isFirstUseMultyCusor == 1) {
				tid.setMultiMouse(true);
				tid.setVisible(true, 'temp');
				tid.setMouseInfo(null, 'multiMouse');
			} else {
				tid.setMultiMouse(false);
				tid.setVisible(true, 'temp');
			}
			window.focus();
		}
	
}

function hideTransKey(nsEvent) {
	var inputObj;
	if (nsEvent.type == "text" || nsEvent.type == "password") {
		inputObj = event;
	} else {
		nsEvent = nsEvent ? nsEvent : window.event;
		inputObj = nsEvent.target ? nsEvent.target : nsEvent.srcElement;
	}
	var tid = "transkey."+inputObj.parentNode.id;
	eval(tid + ".setVisible(false, 'temp');");
	eval(tid + ".setMode(false);");
}

function getElementById(parentObj, childId) {
	var children = parentObj.children;
	var count = children.length;

	for ( var i = 0; i < count; i++) {
		var item = children.item(i);
		if (item.id == childId)
			return item;
	}
	return null;
}

function disableKeyOnTranskey(nsEvent) {
	if (transKeyObj == null)
		return;

	nsEvent = nsEvent ? nsEvent : window.event;
	
	if(nsEvent.keyCode==27){
		transKeyObj.close();
	}
//	else if(nsEvent.keyCode==9){
//		var tkObj = transKeyObj;
//		tkObj.useTransKey=false;
//		document.getElementById(transKeyObj.input.id).focus();
//		tkObj.close();
//		tkObj.useTransKey=true;
//	}
	else{
		if (nsEvent.preventDefault)
			nsEvent.preventDefault();
		if (nsEvent.stopPropagation)
			nsEvent.stopPropagation();

		nsEvent.returnValue = false;
		nsEvent.cancelBubble = true;
	}


}

function eventKeyOnTranskey(nsEvent) {
	if (transKeyObj == null)
		return;

	nsEvent = nsEvent ? nsEvent : window.event;
	
	if(nsEvent.keyCode==27){
		transKeyObj.close();
		return;
	}else if(nsEvent.keyCode==16){
		transKeyObj.caps();
		return false;
	}
	
	if (nsEvent.preventDefault)
		nsEvent.preventDefault();
	if (nsEvent.stopPropagation)
		nsEvent.stopPropagation();

	nsEvent.returnValue = false;
	nsEvent.cancelBubble = true;

}

function initFormTransKey(input_names, transkey_n){
	var _d = document;
	
	var form = _d.forms;// getElementsByTagName("form");

	for ( var i = 0; i < form.length; i++) {
		var f = form.item(i);
		var input = getElementById(f, "transkey_i");
		if (input == null) {
			input = _d.createElement("input");

			input.type = "hidden";

			input.name = "transkey_i";

			input.id = "transkey_i";

			input.value = transkey_n;

			f.appendChild(input);
		} else {
			input.value = transkey_n;
		}

		var input2 = getElementById(f, "transkey_inputs");

		if (input2 == null) {
			input2 = _d.createElement("input");

			input2.type = "hidden";

			input2.name = "transkey_inputs";

			input2.id = "transkey_inputs";

			input2.value = input_names;

			form.item(i).appendChild(input2);
		} else {
			input2.value = input_names;
		}

		var transkeyUuidInput = getElementById(f, "transkeyUuid");

		if (transkeyUuidInput == null) {
			transkeyUuidInput = _d.createElement("input");

			transkeyUuidInput.type = "hidden";

			transkeyUuidInput.name = "transkeyUuid";

			transkeyUuidInput.id = "transkeyUuid";

			transkeyUuidInput.value = transkeyUuid;

			f.appendChild(transkeyUuidInput);
		} else {
			transkeyUuidInput.value = transkeyUuid;
		}
		

	}
	
}

function setFormTransKey(formElement, transkey_n, input_names){
	
	var _d = document;
	
	var input = getElementById(formElement, "transkey_i");

	if (input == null) {
		input = _d.createElement("input");

		input.type = "hidden";

		input.name = "transkey_i";

		input.id = "transkey_i";

		input.value = transkey_n;

		f.appendChild(input);
	} else {
		input.value = transkey_n;
	}

	var input2 = getElementById(formElement, "transkey_inputs");

	if (input2 == null) {
		input2 = _d.createElement("input");

		input2.type = "hidden";

		input2.name = "transkey_inputs";

		input2.id = "transkey_inputs";

		input2.value = input_names;

		form.item(i).appendChild(input2);
	} else {
		input2.value = input_names;
	}
	
}

// NYS
var transkey = {};
var transkeyIdArray = {};
var setInputTransKey = [];

function getmTkInputById(inputId){
	return document.getElementById(transkeyIdArray[inputId]);
}

function initTransKey() {

	try{
		generateSessionKey(transkey_surl);
	}catch(e){
		//alert("이용에 불편을 드려 죄송합니다.\n계속 발생시 고객센터로 문의해주세요.(Tel 1566-0999)\n[에러내용 : 가상키패드 에러]");
		for(var i=0;i<setInputTransKey.length;i++){
			$("#Tk_"+setInputTransKey[i].id+"_checkbox").attr("disabled",true);
		}
		return false;
	}
	
	var input_names = "";
	var _d = document;

//	var o = document.getElementsByTagName("input");
	var transkey_n = 0;

	for ( var i = 0; i < setInputTransKey.length; i++) {

		transkey_n++;
		var tkObj = setInputTransKey[i];
		var obj = _d.getElementById(tkObj.id);
		var objParentNodeId = obj.parentNode.id + '';
		if (objParentNodeId.indexOf('Tk_') > -1) {
			var tempDiv = obj.parentNode;
			var tempParentDiv = tempDiv.parentNode;
			tempParentDiv.replaceChild(obj, tempDiv);

		}

		input_names += "Tk_" + obj.id+":"+obj.name + ",";

		var max = obj.getAttribute('maxLength')==null?obj.getAttribute('maxlength'):obj.getAttribute('maxLength');
		
		var kbdx = tkObj.x==null?0:Number(tkObj.x);
		
		var kbdy = tkObj.y==null?0:Number(tkObj.y);

		if (max > 100||max == null) {
			max = 100;
		}
		
		
		
		var keybd = tkObj.kbd;
 
		var divElement = document.createElement('div');

		transkeyIdArray[obj.id] = 'Tk_' + obj.id;

		divElement.setAttribute('id', 'Tk_' + obj.id);
	if(setTkEvent_check == true){
		var hiddenElement = document.createElement('input');//KJS
		hiddenElement.setAttribute('id','Tk_' +obj.id+'_check');//KJS
		hiddenElement.setAttribute('name','Tk_' +obj.id+'_check');//KJS
		hiddenElement.setAttribute('type','hidden');//KJS
		
		var checkboxElement = document.getElementById('Tk_' +obj.id+'_checkbox');
				if(checkboxElement != null){
					if(navigator.platform.match('Win') != 'Win'){ //키보드보안 멀티 브라우저 지원 일 경우
						//checkboxElement.style.display = 'none';
						checkboxElement.checked = 'true';
						checkboxElement.disabled = 'true'; 
					}	
					else if (navigator.userAgent.indexOf("Opera") > -1 && operaversion > 11){ //오페라의 경우 체크박스 삭제박스 삭제
						//checkboxElement.style.display = 'none';
						checkboxElement.checked = 'true';
						checkboxElement.disabled = 'true'; 
						}				
			}
	}
		// TODO:table size
		if(navigator.appName.indexOf("Internet Explorer")>0) {
			divElement.style.display = "inline";
			divElement.style.zoom = "1";
		} else {
			divElement.style.display = "inline";
			//divElement.style.verticalAlign = "bottom";
		}

		var objParent = obj.parentNode;
		
		objParent.insertBefore(divElement, obj);
		
		divElement.appendChild(obj);
		
		//KJS
		if(setTkEvent_check == true){
			var objhidden = obj.parentNode;
			objhidden.insertBefore(hiddenElement, obj);
			if(navigator.platform.match('Win') == 'Win') {
				hiddenElement.value="e2e";
			} else {
				hiddenElement.value="transkey";
			}
			if (navigator.userAgent.indexOf("Opera") > -1 && operaversion > 11) {// 오페라의 경우 입력값을 transkey 처리
				hiddenElement.value="transkey";
			} 
		}
		//KJS
			
		transkey["Tk_"+obj.id] = new TransKey("Tk_"+obj.id, kbdx, kbdy, transkey_surl, keybd, max , obj.type, obj, tkObj);

	

	}

	input_names = input_names.substring(0, input_names.length - 1);
	
	initFormTransKey(input_names, transkey_n);

	if (document.addEventListener) {
		//document.addEventListener("mousedown", checkTransKey, false); // 2013.12.11 focus out일 때 가상키패드 닫히지 않도록 수정
		document.addEventListener("keydown", eventKeyOnTranskey, true);
		document.addEventListener("keypress", disableKeyOnTranskey, true);
		document.addEventListener("keypup", disableKeyOnTranskey, true);
	} else if (document.attachEvent) {
		//document.attachEvent("onmousedown", checkTransKey); // 2013.12.11 focus out일 때 가상키패드 닫히지 않도록 수정
		document.attachEvent("onkeydown", eventKeyOnTranskey);
		document.attachEvent("onkeypress", disableKeyOnTranskey);
		document.attachEvent("onkeyup", disableKeyOnTranskey);
	}
	if(setTkEvent_check == true){
		if(navigator.platform.match('Win') == 'Win'){ //키보드보안 멀티 브라우저 지원 일 경우 KJS
			if(navigator.appName == 'Microsoft Internet Explorer'){ //키보드보안 IE만 지원 할 경우 KJS
		//		TouchEnKey_ReScan();
			}
		//	TouchEnKey_ApplySecurity();
		}
	}
}



function addTransKey(inputObject, enc, keyboardType, kbdx, kbdy) {
	
	var x = kbdx;
	var y =  kbdy;
	if(arguments.length==3){
		x = 0; y = 0;
	}

	var formElement = inputObject.form;

	var input_names = getElementById(formElement, "transkey_inputs").value;

	var transkey_n = getElementById(formElement, "transkey_i").value;

	if (inputObject.type == "password" && enc == "on" || inputObject.type == "text" && enc == "on") {
		transkey_n++;

		var objParentNodeId = inputObject.parentNode.id + '';
		if (objParentNodeId.indexOf('Tk_') > -1) {
			var tempDiv = inputObject.parentNode;
			var tempParentDiv = tempDiv.parentNode;
			tempParentDiv.replaceChild(inputObject, tempDiv);

		}
		
		var objId = inputObject.id.length>0?inputObject.id:transkey_n;

		input_names += "," + "Tk_" + objId+":"+inputObject.name;

		var max = inputObject.getAttribute('maxlength');

		if (max == null)
			max = 12;

		if (max > 100) {
			max = 100;
		}

		if (keyboardType == null) {
			keyboardType = 'number';
		}

		var divElement = document.createElement('div');

		transkeyIdArray[inputObject.id] = 'Tk_' + objId;

		divElement.setAttribute('id', 'Tk_' + objId);

		// TODO:table size
		if(navigator.appName.indexOf("Internet Explorer")>0) {
			divElement.style.display = "inline";
			divElement.style.zoom = "1";
		} else {
			divElement.style.display = "inline-table";
			divElement.style.verticalAlign = "bottom";
		}

		var objParent = inputObject.parentNode;

		objParent.insertBefore(divElement, inputObject);

		divElement.appendChild(inputObject);
		
		transkey["Tk_"+objId] = new TransKey("Tk_"+objId, x, y, transkey_surl, keyboardType, max, inputObject.type, inputObject);

	}
	
	setFormTransKey(formElement, transkey_n, input_names);


}

function setTransKey(traskeyId, inputObject, enc, keyboardType, kbdx, kbdy) {
	
	var x = kbdx;
	var y =  kbdy;
	if(arguments.length==4){
		x = 0; y = 0;
	}

	var formElement = inputObject.form;

	var input_names = getElementById(formElement, "transkey_inputs").value;

	var transkey_n = getElementById(formElement, "transkey_i").value;

	if (inputObject.type == "password" && enc == "on" || inputObject.type == "text" && enc == "on") {
		transkey_n++;

		var objParentNodeId = inputObject.parentNode.id + '';
		if (objParentNodeId.indexOf(traskeyId) > -1) {
			var tempDiv = inputObject.parentNode;
			var tempParentDiv = tempDiv.parentNode;
			tempParentDiv.replaceChild(inputObject, tempDiv);

		}

		input_names += "," +traskeyId+":"+inputObject.name;

		var max = inputObject.getAttribute('maxLength')==null?inputObject.getAttribute('maxlength'):inputObject.getAttribute('maxLength');

		if (max == null)
			max = 12;

		if (max > 100) {
			max = 100;
		}

		if (keyboardType == null) {
			keyboardType = 'number';
		}

		var divElement = document.createElement('div');

		transkeyIdArray[inputObject.id] = traskeyId;
		

		divElement.setAttribute('id', traskeyId);
		
		// TODO:table size
		if(navigator.appName.indexOf("Internet Explorer")>0) {
			divElement.style.display = "inline";
			divElement.style.zoom = "1";
		} else {
			divElement.style.display = "inline-table";
			divElement.style.verticalAlign = "bottom";
		}

		var objParent = inputObject.parentNode;

		objParent.insertBefore(divElement, inputObject);

		divElement.appendChild(inputObject);
		
		transkey[traskeyId] = new TransKey(traskeyId, x, y, transkey_surl, keyboardType, max, inputObject.type, inputObject);

	}
	
	setFormTransKey(formElement, transkey_n, input_names);

}

function getTranskeyIdByInputId(inputId) {
	return transkeyIdArray[inputId];
}

function getTranskeyInputIdByInputId(inputId) {
	return "transkey_" + transkeyIdArray[inputId];
}

function contains(parent, child, deep)

{
	if (parent == child)
		return true;

	var items = parent.children;
	var count = items.length;

	for ( var i = 0; i < count; i++) {
		if (items[i] == child)
			return true;
		if (deep == true && contains(items[i], child, deep))
			return true;
	}
	return false;
}

function checkTransKey(nsEvent) {

	if (transKeyObj == null)
		return;

	var inputObj;

	if (nsEvent.type == "text" || nsEvent.type == "password") {
		inputObj = event;
	} else {
		nsEvent = nsEvent ? nsEvent : window.event;
		inputObj = nsEvent.target ? nsEvent.target : nsEvent.srcElement;
	}

	var transkeyLayout = document.getElementById(transKeyObj.name + "_layout");
	var transkeyDiv = document.getElementById(transKeyObj.name);

	if (contains(transkeyLayout, inputObj, true) == false && contains(transkeyDiv, inputObj, true) == false) {
		transKeyObj.close();
		
		transKeyObj = null;
	}
}



function offsetPoint() {
	this.x = 0;
	this.y = 0;
}

function getPositionStyle(obj) {
	var value = null;
	var property = "position";

	if (obj == null)
		return null;

	if (obj.currentStyle) {
		value = obj.currentStyle[property];
	}
	if (document.defaultView) {
		var dv = document.defaultView;
		if (dv.getComputedStyle(obj, "").getPropertyValue(property)) {
			value = dv.getComputedStyle(obj, "").getPropertyValue(property);
		}
	}

	return value;
}

function getOffsetPoint(Element) {

	var point = new offsetPoint();

	point.x = 0;
	point.y = 0;

	while (Element) {
		point.x += Element.offsetLeft;
		point.y += Element.offsetTop;

		Element = Element.offsetParent;

		if (getPositionStyle(Element) != "static")
			break;
	}

	return point;
}

function checkTranskeyGroup(eventObj, groupId){
	if(transkey[groupId]==null)
		return false;
	
	var checkGroup = transkey[groupId];
	var inputObj = eventObj.target ? eventObj.target : eventObj.srcElement;
	var isChecked = inputObj.checked;
	var _d = document;
	for (var i=0; transkey[groupId].length>i; i++){
		transkey[checkGroup[i]].useTransKey = isChecked;
		_d.getElementById(checkGroup[i]+"_check").value = isChecked==true?"transkey":"e2e";
			
	}	
	//KJS
	for (var i=0; transkey[groupId].length>i; i++){ 
		if(isChecked) {
				_d.getElementById(transkey[checkGroup[i]].input.id).readOnly = true;
			}	else {
		 		_d.getElementById(transkey[checkGroup[i]].input.id).readOnly = false;
			}
		}
	showTransKeyBtn("transkey."+checkGroup[0]); //0번째 group의 transkey 로딩
		if(navigator.platform.match('Win') == 'Win'){ //키보드보안 멀티 브라우저 지원 일 경우 KJS
		//if(navigator.appName == 'Microsoft Internet Explorer'){ //키보드보안 IE만 지원 할 경우 KJS
			if(!isChecked) {
					for (var i=0; transkey[groupId].length>i; i++){
						var gbj = "transkey.Tk_"+transkey[checkGroup[i]].input.name;
						eval(gbj).clear();
				}
			}
    }
    //KJS
}
/*
if (window.attachEvent)
	window.attachEvent("onload", function() {
		initTransKey();
	});
else
	window.addEventListener("load", function() {
		initTransKey();
	}, false);
*/