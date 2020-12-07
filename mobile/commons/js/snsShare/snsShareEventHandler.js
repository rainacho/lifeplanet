/**
 * SNS 공유하기 Event Handler
 */
var snsSharePopupMethods = {

	getScrnId : function(url) {
		return url.split('/').splice(-1)[0].split('.')[0];
	},
	
	getCurrentScrnId : function() {
		return snsSharePopupMethods.getScrnId(location.href);
	},
	
	removeEmailAndSmsShareButtons : function() {
		$('[data-target-media="email"]').parent().remove();
		$('[data-target-media="sms"]').parent().remove();
	},
	
	setPopupTitle : function() {
		var title = $('title').text().replace(' - 라이프플래닛', ' 공유하기');
		$('#sns_share_popup_id').text(title);
	},
};


$(document).ready(function() {
	var currentScrnId = snsSharePopupMethods.getCurrentScrnId(); // 현재 화면 ID
	var isGoodDsgn = snsShareData.isGoodDsgnPage(currentScrnId); // 상품 설계 공유 여부
	
	if(!isGoodDsgn) { // 상품설계 공유가 아니면 e-mail, SMS 공유 기능 삭제
		snsSharePopupMethods.removeEmailAndSmsShareButtons();
	}
	
	snsSharePopupMethods.setPopupTitle();
	
	// 카카오페이 인입시, 네이버 밴드 및 라인기능 삭제
	if (globalVar.getParam('inSData').inflow === 'WL'){		
		$('[data-target-media="band"]').parent().remove();
		$('[data-target-media="line"]').parent().remove();
	}
	
	// 공유하기 매체 버튼별 Event Handler
	$('a[data-target-media]').on('click', function(event) {
		var media = $(this).data('targetMedia');
		var sharedData = snsShareData.getSharedData(currentScrnId, media);
		
		switch(media) {
			case 'link':
				SNS.linkCopy(sharedData.path);
				alert('주소가 복사되었습니다.');
				break;
			default:
				snsShareSend.sendSharedData(media, sharedData, isGoodDsgn);
		}
		
		event.preventDefault();
		event.stopPropagation();
	});
});
