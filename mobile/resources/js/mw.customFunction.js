/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * DESCRIPTION : Custom Function 관련 함수 집합
 * ============================================================================*/
/**
 * Custom Function 관련 함수 집합
 * 
 * 각 업무 개발시 공통으로 필요한 부분은 아래 추가하여 사용하시면 됩니다.
 * 추후 공통에서 필수 여부 판단 후 core 혹은 util로 이동 될 수 있습니다.
 * 작성 방식은 아래 templeteFunction 을 따라서 작성 부탁 드립니다.
 * 
 * 반드시 필요한 공통 함수만 작성 부탁 드리며, 등록시 정확한 주석 작성 부탁 드립니다. 
 * 
 * 
 * @author    권대준, djkwon@kico.co.kr
 */
var CustomFunction = (function() {
    var _public = {};
    var _private = {};
    
    
    /**
     * Custom Function 템플릿 입니다.
     * 아래와 같이 _public, _private 접근하여 사용하며, 사용법은
     * CustomFunction.templeteFunction('useCF'); 와 같이 사용 하시면 됩니다. 
     * 
     * @param tempArgs
     * @returns {String}
     */
    _private.tempPrivateVal = 'temp';
    _public.templeteFunction = function (tempArgs) {
        
        var returnVal = '';
        returnVal = tempArgs + _private.tempPrivateVal;
        
        return returnVal;
    };

    /**
     * 상품이름을 퍼블리싱에 맞게 바꿔준다.
     */
    _public.changePublishProductName = function(orgStr) {

        var rtnStr = orgStr;
        //rtnStr = util.replaceAll(rtnStr, "(", "<span>(");
        //rtnStr = util.replaceAll(rtnStr, ")", "<span>)");
        //rtnStr = util.replaceAll(rtnStr, "e", "<strong class=\"e\">e</strong>");

        rtnStr = rtnStr.replace("e", "<strong class=\"e\">e</strong>");

        var rtnArr = [];

        var s1 = rtnStr.indexOf("(");     // 첫번째 괄호 시작
        var e1 = rtnStr.indexOf(")");     // 첫번째 관료 끝
        var s2 = rtnStr.lastIndexOf("("); // 마지막번째 괄호 시작
        var e2 = rtnStr.lastIndexOf(")"); // 마지막번째 괄호

        var overCheck = false;
        if(s1 != s2 && e1 != e2) overCheck = true;

        // console.log(overCheck);

        rtnArr.push(rtnStr.substring(0 ,s1));
        rtnArr.push("<span>(");
        rtnArr.push(rtnStr.substring(s1 + 1 ,e1));
        rtnArr.push(")</span>");
        if(overCheck) {
            rtnArr.push(rtnStr.substring(e1 + 1 ,s2));
            rtnArr.push("<span>(");
            rtnArr.push(rtnStr.substring(s2 + 1 ,e2));
            rtnArr.push(")</span>");
            rtnArr.push(rtnStr.substring(e2 + 1));
        }
        else {
            rtnArr.push(rtnStr.substring(e1 + 1));
        }

        return rtnArr.join("");
    };

    /**
     * 은행명, 계좌번호, 계약자명을 스트링으로 세팅한다.
     */
    _public.setBankInfo = function(obj) {
        var bankNm = obj.bankNm;// 은행명
        var mask_bankAcno = obj.mask_bankAcno;// 계좌번호
        var mask_acowNm = obj.mask_acowNm;// 계약자명
        
        var codeStartIndex     = bankNm.lastIndexOf("(");
        var codeEndIndex    = bankNm.lastIndexOf(")");
        if(codeStartIndex != -1 && codeEndIndex != -1){
            var codeStr = bankNm.substring(codeStartIndex + 1, codeEndIndex);
            if(!isNaN(codeStr)){
                bankNm = bankNm.substring(0,codeStartIndex);
            }
        }
        return bankNm + " " + mask_bankAcno + " | " + mask_acowNm;
    };

    /**
     * 계좌변경 팝업 호출
     */
    _public.openSelectAccnoPopup = function(objParam, callbackFunc, isRegAcno) {
        var option = {
            id : 'popupwrap',
            location : 'external',
            content : 'content1',
            url : '/mypage/mc/MWMC010P1.dev',
            param : objParam,
            pageParam : {
                'IsRegAcno'    : isRegAcno,   // 계좌 등록 화면 보임
                'CallBackFunc' : callbackFunc // 계좌선택시 callback
            }
        };
        PageUtil.openPopup(option);
    };

    /**
     * 화면 Top 에서 px 만큼 자동 스크롤
     */
    _public.scrollTop = function(scrollpx) {
        if(scrollpx == null) scrollpx = 0;
        $('html, body').animate({scrollTop:scrollpx}, 'slow');
    };

    /**
     * 화면 끝으로 자동스크롤
     */
    _public.scrollBottom = function() {
        // 렌더링된 html 높이에서 화면 높이를 빼준다.
        //var h = $('html').height() - $(window).height();
        var h = $(window).height();
        //var h = 2000;
        $('html, body').animate({scrollTop:h}, 'slow');
    };

    /**
     * RD 로 그린 PDF 파일을 다운로드 한다.
     */
    _public.fileDownloadForRD = function(objRDParamData) {
    	
    	// 공통 다운로드 cmd
    	var downloadCmd = '/mypage/mc/FileDownloadForRDCmd';

    	// 데이터로 넘긴 파라메터에 대한 처리
    	var paramHtml = [];
    	for(key in objRDParamData) {
    		paramHtml.push("<input name=\"" + key + "\" id=\"" + key + "\" type=\"hidden\" value=\"" + objRDParamData[key] + "\" />");
    	}

    	// form 데이터를 생성한다.
    	var formHtml = "";
    	
    	// IOS 의 경우 pdf 뷰가 사파리를 통해 가능 하기 때문에 별도의 새창을 연다.
    	var osName = MXP_PLUGIN.getOSInfo().name;
    	var iframe = '';
    	if(osName == "WEB_IOS") {
    		iframe	= '<div id="downloadForRDIFrameArea" style="display:none"><iframe id="downloadIFrameId" name="downloadIFrameIdExt" title="다운로드용 프레임"></iframe></div>';
    	}
    	else {
    		iframe	= '<div id="downloadForRDIFrameArea" style="display:none"><iframe id="downloadIFrameId" name="downloadIFrameId" title="다운로드용 프레임"></iframe></div>';
    	}

    	if($("#downloadForRDForm").length > 0){
    		// 화면에 다운로드 폼이 있을경우
    		downloadCmd += ".dev";
    		$("#downloadForRDForm").attr("action" ,downloadCmd); // cmd 를 재정의        		
    		$("#downloadForRDForm").html(paramHtml.join(''));     // 넘길 파라메터를 정의
    	}
    	else {
    		
    		if (osName != "APP_IOS") {
	    		// 화면에 다운로드 폼이 없을경우
	    		formHtml += "<form id=\"downloadForRDForm\" name=\"downloadForRDForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\" target=\"downloadIFrameId\">";
	    		formHtml += paramHtml.join('');
	    		formHtml += "</form>";
	
	    		$("body").append(iframe);	// 화면에 form 등 생성
	    		$("#downloadForRDIFrameArea").append(formHtml);	// 화면에 form 등 생성
    		} else {
    			formHtml += "<form id=\"downloadForRDForm\" name=\"downloadForRDForm\" method=\"POST\" action=\"" + downloadCmd + ".dev\">";
	    		formHtml += paramHtml.join('');
	    		formHtml += "</form>";
    		}
    	}

    	if (osName != "APP_IOS") {
        	
    		$("#downloadForRDForm").submit();	// submit
    	
    	} else {
    		
    		localStorage.setItem('downRdStrHtml', formHtml);
    		var param = {
				location : 'new',
				htmlTag : ''
    		};
    		PageUtil.openPopup(param);
    	
    	}
    };

    /**
     * result 내부의 OutData의 Error 상태를 체크 하여 오류 상태인 정상 상태인지 알려 준다.
     */
    _public.isTranSucc = function(resultOutData, isAlertErrorMsg) {

    	// 기본으로 오류 메시지 추출시 alert 메시지를 보여준다
    	if(isAlertErrorMsg == null) isAlertErrorMsg = true;
    	
    	// 에러를 잡아 화면에 표현한다.
    	if( resultOutData != null && resultOutData.ERROR_MSG != null) {

    		if(isAlertErrorMsg) {
	    		if (util.chkReturn(resultOutData.ERROR_MSG, "s") == "") {
	    			// 메시지가 세팅 되어 있지 않으면 기본
					alert("다시 시도해 주세요.");
				}
	    		else {
					// 메시지가 세팅 되어 있으면 세팅된 메시지 표현
					alert(objCutDataPopup.ERROR_MSG);
				}
    		}
    		return false;
    	}
    	
    	// 에러 메시지가 없을 경우 성공 상태
    	return true;
    };

    /**
     * 은행명에 '은행(코드)' 이렇게 내려오는 데이터에 대해 은행명으로 바꿔준다.
     */
    _public.changeBankName = function(bankName) {

    	var rtnBankNm = "";

    	//은행명 처리
		var bankNmArr = bankName.split("(");

		if(bankNmArr != undefined && bankNmArr.length > 0 && bankNmArr[1] != undefined) {
			
			var bankCode = bankNmArr[1];
			bankCode = bankCode.substring(0,bankCode.indexOf(")"));

			/**
			 * '은행' txt 삭제 (은행명 조회 방식 변경) js.kim 160122
			 */
			rtnBankNm = bankNmArr[0];
		}
		else {
			rtnBankNm = bankName;
		}			

		return rtnBankNm;
    };

    return _public;
    
})();

// Custom Function 을 util function 담는다. 마이페이지 에서 상품이름 변경으로 사용
util.changePublishProductName = CustomFunction.changePublishProductName;
util.setBankInfo              = CustomFunction.setBankInfo;
util.openSelectAccnoPopup     = CustomFunction.openSelectAccnoPopup;
util.scrollTop                = CustomFunction.scrollTop;
util.scrollBottom             = CustomFunction.scrollBottom;
util.fileDownloadForRD        = CustomFunction.fileDownloadForRD;
util.isTranSucc               = CustomFunction.isTranSucc;
util.changeBankName           = CustomFunction.changeBankName;
