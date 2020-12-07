/* ============================================================================
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * DESCRIPTION : SNS 연동 모듈
 * ============================================================================*/

/**
 * 클라이언트의 각종 설정 값들의 집합
 */
var SNS = (function() {
	var _public = {};
	var _private = {};
	
	// KAKAO 등록 인증 KEY
	_private.KAKAO_APP_KEY  = '2c4ad873648ad1445cf45361ddb81176'; // 임시키
	
	// KAKAO 링크 주소
	_private.KAKAO_LINK_URL = '' + window.location.host; // 임시 주소

	//화면에서 받는 parmaeter
	_private.curID = ''; 
	_private.type = '';
	_private.stringObj = {};
	_private.dataObj = {};
	
	//받아온 data로 가공한 data
	_private.queryString = '';
	_private.ogUrl = '';
	_private.ogImg = '';
	_private.iosAppstoreUrl = null;
	
	
	/**
	 * SNS연동 매개변수 획득

	 * 공유 타입에 따라 이벤트 바인딩을 조정한다.
	 * - product 	: 상품
	 * - webtoon 	: 웹툰
	 * - event 		: 이벤트
	 * - epilogue 	: 가입후기
	 */
	_public.initParam = function(id, type, stringObj , dataObj) {
		
		_private.curID = id;
		_private.type = type;
		_private.queryString = '';
		
		// 1.url 및 링크텍스트, 버튼 텍스트 문자열 가져오기
		_private.stringObj = stringObj;
		
		// 2.데이터 가져오기
		if ( dataObj != undefined) {
			_private.dataObj = dataObj;
		}
		
		//랜딩페이지 최종 url
		var path = _private.stringObj.path;
		var origin = window.location.origin;
		var landUrl = origin + path;
		
		if(_private.doesPathHaveOrigin(path)) {
			origin = _private.getOrigin(path);
			landUrl = path;
		}
		
		$.extend(_private.stringObj, {
			origin  : origin,
			landUrl : landUrl
		});
		
		//화면에서 데이터 받아서 이벤트 바인딩
		if(_private.type == 'product') {
			_private.getProductUrlData();
		} else {
			SNS.initSNS();
		}
	};
	
	/**
	 * SNS INIT
	 */
	_public.initSNS = function() {
		
		//크롤링을 위한 메타 태그 동적 삽입
		//넘겨받은 data 쿼리스트링
		for (var key in _private.dataObj) {
			_private.queryString += key + '=' + _private.dataObj[key] + '&';
		}
		
		_private.queryString = _private.queryString.substring(0, _private.queryString.length-1);
		
		//크롤링을 위한 메타 태그 동적 삽입
		_private.ogImg = 'https://www.lifeplanet.co.kr' + _private.stringObj.imgUrl;
		_private.ogUrl = _private.stringObj.landUrl
		
		var queryString = _private.queryString || '';
		if(queryString !== '') {
			_private.ogUrl += '?' + queryString;
		}
		
		var	ogtitle = _private.stringObj.postKakaoStory;
	    var	ogdesc = _private.stringObj.titleKakaoStory;
		
		// 카카오 API Init
		_public.kakaoInit();
		// 카카오톡 셋팅
		_public.kakaotalkSetting();
		// 카카오스토리 셋팅
		_public.kakaostorySetting();
		// 페이스북 셋팅
		_public.facebookSetting();
		// 라인 셋팅
		_public.lineSetting();
		// 밴드 셋팅
		_public.bandSetting();
		// sms 셋팅
		_public.smsSetting();
		// 이메일 셋팅
		_public.emailSetting();
		
	};
	
	/**
	 * KAKAO 링크 연동을 위한 INIT
	 */
	_public.kakaoInit = function() {
		// 인증 키를 이용하여 생성
		if(sessionStorage.getItem('kakaoInit') == 'true'){
			sessionStorage.setItem('kakaoInit', false);
			Kakao.cleanup();
		}
		
		Kakao.init(_private.KAKAO_APP_KEY);
		sessionStorage.setItem('kakaoInit', true);
	};
	
	/**
	 * Kakaotalk 링크 연동
	 */
	_public.kakaotalkSetting = function() {
		
		if( _private.stringObj.snsId == 'snsKakaotalk') {
			
			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC){
				message.alert('COM111');
			} else {
				_private.kakaotalkAction();
			}
			
		} 
		
		// SNS 버튼에 Action 바인딩
		
		$('#'+_private.curID+' > #snsKakaotalk').unbind('click').bind('click', function(){
			
			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC){
				message.alert('COM111');
			} else {
				_private.kakaotalkAction();
			}
			
		});
		
	};
	
	// origin이 포함된 url인지 확인
	_private.doesPathHaveOrigin = function(path) {
		var url = path || '';
		
		if(url.length < 4) {
			return false;
		}
		
		return url.substring(0, 4) === 'http';
	},
	
	// url에서 origin 부분 반환
	_private.getOrigin = function(path) {
		if(!_private.doesPathHaveOrigin(path)) {
			return '';
		}
		
		var protocol = path.substring(0, 'https://'.length);
		
		if(protocol === 'https://') {
			protocol = 'https://';
		} else {
			protocol = 'http://';
		}
		
		var url = path.substring(protocol.length);
		url = (url.indexOf('/') > -1) ? url.substring(0, url.indexOf('/')) : url;
		
		return protocol + url;
	},
	
	/**
	 * Kakaotalk 버튼 클릭시 발생하는 이벤트
	 * @param label
	 * @param imgSrc
	 * @param linkUrl
	 */
	_private.kakaotalkAction = function() {
		var url = '' + _private.ogUrl;
		var title = '' + _private.stringObj.label;
		var description = _private.stringObj.description;
		var imgPath = _private.ogImg;
		
		Kakao.Link.sendDefault({
			objectType : 'feed',
			content : {
				title : title,
				description : description,
				imageUrl : imgPath,
				link : {
					mobileWebUrl : url,
					webUrl : url
				}
			},
			buttons : [
				{
					title : '' + _private.stringObj.webButton,
					link : {
						mobileWebUrl : url,
						webUrl : url
					}
				}
			]
		});
	};
	
	/**
	 * Kakaostory 링크 연동
	 * @param label
	 * @param imgSrc
	 * @param linkUrl
	 */
	_public.kakaostorySetting = function() {
		
		if( _private.stringObj.snsId == 'snsKakaostory') {
			
			_private.kakaostoryAction();
			return;
		}
		
		// SNS 버튼에 Action 바인딩
		$('#'+_private.curID+' > #snsKakaostory').unbind('click').bind('click', function(){
			
			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC){
				message.alert('COM111');
			} else {
				_private.kakaostoryAction();
			}
			
		});
		
	};
	
	/**
	 * Kakaostory 버튼 클릭시 발생하는 이벤트
	 * @param label
	 * @param imgSrc
	 * @param linkUrl
	 */
	_private.kakaostoryAction = function() {
		
		/**
		 * NOTE: 카카오스토리 공유를 위해 홈페이지 URL 사용
		 * 		 카카오스토리는 80, 443 포트만 지원하기 때문에 446 포트를 사용
		 *       하는 모바일URL은 업로드 불가능. 따라서 홈페이지로 대체 한다.
		 */
		kakao.link('story').send({
			post : '' + _private.stringObj.postKakaoStory + '\n' + _private.ogUrl, // 포스팅할 링크 주소
			appid : _private.KAKAO_LINK_URL, // 사이트 도메인
			appver : '1.0', // 고정값
			appname : 'm.lifeplanet.co.kr', // 사이트의 정확한 이름
			urlinfo : JSON.stringify({
				title: '' + _private.stringObj.titleKakaoStory, // 스크랩 형태에 표시되는 제목
				desc: '' ,  //설명
				imageurl:['' + _private.ogImg], // 대표이미지 URL 
				type:'website'
			})
		});
	};
	/**
	 * 링크 복사
	 * @param textCopy
	 */
	_public.linkCopy = function (textCopy) {
		_public.copyToClipboard(textCopy);
	}
	
	/**
	 * 클립보드 복사
	 * @param customUrl
	 */
	_public.copyToClipboard = function (textCopy) {
		
		var range, selection, copyTxt;
        var el = document.createElement("input");
        el.setAttribute("type","text");
        el.setAttribute("id","urlCopyInput");
        el.setAttribute("value", textCopy);
        el.setAttribute("readonly", "readonly");

        if(MXP_PLUGIN.isIOS()){
            document.body.prepend(el);
            range = document.createRange();
            range.selectNodeContents(el);
            selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            el.setSelectionRange(0,999999);
        }else{
        	document.body.appendChild(el);
        	copyTxt = document.getElementById('urlCopyInput');

            copyTxt.select();

        }
        document.execCommand("copy");
        el.remove();
	};
	/**
	 * 페이스북 연동
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.facebookSetting = function(label, imsSrc, linkUrl) {
		
		if( _private.stringObj.snsId == 'snsFacebook') {
			
			_private.facebookAction();
			return;
		}
		
		// SNS 버튼에 Action 바인딩
		$('#'+_private.curID+' > #snsFacebook').unbind('click').bind('click', function(){
			_private.facebookAction();
		});
		
	};
	
	/**
	 * 페이스북 연결 셋팅 
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_private.facebookAction = function() {
		
		var url  = _private.ogUrl;
		var title = '';
		
		_private.snsAction('facebook', url, title);
	};
	
	/**
	 * 라인 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.lineSetting = function() {
		
		var _br  = encodeURIComponent('\r\n');
		
		if( _private.stringObj.snsId == 'snsLine') {
			
			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC){
				message.alert('COM111');
			} else {
				
				var shareText = '[ ' + _private.stringObj.shareTextLine + ' ]' + '\n' + _private.ogUrl;
				_private.snsAction('line', _private.KAKAO_LINK_URL, shareText);
			}
			
		}
		
		// SNS 버튼에 Action 바인딩
		$('#'+_private.curID+' > #snsLine').unbind('click').bind('click', function(){
			
			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC){
				message.alert('COM111');
			} else {
				
				var shareText = '[ ' + _private.stringObj.shareTextLine + ' ]' + '\n' + _private.ogUrl;
				_private.snsAction('line', _private.KAKAO_LINK_URL, shareText);
			}
			
		});
		
	};
	
	/**
	 * 밴드 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.bandSetting = function() {
		
		if( _private.stringObj.snsId == 'snsBand') {

			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC){
				message.alert('COM111');
			} else {
				_private.snsAction('band', _private.ogUrl, _private.stringObj.textBand);
			}
			
		}
		
		// SNS 버튼에 Action 바인딩
		$('#'+_private.curID+' > #snsBand').unbind('click').bind('click', function(){

			if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.WEB_PC){
				message.alert('COM111');
			} else {
				_private.snsAction('band', _private.ogUrl, _private.stringObj.textBand);
			}
			
		});
		
	};
	
	_private.snsAction = function(sns, url, txt) {
		
		var o;    
		var _url = encodeURIComponent(url);    
		var _txt = encodeURIComponent(txt);    
		var _br  = encodeURIComponent('\r\n');
	    var install_appBlock = (function() {
	    	return function() {
	    		location.href = _private.iosAppstoreUrl;
	    	};
         })();
		
		switch(sns)    {       
			case 'facebook':            
				o = {                
					method:'popup',                
					url:'http://www.facebook.com/sharer/sharer.php?u=' + _url             
				};            
				break;                 
	    
			case 'band': 
				o = {                
					method:'web2app',                
					param:'create/post?text=' + _txt + _br + _url + '&route=' + 'm.lifeplanet.co.kr'    ,                
					a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',                
					g_store:'market://details?id=com.nhn.android.band',                
					a_proto:'bandapp://',                
					g_proto:'scheme=bandapp;package=com.nhn.android.band',   
					g_package:'package=com.nhn.android.band'   
				};            
				break;         

			case 'line': 
				o = {                
					method:'web2app',                
					param:'msg/text/'+_txt,                
					a_store:'itms-apps://itunes.apple.com/kr/app/lain-line/id443904275?mt=8',         
					g_store:'market://details?id=jp.naver.line.android',                
					a_proto:'line://',                
					g_proto:'scheme=line;package=jp.naver.line.android',            
					g_package:'package=jp.naver.line.android'            
			};            
				break;         
			default:            
				message.alert('COM112');
				return false;    
		}     
		switch(o.method)    {        
			case 'popup':       
				var inflow = globalVar.getParam('inSData').inflow || '';
				
				if(inflow === 'QH') { // 카카오페이 보장분석 유입
					var facebookUrl = encodeURIComponent('http://www.facebook.com/sharer/sharer.php?u=' + url);
					
					if(WAVE && WAVE.Interface) {
						WAVE.Interface.openExternalWebview(facebookUrl);
					} else {
						console.error("WAVE hasn't loaded");
					}
					
					break;
				}else if(inflow == "QI"){
					var facebookUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + url;
					$.nativeCall('openExBrowser', [facebookUrl]);
					break;
				}
				
				PageUtil.openPopup({
					location : 'url',
					url : o.url
				});
				
				break;         
			case 'web2app':            
				if(navigator.userAgent.match(/android/i)) {
					// Android 
					setTimeout(function(){ 
						
//						if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_ANDROID) {
//							var url = 'intent:' + o.a_proto + o.param + '#Intent;' + o.g_package + ';end;';
//							MXP_PLUGIN.urlOpen(url);
//							
//						} else {
//							location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end';
//						}
						location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end';
						
					}, 100);            
				}            
				else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)) {
					// Apple              
					if (MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS) { // App인 경우 
						location.href =	o.a_proto+o.param;
						
					}
					else {
		                var timer = setTimeout(install_appBlock, 2000);
		                window.addEventListener('pagehide', _private.clearTimer(timer));
		                _private.iosAppstoreUrl = o.a_store;
		                location.href = o.a_proto + o.param;
					}
					//setTimeout(function(){ location.href = o.a_store; }, 200);                          
					//setTimeout(function(){ location.href = o.a_proto + o.param; }, 100);            
				}            
				else {                
					message.alert('COM111');
				}            
				break;    
		}
		
	};
	
	/**
	 * SMS 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.smsSetting = function() {
		
		if( _private.stringObj.snsId == 'snsSMS') {
			
			//sms 공유 팝업창 띄우기
			var paramObj = new Object();
			paramObj.goodNm =_private.stringObj.goodNm;
			paramObj.url =_private.stringObj.landUrl;

			var url = '/products/pg/PG01111P.dev';
			fo.global.commonFn.callPopup(url, callBackFn, paramObj);	    // 파라미터가 있는경우			

			return;
		}
		
		// SNS 버튼에 Action 바인딩
		$('#'+_private.curID+' > #snsSMS').unbind('click').bind('click', function(){
			
			//sms 공유 팝업창 띄우기
			var paramObj = new Object();
			paramObj.goodNm =_private.stringObj.goodNm;
			paramObj.url =_private.stringObj.landUrl;

			var url = '/products/pg/PG01111P.dev';
			fo.global.commonFn.callPopup(url, callBackFn, paramObj);	    // 파라미터가 있는경우			

			return;
		});
		
	};
	
	/**
	 * 이메일 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.emailSetting = function() {
		
		if( _private.stringObj.snsId == 'snsEmail') {
			
			var plnInfo = _private.plnInfoSetting();
			
			var paramObj = new Object();
			paramObj.plnInfo = plnInfo;

			var url = '/products/pg/PG01110P.dev';
			fo.global.commonFn.callPopup(url, callBackFn, paramObj);	    // 파라미터가 있는경우
			return;
		
		}
		
		// 이메일 버튼에 Action 바인딩
		$('#'+_private.curID+' > #snsEmail').unbind('click').bind('click', function(){
			
			var plnInfo = _private.plnInfoSetting();
			
			var paramObj = new Object();
			paramObj.plnInfo = plnInfo;

			var url = '/products/pg/PG01110P.dev';
			fo.global.commonFn.callPopup(url, callBackFn, paramObj);	    // 파라미터가 있는경우
			return;
			
		});
		
	};
	
	/**
	 * Kakao Plus 실행 
	 * @param scheme
	 * @param customUrl
	 * @param packageName
	 * @param appStoreUrl
	 */
	_public.kakaoPlusOpen = function (scheme, customUrl, packageName) {	
		var intentUrl = "intent://" + customUrl + "#Intent;scheme=" + scheme + ";package=" + packageName + ";end";
		var appStoreUrl = "https://itunes.apple.com/kr/app/kakaotog-kakaotalk/id362057947";
		var customScheme = scheme + "://" + customUrl;
		if(MXP_PLUGIN.isAndroid()) {
			window.location = intentUrl;
		} else {
			var clickedAt = +new Date;
		    var talkInstCheckTimer = setTimeout(function() {
		    	if (+new Date - clickedAt < 2000) {
		    		window.location = appStoreUrl;
		    	}
		    }, 1500);
		    window.location = customScheme;
		} 
	};
	
	/**
	 * 가입설계서 정보 세팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_private.plnInfoSetting = function() {

		var gvObjImsiSaveData = new Object();

		// 설계정보 array
		var arr_plnInfo = new Array();
		var plnInfo_Data = new Object();

		// 보정정보 array
		var arr_intyInfo = new Array();
		var intyInfo_Data = new Object();

		// 장바구니정보 array
		var arr_spbInfo = new Array();
		var spbInfo_Data = new Object();

		// 청약연금 array
		var arr_sucoAnnPrt = new Array();
		var sucoAnnPrt_Data = new Object();

		// 청약관계자 array
		var arr_sucoInpa = new Array();
		var sucoInpa_Data = new Object();
		
		// 장바구니정보 설정
		spbInfo_Data = new Object();
		spbInfo_Data.spbSq = $('#hidden_input').find('#spb_spbSq').val();		// 장바구니순번
		spbInfo_Data.encrHndTphno = $('#hidden_input').find('#spb_encrHndTphno').val();		// 암호화휴대전화번호
		arr_spbInfo.push(spbInfo_Data);
		gvObjImsiSaveData.spbInfo = arr_spbInfo;

		// 설계정보 설정
		plnInfo_Data = new Object();

		var entAmt = $('#hidden_input').find('#spb_insEntAmt').val();
		var insAmt01 = parseInt(parseInt(entAmt,10)/100000000,10)*100000000;							// 보험금액01(억단위금액)
		var insAmt02 = (parseInt(entAmt,10) - parseInt(parseInt(entAmt,10)/100000000,10)*100000000);	// 보험금액02(천만이하금액만)
		var plhdAssrSameYn = "",
			goalAnnAmt = "",
			rlpmPeri = "",
			pmtpdTypeCd = "",
			pmtpdScVal = "";

		if ( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "42" || $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "32" ) {
			plhdAssrSameYn = "N";		// 계약자피보험자동일여부
		} else {
			plhdAssrSameYn = $('#hidden_input').find('#spb_plhdAssrSameYn').val();	// 계약자피보험자동일여부
		}

		if( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "21" && $('#hidden_input').find('#spb_goalAnnEstYn').val() == "N" ) {
			goalAnnAmt = $('#hidden_input').find('#spb_acpFrcsAnnAmt').val();		// 수령예상연금금액
		} else {
			goalAnnAmt = $('#hidden_input').find('#spb_goalAnnAmt').val();			// 목표연금금액
		}

		// 연금보험일경우 실납입기간과 납입기간구분값은 연금개시시점으로 설정, 납입기간유형코드는 무조건 02:세납으로 설정
		if( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "21" || $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "31" ){
			rlpmPeri = $('#hidden_input').find('#spb_annOpnnAge').val();		// 실납입기간(년단위)
			pmtpdTypeCd = "02";	// 납입기간유형코드 (00:일시납,01:년납,02:세납,09:종신납)
			pmtpdScVal = $('#hidden_input').find('#spb_annOpnnAge').val();  // 납입기간구분값
		} else {
			rlpmPeri = $('#hidden_input').find('#spb_rlpmPeri').val();		// 납입기간구분값
			pmtpdTypeCd = $('#hidden_input').find('#spb_pmtpdTypeCd').val();	// 납입기간유형코드 (00:일시납,01:년납,02:세납,09:종신납)
			pmtpdScVal = $('#hidden_input').find('#spb_rlpmPeri').val();		// 납입기간구분값
		}

		plnInfo_Data.nwcReiScCd        = $('#hidden_input').find('#spb_nwcReiScCd').val();			//신계약부활구분코드
		plnInfo_Data.entPlnno          = $('#hidden_input').find('#spb_entPlnno').val();			//가입설계번호
		plnInfo_Data.prSspno           = $('#hidden_input').find('#spb_prSspno').val();				//선청약번호
		plnInfo_Data.sspno             = $('#hidden_input').find('#spb_sspno').val();				//청약번호
		plnInfo_Data.insConno          = $('#hidden_input').find('#spb_insConno').val();			//보험계약번호
		plnInfo_Data.goodCd            = $('#hidden_input').find('#spb_goodCd').val();				//상품코드
		plnInfo_Data.goodNm            = _private.stringObj.goodNm,											//상품명
		plnInfo_Data.goodAbrNm         = $('#hidden_input').find('#spb_goodAbrNm').val();			//상품약어명
		plnInfo_Data.sucoPgrsStagCd    = $('#hidden_input').find('#spb_sucoPgrsStagCd').val();		//청약진행단계코드
		plnInfo_Data.goodplanCd        = $('#hidden_input').find('#spb_goodplanCd').val();      	//상품플랜코드
		plnInfo_Data.insSbsnGoodSmclCd = $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val();	//보험영업상품소분류코드
		plnInfo_Data.plhdAssrSameYn    = plhdAssrSameYn;											//계약자피보험자동일여부
		plnInfo_Data.plnnrBrdt         = $('#hidden_input').find('#spb_plnnrBrdt').val();          	//설계자생년월일
		plnInfo_Data.plnnrInsAge       = $('#hidden_input').find('#spb_plnnrInsAge').val();			//설계자보험나이
		plnInfo_Data.plnnrGndrCd       = $('#hidden_input').find('#spb_plnnrGndrCd').val();			//설계자성별코드
		plnInfo_Data.smokYn            = $('#hidden_input').find('#spb_smokYn').val();				//흡연여부
		plnInfo_Data.chldBrdt          = $('#hidden_input').find('#spb_chldBrdt').val();			//자녀생년월일
		plnInfo_Data.chldInsAge        = $('#hidden_input').find('#spb_chldInsAge').val();          //자녀보험나이
		plnInfo_Data.chldGndrCd        = $('#hidden_input').find('#spb_chldGndrCd').val();          //자녀성별코드
		plnInfo_Data.fetaYn            = $('#hidden_input').find('#spb_fetaYn').val();				//태아여부
		plnInfo_Data.slctInsCd         = $('#hidden_input').find('#spb_slctInsCd').val();			//선택보험코드
		plnInfo_Data.insEntAmt         = $('#hidden_input').find('#spb_insEntAmt').val();			//보험가입금액
		plnInfo_Data.annOpnnAge        = $('#hidden_input').find('#spb_annOpnnAge').val();			//연금개시나이
		plnInfo_Data.goalAnnEstYn      = $('#hidden_input').find('#spb_goalAnnEstYn').val();		//목표연금설정여부
		plnInfo_Data.goalAnnAmt        = goalAnnAmt;          										//목표연금금액
		plnInfo_Data.goalPmtPeri       = $('#hidden_input').find('#spb_goalPmtPeri').val();			//목표납입기간
		plnInfo_Data.goalMmPrm         = $('#hidden_input').find('#spb_goalMmPrm').val();			//목표월보험료
		plnInfo_Data.prmPmtExcTrtyEntYn= $('#hidden_input').find('#spb_prmPmtExcTrtyEntYn').val();	//보험료납입면제특약가입여부
		plnInfo_Data.cllgRgiExpn       = $('#hidden_input').find('#spb_cllgRgiExpn').val();			//대학등록비용
		plnInfo_Data.elscEduExpn       = $('#hidden_input').find('#spb_elscEduExpn').val();			//초등학교육비용
		plnInfo_Data.mdscEduExpn       = $('#hidden_input').find('#spb_mdscEduExpn').val();			//중학교교육비용
		plnInfo_Data.hgscEduExpn       = $('#hidden_input').find('#spb_hgscEduExpn').val();			//고등학교교육비용
		plnInfo_Data.saRsrExpnWtrAge   = $('#hidden_input').find('#spb_saRsrExpnWtrAge').val();		//유학준비비용인출나이
		plnInfo_Data.saRsrExpn         = $('#hidden_input').find('#spb_saRsrExpn').val();			//유학준비비용
		plnInfo_Data.siGoExpn          = $('#hidden_input').find('#spb_siGoExpn').val();			//사회진출비용
		plnInfo_Data.inspd             = $('#hidden_input').find('#spb_rinsPeri').val();			//보험기간
		plnInfo_Data.inspdTypeCd       = $('#hidden_input').find('#spb_inspdTypeCd').val();			//보험기간유형코드
		plnInfo_Data.pmtCyclCd         = $('#hidden_input').find('#spb_pmtCyclCd').val();			//납입주기코드
		plnInfo_Data.inspdScVal        = $('#hidden_input').find('#spb_rinsPeri').val();			//보험기간구분값
		plnInfo_Data.insAmt01          = insAmt01;													//보험금액01
		plnInfo_Data.insAmt02          = insAmt02;													//보험금액02
		plnInfo_Data.pmtpdScVal        = pmtpdScVal;												//납입기간구분값
		plnInfo_Data.pmtpdTypeCd       = pmtpdTypeCd;												//납입기간유형코드
		plnInfo_Data.rlpmPrm           = $('#hidden_input').find('#spb_sumPrm').val();				//실납입보험료
		plnInfo_Data.rinsPeri          = $('#hidden_input').find('#spb_rinsPeri').val();			//실보험기간
		plnInfo_Data.rlpmPeri          = rlpmPeri;													//실납입기간
		plnInfo_Data.mmPrm             = $('#hidden_input').find('#spb_sumPrm').val();				//월보험료
		plnInfo_Data.prm               = $('#hidden_input').find('#spb_sumPrm').val();				//보험료
		plnInfo_Data.sumPrm            = $('#hidden_input').find('#spb_sumPrm').val();				//합계보험료
		plnInfo_Data.eprtRfdrt         = $('#hidden_input').find('#spb_eprtRfdrt').val();			//만기환급율
		plnInfo_Data.eprtRstAmt        = $('#hidden_input').find('#spb_eprtRstAmt').val();			//만기환급금액

		arr_plnInfo.push(plnInfo_Data);
		gvObjImsiSaveData.plnInfo = arr_plnInfo;

		var rinsPeri = "",
			inspdTypeCd = "",
			rlpmPeri = "",
			pmtpdTypeCd = "",
			pmtCyclCd = "";

		// 어린이보장, 에듀케어저축보험 일 경우 보종정보를 별도로 설정한다.
		if( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "42" || $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "32" ){
			var trtyTypeText = [];
			trtyTypeText = $('#hidden_input').find('#spb_trtyTypeText').val().split("|");

			//보종코드, 보종구분코드, 보종명, 가입금액, 보험료, 보험기간, 납입기간
			for ( var i=0 ; i < trtyTypeText.length ; i++ ) {
				var trtyTypeArr = [];
				trtyTypeArr = trtyTypeText[i].split(",");

				intyInfo_Data = new Object();
				intyInfo_Data.intyCd = trtyTypeArr[0];		// 보종코드
				intyInfo_Data.intyScCd = trtyTypeArr[1];	// 보종구분코드
				intyInfo_Data.intyNm = trtyTypeArr[2];		// 보종명
				intyInfo_Data.pltcEntAmt = trtyTypeArr[3];	// 보종별가입금액
				intyInfo_Data.pltcPrm = trtyTypeArr[4];		// 보종별보험료

				// 주계약
				if ( trtyTypeArr[1] == "01" ) {
					rinsPeri = $('#hidden_input').find('#spb_rinsPeri').val();				// 실보험기간
					inspdTypeCd = $('#hidden_input').find('#spb_inspdTypeCd').val();		// 보험기간유형코드
					rlpmPeri = $('#hidden_input').find('#spb_rlpmPeri').val();				// 실납입기간
					pmtpdTypeCd = $('#hidden_input').find('#spb_pmtpdTypeCd').val();		// 납입기간유형코드
					pmtCyclCd = $('#hidden_input').find('#spb_pmtCyclCd').val();			// 납입주기

				// 종속특약 (어린이보장 주산기질환)
				} else if ( trtyTypeArr[1] == "02" ) {
					rinsPeri = trtyTypeArr[5];		// 실보험기간
					inspdTypeCd = "01";				// 보험기간유형코드
					rlpmPeri = trtyTypeArr[6];		// 실납입기간
					pmtpdTypeCd = "01";				// 납입기간유형코드

					if($('#hidden_input').find('#spb_fetaYn').val() == "Y" && $('#hidden_input').find('#spb_pmtCyclCd').val() == "99"){//태아 / 일시납으로 가입시
						pmtCyclCd = "12";			//년납으로(주산기질환입원특약 태아로 가입시)
					}else{
						pmtCyclCd = $('#hidden_input').find('#spb_pmtCyclCd').val();		// 납입주기
					}

				// 독립특약 (어린이저축 보험료납입면제특약)
				} else if ( trtyTypeArr[1] == "03" ) {
					rinsPeri = $('#hidden_input').find('#spb_rlpmPeri').val();				// 실보험기간
					inspdTypeCd = $('#hidden_input').find('#spb_pmtpdTypeCd').val();		// 보험기간유형코드
					rlpmPeri = $('#hidden_input').find('#spb_rlpmPeri').val();				// 실납입기간
					pmtpdTypeCd = $('#hidden_input').find('#spb_pmtpdTypeCd').val();		// 납입기간유형코드
					pmtCyclCd = $('#hidden_input').find('#spb_pmtCyclCd').val();			// 납입주기
				}

				intyInfo_Data.rinsPeri = rinsPeri;				// 실보험기간
				intyInfo_Data.inspdTypeCd = inspdTypeCd;		// 보험기간유형코드
				intyInfo_Data.rlpmPeri = rlpmPeri;				// 실납입기간
				intyInfo_Data.pmtpdTypeCd = pmtpdTypeCd;		// 납입기간유형코드
				intyInfo_Data.pmtCyclCd = pmtCyclCd;			// 납입주기

				arr_intyInfo.push(intyInfo_Data);
			}

		} else {
			intyInfo_Data = new Object();
			intyInfo_Data.intyCd = $('#hidden_input').find('#spb_intyCd').val();			// 보종코드
			intyInfo_Data.intyNm = "";		// 보종명
			intyInfo_Data.intyScCd = $('#hidden_input').find('#spb_intyScCd').val();		// 보종구분코드
			intyInfo_Data.pltcEntAmt = $('#hidden_input').find('#spb_insEntAmt').val();		// 보종별가입금액
			intyInfo_Data.pltcPrm = $('#hidden_input').find('#spb_sumPrm').val();			// 보종별보험료
			intyInfo_Data.rinsPeri = $('#hidden_input').find('#spb_rinsPeri').val();		// 실보험기간
			intyInfo_Data.inspdTypeCd = $('#hidden_input').find('#spb_inspdTypeCd').val();	// 보험기간유형코드

			if( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "21" || $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "31" ){
				intyInfo_Data.rlpmPeri = $('#hidden_input').find('#spb_annOpnnAge').val();	// 실납입기간
				intyInfo_Data.pmtpdTypeCd = "02";												// 납입기간유형코드
			} else {
				intyInfo_Data.rlpmPeri = $('#hidden_input').find('#spb_rlpmPeri').val();		// 실납입기간
				intyInfo_Data.pmtpdTypeCd = $('#hidden_input').find('#spb_pmtpdTypeCd').val();	// 납입기간유형코드
			}
			intyInfo_Data.pmtCyclCd = $('#hidden_input').find('#spb_pmtCyclCd').val();			// 납입주기

			arr_intyInfo.push(intyInfo_Data);
		}
		gvObjImsiSaveData.intyInfo = arr_intyInfo;


		// 청약연금분할 설정
		if($('#hidden_input').find('#spb_whliAnnFmSlctRto').val() != "0" && $('#hidden_input').find('#spb_whliAnnFmSlctRto').val() != ""){

			var annPyPeriCd = "";

			if($('#hidden_input').find('#spb_whliAnnFmSlctCd').val() == "A01" ) {
				annPyPeriCd = "10";
			} else if($('#hidden_input').find('#spb_whliAnnFmSlctCd').val() == "A02" ) {
				annPyPeriCd = "20";
			} else if($('#hidden_input').find('#spb_whliAnnFmSlctCd').val() == "A04" ) {
				annPyPeriCd = "99";
			}

			sucoAnnPrt_Data = new Object();
			sucoAnnPrt_Data.annInsKdCd = $('#hidden_input').find('#spb_whliAnnFmSlctCd').val().substring(0,1);	// 연금보험종류코드
			sucoAnnPrt_Data.annPtrt = $('#hidden_input').find('#spb_whliAnnFmSlctRto').val();					// 연금분할율
			sucoAnnPrt_Data.annPyPeriCd = annPyPeriCd;															// 연금지급기간코드
			sucoAnnPrt_Data.annPyTypeCd = $('#hidden_input').find('#spb_whliAnnFmSlctCd').val();				// 연금지급유형코드
			arr_sucoAnnPrt.push(sucoAnnPrt_Data);
		}
		if($('#hidden_input').find('#spb_crtnAnnFmSlctRto').val() != "0" && $('#hidden_input').find('#spb_crtnAnnFmSlctRto').val() != ""){

			var annPyPeriCd = "";

			if($('#hidden_input').find('#spb_crtnAnnFmSlctCd').val() == "B02" ) {
				annPyPeriCd = "10";
			} else if($('#hidden_input').find('#spb_crtnAnnFmSlctCd').val() == "B04" ) {
				annPyPeriCd = "20";
			} else if($('#hidden_input').find('#spb_crtnAnnFmSlctCd').val() == "B08" ) {
				annPyPeriCd = "99";
			}

			sucoAnnPrt_Data = new Object();
			sucoAnnPrt_Data.annInsKdCd = $('#hidden_input').find('#spb_crtnAnnFmSlctCd').val().substring(0,1);	// 연금보험종류코드
			sucoAnnPrt_Data.annPtrt = $('#hidden_input').find('#spb_crtnAnnFmSlctRto').val();					// 연금분할율
			sucoAnnPrt_Data.annPyPeriCd = annPyPeriCd;															// 연금지급기간코드
			sucoAnnPrt_Data.annPyTypeCd = $('#hidden_input').find('#spb_crtnAnnFmSlctCd').val();				// 연금지급유형코드
			arr_sucoAnnPrt.push(sucoAnnPrt_Data);
		}
		if($('#hidden_input').find('#spb_inhrAnnFmSlctRto').val() != "0" && $('#hidden_input').find('#spb_inhrAnnFmSlctRto').val() != ""){
			sucoAnnPrt_Data = new Object();
			sucoAnnPrt_Data.annInsKdCd = "C";														// 연금보험종류코드
			sucoAnnPrt_Data.annPtrt = $('#hidden_input').find('#spb_inhrAnnFmSlctRto').val();		// 연금분할율
			sucoAnnPrt_Data.annPyPeriCd = "99";		// 연금지급기간코드
			sucoAnnPrt_Data.annPyTypeCd = "C01";	// 연금지급유형코드
			arr_sucoAnnPrt.push(sucoAnnPrt_Data);
		}

		gvObjImsiSaveData.sucoAnnPrt = arr_sucoAnnPrt;

		// 청약관계자 설정
		sucoInpa_Data = new Object();
		
		/////////////////////// 청약관계자 설정 begin
		// 계약자 정보 설정
		var cstSucoRlty = "11";
		var encrPsno = $('#hidden_input').find('#spb_plnnrBrdt').val().substring(2,8) + "" + $('#hidden_input').find('#spb_plnnrGndrCd').val() + "000000";
		
		sucoInpa_Data = new Object();
		sucoInpa_Data.cstSucoRlty = cstSucoRlty;		// 고객청약관계형(계약자)
		sucoInpa_Data.dsgnInpaScCd = "01";				// 설계관계자구분코드(본인)
		sucoInpa_Data.ntnfScCd      = "";				// 내외국인구분코드
		sucoInpa_Data.cstHanNm      = "고객";			// 고객한글명	(어린이보험 2종: 자녀, 그 외: 고객)
		sucoInpa_Data.cstEngNm = "";					// 고객영문명		
		sucoInpa_Data.encrPsno      = encrPsno;			// 암호화주민등록번호		
		sucoInpa_Data.brdt          = $('#hidden_input').find('#spb_plnnrBrdt').val();	// 생년월일
		sucoInpa_Data.insAge        = $('#hidden_input').find('#spb_plnnrInsAge').val();// 보험나이
		sucoInpa_Data.ageScCd = "01";   			// 나이구분코드(보험나이)
		sucoInpa_Data.natiCd        = "";			// 국가코드
		sucoInpa_Data.natiNm        = "";			// 국가명
		// 수익자구분은 법적지정인으로 고정한다.
		sucoInpa_Data.bnfcScCd = "01";	// 수익자구분코드 (01:법적, 02:직접지정)
		sucoInpa_Data.pscn = "0";	// 인원수
		
		arr_sucoInpa.push(sucoInpa_Data);
		
		// 주피보험자 정보 설정
		// 어린이보험이면 종피(41), 그외는 주피(21)
		if ( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "42" || $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "32" ) {
			cstSucoRlty = "21";	// 주피보험자
			sucoInpa_Data = new Object();
			sucoInpa_Data.cstSucoRlty = cstSucoRlty;	// 고객청약관계형(주피보험자)
			sucoInpa_Data.dsgnInpaScCd = "04";			// 설계관계자구분코드(자녀)
			sucoInpa_Data.ntnfScCd      = "";			// 내외국인구분코드
			sucoInpa_Data.cstEngNm = "";				// 고객영문명		
			sucoInpa_Data.insAge        = $('#hidden_input').find('#spb_chldInsAge').val();	// 자녀보험나이
			sucoInpa_Data.ageScCd = "01";				// 나이구분코드(보험나이)
			sucoInpa_Data.natiCd        = "";			// 국가코드
			sucoInpa_Data.natiNm        = "";			// 국가명
			sucoInpa_Data.bnfcScCd = "";				// 수익자구분코드
			sucoInpa_Data.pscn = "";					// 인원수
			
			// 어린이
			if ( $('#hidden_input').find('#spb_fetaYn').val() == "N" ) {
				var encrPsno = $('#hidden_input').find('#spb_chldBrdt').val().substring(2,8) + "" + $('#hidden_input').find('#spb_chldGndrCd').val() + "000000";
				
				sucoInpa_Data.cstHanNm      = "자녀";	// 고객한글명	(어린이보험 2종: 자녀, 그 외: 고객)
				sucoInpa_Data.encrPsno      = encrPsno;	// 암호화주민등록번호
				sucoInpa_Data.brdt          = $('#hidden_input').find('#spb_chldBrdt').val();	// 자녀생년월일
				
			// 태아
			} else if ( $('#hidden_input').find('#spb_fetaYn').val() == "Y" ) {
				
				sucoInpa_Data.cstHanNm = "태아";				// 고객한글명
				sucoInpa_Data.encrPsno = "0000003000000";	// 암호화주민등록번호			
				sucoInpa_Data.brdt = "000000";				// 생년월일
			}
			
			arr_sucoInpa.push(sucoInpa_Data);
		}
		
		var cstSucoRltyArr = [];
		
		if ( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "42" ) {
			cstSucoRltyArr = ['41'];
		} else if ( $('#hidden_input').find('#spb_insSbsnGoodSmclCd').val() == "32" ) {
			cstSucoRltyArr = ['31','41','51'];
		} else {
			cstSucoRltyArr = ['21'];
		}
		
		
		var encrPsno = $('#hidden_input').find('#spb_plnnrBrdt').val().substring(2,8) + "" + $('#hidden_input').find('#spb_plnnrGndrCd').val() + "000000";
		
		for( var i = 0 ; i < cstSucoRltyArr.length ; i++ ) {
			sucoInpa_Data = new Object();
			
			sucoInpa_Data.cstSucoRlty = cstSucoRltyArr[i];	// 고객청약관계형(주피보험자)
			sucoInpa_Data.dsgnInpaScCd = "01";				// 설계관계자구분코드(본인)
			sucoInpa_Data.ntnfScCd      = "";				// 내외국인구분코드
			sucoInpa_Data.cstHanNm      = "고객";			// 고객한글명	(어린이보험 2종: 자녀, 그 외: 고객)
			sucoInpa_Data.cstEngNm = "";					// 고객영문명		
			sucoInpa_Data.encrPsno     = encrPsno;			// 암호화주민등록번호		
			sucoInpa_Data.brdt         = $('#hidden_input').find('#spb_plnnrBrdt').val();	// 생년월일
			sucoInpa_Data.insAge       = $('#hidden_input').find('#spb_plnnrInsAge').val();	// 보험나이
			sucoInpa_Data.ageScCd = "01";					// 나이구분코드(보험나이)
			sucoInpa_Data.natiCd        = "";				// 국가코드
			sucoInpa_Data.natiNm        = "";				// 국가명
			sucoInpa_Data.bnfcScCd = "";                    // 사망시수익자구분코드
			sucoInpa_Data.pscn = "";						// 인원수
			
			arr_sucoInpa.push(sucoInpa_Data);
		}
		/////////////////////// 청약관계자 설정 end
		
		gvObjImsiSaveData.sucoInpa = arr_sucoInpa;
		
		globalVar.setParam('emailPlnInfo', gvObjImsiSaveData);
		
		return gvObjImsiSaveData;
	};
	
	_private.getProductUrlData = function(){
		
		var reqData = _private.setDataArr();
			
		var tradeKey = '';
		
		tradeKey = constants.getVal('SAVE');
		
		//트랜젝션 셋팅
		var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
		tranProp.url        = '/common/cc/CC06000S';           		// 트랜잭션 Url
		tranProp.tradeKey   = tradeKey;       							// 트랜잭션 TradeKey
		tranProp.params     = reqData;                             		// 트랜잭션 Parameter
		tranProp.success    = _private.successCallbackSave;  			// Success Callback
		tranProp.failure    = _private.failureCallbackSave;  			// Failure Callback
		
		//트랜잭션 실행
		transaction.callTran(tranProp);
		
	};
	
	/**
	 * 장바구니 저장할 데이터 셋팅
	 */
	_private.setDataArr = function() {
		var result = new Object();
		
		//장바구니 JSON 데이터 생성
		$.each(_private.columnArr, function(idx, key){
			
			//폼에 key가 존재할 경우 key, value 셋팅
			if($('#hidden_input').find('#spb_' + key).length > 0){
				result[key] = $('#hidden_input').find('#spb_' + key).val();
			}
			
		});
		
		//키 data 현재 날짜로 강제삽입
		result["hndTphno"] = util.getDate();
		//ㅋ;
		result["spbSq"] = 0;
		
		return result;
	};
	
	/**
	 * 장바구니 컬럼
	 */
	_private.columnArr = [
						'encrHndTphno'
						,'spbSq'
						,'spbPgrsStatCd'
						,'plhdAssrSameYn'
						,'plhdAssrRtnsCd'
						,'nwcReiScCd'
						,'entChnnScCd'
						,'entPlnYmd'
						,'goodplanCd'
						,'insSbsnGoodSmclCd'
						,'goodCd'
						,'plnnrBrdt'
						,'plnnrInsAge'
						,'plnnrGndrCd'
						,'smokYn'
						,'chldBrdt'
						,'chldInsAge'
						,'chldGndrCd'
						,'fetaYn'
						,'slctInsCd'
						,'insEntAmt'
						,'rinsPeri'
						,'inspdTypeCd'
						,'rlpmPeri'
						,'pmtpdTypeCd'
						,'pmtCyclCd'
						,'eprtRfdrt'
						,'annOpnnAge'
						,'whliAnnFmSlctCd'
						,'whliAnnFmSlctRto'
						,'crtnAnnFmSlctCd'
						,'crtnAnnFmSlctRto'
						,'inhrAnnFmSlctRto'
						,'goalAnnEstYn'
						,'goalAnnAmt'
						,'goalPmtPeri'
						,'goalMmPrm'
						,'prmPmtExcTrtyEntYn'
						,'sumPrm'
						,'cllgRgiExpn'
						,'elscEduExpn'
						,'mdscEduExpn'
						,'hgscEduExpn'
						,'saRsrExpnWtrAge'
						,'saRsrExpn'
						,'siGoExpn'
						,'delYn'
						,'mmPrm'
						,'acpFrcsAnnMmAmt'
						,'acpFrcsAnnAmt'
						,'pbanIrat'
						,'eprtEduAmt'
						,'goalEduAmt'
						,'trtyTypeText'
						,'eprtRstAmt'
						,'csEploNo'
						,'csOrgno'
						];
	                     
	/**
	 * Ajax 성공
	 */
	_private.successCallbackSave = function(data) {
		
		var spbSaveRslt = data.outData.spbSaveRslt;
		var inSData = data.inSData;

		if(spbSaveRslt != undefined && spbSaveRslt != null
		&& spbSaveRslt[0].saveYn == 'Y'){
			
			//휴대전화번호
			$('#hidden_input').find('#spb_encrHndTphno').val(inSData.encrHndTphno);
			//장바구니순번
			$('#hidden_input').find('#spb_spbSq').val(data.outData.spbSaveRslt[0].spbSq);
			
			var paramObj = {
					encrHndTphno : inSData.encrHndTphno,
					spbSq		 : data.outData.spbSaveRslt[0].spbSq
					
			};
		
			//장바구니 저장 성공시 paramObj 전달
			_private.dataObj = paramObj;
			SNS.initSNS();
			
		}
		else{
			
			return;
		}
	};
	
	/**
	 * Ajax 실패
	 */
	_private.failureCallbackSave = function() {
		
		//장바구니 저장 실패시
		//message.alert('COM010');
	};
	
    
    /**
     * iOS 앱스토어 이동 관련 Timer 설정
     */
    _private.clearTimer =  function(timer) {
        return function () {
            clearTimeout(timer);
            window.removeEventListener('pagehide', arguments.callee);
        };
    };
	
	/**
	 * KAKAO INIT 초기화
	 */
	sessionStorage.setItem('kakaoInit', false);
	
	return _public;
})();
