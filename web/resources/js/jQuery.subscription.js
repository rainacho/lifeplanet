/* 가입전 체크사항 버튼 */
var fnJoinBefore = function(){
	$(window).scroll(function(){
		if($(".header").attr('class').indexOf("_on") != -1){
			if($(window).scrollTop()>491){
				$(".box.type3 .btn_box").addClass("_fixed");
			}else{
				$(".box.type3 .btn_box").removeClass("_fixed");
			}
		}else{
			if($(window).scrollTop()>200){
				$(".box.type3 .btn_box").addClass("_fixed");
			}else{
				$(".box.type3 .btn_box").removeClass("_fixed");
			}
		}		
	});
};


$(function(){
	/**** 청약 ****/
	/*
	 * Part : [청약] - 도움말
	 * 2015.02.16 [애드캡슐 퍼블리싱 박현아]
	 */
	
	var $contInfo = $('.info_zip .cont_info'),
		$boxTits = $('.box > .area_r .tit_box'),
		$icoInfo;
	
	$(this).on('click', '.box_info .ico_info', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		
		var $this = $(this);
		
		boxInfo($this);

	}); // end click
	
	//2015.04.22 박현아 추가
	var winScrollT;
	
	var boxInfo = function($this){
		
		/* 2015.03.26 박현아 수정 */
		if($('#content').is('.hppa400s1')){
			var $this = $this.eq(0);
		}else{
			var $this = $this;
		}
		
		$icoInfo = $(document).find('.box_info .ico_info');
		
		try{
			
			var contId = $this.attr('href');
			
			var $thisParents = $this.parents('.box'),
				$titBox = $thisParents.find('> .area_r .tit_box');
			var thisOffsetT = $this.parent().offset().top,
				boxcolH = 0, //2015.04.10 수정
				moveBtnOffsetT,
				contIdH = $(contId).outerHeight(),
				moveBtnH = $thisParents.find('> .wrap_btn').outerHeight(),
				thisPosT,
				headOn = 0; // 2015.04.22 박현아 추가
			
			/** 2015.06.05 수정 #header => .header **/
			//헤더안의 내용이 보여줘서 높이값 변동이 있는지
			if($('.header').is('._on')){
				headOn = $('#header').outerHeight() - 69;
			}else{
				headOn = $('#header').outerHeight() - $('.header').outerHeight();
			}
			/***********************/
			
			if($('.content').find('>div:eq(0)').is('.box.col1')){
				boxcolH = $('.box.col1').eq(0).outerHeight();
			}else{
				boxcolH = $('.col1_list').outerHeight();
			}
			
			if($thisParents.find('div').is('.wrap_btn')){

				moveBtnOffsetT = $thisParents.find('> .wrap_btn').offset().top;
			}else{
				moveBtnOffsetT = thisOffsetT + $thisParents.outerHeight();
			}
			if($thisParents.outerHeight() > 350){
				if((thisOffsetT + contIdH + 43) > moveBtnOffsetT){
					
					thisPosT = moveBtnOffsetT - contIdH - moveBtnH - 16 - headOn; //2015.04.22 박현아 수정
					
				}else{
					if($thisParents.offset().top > (thisOffsetT - boxcolH)){
						if($this.parent().next().is('.list_que')){
							thisPosT = $this.position().top + $thisParents.offset().top - 36 - parseInt($this.parent().css('padding-top')) - headOn; //2015.04.22 박현아 수정
						}else{
							/** 2015.04.22 박현아 수정 **/
							thisPosT = $thisParents.offset().top - headOn - 43; //2015.04.22 박현아 수정
						}
					}else{
						if($this.parents('ul').is('.inner_list_que')){
							if(($thisParents.outerHeight()+$thisParents.offset().top-36-43) < (thisOffsetT - 129 + contIdH)){
								thisPosT = thisOffsetT - boxcolH - headOn; //2015.04.22 박현아 수정
							}else{
								thisPosT = thisOffsetT - 129 - headOn; //2015.04.22 박현아 수정
							}
						}else{
							if($this.parent().is('.type3')){
								thisPosT = thisOffsetT - 43 - headOn; //2015.04.22 박현아 수정
							}else{
								if($this.parents('ul').parent().is('.box_form, .form_body.type2')){									
									thisPosT = thisOffsetT - boxcolH - headOn;	 //2015.04.22 박현아 수정
								}else if(($thisParents.outerHeight()+$thisParents.offset().top-36-43) < (thisOffsetT - boxcolH - 43 + contIdH)){
									thisPosT = thisOffsetT - boxcolH - 43 - 36 - headOn; //2015.04.22 박현아 수정
								}else{
									thisPosT = thisOffsetT - boxcolH - 43 - headOn; //2015.04.22 박현아 수정
								}
							}
						}
					}
				}
			}else{
				thisPosT = thisOffsetT;
			}
			// 박스 활성화
			if(!$this.parents('.box.col2').is('_on')){
				$this.parents('.box.col2').addClass('_on');
			}
			
			if(!$this.is('._active')){
				// 도움말 아이콘 활성화
				$icoInfo.removeClass('_active');
				$this.addClass('_active');
				
				//화살표 아이콘 동적생성
				$icoInfo.parent().find('._bg_arrow').remove();
				$this.append('<span class="_bg_arrow"></span>');
				
				// 해당 도움말 활성화
				$contInfo.removeClass('_active').css('left', '460px');
				
				/**** 2015.04.22 박현아 수정 ****/
				if($('body').css('position') == 'fixed'){
					var bodyT = Number($('body').css('top'));
					$(contId).addClass('_active').css({'left': '715px', 'top': thisPosT-bodyT});
					$titBox.css('left', '255px').stop().animate({
						'left': '255px'
					});
				}else{
					$(contId).addClass('_active').css('top', thisPosT).stop().animate({
						'left': '715px'
					});
					$boxTits.stop().animate({
						'left': '0px'
					});
					$titBox.stop().animate({
						'left': '255px'
					});
				}
				/*************************/
				
				
				
			}else{
				
				/**** 2015.04.22 박현아 수정 ****/
				if($('body').css('position') == 'fixed'){
					$(contId).addClass('_active').css({'left': '715px', 'top': thisPosT+winScrollT});
					$titBox.css('left', '255px').stop().animate({
						'left': '255px'
					});
					
				}else{
					
					$(contId).addClass('_active').css('top', thisPosT);
				}
				/*************************/
			}
		}catch(err){
			$icoInfo.removeClass('_active');
			$icoInfo.parent().find('._bg_arrow').remove();
			$contInfo.removeClass('_active').css('left', '460px');
			$boxTits.stop().animate({
				'left': '0px'
			});
		}
		
	}; //end boxInfo function
	
	/**** 2015.04.22 박현아 수정 ****/
	jQuery.winScrollT = function(scrollTop){
		winScrollT = scrollTop;
	}
	/*************************/
	
	
	$(document).on('click focusin', function(e){
		var $target = $(e.target);
		$icoInfo = $(document).find('.box_info .ico_info');
		
		
		/* 2015.08.04
		 * 만약 도움말영역(청록색부분)에서 클릭,포커스인동작으로 뭔가를 하고자한다면,
		 * 해당 요소에 'btn_another_way'클래스를 추가할 것
		 */
		
		//2015.03.25 박현아 수정 
		if($target.is('span, a, button, input, label, select') && !$target.is('.btn_another_way')){ // 2015.08.04 수정
			if(!$target.is('.ico_info')){			
				if($target.parents('li').find('>div').is('.box_info')){
					if($target.parents('li').parent().is('.inner_list_que')){
						var $this = $target.parent('li').find('>.box_info .ico_info');
					}else if($target.parents('li').parent().is('.list_inner')){
						
						/****** begin 150914 수정******/
						if($target.parents('.list_sel3').length > 0){
							var $this = $target.parents('.list_sel3').parents('li').find('.box_info .ico_info');
						}else{
							$icoInfo.removeClass('_active');
							$icoInfo.parent().find('._bg_arrow').remove();
							$contInfo.removeClass('_active').css('left', '460px');
							$boxTits.stop().animate({
								'left': '0px'
							});
						}
						/****** end 150914 수정******/
						/* 151215 추가 */
					}else if($target.parents('li').is('.inner_info')){
						var $this = $target.parents('.inner_info').find('.box_info .ico_info');
					}	
					else{
						/* 2015.04.25 수정 */
						if($(document).find('.hppa400s1')){
							if($target.parent().parent().parent().parent().is('.form_body')){
								var $this = $target.parent().parent().find('>.box_info .ico_info');	
							}else{
								var $this = $target.parents('li').find('>.box_info .ico_info');			
							}
						
							
						}else{
							var $this = $target.parents('li').find('>.box_info .ico_info');	
						}
						/**************/
					}
					boxInfo($this);
				}else if($target.parents('.list_form.type2').parent('.form_top').find('>div').is('.box_info')){
					var $this = $target.parents('.list_form.type2').parent().find('.box_info .ico_info');
					boxInfo($this);
				}else if($target.parents('.list_form').prev().is('.box_info')){
					/* 2015.04.10 박현아 추가 */
					var $this = $target.parents('.list_form').prev().find('.ico_info');
					boxInfo($this);
				}else if($target.parents('div').is('.box_simplify')){//간소화 레이아웃 변경으로 인한 스크립트 추가
					var $this = $target.parents('.box_simplify').find('.box_info .ico_info');
					boxInfo($this);	
				}else{
					$icoInfo.removeClass('_active');
					$icoInfo.parent().find('._bg_arrow').remove();
					$contInfo.removeClass('_active').css('left', '460px');
					$boxTits.stop().animate({
						'left': '0px'
					});
				}
			}
			
		} // end fisrt lf문
	});
	
	
	
	/*
	 * Part : [청약] - 박스 버튼 이동
	 * 2015.02.23 [애드캡슐 퍼블리싱 박현아]
	 */
	var $boxCol2 = $('.box.col2'),
		$boxBtn = $boxCol2.find('.wrap_btn button');
	
	  $boxBtn.on('click', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		
		var $thisBox = $(this).parents('.box.col2'),
			boxOffsetT;
		var thisClass = $(this).attr('class');
		
		switch(thisClass){
			case 'btn_next' :
				boxOffsetT = $thisBox.next('.box.col2').offset().top;
				///////////////추가 정익재////////////
				$(".box.col2").removeClass("_on");
				$thisBox.next('.box.col2').addClass("_on");
				$(".icon_quick").removeClass("_on");
				var txt=$thisBox.next('.box.col2').find("div>h3").text();
				$.each($(".quick_m2"), function(idx, data){
					if($(this).find("span:eq(0)").text()==txt){
						$(this).find("span:eq(1)").addClass("_on");
					}
				});
				//////////////////////////////////////
				break;
			case 'btn_prev' :
				boxOffsetT = $thisBox.prev('.box.col2').offset().top;
				///////////////추가 정익재////////////
				$(".box.col2").removeClass("_on");
				$thisBox.prev('.box.col2').addClass("_on");
				$(".icon_quick").removeClass("_on");
				var txt=$thisBox.prev('.box.col2').find("div>h3").text();
				$.each($(".quick_m2"), function(idx, data){
					if($(this).find("span:eq(0)").text()==txt){
						$(this).find("span:eq(1)").addClass("_on");
					}
				});
				//////////////////////////////////////
				break;
		}
		
		$('body,html').stop().animate({scrollTop: boxOffsetT}, 500);
		
	});//end click
	
	
	/*
	 * Part : [청약] - 스텝 중앙정렬
	 * 2015.02.23 [애드캡슐 퍼블리싱 박현아]
	 */
	
	var $titPageStep = $('.tit_page .list_step'),
		$titPageStepLi = $titPageStep.find('li');
	
	var titPageStepLiW = 0;

	$titPageStepLi.each(function(){
		titPageStepLiW += $(this).outerWidth();
		
		return titPageStepLiW;
	});
	
	$titPageStep.css('width', titPageStepLiW+30);
	
	/*
	 * Part : [청약] - 헤드 상세내역, 마이플랜
	 * 2015.02.28 [애드캡슐 퍼블리싱 박현아]
	 */

	var $wrapHead = $('.wrap_head'),
	$btnHead = $wrapHead.find('.btn_arrow2'),
	$myPlane = $wrapHead.find('.wrap_subscription .tit'),
	$myPlaneList = $wrapHead.find('.wrap_subscription .wrap_menu'),
	headCss = '_active';

	
	$('.wrap_insurance_info').hide(); // 150729 추가
	// quickOffset --->>> cm.jqeury-1.8.3.js 에서  퀵네비 관련 추가
	$btnHead.on('click', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		/* 2015.06.05 수정 #heaer -> .header*/
		
		if(!$(this).is('._active')){
			$(this).addClass(headCss);
			
			if($('.header .inner').is('._type2')){
				$('.header').stop().animate({
					'height': '368px'
				},function(){
					if($('.quick_aside').length>0){
						quickOffset = $('.quick_aside').offset().top;	
					}
					
				}).addClass('_on');
				$('.wrap_insurance_info').addClass('_type2');
			}else if($('.header .inner').is('._type3')){//다건청약 조건 160504
				$('.header').stop().animate({
					'height': '429px'
				},function(){
					if($('.quick_aside').length>0){
						quickOffset = $('.quick_aside').offset().top;	
					}
				}).addClass('_on');
				$('.wrap_insurance_info').addClass('_type3');
			}else{				
				$('.header').stop().animate({
					'height': '323px'
				},function(){
					if($('.quick_aside').length>0){
						quickOffset = $('.quick_aside').offset().top;	
					}
				}).addClass('_on');
			}
			$('.wrap_insurance_info').show().addClass('_on'); // 150729 추가
		}else{
			$(this).removeClass(headCss);
			$('.header').stop().animate({
				'height': '72px'
			}, function(){
				/* 2015.03.22 추가 */
				if($('.header .inner').is('._type2')){
					$('.wrap_insurance_info').removeClass('_type2');
				}else if($('.header .inner').is('._type3')){//다건청약 조건 160504
					$('.wrap_insurance_info').removeClass('_type3');
				}
				$('.wrap_insurance_info').removeClass('_on').hide(); // 150729 추가
				if($('.quick_aside').length>0){
					quickOffset = $('.quick_aside').offset().top;	
				}
			}).removeClass('_on');
		}
		/*// 2015.06.05 수정 */
		$myPlane.removeClass(headCss);
		/*$myPlaneList.stop().animate({
			'height': 0
		});*/
		$myPlaneList.css('height', '0');
	});//end $btnHead click
	
	
	/*$myPlane.on('click', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var curHeight = $myPlaneList.height(),
			autoHeight = $myPlaneList.css('height','auto').outerHeight();
		
		if(!$(this).is('._active')){
			$(this).addClass(headCss);
			$myPlaneList.show().height(curHeight).animate({
				'height': autoHeight
			});
		}else{
			$(this).removeClass(headCss);
			$myPlaneList.stop().animate({
				'height': 0
			});
		}
	});*/
	
	
	// 2015.07.29 추가
	// 청약목록영역에서 포커스아웃되면 목록 사라지도록 함
	$(this).on('focusout','.wrap_subscription',function(e){
		$myPlane.removeClass(headCss);
		$myPlaneList.css('height', '0');
	});
	
	// 2015.07.29 추가
	// 헤더에서 설계보기영역이 포커스아웃되면 닫기버튼으로 이동하도록 함
	$(this).on('focusout','.wrap_insurance_info .insurance_info .btn_m.type2',function(e){
		$btnHead.focus();
	});
	
	
	/*
	 * Part : [청약] - 퀵메뉴 위치
	 * 2016.01.20 [애드캡슐 퍼블리싱 김혜련]
	 */
	var $wrapQuick= $('.wrap_quick');
	var quickMenu = function(){
		var scrollT = $(window).scrollTop();
		var standardPos = 107;
		
		if(!$wrapQuick.is('._on')){
			if (standardPos <= scrollT) {
				$wrapQuick.addClass('_active');
			} else {
				$wrapQuick.removeClass('_active');
				
			};
		}else{
			$wrapQuick.removeClass('_active');
		};
		
	};
	
	if($wrapQuick.is('.subscription_q')){
		$(window).scroll(function() {
			quickMenu();
		});
		quickMenu();
		$(window).resize(function(){ 
			quickMenu();
		});
	}
	
	
	
	
	
	
	 
	
	
/*	
	 * Part : 가입중단 예고, 가입중단
	 * 2015.03.19 [애드캡슐 퍼블리싱팀 박현아]
	 * 사용법 : $.stopInsurance('/products/pa/HPPA600S2.jsp #stopInsurance'); 불러올 페이지 주소값 + 해당영역 ID
	 * 		 $.stopInsurShowHide('false') 'false' || 'true' flase : 숨김, true : 보임
	 
	
	jQuery.stopInsurance = function(href){
		var $divStop = '<div class="stop_layer"></div>';
		
		$('body').append($divStop);
		$('.stop_layer').load(href);
	};
	
	jQuery.stopInsurShowHide = function(state){
		if(state == 'false'){
			$('.stop_layer').hide();
			$('body, html').attr('style','');
		}else{
			$('.stop_layer').show();
			$('body, html').css({'overflow' : 'hidden'});
		}
	};
	
	$.stopInsurance('/products/pa/HPPA600S2.jsp #stopInsurance');
	$.stopInsurShowHide('false') // 'false' || 'true'
*/	
	
	
	
	
});//end function