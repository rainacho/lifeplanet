
/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.page.js, /resources/js/
 * DESCRIPTION : Page 관련 함수 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2015-01-05		initial version
 * ========================================================================== */

/**
 * 페이지 유틸 집합
 * 
 * @author	권대준, djkwon@kico.co.kr
 */
var PageUtil = (function() {
	var _public = {};
	var _private = {};
	
	/**
	 * 페이지를 동적으로 호출하는 함수 (jQuery.load 사용)
	 * @param path
	 * @param param
	 */
	_public.loadPage = function(path, param) {
		
		Main.offDisableBack();
		
		Main.onLoading();
		
		if (typeof path !== 'string' || path == null) {
			logger.alert('경로는 반드시 문자열로 전달 해야 합니다.');
			return;
		}
		
		if (typeof param !== 'object' || param == null) {
			logger.alert('전달값은 반드시 문자열로 전달 해야 합니다.');
			return;
		} else {
			// JSON_DATA 변경 형식에 맞춰서 형태 변환
			param = {
				JSON_DATA : JSON.stringify(param, null, 2)
			};
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
		
		$('#loadPageArea').load(pagePath, param, function(response, status, xhr) {
			
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
				logger.alert('페이지 로딩에 실패하였습니다.');
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
						var js ="";

						if(typeof cacheJS == "undefined"  ){
							js =  _url;
						}else{
							js =  _url+"?v="+cacheJS;
						}
				
						fileref.setAttribute('type', 'text/javascript');
						fileref.setAttribute('src', js)
						fileref.onload = _startupJob;
						document.getElementsByTagName('head')[0].appendChild(fileref);
						
						var bStyle = document.body.style;
						var agent  = navigator.userAgent.toLowerCase();
						var canvas = document.createElement('canvas');

						//호환성보기
						if( agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ){
							
							if( !('getContext' in canvas) ){
								//alert("IE8 호환성보기 들어왔음");
								this.waitForJQueryLoad();
								
							}else if( !('msTransition' in bStyle) && !('transition' in bStyle) ){
								//alert("IE9 호환성보기 들어왔음"); 
							}
							
						// 호환성보기 아닐때
						}else{
							
							if (navigator.userAgent.toUpperCase().indexOf('MSIE 7.0') > -1 
									|| navigator.userAgent.toUpperCase().indexOf('MSIE 8.0') > -1) {
								this.waitForJQueryLoad();
							}
						}
				},
				//IE8에서 탄다.
				waitForJQueryLoad : function() {
					setTimeout(function() {
						if ( ! jQueryLoader.jQueryLoadChecker()) {
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
						alert("catch");
						return false;
					}
				}
			};
		
	};
	
	/**
	 * @param strUrl
	 * @param objParam
	 * @param strTarget
	 */
	_public.movePage = function(strUrl, objParam, strTarget, methodType) {
		
		methodType = methodType || 'POST';
		
		//Main.offDisableBack();
		
		// @@CK@@ url 이 null 일 경우 준비중으로 표현
		if(strUrl == null) {
			alert('메뉴 준비중입니다.');
			return;
		}
		
		//페이지이동시 마크업에 정의된 Data Story 데이터 적재 
		if(typeof webLog != "undefined"  ) {	
			webLog.runDsInputFunc(objParam);
		}

		// 0. 로딩 생성
		Main.onLoading();
		
		$('#nextForm').remove();	
		
		var strHtml = '';
		
		
		isContainsDev = strUrl.indexOf ('.dev') > -1;
		
		
		// 1. form 생성
		// redirect 를 위한 소스 신규 생성
		// strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\"POST\" " + strTarget + " action=\"" + '/common/cc/movePage.dev' + "\">";
		if (isContainsDev) {
			
			strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\""+ methodType +"\" " + strTarget + " action=\"" + strUrl + "\">";
		}
		else {
			
			strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\""+ methodType +"\" " + strTarget + " action=\"" + strUrl + ".dev \">";
		}
		
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
				strHtml += util_makeInputTag(objParam, "");// 데이터의 일반, 객체, 배열의 모든 종류의
			}
			
		}
		
		strHtml += '</form>';
		
		// 4. 화면에 Form 생성
		$('body').append(strHtml);
		
		// 5. 현재 이동 화면을 session storage에 저장. 추후 History로 이용
		ssManager.setItem('historyActionUrl', strUrl);
		
		// 6. submit
		$('#nextForm').submit();
		
		// 0. 로딩 제거
		if(strTarget!=null && strTarget.indexOf('blank') > -1){
			//새창으로 연 경우 loading 닫기
			Main.offLoading();
				
		}
		
	};
	
	/**
	 * 로그인전 일경우 로그인후 페이지이동하기 위한 함수 
	 */
	_public.loginNextMovePage = function(url, isLogin) {
		
		 var originUrl = location.origin;
		 var 	customUrl ="";
	 
		 if(url.indexOf("HPML100S1")>-1){
			 customUrl= "/analysis/mypage/mypage_gnb/HPML100S1.dev";	 
		 }else  if(url.indexOf("HPML120S1")>-1){
			 customUrl= "/analysis/mypage/mypage_gnb/HPML120S1.dev";
		 }else  if(url.indexOf("HPML150S1")>-1){
			 customUrl= "/analysis/mypage/mypage_gnb/HPML150S1.dev";
		 }else  if(url.indexOf("HPML180S1")>-1){
			 customUrl= "/analysis/mypage/mypage_gnb/HPML180S1.dev";
		 }
		 
		if(customUrl != ""){
			webLog.runAceCounterVirtual(originUrl+customUrl);	
		}	
		 
	   $('#loadingArea').show();
		 
	  if(!isLogin) {
	    alert("로그인 후 이용해 주세요.");
	    var query = "?locationUrl="+ url;
	    location.href = "/login/HPGA01S0.dev"+query;
	  } else {
	    location.href = url;
	  }
	  
	};
	
	/**
	 * 로그인전 일경우 로그인후 페이지이동하기 위한 함수 
	 */
	_public.loginNextMovePageType = function(url, isLogin,type) {
		
	 var originUrl = location.origin;
	 var 	customUrl ="";
	 
	 if(type == "gnb"){
		 if(url.indexOf("HPML150S1")>-1){
			 customUrl= "/analysis/mypage/products_gnb/HPML100S1.dev";	 
		 }		 
	 }else if(type == "banner"){
		 if(url.indexOf("HPML150S1")>-1){
			 customUrl= "/analysis/mypage/banner_gnb/HPML100S1.dev";	 
		 } 
	 }
		
	 if(customUrl != ""){
		webLog.runAceCounterVirtual(originUrl+customUrl);	
     }	
	 
	 $('#loadingArea').show();
	 
	  if(!isLogin) {
	    alert("로그인 후 이용해 주세요.");
	    var query = "?locationUrl="+ url;
	    location.href = "/login/HPGA01S0.dev"+query;
	  } else {
	    location.href = url;
	  }
	  
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
	 * 페이지 오픈전 발생 이벤트
	 * 화면이 모두 렌더링 된 이후에 발생하는 이벤트
	 */
	_public.prePageFunction = function (param, popupId, url) {

		if (util.isNull(popupId)) {
			// 팝업이 아닌 경우
			
			// 1. Gnb 메뉴 생성
			//PageUtil.makeGnbMenu();
			
			// 2. 화면 attr 체크 후 formatter 발생 처리
			PageUtil.actionFormatter();

			// 3. SNS Area 생성
			PageUtil.drawSNSArea();
			
			// 3.5 헤더 Area 호출
			pageHeaderFunction();
			
			// 4. 화면 기본 pageFucntion 호출
			pageFunction(param);
			
			// 5. 화면 렌더링 이후, 퍼블리싱을 위한 함수 호출
			//UIComponent();
			
			// 6. 로딩 종료
			var nowTransaction = globalVar.getParam('nowTransaction');
 			if(nowTransaction || nowTransaction == undefined) {
//				Main.offLoading();
			}

			try {
				// 설계페이지 원하는 포지션으로 이동
				var inPos = globalVar.getParam('inSData').inPos;
				if (inPos != undefined && inPos != null && inPos != "") {
					setTimeout(function() {
						var $obj = $('.tit_tab_2 .tab_2 a:eq(' + (Number(inPos.substring(0,1)) - 1) + ')');
						$obj.parent().parent().removeClass('_on');
						$obj.trigger('click');
					},1000);
				}
			}
			catch(e){}
			
		} else {
			// 팝업 인 경우
			
			// 1. 화면 attr 체크 후 formatter 발생 처리
			//PageUtil.actionFormatter();
			
			// 2. SNS Area 생성
			//PageUtil.drawSNSArea();
			
			// 3. 화면 기본 pageFucntion 호출
			pageFunction(param);
			
			// 4. 화면 렌더링 이후, 퍼블리싱을 위한 함수 호출
			//UIComponent($('#' + popupId));
			
			// 5. 로딩 종료
			var nowTransaction = globalVar.getParam('nowTransaction');
 			if(nowTransaction || nowTransaction == undefined) {
//				Main.offLoading();
			}
			
		}
	};
	
	_public.drawSNSArea = function() {
		
		/**
		 * SNS 영역 체크 확인 후 SNS 버튼 바인딩
		 */
		var snsAreas = $('body').find('[data-div-type=sns]');
		$.each(snsAreas, function(idx, _this){

			var strHtml  = '<div class="sns_wrap bdtop">';
				strHtml += '	<div class="sns_btn" id="sns_btn_'+idx+'">';
				strHtml += '		<a href="javascript:;" id="snsFacebook" class="icon100 sns_fb">FACEBOOK</a>';
				strHtml += '		<a href="javascript:;" id="snsKakaotalk" class="icon100 sns_kt">KAKAOTALK</a>';
				strHtml += '		<a href="javascript:;" id="snsKakaostory" class="icon100 sns_ks">KAKAOSTORY</a>';
				strHtml += '		<a href="javascript:;" id="snsEmail" class="icon100 sns_e">이메일</a>';
				strHtml += '		<a href="javascript:;" id="snsSMS" class="icon100 sns_s">SMS</a>';
				strHtml += '		<a href="javascript:;" id="snsBand" class="icon100 sns_bd">BAND</a>';
				strHtml += '		<a href="javascript:;" id="snsLine" class="icon100 sns_ln">LINE</a>';
				strHtml += '	</div>';
				strHtml += '	<button type="button" class="ui_sns_more icon100 icon_plus" data-target="sns_btn_'+idx+'" data-view-cnt="4" data-state="hide">열기</button>';
				strHtml += '</div>';
			
			$(_this).attr('id', 'snsArea'+idx);
			$(_this).html(strHtml);
			
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
			case 'date8':
				util.inputDate8(_id);
				break;
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
			
		/**********************************************************************
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 * TODO: tranProp, listParam 에 대한 validate 처리 필요
		 *********************************************************************/
		
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
				tranProp.params.PAGE_ROW_SIZE += '';
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
			if (outData.INQR_TOTAL_CNT) {
				
				listParam['totCnt'] = outData.INQR_TOTAL_CNT;
			}
			else if (tempStr.indexOf('INQR_TOTAL_CNT') > -1) {
				
				var strIdx = tempStr.indexOf('INQR_TOTAL_CNT":"');
				var endIdx = tempStr.indexOf('",', strIdx + 17);
				var totCnt = tempStr.substring(strIdx + 17, endIdx);
				
				listParam['totCnt'] = totCnt;
				
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
		
		/**
		 * TODO: listParam 기본값 셋팅 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!
		 */
		
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
	
	// 2015.03.30(jeha) 페이징처리 필요. KDIHP util.js에 있는 페이징처리 함수이름 바꿔서 집어넣음
	_public.drawListOrg = function(responseList, listId, tempListId) {
		
		// 그려질 영역이 없을경우 디폴트명으로 설정
		if(util.chkReturn(listId, "s") == ""){
			listId = "listArea";
		}
		// 임시 그려질 영역이 없을경우 디폴트명으로 설정
		if(util.chkReturn(tempListId, "s") == ""){
			tempListId = "tempListArea";
		}
		
		// 지정된 id의 영역 설정
		var $listArea = $("#"+listId);
		var $tempListArea = $("#"+tempListId);


		// 지정된 id의 임시영역 복사 및 임시영역 삭제
		if(util.chkReturn(_private.utilObj_drawList_listAreaClone[tempListId], "s") == ""){
			_private.utilObj_drawList_listAreaClone[tempListId] = $tempListArea.children().clone();
			jQuery.remove(tempListId);	// temp 삭제
		}
		
		// 지정된 id의 기존 영역에 그려진 부분 삭제
		jQuery.removeChild(listId);
		
		var nCount = 0;
		if (util.chkReturn(responseList, "s") != ""){
			nCount = responseList.length; // 리스트의 길이
		}
		
		// 리스트가 없을경우 종료
		if(util.chkReturn(nCount, "s") == "" || nCount == 0){
			// var nTdCount =
			// _private.utilObj_drawList_listAreaClone[tempListId].children("tr").children("td").length;
			var nTdCount = _private.utilObj_drawList_listAreaClone[tempListId].children("td").length;
			$listArea.html("<tr><td colspan=\"" + nTdCount + "\" class=\"noData\">조회된 내역이 없습니다.</td></tr>");
		}else{
			// 임시로 그려지는 영역 객체
			var srcArea = null;
			// 리스트의 길이만큼 수행되면서 모든 오브젝트의 키에 오브젝트의 값을 그린다. (화면 오브젝트의 클래스명과 실제 전문의 키값은
			// 동일하게 설정)
			for (var i = 0 ; i<nCount ; i++) {
				var objData = responseList[i];
				srcArea = _private.utilObj_drawList_listAreaClone[tempListId].clone();
				// 데이터가 포함된 row에 현재 rowData세팅
				srcArea.data("data",objData);
				for(var item in objData){
					if(item.indexOf("[")==-1 && item.indexOf("]")==-1){
						// 현재 row의 column에 rowData세팅
						srcArea.find("[name="+item+"]").data("data",objData);
						srcArea.find("[name="+item+"]").val(objData[item]);
						srcArea.find("[name="+item+"]").filter(":not(input)").filter(":not(button)").filter(":not(img)").html(objData[item]);// 13-03-04
																															// IE에서
																															// 인풋태그
																															// 오류로
																															// 인한
																															// 수정
																															// .filter(":not(input)")추가
																															// .filter(":not(img )")추가 2013-05-28 강종철 													
					}
				}
				
				$listArea.append(srcArea);
			}
		}
		
	};
	
	/**
	 * 데이터를 기준으로 리스트 생성
	 * @param listParam
	 */
	_public.drawListCore = function(listParam) {
		
		// 화면에보여주는 Data Row 수를 미입력 하면 디폴트 5 세팅
		if (util.chkReturn(listParam.iPageRow, "s") == ""){
			listParam.iPageRow = 5;
		}
		
		// 페이징 번호 길이수를 미입력 하면 디폴트 10 세팅
		if (util.chkReturn(listParam.iPageBlock, "s") == ""){
			listParam.iPageBlock = 10;
		}
		
		if (util.chkReturn(listParam.iTargetPage, "s") == ""){
			listParam.iTargetPage = 1;
		}
		
		// 그려질 영역이 없을경우 디폴트명으로 설정
		if(util.chkReturn(listParam.listId, 's') == ''){
			listParam.listId = _private.DRAW_LIST_PROP.listId;
		} 
		
		// 임시 그려질 영역이 없을경우 디폴트명으로 설정
		if(util.chkReturn(listParam.tempListId, 's') == ''){
			listParam.tempListId = _private.DRAW_LIST_PROP.tempListId;
		}
		
		// 지정된 id의 영역 설정
		var $listArea = null;
		if (listParam.listType == 'add' && (window.location.pathname.indexOf('/innovation/') != -1))
			var $listArea = $('#'+listParam.listId);
		else
			var $listArea = $('#'+listParam.listId).empty ();
		
		var $tempListArea = $('#'+listParam.tempListId);
		var $frag = document.createDocumentFragment ();
		
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
			nCount = listParam.responseListData ? listParam.responseListData.length : 0;
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
					// 2017-04-06 NonListId 추가 (데이터가 없을 경우)
					if (listParam.nonListId != undefined && listParam.nonListId != null) {
						inHtml = "<tr><td colspan=\"" + ( nThCount + nTdCount ) + "\">" + $('#' + listParam.nonListId).html() + "</td></tr>";
					}else{
						inHtml = "<tr><td colspan=\"" + ( nThCount + nTdCount ) + "\" class=\"noData\">조회된 내역이 없습니다.</td></tr>";
					}
				}
				else {
					/*
					inHtml = "<div class=\"list_linkbox dm\">"
						   + "<span class=\"linkarea ac\"><strong class=\"prod_tit\">조회된 내역이 없습니다.</strong></span>";
					       + "</div>";
					*/       
					inHtml = '<div class="no_list"><span class="icon50 icon_notice"></span>조회된 내역이 없습니다.</div>';
				}
			}

			// TODO: 조회된 내역이 없는 경우 발생하는 화면 클래스 수정
			$listArea.html(inHtml);

		} else {
			// 임시로 그려지는 영역 객체
			var srcArea = null
			, objData
			, dataKeyArr
			, dataKeyESCArr
			, i, j, length
			, item
			, srcAreaHtml;
			
			// ex) 100개의 데이터를 가져와서 3번째 페이지의 데이터만 뿌린다. 
			if(listParam.listType == 'number' && listParam.singleType == undefined){
				var startNum	= listParam.iPageRow*listParam.iTargetPage -listParam.iPageRow;
				var endNum 		= listParam.iPageRow * listParam.iTargetPage;
			
			// ex) 3페이지의 N건만 가져와서 데이터를 뿌린다. (listParam.listType == 'number' && listParam.singleType == 'single')
			}else{
				var startNum 	= 0;
				var endNum 		= nCount;
			}
			
			// 리스트의 길이만큼 수행되면서 모든 오브젝트의 키에 오브젝트의 값을 그린다. (화면 오브젝트의 클래스명과 실제 전문의 키값은
			// 동일하게 설정)
			for (i = startNum ; i < endNum ; i++) {
				
				objData = listParam.responseListData[i];
				
				if(util.chkReturn(objData, 's') != ''){
				
					srcArea = _private.utilObj_drawList_listAreaClone[listParam.tempListId].clone();
					srcArea.data('data',objData);
					// 2017-04-13 모든 엘리먼트에 data 설정
					$('*', srcArea).data('data', objData);
					// 키 배열
					dataKeyArr = [];
					for (key in objData) {
						
						if (!objData.hasOwnProperty(key)) {
							
							continue;
						}
						dataKeyArr.push(key);
					}
					// ESC_키 배열
					dataKeyESCArr = [];
					for (key in objData) {
						
						if (key.indexOf('ESC_') < 0 ||
							!objData.hasOwnProperty(key)) {
							
							continue;
						}
						dataKeyESCArr.push(key);
					}
					
					// 2017-04-04 :: 리스트에 커스텀 function 으로 데이터 바인딩
					if (listParam.eachDataHandler != undefined && listParam.eachDataHandler != null && typeof listParam.eachDataHandler == 'function') {
						listParam.eachDataHandler(srcArea, objData);
					}else{
						// value, html 입력
						for (j = 0, length = dataKeyArr.length; j < length; j += 1) {
							item = dataKeyArr[ j ];
							
							if(item.indexOf('[')==-1 && item.indexOf(']')==-1){
								srcArea
									.find('[id='+item+']').val(objData[item]).data('data',objData)
									.filter(':not(input)').filter(':not(button)').filter(':not(img)').html(objData[item]);
							}
						}
						
						// ESC 문자열 치환
						srcAreaHtml = srcArea.html ();
						$.each (dataKeyESCArr, function (idx, value) {
							srcAreaHtml = util.replaceAll (srcAreaHtml, '@{' + value + '}', objData[value] );
						});
						
						// 치환되지 않은 문자열 삭제
						srcAreaHtml = (srcAreaHtml.replace(/\@[^<>]*\}/gi, ''));
						
						srcArea.html (srcAreaHtml);
					}
					
					srcArea.appendTo ($frag);
				}
				$listArea.append ($frag);
				
				// 화면 attr 체크 후 formatter 발생 처리
				PageUtil.actionFormatter();
			}
			
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
		 * @param iCurrPage		- Interger - (필수)현재 페이지 번호 - 최초 1
		 * @param iTotalCount	- Interger - (필수)전체 Data Row 수
		 * @param iPageRow		- Interger - 화면에보여주는 Data Row 수 - 미입력 또는 빈스트링 입력시 5기본 세팅
		 * @param iPageBlock	- Interger - 페이징 번호 길이 수 - 미입력 또는 빈스트링 입력시 10기본 세팅
		 * @param strReturnFn	- String - 페이징 클릭시 호출할 function명 - 미입력 또는 빈스트링시 fn_paging 호출
		 * @param strViewId		- String - 페이징을 표시할 div명 - 미입력 또는 빈스트링시 pagingNavi에 그린다
		 * @param designType	- String - 페이징디자인타입 - 미입력 또는 빈스트링시 default 페이징디자인타입
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
		
		// 화면에보여주는 Data Row 수를 미입력 하면 디폴트 15 세팅
		if (util.chkReturn(iPageRow, "s") == ""){
			iPageRow = 15;
		}else{
			iPageRow = parseInt(iPageRow);
		}

		if (util.chkReturn(iPageBlock, "s") == ""){
			iPageBlock = 10;
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
		
		var sCurrPageClass = "current";
		var sReturnValue = "";
		
		if(iTotalCount > iPageRow){
		
			/******************************************************************/
			// 이전 >>
			if(iBlock > 1) {
				iMyPage = iFirstPage-1;
				
				sReturnValue += "<span class ='first'><a href='javascript:;' onclick='PageUtil.callOtherPage(1);'>처음페이지 이동</a></span>&nbsp;";
				sReturnValue += "<span class ='prev' ><a href='javascript:;' onclick='PageUtil.callOtherPage(" + iMyPage.toString() + ");'" + ">이전페이지 이동</a></span>";
			}
			/******************************************************************/
			
			/******************************************************************/
			// 현재 >>
			//현재의 페이지 블럭범위내에서 각 페이지로 바로 이동할 수 있는 하이퍼링크를 출력한다
			for(var i = iFirstPage; i <= iLastPage; i++) {
				if(iCurrPage == i) {
					// 현재 페이지인 경우
					sReturnValue += "<strong class='"+sCurrPageClass+"' title='현재페이지'>" + i.toString() + "</strong>";
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
				
				sReturnValue += "<span class ='next'><a href='javascript:;' onclick='PageUtil.callOtherPage(" + iMyPage.toString() + ");'" + ">다음페이지 이동</a></span>&nbsp;";
				sReturnValue += "<span class ='last'><a href='javascript:;' onclick='PageUtil.callOtherPage(" + iTotPage.toString() + ");'" + ">마지막페이지 이동</a></span>";
				
			}
			/******************************************************************/
		
		} else {
			if(iTotalCount > 0){ // 리스트가 있을 때에만
				// 현재 페이지가 1페이지 인 경우
				sReturnValue += "<strong class='"+sCurrPageClass+"' title='현재페이지'>1</strong>";
			}
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
		
		// TODO : 각 페이지 선택해서 넘어갈때 페이지 넘버 맞추기
		// TODO : 선택된 페이지 번호 활성화 시키기
		// TODO : 이전/다음 버튼 활성화 시키기
		
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
			var addBtn = null;
			if (listParam.pageAddButton != undefined && listParam.pageAddButton != null) {
				var $btnAddMore = $(listParam.pageAddButton).clone();
				$(listParam.pageAddButton).remove();
				$('#' + pageAreaId).append($btnAddMore);
			}else if (window.location.pathname.indexOf('/innovation/iy') != -1) {
				var addBtn = '<button type=\"button\" id=\"btnAddMore\" class=\"btn_more\" ><span>더보기</span></button>';
				$('#' + pageAreaId).append(addBtn);
			}else if (window.location.pathname.indexOf('/innovation/iq') != -1) {
				var addBtn = '<div class="area_more mt20"><button type="button" id="btnAddMore" class="btn_more"><span>더보기</span></button></div>';
				$('#' + pageAreaId).append(addBtn);
			}else{
				var addBtn = '<div class="page_more"><a href="javascript:;" id="btnAddMore" ><span>더보기</span></a></div>';
				$('#' + pageAreaId).append(addBtn);
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
		tranProp.params.PAGE_ROW_SIZE += '';
		tranProp.params.PAGE		 	= iTargetPage; 		   // 페이지 번호
		tranProp.params.PAGE += '';
		
		if (listParam.listType == 'number') {
			
			// 페이징의 경우 선택한 페이지의 첫번째 값으로 이동한다. 
			tranProp.params.PAGE_FIRST_ROW 	= 1 + ((listParam.iTargetPage-1)*listParam.iPageRow); // 이동할 페이지
			tranProp.params.PAGE_FIRST_ROW += '';
			
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
	 *              disabledKey : disabled 설정 기본값 : disabledFlag
	 *            }
	 * 
	 * 
	 * ex ) PageUtil.drawSelectBoxOption(arrList,'sBox',{'initVal':5});
	 */
	_public.drawSelectBoxOption = function (list, selectBoxId, option) {
		// 옵션입력여부
		var optionState = false;
		var $selectBoxArea;
		if(util.chkReturn(option, 's') != '' && typeof option === 'object'){
			optionState = true;
		}
		
		// 셀렉트 박스 영역
		if (option.searchArea && option.searchArea.length) {
			
			$selectBoxArea = $(option.searchArea).find('#'+selectBoxId);
		} else {
			
			$selectBoxArea = $('#'+selectBoxId);
		}
		
		// 지정된 id의 기존 영역에 그려진 부분 삭제
		jQuery.removeChild(selectBoxId);
		if(typeof list === 'object' && list.constructor == Array){
			var valKey = 'cmnnCd';
			var textKey = 'cmnnCdHanNm';
			var disabledKey	= 'disabledFlag';
			if(!optionState || util.chkReturn(option.emptyFlag, 's') == '' || option.emptyFlag == true ){
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
		 
		// alert('startY-->'+startY+'---'+endY);
		var arrY = new Array();
		for(var i=startY; i>=endY; i--){
			arrY[arrY.length] = {'cmnnCd':i,'cmnnCdHanNm':i+'년'};
		}
		// alert('111-->'+arrY.length);
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
		
		// TODO : 디자인 변경 필요
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
	_public.openPopupMobile = function(option){
		
		// Popup을 호출한 화면 ID를 저장
		var parentId = location.pathname.split('/');
		parentId = parentId[parentId.length-1].split('.')[0];
		globalVar.setParam('popupParentId', parentId);
		
		if (option.location == undefined) {
			
			
		} else if (option.location == 'internal') {
			
			// 내부 팝업 오픈
			$('#' + option.id).attr('style',''); // 팝업 오픈전 스타일 재정의 
			$('#' + option.id).bPopup({
				easing: 'easeOutBack', //uses jQuery easing plugin
				speed: 450,
				transition: 'slideUp',
				positionStyle: 'absolute',
				modalClose: false
			});
			
		} else if (option.location == 'external') {
			
			Main.onLoading();
			
			// 외부 팝업 오픈
			$('#' + option.id).attr('style',''); // 팝업 오픈전 스타일 재정의
			$('#' + option.id).bPopup({
				transition			: 'slideUp',
            	transitionClose		: 'fadeOut',
    			contentContainer	: '.' + option.content,
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
    		    	
    		    	
    		    }
    		});
			
		} else if (option.location == 'new') {
			
			// 새창 오픈
			var newPop = window.open(location.origin + '/dev/samples/SMPL_POPP_EXTR_P.dev');
			
			var htmlTag = '';
				htmlTag += '<div class="popheader">';
				htmlTag += '<h1>라이프플래닛</h1>';
				htmlTag += '<button type="button" class="pop_close b-close" onclick="self.close()">닫기</button>';
				htmlTag += '</div>';
				htmlTag += option.htmlTag;
	   
			// newPop.document.write(htmlTag);
				
				console.log(newPop.document.getElementsByClassName('table_detail3'));
			
		} else if (option.location == 'url') {
			
			// 새창 오픈
			var newPop = window.open(option.url);
			
		}
		
	};
	
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
		
		// 반복문을 사용하여 Depth 별 링크 생성
		for ( var i = 0; i < oneDepth.length; i++) {
			
			// 1depth 생성 
			var tempOne = {
				menu : oneDepth[i].menuNm, // 메뉴명
				url : oneDepth[i].menuUrl , // 메뉴별 URL
				ictnSq : oneDepth[i].ictnSq, // 우선순위
				focus : curId == oneDepth[i].menuId ? 'active' : '' // 활성화 여부
			};
			
			var tempTwoArr = [];
			for ( var j = 0; j < twoDepth.length; j++) {
				
				// 1depth의 ID와 2depth의 상위 객체가 동일한 경우에 진행
				if(oneDepth[i].menuId == twoDepth[j].sppoMenuId) {
					
					var tempTwo = {
							menu : twoDepth[j].menuNm,
							url : twoDepth[j].menuUrl ,
							ictnSq : twoDepth[j].ictnSq,
							focus : curId == twoDepth[j].menuId ? 'active' : ''
					};
					
					var tempThreeArr = [];
					for ( var k = 0; k < threeDepth.length; k++) {
						
						// 2depth의 ID와 3depth의 상위 객체가 동일한 경우에 진행
						if(twoDepth[j].menuId == threeDepth[k].sppoMenuId) {
							
							var tempThree = {
									menu : threeDepth[k].menuNm,
									url : threeDepth[k].menuUrl ,
									ictnSq : threeDepth[k].ictnSq,
									focus : curId == threeDepth[k].menuId ? 'active' : ''
							};
							
							tempThreeArr.push(tempThree);

						}
					} //end for
					
					tempThreeArr.sort(function(a, b){
					    var a1= a.ictnSq, b1= b.ictnSq;
					    if(a1== b1) return 0;
					    return a1> b1? 1: -1;
					});
					
					// 생성한 3depth의 객체를 2depth 객체에 삽입
					tempTwo.depth3 = tempThreeArr;
					tempTwoArr.push(tempTwo);
					
				}
				
			} // end for
			
			tempTwoArr.sort(function(a, b){
			    var a1= a.ictnSq, b1= b.ictnSq;
			    if(a1== b1) return 0;
			    return a1> b1? 1: -1;
			});
			
			// 생성한 2depth의 객체를 1depth 객체에 삽입
			tempOne.depth2 = tempTwoArr;
			gnb_data.resultData.push(tempOne);

		} // end for
		
		gnb_data.resultData.sort(function(a, b){
		    var a1= a.ictnSq, b1= b.ictnSq;
		    if(a1== b1) return 0;
		    return a1> b1? 1: -1;
		}); 
		
		// 생성한 데이터를 기준으로 GNB 생성 
		if($('#gnb_wrap').length) {
			var type = '';
			if(MXP_PLUGIN.getOSInfo().name.indexOf('WEB') > -1) {
				type = 'web';
			} else {
				type = 'app';
			}
			GNB.gnbMaker(gnb_data, type);
		}
		
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
	 * 팝업을 띄워 새로운 페이지를 연다. objOption의 width(default:800px)와 height(default:700px) 값은
	 * 선택 이다. objOption의 값을 세팅해주고자 하면 함수에 해당 처리부분 추가 필요 objOption 예) var objOption =
	 * new Object(); objOption.type = "window";//(default:modal) objOption.width =
	 * "850"; objOption.height = "630";
	 * 
	 * @param strUrl -
	 *            String - 팝업에서 띄울 URL + parameter
	 * @param objOption -
	 *            Object - width, height 등의 팝업 옵션값
	 * @param objData -
	 *            Object - objData 값이 있을 경우 parameter를 자동 세팅한다.
	 */
	_public.openPopup = function(objOption, objData){
		
		var strUrl = objOption.url;
		
		if(util_chkReturn(strUrl, "s") == "") {
			alert("util_modalPage : 오픈할 URL을 확인해 주십시오.");
			return ;
		}
		
		if(typeof globalVar != "undefined" ){
			globalVar.setParam('popupOption',objOption);
			globalVar.setParam('popupData',objData);
		}
		
		
		if(strUrl.indexOf("?")>=0){
			
		} else if (strUrl.indexOf(".dev") >=0) {
			
		}else{
			if((strUrl.indexOf(".dev")>=0)||((strUrl.indexOf(".jsp")>=0))){
			}else{
				strUrl = strUrl + ".dev";
			}
		}
		
		if (util_chkReturn(objOption, "s") == ""){
			objOption = {};
		}
		
		if(util_chkReturn(objOption.type, "s") == "") {
			objOption.type = "modal";
		}
		
		// 가로크기
		if(util_chkReturn(objOption.width, "s") == "") {
			objOption.width = getNewPopW(strUrl);
		}
		
		// 세로크기
		if(util_chkReturn(objOption.height, "s") == "") {
			objOption.height =  getNewPopH(strUrl);
		}
		
		// 로딩시 이미지 URL
		if(util_chkReturn(objOption.loadingImgUrl, "s") == "") {
			objOption.loadingImgUrl = "";
		}
		
		// 배경 투명도
		if(util_chkReturn(objOption.opacityBg, "s") == "") {
			objOption.opacityBg = 0.3;
		}
		
		// 청약 로딩 유무
		if(util_chkReturn(objOption.loadType, "s") == "") {
			objOption.loadType = false;
		}
		//화면에서 타이틀을 넘길경우 넘긴 타이틀 생성
		if(util_chkReturn(objOption.strTit, "s") == "") {
			objOption.strTit = "";
		}
		//팝업 x 버튼 
		if(util_chkReturn(objOption.loadAfter, "s") == "") {
			objOption.loadAfter = false;
		}
		// 클래스 분기처리 (오픈이노베이션 팝업)
		if(util_chkReturn(objOption.layerClass, "s") == "") {
			objOption.layerClass = "";
		}
		
		//기타1
		if(util_chkReturn(objOption.etcData1, "s") == "") {
			objOption.etcData1 = "";
		}
		
		jQuery(this).JQmodalNew({
			popUrl:strUrl
			,type: objOption.type
			,width: objOption.width
			,height: objOption.height
			,loadingImgUrl: objOption.loadingImgUrl
//			,opacityBg: objOption.opacityBg
			,loadType: objOption.loadType
			,closeBtnClass: objOption.closeBtnClass
			,bgColor: objOption.bgColor
			,objValue: objData
			,strTit: objOption.strTit
			,loadAfter: objOption.loadAfter
			,isToBeParam :objOption.isToBeParam
			,layerClass : objOption.layerClass
			,etcData1 : objOption.etcData1
			,scrolling : objOption.scrolling
		});
	};
	
	/**
	 * 팝업닫기 호출함수(modal || window)
	 * 
	 * @param event객체(고정값)
	 */
	_public.closeModal = function(e){
		
		setTimeout (function () {
			
			/* as-is와 동일하게 변경 */
			/*
			parent.$('body, html').css({
				'overflow-y' : 'auto',
				'overflow-x' : 'auto'
			});
			*/
			
			parent.$('body, html').removeAttr('style');
			
			if(parent.$('#modal_ifrmWrap').length){
//				parent.$('.btn_popupOpener').focus();
				try {
					parent.$('.modal_back, .modal_ifrmWrap').remove ();
					parent.$('div[id="modal_back"], div[id="modal_ifrmWrap"]').remove ();
				} catch(e) {
				}
			}else{
				
				$(window.parent).focus();
				window.close();
			}
		}, 0);
//		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	};
	
	/**
	 * 마이플랜 인증팝업 호출
	 * 
	 * */
	_public.openMyplanCertPopup = function (isFuture, param) {
		
		isFuture = isFuture ? isFuture : false;
		
		var isMyPlanCert = globalVar.getParam ('_IS_MYPLAN_CERT');				// 마이플랜 인증여부
		
		
		if (isFuture) {
			
			// 인증 O
			if (isMyPlanCert) {
				
				_public.moveMyPlan (param);
			}
			// 인증 X
			else {
				
				PageUtil.openPopup ({
					  id 		: 'popupwrap'
					, location 	: 'external'
					, content 	: 'content1'
					, url 		: '/products/pc/HPPC611P1.dev'
					, width		: '473'
					, height	: '540'
				});
			}
		}
		else {
			
			_public.moveMyPlan (param);
		}
		return;
	};
	
	/**
	 * 마이플랜으로 이동
	 * 
	 * */
	_public.moveMyPlan = function (param) {
		
		var url = '/products/pc/HPPC600S1.dev';
		if(param == '0'){
			url = url+'?tabIndex=0';
		}else if(param == '1'){
			url = url+'?tabIndex=1';
		}
		top.document.location.href = url;
	};

	return _public;
})();


	/**
	 * 팝업 호출함수(modal || window)
	 * 
	 * @param popUrl(필수)
	 * @param type
	 *            (modal || window)[모달레이어 혹은 윈도우팝업]
	 * @param width
	 * @param height
	 * @param opacityBg
	 *            (전체화면 투명도)
	 * @param opacity
	 *            (팝업 투명도)
	 * @param bz
	 *            (전체화면 z-index 우선순위)
	 * @param iz
	 *            (팝업 z-index 우선순위)
	 */
	var scrollTop;
	(function($){
	    $.fn.JQmodalNew = function(option){
	    	
	        var settings = $.extend({			
	        	width     : option.width
	           ,height    : option.height
	           ,type      : 'modal'// modal || window (모달레이어 혹은 윈도우팝업);
	           ,backColor : '#000'
	           ,opacity   : 0.6
	           ,bz        : 1000001
	           ,iz        : 1000002
	           ,border    : "none"
	           ,bgColor   : "none"
        	   ,closeBtnClass : "btnClose"
	    	   ,popUrl    : 'about:blank'
	    	   ,scrolling : 'yes'
	    	   ,layerClass: option.layerClass	// 클래스 분기처리 (오픈이노베이션 팝업)
	    	   ,etcData1  : option.etcData1 	
	           ,isToBeParam    : false	// TO-BE방식의 파라미터 전송여부
	        },option);	
	         
	        var strLoadingView01 = "";
	        var strLoadingView02 = "";
	        
	        if (settings.loadType != true){
	            strLoadingView02 = "</div>";
	        }
	        
	        return this.each(function(e){
	        	
	            /* 팝업 위치 함수 */
	            var modalCss = function () {
	            	var marginL = settings.width/2;
					var marginT = $(window).scrollTop() + ($(window).height() - settings.height) / 2;
					var offsetL = ($(window).width()/2) - (settings.width/2);
	 				
	 				$('#modal_back').css({
	            		'position': 'fixed',
	            		'left': '0',
	            		'top': '0',
	            		'width': '100%',
	            		'height': $(document).height(),
	            		'background-color': settings.backColor,
	            		'opacity': 0,
	            		'z-index': settings.bz
	            	}).animate({
	            		'opacity': 0.6
	            	});
	         	   
	         	    /*2015.03.11 위치수정*/
	         	   
	        	    //2015.03.30 박현아 수정
	            	try{
	            		$('#modal_ifrmWrap').css({
	            			'position': 'absolute',
	            			'left': '50%',
	            			'top': $(document).scrollTop()+document.documentElement.clientHeight/2+'px',
	            			'margin-left':-settings.width/2+'px',
	            			'margin-top':-settings.height/2+'px',
	            			'z-index': settings.iz
	            		});
	            	}catch(err){
	            		
	            		$('#modal_contWrap').css({
	            			'position': 'absolute',
	            			'left': '50%',
	            			'top': $(document).scrollTop()+document.documentElement.clientHeight/2+'px',
	            			'margin-left':-settings.width/2+'px',
	            			'margin-top':-settings.height/2+'px',
	            			'z-index': settings.iz
	            		});
	            	}
	            	
					$('html').css({
						'overflow-y' : 'hidden',
						'overflow-x' : 'hidden'
					});
	            };
	            
	        	//prevent default action (hyperlink)
	        	e.preventDefault ? e.preventDefault() : e.returnValue = false;
	            window.modalLauncher = $(this);
	            
	            scrollTop = $('body, html').scrollTop();
	            $(document).find('._sel_option').remove();
	            switch (settings.type){
	                case 'modal' :
	                	var tScrolling = (option.scrolling || '') === '' ? 'auto' : option.scrolling;
	                	
	                	$('<div id="modal_back" class="modal_back"></div>').appendTo($('body'));
	                	
	                	if(settings.etcData1 == ""){
	                	$('<div id="modal_ifrmWrap" class="modal_ifrmWrap '+ settings.layerClass +'">'+
                         	
	                		'<p class="tit_modalPop"></p>'+
                         	
                         	'<iframe id="modalIfm" name="modalIfm" src="about:blank"'+//settings.popUrl+'"'+
                         	  'width="'+settings.width+'" height="'+ (parseInt(settings.height)-82) +'"'+
                         	  'allowtransparency="1" frameborder="0" scrolling=' + tScrolling +'>'+
                         	  
	                	'</div>').css('opacity', 0).appendTo($('body'));
	                	
	                	}else{
	                		$('<div id="modal_ifrmWrap" class="modal_ifrmWrap '+ settings.etcData1 +'">'+
	                             	
	    	                		'<p class="tit_modalPop"></p>'+
	                             	
	                             	'<iframe id="modalIfm_'+settings.etcData1+'" name="modalIfm" src="about:blank"'+//settings.popUrl+'"'+
	                             	  'width="'+settings.width+'" height="'+ (parseInt(settings.height)-82) +'"'+
	                             	  'allowtransparency="true" frameborder="0" scrolling="no">'+
	                             	  
	    	                	'</div>').css('opacity', 1).appendTo($('body'));
	                	}
	                	var strHtml = '';
    					
	                	strHtml += '<form id="modalForm" name="modalForm" method="POST" target="modalIfm" action="'+settings.popUrl+'">';

    					// TO-BE 방식
    					if(settings.isToBeParam) {
    						strHtml += "<input name=\"" + 'JSON_DATA' + "\" id=\"" + 'JSON_DATA' + "\" type=\"hidden\" value=\'" + JSON.stringify(settings.objValue) + "\' />";

    					// AS-IS 방식
    					}else{
    						strHtml += util_makeInputTag(settings.objValue, "");// 데이터의 일반, 객체, 배열의 모든 종류의
    					}
    					
    					strHtml += "</form>";
    					$("body").append(strHtml);	// 화면에 form 등 생성
    					$("#modalForm").submit ().remove ();	// submit후 삭제
    					
	                	/* 모달 위치 css 함수 */
	                	modalCss();
	                	$('#modalIfm').focus();
	                	
	                	/* 아이프레임 로드 함수 */
	                	if(settings.etcData1 == ""){
		                	$('#modalIfm').load(function(){
		                		
		                		var targetFrame = $.browser.msie&&$.browser.version=="7.0" ? this.contentWindow.document : this.contentDocument;
		                		
		                		/* 팝업 타이틀 가져오기 */
		                		var strTit = "";
		                		
		                		if(option.strTit!=undefined && option.strTit!=null && option.strTit!=""){
		                			strTit=option.strTit;
		                		}else{
		                			strTit=$(this).contents().find('#header .tit_1dpeth, .popHead h1').text();	
		                		}
		                		
		                		// 팝업 닫기 버튼
		                		var $btnClose = '';
		                		
		                		// 팝업 로드 후 팝업버튼 append 위한 처리 (20150722 jeha)
		                		if(!option.loadAfter){
		                			$btnClose = '<div class="'+settings.closeBtnClass+'"><button type="button" class="btn_close type_d"><span class="blind">레이어 닫기</span></button></div>';
		                		}
	
		                		// 팜업 타이틀 텍스트 생성
		                		$('#modal_ifrmWrap .tit_modalPop').text(strTit);
		                		
		                		
		                		if($('#modal_ifrmWrap .'+settings.closeBtnClass).length < 1){
		                			// 팝업 버튼 생성
			                		$('#modal_ifrmWrap').append($btnClose);
		                		}
		                		
		                		
		                		// 버튼 위치
		                		$('.btnClose').css({
		                			'position': 'absolute',
		                			'right': '0',
		                			'top': '0'
		                		});
		                		
		                		$('#modal_ifrmWrap').stop().animate({
		                			'opacity': 1
		                		});
		                	});
	                	}else{
	                		$('.modal_ifrmWrap.'+ settings.etcData1).find('#modalIfm_'+settings.etcData1).load(function(){
		                		
		                		var targetFrame = $.browser.msie&&$.browser.version=="7.0" ? this.contentWindow.document : this.contentDocument;
		                		
		                		/* 팝업 타이틀 가져오기 */
		                		var strTit = "";
		                		
		                		if(option.strTit!=undefined && option.strTit!=null && option.strTit!=""){
		                			strTit=option.strTit;
		                		}else{
		                			strTit=$(this).contents().find('#header .tit_1dpeth, .popHead h1').text();	
		                		}
		                		
		                		// 팝업 닫기 버튼
		                		var $btnClose = '<div class="'+settings.closeBtnClass+'"><button type="button" class="btn_close type_d"><span class="blind">레이어 닫기</span></button></div>';
		                		
		                		// 팝업 로드 후 팝업버튼 append 위한 처리 (20150722 jeha)
		                		if(!option.loadAfter){
		                			$btnClose = '<div class="'+settings.closeBtnClass+'"><button type="button" class="btn_close type_d"><span class="blind">레이어 닫기</span></button></div>';
		                		}

		                		// 팜업 타이틀 텍스트 생성
		                		$('#modal_ifrmWrap.'+ settings.etcData1 +' .tit_modalPop').text(strTit);
		                		
		                		// 팝업 버튼 생성
		                		$('#modal_ifrmWrap.'+ settings.etcData1).append($btnClose);
		                		
		                		// 버튼 위치
		                		$('.btnClose').css({
		                			'position': 'absolute',
		                			'right': '0',
		                			'top': '0'
		                		});
		                		
		                		$('.modal_ifrmWrap.'+ settings.layerClass).animate({
		                			'opacity': 1
		                		});
		                	});
	                	}

	                	
	                	break;
	            	}
	        	});		
	    	};
	})(jQuery);
	
	
	/* 팝업닫기에 해당하는 event.preventDefault 가 ie에 서 작동되지 않는점 보완한 함수 */
	function fn_preventDefaultHelper(event){
		var browerVersion = window.navigator.userAgent;
		if( browerVersion.indexOf('Mozilla/4.0') >= 0 ){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}
	
	/**
	 * 입력된 data가 null, undefined 인지 체크 판단하여 key 값에 따른 값을 리턴한다.
	 * 
	 * @param data
	 *            체크할 data
	 * @param strReKey
	 *            입력안할 경우 : 정상일경우 true, 비정상일 경우 false b : 정상일 경우 true, 비정상일 경우 false
	 *            s : 정상일 경우 입력된 data 반환, 비정상일 경우 빈스트링 반환 n : 정상일 경우 입력된 data 반환,
	 *            비정상일 경우 0 반환
	 * @param returnData
	 *            비정상일경우 리턴할 data
	 * @param rePlusEnd -
	 *            String - 접미어 설정 strReKey 값이 "s"일경우 입력된 값이 정상일 경우 접미어를 붙여서 리턴
	 *            비정상이거나 빈스트링일 경우 returnData 값을 리턴
	 */
	function util_chkReturn(data, strReKey, returnData, rePlusEnd) {
		
		var strType = jQuery.type(data);
		var bCheck = true;
		var bReturnData = true;
		var bRePlusEnd = false;
		var strRePlusEnd = "";
		
		if (strType == "null" || strType == "undefined") {
				bCheck = false;
		}
		
		if (jQuery.type(returnData) == "null" || jQuery.type(returnData) == "undefined"){
			bReturnData = false;
		}
		
		strType = jQuery.type(strReKey);
		
		if (strType == "null" || strType == "undefined" || strReKey == "b" || strReKey == "") {
			return bCheck;
		}
		
		if (rePlusEnd != null && rePlusEnd != undefined) {
			bRePlusEnd = true;
			strRePlusEnd = rePlusEnd;
		}
		
		if (bCheck == true) {
			if (strReKey == "s"){
				if (bRePlusEnd == true && data == ""){
					return returnData;
				} else if (bRePlusEnd == true){
					return data + strRePlusEnd;
				} else {
					if (data == "" && bReturnData == true){
						return returnData;
					} else {
						return data + "";
					}
					
				}
			} else {
				return data;
			}
		} else {
			if (strReKey == "s") {
				if (bReturnData){
					return returnData;
				} else {
					return "";
				}
			} else if (strReKey == "n") {
				if (bReturnData){
					return returnData;
				} else {
					return 0;
				}
			}
		}
		
		return bCheck;
	}
	
	/**
	 * 동적으로 inputTag를 만든다
	 */
	function util_makeInputTag(obj, parentKey) {
		var strHtml = "";
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			return String("");        
		} else {
			var n, v;
			for (n in obj) {
				v = obj[n];                
				t = typeof(v);
				if (obj.hasOwnProperty(n)) {
					var inId, inName;
					if("" == parentKey){
						inId = n, inName = n;
					}else{
						inId = parentKey + n, inName = parentKey;
					}
					if (t == 'string'){
						strHtml += "<input name=\"" + inName + "\" id=\"" + inId + "\" type=\"hidden\" value=\'" + v + "\' />";
					}else if (t == "object" && v !== null){// 객체나 배열일 경우 같은 name으로
															// 묶어서 하위에서 재귀적 처리
						strHtml += util_makeInputTag(v, parentKey + "[" + n + "]"); 
					}else{
						strHtml += "<input name=\"" + inName + "\" id=\"" + inId + "\" type=\"hidden\" value=\'" + v + "\' />";
					}
				}            
			}            
			return strHtml;
		}    
	}
	
	/*모달팝업에서 [닫기] 버튼 클릭 시 호출되는 함수*/
	function fn_OnClickPopupClose(e){
		var curID = location.href.split('/')[location.href.split('/').length-1].split('.')[0];
		//결재완료 모달화면에서 닫기 버튼 호출시 다음화면으로 진행하기 위해서 체크로직 삽입
		if(curID == "HPPC32P0"){
			//alert(curID+"==="+objOrgInSData.atmtUwYn);	
			$(parent.location).attr("href","javascript:showLoading();javascript:nextPage('" + objOrgInSData.atmtUwYn + "');");
		}
		
		closeModal(e);
	}
	
	/**
	 * 로딩화면을 보이게 한다.
	 */
	function showLoading(){
		$('#loadingArea').show();
	}

	/**
	 * 로딩화면을 닫는다.
	 */
	function closeLoading(){
		$('#loadingArea').hide();
	}