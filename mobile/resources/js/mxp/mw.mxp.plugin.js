/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.mxp.plugin.js, /resources/js/mxp/
 * DESCRIPTION : MXP 모듈에서 사용하는 함수 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2015-02-05		initial version
 * ========================================================================== */

/**
 * MXP Plugin 과 관련 메소드 집합
 */
var MXP_PLUGIN = (function () {
	var _public = {};
	var _private = {};

	/**
	 * == 3rd-party 솔루션 리스트 ==
	 *
	 * 1. 결제 		: KAKAO PAY
	 * 2. Push 		: Morpheus Push
	 * 3. 위변조방지 	: XecureAppShield
	 * 4. 전자서명		: TouchEn Appfree
	 * 5. 가상키보드 	: TouchEn mTransKey
	 * 6. 백신 		: V3 Mobile Plus 2.0
	 */

	/**
	 * MXP 이벤트 등록 (LifeplanetPlugin, XecureSmartPlugin)
	 */
	_public.initMxpEngine = function () {
		if (typeof MxpEngine != 'undefined') {
			MxpEngine.addClass(function () {
				Mxp.addConstructor(function () {
					Mxp.exec(null, null, 'App', 'addService', ['LifeplanetPlugin', 'com.lifeplanet.insurance.plugin.LifeplanetPlugin']);
				});
			});

			MxpEngine.addClass(function () {
				Mxp.addConstructor(function () {
					Mxp.exec(null, null, 'App', 'addService', ['XecureSmartPlugin', 'com.softforum.xecure.XecureSmartPlugin']);
				});
			});

			//바이오인증 MXP Plugin 정의
			MxpEngine.addClass(function () {
				Mxp.addConstructor(function () {
					Mxp.exec(null, null, 'App', 'addService', ['FIDOPlugin', 'com.lifeplanet.insurance.plugin.FIDOPlugin']);
				});
			});

			MxpEngine.addClass(function () {
				Mxp.addConstructor(function () {
					Mxp.exec(null, null, 'App', 'addService', ['KWICPlugin', 'com.lifeplanet.insurance.plugin.KWICPlugin']);
				});
			});

			MxpEngine.addClass(function () {
				Mxp.addConstructor(function () {
					Mxp.exec(null, null, 'App', 'addService', ['LPVestPinPlugin', 'com.lifeplanet.insurance.plugin.LPVestPinPlugin']);
				});
			});
		}
	};

	/**
	 * URL 주소로 이동
	 *
	 * @param url
	 */
	_public.urlOpen = function (url, callback) {
		var successFn = function () {};
		var failureFn = function () {
			message.alert('COM010');
		};

		if (typeof callback == 'function') {
			successFn = callback;
		}

		Mxp.exec(successFn, failureFn, 'LifeplanetPlugin', 'urlOpen', [url]);
	};

	/**
	 * Push 고객 등록
	 *
	 * @param successFn
	 * @param failFn
	 * @param CUID
	 * @param CNAME
	 */
	_public.pushLoginRun = function (successFn, failFn, CUID, CNAME) {
		if (MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
			return;
		}

		var nfiObj = new Array();

		if (util.isNull(CUID) && util.isNull(CNAME)) {
			nfiObj[0] = 'anonymous';
			nfiObj[1] = '비로그인고객';
		} else {
			nfiObj[0] = CUID;
			nfiObj[1] = CNAME;
		}

		Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'pushUserRegist', nfiObj);
	};

	/**
	 * PUSH 등록 여부
	 * @param successFn
	 * @param failFn
	 */
	_public.getPushRegiStatus = function (successFn, failFn) {
		if (MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
			return;
		}

		Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'getPushRegiStatus', []);
	};

	/**
	 * PUSH 등록 설정
	 * @param status (true : PUSH 등록, false : PUSH 해제)
	 * @param successFn
	 * @param failFn
	 */
	_public.setPushRegiStatus = function (status, successFn, failFn) {
		if (MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
			return;
		}

		Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'setPushRegiStatus', [status]);
	};

	/**
	 * PUSH 알림음 설정
	 * @param value (0 : 라이프플래닛음, false : 시스템 기본음)
	 * @param successFn
	 * @param failFn
	 */
	_public.setPushSound = function (value, successFn, failFn) {
		if (MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
			return;
		}

		Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'setPushSound', [value]);
	};

	/**
	 * 인증 타입 설정
	 * @param String value (bio: 바이오인증, cert : 공인인증서, easy : 안랩간편인증)
	 * @param Function successFn
	 * @param Function failFn
	 */
	_public.setAuthType = function (value, successFn, failFn) {
		if (MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
			return;
		}

		Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'setAuthType', [value]);
	};

	/**
	 * 인증 타입 가져오기
	 * @param String value (bio: 바이오인증, cert : 공인인증서, easy : 안랩간편인증)
	 * @param Function successFn
	 * @param Function failFn
	 * @return String (bio: 바이오인증, cert : 공인인증서, easy : 안랩간편인증, default : 설정값 무)
	 */
	_public.getAuthType = function (successFn, failFn) {
		if (MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
			return;
		}

		Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'getAuthType', []);
	};

	/**
	 * 웹로그(AceCounter) 호출
	 *
	 * @param successFn
	 * @param failFn
	 */
	_public.webLogRun = function (successFn, failFn) {
		// 2020.07.09 웹서버 취약성점검 조치로 AceCounter 서버사용불가(소스삭제)
	};

	/**
	 * 보안 모듈 실행 (위변조방지, 백신, 전자서명)
	 * @param successFn
	 * @param failFn
	 */
	_public.securityRun = function (successFn, failFn) {
		var nfiObj = new Array();
		nfiObj[0] = MXP_PLUGIN_CONST.getConfiguration('APPSHIELD');

		var name = device.Platform.name;
		//xecureAppShiled에서 ios와 android의 앱 id가 같으면 쫑남...
		if (name == 'ios') nfiObj[1] = 'lifeplanet_iOS';
		//앱아이디
		else if (name == 'android') nfiObj[1] = 'lifeplanet'; //앱아이디

		var version = device.appVersion;
		nfiObj[2] = MXP_PLUGIN.fnReplace(version, '.'); //앱 버전 정보
		Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'securityRun', nfiObj);
	};

	/**
	 * 2차 보안 검증직 성공
	 * @param successFn
	 * @param failFn
	 */
	_public.passSecondAuth = function (successFn, failFn) {
		var OSInfo = MXP_PLUGIN.getOSInfo().name;
		var ver = device.appVersion;
		if (OSInfo == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
			if (ver < '4.6.6') {
				successFn();
			} else {
				Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'passSecondAuth', []);
			}
		} else if (OSInfo == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
			if (ver < '4.1.3') {
				successFn();
			} else {
				Mxp.exec(successFn, failFn, 'LifeplanetPlugin', 'passSecondAuth', []);
			}
		}
	};

	/**
	 * Android 7.0 내무망 보안모듈 스킵으로 인해 공인인증서 모듈 초기화 실행
	 */
	_public.initXecure = function () {
		Mxp.exec(null, null, 'LifeplanetPlugin', 'initXecure', []);
	};

	/**
	 * iOS 마이페이지 Native App 변환
	 */
	_public.showViewController = function () {
		Mxp.exec(null, null, 'LifeplanetPlugin', 'showViewController', []);
	};

	/**
	 * 문자열 제거
	 *
	 * @param strString
	 * @param strChar
	 * @returns {String}
	 */
	_public.fnReplace = function (strString, strChar) {
		var strTmp = '';

		for (var i = 0; i < strString.length; i++) {
			if (strString.charAt(i) != strChar) strTmp = strTmp + strString.charAt(i);
		}

		return strTmp;
	};

	/**
	 * 디바이스 체크 로직
	 *
	 * @returns {String}
	 */
	_public.checkDevice = function () {
		var mobileKeyWords = new Array(
			'iPhone',
			'iPod',
			'iPad',
			'BlackBerry',
			'Android',
			'Windows CE',
			'LG',
			'MOT',
			'SAMSUNG',
			'SonyEricsson'
		);
		var deviceName = '';
		for (var word in mobileKeyWords) {
			if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
				deviceName = mobileKeyWords[word];
				break;
			}
		}
		return deviceName;
	};

	/**
	 * iOS 여부 체크
	 *
	 * @returns {Boolean}
	 */
	_public.isIOS = function () {
		var deviceName = MXP_PLUGIN.checkDevice();
		if (deviceName === 'iPhone' || deviceName === 'iPod' || deviceName === 'iPad') {
			return true;
		}
		return false;
	};

	/**
	 * Android 여부 체크
	 *
	 * @returns {Boolean}
	 */
	_public.isAndroid = function () {
		var deviceName = MXP_PLUGIN.checkDevice();
		if (deviceName === 'Android') {
			return true;
		}
		return false;
	};

	/**
	 * iPhone X 여부 체크
	 * 모바일웹은 스크린사이즈로 iPhone X 판별
	 */
	_public.isiPhoneX = function () {
		if (MXP_PLUGIN.isIOS()) {
			if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS) {
				var ratio = window.devicePixelRatio || 1;
				var screen = {
					width: window.screen.width * ratio,
					height: window.screen.height * ratio,
				};

				if (screen.width == 1125 && screen.height === 2436) {
					// iPhone X / Xs Detection
					return true;
				} else if (screen.width == 1242 && screen.height === 2688) {
					// iPhone Xs Max
					return true;
				} else if (screen.width == 828 && screen.height === 1792) {
					// iPhone Xr
					return true;
				} else {
					return false;
				}
			} else {
				var modelName = device.model;
				if (
					modelName.indexOf('10,3') > -1 ||
					modelName.indexOf('10,6') > -1 ||
					modelName.indexOf('11,2') > -1 ||
					modelName.indexOf('11,4') > -1 ||
					modelName.indexOf('11,6') > -1 ||
					modelName.indexOf('11,8') > -1 ||
					modelName.indexOf('12,1') > -1 ||
					modelName.indexOf('12,3') > -1 ||
					modelName.indexOf('12,5') > -1
				) {
					return true;
				}
			}
		}

		return false;
	};

	/**
	 * 현재 접속 기기 판단
	 *
	 * 1. APP (기기+버전 획득 가능)
	 * 	> ios ( APP_IOS)
	 *  > android (APP_ANDROID)
	 *
	 * 2. WEB (OS 획득 가능)
	 *  > iphone (WEB_IOS)
	 *  > android (WEB_ANDROID)
	 *  > window (WEB_PC)
	 *
	 * @returns {String}
	 */
	_public.getOSInfo = function () {
		/**
		 * 모바일 웹 / 앱 / 판단 필요
		 *
		 * 1. APP / preview 판단
		 *
		 * 2.1 APP (기기+버전 획득 가능)
		 * 	> ios ( APP_IOS)
		 *  > android (APP_ANDROID)
		 *
		 * 2.2 PREVIEW (OS 획득 가능)
		 *  > iphone (WEB_IOS)
		 *  > android (WEB_ANDROID)
		 *  > window (WEB_PC)
		 *
		 * @returns {String}
		 */

		var curOSInfo = {};
		var curOSName = null; // ios / androidS
		var ua = navigator.userAgent;

		/**
		 * [NOTE] MXP Appp 판단
		 * User Agent의 마지막 설정값은 [Mobile/12F70] 이며, MXP 이외의 브라우저의
		 * 경우, User Agent에 추가적으로 Safari, NAVER, KAKAOSTORY 와 같은 설정값을
		 * 표기하고 있다. 그러므로, 해당 값으로 MXP를 판별 가능 하다.
		 */

		//var isApp = ua.substr(ua.indexOf('Mobile/'), ua.length).indexOf(' ') > -1;

		var isApp = false;
		if (navigator.userAgent.indexOf('makeshopapp') > -1) {
			isApp = true;
		} else if (navigator.userAgent.indexOf('toss') > -1) {
			isApp = true;
		} else if (ua.substr(ua.indexOf('Mobile/'), ua.length).indexOf(' ') > -1) {
			isApp = true;
		} else {
			isApp = false;
		}

		if (MXP_PLUGIN.isIOS()) {
			//iOS
			if (ua.indexOf('MXP') > -1) {
				//당사 모바일앱 인 경우
				curOSInfo.name = MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS;
			} else {
				curOSInfo.name = MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS;
			}
		} else if (MXP_PLUGIN.isAndroid()) {
			// Android
			if (ua.indexOf('MXP') > -1) {
				curOSInfo.name = MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID;
			} else {
				curOSInfo.name = MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID;
			}
		} else {
			curOSInfo.name = MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC;
		}

		return curOSInfo;

		navigator.userAgent.substr(navigator.userAgent.indexOf('Mobile/'), navigator.userAgent.length);
	};

	/**
	 * 모바일 브라우저인지 체크하는 함수
	 * @return true:모바일 브라우저, false:모바일앱
	 */
	_public.isWeb = function () {
		if (
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID ||
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS
		) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * 현재 접속 로직을 판단하여, mxp.js를 적재
	 * WEB에서 mxp.js를 import 하는 경우 HTML 기본 태그를 mxp.js에서 재정의 하는
	 * 오류가 발생하여 부득이 하게, WEB과 APP을 분리하여 import 하기로 결정.
	 * @param cacheDt : mxp관련 js cache날짜 설정
	 */
	_public.getAccessPath = function (cacheDt) {
		function _import_js(jsFile) {
			document.write("<script src='" + jsFile + "'></script>");
		}

		var ua = navigator.userAgent;
		var mxpJS = '/resources/js/mxp/mxp.js';
		var newiOSMxpJS = '';
		if (cacheDt != undefined) {
			cacheJS = cacheDt;
		}
		newiOSMxpJS = '/resources/js/mxp/MxpEngine.temp.js';
		if (MXP_PLUGIN.isIOS()) {
			//iOS
			if (ua.indexOf('Safari') > -1) {
				// 웹브라우저
			} else {
				// iOS 어플리케이션 WKWebview변경, 4.2.6이상버전 webview 방식변경으로 인해 신규 js import
				if (window.webkit != undefined) {
					_import_js(newiOSMxpJS);
				} else {
					_import_js(mxpJS);
				}
			}
		} else if (MXP_PLUGIN.isAndroid()) {
			// Android
			if (ua.indexOf('MXP') > -1) {
				// 어플리케이션
				_import_js(mxpJS);
			} else {
				// 웹브라우저
			}
		}
	};

	/**
	 * native 버전 체크 후 버전이 다르면 업데이트 설치  유도
	 */
	_public.checkUpdateNative = function () {
		if (config.getEnv('getServerStatus')() != 'PROD') {
			return;
		}
		var OSInfo = MXP_PLUGIN.getOSInfo().name;

		if (OSInfo == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC) return;
		if (MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
			return;
		}

		var url = null;
		var message = null;
		var ver = device.appVersion;

		if (OSInfo == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
			if (ver >= MXP_PLUGIN_CONST.store.android.version) {
				return;
			}
			url = MXP_PLUGIN_CONST.store.android.url;
			message = MXP_PLUGIN_CONST.store.android.message;
			if (device.Platform.version < '5.0.0') {
				// OS Ver 5.0미만일경우 서비스 중단 메시지
				message = MXP_PLUGIN_CONST.store.android.stopMessage;
			}
		} else {
			// 당사 앱 userAgent 변경으로 인한 버전 체크 수정
			if (ver >= MXP_PLUGIN_CONST.store.ios.version) {
				return;
			}
			url = MXP_PLUGIN_CONST.store.ios.url;
			message = MXP_PLUGIN_CONST.store.ios.message;
		}

		var fnMoveMarket = function (result) {
			if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
				var option = {
					location: 'browserPopUp',
					url: 'http://itunes.apple.com/app/laipeupeullaenis-seumateuseobiseu/id840637440?mt=8',
				};
				PageUtil.openPopup(option);
			} else {
				var onFailOpenMarket = function (error) {
					device.exitApp();
				};

				var onSuccessOpenMarket = function () {
					device.exitApp();
				};

				if (result != null && Number(result) == 1) {
					var params = new mAppIntentProperties();
					params.scheme = url;
					navigator.appIntent.start(params, onSuccessOpenMarket, onFailOpenMarket);
				} else {
					device.exitApp();
				}
			}
		};

		navigator.notification.confirm(message, fnMoveMarket, '알림', '확인');
	};

	/**
	 * RaonSecure 의 mTransKey에 대한 함수 집합
	 */
	_public.transKey = {
		/**
		 * 암호화된 Transkey의 해쉬값을 전달한다.
		 *
		 * @param inputId
		 * @returns {___anonymous3055_3222}
		 */
		makeEncData: function (inputId) {
			//  inputId를 전달 받아서 암호화 key 취득
			var fillEncData = mtk.inputFillEncData(document.getElementById(inputId));
			var returnEncData = {
				name: document.getElementById(inputId).name,
				hidden: fillEncData.hidden,
				hmac: fillEncData.hmac,
				transkeyUuid: mtk.transkeyUuid,
			};

			return returnEncData;
		},
	};

	/**
	 * V3 WEB 버전 실행 / 체크 함수 집합
	 */
	_public.v3forWEB = {
		// V3 기본 객체
		V3AVM: null,
		V3AuthKey: null,
		V3RunOK: false,
		V3Ready: false,

		V3KeepAlive: function () {
			var v3Data = $.extend(MXP_PLUGIN.v3forWEB.V3AuthKey, { CHECK: 'KEEPALIVE' });
			logger.log('send v3 keepalive : ' + JSON.stringify(v3Data));
			MXP_PLUGIN.v3forWEB.V3AVM.request(v3Data, MXP_PLUGIN.v3forWEB.fnReqHandler);
		},

		fnV3Starter: function (isOnlyReq) {
			if (!isOnlyReq) {
				var v3Data = $.extend(MXP_PLUGIN.v3forWEB.V3AuthKey, { CHECK: 'START' });
				logger.log('send v3 starter : ' + JSON.stringify(v3Data));
				MXP_PLUGIN.v3forWEB.V3AVM.load(v3Data);
				MXP_PLUGIN.v3forWEB.V3AVM.request(v3Data, MXP_PLUGIN.v3forWEB.fnReqHandler);
			} else {
				var v3Data = $.extend(MXP_PLUGIN.v3forWEB.V3AuthKey, { CHECK: 'KEEPALIVE' });
				logger.log('send v3 starter : ' + JSON.stringify(v3Data));
				MXP_PLUGIN.v3forWEB.V3AVM.request(v3Data, MXP_PLUGIN.v3forWEB.fnReqHandler);
			}
		},

		fnReqHandler: function (result) {
			logger.log('Request : ' + result.msg);
			$(window).unbind('beforeunload');
			switch (result.msg) {
				case 'STARTED':
					// V3Mobile +2.0 시작 성공
					MXP_PLUGIN.v3forWEB.V3RunOK = true;
					MXP_PLUGIN.v3forWEB.V3Interval = setInterval(MXP_PLUGIN.v3forWEB.V3KeepAlive, 20000);
					sessionStorage.setItem('V3Run', 'Y');
					$(window).unbind('click.v3.keepalive');
					break;
				case 'NOT_INSTALLED':
					sessionStorage.setItem('V3Run', 'N');
					MXP_PLUGIN.v3forWEB.V3RunOK = false;
					clearInterval(MXP_PLUGIN.v3forWEB.V3Interval);
					MXP_PLUGIN.v3forWEB.V3AVM.check(MXP_PLUGIN.v3forWEB.fnCheckHandler);
					$(window).bind('click.v3.keepalive', function (e2) {
						e2.preventDefault();
						e2.stopImmediatePropagation();
						MXP_PLUGIN.v3forWEB.V3AVM.check(MXP_PLUGIN.v3forWEB.fnCheckHandler);
					});
					break;

				case 'NEED_UPDATE':
					// 제품이 설치되어 있으나, 최신 버전이 설치되어 있지 않아 playstore로 이동해 업데이트를 유도
					$(window).unbind('click.v3.keepalive');
					MXP_PLUGIN.v3forWEB.V3RunOK = false;
					sessionStorage.setItem('V3Run', 'N');
					clearInterval(MXP_PLUGIN.v3forWEB.V3Interval);
					MXP_PLUGIN.v3forWEB.V3AVM.update();

					$(window).bind('click.v3.keepalive', function (e2) {
						e2.preventDefault();
						e2.stopImmediatePropagation();
						MXP_PLUGIN.v3forWEB.V3AVM.check(MXP_PLUGIN.v3forWEB.fnCheckHandler);
					});
					break;
				case 'KEEPALIVED':
					// clearInterval(MXP_PLUGIN.v3forWEB.V3Interval);
					break;
				case 'FINISHED':
					if (MXP_PLUGIN.v3forWEB.V3RunOK == false) {
						clearInterval(MXP_PLUGIN.v3forWEB.V3Interval);
						MXP_PLUGIN.v3forWEB.V3Interval = setInterval(MXP_PLUGIN.v3forWEB.V3KeepAlive, 20000);
						MXP_PLUGIN.v3forWEB.V3RunOK = true;
					}
					$(window).off('click.v3.keepalive');
					break;
				default:
					// 오류가 발생할 경우 콘솔에 메시지 출력
					MXP_PLUGIN.v3forWEB.V3RunOK == false;
					$(window).unbind('click.v3.keepalive');
					clearInterval(MXP_PLUGIN.v3forWEB.V3Interval);
					MXP_PLUGIN.v3forWEB.V3AVM.check(MXP_PLUGIN.v3forWEB.fnCheckHandler);
					break;
			}
		},

		fnCheckHandler: function (result) {
			logger.log('Check : ' + result.msg);
			$(window).unbind('beforeunload');
			switch (result.msg) {
				case 'ON_PLAYSTORE':
					// 제품이 설치되어 있지 않아 playstore로 이동한 상태
					MXP_PLUGIN.v3forWEB.V3Ready = false;
					sessionStorage.setItem('V3Run', 'N');
					$(window).bind('click.v3.keepalive', function (e2) {
						if (!MXP_PLUGIN.v3forWEB.V3AVM.started) {
							e2.preventDefault();
							e2.stopImmediatePropagation();
							MXP_PLUGIN.v3forWEB.V3AVM.check(MXP_PLUGIN.v3forWEB.fnReqHandler);
						}
					});
					break;
				case 'READY':
					// 서비스 실행 요청 완료, 다시 request 를 호출하여 제품 시작 요청
					MXP_PLUGIN.v3forWEB.V3Ready = true;
					MXP_PLUGIN.v3forWEB.fnV3Starter(false);
					$(window).unbind('click.v3.keepalive');
					break;
				case 'NEED_UPDATE':
					// 제품이 설치되어 있지 않거나, 최신 버전이 설치되어 있지 않음
					// playstore로 이동해 제품 설치 또는 업데이트를 유도
					MXP_PLUGIN.v3forWEB.V3Ready = false;
					sessionStorage.setItem('V3Run', 'N');
					$(window).unbind('click.v3.keepalive');
					$(window).bind('click.v3.keepalive', function (e2) {
						if (!MXP_PLUGIN.v3forWEB.V3AVM.started) {
							e2.preventDefault();
							e2.stopImmediatePropagation();
							MXP_PLUGIN.v3forWEB.V3AVM.check(MXP_PLUGIN.v3forWEB.fnCheckHandler);
						}
					});
					break;
				case 'NOT_SUPPORTED':
					MXP_PLUGIN.v3forWEB.V3Ready = false;
					break;
			}
		},

		fnGetV3AuthKey: function (callback) {
			var tmstmp = util.getDate('-') + '-' + util.getTime().substr(0, 2) + ':' + util.getTime().substr(2, 2);
			var param = { tmstmp: tmstmp };

			var tranProp = util.clone(transaction.TRAN_COMM_PROP); // 트랜잭션 기본 객체 복사
			tranProp.url = '/common/cc/getV3AuthKey'; // 트랜잭션 Url
			tranProp.tradeKey = 'getAuthKey'; // 트랜잭션 TradeKey
			tranProp.params = param; // 트랜잭션 Parameter
			tranProp.blockingFlag = false; // 트랜잭션 로딩창
			tranProp.success = function (data) {
				var param = {
					AUTHKEY: data.outData.authkey,
					TIMEVALUE: tmstmp,
				};
				callback(param);
			}; // Success Callback

			// 트랜잭션 실행
			transaction.callTran(tranProp);
		},

		fnV3Initiator: function () {
			logger.log('v3 run yn - ' + MXP_PLUGIN.v3forWEB.V3AVM.started);
			var callback = function (param) {
				MXP_PLUGIN.v3forWEB.V3AuthKey = param;
				var v3Data = $.extend(param, { CHECK: 'START' });
				if (sessionStorage.getItem('V3Run') === 'Y') {
					logger.log('KEEPALIVE');
					MXP_PLUGIN.v3forWEB.V3Interval = setInterval(MXP_PLUGIN.v3forWEB.V3KeepAlive, 20000);
					//MXP_PLUGIN.v3forWEB.V3KeepAlive();
					//MXP_PLUGIN.v3forWEB.fnV3Starter(true);
				} else {
					MXP_PLUGIN.v3forWEB.fnV3Starter(false);
				}
			};
			MXP_PLUGIN.v3forWEB.fnGetV3AuthKey(callback);
		},

		fnRunSecureApp: function () {
			// ANDROID APP 이 아닌경우 튕겨냄
			if (MXP_PLUGIN.getOSInfo().name != MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID) {
				return;
			}

			Main.offLoading();
			// Chrome 자체 버그로 인해 touch 이벤트 이후 V3 실행되도록 수정
			$(document).on('touchstart.v3', function () {
				if (remoteAddr.indexOf('223.62.173.43') > -1 || remoteAddr.indexOf('220.121.169.215') > -1) {
					$(window).unbind('beforeunload');
					MXP_PLUGIN.v3forWEB.V3AVM = new AVM();
					$(document).off('touchstart.v3');
					MXP_PLUGIN.v3forWEB.fnV3Initiator();
				} else {
					setTimeout(function () {
						$(window).unbind('beforeunload');
						MXP_PLUGIN.v3forWEB.V3AVM = new AVM();
						$(document).off('touchstart.v3');
						MXP_PLUGIN.v3forWEB.fnV3Initiator();
					}, 2000);
				}
			});
		},
	};
	/**
	 * 공인인증 로직 호출
	 *
	 * [String] 	type : 00 - 로그인, 01 - 기타
	 * [Function] 	callback : callback Fucntion
	 *
	 */
	_public.runCertification = function (certType, callback, eData, useUbiKey) {
		if (fpLogin == 'Y' && _public.fpURLChk()) {
			//지문인증으로 로그인 했을때
			if (util.nvl(eData, '') != '') {
				MXP_PLUGIN.runFpCertification(callback, { noEvidenceSignData: eData });
			} else {
				MXP_PLUGIN.runFpCertification(callback, null);
			}
			return;
		} else if (_public.pinURLChk() && vPinLogin == 'Y') {
			//핀증으로 로그인 했을때
			if (util.nvl(eData, '') != '') {
				_public.runPinCertification(callback, { noEvidenceSignData: eData });
			} else {
				_public.runPinCertification(callback, null);
			}
			return;
		} else if (kakaopayLogin == 'Y') {
			//  카카오페이 인증으로 로그인 했을때
			if (util.nvl(eData, '') != '') {
				_public.runKakaopayCertification(callback, { noEvidenceSignData: eData });
			} else {
				_public.runKakaopayCertification(callback, null);
			}
			return;
		} else if (naverLogin == 'Y') {
			//  네이버 인증으로 로그인 했을때
			if (util.nvl(eData, '') != '') {
				_public.runNaverCertification(callback, { noEvidenceSignData: eData });
			} else {
				_public.runNaverCertification(callback, null);
			}
			return;
		}

		if (!config.getEnv('excuteCertModule')) {
			message.alert('COM102');

			var params = {
				validExecuteFlag: 'false',
			};

			if (_public.isMyPage()) {
				_public.applyCIA005A05(params, callback);
			} else {
				callback(params);
			}

			return;
		}

		if (typeof callback != 'object' && typeof callback != 'function') {
			message.alert('COM009');
			return;
		}
		Main.onLoading();

		// 청약 단계의 경우 벗어나기 방지
		Main.offDisableBack();

		var runCertificationCallBack = null;

		if (_public.isMyPage()) {
			_public.certCallBack = callback;
			runCertificationCallBack = _public.applyCIA005A05;
		} else {
			runCertificationCallBack = callback;
		}

		/**
		 * [공인인증 호출 로직]
		 * 1. 모바일 웹 브라우저로 접속한 경우 Appfree 호출
		 * 2. 모바일 어플리케이션으로 접속한 경우 XecureSmart 호출
		 * 3. 기타기기로 호출한 경우 중단
		 */
		if (
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID ||
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS
		) {
			// Appfree 호출
			MXP_PLUGIN.appfree.runAppfree(certType, runCertificationCallBack, eData);
		} else if (
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID ||
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS
		) {
			// XecureSmart 호출
			MXP_PLUGIN.XecureSmart.runXecureLogin(certType, runCertificationCallBack, eData, useUbiKey);
		} else {
			// 기타 기기의 경우 사용 불가 메세지 노출
			message.alert('COM101'); //
			Main.offLoading();
			return;
		}
	};

	/**
	 * 인증서 관리자 호출
	 *
	 */
	_public.managementCertification = function () {
		/**
		 * [공인인증 호출 로직]
		 * 1. 모바일 웹 브라우저로 접속한 경우 Appfree 호출
		 * 2. 모바일 어플리케이션으로 접속한 경우 XecureSmart 호출
		 * 3. 기타기기로 호출한 경우 중단
		 */
		if (
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID ||
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS
		) {
			// Appfree 호출
			MXP_PLUGIN.appfree.managementAppfree();
		} else if (
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID ||
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS
		) {
			// XecureSmart 호출
			MXP_PLUGIN.XecureSmart.runXecureSmartCertMgr();
		} else {
			// 기타 기기의 경우 사용 불가 메세지 노출
			message.alert('COM101'); //
			Main.offLoading();
			return;
		}
	};

	/**
	 * 인증서 가져오기 호출
	 *
	 */
	_public.importCertification = function () {
		/**
		 * [공인인증 호출 로직]
		 * 1. 모바일 웹 브라우저로 접속한 경우 Appfree 호출
		 * 2. 모바일 어플리케이션으로 접속한 경우 XecureSmart 호출
		 * 3. 기타기기로 호출한 경우 중단
		 */
		if (
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID ||
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS
		) {
			// Appfree 호출
			MXP_PLUGIN.appfree.importAppfree();
		} else if (
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID ||
			MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS
		) {
			// XecureSmart 호출
			MXP_PLUGIN.XecureSmart.runGetXecureCert();
		} else {
			// 기타 기기의 경우 사용 불가 메세지 노출
			message.alert('COM101'); //
			Main.offLoading();
			return;
		}
	};

	/**
	 * Raonsecure Appfree 호출
	 */
	_public.appfree = {
		inputCallback: null, //사용자 callback function
		inputCertType: null, // 호출 형태 (로그인/기타)
		inputEdata: null, // 암호화 되어 인증 될 데이터
		executeSuccessFn: function (_sign_msg, _vid_msg) {
			var param = {
				certType: MXP_PLUGIN.appfree.inputCertType, // 인증타입
				cert: _sign_msg, // 인증키
				vid: _vid_msg, // 주민등록키 입력을 위한 값
			};

			if (config.getEnv('validExecuteFlag')) {
				params = $.extend(param, {
					validExecuteFlag: config.getEnv('validExecuteFlag'),
				});
			}

			MXP_PLUGIN.appfree.inputCallback(param);
		},

		executeFailFn: function () {
			message.alert('COM103');
			Main.offLoading();
			return;
		},

		excuteAppfree: function () {
			Main.offLoading();

			// Appfree 어플리케이션 호출
			if ('validLogin' == MXP_PLUGIN.appfree.inputCertType) {
				// 일반 검증
				appfreeExec('login', '', '_', MXP_PLUGIN.appfree.executeSuccessFn, MXP_PLUGIN.appfree.executeFailFn);
			} else {
				// 주민등록번호 검증

				if (util.isNull(MXP_PLUGIN.appfree.inputEdata)) {
					MXP_PLUGIN.appfree.inputEdata = '_';
				}

				appfreeExec(
					'vid2',
					'',
					MXP_PLUGIN.appfree.inputEdata,
					MXP_PLUGIN.appfree.executeSuccessFn,
					MXP_PLUGIN.appfree.executeFailFn
				);
			}
		},

		/**
		 * Appfree 호출
		 *
		 * - certType : 00 (로그인)
		 *  로그인의 경우 인증키값으로만 검증한다.
		 * - certType :; 01 (로그인 외)
		 *  로그인외의 인증의 경우 인증키값 및 주민등록번호로 검증한다.
		 * @param certType
		 * @param callback
		 */
		runAppfree: function (certType, callback, eData) {
			if (
				MXP_PLUGIN.getOSInfo().name != MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID &&
				MXP_PLUGIN.getOSInfo().name != MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS
			) {
				return;
			}

			// 입력 정보 저장
			this.inputCallback = callback;
			this.inputCertType = certType;
			this.inputEdata = eData;

			// appfree init
			init();
			// appfree call
			MXP_PLUGIN.appfree.excuteAppfree();
		},

		/**
		 * Appfree 관리 모듈 호출
		 */
		managementAppfree: function () {
			if (
				MXP_PLUGIN.getOSInfo().name != MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID &&
				MXP_PLUGIN.getOSInfo().name != MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS
			) {
				return;
			}

			// appfree init
			init();
			// appfree call

			appfreeExec('management', '', '_', '', function () {
				Main.offLoading();
			});
		},

		/**
		 * Appfree 가져오기 모듈 호출
		 */
		importAppfree: function () {
			if (
				MXP_PLUGIN.getOSInfo().name != MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID &&
				MXP_PLUGIN.getOSInfo().name != MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS
			) {
				return;
			}

			// appfree init
			init();
			// appfree call
			appfreeExec('import', '', '_', '', function () {
				Main.offLoading();
			});
		},
	};

	/**
	 * Xecure 호출 함수 집합
	 */
	_public.XecureSmart = {
		//Call 공인인증서 로그인
		runXecureLogin: function (certType, successCB, eData, useUbiKey) {
			var certString = lifeplanetVid;

			if (typeof param01 != 'string') {
				param01 = 'null';
			}

			var nfiObj = new Array();
			nfiObj[0] = certString;
			nfiObj[1] = certType;
			nfiObj[2] = MXP_PLUGIN_CONST.getConfiguration('XGATEADDR');
			nfiObj[3] = MXP_PLUGIN_CONST.getConfiguration('CERT_GET_ADDR');
			nfiObj[4] = MXP_PLUGIN_CONST.getConfiguration('CERTNAME');
			nfiObj[5] = '20';

			if (util.isNull(eData)) {
				eData = '_';
			}
			nfiObj[6] = eData;

			//유비키 사용 유뮤 데이터 추가
			if (useUbiKey == 'true') {
				nfiObj[7] = true;
				//iOS10에서부터 다른앱 호출하는 경우 실행 여부 알림창 발생하여 취소하는 경우 콜백이 발생하지 않아 Loading 실행되지 않도록 수정
				if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
					Main.offLoading();
				}
			} else {
				nfiObj[7] = false;
			}

			var successCBCustom = function (signResult) {
				if (signResult.certList == 'false') {
					message.alert('COM104');
					Main.offLoading();
					return;
				}

				if (signResult.returnResult == 'false') {
					message.alert('COM103');
					Main.offLoading();
					return;
				} else {
					var _sign_msg = signResult.signed_msg;
					var _vid_msg = signResult.vid_msg;

					var param = {
						certType: certType, // 인증타입
						cert: _sign_msg, // 인증키
						vid: _vid_msg, // 주민등록키 입력을 위한 값
					};

					if (config.getEnv('validExecuteFlag')) {
						params = $.extend(param, {
							validExecuteFlag: config.getEnv('validExecuteFlag'),
						});
					}

					// 전달 받은 callback 실행
					successCB(param);
				}
			};

			var failCB = function (result) {
				if (result.returnResult != undefined) {
					alert(result.returnResult);
				} else {
					message.alert('COM103');
				}
				Main.offLoading();
				return;
			};

			Mxp.exec(successCBCustom, failCB, 'XecureSmartPlugin', 'runXecureLogin', nfiObj);
		},

		//Call 공인인증서 관리
		runXecureSmartCertMgr: function (param01, param02, successCB, failCB) {
			if (typeof param01 != 'string') {
				param01 = 'null';
			} else if (typeof param02 != 'string') {
				param02 = 'null';
			}

			var nfiObj = new Array();
			nfiObj[0] = param01;
			nfiObj[1] = param02;
			nfiObj[2] = MXP_PLUGIN_CONST.getConfiguration('XGATEADDR');
			nfiObj[3] = MXP_PLUGIN_CONST.getConfiguration('CERT_GET_ADDR');
			nfiObj[4] = MXP_PLUGIN_CONST.getConfiguration('CERTNAME');

			Mxp.exec(
				function () {
					Main.offLoading();
				},
				function () {
					Main.offLoading();
				},
				'XecureSmartPlugin',
				'runXecureSmartCertMgr',
				nfiObj
			);
		},

		//Call 공인인증서 가져오기
		runGetXecureCert: function (param01, param02, successCB, failCB) {
			if (typeof param01 != 'string') {
				param01 = 'null';
			}

			var CERT_GET_ADDR = MXP_PLUGIN_CONST.getConfiguration('CERT_GET_ADDR');

			if (CERT_GET_ADDR == '' || CERT_GET_ADDR == null) {
				CERT_GET_ADDR = 'null';
			}

			var nfiObj = new Array();
			nfiObj[0] = param01;
			nfiObj[1] = param02;
			nfiObj[2] = MXP_PLUGIN_CONST.getConfiguration('CERT_PORT');
			nfiObj[3] = CERT_GET_ADDR;
			nfiObj[4] = MXP_PLUGIN_CONST.getConfiguration('CERTNAME');

			Mxp.exec(
				function () {
					Main.offLoading();
				},
				function () {
					Main.offLoading();
				},
				'XecureSmartPlugin',
				'runGetXecureCert',
				nfiObj
			);
		},
	};

	/**
	 * UbiKey 관련 호출 함수 집합
	 */
	_public.UbiKey = {
		//모바일 앱일경우 UbiKey앱이 설치되어 있는지 여부 체크
		isExistUbikeyApp: function (successCB) {
			if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
				//입일 경우
				if (fpLogin == 'Y' && _public.fpURLChk()) {
					//지문인증으로 로그인 했을때
					successCB('false');
				} else {
					Mxp.exec(successCB, null, 'XecureSmartPlugin', 'isExistUbikeyApp', []);
				}
			} else {
				successCB('false');
			}
		},
	};

	_public.SNS = {
		login: function (successCB, failCB, type) {
			Mxp.exec(successCB, failCB, 'LifeplanetPlugin', 'snsLogin', [type]);
		},
	};

	/**
	 * FIDO 바이오인증 에러코드 정의
	 */
	_public.FIDOError = {
		data: [
			{ code: '-9999', msg: '지문인증이 원활하지 않습니다. 다시 시도해주세요.' }, // 알수 없는 오류인 경우
			{ code: '0100', msg: '지문등록 해지시 오류가 발생했습니다.' },
			{ code: '1000', msg: '해당 업무를 처리하기 위해서는 지문등록이 필요합니다.' },
			{ code: '2000', msg: '지문인증을 사용하기 위해서는 [바이오인증공동앱]을 최신버전으로 설치해야 합니다.' },
			{ code: '2001', msg: '단말기 정보가 없습니다. 지문인증 로그인후 다시 이용해주세요.' },
			{ code: '2002', msg: '지문인증에 실패했습니다.\n계속 발생시 고객센터로 문의해주세요.(Tel 1566-0999)' },
			{ code: '2003', msg: '지문등록방식 변경으로 인해 지문을 재등록 하셔야 사용가능합니다.' },
			{ code: '2004', msg: '지문인증 이용동의를 완료해주세요.' },
			{ code: '2005', msg: '해당 기기에 지문이 등록 되어있지 않습니다.\n등록후 시도해주세요.' },
			{ code: '2006', msg: '지문등록이 완료되었습니다.\n 등록하신 지문으로 인증하시면 청약이 완료됩니다.' },
			{ code: '5111', msg: '금융결제원에 저장된 지문정보가 없습니다. 등록 후 이용하실수 있습니다.' },
			{ code: '5112', msg: '가입된 지문인증이 없습니다.등록후 사용하시기 바랍니다.' },
			{ code: '5113', msg: '가입된 지문인증이 없습니다.등록후 사용하시기 바랍니다.' },
			{ code: '5122', msg: '지문등록 시 사용하신 지문이 아닙니다.등록하신 지문으로만 이용가능합니다.' },
			{ code: '7000', msg: '재등록할 경우 이전에 등록된 지문은 사용하실 수 없습니다.' },
			{ code: '7001', msg: '재등록할 경우 이전에 등록된 타 금융기관의 지문은 사용하실 수 없습니다.' },
			{ code: '7002', msg: '타 금융기관에 등록된 지문이 없습니다.' },
			{ code: '7003', msg: '타 금융기관 지문등록이 완료되었습니다.' },
			{
				code: '7004',
				msg: '고객님의 스마트폰에 등록된 지문이 있어야 이용가능합니다.\n 스마트폰의 설정 메뉴에서 지문을 등록하신 후 이용해주세요.',
			},
			{ code: '7005', msg: '잠시만 기다려주세요.\n 기기정보 확인중입니다.' },
			{ code: '7006', msg: '바이오인증 공동앱이 설치되어있지 않습니다.' },
			{ code: '8000', msg: '해지할 경우 지문 재등록 후 이용하셔야 합니다.' },
			{ code: '8001', msg: '해지할 경우 이전에 등록된 타 금융기관의 지문은 더이상 사용하실 수 없습니다.' },
			{ code: '9000', msg: '보유계약이 존재하지 않아 지문을 등록 하실 수 없습니다.' },
			{ code: '-1260', msg: '고객님이 스마트폰에 등록한 지문정보가 변경되었습니다. 지문을 다시 등록하신 후 이용하실 수 있습니다.' }, //단말기 설정의 지문이 변경된경우(iOS전용)
			{ code: '1260', msg: '고객님이 스마트폰에 등록한 지문정보가 변경되었습니다. 지문을 다시 등록하신 후 이용하실 수 있습니다.' }, //단말기 설정의 지문이 변경된경우(Android 전용)
			{ code: '1501', msg: '루팅된단말에서는 지문인증을 이용하실 수 없습니다.' }, // 루팅된 단말인경우(Android전용)
			{ code: '-1501', msg: '루팅된단말에서는 지문인증을 이용하실 수 없습니다.' }, // 루팅된 단말인경우(Android전용)

			//모바일웹 에러코드 추가
			{ code: '9999', msg: '지문인증이 원활하지 않습니다.다시 시도해주세요.' }, // 알수 없는 오류인 경우
			{ code: '3000', msg: '지문인증 지원하지 않는 단말입니다.' }, // 지원하지 않는 단말인경우
			{
				code: '3001',
				msg:
					'금융결제원 바이오인증 공동앱 설치 또는 최신버전 업데이트 후 이용 가능합니다.\n * 바이오인증 공동앱 설치/업데이트 완료 후 당사페이지로 이동해야 합니다.',
			}, // 모바일웹에서 바이오인증 공동앱이 설치되어 있지 않은 경우
			{
				code: '3002',
				msg:
					'금융결제원 바이오인증 공동앱 설치 또는 최신버전 업데이트 후 이용 가능합니다.\n * 바이오인증 공동앱 설치/업데이트 완료 후 당사페이지로 이동해야 합니다.\n* 절전모드가 실행중이면 절전모드를 해제하셔야 합니다.',
			}, // 모바일웹에서 바이오인증 공동앱이 설치되어 있지 않은 경우
			{ code: '1203', msg: '인증을 취소하였습니다.' }, // 사용자가 인증을 취소한 경우
			{ code: '4000', msg: '유효하지 않은 접근입니다.' },

			//바이오오픈인증 정의된 에러코드추가
			{ code: '-4002', msg: '가입된 지문인증이 없습니다.등록후 사용하시기 바랍니다.' },
		],
		getMessage: function (code) {
			if (code == '-4302') {
				return;
			}
			var returnMsg = MXP_PLUGIN.FIDOError.data[0].msg;
			if (code == null) {
				returnMsg = MXP_PLUGIN.FIDOError.data[0].msg;
			} else {
				for (var inx in MXP_PLUGIN.FIDOError.data) {
					if (MXP_PLUGIN.FIDOError.data[inx].code == code) {
						returnMsg = MXP_PLUGIN.FIDOError.data[inx].msg;
						break;
					}
				}

				if (returnMsg == null) {
					returnMsg = MXP_PLUGIN.FIDOError.data[0].msg;
				}

				returnMsg = returnMsg + '[' + code + ']';
			}
			if (MXP_PLUGIN.isiPhoneX()) {
				returnMsg = returnMsg.replace(/지문/g, 'Face ID');
			}
			alert(returnMsg);
		},
	};
	/**
	 * FIDO 바이오 인증 관련 함수
	 */
	_public.FIDO = {
		inputCallback: null, //callback function
		processID: null,
		certType: null,
		infoData: {},

		processType: {
			CHECK_SELF: 1, //자사등록 체크
			REGI_INFO_S: 2, //등록정보생성(서버)
			REGI_INFO_C: 3, //등록정보생성(단말)
			REGI_S: 4, //등록(서버)
			REGI_C: 5, //등록(단말)
			REGI_SAVE: 6, //자사인증 등록저장
			OTHER_SAVE: 7, //타사호환인증 등록저장
			GET_INFO: 8, //바이오정보조회
			AUTH_INFO_SELF_S: 9, //자사인증생성(서버)
			AUTH_INFO_SELF_C: 10, //자사인증생성(단말)
			AUTH_SELF_S: 11, //자사인증
			AUTH_INFO_OTHER_S: 12, //타사인증생성(서버)
			AUTH_INFO_OTHER_C: 13, //타사인증생성(단말)
			AUTH_OTHER_S: 14, //타사인증(서버)
			CANCEL_S: 15, //해지(서버)
			CANCEL_C: 16, //해지(단말)
			GET_NIDCPT_S: 17, //타사식별호환번호리스트조회(서버)
			GET_NIDCPT_C: 18, //타사식별호환번호리스트조회(단말)
			GET_ITTTNAME: 19, //기관코드명 조회
			CLIENT_ERR: 20, //단말에러발생
			REGI_OP: 21, //바이오오픈등록
		},

		/**
		 * 바이오 등록 지원여부
		 * param
		 * ** return JSONObject
		 * intalled : FIDO 연계앱 설치여부 확인("true","false")
		 * supported : FIDO 가능여부 확인
		 * ** true 	 : 지문이증 지원 (iOS인경우 지문인증 지원&&지문등록)
		 * ** false	 : 지문인증 미지원
		 * ** none	 : iOS인 경우 지문 지원하는 단말이지만 지문이 등록되지 않은 경우, android는 해당 값 없음
		 */
		supportDevice: function (successCB, failCB) {
			if (failCB != undefined) {
				Mxp.exec(successCB, failCB, 'FIDOPlugin', 'supportDevice', []);
			} else {
				Mxp.exec(successCB, null, 'FIDOPlugin', 'supportDevice', []);
			}
		},

		/**
		 * FIDO 연계앱 설치 요청
		 */
		requestAppInstall: function () {
			Mxp.exec(null, null, 'FIDOPlugin', 'requestAppInstall', []);
		},

		/**
		 * 자사 등록여부 체크(자사,호환인증 모두 포함)
		 * @type
		 * login(로그인) / 청약(application) / work(유지업무)
		 * 청약인지, 로그인인지, 유지업무인지 분별할 수 있는 값이 존재해야 하나?
		 * isSW 		: SW방식 동작여부 판별(true : sw방식 사용)
		 * isLocal		: 바이오인증공동앱 디바이스 정보를 저장된 데이터를 사용하는 여부(Boolean)
		 * 	** true		: 저장된 데이터를 가져온다
		 *  ** false	: 바이오인증공동앱을 실행하여 가져온다
		 * @return
		 * **insData
		 * dvceId 		: 디바이스ID
		 * dvceOs		: OS(1:android, 2:ios)
		 * **outData
		 * fdRspnCd 	: 응답코드 0000(정상), 1000(미등록)
		 * rgiYnInqrKey : 등록여부조회키(SHA256암호화된데이터)
		 * rgiMtptCd 	: 등록방식코드 01(일반등록),02(보안등록)
		 * ahrzTp 		: 인증타입  S(자사등록), 호환등록(C)
		 * fdSvcCd		: 서비스코드(001:일반등록서비스, 002:보안등록서비스) -> 추후 이값은 인증 사용됨
		 * nidCptbNo    : 비식별환번호
		 * fdMtpt		: FIDO등록방식코드(P:공파, I:개파) -> 호환등록(S)인경우에만 값이 존재
		 * psno			: 주민번호(암호화)
		 * aaid			: aaid(호환인증일경우 필요, DB에 추가예정)
		 */
		checkOwnRegister: function (callback, type, isSW, isLocal) {
			this.inputCallback = callback;
			this.processID = MXP_PLUGIN.FIDO.processType.CHECK_SELF;
			this.certType = type;
			this.isSW = isSW;

			MXP_PLUGIN.FIDO.getDeviceInfo(
				function (data) {
					var bioOpYn = data.bioOpYn;

					if (bioOpYn == 'Y') {
						//오픈인증 등록된 경우
						callback(data);
					} else {
						//기존 바이오인증공동앱을 통한 등록된 경우
						if (MXP_PLUGIN.FIDO.isSW == true && MXP_PLUGIN.isAndroid()) {
							// 바이오인증공동앱 안드로이드 Q버전 관련 대응
							// 안드로이드 Q 이상일 경우, 바이오인증공동 2.14 버전 이상 필요
							var deviceOsVersion = Number(device.Platform.version.split('.')[0]);

							if (data.appVer < '0107' || (deviceOsVersion >= '10' && data.appVer < '0214')) {
								//alert("지문인증을 사용하기 위해서는 [바이오인증공동앱]을 최신버전으로 설치해야 합니다.");
								MXP_PLUGIN.FIDOError.getMessage('2000');
								Main.offLoading();
								MXP_PLUGIN.FIDO.requestAppInstall();
								return;
							}
						}
						MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, data);
						MXP_PLUGIN.FIDO.infoData.type = MXP_PLUGIN.FIDO.certType;
						if (MXP_PLUGIN.FIDO.infoData.dvceId != undefined) {
							MXP_PLUGIN.FIDO.checkSelfRegister(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
						} else {
							try {
								$.ajax({
									type: 'POST',
									async: true, //비동기방식
									url: '/common/cc/MWCommonUtil.ajax',
									dataType: 'json',
									data: { tradeKey: 'scriptErrorLog', message: 'FIDO Device Info Error', dutj_sc_cd: 'D' },
									error: function (data) {
										//통신 에러 발생시 처리
									},
									success: function (data) {
										//통신 성공시 처리
									},
								});
							} catch (e) {}
						}
					}
				},
				function () {
					//에러처리
				},
				isLocal
			);
		},
		/**
		 * 호환인증 등록여부 체크(추후개발하자)
		 */
		checkOtherRegister: function (callback, param, type) {},

		/**
		 * 자사 바이오 등록
		 * @param
		 * dvceOs		: 단말운영체제
		 * dvceId 	 	: 단말아이디
		 * mask_psno 	: 마스킹된 주민번호
		 * ahrzTchnCd 	: 인증기술코드(100:지문인증)
		 * fdSvcCd 		: 서비스코드(001:일반등록서비스, 002:보안등록서비스, 003:바이오오픈)
		 * rgiMtptCd 	: 등록방식코드(01:일반등록, 02: 보안등록)
		 * cprSignaTp   : 축약서명타입(현재는 0으로 무조건 값을 셋팅해줘야함)
		 * @type
		 * login(로그인), 청약(application), work(유지업무)
		 * @return
		 * * outData
		 * fdRspnCd		: 응답코드(0000:성공)
		 *
		 */
		requestRegister: function (callback, param, type) {
			this.inputCallback = callback;
			this.processID = MXP_PLUGIN.FIDO.processType.REGI_OP;
			this.infoData = param;
			this.infoData.type = type;
			MXP_PLUGIN.FIDO.requestBioOpReg(MXP_PLUGIN.FIDO.infoData, function (outData) {
				var rspnCd = Number.parseInt(outData.fdRspnCd);
				if (rspnCd < 0 && outData.fdRspnCd != '-4302') {
					try {
						$.ajax({
							type: 'POST',
							async: true, //비동기방식
							url: '/common/cc/MWCommonUtil.ajax',
							dataType: 'json',
							data: { tradeKey: 'scriptErrorLog', message: outData.fdRspnCd, dutj_sc_cd: 'F' },
							error: function (data) {},
							success: function (data) {},
						});
					} catch (e) {}
				}
				callback(outData);
			});
		},

		/**
		 * 인증요청
		 * @callback		: 콜백함수
		 * @param
		 * ** ahrzTp	    : 인증타입(S:자사인증, C:호환인증)
		 * ** traTp         : 거래타입(0:인증, 1:서명 , 2:서명[거래내역X])
		 * ** fdSvcCd	    : 서비스코드
		 * ** psno		    : 암호환된 주민번호
		 * ** rgiMtptCd	    : 등록방식코드 01(일반등록),02(보안등록)
		 * ** nidCptbNo		: 비식별호환번호, 호환인증일경우에만 값을 넣어줌
		 * ** fdMtpt		: FIDO등록방식코드(P:공파, I:개파), 호환인증일경우에만 값을 넣어줌
		 * ** signCertParam : 거래타입이 1인경우에만 설정
		 * ** type          : login(로그인), 청약(application), work(유지업무)
		 * ** aaid			: AAID(호환인증인 필요 )
		 * @return
		 * ** insData
		 * *  nidCptbTkn    : 비식별호환토큰(추후 사용될수 없음)
		 * *  verSrno 		: SW방식 사용여부(0:hw방식 1:sw방식)
		 * ** outData
		 * *  fdRspnCd	    : 응답코드 (0000:성공)
		 * *  usagRspnMsg   : 용도응답메시지(거래내역일경우 출금이체방지에 사용됨)
		 * *  traPatiHash   : 거레내역HASH, 부인방지시 사용
		 * *  nonRepTkn     : 부인방지토큰, 부인방지시 사용
		 * *  wstno		    : 전문추적번호
		 */
		requestAuth: function (callback, param) {
			this.inputCallback = callback;
			this.processID = MXP_PLUGIN.FIDO.processType.GET_INFO;
			this.infoData = param;
			if (param.bioOpYn == 'Y') {
				//바이오오픈인증인경우
				MXP_PLUGIN.FIDO.requestBioOpAuth(MXP_PLUGIN.FIDO.infoData, function (outData) {
					var rspnCd = Number.parseInt(outData.fdRspnCd);
					if (rspnCd < 0 && outData.fdRspnCd != '-4302') {
						// 단말에서 바이오오픈인증 에러발생하는경우(취소 누른경우 예외)
						try {
							$.ajax({
								type: 'POST',
								async: true, //비동기방식
								url: '/common/cc/MWCommonUtil.ajax',
								dataType: 'json',
								data: { tradeKey: 'scriptErrorLog', message: outData.fdRspnCd, dutj_sc_cd: 'F' },
								error: function (data) {
									//통신 에러 발생시 처리
								},
								success: function (data) {
									//통신 성공시 처리
								},
							});
						} catch (e) {}
					}
					callback(outData);
				});
			} else {
				MXP_PLUGIN.FIDO.getDeviceInfo(
					function (data) {
						console.log('getDeviceInfo:' + JSON.stringify(data));
						MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, data);
						MXP_PLUGIN.FIDO.checkSelfRegister(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
					},
					function () {
						//에러처리
					},
					true
				);
			}
		},

		/**
		 * 호환인증 최초 인증요청
		 * @callback		: 콜백함수
		 * @param
		 * ** ahrzTp	    : 인증타입(C:호환인증)
		 * ** traTp         : 거래타입(0:인증, 1:서명 , 2:서명[거래내역X])
		 * ** fdSvcCd	    : 서비스코드(보안서비스 : 002)
		 * ** psno		    : 암호환된 주민번호
		 * ** nidCptbNo     : 비식별호환번호
		 * ** fdMtpt		: FIDO등록방식코드(P:공파, I:개파)
		 * ** signCertParam : 거래타입이 1인경우에만 설정
		 * ** aaid			: AAID
		 * ** rgiMtptCd		: 등록방식코드 01(일반등록),02(보안등록), 호환인증등록은 무조건 02로
		 * *** type
		 * login(로그인), 청약(application), work(유지업무)
		 * @return
		 * ** insData
		 * *  nidCptbTkn    : 비식별호환토큰(추후 사용될수 없음)
		 * ** outData
		 * *  fdRspnCd	    : 응답코드 (0000:성공)
		 * *  usagRspnMsg   : 용도응답메시지(거래내역일경우 출금이체방지에 사용됨)
		 * *  traPatiHash   : 거레내역HASH, 부인방지시 사용
		 * *  nonRepTkn     : 부인방지토큰, 부인방지시 사용
		 * *  wstno		    : 전문추적번호
		 *
		 */
		requestInitAuthOther: function (callback, param, type) {
			this.inputCallback = callback;
			this.processID = MXP_PLUGIN.FIDO.processType.AUTH_INFO_OTHER_S;
			this.infoData = param;
			this.certType = type;

			MXP_PLUGIN.FIDO.getDeviceInfo(
				function (data) {
					console.log('getDeviceInfo:' + JSON.stringify(data));
					MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, data);
					MXP_PLUGIN.FIDO.infoData.type = MXP_PLUGIN.FIDO.certType;
					MXP_PLUGIN.FIDO.requestSelfAuthInfoToServer(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
				},
				function () {
					//에러처리
				}
			);
		},

		/**
		 * 자사 바이오 해지 요청
		 * @callback 콜백함수
		 * @bioOpYn  바이오오픈인증 사용유무
		 * @param	 해지하는 디바이스 바이오정보
		 * @return
		 * * cancelList		JSONArray
		 * ** fdRspnCd	      : 응답코드(0000:성공, 5111:미등록 등록여부조회, 5113:미등록 단말, 3000:해지시 삭제발생)
		 *
		 */
		requestCancel: function (callback, bioOpYn, param) {
			if (bioOpYn == 'Y') {
				//바이오오픈인증 해지인경우
				MXP_PLUGIN.FIDO.requestBioOpDeReg(param, callback);
			} else {
				this.inputCallback = callback;
				this.processID = MXP_PLUGIN.FIDO.processType.CANCEL_S;
				MXP_PLUGIN.FIDO.getDeviceInfo(
					function (data) {
						MXP_PLUGIN.FIDO.infoData.dvceId = data.dvceId;
						MXP_PLUGIN.FIDO.infoData.dvceOs = data.dvceOs;

						MXP_PLUGIN.FIDO.cancelToServer(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
					},
					function () {
						//에러처리
					}
				);
			}
		},

		/**
		 * 타사인증 비식별호환 리스트 조회한다.
		 * @callback	: 콜백함수
		 * @param
		 * dvceId		: 디바이스ID
		 * psno			: 암호화된 주민번호
		 * @return
		 * isExist				  : 비식별호환리스트 존재여부(true)
		 * ** nidList(JSONArray)  : 호환인증리스트
		 * * nidCptbNo		      : 비식별호환번호
		 * * ahrzTchnCd		      : 인증기술코드
		 * * fdSvcCd			  : FIDO 서비스코드
		 * * rgiMtptCd			  : 등록방식코드(01:일반등록, 02:보안등록)
		 * * aaid				  : AAID
		 * * itttNm				  : 참가기관명
		 * * orgCd				  : 참가기관코드
		 * * fdMtpt				  : FIDO등록방식코드(P:공파 , I:개파)
		 */

		retreiveNidCptbNoList: function (callback, param) {
			this.inputCallback = callback;
			this.processID = MXP_PLUGIN.FIDO.processType.GET_NIDCPT_S;
			MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, param);
			MXP_PLUGIN.FIDO.retreiveNidCptbNoListToServer(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
		},

		/**
		 * 지문인증 성공후 바이오정보를 시스템에 저장하기 위한 함수
		 * @callback	: 콜백함수
		 * @param
		 *
		 *
		 * @return
		 * * outData
		 * fdRspnCd		: 응답코드(0000:성공)
		 */
		saveBioInfo: function (callback, param) {
			MXP_PLUGIN.FIDO.requestBioOpSave(param, callback);
		},

		/**
		 * 일반지문 등록후 PIN등록/인증 완료후 보안등록으로 변경하기 위한 함수
		 * @callback	: 콜백함수
		 * @param
		 * dvceId       :디바이스ID
		 *
		 * @return
		 * * outData
		 * fdRspnCd		: 응답코드(0000:성공)
		 */
		saveCmplxBioInfo: function (callback, param) {
			MXP_PLUGIN.FIDO.saveCmplxRegToServer(param, callback);
		},

		/**
		 * 콜백 프로세스
		 */
		callbackProcess: function (param) {
			//return Code로 보고 추후 에러처리
			var returnCode = null;
			if (param.outData != undefined) {
				resultData = param.outData;
			}

			console.log('callbackProcess:' + JSON.stringify(param) + ' \n processID:' + MXP_PLUGIN.FIDO.processID);
			var id = MXP_PLUGIN.FIDO.processID;
			if (id == MXP_PLUGIN.FIDO.processType.CHECK_SELF) {
				MXP_PLUGIN.FIDO.inputCallback(param);
			} else if (id == MXP_PLUGIN.FIDO.processType.REGI_INFO_S) {
				var inputData = param.outData;
				returnCode = inputData.fdRspnCd;

				if (returnCode == '0000') {
					// 성공인 경우
					MXP_PLUGIN.fpInfoLayerShow();
					if (MXP_PLUGIN.isAndroid()) {
						Main.onLoading();
					}

					MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.REGI_INFO_C;
					MXP_PLUGIN.FIDO.makeProcessData(MXP_PLUGIN.FIDO.processID, param);
					MXP_PLUGIN.FIDO.requestRegInfoToClient(inputData, MXP_PLUGIN.FIDO.callbackProcess);
				}
				//에러처리
				else {
					MXP_PLUGIN.FIDOError.getMessage(returnCode);
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.REGI_INFO_C) {
				MXP_PLUGIN.fpInfoLayerHide();
				if (MXP_PLUGIN.isAndroid()) {
					Main.offLoading();
				}

				/*************
				 *단말에서 에러발생할경우 확인불가하여 전문은 무조건 보내야함(추후 수정 )
				 */

				if (param.rspnCd != undefined) {
					if (param.rspnCd == '0000') {
						//성공한 경우에만 인증요청 실행되도
						param = $.extend(param, MXP_PLUGIN.FIDO.infoData.pData);
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.REGI_S;
					} else {
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.CLIENT_ERR;
						MXP_PLUGIN.FIDOError.getMessage(param.rspnCd);
					}
				} else {
					MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.CLIENT_ERR;
					MXP_PLUGIN.FIDOError.getMessage();
				}

				MXP_PLUGIN.FIDO.requestRegToServer(param, MXP_PLUGIN.FIDO.callbackProcess);
			} else if (id == MXP_PLUGIN.FIDO.processType.REGI_S) {
				if (MXP_PLUGIN.isAndroid()) {
					Main.onLoading();
				}
				MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.REGI_C;
				//비식별호환번호저장
				if (param.outData.nidCptbNo != undefined) {
					MXP_PLUGIN.FIDO.infoData.nidCptbNo = param.outData.nidCptbNo;
				}
				//				MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, param.outData);

				MXP_PLUGIN.FIDO.requestRegToClient(param.outData, MXP_PLUGIN.FIDO.callbackProcess);

				/**
				 * 비식별호환번호 단말에 저장완료되면 등록 정보를 저장..
				 */
			} else if (id == MXP_PLUGIN.FIDO.processType.REGI_C) {
				if (MXP_PLUGIN.isAndroid()) {
					Main.offLoading();
				}
				if (param.result == 'Success') {
					MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.REGI_SAVE;
					MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.infoData.pData);
					if (MXP_PLUGIN.FIDO.infoData.type != 'application') {
						// 로그인페이지에서 지문등록하는 경우 추후에 핀인증 성공후 지문등록하기 위한 조건
						MXP_PLUGIN.FIDO.infoData.outData = {};
						MXP_PLUGIN.FIDO.infoData.outData.fdRspnCd = '0000';
						MXP_PLUGIN.FIDO.inputCallback(MXP_PLUGIN.FIDO.infoData);
					} else {
						// 청약이면서 지문등록하는경우
						MXP_PLUGIN.FIDO.saveRegToServer(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
					}
				} else {
					// 실패인경우
					//추후 단말 저장 실패도 처리하자..
					MXP_PLUGIN.FIDOError.getMessage();
					MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.CLIENT_ERR;
					MXP_PLUGIN.FIDO.saveRegToServer(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.REGI_SAVE) {
				MXP_PLUGIN.FIDO.inputCallback(param);
			} else if (id == MXP_PLUGIN.FIDO.processType.GET_INFO) {
				returnCode = param.outData.fdRspnCd;
				if (returnCode == '0000') {
					// 조회성공
					if (param.outData.ahrzTp == 'S') {
						// 자사인증인 경우
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.AUTH_INFO_SELF_S;
					} else {
						//호환인증
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.AUTH_INFO_OTHER_S;
					}
					MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, param.outData);
					MXP_PLUGIN.FIDO.requestSelfAuthInfoToServer(MXP_PLUGIN.FIDO.infoData, MXP_PLUGIN.FIDO.callbackProcess);
				} else {
					//조회시 없을경우 에러치리...
					MXP_PLUGIN.FIDOError.getMessage(returnCode);
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.AUTH_INFO_SELF_S) {
				returnCode = param.outData.fdRspnCd;

				if (returnCode == '0000') {
					//MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, param);
					MXP_PLUGIN.FIDO.infoData.result = param.outData;
					if (param.outData.traPatiHash != undefined) {
						MXP_PLUGIN.FIDO.infoData.traPatiHash = param.outData.traPatiHash;
					}
					if (param.outData.nonRepTkn != undefined) {
						MXP_PLUGIN.FIDO.infoData.nonRepTkn = param.outData.nonRepTkn;
					}
					MXP_PLUGIN.FIDO.makeProcessData(MXP_PLUGIN.FIDO.processID, param);
					MXP_PLUGIN.FIDO.getDeviceInfo(
						function (data) {
							var success = MXP_PLUGIN.FIDO.checkAppVersion(MXP_PLUGIN.FIDO.infoData.result, data);
							if (success) {
								MXP_PLUGIN.fpInfoLayerShow();
								if (MXP_PLUGIN.isAndroid()) {
									Main.onLoading();
								}
								MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.AUTH_INFO_SELF_C;
								MXP_PLUGIN.FIDO.sendAuthRequestMessage(MXP_PLUGIN.FIDO.infoData.result, MXP_PLUGIN.FIDO.callbackProcess);
							}
						},
						function () {
							MXP_PLUGIN.FIDOError.getMessage();
						},
						true
					);
				} else {
					// 에러처리
					MXP_PLUGIN.FIDOError.getMessage();
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.AUTH_INFO_SELF_C) {
				MXP_PLUGIN.fpInfoLayerHide();
				if (MXP_PLUGIN.isAndroid()) {
					Main.offLoading();
				}
				if (param.rspnCd != undefined) {
					if (param.rspnCd == '0000') {
						//성공한 경우에만 인증요청 실행되도록
						//if(MXP_PLUGIN.FIDO.infoData.type != "login") {
						if (MXP_PLUGIN.FIDO.infoData.traTp != '0') {
							param.usagSc = '1'; //용도구분(0:미사용, 1:사용, 출금이체동의에 사용됨)
						} else {
							param.usagSc = '0'; //용도구분(0:미사용, 1:사용, 출금이체동의에 사용됨)
						}

						//sw인증방식 설정
						if (MXP_PLUGIN.isAndroid()) {
							if (param.swDevice == 'Y') {
								param.verSrno = '1';
							} else {
								param.verSrno = '0';
							}
						} else {
							// iOS인경우 무조건 SW방식으로 설정
							param.verSrno = '1';
						}

						param = $.extend(param, MXP_PLUGIN.FIDO.infoData.pData);
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.AUTH_SELF_S;
						MXP_PLUGIN.FIDO.AuthSelfToServer(param, MXP_PLUGIN.FIDO.callbackProcess);
					} else {
						MXP_PLUGIN.FIDOError.getMessage(param.rspnCd);
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.CLIENT_ERR;
						MXP_PLUGIN.FIDO.AuthSelfToServer(param, MXP_PLUGIN.FIDO.callbackProcess);
					}
				} else {
					//추후 에러코드가 없는경우도 할수 있도록 수정(로그이력)
					MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.CLIENT_ERR;
					MXP_PLUGIN.FIDOError.getMessage();
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.AUTH_SELF_S) {
				returnCode = param.outData.fdRspnCd;
				if (returnCode == '0000') {
					if (MXP_PLUGIN.FIDO.infoData.traPatiHash != undefined) {
						param.outData.traPatiHash = MXP_PLUGIN.FIDO.infoData.traPatiHash;
					}
					if (MXP_PLUGIN.FIDO.infoData.nonRepTkn != undefined) {
						param.outData.nonRepTkn = MXP_PLUGIN.FIDO.infoData.nonRepTkn;
					}
					if (MXP_PLUGIN.FIDO.infoData.pData.wstno != undefined) {
						param.outData.wstno = MXP_PLUGIN.FIDO.infoData.pData.wstno;
					}

					MXP_PLUGIN.FIDO.inputCallback(param);
				} else {
					MXP_PLUGIN.FIDOError.getMessage(returnCode);
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.AUTH_INFO_OTHER_S) {
				returnCode = param.outData.fdRspnCd;
				if (returnCode == '0000') {
					MXP_PLUGIN.FIDO.infoData = param;
					MXP_PLUGIN.FIDO.infoData.result = param.outData;
					param.outData.nidCptbNo = param.inSData.nidCptbNo;
					param.outData.aaid = param.inSData.aaid;
					if (param.inSData.type != undefined) {
						MXP_PLUGIN.FIDO.infoData.type = param.inSData.type;
					}
					if (param.outData.traPatiHash != undefined) {
						MXP_PLUGIN.FIDO.infoData.traPatiHash = param.outData.traPatiHash;
					}

					if (param.outData.nonRepTkn != undefined) {
						MXP_PLUGIN.FIDO.infoData.nonRepTkn = param.outData.nonRepTkn;
					}
					MXP_PLUGIN.FIDO.makeProcessData(MXP_PLUGIN.FIDO.processID, param);
					MXP_PLUGIN.FIDO.getDeviceInfo(
						function (data) {
							var success = MXP_PLUGIN.FIDO.checkAppVersion(MXP_PLUGIN.FIDO.infoData.result, data);
							if (success) {
								MXP_PLUGIN.fpInfoLayerShow();
								if (MXP_PLUGIN.isAndroid()) {
									Main.onLoading();
								}
								MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.AUTH_INFO_OTHER_C;
								MXP_PLUGIN.FIDO.sendOtherAuthRequestMessage(param.outData, MXP_PLUGIN.FIDO.callbackProcess);
							}
						},
						function () {
							MXP_PLUGIN.FIDOError.getMessage();
						}
					);

					// 버전체크 않하는 로직
					//					if((MXP_PLUGIN.isAndroid())) {
					//						Main.onLoading();
					//					}
					//					MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.AUTH_INFO_OTHER_C;
					//					MXP_PLUGIN.FIDO.sendOtherAuthRequestMessage(param.outData,MXP_PLUGIN.FIDO.callbackProcess);
				} else {
					// 에러처리
					MXP_PLUGIN.FIDOError.getMessage(returnCode);
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.AUTH_INFO_OTHER_C) {
				MXP_PLUGIN.fpInfoLayerHide();
				if (MXP_PLUGIN.isAndroid()) {
					Main.offLoading();
				}
				if (param.rspnCd != undefined) {
					if (param.rspnCd == '0000') {
						//성공한 경우에만 인증요청 실행되도록
						//if(MXP_PLUGIN.FIDO.infoData.type != "login") {
						if (MXP_PLUGIN.FIDO.infoData.inSData.traTp != '0') {
							param.usagSc = '1'; //용도구분(0:미사용, 1:사용, 출금이체동의에 사용됨)
						} else {
							param.usagSc = '0'; //용도구분(0:미사용, 1:사용, 출금이체동의에 사용됨)
						}
						param = $.extend(param, MXP_PLUGIN.FIDO.infoData.pData);
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.AUTH_OTHER_S;
						MXP_PLUGIN.FIDO.AuthOtherToServer(param, MXP_PLUGIN.FIDO.callbackProcess);
					} else {
						MXP_PLUGIN.FIDOError.getMessage(param.rspnCd);
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.CLIENT_ERR;
						MXP_PLUGIN.FIDO.AuthOtherToServer(param, MXP_PLUGIN.FIDO.callbackProcess);
					}
				} else {
					//추후 에러코드 없는경우도 에러처리
					MXP_PLUGIN.FIDOError.getMessage();
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.AUTH_OTHER_S) {
				returnCode = param.outData.fdRspnCd;
				if (returnCode == '0000') {
					//성공인경우 호환인증 저장후에
					if (param.outData.usagRspnMsg != undefined) {
						MXP_PLUGIN.FIDO.infoData.usagRspnMsg = param.outData.usagRspnMsg;
					}
					MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.OTHER_SAVE;
					MXP_PLUGIN.FIDO.infoData.inSData.tradeKey = 'save';
					MXP_PLUGIN.FIDO.saveRegToServer(MXP_PLUGIN.FIDO.infoData.inSData, MXP_PLUGIN.FIDO.callbackProcess);
				} else {
					// 호환인증 실패인 경우
					MXP_PLUGIN.FIDOError.getMessage(param.outData.fdRspnCd);
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.OTHER_SAVE) {
				// 호환인증 저장 결과
				if (MXP_PLUGIN.FIDO.infoData.usagRspnMsg != undefined) {
					param.outData.usagRspnMsg = MXP_PLUGIN.FIDO.infoData.usagRspnMsg;
				}
				if (MXP_PLUGIN.FIDO.infoData.traPatiHash != undefined) {
					param.outData.traPatiHash = MXP_PLUGIN.FIDO.infoData.traPatiHash;
				}

				if (MXP_PLUGIN.FIDO.infoData.nonRepTkn != undefined) {
					param.outData.nonRepTkn = MXP_PLUGIN.FIDO.infoData.nonRepTkn;
				}
				if (MXP_PLUGIN.FIDO.infoData.pData.wstno != undefined) {
					param.outData.wstno = MXP_PLUGIN.FIDO.infoData.pData.wstno;
				}
				MXP_PLUGIN.FIDO.inputCallback(param);
			} else if (id == MXP_PLUGIN.FIDO.processType.CANCEL_S) {
				MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.CANCEL_C;
				if (param.outData.bioRcsnRslt != undefined) {
					var ahrzTp = param.outData.bioRcsnRslt[0].ahrzTp;
					if (ahrzTp == 'C') {
						// 호환인증일경우는 단말리스트에서 삭제하지 않음
						var cancelList = new Array();
						var rspnCd = { fdRspnCd: param.outData.bioRcsnRslt[0].fdRspnCd };
						cancelList.push(rspnCd);
						var result = { cancelList: cancelList };
						MXP_PLUGIN.FIDO.inputCallback(result);
						return;
					}

					if (MXP_PLUGIN.isAndroid()) {
						Main.onLoading();
					}
					MXP_PLUGIN.FIDO.cancelToClient(param.outData, MXP_PLUGIN.FIDO.callbackProcess);
				} else {
					//해지조회시 오류 발생한 경우
					MXP_PLUGIN.FIDOError.getMessage('0100');
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.CANCEL_C) {
				if (MXP_PLUGIN.isAndroid()) {
					Main.offLoading();
				}
				MXP_PLUGIN.FIDO.inputCallback(param);
			} else if (id == MXP_PLUGIN.FIDO.processType.GET_NIDCPT_S) {
				//test code
				if (param.outData.fdRspnCd == '0') {
					param.outData.fdRspnCd = '0000';
				}

				returnCode = param.outData.fdRspnCd;
				if (returnCode == '0000') {
					//해지요청 전문 성공인경우
					if (param.outData.allCcn > 0) {
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.GET_NIDCPT_C;
						MXP_PLUGIN.FIDO.infoData = $.extend(MXP_PLUGIN.FIDO.infoData, param.outData);
						var sNidList = { sNidList: param.outData.nidCptbNoList };
						MXP_PLUGIN.FIDO.retreiveNidCptbNoListToClient(sNidList, MXP_PLUGIN.FIDO.callbackProcess);
					} else {
						//비식별호환리스트 존재하지 않음
						MXP_PLUGIN.FIDO.callGetNidCnFailCB();
					}
				} else {
					//실패된경우
					MXP_PLUGIN.FIDO.callGetNidCnFailCB();
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.GET_NIDCPT_C) {
				if (param.nidListClient != undefined) {
					if (param.nidListClient.length > 0) {
						MXP_PLUGIN.FIDO.processID = MXP_PLUGIN.FIDO.processType.GET_ITTTNAME;
						MXP_PLUGIN.FIDO.retreiveItttName(param, MXP_PLUGIN.FIDO.callbackProcess);
					} else {
						MXP_PLUGIN.FIDO.callGetNidCnFailCB();
					}
				} else {
					//비식별호환번호 존재하지 않는경우
					MXP_PLUGIN.FIDO.callGetNidCnFailCB();
				}
			} else if (id == MXP_PLUGIN.FIDO.processType.GET_ITTTNAME) {
				MXP_PLUGIN.FIDO.inputCallback(param);
			}
		},

		/**
		 * 자사등록여부조회
		 */
		checkSelfRegister: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('selfCheck', param, callback);
		},

		/**
		 * 타사등록여부조회
		 */
		checkOtherRegister: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('otherCheck', param, callback);
		},

		/**
		 * 등록생성요청(S)
		 */
		requestRegInfoToSever: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('regInfo', param, callback);
		},

		/**
		 * 등록생성요청(C)
		 */
		requestRegInfoToClient: function (param, callback) {
			var inputData = param;
			inputData.tlsCert = 'MI'; // ********추후 인증서 cert값을 대입
			Mxp.exec(callback, null, 'FIDOPlugin', 'requestRegisterCreate', [inputData]);
		},

		/**
		 * 등록요청(S)
		 */
		requestRegToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('reg', param, callback);
		},

		/**
		 * 등록요청(C)
		 */
		requestRegToClient: function (param, callback) {
			Mxp.exec(callback, null, 'FIDOPlugin', 'requestRegister', [param]);
		},

		/**
		 * 사용자 등록
		 */
		saveRegToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('save', param, callback);
		},

		/**
		 * 자사 인증정보생성 요청
		 */
		requestSelfAuthInfoToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('selfAuthInfo', param, callback);
		},

		/**
		 * FIDO 연계앱에 자사 인증요청메시지 전달
		 */
		sendAuthRequestMessage: function (param, callback) {
			param.tlsCert = 'MI'; //TLS Cert값 추가
			param.fdSvcCd = MXP_PLUGIN.FIDO.infoData.fdSvcCd;
			Mxp.exec(callback, null, 'FIDOPlugin', 'sendAuthRequestMessage', [param]);
		},

		/**
		 * FIDO 연계앱에 타사 인증요청메시지 전달
		 */
		sendOtherAuthRequestMessage: function (param, callback) {
			param.tlsCert = 'MI'; //TLS Cert값 추가
			Mxp.exec(callback, null, 'FIDOPlugin', 'sendOtherAuthRequestMessage', [param]);
		},

		/**
		 * 자사 인증응답메시지 전달
		 */
		AuthSelfToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('selfAuth', param, callback);
		},

		/**
		 * 타사 인증응답메시지 전달
		 */
		AuthOtherToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('otherAuth', param, callback);
		},

		/**
		 * 해지요청
		 */
		cancelToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('cancel', param, callback);
		},

		/**
		 * 해지요청
		 */
		cancelToClient: function (param, callback) {
			param.fdSvcCd = MXP_PLUGIN.FIDO.infoData.fdSvcCd;
			Mxp.exec(callback, null, 'FIDOPlugin', 'requestCancel', [param]);
		},

		/**
		 * 비식별호환리스트요청(서버)
		 */
		retreiveNidCptbNoListToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('getNidCptNo', param, callback);
		},

		/**
		 * 비식별호환리스트요청(단말)
		 */
		retreiveNidCptbNoListToClient: function (param, callback) {
			Mxp.exec(callback, null, 'FIDOPlugin', 'retreiveNidCptbNoList', [param]);
		},

		/**
		 * 기관코드명 가져옴
		 */
		retreiveItttName: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('retreiveItttName', param, callback);
		},

		/**
		 * 바이오인증 복합인증 등록
		 */
		saveCmplxRegToServer: function (param, callback) {
			MXP_PLUGIN.FIDO.transAction('saveCmplx', param, callback);
		},

		/**
		 * FIDO 앱버전을 지원 최소버전을 체크한다.
		 */
		checkAppVersion: function (server, client) {
			var sVersion = server.applVer.substring(0, 4);
			var cVersion = client.appVer;
			if (parseInt(sVersion) > parseInt(cVersion)) {
				// 업데이트 요청
				if (!confirm('바이오인증 공동앱을 최신버전으로 설치 후 이용가능합니다.\n 업데이트 하시겠습니까?')) return false;
				if (MXP_PLUGIN.isAndroid()) {
					MXP_PLUGIN.FIDO.requestAppInstall();
				} else {
					// iOS인 경우 버전 초기화 작업후 AppInstall하도록
					MXP_PLUGIN.FIDO.clearDeviceInfo(function () {
						MXP_PLUGIN.FIDO.requestAppInstall();
					});
				}
				return false;
			} else {
				//
				return true;
			}
		},
		/**
		 * 바이오오픈인증 관련함수
		 */
		requestBioOpReg: function (param, callback) {
			Mxp.exec(callback, null, 'FIDOPlugin', 'requestBioOpReg', [param]);
		},
		requestBioOpAuth: function (param, callback) {
			Mxp.exec(callback, null, 'FIDOPlugin', 'requestBioOpAuth', [param]);
		},
		requestBioOpSave: function (param, callback) {
			Mxp.exec(callback, null, 'FIDOPlugin', 'requestBioOpSave', [param]);
		},
		requestBioOpDeReg: function (param, callback) {
			Mxp.exec(callback, null, 'FIDOPlugin', 'requestBioOpDeReg', [param]);
		},

		/**
		 * FIDO관련 데이터 이전 전문요청데이터를 다음 전문요청에 필요한 데이터를 넣기위해 관련 데이터 생성 함수
		 *
		 */
		makeProcessData: function (processID, param) {
			var pData = {};
			if (processID == MXP_PLUGIN.FIDO.processType.REGI_INFO_C) {
				//등록
				pData.dvceId = param.inSData.dvceId;
				pData.wstAstNo = param.outData.wstAstNo;
				pData.psno = param.outData.psno;
				pData.type = param.inSData.type;
			} else if (processID == MXP_PLUGIN.FIDO.processType.AUTH_INFO_SELF_S) {
				//자사인증
				pData = param.outData;
				pData.type = param.inSData.type;
			} else if (processID == MXP_PLUGIN.FIDO.processType.AUTH_INFO_OTHER_S) {
				//타사인증
				pData = param.outData;
				pData.type = param.inSData.type;
			}

			MXP_PLUGIN.FIDO.infoData.pData = pData;
		},

		/**
		 * FIDO관련 ajax 공통 함수
		 */
		transAction: function (tradeKey, param, successCB, failCB) {
			var tranProp = util.clone(transaction.TRAN_COMM_PROP); // 트랜잭션 기본 객체 복사
			tranProp.url = '/common/thirdParty/FIDO'; // 트랜잭션 Url
			tranProp.tradeKey = tradeKey; // 트랜잭션 TradeKey
			tranProp.params = param; // 트랜잭션 Parameter
			tranProp.success = successCB;
			if (MXP_PLUGIN.FIDO.processID == MXP_PLUGIN.FIDO.processType.CLIENT_ERR) {
				tranProp.failure = MXP_PLUGIN.FIDO.failClientError;
			} else {
				tranProp.failure = failCB;
			}
			// 트랜잭션 실행
			transaction.callTran(tranProp);
		},

		/**
		 * FIDO 연계앱의 버전을 가져온다.
		 */
		getAppVersion: function (successCB, failCB) {
			Mxp.exec(successCB, failCB, 'FIDOPlugin', 'getAppVersion', []);
		},

		/**
		 * FIDO 연계앱의 저장된 비식별호환리스트 가져온다.
		 */
		getNIDCNList: function (successCB, failCB) {
			Mxp.exec(successCB, failCB, 'FIDOPlugin', 'getNIDCNList', []);
		},

		/**
		 * FIDO관련 Device의 정보를 가져온다.
		 * Device ID, OS Type, 인증기술코드
		 */
		getDeviceInfo: function (successCB, failCB, isLocal) {
			Mxp.exec(successCB, failCB, 'FIDOPlugin', 'getDeviceInfo', []);
		},

		/**
		 * iOS FIDO관련 Device 정보를 삭제한다.
		 * Device ID, OS Type, 인증기술코드
		 */
		clearDeviceInfo: function (successCB) {
			Mxp.exec(successCB, null, 'FIDOPlugin', 'clearDeviceInfo', []);
		},

		/**
		 * 단말오류 발생한경우에 Fail Callback 처리를 하지 않기위해
		 */
		failClientError: function () {
			console.log('Client Error..');
		},

		/**
		 * 비식별호환리스트 실패되는 리스트가 없는 없는 호출되는 함수
		 */
		callGetNidCnFailCB: function () {
			var allCcn = { isExist: false };
			var resultData = { inSData: allCcn };
			MXP_PLUGIN.FIDO.inputCallback(resultData);
		},
	};

	/**
	 * 모바일웹 FIDO 바이오 인증 관련 함수
	 */
	_public.FIDOWeb = {
		timerInterval: null,
		timerIntervalSec: 2000, //2초
		timerOut: null,
		timerOutSec: 20000, //20초
		wstNo: '',
		execType: '', //clientCheckComplete 추후 분기처리 필요할경우(regi:등록, auth:인증, deregi:해지)
		fdRspnCd: '',

		/**
		 * FIDO 연계앱 설치 요청
		 */
		requestAppInstall: function () {
			if (MXP_PLUGIN.isIOS()) {
				location.href = 'http://itunes.apple.com/kr/app/baioinjeung-gongdong-aeb/id1189411033?mt=8';
			} else {
				location.href = 'market://details?id=org.kftc.fido.lnk.lnk_app';
			}
		},

		/**
		 * 모바일웹 Tranaction 관리를 위한 전문추적번호 생성
		 * @param
		 * @return
		 * wstno(String)    : 전문 추적번호
		 */
		makeWstNo: function (callback) {
			var param = {};
			MXP_PLUGIN.FIDOWeb.transAction('makeWstno', param, function (param) {
				_public.FIDOWeb.wstNo = param.outData.wstno;
				callback(param);
			});
		},

		/**
		 * 자사 바이오 등록
		 * @param
		 * wstno	    : 전문추적생성번호(makeWstNo function사용하여 생성)
		 * dvceOs		: 단말운영체제
		 * ahrzTchnCd 	: 인증기술코드(100:지문인증)
		 * fdSvcCd 		: 서비스코드(001:일반등록서비스, 002:보안등록서비스)
		 * rgiMtptCd 	: 등록방식코드(01:일반등록, 02: 보안등록)
		 * ahrzTp 		: 인증타입(S:자사등록, C: 호환등록)
		 * failCB		: 등록 실패했을 경우 콜백함수(사용가능유무 판단?????)
		 * @type
		 * login(로그인), 청약(application), work(유지업무)
		 * @return
		 * 
		 * **Examaple
		 * // 테스트 로그인버튼 이벤트 바인딩
			$('#btnTestRegister').bind('click', function() {
			    //CA01000S.ajaxActionCaller('login_test');
			    //CA01000S.runwebapp();
			    MXP_PLUGIN.FIDOWeb.makeWstNo(function(param){
			    	CA01000S.wstno = param.outData.wstno;
			        var data = {};
			        data = param.outData;
			        MXP_PLUGIN.FIDOWeb.requestRegister(data);
			    })
			});
		 *
		 */
		requestRegister: function (param, failCB) {
			param.execType = 'regi'; // W401 바이오인증 공동앱 호출후 업무 구분하기 위한 코드(regi:등록, auth:인증, deregi:해지)
			MXP_PLUGIN.FIDOWeb.transAction('setInfo', param, function (param) {
				MXP_PLUGIN.FIDOWeb.runwebapp(param);
			});
		},

		/**
		 * 바이오인증요청
		 * @failCB			: 실패 콜백함수
		 * @param
		 * ** wstno	    	: 전문추적생성번호(makeWstNo function사용하여 생성)
		 * ** ahrzTchnCd 	: 인증기술코드(100:지문인증, 105:얼굴, 115:장문, 116:PIN, 120:패턴얼굴)
		 * ** traTp         : 거래타입(0:인증, 1:서명 , 2:서명[거래내역X])
		 * ** signCertParam : 거래타입이 1인경우에만 설정
		 * ** type          : login(로그인), 청약(application), work(유지업무)
		 * @return
	     *
		 * **Examaple
		 * // 테스트 로그인버튼 이벤트 바인딩
			$('#btnTestLogin').bind('click', function() {
			    MXP_PLUGIN.FIDOWeb.makeWstNo(function(param){
			      CA01000S.wstno = param.outData.wstno;
			      var data = {};
			      data = param.outData;
			      data.traTp = "0";
			      data.type = "login";
			      data.ahrzTchnCd = "100";
			      
			      MXP_PLUGIN.FIDOWeb.requestAuth(data);
			    })
			    
			});
		 *
		 */

		requestAuth: function (param, wstno) {
			if (wstno != undefined) {
				_public.FIDOWeb.wstNo = wstno;
			}
			param.execType = 'auth'; // W401 바이오인증 공동앱 호출후 업무 구분하기 위한 코드(regi:등록, auth:인증, deregi:해지)
			MXP_PLUGIN.FIDOWeb.transAction('setInfo', param, function (param) {
				MXP_PLUGIN.FIDOWeb.runwebapp(param);
			});
		},

		/**
		 * 바이오인증 디바이스 정보를 시스템에 저장한다.
		 * 복합인증(비밀번호)를 추가로 등록하기 한후 호출됨
		 * @param
		 * ** wstno	    	: 전문추적생성번호(makeWstNo function사용하여 생성)
		 * **callbackFn			: 실패 콜백함수
		 * @return
		 * * outData
		 * ** fdRspnCd      : 응답코드
		 */
		saveBioInfo: function (wstno, callbackFn) {
			var param = {};
			param.wstno = wstno;
			MXP_PLUGIN.FIDOWeb.transAction('save', param, function (result) {
				callbackFn(result);
			});
		},

		/**
		 * 바이오인증 해지요청
		 * @failCB			: 실패 콜백함수
		 * @param
		 * ** wstno	    	: 전문추적생성번호(makeWstNo function사용하여 생성)
		 * @return
	     *
	     * ** Example
	     * $('#btndeRegComplete').bind('click', function() {
			    MXP_PLUGIN.FIDOWeb.makeWstNo(function(param){
			      CA01000S.wstno = param.outData.wstno;
			      var data = {};
			      data = param.outData;
			      MXP_PLUGIN.FIDOWeb.requestCancel(data);
			    })
			    
			});
		 */
		requestCancel: function (param, failCB) {
			param.execType = 'deregi'; // W401 바이오인증 공동앱 호출후 업무 구분하기 위한 코드(regi:등록, auth:인증, deregi:해지)
			MXP_PLUGIN.FIDOWeb.transAction('setInfo', param, function (param) {
				MXP_PLUGIN.FIDOWeb.runwebapp(param);
			});
		},

		/**
		 * 바이오인증 프로세스 완료 Polling 함수 
		 * @param
		 * ** wstno	    	: 전문추적생성번호(makeWstNo function사용하여 생성)
		 * ** callback 		: 콜백함수
		 * @return			: 0000(성공), 0001(진행중), 0002(미존재), 그이외는 Error
	     *
	     * **Example
	     * $('#btnCheckComplete').bind('click', function() {
			  MXP_PLUGIN.FIDOWeb.checkComplete(CA01000S.wstno,
			      function(fdRspnCd){
			        alert('checkComplete:'+fdRspnCd);
			  });
			    
			});
		 */
		checkComplete: function (wstno, callback) {
			//			var param = {};
			//			param.wstno = wstno;	// 전문번호 설정
			//			MXP_PLUGIN.FIDOWeb.transAction("checkComplete",param,
			//					function(param) {
			//						var outData = param.outData;
			//						callback(outData);
			//					}
			//				);
			var param = {};
			param.wstno = wstno;
			param.tradeKey = 'checkComplete';
			try {
				$.ajax({
					type: 'POST',
					async: false,
					url: '/common/thirdParty/FIDOWeb.ajax',
					dataType: 'json',
					data: param,
					error: function (data) {
						//통신 에러 발생시 처리
					},
					success: function (data) {
						//통신 성공시 처리
						var outData = data.result.outData;
						callback(outData);
					},
				});
			} catch (e) {}
		},

		/**
		 * 바이오인증 공동앱을 실행
		 */
		runwebapp: function (data) {
			var param = '';
			var scheme = data.outData.scheme;
			var host = data.outData.host;
			var opCode = data.outData.opCode;
			var siteId = data.outData.siteId;
			var verifyHash = data.outData.verifyHash;
			var callback_url = data.outData.callbackUrl;
			var svcTrId = data.outData.svcTrId;
			param = '?opCode=' + opCode;
			param += '&svcTrId=' + svcTrId;
			param += '&siteId=' + siteId;
			param += '&callbackUrl=' + callback_url;
			param += '&verifyHash=' + verifyHash;

			if (/Android/i.test(navigator.userAgent)) {
				//location.href="intent://"+host+param+"#Intent;scheme="+scheme+";package=com.raonsecure.onepassweb.onepassweb;end";
				location.href = 'intent://' + host + param + '#Intent;scheme=' + scheme + ';package=org.kftc.fido.lnk.lnk_app;end';
			} else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
				location.href = scheme + '://' + host + param;
				//				var url = href=scheme + "://" + host + param;
				//				MXP_PLUGIN.FIDOWeb.runApp_ios(url);
			} else {
				alert('Android or iOS required.');
			}
		},

		runApp_ios: function (url) {
			var clickedAt = +new Date();

			var naverAppCheckTimer = setTimeout(function () {
				if (+new Date() - clickedAt < 2000)
					if (window.confirm('바이오인증공동앱이 설치되어 있지 않습니다.\n설치페이지로 이동하시겠습니까?'))
						location.href = 'http://itunes.apple.com/kr/app/baioinjeung-gongdong-aeb/id1189411033?mt=8';
			}, 1500);

			location.href = url;
		},

		/**
		 * FIDO Web 관련 ajax 공통 함수
		 */
		transAction: function (tradeKey, param, successCB, failCB) {
			if (param.execType != undefined) {
				_public.FIDOWeb.execType = param.execType;
			}

			var tranProp = util.clone(transaction.TRAN_COMM_PROP); // 트랜잭션 기본 객체 복사
			tranProp.url = '/common/thirdParty/FIDOWeb'; // 트랜잭션 Url
			tranProp.tradeKey = tradeKey; // 트랜잭션 TradeKey
			tranProp.params = param; // 트랜잭션 Parameter
			tranProp.success = successCB;
			tranProp.blockingFlag = false; // 로딩처리 안함
			tranProp.failure = _public.FIDOWeb.failureAjaxCallback;
			// 트랜잭션 실행
			transaction.callTran(tranProp);
		},

		failureAjaxCallback: function (data) {
			var oData = data.outData;

			if (oData.ERROR_MSG != undefined) {
				_public.FIDOWeb.timerClear();
				alert(oData.ERROR_MSG);
				Main.offLoading();
			}
		},

		/**
		 * FIDO Web client 처리확인
		 */
		clientCheckComplete: function (callback) {
			_public.FIDOWeb.fdRspnCd = '';
			_public.FIDOWeb.timerClear();
			_public.FIDOWeb.timerInterval = setInterval(function () {
				_public.FIDOWeb.checkComplete(_public.FIDOWeb.wstNo, function (outData) {
					var fdRspnCd = outData.fdRspnCd;
					_public.FIDOWeb.fdRspnCd = fdRspnCd;

					if (fdRspnCd != '0001' && fdRspnCd != '0003') {
						//0001 진행중 , 0003 전문추적번호 생성
						_public.FIDOWeb.timerClear();
						Main.offLoading();

						var callBackData = { outData: outData };
						callback(callBackData);

						util.setCookie('fidoWebRes', 'Y');
					}
				});
			}, _public.FIDOWeb.timerIntervalSec);

			_public.FIDOWeb.timerOut = setTimeout(function () {
				_public.FIDOWeb.timerClear();

				if (_public.FIDOWeb.fdRspnCd == '0003') {
					if (MXP_PLUGIN.isAndroid()) {
						MXP_PLUGIN.FIDOError.getMessage('3002');
					} else {
						MXP_PLUGIN.FIDOError.getMessage('3001');
					}

					_public.FIDOWeb.requestAppInstall();
				}

				Main.offLoading();
			}, _public.FIDOWeb.timerOutSec);
		},
		/**
		 * timer 중지
		 */
		timerClear: function () {
			if (_public.FIDOWeb.timerInterval != null) {
				clearInterval(_public.FIDOWeb.timerInterval);
			}

			if (_public.FIDOWeb.timerOut != null) {
				clearTimeout(_public.FIDOWeb.timerOut);
			}
		},
	};

	/**
	 * 모바일웹에서 모바일앱 설치여부에 따른 링크동작 구현(Google Firebase DeepLink)
	 * @param insData(JSON Object) : 페이지 유입 insData
	 * @parma appStartUrl(String) : 앱이 실행되는 페이지
	 * @param alertMsg(String) : Deep Link 실행 알림 alert 메시지
	 */
	_public.FireBase = {
		firebaseUrl: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyC8hXZJK4PS7AiOYcCbpeo47cXb1rWHDZw',
		deepLinkUrl: 'https://lifeplanet.page.link/?',
		apn: 'apn=com.kyobo.lifeplanet.insurance', // Android Package Name
		ibi: 'ibi=com.lifeplanet.insurance', // iOS Package Name
		efr: 'efr=1', // DeepLink Preview 화면 Skip 설정
		isi: 'isi=840637440', // iOS AppStore ID

		execDeepLink: function (insData, appStartUrl, alertMsg) {
			if ('LPWebToApp' in insData) {
				var locationUrl = insData.locationUrl;
				var moveUrl = insData.moveUrl;
				var longLinkUrl = '';
				var queryString = '';
				var kakaoInAppUse = insData.kakaoInAppUse;

				if (moveUrl != undefined) {
					path = moveUrl;
				}
				queryString = location.search.slice(1);
				queryString = MXP_PLUGIN.FireBase.removeUrlParameter(queryString, 'LPWebToApp');
				queryString = encodeURIComponent(queryString);

				longLinkUrl =
					MXP_PLUGIN.FireBase.deepLinkUrl +
					'link=' +
					location.origin +
					appStartUrl +
					'?' +
					queryString +
					'&' +
					MXP_PLUGIN.FireBase.apn +
					'&' +
					MXP_PLUGIN.FireBase.ibi +
					'&' +
					MXP_PLUGIN.FireBase.efr +
					'&' +
					MXP_PLUGIN.FireBase.isi;

				if (insData.bAlert == 'Y') {
					// 알림메시지 보여주는 경우
					if (alertMsg != undefined) alert(alertMsg);
				}

				$.ajax({
					type: 'POST',
					async: false,
					url: MXP_PLUGIN.FireBase.firebaseUrl,
					dataType: 'json',
					data: { longDynamicLink: longLinkUrl },
					error: function (data) {
						//통신 에러 발생시 처리
						alert('firebase conn error');
					},
					success: function (data) {
						//통신 성공시 처리
						if (data.shortLink != undefined) {
							if (MXP_PLUGIN.isIOS()) {
								if (kakaoInAppUse == undefined) {
									location.href = data.shortLink;
								}
							} else {
								location.href = data.shortLink;
							}
						}
						if (moveUrl != undefined) {
							setTimeout(function () {
								PageUtil.movePage(moveUrl);
							}, 1500);
						}
					},
				});
			}
		},
		removeUrlParameter: function (queryString, parameter) {
			var newQueryString = '';
			var prefix = encodeURIComponent(parameter) + '=';
			var parts = queryString.split(/[&;]/g);

			// Reverse iteration as may be destructive
			for (var i = parts.length; i-- > 0; ) {
				// Idiom for string.startsWith
				if (parts[i].lastIndexOf(prefix, 0) !== -1) {
					parts.splice(i, 1);
				}
			}

			newQueryString = parts.join('&');
			return newQueryString;
		},
	};

	/**
	 * iOS 모바일앱에 메인 이벤트 전달
	 */
	_public.widget = {
		eventData: null,
		sendEvent: function (data) {
			console.log('sendData');
			if (data != undefined) {
				MXP_PLUGIN.widget.eventData = data;
			}
		},
	};

	/**
	 * Fabric(Twitter Answer) 의 이벤트 전달
	 * 현재는 js오류에 대한 exception보고용 사용
	 * 추후 확장 가능성
	 */
	_public.answer = {
		sendException: function (data) {
			console.log('sendException');
			var obj = new Array();
			obj[0] = data.message;
			obj[1] = data.path;
			obj[2] = data.line.toString();
			Mxp.exec(null, null, 'LifeplanetPlugin', 'sendAnswer', obj);
		},
	};

	/**
	 * 모바일앱 설정값 저장 및 불러오기
	 * 모바일앱을 삭제하기 전까지 값을 유지함
	 */
	_public.appSetting = {
		setProperty: function (callback, key, value, expireTime) {
			if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
				var setData = {};
				setData[key] = value;
				Mxp.exec(callback, null, 'LifeplanetPlugin', 'setProperty', [setData]);
			} else if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
				util.setCookie(key, value, expireTime);
				if (callback != null) callback();
			}
		},
		getProperty: function (callback, key) {
			if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
				Mxp.exec(callback, null, 'LifeplanetPlugin', 'getProperty', [key]);
			} else if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
				var result = util.getCookie(key);
				if (callback != null) callback(result);
			}
		},
	};

	/**
	 * APP 다운로드 유틸
	 */
	_public.appDown = {
		getSmartPhoneAgentKind: function () {
			var agentKind = '';
			var agent = navigator.userAgent;

			if (agent.indexOf('AppleWebKit') != -1 || agent.indexOf('Opera') != -1) {
				if (agent.indexOf('Android') != -1 || agent.indexOf('J2ME/MIDP') != -1) {
					agentKind = AGENT_ANDROID;
				} else if (agent.indexOf('iPhone') != -1) {
					agentKind = AGENT_IPHONE;
				} else if (agent.indexOf('iPad') != -1) {
					agentKind = AGENT_IPHONE;
				}
			} else {
				agentKind = AGENT_ETC;
			}
			return agentKind;
		},

		moveStorePage: function () {
			var agent = MXP_PLUGIN.appDown.getSmartPhoneAgentKind();
			if (agent == AGENT_ANDROID) {
				var url = 'market://details?id=com.kyobo.lifeplanet.insurance';

				//안드로이드 모바일앱 -> 앱에서 document.loacation 마켓연결이 안되어서 분기처리. 20150923 jeha
				if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
					var onSuccessOpenMarket = function () {};
					var onFailOpenMarket = function (error) {};
					var params = new mAppIntentProperties();
					params.scheme = url;
					navigator.appIntent.start(params, onSuccessOpenMarket, onFailOpenMarket);

					//안드로이드 모바일웹
				} else {
					document.location = url;
				}
			} else if (agent == AGENT_IPHONE) {
				document.location = 'http://itunes.apple.com/us/app/laipeupeullaenis-seumateuseobiseu/id840637440?mt=8';
			}
		},
	};

	/**
	 * iOS 앱 일 경우 webLog의 처리 결과가
	 * 정상적으로 동작되지 않을 경우 deviceready 이벤트가
	 * 정상적으로 호출되지 않아 강제적으로 이벤트를 호출하기 위한 함수
	 */
	_public.fireMXPNativeReadyEvent = function () {
		if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
			try {
				cordova.require('cordova/channel').onNativeReady.fire();
			} catch (e) {
				window._nativeReady = true;
			}
		}
	};
	/**
	 * 자동이체 출금이체 동의자료 생성을 위한 전자서명 로직 호출
	 *
	 * [String] 	type : 00 - 로그인, 01 - 기타
	 * [Function] 	callback : callback Fucntion
	 *
	 */
	_public.signWithVidForEvdnDatm = function (objSignData, userCallback, useUbiKey) {
		_public.callBack = userCallback;
		_public.widAgrEvdnDatm = { signCertParam: $.isArray(objSignData) ? objSignData : [objSignData] };

		if (vPinLogin == 'N' && fpLogin == 'N' && kakaopayLogin == 'N' && naverLogin == 'N') {
			if (!config.getEnv('excuteCertModule')) {
				//앱프리 skip 일경우 바로  callback 호출
				_public.runCertification('validVID', _public.callBack, signData, useUbiKey);
				return;
			}
		}

		var i = 0,
			length = 0,
			singleData = {},
			arrSignData = [],
			arrBankCode = [],
			signData = '';

		// 빈 오브젝트 일 때 dummy 데이터 처리
		if ($.isEmptyObject(_public.widAgrEvdnDatm.signCertParam[0])) {
			_public.widAgrEvdnDatm.signCertParam.length = 0;
			arrSignData[0] = 'ONLY_CERT';
			arrBankCode[0] = 'ONLY_CERT';
		}

		length = _public.widAgrEvdnDatm.signCertParam.length; // 출금이체 자료 생성 overflow문제 수정(다건일경우 단건으로 처리)
		if (length > 0) {
			length = 1;
		}
		for (i = 0; i < length; i += 1) {
			singleData = _public.widAgrEvdnDatm.signCertParam[i];
			arrSignData.push(_public.parseSignString(singleData));
			arrBankCode.push(singleData.bankCd);
		}

		if (_public.widAgrEvdnDatm.signCertParam != null && _public.widAgrEvdnDatm.signCertParam.length > 0) {
			if (_public.widAgrEvdnDatm.signCertParam[0].psno != undefined) {
				_public.widAgrEvdnDatm.psno = _public.widAgrEvdnDatm.signCertParam[0].psno;
			}
		}
		_public.widAgrEvdnDatm.bankCd = arrBankCode[0];
		signData = arrSignData.join(' || ');

		if (fpLogin == 'Y' && _public.fpURLChk()) {
			//지문인증으로 로그인 했을때
			_public.widAgrEvdnDatm.signData = signData;
			_public.runFpCertification(_public.callBack, _public.widAgrEvdnDatm);
			return;
		} else if (_public.pinURLChk() && vPinLogin == 'Y') {
			//핀증으로 로그인 했을때
			_public.widAgrEvdnDatm.signData = signData;
			_public.runPinCertification(_public.callBack, _public.widAgrEvdnDatm);
			return;
		} else if (kakaopayLogin == 'Y') {
			// 카카오페이로 로그인 했을때
			_public.widAgrEvdnDatm.signData = signData;
			_public.runKakaopayCertification(_public.callBack, _public.widAgrEvdnDatm);
			return;
		} else if (naverLogin == 'Y') {
			// 네이버인증 로그인 했을때
			_public.widAgrEvdnDatm.signData = signData;
			_public.runNaverCertification(_public.callBack, _public.widAgrEvdnDatm);
			return;
		}

		_public.runCertification('validVID', _private.createEvidenceData, signData, useUbiKey);
	};

	_private.createEvidenceData = function (signedData) {
		_public.widAgrEvdnDatm = $.extend(_public.widAgrEvdnDatm, signedData);
		_public.widAgrEvdnDatm.signData = signedData.cert;
		_public.widAgrEvdnDatm.vidRandom = signedData.vid;

		var tranProp = util.clone(transaction.TRAN_COMM_PROP);
		tranProp.url = '/common/thirdParty/XecureSmart'; // 트랜잭션 Url
		tranProp.tradeKey = 'createEvidenceData';
		tranProp.params = _public.widAgrEvdnDatm; // 트랜잭션 Parameter
		/**
		 * 별도의 함수로 추출할 경우 signedData를 전역변수에 담아야 하기때문에 익명함수로 처리 한다.
		 * */
		tranProp.success = function (data) {
			if ($.isFunction(_public.callBack)) {
				_public.callBack.call(this, signedData);
			}
		};
		tranProp.failure = _private.createEvidenceDataFailure; // Failure Callback

		transaction.callTran(tranProp);
	};
	//지문인증 출금동의 자료 생성
	_public.createEvidenceFPData = function (signedData) {
		var callbackParam = {
			validExecuteFlag: 'false',
		};

		_public.widAgrEvdnDatm = $.extend(_public.widAgrEvdnDatm, signedData);

		var tranProp = util.clone(transaction.TRAN_COMM_PROP);
		tranProp.url = '/common/thirdParty/FIDO'; // 트랜잭션 Url
		tranProp.tradeKey = 'createEvidenceFPData';
		tranProp.params = _public.widAgrEvdnDatm; // 트랜잭션 Parameter
		/**
		 * 별도의 함수로 추출할 경우 signedData를 전역변수에 담아야 하기때문에 익명함수로 처리 한다.
		 * */
		tranProp.success = function (data) {
			if ($.isFunction(_public.callBack)) {
				if (_public.isMyPage()) {
					_public.applyCIA005A05(callbackParam, _public.callBack);
				} else {
					_public.callBack.call(this, callbackParam);
				}
			}
		};
		tranProp.failure = _private.createEvidenceDataFailure; // Failure Callback

		transaction.callTran(tranProp);
	};
	// ajax 실패 Callback
	(_private.createEvidenceDataFailure = function (data) {
		var errroMsg = data.outData.ERROR_MSG;

		if (errroMsg) {
			alert(errroMsg);
		}
	}),
		/**
		 * data Object를 sign문자열로 파싱한다.
		 * */
		(_public.parseSignString = function (data) {
			var signData = '';

			if (data.mask_acowPsno.length == 13) {
				data.mask_acowPsno = data.mask_acowPsno.substring(0, 6);
			}

			signData =
				'이용기관명 : 교보라이프플래닛생명' +
				' 요금출금은행 : ' +
				data.bankCd +
				' 출금계좌번호 : ' +
				data.mask_bankAcno +
				' 출금계좌 예금주명 : ' +
				data.mask_acowNm +
				' 예금주 생년월일 : ' +
				data.mask_acowPsno;

			if (data.mask_insConno != null && data.mask_insConno.length > 0) {
				signData += ' 보험증권번호 : ' + data.mask_insConno;
			}
			if (data.extraEtc != null && data.extraEtc.length > 0) {
				signData += ' 비고 : ' + singleData.extraEtc;
			}
			return signData;
		});

	//당사 지문인증 app 인지 web인지 확인
	_public.runFpCertification = function (callback, param) {
		if (_public.getOSInfo().name.indexOf('APP') > -1) {
			_public.fpAppCertification(callback, param);
		} else {
			_public.fpWebCertification(callback, param);
		}
	};

	//당사 지문인증요청
	_public.fpAppCertification = function (callback, param) {
		var traTp = '0';
		var signType = '';

		document.addEventListener(
			'deviceready',
			function () {
				if (globalVar.getParam('fpDeviceInfo') == undefined) {
					MXP_PLUGIN.FIDOError.getMessage('2001');
					return false;
				}

				if (param != null && param.signData != undefined) {
					//전자서명&출금동의자료 생성
					traTp = '2';
					signType = 'S';
				} else if (param != null && param.noEvidenceSignData != undefined) {
					//전자서명
					traTp = '2';
					signType = 'N';
				}

				var objParam = new Object();

				objParam.ahrzTp = globalVar.getParam('fpDeviceInfo').ahrzTp;
				objParam.traTp = traTp;
				objParam.fdSvcCd = globalVar.getParam('fpDeviceInfo').fdSvcCd;
				objParam.psno = globalVar.getParam('fpDeviceInfo').psno;
				objParam.rgiMtptCd = globalVar.getParam('fpDeviceInfo').rgiMtptCd;
				objParam.cprSignaTp = '0';
				if (globalVar.getParam('fpDeviceInfo').ahrzTp == 'C') {
					//호환인증

					objParam.nidCptbNo = globalVar.getParam('fpDeviceInfo').nidCptbNo;
					objParam.fdMtpt = globalVar.getParam('fpDeviceInfo').fdMtpt;
				}

				if (traTp == '2') {
					if (signType == 'S') {
						objParam.signCertParam = param.signData;
					} else if (signType == 'N') {
						objParam.signCertParam = param.noEvidenceSignData;
					}
				}

				if (globalVar.getParam('fpDeviceInfo').type != undefined && globalVar.getParam('fpDeviceInfo').type != '') {
					objParam.type = globalVar.getParam('fpDeviceInfo').type;
				} else {
					objParam.type = 'work';
				}
				if (objParam.fdSvcCd == '003') {
					//바이오오픈인증인경우
					objParam.bioOpYn = 'Y';
					//				delete objParam.psno;
				} else {
					objParam.bioOpYn = 'N';
				}

				//인증 callback
				var traTp0Callback = function (callback) {
					var params = {
						validExecuteFlag: 'false',
					};

					if (_public.isMyPage()) {
						_public.applyCIA005A05(params, callback);
					} else {
						callback(params);
					}
				};

				MXP_PLUGIN.FIDO.requestAuth(function (data) {
					var signedData = '';

					var fdRspnCd = data.fdRspnCd || data.outData.fdRspnCd;

					if (fdRspnCd == '0000') {
						//성공
						_public.callBack = callback;

						if (objParam.bioOpYn == 'Y') {
							//바이오오픈인증인 경우
							signedData = { signData: data.userSignaVal }; // 거래내역HASH
							if (traTp == '2') {
								param.wstno = data.wstAstno; // 전문추적번호
								globalVar.setParam('nonRepTkn', data.userSignaVal); // 부인방지토큰
								if (signType == 'N') {
									traTp0Callback(callback);
								} else {
									_public.widAgrEvdnDatm = param;
									_public.createEvidenceFPData(signedData);
								}
							} else {
								traTp0Callback(callback);
							}
						} else {
							//바이오공동인증앱을 통한 기존 바이오인증인 경우
							signedData = { signData: JSON.stringify(data.outData.usagRspnMsg) }; // 거래내역HASH
							if (traTp == '2') {
								param.wstno = data.outData.wstno; // 전문추적번호
								globalVar.setParam('nonRepTkn', data.outData.nonRepTkn); // 부인방지토큰
								if (signType == 'N') {
									traTp0Callback(callback);
								} else {
									_public.widAgrEvdnDatm = param;
									_public.createEvidenceFPData(signedData);
								}
							} else {
								traTp0Callback(callback);
							}
						}
					} else {
						MXP_PLUGIN.FIDOError.getMessage(fdRspnCd);
					}
				}, objParam);
			},
			false
		);
	};

	//당사 지문인증 요청
	_public.fpWebCertification = function (callback, param) {
		var traTp = '0';
		var signType = '';

		if (globalVar.getParam('fpDeviceInfo') == undefined) {
			MXP_PLUGIN.FIDOError.getMessage('2001');
			return false;
		}

		if (param != null && param.signData != undefined) {
			//전자서명&출금동의자료 생성
			traTp = '2';
			signType = 'S';
		} else if (param != null && param.noEvidenceSignData != undefined) {
			//전자서명
			traTp = '2';
			signType = 'N';
		}

		var objParam = new Object();

		objParam.traTp = traTp;

		if (traTp == '2') {
			if (signType == 'S') {
				objParam.signCertParam = param.signData;
			} else if (signType == 'N') {
				objParam.signCertParam = param.noEvidenceSignData;
			}
		}

		if (globalVar.getParam('fpDeviceInfo').type != undefined && globalVar.getParam('fpDeviceInfo').type != '') {
			objParam.type = globalVar.getParam('fpDeviceInfo').type;
		} else {
			objParam.type = 'work';
		}

		//인증 callback
		var traTp0Callback = function (callback) {
			var params = {
				validExecuteFlag: 'false',
			};

			if (_public.isMyPage()) {
				_public.applyCIA005A05(params, callback);
			} else {
				callback(params);
			}
		};

		Main.onLoading();

		MXP_PLUGIN.FIDOWeb.makeWstNo(function (data) {
			var param = {};
			param = data.outData;
			param.ahrzTchnCd = '100';
			param = $.extend(param, objParam);

			MXP_PLUGIN.FIDOWeb.requestAuth(param);
		});

		var fpWebResult = function (data) {
			var fdRspnCd = data.outData.fdRspnCd;

			if (fdRspnCd == '0000') {
				var signedData = { signData: JSON.stringify(data.outData.traPatiHash) }; // 거래내역HASH
				_public.callBack = callback;

				if (traTp == '2') {
					param.wstno = _public.FIDOWeb.wstNo; // 전문추적번

					globalVar.setParam('nonRepTkn', param.wstno); // 부인방지토큰

					if (objParam.type == 'application') {
						//청약
						globalVar.setParam('fpWebDeviceInfo', data.outData);
					}

					if (signType == 'N') {
						traTp0Callback(callback);
					} else {
						_public.widAgrEvdnDatm = param;
						_public.createEvidenceFPData(signedData);
					}
				} else {
					traTp0Callback(callback);
				}
			} else {
				MXP_PLUGIN.FIDOError.getMessage(fdRspnCd);
			}
		};

		MXP_PLUGIN.FIDOWeb.clientCheckComplete(fpWebResult);
	};
	//지문인증 URL 체크
	_public.fpURLChk = function () {
		var urlChk = false;

		if (location.pathname.indexOf('mypage') > -1) {
			urlChk = true;
		} else if (typeof MWIS220P1 != 'undefined') {
			urlChk = true;
		} else if (typeof MWLS510P1 != 'undefined') {
			urlChk = true;
		}

		return urlChk;
	};

	_public.fpInfoLayerShow = function () {
		// 미사용
		return;

		if (MXP_PLUGIN.isiPhoneX()) {
			// iPhone X인 경우 지문인증 팝업을 보여주지 않도록 임시적으로 변경(추후 Layer 오면 변경해야함)
			return;
		}

		var infoHtml = '';

		infoHtml += '<div id="div_layer_finger" class="layer_pop pr_banner type2 layer_finger_home" style="display:block">													';
		infoHtml +=
			'	<style>                                                                                                                                                     ';
		infoHtml +=
			'		.pr_banner.type2.layer_finger_home .box_pr_banner {top:auto;bottom:5%}                                                                                  ';
		infoHtml +=
			'		.pr_banner.type2.layer_finger_home .box_pr_banner .inner > div.img_pr_banner{width:290px;padding:0 0 25px 0}                                            ';
		infoHtml +=
			'		.pr_banner.type2.layer_finger_home .box_pr_banner .inner > div.img_pr_banner > img{display:block}                                                       ';
		infoHtml +=
			'		.pr_banner.type2.layer_finger_home .box_pr_banner .inner > div.img_pr_banner > p{margin-top:10px;font-size:14px;color:#222;line-height:20px}            ';
		infoHtml +=
			'		.pr_banner.type2.layer_finger_home .box_pr_banner .inner > div.img_pr_banner > p.tit{margin-top:20px;font-size:22px;font-weight:bold;line-height:27px}  ';
		infoHtml +=
			'	</style>                                                                                                                                                    ';
		infoHtml +=
			'  	<div class="box_pr_banner" style="width:313px;height:370px;margin-left:-156px;margin-top:-185px">                                                   ';
		infoHtml +=
			'  		<div class="inner ac">                                                                                                                            ';
		infoHtml +=
			'	   		<div class="img_pr_banner">                                                                                                                       ';
		infoHtml +=
			'	   			<img src="/resources/images/popup/img_pop_finger_02.png" alt="" width="290px"  />                                                         ';
		infoHtml +=
			'		   		<p class="tit">지문인식 센서에<br />손가락을 인식시켜 주세요.</p>                                                                                   ';
		infoHtml +=
			'		   		<p>지문인증이 완료될 때까지<br />등록된 손가락을 인식시켜주세요.</p>                                                                            ';
		infoHtml +=
			'	   		</div>                                                                                                                                              ';
		infoHtml +=
			'  		</div>                                                                                                                                              ';
		infoHtml +=
			'  	</div>	                                                                                                                                                ';
		infoHtml +=
			'  	<div class="dim" style="position:fixed;top:0;right:0;bottom:0;left:0;opacity:0.5;z-index:9989;background-color:rgb(0, 0, 0);"></div>          	    ';
		infoHtml +=
			'</div>                                                                                                                                                       ';

		if ($('#div_layer_finger').length > 0) {
			$('#div_layer_finger').remove();
		}

		$('body').append(infoHtml);
		$('body').css('overflow-y', 'hidden');
	};
	_public.fpInfoLayerHide = function () {
		if ($('#div_layer_finger').length > 0) {
			$('#div_layer_finger').remove();
		}

		$('body').css('overflow-y', 'auto');
	};

	//핀인증 URL 체크
	_public.pinURLChk = function () {
		var urlChk = false;

		if (location.pathname.indexOf('mypage') > -1) {
			urlChk = true;
		} else if (typeof MWIS220P1 != 'undefined') {
			urlChk = true;
		} else if (typeof MWLS510P1 != 'undefined') {
			urlChk = true;
		}

		return urlChk;
	};

	//핀인증 출금동의 자료 생성
	_public.createEvidencePINData = function (signedData) {
		var callbackParam = {
			validExecuteFlag: 'false',
		};

		_public.widAgrEvdnDatm = $.extend(_public.widAgrEvdnDatm, signedData);

		var tranProp = util.clone(transaction.TRAN_COMM_PROP);
		tranProp.url = '/common/thirdParty/VESTPIN'; // 트랜잭션 Url
		tranProp.tradeKey = 'createEvidencePINData';
		tranProp.params = _public.widAgrEvdnDatm; // 트랜잭션 Parameter
		/**
		 * 별도의 함수로 추출할 경우 signedData를 전역변수에 담아야 하기때문에 익명함수로 처리 한다.
		 * */
		tranProp.success = function (data) {
			if ($.isFunction(_public.callBack)) {
				if (_public.isMyPage()) {
					_public.applyCIA005A05(callbackParam, _public.callBack);
				} else {
					_public.callBack.call(this, callbackParam);
				}
			}
		};
		tranProp.failure = _private.createEvidenceDataFailure; // Failure Callback

		transaction.callTran(tranProp);
	};

	//카카오페이 인증 요청
	_public.runKakaopayCertification = function (callback, param) {
		var kakaopayCreateEvidenceYN = 'N';

		var signdataStr = '';
		var isPopup = false;
		var popupOption = {};

		if (param != null && param.signData != undefined) {
			//전자서명&출금동의자료 생성
			kakaopayCreateEvidenceYN = 'Y';
			signdataStr = param.signData;

			if (_public.pinNoSignDataChk(signdataStr) == 'Y') {
				signdataStr = '전자서명합니다.';
			}
		} else if (param != null && param.noEvidenceSignData != undefined) {
			//전자서명
			signdataStr = param.noEvidenceSignData;
		} else {
			param = {};
			signdataStr = '전자서명합니다.';
		}

		param.type = '3'; // 인증 타입 (로그인/쳥약/유지)
		param.signData = signdataStr;

		globalVar.setParam('kakaopayAuthData', param);

		var kakaopayAuthCallback = function (data) {
			var signedData = data.outData.frbuAhrzDalReqRslt[0].nonRepTknText;
			console.log(signedData);

			var validObj = {
				validExecuteFlag: false,
				signedData: signedData,
			};

			var CIA005A05_callbackParam = validObj;
			var CIA005A05_callback = callback;

			_public.applyCIA005A05(CIA005A05_callbackParam, CIA005A05_callback);
		};

		globalVar.setParam('kakaopayAuthCallback', kakaopayAuthCallback);

		globalVar.setParam('kakaopaySignData', signdataStr);
		globalVar.setParam('kakaopayCreateEvidenceYN', kakaopayCreateEvidenceYN);
		globalVar.setParam('runKakaopayCertification', 'Y');

		if ($('div#popupwrap').length < 1) {
			var html = '';
			html += '<div id="popupwrap">				';
			html += '    <div class="content1"></div>    ';
			html += '</div>                              ';
			$('body').append(html);
		}

		// 카카오페이 인증 팝업 띄우기
		var option = {
			id: 'popupwrap',
			location: 'external',
			content: 'content1',
			url: '/mypage/mc/MWMC090P1.dev',
		};

		PageUtil.openPopup(option);
	};

	//네이버 인증 요청
	_public.runNaverCertification = function (callback, param) {
		var naverCreateEvidenceYN = 'N';

		var signdataStr = '';
		var isPopup = false;
		var popupOption = {};

		if (param != null && param.signData != undefined) {
			//전자서명&출금동의자료 생성
			naverCreateEvidenceYN = 'Y';
			signdataStr = param.signData;

			if (_public.pinNoSignDataChk(signdataStr) == 'Y') {
				signdataStr = '전자서명합니다.';
			}
		} else if (param != null && param.noEvidenceSignData != undefined) {
			//전자서명
			signdataStr = param.noEvidenceSignData;
		} else {
			param = {};
			signdataStr = '전자서명합니다.';
		}

		param.type = '3'; // 인증 타입 (로그인/쳥약/유지)
		param.signData = signdataStr;

		globalVar.setParam('naverAuthData', param);

		var naverAuthCallback = function (data) {
			var signedData = data.outData.frbuAhrzDalReqRslt[0].nonRepTknText;
			console.log(signedData);

			var validObj = {
				validExecuteFlag: false,
				signedData: signedData,
			};

			var CIA005A05_callbackParam = validObj;
			var CIA005A05_callback = callback;

			_public.applyCIA005A05(CIA005A05_callbackParam, CIA005A05_callback);
		};

		globalVar.setParam('naverAuthCallback', naverAuthCallback);
		globalVar.setParam('naverSignData', signdataStr);
		globalVar.setParam('naverCreateEvidenceYN', naverCreateEvidenceYN);
		globalVar.setParam('runNaverCertification', 'Y');

		//앱이 아닐경우에만 팝업
		if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
			NaverAuth.request(param, naverAuthCallback);
		} else {
			if ($('div#popupwrap').length < 1) {
				var html = '';
				html += '<div id="popupwrap">				';
				html += '    <div class="content1"></div>    ';
				html += '</div>                              ';
				$('body').append(html);
			}

			// 네이버 인증 팝업 띄우기
			var option = {
				id: 'popupwrap',
				location: 'external',
				content: 'content1',
				url: '/mypage/mc/MWMC100P1.dev',
			};

			PageUtil.openPopup(option);
		}
	};

	//핀인증요청
	_public.runPinCertification = function (callback, param) {
		if (vPinCikey == '') {
			alert('필수값이 없습니다.\n로그인후 다시 이용해주세요.');
			return false;
		}

		var regChk = 'N';
		var vPinCreateEvidenceYN = 'N';
		var signdataStr = '';
		var isPopup = false;
		var popupOption = {};

		if (param != null && param.signData != undefined) {
			//전자서명&출금동의자료 생성
			vPinCreateEvidenceYN = 'Y';
			signdataStr = param.signData;

			if (_public.pinNoSignDataChk(signdataStr) == 'Y') {
				signdataStr = '전자서명합니다.';
			}
		} else if (param != null && param.noEvidenceSignData != undefined) {
			//전자서명
			signdataStr = param.noEvidenceSignData;
		} else {
			signdataStr = '전자서명합니다.';
		}

		if ($('div.__b-popup1__').length > 0) {
			isPopup = true;
			popupOption = globalVar.getParam('popupOption');
		}

		vestPINFnc.ciKey = vPinCikey;

		vestPINFnc.callBack = function (list) {
			$.each(list, function (idx, data) {
				if (data.nickName.indexOf(vestPINFnc.ciKey) > -1) {
					vestPINFnc.hrid = data.HRID;
					regChk = 'Y';
					return false;
				}
			});

			if (regChk != 'Y') {
				alert('등록된 핀번호가 없습니다.\n재등록 해주세요.');
				return false;
			}

			if (isPopup) {
				PageUtil.closePopup('popupwrap');
				globalVar.setParam('vPinCallback', MXP_PLUGIN.runPinCertificationPopupRtn);
				globalVar.setParam('vPinPopCallback', callback);
				globalVar.setParam('vPinPopOption', popupOption);
			} else {
				globalVar.setParam('vPinCallback', callback);
			}

			globalVar.setParam('vPinSignData', param);
			globalVar.setParam('vPinSignCert', signdataStr);
			globalVar.setParam('vPinCreateEvidenceYN', vPinCreateEvidenceYN);
			globalVar.setParam('vPinRegChk', regChk);
			//		globalVar.setParam('vPinMnnpNm', globalVar.getParam('spb_data').spb_mnnpNm);
			globalVar.setParam('vPinCiKey', vPinCikey);
			globalVar.setParam('runPinCertification', 'Y');

			if ($('div#popupwrap').length < 1) {
				var html = '';
				html += '<div id="popupwrap">				';
				html += '    <div class="content1"></div>    ';
				html += '</div>                              ';
				$('body').append(html);
			}

			var option = {
				id: 'popupwrap',
				location: 'external',
				content: 'content1',
				url: '/mypage/mc/MWMC070P1.dev',
			};

			if (isPopup) {
				setTimeout(function () {
					PageUtil.openPopup(option);
				}, 500);
			} else {
				PageUtil.openPopup(option);
			}
		};

		vestPINFnc.getUserList();
	};

	_public.runPinCertificationPopupRtn = function (params) {
		//MWMA113P.js 팝업에서 본인인증시 참고
		var vPinPopCallback = globalVar.getParam('vPinPopCallback');
		var vPinPopOption = globalVar.getParam('vPinPopOption');
		var vPinPopParam = globalVar.getParam('vPinPopParam');

		PageUtil.closePopup('popupwrap');

		globalVar.setParam('vPinPopCallback', undefined);
		globalVar.setParam('vPinPopOption', undefined);
		globalVar.setParam('vPinPopParam', undefined);
		globalVar.setParam('vPinPopCallParam', vPinPopParam);

		setTimeout(function () {
			PageUtil.openPopup(vPinPopOption);
			setTimeout(function () {
				vPinPopCallback(params);
			}, 300);
		}, 500);
	};

	_public.pinNoSignDataChk = function (signData) {
		var vPinSignCert = util.nvl(signData, '');
		var chkRtn = 'N';
		if (vPinSignCert == '' || vPinSignCert == 'ONLY_CERT') {
			chkRtn = 'Y';
		}

		return chkRtn;
	};

	//마이페이지 체크
	_public.isMyPage = function () {
		var urlChk = false;

		if (location.pathname.indexOf('mypage') > -1) {
			urlChk = true;
		}

		return urlChk;
	};

	_public.applyCIA005A05 = function (params, callback) {
		var reqData = {};
		var ahrzMdCd = '01';

		var fncCall = function () {
			if (callback == undefined && _public.certCallBack != undefined) {
				_public.certCallBack(params);
			} else {
				callback(params);
			}
		};

		if (fpLogin == 'Y') {
			ahrzMdCd = '15';
		} else if (vPinLogin == 'Y') {
			ahrzMdCd = '13';
		} else if (kakaopayLogin == 'Y') {
			ahrzMdCd = '14';
		} else if (naverLogin == 'Y') {
			ahrzMdCd = '16';
		}

		var hpScrnId = location.pathname;
		hpScrnId = hpScrnId.substring(hpScrnId.lastIndexOf('/') + 1, hpScrnId.lastIndexOf('.'));

		reqData.hpScrnId = hpScrnId;
		reqData.ahrzMdCd = ahrzMdCd;

		//트랜젝션 셋팅
		var tranProp = util.clone(transaction.TRAN_COMM_PROP); // 트랜잭션 기본 객체 복사
		tranProp.url = '/common/cc/MWCommonUtil'; // 트랜잭션 Url
		tranProp.tradeKey = 'applyCIA005A05'; // 트랜잭션 TradeKey
		tranProp.params = reqData; // 트랜잭션 Parameter
		tranProp.success = function (data) {
			fncCall();
		};
		tranProp.failure = function (data) {
			fncCall();
		};
		//		tranProp.blockingFlag     = false;

		//트랜잭션 실행
		transaction.callTran(tranProp);
	};

	/**=================================== 청구 START =========================================================*/
	_public.isAdidEnabled = function (successFn, failCB) {
		//successFn();	//adid 사용가능한 경우 호출
		//failCB();		//adid 사용불가능한 경우 호출

		Mxp.exec(successFn, failCB, 'LifeplanetPlugin', 'isAdidEnabled', []);
	};

	_public.getAdid = function (successFn, failCB) {
		//successFn(adid);	//adid 값이 구해진 경우 호출
		//failCB();		//adid 값을 구할 수 없는 경우 호출

		Mxp.exec(successFn, failCB, 'LifeplanetPlugin', 'getAdid', []);
	};

	_public.openCertLogin = function (successFn, failCB) {
		//successFn(validObj);
		if (MXP_PLUGIN.isAndroid()) MXP_PLUGIN.XecureSmart.runXecureLogin('validLogin', successFn, failCB, 'false');
		else Mxp.exec(successFn, failCB, 'KWICPlugin', 'certProcess', ['']);
	};

	//보험사정보 로컬에 저장되어 있는지 여부 체크
	_public.checkOrgInfo = function (juminNo, dummy, successFn, failCB) {
		//successFn();	//저장된 값이 있는 경우 호출. 파라메터 없음
		//failCB();	//저장된 값이 없는 경우 호출. 파라메터 없음

		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'checkOrgInfo', [juminNo, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//로컬에 저장되어 있는 보험사정보 가져오기
	_public.retrieveOrgInfo = function (juminNo, dummy, successFn, failCB) {
		//successFn(result); 저장된 값이 있는 경우 result 파라메터에 json 형태로 리턴
		//failCB(); 저장된 값이 없는 경우 호출
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'retrieveOrgInfo', [juminNo, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//보험사정보 로컬에 저장
	_public.saveOrgInfo = function (juminNo, jsonOrg, dummy, successFn, failCB) {
		//successFn(); 성공시 호출. 리턴 파라메터 없음
		//failCB(); 실패시 호출. 리턴 파라메터 없음
		alert('saveOrgInfo()');

		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'saveOrgInfo', [juminNo, jsonOrg, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//기존에 저장된 진료내역이 있는지 체크
	_public.checkMediInfo = function (juminNo, dummy, successFn, failCB) {
		//successFn(); 저장된 값이 있는 경우 호출, 파라메터 없음
		//failCB(); 저장된 값이 없는 경우 호출, 파라메터 없음
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'checkMediInfo', [juminNo, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//최근 진료조회일자 구하기
	_public.retrieveRecentMediDate = function (juminNo, successFn, failCB) {
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'retrieveRecentMediDate', [juminNo]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//진료내역 스크래핑 수행후 로컬에 저장하고 반환
	_public.requestMediInfo = function (juminNo, dummy, successFn, failCB) {
		//successFn(result); result 파라메터에 json 형태로 결과값 리턴 ; ios는 result 값을 JSON.stringify(result) 처리 해야함.
		//failCB(result); result 파라메터에 에러값 리턴
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'requestMediInfo', [juminNo, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//로컬에 저장된 진료내역 목록조회
	_public.retrieveMediInfo = function (juminNo, dummy, successFn, failCB) {
		//successFn(result); result 파라메터에 json 형태로 결과값 리턴 ; ios는 result 값을 JSON.stringify(result) 처리 해야함.
		//failCB();	// 실패시 호출
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'retrieveMediInfo', [juminNo, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//청구결과 로컬에 저장
	_public.saveInvoiceInfo = function (juminNo, reqID, detailJson, dummy, successFn, failCB) {
		//reqID ; 청구완료후 요청키
		//successFn(); //성공콜백. 파라메터 없음.

		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'saveInvoiceInfo', [juminNo, reqID, detailJson, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//로컬에 저장된 청구목록 조회
	_public.retrieveInvoiceInfo = function (juminNo, dummy, successFn, failCB) {
		//juminNo ; 주민번호가 '' 인경우 전체 목록 조회
		//successFn(result); 저장된 reqID가 result 파라메터에 json형태로 반환됨
		//failCB();	저장된 목록이 없는경우 호출됨
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'retrieveInvoiceInfo', [juminNo, dummy]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//청구내역 삭제
	_public.deleteInvoiceInfo = function (reqID, successFn, failCB) {
		//reqID ; 청구ID
		//successFn(); //결과 인자 없음
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'deleteInvoiceInfo', ['', reqID]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//최근 청구정보 저장(청구 최근내역불러오기)
	_public.saveRecentReqInvcInfo = function (juminNo, invcJsonData, successFn, failCB) {
		//successFn(); //결과 인자 없음
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'saveRecentReqInvcInfo', [juminNo, invcJsonData]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//최근 청구정보 가져오기
	_public.retrieveRecentReqInvcInfo = function (juminNo, successFn, failCB) {
		//successFn(result); 	//result에 저장된 jsonData 반환
		//failCB();				//저장된 값이 없는 경우 호출
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'retrieveRecentReqInvcInfo', [juminNo]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	//최근 청구일자 가져오기
	_public.retrieveRecentReqInvcDate = function (juminNo, successFn, failCB) {
		//successFn(result); //result에 저장된 날짜(yyyy-MM-dd) 반환
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'retrieveRecentReqInvcDate', [juminNo]);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	/*
	 * 청구서비스 공인인증서 여부 체크
	 * successFn param(Boolean) : true(인증서 존재), false(인증서 미존재)
	 *
	 */
	_public.getCertificates = function (successFn, failCB) {
		try {
			Mxp.exec(successFn, failCB, 'KWICPlugin', 'getCertificates', []);
		} catch (e) {
			navigator.notification.alert(e.message);
		}
	};

	/**=================================== 청구 END =========================================================*/

	/**
	 * 메시징 Script 관련 함수
	 */
	_public.messageScript = {
		recvAuthNumber: function (authNumber) {
			if ($('#txt_phnCerti').length > 0) {
				var message = '인증번호 [' + authNumber + ']를 입력하시겠습니까?';
				if (confirm(message)) {
					$('#txt_phnCerti').val(authNumber);
				}
			}
		},

		recvMessage: function (message) {
			if (message != '') {
				if (message == '55') {
					window.location = '/lifesquare/ls/MWLS215S1.dev?evntCd=HG01';
				} else if (message == '66') {
					window.location = '/mypage/mo/MWMO101S1.dev';
				} else {
					var movePage = '/products/pg/PG' + message + '000S.dev';
					window.location = movePage;
				}
			}
		},

		getMessageProducts: function (callback) {
			Mxp.exec(callback, null, 'LifeplanetPlugin', 'getMessageProducts', []);
		},
	};

	/**
	 *
	 */
	_public.VestPin = {
		/**
		 * VestPin Key Press이벤트 전달 함수
		 */
		pressKey: function (keyId, value) {
			if (MXP_PLUGIN.isIOS()) {
				Mxp.exec(null, null, 'LPVestPinPlugin', 'pressKey', [keyId, value]);
			} else {
				window.LPVestPinPlugin.pressKey(keyId, value);
			}
		},

		/**
		 * VestPin Key Press 전체 입력후 호출되는 함수
		 */
		finishKeypress: function (keyId) {
			if (MXP_PLUGIN.isIOS()) {
				Mxp.exec(null, null, 'LPVestPinPlugin', 'finishKeypress', [keyId]);
			} else {
				window.LPVestPinPlugin.finishKeypress(keyId);
			}
		},

		/**
		 * VestPin close버튼 누른경우
		 */
		closeKeypad: function (keyId) {
			if (MXP_PLUGIN.isIOS()) {
				Mxp.exec(null, null, 'LPVestPinPlugin', 'closeKeypad', [keyId]);
			} else {
				window.LPVestPinPlugin.closeKeypad(keyId);
			}
		},

		/**
		 * 인증 성공후 Native전달
		 */
		receiveAhrzRslt: function (ciKey) {
			if (MXP_PLUGIN.isIOS()) {
				Mxp.exec(null, null, 'LPVestPinPlugin', 'receiveAhrzRslt', [ciKey]);
			} else {
				window.LPVestPinPlugin.receiveAhrzRslt(ciKey);
			}
		},

		/**
		 * 등록 성공후 Native전달
		 */
		receiveRegiRslt: function () {
			if (MXP_PLUGIN.isIOS()) {
				Mxp.exec(null, null, 'LPVestPinPlugin', 'receiveRegiRslt', []);
			} else {
				window.LPVestPinPlugin.receiveRegiRslt();
			}
		},

		showKeypadRslt: function (keyId) {
			if (MXP_PLUGIN.isIOS()) {
				Mxp.exec(null, null, 'LPVestPinPlugin', 'showKeypadRslt', [keyId]);
			} else {
				window.LPVestPinPlugin.showKeypadRslt();
			}
		},
	};
	_public.NativeApp = {
		timerInterval: null,
		timerIntervalSec: 500, //0.5초
		timerOut: null,
		timerOutSec: 5000, //5초
		inSData: {},
		moveData: {},

		pollingPrLogin: function (param, callback) {
			_public.NativeApp.timerClear();
			_public.NativeApp.timerInterval = setInterval(function () {
				_public.NativeApp.checkPrLogin(param, function (outData) {
					var prStatus = outData.prStatus;
					console.log('prStatus:' + prStatus);
					if (prStatus == '02' || prStatus == '00') {
						// 선로그인 완료이거나 선로그인 대상이 아닌경우
						_public.NativeApp.timerClear();
						callback(param);
					}
				});
			}, _public.NativeApp.timerIntervalSec);

			_public.NativeApp.timerOut = setTimeout(function () {
				_public.NativeApp.timerClear();
			}, _public.NativeApp.timerOutSec);
		},

		/**
		 * timer 중지
		 */
		timerClear: function () {
			if (_public.NativeApp.timerInterval != null) {
				clearInterval(_public.NativeApp.timerInterval);
			}
			if (_public.NativeApp.timerOut != null) {
				clearTimeout(_public.NativeApp.timerOut);
			}
		},

		checkPrLogin: function (param, callback) {
			param.tradeKey = 'prCheck';
			try {
				$.ajax({
					type: 'POST',
					async: false,
					url: '/common/thirdParty/NativeApp.ajax',
					dataType: 'json',
					data: param,
					error: function (data) {
						//통신 에러 발생시 처리
						//에러처리
						_public.NativeApp.showErrMsgLogin('로그인에 실패하였습니다.');
					},
					success: function (data) {
						//통신 성공시 처리
						var outData = data.result.outData;
						callback(outData);
					},
				});
			} catch (e) {}
		},

		sendLoginData: function (inSData) {
			_public.NativeApp.inSData = inSData;
			//_public.NativeApp.pollingPrLogin(inSData, _public.NativeApp.completePrLoginCheck); //선로그인 인경우(추후 사용할경우)
			_public.NativeApp.completePrLoginCheck(inSData);
		},
		completePrLoginCheck: function (inSData) {
			var param = {};

			inSData.tradeKey = 'recvLoginData';
			param.JSON_DATA = JSON.stringify(inSData);

			try {
				$.ajax({
					type: 'POST',
					async: true, //비동기방식
					url: '/common/thirdParty/NativeApp.ajax',
					dataType: 'json',
					data: param,
					error: function (data) {
						//통신 에러 발생시 처리
						_public.NativeApp.showErrMsgLogin('로그인에 실패하였습니다.');
					},
					success: function (data) {
						//통신 성공시 처리
						var outData = data.result.outData;
						_public.NativeApp.successCallBack(outData);
					},
				});
			} catch (e) {}
		},
		successCallBack: function (data) {
			if (data.ERROR_MSG != undefined) {
				//에러 처리 필요
				_public.NativeApp.showErrMsgLogin(data.ERROR_MSG);
				return;
			}
			isKDIMWLogin = true;
			var nativeYn = _public.NativeApp.inSData.nativeYn; //Native App 로그인으로 이동여부
			if (nativeYn == true) {
				//현재는 GNB관련 로그인을 변경하기 reload. 추후에는 해당 영역을 변경하는걸로 수정 예정
				if (!$.isEmptyObject(MXP_PLUGIN.NativeApp.moveData)) {
					var moveData = MXP_PLUGIN.NativeApp.moveData;
					var url = moveData.url;
					var parameters = {};
					if (moveData.parameters != undefined) {
						parameters = moveData.parameters;
						PageUtil.movePage(url, parameters);
					} else {
						PageUtil.movePage(url);
					}
					MXP_PLUGIN.NativeApp.moveData = {};
				} else {
					location.reload();
				}
				return;
			}

			var locationUrl = '';
			var querys = {};
			var moveUrl = '/mypage/mc/MWMC000S1';

			MXP_PLUGIN.pushLoginRun(
				function () {},
				function () {},
				data.pushCsno,
				data.pushCstHanNm
			);

			//20150904 리턴url로 이동
			var returnUrl = sessionStorage.getItem('returnUrl');
			if (_public.NativeApp.inSData.locationData != undefined) {
				locationUrl = util.nvl(_public.NativeApp.inSData.locationData.locationUrl, '');
				if (locationUrl != '') {
					delete _public.NativeApp.inSData.locationData.locationUrl;
					querys = _public.NativeApp.inSData.locationData;
				}
			}
			if (locationUrl != '') {
				var objParam = {};
				if (querys != undefined) {
					objParam = querys;
				}

				//[20200716]모바일앱 안내장 오류로 이한 임시조치로 수정 , 추후 앱 업데이트 버전후 수정예정
				if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
					if (locationUrl.indexOf('/mm/MWMM580S1') > -1) {
						objParam = { notiPmlSrno: _public.NativeApp.inSData.locationData.notiPmlSrno };
					}
				}
				PageUtil.movePage(locationUrl, objParam);
			}
			// returnUrl 이 있을 경우 returnUrl로 이동
			else if (returnUrl != null && returnUrl != '') {
				sessionStorage.removeItem('returnUrl');
				PageUtil.movePage(returnUrl);
			} else {
				PageUtil.movePage(moveUrl); // 마이페이지 서브 메인 화면으로 이동
			}
		},

		/*
		 * Native화면을 open하기 위한 함수
		 * strUrl : 로그인 후 이동페이지
		 */
		presentNative: function (params, querys) {
			if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) {
				if (device.appVersion >= '4.0.0') {
					if (querys != undefined) {
						Mxp.exec(null, null, 'LifeplanetPlugin', 'presentNative', [params, querys]);
					} else {
						Mxp.exec(null, null, 'LifeplanetPlugin', 'presentNative', [params]);
					}
				} else {
					Mxp.exec(null, null, 'LifeplanetPlugin', 'presentNative', [params]);
				}
			} else {
				Mxp.exec(null, null, 'LifeplanetPlugin', 'presentNative', [params]);
			}
		},

		/*
		 * 로그인되어 있는경우 Native화면으로 direct로 이동하는 함수
		 * strUrl : 로그인 후 이동페이지
		 */
		presentNativeDirect: function (params, querys) {
			Mxp.exec(null, null, 'LifeplanetPlugin', 'presentNativeDirect', [params]);
		},

		/*
		 * Native화면을 close하기 위한 함수
		 */
		dismissNative: function () {
			Mxp.exec(null, null, 'LifeplanetPlugin', 'dismissNative', []);
		},

		/*
		 * 인증센터 > 바이오 등록 or 핀등록 을 클릭하여 바로 Native 특정화면으로 이동하기 위한함수
		 * ahrzTp : bio(바이오), pin(핀)
		 *
		 */
		presentNativeRegiInfo: function (ahrzTp) {
			Mxp.exec(null, null, 'LifeplanetPlugin', 'presentNativeRegiInfo', [ahrzTp]);
		},

		/*
		 * 웹에서 Native 설정화면 show
		 *
		 */
		presentNativeEst: function () {
			$('.btn_gnb_close').trigger('click');
			Mxp.exec(null, null, 'LifeplanetPlugin', 'presentNativeEst', []);
		},

		/*
		 * 선로그인 고객정보 설정
		 */
		executePrLoginData: function (cuid) {
			var param = {};
			param.cuid = cuid;
			param.tradeKey = 'prLogin';
			try {
				$.ajax({
					type: 'POST',
					async: true, //비동기방식
					url: '/common/thirdParty/NativeApp.ajax',
					dataType: 'json',
					data: param,
					error: function (data) {
						//통신 에러 발생시 처리
					},
					success: function (data) {
						//통신 성공시 처리
					},
				});
			} catch (e) {}
		},
		/**
		 * 로그인 프로세스 시 발생된 에러 메시지를 Native에 전달하기 위한 함수
		 */
		showErrMsgLogin: function (msg) {
			Mxp.exec(null, null, 'LifeplanetPlugin', 'showErrMsgLogin', [msg]);
		},

		/**
		 * Native Ap버전에 따른 Native App 방식  유무를 체크
		 * @param
		 * @return true : Native App , false :  Hybrid App 또는 모바일웹
		 */
		isNativeApp: function () {
			if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
				// Android인경우 6.6.0 이상버전
				if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
					// Android
					if (device.appVersion >= '6.0.0') {
						return true;
					} else {
						return false;
					}
				} else {
					if (device.appVersion >= '4.4.0') {
						return true;
					} else {
						return false;
					}
				}
			} else {
				// iOS인경우 4.4.0이상버전
				return false;
			}
		},
		/**
		 * Native 화면 Web화면의 movePage 실행하는 함수
		 */
		movePage: function (param) {
			var url = param.url;
			var parameters = {};
			if (window.isKDIMWLogin != true) {
				MXP_PLUGIN.NativeApp.moveData = param;
			} else {
				if (param.parameters != undefined) {
					parameters = param.parameters;
					PageUtil.movePage(url, parameters);
				} else {
					PageUtil.movePage(url);
				}
			}
		},

		/**
		 * Native 로그인시 필요한 cookie를 조회하는 함수
		 */
		getCookies: function () {
			var result = {};
			result.returnUrl = util.nvl(sessionStorage.getItem('returnUrl'), '');
			result.goodsCookie = util.getCookie('goodsCookie');
			result.menuCookie = util.getCookie('menuCookie');
			return result;
		},
		/**
		 * NativeApp에 전달되는 cookie를 설정
		 */
		setCookies: function (key, value) {
			if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
				//				var escapeVal = escape(value);
				//				var unescapeVal = escape(escapeVal);
				//				Mxp.exec(null, null, 'LifeplanetPlugin', 'setCookies', [key, unescapeVal]);
			}
		},

		/**
		 * 모바일앱 마이페이지 서브메인에서 마케팅 팝업 호출,Android전용
		 */
		presentEventPopup: function () {
			if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
				Mxp.exec(null, null, 'LifeplanetPlugin', 'presentEventPopup', []);
			}
		},
	};

	return _public;
})();
