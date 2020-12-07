/* 하단 SNS 공유하기 레이어 팝업 */
$(function () {

	function init(){
		if(MXP_PLUGIN.getOSInfo().name == MXP_PLUGIN_CONST.ACCESS_PATH.APP_IOS){
			// ios 링크공유하기 오류로 인하여 카카오톡 임시 히든처리 200814
			$("[data-target-media=kakaotalk]").parent().remove();
		}
		snsShare();
	}

	var snsShare = function(){
		var target = $(".sns_share_wrap .sns_share_pop");
		var targetHeight = $(".sns_share_wrap .sns_share_pop").outerHeight();

		$(target).css("bottom", "-" + 350 + "px");
		
		$(document).on("click", ".btn_sns_share",function(e){
			$(target).addClass("on").animate({"bottom" : "0px"}, 300, "easeInCubic");
			$("#sns_share").css("position","fixed");
			$("body , .wrap, #wrap").css("overflow","hidden");
			pageDimOn();
			e.preventDefault();

			if($(".btn_sns_share").hasClass("btn_sns_result")){
				$(".share_dim").css("position","fixed");
			} else {
				$(".share_dim").css("position","absolute");
			}
		});

		$(document).on("click", ".btn_sns_share_close",function(e){
			targetHeight = $(".sns_share_wrap .sns_share_pop").outerHeight();
			$(target).removeClass("on").animate({"bottom" : "-" + targetHeight + "px"}, 300, "easeInCubic");
			$("#sns_share").css("position","fixed");
			$(".share_dim").css("position","fixed");
			$("body , .wrap, #wrap").css("overflow","auto");
			pageDimOff();
			e.preventDefault();
		});

	};
	
	var pageDimOn = function(){
		$(".share_dim").addClass("on");
	}

	var pageDimOff = function(){
		$(".share_dim").removeClass("on");
	}	

	init();
	
	return init;

});