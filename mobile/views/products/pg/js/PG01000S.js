/* ============================================================================
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * DESCRIPTION : 상품 안내 정기보험
 * ========================================================================== */

//=============================================================================
// 페이지 Context 변수
//=============================================================================
var PG01000S               = null; // 페이지별 함수 구분을 위한 object 선언

//=============================================================================
// 페이지 Init 함수
//=============================================================================

/**
 * 페이지 Load시 실행되는 함수 (!함수 이름 변경 금지!)
 */
pageFunction = function(resGlobalPram) {

    initPage = (function() {
    	PG01000S.printData();
	})();

    initEvent = (function() {
    	PG01000S.eventBinder();
    	PG01000S.eventHandler();
    })();

};

//=============================================================================
// 페이지 기능 정의 함수
//=============================================================================

PG01000S = {

		/* ===================================================================
		 * page context variable
		 * ================================================================= */
		// default
		objOrgInSData 	: {},
		objOrgOutData 	: {},

		// additional
		objAjaxData	  	: {},
		objNextData	  	: {},

		/* ===================================================================
		 * init page setting
		 * ================================================================= */
		printData : function () {

			/* ===============================================================
			 * Default Area
			 * ============================================================= */
			PG01000S.objOrgInSData = util.clone(globalVar.getParam('inSData'));
			PG01000S.objOrgOutData = util.clone(globalVar.getParam('outData'));

			/* ===============================================================
			 * coding Area
			 * ============================================================= */

			PG01000S.inSDataSetting(PG01000S.objOrgOutData);
			
			// 카울리트래킹추가
			webLog.runCaulytracker( 'OPEN');
			webLog.runCriteo('good', '10001');
		},

		/* ===================================================================
		 * event
		 * ================================================================= */
		eventBinder : function() {

    		//생년월일 및 성별 입력 팝업
    		$('#btnResult').off('click').on('click', function (){
    			webLog.runGAQ('생년월일 및 성별 입력', '가입단계', '10001');
    		});

    		//보험료 계산하기 페이지이동
			$('#btnResultCalc').off('click').on('click', function (){

				if (!PG01000S.validateAge()) return;

				webLog.runGAQ('보험료계산', '가입단계', '10001');
				webLog.runCaulytracker( 'CA_plan_10001');

				var simpleChkYn 				= '';                  					// 간편체크여부
				var simpleBirth 	 			= '';                  					// 생년월일
				var simpleGndrCd 	 			= '';                  					// 성별
				var simpleSmokYnCd	 			= '';					                // 흡연여부코드
				var simpleChldBirth				= '';					                // 자녀생년월일
				var simpleChldGndrCd			= '';               				    // 자녀성별
				var simpleChldEntYn				= '';                   				// 자녀가입여부
				var simpleFetaYnCd				= '';					                // 태아여부
				var simplePreferredCd 			= '';					                // 건강체여부코드

				simpleChkYn 					= 'Y';
				simpleBirth 	 				= $('#birth').val();
				simpleGndrCd 	 				= $('#gndrCd').val() % 2 == '0' ? '2' : '1';
				simpleSmokYnCd	 				= PG01000S.smokeYn;
				simpleChldBirth					= $('#chldBirth').val() || '';
				simpleChldGndrCd				= $('#chldGndrCd').val() % 2 == '0' ? '2' : '1';
				simpleChldEntYn					= simpleChldGndrCd == '' ? 'N' : 'Y';
				simpleFetaYnCd					= util.trim($('#fetaYn').filter(':checked').val()) == 'Y' ? 'Y' : 'N';
				simplePreferredCd 				= 'N';

				util.setCookie('JUMIN_CD', 			$('#gndrCd').val());				//부모 성별코드

				var simpleChkData				= new Object();
				simpleChkData.simpleChkYn		= simpleChkYn;
				simpleChkData.simpleBirth 		= simpleBirth;
				simpleChkData.simpleGndrCd 		= simpleGndrCd;
				simpleChkData.simpleChldBirth	= simpleChldBirth;
				simpleChkData.simpleChldGndrCd	= simpleChldGndrCd;
				simpleChkData.simpleChldEntYn	= simpleChldEntYn;
				simpleChkData.simpleSmokYnCd	= simpleSmokYnCd;
				simpleChkData.simpleFetaYnCd	= simpleFetaYnCd;
				simpleChkData.simplePreferredCd	= simplePreferredCd;

				//보험설계 화면 이동
				var paramObj = new Object();
				paramObj.simpleData = simpleChkData;
				PageUtil.movePage('/products/pg/PG01100S', paramObj);

			});

			$('#btnRetrieveTab').off('click').on('click', function () {
				PG01000S.callRetrieveTab();
			});

			// 툴팁 영역
            $('[data-tooltip-id]').off('click').on('click', function () {
                var url = $(this).data('tooltip-id');
                fo.global.commonFn.callTooltip(url);
                return false;
            });

    		$('#PG00100P').off('click').on('click', function (){
    			PG01000S.PG00100P_Pop();
    		});
    		
    		// 카카오페이 회원 할인안내
			$('#PG00500P').off('click').on('click', function () {
				fo.global.commonFn.callPopup('/products/pg/PG00500P.dev', callBackFn);
			});
		},

		/* ===================================================================
		 * publisher event process code
		 * ================================================================= */
		eventHandler : function() {


		},

		/* ====================================================================
		 * page move process (tradeKey : move01 ~ move99)
		 * ================================================================== */
		/*
		 * parameter mapping
		 */
		setMovePageParam : function(tradeKey, data) {

			var paramObj = {};

			switch(tradeKey) {

				default :
					break;

			}

			return paramObj;
		},

		/*
		 * execute validation
		 */
		validateObjNextData : function(tradeKey, param) {

			var isValid = true;

			switch(tradeKey) {

				case '' :

					break;

				default :
					isValid = true;
					break;

			}

			return isValid;

		},

		/*
		 * url mapping and move page
		 */
		movePage : function(tradeKey, data) {

			var moveParam	= {};
			var moveUrl		= '';
			var strTarget	= '';		// 새창,자창(빈값:자창)
			var methodType	= '';		// GET, POST(빈값:POST)

			// data setting
			moveParam = PG01000S.setMovePageParam(tradeKey, data);

			// validation check
			if (!PG01000S.validateObjNextData(tradeKey, moveParam)) return;

			switch(tradeKey) {

				case 'move01' :
					moveUrl	  	= '/products/pg/PG01100S';
					methodType 	= 'GET';
					break;


				default :
					break;

			}

			PageUtil.movePage(moveUrl, moveParam, strTarget, methodType);

		},

		/* ====================================================================
		 * ajax process
		 * ================================================================== */
		/*
		 * parameter mapping
		 */
		setAjaxParam : function(tradeKey) {

			var paramObj = {};

			switch(tradeKey) {

				case 'smsCertificate' :
					PG01000S.pageParams.pNo	= $.trim($("#pNo").val());
					paramObj					= PG01000S.pageParams;
					break;

				default : break;

			}

			return paramObj;

		},

		/*
		 * execute validation
		 */
		validateObjAjaxData : function(tradeKey, param) {

			var isValid = true;

			switch(tradeKey) {

				case 'smsCertificate' :

					if(param.pNo == "" || param.pNo == null){
						isValid = false;
					}

					break;

				case '' :

					break;

				default :
					isValid = true;
					break;

			}

			return isValid;

		},

		/*
		 * url mapping and ajax call
		 */
		callAjax : function(tradeKey) {

			var ajaxParam	  = {};
			var ajaxActionUrl = '';

			switch(tradeKey) {

				case 'smsCertificate' :

					// data setting
					ajaxParam = PG01000S.setAjaxParam(tradeKey);

					// validation check
					if(!PG01000S.validateObjAjaxData(tradeKey, ajaxParam)){
						alert("empty str");
						return;
					}

					ajaxActionUrl = '/products/pz/MWPZ002S1';
					break;

				default : break;

			}

			var tranProp 	  = util.clone(transaction.TRAN_COMM_PROP);
			tranProp.url      = ajaxActionUrl;
			tranProp.tradeKey = tradeKey;
			tranProp.params   = ajaxParam;
			tranProp.success  = PG01000S.successAjaxCallback;
			tranProp.failure  = PG01000S.failureAjaxCallback;

			transaction.callTran(tranProp);

		},

		successAjaxCallback : function(callBackData) {

			var iData = callBackData.inSData;
			var oData = callBackData.outData;

			switch(iData.tradeKey) {

				case 'smsCertificate' :
					console.log(callBackData);
					break;


				default : break;
			}

		},

		failureAjaxCallback : function(callBackData) {

			var iData = callBackData.inSData;
			var oData = callBackData.outData;

			switch(iData.tradeKey) {
				case '' :

					var errorMsg = oData.ERROR_MSG;

					if (errorMsg) {
						alert (errorMsg);
						return false;
					}

					break;

				default : break;
			}

		},

		/* ====================================================================
		 * popup process (tradeKey : popup01 ~ popup99, winPopup01 ~ winPopup99)
		 * ================================================================== */
		// 모달 레이어 팝업
		callPopup : function(tradeKey, data) {

			var paramObj = {};
			var popupUrl = '';
			var width = '';
			var height = '';

			switch(tradeKey) {

				case 'popup01' :
					popupUrl 	= '/products/pz/MWPZ004S1';
					paramObj 	= data;
					width 		= 700;
					height 		= 650;
					break;
					
				default :
					break;
			}

			var option = {
					id        : 'popupwrap',
					location  : 'external',
					content   : 'content1',
					url       : popupUrl,
					width	  : width,
					height    : height
			};

			PageUtil.openPopup(option, paramObj);
		},

		// 윈도우 팝업
		callWinPopup : function(tradeKey) {

			var winPopUrl = '';
			var popupName = '';
			var option 	  = '';

			switch(tradeKey) {

				case 'winPopup01' :

					break;

				default :
					break;

			}

			window.open(winPopUrl, popupName, option);
		},

		/* ===================================================================
		 * page function
		 * ================================================================= */

		// 조회 데이타 재정의
		preDataHandlerForPaging: function(orgData){

		},

		postDataHandler : function(listData){

			PG01000S.eventBinder();

		},

		inSDataSetting : function(data){

			/**
			 * 쿠키 설정
			 * 설계 페이지에서 사용되는 쿠키명
			 * PLNNR_BRDT 			: 생년월일(YYMMDD)
			 * PLNNR_GNDR_CD 		: 성별(남1,여2)
			 * JUMIN_CD				: 성별(1~8 외국인,2000년 출생자 포함하기 위함)
			 * SMOKE_YN 			: 흡연여부(Y,N)
			 * JUMIN1_SUB_BRDT  	: 자녀 생년월일(YYMMDD)
			 * JUMIN1_SUB_GNDR_CD	: 자녀 성별(남1,여2)
			 * JUMIN1_SUB_CD		: 성별(1~8 외국인,2000년 출생자 포함하기 위함)
			 * UNBORN				: 태아 여부
			 * PREFERRED_CD 		: 프리퍼드 코드
			 */

			PG01000S.birth 			=  util.getCookie("PLNNR_BRDT").length == '8' ? util.getCookie("PLNNR_BRDT").substring(2) : util.getCookie("PLNNR_BRDT");
			PG01000S.gndrCd 		=  util.getCookie("PLNNR_GNDR_CD");
			PG01000S.juminCd		=  util.getCookie("JUMIN_CD");
			PG01000S.smokeYn		=  util.getCookie("SMOKE_YN") || 'Y';
			PG01000S.subBrdt		=  util.getCookie("JUMIN1_SUB_BRDT").length == '8' ? util.getCookie("JUMIN1_SUB_BRDT").substring(2) : util.getCookie("JUMIN1_SUB_BRDT");
			PG01000S.subGndrCd		=  util.getCookie("JUMIN1_SUB_GNDR_CD");
			PG01000S.subCd			=  util.getCookie("JUMIN1_SUB_CD");
			PG01000S.unborn			=  util.getCookie("UNBORN");
			PG01000S.preferredCd	=  util.getCookie("PREFERRED_CD");

			// 부모 생년월일,성별
			$('#birth').val(PG01000S.birth);
			$('#gndrCd').val(PG01000S.juminCd);

			// 자녀 생년월일,성별
			$('#chldBirth').val(PG01000S.subBrdt);
			$('#chldGndrCd').val(PG01000S.subCd);

			// 보험별 영역 삭제 (태아여부,자녀입력,여성건강보험 영역 삭제)
			$('[data-areaid="feta"]').remove();
			$('[data-areaid="child"]').remove();
			$('[data-areaid="woman"]').remove();

			//상품안내
			if(!util.isNull(data.retrieveHpProdDetail.goodNotiText)){
				$("#product_guide").html(util.setHtmlParsing(data.retrieveHpProdDetail.goodNotiText));
			}
			
		},

		validateAge : function () {
			var brdt = util.trim($('#birth').val() || '');
			var gndrCd = util.trim($('#gndrCd').val() || '');

			if(brdt.length == 0){
				alert("생년월일을 입력하세요.");
				$("#birth").focus();
				return false;
			}

			if(util.isNull(gndrCd)){
				alert("성별을 입력하세요.");
				$("#gndrCd").focus();
				return false;
			}
			
			if(!util.isValidBrdt(brdt, gndrCd)) {
				alert("생년월일이 올바르지 않습니다. 생년월일 혹은 주민번호 앞자리를 확인해주세요.");
				$("#birth").focus();
				return false;
			}

			PG01000S.plnnrBrdt = brdt;                        // 생년월일
			PG01000S.realAge   = util.getRealAge(brdt + '1'); // 만나이
			PG01000S.insurAge  = util.entAgeCal(brdt + '1');  // 보험나이

			if(PG01000S.realAge == false){
				alert("생년월일이 올바르지 않습니다. 주민번호 앞자리를 확인하여 입력해 주시기 바랍니다.");
				$("#birth").focus();
				return false;
			}

			if(util.Number(gndrCd) < 1 || util.Number(gndrCd) > 8){
				alert("현재 만 나이는 " + PG01000S.realAge + "세 입니다. 주민번호 뒷자리를 확인하여 입력해 주시기 바랍니다.");
				$("#gndrCd").focus();
				return false;
			}

			if((PG01000S.realAge < 19)){
				alert("현재 만 나이는 " + PG01000S.realAge + "세 입니다. 보험가입은 만 19세이상 70세 이하 가입가능합니다.");
				$("#birth").focus();
				return false;

			}else if((PG01000S.insurAge > 70)){
				alert("현재 보험가입 나이는 " + PG01000S.insurAge + "세 입니다. 보험가입은 만 19세이상 70세 이하 가입가능합니다.");
				$("#birth").focus();
				return false;
			}

			return true;
		},

		/*보장내용탭 조회*/
		callRetrieveTab : function() {

			var paramObj = new Object();
			paramObj.rrsnGoodCd = '10001';
			paramObj.PRD_CD = '1000101';

			var url = '/products/pg/PG01000P.dev';
			fo.global.commonFn.callPopup(url, callBackFn, paramObj);	    // 파라미터가 있는경우
		},

		/*가입시 유의사항*/
		PG00100P_Pop : function() {
			var paramObj = new Object();
			paramObj.mw_insSbsnGoodSmclCd = '11';   //보험영업상품소분류코드

			var url = '/products/pg/PG00100P.dev';
			fo.global.commonFn.callPopup(url, callBackFn, paramObj);
		}

};
