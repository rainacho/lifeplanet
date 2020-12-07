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
;(function (global, $) {

	var PricePoint = function () {

		var $this = $(this)
		, _defaultOption = {
			'pageType' : 'H',
			'uniqueKey' : '',
			'requestUrl' : {
				'H': '/products/pd/HPPD000S1.ajax',
				'M': '/products/pd/MWPD000S1.ajax'
			},
			'$el' : {},
			'resultData': {
				'disPrmInqrRslt' : [],
				'disPrmDtptInqrRslt' : []
			},
			'fnPrefix' : function () {},
			'fnSuffix' : function () {},
			// HTML 템플릿
			'templateMapper' : {
				'H' : {
					// 고객님이 받을 수 있는 모든 혜택을 확인하세요! 영역
					'wrapper'	: '<div class="middle_benefit discount">'
									+ '<div class="tit"><span class="blind">고객님이 받을 수 있는 모든 혜택을 확인하세요!</span></div>'
									+ '<div class="area_l">'
										+ '<p class="tit">할인 혜택</p>'
										+ '<p class="txt">눈이 번쩍 떠지는 할인 혜택을<br>꼭 확인하세요!</p>'
									+ '</div>'
									+ '<div class="area_r children">'		 
									+ '</div>'
									+ '<div class="cont date_total children2">'		
									+ '</div>'
								+ '</div>',
					// 업계평균 보험료 대비
					'01'		: '<div class="cont">'
									+ '<div class="tooltip_include">'
										+ '<span class="txt1">업계 평균 보험료 대비</span>'
										+ '&nbsp;<div class="box_tooltip">'
											+ '<a href="javascript:;" class="tooltip">업계 평균 보험료 대비 도움말</a>'
											+ '<div class="tooltip_cnt" style="left: 27.3906px;">'
												+ '<p>보험업감독규정 제7-45조 제7항의 <br>보험가격지수를 반영하여 계산(역산)한<br>업계 평균 수준의 보험료와 설계하신<br>보험상품의 보험료와의 차이 금액을<br>말합니다.</p>'
											+ '</div>'
										+ '</div>'
									+ '</div>'
									+ '<p class="txt2">[[납입주기]] <span>- [[할금]]</span> 원</p>'
								+ '</div>',
					// 비흡연 할인
					'02'		: '<div class="cont">'
									+ '<div class="tooltip_include">'
										+ '<span class="txt1">비흡연자 할인</span>'
										+ '&nbsp;<div class="box_tooltip">'
											+ '<a href="javascript:;" class="tooltip">비흡연자 할인 도움말</a>'
											+ '<div class="tooltip_cnt" style="left: 27.3906px;">'
												+ '<p>\'비흡연자 할인\'은 피보험자가 비흡연자<br>조건에 해당 할 경우의 보험료와 동일한<br>가입조건의 표준체(흡연) 보험료와의<br>차이 금액을 말합니다.</p>'
											+ '</div>'
										+ '</div>'
									+ '</div>'
									+ '<p class="txt2">[[납입주기]] <span>- [[할금]]</span> 원</p>'
								+ '</div>',
					// 건강체 할인
					'03'		: '<div class="cont">'
									+ '<div class="tooltip_include">'
										+ '<span class="txt1">건강체 할인</span>'
										+ '&nbsp;<div class="box_tooltip">'
											+ '<a href="javascript:;" class="tooltip">건강체 할인 도움말</a>'
												+ '<div class="tooltip_cnt w1">'
													+ '<p>다음 조건을 만족하는 경우 건강체로 보험료가<br /> 할인됩니다.<br />· 청약일 기준으로 적어도 최근 1년간 비흡연<br/>· BMI : 18.5kg/m² 이상 26.5kg/m² 미만<br/>· 혈압 : 140/90mmHg 미만<br/>※ 청약 완료 전에 건강검진결과지를 제출하시거나 당사 협력병원에서 진단을 받으셔야 합니다. 단, 보험가입금액 3억 초과 등의 경우에는<br/> 건강진단 서비스가 제공됩니다. <br/>※ 검진결과를 포함한 인수심사 과정을 거쳐 최종 인수 여부가 결정됩니다.</p>'
												+ '</div>'
										+ '</div>'
									+ '</div>'
									+ '<p class="txt2">[[납입주기]] <span>- [[할금]]</span> 원</p>'
								+ '</div>',								
					// 슈퍼건강체 할인
					'04'		: '<div class="cont">'
									+ '<div class="tooltip_include">'
										+ '<span class="txt1">슈퍼건강체 할인</span>'
										+ '&nbsp;<div class="box_tooltip">'
											+ '<a href="javascript:;" class="tooltip">슈퍼건강체 할인 도움말</a>'
											+ '<div class="tooltip_cnt w1">'
											+ '<p>'
												+ '다음 조건을 만족하는 경우 슈퍼건강체로 보험료가 할인됩니다.<br />'
												+ '· 평생 비흡연<br />'
												+ '· 혈압 : 120/80mmHg 미만<br/>'
												+ '· 총콜레스테롤 : 190mg/dl 미만<br/>'
												+ '· BMI : 20.0kg/m² 이상 25.0kg/m² 미만<br/>'
												+ '· 식전혈당 : 110mg/dl 미만<br/>'
												+ '· HDL콜레스테롤 : 남자 : 50mg/dl 이상  <br/> <span style="display:inline-block;margin-left:88px">여자 : 60㎎/㎗ 이상</span> <br/><!-- 160701 -->'
												+ '※ 청약 완료 전에 건강검진결과지를 제출하시거나 당사 협력병원에서 진단을 받으셔야 합니다.'
												+ ' 단, 보험가입금액 3억 초과 등의 경우에는<br/> 건강진단 서비스가 제공됩니다.<br/>'
												+ '※ 검진결과를 포함한 인수심사 과정을 거쳐 최종 인수 여부가 결정됩니다.'
											+ '</p>'
											+ '</div>'
										+ '</div>'
									+ '</div>'
									+ '<p class="txt2">[[납입주기]] <span>- [[할금]]</span> 원</p>'
								+ '</div>',
					// 선납할인보험료								 
					'05'		: '<div class="cont">'
									+ '<div class="tooltip_include">'
										+ '<span class="txt1">주계약 원 보험료 대비</span>'
										+ '&nbsp;<div class="box_tooltip">'
											+ '<a href="javascript:;" class="tooltip">주계약 원 보험료 대비 도움말</a>'
											+ '<div class="tooltip_cnt" style="width:270px">'
												+ '<p>· 피보험자 보험나이 0세 남자 기준 보험료에서<br />'
												+ '&nbsp;&nbsp;피보험자 보험나이 0세 남자 기준 보험료를<br />'
												+ '&nbsp;&nbsp;출생예정일로부터 보험료 납입시점까지의 기간동안<br />'
												+ '&nbsp;&nbsp;평균 공시이율로 할인한 금액의 차이를 말합니다.<br />'
												+ '· 주계약 예약가입 제1회 보험료 할인은 최초 1회에<br />'
												+ '&nbsp;&nbsp;한하여 적용됩니다.</p>'
											+ '</div>'
										+ '</div>'
									+ '</div>'
									+ '<p class="txt2">[[납입주기]] <span>- [[할금]]</span> 원</p>'
								+ '</div>',
					// 총할인
					'06'		: '<div class="total">'
									+ '<p class="tit">총 할인</p>'
									+ '<p class="txt">[[납입주기]] <span>-[[총할금]]</span> 원</p>'
								+ '</div>',
					// 납입기간 총할인
					'07'		: '<div class="tooltip_include">'
									+ '<span class="txt1">(납입기간 총 할인 금액</span>'
									+ '&nbsp;<div class="box_tooltip">'
										+ '<a href="javascript:;" class="tooltip">슈퍼건강체 할인 도움말</a>'
										+ '<div class="tooltip_cnt" style="left: 27.3906px;">'
											+ '<p>\'납입기간 총 할인 금액\'은 설계하신<br>보험상품의 보험료 납입기간 동안 할인<br>받으실 수 있는 보험료를 모두 합산한<br>금액을 말합니다.</p>'
										+ '</div>'
									+ '</div>'
									+ '<span class="txt1"><span>-[[납총할금]]</span> 원)</span>'
								+ '</div>',
					// + 문자
					'plus'		: '<div class="plus"><span class="blind">더하기</span></div>',
					// = 문자
					'equal'		: '<div class="result"><span class="blind">결과값</span></div>',
					// 데이터 영역
					'dataAreaClass' : ['.children', '.children2']
				},
				'M' : {
					// 고객님이 받을 수 있는 모든 혜택을 확인하세요! 영역
					'wrapper'	: '<div class="pr_benefit discount">'
									+ '<div class="children2"></div>'
									+ '<div id="plan_cont_list1[[UNIQUE_KEY]]" class="pr_plan_view children" style="">'
									+ '</div>'
								+ '</div>',
					// 업계평균 보험료 대비
					'01'		: '<div>'
									+ '<span class="tit">업계 평균 보험료 대비</span>'
									+ '<a href="javascript:;" class="help" data-target="help_cnt10[[UNIQUE_KEY]]"><span class="icon num4">닫힘상태</span></a>'
									+ '<span class="cont fr">[[납입주기]] -[[할금]]원</span>'
								+ '</div>'
								+ '<div id="help_cnt10[[UNIQUE_KEY]]" style="display:none">'
									+ '<div class="passport">'
									+ '<div class="passport_cont">'
									+ '<p class="txt">보험업감독규정 제7-45조 제7항의 보험가격지수를 반영하여 계산(역산)한 업계 평균 수준의 보험료와 설계하신 보험상품의 보험료와의 차이 금액을 말합니다.</p>'
									   + '<button type="button" class="close help_close"><span class="icon num2">닫기</span></button>'
									+ '</div>'
									+ '</div>'
								+ '</div>',
					// 비흡연 할인
					'02'		: '<div>'
									+ '<span class="tit">비흡연자 할인</span>'
									+ '<a href="javascript:;" class="help" data-target="help_cnt11[[UNIQUE_KEY]]"><span class="icon num4">닫힘상태</span></a>'
									+ '<span class="cont fr">[[납입주기]] -[[할금]]원</span>'
								+ '</div>'
								+ '<div id="help_cnt11[[UNIQUE_KEY]]" style="display:none">'
									+ '<div class="passport">'
									+ '<div class="passport_cont">'
										+ '<p class="tit">비흡연자 할인</p>'
									+ '<p class="txt">비흡연자 조건에 해당 할 경우의 보험료와 동일한 가입조건의 표준체(흡연) 보험료와의 차이 금액을 말합니다.</p>'
										+ '<button type="button" class="close help_close"><span class="icon num2">닫기</span></button>'
									+ '</div>'
									+ '</div>'
								+ '</div>',
					// 건강체 할인
					'03'		: '<div>'
									+ '<span class="tit">건강체 할인</span>'
									+ '<a href="javascript:;" class="help" data-target="help_cnt012[[UNIQUE_KEY]]"><span class="icon num4">닫힘상태</span></a>'
									+ '<span class="cont fr">[[납입주기]] -[[할금]]원</span>'
								+ '</div>'
								+ '<div id="help_cnt012[[UNIQUE_KEY]]" style="display:none">'
									+ '<div class="passport">'
										+ '<div class="passport_cont">'
											+ '<p class="tit">건강체 할인</p>'
											+ '<p class="txt">'
												+ '다음 조건을 만족하는 경우 건강체로 보험료가 할인됩니다.<br />' 
												+ '&middot; 최근 1년 이상 비흡연<br />'
												+ '&middot; BMI : 18.5kg/m<sup>2</sup> 이상 26.5kg/m<sup>2</sup> 미만<br />'
												+ '&middot; 혈압 : 140/90mmHg 미만<br />'
												+ '&#8251; 청약완료 전에 건강검진결과지를 제출하셔야 합니다. 단, 보험가입금액 3억 초과 등의 경우에는 건강진단 서비스가 제공됩니다. <br />' 
												+ '&#8251; 검진결과를 포함한 인수심사 과정을 거쳐 최종 인수 여부가 결정됩니다.'
											+ '</p>'
											+ '<button type="button" class="close help_close"><span class="icon num2">닫기</span></button>'
										+ '</div>'
									+ '</div>'
								+ '</div>',
					// 슈퍼건강체 할인
					'04'		: '<div>'
									+ '<span class="tit">슈퍼건강체 할인</span>'
									+ '<a href="javascript:;" class="help" data-target="help_cnt022[[UNIQUE_KEY]]"><span class="icon num4">닫힘상태</span></a>'
									+ '<span class="cont fr">[[납입주기]] -[[할금]]원</span>'
								+ '</div>'
								+ '<div id="help_cnt022[[UNIQUE_KEY]]" style="display:none">'
									+ '<div class="passport">'
										+ '<div class="passport_cont">'
											+ '<p class="tit">슈퍼건강체 할인</p>'
											+ '<p class="txt">'
												+ '다음 조건을 만족하는 경우 슈퍼건강체로 보험료가 할인됩니다.<br />' 
												+ '&middot; 평생 비흡연<br />'
												+ '&middot; 혈압 : 120/80mmHg 미만<br />'
												+ '&middot; 총콜레스테롤 : 190㎎/㎗ 미만<br />'
												+ '&middot; BMI : 20.0kg/m<sup>2</sup> 이상 25.0kg/m<sup>2</sup> 미만<br />'
												+ '&middot; 식전혈당 : 110mg/dl 미만<br />'
												+ '&middot; HDL콜레스테롤 : 남자 50㎎/㎗ 이상, 여자 60㎎/㎗ 이상<br />'
												+ '&#8251; 청약완료 전에 건강검진결과지를 제출하셔야 합니다. 단, 보험가입금액 3억 초과 등의 경우에는 건강진단 서비스가 제공됩니다. <br />'
												+ '&#8251; 검진결과를 포함한 인수심사 과정을 거쳐 최종 인수 여부가 결정됩니다.'
											+ '</p>'
											+ '<button type="button" class="close help_close"><span class="icon num2">닫기</span></button>'
										+ '</div>'
									+ '</div>'
								+ '</div>',
					// 선납할인보험료
					'05'		: '	<div class="cont cont1">'
									+ '<div class="fl">'
										+ '<p class="tit">할인 혜택</p>'
									+ '</div>'
									+ '<div class="fr price">'
										+ '[[납입주기]] <strong>-[[총할금]]</strong>원'
										+ '<button type="button" class="ui_target pr_plan_div active" data-target="plan_cont_list1[[UNIQUE_KEY]]" data-state="show" data-state-oclass="num23" data-state-cclass="num24" data-state-id=".icon"><span class="icon num24"></span></button>'
									+ '</div>'
								+ '</div>',
					// 총할인
					'06'		: '	<div class="cont cont1">'
									+ '<div class="fl">'
										+ '<p class="tit">할인 혜택</p>'
									+ '</div>'
									+ '<div class="fr price">'
										+ '[[납입주기]] <strong>-[[총할금]]</strong>원'
										+ '<button type="button" class="ui_target pr_plan_div active" data-target="plan_cont_list1[[UNIQUE_KEY]]" data-state="show" data-state-oclass="num23" data-state-cclass="num24" data-state-id=".icon"><span class="icon num24"></span></button>'
									+ '</div>'
								+ '</div>',
					// 납입기간 총할인
					'07'		: '	<div class="cont cont2">'
									+ '<div class="fl">'
										+ '<p class="tit">(납입기간 총 할인 <a href="javascript:;" class="help" data-target="question1[[UNIQUE_KEY]]"><span class="icon num4">닫힘상태</span></a></p>'
									+ '</div>'
									+ '<div class="fr">'
										+ '-[[납총할금]] 원)'
									+ '</div>'
								+ '</div>'
								+ '<div id="question1[[UNIQUE_KEY]]" style="display: none;margin-top:10px">'
									+ '<div class="passport">'
									+ '<div class="passport_cont">'
										+ '<p class="tit">납입기간 총 할인 금액</p>'
										+ '<div>'
										 + '<p class="txt">설계하신 보험상품의 보험료 납입기간 동안 할인 받으실 수 있는 보험료를 모두 합산한 금액을 말합니다.</p>'
										+ '</div>'
										+ '<button type="button" class="close help_close"><span class="icon num2">닫기</span></button>'
									+ '</div>'
									+ '</div>'
								+ '</div>',
					// + 문자
					'plus'		: '',
					// = 문자
					'equal'		: '',
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
		_private.init = function ($el, option) {
		
			// 옵션처리
			option.$el = $el;
			$this._currOption = $.extend (_defaultOption, option);
			$el.data ('pricePoint', $this);
			
			_private.eventBinder ();
		};
		
		/**
			이벤트바인딩
		*/
		_private.eventBinder = function () {

			var option = $this._currOption
			, _procMapper = {
				// 홈페이지
				'H' : function () {
				
				
				},
				// 모바일
				'M' : function () {
				
					// help 이벤트바인딩
					$('.help').off ('tap mousedown').on ('tap mousedown', function (e) {

						e.preventDefault ();
						var t = $(this)
						, id = t.attr('data-target')
						, target = $('#'+id);

						if(t.children('span').is('.num4')){

							t.children ('span').removeClass ('num4').addClass ('num1').text ('열림상태');
							target.show();
							target.find ('.help_close').off ('tap mousedown').one ('tap mousedown', function (e) {

								t.trigger ('tap');
							});
						}
						else if(t.children ('span').is ('.num1')){

							t.children ('span').removeClass ('num1').addClass ('num4').text ('닫힘상태');
							target.hide ();
						}
						else {//link 클릭

							target.show ();
							target.find ('.help_close').off ('tap mousedown').one ('tap mousedown', function (e) {

								target.hide ();
							});
						}
					});
				}
			};

			if (_procMapper.hasOwnProperty (option.pageType)) {

				_procMapper[ option.pageType ] ();
			}
			// 모바일 이벤트 바인딩

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
				'H' : function () {
					
					// 총할인
					arrTemplateChildrenTotal[ 0 ] = option.templateMapper[ option.pageType ][ '06' ]
														.replace (/\[\[총할금\]\]/gim, _private.setCommas (_private.number (disPrmInqrRslt[ 0 ].totDisAmt)));
					
					// children part1 생성
					arrTemplate[ 0 ] = arrTemplateChildren.join (option.templateMapper[ option.pageType ][ 'plus' ]);
					arrTemplate[ 1 ] = arrTemplateChildrenTotal[ 0 ];
					// '=' 생성
					$template = arrTemplate.join (option.templateMapper[ option.pageType ][ 'equal' ]);

					// 납입기간 총 할인금액
					arrTemplateChildrenTotal[ 0 ] = option.templateMapper[ option.pageType ][ '07' ]
														.replace (/\[\[납총할금\]\]/gim, _private.setCommas (_private.number (disPrmInqrRslt[ 0 ].pmtpdTotDisAmt)));
					
					// 납입타입에 따른 분기 
					arrTemplate = _private.setLabelNToggleArea ($template, arrTemplateChildrenTotal[ 0 ]);
					
					// 건강체, 슈퍼건강체 class 추가
					$wrapper = _private.setClass($wrapper);

					// wrpper에 children추가
					$wrapper.find (option.templateMapper[ option.pageType ][ 'dataAreaClass' ][ 0 ]).append (arrTemplate[ 0 ]);
					
					// wrpper에 children추가 (납입기간 총 할인금액)
					$wrapper.find (option.templateMapper[ option.pageType ][ 'dataAreaClass' ][ 1 ]).append (arrTemplate[ 1 ]);

					// 영역에 추가
					option.$el.empty ().append ($wrapper);
				},
				'M' : function () {
										
					// 총 할인금액
					arrTemplateChildrenTotal[ 0 ] = option.templateMapper[ option.pageType ][ '06' ]
														.replace (/\[\[총할금\]\]/gim, _private.setCommas (_private.number (disPrmInqrRslt[ 0 ].totDisAmt)));
					// 납입기간 총 할인금액
					arrTemplateChildrenTotal[ 1 ] = option.templateMapper[ option.pageType ][ '07' ]
														.replace (/\[\[납총할금\]\]/gim, _private.setCommas (_private.number (disPrmInqrRslt[ 0 ].pmtpdTotDisAmt)));

					arrTemplate[ 0 ] = arrTemplateChildren.join (option.templateMapper[ option.pageType ][ 'plus' ]);
					$template = arrTemplate.join (option.templateMapper[ option.pageType ][ 'equal' ])
									.replace (/\[\[UNIQUE_KEY\]\]/gim, option.uniqueKey);

					// 납입타입에 따른 분기 
					arrTemplate = _private.setLabelNToggleArea ($template, arrTemplateChildrenTotal);
					
					// wrpper에 children추가
					$wrapper.find (option.templateMapper[ option.pageType ][ 'dataAreaClass' ][ 0 ]).append (arrTemplate[ 0 ]);

					// wrpper에 children추가 (납입기간 총 할인금액)
					arrTemplate[ 1 ] = arrTemplate[ 1 ]
											.replace (/\[\[UNIQUE_KEY\]\]/gim, option.uniqueKey);
					$wrapper.find (option.templateMapper[ option.pageType ][ 'dataAreaClass' ][ 1 ]).append (arrTemplate[ 1 ]);
					
					// 영역에 추가
					option.$el.empty ().append ($wrapper);
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

			option.$el.empty ();
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
					'pltcPpymDisAmt'	: $('#spb_ppymDisAmt').val (),
					'prmTablUseYn'	 	: 'Y',
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
				 (resultParam.insSbsnGoodSmclCd == '45' && resultParam.goodCd.indexOf('10052') > -1 ) ){

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
		 * 상품,보종코드에 따른 class 변경 
		 * 정기(건강체,슈퍼건강체 [wrapper] class 추가 
		 * */
		_private.setClass = function (template1) {
			
			var option = $this._currOption
			, _requestParam = _private.getRequestParam ()
			, _procMapper = {
				// 정기보험, 자녀사랑정기보험
				'11' : function () {
					// 건강체
					if ( _requestParam.goodCd == '1000123' ||
						 _requestParam.goodCd == '1000125' ||
						 _requestParam.goodCd == '1000127' ||
						 _requestParam.goodCd == '1002303' ||
						 _requestParam.goodCd == '1002307' ) {
						
						template1.find('div.tit').addClass('type2');
					// 슈퍼건강체	
					} else if ( _requestParam.goodCd == '1000124' ||
							 	_requestParam.goodCd == '1000126' ||
							 	_requestParam.goodCd == '1000128' ||
								_requestParam.goodCd == '1002304' ||
								_requestParam.goodCd == '1002308'    ) {
						template1.find('div.tit').addClass('type3');
					}
					return template1;
				}
			},
			arrResult = template1;
			
			if (_procMapper.hasOwnProperty (_requestParam.insSbsnGoodSmclCd)) {
				
				arrResult = _procMapper[ _requestParam.insSbsnGoodSmclCd ] ();
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
					_private.eventBinder ();
				})
				// 실패
				.fail (function (msg) {
					
					msg = msg || '잠시후에 다시 시도해주세요.'; 
					alert (msg);
				})
				.always (function (data) {
					
					// 후처리
					option.fnPrefix (data);
				});
		};
		/**
			공개함수 끝
		*/

		// 공개함수 처리
		$.extend (this, _public);
	};
	
	
	// jQeury 형태로 사용
	$.fn.pricePoint = function (data) {
		
		data = data || {};
			
		var $this = $(this);

		return $.each ($this, function () {
		
			var _$this = $(this);
						
			new PricePoint ().init (_$this, data);
			return _$this;
		});
	};
}(this, jQuery));