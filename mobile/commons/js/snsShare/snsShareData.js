/**
 * SNS 공유하기 데이터 객체
 */
var snsShareData = (function() {
	var _private = {};
	var _public = {};
	
	// 공유 데이터 설정
	_private.setSharedData = function(sharedData, media) {
		if(typeof sharedData === 'function') {
			sharedData = sharedData();
		}
		
		if(sharedData === null || sharedData === undefined || typeof sharedData !== 'object') {
			sharedData = {};
		}
		
		var mainPage = '/common/cm/CM01000S.dev';
		var title = sharedData.label || _private.getOgTitle();
		var imgUrl = sharedData.imgUrl || _private.getOgImage();
		var path = sharedData['path_' + media] || sharedData.path;
		
		// 카카오페이 인입 시 이미지url 변경
		if (globalVar.getParam('inSData').inflow=='WL'){
			var url = document.location.href;
			if (url.indexOf('PG37')>-1){
				imgUrl = '/resources/images/sns/lifeplanet_10037_2.png';
			}else if (url.indexOf('PG04')>-1){
				imgUrl = '/resources/images/sns/lifeplanet_10004_2.png';
			}
		}
		
		return {
			imgUrl        : imgUrl,
			path          : path || mainPage,
			label         : title,
			description   : sharedData.description || _private.getOgDescription(),
			webButton     : sharedData.webButton || '방문하기',
			shareTextLine : title,
			textBand      : title,
		};
	};
	
	// og:title
	_private.getOgTitle = function() {
		var defaultLabel = '라이프플래닛 - 국내 최초 인터넷 생명보험회사';
		
		var $ogTitle = $('meta[property="og:title"]');
		if($ogTitle.length === 0) {
			return defaultLabel;
		}
		
		return $ogTitle.attr('content') || defaultLabel;
	};
	
	// og:image
	_private.getOgImage = function() {
		var defaultImage = location.origin + '/resources/images/sns/lifeplanet_10000.png';
		
		var $ogImg = $('meta[property="og:image"]');
		if($ogImg.length === 0) {
			return defaultImage;
		}
		
		var ogImageUrl = $ogImg.attr('content') || '';
		if(ogImageUrl === '') {
			return defaultImage;
		}
		
		try {
			var urlSplit = ogImageUrl.split('/');
			
			if(urlSplit[0].indexOf('http') > -1) {
				return '/' + urlSplit.splice(3).join('/');
				
			} else if(urlSplit[0].indexOf('www') > -1 || urlSplit[0].indexOf('m.') > -1) {
				return '/' + urlSplit.splice(1).join('/');
			}
			
			return defaultImage; 
			
		} catch(e) {
			return defaultImage;
		}
	};
	
	// og:description
	_private.getOgDescription = function() {
		var defaultDescription = '나에게 맞는 합리적인 보험료 - 라이프플래닛';
		
		var $ogDescription = $('meta[property="og:description"]');
		if($ogDescription.length === 0) {
			return defaultDescription;
		}
		
		return $ogDescription.attr('content') || defaultDescription;
	};
	
	// 공유 데이터
	_private.data = {
		goodDsgnPageScrnIds : ['PG01100S', 'PG11100S', 'PG25100S', 'PG04100S','PG02100S','PG12100S','PG43100S','PG17100S','PG03100S','PG28100S'
							  ,'PG29100S', 'PG07100S', 'PG08100S', 'PG37100S','PG41100S','PG49100S','PG52100S'], // 상품 설계 페이지
		
		PG01000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10001.png',
			path : '/products/pg/PG01000S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e정기보험Ⅱ',
			description : '가족의 꿈을 위한 약속! 꼭 필요한 기간만큼 선택하여 보장받는 실속 있는 사망보험',
			webButton : '설계결과 공유',
		},
		
		PG01100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10001.png',
			path : '/products/pg/PG01100S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e정기보험Ⅱ',
			description : '가족의 꿈을 위한 약속! 꼭 필요한 기간만큼 선택하여 보장받는 실속 있는 사망보험',
			webButton : '설계결과 공유',
		},
		
		PG11000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10011.png',
			path : '/products/pg/PG11000S.dev',
			label : '나에게 맞는 합리적인 보험료-(무)라이프플래닛e암보험Ⅲ',
			description : '비흡연자도, 금연 성공 시에도 할인 받는 합리적인 보험료의 비갱신 암보험',
			webButton : '설계결과 공유',
		},
		
		PG11100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10011.png',
			path : '/products/pg/PG11100S.dev',
			label : '나에게 맞는 합리적인 보험료-(무)라이프플래닛e암보험Ⅲ',
			description : '비흡연자도, 금연 성공 시에도 할인 받는 합리적인 보험료의 비갱신 암보험',
			webButton : '설계결과 공유',
		},
		
		PG37000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10037.png',
			path : '/products/pg/PG37000S.dev',
			label : '해지환급금 미지급형으로 더욱 합리적인 보험료-만기까지비갱신e암보험',
			description : '보험료 낭비 NO! 보험료 인상 NO! 처음보험료 그대로 100세까지 보장받는 암보험',
			webButton : '설계결과 공유',
		},
		
		PG37100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10037.png',
			path : '/products/pg/PG37100S.dev',
			label : '해지환급금 미지급형으로 더욱 합리적인 보험료-만기까지비갱신e암보험',
			description : '보험료 낭비 NO! 보험료 인상 NO! 처음보험료 그대로 100세까지 보장받는 암보험',
			webButton : '설계결과 공유',
		},		
		
		PG25000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10025.png',
			path : '/products/pg/PG25000S.dev',
			label : '1년도 OK, 10년도 OK! 실속 있는 저축 방법 – (무)1년부터e저축보험',
			description : '원금 보장에 만기유지보너스까지! 안정성과 수익성을 동시에!',
			webButton : '설계결과 공유',
		},
		
		PG25100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10025.png',
			path : '/products/pg/PG25100S.dev',
			label : '1년도 OK, 10년도 OK! 실속 있는 저축 방법 – (무)1년부터e저축보험',
			description : '원금 보장에 만기유지보너스까지! 안정성과 수익성을 동시에!',
			webButton : '설계결과 공유',
		},
		
		PG04000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10004.png',
			path : '/products/pg/PG04000S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e연금저축보험(유니버셜)',
			description : '100세 시대! 노후준비의 첫걸음, 직장인을 위한 연금저축보험',
			webButton : '설계결과 공유',
		},
		
		PG04100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10004.png',
			path : '/products/pg/PG04100S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e연금저축보험(유니버셜)',
			description : '100세 시대! 노후준비의 첫걸음, 직장인을 위한 연금저축보험',
			webButton : '설계결과 공유',
		},
		
		PG02000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10002.png',
			path : '/products/pg/PG02000S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e종신보험Ⅲ',
			description : '가족의 꿈을 위한 평생 약속! 종신토록 보장받는 마음든든 사망보험',
			webButton : '설계결과 공유',
		},
		
		PG02100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10002.png',
			path : '/products/pg/PG02100S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e종신보험Ⅲ',
			description : '가족의 꿈을 위한 평생 약속! 종신토록 보장받는 마음든든 사망보험',
			webButton : '설계결과 공유',
		},
		
		PG12000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10012.png',
			path : '/products/pg/PG12000S.dev',
			label : '나에게 맞는 합리적인 보험료-(무)라이프플래닛e5대성인병보험',
			description : '비흡연자도, 금연 성공 시에도 할인 받는 실속 보장 5대성인병보험',
			webButton : '설계결과 공유',
		},
		
		PG12100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10012.png',
			path : '/products/pg/PG12100S.dev',
			label : '나에게 맞는 합리적인 보험료-(무)라이프플래닛e5대성인병보험',
			description : '비흡연자도, 금연 성공 시에도 할인 받는 실속 보장 5대성인병보험',
			webButton : '설계결과 공유',
		},
		
		PG43000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10043.png',
			path : '/products/pg/PG43000S.dev',
			label : '치과보다 무서운 치료비 보장!-(무)e건강치아보험',
			description : '때우고 씌우는 충치치료 재료 상관 없이 든든하게 보장!',
			webButton : '설계결과 공유',
		},
		
		PG43100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10043.png',
			path : '/products/pg/PG43100S.dev',
			label : '치과보다 무서운 치료비 보장!-(무)e건강치아보험',
			description : '때우고 씌우는 충치치료 재료 상관 없이 든든하게 보장!',
			webButton : '설계결과 공유',
		},
		
		PG41000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10041.png',
			path : '/products/pg/PG41000S.dev',
			label : '마스크를 써도 불안할 때!-(무)e미세먼지질병보험',
			description : '호흡기 및 심혈관 관련 질병 진단비를 최대 2천만원까지 보장받는 미세먼지질병보험',
			webButton : '설계결과 공유',
		},
		
		PG41100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10041.png',
			path : '/products/pg/PG41100S.dev',
			label : '마스크를 써도 불안할 때!-(무)e미세먼지질병보험',
			description : '호흡기 및 심혈관 관련 질병 진단비를 최대 2천만원까지 보장받는 미세먼지질병보험',
			webButton : '설계결과 공유',
		},
		
		PG17000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10017.png',
			path : '/products/pg/PG17000S.dev',
			label : '나에게 맞는 합리적인 보험료-(무)라이프플래닛e상해보험',
			description : '소중한 일상을 지켜주는! 순간의 사고에도 걱정 없이 튼튼하고 든든한 상해보험',
			webButton : '설계결과 공유',
		},
		
		PG17100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10017.png',
			path : '/products/pg/PG17100S.dev',
			label : '나에게 맞는 합리적인 보험료-(무)라이프플래닛e상해보험',
			description : '소중한 일상을 지켜주는! 순간의 사고에도 걱정 없이 튼튼하고 든든한 상해보험',
			webButton : '설계결과 공유',
		},
		
		PG03000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10003.png',
			path : '/products/pg/PG03000S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e연금보험Ⅱ(유니버셜)',
			description : '100세 시대! 세금 없는 평생 소득, 나를 위한 연금보험',
			webButton : '설계결과 공유',
		},
		
		PG03100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10003.png',
			path : '/products/pg/PG03100S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e연금보험Ⅱ(유니버셜)',
			description : '100세 시대! 세금 없는 평생 소득, 나를 위한 연금보험',
			webButton : '설계결과 공유',
		},
		
		PG28000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10028.png',
			path : '/products/pg/PG28000S.dev',
			label : '주계약 보장 입원비보험-(무)e입원비보험',
			description : '꼭 맞는 연령대별 보장일수! 보험료가 오르지 않는 비갱신형 입원비보험 (80세 만기 선택 시)',
			webButton : '설계결과 공유',
		},
		
		PG28100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10028.png',
			path : '/products/pg/PG28100S.dev',
			label : '주계약 보장 입원비보험-(무)e입원비보험',
			description : '꼭 맞는 연령대별 보장일수! 보험료가 오르지 않는 비갱신형 입원비보험 (80세 만기 선택 시)',
			webButton : '설계결과 공유',
		},
		
		PG29000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10029.png',
			path : '/products/pg/PG29000S.dev',
			label : '주계약 보장 수술비보험-(무)e수술비보험',
			description : '수술 1종 연간 3회, 수술 3종 최대 100만원까지! 보험료가 오르지 않는…',
			webButton : '설계결과 공유',
		},
		
		PG29100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10029.png',
			path : '/products/pg/PG29100S.dev',
			label : '주계약 보장 수술비보험-(무)e수술비보험',
			description : '수술 1종 연간 3회, 수술 3종 최대 100만원까지! 보험료가 오르지 않는…',
			webButton : '설계결과 공유',
		},

		PG07000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10007.png',
			path : '/products/pg/PG07000S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e플러스어린이보험',
			description : '우리 아이 아프지 않게 사랑으로 지켜주는 어린이 보장보험',
			webButton : '설계결과 공유',
		},
		
		PG07100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10007.png',
			path : '/products/pg/PG07100S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e플러스어린이보험',
			description : '우리 아이 아프지 않게 사랑으로 지켜주는 어린이 보장보험',
			webButton : '설계결과 공유',
		},
		
		PG08000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10008.png',
			path : '/products/pg/PG08000S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e에듀케어저축보험Ⅱ',
			description : '우리 아이 꿈을 위해 사랑으로 준비하는 교육자금 저축보험',
			webButton : '설계결과 공유',
		},
		
		PG08100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10008.png',
			path : '/products/pg/PG08100S.dev',
			label : '나에게 맞는 합리적인 보험료-라이프플래닛e에듀케어저축보험Ⅱ',
			description : '우리 아이 꿈을 위해 사랑으로 준비하는 교육자금 저축보험',
			webButton : '설계결과 공유',
		},
		
		PG49000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10049.png',
			path : '/products/pg/PG49000S.dev',
			label : '여성 주요 질환 집중 보장! - (무)e여성건강보험',
			description : '여성생식기암과 유방암, 갑상선암 등 여성 주요 질환의 진단 및 관련 입원, 수술 시 보장',
			webButton : '설계결과 공유',
		},
		
		PG49100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10049.png',
			path : '/products/pg/PG49100S.dev',
			label : '여성 주요 질환 집중 보장! - (무)e여성건강보험',
			description : '여성생식기암과 유방암, 갑상선암 등 여성 주요 질환의 진단 및 관련 입원, 수술 시 보장',
			webButton : '설계결과 공유',
		},
		
		PG52000S : {
			imgUrl : '/resources/images/sns/lifeplanet_10052.png',
			path : '/products/pg/PG52000S.dev',
			label : '스트레스 많은 현대인을 위해!-(무)e암·뇌·심장건강보험(해지환급금 미지급형)',
			description : '뇌혈관질환과 허혈성심장질환, 암 등 주요 3대 질환 집중 보장',
			webButton : '설계결과 공유',
		},
		
		PG52100S : {
			imgUrl : '/resources/images/sns/lifeplanet_10052.png',
			path : '/products/pg/PG52100S.dev',
			label : '스트레스 많은 현대인을 위해!-(무)e암·뇌·심장건강보험(해지환급금 미지급형)',
			description : '뇌혈관질환과 허혈성심장질환, 암 등 주요 3대 질환 집중 보장',
			webButton : '설계결과 공유',
		},
		
		MWPE810S1 : {
			imgUrl : '/resources/images/sns/lifeplanet_10000.png',
			path : '/products/pe/MWPE810S1.dev',
		},
		
		MWPE910S1 : {
			path : '/products/pe/MWPE910S1.dev',
		},
		
		NA01000S : {
			path : '/analysis/na/NA01000S.dev',
			description : '11가지 주요 보장 중에 부족한 부분이 있다면?',
		},
		
		NA01100S : {
			path : '/analysis/na/NA01000S.dev',
			description : '11가지 주요 보장 중에 부족한 부분이 있다면?',
		},
		
		NA01200S : {
			path : '/analysis/na/NA01000S.dev',
			description : '11가지 주요 보장 중에 부족한 부분이 있다면?',
		},
		
		MWIH120S1 : {
			path : '/innovation/ih/MWIH100S1.dev',
			description : '360°플래닛 회원만을 위한 건강 리워드 프로그램',
		},
		
		BL00050S1 : {
			path : '/bridge/bl/BL00050S1.dev',
		},
		
		BL00110S1 : {
			path : '/bridge/bl/BL00110S1.dev',
		},
		
		MWBL710S1 : {
			path : '/bridge/bl/MWBL710S1.dev',
		},
		
		MWLS570S1 : {
			path : '/lifesquare/ls/MWLS570S1.dev',
		},
		
		MWLS215S1 : function() {
			return MWLS215S1.snsShareText;
		},
		
		AN00000S : function() {
			var numOfPrbuInsu = AN00000S.prbuInsuInfo.prbuGoodCnt;
			var label = '가입한 보험 ' + numOfPrbuInsu + '건 찾았어요!';
			
			return {
				imgUrl : '/resources/images/sns/img_share_kakaopay02.png',
				path_kakaotalk : 'http://kko.to/find-ins',
				path_facebook : 'http://kko.to/ZCn4Y_V0T',
				path_link : 'http://kko.to/rVL4DVV0H',
				label : label,
				description : '쉽고 간편하게 내 보험을 찾아보세요.',
				webButton : '바로가기',
			};
		},
		
		AN01210S : function() {
			var numOfPrbuInsu = AN00000S.prbuInsuInfo.prbuGoodCnt;
			var label = '가입한 보험 ' + numOfPrbuInsu + '건 찾았어요!';
			
			return {
				imgUrl : '/resources/images/sns/img_share_kakaopay02.png',
				path_kakaotalk : 'http://kko.to/find-ins',
				path_facebook : 'http://kko.to/ZCn4Y_V0T',
				path_link : 'http://kko.to/rVL4DVV0H',
				label : label,
				description : '쉽고 간편하게 내 보험을 찾아보세요.',
				webButton : '바로가기',
			};
		},
		NA01200S : function() {
			var numOfPrbuInsu = NA01200S.prbuInsuInfo.prbuGoodCnt;
			var label = '가입한 보험 ' + numOfPrbuInsu + '건 찾았어요!';
			
			return {
				imgUrl : '/resources/images/bi/201805/v180605_img_detail_A08_fb.png',
				path : 'https://m.lifeplanet.co.kr:444/analysis/na/NA01000S.dev',
				label : label,
				description : '간편하게 내 보험을 찾고 보장도 확인하세요!',
				webButton : '바로가기',
			};
		},
	};
	
	_public.isGoodDsgnPage = function(scrnId) {
		return _private.data.goodDsgnPageScrnIds.indexOf(scrnId) > -1;
	};
	
	_public.getSharedData = function(scrnId, media) {
		var sharedData = _private.setSharedData(_private.data[scrnId], media);
		
		return sharedData;
	};
	
	return _public;
})();