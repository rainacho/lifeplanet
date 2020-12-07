/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.sns.js, /resources/js/
 * DESCRIPTION : SNS 연동 모듈
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2015-01-26		initial version
 * ========================================================================== */

//SNS 클릭 시
//$('a[id^=sns]').unbind('click').bind('click', function(e){
$(document).on ('click', 'a[id^=sns]', function(e){
	e.preventDefault();
	var x = $(this).attr('id');

	var paramObj = {};

	var href = location.href;
	var arrTemp 	= href.split("/");
	var strScId 	= arrTemp[arrTemp.length -1].split(".")[0];
	var str1depthId = arrTemp[arrTemp.length -3];
	var str2depthId = arrTemp[arrTemp.length -2];

	if(strScId == "HPPC61S0N"){
		strScId = "HPPD100S1";
	}else if(strScId == "HPPF21S0N"){
		strScId = "HPPD200S1";
	}else if(strScId == "HPPF21S0N"){
		strScId = "HPPD300S1";
	}else if(strScId == "HPPG31S0N"){
		strScId = "HPPD400S1";
	}else if(strScId == "HPPQ02S0N"){
		strScId = "HPPD500S1";
	}else if(strScId == "HPPR02S0N"){
		strScId = "HPPD600S1";
	}else if(strScId == "HPPK01S3"){
		strScId = "HPPD700S1";
	}
	
	var goodNm = (strScId == "HPPD100S1") ? "정기보험Ⅱ"       	: (strScId == "HPPD200S1") ? "종신보험Ⅲ"         	: (strScId == "HPPD300S1") ? "연금보험" :
	             (strScId == "HPPD400S1") ? "연금저축보험"     	: (strScId == "HPPD500S1") ? "플러스어린이보험"    	: (strScId == "HPPD600S1") ? "에듀케어저축보험Ⅱ" :
	             (strScId == "HPPD700S1") ? "1년부터e저축보험"	: (strScId == "HPBB120S1") ? "서울메트로연금보험"  	: (strScId == "HPPD800S1") ? "암보험" :
	             (strScId == "HPPD900S1") ? "5대성인병보험"    	: (strScId == "HPPE300S1") ? "상해보험"				: (strScId == "HPPE400S1") ? "자녀사랑정기보험":
            	 (strScId == "HPPE500S1") ? "입원비보험"    	: (strScId == "HPPE600S1") ? "수술비보험"			: (strScId == "HPBL115S1") ? "자녀사랑정기보험":
        		 (strScId == "HPBL150S1") ? "정기보험Ⅱ" 		: (strScId == "HPBL160S1") ? "연금저축보험" 		: (strScId == "HPBL180S1") ? "1년부터e저축보험":
    			 (strScId == "HPBL190S1") ? "암보험" 			: (strScId == "HPBL230S1") ? "1년부터e저축보험"		: (strScId == "HPPE700S1") ? "100세까지비갱신암보험": 
    			 (strScId == "HPPE800S1") ? "건강치아보험"		: (strScId == "HPPE900S1") ? "미세먼지질병보험"	:
    			 (strScId == "HPPF100S1") ? "여성건강보험"		: (strScId == "HPPF200S1") ? "뇌·심장보험"		:	"";
	
	if(globalVar.getParam('outData') != undefined && globalVar.getParam('outData').sOutPRN001A01IF != undefined && globalVar.getParam('outData').sOutPRN001A01IF.goodNm != undefined){
		goodNm = globalVar.getParam('outData').sOutPRN001A01IF.goodNm;
	}else{
		console.log("mw.sns.js의 상품명이 정의되지 않았습니다.");
	}

	var stringData = {
			//공유이미지 url
			'imgUrl' : '/commons/slink/contact/mw_notiImg/mobileWebSNS/lifeplanet_10025.png',
			//공통으로 쓰여질 화면 id
			'path' : '/products/'+str2depthId+'/'+strScId+'.dev',
			//band 문자열 data
//			'textBand' : '나에게 맞는 합리적인 보험료-꿈꾸는e저축보험',
			'textBand' : goodNm,
			//상품 이름
			'goodNm'   : goodNm,
			//sns 종류
			'snsId' : x
	};

	if(strScId.indexOf("HPBL") > -1 ){
		stringData.path = '/bridge/'+str2depthId+'/'+strScId+'.dev';
	}

	if(    strScId.indexOf("HPPD")  > -1     || strScId == "HPBB120S1"
		|| strScId.indexOf("HPBB5") > -1     || strScId.indexOf("HPPE700S1") > -1
		|| strScId.indexOf("HPPE300S1") > -1 || strScId.indexOf("HPPE400S1") > -1
		|| strScId.indexOf("HPPE500S1") > -1 || strScId.indexOf("HPPE600S1") > -1
		|| strScId.indexOf("HPBL115S1") > -1 || strScId.indexOf("HPBL150S1") > -1
		|| strScId.indexOf("HPBL160S1") > -1 || strScId.indexOf("HPBL180S1") > -1
		|| strScId.indexOf("HPBL190S1") > -1 || strScId.indexOf("HPBL230S1") > -1
		|| strScId.indexOf("HPPE800S1") > -1 || strScId.indexOf("HPPE900S1") > -1
		|| strScId.indexOf("HPPF100S1") > -1 || strScId.indexOf("HPPF200S1") > -1 ){
		//SNS 공유하기 연동
		SNS.initParam('list_sns', 'product', stringData, paramObj);
	}

});

/**
 * 클라이언트의 각종 설정 값들의 집합
 */
var SNS = (function() {
	var _public = {};
	var _private = {};

	_private.curID = '';
	_private.type = '';
	_private.stringObj = {};
	_private.dataObj = {};


	/**
	 * SNS연동 매개변수 획득

	 * 공유 타입에 따라 이벤트 바인딩을 조정한다.
	 * - product 	: 상품
	 * - webtoon 	: 웹툰
	 * - event 		: 이벤트
	 * - epilogue 	: 가입후기
	 */
	_public.initParam = function(id, type, stringObj , dataObj) {

		_private.curID = 'list_sns';
		_private.type = type;

		// 1.url 및 링크텍스트, 버튼 텍스트 문자열 가져오기
		var stringData = stringObj;

		// 2.데이터 가져오기
		var paramObj = dataObj;

		//랜딩페이지 최종 url
		//var origin = window.location.origin;

		//랜딩페이지 최종 url
		//IE가 안먹어서 아래로 변경
		var origin = window.location.protocol + '//' + window.location.host;

		var landUrl = origin + stringData.path;

		$.extend(stringData, {
			'origin'  : origin,
			'landUrl' : landUrl
		});

		_private.stringObj = stringData;
		_private.dataObj = paramObj;

		//화면에서 데이터 받아서 이벤트 바인딩

		if(_private.type == 'product') {

//			if (_private.stringObj.snsid != 'snsSMS' && _private.stringObj.snsid != 'snsEmail') {

				//상품공유 이면서 sms랑 email이 아닌경우 sms랑 email은 팝업 후 데이터 입력후 공유하기 버튼누른후 이벤트가 발생 되기 때문에 따로 분리한다.
				_private.getProductUrlData();
//			}
		} else {
			SNS.initSNS();
		}

	};

	/**
	 * SNS INIT
	 */
	_public.initSNS = function() {


		// 페이스북 셋팅
		_public.facebookSetting();
		// 밴드 셋팅
		_public.bandSetting();
		// sms 셋팅
		_public.smsSetting();
		// 이메일 셋팅
		_public.emailSetting();

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
		/*
		$('#snsFacebook').unbind('click').bind('click', function(){
			_private.facebookAction();
		});
		*/

	};

	/**
	 * 페이스북 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_private.facebookAction = function() {

		var stringData  = _private.stringObj;
		var paramObj    = _private.dataObj;

		var queryString = '';

		var title = '';

		for (var key in paramObj) {
			queryString += key + '=' + paramObj[key] + '&';
		}

		queryString = queryString.substring(0, queryString.length-1);

		var url = stringData.landUrl + '?' + queryString;

		$('meta[property="og:url"]').attr('content', url);
		 _private.snsAction('facebook', url, title);
	};

	/**
	 * 밴드 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.bandSetting = function() {

		var stringData = _private.stringObj;
		var paramObj = _private.dataObj;

		var queryString = '';

		for (var key in paramObj) {
			queryString += key + '=' + paramObj[key] + '&';
		}

		queryString = queryString.substring(0, queryString.length-1);

		if( _private.stringObj.snsId == 'snsBand') {

			_private.snsAction('band', stringData.landUrl + '?' + queryString, stringData.textBand);
			return;
		}

	};

	_private.snsAction = function(sns, url, txt) {

		var o;
		var _url = encodeURIComponent(url);
		var _txt = encodeURIComponent(txt);
		var _br  = encodeURIComponent('\r\n');

		if(sns == "facebook"){
			var url = 'http://www.facebook.com/sharer/sharer.php?u=' + _url + '&t=[교보라이프플래닛생명]';
		    window.open(url, '', 'width=690,height=600');
		}else{
			var url = 'http://www.band.us/plugin/share?body=' + _url + '&route=*.lifeplanet.co.kr';
		    window.open(url, 'share_band', "width=410, height=620, resizable=no");
		}

	};

	/**
	 * SMS 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.smsSetting = function() {

		var stringData = _private.stringObj;

		var paramObj = _private.dataObj;

		if(_private.stringObj.snsId.indexOf('snsSMS') > -1) {

			//sms 공유 팝업창 띄우기
			var option = {
	    			id : 'popupwrap',
	    			location : 'external',
	    			content : 'content1',
	    			url : '/common/cc/HPCC110P1.dev',
	    			isToBeParam : true
	    		};

			var _url = stringData.landUrl;
			var _serverDivn = "https://m.lifeplanet.co.kr:444";

			if (_url.indexOf ('hpd') !== -1) {
				_serverDivn = "http://mwd.lifeplanet.co.kr";
			} else if (_url.indexOf ('hpt') !== -1) {
				_serverDivn = "http://mwt.lifeplanet.co.kr";
			}

			if(_url.indexOf("HPPD100S1") > -1 || _url.indexOf("HPPC61S0N") > -1){
				_url = _serverDivn+"/products/pg/PG01100S.dev";

			}else if(_url.indexOf("HPPD200S1") > -1 || _url.indexOf("HPPF21S0N") > -1){
				_url = _serverDivn+"/products/pg/PG02100S.dev";

			}else if(_url.indexOf("HPPD300S1") > -1 || _url.indexOf("HPPD81S0N") > -1){
				_url = _serverDivn+"/products/pg/PG03100S.dev";

			}else if(_url.indexOf("HPPD400S1") > -1 || _url.indexOf("HPPG31S0N") > -1){
				_url = _serverDivn+"/products/pg/PG04100S.dev";

			}else if(_url.indexOf("HPPD500S1") > -1 || _url.indexOf("HPPQ02S0N") > -1){
				_url = _serverDivn+"/products/pg/PG07100S.dev";

			}else if(_url.indexOf("HPPD600S1") > -1 || _url.indexOf("HPPR02S0N") > -1){
				_url = _serverDivn+"/products/pg/PG08100S.dev";

			}else if(_url.indexOf("HPPD700S1") > -1 || _url.indexOf("HPPK01S3") > -1){
				_url = _serverDivn+"/products/pg/PG25100S.dev";

			}else if(_url.indexOf("HPPD800S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG11100S.dev";

			}else if(_url.indexOf("HPPD900S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG12100S.dev";

			}else if(_url.indexOf("HPPE300S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG17100S.dev";

			}else if(_url.indexOf("HPPE400S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG23100S.dev";

			}else if(_url.indexOf("HPPE500S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG28100S.dev";

			}else if(_url.indexOf("HPPE600S1") > -1 ){

				_url = _serverDivn+"/products/pg/PG29100S.dev";

			}else if(_url.indexOf("HPPE700S1") > -1 ){

				_url = _serverDivn+"/products/pg/PG37100S.dev";
				
			}else if(_url.indexOf("HPPE800S1") > -1 ){

				_url = _serverDivn+"/products/pg/PG43100S.dev";	

			}else if(_url.indexOf("HPBL190S1") > -1 ){
				_url = _serverDivn+"/bridge/bl/HPBL190S1.dev";

			}else if(_url.indexOf("HPPF100S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG49100S.dev";	

			}else if(_url.indexOf("HPPE900S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG41100S.dev";	

			}else if(_url.indexOf("HPPF200S1") > -1 ){
				_url = _serverDivn+"/products/pg/PG52100S.dev";	

			}


			var param = 	{
				'goodNm' 		 : stringData.goodNm,
				'url' 			 : _url,
				'spbSq'			 : paramObj.spbSq,
				'encrHndTphno'	 : paramObj.encrHndTphno
			};
	    	PageUtil.openPopup(option,param);
			return;
		}

	};

	/**
	 * 이메일 연결 셋팅
	 * @param label
	 * @param imsSrc
	 * @param linkUrl
	 */
	_public.emailSetting = function() {

		var stringData = _private.stringObj;

		var paramObj = _private.dataObj;

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

		if( _private.stringObj.snsId.indexOf('snsEmail') > -1 ) {

			//sms 공유 팝업창 띄우기
			var option = {
	    			id : 'popupwrap',
	    			location : 'external',
	    			content : 'content1',
	    			url : '/common/cc/HPCC120P1.dev',
	    			isToBeParam : true
	    		};

			// 장바구니정보 설정
			spbInfo_Data = new Object();
			spbInfo_Data.spbSq = paramObj.spbSq;		// 장바구니순번
			spbInfo_Data.encrHndTphno = paramObj.encrHndTphno;		// 암호화휴대전화번호
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
			plnInfo_Data.goodNm            = stringData.goodNm,											//상품명
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

	    	PageUtil.openPopup(option,gvObjImsiSaveData);
			return;
		}

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

        if(MXP_PLUGIN.isIOS()){
            document.body.prepend(el);
            range = document.createRange();
            range.selectNodeContents(el);
            selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            el.setSelectionRange(0,999999);
            el.setAttribute("type","hidden");
        }else{
        	document.body.appendChild(el);
        	copyTxt = document.getElementById('urlCopyInput');

            copyTxt.select();

        }
        document.execCommand("copy");
        el.remove();
    };
	
	_private.getProductUrlData = function(){

		var reqData = _private.setDataArr();

		var tradeKey = '';

		tradeKey = constants.getVal('SAVE');

		//트랜젝션 셋팅
		var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
		tranProp.url        = '/products/pc/HPPC600S1';           		// 트랜잭션 Url
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
			//$('#hidden_input').find('#spb_encrHndTphno').val(inSData.encrHndTphno);
			//장바구니순번
			//$('#hidden_input').find('#spb_spbSq').val(data.outData.spbSaveRslt[0].spbSq);

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

	return _public;
})();
