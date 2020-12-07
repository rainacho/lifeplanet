/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * DESCRIPTION : 페이지 전역에서 사용되는 main 함수 집합
 * ========================================================================== */

$(document).ready(function() {
	
	logger.log('[READY] Now Use jQuery --------------------------------------');
	
	Main.readyEvent();

	/**
	 * 에러 발생시 에러 처리기 등록
	 */
	window.onerror = function ( msg, url, lines , column , errorObj )
	{
	    logger.log('>>> Catch Error Log Start >>>');

	    logger.log('* message : ' + msg);
	    logger.log('* path    : ' + url);
	    logger.log('* line    : ' + lines);
	    
	    logger.log('<<< Catch Error Log END <<<');
	    
		if(lifeplanetServer(url)){
		    //스크립트 에러로그 삽입
		    scriptErrorLogFnc(msg, url, lines , column , errorObj);
		}
	};
	
});

var lifeplanetServer = function(url) {
	
	var host = util.nvl(url,"");
	
	if ( host.indexOf('http://127.0.0.1') > -1 
	  || host.indexOf('http://localhost') > -1
	  || host.indexOf('http://192.168') > -1) {
		return  true;
	} else if (host.indexOf('http://hpd.lifeplanet.co.kr') > -1) {
		return  true;
	} else if (host.indexOf('https://hpt.lifeplanet.co.kr') > -1) {
		return  true;
	} else if (host.indexOf('https://www.lifeplanet.co.kr') > -1) {
		return  true;
	}else{
		return false;
	}
};

//스크립트 에러로그 삽입
var scriptErrorLogFnc = function(msg, url, lines , column , errorObj){
	
	var stackTrace = "";
	
	if(errorObj!=undefined && errorObj !=null ){
		stackTrace = errorObj.stack;
	}
	 
		
	try{
		$.ajax({type        : "POST"
			,async       : true //비동기방식
			,url         : "/common/cc/HPCommonUtil.ajax"
				,dataType    : "json"
					,data        : {"tradeKey" :"scriptErrorLog" , "message" : msg , "path" : url ,"line":lines , "stackTrace":stackTrace }
		,error       : function(data){ //통신 에러 발생시 처리
		}
		,success     : function(data){ //통신 성공시 처리
		} 
		});
	}catch(e){}
 
    
};

/**
 * Config에 등록된 환경변수 취득
 * 
 * @author	권대준, djkwon@kico.co.kr
 */
var environment = (function() {
    var _public = {};
    
    /**
     * 환경변수 Named으로 값 취득
     * @param envName
     * @returns
     */
    _public.getEnv = function(envName) {
    	
    	return config[envName];
    	
    };
    
    /**
     * 브라우저 정보 취득
     */
    _public.getBrowserInfo = function() {
		
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
var Main = (function() {
	var _public = {};
	
	/**
	 * Form 객체를 Object 형태로 변환해주는 함수 구현
	 * NOTE : Form 의 Name Attribute를 Key로 사용하기 때문에 Name을 반드시 
	 * 		  입력해야 한다.
	 */
	(function($) {
	    $.fn.serializeObject = function() {

	        var self = this,
	            json = {},
	            push_counters = {},
	            patterns = {
	                'validate': /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
	                'key':      /[a-zA-Z0-9_]+|(?=\[\])/g,
	                'push':     /^$/,
	                'fixed':    /^\d+$/,
	                'named':    /^[a-zA-Z0-9_]+$/
	            };


	        this.build = function(base, key, value) {
	            base[key] = value;
	            return base;
	        };

	        this.push_counter = function(key) {
	            if (push_counters[key] === undefined) {
	                push_counters[key] = 0;
	            }
	            return push_counters[key]++;
	        };

	        $.each($(this).serializeArray(), function() {

	            // skip invalid keys
	            if ( ! patterns.validate.test(this.name)) {
	                return;
	            }

	            var k,
	                keys = this.name.match(patterns.key),
	                merge = this.value,
	                reverse_key = this.name;

	            while((k = keys.pop()) !== undefined) {

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

		if(util.isNull(paramPath)) {
			
			/**
			 * AS-IS 페이지에서 해당 UTIL을 사용할 때 에러가 발생 하여 이를 방지하기 위한 
			 * 방법으로 try~catch로 처리한다.
			 * */
			try {
				
				path = globalVar.getParam('_CUR_URI').split('.')[0];
			} catch (e) {
				
				path = '';
			}
		} else {
			// path = paramPath.replace('.dev', '');
			path = paramPath.split('.')[0];
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
		
		if (jsPath) {
			
			jsPath = jsPath + '.js';
			PageUtil.loadJavascript(jsPath, param, popupId);
		}
	};
	
	/**
	 * 공통 코드 취득 함수
	 * @param typeId
	 * @param grouId
	 */
	_public.getCommonCode = function(typeId, grouId) {
		
		// 기본 - [공통코드] 호출
		var commonCode = null;

		var xhr = new XMLHttpRequest();
		var url = location.protocol + "//" + location.host + 
				  "/common/cc/RetrieveCommonCode.ajax?" +
				  "typeId=" + typeId + "&tradeKey=" + constants.getVal('RETRIEVE');
		
		// 인자2개 - [공통코드그룹]
		if(arguments.length == 2 && grouId != undefined && grouId != ""){
			url += "&grouId=" + grouId;
		}
		
		xhr.open("POST",url, false);
		xhr.send(null);
		
		commonCode = JSON.parse(xhr.responseText);
		
		if (util.isNull(commonCode)) {
			return new Array();
		} else {
			return commonCode.result.outData;
		}
		
	};
	
	/**
	 * 홈페이지 공통 코드 취득 함수
	 * @param typeId
	 * @param grouId
	 */
	_public.getHpCommonCode = function(typeId) {
		
		// 기본 - [공통코드] 호출
		var commonCode = null;

		var xhr = new XMLHttpRequest();
		var url = location.protocol + "//" + location.host + 
				  "/common/cc/RetrieveCommonCode.ajax?" +
				  "typeId=" + typeId + "&tradeKey=getHpCmnncd";

		
		xhr.open("POST",url, false);
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
	_public.getLasaWatcNm = function(lasaWatcNo) {
		// 기본 - [공통코드] 호출
		var codeList=  Main.getHpCommonCode('10002');
		var lasaWatcNm = '';
		
		for (var i=0 ; i < codeList.length; i++){
			if (lasaWatcNo == codeList[i].cmnnCd){
				lasaWatcNm = codeList[i].cmnnCdNm;
			}
		}
		
		return lasaWatcNm;
		
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
		if(arguments.length == 3 && grouId != undefined && grouId != ""){
			codeDatas = util_getCommonCode(typeId,grouId);
			
		// 인자2개 - [공통코드] 호출
		}else{
			codeDatas = Main.getCommonCode(typeId);
		}
		
		if (codeDatas.length < 1) {
			logger.alert('공통 코드가 존재하지 않습니다.');
			return;
		}
		
		var strHtml = '';
		for ( var i = 0; i < codeDatas.length; i++) {
			strHtml += '<option id="'+ codeDatas[i].cmnnCd +'">' + codeDatas[i].cmnnCdHanNm + '</option>';
		};
		
		strHtml = '<select>' + strHtml + '</select>';
		$('#' + nodeId).html(strHtml);
		
	};
	
	/**
	 * 로그아웃 로직
	 */
	_public.logout = function() {
		
		if(confirm(message.getMsg('COM011'))){
			location.href = '/common/cc/LogOut.dev';
		}
		return;
		
	};
	
	/**
	 * 기본 로딩창을 생성한다.
	 */
	_public.onLoading = function(){
		if(location.href.indexOf("innovation") > -1){
            $('#area_loading').show();
        }else{
            $('#loadingArea').show();
        }
	};
	
	/**
	 * 기본 로딩창을 제거한다.
	 */
	_public.offLoading = function(){
		if(location.href.indexOf("innovation") > -1){
            $('#area_loading').hide();
        }else{
            $('#loadingArea').hide();
        }
	};
	
	/**
 	 * 적용이율 취득 함수
 	 * @param typeId
 	 * @param grouId
 	 */
 	_public.getRate = function(flctIratScLrclCd, pbanIratScCd, flctIratScCd) {
 		
 		// 기본 - [공통코드] 호출
 		var rate = 0;

 		var xhr = new XMLHttpRequest();
 		var url = location.protocol + "//" + location.host + 
 				  "/common/cc/RetrieveRate.ajax?" +
 				  "flctIratScLrclCd=" + flctIratScLrclCd + "&pbanIratScCd=" + pbanIratScCd + "&flctIratScCd=" + flctIratScCd + "&tradeKey=" + constants.getVal('RETRIEVE');
 		
 		
 		xhr.open("POST",url, false);
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
var message = (function() {
	var _public = {};
	
	/**
	 * Message ID, Arguments 를 전달 받아서 공통 메세지를 리턴해주는 함수
	 * @param msgId
	 * @param args
	 * @returns {String}
	 */
	_public.getMsg = function(msgId, args) {
		
		
		// 인자값 validate
		if (arguments.length  < 1 || typeof msgId != 'string') {
			logger.alert('인자값이 정확하지 않습니다.');
			return
		}
		
		var returnMsg = ''; // 리턴 메세지 정의
		if (arguments.length == 1 || util.isNull(args)) {

			// arguments가 존재 하지 않는 경우 : 단순 메세지 출력
			returnMsg = mwMessageDefine.getMsg(msgId);
			
		} 
		else {
			
			// arguments가 존재 하는 경우
			var tmpMsg = mwMessageDefine.getMsg(msgId);
			if(typeof args == 'string') {
				
				//인자값이 하나인 문자열인 경우
				tmpMsg = tmpMsg.replace('[@]', args);
			} else {
				
				//인자값이 여러개인 배열인 경우 (스크립트에서 예) message.alert('VLD007', ['100','200']) 형식으로 사용한다 )
				for ( var i = 0; i < args.length; i++) {
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
	_public.alert = function(msgId, args) {
		
		var msg = message.getMsg(msgId, args);
		if ( ! util.isNull(msg)) {
			
			/**
			 * TODO : alert 관련 추가 작업이 필요한 경우 이곳에 추가 
			 */
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
var logger = (function() {
	var _public = {};
	
	_public.logEnabled = function() {
		return config.getEnv('loggerEnable');
	};
	
	_public.errorEnabled = function() {
		return config.getEnv('errorLoggerEnable');
	};
	
	/**
	 *  console.log 관리 함수
	 * @param obj
	 */
	_public.log = function(obj) {
		
		// IE의 경우 console 사용 불가
		if(environment.getBrowserInfo() !== 'IE' && logger.logEnabled()){
			console.log(obj);
		} else {
			
		}
	};

	/**
	 *  console.error 관리 함수
	 * @param obj
	 */
	_public.error = function(obj) {
		// IE의 경우 console 사용 불가
		if(environment.getBrowserInfo() !== 'IE' && logger.logEnabled()){
			console.error(obj);
		} else {
			
		}
	};
	
	/**
	 *  console.info 관리 함수
	 * @param obj
	 */
	_public.info = function(obj) {
		// IE의 경우 console 사용 불가
		if(environment.getBrowserInfo() !== 'IE' && logger.logEnabled()){
			console.info(obj);
		} else {
			
		}
	};
	
	/**
	 *  console.warn 관리 함수
	 * @param obj
	 */
	_public.warn = function(obj) {
		// IE의 경우 console 사용 불가
		if(environment.getBrowserInfo() !== 'IE' && logger.logEnabled()){
			console.warn(obj);
		} else {
			
		}
	};

	/**
	 *  alert 관리 함수
	 * @param obj
	 */
	_public.alert = function(obj) {
		alert(obj);
	};
	
	return _public;
})();

/**
 * 페이지전역에서 사용되는 공통함수
 * 
 * @author	권대준, djkwon@kico.co.kr
 */
var transaction = (function() {
	var _public = {};
	var _private = {
		
		GLOBAL_VAR : '',
		
		/**
		 * 거래를 실행하고 AJAX 거래처리 경우 성공여부에 따른 콜백을 호출해주고 결과를 반환해준다.
		 * 
		 * @param tranProp {Object} 거래처리속성
		 * @return {Object} AJAX 거래처리 경우에만 결과가 반환된다.
		 */
		execute : function(tranProp) {
			
			if (tranProp.loadFlag) {
				Main.onLoading();
			}
			
			var makeUrl = tranProp.url + '.ajax';

			// ----------------------------------------------------------------
			// Parameter 전처리 셋팅
			// ----------------------------------------------------------------
			
			// 1. Trade Key, 현재 요청페이지 병합 
			var concatParams = {'tradeKey' : tranProp.tradeKey, 'scrnId' : window.location.pathname.split("/").pop().split(".")[0]};
			tranProp.params = util.concat(concatParams, typeof tranProp.params === 'object' ? tranProp.params : {});
			
			// 2. 파라메터에 폼요소들을 합친다.
			if (typeof tranProp.dataForm != 'undefined') {
				tranProp.params = util.concat(tranProp.params, tranProp.dataForm.serializeObject());
			}
			
			// 3. 거래 AJAX전송 전 출력
			if (logger.logEnabled()) {
				logger.log('mw.core.js in transaction.execute');
				logger.log('tranProp URL[' + tranProp.url+ '] params : ' + JSON.stringify(tranProp.params));
			}
			

			var astxE2eTmp="";
			var astxChk="";
			var astxE2eVal="";
			try{
				astxE2eTmp=JSON.parse(JSON.stringify(tranProp.params));
				if(astxE2eTmp.e2e_data1!=undefined){
					astxChk="Y";
					astxE2eVal=astxE2eTmp.e2e_data1;
				}
			}catch(e){
				//alert("astx 파싱 오류 : "+e);
			}
			
			
			// 4. DATA 형식에 맞도록 수정
			// TODO : DATA Object => 사용자 Data 영역, HEADER Object => 공통 데이터 영역
			if(astxChk=="Y"){
				tranProp.params = {
						JSON_DATA : JSON.stringify(tranProp.params, null, 2),
						e2e_data1 : astxE2eVal
					};
			}else{
				tranProp.params = {
						JSON_DATA : JSON.stringify(tranProp.params, null, 2)
					};	
			}
			
			
			//성공 또는 실패에 대한 결과메시지를 작성하여, 콜백함수를 호출한다.
			var resultMessageFunc = function(recvTranData) {
				
				recvTranData = recvTranData.result;
				
				// 성공여부 판단
				var isSuccess = false; 
				var message = '';
				
				if(!util.isNull(recvTranData.outData)){
					
					if(util.isNull(recvTranData.outData.ERROR_CODE)){
						isSuccess = true;
					}
					
				}
				
				logger.log('[LOG] START [[ recvTranData ]] ===>');
				logger.log(recvTranData);
				logger.log('[LOG] END   [[ recvTranData ]] ===>');
				
				if (isSuccess) {
					
					if (tranProp.success) {
						
						// TODO: return data 형식이 정리되면 변경
						// recvTranData = recvTranData.result.outData;
						
						tranProp.success(recvTranData, message);
					}
				}
				else {						
					
					// TODO: 메시지 포맷 정의 필요
					// message = recvTranData.outData.ERROR_CODE + ' : ' + recvTranData.outData.ERROR_MSG;
					message = recvTranData.outData.ERROR_MSG;
					
					/**********************************************************
					 * 
					 * TODO : 서버단의 실패코드가 확정된 이후 실패 전처리/후처리 코드 삽입.
					 * 
					 * 1) 성공/실패 여부 판단. 2) 사용자정의 failure 콜백 존재 여부 판단
					 * 
					 **********************************************************/
					
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
			
			
			/******************************************************************
			 * NOTE : data는 json 형태와 key,value 형태 두가지 모두 지원한다.
			 *        주의할 점은 두가지 형태를 섞어서 사용할 수는 없다.
			 * 		  MW에서는 json형태를 권장하고, 사용한다.
			 *        ex) {ver:'1.0', 'loginYn':'Y'} -> 가능
			 *            ver=1.0&loginYn=Y			 -> 가능
			 *            {ver:'1.0'}&loginYn=Y		 -> 불가능
			 ******************************************************************/
			// 4. 거래 시작
			var resData = jQuery.ajax({
				type    : tranProp.method ,
				url     : makeUrl,
				data    : tranProp.params,
				dataType: 'text',
				async   : tranProp.asyncFlag,
				success : function(data, resStatus) {
					
					if (tranProp.loadFlag) {
						Main.offLoading();
					}
					
					var resultData = '';
					try {
						
						try {
							resultData = JSON.parse(data);
						}
						catch(jsonError) {
							throw {
								name : 'JsonError', 
								message : '데이터 파싱을 실패하였습니다.', 
								cause : jsonError
							};
						}
					}
					catch(tError) {
						//응답 형식이 올바르지 않습니다
						resultData = JSON.parse(
								"{\"ERROR_CODE\":\"9999\",\"prcSts\":\"F\",\"ERROR_MSG\":\"" 
									+ tError.name + " : " + tError.message + "\"}");
						
						if (logger.errorEnabled()) {
							logger.error('basic.js in transaction.execute');
							logger.error(tError);
							logger.error(resultData);
						}
					}
					
					resultMessageFunc(resultData);
				},
				error : function(xhr, resStatus, err) {
					
					Main.offLoading();
					
					xhr.abort();

					var recvTranData = JSON.parse("{\"ERROR_CODE\":\"" + resStatus + "\"," + "\"ERROR_MSG\":\"서버와의 통신이 원활하지 않습니다.\"}");
					
					if (recvTranData.ERROR_CODE == 404) {
						recvTranData.ERROR_MSG = '서버에서 페이지를 찾을 수 없습니다.';
							recvTranData.ERROR_MSG += '\nURL이 올바른 확인하십시오!';
					}
					else {
						
						
						if (recvTranData.ERROR_CODE == 500) {
							recvTranData.ERROR_MSG = '네트워크 통신이 원활하지 않습니다.';
						}
						else {
							
							recvTranData.ERROR_MSG += '\n' + '9999';
						}
						
						recvTranData.ERROR_MSG += '\n' + '지속적인 문제발생시 시스템 관리자에게 문의하시기 바랍니다. ';
					}
					
					var returnObj = {
							result : {
								outData : recvTranData
							}
					};
					
					/**
					 * TODO: 404, 500 에러등에 대해서 처리 여부 결정 필요
					 * 		 현재는 alert으로 처리.
					 */
					resultMessageFunc(returnObj);
				}
			});   
			
			
			
			return resData;
		}, 
		
		/**
		 * 거래 처리가 성공할 경우 호출되어 지는 함수이다.
		 * 
		 * @param recvTranData {Object} 응답거래 데이터
		 */
		recvTranForSuccess : function(recvTranData) {
		},

		/**
		 * 거래 처리가 성공할 경우 호출되어 지는 함수이다.
		 * 
		 * @param recvTranData {Object} 응답거래 데이터
		 */
		recvTranForFailure : function(recvTranData) {
		}
			
	};
	
	/** 
	 * 거래공통 기본 오브젝트이다.
	 * 
	 * [선택] 거래방식 		 - ajaxFlag : true,
	 * [선택] 화면잠금여부 	 - blokingFlag : true or false,
	 * [필수] 거래주소 		 - url : undefined,
	 * [필수] 거래식별자	 - tradeKey : undefined,
	 * [선택] 비동기여부 	 - asyncFlag : true,
	 * [선택] 데이터파라메터 - params : '',
	 * [선택] 데이터폼 		 - dataForm : undefined,
	 * [선택] 로딩화면표시여부 - loadFlag : true or false
	 * [선택] 성공처리콜백 	 - success : _private.recvTranForSuccess,
	 * [선택] 실패처리콜백 	 - failure : _private.recvTranForFailure
	 */
	_public.TRAN_COMM_PROP = {
		method      : 'POST',
		ajaxFlag 	: true,
		blokingFlag : true,
		url         : undefined,
		tradeKey    : undefined,
		asyncFlag   : true,
		params      : '',
		dataForm    : undefined,
		loadFlag	: true,
		success     : _private.recvTranForSuccess,
		failure     : _private.recvTranForFailure
	};
	
	_public.callTran = function (tranProp) {
		try {
			
			//화면이 잠겨있지 않으면 화면을 잠근다.
			if (tranProp.blokingFlag) {
				// TODO 화면 block 함수 추가
			}
			
			//비동기 거래처리을 요청한다.
			return _private.execute(tranProp);
		}
		catch(e) {
			// alert(e);
			(function(causeErr) {
				var thrown = {
					name : 'TransactionError', 
					message : '거래 처리를 실패하였습니다.', 
					cause : causeErr
				};
				
				if (logger.errorEnabled()) {
					logger.error('basic.js in transaction.callTran');
					logger.error(JSON.stringify(thrown));
				}
				
				throw thrown;
			}(e));
		}
	};
	
	_public.addReqTime = function(url) {

		// IOS에서 동일한 url request에 대해 캐싱을 하기에 url_time stamp를 이용하여 캐싱이 안되도록 방지.
		if (url.indexOf('jsp') < 0) {
			url = (url + "&url_time=" + new Date().getTime() + "");
		} else {
			if (url.indexOf('.jsp?') < 0) {
				url = (url + "?url_time=" + new Date().getTime() + "");
			} else {
				url = (url + "&url_time=" + new Date().getTime() + "");
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
var Picker = (function() {
	var _public = {};
	

	/**
	 * Array를 Picker.select 에 맞도록 수정한다.
	 * 
	 * @param inputArr
	 * @param key
	 * @param value
	 * @returns {Array}
	 */
	_public.makeTVArray = function(inputArr, key, value){
		var returnArray = [];
		
		
		for ( var i = 0; i < inputArr.length; i++) {
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
	_public.select = function(option) {
		
		if (util.chkReturn(option.id, "s") == ""){
			// ID가 입력되지 않았습니다.		
			return;
		}
		if (util.chkReturn(option.title, "s") == ""){
			// 타이틀이 입력되지 않았습니다.		
			return;
		}
		if (util.chkReturn(option.data, "s") == ""){
			// 데이터가 올바르지 않습니다.		
			return;
		}
		
		$('#' + option.id).mobiscroll().select({
			
			// *** 고정영역 *** Start
	        theme: 'mobiscroll',
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
	            
	            if (!util.chkReturn(option.onChange, "s") == ""){
	            	option.onChange(valueText, inst);
	    		}
	            
	        },
	        //Call onSelect function
	        onSelect: function (valueText, inst) {
	        	
	        	// logger.log(inst.getVal()); //selected value
	        	// logger.log(valueText); //selected text
	            
	        	if (!util.chkReturn(option.onSelect, "s") == ""){
	        		option.onSelect(valueText, inst);
		    	}
	        }
	        // *** 가변영역 *** End
	    });
		
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
	_public.getVal = function(id) {
		
		return $('#' + id ).mobiscroll('getVal');
		
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
	_public.date = function(option) {
		
		var now = new Date();
		
		if (util.chkReturn(option.id, "s") == ""){
			// ID가 입력되지 않았습니다.		
			return;
		}
		if (util.chkReturn(option.title, "s") == ""){
			// 타이틀이 입력되지 않았습니다.		
			return;
		}
		if (util.chkReturn(option.format, "s") == ""){
			// 형태가 입력되지 않았습니다.		
			return;
		}
		if (util.chkReturn(option.date, "s") == "" || !util.isDate(option.date)){
			option.date = util.getDate();
		}
		if (util.chkReturn(option.startYear, "s") == ""){
			option.startYear = '2000';
		}
		if (util.chkReturn(option.endYear, "s") == ""){
			option.endYear = now.getFullYear()+3;
		}
		
	    $('#' + option.id).mobiscroll().date({
	        theme: 'mobiscroll',
	        display: 'bottom',
	        mode: 'scroller',
	        animate: 'slideup',	
            showLabel: true,
            inputClass: 'birth mobipick',
            endMonth: now.getMonth(),
	        endDate: now.getDate(),
	        rtl: true,
	        
	        startYear: option.startYear,
	        endYear: option.endYear,
	        dateOrder: 'yymmdd',
	        headerText: '<p style="font-weight:bold;font-size:25px">'+option.title+'</p>',
	        dateFormat: option.format
	    });
	    
	    var year  = option.date.substr(0, 4);
	    var month = option.date.substr(4, 2);
	    var day   = option.date.substr(6, 2);
	    
	    //Date set
	    $('#' + option.id).mobiscroll('setDate', new Date(year, month-1, day));
	    
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
	_public.calendar = function(option) {
		
		if (util.chkReturn(option.id, "s") == ""){
			// ID가 입력되지 않았습니다.		
			return;
		}
		if (util.chkReturn(option.date, "s") == "" || !util.isDate(option.date)){
			option.date = util.getDate();
		}
		
		$('#' + option.id).mobiscroll().calendar({
            theme: 'mobiscroll',
            display: 'modal',
	        animate: 'slideup',	
            controls: ['calendar'],
            swipeDirection: 'vertical',
            dateOrder: 'ddmmyy',
            dateFormat: option.format
        });
		
		var year  = option.date.substr(0, 4);
		var month = option.date.substr(4, 2);
		var day   = option.date.substr(6, 2);
		    
		//Date set
		$('#' + option.id).mobiscroll('setDate', new Date(year, month-1, day));
		
		// inputbox에 readonly를 추가한다.
		if (util.isNull($('#' + option.id).attr('readonly'))) {
			$('#' + option.id).attr('readonly', 'readonly');
		}
		
		// 달력버튼 생성
		var calendarButtonTag = '<button type="button" id="'+ option.id +'_button" class="icon50 icon_calendar">달력</button>';
		$('#' + option.id).after(calendarButtonTag);
		
		// 생성된 버튼의 터치 이벤트 삽입
     	$('#' + option.id + '_button').on('tap, mousedown', function(e){
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
	_public.getDate = function(id, format, esc) {

		var returnDate = '';
		
		// 입력이 되지 않은 경우 빈 string 반환
		if($('#' + id ).val() == '' && !esc) {
			return returnDate;
		}
		
		if (format.indexOf('yyyy') > -1) {
			
			returnDate += new Date($('#' + id ).mobiscroll('getVal')).getFullYear();
			
		} else if(format.indexOf('yy') > -1) {
			
			returnDate += new Date($('#' + id ).mobiscroll('getVal')).getFullYear();

		}
		
		if (format.indexOf('mm') > -1) {
		
			var getMonth = (new Date($('#' + id ).mobiscroll('getVal')).getMonth())+1;
			if (String(getMonth).length == 1) {getMonth = "0" + getMonth;}
			
			returnDate += getMonth;
			
		}
		
		if (format.indexOf('dd') > -1) {
			
			var getDate = new Date($('#' + id ).mobiscroll('getVal')).getDate();
			if (String(getDate).length == 1) {getDate = "0" + getDate;}
			
			returnDate += getDate;
		
		}
		
		return returnDate;
		
	};
	
	/**
	 * mobiscroll 을 사용하여 생성된 select 의 enable
	 * @param id
	 */
	_public.enable = function(id) {
		
		$('#' + id).mobiscroll('enable');
		
	};

	/**
	 * mobiscroll 을 사용하여 생성된 select 의 disable
	 * @param id
	 */
	_public.disable = function(id) {
		
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
	_public.setVal = function(type, id, value) {
		
		if(type == 'select') {
			
			$('#' + id).mobiscroll('setVal', value, true);
			
		} else if (type == 'date' || type == 'calendar') {
			
			var year  = value.substr(0, 4);
			var month = value.substr(4, 2);
			var day   = value.substr(6, 2);
			var nowDate = new Date(year, month-1, day);
			
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
var footerCore = (function() {
    var _public = {};
    
    /**
     * 
     * @param envName
     * @returns
     */
    _public.callPage = function(_this) {
    	
    	var _pageId = $(_this).attr('id');
    	
    	var path = '/common/ce/' + _pageId;
		var paramObj = {};
		PageUtil.movePage(path, paramObj);
    };
    
    
    return _public;
})();

/**
 * 청약 header 관련 함수
 * 
 * @author	조정훈, 513176@lifeplanet.co.kr
 */
var paHeaderCore = (function() {
    var _public = {};
    
    /**
     * 
     * @param envName
     * @returns
     */
    _public.callPage = function(_this) {
    	
    	var _pageId = $(_this).attr('id');
    	
		var option = {
			id : 'popupwrap',
			location : 'external',
			content : 'content1',
			url : '/products/pa/' + _pageId + '.dev',
			pageParam : ''
		};
		PageUtil.openPopup(option);
    };
    
    
    return _public;
})();

var ssManager = (function() {
    var _public = {};
    var _private = {};
    
    _private.storage = sessionStorage;
    
    _public.setItem = function(key, data) {
    	try{
	    	var jsonStr = JSON.stringify(data);
	    	_private.storage.setItem(key, jsonStr);
    	}catch(e){
    		logger.error(e);
    	}
    };
    
    _public.getItem = function(key){
    	try{
	    	var strJSON = _private.storage.getItem(key);
	    	
	    	//strJSON이 undefiend일 경우 null 반환
	    	if(strJSON == 'undefined'){
	    		return;
	    	}
	    	
	    	return JSON.parse(strJSON);
    	}catch(e){
    		logger.error(e);
    	}
    };
    
    _public.remove = function(key){
    	try{
    		_private.storage.removeItem(key);
    	}catch(e){
    		logger.error(e);
    	}
    };
    
    _public.removeAll = function(){
    	try{
    		_private.storage.clear();
    	}catch(e){
    		logger.error(e);
    	}
    };
    
    
    return _public;
})();