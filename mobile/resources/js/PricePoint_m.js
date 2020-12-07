/**
	보험가격지수 관련 스크립트

	사용방법 : 

	$('대상영역').pricePoint (DATA)
	DATA는 OBJECT형태로 구성

	ex )

	$('#targetArea').pricePoint ({
		'pageType' : 'H',
		'uniqueKey' : '_HI',
		'resultData' : {
			'disPrmInqrRslt' : [{disPrmCaloTrgtYn: 'Y', totDisAmt : '100000', pmtpdTotDisAmt : '1000000'}],
			'disPrmDtptInqrRslt' : [{disAmtScCd : '01', disAmtScCdNm : '업계대비할인금액'	, disAmt : '5000'}, {disAmtScCd : '02', disAmtScCdNm : '비흡연할인금액'	, disAmt : '2000'}]
		}
	});
*/

var PricePoint = (function () {

	var $this = $(this)
	, _defaultOption = {
		'pageType' : 'M',
		'uniqueKey' : '',
		'requestUrl' : {
			'M': '/products/pd/MWPD000S1.ajax'
		},
		'resultData': {
			'disPrmInqrRslt' : [],
			'disPrmDtptInqrRslt' : []
		},
		'fnPrefix' : function () {
			$('#totPmtpdDiscount').empty();
			$('#goodsDiscount').empty();
			$('div.row.result').hide();
		},
		'fnSuffix' : function () {},
		// HTML 템플릿
		'templateMapper' : {
			'M' : {
				// 고객님이 받을 수 있는 모든 혜택을 확인하세요! 영역
				//<span class="discount">비흡연 혜택으로 <em>-500원</em> 할인</span>
				'wrapper'	: '',
				'01'		: '<div class="detail_tit_box">'
		                	+'<p class="tit">업계 평균보험료 대비</p>'
		                	+'<div class="desc"><span class="discount">'
		                	+'[[납입주기]] [[할금]]</span>원 할인</div>'
		                	+'</div>',
							
				// 비흡연 할인
				'02'		: '<div class="detail_tit_box">'
                            	+'<p class="tit">비흡연 혜택으로</p>'
                            	+'<div class="desc"><span class="discount">'
                            	+'[[납입주기]] [[할금]]</span>원 할인</div>'
                            	+'</div>',
				// 건강체 할인
				'03'		: '<div class="detail_tit_box">'
				               +'<p class="tit">건강체 혜택으로</p>'
				               +'<div class="desc"><span class="discount">'
				               +'[[납입주기]] [[할금]]</span>원 할인</div>'
				               +'</div>',
				// 슈퍼건강체 할인
				'04'		: '<div class="detail_tit_box">'
				               +'<p class="tit">슈퍼건강체 혜택으로</p>'
				               +'<div class="desc"><span class="discount">'
				               +'[[납입주기]] [[할금]]</span>원 할인</div>'
				               +'</div>',
	            // 주계약 원보험료 대비
				'05'		: '<div class="detail_tit_box">'
				               +'<p class="tit">주계약 원보험료 대비</p>'
				               +'<div class="desc"><span class="discount">'
				               +'[[할금]]</span>원 할인</div>'
				               +'</div>',
				// 보험료영역 총할인
				'06'		: '<span class="discount">'
								+ '총 '
								+ '<em>[[총할금]]원 </em>할인'
							+ '</span>',
				// 보험료설계결과영역 총 할인
				'07'		:'<div class="detail_tit_box">'
							+'<div class="desc ttl">총 '
							+'<span class="discount">[[총할금]] 원</span> 할인</div>'
							+'</div>',							
				// 데이터 영역
				'dataAreaClass' : ['.children', '.children2']
			}
		}
		
	}
	, _currOption = {}
	, _private = {}
	, _public = {};
	

	// 상품별 데이터 처리 (적용대상 상품에 대해서 동일)
	// 템플릿(ELEMENT) 생성

	/**
		비공개함수 시작
	*/

	/**
		초기화
	*/
	_private.init = function () {
	
		// 옵션처리
		$this._currOption = $.extend (_defaultOption);
		
	};
	
	/**
		각 타입별 템플릿으로 ELEMENT생성
	*/
	_private.makeTemplateToElements = function () {
		
		var option = $this._currOption
		, _procMapper = {
			'common' : function () {

				// wrapper 생성 & 치환
				$wrapper = option.templateMapper[ option.pageType ][ 'wrapper' ]
								.replace (/\[\[UNIQUE_KEY\]\]/gim, option.uniqueKey);
				
				$wrapper = $($wrapper);
				
				// children 생성
				for (i = 0, length = disPrmDtptInqrRslt.length; i < length; i += 1) {

					key = disPrmDtptInqrRslt[ i ].disAmtScCd;

					arrTemplateChildren[ i ] = option.templateMapper[ option.pageType ][ key ]
													// 할인금액구분 코드
													.replace (/\[\[할금코\]\]/gim, _private.setCommas (_private.number (disPrmDtptInqrRslt[ i ].disAmtScCd)))
													// 할인금액구분 코드명
													.replace (/\[\[할금코명\]\]/gim, _private.setCommas (_private.number (disPrmDtptInqrRslt[ i ].disAmtScCdNm)))
													// 할인금액
													.replace (/\[\[할금\]\]/gim, _private.setCommas (_private.number (disPrmDtptInqrRslt[ i ].disAmt)));
				}
			},
			'M' : function () {
				// 보험료영역 총 할인금액
				arrTemplateChildrenTotal[ 0 ] =  option.templateMapper[ option.pageType ][ '06' ]
													.replace (/\[\[총할금\]\]/gim, _private.setCommas (_private.number (disPrmInqrRslt[ 0 ].totDisAmt)));
				// 보험료설계결과영역 총 할인금액
				arrTemplateChildren[arrTemplateChildren.length] = option.templateMapper[ option.pageType ][ '07' ]
													.replace (/\[\[총할금\]\]/gim, _private.setCommas (_private.number (disPrmInqrRslt[ 0 ].pmtpdTotDisAmt)));					
				arrTemplate[ 0 ] = arrTemplateChildren;
				$template = arrTemplate.join ('<div></div>').replace (/\[\[UNIQUE_KEY\]\]/gim, option.uniqueKey);
				
				// 납입타입에 따른 분기 
				arrTemplate = _private.setLabelNToggleArea ($template, arrTemplateChildrenTotal);

				// wrpper에 children추가 (납입기간 총 할인금액)
				arrTemplate[ 1 ] = arrTemplate[ 1 ].replace (/\[\[UNIQUE_KEY\]\]/gim, option.uniqueKey);
				
				$('#totPmtpdDiscount').empty().append(arrTemplate[1]);
				$('#pmtpdDiscount').empty().append(''+_private.setCommas (_private.number (disPrmInqrRslt[ 0 ].totDisAmt)));
				
				$('#goodsDiscount').empty().append(arrTemplate[0].replace('>,<','><').replace('</div>,<div','</div><div'));
				$('div.row.result').show();
				
			}
		}
		, disPrmInqrRslt = {}
		, disPrmDtptInqrRslt = {}
		, $template = ''
		, arrTemplateChildren = []
		, arrTemplateChildrenTotal = []
		, arrTemplate = []
		, $wrapper = ''
		, key = ''
		, i, length;


		disPrmInqrRslt = option.resultData.disPrmInqrRslt || [];
		disPrmDtptInqrRslt = option.resultData.disPrmDtptInqrRslt || [];

		// 할인보험료 산출 대상일 때만 표시
		if (!disPrmInqrRslt.length || 'Y' !== disPrmInqrRslt[ 0 ].disPrmCaloTrgtYn) {

			// 표시대상이 아닐때 영역 감춤
			_private.reset ();
			return false;
		}

		if (_procMapper.hasOwnProperty (option.pageType)) {

			_procMapper[ 'common' ] ();
			_procMapper[ option.pageType ] ();
		}
	};

	/**
		영역 초기화
	*/
	_private.reset = function () {
	
		var option = $this._currOption;

	};

	/*
		천단위 구분기호 설정
	*/
	_private.setCommas = function (value) {

		value += '';
		value = value || '';
	
		var re = /(-?\d+)(\d{3})/;

		while (re.test (value)) {

			value = value.replace(re, "$1,$2");
		}
		return value;
	};
	
	_private.number = function (num) {
		var returnNum = 0;
		
		if (!isNaN (num)) {
			
			returnNum = Number (num);
		}
		return returnNum;
	};
	
	/**
	 * 데이터 교체
	 * */
	_private.swap = function (data, arrKey) {
		
		var temp1, temp2;
		
		temp1 = data[ arrKey[ 0 ] ];
		temp2 = data[ arrKey[ 1 ] ];
		
		data[ arrKey[ 1 ] ] = temp1;
		data[ arrKey[ 0 ] ] = temp2;
	};
	/**
	 * 납입, 보험기간 타입에 따라 실보험기간, 실납입기간을 구한다.
	 * 보헙기간이 세일 때		보헙기간 - 보험나이	
	 * 납입기간이 세납일 때		납입기간 - 보험나이
	 * */
	_private.getRealYearRange = function (key, resultParam) {
		
		var _procMapper = {
			'inspd': function (resultParam) {
				
				// 보험나이
				var insAge = resultParam.mnnpEntAge
				// 보험기간유형코드
				, inspdTypeCd = $('#spb_inspdTypeCd').val () 
				// 보험기간
				, rinsPeri = $('#spb_rinsPeri').val ()
				, inspd = 0;
				
				/**
				 * inspd는 실보험기간이 입력되어야한다.
				 * 보험기간 유형코드에 따라 분기처리 (01: 연납, 02: 세납)
				 * 연납(01) : 보험기간
				 * 세납(02) : 보험기간 - 보험나이
				 * */
				// 연납
				if ('01' === inspdTypeCd) {
					
					inspd = rinsPeri; 
				}
				// 세납
				else if ('02' === inspdTypeCd) {
					
					inspd = rinsPeri - insAge;
				}
				return inspd;
			},
			'pmtpd': function (resultParam) {
				
				// 보험나이
				var insAge =  resultParam.mnnpEntAge
				// 납입기간유형코드
				, pmtpdTypeCd = $('#spb_pmtpdTypeCd').val () 
				// 보험기간
				, rlpmPeri = $('#spb_rlpmPeri').val ()
				, pmtpd = 0;
				
				// 연납
				if ('01' === pmtpdTypeCd) {
					
					pmtpd = rlpmPeri; 
				}
				// 세납
				else if ('02' === pmtpdTypeCd) {
					
					pmtpd = rlpmPeri - insAge;
				}
				return pmtpd;
			}
		}
		, result = 0;
		
		if (_procMapper.hasOwnProperty (key)) {
			
			result = _procMapper[ key ] (resultParam);
		}
		return result;
	};
	/**
	 * 요청 파라메터 설정
	 * */
	_private.getRequestParam = function () {
		var option = $this._currOption
		, resultParam = {
				'goodCd' 			: $('#spb_goodCd').val (),
				'insSbsnGoodSmclCd' : $('#spb_insSbsnGoodSmclCd').val (),
				'annOpnnAge' 		: $('#spb_annOpnnAge').val (),
				'intyCd'			: $('#spb_intyCd').val (),
				'intyScCd'			: $('#spb_intyScCd').val (),			// biz에서 fix
				'conYmd'			: util.getDate (),
				'inspd' 			: $('#spb_rinsPeri').val (),
				'pmtpd'				: $('#spb_rlpmPeri').val (),
				'susfPeri' 			: '000',
				'pmtCyclCd' 		: $('#spb_pmtCyclCd').val (),
				
				'mnnpEntAge' 		: $('#spb_plnnrInsAge').val (),
				'scnpEntAge' 		: $('#spb_chldInsAge').val (),
				'mnnpGndrCd' 		: $('#spb_plnnrGndrCd').val (),
				'scnpGndrCd' 		: $('#spb_chldGndrCd').val(),
				
				'epreYcn' 			: '0',
				'pltcEntAmt' 		: $('#spb_insEntAmt').val (),
				'pltcPrm' 			: $('#spb_mmPrm').val (),
				'prmTablUseYn'	 	: 'Y',
				'pltcPpymDisAmt'	: $('#spb_ppymDisAmt').val (),
				'tradeKey'			: 'retrieve'
		}
		, fetaYn = $('#spb_fetaYn').val ();
		
		// 어린이플러스
		if (resultParam.insSbsnGoodSmclCd == '42') {
			
			// 주,종피보험자 나이 교체
			_private.swap (resultParam, ['mnnpEntAge', 'scnpEntAge']);
			// 주, 종피보험자 성별 교$체
			_private.swap (resultParam, ['mnnpGndrCd', 'scnpGndrCd']);
			// 어린이는 PV테이블 사용하지 않음
			resultParam.prmTablUseYn = 'N';
			
			// 태아일 때 (주계약보험료만 입력)
			if (fetaYn == 'Y') {

				// 주계약 보험료
				resultParam.pltcPrm = $('#spb_trtyTypeText').val ().split (',')[ 4 ];
			}
		}
		
		// 실납입기간
		resultParam.pmtpd = _private.getRealYearRange ('pmtpd', resultParam);
		
		// 보험기간에 '세' 타입이 있는 경우
		if ( resultParam.insSbsnGoodSmclCd == '42' || resultParam.insSbsnGoodSmclCd == '11' || 
			 resultParam.insSbsnGoodSmclCd == '43' || resultParam.insSbsnGoodSmclCd == '44' ||
			 resultParam.insSbsnGoodSmclCd == '61' || resultParam.insSbsnGoodSmclCd == '71' ||
			 resultParam.insSbsnGoodSmclCd == '81' || (resultParam.insSbsnGoodSmclCd == '45' && resultParam.goodCd.indexOf('10041') > -1 ) ||
			 (resultParam.insSbsnGoodSmclCd == '45' && resultParam.goodCd.indexOf('10049') > -1 ) ||
			 (resultParam.insSbsnGoodSmclCd == '45' && resultParam.goodCd.indexOf('10052') > -1 )){

			// 실보험기간 계산
			resultParam.inspd = _private.getRealYearRange ('inspd', resultParam);
		}
		
		return resultParam;
	};
	
	/**
	 * AJAX요청
	 * */
	_private.getRequest = function () {
		
		var option = $this._currOption
		, _requestParam = _private.getRequestParam ();
		
		return $.ajax({
			type        : 'post'
	       ,url         : option.requestUrl[ option.pageType ]
	       ,dataType    : 'json'
	       ,data        : _requestParam
		});
	};
	
	/**
	 * 납입기간에 따른 레이블 변경 및 영역 토글
	 * 
	 * 월 : 기존과 같음              
	 * 년 : 월 > 년               
	 * 일시납 총할인금액 제거, '월' 레이블 제거
	 * */
	_private.setLabelNToggleArea = function (template1, template2) {
		
		var option = $this._currOption
		, _requestParam = _private.getRequestParam ()
		, _procMapper = {
			'01' : function () {	// 월납
				
				if ($.isArray (template2)) {
					
					template2 = template2.join ('');
				}
				
				return [
				        template1.replace (/\[\[납입주기\]\]/gim, '월'), template2.replace (/\[\[납입주기\]\]/gim, '월')
		        ];
			},
			'12' : function () {	// 연납
				
				if ($.isArray (template2)) {
					
					template2 = template2.join ('');
				}
				
				return [
				        template1.replace (/\[\[납입주기\]\]/gim, '연'), template2.replace (/\[\[납입주기\]\]/gim, '연')
				];
			},	
			'99' : function () {	// 일시납
				
				var _template = '';
				
				if ($.isArray (template2)) {
					
					_template = (template2[ 0 ]);
				}
				
				return [
					template1.replace (/\[\[납입주기\]\]/gim, ''), _template.replace (/\[\[납입주기\]\]/gim, '')
				];
			}
		},
		arrResult = ['', ''];
		
		if (_procMapper.hasOwnProperty (_requestParam.pmtCyclCd)) {
			
			arrResult = _procMapper[ _requestParam.pmtCyclCd ] ();
		}
		return arrResult;
	};
	
	
	/**
		비공개함수 끝
	*/


	/**
		공개함수 시작
	*/

	_public.init = function () {
		
		var option;
		
		_private.init.apply ($this, arguments);
		
		option = $this._currOption;
		
		// 전처리
		option.fnPrefix ();
		
		// 데이터 조회
		_private.getRequest ()
			// 오류처리를 위함
			.pipe (function (data) {
				
				var retrieveEPA013A01 = data.result.outData.retrieveEPA013A01
				, $def = $.Deferred ()
				, ERROR_CODE = retrieveEPA013A01.ERROR_CODE;
				
				if (ERROR_CODE) {
					
					return $def.reject (retrieveEPA013A01.ERROR_MSG);
				}
				
				return $def.resolve (data);
			})
			// 성공
			.done (function (data) {
				
				var retrieveEPA013A01 = data.result.outData.retrieveEPA013A01;
				
				option.resultData.disPrmInqrRslt 	 = retrieveEPA013A01.disPrmInqrRslt || [];
				option.resultData.disPrmDtptInqrRslt = retrieveEPA013A01.disPrmDtptInqrRslt || [];
				
				_private.makeTemplateToElements ();
			})
			// 실패
			.fail (function (msg) {
				
				msg = msg || '잠시후에 다시 시도해주세요.'; 
				alert (msg);
			})
			.always (function (data) {
				
				// 후처리
				option.fnSuffix (data);
			});
	};
	/**
		공개함수 끝
	*/

	return _public;
})();

