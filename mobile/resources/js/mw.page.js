/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * DESCRIPTION : Page 관련 함수 집합
 * ============================================================================*/

/**
 * 페이지 유틸 집합
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var PageUtil = (function() {
	var _public = {};
	var _private = {};
	// 채팅상담 중복 팝업 체크를 위한 변수 선언
	var talkPop = null;

	/**
	 * 페이지를 동적으로 호출하는 함수 (jQuery.load 사용)
	 * @param path
	 * @param param
	 */
	_public.loadPage = function(path, param, loadPageId) {

		Main.offDisableBack();

		Main.onLoading();

		if (typeof path !== 'string' || path == null) {
			message.alert('COM108');
			Main.offLoading();
			return;
		}

		if (typeof param !== 'object' || param == null) {
			message.alert('COM109');
			Main.offLoading();
			return;
		} else {
			// JSON_DATA 변경 형식에 맞춰서 형태 변환
			param = {
				JSON_DATA : JSON.stringify(param, null, 2)
			};
		}

		 if ( path.indexOf('MWIC') > -1 ) {
	            loadPageId = 'loadPageArea_inno';
	     }


		// 페이지 ID는 기본값으로 loadPageArea 을 가진다
		if (util.isNull(loadPageId)) {
			loadPageId = 'loadPageArea';
		}

		var pathArr = path.split('/');
		var jsPath = '';
		for ( var i = 1; i < pathArr.length; i++) {

			if (i == pathArr.length-1) {
				jsPath += '/js/'+pathArr[i];
			} else {
				jsPath += '/'+pathArr[i];
			}

		}

		var pagePath = path + '.dev';
		jsPath = '/views' + jsPath + '.js';

		$('#' + loadPageId).load(pagePath, param, function(response, status, xhr) {

			// 에러 여부를 판단하여 에러 페이지로 이동
			if (!PageUtil.checkErrorPage()) {
				// 에러 페이지로 이동
				return;
			}

			if (status == 'success') {
				/************************************************************************
				 * 페이지에 로딩하고 있는 스크립트들을 모두 추려내서 여기서 로딩
				 ************************************************************************/
				try{

					logger.log('page loaded complete');

					globalVar.setParam('outData', param);
					// 로딩된 페이지의 페이지 init Function
					PageUtil.loadJavascript(jsPath, param);

				}catch(e) {
					logger.error(e);
				}

			} else {
				/**
				 * 페이지 이동 실패시 에러처리
				 */
				message.alert('COM110');

				return;
			}
		});

	};

	/**
	 * 페이지별로 구성되어 있는 js를 동적으로 로딩
	 * @param url
	 * @param param
	 */
	_public.loadJavascript = function (url, param, popupId) {
		/* 중복 호출 방지 제거
		var _url = url.split('/');
		_url = _url[_url.length-1].replace('.js', '');
		// 중복 호출 방지

		if(typeof window[_url] == 'object'){
			logger.log('[중복호출] ' + _url + ' 은 이미 호출되어 있습니다.');
			return;
		}
		*/
		$.ajaxSetup({cache:false});

		logger.log('loadJavascript start! : ' + url);

		$.get(url, function(data) {
		}).success(function(data) {

			logger.log('loaded success!');

			jQueryLoader.load(url, function() {

				logger.log('load Complete!');

				// 페이지 전역에서 사용되는 init 함수 이전 호출
				PageUtil.prePageFunction(param, popupId, url);

			});

		}).error(function(data) {

			logger.error('Javascript ' + data.statusText);

		}).complete(function(xhr, textStatus) {
			logger.log('loaded complete');
		});
		logger.log('loadJavascript end!');

		// 화면이 랜더링 된 이후에 js를 동적으로 추가 해 준다.
		var jQueryLoader = {
			_startupJob : null,

			load : function(_url, startupFunc) {

				_startupJob = startupFunc;

					var fileref = document.createElement('script');
					var js = _url+"?v="+cacheJS;
					fileref.setAttribute('type', 'text/javascript');
					fileref.setAttribute('src', js)
					fileref.onload = _startupJob;
					document.getElementsByTagName('head')[0].appendChild(fileref);

					if (navigator.userAgent.toUpperCase().indexOf('MSIE') > -1) {
						this.waitForJQueryLoad();
					}
			},
			waitForJQueryLoad : function() {
				setTimeout(function() {
					if ( ! jQueryLoadChecker()) {
						jQueryLoader.waitForJQueryLoad();
					} else {
						_startupJob();
					}
				}, 100);
			},
			jQueryLoadChecker : function() {
				try{
					// var win = $(window);
					return true;
				}catch(e) {
					return false;
				}
			}
		};

	};
	
	/*
	 * 모바일앱 로그인후 locationUrl(로그인후 이동되는 페이지) 및 parameters 생성
	 * @param url : 이동되는 url
	 * @param pararms
	 * @return JSON Object 
	 *   
	 */
	_private.parseUseAppQuerys = function(url, params) {
		var outData = {};
		if(url.indexOf('/ca/CA01000S') == -1 				// 로그인페이지 
				&& url.indexOf('/cc/MWCC010S1') == -1		// 구로그인 페이지 
				&& url.indexOf('/cc/MWMC000S1') == -1		// 마이페이지 서브메인 
				) {
			var urlparts = url.split('?'); 
			outData.locationUrl = urlparts[0];
		}
		
		url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
			outData[key] = value;
		});
		if(params != undefined) { 	
			outData = $.extend(outData, params);
		}
		return outData;
	};

	/**
	 * @param strUrl
	 * @param objParam
	 * @param strTarget
	 */
	_public.movePage = function(strUrl, objParam, strTarget) {
		
		//페이지이동시 마크업에 정의된 Data Story 데이터 적재 
		if(typeof webLog != "undefined"  ) {	
			webLog.runDsInputFunc(objParam);
		}
		
		/*
		 * Native앱 방식 로그인 모바일앱에서 비로그인 상태에서 마이페이지 진입하는 경우 Native 로그인 화면 실행
		 *   
		 */		
		if(window.isKDIMWLogin != true 				
			 && (strUrl.indexOf('/mypage/') > -1 
				|| strUrl.indexOf('/ca/CA01000S') > -1 		// 로그인페이지 
				|| strUrl.indexOf('/cc/MWCC010S1') > -1		// 구로그인 페이지 
				|| strUrl.indexOf('/cc/MWMC000S1') > -1		// 마이페이지 서브메인
				|| strUrl.indexOf('/iy/MWIY100S1') > -1		// 씨드포인트 조회 
				)
		) { 
			if(MXP_PLUGIN.NativeApp.isNativeApp()) {
				if($('#gnb').hasClass('open') == true) {
					$(".btn_gnb_close").trigger("click");
				}
				if (MXP_PLUGIN.isAndroid()) {	// [20200731]iOS도 다음버전인경우에 안드로이드 처럼 데이터 parse를 web에서 하도록 변경 
					objParam = _private.parseUseAppQuerys(strUrl,objParam);
					MXP_PLUGIN.NativeApp.presentNative(objParam);
				} else {
					if(device.appVersion > '4.4.0') {
						objParam = _private.parseUseAppQuerys(strUrl,objParam);
						MXP_PLUGIN.NativeApp.presentNative(objParam);
					} else {
						MXP_PLUGIN.NativeApp.presentNative(strUrl, objParam);
					}
				}
				return;
			}
		}
		/**
		 * 모바일앱인경우 로그인 되어 있는경우에는 아래 Native화면일경우 Native로 이동되도록 
		 * 마이페이지 서브메인, 보유계약조회 
		 */
		if(window.isKDIMWLogin == true && 
			(strUrl.indexOf('/MWMC000S1') > -1
			|| strUrl.indexOf('/MWMS100S1') > -1
			)
		) {
			if(MXP_PLUGIN.NativeApp.isNativeApp()) 
			{
				if(MXP_PLUGIN.isIOS()) {
					if(device.appVersion > '4.4.0') {
						MXP_PLUGIN.NativeApp.presentNativeDirect(strUrl, objParam);
						if($('#gnb').hasClass('open') == true) {
							$(".btn_gnb_close").trigger("click");
						}
						return;
					}
				}
			}
		}
		
		Main.offDisableBack();
	 
		// url 이 null 일 경우 준비중으로 표현
		if(strUrl == null) {
			message.alert('COM013');

			return;
		}

		// 앱인 경우 앱용 메인 페이지로 이동한다.
		if (strUrl.indexOf('MWCE010S1') > -1 && MXP_PLUGIN.getOSInfo().name.indexOf('APP') > -1) {
			strUrl = '/common/ce/MWCE050S1';
		}
		


		// 0. 로딩 생성
		Main.onLoading();

		$('#nextForm').remove();

		var strHtml = '';

		if (strUrl.indexOf ('.dev') < 0) {

			strUrl += '.dev';
		}

		// 1. form 생성
		// redirect 를 위한 소스 신규 생성
		// strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\"POST\" " + strTarget + " action=\"" + '/common/cc/movePage.dev' + "\">";
		strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\"POST\" " + strTarget + " action=\"" + strUrl + " \">";

		// 2. 실제 이동 할 URL 설정
		strHtml += "<input name=\"" + 'ORG_URL' + "\" id=\"" + 'ORG_URL' + "\" type=\"hidden\" value=\'" + strUrl + "\' />";

		// Parameter 가 없는 경우 input tag를 Skip 한다.
		if (!util.isNull(objParam)) {
			// 3. 입력 Parameter가 존재하는 경우 JSON_DATA로 전달
			delete objParam.ORG_URL; // 기존 PARAM 으로 전달 받은 ORG_URL 삭제
			strHtml += "<input name=\"" + 'JSON_DATA' + "\" id=\"" + 'JSON_DATA' + "\" type=\"hidden\" value=\'" + JSON.stringify(objParam) + "\' />";
		}

		strHtml += '</form>';

		// 4. 화면에 Form 생성
		$('body').append(strHtml);


		if(strUrl!=null && strUrl.indexOf(".dev")>-1){
			strUrl=strUrl.split(".")[0];
		}
		// 5. 현재 이동 화면을 session storage에 저장. 추후 History로 이용
		sessionStorage.setItem('historyActionUrl', strUrl);

		// 6. submit
		setTimeout(function() {
			$('#nextForm').submit();
		}, 300);
	};

	/**
	 * 로그인전 일경우 로그인후 페이지이동하기 위한 함수 
	 * @param url
	 * @param param
	 */
	 _public.moveToLoginUserOnlyPage = function(url) {
   	  if(!globalVar.getParam("isLogin")){
   		  if(confirm("해당 메뉴의 경우 회원만 이용 가능합니다. 로그인화면으로 이동 하시겠습니까?")){
	   			if(!util.isNull(url)){
	   	    		sessionStorage.setItem('returnUrl', url);
	   	    	}else{
	   	    		var returnLoginURL= sessionStorage.getItem('returnUrl');
	   	        	if(!util.isNull(returnLoginURL)){
	   	        		sessionStorage.removeItem("returnUrl");
	   	        	}
	   	    	} 
	   			PageUtil.movePage("/common/ca/CA01000S.dev");
   	  		}
   	  }else{
   		  PageUtil.movePage(url);
   	  }
     };
	
	
	
	/**
	 *
	 * 오픈이노베이션용 get방식 가능
	 * @param strUrl
	 * @param objParam
	 * @param strTarget
	 */
	_public.movePage2 = function(strUrl, objParam, strTarget, methodType) {

		methodType = methodType || 'POST';

		Main.offDisableBack();

		// @@CK@@ url 이 null 일 경우 준비중으로 표현
		if(strUrl == null) {
			message.alert('COM013');
			return;
		}

		// 0. 로딩 생성
		Main.onLoading();

		$('#nextForm').remove();

		var strHtml = '';

		// 1. form 생성
		// redirect 를 위한 소스 신규 생성
		// strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\"POST\" " + strTarget + " action=\"" + '/common/cc/movePage.dev' + "\">";
		strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\""+ methodType +"\" " + strTarget + " action=\"" + strUrl + ".dev \">";

		// 2. 실제 이동 할 URL 설정
		strHtml += "<input name=\"" + 'ORG_URL' + "\" id=\"" + 'ORG_URL' + "\" type=\"hidden\" value=\'" + strUrl + "\' />";

		// Parameter 가 없는 경우 input tag를 Skip 한다.
		if (!util.isNull(objParam)) {
			// 3. 입력 Parameter가 존재하는 경우 JSON_DATA로 전달
			delete objParam.ORG_URL; // 기존 PARAM 으로 전달 받은 ORG_URL 삭제

			// To-Be 방식
			if( methodType == "POST"){
				strHtml += "<input name=\"" + 'JSON_DATA' + "\" id=\"" + 'JSON_DATA' + "\" type=\"hidden\" value=\'" + JSON.stringify(objParam) + "\' />";
			// As-Is 방식 [메인에서 상세보기 > Get & makeInputTag]
			}else{
				strHtml += _public.makeInputTag(objParam, "");// 데이터의 일반, 객체, 배열의 모든 종류의
			}

		}

		strHtml += '</form>';

		// 4. 화면에 Form 생성
		$('body').append(strHtml);

		// 5. 현재 이동 화면을 session storage에 저장. 추후 History로 이용
		sessionStorage.setItem('historyActionUrl', strUrl);

		// 6. submit
		$('#nextForm').submit();

		// 0. 로딩 제거
		setTimeout(function() {
			Main.offLoading();
		}, 1000);

	};

	/**
	 * 동적으로 input tag 생성
	 * @param strUrl
	 * @param objParam
	 * @param strTarget
	 */
	_public.makeInputTag = function(obj, parentKey) {

		var strHtml = '';
		var t = typeof (obj);
		if (t != 'object' || obj === null) {
			return String('');
		} else {
			var n='', v;
			for (n in obj) {
				v = obj[n];
				t = typeof(v);
				if (obj.hasOwnProperty(n)) {
					var inId, inName;
					if ('' == parentKey) {
						inId = n, inName = n;
					} else {
						inId = parentKey + n, inName = parentKey;
					}
					if (t == 'string') {
						strHtml += "<input name=\"" + inName + "\" id=\"" + inId + "\" type=\"hidden\" value=\'" + v + "\' />";
					} else if (t == "object" && v !== null) {// 객체나 배열일 경우 같은 name으로
															// 묶어서 하위에서 재귀적 처리
						strHtml += PageUtil.makeInputTag(v, parentKey + "[" + n + "]");
					} else {
						strHtml += "<input name=\"" + inName + "\" id=\"" + inId + "\" type=\"hidden\" value=\'" + v + "\' />";
					}
				}
			}
			return strHtml;
		}

	};

	/**
	 * 스토리지 사용 여부
	 */
	_public.storageEnabled = function() {
	    try {
	    	sessionStorage.setItem('stUseYn','Y');
	    } catch (e) {
	        return false;
	    }
	    return true;
	};

	/**
	 * 페이지 오픈전 발생 이벤트
	 * 화면이 모두 렌더링 된 이후에 발생하는 이벤트
	 */
	_public.prePageFunction = function (param, popupId, url) {

//		alert("** Android **\n"+navigator.userAgent);
		logger.log('prePageFunction1');
		if (!_public.storageEnabled()){
			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS){

//				alert("** IOS 쿠키설정필요 **\n"+navigator.userAgent);

				// IOS 사파리
				if(navigator.userAgent.toLowerCase().indexOf("safari") > -1){
					alert('정상적인 서비스 이용을 위해\n1. 사파리를 개인정보보호모드가 아닌\n일반모드로 접속하여 주시고\n2. [설정>Safari>쿠키차단]에서\n[항상 허용]을 선택해 주세요');
				// IOS 크롬
				//}else if(navigator.userAgent.toLowerCase().indexOf("crios") > -1){
				//	alert('정상적인 서비스 이용을 위해 크롬브라우저\n[설정>콘텐츠설정]에서\n쿠키허용을 선택해 주세요.');
				}

			}else if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID){

//				alert("** Android 쿠키설정필요 **\n"+navigator.userAgent);

				// Android Opera
				if(navigator.userAgent.toLowerCase().indexOf("opr") > -1){
					alert('정상적인 서비스 이용을 위해 오페라\n[설정>개인정보>쿠키]에서\n 사용하기를 선택해 주세요.');

				// Android Firefox
				}else if(navigator.userAgent.toLowerCase().indexOf("firefox") > -1){
					alert('정상적인 서비스 이용을 위해 파이어폭스\n[프로그램 설정>개인정보>쿠키]에서\n 사용하기를 선택해 주세요.');

				// Android 크롬일때
				}else if(navigator.userAgent.toLowerCase().indexOf("chrome") > -1){
					alert('정상적인 서비스 이용을 위해\n1.크롬 시크릿탭이 아닌\n일반탭으로 접속하여 주시고\n2.크롬 [설정>사이트설정>쿠키]에서\n쿠키차단을 해제해 주세요.');

				}
			}
//			else{
//				alert('정상적인 서비스 이용을 위해\n[설정>사이트설정>쿠키]에서\n쿠키차단을 해제해 주세요.');
//			}
			return;
		}else{
			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_IOS){

//				alert("** IOS 쿠키정상 **\n"+navigator.userAgent);

			}else if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_ANDROID){

//				alert("** Android 쿠키정상 **\n"+navigator.userAgent);
			}
		}

		Main.onDisableBack();
		logger.log('prePageFunction2');
		if (util.isNull(popupId)) {
			logger.log('prePageFunction3');
			// 팝업이 아닌 경우

			// 1. Gnb 메뉴 생성
			//PageUtil.makeGnbMenu();

			// 2. 화면 attr 체크 후 formatter 발생 처리
			PageUtil.actionFormatter();

			// 3. SNS Area 생성
			PageUtil.drawSNSArea();

			// 3.5 헤더 Area 호출, 자동 로그아웃을 위한 호출
			pageHeaderFunction();
			logger.log('prePageFunction4');
			// 4. 화면 기본 pageFucntion 호출
			pageFunction(param);

			// 5. 화면 렌더링 이후, 퍼블리싱을 위한 함수 호출
			//UIComponent();

			// 6. 로딩 종료
			var nowTransaction = globalVar.getParam('nowTransaction');
 			if(nowTransaction || nowTransaction == undefined) {
				Main.offLoading();
			}

 			// 7. 이벤트 제어
 			$(function() {
			  $('input[readonly]').on('focus', function(ev) {
			    $(this).trigger('blur');
			  });
			});

			try {
				// 설계페이지 원하는 포지션으로 이동
				var inPos = globalVar.getParam('inSData').inPos;
				if (inPos != undefined && inPos != null && inPos != "") {
					setTimeout(function() {
						var $obj = $('#tab_navi a:eq(' + (Number(inPos.substring(1,2)) - 1) + ')');
						$obj.trigger('mousedown');
					},1000);
				}
			}
			catch(e){}

		} else {
			// 팝업 인 경우

			// 1. 화면 attr 체크 후 formatter 발생 처리
			PageUtil.actionFormatter();

			// 2. SNS Area 생성
			PageUtil.drawSNSArea($('#' + popupId));

			// 3. 화면 기본 pageFucntion 호출
			pageFunction(param);

			// 4. 화면 렌더링 이후, 퍼블리싱을 위한 함수 호출
			//UIComponent($('#' + popupId));

			// 5. 로딩 종료
			var nowTransaction = globalVar.getParam('nowTransaction');
 			if(nowTransaction || nowTransaction == undefined) {
				Main.offLoading();
			}

 			// 6. 이벤트 제어
 			$(function() {
			  $('input[readonly]').on('focus', function(ev) {
			    $(this).trigger('blur');
			  });
			});
		}
	};

	_public.getIOSVersion = function() {
		var agentFullInfo = window.navigator.userAgent;
		var index = agentFullInfo.search(/OS\s\d/gm);
		var version = agentFullInfo.charAt(index + 3);

		return version;
	};

	_public.drawSNSArea = function(_$itm) {

		if(!_$itm) _$itm = $('body');

		/**
		 * SNS 영역 체크 확인 후 SNS 버튼 바인딩
		 */
		var snsAreas = _$itm.find('[data-div-type=sns]');
		var pathName = window.location.pathname.split('/');
		$.each(snsAreas, function(idx, _this){

			/**
			 * SNS링크를 통한 이벤트 페이지 접속 시 SNS공유하기 기능을 표기해 주기 위한 처리
			 * */
			if (pathName[1] == "lifesquare" || pathName[1] == "bridge"
				|| pathName[ pathName.length - 1 ] == 'MWCC099S1.dev') {

				var strHtml  = '<div class="sns_wrap bdtop">';
					strHtml += '	<div class="sns_btn" id="sns_btn_'+idx+'">';
					strHtml += '		<a href="javascript:;" id="snsFacebook" class="icon100 sns_fb">FACEBOOK</a>';
					strHtml += '		<a href="javascript:;" id="snsKakaotalk" class="icon100 sns_kt">KAKAOTALK</a>';
					strHtml += '		<a href="javascript:;" id="snsKakaostory" class="icon100 sns_ks">KAKAOSTORY</a>';
					strHtml += '		<a href="javascript:;" id="snsLine" class="icon100 sns_ln">LINE</a>';
					strHtml += '		<a href="javascript:;" id="snsBand" class="icon100 sns_bd">BAND</a>';
					strHtml += '	</div>';
					strHtml += '</div>';
					$(_this).attr('id', 'snsArea'+idx);
					$(_this).html(strHtml);

					$(".sns_btn").css("margin-right", "10px");

			} else {

				var strHtml =  '';
				strHtml += '		<div id="sns_btn_'+idx+'">';
				strHtml += '		<a href="javascript:;" id="snsEmail" class="btn_share"><i class="ico_mail"></i>이메일</a>';        
				strHtml += '		<a href="javascript:;" id="snsSMS" class="btn_share"><i class="ico_sms"></i>SMS</a>';            
				strHtml += '		<a href="javascript:;" id="snsFacebook" class="btn_share"><i class="ico_facebook"></i>페이스북</a>';   
				strHtml += '		<a href="javascript:;" id="snsKakaotalk" class="btn_share"><i class="ico_kakao"></i>카카오톡</a>';       
				strHtml += '		<a href="javascript:;" id="snsLine" class="btn_share"><i class="ico_line"></i>라인</a>';
				strHtml += '		<a href="javascript:;" id="snsBand" class="btn_share"><i class="ico_band"></i>밴드</a>';
				strHtml += '	</div>';

				$(_this).attr('id', 'snsArea'+idx);
				$(_this).html(strHtml);

			}

		});

	};

	/**
	 * data Attribute 로 구분된 값으로 화면 셋팅
	 * 1. mTranskey
	 * 2. formatter
	 *
	 * @param param
	 */
	_public.actionFormatter = function () {

		/**********************************************************************
		 *
		 * constraint 종류
			- numberonly
		    - engonly
			- koronly
			- kornameonly (util.inputName)
			- engnameonly
			- juminonly
			- jumin1only
			- jumin2only
			- cardnumonly
			- amtonly
			- email1only
			- email2only
			- tel1only
			- tel2only
			- tel3only
		 *********************************************************************/

		// body 하위 모든 input 태그에 [data-] Attribute 체크
		$('body input[type!=hidden]').each(function (i, k){

			/**
			 * 키보드 보안(mTranskey) Initial 영역
			 */
			var _tk_kbdType = $(k).attr('data-tk-kbdType');

			if(!util.isNull(_tk_kbdType) && $('#transkeyUuid').length == 0){

				// 하나의 화면에서 transkey를 재호출 하는 경우를 위해 obejct 초기화
				mtk = null;
				for ( var key in transkey) {
					if(key != 'objs') {
						transkey[key] = null;
					}
				}
				$('.transkey_div').remove();
				initmTranskey();
			}

			/**
			 * Formatter Initial 영역
			 */
			var _constraint = $(k).attr('data-constraint');
			var _id = $(k).attr('id');

			switch (_constraint) {
			case 'numberonly':
				util.inputNum(_id);
				break;
			case 'engonly':
				util.inputEng(_id);
				break;
			case 'koronly':
				util.inputKor(_id);
				break;
			case 'kornameonly':
				util.inputName(_id);
				break;
			case 'engnameonly':
				util.inputEngName(_id);
				break;
			case 'juminonly':
				util.inputJumin(_id);
				break;
			case 'jumin1only':
				util.inputJumin1(_id);
				break;
			case 'jumin2only':
				util.inputJumin2(_id);
				break;
			case 'cardnumonly':
				util.inputCardNum(_id);
				break;
			case 'amtonly':
				util.inputAmt(_id);
				break;
			case 'emailonly':
				util.inputEmail(_id);
				break;
			case 'email1only':
				util.inputEmail1(_id);
				break;
			case 'email2only':
				util.inputEmail2(_id);
				break;
			case 'tel1only':
				util.inputTel1(_id);
				break;
			case 'tel2only':
				util.inputTel2(_id);
				break;
			case 'tel3only':
				util.inputTel3(_id);
				break;
			case 'tel2and3only':
				util.inputTel2and3(_id);
				break;
			case 'naturalonly':
				util.inputNatural(_id);
			default:
				break;
			}

		});

	};

	/**
	 * 트랜잭션 조회 및 리스트 작성 동시 실행
	 * 트랜잭션 조회 후 리스트가 작성되며, 리스트타입에 따라 페이지가 그려진다.
	 * 트랜잭션 1회 조회 후 tranProp에 지정된 success callback 이 실행 된다.
	 *
	 * -- listParam --
	 * [필수] 리스트타입	 	- listType : normal, number, add
	 * [필수] 리스트 데이터	 	- resDataId : String
	 * [선택] 리스트ID 		 	- listId : listArea
	 * [선택] 리스트템플릿ID 	- tempListId : tempListArea
	 * [선택] 페이징영역ID	 	- pageAreaId : pagingNavi
	 * [선택] 더보기버튼Element - pageAddButton : $(#btnAddMore)
	 * [선택] 페이지 숫자	 	- iPageRow : '5'
	 * [선택] 페이지 블록	 	- iPageBlock : '5'
	 * [선택] 전처리 함수	 	- preDataHandler : Function
	 * [선택] 행처리 함수       - eachDataHandler : Function
	 * [선택] 후처리 함수	 	- postDataHandler : Function
	 *
	 * -- tranProp --
	 * 기존 transaction과 동일하게 작성 (mw.core.js 참조)
	 *
	 * @param tranProp
	 * @param listParam
	 */
	_public.drawListWithData = function(tranProp, listParam) {

		// 사용자로 부터 넘겨받은 success callback 저장
		tranProp.orgSuccess = tranProp.success;

		// 전체 보기의 경우 페이지 고정
		// MCCUBE 사전 정의 값 : 페이지사이즈 200
		if(listParam.listType == 'normal'){

			if(util.isNull(tranProp.params)) {
				tranProp.params = {};
			}
			tranProp.params.PAGE_ROW_SIZE = '200';

		} else {

			if(util.isNull(tranProp.params)) {
				tranProp.params = {};
			}

			if (util.isNull(listParam.iPageRow)){
				tranProp.params.PAGE_ROW_SIZE = '5';
			} else {
				tranProp.params.PAGE_ROW_SIZE = listParam.iPageRow;
			}

		}

		// 지정된 success callback 실행 후 리스트/페이징 작성
		tranProp.success = function(data) {

			var outData = data.outData;

			if(typeof listParam.resDataId == 'string'){
				listParam['responseListData'] = outData[listParam.resDataId];
			} else if (typeof listParam.resDataId == 'object' || typeof listParam.resDataId == 'array'){

				var tempObj = '';
				for ( var i = 0; i < listParam.resDataId.length; i++) {
					if(tempObj == ''){
						tempObj = outData[listParam.resDataId[i]];
					} else {
						tempObj = tempObj[listParam.resDataId[i]];
					}
				}
				listParam['responseListData'] = tempObj;

			}

			var tempStr = JSON.stringify(outData);
			if (tempStr.indexOf('INQR_TOTAL_CNT') > -1) {


				var strIdx = tempStr.indexOf('INQR_TOTAL_CNT":"');
				var endIdx = tempStr.indexOf('",', strIdx + 17);

				if(endIdx > -1){

					var totCnt = tempStr.substring(strIdx + 17, endIdx);
				listParam['totCnt'] = totCnt;

			} else {
					listParam['totCnt'] = outData.INQR_TOTAL_CNT;
				}

			} else {
				listParam['totCnt'] = '1';
			}

			// 기존에 그려진 리스트 삭제
			jQuery.removeChild(listParam.listId);

			var listType = listParam.listType;
			switch (listType) {

			case 'normal': // 일반 리스트

				PageUtil.drawListCore(listParam);

				break;

			case 'number': // 페이지 표시 리스트

				PageUtil.drawListCore(listParam);
				PageUtil.pagingReset(listParam.pageAreaId);
				PageUtil.pageNavigator(listParam, tranProp);
				break;

			case 'add': // 더보기 리스트

				PageUtil.drawListCore(listParam);
				PageUtil.pagingReset(listParam.pageAreaId);
				PageUtil.addPageNavigator(listParam, tranProp);
				break;

			default:
				break;
			}

			// TranProp의 기존 성공 콜백 실행 후 삭제 (이중 실행 방지)
			tranProp.orgSuccess(data);
			tranProp.orgSuccess = null;

		};
		transaction.callTran(tranProp);

	};


	/**
	 * Data를 조회 없이 리스트 생성 함수
	 */
	_private.DRAW_LIST_PROP = {
		responseListData : undefined,
		totCnt			 : 0,
		listId 			 : 'listArea',
		tempListId 		 : 'tempListArea',
		listType		 : 'normal',
		url 			 : '',
		iPageRow 		 : '5',
		iPageBlock 		 : '5',
		pageAreaId		 : 'pagingNavi'
	};
	_private.utilObj_drawList_listAreaClone = new Object;
	_private.ajaxOption = {
			'iTargetPage' : 1
	};

	_public.drawList = function(listParam, tranProp) {

		// 리스트 타입을 검사한다.
		if(util.chkReturn(listParam.listType, 's') === ''
		  && util.chkReturn(listParam.listType, 's') !== 'normal'
		  && util.chkReturn(listParam.listType, 's') !== 'number'
	      && util.chkReturn(listParam.listType, 's') !== 'add'
		) {
			message.alert('COM009');
			return;
		}

		if (util.isNull(listParam['iTargetPage'])) {
			listParam['iTargetPage'] = '1';
		}

		var listType = listParam.listType;

		switch (listType) {
		case 'normal': // 일반 리스트

			PageUtil.drawListCore(listParam);

			break;

		case 'number': // 페이지 표시 리스트

			PageUtil.drawListCore(listParam);
			PageUtil.pagingReset(listParam.pageAreaId);
			PageUtil.pageNavigator(listParam, tranProp);
			break;

		case 'add': // 더보기 리스트

			PageUtil.drawListCore(listParam);
			PageUtil.pagingReset(listParam.pageAreaId);
			PageUtil.addPageNavigator(listParam, tranProp);
			break;

		default:
			break;
		}

	};

	/**
	 * 데이터를 기준으로 리스트 생성
	 * @param listParam
	 */
	_public.drawListCore = function(listParam) {

		// 그려질 영역이 없을경우 디폴트명으로 설정
		if(util.chkReturn(listParam.listId, 's') == ''){
			listParam.listId = _private.DRAW_LIST_PROP.listId;
		}

		// 임시 그려질 영역이 없을경우 디폴트명으로 설정
		if(util.chkReturn(listParam.tempListId, 's') == ''){
			listParam.tempListId = _private.DRAW_LIST_PROP.tempListId;
		}

		// 지정된 id의 영역 설정
		var $listArea = $('#'+listParam.listId);
		var $tempListArea = $('#'+listParam.tempListId);

		// 지정된 id의 임시영역 복사 및 임시영역 삭제
		if(util.chkReturn(_private.utilObj_drawList_listAreaClone[listParam.tempListId], 's') == ''){
			_private.utilObj_drawList_listAreaClone[listParam.tempListId] = $tempListArea.children().clone();

			if (listParam.listType == 'normal') {
				// 일반 리스트일 경우에는 템플릿삭제.
				// 페이징 리스트일 경우에는 페이징 처리로 인해 삭제 하지 않음.
				jQuery.remove(listParam.tempListId);	// temp 삭제
			}
		}

		if(listParam.listType != 'add'){
			// 지정된 id의 기존 영역에 그려진 부분 삭제
			jQuery.removeChild(listParam.listId);
		}

		var nCount = 0;
		if (util.chkReturn(listParam.responseListData, 's') != ''){
			nCount = listParam.responseListData.length; // 리스트의 길이
		}

		// 데이터 전처리 핸들러 호출
		if (util.chkReturn(listParam.preDataHandler, 's') != ''){
			listParam.responseListData = listParam.preDataHandler(listParam.responseListData);
			if(listParam.responseListData != undefined){
				nCount = listParam.responseListData.length;
			}
		}

		// 리스트가 없을경우 종료
		if (util.chkReturn(nCount, 's') == '' || nCount == 0) {

			var inHtml = null;

			if (util.chkReturn(listParam.noneDataListId, 's') != ''){
				var $noneDataListArea = $('#'+listParam.noneDataListId);
				inHtml = $noneDataListArea.children().clone();
				//$noneDataListArea.remove();
			}
			else {
				var nThCount = _private.utilObj_drawList_listAreaClone[listParam.tempListId].children('th').length;
				var nTdCount = _private.utilObj_drawList_listAreaClone[listParam.tempListId].children('td').length;

				if(nThCount != 0 || nTdCount != 0) {
					inHtml = "<tr><td colspan=\"" + ( nThCount + nTdCount ) + "\" class=\"noData\">조회된 내역이 없습니다.</td></tr>";
				}
				else {
					inHtml = '<div class="no_list dm"><span class="icon50 icon_notice"></span>조회된 내역이 없습니다.</div>';
				}
			}

			$listArea.html(inHtml);

			// 데이터 후처리 핸들러 호출
			if (util.chkReturn(listParam.postDataHandler, 's') != ''){
				listParam.postDataHandler(listParam.responseListData);
			}

		} else {

			// 임시로 그려지는 영역 객체
			var srcArea = null;

			// 리스트의 길이만큼 수행되면서 모든 오브젝트의 키에 오브젝트의 값을 그린다. (화면 오브젝트의 클래스명과 실제 전문의 키값은
			// 동일하게 설정)
			for (var i = 0 ; i<nCount ; i++) {
				var objData = listParam.responseListData[i];
				srcArea = _private.utilObj_drawList_listAreaClone[listParam.tempListId].clone();
				// 데이터가 포함된 row에 현재 rowData세팅
				srcArea.data('data',objData);
				// 2017-04-18 모든 엘리먼트에 data 설정
				$('*', srcArea).data('data', objData);

				// 2017-04-04 :: 리스트에 커스텀 function 으로 데이터 바인딩
				if (listParam.eachDataHandler != undefined && listParam.eachDataHandler != null && typeof listParam.eachDataHandler == 'function') {
					listParam.eachDataHandler(srcArea, objData);
				}else{
					for(var item in objData){

						if(item.indexOf('[')==-1 && item.indexOf(']')==-1){
							// 현재 row의 column에 rowData세팅
							srcArea.find('[id='+item+']').data('data',objData);
							srcArea.find('[id='+item+']').val(objData[item]);
							srcArea.find('[id='+item+']').filter(':not(input)').filter(':not(button)').filter(':not(img)').html(objData[item]);

							if(item.indexOf('ESC_') == 0) {
								// 치환문자를 치환데이터로 변환
								srcArea.each(function(i, e){
									var tempHtml = $(this).html();
									tempHtml = util.replaceAll(tempHtml, '@{' + item + '}', objData[item] );
									$(this).html(tempHtml);
								});
							}

						}
					}

					// 치환되지 않은 문자열 삭제
					// @{} 으로 선언된 문자열은 모두 공백으로 처리
					srcArea.each(function(i, e){
						var tempHtml = $(this).html();
						tempHtml =tempHtml.replace(/\@[^<>]*\}/gi, '');
						$(this).html(tempHtml);
					});
				}

				// 생성이 완료된 list는 listArea에 Append
				$listArea.append(srcArea);
			}

			// Call UI Setting Method
			//UIComponent($('#' + listParam.listId));

			// 화면 attr 체크 후 formatter 발생 처리
			PageUtil.actionFormatter();

			// 데이터 후처리 핸들러 호출
			if (util.chkReturn(listParam.postDataHandler, 's') != ''){
				listParam.postDataHandler(listParam.responseListData, $listArea);
			}
		}
	};

	/**
	 * 페이징 초기화 함수 - 페이징 div 내용을 삭제한다.
	 * @param pageAreaId	- String - 페이징을 표시한 div명 - 미입력 또는 빈스트링시 pagingNavi를 초기화 한다.
	 */
	_public.pagingReset = function (pageAreaId) {
		if (util.isNull(pageAreaId) != '') {
			pageAreaId = 'pagingNavi';
		}

		jQuery('#' + pageAreaId + ' > ').remove();//페이징 초기화
	};


	/**
	 * 페이지 네비게이터
	 * @param listParam
	 * @param tranProp
	 */
	_public._listParam = {};
	_public._tranProp = {};
	_public.pageNavigator = function (listParam, tranProp) {

		logger.log('CALL METHOD [ ' + 'pageNavigator' + ' ]');

		/**
		 * 순서
		 * 1. 리스트 그리기
		 * 2. 하단 페이지 버튼 새로 생성
		 * 	- 5개씩 짤라서 그리기
		 *  - 이전/다음 버튼 구성
		 * 3. 페이지 버튼 선택시 발생하는 이벤트
		 * 4. 이전/다음 버튼 선택시 발생하는 이벤트
		 */

		var iCurrPageLength = $('#' + listParam.listId).children().length;
		var iTotalCount = listParam.totCnt;
		var pageAreaId = listParam.pageAreaId;

		if (util.chkReturn(pageAreaId, "s") == ""){
			pageAreaId = "pagingNavi";
		}

		/********************************************************************************/
		/**
		 * 페이지 네비게이터
		 * 현재 페이지 번호(iCurrPage), 전체 Data Row 수(iTotalCount)는 필수 값
		 * 페이징 클릭시 별도의 값을 입력하지 않으면 fn_paging(nPaginNum); 기본 호출
		 * @param iCurrPage	- Interger - (필수)현재 페이지 번호 - 최초 1
		 * @param iTotalCount	- Interger - (필수)전체 Data Row 수
		 * @param iPageRow	- Interger - 화면에보여주는 Data Row 수 - 미입력 또는 빈스트링 입력시 5기본 세팅
		 * @param iPageBlock	- Interger - 페이징 번호 길이 수 - 미입력 또는 빈스트링 입력시 10기본 세팅
		 * @param strReturnFn	- String - 페이징 클릭시 호출할 function명 - 미입력 또는 빈스트링시 fn_paging 호출
		 * @param strViewId	- String - 페이징을 표시할 div명 - 미입력 또는 빈스트링시 pagingNavi에 그린다
		 * @param designType- String - 페이징디자인타입 - 미입력 또는 빈스트링시 default 페이징디자인타입
		 *
		function pageNavigator(iCurrPage, iTotalCount, iPageRow, iPageBlock, strReturnFn, strViewId, designType) {

		var iTargetPage = listParam.iTargetPage;
		var iPageRow = listParam.iPageRow;
		var iCurrPageLength = $('#' + listParam.listId).children().length;

		 */

		var iCurrPage = listParam.iTargetPage;
		var iTotalCount = listParam.totCnt;
		var iPageRow = listParam.iPageRow;
		var iPageBlock = listParam.iPageBlock;
		var strViewId = 0;

		//이동할 페이지
		if (util.chkReturn(iCurrPage, "s") == "") {
			iCurrPage = 1;
		}

		// 화면에보여주는 Data Row 수를 미입력 하면 디폴트 5 세팅
		if (util.chkReturn(iPageRow, "s") == ""){
			iPageRow = 5;
		}else{
			iPageRow = parseInt(iPageRow);
		}

		if (util.chkReturn(iPageBlock, "s") == ""){
			iPageBlock = 5;
		}else{
			iPageBlock = parseInt(iPageBlock);
		}

		//페이지 관리를 위한 변수
		var iTotPage	= 0 ;
		var iTotalBlock = 0 ;
		var iBlock		= 0 ;
		var iFirstPage	= 0 ;
		var iLastPage	= 0 ;

		iBlock = Math.floor((iCurrPage-1) / iPageBlock + 1);
		iTotPage = Math.floor((iTotalCount -1) / iPageRow + 1);
		iFirstPage  = (iBlock -1) * iPageBlock + 1;
		iLastPage   = Math.min(iBlock * iPageBlock,iTotPage) ;
		iTotalBlock = Math.floor((iTotPage-1) / iPageBlock + 1);

		var sCurrPageClass = "on";
		var sReturnValue = "";

		if(iTotalCount > iPageRow){

			/******************************************************************/
			// 이전 >>
			if(iBlock > 1) {
				iMyPage = iFirstPage-1;

				sReturnValue += "<a href=\"javascript:;\" class=\"btn_paging icon_p_prev\" onclick='PageUtil.callOtherPage(" + iMyPage.toString() + ");'" + ">이전</a>";
			}
			/******************************************************************/

			/******************************************************************/
			// 현재 >>
			//현재의 페이지 블럭범위내에서 각 페이지로 바로 이동할 수 있는 하이퍼링크를 출력한다
			for(var i = iFirstPage; i <= iLastPage; i++) {
				if(iCurrPage == i) {
					// 현재 페이지인 경우
					sReturnValue += "<a class='"+sCurrPageClass+"' href='javascript:;' onclick='PageUtil.callOtherPage(" + i.toString() + ");' alt='"+i.toString()+"'>" + i.toString() + "</a>";
				} else {
					// 현재페이지가 아닌 경우
					sReturnValue += "<a href='javascript:;' onclick='PageUtil.callOtherPage(" + i.toString() + ");' alt='"+i.toString()+"'>" + i.toString() + "</a>";
				}

				if(i < iLastPage) {
					sReturnValue += "";
				}
			}
			/******************************************************************/

			/******************************************************************/
			// 다음 >>
			//다음페이지블록에 대한 페이지 링크
			if(iBlock < iTotalBlock) {
				iMyPage = iLastPage+1;
				// sReturnValue += "<a href=\"#\" class=\"btn_paging icon_p_next\">다음</a>";

				sReturnValue += "<a href=\"javascript:;\" class=\"btn_paging icon_p_next\" onclick='PageUtil.callOtherPage(" + iMyPage.toString() + ");'" + ">다음</a>";
			}
			/******************************************************************/

		} else {
			// 현재 페이지가 1페이지 인 경우
			sReturnValue += "<a href=\"javascript:;\" class=\"on\">1</a>";
		}

		// 페이징을 그릴 div ID값이 없을 경우 pagingNavi를 기본 세팅
		if (util.chkReturn(strViewId, "s") == ""){
			strViewId = "pagingNavi";
		}

		$('#' + listParam.pageAreaId).html(sReturnValue);

		/********************************************************************************/

		PageUtil._tranProp = tranProp;
		PageUtil._listParam = listParam;
	};

	/**
	 * 다음 페이지 호출
	 */
	_public.callOtherPage = function(i) {

		logger.log('CALL callotherpage!');

		var iTargetPage = i;
		var iPageRow = PageUtil._listParam.iPageRow;

		if (util.chkReturn(iTargetPage, "s") == ""){
			PageUtil._listParam.iTargetPage = 1;
		} else {
			PageUtil._listParam.iTargetPage = i;
		}

		// 화면에보여주는 Data Row 수를 미입력 하면 디폴트 5 세팅
		if (util.chkReturn(iPageRow, "s") == ""){
			PageUtil._listParam.iPageRow = 5;
		}

		PageUtil.drawMoreList(PageUtil._listParam, PageUtil._tranProp);
	};

	/**
	 * 더보기 버튼 추가 / 이벤트 바인딩 함수
	 */
	_public.addPageNavigator = function(listParam, tranProp) {

		/**
		 * 더보기 로직 순서
		 * 1. 전체 갯수 <= 현재 노출 갯수 : 더보기 버튼 삭제
		 * 2. 전체 갯수 > 현재 노출 갯수 : 더보기 버튼 추가 및 이벤트 바인딩
		 */

		var iCurrPageLength = $('#' + listParam.listId).children().length;
		var iTotalCount = listParam.totCnt;
		var pageAreaId = listParam.pageAreaId;

		if (util.chkReturn(pageAreaId, "s") == ""){
			pageAreaId = "pagingNavi";
		}

		if (iCurrPageLength < iTotalCount) {

			// 더보기 버튼 추가 후 이벤트 바인딩
			if (listParam.pageAddButton != undefined && listParam.pageAddButton != null) {
				var $btnAddMore = $(listParam.pageAddButton).clone();
				$(listParam.pageAddButton).remove();
				$('#' + pageAreaId).append($btnAddMore);
			}else if(listParam.listType == 'add' && listParam.singleType == undefined){
				$('#' + pageAreaId).append('<div class="page_more"><a href="javascript:;" id="btnAddMore" ><span>더보기</span></a></div>');
				// MWPI100S1에서 사용하는 클래스 적용을 위한 수정 (listParam.listType == 'add' && listParam.singleType == 'single')
			}else{
				$('#' + pageAreaId).append('<div class="area_more"><button type="button" class="btn_more" id="btnAddMore"><span>더보기</span></button></div>');
			}

			$('#btnAddMore').unbind().bind('click', function() {
				PageUtil.drawMoreList(listParam, tranProp);
			});

		} else {

			// 전체 갯수 <= 현재 노출 갯수 : 더보기 버튼 삭제
			$('#btnAddMore').unbind('click');
		}

	};

	/**
	 * 더보기를 한 경우 추가 리스트를 생성한다.
	 */
	_public.drawMoreList = function(listParam, _tranProp) {

		logger.log('추가 리스트 생성!');

		var iTargetPage = listParam.iTargetPage;
		var iPageRow = listParam.iPageRow;
		var iCurrPageLength = $('#' + listParam.listId).children().length;

		//이동할 페이지
		if (util.chkReturn(iTargetPage, "s") == "") {
			iTargetPage = 1;
		}

		// 화면에보여주는 Data Row 수를 미입력 하면 디폴트 5 세팅
		if (util.chkReturn(iPageRow, "s") == ""){
			iPageRow = 5;
		}else{
			iPageRow = parseInt(iPageRow);
			if(listParam.singleType != undefined && listParam.pageNum != undefined){
				iPageRow = parseInt(listParam.pageNum);
			}
		}

		// transProp 에 Page정보 추가해서 전달
		var tranProp 		= util.clone(_tranProp);	// 트랜잭션 기본 객체 복사

		if (util.isNull(tranProp.params)) {
			// parameter가 없는 경우 강제 생성
			tranProp.params = {};
		}

		// 입력된 JSON DATA 전달
		if(!util.isNull(tranProp.params.JSON_DATA)){
			var tempJSONDATA = JSON.parse(tranProp.params.JSON_DATA);
			tranProp.params = tempJSONDATA;
		}

		tranProp.params.PAGE_ROW_SIZE 	= iPageRow; 		   // row크기
		tranProp.params.PAGE		 	= iTargetPage; 		   // 페이지 번호

		if (listParam.listType == 'number') {

			// 페이징의 경우 선택한 페이지의 첫번째 값으로 이동한다.
			tranProp.params.PAGE_FIRST_ROW 	= 1 + ((listParam.iTargetPage-1)*listParam.iPageRow); // 이동할 페이지

		} else if(listParam.listType == 'add') {

			// 더보기의 경우 최대 길이의 +1을 하여 최신 페이지를 호출한다.
			tranProp.params.PAGE_FIRST_ROW 	= 1 + iCurrPageLength; // 이동할 페이지

		}

		tranProp.success    = function(data){
			data = data.outData;

			if(typeof listParam.resDataId == 'string'){
				listParam['responseListData'] = data[listParam.resDataId];
			} else if (typeof listParam.resDataId == 'object' || typeof listParam.resDataId == 'array'){

				var tempObj = '';
				for ( var i = 0; i < listParam.resDataId.length; i++) {
					if(tempObj == ''){
						tempObj = data[listParam.resDataId[i]];
					} else {
						tempObj = tempObj[listParam.resDataId[i]];
					}
				}
				listParam['responseListData'] = tempObj;

			}

			PageUtil.drawList(listParam, _tranProp);
		};

		transaction.callTran(tranProp);

	};

	/**
	 * 화면그리기 공통 (화면에 전문 데이터를 맞춰서 출력해줍니다)
	 *
	 * @param :
	 *            responseMap 화면에 매핑될 객체
	 *            mapId 실재로 그려질 영역의 id
	 *
	 *
	 * PageUtil.drawMap(result.outData, 'content');
	 *
	 * 수정 : 20130213 정헌태 - param strDef 추가 : 화면에 추가될 Object의 내용이
	 * 없을경우 대체텍스트를 화면에 표시한다.
	 */
	_public.drawMap = function (responseMap, mapId, strDef) {

		// 화면이 없을경우 종료
		if(undefined==responseMap){
			return;
		}
		// 그려질 영역이 없을경우 디폴트명으로 설정
		if(undefined==mapId){
			mapId = 'content';
		}

		var bStrDef = false;
		if (util.chkReturn(strDef, 's') != ''){
			bStrDef = true;
		}

		var $mapArea = $('#' + mapId);

		for(var item in responseMap){
			if(item.indexOf('[')==-1 && item.indexOf(']')==-1){
				if (util.chkReturn(responseMap[item], 's') == '' && bStrDef == true){
					$mapArea.find('#'+item).val(strDef);
					$mapArea.find('#'+item).filter(':not(input)').html(strDef);
				} else {
					$mapArea.find('#'+item).val(responseMap[item]);
					try{
						if($mapArea.find('[data-'+item+']').length > 0){
							$mapArea.find('[data-'+item+']').filter(':not(input)').html(responseMap[item]);
						}
					}catch(e){

					}
					$mapArea.find('#'+item).filter(':not(input)').html(responseMap[item]);
				}
			}
		}
	};

	/**
	 * 리스트에서 선택된 컬럼의 Data를 리턴한다.
	 *
	 * @param listId
	 * @param _this
	 * @returns Object
	 */
	_public.getListData = function(listId, _this) {

		var returnData = {};
		$(_this).parents().each(function(i, k) {

			if (k.id == listId) {
				returnData = $(_this).parents().eq(i-1).data('data');
				return returnData;
			}

		});

		return returnData;
	};

	/**
	 * 셀렉트박스의 옵션을 자동으로 생성하는 함수
	 *
	 * @param list :
	 *            옵션 리스트
	 * @param selectBoxId :
	 *            옵션을 그려줄 selectBox의 id
	 * @param option :
	 *            옵션설정값
	 *            option = {
	 *            	initVal : 초기값 > 미입력: 첫번째값, 입력: 입력값
	 *              emptyFlag : <option>선택</option> 표기 > 미입력: 표시, 입력: 미표시,
	 *              emptyText : 옵션에서 빈값 내용. 기본값은 선택
	 *              valKey : value로 설정될 keyName 기본값 : cmnnCd
	 *              textKey : 화면에표시될 keyName 기본값 : cmnnCdHanNm
	 *              dataKey : 셀렉트박스에 묶일 데이터
	 *            }
	 *
	 *
	 * ex ) PageUtil.drawSelectBoxOption(arrList,'sBox',{'initVal':5});
	 */
	_public.drawSelectBoxOption = function (list, selectBoxId, option) {
		// 옵션입력여부
		var optionState = false;
		if(util.chkReturn(option, 's') != '' && typeof option === 'object'){
			optionState = true;
		}
		// 셀렉트 박스 영역
		var $selectBoxArea = $('#'+selectBoxId);
		// 지정된 id의 기존 영역에 그려진 부분 삭제
		jQuery.removeChild(selectBoxId);
		if(typeof list === 'object' && list.constructor == Array){
			var valKey = 'cmnnCd';
			var textKey = 'cmnnCdHanNm';
			var disabledKey	= 'disabledFlag';
			if(!optionState || util.chkReturn(option.emptyFlag, 's') == '' ){
				var optionText = '선택';
				if(optionState && util.chkReturn(option.emptyText, 's') != ''){
					optionText = option.emptyText;
				}
				$selectBoxArea.append('<option value="">'+optionText+'</option>');
			}
			if(optionState && util.chkReturn(option.valKey, 's') != ""){
				valKey = option.valKey;
			}
			if(optionState && util.chkReturn(option.textKey, 's') != ''){
				textKey = option.textKey;
			}
			if(optionState && util.chkReturn(option.disabledKey, 's') != ''){
				disabledKey = option.disabledKey;
			}
			// 옵션그리기
			var strHtml;
			for(var i=0; i < list.length; i++) {
				strHtml = '';
				if( optionState && util.chkReturn(list[i][disabledKey], 's') == ''){
					list[i][disabledKey] = false;
				}
				if( optionState && list[i][disabledKey] ){
					strHtml += '<option value="' + list[i][valKey]
					+ '" disabled="disabled" class="disabled" >' + list[i][textKey]
					+ '</option>';
				} else {
					strHtml += '<option value="' + list[i][valKey]
					+ '">' + list[i][textKey]
					+ '</option>';
				}
				$selectBoxArea.append(strHtml);
				if(!optionState || util.chkReturn(option.dataKey, 's') != ''){
					// 옵션에 전체 데이터 세팅 옵션
					$selectBoxArea.find('option:last').data('data',list[i]);
				}
		    }
			if(optionState && util.chkReturn(option.initVal, 's') != ''){
				$selectBoxArea.val(option.initVal);
			}
		}
	};

	/**
	 * 라디오박스의 옵션을 자동으로 생성하는 함수
	 *
	 * @param list :
	 *            옵션 리스트
	 * @param radioBoxId :
	 *            옵션을 그려줄 radioBox의 id
	 * @param option :
	 *            옵션설정값
	 *            option = {
	 *            	initVal : 초기값 > 미입력: 선택없음, 입력: 입력값선택
	 *            	emptyFlag : 초기값 첫번째 option 선택구분 > 미입력: 선택, 입력: 미선택,
	 *            	valKey : value로 설정될 keyName 기본값 : cmnnCd
	 *            	textKey : 화면에표시될 keyName 기본값 : cmnnCdHanNm
	 *            	preText : 화면에 표시될 텍스트명 예 ) 연간 3 = 연간
	 *              posText : 화면에 표시될 텍스트명 예 ) 1년부터 = 년부터
	 *            }
	 *
	 * ex ) PageUtil.drawRadioBoxOption(arrList,'rBox',{'initVal':5});
	 */
	_public.drawRadioBoxOption = function (list, radioBoxId, option) {
		// 옵션입력여부
		var optionState = false;
		if(util.chkReturn(option, 's') != '' && typeof option === 'object'){
			optionState = true;
		}
		// 라디오 박스 영역
		var $radioBoxArea = $('#'+radioBoxId);
		// 지정된 id의 기존 영역에 그려진 부분 삭제
		jQuery.removeChild(radioBoxId);

		if(typeof list === 'object' && list.constructor == Array){
			var valKey = 'cmnnCd';
			var textKey = 'cmnnCdHanNm';
			if(optionState && util.chkReturn(option.valKey, 's') != ''){
				valKey = option.valKey;
			}
			if(optionState && util.chkReturn(option.textKey, 's') != ''){
				textKey = option.textKey;
			}

			if(optionState && util.chkReturn(option.preText, 's') != ''){
				preText = option.preText;
			}
			if(optionState && util.chkReturn(option.posText, 's') != ''){
				posText = option.posText;
			}

			// 옵션그리기
			var strHtml;
			for(var i=0; i < list.length; i++) {
				strHtml = '';
				strHtml += "<input type='radio' id='" + radioBoxId + i
						+ "' name='" + radioBoxId
						+ "' value='" + list[i][valKey]
						+ "' ><label for='"+ radioBoxId + i
						+ "'>" + list[i][textKey]
						+ "</label><br />";
				$radioBoxArea.append(strHtml);
		    }
			if(optionState && util.chkReturn(option.initVal, 's') != ''){
				$("input[name='"+radioBoxId+"']").filter('[value="' + option.initVal + '"]').attr('checked',true);
			}else{
				// 옵션 초기값 (첫번째값)
				if(!optionState || util.chkReturn(option.emptyFlag, 's') == ''){
					$("input[name='"+radioBoxId+"']").filter('[id="'+radioBoxId+'0"]').attr('checked',true);
				}
			}
		}
	};

	/**
	 * 입력 년월일 그려주는 함수 입력 년월일 셀렉트박스의 id에 각각을 넣으면 자동으로 그려준다.
	 * 디폴트값은 inputY, inputM, inputD
	 *
	 * @param yId
	 *            년도를 그려줄 영역 아이디 입력없을시 inputY
	 * @param mId
	 *            월수를 그려줄 영역 아이디 입력없을시 inputM
	 * @param dId
	 *            일수를 그려줄 영역 아이디 입력없을시 inputD
	 * @param option
	 *            ├─endAge : 그려줄 년도의 마지막 값에대한 나이 (현재나이로부터 계산)
	 *            ├─startAge : 그려줄 년도의 첫번째 값에대한 나이 (현재나이로부터 계산)
	 *            └─initAge : 그려줄 년도의 초기값 (현재나이로부터 계산)
	 *
	 * ex ) PageUtil.drawInputYMD('yDate','mDate','dDate');
	 */
	_public.drawInputYMD = function (yId, mId, dId, option) {
		if(typeof yId === 'object'){
			option = yId;
		}else{
			// 년도를 그려줄 영역 아이디
			if(util.chkReturn(yId, 's') == ''){
				yId = 'inputY';
			}
			// 월수를 그려줄 영역 아이디
			if(util.chkReturn(mId, 's') == ''){
				mId = 'inputM';
			}
			// 일수를 그려줄 영역 아이디
			if(util.chkReturn(dId, 's') == ''){
				dId = 'inputD';
			}
		}
		var optionState = false;
		if(util.chkReturn(option, 's') != '' && typeof option === 'object'){
			optionState = true;
		}

		var nowDate = util.getDate();

		// 년도그리기
		var startY = Number(nowDate.substring(0, 4)), endY = startY - 100, initY = startY - 30;

		if(optionState && (util.chkReturn(option.endAge, 's') != '')){
			endY = startY - option.endAge;
		}

		if(optionState && (util.chkReturn(option.startAge, 's') != '')){
			startY -= option.startAge;
		}

		if(optionState && (util.chkReturn(option.initAge, 's') != '')){
			initY = Number(nowDate.substr(0, 4)) - option.initAge;
		}

		var arrY = new Array();
		for(var i=startY; i>=endY; i--){
			arrY[arrY.length] = {'cmnnCd':i,'cmnnCdHanNm':i+'년'};
		}
		PagePageUtil.drawSelectBoxOption(arrY, yId, {'initVal' : initY, 'emptyFlag' : true});
		// 달그리기
		var arrM = new Array();
		for(var i=1; i<=12; i++){
			arrM[arrM.length] = {'cmnnCd':i,'cmnnCdHanNm':i+'월'};
		}
		PageUtil.drawSelectBoxOption(arrM, mId, {'emptyFlag' : true});
		// 일그리기
		function drawInputDD(inputY,inputM){
			var arrD = new Array();
			var curD = $('#'+dId).val();
			var endD = Number(util.getLastDay(inputY,inputM));
			if(curD > endD){
				curD = endD;
			}
			for(var i=1; i<=endD; i++){
				arrD[arrD.length] = {'cmnnCd':i,'cmnnCdHanNm':i+'일'};
			}
			PageUtil.drawSelectBoxOption(arrD, dId, {'initVal' : curD, 'emptyFlag' : true});
		}

		$('#'+yId).unbind().bind('change',function(){
			drawInputDD($('#'+yId).val(),$('#'+mId).val());
		});
		$('#'+mId).unbind().bind('change',function(){
			drawInputDD($('#'+yId).val(),$('#'+mId).val());
		});

		drawInputDD($('#'+yId).val(),$('#'+mId).val());
	};

	/**
	 * 셀렉트박스에 숫자로 된 값의 옵션을 자동 생성.
	 * 사용법은 그릴영역의 id와 시작값 끝값을넘기면 된다. 옵션의 경우는 필요한
	 * 값만 선택적으로 넘기면 된다.
	 *
	 * @param selBoxId
	 * @param option = {
	 *            initVal : 초기값 > 미입력: 첫번째값, 입력: 입력값
	 *            emptyFlag : <option>선택</option> 표기 > 미입력: 표시, 입력: 미표시,
	 *            start : 시작값 기본값 1,
	 *            end : 종료값 기본값 100,
	 *            term : 숫자간격 기본값 1,
	 *            preText : 화면에 표시될 텍스트명 예 ) 연간 3 = 연간
	 *            posText : 화면에 표시될 텍스트명 예 ) 1년부터 = 년부터
	 *            unit : 값 단위 예) 1000 = 화면표시는 1일경우 실제 값은 1000
	 *        }
	 *
	 *
	 * ex ) PageUtil.drawSelectBoxOptionNumber('numSelBox', {'startNum':30,'endNum':50};
	 */
	_public.drawSelectBoxOptionNumber = function (selBoxId, option) {

		var start 		= 1;
		var end 		= 100;
		var term 		= 1;
		var preText		= '';
		var posText		= '';
		var unit		= 1;
		// 옵션입력여부
		var optionState = false;
		if(util.chkReturn(option, 's') != '' && typeof option === 'object'){
			optionState = true;
		}
		if(optionState && util.chkReturn(option.start, 's') != ''){
			start = option.start;
		}
		if(optionState && util.chkReturn(option.end, 's') != ''){
			end = option.end;
		}
		if(optionState && util.chkReturn(option.term, 's') != ''){
			term = option.term;
		}
		if(optionState && util.chkReturn(option.order, 's') != ''){
			order = option.order;
		}
		if(optionState && util.chkReturn(option.preText, 's') != ''){
			preText = option.preText;
		}
		if(optionState && util.chkReturn(option.posText, 's') != ''){
			posText = option.posText;
		}
		if(optionState && util.chkReturn(option.unit, 's') != ''){
			unit = option.unit;
		}
		var numArr = new Array();

		if(start <= end){
			for(var i=start; i<=end; i+=term){
				numArr.push({'cmnnCd':i*unit,'cmnnCdHanNm':preText+i+posText});
			}
		}else{
			for(var i=start; i>=end; i-=term){
				numArr.push({'cmnnCd':i*unit,'cmnnCdHanNm':preText+i+posText});
			}
		}
		PageUtil.drawSelectBoxOption(numArr, selBoxId, option);
	};

	/**
	 * 테이블 리스트의 tbody에 '조회된 내역이 없습니다.'를 넣어준다.
	 *
	 * @param strTempListArea -
	 *            String - 복사할 임시 tbody 미입력시 'tempListArea'을 기본으로 세팅
	 * @param strListArea -
	 *            String - 그려질 tbody 미입력시 'listArea'을 기본으로 세팅
	 */
	_public.drawListNon = function (strTempListArea, strListArea) {
		if (util.chkReturn(strTempListArea, 's') == ''){
			strTempListArea = 'tempListArea';
		}

		if (util.chkReturn(strListArea, 's') == ''){
			strListArea = 'listArea';
		}

		var nTdCount = $('#' + strTempListArea).children('tr').children('td').length;

		$('#' + strListArea).html("<tr><td colspan=\"" + nTdCount + "\" class=\"noData\">조회된 내역이 없습니다.</td></tr>");

	};

	/**
	 * 팝업을 띄운다
	 *
	 * @param id
	 * @param option
	 *
	 * option attribute
	 *[필수] id 		: 팝업 id
	 *[필수] location 	: 팝업 파일 위치 - internal / external / new
	 *[필수] content 	: 외부의 경우 contents가 들어가는 위치
	 *[필수] url 		: 외부의 경우 외부 파일 위치 (ex: '/dev/samples/SMPL_POPP_EXTR_P.dev')
	 *[선택] htmlTag 	: html 태그 전달
	 *[선택] param	 	: parameter 전달 (JSON 타입)
	 *[선택] pageParam	: 호출되는 팝업의 pageFunction 으로 전달되는 Parameter
	 */
	_public.openPopup = function(option){

		var scrollTopVal = document.all?(!$(document).scrollTop()?$('body').scrollTop():$(document).scrollTop()):(window.pageYOffset?window.pageYOffset:window.scrollY);
		// Popup을 호출한 화면 ID를 저장
		var parentId = location.pathname.split('/');
		parentId = parentId[parentId.length-1].split('.')[0];
		globalVar.setParam('popupParentId', parentId);
		
		globalVar.setParam('popupOption',option);
		
		if (option.location == undefined) {


		} else if (option.location == 'internal') {

			// 내부 팝업 오픈
			$('#' + option.id).attr('style',''); // 팝업 오픈전 스타일 재정의
			$('#' + option.id).bPopup({
				easing: 'easeOutBack', //uses jQuery easing plugin
				speed: 450,
				transition: 'slideUp',
				positionStyle: 'fixed',
				modalClose: false
			});

			if ( MXP_PLUGIN.getOSInfo().name.indexOf('ANDROID') > -1 && history.pushState ){

				history.pushState({
					type : "popup"
				}, "popup", "#popup");

				window.onpopstate = function(D) {
					if (D) {
						if (D.state.type == 'popup') {
							_public.closePopup(option.id);
						}
					}
				};
			}

		// PC페이지 Mobile에서 정상적으로 보여줄수 있도록 location Type 추가
	  } else if (option.location == 'internalMobile') {

	    // 내부 팝업 오픈
	    $('#' + option.id).attr('style',''); // 팝업 오픈전 스타일 재정의

	    $('#' + option.id).find(".popcontent").css({
	      width: ($(window).width()-30)+"px",
	      overflow: "scroll"
	    });
	    $('#' + option.id).find("#noti").css({
	      overflow: "scroll"
	    });

	    $('#' + option.id).bPopup({
	      easing: 'easeOutBack', //uses jQuery easing plugin
	      speed: 450,
	      transition: 'slideUp',
	      positionStyle: 'fixed',
	      modalClose: false
	    });




	    if ( MXP_PLUGIN.getOSInfo().name.indexOf('ANDROID') > -1 && history.pushState ){

	      history.pushState({
	        type : "popup"
	      }, "popup", "#popup");

	      window.onpopstate = function(D) {
	        if (D) {
	          if (D.state.type == 'popup') {
	            _public.closePopup(option.id);
	          }
	        }
	      };
	    }

		} else if (option.location == 'external') {

			if(undefined != window.location.hash && "" != window.location.hash && null != window.location.hash){
                window.location.hash="";
            }

			Main.onLoading();
			// 외부 팝업 오픈
			$('#' + option.id).attr('style',''); // 팝업 오픈전 스타일 재정의

			// 이노베이션 팝업일경우 css처리(20160926)
			if(location.href.indexOf("innovation") > -1){
				$('#' + option.id).attr('style','background:#fff');
			}

			//ios 일때만 적용(포커스 아웃 이슈)
			if(MXP_PLUGIN.isIOS()){
				$("body").addClass("_fixed");
			}

			$('#' + option.id).bPopup({
				transition			: 'slideUp',
            	//transitionClose		: 'slideUp',
    			//contentContainer	: '.' + option.content,
				loadScrollTop		: scrollTopVal,
    			loadData 			: option.param,
    		    loadUrl				: option.url+'?random='+Math.random(), //Uses jQuery.load()
    		    loadCallback		: function() {

    		    	// 에러 여부를 판단하여 에러 페이지로 이동
    				if (!PageUtil.checkErrorPage()) {
    					// 에러 페이지로 이동
    					return;
    				}

    		    	/**
        			 * Popup 페이지에 적용된 globalVarPopup의 유무를 판단하여,
        			 * 로드시 이후 Event를 호출한다. include 되는 순서를 강제 할 수
        			 * 없기 때문에, include 된 이후 jQuery Load 이벤트를 호출한다.
        			 */
    				var roopFindGlobalVarPopup = setInterval( function(){

    					try {
    						if(!util.isNull(globalVarPopup)){

    							clearInterval(roopFindGlobalVarPopup);
    							// load된 이후에 로드 이벤트를 호출한다.
    							logger.log('load mwDevCommDataPopUp.jsp');
    							Main.readyEvent(option.url, option.pageParam, option.id);

    							//이노베이션 팝업일경우 색상 변경
    							if(location.href.indexOf("innovation") > -1){
    								$("#popupwrap div.popheader").addClass("pop_header");
    							}

    						} else {
    							logger.log('Re Call roopFindGlobalVarPopup');
    						}
    					} catch(e){
    						/**
    						 * globalVarPopup가 load 되지 않은 상태에서 호출하기 때문에
    						 * logger에서 에러가 발생할수 있음. 강제로 에러를 감추기 위해
    						 * catch 영역을 사용함.
    						 */
    					}

    				},  20);


    				if ( MXP_PLUGIN.getOSInfo().name.indexOf('ANDROID') > -1 && history.pushState )	{

    					history.pushState({
    						type : "popup"
    					}, "popup", "#popup");

    				}else if ((MXP_PLUGIN.getOSInfo().name.indexOf('IOS') > -1 && location.pathname.indexOf('MWPE912S1')) ||(MXP_PLUGIN.getOSInfo().name.indexOf('IOS') > -1 && location.pathname.indexOf('MWPE910S1'))
    						||(MXP_PLUGIN.getOSInfo().name.indexOf('IOS') > -1 && location.pathname.indexOf('MWPE920S1')) ||(MXP_PLUGIN.getOSInfo().name.indexOf('IOS') > -1 && location.pathname.indexOf('MWPE922S1'))) {
    					history.pushState({
    						type : "popup"
    					}, "popup", "#popup");
    				}
    		    }
    		});

		} else if (option.location == 'new') {

			// 새창 오픈
			PageUtil.htmlTag = option.htmlTag;
			localStorage.setItem('htmlTag', option.htmlTag);

			if(MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
				var newPop = window.open(location.origin + '/common/cc/newPopup.dev');
			} else {
				var url = location.origin + '/common/cc/newPopup.dev';
				var option = new webDialogProperties;
				option.headerTitleText = "라이프플래닛";
				option.headerCloseButtonText = "닫기";
				navigator.webdialog.open( url, option, function(){}, function(){}, function(){} );
			}

			return;

		} else if (option.location == 'url') {

			// 새창 오픈
			if(MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
				var newPop = window.open(option.url);
			} else {

				if ( option.url.substr(0,1) == '/'  && !(option.url.indexOf('lifeplanet.co.kr') > -1) ) {
					option.url = location.origin + option.url;
				}

				var url = option.url;
				var option = new webDialogProperties;
				option.headerTitleText = "라이프플래닛";
				option.headerCloseButtonText = "닫기";
				navigator.webdialog.open( url, option, function(){}, function(){}, function(){} );
			}

			return;

			/**
			 * App에서 실행되는 브라우저 실행되면서 새창으로 open
			 * Web에서 실행되는 경우 새창으로 open
			 */
		} else if(option.location == 'browserPopUp') {
			if(MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
				if (MXP_PLUGIN.getOSInfo().name.indexOf('ANDROID') > -1 && option.url.indexOf('talk.lifeplanet.co.kr') > -1){
					if( talkPop != null && !talkPop.closed ){
						talkPop.focus();
						return;
					}
					talkPop = window.open(option.url);
				}else{
					var newPop = window.open(option.url);
				}
			} else {
				var newUrl = option.url;
				var popupQuery = 'MxpBrowserPopUp=true';
				if (MXP_PLUGIN.isIOS()){

					if(newUrl.indexOf('?') > -1 ) {
						newUrl = newUrl +'&' + popupQuery;
					} else {
						newUrl = newUrl + '?' + popupQuery;
					}
					if(window.webkit != undefined) { //  WKWebviw 지원하는 경우 
						location.href = newUrl;
					} else {
						var newPop = window.open(newUrl);	
					}
				}
				else {
					var strArray = newUrl.split('://');
					var intent = "intent://"+strArray[1]+"#Intent;scheme="+strArray[0]+";action=android.intent.action.VIEW;end;";
					if(!talkPop) {
						location.href = intent;
					}
					talkPop = true;
					setTimeout(function() {
						talkPop = false;
					}, 2000);

				}
			}

			return;
		}

	};
	_public.htmlTag = '';

	/**
	 * 팝업을 닫는다
	 *
	 * @param id
	 * @param option
	 */
	_public.closePopup = function(id){
		// 기본 .b-close 버튼을 실행시킨다.
		$('[id=' + id + ']').find('.b-close').trigger('click');
	};
	
	/*
	 * 레이어 팝업 호출
	 */
	_public.openLayerPopup = function(url, needToLoadJS) {
		$.ajax({
			url      : url,
			method   : 'POST',
			dataType : "html",
			success  : function(callbackData) {
				$("#layerPopupArea").html(callbackData);
				$("#layerPopupArea").addClass("_layer_active");
				
				if(needToLoadJS) {
					loadJavascript(url);
				}
			},
			error : function(xhr, textStatus) {
				console.log("error: "+textStatus);
			}
		});
		
		function loadJavascript(url) {
			var splitPoint = url.lastIndexOf('/');
			
			var jsUrl = url.replace('.dev', '.js');
			jsUrl = '/views' + jsUrl.substring(0, splitPoint) + '/js' + jsUrl.substring(splitPoint);
			jsUrl += '?v=' + (cacheJS || '');
			
			var scriptElement = document.createElement('script');
			scriptElement.setAttribute('type', 'text/javascript');
			scriptElement.setAttribute('src', jsUrl);
			scriptElement.setAttribute('id', 'layerPopupJS');
			
			document.getElementsByTagName('head')[0].appendChild(scriptElement);
		}
	};
	
	/*
	 * 레이어 팝업 닫음
	 */
	_public.closeLayerPopup = function() {
		$("#layerPopupArea").html('');
		$("#layerPopupArea").removeClass("_layer_active");
		$("#layerPopupJS").remove();
	};

	/**
	 * GNB 메뉴를 생성한다.
	 */
	_public.makeGnbMenu = function() {

		if(util.isNull(globalVar.getParam('GNB_MENU_DATA'))){
			// GNB 정보를 획득하지 못하였습니다.
			return;
		}

		// 서버에서 전달 받은 GNB DATA
		var gnbData = util.clone(JSON.parse(globalVar.getParam('GNB_MENU_DATA')));

		// 현재 페이지 ID
		var curId = location.pathname.split('/');
		curId = curId[curId.length-1].split('.')[0];

		// 각 Depth별 Array 선언
		var oneDepth 	= [];
		var twoDepth 	= [];
		var threeDepth 	= [];

		// 기준 데이터를 사용하여 각 Depth 별 Array 선언
		for ( var i = 0; i < gnbData.length; i++) {

			var tempData = gnbData[i];

			if (tempData.menuLeveCd == 1) {
				oneDepth.push(tempData);
			} else if (tempData.menuLeveCd == 2) {
				twoDepth.push(tempData);
			} else if (tempData.menuLeveCd == 3) {
				threeDepth.push(tempData);
			}

		}

		// GNB DATA 기본 templete 생성
		var gnb_data = {
			resultData : []
		};

		// 로그인, 공인인증센터, 웹메인, 상품안내 경우 현재 메뉴 색깔 active 삭제
		if(curId == 'MWCC010S1' || curId == 'MWCC050S1' || curId == 'MWCE010S1' || curId == 'MWPD001S1'){
			sessionStorage.removeItem('curActiveID');
		}

		// 반복문을 사용하여 Depth 별 링크 생성
		for ( var i = 0; i < oneDepth.length; i++) {

			var tempOne = {
				id : oneDepth[i].menuId, 	 // 메뉴 id
				menu : oneDepth[i].menuNm, 	 // 메뉴명
				url : oneDepth[i].menuUrl ,  // 메뉴별 URL
				ictnSq : oneDepth[i].ictnSq, // 우선순위
				focus : ''					 // Focus
			};

			var tempTwoArr = [];
			for ( var j = 0; j < twoDepth.length; j++) {

				// 1depth의 ID와 2depth의 상위 객체가 동일한 경우에 진행
				if(oneDepth[i].menuId == twoDepth[j].sppoMenuId) {

					var tempTwo = {
							id : twoDepth[j].menuId,	 // 메뉴 id
							menu : twoDepth[j].menuNm,	 // 메뉴명
							url : twoDepth[j].menuUrl ,	 // 메뉴별 URL
							ictnSq : twoDepth[j].ictnSq, // 우선순위
							focus : ''					 // Focus
					};

					var tempThreeArr = [];
					for ( var k = 0; k < threeDepth.length; k++) {

						// 2depth의 ID와 3depth의 상위 객체가 동일한 경우에 진행
						if(twoDepth[j].menuId == threeDepth[k].sppoMenuId) {

							var tempThree = {
									id : threeDepth[k].menuId,		// 메뉴 id
									menu : threeDepth[k].menuNm,	// 메뉴명
									url : threeDepth[k].menuUrl,    // 메뉴별 URL
									ictnSq : threeDepth[k].ictnSq,  // 우선순위
									focus : ''						// Focus
							};

							tempThreeArr.push(tempThree);

						}
					} //end for

					tempThreeArr.sort(function(a, b){
					    var a1= util.Number(a.ictnSq), b1= util.Number(b.ictnSq);
					    if(a1== b1) return 0;
					    return a1> b1? 1: -1;
					});

					// 생성한 3depth의 객체를 2depth 객체에 삽입
					tempTwo.depth3 = tempThreeArr;
					tempTwoArr.push(tempTwo);

				}

			} // end for

			tempTwoArr.sort(function(a, b){
			    var a1= util.Number(a.ictnSq), b1= util.Number(b.ictnSq);
			    if(a1== b1) return 0;
			    return a1> b1? 1: -1;
			});

			// 생성한 2depth의 객체를 1depth 객체에 삽입
			tempOne.depth2 = tempTwoArr;
			gnb_data.resultData.push(tempOne);

		} // end for

		gnb_data.resultData.sort(function(a, b){
		    var a1= util.Number(a.ictnSq), b1= util.Number(b.ictnSq);
		    if(a1== b1) return 0;
		    return a1> b1? 1: -1;
		});


		//현재 활성화된 화면을 조회하여 active 값 전달
		var curActiveObj = JSON.search( gnb_data, '//*[id="'+curId+'"]' )[0];

		/**
		 *  현재url과 gnb ID와 매핑된 curActiveObj 값이 있는경우
		 */
		if (!util.isNull(curActiveObj)) {

			sessionStorage.setItem('curActiveID', curId);
			curActiveObj.focus = 'active';

		/**
		 * curActiveObj 값이 없지만( 화면ID != gnbID ), 화면아이디가 아래와 같은경우
		 */
		// sns 공유된 이벤트 클릭하여 온 상세화면일경우, 이벤트 gnb에 active 걸어줌
		} else if ( curId == 'MWCC099S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWLS210S1"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		// 상품 전체 10종
		}else if ( curId == 'MWPD110S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_dth1"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD210S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_dth2"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD310S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_pns1"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD410S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_pns2"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD510S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_cld1"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD610S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_cld2"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD710S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_pns3"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD810S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_hel1"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPD910S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_hel2"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPE300S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_dth4"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if ( curId == 'MWPE400S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_dth3"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		// 청약철회/결제취소 메뉴
		} else if ( curId == 'MWMR210S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWMR210S2"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}

		// 입원
		} else if ( curId == 'MWPE500S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_hel4"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}

		// 수술
		} else if ( curId == 'MWPE600S1') {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPD_hel5"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		} else if (curId == 'MWPM100S1' || curId == 'MWPM105S1' || curId == 'MWPM110S1' ||
					  curId == 'MWPM113S1' || curId == 'MWPM115S1' || curId == 'MWPM130S1') {//리얼 플래너
			var ssActiveObj = JSON.search( gnb_data, '//*[id="MWPM100S2"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				sessionStorage.setItem('curActiveID', curId);
				ssActiveObj.focus = 'active';
			}
		}else if(curId == "MWMC000S1"){

			//처리 안함


		/**
		 * 화면 gnb 메뉴가 아닌 부속메뉴일경우 이전 세션스토리지에 있던 url로 active 처리
		 * ( ex : 가입후기 상세, 이벤트 상세, 공지사항 상세 등)
		 */
		} else {
			var ssActiveObj = JSON.search( gnb_data, '//*[id="'+sessionStorage.getItem('curActiveID')+'"]' )[0];
			if (!util.isNull(ssActiveObj)) {
				ssActiveObj.focus = 'active';
			}
		}


		// 15.07.02 김재성 추가 gnb 메뉴중 건강검진제출화면이 2줄로 바뀌면서 class 추가
		var ssActiveObj = JSON.search( gnb_data, '//*[id="MWCT300S1"]' )[0];
		ssActiveObj.focus += ' line2';

		// 생성한 데이터를 기준으로 GNB 생성
		if($('#gnb_wrap').length) {
			var type = '';
			if(MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
				type = 'web';
			} else {
				type = 'app';
			}
			GNB.gnbMaker(gnb_data, type);


			//지문인증 안내페이지 숨김처리
			$("#gnb_wrap a[href*='/contact/ct/MWCT250S1.dev']").closest("li.depth3").hide();
		}

		/*
		 * NOTE : 배너제외로 인한 주석 처리. 김종철 2015-03-19

		//배너 정보 가져오기
		if(util.isNull(globalVar.getParam('banrInfo'))){
			// 배너 정보를 획득하지 못하였습니다.
			return;
		}

		// 서버에서 전달 받은 배너 DATA
		var banrData = util.clone(JSON.parse(globalVar.getParam('banrInfo')));

		//기존에 있던 배너 삭제
		$('#sider_wrap > ul >li').remove();

		for(key in banrData) {

			var banrCd = banrData[key].banrCd;
			var banrText = util.setHtmlParsing(banrData[key].banrText);
			//관리자 > 배너관리 > 배너URL명 데이터를 불러온다
			var banrUrlNm = window.location.origin + util.replaceAll(banrData[key].banrUrlNm,'&amp;','&');

			$('#sider_wrap > ul').append('<li id=\"' + banrCd + '\" onClick=\"PageUtil.openPopup({location : \'url\', url : \'' + banrUrlNm + '\'});\">' + banrText + '</li>');
		}*/


	};

	/**
	 * 에러 발생시 에러 페이지로 이동
	 */
	_public.checkErrorPage = function(){

		// 에러 발생시 에러 페이지로 이동
    	if(!util.isNull(window['_ERROR_CODE_']) && window['_ERROR_CODE_'] === null) {
			var path = '/common/cc/ErrorPageThrowable';
			var paramObj = {
					'_ERROR_CODE_' : _ERROR_CODE_,
					'_ERROR_MESSAGE_' : _ERROR_MESSAGE_
			};
			PageUtil.movePage(path, paramObj);
			return false;
    	} else {
    		return true;
    	}

	};

	/**
	 * 다른 브라우저를 실행하도록 한다.
	 */
	_private.execCommonBrowser = function() {
		var location = window.location;
    	var newURL = location.host+location.pathname+location.search;
    	var intent = "intent://"+newURL+"#Intent;scheme=https;action=android.intent.action.VIEW;end;";
    	alert('원활한 서비스 이용을 위해\n 네이버앱 대신 인터넷 또는 크롬 브라우저를 실행하시기 바랍니다.');
    	location.href = intent;
	};

	/**
	 * Query String 값을 JSON 객체로 변환
	 */
	_private.getUrlParams = function() {
		var pairs = location.search.slice(1).split('&');
		var result = {};
		pairs.forEach(function(pair) {
		    pair = pair.split('=');
		    result[pair[0]] = decodeURIComponent(pair[1] || '');
		});
		return result;
	};

	/**
	 * 안드로이드 네이버 앱프리 문제로 인한 다른 브라우저 실행해도 되는지 체크 함수
	 */
	_public.checkOnceAnotherBrowser = function() {
    	var location = window.location;
    	//한번 재실행했는지 체크
    	if(location.search.indexOf('&anotherApp=Y') > -1) {
    		return true;
    	}
    	else if(location.search.indexOf('&clpOrgno=WMF') > -1) {
    		return true;
    	}
    	else {
    		return false;
    	}
	};

	/**
	 * 안드로이드 네이버 앱프리 문제로 인한 다른 브라우저 실행하도록 하는 함수
	 */
	_public.execAnotherBrowser = function(params){
    	var location = window.location;
    	var queryValues = {};
    	if(globalVar.getParam('inSData').inflow =="XX") {
    		var ua = navigator.userAgent;

    	    if(MXP_PLUGIN.isAndroid() && (ua.indexOf('NAVER') > -1))
    	    {
    	    	//kw,src를 제외하고 params값 재구성
    	    	queryValues = _private.getUrlParams();
    	    	var changeQueryString = '';
    	    	var index = 0;
    	    	for(key in queryValues) {
    	    	    if(key.indexOf('src') == -1 &&  key.indexOf('kw') == -1) {
        	    		if(index !=0) {
        	    			changeQueryString = changeQueryString + '&';
        	    		}
    	    	    	changeQueryString = changeQueryString+key+"="+queryValues[key];
    	    	    }
    	    	    index++;
    	    	}
    	    	var search = '?'+changeQueryString+params;
    	    	var newURL = location.host+location.pathname+search;
    	    	var intent = "intent://"+newURL+"#Intent;scheme=https;action=android.intent.action.VIEW;end;";
            	location.href = intent;
            }
    	}
	};

	/**
	 * 안드로이드 다음 > 앱프리 문제로 인해 다른 브라우저 실행하도록 한다
	 * 안드로이드 FaceBook > V3 문제로 인해 다른 브라우저 실행하도록 한다.
	 */
	_public.execBrowserForDaumFacebook = function(){
		var ua = navigator.userAgent;

		if (ua.indexOf('NAVER') > -1) {
			_private.execCommonBrowser();
		}
	};


	/**
	 * 일반 지문등록으로 로그인하여 페이지이동 가능여부 체크
	 */
	_public.checkAccessCommonFplogin = function(url) {
			/**
			 * menuId(accessPage Url) : true(보안지문등록만 허용), false(일반지문등록도 허용)
			 */
		var menuIdObj = {
			'MWMA210S1' : true,	//  마이페이지 > 계약변경 > 보험료감액 > 계좌 선택
			'MWMA310S1' : true, //  마이페이지 > 계약변경 > 보험기간/납입기간 > 계좌 선택
			'MWMA400S1' : true, //  마이페이지 > 계약변경 > 연금개시나이 > 변경정보 입력
			'MWMA501S1' : true, //  마이페이지 > 계약변경 > 흡연체/비흡연체변경 > 변경정보 입력
			'MWMA700S1' : true, //  마이페이지 > 계약변경 > 연금수령방법변경 > 변경정보 입력
			'MWMA810S1' : true, //  마이페이지 > 계약변경 > 자녀등재신청 > 계좌 선택
			'MWMI120S1' : true, //  마이페이지 > 보험료납입 > 자동이체계좌변경 > 정보확인/계좌선택
			'MWMI220S1' : true, //  마이페이지 > 보험료납입 > 보험료즉시납입 > 정보확인/계좌선택
			'MWMI330S1' : true, //  마이페이지 > 보험료납입 > 보험료추가납입 > 정보확인/계좌선택
			'MWML120S1' : true, //  마이페이지 > 보험계약대출 > 보험계약대출조회/상환 > 정보확인/계좌선택
			'MWML240S1' : true, //  마이페이지 > 보험계약대출 > 보험계약대출신청 > 정보확인/계좌선택
			'MWML420S1' : true, //  마이페이지 > 보험계약대출 > 이자납입자동이체계좌변경 > 정보확인/계좌선택
			'MWMM220S1' : true, //  마이페이지 > 내정보수정 > 마이페이지 > 내정보수정 > 출금이체동의철회신청 > 출금이체동의철회신청상세   출금이체동의철회신청시 공인인증 확인
			'MWMM310S1' : true, //  마이페이지 > 내정보수정 > 마이페이지 > 내정보수정 > 마케팅메일수신변경   마케팅메일수신변경시 공인인증 확인
			'MWMM420S1' : true, //  마이페이지 > 내정보수정 > 마이페이지 > 내정보수정 > ARS비밀번호관리 > 2단계_본인인증 > 휴대전화인증/신용카드인증    ARS비밀번호 등록/재등록/변경시 공인인증 확인
			'MWMO150S1' : true, //  마이페이지 > 보험금신청 > 보험금신청하기 > 5단계_서류첨부 > 보험금신청5단계   보험금 신청시 공인인증 확인
			'MWMO250S1' : true,	//  마이페이지 > 보험금신청 > 중도인출 > 5단계_본인인증 > 휴대전화인증/신용카드인증 보험금 중도인출시 공인인증 확인
			'MWMO350S1' : true, //  마이페이지 > 보험금신청 > 연금수령 > 3단계_본인인증 > 휴대전화인증/신용카드인증 연금수령 3단계 공인인증 확인
			'MWMO420S1' : true, //  마이페이지 > 보험금신청 > 연금자동송금관리 > 연금자동송금신청/변경 > 연금자동송금신청/변경    연금자동송금신청/변경시 공인인증 확인
			'MWMO430S1' : true, //  마이페이지 > 보험금신청 > 연금자동송금관리 > 연금자동송금해지 > 연금자동송금해지  연금자동송금해지시 공인인증 확인
			'MWMR330S1' : true  //  마이페이지 > 보험계약철회 > 책임보상신청 > 책임보상신청사유입력 > 책임보상신청상세 책임보상신청시 공인인증 확인
		};
		
		var uri = url.split("/").pop(-1);
		var access = menuIdObj[uri];
		if(access == true) {
			return true;
		}
		else
			return false
	};
	
	/**
	 * 모바일 웹 링크에서 Native App을 실행하기 위한 함수 
	 * @param url : Native App 실행시 이동페이지 페이지 url 
	 */
	_public.execNativeApp  = function (url) {
		MXP_PLUGIN.FireBase.execDeepLink({"LPWebToApp":"Y"}, url);
	};



	return _public;
})();

// 퍼블 팝업 호출후 해당 화면 js를 load 하기 위한 callBack 함수 팝업 공통
var callBackFn = function  (id) {
		
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

	if(util.isNull(id)) {
		path = globalVar.getParam('_CUR_URI').split('.')[0];
	} else {
		path = id.split('.')[0];
	}
	
	
	
	var jsPath	= '';
	var pathArr	= path.split('/');
	for ( var i = 1; i < pathArr.length; i++) {
		
		if (i == 1 && pathArr[i] != 'views' && $.inArray('error', pathArr) < 0) {
			// 에러 페이지가 아닌경우 앞자리가 view가 아닌경우 생성한다.
			jsPath += '/views/'+pathArr[i];
		} else if (i == pathArr.length-1) {
			// path arr의 마지막 자리 앞은 js path 를 추가 한다.
			jsPath += '/js/'+pathArr[i];
		} else {
			// 이외의 경우 url을 생성한다.
			jsPath += '/'+pathArr[i];
		}
		
	}
	jsPath = jsPath + '.js';
	
	PageUtil.loadJavascript(jsPath, {}, 'popupId');
	
};