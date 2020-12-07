var userBrowser		= '';
var userBrowserVer	= '';
var userOS			= '';
var quickOffset = '';

$(function(){

	/*
	 * Part : GNB (청약 제외)
	 *
	 */


	//모바일 useragent판독
	var __ua = navigator.userAgent.toUpperCase();
	if ($.browser===undefined) {
		$.browser = {};
	}
	$.extend(true, $.browser, {
		isMobile: (__ua.indexOf("MOBILE")>-1||__ua.indexOf("ANDROID")>-1)
	});

	//Menu
	var gnbFocusCheck = false;
	$.fn.gnbMove = function(){
		return this.each(function(){

			var $this = $(this);
			var menus = $this.find('>ul>li');
			var submenus = menus.find('.submenu');
			var depth2 = $this.find('.depths2').find('>ul>li>a');
			var depth3 = $this.find('.depths2').find('.depths3');
			var gnbBottom = $('.header .bottom');
			depth3.prev('a').addClass('design');
			//submenus.hide();
			var closeMenu = function() {
				menus.removeClass('on');
				submenus.slideUp(350);//150102 수정
				depth3.hide();
				$('.header').removeClass('on');
				$('.subDeptWrap').stop().animate({height:0},200);
			};

			menus.each(function(e){
				var tt = $(this);
				var ttLink = tt.find('>a');
				var ttSubmenu = tt.find('.submenu').stop(true, true);

				//PC 브라우저
	            if (!$.browser.isMobile) {
	            	tt.on('mouseenter focusin',function(){
	     			    gnbFocusCheck = true;
	                    if(ttSubmenu.is(':visible')){

	                    } else {
	                    	/* 2015.04.23 박현아 수정 */
	                    	/****** begin 150916 수정 ******/
	                    	$("#header").addClass('on');
	                    	menus.removeClass('on');
	                    	tt.addClass('on');
	                    	hasBanner(ttSubmenu);
	                    	/****** end  150916 수정 ******/

							$('.depths3').hide();//150102 추가
	                        submenus.hide();
	                        depth2.removeClass('on');
							ttSubmenu.show();
	                        $('.depths2').subDeptHt();
	                        $('li.on').find('.banner2').show();
	                        $(document).find('._sel_option').remove();
						}
	                });
	            	$('.menu').on('mouseleave focusout', function(){
	         			gnbFocusCheck = false;
	                   	setTimeout(function() {
	        				if(gnbFocusCheck == false) {
	        					closeMenu();
	        				}
	                   	},250);
	               	});
	            }

	            //모바일 브라우저
	            if ($.browser.isMobile) {
	            	//150102 삭제
	            	ttLink.on('click',function(e){
	            		e.preventDefault();
	                    if ($('.header').hasClass("on") && ttLink.closest('li').hasClass("on")) {
	                        location.href = $(this).attr("href");
	                    } else {
		                	$('.header').addClass('on');
//		                	/* 2015.03.13 추가 */
	                    	menus.removeClass('on has_b2b');
		                	tt.addClass('on');
							$('.depths3').hide();//150102 추가
		                	$('.submenu').hide();
		                	depth2.removeClass('on');
		                	ttSubmenu.stop().show();
		                	$('.depths2').subDeptHt();
		                	$('li.on').find('.banner2').show();
	                    }
	                    return false;
	                });
	            	$(document).click(function() {
	            		closeMenu();
	           		});
	            }
			});
		});
	};

    $.fn.subDepth = function(){
        return this.each(function(){
            var $this = $(this);
            var depth2 = $this.find('.depths2').find('>ul>li>a');
            var depth2Len = depth2.length;
            var depth3 = depth2.next();
            depth2.each(function(index){
            	var tt = $(this);
            	var ttDepth3 = tt.next();
            	var ttDepth3Box = tt.next('.depths3');
            	tt.on('mouseenter focusin',function(e){
            		e.preventDefault();
					tt.parent().siblings().find('a').removeClass('on');

					tt.addClass('on');
					depth3.hide();
					ttDepth3.show();
					if(ttDepth3.length > 0){
						tt.closest('.depths2').next('.banner2').hide();
					}
					else{
						tt.closest('.depths2').next('.banner2').show();
					}

					//2015.03.13 박현아 수정
					ttDepth3Box.css('top',tt.position().top);
					$('.depths2').subDeptHt();
            	});
			});
		});
	};

    //2,3depth 활성
    $.fn.subDeptHt = function(){
		return this.each(function(){
			var subHtItm = $('.subDeptWrap>.depths2');
			var subHeight = $('#header .subDeptWrap > div.banner1').outerHeight(); // 2016 추가
			var visibleDepth3 = subHtItm.find('div:visible');
			var depth3Top = parseInt(visibleDepth3.css('top'));
			var depth3Ht = visibleDepth3.height()+ depth3Top + 8;
			var animateSpeed = 200;

			if(depth3Ht>270){//160609 수정
				$('.subDeptWrap').stop().animate({height:depth3Ht}, animateSpeed);
			}else{
				$('.subDeptWrap').stop().animate({height:subHeight}, animateSpeed); // 2016 수정, height 값
			}
		});
	};
    $('.menu').gnbMove();
	$('.subDeptWrap').subDepth();

	/* 150702추가 */
	//edaily푸터 추가된 경우
    if($('#edailyfooter').css('display') == 'block'){
    	$('#footer, .footerWrap').addClass('has_edaily');
    }
	/* e:150702추가 */

    //공시실 레이어
	function disclosure(){
    	$(document).click(function() {
    		$('.disclosure>ul').hide();
    		// 151022 화살표 모양때문에 추가
    		if($('.disclosure > a').hasClass('toggle')){
    			$('.disclosure > a').removeClass('toggle');
    		}
    		// // 151022 화살표 모양때문에 추가
   		});
        $('.disclosure > a').click(function(e) {
        	e.preventDefault();
    		$(this).next('ul').toggle();
			$(this).toggleClass('toggle'); //141229 추가
    		return false;
    	});
    	$('.disclosure>ul a:last').bind('focusout',function(){
    		$(this).closest('ul').hide();
    	});
    }
	disclosure();

	//우측 3개 배너
	var banner3Html="";
	var isLoginChk = false; 
	
	if(typeof globalVar != "undefined" && globalVar.getParam("webLog") != undefined  ){
		isLoginChk = globalVar.getParam("webLog").isLogin;
	}
	
	banner3Html+='<div class="banner3">';
	banner3Html+='	<a href="javascript:PageUtil.loginNextMovePageType(\'/mypage/ml/HPML150S1.dev\','+isLoginChk+',\'banner\')")><img src="/resources/images/common/banner_gnb_loan.png" alt="보험계약대출 - 목돈 필요하다고 보험해지 NO!" width="260" height="96" /></a>';
	banner3Html+='	<a href="/bridge/bl/HPBL950S1.dev" class="btn_banner btn00"><span>연금저축 계약이전</span></a>';//200225 추가
	banner3Html+='	<a href="/products/pc/HPPC900S1.dev" class="btn_banner btn01"><span>간편보험료 확인하기</span></a>';
	banner3Html+='	<a href="/lifesquare/ls/HPLP130S1.dev" class="btn_banner btn02"><span>생명보험가입 노하우</span></a>';
	banner3Html+='</div>';

	$('.subDeptWrap').append(banner3Html);

	//윈도우XP 체크 (150224 추가)
	var os = (function() {
	    var ua = navigator.userAgent.toLowerCase();
	    return {
	        osXP: /windows nt 5.1/.test(ua)
	    };
	}());
	if(os.osXP) {
		$('body').addClass('osXP');
	}

	/* 151104 개발요청에 의한 수정*/ // 2016 수정(151123)
	var $btn_arrow = $('.header_product .all_menu>a'),
	$productName = $('#header .box_products_name_n'),
	$productTitN = $productName.find('.tit_product'), // 2016 수정(151123)
	$overlayer = $('#header .overlayer');
	$tooltip_360 = $('#header .tooltip_360'); // 170306 추가


	$btn_arrow.on('click', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		//170612 삭제

		/* 150915 삭제, 이전버전으로 원복 */

		if(!$(this).parent().is('._on')){
			$(this).parent().addClass('_on');

			$overlayer.removeClass('_active');
			$overlayer.addClass('_active');

			$productName.hide();
			$overlayer.gnbMove();
			$overlayer.find('li.no1 .submenu').show();

			$tooltip_360.addClass('_on');//170612 추가

		}else{
			$(this).parent().removeClass('_on');
			$('#header').removeClass('_active');
			$overlayer.removeClass('_active');
			$productName.show();

			$tooltip_360.removeClass('_on');//170612 추가
		}

	});
	/* // 151104 개발요청에 의한 수정*/

	$('.header_product .box_lnk').hide().css({ // 150729 수정 - hide()추가
		'height':0,
		'overflow': 'hidden'
		// 150518 삭제
	});

	$productTitN.on('click', function(event){ // 2016 수정
		//prevent default action (hyperlink)
		event.preventDefault ? event.preventDefault() : event.returnValue = false;

		var $boxLnk = $('.header_product .box_lnk');// 150520 수정
		if(!$(this).is('._active')){
			$(this).addClass('_active');
			var curHeight = $boxLnk.outerHeight(),
				autoHeight = $boxLnk.css('height', 'auto').outerHeight();

			$('.header_product .box_lnk').show().height(curHeight).stop().animate({ // 150729 수정 - show()추가
				'height': autoHeight,
				'padding-bottom' : '10px'
			}, 300);
		}else{
			$(this).removeClass('_active');
			$('.header_product .box_lnk').stop().animate({
				'height': 0,
				'padding-bottom' : 0
			}, 300).hide();
		}
	});


	/* 메뉴리스트가 아닌 곳을 클릭했을 시 메뉴리스트 닫히는 함수 신규 */
	$(document).on('click', function(event){
		var $target = $(event.target);
		if(!($target.parents().is('.box_products_name_n'))){ //2016 수정
			$productTitN.removeClass('_active'); //2016 수정
			$('.header_product .box_lnk').stop().animate({ //150420 수정
				'height': 0,
				'padding-bottom': 0
			}, 300);
		}
	});

	/* 로그인 후 이름 클릭시 로그인 박스 활성화 함수 */
	var $boxUtil = $('#header .box_util');

	$(this).on('click', '#header .customerName.type2, #header .customerName.type3', function(e){ //150418 수정
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		//170329 삭제
		if($boxUtil.length >= 1){
			if($boxUtil.css('display') == 'none'){
				$boxUtil.show();
				//170329 삭제
			}else{
				$boxUtil.hide();
			}
		}

	});

	//170928 GNB 안 롤링 배너, 라플광장 서브메인과 동일한 조건 클래스로 변수 변경
	var headerVisual = function(){
		var $headerVisual = $('.headerVisual');
		var $hdPaging = $('.headerVisual .visualPaging');
		var $hdList = $('.headerVisual .visualList');
		var $hdBtn = $('.headerVisual .visualBtn');
		var hdTimerId;

			var hdIdx = $(this).parent().index();
			$hdBtn.find('li').eq(0).addClass('active').siblings().removeClass('active');
			$hdList.find('li').eq(0).show().siblings().hide();

			var hdAutoPlaystats = 0;
			var hdAutoPlay = function(){
				clearInterval(hdTimerId);
				hdTimerId = setInterval(function(){
					hdAutoPlaystats++;
					if(hdAutoPlaystats > $hdPaging.children().length-1){
						hdAutoPlaystats = 0;
					}
					$hdPaging.find('li').eq(hdAutoPlaystats).addClass('active').siblings().removeClass('active');
					$hdList.find('li').eq(hdAutoPlaystats).show().siblings().hide();
				},3000);
			};
			var hdAutoStop = function(){
				clearInterval(hdTimerId);
			};
			hdAutoPlay();
	};

	headerVisual();
	$('.headerVisual .visualPaging li').eq(0).addClass('active');

	$('#headerVisual .visualBtn button').on('click mouseenter focusin', function(){
		var $headerVisual = $('.headerVisual');
		var $hdPaging = $('.headerVisual .visualPaging');
		var $hdList = $('.headerVisual .visualList');
		var $hdBtn = $('.headerVisual .visualBtn');
		var hdTimerId;

		var hdIdx = $(this).parent().index();
		$hdBtn.find('li').eq(hdIdx).addClass('active').siblings().removeClass('active');
		$hdList.find('li').eq(hdIdx).show().siblings().hide();
	});


	/*
	 * 개발에서는 사용안함. mw.page.js 에있는 jQmodal 사용
	 *
	 * Part : 팝업 (모달레이어팝업,윈도우팝업)
	 * 2015.03.05 [애드캡슐 퍼블리싱 박현아]
	 * $(selector).JQmodal({option})
	 * settings.popUrl 사용안함 a태그 href로 경로 체크함
	 * settings.layerClass 다중 아이프레임 팝업인 경우
         * 2015.04.24 최종버전 : 개발 적용 후 input focus, placeholder 에 문제가 발생하여 개발에서 적용한 함수 일부 내용 다름
	 * 개발적용 된 내용
	 * 1. 아이프레임으로 컨텐츠 활성화
	 * 2. 아이프레임 영역위 부모페이지를 이용하여 팝업 상단영역 구현
	 * 3. 기존  AS-IS 함수 유지 되었음
	 * 4. 닫기 버튼 함수 AS-IS 함수 유지 되었음
	 */

	var scrollTop;
	//2015.03.30 박현아 추가
	var wScrollT ;
    $.fn.JQmodalCm = function(option){
        var settings = $.extend({
            width     : 300,
            height    : 300,
            type      : 'd', // d || w || c(개발 모달레이어 혹은 윈도우팝업 혹은 컨텐츠 모달);
			backColor : '#000', //팝업 디자인변경으로 인한 수정
            opacity   : 0.6, //팝업 디자인변경으로 인한 수정
            bz        : 1000001,
            iz        : 1000002,
			border:"none;", //팝업 디자인변경으로 인한 수정
			bgColor:"none",
			closeBtnClass: "btnClose",
            popUrl    : 'about:blank',
			scrolling : 'yes', //140818수정
			layerClass: '' //2015.03.06 다중팝업으로 인해 추가
        },option);

        return this.each(function(event){
        	//prevent default action (hyperlink)
        	//event.preventDefault ? event.preventDefault() : event.returnValue = false;
            window.modalLauncher = $(this);
            /* 클릭버튼 변수에 담아두기 */
            // $btnThis = $(this);
            /* 팝업경로를 받아옴 */
            var href = $(this).attr('href');
            var overlayer = '<div id="modal_back"></div>';
            var ifrmLayer = '<div class="modal_ifrmWrap '+ settings.layerClass +'"><p class="tit_modalPop"></p></div>';
            var contLayer = '<div id="modal_contWrap"><p class="tit_modalPop"></p></div>';
            scrollTop = $('body, html').scrollTop();
            switch (settings.type){
                case 'd' : //iframe 팝업

                	//2015.04.22 박현아 수정
                	$.winScrollT(scrollTop);
                	/* 개발 팝업 */
                	var iframeH = settings.height-82; //레이어팝업의 헤드영역 높이값. 아이프레임 안에 포함되지 않아서 해당 높이값 넣어줌
                	 var iframe = '<iframe id="modalIfm_'+settings.layerClass+'" src="'+ href +'" width="'+settings.width+'" height="'+iframeH+'" allowtransparency="true" frameborder="0" scrolling="'+settings.scrolling+'">';

                	 if($('.modal_ifrmWrap').is('.'+ settings.layerClass)){
                		 $('body').append(overlayer);

                		 /* 다중 아이프레임 일경우 해당 아이프렘 감싼 태그 보여주기 */
                		$('.modal_ifrmWrap.'+ settings.layerClass).show().animate({
                			'opacity': 1
                		});
                	 }else{
                		 /* 아이프레임이 없을경우 태그생성 */
                		$('body').append(overlayer,ifrmLayer);
                		$('.modal_ifrmWrap.'+ settings.layerClass).css('opacity', 0);
 	                	$('.modal_ifrmWrap.'+ settings.layerClass).append(iframe);
                	 }

                	$.each($.browser, function(name, val) {
                        if(name == 'msie' && $.browser.version.substr(0,3) == '6.0'){
                            $('<iframe src="about:blank" width="'+document.documentElement.clientWidth+'" height="'+$(document).height()+'" frameborder="0" scrolling="'+settings.scrolling+'" transparency="true" style="position:absolute;left:0;top:0;opacity:'+settings.opacity+';filter:alpha(opacity='+settings.opacity*100+');z-index:-1;"></iframe>')
                            .appendTo($('#modalBack'));
                        }
                    });

                	/* 아이프레임 로드 함수 */
                	$('.modal_ifrmWrap.'+ settings.layerClass).find('#modalIfm_'+settings.layerClass).load(function(){
                		/* 팝업 타이틀 가져오기 */
                		var strTit = $(this).contents().find('#header .tit_1dpeth, .popHead h1').text();
                		/* 팝업 닫기 버튼 */
                		var $btnClose = '<div class="'+settings.closeBtnClass+'"><button type="button" class="btn_close type_d"><span class="blind">레이어 닫기</span></button></div>';

                		/* 팜업 타이틀 텍스트 생성 */
                		$('.modal_ifrmWrap.'+ settings.layerClass +' .tit_modalPop').text(strTit);
                		/* 팝업 버튼 생성 */
                		$('.modal_ifrmWrap.'+ settings.layerClass).append($btnClose);

                		/* 버튼 위치 */
                		$('.btnClose').css({
	                		'position': 'absolute',
	                		'right': '0',
	                		'top': '0'
	                	});
                		$('.modal_ifrmWrap.'+ settings.layerClass).animate({
                			'opacity': 1
                		});
                	});

                	/* 모달 위치 css 함수 */
                	modalCss();

                break;
                case 'c':

                	/* 컨텐츠 팝업 */
                	/* 팝업 최대값 스크롤생성을 위해 헤더 높이만큼 뺌 */
                	var maxH = 650-74;
                	/* 팝업 닫기 버튼 클래스 type_c로 컨텐츠 팝업 닫기 구분 */
                	var $btnClose = '<div class="'+settings.closeBtnClass+'"><button type="button" class="btn_close type_c"><span class="blind">레이어 닫기</span></button></div>';
            		$(this).addClass('_active_moddal');
                	if($('#modal_contmWrap').length == 0){
                		/* 팝업 초기 생성 */
                		$('body').append(overlayer,contLayer);
                		$('#modal_contWrap').css('opacity', 0);
                		/* 팝업컨텐츠를 감싼 태그가 생성될 때 함수
                		 * href+' #' - 해당 경로에 있는 태그 가져오기
                		 */
                		$('#modal_contWrap').load(href + ' #pop', function(){
                			var $container = $(this).find('#container');
                			var layerContH = $container.outerHeight();

                			/* 팝업 닫기 버튼 생성 */
                			$('#modal_contWrap').append($btnClose);
                			$('select').fakeselect();
                			/* 스타일 */
                			$(this).find('#pop').css({
                				'width': settings.width,
                				'height': settings.height

                			});

                			//2015.03.13 추가
                			$(this).find('#header').attr('id','header_modal').addClass('tit_modalPop');

                			/* 박스 라운딩 */
                			$(this).css({
                				'overflow': 'hidden',
                				'border-radius': '10px'
                			});

                			/* 레이어 높이가 최대값을 넘을때 스크롤 생성 */
                			if(layerContH > maxH){
                				$container.css('height', maxH);
        						$container.css({'overflow-x':'hidden', 'overflow-y':'auto', 'height': (settings.height-74)});

        					}
                			$('#modal_contWrap').animate({'opacity': 1});

                		});

                	 }
                	/* 팝업 위치함수 */
                	modalCss();


                break;
                case 'w' :
                	/* 윈도우 팝업 */
                    windowModal = window.open(href,'','width='+settings.width+',height='+settings.height+',scrollbars='+settings.scrolling);
                    windowModal.focus();
                break;
            }// end switch
            $('#modalIfm').contents().find('html').css("overflow-x","hidden");

            /* 팝업 위치 함수 */
           function modalCss(){
        	    var marginL = settings.width/2;
				var marginT = $(window).scrollTop() + ($(window).height() - settings.height) / 2;
				var offsetL = ($(window).width()/2) - (settings.width/2);

        	   $('#modal_back').css({
            		'position': 'fixed',
            		'left': '0',
            		'top': '0',
            		'width': '100%',
            		'height': $(document).height(),
            		'background-color': settings.backColor,
            		'opacity': 0,
            		'z-index': settings.bz
            	}).animate({
            		'opacity': 0.6
            	});


            	/*2015.03.11 위치수정*/

        	   //2015.03.30 박현아 수정
            	try{
            		$('.modal_ifrmWrap.'+ settings.layerClass).css({
            			'position': 'absolute',
            			'left': '50%',
            			'top': $(document).scrollTop()+document.documentElement.clientHeight/2+'px',
            			'margin-left':-settings.width/2+'px',
            			'margin-top':-settings.height/2+'px',
            			'z-index': settings.iz
            		});
            	}catch(err){

            		$('#modal_contWrap').css({
            			'position': 'absolute',
            			'left': '50%',
            			'top': $(document).scrollTop()+document.documentElement.clientHeight/2+'px',
            			'margin-left':-settings.width/2+'px',
            			'margin-top':-settings.height/2+'px',
            			'z-index': settings.iz
            		});
            	}

        	   wScrollT = $(window).scrollTop();

				/* S - 2015.03.30 박현아 수정 */
				$('body').css({
					'position': 'fixed',
					'top': -$(window).scrollTop(),
					'width': '100%'
					});
				$('html').css({
					'overflow-y' : 'hidden',
					'overflow-x' : 'hidden'
				});


				/* e - 2015.03.30 박현아 수정 */
           }
           return false;
        });

    };



	/*
	 * Part : 팝업 닫기
	 * 2015.03.05 [애드캡슐 퍼블리싱 박현아]
	 */
	/* 팝업 닫기함수 */
	$(this).on('click', '.modal_ifrmWrap .btn_close, #modal_contWrap .btn_close', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		if($('.modal_ifrmWrap iframe, #modal_contWrap',window.parent.document).length){

			if($(this).is('.type_c')){
				/* 컨텐츠 팝업일 경우 */
				$('#modal_contWrap',window.parent.document).attr('src','');
				$('#modal_back',window.parent.document).animate({
					'opacity': 0
				}, function(){
					$('#modal_back',window.parent.document).remove();
				});
				$('#modal_contWrap',window.parent.document).animate({
					'opacity': 0
				}, function(){
					$('#modal_contWrap',window.parent.document).remove();
				});

			}else{
				/* 아이프레임 팝업일 경우
				 * 아이프레임 숨김 처리시 다중 아이프레임 일 경우 제어 하는 함수 추가해야함
				 */
				$('#modal_back',window.parent.document).animate({
					'opacity': 0
				}, function(){
					$('#modal_back',window.parent.document).remove();
				});
				//$('#modal_ifrmWrap',window.parent.document).hide();
				$(this).parent().parent().animate({
					'opacity': 0
				}, function(){
					$(this).remove(); //150729 수정
				});
			}
			//$('body, html' , parent.document).removeAttr('style');

			$(parent.modalLauncher).focus();
			parent.modalLauncher = null;
//			$('.btn_popupOpener').focus();
			$('body, html' , parent.document).removeAttr('style');/*2015.03.11 추가*/

			$(window).scrollTop(wScrollT);/* 2015. 03.30 박현아 추가*/
		} else {
			$(window.parent).focus();
			self.close();
		}
		return false;
	});

	/* window resize 일 경우에도 화면 중앙 유지 함수 */
	$(window).resize(function(){
		if ($('#modal_back').length > 0) {
			if($('#modal_back').is(':visible')){
				$('#modal_back').css({'width': $(window).width(), 'height': $(document).height()});

				var marginT = $(window).scrollTop() + ($(window).height() - $(".modal_ifrmWrap, #modal_contWrap").height()) / 2;
				var offsetL = ($(window).width()/2) - ($(".modal_ifrmWrap, #modal_contWrap").width()/2);
				$(".modal_ifrmWrap, #modal_contWrap").offset({left: offsetL, top:marginT});

			}
		} //end if
	}); //end resize



	/** 개발 삭제
	 * 퍼블리싱 사용펑션 : 팝업(모달레이어팝업,윈도우팝업)에서 자신을 닫기 위한 펑션
	 * 개발액션과 상관없이 순수하게 팝업을 닫기 위한 용도이다.
	 * param : event객체(고정값)
	 */
	function closeModal(e){
		var evt = window.event || e;
		$.browser.msie ? evt.returnValue = false : evt.preventDefault();

		if($('#modal_ifrmWrap iframe',window.parent.document).length){
			$(parent.modalLauncher).focus();
			parent.modalLauncher = null;

			$('body, html' , parent.document).removeAttr('style'); //141022추가
			$('#modal_ifrmWrap iframe',window.parent.document).attr('src','');
			$('#modal_back',window.parent.document).remove();
			$('#modal_ifrmWrap',window.parent.document).remove();
		} else {
			$(window.parent).focus();
			self.close();
		}

	}


	/* 퀵메뉴
	 * 170209 기존 퀵메뉴 삭제
	 * 새로운 ui로 추가
	 */
	if($('#container').find('aside').is('.quick_aside')){
		var topPadding = 250;

		$('.quick_aside .btn_top>.top').on('click', function(e){
			// return false
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			quickFn(0);
		});

		// 탑버튼 이동  모션
		function quickFn(cont_top){
			$('body,html').stop().animate({scrollTop: cont_top}, 500);
		}

		//퀵 메뉴
		var quick_menu = function(){
			if ($(window).scrollTop() > quickOffset) {
				$('.quick_aside').stop().animate({
					'margin-top': $(window).scrollTop() - quickOffset + topPadding
				}, 500);
			}else{
				$('.quick_aside').stop().animate({
					'margin-top': '120'
				});
			}
		};

		//퀵메뉴 스크롤, 탭고정 스크롤
		$(window).scroll(function() {
			quick_menu();
		});
		quick_menu();
	};





	/* 170209 삭제 */


	/* 170209 삭제 */

	/*
	 * 퀵메뉴 - [브라우저 사이즈에 따른 함수]
	 * 2015.02.28 [애드캡슐 퍼블리싱 박현아]
	 */

	/* 브라우저 해상도 체크후 클래스 추가 삭제 함수 선언 */
	windowW = $(window).width(),
	onCss = '_on';

	jQuery.winResizeFn = function(windowW, onCss){
		if(windowW <= 1240){
			$(".quick_aside").addClass(onCss);
			$(".quick_aside > ul").css({width: (windowW-324)+"px"});
		}else{
			$(".quick_aside").removeClass(onCss);
			$(".quick_aside > ul").css({width: "auto"});
		}
		resizeWin(); // 2015.10.30 추가
	};


	/* 브라우저 리사이즈 함수 실행 */
	$(window).resize(function(){
		var windowW = $(window).width();

		$.winResizeFn(windowW, onCss);
	});

	/* 브라우저 해상도에 따른  함수 실행 */
	$.winResizeFn(windowW, onCss);

	/*
	 *Part : 퀵메뉴 [공통]
	 *2015.10.30 [애드캡슐 퍼블리싱 김태은]
	 *브라우저 가로사이즈에 따라 퀵메뉴 아이콘 일부가 바뀜
	 */
	resizeWin();
	function resizeWin(){
		var winWidth = $(window).width();
	};


	/*
	 *Part : 간편보험료 확인
	 *2015.02.28 [애드캡슐 퍼블리싱 박현아]
	 */

	var $easyInsurance = $('.easy_insurance'),
		$easyInsuranceInfo = $easyInsurance.find('.btn_info'),
		$easyInfoCont = $easyInsurance.find('.box_info');

	$easyInsuranceInfo.on('click', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		if(!$(this).is('._active')){
			$easyInsuranceInfo.removeClass('_active');
			$(this).addClass('_active');
			$(this).easyInfoShow();
		}else{
			$easyInsuranceInfo.removeClass('_active');
			$(this).easyInfoHide();
		}
	});

	$easyInsuranceInfo.on('mouseenter focusin', function(e){
		//prevent default action (hyperlink)
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		if($(this).is('._on')){
		//	$(this).
		}else{
			$(this).easyInfoShow();
		}
	});

	$easyInsuranceInfo.on('mouseleave focusout', function(){
		$(this).easyInfoHide();
	});

	$.fn.easyInfoShow = function(){
		var thisW = $(this).outerWidth()/2,
			thisParentW = $(this).parent().outerWidth()/2,
			nameW = $(this).parent().prev().outerWidth(),
			infoContW = $(this).parent().next().outerWidth()/2;
		var thisOffset = $(this).offset();

		$easyInsuranceInfo.removeClass('_on');
		$(this).addClass('_on');

		$(this).parent().next().show();

		$(this).parent().next().css({
			'left': thisOffset.left-infoContW+thisW,
			'top': (thisOffset.top+$(this).outerHeight()+10)
		});
	}; //end easyInfoShow

	$.fn.easyInfoHide = function(){
		if(!$(this).is('._active')){
			$easyInsuranceInfo.removeClass('_on');
			$(this).parent().next().hide();
		}
	}; //end easyInfoHide

	/*
	 * Part : 공통 family site
	 * 2015.05.21 [애드캡슐 퍼블리싱팀 김혜련]
	 */

	$(this).on('click', '.site_map strong a', function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	});

	$(document).on('click', '#footer',function(event){
		var $target = $(event.target);
		var $familySite = $('.footer_top .area_r .site_map');
		if($target.parents().is('.site_map')){
			if(!$familySite.find('strong').hasClass('_on')){
				$familySite.find('strong').addClass('_on');
				$familySite.find('strong').next().show();
			}else{
				$familySite.find('strong').removeClass('_on');
				$familySite.find('strong').next().hide();
			}
		}else{
			$familySite.find('strong').removeClass('_on');
			$familySite.find('strong').next().hide();
		}
	});

	/*
	 * Part : 상품안내 슬라이드
	 * 2015.03.26 [애드캡슐 퍼블리싱팀 박현아]
	 * 메인과 상품안내 페이지에서 사용.
	 * 동일하게 사용하므로 수정시 각각 페이지 확인요망.
	 * 맨처음과 맨끝의 버튼은 비활성화 요구함 - 동적으로 생성
	 */

	var $listProducts = $('.list_products_n'), // 2016 수정, selector
		$listProductsLi = $listProducts.find('>li'),
		$listProductsA = $listProductsLi.find('>a'),
		$listProductsLiOn = $listProductsLi.filter('._on'),
		indexProductsLiOn = $listProductsLiOn.index();
	var $boxAdvantage = $('.box_advantage');

	var $slideBtn = $('.box_btn'),
		$buttonPrev = '<button class="prev"><span class="blind">이전</span></button>',
		$buttonNext = '<button class="next"><span class="blind">다음</span></button>',
		$spanPrev = '<span class="prev"><span class="blind">이전</span></span>',
		$spanNext = '<span class="next"><span class="blind">다음</span></span>';

	var $slideList = $('.list_advantage');
		$listUl = $slideList.find('ul'),
		$listLi = $listUl.find('>li');

	var listLiLen = $listLi.length,
		listLiW = 0,
		current = 0,
		state = false;

	/* 초기셋팅 */
	$slideList.each(function(){
		var $listUl = $(this).find('ul'),
			$listLi = $listUl.find('>li');

		var listLiLen = $listLi.length,
			listLiW = 0;

		if(listLiLen>3){
			$(this).prev().append($spanPrev, $buttonNext);
			//2015.04.14 삭제
		}

		$listLi.each(function(){
			listLiW += $(this).outerWidth(true);
		});

		$listUl.css({
			'position': 'absolute',
			'left': '0',
			'top': '0',
			'width': listLiW
		});
	});

	//다음 버튼 클릭
	$(this).on('click', '.box_btn .next', function(event){
		event.preventDefault ? event.preventDefault() : event.returnValue = false;

		var listLiLen = $(this).parent().next().find('li').length,
			$slideBtn = $(this).parent();
		var $listUl = $(this).parent().next().find('ul'),
			$listLi = $listUl.find('li');

		if(listLiLen>3){
			if(current<(listLiLen-3)){
				current++;
				if(state == false){
					$slideBtn.find('span.prev').remove();
					$slideBtn.append($buttonPrev).end().find('.prev').css('opacity', '1');
					state = true;
				}

				$listUl.stop().animate({
					'left': -(current*$listLi.eq(current).outerWidth(true))
				});

				if(current == (listLiLen-3)){
					$(this).remove();
					$slideBtn.append($spanNext);
					$slideBtn.find('.prev').focus();
				}
			}
		}
	});

	//이전 버튼 클릭
	$(this).on('click', '.box_btn .prev', function(event){
		event.preventDefault ? event.preventDefault() : event.returnValue = false;

		var listLiLen = $(this).parent().next().find('li').length,
			$slideBtn = $(this).parent();
		var $listUl = $(this).parent().next().find('ul'),
			$listLi = $listUl.find('li');

		if(current > 0){
			current--;

			if(state == true){
				$slideBtn.find('span.next').remove();
				$slideBtn.append($buttonNext).end().find('.next').css('opacity', '1');
				state = false;
			}

			$listUl.stop().animate({
				'left': -(current*$listLi.eq(current).outerWidth(true))
			});
			if(current == 0){
				$(this).remove();
				$slideBtn.append($spanPrev);
				$slideBtn.find('.next').focus();
			}
		}
	});

$listProductsA.on('click focusin', function(){

		var moveUrl = [
		   			"/products/pd/HPPD100S1.dev",
		   			"/products/pd/HPPD200S1.dev",
		   			"/products/pd/HPPD800S1.dev",
		   			"/products/pd/HPPD900S1.dev",
		   			"/products/pe/HPPE300S1.dev",
		   			"/products/pd/HPPD300S1.dev",
		   			"/products/pd/HPPD400S1.dev",
		   			"/products/pd/HPPD700S1.dev",
		   			"/products/pd/HPPD500S1.dev",
		   			"/products/pd/HPPD600S1.dev",
		   			"/products/pm/HPPM100S1.dev"
		   		];

		var index = $(this).parent().index(),
		$parent = $(this).parent();

		$(this).closest(".cont").find(".btn_wrap .btn_m").prop("href", moveUrl[index]);

		/* 160201 취합 */
		if(!$parent.is('._on')){
			$listProductsLi.removeClass('_on');
			$parent.addClass('_on');

			$boxAdvantage.hide();
			$boxAdvantage.eq(index).show();
		}
		/*// 160201 취합 */

		/* 초기화 */
		current = 0;
		state = false;

		$slideList.each(function(){
			var $listUl = $(this).find('ul'),
			$listLi = $listUl.find('>li');

			var listLiLen = $listLi.length;

			$listUl.css('left', 0);

			if(listLiLen>3){
				$(this).prev().empty().append($spanPrev, $buttonNext);
			}
		});

	});

	/*
	 * Part : 상단설계배너
	 * 상품별 공통 배너생성
	 * 150915 수정, createBanner()생성 후 해당내용 넣음, 저축보험여부에 따라 다른 배너노출
	 */
/*
    해당 처리는 관리자에서 관리하도록 변경되었기 때문에 이하 처리 필요없음
	var createBanner = function(){
		 160705 간편결제 추가, 이벤트 관리자 주소 변경 필요
		var tBanner4="";
		tBanner4 += '<div class="event_bubble">';
		tBanner4 += '	<a href="javascript:;"><img src="/resources/images/event/v160801_eventbubble_160701.png" alt="첫 1회 보험료는 간편결제로! payco, syruppay, NAVERPay, KakaoPay" /></a>';
		tBanner4 += '</div>';
		// 160705 간편결제 추가


		 160825 최저가 더블보상제 수정, 이벤트 관리자 주소 변경 필요
		var tBanner5="";
		tBanner5 += '<div class="event_bubble event_bubble2">';
		tBanner5 += '	<a href="/lifesquare/event/HPLC01S1.dev?eventStatus=O&emId=604&emEventCode=FM&evntCd=FM01&evntMagSq=22" target="_blank"><img src="/resources/images/event/v160825_eventbubble_160802.png" alt="최저가 더블 보상제 실시 중!	최저가 보험료가 아니면 더블 보상!" /></a>';
		tBanner5 += '</div>';
		// 160825 최저가 더블보상제 수정

		var fileName = location.href.split('/')[(location.href.split('/').length-1)].split('.')[0];
		//160420 교보문고 eBook 증정 이벤트 종료로 인한 스크립트 삭제
		 160927 간편결제 수정
		if(fileName == 'HPPD700S1'){
			$('.visual .area_r .event_bubble').hide();
		}else if(fileName == 'HPPD100S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPD200S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPD300S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPD400S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPD500S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPD600S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPD800S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPD900S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPPE300S1'){
			$('.visual .area_r').append(tBanner4);
		}else if(fileName == 'HPCE000S1'){ // 160729
			$('.visual .area_r').append(tBanner4);
		}
		// 160705 추가 메인 우측박스에 배너 생성
		$('.main .cont01 .inner .area_r .inner_box').after(tBanner4);

		// 160705 추가 메인 우측박스에서 저축보험선택 시 간편결제 이벤트 노출X
		$('.main .cont01 .inner .area_r .list_calc .sel_m').on('change', function(){
	        var insuValue = $(this).find('option:selected').text();
	        if(insuValue == '보험을 선택해주세요'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').hide();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').hide();
			}else if(insuValue == '(무)라이프플래닛e정기보험Ⅱ'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').hide();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').show();
			}else if(insuValue == '(무)라이프플래닛e종신보험Ⅱ'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').hide();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').show();
			}else if(insuValue == '(무)라이프플래닛e암보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').hide();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').show();
			}else if(insuValue == '(무)라이프플래닛e5대성인병보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').show();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').hide();
			}else if(insuValue == '(무)라이프플래닛e상해보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').hide();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').show();
			}else if(insuValue == '(무)라이프플래닛e연금보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').show();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').hide();
			}else if(insuValue == '(무)라이프플래닛e연금저축보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').show();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').hide();
			}else if(insuValue == '(무)꿈꾸는e저축보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').show();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').hide();
			}else if(insuValue == '(무)라이프플래닛e플러스어린이보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').show();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').hide();
			}else if(insuValue == '(무)라이프플래닛e에듀케어저축보험'){
				$('.main .cont01 .inner .area_r').find('.event_bubble').show();
				$('.main .cont01 .inner .area_r').find('.event_bubble2').hide();
			}
	    });
		 //160705 간편결제 추가
		*//** 150807 배너애니메이션 효과 선언 위치변경
		 * 퍼블리싱 사용펑션 : 보험설계 이메일발송 이벤트배너*
		 *//*

	    function ani() {
	        $('.event_bubble').animate({"bottom":"-=10px"},300).animate({"bottom":"+=10px"},300);//160705 속도 조정
	    }
	    function loop(){
	        ani();
	        setTimeout(ani, 500);
	    }
	    loop();
	    setInterval(loop, 4000);
	}(); // end createBanner
*/
	/*
	 * Part : Main 상단 설계
	 * 2015.04.03 [애드캡슐 퍼블리싱 박현아]
	 * 개발서버에 설정되어 있고, 아래 함수는 퍼블화면에서만 사용
	 */
	/*
	 * 160404 .box_input 높이값 설정 삭제
	 */

	/*
	 * Part : 상단 설계
	 * 2015.04.13 [애드캡슐 퍼블리싱 박현아]
	 * [개발]박스 가변을 발생하는 클릭함수 안에 아래 내용 추가 - 추가후 삭제 요망
	 */
	//$('.box_input .bg').css('height', $('.box_input .inner_box').outerHeight());

	/*
	 * Part : IE 호환성 닫기 모션 , 통합포인트 닫기 모션
	 * 2015.05.13 [애드캡슐 퍼블리싱 김혜련]
	 * 150916 삭제, 해당내용 [Part : 페이지최상단 띠배너 관련]으로 위치이동
	 */

	/*
     * Part : 운영체제/디바이스/브라우저 체크
     * 2015.05.18 [애드캡슐 퍼블리싱 김태은]
     * - 체크한 내용을 html에 클래스로 추가해줌
     * - (적용된 예) <html class="win desktop ie ie10">
     */
    var userAgentCheck = function(){
        var ua = navigator.userAgent.toString().toLowerCase();
        var agent = {};
        var $html = document.getElementsByTagName('html')[0];
        var addClassName = '';

        agent = {
                ios: (/ip(ad|hone|od)/i).test(ua),
                android: (/android/i).test(ua),
                ie : (/msie/i).test(ua) || (/trident/i).test(ua),
                msedge : (/edge/i).test(ua), // MS edge(applewekit,chrome,safari)
                firefox: (/firefox/i).test(ua),
                webkit: (/applewebkit/i).test(ua),
                chrome: (/chrome/i).test(ua),
                opera: (/opera/i).test(ua)
        };

        agent.safari = (agent.webkit) && (!agent.chrome);
        agent.mobile = document.ontouchstart !== undefined && ( agent.ios || agent.android );
        agent.desktop = !(agent.ios || agent.android);
        agent.os = (navigator.appVersion).match(/(mac|win|linux)/i);
        agent.os =  agent.os ? agent.os[1].toLowerCase() : '';

        // ie 버전 체크
        if(agent.ie){
            var ieVersion = ua.match(/(msie |trident.*rv[ :])([0-9]+)/)[2];
            ieVersion = Math.floor(ieVersion);
            agent.ie = "ie ie"+ieVersion;
        }

        // ms edge, chrome, safari일 경우 중복되는 값 삭제하기
        if(agent.msedge){
        	agent.webkit = agent.chrome = agent.safari = false;
        }

        if(agent.chrome || agent.safari){
        	agent.webkit = false;
        }

        var reverseFn = function(){
            var classArr = [];
            for(var value in agent){
                if(agent[value]){
                    if(value == 'os' || value == 'ie'){
                        classArr.push(agent[value]);
                    }else{
                        classArr.push(value);
                    }
                }
            }
            addClassName = classArr.reverse().join(' ');
        }();

        $html.className = addClassName;

    }(); // end userAgentCheck


    /*
     * Part : 브라우저/OS/페이지ID기록
     * 2015.04.14 [애드캡슐 퍼블리싱 김혜련]
     * 기존 소스 유지 각종 브라우저/OS 스니핑을 통한 스크립트 제어 및 푸터 하단에 고객센터 상담원의 문의 받은 페이지 확인을 위해 정의해둔 숨겨진 공간에 브라우저/OS/페이지ID기록하기 위해 쓰임.
     */

    var BrowserDetect = {
    	init: function () {
    		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    		this.version = this.searchVersion(navigator.userAgent)
    			|| this.searchVersion(navigator.appVersion)
    			|| "an unknown version";
    		this.OS = this.searchString(this.dataOS) || "an unknown OS";
    		userBrowser		= this.browser;
    		userBrowserVer	= this.version;
    		userOS			= this.OS;
    	},
    	searchString: function (data) {
    		for (var i=0;i<data.length;i++)	{
    			var dataString = data[i].string;
    			var dataProp = data[i].prop;
    			this.versionSearchString = data[i].versionSearch || data[i].identity;
    			if (dataString) {
    				//substring, substring2 둘다 있을경우
    				if(data[i].subString2 != undefined && data[i].subString2 != ""){
    					if (dataString.indexOf(data[i].subString) != -1 && dataString.indexOf(data[i].subString2) != -1){
    						return data[i].identity;
    					}
    				//substring 하나만 있을경우
    				}else{
    					if (dataString.indexOf(data[i].subString) != -1){
    						return data[i].identity;
    					}
    				}
    			}
    			else if (dataProp){
    				return data[i].identity;
    			}
    		}
    	},
    	searchVersion: function (dataString) {
    		var index = dataString.indexOf(this.versionSearchString);
    		if (index == -1) return;
    		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    	},
    	dataBrowser: [
    		{
    			string: navigator.userAgent, // 0번체크 Edge
    			subString : "Edge",
    			identity  : "Edge",
    			versionSearch: "Edge"
    		},
    		{
    			string: navigator.userAgent, // 1번체크 오페라
    			subString : "OPR",
    			identity  : "Opera",
    			versionSearch: "OPR"
    		},
    		{
    			string: navigator.userAgent, // 2번체크 크롬 : userAgent에 Safari, Chrome 모두 있으면 크롬
    			subString : "Safari",
    			subString2: "Chrome",
    			identity  : "Chrome"
    		},
    		{
    			string: navigator.userAgent, // 3번체크 사파리
    			subString 	  : "Safari",
    			identity  	  : "Safari",
				versionSearch : "Version"
    		},
    		{
    			string: navigator.userAgent, // 4번체크 IE11
    			subString : "rv:11",
    			identity  : "Explorer",
    			versionSearch: "rv"
    		},
    		{
    			string: navigator.userAgent, // 5번체크 IE
    			subString: "MSIE",
    			identity: "Explorer",
    			versionSearch: "MSIE"
    		},
    		{
    			string: navigator.userAgent, // 6번체크 파폭
    			subString: "Firefox",
    			identity: "Firefox"
    		},
    		{ 	string: navigator.userAgent,
    			subString: "OmniWeb",
    			versionSearch: "OmniWeb/",
    			identity: "OmniWeb"
    		},
    		{
    			prop: window.opera,
    			identity: "Opera",
    			versionSearch: "Version"
    		},
    		{
    			string: navigator.vendor,
    			subString: "iCab",
    			identity: "iCab"
    		},
    		{
    			string: navigator.vendor,
    			subString: "KDE",
    			identity: "Konqueror"
    		},
    		{
    			string: navigator.vendor,
    			subString: "Camino",
    			identity: "Camino"
    		},
    		{		// for newer Netscapes (6+)
    			string: navigator.userAgent,
    			subString: "Netscape",
    			identity: "Netscape"
    		},
    		{
    			string: navigator.userAgent,
    			subString: "Gecko",
    			identity: "Mozilla",
    			versionSearch: "rv"
    		},
    		{ 		// for older Netscapes (4-)
    			string: navigator.userAgent,
    			subString: "Mozilla",
    			identity: "Netscape",
    			versionSearch: "Mozilla"
    		}
    	],
    	dataOS : [
    		{
    			string: navigator.userAgent,
    			subString: "Windows NT 10.0",
    			identity: "Windows 10"
    		},
    		{
    			string: navigator.userAgent,
    			subString: "Windows NT 6.1",
    			identity: "Windows 7"
    		},
    		{
    			string: navigator.userAgent,
    			subString: "Windows NT 5.1",
    			identity: "Windows XP"
    		},
    		{
    			string: navigator.userAgent,
    			subString: "Windows NT 6.3",
    			identity: "Windows 8.1"
    		},
    		{
    			string: navigator.userAgent,
    			subString: "Windows NT 6.2",
    			identity: "Windows 8"
    		},
    		{
    			string: navigator.userAgent,
    			subString: "Windows NT 6.0",
    			identity: "Windows Vista"
    		},
    		{
    			string: navigator.platform,
    			subString: "Win",
    			identity: "Windows"
    		},
    		{
    			string: navigator.platform,
    			subString: "Mac",
    			identity: "Mac"
    		},
    		{
    			string: navigator.userAgent,
    			subString: "iPhone",
    			identity: "iPhone/iPod"
    		},
    		{
    			string: navigator.platform,
    			subString: "Linux",
    			identity: "Linux"
    		}
    	]
    };

	/*
	 * Part : 브라우저/OS/페이지ID기록 툴팁
	 * 2015.05.14 [애드캡슐 퍼블리싱 김혜련]
	 * 부모요소에 .tooltip_check 추가하면 동적으로 툴팁 생성
	 */

	$(this).on('mouseenter focusin click', '.tooltip_check',function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		BrowserDetect.init();

		var browerOsHtml="";
		browerOsHtml+='<ul class="tooltip_brower_os">';
		browerOsHtml+='	<li>브라우져 : ' + BrowserDetect.browser + ' ' + BrowserDetect.version +'</li>';
		browerOsHtml+='	<li>운영체제 : '+ BrowserDetect.OS +'</li>';
		browerOsHtml+='</ul>';

		$('.tooltip_brower_os').remove();
		$(this).addClass('_on');
		if($(this).is('._on')){
			$(this).append(browerOsHtml);
		}

	});

	$(this).on('mouseleave focusout', '.tooltip_check',function(){
		$(this).removeClass('_on');
		$('.tooltip_brower_os').remove();
	});

	/**
	 * 퍼블리싱 사용펑션 : 사람명수,금액 등 시간에 따른 흐름에 단계별 표현을 하는 함수
	 * html 마크업 : <anyTag id="value"><span>1</span>, <span>2</span><span>3</span><span>4</span></anyTag>
	 * 사용법 : $('#value').digitFlow([param])
	 * param : option으로 객체리터럴형식,flowFrom이라는 속성이 있으며, flow방향을 정할 수 있다.('right'  || 'left' or anything)
	 */
	(function($){
		$.fn.digitFlow = function(option){
			var settings = $.extend({
					flowFrom : 'right' // 'right'  || 'left' or anything
				},option);
			return this.each(function(){
				var _this = this;

				//$('<img />').attr('src','/images/cont/imageNum.png').on('load',function(){
					var currentText = $(_this).text();
					var genHTML = '';
					if($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0')){
						currentText = currentText.replace(/\u00a0/g,"");
						genHTML += '&nbsp;';
						$(this).css('margin-left','-7px');
					}
					for(var i=0;i<currentText.length;i++){
						var curAt = currentText.charAt(i);
						genHTML += (curAt == ',') ? '<span class="comma">'+curAt+'</span>' :'<em class="n0">'+curAt+'</em>';
					}
					$(_this).html(genHTML);
					var $selector = settings.flowFrom == 'right' ? $($(_this).children('em').get().reverse()) : $(_this).children('em');
					$selector.each(function(i){
						var real = parseInt($(this).text());
						//$(this).text(0)
						var self = this;
						setTimeout(function(){loop(self,real);},i*150+500);
					});
					function loop(obj,real){
						$(obj).animate({count:0}, {
							duration: 400,
							step: function(now, fx) {
								$(obj).removeClass().addClass("n" + parseInt(Math.random() * 10));
							},
							complete: function() { // 애니메이션 완료
								$(obj).removeClass().addClass("n" + parseInt(real));
							}
						});
					}
				//});
			});
		};
	})(jQuery);

	/*
	 * Part : 이벤트 알림 서비스 신청하기
	 * 2015.05.22 [애드캡슐 퍼블리싱 김태은]
	 * 개인정보 수집.이용 동의 상세내용 보이기/숨기기
	 */
	$(this).on('click','a.btn_view_box',function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		$(this).toggleClass("up").parent().next().toggle(); // 150528 수정
	});

	/*
	 * Part : 신분증입력 예시보기
	 * 2015.06.19 [애드캡슐 퍼블리싱 윤정환]
	 * 신분증 보이기/숨기기
	 */
	$(function(){
		$('.HPPE240P1 .cont').hide();
		$('.HPPE240P1 .cont').eq(0).show();
		$(this).on('click', '.tit_tab1 a', function(e){
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var $parents = $(this).parent().parent();

			var $siblings = $parents.find('> li');
			var $tab_li_num = $(this).parent().index();
			var $tab_cont = $('.HPPE240P1 .cont');

			$siblings.removeClass('_on');
			$(this).parent().addClass('_on');
			$tab_cont.hide();
			$tab_cont.eq($tab_li_num).show();
		});
	});

	/*
	 * Part : 상품안내 헤더 부분
	 * 2016.01.01 [애드캡슐 퍼블리싱 김태은]
	 * 상품목록 펼침 시 해당 페이지 상품명에 활성화효과 추가 */

	matchLinkOn();
	function matchLinkOn(){
		var pageID = location.href.split('/')[(location.href.split('/').length-1)].split('.')[0];

		$('.box_products_name_n .list_product_lnk .list_insur li').removeClass('_on');
		$('.box_products_name_n .list_product_lnk .list_insur li a').each(function(){
			var $href = $(this).attr('href');
			if( $href.indexOf(pageID) != -1){
				$(this).parents('li').addClass('_on');
			}
		});
	}

	/*
	* Part : 웹접근성 관련 모음
	* 2015.07.29 [애드캡슐 퍼블리싱 김태은]
	*/

	// [스킵네비게이션] 클릭 후 포커스가 본문컨텐츠영역으로 갈 수 있도록 함
	$(this).on('click','a.skip_navi',function(){
	    var $target = $(this).attr("href");
	    $($target).attr("tabindex", 0).focus();
	});

	// [상품안내/설계] 헤더에서 상품목록 영역에서 포커스아웃되면 목록이 닫힘
	$(this).on('focusout','.header_product .box_products_name .box_lnk li:last-child a',function(){
		$productTitN.trigger('click'); // 2016 수정(151123)
	});

	// [상품안내/설계] 헤더에서 전체메뉴영역이 포커스아웃되면 닫기버튼으로 이동하도록 함
	$(this).on('focusout','.li.no4.on .btn_l.btn03',function(){
		var isAllMenu = $(this).parents('.all_menu');
	    if(isAllMenu){ $btn_arrow.focus();}
	});

	// [팝업]이 열리면 그 안에서 포커스이동하도록 함
	// 현재 운영서버에서 일반레이어팝업은 사용하지 않고 있어, 고려하지 않고 작업함
	$(document).keydown(function(e){
        var isShift = window.event.shiftKey ? true : false;
        var hasPopup = $('body:first').find('.modal_ifrmWrap').length;
        if(!isShift && e.keyCode == 9){
            if(hasPopup > 0){
                $('.modal_ifrmWrap').find('iframe').contents().find('body').attr('tabindex',-1).focus();
            }
        }
    });

    // 팝업이 열릴때 class 부여, 닫힐때 class로 포커스 찾아가기(웹접근성) - 20160309 jeha 임시주석
	$(this).on('click','a, label, button',function(){
//		$(".btn_popupOpener").removeClass("btn_popupOpener");
//		$(this).addClass('btn_popupOpener');
	});


	/********************** begin 150916 js정비 ***************************/

	/* 공인인증서 로그인 팝업 151013 */

	// 간편로그인에 있는 버튼 클릭시 위,아래 페이지 이동
	$(this).on('click', '.HPGA01P0 .wrap_tit .link_view, .HPGA01P0 .wrap_send .btn_m', function(e){ //151109 수정
		e.preventDefault ? e.preventDefault() : e.returnValue = false; //151109 추가
		$('.layer_os').fadeIn(700); //151109 수정
	});
	//151109 추가(시작)
	$(this).on('click', '.HPGA01P0 .layer_os .btn_osclose', function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		$('.layer_os').fadeOut(700);
	});
	//151109 추가(끝)
	$(this).on('click','.HPGA01P0 .box_ahnlab .btn_close_2', function(){
		$('.box_ahnlab').stop().animate({
			'margin-top':0
			},400
		);
	});

	// 151111 추가 (시작)
	$(this).on('click','.HPGA01P0 .layer_os .btn_ossend', function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	});
	// 151111 추가 (끝)
	// 151019 추가(시작)
	// 간편로그인에 있는 '자세히보기' 클릭시 위,아래 페이지 이동
	$(this).on('click', '.HPGA01P0 .chk_m .link_view', function(e){ //151111 수정
		e.preventDefault ? e.preventDefault() : e.returnValue = false; // 151111 추가
		$('.box_agree').stop().animate({
			'margin-top':-($('.box_agree').outerHeight()+36)
			},400
		);
	});
	$(this).on('click','.HPGA01P0 .box_agree .btn_close_2', function(e){ //151111 수정
		e.preventDefault ? e.preventDefault() : e.returnValue = false; //151111 추가
		$('.box_agree').stop().animate({
			'margin-top':0
			},400
		);
	});
	//iPhone, Android 선택
	$(this).on('click', '.inner_box li', function(){
		$('.inner_box li').removeClass('_on');
		$(this).addClass('_on');
		$('.box_os').hide();
		var listNum = $(this).index();
		var box_os = $('.box_os').eq(listNum);
		$(box_os).show();
	});
	// 151019 추가(끝)
   /*
	* Part : 페이지 최상단배너 관련
	* 2015.09.16 [애드캡슐 퍼블리싱 김태은]
	* 1. 페이지최상단배너 및 제휴영역 div에는 반드시 role="banner"를 추가
	* 2. 닫기버튼에는 .btn_banner_close 클래스 추가, header.jsp 참조
	*/

	// 띠배너갯수, header종류에 따라 submenu의 위치값 조정
	// $.gnbMove, $btnArrow.click(), document.ready(), .btn_banner_close.click()
	function hasBanner(ttSub){
		var $submenu = ttSub;
		var $deHeader = $('#header > div.inner');
		var $proHeader = $('#header > div.header_product');
		var $proSubmenus = $('.header.overlayer').find('>ul>li').find('.submenu');
    	var $deSubmenus = $('#header > div.inner').find('>ul>li').find('.submenu');
		var $bans = $('div[role="banner"]:visible');
    	var $bansHeight=0;

    	$bans.each(function(){
    		$bansHeight += $(this).outerHeight();
    	});
    	
    	/* 띠배너 사용하지 않음 
    	if($deHeader.length > 0){
    		$submenu != undefined ? $submenu.css({'top' : $bansHeight+76}) : $deSubmenus.css({'top' : $bansHeight+76});
    	}else if($proHeader.length > 0){
    		$("#header").css({'height' : $bansHeight+72});
    		$proSubmenus.css({'top' : $bansHeight+72});
    	}else{
    		// nothing to do
    	}
    	*/
	}

	// 상단 띠배너 닫기
	// - 기존 IE 배너 닫기내용 수정
	// - 닫기버튼의 type클래스로 구분하여 처리, 기본은 hide()처리, type2는 애니메이트처리
	$(this).on('click','.btn_banner_close',function(){
		var $this = $(this);
		var $thisBan = $(this).parents('div[role="banner"]');
		var speed = 400;

		if($this.is('.type2')){
				$thisBan.animate({
					'margin-top':-$thisBan.outerHeight()
					},speed,function(){
						$thisBan.hide();
						setTimeout(function () {
							hasBanner();
						}, 0);
					}
				);
		}else{
			$thisBan.hide();
			hasBanner();
		}
		setTimeout(function(){
			if($("#container").find("aside").is(".quick_aside")){
				quickOffset = $('.quick_aside').offset().top;
			}
		},500);

	});

	/* 160223 팝업 토글 박스 */
	var Toggle_box = function(){
		var area = $('.wrap_private.toggle_type');
		$('.tit_private button').click(function(){
			if ($(this).parent().parent().hasClass('open'))
			{
				$(this).parent().parent().removeClass('open');
			}else{
				$(this).parent().parent().siblings().removeClass('open');
				$(this).parent().parent().addClass('open');
			}
		});
	};
	/* 160223 동의 비동의 히든 */
	var Agree_area = function(){
		var area = $('.agree_select_wrap');

		area.find('.wrap_btn').find('label').click(function(){
			if($(this).hasClass('agree')){
				area.find('.select_area').css('display', 'block');
			}else{
				area.find('.select_area').css('display', 'none');
			}
		});
	};



	$(document).ready(function(){
		hasBanner();
		Toggle_box(); //160223 추가
		Agree_area(); //160223 추가

	});
	/********************** end 150916 js정비 ***************************/

	// .HPGA01P0 팝업 툴팁 삭제
	// 160201 추가 팝업 툴팁 추가 취합
	$(this).on('mouseenter focusin', '#pop .box_tooltip .tooltip', function () {

		var $box_tooltip = $(this).parent();
		var tooltip_l = $(this).position().left;

		$box_tooltip.addClass('_show');
		if($box_tooltip.is('._show')){
			$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();
			$(this).siblings('.tooltip_cnt').after('<span class="bg_arrow"></span>');

			var bgArrowW = $(this).parent('.box_tooltip').find('.bg_arrow').width()/2;
			var _thisW = $(this).width()/2;
			var PosL = tooltip_l + (_thisW - bgArrowW);

			$('.box_tooltip .bg_arrow').css('left', PosL );
		}else{
			$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();
		}
	});

	//151020 추가  메인 및 서브메인의 헤더쪽 툴팁
	$(this).on('mouseenter focusin', '.box_tooltip .tooltip', function () {
		if($(this).hasClass('tit')){// 160201 수정 취합
			var $box_tooltip = $(this).parent();
			$box_tooltip.addClass('_show');
			if($box_tooltip.is('._show')){
				$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();
				$(this).siblings('.tooltip_cnt').after('<span class="bg_arrow"></span>');
			}else{
				$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();
			}
		}
	});

	// 공통 툴팁 삭제
	$(this).on('mouseleave focusout', '.box_tooltip .tooltip', function () {
		var $box_tooltip = $(this).parent();
		$(this).parent().removeClass('_show');
		$('.box_tooltip .tooltip_cnt').next('.bg_arrow').remove();

	});
	// //151020 추가

	// 2016 삭제(보험 신상품출시와 함께 모두 암보험배너만 노출하기에 삭제함)

	// 사용 환경 진단 결과
	BrowserDetect.init();


	/* 화면 내 레이어 팝업 */
	var $box_layer_cont = $('.box_layer_cont');
	var $modal_back = $('#modal_layerP_back');

	//레이어 사이즈
	function box_layer(){
		$('#modal_layerP_back').css({
			'position':'fixed',
			'left':'0',
			'top':'0',
			'width':$(document).width(),
			'height':$(document).height(),
			'background-color':'rgb(0, 0, 0)',
			'z-index':'100',
			'filter':'alpha(opacity=60)'
		});
		$box_layer_cont.css({
			left:($(window).width() - $box_layer_cont.width())/2,
	        top:($(window).height() - $box_layer_cont.outerHeight())/2
		});
	}
	//리사이즈
	$(window).resize(function(){
		box_layer();
	});
	//레이어팝업 열기
	$(this).on('click','[data-click=btn_layerP]', function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		var t = $(this);
		var id = t.attr('data-target');
		var target = $('#'+id);
		$('html, body').css('overflow','hidden');
		$('body').append('<div id="modal_layerP_back"></div>');
		$('#modal_layerP_back').animate({'opacity':'0.6'},800).show();
		target.find('.wrap_pop .btn_close').show();
		target.animate({'opacity':'1'},500).show();
		box_layer();
		target.find('.container_layer').css({height : target.height() - $('.box_layer_cont .wrap_pop .ifrm').outerHeight()});
	});

	//레이어팝업 닫기
	$(document).on('click', '[data-click=btn_layerP_close]', function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		$('html, body').css('overflow','');
		$modal_back.animate({'opacity':'0'});
		$box_layer_cont.animate({'opacity':'0'}, function(){
			$(this).hide();
		});
		$('#modal_layerP_back').remove();
		$('[data-click=btn_layerP]').focus();
	});

});//end function


$(document).ready(function () {
	if($("#container").find("aside").is(".quick_aside")){
		quickOffset = $('.quick_aside').offset().top;
	}
});

