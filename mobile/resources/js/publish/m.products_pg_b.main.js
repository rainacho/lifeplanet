requirejs.config({
	baseUrl: './resources/js',
	paths: {
		fo: 'publish/m.jquery.fo',
		event: 'publish/m.Event',
		basicMotion: 'publish/m.BasicMotion',
		commonFn: 'publish/m.CommonFn',
		swiper_old: 'lib/idangerous.swiper.min',
		swiper: 'lib/swiper-4.1.0.min',
		swiperCarousel: 'publish/m.SwiperCarousel',
		design: 'publish/m.Design',
		productsGuide: 'publish/m.ProductsGuide',
	},
	// shim: {
	// 	swiperCarousel: {
	// 		deps: ['fo', 'event', 'basicMotion', 'commonFn', 'swiper'],
	// 		exports: 'swiperCarousel',
	// 	},
	// 	productsGuide: {
	// 		deps: ['fo', 'event', 'basicMotion', 'commonFn', 'swiper_old', 'swiperCarousel'],
	// 		exports: 'productsGuide',
	// 	},
	// },
});

requirejs(
	['fo', 'event', 'basicMotion', 'commonFn', 'swiper', 'swiperCarousel', 'productsGuide'],
	function (fo, event, basicMotion, commonFn, swiper, swiperCarousel, productsGuide) {
		//PAGE ON READY
		$(document).ready(function () {
			//jquery.fo Regist
			if (typeof Main != 'undefined') {
				// 초기화 이벤트 호출
				Main.readyEvent();

				//MXP deviceready 이벤트 호출
				MXP_PLUGIN.fireMXPNativeReadyEvent();
			}
		});
		window.fo = fo;
	}
);
