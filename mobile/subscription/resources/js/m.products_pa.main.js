requirejs.config({
	baseUrl: 'resources/js',
	// urlArgs: 'v='+cacheJS,
	paths: {
		fo: 'publish/m.jquery.fo',
		event: 'publish/m.Event',
		basicMotion: 'publish/m.BasicMotion',
		commonFn: 'publish/m.CommonFn',
		swiper_old: 'lib/idangerous.swiper.min',
		swiper: 'lib/swiper-4.1.0.min',
		/*'picker': 'publish/m.Picker',*/
		swiperCarousel: 'publish/m.SwiperCarousel',
		subscription: 'publish/m.Subscription',
	},
	shim: {
		subscription: {
			deps: ['fo', 'event', 'basicMotion', 'commonFn', 'swiper_old', 'swiperCarousel'],
			exports: 'subscription',
		},
	},
});

requirejs(['fo', 'event', 'basicMotion', 'commonFn', 'subscription'], function (fo, event, basicMotion, commonFn, subscription) {
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
});
