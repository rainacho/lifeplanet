/**
 * SNS 공유하기 전송 모듈
 */
var snsShareSend = (function() {
	var _private = {};
	var _public = {};
	
	_private.media = '';         // 공유하기에 이용할 매체
	_private.sharedData = {};    // 공유할 데이터
	_private.isGoodDsgn = false; // 상품설계 페이지 여부
	
	// 입력 데이터 검증
	_private.validateInputData = function(media, sharedData, isGoodDsgn) {
		if(media === null || media === undefined || media === '') {
			throw 'SNS 공유하기 매체가 지정되지 않았습니다.';
		}
		
		if(_private[media] === undefined) {
			throw media + '는 지원되지 않습니다.';
		}
		
		if(sharedData === null || sharedData === undefined) {
			throw '공유할 내용이 없습니다.'
		}
		
		if(isGoodDsgn === null || isGoodDsgn === undefined) {
			throw '상품설계 공유 여부가 지정되지 않았습니다.';
		}
	};
	
	// 이메일 공유
	_private.email = function() {
		var type = _private.isGoodDsgn ? 'product' : '';
		_private.sharedData.snsId = 'snsEmail';
		
		SNS.initParam('sns_share_list', type, _private.sharedData);
	};
	
	// SMS 공유
	_private.sms = function() {
		var type = _private.isGoodDsgn ? 'product' : '';
		_private.sharedData.snsId = 'snsSMS';
		
		SNS.initParam('sns_share_list', type, _private.sharedData);
	};
	
	// 카카오톡 공유
	_private.kakaotalk = function() {
		var type = _private.isGoodDsgn ? 'product' : '';
		_private.sharedData.snsId = 'snsKakaotalk';
		
		SNS.initParam('sns_share_list', type, _private.sharedData);
	};
	
	// 페이스북 공유
	_private.facebook = function() {
		var type = _private.isGoodDsgn ? 'product' : '';
		_private.sharedData.snsId = 'snsFacebook';
		
		SNS.initParam('sns_share_list', type, _private.sharedData);
	};
	
	// 라인 공유
	_private.line = function() {
		var type = _private.isGoodDsgn ? 'product' : '';
		_private.sharedData.snsId = 'snsLine';
		
		SNS.initParam('sns_share_list', type, _private.sharedData);
	};
	
	// 밴드 공유
	_private.band = function() {
		var type = _private.isGoodDsgn ? 'product' : '';
		_private.sharedData.snsId = 'snsBand';
		
		SNS.initParam('sns_share_list', type, _private.sharedData);
	};
	
	// 실행 공유하기
	_public.sendSharedData = function(media, sharedData, isGoodDsgn) {
		try {
			_private.validateInputData(media, sharedData, isGoodDsgn)
		} catch(e) {
			logger.error(e);
			alert(e);
			return;
		}
		
		_private.media = media;
		_private.sharedData = sharedData;
		_private.isGoodDsgn = isGoodDsgn;
		
		_private[media](); // 매체별 공유하기
	};
	
	return _public;
})();