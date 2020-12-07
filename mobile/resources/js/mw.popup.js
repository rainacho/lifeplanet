/* ============================================================================
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * DESCRIPTION : 공통팝업(동적)호출 js
 * ========================================================================== */
$(function(){
	
	// 묶음가입 이용방법안내(팝업)
	$(document).on("click", ".multiContPop", function(){
		
		var option = {
			  id 			: 'popupwrap'
			, location 		: 'external'
			, content 		: 'content1'
			, url      		: '/products/pc/MWPC601P1.dev'
		};
		
		PageUtil.openPopup (option);
		return false;
	});
	
	// 연금,연금저축,어린이저축 ‘저축성 보험 추가납입제도’ 란?
	$(document).on("click", "[data-popid=btn_MWPD301P1]", function(){
		/** 저축성 보험 추가납입제도 팝업 시작 */
		var urlPath 	= location.href;
		var planGoodCd  = '';
		if ( (urlPath.indexOf('/products/pd/') > -1) || (urlPath.indexOf('/products/pe/') > -1) 
				|| (urlPath.indexOf('MWBL160S1') > -1) ) {
			var planId = location.href.split('/')[(location.href.split('/').length-1)].split('.')[0];
			switch (planId) {
				case 'MWPD310S1' : planGoodCd = '10003'; break;
				case 'MWPD410S1' : planGoodCd = '10004'; break;
				case 'MWPD610S1' : planGoodCd = '10008'; break;
				case 'MWBL160S1' : planGoodCd = '10004'; break;
				default : planGoodCd = 'default'; break;
			}
		}
		
		globalVar.setParam('btn_MWPD301P1'     , planGoodCd);
		
		var option = {
			  id 			: 'popupwrap'
			, location 		: 'external'
			, content 		: 'content1'
			, url      		: '/products/pd/MWPD301P1.dev'
		};
		PageUtil.openPopup (option);
		return false;
	});
	
	
	//씨드포인트 적립 받는 방법
	$(document).on("click", "a[id^=goMWPC115P1]", function(){
		
		var option = {
				  id 			: 'popupwrap'
				, location 		: 'external'
				, content 		: 'content1'
				, url      		: '/products/pc/MWPC115P1.dev'
		};
		
		PageUtil.openPopup (option);
		return false;
	});
	
}(this, jQuery));	
/**
 * 해지환급금 팝업
 * */
this.Refund = (function (global, $) {
	var _public = {}
	, _private = {};

	_private.options = {
		'schoolEx'			: {}
		, 'prodInfo5sec' 	: new Map ()
		, 'banc'			: new Map ()
	};

	// 필요 데이터 초기화

	// 초등학교
	_private.options.schoolEx[ '0101' ] = {'str' : 7,  'end' : 12 };
	// 중학교
	_private.options.schoolEx[ '0102' ] = {'str' : 13, 'end' : 15 };
	// 고등학교
	_private.options.schoolEx[ '0103' ] = {'str' : 16, 'end' : 18 };
	// 대등학교
	_private.options.schoolEx[ '0104' ] = {'str' : 19, 'end' : 22 };
	// 유학
	_private.options.schoolEx[ '0105' ] = {'str' : 19, 'end' : 22 };
	// 사회진출
	_private.options.schoolEx[ '0106' ] = {'str' : 25, 'end' : 25 };

	//정기보험 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1000101", {"intyScCd":"01", "intyCd":3010001, "prodNm":"정기보험(순수보장형,표준체)"});
	_private.options.prodInfo5sec.put("1000111", {"intyScCd":"01", "intyCd":3010011, "prodNm":"정기보험(만기50%환급형,표준체)"});
	_private.options.prodInfo5sec.put("1000121", {"intyScCd":"01", "intyCd":3010021, "prodNm":"정기보험(만기100%환급형,표준체)"});

	_private.options.prodInfo5sec.put("1000102", {"intyScCd":"01", "intyCd":3010002, "prodNm":"정기보험(순수보장형,비흡연체)"});
	_private.options.prodInfo5sec.put("1000112", {"intyScCd":"01", "intyCd":3010012, "prodNm":"정기보험(만기50%환급형,비흡연체)"});
	_private.options.prodInfo5sec.put("1000122", {"intyScCd":"01", "intyCd":3010022, "prodNm":"정기보험(만기100%환급형,비흡연체)"});

	_private.options.prodInfo5sec.put("1000123", {"intyScCd":"01", "intyCd":3010097, "prodNm":"정기보험(순수보장형,건강체)"});
	_private.options.prodInfo5sec.put("1000125", {"intyScCd":"01", "intyCd":3010099, "prodNm":"정기보험(만기50%환급형,건강체)"});
	_private.options.prodInfo5sec.put("1000127", {"intyScCd":"01", "intyCd":3010101, "prodNm":"정기보험(만기100%환급형,건강체)"});

	_private.options.prodInfo5sec.put("1000124", {"intyScCd":"01", "intyCd":3010098, "prodNm":"정기보험(순수보장형,슈퍼건강체)"});
	_private.options.prodInfo5sec.put("1000126", {"intyScCd":"01", "intyCd":3010100, "prodNm":"정기보험(만기50%환급형,슈퍼건강체)"});
	_private.options.prodInfo5sec.put("1000128", {"intyScCd":"01", "intyCd":3010102, "prodNm":"정기보험(만기100%환급형,슈퍼건강체)"});



	//종신보험 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1000201", {"intyScCd":"01", "intyCd":3010023, "prodNm":"종신보험(체감형)_표준체"});
	_private.options.prodInfo5sec.put("1000202", {"intyScCd":"01", "intyCd":3010061, "prodNm":"종신보험(일반형)_표준체"});
	_private.options.prodInfo5sec.put("1000203", {"intyScCd":"01", "intyCd":3010066, "prodNm":"종신보험(체감형)_비흡연체"});
	_private.options.prodInfo5sec.put("1000204", {"intyScCd":"01", "intyCd":3010067, "prodNm":"종신보험(일반형)_비흡연체"});
	_private.options.prodInfo5sec.put("1000205", {"intyScCd":"01", "intyCd":3010136, "prodNm":"종신보험(체감형)_건강체"});
	_private.options.prodInfo5sec.put("1000206", {"intyScCd":"01", "intyCd":3010137, "prodNm":"종신보험(일반형)_건강체"});

	//연금,연금저축,꿈꾸는저축 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1000301", {"intyScCd":"01", "intyCd":3010024, "prodNm":"일반연금보험"});
	_private.options.prodInfo5sec.put("1000401", {"intyScCd":"01", "intyCd":3010025, "prodNm":"연금저축보험"});
	_private.options.prodInfo5sec.put("1004801", {"intyScCd":"01", "intyCd":3010182, "prodNm":"일반연금보험"});
	_private.options.prodInfo5sec.put("1004701", {"intyScCd":"01", "intyCd":3010181, "prodNm":"연금저축보험"});
	_private.options.prodInfo5sec.put("1001001", {"intyScCd":"01", "intyCd":3010069, "prodNm":"꿈꾸는저축보험"});
	_private.options.prodInfo5sec.put("1005001", {"intyScCd":"01", "intyCd":3010186, "prodNm":"1년부터e저축보험"});

	//어린이플러스(태아)
	_private.options.prodInfo5sec.put("1000701", {"intyScCd":"01", "intyCd":3010062, "prodNm":"플러스어린이보험(출생전,순수보장형)"});
	_private.options.prodInfo5sec.put("1000702", {"intyScCd":"01", "intyCd":3010063, "prodNm":"플러스어린이보험(출생전,50%환급형)"});
	_private.options.prodInfo5sec.put("1000703", {"intyScCd":"01", "intyCd":3010064, "prodNm":"플러스어린이보험(출생전,100%환급형)"});

	//어린이플러스(어린이)
	_private.options.prodInfo5sec.put("1000704", {"intyScCd":"01", "intyCd":3010062, "prodNm":"플러스어린이보험(출생후,순수보장형)"});
	_private.options.prodInfo5sec.put("1000705", {"intyScCd":"01", "intyCd":3010063, "prodNm":"플러스어린이보험(출생후,50%환급형)"});
	_private.options.prodInfo5sec.put("1000706", {"intyScCd":"01", "intyCd":3010064, "prodNm":"플러스어린이보험(출생후,100%환급형)"});

	//에듀케어
	_private.options.prodInfo5sec.put("1000801", {"intyScCd":"01", "intyCd":3010065, "prodNm":"어린이저축성보험"});

	// 암보험
	// 조건별 상품코드 정보
	_private.options.prodInfo5sec.put('1001101', {'intyScCd': '01', 'intyCd': 3010070, 'prodNm': '암보험(순수보장형)_표준체'});
	_private.options.prodInfo5sec.put('1001102', {'intyScCd': '01', 'intyCd': 3010071, 'prodNm': '암보험(순수보장형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001103', {'intyScCd': '01', 'intyCd': 3010072, 'prodNm': '암보험(만기50%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001104', {'intyScCd': '01', 'intyCd': 3010073, 'prodNm': '암보험(만기50%환급형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001105', {'intyScCd': '01', 'intyCd': 3010074, 'prodNm': '암보험(만기100%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001106', {'intyScCd': '01', 'intyCd': 3010075, 'prodNm': '암보험(만기100%환급형)_비흡연체'});

	_private.options.prodInfo5sec.put('1001107', {'intyScCd': '01', 'intyCd': 3010119, 'prodNm': '암보험Ⅱ(순수보장형)_표준체'});
	_private.options.prodInfo5sec.put('1001108', {'intyScCd': '01', 'intyCd': 3010120, 'prodNm': '암보험Ⅱ(순수보장형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001109', {'intyScCd': '01', 'intyCd': 3010121, 'prodNm': '암보험Ⅱ(만기50%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001110', {'intyScCd': '01', 'intyCd': 3010122, 'prodNm': '암보험Ⅱ(만기50%환급형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001111', {'intyScCd': '01', 'intyCd': 3010123, 'prodNm': '암보험Ⅱ(만기100%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001112', {'intyScCd': '01', 'intyCd': 3010124, 'prodNm': '암보험Ⅱ(만기100%환급형)_비흡연체'});

	// 5대 성인병
	// 조건별 상품코드 정보
	_private.options.prodInfo5sec.put('1001201', {'intyScCd': '01', 'intyCd': 3010076, 'prodNm': '5대성인병보험(순수보장형)_표준체'});
	_private.options.prodInfo5sec.put('1001202', {'intyScCd': '01', 'intyCd': 3010077, 'prodNm': '5대성인병보험(순수보장형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001203', {'intyScCd': '01', 'intyCd': 3010078, 'prodNm': '5대성인병보험(만기50%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001204', {'intyScCd': '01', 'intyCd': 3010079, 'prodNm': '5대성인병보험(만기50%환급형)_비흡연체'});
	_private.options.prodInfo5sec.put('1001205', {'intyScCd': '01', 'intyCd': 3010080, 'prodNm': '5대성인병보험(만기100%환급형)_표준체'});
	_private.options.prodInfo5sec.put('1001206', {'intyScCd': '01', 'intyCd': 3010081, 'prodNm': '5대성인병보험(만기100%환급형)_비흡연체'});

	//상해보험
	_private.options.prodInfo5sec.put("1001701", {"intyScCd": "01", "intyCd": 3010103, "prodNm":"상해보험(비위험)"});
	_private.options.prodInfo5sec.put("1001702", {"intyScCd": "01", "intyCd": 3010104, "prodNm":"상해보험(중위험)"});
	_private.options.prodInfo5sec.put("1001703", {"intyScCd": "01", "intyCd": 3010105, "prodNm":"상해보험(고위험)"});


	//부모사랑정기보험 goodCd로 보종코드, 보종구분코드 return
	_private.options.prodInfo5sec.put("1002301", {"intyScCd":"01", "intyCd":3010110, "prodNm":"부모사랑정기보험(기본형,표준체)"});
	_private.options.prodInfo5sec.put("1002302", {"intyScCd":"01", "intyCd":3010111, "prodNm":"부모사랑정기보험(기본형,흡연체)"});
	_private.options.prodInfo5sec.put("1002303", {"intyScCd":"01", "intyCd":3010112, "prodNm":"부모사랑정기보험(기본형,건강체)"});
	_private.options.prodInfo5sec.put("1002304", {"intyScCd":"01", "intyCd":3010113, "prodNm":"부모사랑정기보험(기본형,슈퍼건강체)"});

	_private.options.prodInfo5sec.put("1002305", {"intyScCd":"01", "intyCd":3010114, "prodNm":"부모사랑정기보험(페이백형,표준체)"});
	_private.options.prodInfo5sec.put("1002306", {"intyScCd":"01", "intyCd":3010115, "prodNm":"부모사랑정기보험(페이백형,흡연체)"});
	_private.options.prodInfo5sec.put("1002307", {"intyScCd":"01", "intyCd":3010116, "prodNm":"부모사랑정기보험(페이백형,건강체)"});
	_private.options.prodInfo5sec.put("1002308", {"intyScCd":"01", "intyCd":3010117, "prodNm":"부모사랑정기보험(페이백형,슈퍼건강체)"});

	// 입원비보험
	_private.options.prodInfo5sec.put("1002801", {"intyScCd":"01", "intyCd":3010139, "prodNm":"입원비보험(순수보장형)"});
	_private.options.prodInfo5sec.put("1002802", {"intyScCd":"01", "intyCd":3010140, "prodNm":"입원비보험(만기50%환급형)"});
	_private.options.prodInfo5sec.put("1002803", {"intyScCd":"01", "intyCd":3010141, "prodNm":"입원비보험(만기100%환급형)"});

	// 수술비보험
	_private.options.prodInfo5sec.put("1002901", {"intyScCd":"01", "intyCd":3010142, "prodNm":"수술비보험(순수보장형)"});
	_private.options.prodInfo5sec.put("1002902", {"intyScCd":"01", "intyCd":3010143, "prodNm":"수술비보험(만기50%환급형)"});
	_private.options.prodInfo5sec.put("1002903", {"intyScCd":"01", "intyCd":3010144, "prodNm":"수술비보험(만기100%환급형)"});

	// 만원부터m저축보험
	_private.options.prodInfo5sec.put("1003101", {"intyScCd":"01", "intyCd":3010146, "prodNm":"만원부터m저축보험"});

	//퇴직준비m저축보험
	_private.options.prodInfo5sec.put('1003801', {'intyScCd':'01', 'intyCd':3010146, 'prodNm': '퇴사준비m저축보험'});

	//비갱신3종m암보험
	_private.options.prodInfo5sec.put('1003901', {'intyScCd':'01', 'intyCd':3010166, 'prodNm': '비갱신3종m암보험'});

	//건강치아보험(순수보장형)
	_private.options.prodInfo5sec.put('1004301', {'intyScCd':'01', 'intyCd':3010173, 'prodNm': '건강치아보험(순수보장형)'});
	
	//미세먼지질병보험(순수보장형)
	_private.options.prodInfo5sec.put('1004101', {'intyScCd':'01', 'intyCd':3010168, 'prodNm': '미세먼지질병보험(순수보장형,표준체)'});
	
	// 여성건강보험
	_private.options.prodInfo5sec.put("1004901", {"intyScCd":"01", "intyCd":3010183, "prodNm":"여성건강보험(순수보장형)"});
	_private.options.prodInfo5sec.put("1004902", {"intyScCd":"01", "intyCd":3010184, "prodNm":"여성건강보험(만기50%환급형)"});
	_private.options.prodInfo5sec.put("1004903", {"intyScCd":"01", "intyCd":3010185, "prodNm":"여성건강보험(만기100%환급형)"});
	
	// 암·뇌·심장건강보험(해지환급금 미지급형)
	_private.options.prodInfo5sec.put("1005201", {"intyScCd":"01", "intyCd":3010189, "prodNm":"암·뇌·심장건강보험(해지환급금 미지급형)"});
	_private.options.prodInfo5sec.put("1005202", {"intyScCd":"01", "intyCd":3010190, "prodNm":"암·뇌·심장건강보험(해지환급금 지급형)"});
	
	//방카상품 여부 조회
	// b연금
	_private.options.banc.put ("1002001", true);
	// b연금저축
	_private.options.banc.put ("1002101", true);
	// b연금2
	_private.options.banc.put ("1004401", true);
	// b연금저축2
	_private.options.banc.put ("1004601", true);

	/**
		기초 데이터 조회
	*/
	_private.getHiddenData = function (type) {

		var _execute = {
			'header' : function () {
//				var data = HPPAHeader.objOrgInSData.spb_data;
				var data = HPPAHeader.headerSpbArr[HPPAHeader.cancelIdx];

				data.spb_intyCd		= _private.options.prodInfo5sec.get (data.spb_goodCd).intyCd;
				data.spb_intyScCd	= _private.options.prodInfo5sec.get (data.spb_goodCd).intyScCd;
				return data;
			}
			, 'page' : function () {
				var $hiddenData = $('#hidden_input :input')
				, inData		= {};

				// key , value 셋팅
				$.each ($hiddenData, function (idx, data) {

					var $data = $(data);

					inData[ $data.attr ('id') ] = $data.val ();
				});

				return inData;
			}
			, 'global': function () {
				return globalVar.getParam('refund_data');
			}
		}
		, hiddenData = {};

		if (_execute.hasOwnProperty (type)) {

			hiddenData = _execute[ type ] ();
		}
		return hiddenData;
	};

	/**
		팝업 URL조회
	*/
	_private.getUrl = function (goodSmclCd,goodCd) {

		var url = '/products/pg/PG00203P.dev';
		if(goodCd != undefined && (goodCd.indexOf("10037") > -1 || goodCd.indexOf("10052") > -1)){
			url = '/products/pg/PG00204P.dev';
		}else{
			if(goodSmclCd == "11" || goodSmclCd == "42" ||
			   goodSmclCd == "43" || goodSmclCd == "44" ||
			   goodSmclCd == "61" || goodSmclCd == "71" ||
			   goodSmclCd == "81" || goodSmclCd == "45"){

				url = '/products/pg/PG00202P.dev';
			}
		}
		return url;
	};
	/**
	 * 데이터 구조화
	 * */
	_private.buildEduAmtData = function (data) {

		var cllgRgiExpn	= util.Number (data.spb_cllgRgiExpn)                 	// 대학등록비용
		, elscEduExpn   = util.Number (data.spb_elscEduExpn)                 	// 초등학교교육
		, mdscEduExpn   = util.Number (data.spb_mdscEduExpn)                	// 중학교교육비
		, hgscEduExpn   = util.Number (data.spb_hgscEduExpn)                 	// 고등학교교육
		, saRsrExpnWt   = util.Number (data.spb_saRsrExpnWtrAge)             	// 유학준비비용
		, saRsrExpn     = util.Number (data.spb_saRsrExpn)                   	// 유학준비비용
		, siGoExpn      = util.Number (data.spb_siGoExpn)                  		// 사회진출비용
		, mnnpEntAge	= data.spb_chldInsAge									// 주피보험자 보험나이
		, sourceData 	= []													// 소스데이터
		, eduData 		= []													// 최종결과물
		, i, length, sourceSingleData;											// LOOP변수, 단일데이터

		 //초등학교 elscEduExpn
		 if (util.Number (elscEduExpn) > 0) {
			 sourceData.push ({
				 'eduFuncScCdNm' 	: '0101'
				 , 'pyAmt'			: util.Number (elscEduExpn)
			 });
		 }

		 //중학교 mdscEduExpn
		 if (util.Number (mdscEduExpn) > 0) {
			 sourceData.push ({
				 'eduFuncScCdNm' 	: '0102'
				 , 'pyAmt'			: util.Number (mdscEduExpn)
			 });
		 }

		 //고등학교 hgscEduExpn
		 if (util.Number (hgscEduExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0103'
				, 'pyAmt'			: util.Number (hgscEduExpn)
			 });
		 }

		 //대학등록금
		 if (util.Number (cllgRgiExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0104'
				, 'pyAmt'			: util.Number (cllgRgiExpn)
			 });
		 }
		 //유학
		 if (util.Number (saRsrExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0105'
				, 'pyAmt'			: util.Number (saRsrExpn)
				, 'calScVal'		: util.Number (saRsrExpnWt)
			 });
		 }
		 //사회진출금
		 if (util.Number (siGoExpn) > 0) {
			 sourceData.push ({
				  'eduFuncScCdNm' 	: '0106'
				, 'pyAmt'			: util.Number (siGoExpn)
			 });
		 }

		// 데이터 구조화
		for (i = 0, length = sourceData.length; i < length; i += 1) {

			sourceSingleData 	= sourceData[ i ];
			$.merge (eduData, _private.getRebuildSingleEduData (sourceSingleData, mnnpEntAge));
		}
		return eduData;
	},
	/**
	 * 나이대별 환급금 데이터 조회
	 *
	 * @param : amt, schoolCd, insAge
	 * */
	_private.getRebuildSingleEduData = function (sourceData, insAge) {

		// 초기화
		insAge 			= util.Number (insAge);								// 보험나이

		// 변수선언
		var term 		= 3													// 기본 기간
		, schoolCd		= sourceData.eduFuncScCdNm							// 구분코드
		, schoolData 	= _private.options.schoolEx[ schoolCd ]				// 데이터
		, pyAmt 		= util.Number (sourceData.pyAmt)					// 금액
		, calScVal		= util.Number (sourceData.calScVal)					// 적용 보험나이
		, minAge		= util.Number (schoolData.str)						// 시작나이
		, maxAge		= util.Number (schoolData.end)						// 종료나이
		, result = [], i, length;											// 결과, LOOP 변수

		// 보험나이 +3년 부터 중도인출이 가능하다.
		insAge += term;
		// 유학자금
		if (schoolCd == '0105') {

			result.push ({
				  'mdwyFuncDetaCd' 	: schoolCd
				, 'calScVal' 		: calScVal
				, 'pyAmt' 			: pyAmt
			});
		}
		// 그외
		else {

			i = insAge > minAge ? insAge : minAge;
			for (length = maxAge; i <= length; i += 1) {
				result.push ({
					  'mdwyFuncDetaCd'	: schoolCd
					, 'calScVal' 		: i
					, 'pyAmt' 			: pyAmt
				});
			}
		}
		return result;
	};
	/**
		해지환급금 데이터 생성
	*/
	_private.getRefundData = function (type, goodSmclCd) {

		var data 		= _private.getHiddenData (type)
		, refundMap 	= new Object()
		, today  		= util.getDate()
		, insurPayPer 	= data.spb_rlpmPeri          						//납입기간
		, inspd			= util.Number(data.spb_rinsPeri)   					//보험기간
		, mnnpEntAge  	= data.spb_plnnrInsAge								//설계자 보험나이
		, scnpEntAge	= data.spb_chldInsAge								//자녀 보험나이
		, inspdVal		= 0
		, insurPayPerVal= 0
		, planCd      	= ""
		, annOpnnAge  	= "0"
		, goalPmtPeri 	= "0"
		, goodCd		= data.spb_goodCd									//상품코드
		, intyCd 		= data.spb_intyCd  									//보종코드
		, intyScCd 		= data.spb_intyScCd									//보종구분코드
		, stmymd      	= ''												//기준일자
		, isBanc		= _private.options.banc.get (data.spb_goodCd) || false		//방카슈랑스여부
		, isToss		= data.spb_isToss;		
		// 해지환급금 조회시 intyScCd 는 01로 처리
		intyScCd = '01';

		//기준일자
		stmymd = util.addDate(today , 'y', Number (insurPayPer));

		// 정기
		if (goodSmclCd == "11" || goodSmclCd == "43" ||
			goodSmclCd == "44" || goodSmclCd == "61" ||
			goodSmclCd == "71" || goodSmclCd == "81" ||  goodSmclCd == "45") {

			//세만기(보험기간)
			if(inspd > 49){
				inspdVal = inspd - mnnpEntAge;
			}
			//년만기(보험기간)
			else if(inspd < 50){
				inspdVal = inspd;
			}

			//세만기(납입기간)
			if(insurPayPer > 49){
				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			//년만기(납입기간)
			else if(insurPayPer < 50){
				insurPayPerVal = insurPayPer;
			}
		}
		// 종신
		else if (goodSmclCd == "12") {

			inspdVal = 999;

			//세만기(납입기간)
			if(insurPayPer > 49){
				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			//년만기(납입기간)
			else if(insurPayPer < 50){
				insurPayPerVal = insurPayPer;
			}

		}
		// 연금, 연금저축
		else if (goodSmclCd == "21" || goodSmclCd == "31") {

			//세만기(보험기간)
			if(inspd > 49){
				inspdVal = inspd - mnnpEntAge;
			}
			//년만기(보험기간)
			else if(inspd < 50){
				inspdVal = inspd;
			}

			inspdVal = 999;

			//세만기(납입기간)
			if(insurPayPer > 49){
				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			//년만기(납입기간)
			else if(insurPayPer < 50){
				insurPayPerVal = insurPayPer;
			}

			planCd 		= "02";
			annOpnnAge  = data.spb_annOpnnAge;
			goalPmtPeri = data.spb_goalPmtPeri;

			if (isBanc) {

				insurPayPerVal = insurPayPer;
			}
			else {

				//연금납입기간 (연금개시시점 - 현재보험나이)
				insurPayPerVal = Number(annOpnnAge) - Number(mnnpEntAge);
			}
		}
		//어린이플러스, 어린이에듀케어 [실보험기간 = 보험기간-어린이나이]
		//어린이플러스, 어린이에듀케어 [실납입기간 = 납입기간-어린이나이]
		else if (goodSmclCd == "42" || goodSmclCd == "32") {

			scnpEntAge = mnnpEntAge;
			mnnpEntAge = data.spb_chldInsAge;			//주피나이를 어린이로 변경

			// 보험기간
			// 세만기
			if ( data.spb_inspdTypeCd == '02') {

				inspdVal = inspd - mnnpEntAge;
			}
			// 년만기
			else {

				inspdVal = inspd;
			}

			// 납입기간
			// 세만기
			if ( data.spb_pmtpdTypeCd == '02') {

				insurPayPerVal = insurPayPer - mnnpEntAge;
			}
			// 년만기
			else {

				insurPayPerVal = insurPayPer;
			}
		}
		// e저축
		else if (goodSmclCd == "33") {

			insurPayPerVal 	= insurPayPer;
			inspdVal		= inspd;
		}

		refundMap.PLAN_CD     = planCd;
		refundMap.goodCd 	  = goodCd;          								// 상품코드
		refundMap.stdYmdTo    = stmymd;                               			// 기준일자

		// 에듀케어
		if (goodSmclCd == '32') {

			// 만기환급형
			var special = data.spb_trtyTypeText;
			var arr  = {};

			arr = special.split("|");

			refundMap.pltcInf_cnt = arr.length;                             	// 보종별정보건수

			var intyCdArr   	= "";
			var intyScCdArr 	= "";
			var EntAmtArr   	= "";
			var pltcPrmArr  	= "";
			var pmtCyclCdArr 	= "";
			var inspdArr    	= "";
			var pmtpdArr    	= "";

		    var mdwyFuncDetaCdArr    = '';                                  	// 중도자금세부코드
		    var mdwyFuncDetaCdArr_cnt  = 0;                                	 	// 중도자금세부코드개수
		    var calScValArr          = '';                                  	// 지급기준나이
		    var pyAmtArr             = '';                                  	// 지급금액

			for(var i=0; i<arr.length; i++){

				intyCdArr	+= arr[i].split(",")[0] + "/@";						// 보종코드
				intyScCdArr += arr[i].split(",")[1] + "/@";						// 보종구분코드
				EntAmtArr   += arr[i].split(",")[3] + "/@";						// 보종별가입금액
				pltcPrmArr  += arr[i].split(",")[4] + "/@";						// 보종별보험료


			    //주특약은 보험기간을 넣고
			    if(i == 0){
			    	inspdArr += arr[i].split(",")[5] + "/@";					// 보험기간
			    	pmtpdArr += arr[i].split(",")[6] + "/@";
			    }
			    //면책 특약은 주특약의 납입기간을  넣는다.
			    else if(arr[i].split(",")[0] == '3060001'){
			    	inspdArr += arr[i].split(",")[6] + "/@";
			    	pmtpdArr += arr[i].split(",")[6] + "/@";
			    }

				//납입주기코드 99:일시납, 12:연납, 01:월납
				if(data.spb_pmtCyclCd == "99"){
					pmtCyclCdArr += "99" + "/@";
				}else if(data.spb_pmtCyclCd == "12"){
					pmtCyclCdArr += "12" + "/@";
				}else if(data.spb_pmtCyclCd == "01"){
					pmtCyclCdArr += "01" + "/@";
				}
			}

			 var arrEduData = _private.buildEduAmtData (data);
			// 학자금이 있으면 설정
			if (!util.isNull (arrEduData) && arrEduData.length > 0 ) {

				mdwyFuncDetaCdArr_cnt = arrEduData.length;

				for (var i = 0; i < mdwyFuncDetaCdArr_cnt; i += 1) {

					eduData = arrEduData[ i ];

					mdwyFuncDetaCdArr += eduData.mdwyFuncDetaCd + '/@';
					calScValArr       += eduData.calScVal + '/@';
					pyAmtArr          += eduData.pyAmt + '/@';
				}

				refundMap.mdwyFuncDetaCdArr 	= mdwyFuncDetaCdArr;
				refundMap.mdwyWtrInf_cnt	 	= mdwyFuncDetaCdArr_cnt;
				refundMap.calScValArr       	= calScValArr;
				refundMap.pyAmtArr         		= pyAmtArr;
			}

			refundMap.intyCd	  = intyCdArr;							 		// (장바구니 없음)보종코드
			refundMap.intyScCd	  = intyScCdArr;                 		 		// (장바구니 없음)보종구분코드
			refundMap.conYmd      = today;                               		// 계약일자
			refundMap.inspd       = inspdVal;                      		 		// 보험기간  xx년
			refundMap.pmtpd       = insurPayPerVal;              		 		// 납입기간
			refundMap.susfPeri    = "000";                               		// 부양기간 0 set
			refundMap.pmtCyclCd   = pmtCyclCdArr;					 	 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
			refundMap.mnnpEntAge  = mnnpEntAge;									// 주피나이
			refundMap.scnpEntAge  = scnpEntAge;                             	// 종피나이
			refundMap.mnnpGndrCd  = data.spb_chldGndrCd;                		// 주피성별
			refundMap.scnpGndrCd  = data.spb_plnnrGndrCd;                   	// 종피성별
			refundMap.EntAmt      = EntAmtArr;  						 		// 보험가입금액(보종별가입금액)
			refundMap.pltcPrm     = pltcPrmArr;							 		// 목표월보험료(보종별보험료)
			refundMap.annOpnnAge  = annOpnnAge ;                         		// 연금개시나이(연금용)
			refundMap.goalPmtPeri = goalPmtPeri ;                        		// 목표납입기간(연금용)

			refundMap.inspdArr  = inspdArr;
			refundMap.pmtpdArr  = pmtpdArr;
		}
		//어린이플러스 태아일경우 특약 array
		else if(goodSmclCd == "42"){
			var special = data.spb_trtyTypeText;
			var arr  = {};

			arr = special.split("|");

			refundMap.pltcInf_cnt = arr.length;                            		// 보종별정보건수

			var intyCdArr   = "";
			var intyScCdArr = "";
			var EntAmtArr   = "";
			var pltcPrmArr  = "";
			var pmtCyclCdArr = "";
			var inspdArr    = "";
			var pmtpdArr    = "";

			for(var i=0; i<arr.length; i++){
				intyCdArr	+= arr[i].split(",")[0] + "/@";						// 보종코드
				intyScCdArr += arr[i].split(",")[1] + "/@";						// 보종구분코드
				EntAmtArr   += arr[i].split(",")[3] + "/@";						// 보종별가입금액
				pltcPrmArr  += arr[i].split(",")[4] + "/@";						// 보종별보험료

				//주특약은 보험기간을 넣고
				if(i == 0){
					inspdArr    += inspdVal + "/@";								// 보험기간
					pmtpdArr    += insurPayPerVal + "/@";						// 납입기간
					pmtCyclCdArr += data.spb_pmtCyclCd + '/@';
				}
				//주산기 특약은 1년을 넣는다.
				else if(arr[i].split(",")[0] == "3030002"
					|| arr[i].split(",")[0] == "3030003"){
					inspdArr += "1" + "/@";
					pmtpdArr += "0" + "/@";
					pmtCyclCdArr += "99" + "/@";
				}
			}

			refundMap.intyCd	  = intyCdArr;							 		// (장바구니 없음)보종코드
			refundMap.intyScCd	  = intyScCdArr;                 		 		// (장바구니 없음)보종구분코드
			refundMap.conYmd      = today;                               		// 계약일자
			refundMap.inspd       = inspdVal;                      		 		// 보험기간  xx년
			refundMap.pmtpd       = insurPayPerVal;              		 		// 납입기간
			refundMap.susfPeri    = "000";                               		// 부양기간 0 set
			refundMap.pmtCyclCd   = pmtCyclCdArr;					 	 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
			refundMap.mnnpEntAge  = mnnpEntAge;									// 주피나이
			refundMap.scnpEntAge  = '000'; 		                            	// 종피나이
			refundMap.mnnpGndrCd  = data.spb_chldGndrCd;                		// 주피성별
			refundMap.scnpGndrCd  = '0';			                    		// 종피성별
			refundMap.EntAmt      = EntAmtArr;  						 		// 보험가입금액(보종별가입금액)
			refundMap.pltcPrm     = pltcPrmArr;							 		// 목표월보험료(보종별보험료)
			refundMap.annOpnnAge  = annOpnnAge ;                         		// 연금개시나이(연금용)
			refundMap.goalPmtPeri = goalPmtPeri ;                        		// 목표납입기간(연금용)

			refundMap.inspdArr  = inspdArr;
			refundMap.pmtpdArr  = pmtpdArr;
		}
		// 정기, 연금, 연금저축, e저축
		else{

			refundMap.pltcInf_cnt = "1";                                 		// 보종별정보건수
			refundMap.intyCd	  = intyCd;								 		// (장바구니 없음)보종코드
			refundMap.intyScCd	  = intyScCd;                 			 		// (장바구니 없음)보종구분코드
			refundMap.conYmd      = today;                               		// 계약일자
			refundMap.inspd       = inspdVal;                      		 		// 보험기간  xx년
			refundMap.pmtpd       = insurPayPerVal;                      		// 납입기간
			refundMap.susfPeri    = "000";                               		// 부양기간 0 set
			refundMap.pmtCyclCd   = data.spb_pmtCyclCd;					 		// 납입주기코드-정기(01/12/99),종신(0/01/99),연금(01)
			refundMap.mnnpEntAge  = mnnpEntAge;							 		// 주피나이
			refundMap.scnpEntAge  = "000";                               		// 종피나이
			refundMap.mnnpGndrCd  = data.spb_plnnrGndrCd;                		// 주피성별
			refundMap.scnpGndrCd  = "0" ;                                		// 종피성별
			refundMap.EntAmt      = util.Number(data.spb_insEntAmt);  	 		// 보험가입금액(보종별가입금액)
			refundMap.pltcPrm     = data.spb_mmPrm;						 		// 목표월보험료(보종별보험료)
			refundMap.annOpnnAge  = annOpnnAge ;                         		// 연금개시나이(연금용)
			refundMap.goalPmtPeri = goalPmtPeri ;                        		// 목표납입기간(연금용)
			
			if( goodSmclCd == "11"){
				refundMap.isToss 	  = isToss;									// toss여부
			}
		}

		// 상품 소분류코드 추가
		refundMap.goodSmclCd = goodSmclCd;
		
		// 보기 납기 및 흡연여부 추가
		refundMap.inspdVal = data.spb_rinsPeri;
		refundMap.inspdScCd = data.spb_inspdTypeCd;
		refundMap.pmtpdVal = data.spb_rlpmPeri;
		refundMap.pmtpdScCd = data.spb_pmtpdTypeCd;

		return refundMap;
	};

	/**
		해지 환급금 팝업 열기
	*/
	_public.openPop = function (type, goodSmclCd) {

		var options = _private.options
		, data = _private.getRefundData (type, goodSmclCd)
		, url = _private.getUrl (goodSmclCd,data.goodCd);

		if (data.isToss){
			url = "/products/pg/PG00210P.dev"; // Toss 정기보험
		}
		
		fo.global.commonFn.callPopup(url, callBackFn, $.parse($.stringify(data)));

	};

	return _public;
}(this, jQuery));
