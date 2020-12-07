/**
* wrapping된 checkbox, radio를 재설정하기 위한 플러그인
* $.reFake.init ({
			'radio': {
				'wrapper': 'span'
				, 'wrapperClass': 'rdo_m'
				, 'checkedClass': '1'
				, 'unCheckedClass': '2'
				, 'enabledClass': '3'
				, 'disabledClass': '4'
			}
			, 'checkbox': {
				'wrapper': 'span'
				, 'wrapperClass': 'chk_m'
				, 'checkedClass': '5'
				, 'unCheckedClass': '6'
				, 'enabledClass': '7'
				, 'disabledClass': '8'
			}
		})
* $.reFake.reset (':checkbox, :radio')
*/

;(function ($, global) {
	'use strict';

	$.reFake = (function () {
		// 옵션
		var _options = {
			'radio': {
				'wrapper': 'span'
				, 'wrapperClass': 'rdo_m'
				, 'checkedClass': '_checked'
				, 'unCheckedClass': '_unChecked'
				, 'enabledClass': '_enabled'
				, 'disabledClass': '_disabled'
			}
			, 'checkbox': {
				'wrapper': 'span'
				, 'wrapperClass': 'chk_m'
				, 'checkedClass': '_checked'
				, 'unCheckedClass': '_unChecked'
				, 'enabledClass': '_enabled'
				, 'disabledClass': '_disabled'
			}
		},
		// 비공개함수
		_private = {
			'init': function (options) {
				$.extend (true, _options, options);
				return this;
			},
			'reset': function (target) {
				var _$target = $(target);

				return $.each (_$target, function (idx, el) {
					var _$el = $(el)
					, _arrElStatus = [];

					if (!_private.isTarget (_$el)) {
						return true;
					}
					_arrElStatus = _private.getStatus (_$el);
					_private.doSometing (_arrElStatus, _$el);
				});
			},
			// EL에 해당하는 option조회
			'getCurrElementsOption': function ($el, key) {
				var _currOption = _options[ _private.getElementType ($el) ];

				if (key && _currOption.hasOwnProperty (key)) {
					return _currOption[ key ];
				}
				return _currOption;
			},
			// 유효한대상 검증
			'isTarget': function ($el) {
				var _currOption = _private.getCurrElementsOption ($el)
				, _elWrapper = _currOption.wrapper
				, _elWrapperClass = _currOption.wrapperClass
				, _$elParent = $el.parent ()
				, _isReFake = (_$elParent.is (_elWrapper) && _$elParent.hasClass (_elWrapperClass)) || false;
				
				// 부모 EL에 대한 유효성 체크 제거
				_isReFake = true;
				return _isReFake;
			},
			// 처리대상 (wrapper.wrapperClass)조회
			'getTarget': function ($el) {
				var _currOption = _private.getCurrElementsOption ($el)
				, _elWrapper = _currOption.wrapper
				, _elWrapperClass = _currOption.wrapperClass;

				// 부모 EL에 대한 유효성 체크 제거
//				return $el.closest (_elWrapper + '.' + _elWrapperClass);
				return $el.parent ();
			},
			// 상태별 처리
			'process' : {
					'enabled': function ($target, currOption) {						
						$target
							.addClass (currOption.enabledClass)
							.removeClass (currOption.disabledClass);
					},
					'disabled': function ($target, currOption) {
						$target
							.addClass (currOption.disabledClass)
							.removeClass (currOption.enabledClass);
					},
					'checked': function ($target, currOption) {
						$target
							.addClass (currOption.checkedClass)
							.removeClass (currOption.unCheckedClass);
					},
					'unChecked': function ($target, currOption) {
						$target
							.addClass (currOption.unCheckedClass)
							.removeClass (currOption.checkedClass);
					},
					'visible': function ($target, currOption) {
						$target.show ();
					},
					'invisible': function ($target, currOption) {
						$target.hide ();
					}
			},
			// 타입 & 상태별 처리요청
			'doSometing': function (status, $el) {
				var _$target = _private.getTarget ($el);

				$.each (status, function (idx, status) {
					var _currOption = _currOption = _private.getCurrElementsOption ($el);

					_private.process [status] (_$target, _currOption);					
				});
			},
			// EL 타입조회
			'getElementType': function ($el) {
				return $el.attr ('type');
			},
			// 상태조회
			'getStatus': function ($el) {
				var _arrStatus = [];
	
				_arrStatus.push ($el.is (':enabled') ? 'enabled' : 'disabled');
				_arrStatus.push ($el.is (':checked') ? 'checked' : 'unChecked');
				_arrStatus.push ($el.css ('display') === 'none' ? 'invisible' : 'visible');
				return _arrStatus;
			}
		},
		// 공개함수
		_public = {
			'init': function (options) {
				return _private.init (options);
			}, 
			'reset': function (target) {
				return _private.reset (target);
			}
		};

		return _public;
	}());
}(jQuery, this));