$(function(){
	/*
	 * Part: 보험상품안내
	 * 2015.04.06 [애드캡슐 퍼블리싱 박현아]
	 * 첫번째 상품의 컨텐츠 보여주기
	 * 액션은 cm.jQuery-1.8.3.js Part : 상품안내 슬라이드 참조
	 */
	var $listProducts = $('.list_products_n'), //2016 파일이관 수정
		$listProductsLi = $listProducts.find('>li'),
		$listProductsA = $listProductsLi.find('>a'),
		$listProductsLiOn = $listProductsLi.filter('._on'),
		indexProductsLiOn = $listProductsLiOn.index();
	var $boxAdvantage = $('.box_advantage');
	
	$boxAdvantage.not(':eq(' + indexProductsLiOn + ')').hide();

	
	/*
	 * Part: 이벤트
	 * 2015.04.06 [애드캡슐 퍼블리싱 박현아]
	 * 재생 - eventVisualStart()
	 * 정지 - eventVisualStop()
	 * 이벤트함수 - eventVisualMove()
	 * 플러그인화 되어 있으므로 $.eventFn() 함수로 실행시켜야 함 
	 * 
	 */
	jQuery.eventFn = function(){
		
		var $listEvent = $('.list_event'),
			$listEventLi = $listEvent.find('li'),
			$listEventLiOn = $listEventLi.filter('._on'),
			indexEventLiOn = $listEventLiOn.index(),
			listEventLiLen = $listEventLi.length;
			
		var $eventBtn = $('.event_btn');
		var eventBtnLst = "";
		
		var nowBtnIndex = 0;
		var eventVisualTimer = 0;
		
		if(listEventLiLen>1){
			
			eventBtnLst += '<ul class="event_index">'
				for(i=1; i<=listEventLiLen; i++){
					eventBtnLst += '<li><a href="#"><span class="blind">'+i+'번째 배너</span></a></li>'
				}
			eventBtnLst += '</ul>'
				$eventBtn.append(eventBtnLst);
			$eventBtn.find('.event_index>li').eq(0).addClass('_on'); //161004 수정
			$listEventLi.not(':eq(0)').hide();
		}
		
		
		
		var $eventBtnLi = $('.event_index li');
		
		$(document).on('click', '.event_index li a', function(event){
			//p$listEventLirevent default action (hyperlink)
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			
			$.eventClick($(this));
			
		}); //end click
		
		jQuery.eventClick = function($this){
			$parent = $this.parent(),
			index = $parent.index();
			
			if(!$parent.is('._on')){
				$eventBtnLi.removeClass('_on');
				$parent.addClass('_on');
				
				$listEventLi.stop().animate({
					'opacity':0
				}, 800, function(){
					$(this).hide();
				});
				$listEventLi.find('img').stop().animate({
					'opacity':0
				}, 800);
				
				$listEventLi.eq(index).css('opacity', 0).show().stop().animate({
					'opacity':1
				}, 1600);
				
				$listEventLi.eq(index).find('img').css('opacity', 0).show().stop().animate({
					'opacity':1
				}, 1600);
			}
			nowBtnIndex = index;
		};
		
		/***** Button to pause playback *****/
		var $btnPause = $('.btn_play');
		
		$btnPause.on('click', function(){
			if($(this).hasClass('_pause')){
				$(this).find('span').html('재생');
				$(this).removeClass('_pause');
				eventVisualStop();
			}else{
				$(this).find('span').html('일시 정지');
				$(this).addClass('_pause');
				eventVisualStart();
			} //end if
			return false;
		}); //end click
		
		function eventVisualMove(){
			var nextVisualIndex = nowBtnIndex + 1;
			if (nextVisualIndex >= listEventLiLen) {
				nextVisualIndex = 0;
			} //end if
			$.eventClick($('.event_index li').eq(nextVisualIndex).find('a'));
		};
		
		function eventVisualStart(){
			if (eventVisualTimer == 0) {
				oneVisualTimer=setTimeout(eventVisualMove, 3000); //170922 속도 제어
				eventVisualTimer = setInterval(eventVisualMove, 8000); //160705 속도 제어
			}
		};
		
		function eventVisualStop(){
			if (eventVisualTimer != 0) {
				clearTimeout(oneVisualTimer);
				clearInterval(eventVisualTimer);
				eventVisualTimer = 0;
			}//end if
		}
		
		eventVisualStart();
		
		// 메인 배너가 2개이상일때 스타트
		if (listEventLiLen > 1) {
			eventVisualStart();
		}else {
			$('.btn_play').hide();
			eventVisualStop();
			$listEventLi.eq(0).find('img').css('opacity', 1);
		}
	 
		
		$(document).on('mouseenter', '.event_index li a', function(){
			eventVisualStop();
		});//end mouseenter
		
		$(document).on('mouseleave', '.event_index li a',  function(){
			if($btnPause.is('._pause')){
				eventVisualStart();
			}
		}); //end mouseleave
		
		$(document).on('focus', '.event_index li a', function(){
			eventVisualStop();
		});//end mouseenter
	}
	
	$.eventFn();

	
	/*
	 * Part: 서비스안내 슬라이드
	 * 2015.04.07 [애드캡슐 퍼블리싱 박현아]
	 * 이전, 다음 버튼 동적으로 생성
	 * 
	 */
	
	var $listService = $('.list_service'),
		$listServiceLi = $listService.find('>li'),
		listServiceLen = $listServiceLi.length;
	
	var $serviceSlideBtn = $('.service_btn'),
		$serviceBtnPrev = '<button class="prev"><span class="blind">이전</span></button>',
		$serviceBtnNext = '<button class="next"><span class="blind">다음</span></button>',
		$serviceSpanPrev = '<span class="prev"><span class="blind">이전</span></span>',
		$serviceSpanNext = '<span class="next"><span class="blind">다음</span></span>';
	
	var currentService = 0,
		stateService = false;
	
	if(listServiceLen>1){
		$serviceSlideBtn.append($serviceSpanPrev, $serviceBtnNext);
	}
	
	$(this).on('click', '.service_btn .next', function(event){
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		
		if(currentService < listServiceLen){
			currentService++;
			if(stateService == false){
				$serviceSlideBtn.find('span.prev').remove();
				$serviceSlideBtn.append($serviceBtnPrev);
				stateService = true;
			}
			
			$listServiceLi.eq(currentService-1).stop().animate({
				'left': '-100%'
			}, 500, function(){
				$(this).css('left', '100%')
			});
			
			$listServiceLi.eq(currentService).stop().animate({
				'left': '0'
			}, 500);
			
			if(currentService == (listServiceLen-1)){
				$(this).remove();
				$serviceSlideBtn.append($serviceSpanNext);
				$serviceSlideBtn.find('.prev').focus();
			}
		}
		
	});
	
	$(this).on('click', '.service_btn .prev', function(event){
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		
		if(currentService > 0){
			currentService--;
			
			if(stateService == true){
				//2015.04.20 박현아 수정
				$serviceSlideBtn.find('.next').remove();
				$serviceSlideBtn.append($serviceBtnNext);
				stateService = false;
			}
			$listServiceLi.eq(currentService+1).stop().animate({
				'left': '100%'
			}, 500);
			
			$listServiceLi.eq(currentService).css('left', '-100%').stop().animate({
				'left': '0'
			}, 500);
			
			if(currentService == 0){
				$(this).remove();
				$serviceSlideBtn.append($serviceSpanPrev);
				$serviceSlideBtn.find('.next').focus();
			}
		}
		
	});
	
	
	/*
	 * Part: 가입후기 슬라이드
	 * 2015.04.07 [애드캡슐 퍼블리싱 박현아]
	 * json 방식으로 이용한 데이터 생성
	 */

	jQuery.reviewSlide = function(data){
		
		var $reviewArea = $('.review_area');
		var listReview = '<ul class="list_review"></ul>',
			listReviewLi = '';
		var num = 0;
		
		var $reviewSlideBtn = $('.review_btn'),
			$reviewBtnPrev = '<button class="prev"><span class="blind">이전</span></button>',
			$reviewBtnNext = '<button class="next"><span class="blind">다음</span></button>',
			$reviewSpanPrev = '<span class="prev"><span class="blind">이전</span></span>',
			$reviewSpanNext = '<span class="next"><span class="blind">다음</span></span>';
			

		for(k = num; k<= num; k++){
			for (i=0; i<3; i++){
				//191101 수정 (시작)
				listReviewLi += '<li>';
				listReviewLi += '	<strong class="tit">'+data[num][i].tit+' <span>/ '+data[num][i].division+'</span></strong>'; //170410 수정
				listReviewLi += '	<div class="desc"><a href="/innovation/ip/HPIP101S1.jsp" target="_blank">'+data[num][i].desc+'</a></div>';
				listReviewLi += '	    <div class="addition">';
				listReviewLi += '		<div class="info_addition">';
				listReviewLi += '			<div class="area_count">평점<span class="num">'+data[num][i].count+'</span></div>';
				listReviewLi += '			<strong class="name">'+data[num][i].name +' / '+data[num][i].age+'세 / '+data[num][i].gender+'<span class="date">'+data[num][i].date+'</span></strong>';
				listReviewLi += '		</div>';
				listReviewLi += '	</div>';
				listReviewLi += '</li>';
				//191101 수정 (끝)
			}
		}
		
/**  2015.05.19 김혜련 수정 시작**/
		
		$reviewArea.append(listReview);
		$reviewArea.find('.list_review').append(listReviewLi);
		
		var $listReview = $reviewArea.find('.list_review'),
			$listReviewLI = $listReview.find('>li'),
			listReviewLiW = $listReviewLI.outerWidth(true),
			listReviewLiLen = $listReviewLI.length;
		
		$listReview.css('width', (listReviewLiW*listReviewLiLen));
		
		$reviewSlideBtn.append($reviewSpanPrev, $reviewBtnNext);
		
		var currentNum = 0;
		var listReviewPosL = 0;
		
		$(document).on('click', '.review_btn .next',function(event){
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			
			if(currentNum < listReviewLiLen){
				currentNum++;
				
				if(currentNum == 1){
					$reviewSlideBtn.find('.prev').remove();
					$reviewSlideBtn.append($reviewBtnPrev);
				}
				if(currentNum >= 1){
					$reviewArea.find('.list_review').append(listReviewLi);
					
					$listReviewLi = $listReview.find('>li');
					listReviewLiLen = $listReviewLi.length;
					$listReview.css('width', (listReviewLiW*listReviewLiLen));
					
					$listReview.stop().animate({left: - 999 * currentNum}); //160909 수정 (161006 반영 예정)
					
				}
				
			}
		}); //end click next
		
		$(document).on('click', '.review_btn .prev',function(event){
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if(currentNum > 0){
				currentNum--;
				
				if(currentNum == 0){
					$reviewSlideBtn.find('.prev').remove();
					$reviewSlideBtn.append($reviewSpanPrev);
				}
				
				$listReview.stop().animate({left: - 999 * currentNum}); //160909 수정 (161006 반영 예정)
			}
		}); //end click prev
		
		/**  2015.05.19 김혜련 수정 끝**/

		//170306 삭제
		
		/** 2015.04.13 박현아 수정 **/
		$(document).on('mouseenter', '.list_review li', function(){
			$('.list_review li').removeClass('_on');
			$(this).addClass('_on');
		});
		
		$(document).on('mouseleave', '.list_review li', function(){
			$('.list_review li').removeClass('_on');
			// 2015.05.19 김혜련 삭제
		});
		/***********************/
		
	}; //end reviewSlide
	
	/*
	 * Part: 동영상 위치
	 * 2015.04.20 [애드캡슐 퍼블리싱 박현아]
	 * 해상도에 따른 원하는 화면 위치 설정 - 1024*768, 1280*1024, 1366*768, 1600*900, 1680*1050, 1920*1080
	 * 화면 위치 - 동영상내의 왼쪽 하단 고객센터 문구와 오른쪽 상단 행복하세요 푯말이 화면에 위치해야함. 화면에서 행복하세요 문구가 짤리지 않는 범위로 설정
	 */
	

	jQuery.videoPosFn = function(ratio){
		var $boxCsVideo = $('.box_cs .video'),
			boxCsVideoW = $boxCsVideo.outerWidth(),
			boxCsVideoH = 0;
		var winW = $(window).outerWidth();
		var videoBottom = 0;
		var bottomPos = 0;
		var intRatio = 0;
		
		if(ratio == 'true'){
			if(winW <= 1366){
				intRatio = 2.04;
			}else if(winW > 1366 && winW <= 1680){
				intRatio = 2.05;
			}else{
				intRatio = 2.09;
			}
			videoBottom = boxCsVideoW/intRatio;
			boxCsVideoH = $boxCsVideo.outerHeight();
		}else{
			/* 2015.04.24 박현아 수정 */
			if(winW <= 1366){
				intRatio = 2.2;
			}else if(winW > 1366 && winW <= 1680){
				intRatio = 2.5;
			}else{
				intRatio = 2.9;
			}
			/*********************/
			videoBottom = boxCsVideoW/intRatio;
			boxCsVideoH = $boxCsVideo.outerHeight()+70;
		}
		
		$boxCsVideo.css('bottom', -(boxCsVideoH-videoBottom));
	}
	$.videoPosFn('false');
	
	
	
	
	/*
	 * Part: 동영상 스크롤위치를 통해 재생하는 함수
	 * 2015.04.24 [애드캡슐 퍼블리싱 박현아]
	 */
	
	var $window = $(window),
		$document = $(document),
		$video = $('.cont.box_cs'),
		windowHeight = $window.height(),
		fixedWrapper = $video,
		currentTop = null,
		videoEnd = null,
		scrollT;
	var mVideo = document.getElementById("mianVideo"); 
	
	var scrollerVideo = function() {
		try{
			scrollT = $window.scrollTop();
			
			var documentHeight = $document.height(),
				elementTop = fixedWrapper.offset().top,
				dwh = documentHeight - windowHeight,
				extra = (scrollT > dwh) ? dwh - scrollT : 0,
				etse = elementTop - extra,
				newT = -( (documentHeight-elementTop)  - extra),
				extract = dwh - scrollT;
			
			if(mVideo.ended == false){
				if(scrollT >= (dwh+newT+$video.outerHeight())){
					if(currentTop == null){
						mVideo.play();
						currentTop = 0;
					}
				}else{
					mVideo.pause();
					currentTop = null;
				}
			}
			
		}catch(err){
			
		}
		
	 }
	
	
	$(window).scroll(function() {
		//동영상 재생
		scrollerVideo();
		
	});
	
	
	// 151211 추가
	
	award(); // 151211 추가
	
	$(window).resize(function(){
		// 웹어워드 로고 위치
		award();// 151211 수정
		//동영상 위치조정
		$.videoPosFn('true');
		// 동영상 재생
		scrollerVideo();
	});
	
	/*
	* Part : [메인]상단 보험료계산부분
	* 2015.08.11 [애드캡슐 퍼블리싱 김태은]
	* 퍼블에서만 사용, 보험선택에 따라 해당 폼요소 노출
	*/	
	var mainInsuCalc = function(){
	    var $form = $('#insuCalc');
	    var $formList = $form.children();
	    var $birthDay = $formList.eq(1),
	      	$gender = $formList.eq(2),
	      	$smoke = $formList.eq(3),
	      	$children = $formList.eq(4),
	      	$childBirthDay = $formList.eq(5),
	      	$childGender = $formList.eq(6);
	
	    $children.add($childBirthDay).add($childGender).hide();                  
	    reSizeForm();
	    // 정기 Preferred 추가, 160516 추가 
	    var box_check_pre = function(){ // 정기 Preferred 추가, 160516 추가 
	    	 if($('.btn_smoke_none').hasClass('_checked')){
    	    	$('.box_check_pre').show();
    	    	reSizeForm();
    	    }else if($('.box_smoke_none .left').hasClass('_checked')){
    	    	$('.box_check_pre').hide();
    	    	reSizeForm();
    	    }
	    }
	    var box_check_preNone = function(){ // 정기 Preferred 추가, 160516 추가 
	    	$('.box_smoke_none .box_check_pre').hide();	
	    }    	  
	
	    $('#choiceInsu').on('change', function(){
	        var insuValue = $('#choiceInsu').val();
	        $formList.not(':first').hide();
	        switch(insuValue){
	        	case '10001' : 
	                $birthDay.add($gender).add($smoke).show();	 
	                $smoke.addClass('box_smoke_none');
	                $('.form_calc.type2').find('span').addClass('btn_smoke_none');
	                $('.form_calc.type2').find('span.left').removeClass('btn_smoke_none');	        	    
	        	    $(document).on('click', '.box_smoke_none span', function(){
	        	    	box_check_pre();
	        	    });
	        	    box_check_pre();
            	break;
	            case '10003' : // 연금
	            case '10048' : // 연금
	            case '10004' : // 연금저축 
	            case '10047' : // 연금저축 
		        case '10005' : // 저축
	            case '10010' : // 상해
	                $birthDay.add($gender).show();  
	            	box_check_preNone();
	                break;
	            case '10006' : // 플러스어린이
	                $birthDay.add($gender).add($children).add($childBirthDay).add($childGender).show();
                    // $('.cont.cont01').css({"overflow":"visible","height":"510px"}).next().css("overflow","visible");  
	            	box_check_preNone();
	                break;
	            case '10007' : // 에듀케어저축
	                $birthDay.add($gender).add($childBirthDay).add($childGender).show();  
	            	box_check_preNone();
	                break;
	            default : // 기본 | 종신
	                $birthDay.add($gender).add($smoke).show();	  
	            	box_check_preNone();
	                break;
	        }
	        reSizeForm();
    	    // 정기 Preferred 추가, 160516 수정
	    });
	
	    $children.add($childBirthDay).add($childGender).hide();                  
	    reSizeForm();
	
	    function reSizeForm(){
	        var $parent = $form.parents('div.inner_box');
	        var newHeight = $parent.outerHeight();
	        $parent.prev().css("height",newHeight).parent().css("height",newHeight);//150819 수정
	    }	   
	}(); //end mainInsuCalc
	
});

// 151211 추가
var award = function(){
	var $webaward = $('.webaward');
	var winWidth = $(window).width();
	
	if(winWidth <= 1100){
		$webaward.hide();
	}else{
		$webaward.show();
	}
	
};
// 151211 추가

//160919 수정 (시작)
/* 메인 소팅 모션 */
var fnSorting = function(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20){

	var $showItem = new Array(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20);
	var $showTotal = 0;
	for(s=0;s<=19;s++){
		if($showItem[s] == null){
			$showTotal = s;
			break;
		}
	}
	var $widthNum = new Array(0,332,664);
	var $heightNum = new Array(0,0,0);
	var $max = $heightNum[0];
	var $minNum =0;
	var $leftNum = 0;
	var $topNum = 0;
	var $feedArea = $(".con_sorting .sorting_area");  
	var $item = $(".con_sorting .sorting_area .sorting_item");
	var $itemTotal = $item.length;
	var sUserAgent = navigator.userAgent;	
	
	$(".con_sorting .sorting_area .sorting_item").removeClass("active");
	for(j=0;j<=$showTotal;j++){
		$('.con_sorting .sorting_area .sorting_item[class*="sitem"][data-key="' + $showItem[j] + '"]').addClass("active"); //이것도
	}
	$(".con_sorting .sorting_area .sorting_item:not(.active)").hide();
	$(".con_sorting .sorting_area .sorting_item.active").show();
	
	function stylefeedFn(SN,LN){
		for(var n=SN; n<=LN; n++){
			var $min = $heightNum[0];
			for(var a=0; a<$heightNum.length; a++){
				if($min > $heightNum[a]){
					$min = $heightNum[a];
				};
			};
			for(var b=0; b<$heightNum.length; b++){
				if($min == $heightNum[b]){
					$minNum = b;
					break;
				};
			};


			$('.con_sorting .sorting_area .sorting_item[class*="sitem"][data-key="' + $showItem[n] + '"]')
			.stop().animate({
				top: $heightNum[$minNum],
				left: $widthNum[$minNum]
			},800,"easeOutExpo");

			$feedArea.stop().animate({
				height : $max + 'px'
			},800,"easeOutExpo");

			$heightNum[$minNum] = $heightNum[$minNum] + $('.con_sorting .sorting_area .sorting_item[class*="sitem"][data-key="' + $showItem[n] + '"]').height()+16;
			for(var i=0; i<$heightNum.length; i++){
				if($max < $heightNum[i]){
					$max = $heightNum[i];
				};
			};			

		};

	};

	var fNum = 0;
	var lNum = $showTotal;
	stylefeedFn(fNum,lNum);		

}

/* 탭 링크 디자인 */
var fnTabActive = function(){
	var tabLink = $(".tab_sorting a");
	tabLink.on("click",function(){
		tabLink.parent().removeClass("active");
		$(this).parent().addClass("active");
	});
}

/* 메인 비주얼 모션 */
var fnMainVisual = function(index){
	
	function aniBox(){//공시이율
		$(".title .ani_item .box .box_item_s").animate({top:"-30px",opacity:"0"},800,function(){
			$(".title .ani_item .box .box_item_s").css({top:"0px",opacity:"1"});
			aniBox();
		});
	};
	aniBox();
	var ingItem=index;
	var navLink = $(".main_visual_nav li.navigation a");
	$(".main_visual_right li.acn"+ingItem).fadeIn();

	//왼쪽 비주얼 영역
	function pageMove(n){
		$(".main_visual_left").find(".ani_item").fadeOut();
		$(".main_visual_left .isa"+n).find(".ani_item").stop().show();
		$(".main_visual_right li.acn"+ingItem).fadeOut();
		$(".main_visual_left .isa"+ingItem).stop().animate({
			top: "100%"
		},400,"easeInOutExpo",function(){
			$(this).hide();
		});
		$(".main_visual_left .isa"+n).stop().css({top:"-100%"}).show().animate({
			top: "0%"
		},400,"easeInOutExpo",function(){
			$(".main_visual_right li.acn"+n).fadeIn();
			switch(ingItem){
				case 0: animation0_reset(); break;
				case 1: animation1_reset(); break;
				case 2: animation2_reset(); break;
				case 3: animation3_reset(); break;
				case 4: animation4_reset(); break;
				case 5: animation5_reset(); break;
				case 6: animation6_reset(); break;
				case 7: animation7_reset(); break;
				case 8: animation8_reset(); break;
				case 9: animation9_reset(); break;
				case 10: animation10_reset(); break;
//				case 11: animation11_reset(); break;
				case 12: animation12_reset(); break;
				case 13: animation13_reset(); break;
				case 14: animation14_reset(); break;
				case 15: animation15_reset(); break;
				case 16: animation16_reset(); break;
			}
			switch(n){
				case 0: animation0(); break;
				case 1: animation1(); break;
				case 2: animation2(); break;
				case 3: animation3(); break;
				case 4: animation4(); break;
				case 5: animation5(); break;
				case 6: animation6(); break;
				case 7: animation7(); break;
				case 8: animation8(); break;
				case 9: animation9(); break;
				case 10: animation10(); break;
//				case 11: animation11_reset(); break;
				case 12: animation12(); break;
				case 13: animation13(); break;
				case 14: animation14(); break; // 191115 추가
				case 15: animation15(); break;
				case 16: animation16(); break;
			}
		});
		ingItem = n;			
	}

	//오른쪽 비주얼 영역
	//정기보험
	function animation0(){
		$(".main_01 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_01 .flip_box").stop().show().animate({top:"122px"},800,"easeOutBack",function(){
				animation0_2();
				animation0_3();
			});
			$(".main_01 .time_line_box").stop().show().animate({top:"262px"},800,"easeOutBack");
		});	
	}
	function animation0_2(){
		var $seat10 = $(".main_01 .seat10");
		var $seat1 = $(".main_01 .seat1");
		var $seat01 = $(".main_01 .seat01");
		var $tipBox = $(".main_01 .tip_box");
		var $dot = $(".main_01 .item_dot");
		var $overBox = $(".main_01 .box_over");
		var $seatNum = $(".main_01 .data_num");
		var valueNum = 100;
		var goalNum = 178; //190225 수정
		var interval = 12;
		
		function flipNum(n10,n1,n01){
			for(i=0; i<=9;i++){
				$seat10.removeClass("num"+i);	
				$seat1.removeClass("num"+i);	
				$seat01.removeClass("num"+i);	
			}
			$seat10.addClass("num"+n10);
			$seat1.addClass("num"+n1);
			$seat01.addClass("num"+n01);
			$seatNum.text(n10+n1+"."+n01);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSet=setTimeout(flip,100)
			}			
		}
		var valueSet=setTimeout(flip,100);
		
		$overBox.stop().animate({top:"-142px"},800); //161005 수정


		function flip_revers(){
			if(valueNum <= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum -= interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSetR=setTimeout(flip_revers,100)
			}			
		}
		var valueSetR;

		$(".main_01 .time_line_box .btn_list a").off("click").on("click",function(){
			switch($(this).parent().index()){
				case 0: 
					$dot.stop().animate({left:"-14px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 178; //190225 수정
					interval = 12;
					$overBox.stop().animate({top:"-142px"},1500); //161005 수정
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 1: 
					$dot.stop().animate({left:"65px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 318; //190225 수정
					interval = 12;
					$overBox.stop().animate({top:"-128px"},1500); //161005 수정
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 2: 
					$dot.stop().animate({left:"154px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 390;  //190225 수정
					interval = 12;
					$overBox.stop().animate({top:"-123px"},1500); //161005 수정
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 3: 
					$dot.stop().animate({left:"233px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 536; //190225 수정
					interval = 12;
					$overBox.stop().animate({top:"-112px"},1500); //161005 수정
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
			}	
		});

	}
	function animation0_3(){
		$(".main_01 .tip_text").show().animate({left:"0px"});
	}
	function animation0_reset(){
		var $seat10 = $(".main_01 .seat10");
		var $seat1 = $(".main_01 .seat1");
		var $seat01 = $(".main_01 .seat01");
		var $tipBox = $(".main_01 .tip_box");
		var $dot = $(".main_01 .item_dot");
		var $overBox = $(".main_01 .box_over");
		var $seatNum = $(".main_01 .data_num");
		var valueNum = 100;
		var goalNum = 178;
		var interval = 12;

		$(".main_01 .text_box01").css({left:"100px"}).hide();
		$(".main_01 .flip_box").stop().css({top:"165px"}).hide();
		$(".main_01 .time_line_box").stop().animate({top:"242px"}).hide();
		for(i=0; i<=9;i++){
			$seat10.removeClass("num"+i);	
			$seat1.removeClass("num"+i);	
			$seat01.removeClass("num"+i);
		}
		$seat10.addClass("num1");
		$seat1.addClass("num0");
		$seat01.addClass("num0");
		$seatNum.text("10.0")
		$(".main_01 .tip_text").stop().css({left:"30px"}).hide();
		$dot.stop().css({left:"-14px"});
		$overBox.stop().css({top:"-170px"});
		$tipBox.stop().hide();
	}
	/* *******************************************************************************************************/
	//종신보험
	function animation1(){
		$(".acn1 .title_copy").show().animate({left:"20px"},400,"easeOutBounce",function(){animation1_2();});	
	}
	function animation1_2(){
		$(".acn1 .motion1").show().animate({top: "60px"},800,"easeOutBack");
		$(".acn1 .motion2").delay(100).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn1 .motion3").delay(200).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn1 .motion4").delay(300).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn1 .motion5").delay(400).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn1 .motion6").delay(500).show().animate({top: "60px"},800,"easeOutBack",function(){animation1_3();});
	}
	function animation1_3(){
		$(".acn1 .tip_text").show().animate({left:"20px"});
	}
	function animation1_reset(){
		$(".acn1 .title_copy").stop().css({left:"60px"}).hide();
		$(".acn1 .motion1").stop().css({top: "20px"}).hide();
		$(".acn1 .motion2").stop().css({top: "100px"}).hide();
		$(".acn1 .motion3").stop().css({top: "20px"}).hide();
		$(".acn1 .motion4").stop().css({top: "100px"}).hide();
		$(".acn1 .motion5").stop().css({top: "20px"}).hide();
		$(".acn1 .motion6").stop().css({top: "100px"}).hide();
		$(".acn1 .tip_text").stop().css({left:"60px"}).hide();
	}
	//암보험
	function animation2(){
		$(".main_03 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_03 .flip_box").stop().show().animate({top:"145px"},800,"easeOutBack",function(){
				animation2_2();
				animation2_3();
			});
			$(".main_03 .time_line_box").stop().show().animate({top:"262px"},800,"easeOutBack");
		});	
	}
	function animation2_2(){
		var $seat10 = $(".main_03 .seat10");
		var $seat1 = $(".main_03 .seat1");
		var $seat01 = $(".main_03 .seat01");
		var $tipBox = $(".main_03 .tip_box");
		var $dot = $(".main_03 .item_dot");
		var $overBox = $(".main_03 .box_over");
		var $seatNum = $(".main_03 .data_num");
		var valueNum = 200;
		var goalNum = 309;// 200401 수정
		var interval = 10;

		function flipNum(n10,n1,n01){
			for(i=0; i<=9;i++){
				$seat10.removeClass("num"+i);	
				$seat1.removeClass("num"+i);	
				$seat01.removeClass("num"+i);	
			}
			$seat10.addClass("num"+n10);
			$seat1.addClass("num"+n1);
			$seat01.addClass("num"+n01);
			$seatNum.text(n10+n1+"."+n01);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSet=setTimeout(flip,100)
			}			
		}
		var valueSet=setTimeout(flip,100);
		$overBox.stop().animate({top:"-130px"},800); //161005 수정


		function flip_revers(){
			if(valueNum <= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum -= interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSetR=setTimeout(flip_revers,100)
			}			
		}
		var valueSetR;

		$(".main_03 .time_line_box .btn_list a").off("click").on("click",function(){
			switch($(this).parent().index()){
				case 0: 
					$dot.stop().animate({left:"-14px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 230;
					interval = 5;
					$overBox.stop().animate({top:"-130px"},1500); //161005 수정
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 1: 
					$dot.stop().animate({left:"95px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 290;
					interval = 5;
					$overBox.stop().animate({top:"-111px"},1500); //161005 수정
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
			}	
		});

	}
	function animation2_3(){
		$(".main_03 .tip_text").show().animate({left:"0px"});
	}
	function animation2_reset(){
		var $seat10 = $(".main_03 .seat10");
		var $seat1 = $(".main_03 .seat1");
		var $seat01 = $(".main_03 .seat01");
		var $tipBox = $(".main_03 .tip_box");
		var $dot = $(".main_03 .item_dot");
		var $overBox = $(".main_03 .box_over");
		var $seatNum = $(".main_03 .data_num");
		var valueNum = 200;
		var goalNum = 230;
		var interval = 10;

		$(".main_03 .text_box01").css({left:"100px"}).hide();
		$(".main_03 .flip_box").stop().css({top:"165px"}).hide();
		$(".main_03 .time_line_box").stop().animate({top:"242px"}).hide();
		for(i=0; i<=9;i++){
			$seat10.removeClass("num"+i);	
			$seat1.removeClass("num"+i);	
			$seat01.removeClass("num"+i);	
		}
		$seat10.addClass("num2");
		$seat1.addClass("num0");
		$seat01.addClass("num0");
		$seatNum.text("20.0");
		$(".main_03 .tip_text").stop().css({left:"30px"}).hide();
		$dot.stop().css({left:"-14px"});
		$overBox.stop().css({top:"-170px"});
		$tipBox.stop().hide();
	}
	/* *******************************************************************************************************/
	//5대성인병보험
	function animation3(){
		$(".acn3 .title_copy").show().animate({left:"20px"},400,"easeOutBounce",function(){animation3_2();});	
	}
	function animation3_2(){
		$(".acn3 .motion1").show().animate({top: "60px"},800,"easeOutBack");
		$(".acn3 .motion2").delay(100).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn3 .motion3").delay(200).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn3 .motion4").delay(300).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn3 .motion5").delay(400).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn3 .motion6").delay(500).show().animate({top: "60px"},800,"easeOutBack",function(){animation3_3();});
	}
	function animation3_3(){
		$(".acn3 .tip_text").show().animate({left:"20px"});
	}
	function animation3_reset(){
		$(".acn3 .title_copy").css({left:"60px"}).hide();
		$(".acn3 .motion1").css({top: "20px"}).hide();
		$(".acn3 .motion2").css({top: "100px"}).hide();
		$(".acn3 .motion3").css({top: "20px"}).hide();
		$(".acn3 .motion4").css({top: "100px"}).hide();
		$(".acn3 .motion5").css({top: "20px"}).hide();
		$(".acn3 .motion6").css({top: "100px"}).hide();
		$(".acn3 .tip_text").css({left:"60px"}).hide();
	}
	//상해보험
	function animation4(){
		$(".acn4 .title_copy").show().animate({left:"20px"},400,"easeOutBounce",function(){animation4_2();});	
	}
	function animation4_2(){
		$(".acn4 .motion1").show().animate({top: "60px"},800,"easeOutBack");
		$(".acn4 .motion2").delay(100).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn4 .motion3").delay(200).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn4 .motion4").delay(300).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn4 .motion5").delay(400).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn4 .motion6").delay(500).show().animate({top: "60px"},800,"easeOutBack",function(){animation4_3();});
	}
	function animation4_3(){
		$(".acn4 .tip_text").show().animate({left:"20px"});
	}
	function animation4_reset(){
		$(".acn4 .title_copy").css({left:"60px"}).hide();
		$(".acn4 .motion1").css({top: "20px"}).hide();
		$(".acn4 .motion2").css({top: "100px"}).hide();
		$(".acn4 .motion3").css({top: "20px"}).hide();
		$(".acn4 .motion4").css({top: "100px"}).hide();
		$(".acn4 .motion5").css({top: "20px"}).hide();
		$(".acn4 .motion6").css({top: "100px"}).hide();
		$(".acn4 .tip_text").css({left:"60px"}).hide();
	}
	//연금보험
	function animation5(){
		$(".acn5 .title_copy").show().animate({left:"20px"},400,"easeOutBounce",function(){animation5_2();});	
	}
	function animation5_2(){
		$(".acn5 .motion1").show().animate({top: "60px"},800,"easeOutBack");
		$(".acn5 .motion2").delay(100).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn5 .motion3").delay(200).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn5 .motion4").delay(300).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn5 .motion5").delay(400).show().animate({top: "60px"},800,"easeOutBack");
		$(".acn5 .motion6").delay(500).show().animate({top: "60px"},800,"easeOutBack",function(){animation5_3();});
	}
	function animation5_3(){
		$(".acn5 .tip_text").show().animate({left:"20px"});
	}
	function animation5_reset(){
		$(".acn5 .title_copy").css({left:"60px"}).hide();
		$(".acn5 .motion1").css({top: "20px"}).hide();
		$(".acn5 .motion2").css({top: "100px"}).hide();
		$(".acn5 .motion3").css({top: "20px"}).hide();
		$(".acn5 .motion4").css({top: "100px"}).hide();
		$(".acn5 .motion5").css({top: "20px"}).hide();
		$(".acn5 .motion6").css({top: "100px"}).hide();
		$(".acn5 .tip_text").css({left:"60px"}).hide();
	}

	//연금저축보험
	/* 170626 */
	function animation6(){
		$(".main_07 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_07 .flip_box").stop().show().animate({top:"135px"},800,"easeOutBack",function(){
				animation6_2();
				animation6_3();
			});
			$(".main_07 .time_line_box").stop().show().animate({top:"234px"},800,"easeOutBack");
		});	
	}
	function animation6_2(){
		var $seat100000 = $(".main_07 .seat100000");
		var $seat10000 = $(".main_07 .seat10000");
		var $seat1000 = $(".main_07 .seat1000");
		var $seat100 = $(".main_07 .seat100");
		var $seat10 = $(".main_07 .seat010");
		var $seat1 = $(".main_07 .seat1");
		var $tipBox = $(".main_07 .tip_box");
		var $dot = $(".main_07 .item_dot");
		var valueNum = 100000;
		var goalNum = 660000;
		var interval = 98000;

		function flipNum(n100000,n10000,n1000,n100,n10,n1){
			for(i=0; i<=9;i++){
				$seat100000.removeClass("num"+i);	
				$seat10000.removeClass("num"+i);	
				$seat1000.removeClass("num"+i);	
				$seat100.removeClass("num"+i);	
				$seat10.removeClass("num"+i);	
				$seat1.removeClass("num"+i);	
			}
			$seat100000.addClass("num"+n100000);
			$seat10000.addClass("num"+n10000);
			$seat1000.addClass("num"+n1000);
			$seat100.addClass("num"+n100);
			$seat10.addClass("num"+n10);
			$seat1.addClass("num"+n1);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2],fN[3],fN[4],fN[5]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2],fN[3],fN[4],fN[5]);
				valueSet=setTimeout(flip,100)
			}			
		}
		var valueSet=setTimeout(flip,100);


		function flip_revers(){
			if(valueNum <= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2],fN[3],fN[4],fN[5]);
			}else{
				valueNum -= interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2],fN[3],fN[4],fN[5]);
				valueSetR=setTimeout(flip_revers,100)
			}			
		}
		var valueSetR;

		$(".main_07 .time_line_box .btn_list a").off("click").on("click",function(){
			switch($(this).parent().index()){
				case 0: 
					$dot.stop().animate({left:"-14px"},1000,"easeInOutExpo",function(){$(".main_07 .ani_text").text("연간 총 납입보험료 120만원 기준");});
					$tipBox.stop().fadeOut(400);
					goalNum = 198000;
					if(valueNum <= goalNum){
						interval = Math.floor((goalNum-valueNum)/10);
						flip();
					}else{
						interval = Math.floor((valueNum-goalNum)/10);
						flip_revers();
					}
				break;
				case 1: 
					$dot.stop().animate({left:"85px"},1000,"easeInOutExpo",function(){$(".main_07 .ani_text").text("연간 총 납입보험료 240만원 기준");});
					$tipBox.stop().fadeOut(400);
					goalNum = 396000;
					if(valueNum <= goalNum){
						interval = Math.floor((goalNum-valueNum)/10);
						flip();
					}else{
						interval = Math.floor((valueNum-goalNum)/10);
						flip_revers();
					}
				break;
				case 2: 
					$dot.stop().animate({left:"184px"},1000,"easeInOutExpo",function(){$(".main_07 .ani_text").text("연간 총 납입보험료 360만원 기준");});
					$tipBox.stop().fadeOut(400);
					goalNum = 594000;
					if(valueNum <= goalNum){
						interval = Math.floor((goalNum-valueNum)/10);
						flip();
					}else{
						interval = Math.floor((valueNum-goalNum)/10);
						flip_revers();
					}
				break;
				case 3: 
					$dot.stop().animate({left:"282px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 660000;
					if(valueNum <= goalNum){
						interval = Math.floor((goalNum-valueNum)/10);
						flip();
					}else{
						interval = Math.floor((valueNum-goalNum)/10);
						flip_revers();
					}
				break;
			}	
		});

	}
	function animation6_3(){
		$(".main_07 .tip_text").show().animate({left:"0px"});
	}
	function animation6_reset(){
		var $seat100000 = $(".main_07 .seat100000");
		var $seat10000 = $(".main_07 .seat10000");
		var $seat1000 = $(".main_07 .seat1000");
		var $seat100 = $(".main_07 .seat100");
		var $seat10 = $(".main_07 .seat010");
		var $seat1 = $(".main_07 .seat1");
		var $tipBox = $(".main_07 .tip_box");
		var $dot = $(".main_07 .item_dot");
		var valueNum = 100000;
		var goalNum = 660000;
		var interval = 98000;

		$(".main_07 .text_box01").css({left:"100px"}).hide();
		$(".main_07 .flip_box").stop().css({top:"165px"}).hide();
		$(".main_07 .time_line_box").stop().animate({top:"242px"}).hide();
		for(i=0; i<=9;i++){
			$seat100000.removeClass("num"+i);	
			$seat10000.removeClass("num"+i);	
			$seat1000.removeClass("num"+i);	
			$seat100.removeClass("num"+i);	
			$seat10.removeClass("num"+i);	
			$seat1.removeClass("num"+i);	
		}
		$seat100000.addClass("num1");
		$seat10000.addClass("num0");
		$seat1000.addClass("num0");
		$seat100.addClass("num0");
		$seat10.addClass("num0");
		$seat1.addClass("num0");
		$(".main_07 .tip_text").stop().css({left:"30px"}).hide();
		$dot.stop().css({left:"282px"});
		$tipBox.stop().hide();
	}
	/* *******************************************************************************************************/
	//저축보험 
	/*170626*/
	function animation7(){
		$(".main_08 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_08 .text_box02").stop().show().animate({top:"135px"},800,"easeOutBack");
			$(".main_08 .text_box03").stop().show().animate({top:"258px"},800,"easeOutBack");
			$(".main_08 .flip_box").stop().show().animate({top:"183px"},800,"easeOutBack",function(){
				animation7_2();
			});
		});	
	}
	function animation7_2(){
		var $seat10 = $(".main_08 .seat10");
		var $seat1 = $(".main_08 .seat1");
		var $seat01 = $(".main_08 .seat01");
		var $dot = $(".main_08 .item_dot");
		var $tipBox = $(".main_08 .tip_box");
		var valueNum = 100;
		var goalNum = 154;
		var interval = 9;

		function flipNum(n10,n1,n01){
			for(i=0; i<=9;i++){
				$seat10.removeClass("num"+i);	
				$seat1.removeClass("num"+i);	
				$seat01.removeClass("num"+i);		
			}
			$seat10.addClass("num"+n10);
			$seat1.addClass("num"+n1);
			$seat01.addClass("num"+n01);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSet=setTimeout(flip,100)
			}			
		}
		var valueSet=setTimeout(flip,100);
		animation7_3();
	}
	function animation7_3(){
		$(".main_08 .tip_text").show().animate({left:"0px"});
	}
	function animation7_reset(){
		var $seat10 = $(".main_08 .seat10");
		var $seat1 = $(".main_08 .seat1");
		var $seat01 = $(".main_08 .seat01")
		for(i=0; i<=9;i++){
			$seat10.removeClass("num"+i);	
			$seat1.removeClass("num"+i);	
			$seat01.removeClass("num"+i);		
		}
		$seat10.addClass("num1");
		$seat1.addClass("num0");
		$seat01.addClass("num0");
		$(".main_08 .text_box01").css({left:"100px"}).hide();
		$(".main_08 .text_box02").css({top:"144px"}).hide();
		$(".main_08 .flip_box").css({top:"196px"}).hide();
		$(".main_08 .tip_text").css({left:"30px"}).hide();
	}
	/* //170626 */
	/* *******************************************************************************************************/
	//부모사랑정기보험
	function animation10(){
		$(".main_10 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_10 .flip_box").stop().show().animate({top:"160px"},800,"easeOutBack",function(){
				animation10_2();
				animation10_3();
			});
			$(".main_10 .time_line_box").stop().show().animate({top:"262px"},800,"easeOutBack");
		});	
		var $seat1000 = $(".main_10 .seat1000");
		$seat1000.hide();
	}
	function animation10_2(){
		var $seat100000 = $(".main_10 .seat100000");
		var $seat10000 = $(".main_10 .seat10000");
		var $seat1000 = $(".main_10 .seat1000");
		var $seat1 = $(".main_10 .seat1");
		var $tipBox = $(".main_10 .tip_box");
		var $dot = $(".main_10 .item_dot");
		var valueNum = 5;
		var goalNum = 30;
		var interval = 5;

		function flipNum(n100000,n10000,n1000){
			for(i=0; i<=9;i++){
				$seat100000.removeClass("num"+i);	
				$seat10000.removeClass("num"+i);	
				$seat1000.removeClass("num"+i);		
			}
			$seat100000.addClass("num"+n100000);
			$seat10000.addClass("num"+n10000);
			$seat1000.addClass("num"+n1000);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSet=setTimeout(flip,100)
			}			
		}
		var valueSet=setTimeout(flip,100);


		function flip_revers(){
			if(valueNum <= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum -= interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSetR=setTimeout(flip_revers,100)
			}			
		}
		var valueSetR;

		$(".main_10 .time_line_box .btn_list a").off("click").on("click",function(){
			switch($(this).parent().index()){
				case 0: 
					$dot.stop().animate({left:"-14px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					var $seat1000 = $(".main_10 .seat1000");
					$seat1000.hide();
					goalNum = 30;
					if(valueNum <= goalNum){
						interval = Math.floor((goalNum-valueNum)/10);
						flip();
					}else{
						interval = Math.floor((valueNum-goalNum)/10);
						flip_revers();
					}
				break;
				case 1: 
					$dot.stop().animate({left:"134px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 100;
					var $seat1000 = $(".main_10 .seat1000");
					$seat1000.show();
					if(valueNum <= goalNum){
						interval = Math.floor((goalNum-valueNum)/10);
						flip();
					}else{
						interval = Math.floor((valueNum-goalNum)/10);
						flip_revers();
					}
				break;
				case 2: 
					$dot.stop().animate({left:"284px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 500;
					var $seat1000 = $(".main_10 .seat1000");
					$seat1000.show();
					if(valueNum <= goalNum){
						interval = Math.floor((goalNum-valueNum)/10);
						flip();
					}else{
						interval = Math.floor((valueNum-goalNum)/10);
						flip_revers();
					}
				break;
			}	
		});

	}
	function animation10_3(){
		$(".main_10 .tip_text").show().animate({left:"0px"});
	}
	function animation10_reset(){
		var $seat100000 = $(".main_10 .seat100000");
		var $seat10000 = $(".main_10 .seat10000");
		var $seat1000 = $(".main_10 .seat1000");
		var $seat1 = $(".main_10 .seat1");
		var $tipBox = $(".main_10 .tip_box");
		var $dot = $(".main_10 .item_dot");
		var valueNum = 5;
		var goalNum = 10;
		var interval = 5;

		$(".main_10 .text_box01").css({left:"100px"}).hide();
		$(".main_10 .flip_box").stop().css({top:"165px"}).hide();
		$(".main_10 .time_line_box").stop().animate({top:"242px"}).hide();
		for(i=0; i<=9;i++){
			$seat100000.removeClass("num"+i);	
			$seat10000.removeClass("num"+i);	
			$seat1000.removeClass("num"+i);		
		}
		$seat100000.addClass("num1");
		$seat10000.addClass("num0");
		$seat1000.addClass("num0");
		$(".main_10 .tip_text").stop().css({left:"30px"}).hide();
		$dot.stop().css({left:"-14px"});
		$tipBox.stop().hide();
	}
	
	//바른보장 분석 
	function animation12(){
		$(".main_12 .text_box01").show().animate({left:"0px"},200,"easeOutExpo",function(){
			$(".main_12 .text_box02").stop().show().animate({left:"0px"},800,"easeOutExpo", function(){
				$(".main_12 .tip_text").stop().show().animate({left:"0px"},600,"easeOutExpo");
			});
		});
	}
	
	function animation12_reset(){
		$(".main_12 .text_box01").css({left:"100px"}).hide();
		$(".main_12 .text_box02").css({left:"144px"}).hide();
		$(".main_12 .tip_text").css({left:"30px"}).hide();
	}

	/* *******************************************************************************************************/
	/* 190612 추가 */
	//치아보험	
	function animation13(){
		$(".main_13 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_13 .flip_box").stop().show().animate({top:"145px"},800,"easeOutBack",function(){
				animation13_2();
				animation13_3();
			});
			$(".main_13 .time_line_box").stop().show().animate({top:"262px"},800,"easeOutBack");
		});	
	}
	function animation13_2(){
		var $seat10 = $(".main_13 .seat10");
		var $seat1 = $(".main_13 .seat1");
		var $seat01 = $(".main_13 .seat01");
		var $tipBox = $(".main_13 .tip_box");
		var $dot = $(".main_13 .item_dot");
		var $overBox = $(".main_13 .box_over");
		var $seatNum = $(".main_13 .data_num");
		var valueNum = 100;//190716 수정
		var goalNum = 215;//190716 수정
		var interval = 10;

		function flipNum(n10,n1,n01){
			for(i=0; i<=9;i++){
				$seat10.removeClass("num"+i);	
				$seat1.removeClass("num"+i);	
				$seat01.removeClass("num"+i);	
			}
			$seat10.addClass("num"+n10);
			$seat1.addClass("num"+n1);
			$seat01.addClass("num"+n01);
			$seatNum.text(n10+n1+"."+n01);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSet=setTimeout(flip,100)
			}			
		}
		var valueSet=setTimeout(flip,100);
		$overBox.stop().animate({top:"-130px"},800);


		function flip_revers(){
			if(valueNum <= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
			}else{
				valueNum -= interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1],fN[2]);
				valueSetR=setTimeout(flip_revers,100)
			}			
		}
		var valueSetR;

		$(".main_13 .time_line_box .btn_list a").off("click").on("click",function(){
			switch($(this).parent().index()){
				case 0: 
					$dot.stop().animate({left:"-14px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 200;
					interval = 5;
					$overBox.stop().animate({top:"-130px"},1500);
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 1: 
					$dot.stop().animate({left:"95px"},1000,"easeInOutExpo");
					$tipBox.stop().fadeOut(400);
					goalNum = 300;
					interval = 5;
					$overBox.stop().animate({top:"-111px"},1500);
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
			}	
		});

	}
	function animation13_3(){
		$(".main_13 .tip_text").show().animate({left:"0px"});
	}
	function animation13_reset(){
		var $seat10 = $(".main_13 .seat10");
		var $seat1 = $(".main_13 .seat1");
		var $seat01 = $(".main_13 .seat01");
		var $tipBox = $(".main_13 .tip_box");
		var $dot = $(".main_13 .item_dot");
		var $overBox = $(".main_13 .box_over");
		var $seatNum = $(".main_13 .data_num");
		var valueNum = 100;//190716 수정
		var goalNum = 215;//190716 수정
		var interval = 10;

		$(".main_13 .text_box01").css({left:"100px"}).hide();
		$(".main_13 .flip_box").stop().css({top:"165px"}).hide();
		$(".main_13 .time_line_box").stop().animate({top:"242px"}).hide();
		for(i=0; i<=9;i++){
			$seat10.removeClass("num"+i);	
			$seat1.removeClass("num"+i);	
			$seat01.removeClass("num"+i);	
		}
		$seat10.addClass("num1");//190716 수정
		$seat1.addClass("num0");
		$seat01.addClass("num0");
		$seatNum.text("10.0");//190716 수정
		$(".main_13 .tip_text").stop().css({left:"30px"}).hide();
		$dot.stop().css({left:"-14px"});
		$overBox.stop().css({top:"-170px"});
		$tipBox.stop().hide();
	}/*//190612 추가 */
	
	/*191115 추가*/
	//미세먼지질병보험	
	function animation14(){
		$(".main_14 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_14 .flip_box").stop().show().animate({top:"145px"},800,"easeOutBack",function(){
				animation14_2();
				animation14_3();
			});
			$(".main_14 .time_line_box").stop().show().animate({top:"262px"},800,"easeOutBack");
		});	
	}
	function animation14_2(){
		var $seat1 = $(".main_14 .seat1");
		var $seat01 = $(".main_14 .seat01");
		var $tipBox = $(".main_14 .tip_box");
		var $dot = $(".main_14 .item_dot");
		var $overBox = $(".main_14 .box_over");
		var valueNum = 00;
		var goalNum = 30;
		var interval = 10;

		function flipNum(n1,n01){
			for(i=0; i<=9;i++){	
				$seat1.removeClass("num"+i);	
				$seat01.removeClass("num"+i);	
			}
			$seat1.addClass("num"+n1);
			$seat01.addClass("num"+n01);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[1]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[1]);
				valueSet=setTimeout(flip,100)
			}			
		}
		var valueSet=setTimeout(flip,100);
		$overBox.stop().animate({top:"-140px"},600);


		var valueSetR;

	}
	function animation14_3(){
		$(".main_14 .tip_text").show().animate({left:"0px"});
	}
	function animation14_reset(){
		var $seat1 = $(".main_14 .seat1");
		var $seat01 = $(".main_14 .seat01");
		var $tipBox = $(".main_14 .tip_box");
		var $dot = $(".main_14 .item_dot");
		var $overBox = $(".main_14 .box_over");
		var valueNum = 00
		var goalNum = 30;
		var interval = 01;

		$(".main_14 .text_box01").css({left:"100px"}).hide();
		$(".main_14 .flip_box").stop().css({top:"165px"}).hide();
		$(".main_14 .time_line_box").stop().animate({top:"242px"}).hide();
		for(i=0; i<=9;i++){	
			$seat1.removeClass("num"+i);	
			$seat01.removeClass("num"+i);	
		}
		$seat1.addClass("num0");
		$seat01.addClass("num0");
		$(".main_14 .tip_text").stop().css({left:"30px"}).hide();
		$dot.stop().css({left:"-14px"});
		$overBox.stop().css({top:"-170px"});
		$tipBox.stop().hide();
	}/*//191115 추가 */
	
	//여성건강보험 200506 추가 	
	function animation15(){
		$(".main_15 .text_01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_15 .motion_item").stop().show().animate({top:"117px"},800,"easeOutBack",function(){
				animation15_2();
			});
		});	
	}
	function animation15_2(){
		$(".main_15 .tip_text").show().animate({left:"0px"});
	}
	function animation15_reset(){
		$(".main_15 .text_01").css({left:"60px"}).hide();
		$(".main_15 .motion_item").stop().animate({top:"137px"}).hide();
		$(".main_15 .tip_text").stop().css({left:"60px"}).hide();
	}
	/*//여성건강보험 추가 */
	

	/* 저축보험 */
	function animation16(){
		$(".main_16 .text_box01").show().animate({left:"0px"},400,"easeOutExpo",function(){
			$(".main_16 .flip_box").stop().show().animate({top:"145px"},800,"easeOutBack",function(){
				animation16_2();
				animation16_3();
			});
			$(".main_16 .time_line_box").stop().show().animate({top:"262px"},800,"easeOutBack");
			$(".main_16 .text_box02").stop().show().animate({top:"231px"},800,"easeOutBack");
		}).delay(1200).queue(function(){
			$(".main_16 .btn_list > li").eq(4).find("a").trigger("click");
			$(this).dequeue();
		});	
	}
	function animation16_2(){
		var $seat1 = $(".main_16 .seat1");
		var $seat01 = $(".main_16 .seat01");
		var $seat02 = $(".main_16 .seat02");
		var $dot = $(".main_16 .item_dot");
		var valueNum = 0;
		var goalNum = 0;
		var interval = 0.2;
		
		function flipNum(n1,n01,n02){
			var N01 = n01 == undefined ? 0 : n01;
			var N02 = n02 == undefined ? 0 : n02;

			for(i=0; i<=9;i++){
				$seat1.removeClass("num"+i);	
				$seat01.removeClass("num"+i);	
				$seat02.removeClass("num"+i);	
			}
			$seat1.addClass("num"+n1);
			$seat01.addClass("num"+N01);
			$seat02.addClass("num"+N02);
		}

		function flip(){
			if(valueNum >= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[2],fN[3]);
			}else{
				valueNum += interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[2],fN[3]);
				valueSet=setTimeout(flip,100);
			}			
		}
		function txtRate(y, r){
			$("#yearRate").text(r.toFixed(1));
			$("#yearSave").text(y);
		}
		var valueSet=setTimeout(flip,100);
		
		function flip_revers(){
			if(valueNum <= goalNum){
				var fN = String(goalNum).split("");
				flipNum(fN[0],fN[2],fN[3]);
			}else{
				valueNum -= interval;
				var fN = String(valueNum).split("");
				flipNum(fN[0],fN[2],fN[3]);
				valueSetR=setTimeout(flip_revers,100)
			}			
		}
		var valueSetR;

		$(".main_16 .time_line_box .btn_list a").off("click").on("click",function(){
			switch($(this).parent().index()){
				case 0: //가입
					// $dot.stop().animate({left:"-14px"},1000,"easeInOutExpo");
					// goalNum = 0.00;
					// interval = 0.1;
					// txtRate("10년", 1.8);
					// if(valueNum <= goalNum){
					// 	flip();
					// }else{
					// 	flip_revers();
					// }
				break;
				case 1: //1년 
					$dot.stop().animate({left:"56px"},1000,"easeInOutExpo");
					goalNum = 0.30; 
					interval = 0.1;
					txtRate($(this).text(), goalNum);
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 2:  //2년
					$dot.stop().animate({left:"130px"},1000,"easeInOutExpo");
					goalNum = 0.30;  
					interval = 0.1;
					txtRate($(this).text(),goalNum);
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 3:  //3년
					$dot.stop().animate({left:"204px"},1000,"easeInOutExpo");
					goalNum = 0.30;  
					interval = 0.1;
					txtRate($(this).text(),goalNum);
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
				case 4:  //10년
					$dot.stop().animate({left:"278px"},1000,"easeInOutExpo");
					goalNum = 1.80;  
					interval = 0.2;
					txtRate($(this).text(),goalNum);
					if(valueNum <= goalNum){
						flip();
					}else{
						flip_revers();
					}
				break;
			}	
		});

	}
	function animation16_3(){
		$(".main_16 .tip_text").show().animate({left:"0px"});
	}
	function animation16_reset(){
		var $seat1 = $(".main_16 .seat1");
		var $seat01 = $(".main_16 .seat01");
		var $seat02 = $(".main_16 .seat02");		
		var $tipBox = $(".main_16 .tip_box");
		var $dot = $(".main_16 .item_dot");

		$(".main_16 .flip_box").stop().css({top:"165px"}).hide();
		$(".main_16 .text_box01").css({left:"100px"}).hide();
		$(".main_16 .text_box02").css({top:"200px"}).hide();
		$(".main_16 .time_line_box").stop().animate({top:"242px"}).hide();
		for(i=0; i<=9;i++){
			$seat1.removeClass("num"+i);	
			$seat01.removeClass("num"+i);
			$seat02.removeClass("num"+i);
		}
		$seat1.addClass("num0");
		$seat01.addClass("num0");
		$seat02.addClass("num0");

		$(".main_16 .tip_text").stop().css({left:"30px"}).hide();
		$dot.stop().css({left:"-14px"});
		$tipBox.stop().hide();
	}
	/* //저축보험 */

	/* *******************************************************************************************************/
//	navLink.on("click",function(){
//		var num = Number($(this).parent().attr("class").split("link")[1].split(" ",1));
//		navLink.parent().removeClass("active");
//		$(this).parent().addClass("active");
//		pageMove(num);
//	});


	switch(ingItem){
		case 0: animation0(); break;
		case 1: animation1(); break;
		case 2: animation2(); break;
		case 3: animation3(); break;
		case 4: animation4(); break;
		case 5: animation5(); break;
		case 6: animation6(); break;
		case 7: animation7(); break;
		case 8: animation8(); break;
		case 9: animation9(); break;
		case 10: animation10(); break;
		case 12: animation12(); break;
		case 13: animation13(); break;
		case 14: animation14(); break;
		case 15: animation15(); break;
	}

	//pageMove 함수 데코레이터 (실제처리)
	var fnDecoratorPageMove = function (key) {

		var idx = 999
		, _keyIdxMapper = {
			'001' : 0,
			'002' : 1,
			'003' : 2,
			'004' : 3,
			'005' : 4,
			'006' : 5,
			'007' : 6,
			'008' : 7,
			'009' : 8,
			'010' : 9,
			'011' : 10,
			'012' : 11,
			'013' : 12,
			'014' : 13,
			'015' : 14,
			'016' : 15,
			'017' : 16,
			'999' : 999
		};

		if (_keyIdxMapper.hasOwnProperty (key)) {

			idx = _keyIdxMapper[ key ];
	}
		pageMove (idx);
	};
	// 상단 네비게이션 클릭
	navLink.on("click",function(e){

		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var key = $(this).parent ().data ('magcd');
		navLink.parent().removeClass("active");
		$(this).parent().addClass("active");

		fnDecoratorPageMove (key);
	});
}

$(function(){
	var $layer_tel = $('.layer_tel');
	
	/* '앱 다운로드 주소 받기' 레이어 */
	$(document).on('click', '#btn_layer_open', function(){
		$layer_tel.stop().animate({
			'top':1
		});
	}); 

	/* '앱 다운로드 주소 받기' 레이어 닫기 */
	$(document).on('click', '#btn_layer_close', function(){
		$layer_tel.stop().animate({
			'top':202
		});
	}); 
});
//160919 수정 (끝)

$(function(){
	$(this).on('mouseenter focusin', '.box_tooltip .tooltip', function () {
		var $box_tooltip = $(this).parent();
		$box_tooltip.addClass('_show');
		if($box_tooltip.is('._show')){
			$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();
			$(this).siblings('.tooltip_cnt').after('<span class="bg_arrow"></span>');
		}else{
			$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();
		}
		var tooltip_l = $(this).position().left,
			bgArrowW = $('.bg_arrow').outerWidth();
			bgArrowPosL = tooltip_l + (bgArrowW/2)/2;
		var tooltip_t = $(this).position().top,
			bgArrowH = $('.bg_arrow').outerHeight();
			bgArrowPosT = tooltip_t + (bgArrowH/2)/2;
			
		var $middle_benefit = $('.middle_benefit'),
		$tooltip_cont = $middle_benefit.find('.tooltip_cnt'),
		$tooltipDown = $('.down'),
		$tooltip_cont_Down = $tooltipDown.next('.tooltip_cnt'),
		includeW = $(this).parent().width(),
		bgArrowW = $(this).parent().find('.bg_arrow').width()/2,
		_thisW = $(this).width()/2;
		var PosL = tooltip_l + (_thisW - bgArrowW)
			
		if(!$(this).hasClass('tit')){
			if($(this).hasClass('down')){
				$('.box_tooltip .bg_arrow').css('left', PosL );//150922 수정
				$tooltip_cont_Down.css('left',((tooltip_l-$tooltip_cont_Down.width()/2 )- (_thisW - bgArrowW)));
			}else{
				$('.box_tooltip .bg_arrow').css('left', PosL );//150922 수정
				$tooltip_cont.css('left',((tooltip_l-$tooltip_cont.width()/2 )- (_thisW - bgArrowW)));
				$middle_benefit.find('.bg_arrow').css('top',bgArrowPosT-13);
			}
		}
	});	
	$(this).on('mouseleave focusout', '.box_tooltip .tooltip', function () {		
		var $box_tooltip = $(this).parent();
		$(this).parent().removeClass('_show');
		$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();
	});
	
	/////지우지마세요
	// 해쉬에 대한 이벤트 설정
	$(document).on ('click', 'div.main_sorting_area>div.tab_sorting>ul>li>a', function (e) {

		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var $this = $(this)
		, key = $this.data ('key')
		, arrSplitKeys = [];

		key += '';
		if (key) {

			arrSplitKeys = key.split (',');
			fnSorting.apply (this, arrSplitKeys);
		}
	});
	
	// 180928 추가
	// 바른보장 슬라이드 커서 깜빡임
	function repeatCursor() {
	    $('.acn12 #cursor').animate({
	        opacity: 0
	    }, '70', 'swing').animate({
	        opacity: 1
	    }, '70', 'swing');
	}
	setInterval(repeatCursor, 600);
	// 180928 추가(끝)
});