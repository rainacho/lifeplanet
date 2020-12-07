/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.customFunction.js, /resources/js/
 * DESCRIPTION : Custom Function 관련 함수 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준      2014-01-05        initial version
 * ========================================================================== */

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

    /*
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

        console.log(overCheck);

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

    /*
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

    /*
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

    /*
     * 화면 Top 에서 px 만큼 자동 스크롤
     */
    _public.scrollTop = function(scrollpx) {
        if(scrollpx == null) scrollpx = 0;
        $('html, body').animate({scrollTop:scrollpx}, 'slow');
    };

    /*
     * 화면 끝으로 자동스크롤
     */
    _public.scrollBottom = function() {
        // 렌더링된 html 높이에서 화면 높이를 빼준다.
        var h = $('html').height() - $(window).height();
        $('html, body').animate({scrollTop:h}, 'slow');
    };

    return _public;
    
})();

// Custom Function 을 util function 담는다. 마이페이지 에서 상품이름 변경으로 사용
util.changePublishProductName = CustomFunction.changePublishProductName;
util.setBankInfo              = CustomFunction.setBankInfo;
util.openSelectAccnoPopup     = CustomFunction.openSelectAccnoPopup;
util.scrollTop                = CustomFunction.scrollTop;
util.scrollBottom             = CustomFunction.scrollBottom;
