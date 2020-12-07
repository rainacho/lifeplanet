/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 *
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : js.kim 513220@lifeplanet.co.kr
 * FILE INFO   : mw.talk.js, /resources/js/
 * DESCRIPTION : 상담톡 관련 js
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * js.im  	2017-03-03		initial version
 * ========================================================================== */



var talkOn = (function(){

	var _public   = {};
	var _private  = {};
	var talkParam = {};

	_private.getRequest = function () {


		var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);
		tranProp.url        = '/common/cc/TalkLoginCheck';
		tranProp.asyncFlag  = false,
		tranProp.success    = _private.susscessCallBack;
		tranProp.failure    = _private.failureCallback;

		// 트랜잭션 실행
		transaction.callTran(tranProp);
	};

	_private.susscessCallBack = function (data) {
		var rsData = data.outData;
		talkParam.isLogin		 = util.nvl(rsData.isLogin,"");
		talkParam.customerName 	 = util.nvl(rsData.csNm,"");
		talkParam.customerNo	 = util.nvl(rsData.cstNo,"");
		talkParam.customerTel	 = util.nvl(rsData.cstHp,"");

	};


	_private.pageTitle = function () {

		var url		 = location.href;
		var urlPath  = location.href.split('/')[location.href.split('/').length-1].split('.')[0];
		var setTitle = '';

		// 설계페이지
		if ( url.indexOf('/products/pd/') > -1 || url.indexOf('/products/pe/') > -1  || url.indexOf('/bridge/bl/') > -1 ) {

			setTitle	= '상품설계_';

			if (urlPath == 'MWPD110S1') 		{ setTitle = '정기보험';
			} else if (urlPath == 'MWPD210S1')  { setTitle = '종신보험';
			} else if (urlPath == 'MWPD310S1')  { setTitle = '연금보험';
			} else if (urlPath == 'MWPD410S1')  { setTitle = '연금저축보험';
			} else if (urlPath == 'MWPD510S1')  { setTitle = '플러스어린이보험';
			} else if (urlPath == 'MWPD610S1')  { setTitle = '에듀케어저축보험';
			} else if (urlPath == 'MWPD710S1')  { setTitle = '저축보험';
			} else if (urlPath == 'MWPD810S1')  { setTitle = '암보험';
			} else if (urlPath == 'MWBL190S1')  { setTitle = '암보험';
			} else if (urlPath == 'MWPD910S1')  { setTitle = '5대성인병보험';
			} else if (urlPath == 'MWPE300S1')  { setTitle = '상해보험';
			} else if (urlPath == 'MWPE400S1')  { setTitle = '자녀사랑정기보험';
			} else if (urlPath == 'MWPE500S1')  { setTitle = '입원비보험';
			} else if (urlPath == 'MWPE600S1')  { setTitle = '수술비보험';
			} else if (urlPath == 'MWPE912S1')  { setTitle = '팻사랑m정기보험';
			} else if (urlPath == 'MWPE922S1')  { setTitle = '팻사랑m정기보험2종';
			}

		// 청약페이지
		} else if ( url.indexOf('/products/pa/') > -1 ) {

			var spb_data	= globalVar.getParam('spb_data') || '';
			var goodCd 		= spb_data.spb_goodCd || '';
			goodCd			= util.subStrL(goodCd, 5, '');

			setTitle		= '청약_';

			if ( goodCd == '10001' ) 		{ setTitle += '정기보험';
			} else if ( goodCd == '10002' ) { setTitle += '종신보험';
			} else if ( goodCd == '10003' ) { setTitle += '연금보험';
			} else if ( goodCd == '10004' ) { setTitle += '연금저축보험';
			} else if ( goodCd == '10007' ) { setTitle += '플러스어린이보험';
			} else if ( goodCd == '10008' ) { setTitle += '에듀케어저축보험';
			} else if ( goodCd == '10010' ) { setTitle += '저축보험';
			} else if ( goodCd == '10011' ) { setTitle += '암보험';
			} else if ( goodCd == '10012' ) { setTitle += '5대성인병보험';
			} else if ( goodCd == '10017' ) { setTitle += '상해보험';
			} else if ( goodCd == '10023' ) { setTitle += '자녀사랑정기보험';
			} else if ( goodCd == '10028' ) { setTitle += '입원비보험';
			} else if ( goodCd == '10029' ) { setTitle += '수술비보험';
			}

		} else {
			setTitle = $('title').text().replace(/\s/g, '');
		}

		return setTitle;

	};

	_private.getStrParam = function () {

		talkParam.pageName	 = _private.pageTitle(_private.getRequest());
		talkParam.chnId		 = _private.mobileCheck();

		var strReturn	 = '?';
		strReturn  		+= 'customerName='	+ util.nvl(encodeURIComponent(talkParam.customerName),"");
		strReturn  		+= '&customerNo='	+ util.nvl(talkParam.customerNo,"");
		strReturn  		+= '&customerTel='	+ util.nvl(talkParam.customerTel,"");
		strReturn  		+= '&pageName='		+ encodeURIComponent(talkParam.pageName);
		strReturn  		+= '&inChannelId='	+ talkParam.chnId;

		_private.resetOption();

		return strReturn;

	};


	_private.mobileCheck = function () {

		var mxpInfo = MXP_PLUGIN.getOSInfo().name || '';

		if ( mxpInfo.indexOf('PC') > -1 ) {
			return 'CHNL0000000001';
		} else {
			if ( mxpInfo.indexOf('WEB') > -1 ) {
				return 'CHNL0000000002';
			} else if ( mxpInfo.indexOf('APP') > -1 ) {
				return 'CHNL0000000003';
			}
		}
	};


	_private.resetOption = function () {
		talkParam  = {
				customerName	: '',
				customerNo		: '',
				customerTel		: '',
				pageName		: '',
				chnId			: ''
		};
	};

	_public.init = function () {
		return _private.getStrParam();
	};

	return _public;

})();

$(document).ready(function () {

	$('[data-dupid=talkOn]').off('click').on('click', function () {
		
		var urlPath = parent.location.href;
		
		if(urlPath.indexOf('/products/pg/') > -1){
			webLog.runGAQ('채팅상담', '버튼클릭', '바른보장TF-pg');
		}else if(urlPath.indexOf('/analysis/na/') > -1){
			webLog.runGAQ('채팅상담', '버튼클릭', '바른보장TF-na');
		}else{
			webLog.runGAQ('채팅상담', '버튼클릭', '00000');
		}
		
		var strParam = talkOn.init();
		var option = {
    			location : 'browserPopUp',
    			url : 'https://talk.lifeplanet.co.kr/sharedfront/jsp/view/kyobo/jsp/main.jsp'+strParam
    		};
		PageUtil.openPopup(option);
	});

});

