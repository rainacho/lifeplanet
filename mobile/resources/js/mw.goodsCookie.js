/* ============================================================================
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * DESCRIPTION : 상품설계 최근본 상품
 * ========================================================================== */

var goodsView = (function(){

	var _public   = {};
	var _private  = {};

	_private.cookieNm	= 'goodsCookie';
	_private.cookieVal	= new Array();
	_private.cookieSize = 0;
	_private.pgCd		= '';
	_private.goodsMapper = new Map();
		_private.goodsMapper.put('01', {'shortNm' : '정기',         'fullNm' : '(무)라이프플래닛e정기보험Ⅱ',            	'title' : '건강할수록<br />43.5%<br />저렴한 보험료',                                                        'image' : 'm.main_carousel_img02_01.jpg', 'info2' : ''});
		_private.goodsMapper.put('02', {'shortNm' : '종신',         'fullNm' : '(무)라이프플래닛e종신보험Ⅲ',            	'title' : '3천만원부터<br />최대 5억까지<br />보장 가능',                                                    'image' : 'm.main_carousel_img02_02.jpg', 'info2' : ''});
		_private.goodsMapper.put('03', {'shortNm' : '연금',         'fullNm' : '(무)라이프플래닛e연금보험Ⅱ(유니버셜)',    	'title' : '10년 이상<br />유지 시 보험차익<br />비과세',                                                     'image' : 'm.main_carousel_img02_09.jpg', 'info2' : ''});
		_private.goodsMapper.put('04', {'shortNm' : '연금',         'fullNm' : '(무)라이프플래닛e연금저축보험Ⅱ(유니버셜)',	'title' : '연말정산<br />최대 66만원<br />환급',                                                             'image' : 'm.main_carousel_img02_03.jpg', 'info2' : ''});
		_private.goodsMapper.put('07', {'shortNm' : '어린이보장',   'fullNm' : '(무)라이프플래닛e플러스어린이보험',      	'title' : '어린이 주요<br />10대 질병은 입원일당<br />4만원 지급',                                           'image' : 'm.main_carousel_img02_11.jpg', 'info2' : ''});
		_private.goodsMapper.put('08', {'shortNm' : '어린이저축',   'fullNm' : '(무)라이프플래닛e에듀케어저축보험Ⅱ',      	'title' : '<em data-rate="date01">2018년 5월</em><br />공시이율<br />연복리 <em data-rate="F12">3.00%</em>', 'image' : 'm.main_carousel_img02_12.jpg', 'info2' : ''});
		_private.goodsMapper.put('11', {'shortNm' : '암',           'fullNm' : '(무)라이프플래닛e암보험Ⅲ',              	'title' : '업계 평균 대비<br />26.9% 저렴한<br />보험료',                                                    'image' : 'm.main_carousel_img02_05.jpg', 'info2' : ''});
		_private.goodsMapper.put('37', {'shortNm' : '비갱신암',  	'fullNm' : '(무)만기까지비갱신e암보험<br/>(해지환급금 미지급형)', 'title' : '처음 보험료 그대로 100세까지 보장',                                                    		 'image' : 'm.main_carousel_img02_16.png', 'info2' : ''});
		_private.goodsMapper.put('12', {'shortNm' : '5대성인병',    'fullNm' : '(무)라이프플래닛e5대성인병보험',         	'title' : '5대 성인병<br />진단비 각각<br />최대 2천만원 보장 ',                                             'image' : 'm.main_carousel_img02_06.jpg', 'info2' : ''});
		_private.goodsMapper.put('17', {'shortNm' : '상해',         'fullNm' : '(무)라이프플래닛e상해보험',           'title' : '재해골절<br />(치아파절 제외)<br />횟수 제한 없이<br />1회당 25만원 지급',                        'image' : 'm.main_carousel_img02_10.jpg', 'info2' : ''});
		_private.goodsMapper.put('23', {'shortNm' : '자녀사랑정기', 'fullNm' : '(무)자녀사랑e정기보험',                 'title' : '사망 시 매월<br />30만원부터 최대<br />500만원까지 수령',                                         'image' : 'm.main_carousel_img02_13.jpg', 'info2' : ''});
		_private.goodsMapper.put('25', {'shortNm' : '저축',         'fullNm' : '(무)1년부터e저축보험',              'title' : '100% 원금 보장에<br /> 만기유지보너스까지!',                                                      'image' : 'm.main_carousel_img02_04.jpg', 'info2' : ''});
		_private.goodsMapper.put('28', {'shortNm' : '입원비',       'fullNm' : '(무)e입원비보험',                   'title' : '실손보험이 있어도<br />입원비 최대 3만원<br />정액 보장',                                         'image' : 'm.main_carousel_img02_07.jpg', 'info2' : ''});
		_private.goodsMapper.put('29', {'shortNm' : '수술비',       'fullNm' : '(무)e수술비보험',                   'title' : '실손보험이 있어도<br />수술 1회 최대<br />100만원 정액 보장',                                     'image' : 'm.main_carousel_img02_08.jpg', 'info2' : ''});
		_private.goodsMapper.put('31', {'shortNm' : 'm저축',        'fullNm' : '(무)만원부터m저축보험Ⅱ',             'title' : '1년만 저축해도<br />이자는 복리!',                                                                'image' : 'm.main_carousel_img02_14.png', 'info2' : ''});
		_private.goodsMapper.put('32', {'shortNm' : '펫정기',       'fullNm' : '(무)펫사랑m정기보험',               'title' : '반려동물 기본케어부터<br />전문 위탁보호<br />서비스까지',                                        'image' : 'm.main_carousel_img02_15.png', 'info2' : ''});
		_private.goodsMapper.put('43', {'shortNm' : '치아',     	'fullNm' : '(무)e건강치아보험',                  'title' : '때우고 씌우는 재료<br />상관 없이 든든하게 보장',                                        		 'image' : 'm.main_carousel_img02_17.png', 'info2' : ''});
		_private.goodsMapper.put('41', {'shortNm' : '미세먼지',   	'fullNm' : '(무)e미세먼지질병보험',               	'title' : '마스크를 써도 불안할 때!<br>미세먼지 관련 질병<br>든든하게 보장',                          		 'image' : 'm.main_carousel_img02_18.png', 'info2' : ''});
		_private.goodsMapper.put('49', {'shortNm' : '여성건강',   	'fullNm' : '(무)e여성건강보험',               	'title' : '처음 보험료 그대로!<br />주요 여성 질환 집중 보장',             		 'image' : 'm.main_carousel_img02_20.png', 'info2' : ''});
		_private.goodsMapper.put('52', {'shortNm' : '뇌·심장보험',   	'fullNm' : '(무)e암·뇌·심장건강보험<br/>(해지환급금 미지급형)',               	'title' : '뇌&middot;심장 관련 질환을<br>폭 넓게 보장!<br>100세까지 든든하게!',             		 'image' : 'm.main_carousel_img02_21.png', 'info2' : ''});
	//미니보험 url 정의
	_private.miniGoodsMapper = new Map();
		_private.miniGoodsMapper.put('31',{'url':'/products/pe/MWPE810S1'});
		_private.miniGoodsMapper.put('32',{'url':'/products/pe/MWPE910S1'});

	_private.getInfo = function() {

		var ckVal 		= util.getCookie(_private.cookieNm);

		if(location.href.indexOf('MWPE810S1') > -1){ //만원부터 m 저축
			_private.pgCd	= '31';
		}else if(location.href.indexOf('MWPE910S1') > -1){ //펫사랑 m 정기
			_private.pgCd	= '32';
		}else{
			_private.pgCd	= location.href.split('/')[5].substring(2,4); // tobe
		}
		if ( ckVal != '' ) {
			_private.cookieVal	= ckVal.split(',');
			_private.cookieSize = _private.cookieVal.length;
		}
	};

	_private.setPG = function(items) {

		_private.cookieVal.push(items);
		MXP_PLUGIN.NativeApp.setCookies(_private.cookieNm, _private.cookieVal);
		util.setCookie(_private.cookieNm, _private.cookieVal, { expires: 7 } );

	};

	_private.reSetPG = function(items){

		try {

			var dupIndex = $.inArray(items, _private.cookieVal);

			// 중복 제거
			if ( dupIndex > -1) {
				_private.cookieVal.splice(dupIndex, 1);
			} else {
				if ( _private.cookieVal.length == 9 ) {
					_private.cookieVal.splice(0,1);
				} else if ( _private.cookieVal.length > 9 ) {
					_private.cookieVal.splice(9,_private.cookieVal.length);
					_private.cookieVal.splice(0,1);
				}
			}
			_private.setPG(items);

		} catch (e) {
			// TODO: handle exception
			_public.clearCk();
		}
	};

	_public.getPG = function () {

		_private.getInfo();

		var reverseArr = [];

		if ( _private.cookieSize > 0 ) {
			reverseArr		= _private.cookieVal.reverse();
		}

		return reverseArr;
	};



	_public.init = function () {
		_private.getInfo();

		if(_private.pgCd =='31' || _private.pgCd =='32'){
			// 미니보험인 경우 쿠키세팅하지않음
		}else{
			// 상품설계 최초진입
			if ( _private.cookieSize == 0 ) {
				_private.setPG(_private.pgCd);
			// 상품설계 재진입
			} else {
				_private.reSetPG(_private.pgCd);
			}	
		}

	};

	//200601 수정
	_public.drawInit = function () {

		_private.getInfo();

		var noItemHtml 		= '최근 본 상품이 없습니다.';
		var html 			= '';
		var reverseArr;

		try {

			if ( _private.cookieSize == 0 ) {
				$('.latest_wrap').hide();
				return false;
			}

			reverseArr		= _private.cookieVal.reverse();
			$.each(reverseArr, function (idx, data){
				if(_private.miniGoodsMapper.get(data) != undefined){ //gnb 하단 최근본상품의 미니보험 링크
					html += '<a href="javascript:PageUtil.movePage(\''+_private.miniGoodsMapper.get(data).url+'.dev\');" class="btn_prod" data-weblogclick="{\'labl\':\'최근본상품\', \'clsf\':\'GNB\'}">#'+_private.goodsMapper.get(data).shortNm+'</a>';
					//html += '<a href="'+_private.miniGoodsMapper.get(data).url+'.dev" class="btn_prod" data-weblogclick="{\'labl\':\'최근본상품\', \'clsf\':\'GNB\'}">#'+_private.goodsMapper.get(data).shortNm+'</a>';
				}else{ // 일반보험상품
					html += '<a href="javascript:PageUtil.movePage(\'/products/pg/PG'+data+'000S.dev\');" class="btn_prod" data-weblogclick="{\'labl\':\'최근본상품\', \'clsf\':\'GNB\'}">#'+_private.goodsMapper.get(data).shortNm+'</a>';
					//html += '<a href="/products/pg/PG'+data+'000S.dev" class="btn_prod" data-weblogclick="{\'labl\':\'최근본상품\', \'clsf\':\'GNB\'}">#'+_private.goodsMapper.get(data).shortNm+'</a>';
				}
			});
			var latestWidth =  0; //가로사이즈
			var len = reverseArr.length; //최근본상품 갯수

			$('#gnb_goodsCookie').empty().append(html);
			for(var i = 0; i < len; i++){
				latestWidth += $("#gnb_goodsCookie > a").eq(i).outerWidth(true);
			}
			$("#gnb_goodsCookie").css("width",latestWidth+10);
			$('.latest_wrap').show();

		} catch(e){
			_public.clearCk();
		}
	};

	_public.drawMainInit = function () {

		_private.getInfo();

		var htmlArr 			= [];
		var reverseArr;

		try {

			if ( _private.cookieSize == 0 ) {
				return 0;
			}

			reverseArr		= _private.cookieVal.reverse();
			//메인카드 최근본상품 html
			htmlArr[0] 			+= '<li class="swiper-slide">';
			htmlArr[0]  	    += '	<div class="carousel_bullet">최근 본 상품</div>';
			
			if(reverseArr[0] == "11" ){	//정기보험, 꿈꾸는저축보험
				htmlArr[0] += '<img src="/resources/images/common/m.main_carousel_hot.png" width="38" alt="hot" />';
			}else if (reverseArr[0] == "37"){	//100세암보험
				htmlArr[0] += '<img src="/resources/images/common/m.main_carousel_best.png" width="38" alt="best" />';
			}
			else if (reverseArr[0] == "25") {
				htmlArr[0] += '<img src="/resources/images/common/m.main_carousel_new.png" width="38" alt="new" />';
			}
			htmlArr[0]  	    += '	<div class="carousel_title">'+_private.goodsMapper.get(reverseArr[0]).title+'</div>'; //가장 최근에 본 상품
			if(_private.goodsMapper.get(reverseArr[0]).info2 != undefined && _private.goodsMapper.get(reverseArr[0]).info2 != ""){
				htmlArr[0]      += '	<div class="carousel_info2">';
				htmlArr[0]      += '		<p>' + _private.goodsMapper.get(reverseArr[0]).info2 + '</p>';
				htmlArr[0]      += '	</div>';
			}
			htmlArr[0]  	    += '	<div class="carousel_info">';
			htmlArr[0]  	    += '		<p>'+_private.goodsMapper.get(reverseArr[0]).fullNm+'</p>'; //가장 최근에 본 상품
			htmlArr[0] 			+= '	</div>';
			htmlArr[0] 			+= '	<div class="carousel_button">';
			htmlArr[0] 			+= '		<a href="javascript:CM01000S.movePage(\'card'+reverseArr[0]+'\');" class="white" data-weblogclick="{\'actn\':\''+_private.goodsMapper.get(reverseArr[0]).fullNm+'\',\'labl\':\'최근본상품\', \'clsf\':\'메인링크\'}">자세히 보기</a>';
			htmlArr[0] 			+= '	</div>';
			htmlArr[0] 			+= '</li>';

			//메인카드 최근본상품 이미지 html
			htmlArr[1] 			+= '<li class="swiper-slide"><img src="/resources/images/common/'+_private.goodsMapper.get(reverseArr[0]).image+'" alt="" /></li>';

			return htmlArr;

		} catch(e){
			_public.clearCk();
		}

	};

	_public.clearCk = function () {
		util.setCookie(_private.cookieNm, '');
	};

	return _public;

})();

$(document).ready(function () {
	if ( location.href.indexOf('/pg/') >-1 || location.href.indexOf('/pe/') > -1) {
		goodsView.init();
	}
	goodsView.drawInit();
});
