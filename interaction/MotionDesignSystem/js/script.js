document.addEventListener('DOMContentLoaded', function () {
	console.log('script.js started!');

	// GNB Slide Menu

	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, 'edge');

	$('#itrc_guide_btn').click(function () {
		$('.itrc_guide_menus').slideToggle();
		arrAnimation($(this));
	});

	$('.two-depth-list').click(function () {
		$(this).eq(0).siblings('.sub_list').slideToggle();
		arrAnimation($(this));
	});

	var arrAnimation = function (el) {
		el.find('.arr_expand').toggleClass('arr_up');
	};
});
