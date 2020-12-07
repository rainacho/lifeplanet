/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.validate.js, /resources/js/
 * DESCRIPTION : validate 관련 함수 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2014-11-20		initial version
 * ========================================================================== */

/**
 * Validation 관련 함수 집합
 * jquery.validate.js 와 기존 AS-IS에서 사용하던 validate 함수를 복합하여
 * 개발자가 사용하기 편리하도록 재정의 함.
 * 추가적으로 필요한 method 역시 등록하기 편리하도록 구성
 *
 * @author	권대준, djkwon@kico.co.kr
 */
var validate = (function() {
    var _public = {};
    var _private = {};

    /**
     * jQuery Validate 를 이용한 validation 셋팅
     * @param formId, ruleObj
     */
    _public.excute = function(formId, ruleObj) {


    	/*********************************************************************
    	 * Check Option List
    	 *
    	 * required		: 필수 여부 체크
    	 * maxlength	: 최대 길이 체크
    	 * minlength	: 최소 길이 체크
    	 * rangelength	: 길이 범위 체크
    	 * max			: 최대값 체크
    	 * min			: 최소값 체크
    	 * range		: 범위 체크
    	 * equalTo		: 동일 값 체크
    	 * date			: 날짜 타입 체크
    	 * number		: 숫자 여부 체크
    	 * hangul		: 한글 여부 체크
    	 * english		: 영문 여부 체크
    	 * email		: 이메일 여부 체크
    	 * email1		: 이메일 앞자리 체크
    	 * email2		: 이메일 뒷자리 체크
    	 * ssn			: 주민등록번호 체크
    	 * hpno1		: 핸드폰번호 첫번째 자리 체크
    	 * hpno2		: 핸드폰번호 두번째 자리 체크
    	 * hpno3		: 핸드폰번호 세번째 자리 체크
    	 * url 			: url 타입 체크
    	 * pwd			: 패스워드 정합성 체크
    	 *
    	 * ********************************************************************
    	 *
    	 * ruleObj 예제
    	 * - ruleObj는 $.validate의 option 부분입니다.
    	 * - 예제는 하단의 첨부된 부분을 참고하기 바랍니다.
    	 *
	    	var ruleObj = {

	    		// rule 영역
				rules : {
					sim_no : { // 해당 폼에 등록된 input의 id
						required : true, // 필수여부
						maxlength : 10,  // maxlength 체크
						minlength : 0    // minlength 체크
					}
				}
			};
    	**********************************************************************/

    	// 인자값 입력 체크
    	if(util.isNull(ruleObj)) {
    		message.alert('COM009');
    		return;
    	}

    	return _private.jQueryValidate(formId, ruleObj);

    };

    _private.jQueryValidate = function(formId, ruleObj) {

    	var validateResult = true;	// 정합성 결과값
    	var validMsg = '';			// 정합성 결과 메세지

    	for ( var ruleId in ruleObj.rules) {

    		// 1. rules 목록을 전달 받아서 for 문을 돌면서 체크사항을 실행한다.
    		var singleRules = ruleObj.rules[ruleId];
    		for ( var key in singleRules) {
    			if(formId==""){//form을 감싸고 있지 않을때
					var $element = $(' #' + ruleId);
	    			var value 	= $(' #' + ruleId).val();
				}else{
					var $element = $('#' + formId + ' #' + ruleId);
	    			var value 	= $('#' + formId + ' #' + ruleId).val();
				}

    			var param 	= singleRules[key];

    			logger.log("[Validate Info] START	====== >");
    			logger.log(key);
    			logger.log($element);
    			logger.log(value + ' / ' + param);
    			logger.log("[Validate Info] END		====== >");

    			switch (key) {
					case 'required': // 필수 여부 체크

						validateResult = validate.isRequired(value, $element, param);
						validMsg = 'VLD001';
						break;

					case 'maxlength': // 최대 길이 체크

						validateResult = validate.isMaxlength(value, $element, param);
						validMsg = 'VLD002';
						break;

					case 'minlength': // 최소 길이 체크

						validateResult = validate.isMinlength(value, $element, param);
						validMsg = 'VLD003';
						break;

					case 'rangelength': // 길이 범위 체크

						validateResult = validate.isRangelength(value, $element, param);
						validMsg = 'VLD004';
						break;

					case 'max': // 최대값 체크

						validateResult = validate.isMax(value, $element, param);
						validMsg = 'VLD005';
						break;

					case 'min': // 최소값 체크

						validateResult = validate.isMin(value, $element, param);
						validMsg = 'VLD006';
						break;

					case 'range': // 범위 체크

						validateResult = validate.isRange(value, $element, param);
						validMsg = 'VLD007';
						break;

					case 'equalTo': // 동일 값 체크

						validateResult = validate.isEqualTo(value, $element, param);
						validMsg = 'VLD008';
						break;

					case 'date': // 날짜 타입 체크

						validateResult = validate.isDate(value, $element, param);
						validMsg = 'VLD009';
						break;

					case 'number': // 숫자 여부 체크

						validateResult = validate.isNumber(value, $element, param);
						validMsg = 'VLD010';
						break;

					case 'hangul': // 한글 여부 체크

						validateResult = validate.isHangul(value, $element, param);
						validMsg = 'VLD011';
						break;

					case 'english': // 영문 여부 체크

						validateResult = validate.isEnglish(value, $element, param);
						validMsg = 'VLD012';
						break;

					case 'email': // 이메일 여부 체크

						validateResult = validate.isEmail(value);
						validMsg = 'VLD013';
						break;

					case 'email1': // 이메일 앞자리 체크

						validateResult = validate.isEmail1(value, $element, param);
						validMsg = 'VLD014';
						break;

					case 'email2': // 이메일 앞자리 체크

						validateResult = validate.isEmail2(value, $element, param);
						validMsg = 'VLD015';
						break;

					case 'ssn': // 주민등록번호 체크

						validateResult = validate.isSsn(value, $element, param);
						validMsg = 'VLD016';
						break;

					case 'hpno1': // 핸드폰번호 첫번째 자리 체크

						validateResult = validate.isHpno1(value, $element, param);
						validMsg = 'VLD017';
						break;

					case 'hpno2': // 핸드폰번호 두번째 자리 체크

						validateResult = validate.isHpno2(value, $element, param);
						validMsg = 'VLD018';
						break;

					case 'hpno3': // 핸드폰번호 세번째 자리 체크

						validateResult = validate.isHpno3(value, $element, param);
						validMsg = 'VLD019';
						break;

					case 'hpno2and3': // 핸드폰번호 세번째 자리 체크

						validateResult = validate.isHpno2and3(value, $element, param);
						validMsg = 'VLD025';
						break;

					case 'url': // url 타입 체크

						validateResult = validate.isUrl(value, $element, param);
						validMsg = 'VLD020';
						break;

					case 'pwd': // 패스워드 정합성 체크

						validateResult = validate.isPwd(value, $element, param);
						validMsg = 'VLD021';
						break;

					default:
						break;
				}

				if ( ! validateResult) {

					try {

						// message옵션이 있을 때 해당 메시지 코드 입력
						if (ruleObj.message[ ruleId ][ key ]) {

							validMsg = ruleObj.message[ ruleId ][ key ].key;
							param = ruleObj.message[ ruleId ][ key ].param;
						}
					} catch (e) {

						// 기존 처리 유지
					}

					// 유효성 검사에 실패한 경우 값 반환
					var arrParam = $.makeArray(param);

					// 해당 오류 메세지 Alert
					message.alert(validMsg, arrParam);

					// Validate 체크한 Element로 Focus 이동
					$element.focus();

					return false;

				}
    		}
		}

    	return validateResult;

    };

    /**
     * 체크 여부
     * @param element
     * @returns
     */
    _public.checkable = function( element ) {
		return ( /radio|checkbox/i ).test( element.type );
	};

	/**
	 * 길이 체크
	 * @param value
	 * @param element
	 * @returns
	 */
	_public.getLength = function( value, element ) {

		if ( !(util.isNull(element.attr('type'))) ){

			//textarea 가 아닐때 (textarea는 attr('type')가 endefined 이기 때문이다)
			switch ( element.attr('type').toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return $(element).length;
				}
			}
			return value.length;
		} else {
			return value.length;
		}
	};

	/**
	 * 필수 여부 체크
	 * @param value
	 * @param element
	 * @param param
	 * @returns {Boolean}
	 */
    _public.isRequired = function(value, element, param) {

    	// check if dependency is met
    	if ( !(util.isNull(element.attr('type'))) ) {

    		if ( element.attr('type').toLowerCase() === "select" ) {
    			// could be an array for select-multiple or a string, both are fine this way
    			var val = $( element ).val();
    			return val && val.length > 0;
    		}
    	}
    	if ( validate.checkable( element ) ) {
    		return this.getLength( value, element ) > 0;
    	}

    	return $.trim( value ).length > 0;

    };

    /**
     * 최대 길이 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isMaxlength = function(value, element, param) {
    	var length = $.isArray( value ) ? value.length : this.getLength( value, element );
    	return length <= param;
    };

    /**
     * 최소 길이 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isMinlength = function(value, element, param) {
    	var length = $.isArray( value ) ? value.length : this.getLength( value, element );
    	return length >= param;
    };

    /**
     * 길이 범위 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isRangelength = function(value, element, param) {
    	var length = $.isArray( value ) ? value.length : this.getLength( value, element );
    	return ( length >= param[ 0 ] && length <= param[ 1 ] );
    };

    /**
     * 최대값 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isMax = function(value, element, param) {
    	return value <= param;
    };

    /**
     * 최소값 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isMin = function(value, element, param) {
    	return value >= param;
    };

    /**
     * 범위 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isRange = function(value, element, param) {
    	return ( value >= param[ 0 ] && value <= param[ 1 ] );
    };

    /**
     * 동일 값 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isEqualTo = function(value, element, param) {
    	var target = $( param );
    	return value === target.val();
    };

    /**
     * 날짜 타입 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isDate = function(value, element, param) {
    	return !/Invalid|NaN/.test( new Date( value ).toString() );
    };

    /**
     * 숫자 여부 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isNumber = function(value, element, param) {
    	return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
    };

    /**
     * 한글 여부 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isHangul = function(value, element, param) {
    	// 천지인 키패드로 인해 [ᆞ] 추가
    	return ! /[^ㄱ-ㅎㅏ-ㅣ가-힣ᆞ]/.test(value);
    };

    /**
     * 영문 여부 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isEnglish = function(value, element, param) {
    	return ! /[^a-zA-z\s]/.test(value);
    };

    /**
     * 이메일 여부 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isEmail = function(value, position) {
    	var regExp = new RegExp();
    	if(undefined == position)	regExp =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z_])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    	else if("1" == position)	regExp =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*$/;
    	else if("2" == position)	regExp =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    	if(!regExp.test(value)){
    		return false;
    	}
    	return true;

    };

    /**
     * 이메일 앞자리 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isEmail1 = function(value, element, param) {
    	// @ 제외
    	return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*$/.test(value);
    };

    /**
     * 이메일 뒷자리 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isEmail2 = function(value, element, param) {
    	return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value);
    };

    /**
	 * 주민등록번호의 유효성을 체크한다.
	 */
	_public.isSsn = function(juminno) {
		if (juminno == "" || juminno == null || juminno.length != 13) {
			return false;
		}

		var jumin1 = juminno.substr(0, 6);
		var jumin2 = juminno.substr(6, 7);
		var yy = jumin1.substr(0, 2); // 년도
		var mm = jumin1.substr(2, 2); // 월
		var dd = jumin1.substr(4, 2); // 일
		var genda = jumin2.substr(0, 1); // 성별
		var msg, ss, cc;
		// 숫자가 아닌 것을 입력한 경우
		if (!validate.isNumeric(jumin1)) {
			return false;
		}

		// 길이가 6이 아닌 경우
		if (jumin1.length != 6) {
			return false;
		}

		// 첫번째 자료에서 연월일(YYMMDD) 형식 중 기본 구성 검사
		if (yy < "00" || yy > "99" || mm < "01" || mm > "12" || dd < "01"
				|| dd > "31") {
			return false;
		}

		// 숫자가 아닌 것을 입력한 경우
		if (!validate.isNumeric(jumin2)) {
			return false;
		}
		// 길이가 7이 아닌 경우
		if (jumin2.length != 7) {
			return false;
		}

		// 성별부분이 1 ~ 4 가 아닌 경우
		if (genda < "1" || genda > "8") {
			return false;
		}

		// 연도 계산 - 1 또는 2: 1900년대, 3 또는 4: 2000년대
		cc = (genda == "1" || genda == "2" || genda == "5" || genda == "6") ? "19" : "20";
		// 첫번째 자료에서 연월일(YYMMDD) 형식 중 날짜 형식 검사
		if (validate.isValidDate(cc + yy + mm + dd) == false) {
			return false;
		}

		if(window.location.host.indexOf("m.lifeplanet.co.kr")>-1){
			// Check Digit 검사
			if (!validate.isSSNCore(jumin1, jumin2)) {
				return false;
			}
		}

		return true;
	};

	_public.isValidDate = function(iDate) {
		if (iDate.length != 8) {
			return false;
		}
		oDate = new Date(iDate.substring(0, 4), Number(iDate.substring(4, 6)) - 1, iDate.substring(6));
		if (oDate.getFullYear() != iDate.substring(0, 4)
				|| oDate.getMonth() + 1 != iDate.substring(4, 6)
				|| oDate.getDate() != iDate.substring(6)) {

			return false;
		}

		return true;
	};

	_public.isNumeric = function(s) {
		for (i = 0; i < s.length; i++) {
			c = s.substr(i, 1);
			if (c < "0" || c > "9")
				return false;
		}
		return true;
	};

	_public.isSSNCore = function(s1, s2) {
		return validate.fnRRNCheck(s1+""+s2);
	};

	_public.fnRRNCheck=function(rrn)

	{
	    if (validate.fnrrnCheck(rrn) || validate.fnfgnCheck(rrn)) {

	        return true;

	    }

	    return false;

	};

	_public.fnrrnCheck=function(rrn)  //주민등록번호유효성검사.

	{

	    var sum = 0;

	    if (rrn.length != 13) {

	        return false;

	    }

	    else if (rrn.substr(6, 1) != 1 && rrn.substr(6, 1) != 2 && rrn.substr(6, 1) != 3 && rrn.substr(6, 1) != 4) {

	        return false;

	    }

	    for (var i = 0; i < 12; i++) {

	        sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);

	    }

	    if (((11 - (sum % 11)) % 10) == Number(rrn.substr(12, 1))) {

	        return true;

	    }

	    return false;

	};

	_public.fnfgnCheck=function(rrn) // 외국인등록번호유효성검사.

	{

	    var sum = 0;

	    if (rrn.length != 13) {

	        return false;

	    }

	    else if (rrn.substr(6, 1) != 5 && rrn.substr(6, 1) != 6 && rrn.substr(6, 1) != 7 && rrn.substr(6, 1) != 8) {

	        return false;

	    }

	    if (Number(rrn.substr(7, 2)) % 2 != 0) {

	        return false;

	    }

	    for (var i = 0; i < 12; i++) {

	        sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);

	    }

	    if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(rrn.substr(12, 1))) {

	        return true;

	    }

	    return false;

	};

    /**
	 * 핸드폰번호 첫번째 자리 체크
	 *
	 * @param value
	 * @param element
	 * @param param
	 * @returns {Boolean}
	 */
    _public.isHpno1 = function(value, element, param) {
    	return /^\d{3,4}$/.test(value);
    };

    /**
	 * 핸드폰번호 두번째 자리 체크
	 *
	 * @param value
	 * @param element
	 * @param param
	 * @returns {Boolean}
	 */
    _public.isHpno2 = function(value, element, param) {
    	return /^\d{3,4}$/.test(value);
    };

    /**
	 * 핸드폰번호 세번째 자리 체크
	 *
	 * @param value
	 * @param element
	 * @param param
	 * @returns {Boolean}
	 */
    _public.isHpno3 = function(value, element, param) {
    	return /^\d{4}$/.test(value);
    };

    /**
     * 핸드폰번호 국번 이하 자리 체크(010-xxxxxxxx)
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isHpno2and3 = function(value, element, param) {
    	return /^\d{7,8}$/.test(value);
    };

    /**
     * url 타입 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isUrl = function(value, element, param) {
    	return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
    };

    /**
     * 패스워드 정합성 체크
     * @param value
     * @param element
     * @param param
     * @returns {Boolean}
     */
    _public.isPwd = function(value, element, param) {
    	//8~15자 사이 영문 대소문자로 구성 숫자 혹은 특수문자가 반드시 1개이상 포함되어 있는 정규식
    	return /^(?=.{6,20})(?=.*[a-zA-Z)(?=.*[!@#$%^*+=-]|.*[0-9]).*$/g.test(value);
    };


    /**
     * 금액만 입력되었는지 체크(소수점 미포함)
     *
     * @param str
     */
    _public.isAmt = function(str) {
    	if(/[^0-9,]/.test(str)){
    		return false;
    	}
    	return true;
    };


    return _public;

})();

/**
 * 은행 계좌번호 길이 체크
 */
function checkBankLen(facc, fa_code) {
	var accnoLen = util.trim(facc.val()).length;
	var bankData =
	{  //back_cd , bank_nm,
		'002':['산업', '11,14'],
		'003':['기업', '10,11,12,14'],
		'004':['국민', '11,12,14'],
		'005':['외환', '11,12'],
		'007':['수협중앙회', '11,12,14'],
		'011':['농협', '11,12,13,14'],
		'012':['농협회원조합', '13,14'],
		'020':['우리', '11,12,13,14'],
		'023':['한국스탠다드차타드', '11,14'],
		'027':['한국시티', '10,11,12,13'],
		'031':['대구', '11,12,14'],
		'032':['부산', '12,13'],
		'034':['광주', '12,13'],
		'035':['제주', '10'],
		'037':['전북', '12,13'],
		'039':['경남', '12,13'],
		'045':['새마을금고', '13,14'],
		'048':['신용협동조합', '10,11,12,13,14'],
		'050':['상호저축', '14'],
		'054':['HSBC', '12'],
		'055':['도이치은행', '10'],
		'057':['제이피모간체이스은행', '10'],
		'060':['BOA', '12,14'],
		'062':['중국공상은행', '14'],
		'064':['산림조합중앙회', '12,13'],
		'071':['지식경제부우체국', '14'],
		'081':['KEB하나', '11,12,14'],
		'088':['신한', '11,12,13,14'],
		'089':['K뱅크', '10,12,13,14'],
		'090':['카카오뱅크', '13'],
		'209':['유안타증권', '11,12'],
		'218':['KB증권', '9,11'],
		'230':['미래에셋증권', '8,9,10,11,12,13,14'],
		'238':['미래에셋대우', '8,9,10,11,12,13,14'],
		'240':['삼성증권', '8,10,12,14'],
		'243':['한국투자증권', '10,12,14'],
		'247':['NH투자증권', '11'],
		'261':['교보증권', '11,13'],
		'262':['하이투자증권', '10'],
		'263':['현대차투자증권', '8'],
		'264':['키움증권', '8,10'],
		'265':['이베스트증권', '9,11'],
		'266':['SK증권', '9,11'],
		'267':['대신증권', '9,11'],
		'269':['한화투자증권', '10,11,13,14'],
		'270':['하나금융투자', '8,10'],
		'278':['신한금융투자', '11'],
		'279':['동부증권', '9,11'],
		'280':['유진투자증권', '11'],
		'287':['메리츠종금증권', '10,11'],
		'290':['부국증권', '11'],
		'291':['신영증권', '9,12'],
		'292':['케이프투자증권', '11,14']
	};
	if(fa_code !=undefined){
	   var chkData = bankData[fa_code];
	   var bankNm = chkData[0];
	   var chkAcconoLen =  chkData[1].split(",");

	   var chkflag = false;

	   for(var i = 0 ; i < chkAcconoLen.length ; i++){
		   if ( accnoLen == chkAcconoLen[i]){
			   chkflag = true;
		   }
	   }

		if(chkflag==false){
		   //자리수 체계가 맞지 않은 경우
			 alert("[" + bankNm + "] 계좌 자리수는 " + chkData[1]+"입니다.\n다시 입력해 주세요." );
			 facc.focus();
			 facc.select();
			 return false;
		}

		if(fa_code == '261'){ 									//교보증권인 경우 체크로직추가
			var last_2_facc = (facc.val()).substr(accnoLen-2);	//계좌번호 마지막 두자리
			if (last_2_facc == '00'){
				alert("종합계좌번호가 아닌 개별계좌번호 13자리로 입력하셔야 합니다");
				facc.focus();
				facc.select();
				return false;
			}
		}
	}
	return true;
}

/**
 * 평생계좌체크
 * 예) account : 입력창에서 입력받은 은행계좌번호
 *     hpNo : 01012345678 (Data, 혹은 세션으로 물고다니는 고객의 휴대전화번호)
 */
function isLifeAccount ( account , hpNo) {
	if ( account == hpNo){
		alert("입력하신 계좌번호는 은행에서 출금이 불가능한 평생계좌번호입니다. \n휴대전화번호가 아닌 실제 계좌번호로 입력해주세요.");
		return false;
	}

	var hpNoYn = "휴대폰번호인 계좌번호(평생계좌)는 은행 정책상 자동이체가 불가하므로, 입력하신 계좌번호가 휴대폰번호라면 [원 계좌번호]로 입력하셔야 합니다.\n다만, 현재 입력된 계좌가 [원 계좌번호]가 맞다면 [취소]를 누르고 진행해 주시고, 휴대폰번호(평생계좌)이면 [확인]을 누른 후 수정해 주세요.";
	if(account != "" && account.length >= 3 && account.substring(0,3) == "010"){
		if(confirm(hpNoYn)){
			return false;
		}
	}

	return true;
}

/**
 * 은행점검시간체크
 * 당일 23:55분 ~ 다음날 00:30분까지 납입 및 대출 관련 페이지 호출시 경고창 출력
 * 현재 마이페이지 >  기본보험료즉시납입, 추가보험료즉시납입, 대출상환, 대출신청 메뉴에 적용
 */
function chkAccountTime () {
	var todayTime = util.getDateTime();
	var minTime = util.getDate() + "235500";
	var maxTime = util.getDate() + "235959";
	var _minTime = util.getDate() + "000000";
	var _maxTime = util.getDate() + "003059";
	var msg = "은행 내부시스템의 점검 및 중단으로 밤 12시 전후(약15분)로 \n입출금 처리가 원활치 않을 수 있습니다. 서비스 이용에 참고하세요.";

	if((todayTime >= minTime && todayTime <= maxTime)
		|| (todayTime >= _minTime && todayTime <= _maxTime)) {
		alert(msg);
	}

	return true;
}
