/**
 * 메뉴경로 및 화면명	: header - 모바일 자동 로그아웃 처리
 * 최초 작성자(작성일)	: 이기쁨(20170508)
 * 변경자(변경일)		: 이기쁨(20170530)
 * 
 * 변경이력 : 
 * 	20170508 - 이기쁨 - KDIHP 의 header.js 를 복사, 수정
 * 	20170530 - 이기쁨 - 모바일 공통 header 객체 추가
 * 						header에 마이페이지 대출신청 팝업 호출관련 loanCounsel 추가
 * 
 * 기타 참고 : KDIHP의 /commons/js/header.js 참고
*/

var objChkType = null;
var timeObject = null; 
var remainTime =0;

/**************************************************************************************************************************************************
 * 													자동 로그아웃을 위한 객체, added by HK.KIM 2013.07.10
 **************************************************************************************************************************************************/
var LogoutTimerHeader = {
	isRun : false,
	timer : null,
	limit : 1000 * 60 * 20, // 20분
	fnc	  : function() {
		LogoutTimerHeader.stop();

		var url = "";
		//앱 gnb
		if(location.pathname.indexOf('/cc/CC01100S')> -1 ){
			CC01100S.movePage("/nativeApp/common/cc/CC06501S.jsp");
			return false;
		}
		if(appBackgroundLogOut){
			//로그아웃 완료 페이지
			url = '/common/cc/CC06501S.dev';
		} else if(location.pathname.indexOf('/pa/PA')  > -1){
			//로그아웃 가입 중단 페이지
			url = '/common/cc/CC06500S.dev';
		}else{
			//10분뒤 로그아웃 페이지
			url = '/common/cc/CC06502S.dev';
		}
		
		var paramObj		= new Object();
		paramObj.prevUrl	= location.pathname;
		
		PageUtil.movePage(url, paramObj);
	},
	start : function() {
		LogoutTimerHeader.setLimit();
		LogoutTimerHeader.timer = window.setTimeout(LogoutTimerHeader.fnc, LogoutTimerHeader.limit);
		LogoutTimerHeader.isRun = true;
		remainTime =LogoutTimerHeader.limit;
		startTime();
		$("#remainTime").show();
		$("#remainTime").removeClass("_count01");
	},
	reset : function() {
		if ( LogoutTimerHeader.timer != null) {
			window.clearTimeout(LogoutTimerHeader.timer);
			LogoutTimerHeader.timer = null;
			resetTime();
		}
		
		LogoutTimerHeader.start();
	},
	stop : function() {
		LogoutTimerHeader.isRun = false;
		if ( LogoutTimerHeader.timer != null) {
			window.clearTimeout(LogoutTimerHeader.timer);
			LogoutTimerHeader.timer = null;
			endLoginTime();
		}
	},
	setLimit : function() {
		
		objChkType = null;
		
		// 로그인 유형 별 분기 _ strMemType (mwDevCommData.jsp 에서 정의)
		if ( strMemType == null ){
			LogoutTimerHeader.limit = 1000 * 60 * 9;
		} else if (parseInt(strMemType, 10) == 2){
			LogoutTimerHeader.limit = 1000 * 60 * 20; //웹회원
		} else if (parseInt(strMemType, 10) == 1){
			LogoutTimerHeader.limit = 1000 * 60 * 20; //계약회원	
		}
		
		// 청약페이지, 로그인 여부 구분 X
		if(location.pathname.indexOf('/pa/PA') > -1){
			objChkType = new Object();
			objChkType.chkType = "RXEF";
			LogoutTimerHeader.limit = 1000 * 60 * 30;	// 청약시
		}
	}
};

/***********자동로그아웃 관련 타이머 Start (S.H.Shin) ******************/
function startTime(){ 
	timeObject=setInterval("ShowTime()", 1000);
} 

function ShowTime(){	
	remainTime = remainTime -1000; 
	var cal_sec = remainTime/1000;
	var rmt_min = Math.floor(cal_sec / 60);
	var rmt_sec = cal_sec - (rmt_min * 60);
	
	if (rmt_min <10){
		rmt_min = "0" + rmt_min;
	}
	if (rmt_sec <10){
		rmt_sec = "0" + rmt_sec;
	}
	$('#remainTime').text("" + rmt_min + ":"	+ rmt_sec);
	
	if (remainTime <=0){
		endLoginTime(); 
	}
	
	if (Number(rmt_min) <= 10){
		if(!$("#remainTime").hasClass("._count01 ")){
			$("#remainTime").addClass("_count01");
		}
	}
}

function endLoginTime(){ 
	$('#remainTime').text("");
	
	clearInterval(timeObject); 
}
function resetTime(){
	clearInterval(timeObject); 
}

var appBackgroundLogOut = false;

//앱에서 백그라운드시 그 해당 시간을 앱에서 받음
function appBackgroundIntervalTime(time){
	var isLogin =((typeof globalVar.getParam("isLogin"))=="undefined" ? false : globalVar.getParam("isLogin"));
	
	if(isLogin){//로그인 되어있을경우
		appBackgroundTimeModi(time);
		
	// 청약화면에서는 비로그인 시에도 태움	
	} else if(location.pathname.indexOf('/pa/PA') > -1){
		appBackgroundTimeModi(time);
	}
}

function appBackgroundTimeModi(time){
	
	var chk = util.Number(time) * 1000;
	var timeTmp = 0;
	
	timeTmp = remainTime - chk;
	
	if(timeTmp <= 0 ){
		appBackgroundLogOut = true;
		LogoutTimerHeader.fnc();
		
	}else{
		appBackgroundLogOut = false;
		
		
		if ( LogoutTimerHeader.timer != null) {
			window.clearTimeout(LogoutTimerHeader.timer);
			LogoutTimerHeader.timer = null;
			resetTime();
		}
		
		LogoutTimerHeader.limit=timeTmp;
		
		LogoutTimerHeader.timer = window.setTimeout(LogoutTimerHeader.fnc, LogoutTimerHeader.limit);
		LogoutTimerHeader.isRun = true;
		remainTime =LogoutTimerHeader.limit;
		startTime();
		$("#remainTime").show();
		$("#remainTime").removeClass("_count01");
		 
	}
}

/**
 * 모바일 공통 header 객체
 * 모바일 공통 함수 필요시 정의
 */
var header = {

	/**
	 * 대출상담 신청
	 * 마이페이지에서 사용
	 */
	loanCounsel: {
		'why': function () {
			var $this = this;
			$this.openPop({
				url: '/mypage/mu/MWMU111P1.dev'
				, width: '1260'
				, height: '4000'
			});
		}
		, 'apply': function () {
			var $this = this;
			if(! $this.isPossible()){
				return;
			}
			
			$this.openPop({
				url: '/mypage/mu/MWMU110P1.dev'
				, width: '1260'
				, height: '4000'
			});
		}
		, 'loanAmt': function (amt) {
			var $this = this;
			$this.openPop({
				url: '/mypage/mu/MWMU113P1.dev'
				, width: '500'
				, height: '250'
				, pageParam: {sumLonPosAmt: amt}
			});
		}
		, 'check': function () {
			var isLogin =((typeof globalVar.getParam("isLogin"))=="undefined" ? false : globalVar.getParam("isLogin"));
			if(!isLogin){
				alert("로그인 이후 이용가능합니다.");
				return;
			}
			
			var $this = this;
			/*if(! $this.isPossible()){
				return;
			}*/
			
			var tranProp = util.clone(transaction.TRAN_COMM_PROP);
			$.extend(
					tranProp
					, {
						url: '/mypage/mu/MWMU110P1'		// 트랜잭션 Url
						, tradeKey: 'getLonPosList'		// 트랜잭션 TradeKey
						, params: {}					// 트랜잭션 Parameter
						, success: function (data) {	// Success Callback
							var result = data.outData;
							if(typeof result == 'undefined'){
								alert("통신 중 오류가 발생했습니다. 다시 시도해 주세요.");
								return;
							}
							
							var sumLonPosAmt = 0;
							if(result.hasOwnProperty('retrieveGPD001A01') && !$.isEmptyObject(result.retrieveGPD001A01) && result.retrieveGPD001A01.length > 0 ){
								$.each(result.retrieveGPD001A01, function (i, item) {
									if ('Y' == item.petPosYn) {
										// 대출가능금액 합계
										sumLonPosAmt += util.Number(item.lonPosAmt);
									}
								});
							}
							
							if(sumLonPosAmt > 0){
								$this.loanAmt(sumLonPosAmt);
								
							} else {
								$this.apply();
							}
						}
						, failure: function (data) {		// Failure Callback
							var oData = data.outData;
							
							//오류처리1
							if(oData == undefined){
								alert("통신 중 오류가 발생했습니다. 다시 시도해 주세요.");
								return;
							}
							if (oData.ERROR_MSG) {
								alert(oData.ERROR_MSG);
								return;
							}
						}
					}
				);
			transaction.callTran(tranProp);
		}
		, 'openPop': function (o) {
			var $this = this;
			
			// 대출신청 팝업 영역 추가
			if($(document).find('#loanCounselPopupwrap').length > 0){
				$(document).find('#loanCounselPopupwrap').remove();
			}
			$(document).find('body').append('<div id="loanCounselPopupwrap"><div class="content1"></div></div>');

			var option = {
				id: 'loanCounselPopupwrap'
				, location: 'external'
				, content: 'content1'
				, url: ''
				, width: '1260'
				, height: '4000'
			};
			PageUtil.openPopup($.extend(option, o));
		}
		, 'closePop': function () {
			$('#loanCounselPopupwrap').data('bPopup').close();
		}
		, 'directOpenPop': function (type) {
			var $this = this;
			if(! $this.isPossible()){
				return;
			}
			type = type || 'apply';
			$this.closePop();
			
			// 팝업 닫기 후 바로 호출되지 않아 시간 줌. 시간 확인 필요 ( 500이 적정 시간인지 )
			setTimeout(function () {
				$this[type]();
			}, 500);
		}
		, 'isPossible': function () {
			// 신청 가능 시간 평일 09시 ~ 18시
			
			var $this = this
				, returnVal = false;
				
			var tranProp = util.clone(transaction.TRAN_COMM_PROP);
			$.extend(
				tranProp
				, {
					url: '/common/cc/HOLYDAYINFO'			// 트랜잭션 Url
					, tradeKey: 'HOLIDAY_INFO'				// 트랜잭션 TradeKey
					, params: {'std_ymd': util.getDate()}	// 트랜잭션 Parameter
					, asyncFlag : false
					, success: function (data) {			// Success Callback
						var result = data.outData;
						if(typeof result == 'undefined'){
							alert("통신 중 오류가 발생했습니다. 다시 시도해 주세요.");
							return;
						}
						
						if('0' !== result.hldycd){
							returnVal = false;
						} else {
							var currTime = util.Number(util.getTime());
							if(currTime >= 900 && currTime <= 1800) {
								returnVal = true;
							} else {
								returnVal = false;
							}
						}
					}
					, failure: function (data) {		// Failure Callback
						var oData = data.outData;
						
						//오류처리1
						if(oData == undefined){
							alert("통신 중 오류가 발생했습니다. 다시 시도해 주세요.");
							return;
						}
						if (oData.ERROR_MSG) {
							alert(oData.ERROR_MSG);
							return;
						}
					}
				}
			);
			transaction.callTran(tranProp);
			
			if( ! returnVal){
				alert('현재는 이용가능 시간이 아닙니다. \n휴일 및 공휴일을 제외한 평일 오전 9시부터 오후 6시 사이에 신청해주시기 바랍니다.');
			}
			return returnVal;
		}
	}

	/**
	 * 설계 이벤트 팝업 띄움
	 */
	, applyEventPop: function () {
		// 팝업 영역 추가
		if($(document).find('#eventPopupwrap').length > 0){
			$(document).find('#eventPopupwrap').remove();
		}
		$(document).find('body').append('<div id="eventPopupwrap"><div class="content1"></div></div>');
		
		var option = {
						id: 'eventPopupwrap'
						, location: 'external'
						, content: 'content1'
						, url: '/bridge/bl/MWBL170P1.dev'
						, width: '1260'
						, height: '4000'
					};
	
		PageUtil.openPopup(option);
	}
};

/**
 * mw.page.js 에서 function 호출 처리
 * 모바일 자동 로그아웃 체크를 위해서만 사용
 */
var pageHeaderFunction = function(){
	
	if ( LogoutTimerHeader.timer != null) {
		window.clearTimeout(LogoutTimerHeader.timer);
		LogoutTimerHeader.timer = null;
		resetTime();
	}
	
	// 로그인 여부
	var isLogin =((typeof globalVar.getParam("isLogin"))=="undefined" ? false : globalVar.getParam("isLogin"));
	if(isLogin){
		LogoutTimerHeader.start(); 
		
	// 청약화면에서는 비로그인 시에도 태움	
	} else if(location.pathname.indexOf('/pa/PA') > -1){
		LogoutTimerHeader.start();
	}

	// 로그인 연장 버튼 이벤트 바인드
	$('#btnCtu').off('click').on("click", function(){
		LogoutTimerHeader.reset();
		return false;
	});
	
};
