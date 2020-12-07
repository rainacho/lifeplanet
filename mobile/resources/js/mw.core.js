/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * DESCRIPTION : 페이지 전역에서 사용되는 main 함수 집합
 * ========================================================================== */

/**
 * 어플리케이션의 경우에만 mxp.js를 로딩 한다.
 * 이외의 상황에서 mxp.js가 로딩되는 경우, mxp.js자체에서 재정의 하는 html모듈이 있기 때문에, 정상적으로
 * 작동하지 않는 오류가 발생하였다.(LG CNS 답변)
 */
MXP_PLUGIN.getAccessPath();

/**
 * mxp.js가 정상적으로 로드 된 이후 실행 되는 소스
 */
function onDeviceReady() {
	//특정폰에서 addClass호출하지 못하는 문제점이 있어 함수호출 deviceready이후 호출되도록 변경
	MXP_PLUGIN.initMxpEngine();
	console.log('onDeviceReady');
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
	 */

	/*
	 * Native화면에서 로그인 후 native를 close하기 위한 함수
	 * 마이페이지, 360 플래닛
	 */
	if (location.pathname.indexOf('/mypage/') > -1 || (window.isKDIMWLogin && location.pathname.indexOf('/innovation/') > -1)) {
		if (MXP_PLUGIN.NativeApp.isNativeApp()) {
			MXP_PLUGIN.NativeApp.dismissNative();
		}
	}

	/**
	 * 1. 접속 정보 셋팅
	 */
	MXP_PLUGIN_CONST.setConfiguration(MXP_PLUGIN.getOSInfo().name);

	/**
	 * 2. 버전 체크
	 */
	MXP_PLUGIN.checkUpdateNative();

	/**
	 * 3. 보안 모듈 호출
	 */
	//서식보기 팝업일 경우 앱위변조 체크하지 않도록 수정
	if (
		MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1 &&
		!sessionStorage.getItem('isSecurityRun') &&
		location.pathname.indexOf('newPopup.dev') < 0
	) {
		if (isInternalNetwork == true) {
			commonFuncDeviceReady();
			if (MXP_PLUGIN.isAndroid()) {
				MXP_PLUGIN.initXecure();
			}
		} else if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
			commonFuncDeviceReady();
			MXP_PLUGIN.initXecure();
		} else {
			MXP_PLUGIN.securityRun(
				function (data) {
					// 성공
					if (data.statusMsg == 'fail') {
						navigator.notification.alert(
							data.errorMsg,
							function (number) {
								device.exitApp();
							},
							'알림',
							'확인'
						);
					} else {
						console.log('securityRun second auth');
						sessionStorage.setItem('isSecurityRun', true);
						MXP_PLUGIN.passSecondAuth(function () {
							commonFuncDeviceReady();
						});

						//	        //AppShied 2차 검증 로직 수행
						//	        console.log("securityRun second auth");
						//	        var param = {};
						//	        param.sid = data.sid;
						//	        param.token = data.token;
						//	        param.url =  MXP_PLUGIN_CONST.getConfiguration('XASSECONDCHECKURL');
						//
						//		    var tranProp = util.clone(transaction.TRAN_COMM_PROP);   // 트랜잭션 기본 객체 복사
						//		    tranProp.url = '/common/thirdParty/XASSECONDARYAUTH';    // 트랜잭션 Url
						//		    tranProp.tradeKey = 'xasSeconaryAuth'; 				     // 트랜잭션 TradeKey
						//		    tranProp.params = param; 								 // 트랜잭션 Parameter
						//		    tranProp.blockingFlag = false; 							 // 트랜잭션 로딩창
						//
						//            tranProp.success = function(data) {
						//            	//2차 검증 성공 했을 경우
						//
						//	            if (data.outData.message == "success") {
						//	            	console.log("securityRun second auth success");
						//	            	sessionStorage.setItem('isSecurityRun', true);
						//		            /**
						//		             * 4. Ace Counter 웹로그 적재
						//		             */
						//		            if (config.getEnv('getServerStatus')() == 'PROD'){
						//		              console.log("MXP_PLUGIN.webLogRun() start");
						//		              MXP_PLUGIN.webLogRun();
						//		              console.log("MXP_PLUGIN.webLogRun() end");
						//		            }
						//		            MXP_PLUGIN.passSecondAuth(function(){
						//		            	commonFuncDeviceReady();
						//		            })
						//
						//	            } else {
						//	            	navigator.notification.alert("위변조 검증에 실패했습니다.\n불편을 드려 죄송합니다.", function(number){
						//	            		device.exitApp();
						//	            	}, "알림", "확인");
						//	            }
						//
						//	        }; // Success Callback
						//	        // 트랜잭션 실행
						//	        transaction.callTran(tranProp);
					}
				},
				function (data) {
					// 실패
					message.alert('COM105');
					device.exitApp();
				}
			);
		}
	} else {
		if (location.href.indexOf('CA01000S') > -1) {
			if (MXP_PLUGIN.isAndroid()) {
				if (typeof CA01000S != 'undefined') {
					if (!CA01000S.onDeviceReadyChk) {
						console.log('mw.core CA01000S onDeviceReady');
						CA01000S.onDeviceReady();
					}
				}
			}
		}
	}

	//지문인증 처리
	if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
		if (MXP_PLUGIN.NativeApp.isNativeApp()) {
			$('#gnb a.btn_gnb_config').show();
			$('#gnb a.btn_gnb_certi').hide();
		}

		if (sessionStorage.getItem('supportDevice')) {
			//지문인증 안내페이지
			setTimeout(function () {
				setTimeout(function () {
					if (MXP_PLUGIN.isiPhoneX()) {
						var $li = $("#gnb_wrap a[href*='/contact/ct/MWCT250S1.dev']").closest('li.depth3');
						$li.find('a:eq(0)').html('Face ID 인증<em>더보기</em>');
						$li.find('a:eq(1)').text('Face ID 인증');
						$li.find('a:eq(2)').text('Face ID 인증 해지');
					}
					$("#gnb_wrap a[href*='/contact/ct/MWCT250S1.dev']").closest('li.depth3').show();
				}, 1000);
			});
		}
	}

	//
}

/**
 * 모바일앱 MXP를 이용한 Intent 기능
 */

function onAppIntent(event) {
	var newUrl = '';
	if (event.data != undefined) {
		setTimeout(function () {
			var kakaoLink = event.data.kakaoAppLink;
			if (kakaoLink == 'Y') {
				// kakoAppLink으로 실행된 경우
				newUrl = event.data.locationUrl;
				if (newUrl.indexOf('/mypage/') > -1 || newUrl.indexOf('/iy/MWIY100S1') > -1) {
					PageUtil.movePage('/common/ca/CA01000S.dev', event.data);
				} else {
					location.href = newUrl;
				}
			} else {
				newUrl = event.data.newUrl;
				newUrl = window.location.protocol + '//' + window.location.host + newUrl;
				location.href = newUrl;
			}
		}, 1000);
	}
}

/*
 * 내외부망 구분없이 deviceready이벤트 발생후 실행되는 함수 정의
 */
function commonFuncDeviceReady() {
	sessionStorage.setItem('isSecurityRun', true);

	/**
	 * Push 사용자 등록
	 */
	if (sessionStorage.getItem('alreadyRegist') != true) {
		MXP_PLUGIN.pushLoginRun(
			function () {
				sessionStorage.setItem('alreadyRegist', true);
			},
			function () {}
		);
	}

	if (location.href.indexOf('CA01000S') > -1) {
		if (MXP_PLUGIN.isAndroid()) {
			if (typeof CA01000S != 'undefined') {
				if (!CA01000S.onDeviceReadyChk) {
					console.log('mw.core CA01000S onDeviceReady');
					CA01000S.onDeviceReady();
				}
			}
		}
	}

	console.log('commonFuncDeviceReady1');
	/**
	 * widget 관련 데이터를 위변조 성공후 보내도록 변경
	 */
	setTimeout(function () {
		if (MXP_PLUGIN.widget.eventData != null) {
			Mxp.exec(null, null, 'LifeplanetPlugin', 'sendEvent', MXP_PLUGIN.widget.eventData);
		}
	}, 1000);
}

/******************************************************************************
 *  [화면 onLoad시 jQuery Ready 부분]
 *  - js가 화면에 로딩되는 경우 해당 부분에서부터 로직이 시작된다.
 *****************************************************************************/
$(document).ready(function () {
	logger.log('[READY] Now Use jQuery --------------------------------------');

	// 로딩 유틸 실행
	Main.onLoading();

	// if(globalVar.getParam('inSData').inflow != "AK") {
	// 	document.addEventListener("deviceready", onDeviceReady, false);
	// }

	document.addEventListener('appintent', onAppIntent, false);

	// 초기화 이벤트 호출
	//Main.readyEvent();

	//MXP deviceready 이벤트 호출
	MXP_PLUGIN.fireMXPNativeReadyEvent();

	/**
	 * 에러 발생시 에러 처리기 등록
	 */
	window.onerror = function (msg, url, lines, column, errorObj) {
		logger.log('>>> Catch Error Log Start >>>');

		logger.log('* message : ' + msg);
		logger.log('* path    : ' + url);
		logger.log('* line    : ' + lines);

		logger.log('<<< Catch Error Log END <<<');

		/**
		 * 모바일앱일경우 Answer를 활용해 오류 리포트
		 */
		if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
			var data = {};
			data.message = msg;
			data.path = url;
			data.line = lines;
			MXP_PLUGIN.answer.sendException(data);
		}

		if (lifeplanetServer(url)) {
			//스크립트 에러로그 삽입
			scriptErrorLogFnc(msg, url, lines, column, errorObj);
		}
	};

	Main.onDisableBack();

	window.onpopstate = function (D) {
		if (D) {
			if (!D.state) {
				// _public.closePopup(option.id);
				//				$('.b-close' ).trigger('click');
			}
		}
	};

	window.onpageshow = function (event) {
		Main.offLoading();
	};
});

var lifeplanetServer = function (url) {
	var host = util.nvl(url, '');

	if (host.indexOf('http://127.0.0.1') > -1 || host.indexOf('http://localhost') > -1 || host.indexOf('http://192.168') > -1) {
		return true;
	} else if (host.indexOf('http://mwd.lifeplanet.co.kr') > -1) {
		return true;
	} else if (host.indexOf('https://mwt.lifeplanet.co.kr') > -1) {
		return true;
	} else if (host.indexOf('https://m.lifeplanet.co.kr') > -1) {
		return true;
	} else {
		return false;
	}
};

//스크립트 에러로그 삽입
var scriptErrorLogFnc = function (msg, url, lines, column, errorObj) {
	var stackTrace = '';

	if (errorObj != undefined && errorObj != null) {
		stackTrace = errorObj.stack;
	}

	try {
		$.ajax({
			type: 'POST',
			async: true, //비동기방식
			url: '/common/cc/MWCommonUtil.ajax',
			dataType: 'json',
			data: { tradeKey: 'scriptErrorLog', message: msg, path: url, line: lines, stackTrace: stackTrace },
			error: function (data) {
				//통신 에러 발생시 처리
			},
			success: function (data) {
				//통신 성공시 처리
			},
		});
	} catch (e) {}
};

/**
 * Config에 등록된 환경변수 취득
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var environment = (function () {
	var _public = {};

	/**
	 * 환경변수 Named으로 값 취득
	 * @param envName
	 * @returns
	 */
	_public.getEnv = function (envName) {
		return config[envName];
	};

	/**
	 * 브라우저 정보 취득
	 */
	_public.getBrowserInfo = function () {
		// Chrome >> Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
		// IE	  >> Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)

		var userAgent = navigator.userAgent;
		var returnInfo = '';

		if (userAgent.indexOf('MSIE') > -1) {
			returnInfo = 'IE';
		} else if (userAgent.indexOf('Chrome') > -1) {
			returnInfo = 'CHROME';
		}

		return returnInfo;
	};

	return _public;
})();

/**
 * 페이지전역에서 사용되는 공통함수
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var Main = (function () {
	var _public = {};

	/**
	 * Form 객체를 Object 형태로 변환해주는 함수 구현
	 * NOTE : Form 의 Name Attribute를 Key로 사용하기 때문에 Name을 반드시
	 * 		  입력해야 한다.
	 */
	(function ($) {
		$.fn.serializeObject = function () {
			var self = this,
				json = {},
				push_counters = {},
				patterns = {
					validate: /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
					key: /[a-zA-Z0-9_]+|(?=\[\])/g,
					push: /^$/,
					fixed: /^\d+$/,
					named: /^[a-zA-Z0-9_]+$/,
				};

			this.build = function (base, key, value) {
				base[key] = value;
				return base;
			};

			this.push_counter = function (key) {
				if (push_counters[key] === undefined) {
					push_counters[key] = 0;
				}
				return push_counters[key]++;
			};

			$.each($(this).serializeArray(), function () {
				// skip invalid keys
				if (!patterns.validate.test(this.name)) {
					return;
				}

				var k,
					keys = this.name.match(patterns.key),
					merge = this.value,
					reverse_key = this.name;

				while ((k = keys.pop()) !== undefined) {
					// adjust reverse_key
					reverse_key = reverse_key.replace(new RegExp('\\[' + k + '\\]$'), '');

					// push
					if (k.match(patterns.push)) {
						merge = self.build([], self.push_counter(reverse_key), merge);
					}

					// fixed
					else if (k.match(patterns.fixed)) {
						merge = self.build([], k, merge);
					}

					// named
					else if (k.match(patterns.named)) {
						merge = self.build({}, k, merge);
					}
				}

				json = $.extend(true, json, merge);
			});

			return json;
		};
	})(jQuery);

	/**
	 * [Push메세지 수신 함수]
	 * push메세지를 확인하는 경우 native단에서 해당 함수를 호출한다.
	 * 호출된 이후 각 업무에 맞는 분기 처리를 진행한다.
	 *
	 * @param jsonMessage
	 * @param psId
	 * @param message
	 */
	_public.recievePush = function (jsonMessage, psId, message) {
		console.debug(jsonMessage);
		console.debug(psId);
		console.debug(message);

		var recievePushData;
		var pushType = '';
		var pushContents = '';
		var attachedUrl = '';
		var urlStr = '';
		var newPopupUrl = '';
		var notiPmlSrno = '';

		recievePushData = message.split('|');
		pushType = recievePushData[1];
		pushContents = recievePushData[2];
		if (pushType == '0') {
			// 일반 알림 메시지인경우
			urlStr = recievePushData[3];
			if (urlStr != undefined) {
				// url이 존재하는 경우
				PageUtil.movePage('/common/ca/CA01000S', { locationUrl: urlStr });
			} else {
				navigator.notification.alert(pushContents);
			}
		} else if (pushType == '2') {
			// 특정 페이지로 이동
			newPopupUrl = recievePushData[4];
			notiPmlSrno = recievePushData[0];
			setTimeout(function () {
				try {
					$.ajax({
						type: 'POST',
						async: true,
						url: '/common/thirdParty/Location.ajax',
						dataType: 'json',
						data: { tradeKey: 'readPushMsg', notiPmlSrno: notiPmlSrno },
						success: function (data) {
							//통신 성공시 처리
							PageUtil.movePage(newPopupUrl);
						},
						error: function (data) {
							//통신 에러 발생시 처리
							PageUtil.movePage(newPopupUrl);
						},
					});
				} catch (e) {}
			}, 2000);
		} else if (pushType == '3') {
			// 정해진 페이지로 이동(추후 페이지는 변경예)
			newPopupUrl = location.origin + '/common/cc/newPopup.dev';
			var option = new webDialogProperties();
			option.headerTitleText = '라이프플래닛';
			option.headerCloseButtonText = '닫기';
			navigator.webdialog.open(
				newPopupUrl,
				option,
				function () {},
				function () {},
				function () {}
			);
		}
	};

	/**
	 * [LMS 메세지 수신 함수]
	 * LMS메세지를 수신하는 경우 native단에서 해당 함수를 호출한다.
	 *
	 */
	_public.receiveSMS = function (message) {
		console.log('sms message:' + message);
		if (isInternalNetwork == true) {
			$(":input[data-phnCerti='Y']").val(message);
		}
	};

	/**
	 * Location Data 수신 함수
	 * Pending된 Location Data를 앱실행시 체크하여 수신 받음
	 * param cuid 		: 고객번호
	 * param psitClneDt : Location Data 일시
	 * param psitScCd   : Location Data Type
	 */
	_public.receiveLocationData = function (cuid, psitClneDt, psitScCd) {
		//		alert('receiveLocationData cuid:'+cuid+" psitClneDt:"+psitClneDt+ " psitScCd:"+psitScCd);

		var params = {
			cuid: cuid,
			psitClneDt: psitClneDt,
			psitScCd: psitScCd,
		};

		var tranProp = util.clone(transaction.TRAN_COMM_PROP); // 트랜잭션 기본 객체 복사
		tranProp.url = '/common/thirdParty/Location'; // 트랜잭션 Url
		tranProp.params = params; // 트랜잭션 Parameter
		tranProp.success = function (data) {
			console.log('success receive Location Data');
		};

		// 트랜잭션 실행
		transaction.callTran(tranProp);
	};

	/**
	 * 앱위변조 데이터 수신
	 */
	_public.receiveAppShieldData = function (param) {
		if (config.getEnv('getServerStatus')() == 'PROD') {
			//			var ajaxData = JSON.parse(param);
			//			ajaxData.url =  MXP_PLUGIN_CONST.getConfiguration('XASSECONDCHECKURL');
			//			if(ajaxData.statusMsg =="fail"){
			//				  navigator.notification.alert(ajaxData.errorMsg, function(number){
			//				    device.exitApp();
			//				  }, "알림", "확인");
			//			} else {
			//				try{
			//					ajaxData.tradeKey = "xasSeconaryAuth";
			//				    $.ajax({type        : "POST"
			//				      ,async       		: true //비동기방식
			//				      ,url         		: "/common/thirdParty/XASSECONDARYAUTH.ajax"
			//				      ,dataType    		: "json"
			//				      ,data        		: ajaxData
			//				      ,error       		: function(data){ //통신 에러 발생시 처리
			//				      }
			//				      ,success     : function(data){ //통신 성공시 처리
			//				    	  if (data.result.outData.message == "success") {
			//
			//				    	  } else {
			//				            	navigator.notification.alert("위변조 검증에 실패했습니다.\n불편을 드려 죄송합니다.", function(number){
			//			            		device.exitApp();
			//			            	}, "알림", "확인");
			//				    	  }
			//
			//				      }
			//				   });
			//				}catch(e){
			//
			//				}
			//
			//			}
		}
	};

	_public.readyEvent = function (paramPath, param, popupId) {
		/***************************************************************************
		 * TODO - 2014/11/24 권대준
		 * 페이지 로딩시 JSP가 랜더링 된 후 jquery가 로딩되는 부분을 이용하여, jsp에 문자열
		 * 형태로 남아 있는 response 부분을 삭제 한다. 추후 보다 나은 방법을 찾는다면 개선
		 * 해야 할 부분 이다.
		 **************************************************************************/
		$('head script[id=resultOutDataArea]').remove(); // script영역 삭제

		/***************************************************************************
		 * INFO : 페이지 로딩시 호출된 페이지와 동일한 js를 로딩한다. 이로 인해 페이지별로
		 * 		  js를 include하는 수고를 덜 수 있다.
		 **************************************************************************/

		var path = '';

		if (util.isNull(paramPath)) {
			path = globalVar.getParam('_CUR_URI').split('.')[0];
		} else {
			// path = paramPath.replace('.dev', '');
			path = paramPath.split('.')[0];
		}

		var jsPath = '';
		var pathArr = path.split('/');
		for (var i = 1; i < pathArr.length; i++) {
			if (i == 1 && pathArr[i] != 'views' && $.inArray('error', pathArr) < 0) {
				// 에러 페이지가 아닌경우 앞자리가 view가 아닌경우 생성한다.
				jsPath += '/views/' + pathArr[i];
			} else if (i == pathArr.length - 1) {
				// path arr의 마지막 자리 앞은 js path 를 추가 한다.
				jsPath += '/js/' + pathArr[i];
			} else {
				// 이외의 경우 url을 생성한다.
				jsPath += '/' + pathArr[i];
			}
		}
		jsPath = jsPath + '.js';
		PageUtil.loadJavascript(jsPath, param, popupId);
	};

	/**
	 * 홈페이지 공통 코드 취득 함수
	 * @param typeId
	 * @param grouId
	 */
	_public.getHpCommonCode = function (typeId) {
		// 기본 - [공통코드] 호출
		var commonCode = null;

		var xhr = new XMLHttpRequest();
		var url =
			location.protocol + '//' + location.host + '/common/cc/RetrieveCommonCode.ajax?' + 'typeId=' + typeId + '&tradeKey=getHpCmnncd';

		xhr.open('POST', url, false);
		xhr.send(null);

		commonCode = JSON.parse(xhr.responseText);

		if (util.isNull(commonCode)) {
			return new Array();
		} else {
			return commonCode.result.outData;
		}
	};

	/**
	 * 준감필명 가져오기
	 * @param typeId
	 * @param grouId
	 */
	_public.getLasaWatcNm = function (lasaWatcNo) {
		// 기본 - [공통코드] 호출
		var codeList = Main.getHpCommonCode('10002');
		var lasaWatcNm = '';

		for (var i = 0; i < codeList.length; i++) {
			if (lasaWatcNo == codeList[i].cmnnCd) {
				lasaWatcNm = codeList[i].cmnnCdNm;
			}
		}

		return lasaWatcNm;
	};

	/**
	 * 공통 코드 취득 함수
	 * @param typeId
	 * @param grouId
	 */
	_public.getCommonCode = function (typeId, grouId) {
		// 기본 - [공통코드] 호출
		var commonCode = null;

		var xhr = new XMLHttpRequest();
		var url =
			location.protocol +
			'//' +
			location.host +
			'/common/cc/RetrieveCommonCode.ajax?' +
			'typeId=' +
			typeId +
			'&tradeKey=' +
			constants.getVal('RETRIEVE');

		// 인자2개 - [공통코드그룹]
		if (arguments.length == 2 && grouId != undefined && grouId != '') {
			url += '&grouId=' + grouId;
		}

		xhr.open('POST', url, false);
		xhr.send(null);

		commonCode = JSON.parse(xhr.responseText);

		if (util.isNull(commonCode)) {
			return new Array();
		} else {
			return commonCode.result.outData;
		}
	};

	/**
	 * 공통 코드 취득하여 입력된 코드값과 매칭되는 공통코드명을 반환한다
	 * @param typeId
	 * @param grouId (grouId 불필요시 null값 입력 필요)
	 * @param code
	 */
	_public.getCommonCodeNm = function (typeId, grouId, code) {
		var i = 0;
		var codeData = [];
		if (grouId != null) {
			codeData = _public.getCommonCode(typeId, grouId);
		} else {
			codeData = _public.getCommonCode(typeId);
		}

		for (i = 0; i < codeData.length; i++) {
			if (codeData[i].cmnnCd == code) {
				return codeData[i].cmnnCdHanNm;
			}
		}
	};

	/**
	 * 공통 함수 취득 후 Select box 셋팅
	 * @param typeId
	 * @param nodeId
	 * @param grouId
	 */
	_public.drawSelBoxCommonCode = function (typeId, nodeId, grouId) {
		var codeDatas = new Array();

		// 인자3개 - [공통코드그룹] 호출
		if (arguments.length == 3 && grouId != undefined && grouId != '') {
			codeDatas = Main.getCommonCode(typeId, grouId);

			// 인자2개 - [공통코드] 호출
		} else {
			codeDatas = Main.getCommonCode(typeId);
		}

		if (codeDatas.length < 1) {
			message.alert('COM106');
			return;
		}

		var strHtml = '';
		for (var i = 0; i < codeDatas.length; i++) {
			strHtml += '<option id="' + codeDatas[i].cmnnCd + '">' + codeDatas[i].cmnnCdHanNm + '</option>';
		}

		strHtml = '<select>' + strHtml + '</select>';
		$('#' + nodeId).html(strHtml);
	};

	/**
	 * 로그아웃 로직
	 */
	_public.logout = function () {
		if (confirm(message.getMsg('COM011'))) {
			location.href = '/common/cc/LogOut.dev';
		}
		return;
	};

	/**
	 * 로그아웃 로직(NEW)
	 */
	_public.logoutNew = function () {
		var appYn = 'N';
		if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
			appYn = 'Y';
		}

		if (confirm('로그아웃 하시겠습니까?')) {
			PageUtil.movePage('/common/cc/LogOut', { appYn: appYn });
		}
		return;
	};

	/**
	 * 모바일앱에서 로그아웃 하기 위한 함수(Confirm창 없이 로그아웃)
	 */
	_public.logoutApp = function () {
		PageUtil.movePage('/common/cc/LogOut', { appYn: 'Y' });
		return;
	};

	/**
	 * 청약단계 진행시 back 버튼 제어
	 * @param msg
	 */
	_public.onDisableBack = function (type) {
		if (location.pathname.indexOf('PA00000S') > -1) {
			$(window)
				.unbind('beforeunload')
				.bind('beforeunload', function () {
					setTimeout(function () {
						setTimeout(function () {
							Main.offLoading();
						}, 100);
					}, 1);
					return '현재 청약단계 진행중 입니다. 지금 나가시면 정보는 저장되지 않습니다.';
				});
		}
	};

	/**
	 * 청약단계 종료 후 back 버튼 이벤트 재실행
	 */
	_public.offDisableBack = function (type) {
		$(window).unbind('beforeunload');
	};

	/**
	 * 기본 로딩창을 생성한다.
	 */
	_public.onLoading = function (id) {
		fnLoading_Show(id);
	};

	/**
	 * 기본 로딩창을 제거한다.
	 */
	_public.offLoading = function (id) {
		fnLoading_Hide(id);
	};

	/**
	 * 전화걸기 함수
	 */
	_public.callDirect = function (num) {
		Main.offDisableBack();

		var dialNum;

		if (num.indexOf('-') > 0) {
			dialNum = util.replaceAll(num, '-', '');
		} else {
			dialNum = num;
		}

		if (dialNum.length == 11 || dialNum.length == 10 || dialNum.length == 8) {
			//alert(dialNum);
			location.href = 'tel:' + dialNum;
		} else {
			message.alert('COM107');
			return;
		}
	};

	/**
	 * PDF 다운로드
	 */
	_public.pdfDownload = function (path, pdfName) {
		Main.offDisableBack();

		var origin = location.origin;
		var filePath = '/commons/slink/';
		var addPath = '';

		if (path == '0') {
			// 보험약관
			addPath = 'insuManual';
		} else if (path == '1') {
			// 상품설명서
			addPath = 'goodsManual';
		} else if (path == '2') {
			// 사업방법서
			addPath = 'busiManual';
		} else if (path == '3') {
			// 신청서류
			addPath = 'myApplyManual';
		} else if (path == '4') {
			// 공시
			addPath = 'managers/disclosure';
		} else if (path == '5') {
			// 공시 관리자 템플릿
			addPath = 'managers/templet';
		} else if (path == '6') {
			// 공지사항 첨부파일
			addPath = 'notifile';
		} else if (path == '61') {
			// 공지사항 첨부파일
			addPath = 'contact/notiImg';
		} else if (path == '7') {
			// 관리자(마음의 소리)
			addPath = 'contact/opin';
		} else if (path == '8') {
			// 개별약관 첨부파일
			addPath = 'etcManual';
		} else if (path == '9') {
			// 홍보자료
			addPath = 'pr';
		} else if (path == '12') {
			// 모바일웹 공지사항 첨부파일
			addPath = 'contact/mw_notiFile';
		} else if (path == '13') {
			// 모바일 청약서, 증권
			addPath = 'pdfForm';
		} else if (path == '530') {
			// 모바일 마이페이지 활동내역조회 발송내역
			addPath = 'umshtm';
		}

		var realName = origin + filePath + addPath + '/' + pdfName;

		if (MXP_PLUGIN.getOSInfo().name.indexOf('IOS') > 0 || MXP_PLUGIN.getOSInfo().name == 'WEB_PC') {
			var param = {
				location: 'url',
				url: realName,
			};
			PageUtil.openPopup(param);
		} else {
			location.href = realName;
		}
	};

	/**
	 * 적용이율 취득 함수
	 * @param typeId
	 * @param grouId
	 */
	_public.getRate = function (flctIratScLrclCd, pbanIratScCd, flctIratScCd) {
		// 기본 - [공통코드] 호출
		var rate = 0;

		var xhr = new XMLHttpRequest();
		var url =
			location.protocol +
			'//' +
			location.host +
			'/common/cc/RetrieveRate.ajax?' +
			'flctIratScLrclCd=' +
			flctIratScLrclCd +
			'&pbanIratScCd=' +
			pbanIratScCd +
			'&flctIratScCd=' +
			flctIratScCd +
			'&tradeKey=' +
			constants.getVal('RETRIEVE');

		xhr.open('POST', url, false);
		xhr.send(null);

		rate = JSON.parse(xhr.responseText);

		if (util.isNull(rate)) {
			return new Array();
		} else {
			return rate.result.outData;
		}
	};

	return _public;
})();

/**
 * 메세지 호출을 위한 함수
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var message = (function () {
	var _public = {};

	/**
	 * Message ID, Arguments 를 전달 받아서 공통 메세지를 리턴해주는 함수
	 * @param msgId
	 * @param args
	 * @returns {String}
	 */
	_public.getMsg = function (msgId, args) {
		// 인자값 validate
		if (arguments.length < 1 || typeof msgId != 'string') {
			message.alert('COM009');
			return;
		}

		var returnMsg = ''; // 리턴 메세지 정의
		if (arguments.length == 1 || util.isNull(args)) {
			// arguments가 존재 하지 않는 경우 : 단순 메세지 출력
			returnMsg = mwMessageDefine.getMsg(msgId);
		} else {
			// arguments가 존재 하는 경우
			var tmpMsg = mwMessageDefine.getMsg(msgId);

			if (typeof args == 'string') {
				//인자값이 하나인 문자열인 경우
				tmpMsg = tmpMsg.replace('[@]', args);
			} else {
				//인자값이 여러개인 배열인 경우 (스크립트에서 예) message.alert('VLD007', ['100','200']) 형식으로 사용한다 )
				for (var i = 0; i < args.length; i++) {
					tmpMsg = tmpMsg.replace('[@]', args[i]);
				}
			}
			returnMsg = tmpMsg;
		}

		return returnMsg;
	};

	/**
	 * Message ID, Arguments 를 전달 받아서 공통 메세지를 alert 하는 함수
	 * @param msgId
	 * @param args
	 */
	_public.alert = function (msgId, args) {
		var msg = message.getMsg(msgId, args);
		if (!util.isNull(msg)) {
			logger.alert(msg);
			return;
		} else {
			return;
		}
	};

	return _public;
})();

/**
 * 로그와 관련된 공통 함수. console.log의 관리를 위하여 반드시 아래 함수를 사용한다.
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var logger = (function () {
	var _public = {};

	_public.logEnabled = function () {
		return config.getEnv('loggerEnable');
	};

	_public.errorEnabled = function () {
		return config.getEnv('errorLoggerEnable');
	};

	/**
	 *  console.log 관리 함수
	 * @param obj
	 */
	_public.log = function (obj) {
		// IE의 경우 console 사용 불가
		if (environment.getBrowserInfo() !== 'IE' && logger.logEnabled()) {
			console.log(obj);
		} else {
		}
	};

	/**
	 *  console.error 관리 함수
	 * @param obj
	 */
	_public.error = function (obj) {
		// IE의 경우 console 사용 불가
		if (environment.getBrowserInfo() !== 'IE' && logger.logEnabled()) {
			console.error(obj);
		} else {
		}
	};

	/**
	 *  console.info 관리 함수
	 * @param obj
	 */
	_public.info = function (obj) {
		// IE의 경우 console 사용 불가
		if (environment.getBrowserInfo() !== 'IE' && logger.logEnabled()) {
			console.info(obj);
		} else {
		}
	};

	/**
	 *  console.warn 관리 함수
	 * @param obj
	 */
	_public.warn = function (obj) {
		// IE의 경우 console 사용 불가
		if (environment.getBrowserInfo() !== 'IE' && logger.logEnabled()) {
			console.warn(obj);
		} else {
		}
	};

	/**
	 *  alert 관리 함수
	 * @param obj
	 */
	_public.alert = function (obj) {
		alert(obj);
	};

	return _public;
})();

/**
 * 페이지전역에서 사용되는 공통함수
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var transaction = (function () {
	var _public = {};
	var _private = {
		GLOBAL_VAR: '',

		/**
		 * 거래를 실행하고 AJAX 거래처리 경우 성공여부에 따른 콜백을 호출해주고 결과를 반환해준다.
		 *
		 * @param tranProp {Object} 거래처리속성
		 * @return {Object} AJAX 거래처리 경우에만 결과가 반환된다.
		 */
		execute: function (tranProp) {
			var makeUrl = tranProp.url + '.ajax';

			// ----------------------------------------------------------------
			// Parameter 전처리 셋팅
			// ----------------------------------------------------------------

			// 1. Trade Key, 현재 요청페이지 병합
			var concatParams = { tradeKey: tranProp.tradeKey, scrnId: window.location.pathname.split('/').pop().split('.')[0] };
			tranProp.params = util.concat(concatParams, typeof tranProp.params === 'object' ? tranProp.params : {});

			// 2. 파라메터에 폼요소들을 합친다.
			if (typeof tranProp.dataForm != 'undefined') {
				tranProp.params = util.concat(tranProp.params, tranProp.dataForm.serializeObject());
			}

			// 3. 거래 AJAX전송 전 출력
			if (logger.logEnabled()) {
				logger.log('mw.core.js in transaction.execute');
				logger.log('tranProp URL[' + tranProp.url + '] params : ' + JSON.stringify(tranProp.params));
			}

			//			//  transaciton 발생할 경우 웹로그 적재
			//			if (typeof webLog != 'undefined') {
			//				webLog.runDsCustomFunc(tranProp.params);
			//			}

			// 4. DATA 형식에 맞도록 수정
			tranProp.params = {
				JSON_DATA: JSON.stringify(tranProp.params, null, 2),
			};

			/******************************************************************
			 * NOTE : data는 json 형태와 key,value 형태 두가지 모두 지원한다.
			 *        주의할 점은 두가지 형태를 섞어서 사용할 수는 없다.
			 * 		  MW에서는 json형태를 권장하고, 사용한다.
			 *        ex) {ver:'1.0', 'loginYn':'Y'} -> 가능
			 *            ver=1.0&loginYn=Y			 -> 가능
			 *            {ver:'1.0'}&loginYn=Y		 -> 불가능
			 ******************************************************************/

			//성공 또는 실패에 대한 결과메시지를 작성하여, 콜백함수를 호출한다.
			var resultMessageFunc = function (recvTranData) {
				if (makeUrl != null && makeUrl.indexOf('FIDOWeb') < 0) {
					Main.onDisableBack();
				}

				// Transaction 이후 iOS 키보드 Hide
				// 2018.05.09 이현민 매니저 요청에 따라 삭제 처리
				//				if(location.pathname.indexOf('MWPE703S1') < 0 && location.pathname.indexOf('MWPE812S1') < 0 && location.pathname.indexOf('MWPE912') < 0
				//				   && location.pathname.indexOf('MWBB100S1') < 0 && location.pathname.indexOf('MWBB101S1') < 0){
				//					document.activeElement.blur();
				//				}

				recvTranData = recvTranData.result;

				// 성공여부 판단
				var isSuccess = false;
				var message = '';

				if (!util.isNull(recvTranData.outData)) {
					if (util.isNull(recvTranData.outData.ERROR_CODE)) {
						isSuccess = true;
					}
				}

				logger.log('[LOG] START [[ recvTranData ]] ===>');
				logger.log(recvTranData);
				logger.log('[LOG] END   [[ recvTranData ]] ===>');

				if (isSuccess) {
					if (tranProp.success) {
						tranProp.success(recvTranData, message);
					}
				} else {
					message = recvTranData.outData.ERROR_MSG;

					if (tranProp.failure) {
						// Failure Callback 이 지정된 경우

						// Error 관련 정의된 코드/메세지 전달
						tranProp.failure(recvTranData, message);
					} else {
						// Failure Callback 이 지정되지 않은 경우

						logger.alert(message);
					}
				}
			};

			// 4. 거래 시작
			var resData = jQuery.ajax({
				type: tranProp.method,
				url: makeUrl,
				data: tranProp.params,
				dataType: 'text',
				async: tranProp.asyncFlag,
				success: function (data, resStatus) {
					if (tranProp.blockingFlag) {
						Main.offLoading(tranProp.blockingId);
						globalVar.setParam('nowTransaction', true);
					}
					Main.offDisableBack();

					var resultData = '';
					try {
						try {
							resultData = JSON.parse(data);
						} catch (jsonError) {
							throw {
								name: 'JsonError',
								message: '데이터 파싱을 실패하였습니다.',
								cause: jsonError,
							};
						}
					} catch (tError) {
						//응답 형식이 올바르지 않습니다
						resultData = JSON.parse(
							'{"ERROR_CODE":"9999","prcSts":"F","ERROR_MSG":"' + tError.name + ' : ' + tError.message + '"}'
						);

						if (logger.errorEnabled()) {
							logger.error('basic.js in transaction.execute');
							logger.error(tError);
							logger.error(resultData);
						}
					}

					resultMessageFunc(resultData);
				},
				error: function (xhr, resStatus, err) {
					Main.offLoading(tranProp.blockingId);
					Main.offDisableBack();
					globalVar.setParam('nowTransaction', true);

					xhr.abort();

					var recvTranData = JSON.parse(
						'{"ERROR_CODE":"' + resStatus + '",' + '"ERROR_MSG":"서버와의 통신이 원활하지 않습니다."}'
					);

					if (recvTranData.ERROR_CODE == 404) {
						recvTranData.ERROR_MSG = '서버에서 페이지를 찾을 수 없습니다.';
						recvTranData.ERROR_MSG += '\nURL이 올바른 확인하십시오!';
					} else {
						if (recvTranData.ERROR_CODE == 500) {
							recvTranData.ERROR_MSG = '네트워크 통신이 원활하지 않습니다.';
						} else {
							recvTranData.ERROR_MSG += '\n' + '9999';
						}

						recvTranData.ERROR_MSG += '\n' + '지속적인 문제발생시 시스템 관리자에게 문의하시기 바랍니다. ';
					}

					var returnObj = {
						result: {
							outData: recvTranData,
						},
					};

					/**
					 * TODO: 404, 500 에러등에 대해서 처리 여부 결정 필요
					 * 		 현재는 alert으로 처리.
					 */
					resultMessageFunc(returnObj);
				},
			});
		},

		/**
		 * 거래 처리가 성공할 경우 호출되어 지는 함수이다.
		 *
		 * @param recvTranData {Object} 응답거래 데이터
		 */
		recvTranForSuccess: function (recvTranData) {},

		/**
		 * 거래 처리가 성공할 경우 호출되어 지는 함수이다.
		 *
		 * @param recvTranData {Object} 응답거래 데이터
		 */
		recvTranForFailure: function (recvTranData) {},
	};

	/**
	 * 거래공통 기본 오브젝트이다.
	 *
	 * [선택] 거래방식 		 - ajaxFlag : true,
	 * [선택] 화면잠금여부 	 - blockingFlag : true or false,
	 * [필수] 거래주소 		 - url : undefined,
	 * [필수] 거래식별자	 - tradeKey : undefined,
	 * [선택] 비동기여부 	 - asyncFlag : true,
	 * [선택] 데이터파라메터 - params : '',
	 * [선택] 데이터폼 		 - dataForm : undefined,
	 * [선택] 성공처리콜백 	 - success : _private.recvTranForSuccess,
	 * [선택] 실패처리콜백 	 - failure : _private.recvTranForFailure
	 */
	_public.TRAN_COMM_PROP = {
		method: 'POST',
		ajaxFlag: true,
		blockingFlag: true,
		url: undefined,
		tradeKey: undefined,
		asyncFlag: true,
		params: '',
		dataForm: undefined,
		success: _private.recvTranForSuccess,
		failure: _private.recvTranForFailure,
		blockingId: undefined,
	};

	_public.callTran = function (tranProp) {
		try {
			//화면이 잠겨있지 않으면 화면을 잠근다.
			if (tranProp.blockingFlag) {
				var scrnId = window.location.href.split('/').splice(-1)[0].split('?')[0].split('.')[0]; // 화면 ID

				// 상품설계페이지를 처음으로 load할 때, Main.onLoading() 실행을 제어하기 위한 처리
				if (new RegExp(/^PG[0-9]{2}100S$/).test(scrnId)) {
					if (isFirstLoad !== undefined) {
						// 첫 load가 아니면 Main.onLoading() 실행
						if (!isFirstLoad) {
							Main.onLoading(tranProp.blockingId);
							globalVar.setParam('nowTransaction', false);
						}

						// 첫 load 단계 중, 마지막 ajax call인 facade02가 실행될 때 isFirstLoad를 true->false로 변경한다.
						// 연금저축, 연금, 어린이저축, 어린이보장의 ajax call은 facade02를 tradeKey로 가지지 않기 때문에,
						// 각 페이지별 js에서 전역변수 isFirstLoad를 변경한다.
						if (isFirstLoad && tranProp.tradeKey === 'facade02') {
							isFirstLoad = false;
						}
					}
				} else {
					Main.onLoading(tranProp.blockingId);
					globalVar.setParam('nowTransaction', false);
				}
			}

			//비동기 거래처리을 요청한다.
			return _private.execute(tranProp);
		} catch (e) {
			// alert(e);
			(function (causeErr) {
				var thrown = {
					name: 'TransactionError',
					message: '거래 처리를 실패하였습니다.',
					cause: causeErr,
				};

				if (logger.errorEnabled()) {
					logger.error('basic.js in transaction.callTran');
					logger.error(JSON.stringify(thrown));
				}

				throw thrown;
			})(e);
		}
	};

	_public.addReqTime = function (url) {
		// IOS에서 동일한 url request에 대해 캐싱을 하기에 url_time stamp를 이용하여 캐싱이 안되도록 방지.
		if (url.indexOf('jsp') < 0) {
			url = url + '&url_time=' + new Date().getTime() + '';
		} else {
			if (url.indexOf('.jsp?') < 0) {
				url = url + '?url_time=' + new Date().getTime() + '';
			} else {
				url = url + '&url_time=' + new Date().getTime() + '';
			}
		}
		return url;
	};

	return _public;
})();

/**
 * Picker 관련 Wrapper 함수.
 * KDIMW는 Mobiscroll의 Picker를 기본적으로 사용하며, 다양한 옵션 적용을 편리하게
 * 하도록 하기 위하여 수정 하였다.
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var Picker = (function () {
	var _public = {};

	/**
	 * Array를 Picker.select 에 맞도록 수정한다.
	 *
	 * @param inputArr
	 * @param key
	 * @param value
	 * @returns {Array}
	 */
	_public.makeTVArray = function (inputArr, key, value) {
		var returnArray = [];

		for (var i = 0; i < inputArr.length; i++) {
			var tempObj = {};
			tempObj.text = inputArr[i][key];
			tempObj.value = inputArr[i][value];

			returnArray.push(tempObj);
		}

		return returnArray;
	};

	/**
	 * MobiScroll을 사용한 select Picker.
	 * 선언된 DIV영역에 SELECT 박스를 자동 생성한 후 Picker 이벤트를 바인딩 한다.
	 *
	 * [Option Attribute]
	 * id 		: 셋팅 될 ID
	 * title 	: picker 타이틀
	 * data 	: 그려질 Data (Array)
	 *			  예제) [{text: '010',value: '1'},{text: '011',value: '2'}]
	 *
	 * onChange : chage시 작동할 function
	 * onSelect : select시 작동할 function
	 */
	_public.select = function (option) {
		if (util.chkReturn(option.id, 's') == '') {
			// ID가 입력되지 않았습니다.
			return;
		}
		if (util.chkReturn(option.title, 's') == '') {
			// 타이틀이 입력되지 않았습니다.
			return;
		}
		if (util.chkReturn(option.data, 's') == '') {
			// 데이터가 올바르지 않습니다.
			return;
		}

		$('#' + option.id)
			.mobiscroll()
			.select({
				// *** 고정영역 *** Start
				theme: 'ios',
				display: 'bottom',
				mode: 'scroller',
				inputClass: 'mobipick ' + option.inputClass,
				animate: 'slideup',
				cancelText: '취소',
				setText: '확인',
				focusOnClose: false,
				// *** 고정영역 *** END

				// *** 가변영역 *** Start
				headerText: option.title,
				//Init Data
				data: option.data,

				//Call onChange function
				onChange: function (valueText, inst) {
					// logger.log(inst.getVal()); //selected value
					// logger.log(valueText); //selected text

					if (!util.chkReturn(option.onChange, 's') == '') {
						option.onChange(valueText, inst);
					}
				},
				//Call onSelect function
				onSelect: function (valueText, inst) {
					// logger.log(inst.getVal()); //selected value
					// logger.log(valueText); //selected text

					if (!util.chkReturn(option.onSelect, 's') == '') {
						option.onSelect(valueText, inst);
					}
				},
				// *** 가변영역 *** End
			});

		// inputbox에 title을 추가한다 label을 만들수없음
		if ($('#' + option.id + '_dummy').length > 0) {
			$('#' + option.id + '_dummy').attr('title', option.title);
		}

		// inputbox에 readonly를 추가한다.
		if (util.isNull($('#' + option.id).attr('readonly'))) {
			$('#' + option.id).attr('readonly', 'readonly');
		}
	};

	/**
	 * Picker.select로 선언된 Select Picker의 값을 취득하는 함수.
	 *
	 * @param id
	 * @returns
	 */
	_public.getVal = function (id) {
		return $('#' + id).mobiscroll('getVal');
	};

	/**
	 * MobiScroll을 사용한 Multi Select Picker.
	 * 선언된 DIV영역에 SELECT 박스를 자동 생성한 후 Picker 이벤트를 바인딩 한다.
	 *
	 * [Option Attribute]
	 * id 		: 셋팅 될 ID
	 * title 	: picker 타이틀
	 * data 	: 그려질 Data (Array)
	 *			  예제) [{text: '010',value: '1'},{text: '011',value: '2'}]
	 * formatter : 각 값들이 format 될 데이터
	 */
	_public.multiSelect = function (option) {
		if (util.chkReturn(option.placeholder, 's') == '') {
			option.placeholder = '선택';
		}

		$('#' + option.id).mobiscroll({
			theme: 'ios',
			display: 'bottom',
			mode: 'scroller',
			animate: 'slideup',
			showLabel: true,
			headerText: option.title,
			wheels: option.data,
			placeholder: option.placeholder,
			onSelect: function (valueText, inst) {
				var values = inst.getArrayVal();
				if (values.length != option.formatter.length) {
					return;
				}

				var formatted = '';
				for (var i = 0; i < values.length; i++) {
					var key = inst.settings.wheels[0][i].keys;
					var value = inst.settings.wheels[0][i].values;

					if (value[key.indexOf(values[i])] != '0') {
						formatted += value[key.indexOf(values[i])] + option.formatter[i] + ' ';
					}
				}

				if (formatted.length == 0) formatted = option.placeholder;

				$(this).val(formatted);
			},
			formatResult: function (values) {
				var formatted = '';
				for (var i = 0; i < values.length; i++) {
					var key = option.data[0][i].keys;
					var value = option.data[0][i].values;

					if (value[key.indexOf(values[i])] != '0') {
						formatted += value[key.indexOf(values[i])] + option.formatter[i] + ' ';
					}
				}

				if (formatted.length == 0) formatted = option.placeholder;

				return formatted;
			},
		});

		// inputbox에 title을 추가한다 label을 만들수없음
		if ($('#' + option.id).length > 0) {
			$('#' + option.id).attr('title', option.title);
		}
	};

	/**
	 * Picker.select로 선언된 Select Picker의 값을 취득하는 함수.
	 *
	 * @param id
	 * @returns
	 */
	_public.getArrayVal = function (id) {
		return $('#' + id).mobiscroll('getArrayVal');
	};

	/**
	 * MobiScroll을 사용한 Date Picker.
	 * 선언된 Input Field에 날짜 선택과 관련된 Picker를 제공 한다. 아래 선언된
	 * 옵션을 사용하여 Picker를 생성한다.
	 *
	 * Option Attribute
	 *
	 * id 		: 셋팅 될 ID
	 * title 	: picker 타이틀
	 * date 	: 셋팅될 Date (ex] 2010122)
	 * foramt 	: 날짜 선택 후 input field에 셋팅될 포맷 (yyyy년 mm월 dd일)
	 * startYear : picker 시작년도 (기본:2000년)
	 * endYear  : picker 마지막년도 (기본:현재+3년)
	 * defaultVal : option.date로 전달한 값을 기본 선택 값으로 선언 할지 여부 (기본: false)
	 */
	_public.date = function (option) {
		var now = new Date();

		if (util.chkReturn(option.id, 's') == '') {
			// ID가 입력되지 않았습니다.
			return;
		}
		if (util.chkReturn(option.title, 's') == '') {
			// 타이틀이 입력되지 않았습니다.
			return;
		}
		if (util.chkReturn(option.format, 's') == '') {
			// 형태가 입력되지 않았습니다.
			return;
		}
		if (util.chkReturn(option.date, 's') == '' || !util.isDate(option.date)) {
			option.date = util.getDate();
		}
		if (util.chkReturn(option.startYear, 's') == '') {
			option.startYear = '2000';
		}
		if (util.chkReturn(option.endYear, 's') == '') {
			option.endYear = now.getFullYear() + 3;
		}

		if (util.chkReturn(option.dateOrder, 's') == '') {
			option.dateOrder = 'yymmdd';
		}

		$('#' + option.id)
			.mobiscroll()
			.date({
				theme: 'ios',
				display: 'modal',
				mode: 'scroller',
				animate: 'slideup',
				showLabel: true,
				inputClass: 'birth mobipick',
				endMonth: now.getMonth(),
				endDate: now.getDate(),
				rtl: true,

				startYear: option.startYear,
				endYear: option.endYear,
				dateOrder: option.dateOrder,
				headerText: option.title,
				dateFormat: option.format,
			});

		var year = option.date.substr(0, 4);
		var month = option.date.substr(4, 2);
		var day = option.date.substr(6, 2);

		//Date set
		$('#' + option.id).mobiscroll('setDate', new Date(year, month - 1, day));

		// inputbox에 readonly를 추가한다.
		if (util.isNull($('#' + option.id).attr('readonly'))) {
			$('#' + option.id).attr('readonly', 'readonly');
		}

		// option.date로 선택한 값을 기본값으로 선택
		if (option.defaultVal == true) {
			_public.setVal('date', option.id, _public.getDate(option.id, 'yyyymmdd', true));
		}
	};

	/**
	 * MobiScroll을 사용한 Calendar.
	 * 선언된 Input Field에 날짜 선택과 관련된 Calendar를 제공 한다. 아래 선언된
	 * 옵션을 사용하여 Calendar를 생성한다.
	 *
	 * Option Attribute
	 *
	 * id 		: 셋팅 될 ID
	 * date 	: 셋팅될 Date (ex] 2010122) (기본: 오늘)
	 * foramt 	: 날짜 선택 후 input field에 셋팅될 포맷 (yyyy년 mm월 dd일)
	 * defaultVal : option.date로 전달한 값을 기본 선택 값으로 선언 할지 여부 (기본: false)
	 */
	_public.calendar = function (option) {
		if (util.chkReturn(option.id, 's') == '') {
			// ID가 입력되지 않았습니다.
			return;
		}

		if (util.chkReturn(option.date, 's') == '' || !util.isDate(option.date)) {
			option.date = util.getDate();
		}

		$('#' + option.id)
			.mobiscroll()
			.calendar({
				theme: 'mobiscroll',
				display: 'modal',
				animate: 'slideup',
				controls: ['calendar'],
				swipeDirection: 'vertical',
				dateOrder: 'ddmmyy',
				dateFormat: option.format,
				minDate: option.minDate,
				maxDate: option.maxDate,
				onSetDate: option.onSetDate,
				onClose: option.onClose,
			});

		var year = option.date.substr(0, 4);
		var month = option.date.substr(4, 2);
		var day = option.date.substr(6, 2);

		//Date set
		$('#' + option.id).mobiscroll('setDate', new Date(year, month - 1, day));

		// inputbox에 readonly를 추가한다.
		if (util.isNull($('#' + option.id).attr('readonly'))) {
			$('#' + option.id).attr('readonly', 'readonly');
		}

		// 달력버튼 생성
		var calendarButtonTag = '<button type="button" id="' + option.id + '_button" class="icon50 icon_calendar">달력</button>';
		$('#' + option.id).after(calendarButtonTag);

		// 생성된 버튼의 터치 이벤트 삽입
		$('#' + option.id + '_button').on('tap, mousedown', function (e) {
			$('#' + option.id).mobiscroll('show');
		});

		// option.date로 선택한 값을 기본값으로 선택
		if (option.defaultVal == true) {
			_public.setVal('date', option.id, _public.getDate(option.id, 'yyyymmdd', true));
		}
	};

	/**
	 * Picker.date, Picker.calendar 로 셋팅된 값을 취득하는 함수
	 * format args는 yyyy,mm,dd를 자유롭게 조합하여 사용 가능 하다.

	 * @param id
	 * @param format
	 * @returns {String}
	 */
	_public.getDate = function (id, format, esc) {
		var returnDate = '';

		// 입력이 되지 않은 경우 빈 string 반환
		if ($('#' + id).val() == '' && !esc) {
			return returnDate;
		}

		if (format.indexOf('yyyy') > -1) {
			returnDate += new Date($('#' + id).mobiscroll('getVal')).getFullYear();
		} else if (format.indexOf('yy') > -1) {
			returnDate += new Date($('#' + id).mobiscroll('getVal')).getFullYear();
		}

		if (format.indexOf('mm') > -1) {
			var getMonth = new Date($('#' + id).mobiscroll('getVal')).getMonth() + 1;
			if (String(getMonth).length == 1) {
				getMonth = '0' + getMonth;
			}

			returnDate += getMonth;
		}

		if (format.indexOf('dd') > -1) {
			var getDate = new Date($('#' + id).mobiscroll('getVal')).getDate();
			if (String(getDate).length == 1) {
				getDate = '0' + getDate;
			}

			returnDate += getDate;
		}

		return returnDate;
	};

	/**
	 * mobiscroll 을 사용하여 생성된 select 의 enable
	 * @param id
	 */
	_public.enable = function (id) {
		$('#' + id).mobiscroll('enable');
	};

	/**
	 * mobiscroll 을 사용하여 생성된 select 의 disable
	 * @param id
	 */
	_public.disable = function (id) {
		$('#' + id).mobiscroll('disable');
	};

	/**
	 * mobiscroll 을 사용하여 생성된 Picker의 값을 Setting  한다.
	 *
	 * type : select / date / calendar
	 *
	 * @param type
	 * @param id
	 * @param value
	 */
	_public.setVal = function (type, id, value) {
		if (type == 'select') {
			$('#' + id).mobiscroll('setVal', value, true);
		} else if (type == 'date' || type == 'calendar') {
			var year = value.substr(0, 4);
			var month = value.substr(4, 2);
			var day = value.substr(6, 2);
			var nowDate = new Date(year, month - 1, day);

			$('#' + id).mobiscroll('setVal', nowDate, true);
		}
	};

	return _public;
})();

/**
 * Footer 관련 함수
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var footerCore = (function () {
	var _public = {};

	/**
	 * 페이지 호출
	 * @param _this
	 */
	_public.callPage = function (_this) {
		var _pageId = $(_this).attr('id');
		var pageIdDivNum = _pageId.indexOf('_');
		if (pageIdDivNum > -1) {
			_pageId = _pageId.substring(0, pageIdDivNum);
		}
		var path = '/common/ce/' + _pageId;
		var paramObj = {};
		PageUtil.movePage(path, paramObj);
	};

	/**
	 * 팝업 오픈
	 */
	_public.openPage = function (_this) {
		var _pageId = $(_this).attr('id');

		var pageIdDivNum = _pageId.indexOf('_');
		if (pageIdDivNum > -1) {
			_pageId = _pageId.substring(0, pageIdDivNum);
		}

		var moveUrl = '';

		var urlOne = 'https://hpt.lifeplanet.co.kr/disclosure/good/HPDA01S0.dev';
		var urlTwo = 'https://hpt.lifeplanet.co.kr/disclosure/sfgr/HPDD21S0.dev';
		var cur_url = location.href;
		if (cur_url.match('m.lifeplanet.co.kr') == 'm.lifeplanet.co.kr') {
			urlOne = 'https://www.lifeplanet.co.kr/disclosure/good/HPDA01S0.dev';
			urlTwo = 'https://www.lifeplanet.co.kr/disclosure/sfgr/HPDD21S0.dev';
		}

		if (_pageId == 'HPDA01S0') {
			// 상품공시실
			moveUrl = urlOne;
		} else if (_pageId == 'HPDD21S0') {
			// 보호금융상품등록부
			moveUrl = urlTwo;
		}

		var option = {
			location: 'url',
			url: moveUrl,
		};

		PageUtil.openPopup(option);
	};

	return _public;
})();

/**
 * 청약 header 관련 함수
 *
 * @author	조정훈, 513176@lifeplanet.co.kr
 */
var paHeaderCore = (function () {
	var _public = {};

	/**
	 *
	 * @param envName
	 * @returns
	 */
	_public.callPage = function (_this) {
		var _pageId = _this;

		if (typeof _pageId == 'object') {
			_pageId = $(_this).attr('id');
		} else {
			_pageId = _this;
		}

		if (_pageId == 'BACK' || _pageId == 'multi') {
			var spb_data = new Object();
			var backUrl = '';
			var insSbsn = globalVar.getParam('spb_data').spb_insSbsnGoodSmclCd;
			var spb_goodCd = globalVar.getParam('spb_data').spb_goodCd;

			if (spb_goodCd != null && spb_goodCd.length > 5) {
				spb_gvRrsnGoodCd = spb_goodCd.substring(0, 5);
			}

			if (_pageId == 'multi' || globalVar.getParam('spb_data_arr').length > 1) {
				if (MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
					backUrl = '/common/cm/CM01000S';
				} else {
					backUrl = '/common/cm/CM01000S';
				}

				//    			if(globalVar.getParam('spb_data').spb_plnCursScCd != undefined && globalVar.getParam('spb_data').spb_plnCursScCd=="02"){
				//    				backUrl	= '/products/pm/MWPM100S1';
				//				}else{
				//					backUrl	= '/products/pc/MWPC600S1';
				//				}
			}
			// 정기보험
			else if (insSbsn == '11') {
				backUrl = '/products/pg/PG01000S';
				if (spb_gvRrsnGoodCd == '10023') {
					backUrl = '/products/pg/PG23000S';
				}

				// 종신보험
			} else if (insSbsn == '12') {
				backUrl = '/products/pg/PG02000S';

				// 연금보험
			} else if (insSbsn == '21') {
				if (MWPA010S1.b2bMetro) {
					backUrl = '/bridge/bb/MWBB010S1';
				} else {
					backUrl = '/products/pg/PG03000S';
				}

				// 연금저축보험
			} else if (insSbsn == '31') {
				backUrl = '/products/pg/PG04000S';

				// 플러스어린이보험
			} else if (insSbsn == '42') {
				backUrl = '/products/pg/PG07000S';

				// 에듀케어저축보험
			} else if (insSbsn == '32') {
				backUrl = '/products/pg/PG08000S';

				// 꿈꾸는e저축보험
			} else if (insSbsn == '33') {
				backUrl = '/products/pg/PG25000S';

				//암
			} else if (insSbsn == '43') {
				backUrl = '/products/pg/PG11000S';

				if (MWPA010S1.kyoboInsuOnline) {
					if (MWPA010S1.kyoboInsuType == 's') {
						backUrl = '/bridge/bl/MWBL110S1';
					} else if (MWPA010S1.kyoboInsuType == 'b') {
						backUrl = '/bridge/bl/MWBL111S1';
					} else if (MWPA010S1.kyoboInsuType == 'sk') {
						backUrl = '/bridge/bl/MWBL114S1';
					} else if (MWPA010S1.kyoboInsuType == 't') {
						backUrl = '/bridge/bl/MWBL113S1';
					} else if (MWPA010S1.kyoboInsuType == 'c') {
						backUrl = '/bridge/bl/MWBL116S1';
					} else if (MWPA010S1.kyoboInsuType == 'lg') {
						backUrl = '/bridge/bl/MWBL117S1';
					} else if (MWPA010S1.kyoboInsuType == 'w') {
						backUrl = '/bridge/bl/MWBL119S1';
					} else if (MWPA010S1.kyoboInsuType == 'm') {
						backUrl = '/bridge/bl/MWBL410S1';
					} else if (MWPA010S1.kyoboInsuType == 'tb') {
						backUrl = '/bridge/bl/MWBL420S1';
					}

					if (globalVar.getParam('spb_data_arr')[0] != undefined) {
						var authKey = globalVar.getParam('spb_data_arr')[0].authKey;
						var cpnNo = globalVar.getParam('spb_data_arr')[0].cpnNo;
						var evntIsunoScCd = globalVar.getParam('spb_data_arr')[0].evntIsunoScCd;
						var evntIsuno = globalVar.getParam('spb_data_arr')[0].evntIsuno;

						if (authKey == undefined && cpnNo == undefined) {
							if (evntIsunoScCd != undefined) {
								if (evntIsunoScCd == '04') {
									authKey = evntIsuno;
								} else if (evntIsunoScCd == '02') {
									cpnNo = evntIsuno;
								}
							}
						}

						if (authKey != undefined) {
							spb_data['authKey'] = authKey;
						} else if (cpnNo != undefined) {
							spb_data['cpnNo'] = cpnNo;
						}
					}
				}

				//5대성인병
			} else if (insSbsn == '44') {
				backUrl = '/products/pg/PG12000S';

				//직토
			} else if (insSbsn == '61' && MWPA010S1.mTrfAccidentType == 'zikto') {
				backUrl = '/products/pe/MWPE310S1';
				//교보증권 교통상해
			} else if (insSbsn == '61' && MWPA010S1.mTrfAccidentType == 'kyoboS') {
				backUrl = '/products/pe/MWPE410S1';
				//이지웰 교통상해
			} else if (insSbsn == '61' && MWPA010S1.mTrfAccidentType == 'ezwel') {
				backUrl = '/products/pe/MWPE420S1';
				// 굿초보 교통상해
			} else if (insSbsn == '61' && MWPA010S1.mTrfAccidentType == 'goodchobo') {
				backUrl = '/products/pe/MWPE710S1';
				// 캐시워크 교통상해
			} else if (insSbsn == '61' && MWPA010S1.mTrfAccidentType == 'cashwork') {
				backUrl = '/products/pe/MWPE740S1';
			} else if (insSbsn == '61' && MWPA010S1.eAccident) {
				backUrl = '/products/pg/PG17000S';
				//교보m상해
			} else if (insSbsn == '61' && MWPA010S1.mAccKyobo) {
				backUrl = '/products/pe/MWPE330S1';
			} else if (insSbsn == '61' && MWPA010S1.mAccKNavi) {
				backUrl = '/products/pe/MWPE320S1';
				//입원
			} else if (insSbsn == '71') {
				backUrl = '/products/pg/PG28000S';

				if (MWPA010S1.kyoboInsuOnline) {
					if (MWPA010S1.kyoboInsuType == 'gc2') {
						backUrl = '/bridge/bb/MWBB100S1';
					}
				}

				//수술
			} else if (insSbsn == '81') {
				backUrl = '/products/pg/PG29000S';

				if (MWPA010S1.kyoboInsuOnline) {
					if (MWPA010S1.kyoboInsuType == 'gc2') {
						backUrl = '/bridge/bb/MWBB101S1';
					}
				}
			} else {
				return;
			}

			globalVar.getParam('spb_data').spb_insConno = '';
			spb_data['spb_data'] = globalVar.getParam('spb_data');

			PageUtil.movePage(backUrl, spb_data);
		} else {
			if (globalVar.getParam('spb_data').spb_nwcReiScCd == '02') {
				return;
			}

			var option = {
				id: 'popupwrap',
				location: 'external',
				content: 'content1',
				url: '/products/pa/' + _pageId + '.dev',
				pageParam: '',
			};
			PageUtil.openPopup(option);
		}
	};

	return _public;
})();
