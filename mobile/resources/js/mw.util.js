/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 기존 홈페이지 시스템
 * FILE INFO   : mw.util.js, /resources/js/
 * DESCRIPTION : 페이지 전역에서 사용되는 util 함수 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 홈페이지 2014-11-20	 	initial version
 * 시스템
 * 권대준	2014-12-11		KDIMW에 맞도록 구조 수정  			
 * ========================================================================== */

/******************************************************************************
 * [NOTE] : 기존 홈페이지 시스템에서 사용하던 util.js를 기반으로 KDIMW에서 사용하는
 * 		    구조로 수정을 진행함. 한가지 파일에 너무 많은 util이 산재되어 있어서 
 *		    검색이 용이하지 않아 목적에 맞는 util 별로 구조를 분산함.
 *		  
 *		    - mw.util.js 		: util의 메인으로 object를 생성한다.		  
 *		    - mw.util.date.js 	: date 관련 유틸의 집합		  
 *		    - mw.util.mask.js 	: masking, formatter 관련 집합		  
 *		    - mw.util.object.js : object 관련 함수의 집합		  
 *		    - mw.util.string.js : string 관련 함수의 집합		  
 *		    - mw.util.event.js 	: event 관련 함수의 집합		  
 *
 ******************************************************************************/

/**
 * Util성 함수 정의
 * 
 * @author	권대준, djkwon@kico.co.kr
 */
var util = (function() {
    var _public = {};
    
    /**
     * Object의 Null 여부 체크
     * @param obj
     * @returns {Boolean}
     */
    _public.isNull = function(obj) {
    	
    	if (typeof obj == 'undefined' || obj == null || obj == '') {
    		return true;
    	} else {
    		return false;
    	}
    	
    };
    
    /**
     * 브라우저 종류를 리턴한다.
     * @returns	- String - 문자열 리턴 - ie:익스프로러,ff:파이어폭스,sf:사파리,op:오페라,cr:크롬
     */
    _public.getBw = function () {
    	if ($.browser.msie){
    		return "ie";
    	} else if ($.browser.mozilla){
    		return "ff";
    	} else if ($.browser.safari){
    		return "sf";
    	} else if ($.browser.opera){
    		return "op";
    	} else if ($.browser.chrome){
    		return "cr";
    	} else {
    		return "";
    	}
    	
    	return "";
    };

    /**
     * 브라우저 버전을 리턴한다.
     * @returns
     */
    _public.getBwVr = function () {
    	return $.browser.version;
    };

    
    /**
     * 파일 다운로드 기능
     * 
     * @param :
     *            fileName 다운로드 받을 파일명
     * 
     * downloadPathType는 다음을 참고하여 입력할 것 미입력 : /shrd001/homepage 0 보험약관 :
     * /shrd001/insuManual - 1 상품설명서 : /shrd001/goodsManual - 2 사업방법서 :
     * /shrd001/busiManual - 3 신청서류(마이페이지) : /shrd001/myApplyManual
     * 
     */
    _public.fileDownload = function(fileName, downloadPathType) {
    	Main.offDisableBack('fileDownload');
    	downloadPathType = util.chkReturn(downloadPathType,"s");
    	// 공통 다운로드 cmd
    	var downloadCmd = "/common/file/FileDownload";
    	// 화면에 추가할 html text를 만든다.
    	var strHtml = "";
    	
    	// IOS 의 경우 pdf 뷰가 사파리를 통해 가능 하기 때문에 별도의 새창을 연다.
    	var osName = MXP_PLUGIN.getOSInfo().name;
    	var iframe = '';
    	if(osName == "WEB_IOS") {
    		iframe	= '<div id="downloadIFrameArea" style="display:none"><iframe id="downloadIFrameId" name="downloadIFrameIdExt" title="다운로드용 프레임"></iframe></div>';
    	}
    	else {
    		iframe	= '<div id="downloadIFrameArea" style="display:none"><iframe id="downloadIFrameId" name="downloadIFrameId" title="다운로드용 프레임"></iframe></div>';
    	}

    	// 화면에 다운로드 폼이 있을경우
    	if ($("#downloadForm").length > 0) {
    		downloadCmd += ".dev";
    		$("#downloadForm").attr("action",downloadCmd);
    		$("#fileName").val(fileName);
    		$("#downloadPathType").val(downloadPathType);
    	}
    	// 화면에 다운로드 폼이 없을경우
    	else {
    		
    		if (osName != "APP_IOS") {
				
    			strHtml += "<form id=\"downloadForm\" name=\"downloadForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\" target=\"downloadIFrameId\">";
				strHtml += "<input name=\"fileName\" id=\"fileName\" type=\"hidden\" value=\"" + fileName + "\" />";
				strHtml += "<input name=\"downloadPathType\" id=\"downloadPathType\" type=\"hidden\" value=\"" + downloadPathType + "\" />";
				strHtml += "</form>";
    			
    			$("body").append(iframe);	// 화면에 form 등 생성
    			$("#downloadIFrameArea").append(strHtml);	// 화면에 form 등 생성
    		} else {
    			
    			strHtml += "<form id=\"downloadForm\" name=\"downloadForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\">";
    			strHtml += "<input name=\"fileName\" id=\"fileName\" type=\"hidden\" value=\"" + fileName + "\" />";
    			strHtml += "<input name=\"downloadPathType\" id=\"downloadPathType\" type=\"hidden\" value=\"" + downloadPathType + "\" />";
    			strHtml += "</form>";
    			
    		}
    	}
    	
    	if (osName != "APP_IOS") {
    	
    		$("#downloadForm").submit();	// submit
    	
    	} else {
    		
    		localStorage.setItem('downStrHtml', strHtml);
    		var param = {
				location : 'new',
				htmlTag : ''
    		};
    		PageUtil.openPopup(param);
    	
    	}

    };
    
    
    
    /**
     * 게약서류 파일 다운로드 기능
     * 
     * @param :
     *            fileName 다운로드 받을 파일명
     * 
     * downloadPathType는 다음을 참고하여 입력할 것 미입력 : /shrd001/homepage 0 보험약관 :
     * /shrd001/insuManual - 1 상품설명서 : /shrd001/goodsManual - 2 사업방법서 :
     * /shrd001/busiManual - 3 신청서류(마이페이지) : /shrd001/myApplyManual
     * 
     */
    _public.rxeDownload = function(insConno,fileName) {
    	Main.offDisableBack('fileDownload');
    	var downloadPathType = "20";
    	fileName = util.chkReturn(fileName,"s");
    	insConno = util.chkReturn(insConno,"s");
    	
     	if( insConno == "" || fileName == "" ){
    		alert("필수값이 누락되었습니다.")
    		return false;
    	}
     	
     	
     	var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
		tranProp.url        = '/common/cc/MWCommonUtil';           		// 트랜잭션 Url
		tranProp.tradeKey   = 'retrieveFxfFileSaveCursNm';       				// 트랜잭션 TradeKey
		tranProp.params     = {"fileName":fileName ,"insConno" : insConno};              // 트랜잭션 Parameter
		tranProp.success    =   function(data){
			Main.offDisableBack();
			
			var origin = location.origin;
			var filePath = '/commons/slink';
			var addPath = '';
			var fileInfo = data.outData.fxfFileSaveCursNm;
			
			if(fileInfo == undefined || fileInfo == ""){
				alert("정상적인 접근이 아닙니다.")
				return false;
			}
			
			var realName = origin + filePath+fileInfo;
			
			if (MXP_PLUGIN.getOSInfo().name.indexOf('IOS') > 0 || MXP_PLUGIN.getOSInfo().name == "WEB_PC") {
				
				var param = {
						location : 'url',
						url : realName
				};
				PageUtil.openPopup(param);
				
			} else {
				location.href = realName;
			}
		};
		tranProp.failure    =  function(data){
			logger.alert(data.outData.ERROR_MSG);
		};
		
		// 트랜잭션 실행
		transaction.callTran(tranProp);
		
     	
    };
    
    /**
     * 임시 13자리 가입설계 번호 생성
     * @param pcd
     */
    _public.makeRandomDN = function() {
    	
    	
    	var date = util.getDate().substr(2,8);
        var time = util.getTime();
        var randomStr = '';
		for ( var i = 1; i <= 3; i++) {
			if (Math.floor(Math.random() * 100) + 10 > 50) {
				// 대문자 A-Z 랜덤 알파벳 생성
				randomStr += String.fromCharCode((Math.random() * 26) + 65);
			} else {
				// 소문자 a-z 랜덤 알파벳 생성
				randomStr += String.fromCharCode((Math.random() * 26) + 97);
			}
		}
        
    	
    	return date + time + randomStr;
    	
    	
    };
    
    //임시 이벤트 시간 체크
   _public.eventChk = function() {
	   
       var today=util.getDate();
       var chk=true;
       var lastDay=Number("20150601");
       
       if(window.location.host.indexOf("localhost")>-1){
    	   lastDay=Number("20150526");
       }else if(window.location.host.indexOf("mwd.lifeplanet.co.kr")>-1){
    	   lastDay=Number("20150526");
       }else if(window.location.host.indexOf("mwt.lifeplanet.co.kr")>-1){
    	   lastDay=Number("20150528");    	   
       }else if(window.location.host.indexOf("m.lifeplanet.co.kr")>-1){
    	   lastDay=Number("20150601");
       }else{
    	   lastDay=Number("20150601");
       }

       if($.isNumeric(today)){
    	   if( Number(today) >= lastDay){
    		   chk=false;   
    	   }
       }
       return chk;
    	
    };
    
    
    _public.makeMoneyTxt2 = function (amt, isShort){
		isShort = (isShort) ? isShort : false;
		
		if(util.Number(amt)<10000000){
			isShort=false;
		}
		
		var insuAmt = util.floor((util.floor(amt,0))/100000000,(isShort ? 1 : 4));
		insuAmt = (insuAmt.split("."));		
		var insuAmt1 = insuAmt[0];
		var insuAmt2 = insuAmt[1];
		var insuAmtTxt = (Number(insuAmt1)>0 ? Number(insuAmt1)+"억":"") + (Number(insuAmt2)>0 ? Number(insuAmt2) + (isShort ? '천만' : '만'):"");
		if(insuAmtTxt == ""){
			insuAmtTxt=0;
		}
		return insuAmtTxt;
	};
	
	_public.makeMoneyTxt4 = function (amt) {
		
		var fullAmtTxt = Math.floor ((Math.floor (amt)/1000000)) + ''
		, arrAmtLabel = ['억', '천', '백']
		, arrAmt = []
		, arrResultText = []
		, fixValue = 3; 
		
		if (!amt) {
			return '0';
		}
		
		arrAmt = fullAmtTxt.split ('');
		fixValue -= arrAmt.length;
		
		$.each (arrAmt, function (idx, amt) {
			
			if (amt == '0') {
				return true;
			}
			arrResultText.push (amt);
			arrResultText.push (arrAmtLabel[ idx + fixValue ]);
		});
		
		if(util.Number(amt)<100000000){
			return arrResultText.join ('')+"만";	
		}else{
			return arrResultText.join ('');
		}
		
	};
	
	_public.makeMoneyTxt5 = function (amt) {

		var str = "";
		
		if (util.floor(amt/100000000,0) > 0){
			str += util.floor(amt/100000000) + "억"
			amt = amt % 100000000;
		}
		
		
		if (amt == 0){
			str += "원";
		}else{
			str += amt/10000 + "만원"
		}

		return str;
		
	};
	
	_public.dinosisAmtChk=function(amt){
		
		// 19.02.25 상품개정
		// 가입금액 = 진단보험금 동일하게 변경 (기존 가입금액 *2 = 진단보험금)

		return amt;
	};
    
	 _public.kyoboTimeChk=function(){
    	 var dataCode={};
    	 var sDay="";
    	 var sTime="";
    	 var eDay="";
    	 var eTime="";
    	 var sDateTime="";
    	 var eDateTime="";
    	 var alrtMsg="";
    	 
    	dataCode=Main.getCommonCode("11373");
    	//dataCode[0].cmnnCdHanNm="20151202000000";
    	//dataCode[1].cmnnCdHanNm="20151202180000";
    	 
    	 if(dataCode!=undefined && dataCode.length==2){
    		 if(dataCode[0].cmnnCdHanNm!=null && dataCode[0].cmnnCdHanNm.length>12){
    			 sDay=dataCode[0].cmnnCdHanNm.substring(0,8); 
        		 sTime=dataCode[0].cmnnCdHanNm.substring(8,12);	 
        		 sDateTime=dataCode[0].cmnnCdHanNm;	 
    		 }
    		 
    		 if(dataCode[1].cmnnCdHanNm!=null && dataCode[1].cmnnCdHanNm.length>12){
    			 eDay=dataCode[1].cmnnCdHanNm.substring(0,8); 
    			 eTime=dataCode[1].cmnnCdHanNm.substring(8,12);
    			 eDateTime=dataCode[1].cmnnCdHanNm;
    		 }
    	 }
    	 
    	 if(util.Number(sDateTime) > 0 && util.Number(eDateTime) >0 ){
    		 if(util.Number(util.getDateTime()) >= util.Number(sDateTime)  &&  util.Number(util.getDateTime()) <= util.Number(eDateTime)){
    			 alrtMsg="교보문고 시스템 교체 작업으로 인해\n서비스 이용이 불가하오니 작업완료 후\n이용하여 주십시오.";
    			 alrtMsg+="\n(중단일시 : "+util.setFmDate(sDay,".")+" "+sTime.substring(0,2)+":"+sTime.substring(2,4)+" ~ "+util.setFmDate(eDay,".")+" "+eTime.substring(0,2)+":"+eTime.substring(2,4)+")";
    			 alert(alrtMsg);
    			 return false;
    		 }
    		  
    	 }
    	 
    	 return true;
    	 
     };
    
     _public.esyLoginChk=function(){
    		
    		var esyLoginChk="N";
    		
    		if(typeof ahnlabEsyAhrzLogin != "undefined"){
    			esyLoginChk=ahnlabEsyAhrzLogin;
    		}
    		
    		if(esyLoginChk=="Y"){
    			alert("고객님은 신청하신 업무처리가 불가합니다.\n(공인인증 또는 지문인증 로그인을 통해 가능)");
    			return false;
    		}
    		
    		return true;
    	};
    	
    	_public.focusScrollTopEvt=function(targetClass){
    		
    		var popcontent = "" ;
    		
    		if(targetClass == undefined){
    			popcontent=".popcontent";	
    		}else if(targetClass  == "popup360"){
    			popcontent =".b-ajax-wrapper";
    		}else{
    			popcontent=".popcontent";
    		}
    		
    		var pageTop = $(document).scrollTop();
    		
    		//키패드 가림 현상으로 인한 수정
			var evtTimer = setInterval(function (){
				if(ui !=undefined){
					 clearInterval(evtTimer);
					 if (!navigator.userAgent.match('iPhone') ) {
						 if($(window).width() < 770){
							 var currTop = 0;
							 $(popcontent).off("scroll");
							 $(popcontent).on("scroll", function() {
								 currTop = $(this).scrollTop() ;
							 });
							 
							 $(document).off('focusin', '.popup textarea');
							 $(document).on('focusin', '.popup textarea', function() {
								 $(popcontent).animate({
									 scrollTop: (currTop + ($(this).offset().top) - pageTop)- 100
								 }, 400);
							 });
							 console.log("height")
							 
							 $(document).off('focusin', '.popup input');
							 $(document).on('focusin', '.popup input', function() {
								 if (
										 
										 ($(this).attr('type') == 'text' || $(this).attr('type') == 'search' || $(this).attr('type') == 'email' || $(this).attr('type') == 'tel') &&
										 $(this).is('.mobipick') == false) { // 151123 수정( 모비픽커선택시 스크롤되는 현상 대응)
									 $(popcontent).animate({
										 scrollTop: (currTop + ($(this).offset().top) - pageTop)- 100
									 }, 400);
								 }
							 });
						 }else{
							 $(document).off('focusin', '.popup textarea');
							 $(document).off('focusin', '.popup input');
						 }
					 }
				}
			});
       		 
       	};
       	
       	_public.mwpdFooterBtn=function(){
		
			
			var html ='';
			
			html+='<ul class="clearfix">																														';
			html+='		<li class="one"><a href="javascript:;" data-pop="btn_mwct121p1" class="call">전화상담예약</a></li>                                                               ';
			html+='		<li class="two"><a href="javascript:;" class="mycart">내설계함</a></li>                                                                 ';
			html+='		<li class="thr">                                                                                                                        ';
			html+='			<a href="javascript:;" class="share" data-click="layer">공유</a>																	';					
		    html+='            <div class="layer_fixed" data-box="layer_fixed">                                                                                 ';
		    html+='            	<div class="layer_table">                                                                                                       ';
		    html+='            		<div class="layer_tablecell">                                                                                               ';
		    html+='                        <div class="layer layer_kyobo" data-title="공유하기">                                                                ';
		    html+='                        	<button class="btn_close" data-click="layer_close">닫기</button>                                                    ';
		    html+='                        	<strong class="tit ac">공유하기</strong>                                                                            ';
		    html+='                        	<div  class="sns_btn ac">                                                                              ';
		    html+='                        		<div>						                                        			                                ';
		    html+='                                    <a href="javascript:;" data-sns="snsEmail" class="icon100 sns_e">이메일</a>                                                  ';
		    html+='                                    <a href="javascript:;" data-sns="snsSMS"  class="icon100 sns_s ml5">SMS</a>                                                 ';
		    html+='                                    <a href="javascript:;"  data-sns="snsLine" class="icon100 sns_ln ml5">LINE</a>                                               ';
		    html+='                        		</div>                                                                                                          ';
		    html+='                                <div class="mt5">                                                                                            ';
		    html+='                               		<a href="javascript:;" data-sns="snsBand" class="icon100 sns_bd">BAND</a>                                                  ';
		    html+='                              	 	<a href="javascript:;" data-sns="snsFacebook" class="icon100 sns_fb ml5">FACEBOOK</a>                                          ';
		    html+='                              		<a href="javascript:;" data-sns="snsKakaotalk" class="icon100 sns_kt ml5">KAKAOTALK</a>                                         ';
		    html+='                                </div>                                                                                                       ';
		    html+='                            </div>                                                                                                           ';
		    html+='                        	<div class="mt15 ac">                                                                                               ';
			html+='								<button type="button" class="btn_type1 small" data-click="layer_close" style="width:172px">닫기</button>        ';
			html+='							</div>                                                                                                              ';
			html+='						</div><!-- layer end -->                                                                                                ';
		    html+='                    </div><!-- layer_tablecell end -->                                                                                       ';
		    html+='                </div><!-- layer_table end -->                                                                                               ';
		    html+='            </div><!-- layer_fixed end -->                                                                                                   ';
		    html+='            <div class="layer_bg"></div>                                                                                                     ';
			html+='		</li>                                                                                                                                   ';
			html+='	</ul>                                                                                                                                       ';
			
			return html;
		};
		
		_public.mwpdBoxInSur=function(type){
			if(type=="in01Show"){
				$('.box_btn_insur01').addClass('_on').stop().animate({'bottom':'0'},400);
				$('.box_btn_insur02').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur04').removeClass('_on').stop().animate({'bottom':'-55px'},400);
			}
			else if(type=="in02Show"){
				$('.box_btn_insur01').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur02').addClass('_on').stop().animate({'bottom':'0'},400);
				$('.box_btn_insur04').removeClass('_on').stop().animate({'bottom':'-55px'},400);
			}else if(type=="inHide"){
				$('.box_btn_insur01').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur02').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur03').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur04').removeClass('_on').stop().animate({'bottom':'-55px'},400);
			}else if(type=="in04Show"){
				$('.box_btn_insur01').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur02').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur03').removeClass('_on').stop().animate({'bottom':'-55px'},400);
				$('.box_btn_insur04').addClass('_on').stop().animate({'bottom':'0'},400);	
				
			}
		};
        
    return _public;
})();