/**
 * 메뉴경로 및 화면명  : header - GNB 처리 함수
 * 최초 작성자(작성일) : 정헌태(20130131)
 * 변경자(변경일)        : 김경일(20150102)

 * 변경이력 : 20130131 - 정헌태 - util.js에 있던것을 별도로 분리함.
 *              20130306 - 정헌태 - gnb를 xml로 관리함에 따른 수정
 *              20150102 김경일 - 계약회원로그인시간 30분으로 연장
 * 기타 참고 :
*/

/**************************************************************************************************************************************************
 * 													GNB 처리
 **************************************************************************************************************************************************/

// 웹로그 공통
var _ag   = 0 ; // 로그인사용자 나이
var _id   = ""; // 로그인사용자 아이디
var _mr   = ""; // 로그인사용자 결혼여부 ('single' , 'married' )
var _gd   = ""; // 로그인사용자 성별 ('man' , 'woman')
var _skey = ""; // 내부검색어
var _jn   = ""; // 가입탈퇴 ( 'join','withdraw' )
var _jid  = "";	// 가입시입력한 ID
var _ud1  = "";	// 사용자 정의변수 1 ( 1 ~ 10 정수값)
var _ud2  = "";	// 사용자 정의변수 2 ( 1 ~ 10 정수값)
var _ud3  = "";	// 사용자 정의변수 3 ( 1 ~ 10 정수값)

//웹로그 가입설계 환경변수
var _fvdd = "1"; // 5초설계여부 맞음(1), 아님(0)
var _amt  = "0"; // 가입금액
var _ppd  = "";	 // 납입기간
var _poi  = "";	 // 보험기간
var _prem = "0"; // 보험료
var _pcd  = "";	 // 상품코드
var _dob  = "";	 // 생년월일
var _ddty = "";	 // 설계일시
var _gd   = "";	 // 성별('man','woman')
var _pca  = "0"; // 연금개시연령
var _smk  = "1"; // 흡연여부 흡연(1), 비흡연(0)
var _dn   = "";	 // 가입설계번호
var _cl   = "";	 // 모집경로코드
var _pn   = "";	 // 상품명
var _icd  = "";	 // 보험기간구분코드
var _scd  = "";	 // 납입기간구분코드
var _ccd  = "";	 // 납입주기코드
var _sp   = "0"; // 합계보험료
var _rp   = "0"; // 실납입보험료
var _atcd = "";	 // 연금지급유형코드
var _apcd = "";	 // 연금지급기간코드
var _accd = "";	 // 연금지급주기코드
var _ert  = "";	 // 만기환급율
var _eage = "0"; // 가입보험나이
var etcMenuCd;

var strLogOutMsg = "로그아웃 하시겠습니까?";
var objChkType = null;

var timeObject = null;
var remainTime =0;

/**************************************************************************************************************************************************
 * 													자동 로그아웃을 위한 객체, added by HK.KIM 2013.07.10
 **************************************************************************************************************************************************/
var LogoutTimerHeader = {
	isRun : false,
	timer : null,
	limit : 1000 * 60 * 20, //9분
	fnc	  : function() {
		LogoutTimerHeader.stop();

		var option = {
				width : '1260',
				height : '4000',
				url : '/common/view/HPTA01S6'
		};

		PageUtil.openPopup(option,{"gbn":"new"});
	},
	start : function() {
		LogoutTimerHeader.setLimit();
		LogoutTimerHeader.timer = window.setTimeout(LogoutTimerHeader.fnc, LogoutTimerHeader.limit);
		LogoutTimerHeader.isRun = true;
		remainTime =LogoutTimerHeader.limit;
		startTime();
		$(".customerName").removeClass("type3 ");
		$(".customerName").addClass("type2 ");
		$(".remainTime").removeClass("type3 ");
		
		$("#btnLogOut2").removeClass("type2");
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
		/*
		if ( strMemType == null )
			LogoutTimerHeader.limit = 1000 * 60 * 9;
		else if ( strMemType == '2' )
			LogoutTimerHeader.limit = 1000 * 60 * 29; //웹회원
		else
			LogoutTimerHeader.limit = 1000 * 60 * 9; //계약회원
		*/

		objChkType = null;
		var ctu_text="로그인연장";

		if ( strMemType == null ){
			LogoutTimerHeader.limit = 1000 * 60 * 9;
		} else if (parseInt(strMemType, 10) == 2){
			LogoutTimerHeader.limit = 1000 * 60 * 20; //웹회원
		} else if (parseInt(strMemType, 10) == 1){
//			LogoutTimerHeader.limit = 1000 * 60 * 9; //계약회원
			//20150102 김경일 - 계약회원로그인시간 30분으로 연장
//			LogoutTimerHeader.limit = 1000 * 60 * 1;
			LogoutTimerHeader.limit = 1000 * 60 * 20; //계약회원
		} else if (parseInt(strMemType, 10) == 0){
			if (undefined != globalVar.getParam("outData").RXEF_memType && parseInt(globalVar.getParam("outData").RXEF_memType) == 1){	// 비로그인 청약회원
				objChkType = new Object();
				objChkType.chkType = "RXEF";
				LogoutTimerHeader.limit = 1000 * 60 * 20; // 비로그인 청약시
				ctu_text="시간연장";

			}
		}

		$('#ctu_text').text(ctu_text);
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
  $('#remainTime').text("" + rmt_min + ":"  + rmt_sec);
  $('#ctu_time').show();
  $('#headerName').show();
  $("#headerTimeBx").attr("style","display:block;");	// 크롬에서 생기는 로그인의 뒷공간 제거


  if (remainTime <=0){
	  endLoginTime();
  }

  if (Number(rmt_min) <= 10){
	if(!$(".customerName").is(".type3 ")){
		$(".customerName").removeClass("type2 ");
		$(".customerName").addClass("type3 ");
		$(".remainTime").addClass("type3 ");
	}
  }

}
function endLoginTime(){
	$('#remainTime').text("");
	$('#ctu_time').hide();
	$('#headerName').hide();
	$("#headerTimeBx").attr("style","display:none;");	// 크롬에서 생기는 로그인의 뒷공간 제거

	clearInterval(timeObject);
}
function resetTime(){
	clearInterval(timeObject);
}

/**
 * 이벤트 참여 팝업
 * @returns
 */
function applyEventPop() {

	PageUtil.openPopup({
		width : '700',
		height : '549',
		url : '/bridge/bl/HPBL170P1'
	});
}

/**
 * 가입 가능나이로
 * 입원/수술비 묶음 설계 여부 조회
 * 건강체 및 슈퍼건강체일 경우 예외
 * @param paramData
 * @return boolean
 */
var chkHospiOperat = function (paramData) {
	// 건강체 및 슈퍼건강체일 경우 묶음설계 X
	var goodCd = paramData.goodCd
		, tmpCd = goodCd.length > 5 ? goodCd.substring(0, 5): '';

	// 정기, 암보험, 5대성인병 외 페이지 제외 처리
	if(! (tmpCd == '10001' || tmpCd == '10011' || tmpCd == '10012')){
		return false;
	}

	if(goodCd == '1000123' || goodCd == '1000125' || goodCd == '1000127'			// 정기보험 건강체
		|| goodCd == '1000124' || goodCd == '1000126' || goodCd == '1000128' ){		// 정기보험 슈퍼건강체
		return false;
	}

	// 주민 + 성별
	var dateStr = paramData.jumin1 + paramData.gndrCd;

	// 입원( 가능 나이: 만 19 ~ 60세 )
	var ableHospi = returnVal = util.getRealAge(dateStr) >= 19 && util.getRealAge(dateStr) <= 60 ;

	// 수술( 가능 나이: 만 19 ~ 60세 ) FIXME: gp.lee 가능 나이 확인 필요, 아직 문서로 나온 정보 없음, 일단 입원과 동일하게 작업.
	var ableOperat = util.getRealAge(dateStr) >= 19 && util.getRealAge(dateStr) <= 60 ;

	// 2개 모두 만족 시 해당 페이지 이동 처리?
	return ableHospi && ableOperat;

};

/**
 * 입원/수술 묶음 설계 시 필요 파람 객체 생성
 * @param data: hiddenSet, inData
 */
var makeTopData = function (data) {
	var jumin1 = data.spb_plnnrBrdt.substring(2)
		, entAge = util.entAgeCal(jumin1 + data.spb_plnnrGndrCd)
		, returnData = {
			entAge			: entAge
			, jumin1		: jumin1
			, gndrCd		: data.spb_plnnrGndrCd
			, smokYn		: data.spb_smokYn
			, chldAge		: entAge				// 자녀나이 -5초보험료
			, chldGndrCd	: data.spb_plnnrGndrCd	// 자녀성별코드 - 5초보험료
			, smokYnCd		: data.spb_smokYn		// 흡연여부코드 - 5초보험료
			, chldEntYn		: "N"					// 자녀가입여부 - 5초보험료
			, insGoodSmclCd	: "ALL"					// 보험상품소분류코드 - 5초보험료
			, fetaYnCd		: "ALL"					// 태아여부코드 - 5초보험료
			/**
			 * 보험영업상품소분류코드
			 * 11 : 정기
			 * 12 : 종신
			 * 21 : 일반연금
			 * 31 : 연금저축
			 * 32 : 어린이저축
			 * 33 : 일반저축
			 * 41 : 실손
			 * 42 : 어린이보장
			 * 43 : 암보험
			 * 44 : 5대성인병
			 */
			, insSbsnGoodSmclCd	: data.spb_insSbsnGoodSmclCd
			, goodplanCd		: data.spb_goodplanCd

			// 상품코드, 보종코드
			, goodCd	: data.spb_goodCd
			, intyCd	: data.spb_intyCd

			// 대표상품코드
			, rrsnGoodCd : data.spb_goodCd.substring(0, 5)
		};
	return returnData;
}


/** mw.page.js 에서 function 호출 */
pageHeaderFunction = function(){
	_sp = "10000";

	// 키보드 보안 및 가상키보드
	var operaversion;
	var vindex;
	vindex = navigator.userAgent.indexOf("Version/");
	operaversion = parseInt(navigator.userAgent.substr(vindex+8,2));
	if(navigator.platform.match('Win') == 'Win'){
		if (navigator.userAgent.indexOf("Opera") > -1 && operaversion > 11) {
			useTransKey = true;
		} else {
			useTransKey = false;
		}
	} else{
		useTransKey = true;
	}
	// 개인방화벽 기동]
	 /*
	  *스팩트라 관련 페이지에서는 해당 devCommomData.jsp 파일을 사용하지 않는 페이지들도 있습니다
	  *그래서 해당 아래 내용과 같이 없을 경우에는 방화벽을 무조건 타게끔 세팅 합니다
	  *2013-04-22 by 강종철
	  */
	var isLogin =((typeof globalVar.getParam("webLog"))=="undefined" ? false : globalVar.getParam("webLog").isLogin);
//	if((isLogin || window.location.pathname.indexOf("/login/HPGA01S0.dev") != -1) && aos_is_new()){
//		aoswrap_run_aos();
//	}

	//2015.04.09(jeha) 청약화면에서는 타지 않도록 함
	if(location.pathname.indexOf('HPPA') < 0){
		if(isLogin){ //added by HK.KIM. 20130710 - 자동로그아웃.. 설정..
			LogoutTimerHeader.start();
		} else if((typeof globalVar.getParam("outData"))!="undefined"){ //result가 없는 화면에서 에러나므로 result 유무 체크로직 추가. by 서시원. 20130724
			if(undefined != globalVar.getParam("outData") && undefined != globalVar.getParam("outData").RXEF_memType && parseInt(globalVar.getParam("outData").RXEF_memType) == 1){
				LogoutTimerHeader.start();
			}
		}
	}

	$(document).bind('click',function(e){
		$('#disclosure_sub').hide();
	});
	$('#fmenu #dis_sub >a').bind('click',function(e){
		var event = window.event || e;
		if(event.preventDefault){event.preventDefault(); event.stopPropagation();}
		else {event.returnValue = false; event.cancelBubble = true;}

		var thisHref = $(this).attr('href');
		$('#fmenu').css({'z-index':9});
		$(thisHref).show();
		return false;
	});
	$('#disclosure_sub a:last').bind('focusout',function(){
		$(this).closest('ul').hide();
	});

	$("#fmenu").show();	// gnb 최상단부 표시

	$('#ctu_time').hide();
	$('#headerName').hide();
	$("#headerTimeBx").attr("style","display:none;");	// 크롬에서 생기는 로그인의 뒷공간 제거

	$('#btnCtu').bind("click",function(){
		LogoutTimerHeader.reset();
		return false;
	});

	//2014.11.27 추가 - 할인율이 0% 일 경우 할인율 정보 숨김
	if ($("#disrt").text() == "0.00") {
		$("#discountRate").hide();
	}

	$('#goLoginBtn').bind("click",function(){
		location.href="/login/HPGA01S0.dev";
	});
	
	$('#btnLogOut, #btnLogOut2').bind("click",function(){
		if(confirm(strLogOutMsg)){
			location.replace(this.href);
			return;
		}
		return false;
	});
};

/**
 * devCommData.jsp 에서 호출
 */
function header_ready(){

	$("#gnb").find("ul").wrap("<div class=\"dep2Wrap\"></div>").each(function(){
		$(this).find("li:last").addClass("last");
	});

	// 5초보험료 확인을 제외한 메뉴 마우스오버
	$(">li>a",$("#gnb")).bind("focusin mouseenter",function(e){
		e.stopPropagation();
		$('a').removeClass('activated');//기존 li a에 .activated삭제
		$("#gnb").find('ul').hide();//기존 2depth ul 삭제
		$('#gnb > li').find('span').remove('.bg');//기존 span.bg 삭제
		$(this).addClass('activated');//hover된 li a에 activated
		$(this).next().find('ul').show();//hover된 2depth ul display:block
		$(this).closest('li').prepend("<span class='bg'></span>");// hover된 span.bg prepend
		if($(this).next().size() > 0){
			$(this).next().find("ul").show();
			if($(this).next().find("ul").find("li").length>0){
				$('#header').addClass('on');
			}else{
				$('#header').removeClass('on');
			}
		}else{
			$('#header').removeClass('on');
		}
	});

	// 140715 수정
	$('#gnb').bind('mouseleave',function(){
		$('a').removeClass('activated');//기존 li a에 .activated삭제
		$('#gnb').find('ul').hide();//기존 2depth ul 삭제
		$('#gnb > li').find('span').remove('.bg');//기존 span.bg 삭제


		var loca = location.href.split('/')[3];
		var dd = function(){
			$(this).prepend("<span class='bg'></span>").children('a:first').addClass('activated');
		};
		switch (loca) {
			case 'products':
				$('#gnb>li:eq(0)').prepend("<span class='bg'></span>").children('a:first').addClass('activated');
				$('#gnb>li:eq(0)').find('ul').show();
				$('#header').addClass('on');
			break;
			case 'insurance':
				$('#gnb>li:eq(1)').prepend("<span class='bg'></span>").children('a:first').addClass('activated');
				$('#gnb>li:eq(1)').find('ul').show();
				$('#header').addClass('on');
			break;
			case 'lifesquare' :
				$('#gnb>li:eq(2)').prepend("<span class='bg'></span>").children('a:first').addClass('activated');
				$('#gnb>li:eq(2)').find('ul').show();
				$('#header').addClass('on');
			break;
			case 'contact' :
				$('#gnb>li:eq(3)').prepend("<span class='bg'></span>").children('a:first').addClass('activated');
				$('#gnb>li:eq(3)').find('ul').show();
				$('#header').addClass('on');
			break;
			case 'mypage' :
				$('#gnb>li:eq(4)').prepend("<span class='bg'></span>").children('a:first').addClass('activated');
				$('#gnb>li:eq(4)').find('ul').show();
				$('#header').addClass('on');
			break;

		}
		getMenu();	// 메뉴별 고정
	});


	// 1Depth 클릭시
	$(">li>a",$("#gnb")).bind("click",function(){
		showLoading();	// 로딩 시작
	});

	// 2Depth 클릭시
	$(">li>div>ul>li>a",$("#gnb")).bind("click",function(){
		showLoading();	// 로딩 시작
	});

	// 3Depth 클릭시
	$(">ul>li>a",$("#lnb")).bind("click",function(){
		showLoading();	// 로딩 시작
	});

	getMenu();	// 메뉴별 고정
}

/**
 * devCommData.jsp 에서 호출
 * @param arrData
 */
function header_getMenu(arrData){

	for(var i = 0; i < arrData.length; i++){
		var menuUrl = arrData[i][0];
		var menuCd  = arrData[i][1];


		if(menuUrl.indexOf(window.location.pathname) != -1 ){
			// 1dept CSS 처리

			$("#gm_" + Number(menuCd.substring(1,2))).children("a").addClass("activated");
			$("#gm_" + Number(menuCd.substring(1,2))).children("a").prepend("<span class='bg'></span>"); //140613 추가
			if(window.location.pathname.indexOf("/insurance/HPIA01S0.dev") == -1){
				if (menuCd.length >= 4){
					// 2dept 고정처리
					$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").show();
					// 2dept CSS처리
					$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").children("li").children("a:eq(" + menuCd.substring(2, 4) + ")").addClass("activated");

					if( parseInt(menuCd.substring(0,2)) <6){
						$('#header').addClass('on'); //140613 추가 -2depth 가이드라인
					}
				}
			}
//		}else if(window.location.pathname.indexOf("/quick/HPTD01S0.dev") != -1){ //|| window.location.pathname.indexOf("/startmain/main.dev") != -1){//메인에서 5초보험료 css가 적용되어 있어서 수정
			//5초보험료
//			$("#gm_6").children("a").addClass("activated");
			//2014.3.18 고객센터에 가입후기가 추가 되면서 자리가 밀려서 css 조정함
//			if(menuCd.substring(1,2) == '5'){
//		    	$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('left','-40px');
//				$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('width','1000px');
//		    }else{
//		    	$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('left','0px');
//				$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('width','980px');
//		    }


//		}else{
//			$("#gm_6").children("a").removeClass("activated");
			//2014.3.18 고객센터에 가입후기가 추가 되면서 자리가 밀려서 css 조정함
//			if(menuCd.substring(1,2) == '5'){
//		    	$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('left','-40px');
//				$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('width','1000px');
//		    }else{
//		    	$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('left','0px');
//				$(">a",$("#gm_" + Number(menuCd.substring(1,2)))).next().find("ul").css('width','980px');
//		    }
		}
	}

	if(etcMenuCd != undefined){
		header_getEtcMenu(etcMenuCd);
	}
	//각서브메인 화면에서 mouseleave헀을때 서브메뉴가 사라지도록
	var cntxx =0;
	var objxx;
	$(".dep2Wrap > ul > li").find("a").each(function(){
		if($(this).hasClass("activated")){
			cntxx++;
			objxx = $(this).parent().parent().parent().parent();
		}
	});
	if(cntxx<1) {
		$('#gnb').find('ul').hide();//2depth 삭제
		$('#header').removeClass('on');//회색줄 삭제
	}else{
		objxx.closest("a").prepend("<span class='bg'/>");
	}


}

/**
 * GNB를 표시한다.(header.jsp)
 * @param nGnb1	- Integer -	선택될 1Depth(0~) 미선택시 -1
 * @param nGnb2	- Integer -	선택될 2Depth(0~) 미선택시 -1
 * @param strGnb3	- String - 표시 및 선택될 3Depth, 문자열로 파이프 구분한다. "0|0"
 *                             안보이게 할경우 빈스트링, 보이기만 할경우 앞자리만 입력"0"
 * @param nLogin	- Integer - 로그인 상태 값 0:미로그인, 1:웹회원, 2:계약회원		// 미사용
 */
function util_setGnbView(nGnb1, nGnb2, strGnb3, nLogin){
	if (util_chkReturn(nGnb1, "s") == "" || util_chkReturn(nGnb2, "s") == "" ||
			util_chkReturn(strGnb3) == "false"){
		alert("function setGnbView : 잘못된 매개변수 입니다.");
	}

	// 마이페이지는 로그인에 따라 2Depth가 바뀌므로 동적으로 생성
	var strGnbText = "";
	if (strMemType == "02"){	// 웹회원
		$("#btn_loginType").text("로그아웃");
		$("#btn_loginType").attr("href", "#");
		$("#btn_loginType").bind("click", function(){
			setLogout();
		});
		$("#gm_5").children("ul").css("margin-left", "400px");
		$("#gm_5").children("a").attr("href","/mypage/common/HPMA00S1.dev");
		strGnbText += '    <li><a href="/mypage/myinfo/HPMH01S0.dev">내 정보수정</a></li>';
		strGnbText += '    <li><a href="/mypage/chsl/HPMI11S0.dev">상담내역</a></li>';
		strGnbText += '    <li><a href="/mypage/mktn/HPMK01S0.dev">마케팅메일 수신거부</a></li>';
		strGnbText += '    <li><a href="/mypage/scss/HPML01S0.dev">회원탈퇴</a></li>';
	} else if (strMemType == "01") {	// 계약회원
		$("#btn_loginType").text("로그아웃");
		$("#btn_loginType").attr("href", "#");
		$("#btn_loginType").bind("click", function(){
			setLogout();
		});
		$("#gm_5").children("a").attr("href","/mypage/common/HPMA00S0.dev");
		strGnbText += '    <li><a href="/mypage/conr/HPMB01S0.dev">계약관리</a></li>';
		strGnbText += '    <li><a href="/mypage/lon/HPMD00S0.dev">보험계약대출</a></li>';
		strGnbText += '    <li><a href="/mypage/pet/HPME00S0.dev">보험금 신청</a></li>';
		strGnbText += '    <li><a href="/mypage/pmt/HPMF00S0.dev">보험료 납입</a></li>';
		strGnbText += '    <li><a href="/mypage/iss/HPMG01S0.dev">증명서 발급</a></li>';
//		strGnbText += '    <li><a href="/mypage/myinfo/HPMH11S1.dev">내 정보 수정</a></li>';
		strGnbText += '    <li><a href="/mypage/myinfo/HPMH21S0.dev">연락처 수정</a></li>';
		strGnbText += '    <li><a href="/mypage/chsl/HPMI01S0.dev">상담내역</a></li>';
		strGnbText += '    <li><a href="/mypage/myinfo/HPMH31S0.dev">마케팅메일 수신거부</a></li>';
		strGnbText += '    <li><a href="/mypage/myinfo/HPMH61S0.dev">ARS 등록/변경</a></li>';
		strGnbText += '    <li><a href="/mypage/pml/HPMJ01S0.dev">발송내역</a></li>';
		strGnbText += '    <li><a href="/mypage/myinfo/HPMH61S0.dev">(테스트용)ARS비밀번호 등록/변경</a></li>';
	} else {	// 비로그인
		$("#btn_loginType").text("로그인");
		$("#btn_loginType").attr("href", "/login/HPGA01S0.dev");
		$("#gm_5").children("a").attr("href","/login/HPGA01S0.dev");
	}

	$("#gm_5").children("ul").html(strGnbText);	// 마이페이지 2Depth 삽입

	if (nGnb1 != -1){	// 1Depth 미선택 아닐경우
		$("[name=gnb1]").each(function (i){
			if (i == nGnb1){
				$(this).children("a").addClass("activated");	// 1Depth 선택 표시

				if (nGnb2 != -1){	// 2Depth 미선택 아닐경우
					$(this).children("ul").children("li").each(function (j){
						if (j == nGnb2){
							$(this).children("a").addClass("activated");	// 2Depth 선택 표시
						}
					});
				}
			}
		});
	}


	if (strGnb3.split("|")[0] == "6"){	// 공시실 타이틀 보이기
		$("#title_" + strGnb3.split("|")[0]).show();	// 공시실 타이틀 보이기
	}

	// 3Depth 처리
	if (util_chkReturn(strGnb3, "s") != "" && strGnb3.split("|")[1] != "-1"){
		var arr3Depth =  strGnb3.split("|");

		if (util_chkReturn(arr3Depth[1], "s") != "-1"){
			$("#gnb3_" + arr3Depth[0]).show();	// 해당 3depth 보이기
		}

		if (util_chkReturn(arr3Depth[1], "s") != ""){
			// 선택된 하위 표시하기
			$("#gnb3_" + arr3Depth[0]).children("li").each(function (i){
				if (parseInt(parseInt(arr3Depth[1])) == i){
					$(this).addClass("on");
				} else {
					$(this).removeClass("on");
				}
			});
		}

		// 선택되지 않은 것들 삭제
		$(".nav3dep").each(function (i){
			if ($(this).attr("id") != "gnb3_" + arr3Depth[0]){
				$(this).remove();
			}
		});
	} else {
		$("#lnb").remove();	// 3Depth 삭제
	}

	gnb();	// 퍼블 js인 commonUI.js 의 gnb() 호출 퍼블 js에서는 삭제
	fullMakingList('.nav3dep >li');	// 퍼블 js인 commonUI.js 의 fullMakingList('.nav3dep >li') 호출 퍼블 js에서는 삭제
}

/**
 * GNB 3depth만 컽트롤한다.
 * @param strGnb3	- String - 표시 및 선택될 3Depth, 문자열로 파이프 구분한다. "0|0"
 *                             안보이게 할경우 빈스트링, 보이기만 할경우 앞자리만 입력"0"
 */
function util_setGnbView3Depth(strGnb3, strTitle){

	$('#lnb').css('display','');
	if (util_chkReturn(strTitle, "s") != ""){
		$("#" + strTitle).show();
	}


	// 3Depth 처리
//	if (util_chkReturn(strGnb3, "s") != ""){
//		var arr3Depth =  strGnb3.split("|");
//
//		// 선택되지 않은 것들 삭제
//		$(".nav3dep").each(function (i){
//			if ($(this).attr("id") != "gnb3_" + arr3Depth[0]){
//				$(this).remove();
//			}
//		});
//
//		$("#gnb3_" + arr3Depth[0]).show();	// 해당 3depth 보이기
//
//		if (util_chkReturn(arr3Depth[1], "s") != ""){
//			// 선택된 하위 표시하기
//			$("#gnb3_" + arr3Depth[0]).children("li").each(function (i){
//				if (parseInt(parseInt(arr3Depth[1])) == i){
//					$(this).addClass("on");
//				} else {
//					$(this).removeClass("on");
//				}
//			});
//		}
//
//
//	} else {
//		$("#lnb").remove();	// 3Depth 삭제
//	}

	fullMakingList('.nav3dep >li');	// 퍼블 js인 commonUI.js 의 fullMakingList('.nav3dep >li') 호출 퍼블 js에서는 삭제
}

/**
 *
 */
function setLogout(){
	location.href="/login/LogOut.dev";
}

/**
 * 이데일리 띠배너 검색 클릭
 */
function searchEdaily(){
	if("" == $("#searchKwd").val()) {
		alert("검색어를 입력해 주세요.");
		return;
	} else {
		document.charset = "euc-kr";
		document.EdailySearch.target = "_blank";
		document.EdailySearch.submit();

		// 요청 후 캐릭터셋을 원래대로 복구한다.
		if(document.charset) {
			document.charset = "utf-8";
		}
	}
}

var LineBanner = (function () {
	var _private = {}
	, _public = {};


	/**
	 * 쿠키처리함수
	 * */
	_private.cookie = function (name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1; //options.path = "/";
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};

	/**
	 * 호환성 보기 체크
	 * */
	_private.checkTarget = function () {

		var popAgent = navigator.userAgent.toLowerCase ();

	    return popAgent.indexOf("msie 7") > -1 && popAgent.indexOf('trident') > -1;
	};

	/**
	 * 띠배너 처리
	 * */
	_private.mainBanner = function () {

	    var $noticeBn = $('#box_banner');

	    var $cookieId = $noticeBn.find('input:checkbox').eq(0).attr('id');

	    if (_private.cookie ('main_slide_banner') == null) {

	        $noticeBn.show ();
	        $('.btn_mainbanner_close').click (function () {

	            var speed = 300
	            , chkBox = $('#'+$cookieId)
	            , closeMotion = function () {

	                $noticeBn.animate ({
	                    	'marginTop': ($noticeBn.height () - 3) * -1
	                	},
	                	speed,function () {

	                		$noticeBn.hide ();
	                });
	            };

	            if (chkBox.is (':checked')) {

	                _private.cookie ('main_slide_banner', '1day', { expires: 1,  path : '/' });
	            }
	            closeMotion ();
	        });
	    }
	};
	/**
	 * 네이버페이 배너 처리
	 * */
	_private.naverPayBanner = function () {

		var $noticeBnNaverPay = $('#box_banner_naverPay');

	    if (_private.cookie ('main_slide_banner_naverPay') == null) {

	    	$noticeBnNaverPay.show ();
	        $('.btn_mainbanner_close.NAVER_PAY').unbind ('click').click (function () {

	            var speed = 300
	            , chkBox = $('#cookieNoPopNaverPay')
	            , closeMotion = function () {

	            	$noticeBnNaverPay.animate ({
	                    	'marginTop': ($noticeBnNaverPay.height () - 3) * -1
	                	},
	                	speed,function () {

	                		$noticeBnNaverPay.hide ();
	                });
	            };

	            if (chkBox.is (':checked')) {

	                _private.cookie ('main_slide_banner_naverPay', '1day', { expires: 1,  path : '/' });
	            }
	            closeMotion ();
	        });
	    }
	};
	_private.samBanner = function () {

		if($("#box_banner_top").length>0){
			$("#box_banner_top").remove();
		}

		var $samBanner = $('#sam_banner');

	    if (_private.cookie ('main_slide_banner_sam') == null) {

	    	$samBanner.show ();
	        $('#topBannerSamClose').unbind ('click').click (function () {

	            var speed = 300
	            , chkBox = $('#cookieNoPopTop2')
	            , closeMotion = function () {

	            	$samBanner.animate ({
	                    	'marginTop': ($samBanner.height () - 3) * -1
	                	},
	                	speed,function () {

	                		$samBanner.hide ();
	                });
	            };

	            if (chkBox.is (':checked')) {

	                _private.cookie ('main_slide_banner_sam', '1day', { expires: 1,  path : '/' });
	            }
	            closeMotion ();
	        });
	    }
	};
		//100세암보험 띠배너호출
	_private.cancerBanner = function () {


		var $cancerBanner = $('#cancerBanner');

	    if (_private.cookie ('main_slide_banner_cancer') == null) {

	    	$cancerBanner.show ();
	        $('#topBannerCancerClose').unbind ('click').click (function () {

	            var speed = 300
	            , chkBox = $('#cookieNoPopTopCancer')
	            , closeMotion = function () {

	            	$cancerBanner.animate ({
	                    	'marginTop': ($cancerBanner.height () - 3) * -1
	                	},
	                	speed,function () {

	                		$cancerBanner.hide ();
	                });
	            };

	            if (chkBox.is (':checked')) {

	                _private.cookie ('main_slide_banner_cancer', '1day', { expires: 1,  path : '/' });
	            }
	            closeMotion ();
	        });
	    }
	};

	/**
	 * 띠배너 호출
	 * */
	_public.init = function () {


		if(typeof clpOrgnoBannerChk != "undefined"){
			if(clpOrgnoBannerChk == "SAM"){
				_private.samBanner();
			}
		}

		// 네이버페이 배너 처리, 네이버페이 주석처리 20160526
		// _private.naverPayBanner ();


		_private.cancerBanner ();

		// 호환성보기 일 때 배너 처리
		if (_private.checkTarget ()) {
			_private.mainBanner ();
		}
		else {
			$("#box_banner").hide();
		}

	};
	return _public;
}(this, jQuery));

// 띠배너 처리 호출
$(function(){
	LineBanner.init ();
});