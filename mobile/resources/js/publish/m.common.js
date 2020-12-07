/* chatBot
챗봇 버튼 관련 설정
*/




  $(document).ready(function() {

	var btnTalkRight = ""; //상담톡 버튼 추가 append
    btnTalkRight += '<a href="javascript:;" data-dupid="kabotOn"  class="btn_talk"><span class="hidden">챗봇</span></a>';
    $('.content').append(btnTalkRight);


    $('[data-dupid=kabotOn]').off('click').on('click', function () {

    	webLog.runGAQ('앙봇_하단공통', '버튼클릭', '상담');
    	var option = {
    			location : 'browserPopUp',
    			url : 'http://pf.kakao.com/_zxjPxexh/chat'
    		};
		PageUtil.openPopup(option);
	});

    var userInfo2 = navigator.userAgent.toUpperCase();
    if(userInfo2.match(/NAVER/)){
    	$('body').addClass('naverApp');
		}else if(userInfo2.match(/DAUMAPPS/)){
			$('body').addClass('daumApp');
		}else if(userInfo2.match(/NATE_APP/)){
			$('body').addClass('nateApp');
		}
    else{

		}

    // 하단 고정바가 있을 경우
    if($('.btn_fix, .premium_check_wrap, .subscription_progress, .ca_btn_positioning, .progress_confirm, .authorization_progress').is(":visible")){
    	$('.btn_talk').addClass('_up');
    }

    // 하단 고정바가 있고, Top 버튼이 있는 경우
    if($('.quick_wrap.over').length > 0){
    }

    // 청약페이지일 경우
    if($('.subscription_inner, .PA').length > 0){
    	$('.btn_talk').hide();
    }else if(location.pathname.indexOf('/common/ca/') > -1){
    	 if(location.pathname.indexOf('/CA01000S') < 0 && location.pathname.indexOf('/CA01001S') < 0){
    		 $('.btn_talk').hide();
    	 }
    }
    
	// 상품안내 띠배너
  	$(".ad_banner").on("click", ".close" ,function(){
  		$(this).closest(".ad_banner").slideUp(500, "easeOutCubic"); // 181130 수정
  	});
  	
  	
	$("[class*='accordion_'] .accor_tit").off("click").on("click",function(e){
		if(!$(e.target).hasClass("accor_tit")) return;

		var _this = $(this);
		var accordion = $(_this).closest("[class*='accordion_type']");
		var contH = $(accordion).find(".accor_cont .inner").outerHeight();

		if($(accordion).hasClass("on")){
			$(accordion).removeClass("on").find(".accor_cont").stop().animate({"height" : "0px"}, 400, "swing");
		} else {
			$(accordion).addClass("on").find(".accor_cont").stop().animate({"height" : contH + "px"}, 400, "swing");
		};
		e.preventDefault();
	});



} );
//

