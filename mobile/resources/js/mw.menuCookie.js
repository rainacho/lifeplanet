/* ============================================================================
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * DESCRIPTION : 최근 본 메뉴
 * ========================================================================== */

var menuView = (function(){

	var _public   = {};
	var _private  = {};

	_private.cookieNm	= 'menuCookie';
	_private.cookieVal	= new Array();
	_private.cookieSize = 0;
	_private.menu		= '';
	_private.menuMapper = new Map();
	
	_private.getInfo = function() {

		var ckVal 		= util.getCookie(_private.cookieNm);

		if ( ckVal != '' ) {
			_private.cookieVal	= ckVal.split(',');
			_private.cookieSize = _private.cookieVal.length;
		}
	};

	_private.setMenu = function(items) {

		_private.cookieVal.push(items);

		util.setCookie(_private.cookieNm, _private.cookieVal, { expires: 7 } );

	};

	_private.reSetMenu = function(items){

		try {

			var dupIndex = $.inArray(items, _private.cookieVal);

			// 중복 제거
			if ( dupIndex > -1) {
				_private.cookieVal.splice(dupIndex, 1);
			} else {
				if ( _private.cookieVal.length == 3 ) {
					_private.cookieVal.splice(0,1);
				} else if ( _private.cookieVal.length > 3 ) {
					_private.cookieVal.splice(3,_private.cookieVal.length);
					_private.cookieVal.splice(0,1);
				}
			}
			_private.setMenu(items);

		} catch (e) {
			// TODO: handle exception
			_public.clearCk();
		}
	};

	_public.getMenu = function () {

		_private.getInfo();

		var reverseArr = [];

		if ( _private.cookieSize > 0 ) {
			reverseArr		= _private.cookieVal.reverse();
		}

		return reverseArr;
	};



	_public.init = function (url, text) {
		_private.getInfo();
		_private.menu = "#"+text+":"+url;
		// 최초진입
		if ( _private.cookieSize == 0 ) {
			_private.setMenu(_private.menu);
		// 재진입
		} else {
			_private.reSetMenu(_private.menu);
		}
		
	};


	_public.clearCk = function () {
		util.setCookie(_private.cookieNm, '');
	};

	return _public;

})();
