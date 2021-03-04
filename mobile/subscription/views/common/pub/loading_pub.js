/* 기존 로딩 수정 */
var fnLoading_Show = function (key) {
	$('#loading_area').remove();
	// 20210331 기본로딩 수정
	var loadingHtml =
		'<div id="loading_area"><div class="spinner_wrapper"><div class="spinner_wrap" style="padding:0;"><div class="loading_default" style="width:50px;height:50px;"></div></div></div></div>'; // 190424 수정
	switch (key) {
		case 'captcha':
			// 2018-05-19 수정 | <p class="desc"> 내 텍스트 변경 | (협회完) 바른보장서비스_최종_20180518 -->
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type4"><h1 class="tit">고객님의 소중한 정보를<br>보호하기 위한 작업이<br>진행 중입니다.</h1><div class="load_motion"><div class="captcha_loading"><div class="unload_captcha"></div><div class="load_captcha"></div><div class="check"></div></div></div><p class="desc">보안문자를 입력하시면<br />인증번호 6자리가 전송됩니다</p></div></div></div></div>';
			break;
		case 'loadingAnalisys':
			//2018-05-19 수정 | <h1 class="tit"> 문구 변경 | (협회完) 바른보장서비스_최종_20180518
			//2018-05-19 수정 | 텍스트 추가 | (협회完) 바른보장서비스_최종_20180518
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type3"><h1 class="tit">고객님의 보험을<br />조회 중입니다.</h1><div class="load_motion"><div class="line_grow"><div class="inner"><div class="line line1"></div><div class="line line2"></div><div class="line line3"></div><div class="line line4"></div><div class="line line5"></div><div class="line line6"></div></div><div class="square_s"></div><div class="square_b"></div></div></div><p class="desc">보험가입 현황을 확인해서<br />올바른 보장을 추천해드려요</p></div></div></div></div>';
			//수정 전 로딩 소스 :: loadingHtml = '<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type3"><h1 class="tit">고객님의 보험을 조회하고<br>분석 중입니다.</h1><div class="load_motion"><div class="line_grow"><div class="inner"><div class="line line1"></div><div class="line line2"></div><div class="line line3"></div><div class="line line4"></div><div class="line line5"></div><div class="line line6"></div></div><div class="square_s"></div><div class="square_b"></div></div></div><div class="swiper_carousel loading_swiper"><div class="swiper-wrapper"><div class="swiper-slide item"><p class="desc">보험조회 시스템을 통해<br>주요 보험사에 가입된<br>고객님의 보험을 조회하고 있습니다.</p></div><div class="swiper-slide item"><p class="desc">조회된 보험 내역을 바탕으로<br>고객님에게 맞는<br>적정한 보험료를 추천 드립니다.</p></div><div class="swiper-slide item"><p class="desc">고객님의 생애주기에 맞는<br>필요한 보장을 놓치지 않도록<br>플랜을 제시해 드립니다.</p></div></div><div class="swiper-pagination"></div></div></div><script type="text/javascript">var Swiper = require("swiper"); var loadingSwiper = new Swiper(".loading_swiper", {"pagination": {"el":".swiper-pagination"}, "loop": true, "autoplay": true, "speed": 3000, "allowTouchMove": false });</script></div></div></div>';
			break;
		case 'loadingCreateBill':
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading_tit">잠시만 기다려주세요</div><div class="loading_area type"><div class="loading_rel"><div class="item_pencil"><img src="/resources/images/analysis/m.item_pencil.png" alt="" /></div><div class="item_paper2"><div class="line line1"></div><div class="line line2"></div><div class="line line3"><span></span></div><div class="line line4"><span></span></div><div class="line line5"><span></span></div><div class="line line6"><span></span></div></div></div></div><div class="loading_list"><div class="loadaing_guide">고객님의 청구서를<br>생성 하는 중 입니다.</div></div></div></div></div>';
			break;

		// case 'loadingProduct_p1':
		// 	loadingHtml =
		// 		'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type2"><div class="load_motion"><div class="dot_wrap"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="ball_wrap"><span class="ball"></span><span class="ball"></span><span class="ball"></span><span class="shadow"></span></div></div><div class="copy">3단계 중 <strong>1단계</strong> <br><strong>정보를 저장 중</strong>이에요.</div></div></div></div></div>';
		// 	break;
		// 20210331 1단계정보저당 로딩 수정
		case 'loadingProduct_p1':
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type2"><div class="load_motion"><div class="dot_wrap"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="ball_wrap"><span class="ball"></span><span class="ball"></span><span class="ball"></span><span class="shadow"></span></div></div><div class="copy">3단계 중 <strong>1단계</strong> <br><strong>정보를 저장 중</strong>이에요.</div></div></div></div></div>';
			break;
		case 'loadingProduct_p1_5':
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type2"><div class="load_motion"><div class="dot_wrap"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="ball_wrap"><span class="ball"></span><span class="ball"></span><span class="ball"></span><span class="shadow"></span></div></div><div class="copy">3단계 중 <strong>1.5단계</strong> <br><strong>정보를 저장 중</strong>이에요.</div></div></div></div></div>';
			break;
		case 'loadingProduct_p2':
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type2"><div class="load_motion"><div class="dot_wrap"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="ball_wrap"><span class="ball"></span><span class="ball"></span><span class="ball"></span><span class="shadow"></span></div></div><div class="copy">3단계 중 <strong>2단계</strong> <br><strong>정보를 저장 중</strong>이에요.</div></div></div></div></div>';
			break;
		case 'loadingProduct_p3':
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap"><div class="inner"><div class="loading load_type2"><div class="load_motion"><div class="dot_wrap"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="ball_wrap"><span class="ball"></span><span class="ball"></span><span class="ball"></span><span class="shadow"></span></div></div><div class="copy">3단계 중 <strong>2단계</strong> <br><strong>정보를 저장 중</strong>이에요.</div></div></div></div></div>';
			break;
		case 'NB1':
			loadingHtml = '<div id="loading_area">';
			loadingHtml += '	<div class="loading_wrap">';
			loadingHtml += '		<section>';
			loadingHtml += '			<div class="loading_tit">고객님의 병원/약국의<br>의료내역을<br>조회하는 중 입니다.</div>';
			loadingHtml +=
				'			<div class="loading_area"><div class="loading_rel"><div class="item_reading"><img src="/resources/images/analysis/m.item_reading.png" alt="" /></div><div class="item_paper"><img src="/resources/images/analysis/m.bg_nolist.png" alt="" /></div></div></div>';
			loadingHtml += '			<div class="loading_list">';
			loadingHtml +=
				'				<style>#loading_na_1 {position:relative;}#loading_na_1 .swiper-wrapper {display:inline-block;width:99999%;height:100%;}#loading_na_1 .swiper-wrapper .swiper-slide {float:left;opacity:0;}</style>';
			loadingHtml += '				<div class="swiper_carousel" id="loading_na_1">';
			loadingHtml += '					<div class="swiper-wrapper">';
			loadingHtml +=
				'						<div class="swiper-slide item"><div class="loadaing_guide">국민건강보험공단에서<br>고객님의 의료내역을 조회하는<br>최대 3~4분 소요될 수 있습니다.</div></div>';
			loadingHtml +=
				'						<div class="swiper-slide item"><div class="loadaing_guide">조회된 의료내역을 통해<br>놓친 보험금을<br>고객이 직접 청구하실 수 있습니다.</div></div>';
			loadingHtml += '					</div>';
			loadingHtml += '					<div class="swiper-pagination"></div>';
			loadingHtml += '				</div>';
			loadingHtml += '			</div>';
			loadingHtml += '		</section>';
			loadingHtml += '	</div>';
			loadingHtml += '</div>';
			break;
		case 'NB2':
			loadingHtml = '<div id="loading_area">';
			loadingHtml += '	<div class="loading_wrap">';
			loadingHtml += '		<section>';
			loadingHtml += '			<div class="loading_tit">잠시만 기다려주세요</div>';
			loadingHtml += '			<div class="loading_area type">';
			loadingHtml += '				<div class="loading_rel">';
			loadingHtml += '					<div class="item_pencil"><img src="/resources/images/analysis/m.item_pencil.png" alt=""></div>';
			loadingHtml += '					<div class="item_paper2">';
			loadingHtml += '						<div class="line line1"></div>';
			loadingHtml += '						<div class="line line2"></div>';
			loadingHtml += '						<div class="line line3"><span></span></div>';
			loadingHtml += '						<div class="line line4"><span></span></div>';
			loadingHtml += '						<div class="line line5"><span></span></div>';
			loadingHtml += '						<div class="line line6"><span></span></div>';
			loadingHtml += '					</div>';
			loadingHtml += '				</div>';
			loadingHtml += '			</div>';
			loadingHtml += '			<div class="loading_list"><div class="loadaing_guide">고객님의 청구서를<br>생성 하는 중 입니다.</div></div>';
			loadingHtml += '		</section>';
			loadingHtml += '	</div>';
			loadingHtml += '</div>';
			break;
		// 2018-05-19 수정 | 장바구니 저장시 로딩 추가 -->
		case 'basket':
			loadingHtml =
				'<div id="loading_area"><div class="loading_wrap default"><div class="inner"><div class="loading"><div class="loading_basket"><i class="icon_basket"></i><span class="hidden">장바구니에 담는 중입니다.</span></div></div></div></div></div>';
			break;
	}

	$('body').append(loadingHtml);

	// S:: deafault Loading 로티에니매이션

	var iconMenu = document.querySelector('.loading_default');

	var animationMenu = bodymovin.loadAnimation({
		container: iconMenu,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: 'https://assets7.lottiefiles.com/packages/lf20_lnxyrt7i.json',
	});

	animationMenu.play();

	// E:: deafault Loading 로티에니매이션

	$('#loading_area').show();

	// loading swiper
	if (key == 'NA1') {
		var Swiper = require('swiper');
		var mySwiper = new Swiper($('#loading_na_1'), {
			pagination: {
				el: '#loading_na_1 .swiper-pagination',
			},
			autoplay: {
				delay: '4000',
			},
			loop: true,
		});
		$('#loading_na_1 .swiper-slide').css('opacity', 1);
	}
};

var fnLoading_Hide = function () {
	$('#loading_area').remove();
};

/* 360 플래닛 로딩 */
var fnLoading2_Show = function () {
	var loadingHtml2 =
		'<div id="loading_area" style="display:none"><div class="loading_position"><div class="box_loading01 type3"><div class="moction_circle"><span></span><img src="/resources/images/innovation/img_loadingtext.png" alt="360플래닛" width="152px" /></div></div></div><div class="loading_dim"></div></div>';
	$('body').append(loadingHtml2);
	$('#loading_area').show();
};

var fnLoading2_Hide = function () {
	$('#loading_area').hide();
};
