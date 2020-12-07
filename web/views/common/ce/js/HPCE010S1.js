/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * DESCRIPTION : PC 홈페이지 메인
 * ========================================================================== */

//=============================================================================
// 페이지 Context 변수
//=============================================================================

var HPCE010S1               = null; // 페이지별 함수 구분을 위한 object 선언
var HPCE010S1_PAGE_VARIABLE = null; // 페이지별 Context 변수 선언

//=============================================================================
// 페이지 Init 함수
//=============================================================================
/**
 * 페이지 Load시 실행되는 함수 (!함수 이름 변경 금지!)
 */
pageFunction = function(resGlobalPram){
 	/**
	 * 페이지 onLoad시 Init 정의
	 */
    initPage = (function(){

    	HPCE010S1.printData();

    	HPCE010S1.preDataHandler();
    	HPCE010S1.postDataHandler();

    	HPCE010S1.userOsBrowser.init();
	})();

    /**1
     * 페이지 onLoad시 이벤트 바인딩 정의
     */
    initEvent = (function(){

    	HPCE010S1.eventBinder();
    	HPCE010S1.eventHandler();
    })();

};


HPCE010S1 = {

		objOrgData    : null,					// 전문에서 받아온 Data
		objOrgInSData : null,					// inSData
		objOrgOutData : null,					// outSData
		ajaxLoading : true,						// 로딩여부
		epilogueCnt : 0,						// 가입후기 개수



		// --------------------------------------------------------------------
		// 이벤트 바인딩 영역
		// --------------------------------------------------------------------

		/**
		 * eventBinder 실행
		 */
		eventBinder : function() {

			// 다운로드 주소 전송
			$('#sendSms').unbind('click').bind('click', function(){

				if( HPCE010S1.checkValidate() ) {

					HPCE010S1.fn_sendSms();
				}
			});


			// 바른보장서비스 sms 전송
			$('#sendSms_barun').unbind('click').bind('click', function(){

				if( HPCE010S1.checkValidate_barun() ) {

					HPCE010S1.fn_sendSms_barun();
				}
			});

			$('#textCellphone').bind('keydown', function(e){
				return util.keyCodeNumChk(e, false);
			});


			// 개인정보 유출관련 필수 체크사항10가지 팝업
			$('#btn_privacy_lock').bind('click', function(){

				window.open('http://www.fss.or.kr/fss/kr/popup/privacy_lock.html','btn_privacy_lock', 'scrollbars=yes,toolbar=yes,resizable=yes, width=750, height=650, top=200, left=500');

			});

			// 소중한 개인정보 다함께 지켜요 팝업
			$('#btn_flash').bind('click', function(){

				window.open('https://youtu.be/2o5S1TZKEA0','btn_flash', 'scrollbars=yes,toolbar=yes,resizable=yes, width=720, height=480, top=300, left=500');
			});
			
			//보험사기근절 웹툰 팝업
			$('#btn_webtoon').bind('click', function(){

				window.open('/common/cc/HPCC250P1.dev','btn_flash', 'scrollbars=yes,toolbar=yes,resizable=yes, width=720, height=618, top=300, left=500');
			});

			//(팝업) 12월 절판마케팅
//			if( ( parseInt(util.getDate() + util.getTime()) >= 201612191800) &&  (parseInt(util.getDate()) < 20170101) ) {
			if( false ) {
				//네이버 브랜드 검색으로 인하여 20161220일부터 다시 진행
				if( util.isNull(util.getCookie("HPCC170P1_CLOSE")) ){
					window.open('/common/cc/HPCC170P1.dev','12_maketting', 'scrollbars=yes, width=545, height=595, left=500, top=200', '_blank');
				}
			}


			var $noticeBnTop = $('#box_banner_top');

			if (util.getCookie ('main_slide_banner_top') == "") {

					$noticeBnTop.show ();
			        $('.btn_banner_close').unbind ('click').click (function () {

			            var speed = 300
			            , chkBox = $('#cookieNoPop')
			            , closeMotion = function () {

			            	$noticeBnTop.animate ({
			                    	'marginTop': ($noticeBnTop.height () - 3) * -1
			                	},
			                	speed,function () {

			                	$noticeBnTop.hide ();
			                });
			            };

			            if (chkBox.is (':checked')) {

			                util.setCookie ('main_slide_banner_top', '1day', { expires: 1,  path : '/' });
			            }
			            closeMotion ();
			        });
			}else{
				$('.box_banner').hide ();
			}



			$('#popup_HPPD401P1').unbind('click').bind('click', function(){
				var option = {
						id : 'popupwrap',
						location : 'external',
						content : 'content1',
						width : 700,
						height : 615,
						url : '/products/pd/HPPD401P1.dev'
				};

				PageUtil.openPopup(option);
			});

			$('#popup_HPCC240P1').unbind('click').bind('click', function(){
				var option = {
						id : 'popupwrap',
						location : 'external',
						content : 'content1',
						width : 700,
						height : 550,
						url : '/common/cc/HPCC240P1.dev'

				};

				PageUtil.openPopup(option);
			});

		},

		/**
		 * eventHandler 실행
		 */
		eventHandler : function() {

		},

		/**
		 * 전처리 데이터 핸들러
		 */
		printData : function() {

			// TODO 기능 구현부
			HPCE010S1.objOrgInSData = globalVar.getParam('inSData');
			HPCE010S1.objOrgOutData = globalVar.getParam('outData');

			/** 에필로그 시작*/

	    	HPCE010S1.setCallBack(HPCE010S1.objOrgOutData.epilogueData);


			/** 에필로그 끝*/

			/** 공지사항 시작 */
			if(HPCE010S1.objOrgOutData.notice != undefined){
				var noticeObj = "";
				list = HPCE010S1.objOrgOutData.notice.list;

				for(i=0; i<3; i++){
					data = list [i];
					noticeObj += '<li class="li">';
					noticeObj += '    <strong class="category">공지사항</strong>';
					noticeObj += '    <span class="date">'+util.setFmDate(data.frstRgYmd)+'</span>';
					noticeObj += '    <p class="tit">';
					noticeObj += '        <a href="/contact/noti/HPCF01S1.dev?notiSrno='+ data.notiSrno+'" name="notiTitl"  data-weblogclick= '+"\'"+'{"actn":"'+data.notiTitl+'", "labl":"새소식", "clsf":"메인링크"}'+"\'"+'>'+data.notiTitl+'</a>';
					noticeObj += '    </p>';
					noticeObj += '</li>';
				}
				$("#noticeDiv").append(noticeObj);
			}
			/** 공지사항 끝 */

			//비과세 절판팝업
			if (util.getDateTime() <= '20170314180000' || (util.getDateTime() >= '20170316000000' && util.getDateTime() <= '20170331140000')) {
				if( util.isNull(util.getCookie("HPCC200P1_COOKIE")) ){
					window.open('/common/cc/HPCC200P1.dev','HPCC200P1', 'location=no,scrollbars=yes,menubar=no,toolbar=no,resizable=yes, width=546, height=764, top=200, left=0', '_blank');
				}
			}
			
			//보장성보험 절판팝업(2020.02)
			if (util.getDate() < '20200401') {
				if( util.isNull(util.getCookie("HPCC270P1_COOKIE")) ){
					window.open('/common/cc/HPCC270P1.dev','HPCC270P1', 'location=no,scrollbars=yes,menubar=no,toolbar=no,resizable=yes, width=550, height=800, top=100, left=0', '_blank');
				}
			}
			
			//코로나 대출 쿠폰 
			if (util.getDate() >= '20200420' && util.getDate() <= '20200519' ) {
				if( util.isNull(util.getCookie("HPCC280P1_POP_CLOSE")) ){
					window.open('/common/cc/HPCC280P1.dev','HPCC280P1', 'location=no,scrollbars=yes,menubar=no,toolbar=no,resizable=yes, width=550, height=460, top=100, left=0', '_blank');
				}
			}
			

			// PC메인화면 안내 팝업
			 HoliDyPop.open(); 
			 
			 if(window.navigator.userAgent.toUpperCase().indexOf('MSIE 11.0') >-1  || window.navigator.userAgent.toUpperCase().indexOf('TRIDENT/7')>1){
				$("#showIe11").show();
				$(".img_ie8").hide();
				$("#video_pet").hide();
			}else{
				//$(".img_ie8").show();
				$("#video_pet").show();
			}
			
			//추석 연휴 고객센터 이용 안내 팝업
			if(util.isNull(util.getCookie("HPCC090P1_POP_CLOSE"))){
				var objOption ={};
				
				var startDate = 202010050000;
				var endDate   = 202010101600;
				var dataTime = util.getDate() + util.getTime();
				// 테스트서버는 노출되도록 수정
				if(location.href.indexOf('hpt')>-1){
					startDate = parseInt(dataTime);
				}
				
				if( parseInt(dataTime) >= startDate && parseInt(dataTime) <= endDate ){
					objOption.width ='550';
					objOption.height ='490';
					util.wPopPage('/common/cc/HPCC090P1.dev',objOption);
				} 
			}
			
			// weblog
			webLog.runCriteo('main');
		},
		
		/**
		 * 전처리 데이터 핸들러
		 */
		preDataHandler : function() {

			// 비주얼
			fnMainVisual();
			// 해쉬
			fnTabActive();

			// 페이지 로드 후 첫번째 레이블 선택
			$('.main_visual_nav li.navigation a')
			.first ()
				.click ();

			// 페이지 로드 후 첫번째 해쉬 선택
			$('div.main_sorting_area>div.tab_sorting>ul>li>a')
			.first ()
				.click ();

			// 배너 처리
//			$.eventFn();


			//이동통신사(국내) select option 설정
			var slt_cphn_arr = commonData.getCode('cellCode');

			//전화번호 국번 피커셋팅
			PageUtil.drawSelectBoxOption(slt_cphn_arr,'hndTphArno',{'emptyFlag':  false});

			PageUtil.drawSelectBoxOption(slt_cphn_arr,'selectCellphone',{'emptyFlag':  false});
		},

		/**
		 * 후처리 데이터 핸들러
		 */
		postDataHandler : function() {

		},
		custEpilogue : function (data){
			/*
			 * Part: 가입후기 슬라이드
			 * 2015.04.07 [애드캡슐 퍼블리싱 박현아]
			 */

			/**  2015.05.19 김혜련 수정 시작**/
				var $reviewArea = $('.review_area');
				var listReview = '<ul class="list_review"></ul>',
					listReviewLi = '';
				var num = 0;

				var reviewAjaxCnt = 1;

				var $reviewSlideBtn = $('.review_btn'),
					$reviewBtnPrev = '<button class="prev"><span class="blind">이전</span></button>',
					$reviewBtnNext = '<button class="next"><span class="blind">다음</span></button>',
					$reviewSpanPrev = '<span class="prev"><span class="blind">이전</span></span>',
					$reviewSpanNext = '<span class="next"><span class="blind">다음</span></span>';


				if(!$.isEmptyObject(data)){
					var tmpCnt = data.length < 15 ? data.length : 15;

					for (var i = 0; i < tmpCnt; i++){
						var contents = util.setStrCutDot(util.replaceAll(util.setHtmlParsing(data[i].text), "<br />", " ").replace(/</gim, '&lt;').replace(/>/gim, '&gt;'), "60", ".....")
						, avgGrade = util.ceil ((util.Number (data[i].entConvncCmps) + util.Number (data[i].goodStsftCmps)) / 2, 1);

						// 유지후기일 때
						if(data[i].epilogueScCd == '02'){
							avgGrade = util.ceil ((util.Number (data[i].dutjDalStsftCmps) + util.Number (data[i].insPrsRlblCmps)) / 2, 1);
						}

						// 보험업무 구분 추가
						var cmnnCdDsNm = '';
		                $.each(HPCE010S1.objOrgOutData.commoncode11491, function(idx, cdData){
							if (data[i].dutjMdclCd == cdData.cmnnCd) {
								cmnnCdDsNm = cdData.cmnnCdDs;
							}
						});
		                
		                var gndrNm = Number(data[i].gndrCd) % 2 === 0 ? '여자' : '남자';
		                var epliogueId = data[i].epilogueId + '_' + data[i].epilogueScCd;

						listReviewLi += '<li>';
						listReviewLi += '	<strong class="tit">' + data[i].rrsnGoodNm + ' / <span>' + cmnnCdDsNm + '</span></strong>';
						listReviewLi += '	<div class="desc">'
						listReviewLi += '       <a href="javascript:HPCE010S1.fn_onclick_detail(\''+ epliogueId + '\');">'+ contents + '</a>';
						listReviewLi += '   </div>';
						listReviewLi += '	<div class="addition">';
						listReviewLi += '		<div class="info_addition">';
						listReviewLi += '			<div class="area_count">평점<span class="num">'+avgGrade+'</span></div>';
						listReviewLi += '			<strong class="name">' + data[i].mask_cstHanNm + ' / ' + data[i].entAge + '세 / ' + gndrNm + ' <span class="date">' + util.setDotFmDate(data[i].frstRgiYmd) + '</span></strong>';
						listReviewLi += '		</div>';
						listReviewLi += '	</div>';
						listReviewLi += '</li>';
					}
				}

				$reviewArea.append(listReview);
				$reviewArea.find('.list_review').append(listReviewLi);

				listReviewLi = '';

				var $listReview = $reviewArea.find('.list_review'),
					$listReviewLi = $listReview.find('>li'),
					listReviewLiW = $listReviewLi.outerWidth(true),
					listReviewLiLen = $listReviewLi.length;

				$listReview.css('width', (listReviewLiW*listReviewLiLen));
				// 2015.05.19 김혜련 삭제

				$reviewSlideBtn.append($reviewSpanPrev, $reviewBtnNext);

				var currentNum = 0;
				var animateNum = 0;
				var listReviewLiCnt = 0;
				var listReviewPosL = 0,
					listReviewLiOnPosL = 0;

				$(document).on('click', '.review_btn .next',function(event){

					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					listReviewLiCnt = $(".list_review>li").length - 3;

					if(currentNum < listReviewLiCnt){
						currentNum+=3;
						animateNum++;

						if(currentNum == 3){
							$reviewSlideBtn.find('.prev').remove();
							$reviewSlideBtn.append($reviewBtnPrev);
						}

						$listReviewLi = $listReview.find('>li');
						listReviewLiLen = $listReviewLi.length;
						$listReview.css('width', (listReviewLiW*listReviewLiLen));

						$listReview.stop().animate({left: -999 * animateNum});



					}else{
						if(ajaxLoading == true ){
							HPCE010S1.epilogueAjaxData(++reviewAjaxCnt);
							ajaxLoading = false;
						}
					}
					if(currentNum+2 == epilogueCnt || currentNum+3 == epilogueCnt || currentNum+4 == epilogueCnt){
						$reviewSlideBtn.find('.next').remove();
						$reviewSlideBtn.append($reviewSpanNext);
					}
				}); //end click next

				$(document).on('click', '.review_btn .prev',function(event){

					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					listReviewLiCnt = $(".list_review>li").length - 3;

					if(currentNum > 0){
						if(currentNum+2 == epilogueCnt || currentNum+3 == epilogueCnt || currentNum+4 == epilogueCnt){
							$reviewSlideBtn.find('.next').remove();
							$reviewSlideBtn.append($reviewBtnNext);
						}
						currentNum-=3;
						animateNum--;

						if(currentNum == 0){
							$reviewSlideBtn.find('.prev').remove();
							$reviewSlideBtn.append($reviewSpanPrev);
						}

						$listReviewLi = $listReview.find('>li');
						listReviewLiLen = $listReviewLi.length;
						$listReview.css('width', (listReviewLiW*listReviewLiLen));

						$listReview.stop().animate({left: -999 * animateNum});

					}

				}); //end click prev

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
		},

		/**  2015.05.19 김혜련 수정 끝**/

		//가입후기 Ajax
		 epilogueAjaxData : function(currentPage) {

			 currentPage 			= currentPage.toString();

			var reqData = new Object();

			reqData.PAGE 			= currentPage;
			reqData.PAGE_FIRST_ROW 	= 1 + (currentPage-1)*15;
			reqData.PAGE_ROW_SIZE 	= "15";										//한페이지 게시 갯수

			var tranProp       		= util.clone(transaction.TRAN_COMM_PROP);   // 트랜잭션 기본 객체 복사
			tranProp.url        	= '/innovation/ip/HPIP100S1';               // 트랜잭션 Url
			tranProp.tradeKey   	= 'retrieveCIA401A01';                      // 트랜잭션 TradeKey
			tranProp.async			= false;
			tranProp.params     	= reqData;            						// 트랜잭션 Parameter
			tranProp.loadFlag   	= false;

			if(currentPage == "1" ){
				tranProp.success    = HPCE010S1.setCallBack;
			}else{
				tranProp.success    = HPCE010S1.appendCallBack;
			}

			// 트랜잭션 실행
			transaction.callTran(tranProp);
		},

		/**
		 * 화면에 ajax data를 출력한다.
		 */
		setCallBack : function(orgOutData) {

			$('.box_loading01').hide();

			orgOutData = orgOutData || new Object();
			
		    list = orgOutData.cstEplgList;            // 경험후기 목록
		    listCnt = orgOutData.INQR_TOTAL_CNT || 0; // 조회된 경험후기 목록 건수

		    if (util.chkReturn(orgOutData.cstEplgInfo, 's') != ''){

		    	var cmps = orgOutData.cstEplgInfo[0];

		    	epilogueCnt = cmps.rgiCcn;

		    	// 평점 표시
				var sumCmps = util.Number(cmps.dutjDalStsftCmps) + util.Number(cmps.insPrsRlblCmps) + util.Number(cmps.entConvncCmps) + util.Number(cmps.goodStsftCmps);
				var avgGrade = util.floor(sumCmps/util.Number(cmps.totCcn)/2, 1);

				// 전체평점
				$("#totalCnt").text(avgGrade);

				// 전체 가입후기 개수
				$('#gradeCnt').text (util.setCommas (epilogueCnt) + '건');
			}

		    HPCE010S1.custEpilogue(list);  // 화면에 출력
		    ajaxLoading = true;
		},

		/**
		 * 화면에 ajax data를 출력한다.
		 */
		appendCallBack : function(ajaxRsData) {
		    orgInSData = (ajaxRsData.inSData);    // objOrgData의 input data를 objOrgInSData에 대입
		    orgOutData = (ajaxRsData.outData);    // objOrgData의 output data를 objOrgOutData에 대입

		    var listReviewLi = "";

		    var list = orgOutData.cstEplgList || [];
		    var listCnt = list.length;
		    
		    if(listCnt === 0) {
		    	return false;
		    }
		    
		    for(var i = 0; i < listCnt; i++) {
		    	var data = list[i];

				var contents = util.setStrCutDot(util.replaceAll(util.setHtmlParsing(data.text), "<br />", " ").replace(/</gim, '&lt;').replace(/>/gim, '&gt;'), "60", ".....") // XSS 방어
				, avgGrade = util.ceil ((util.Number (data.entConvncCmps) + util.Number (data.goodStsftCmps)) / 2, 1);

				// 계약관리후기일 때
				if(data.epilogueScCd == '02'){
					avgGrade = util.ceil ((util.Number (data.dutjDalStsftCmps) + util.Number (data.insPrsRlblCmps)) / 2, 1);
				}

				// 보험업무 구분 추가
				var cmnnCdDsNm = '';
                $.each(HPCE010S1.objOrgOutData.commoncode11491, function(idx, cdData){
					if (data.dutjMdclCd == cdData.cmnnCd) {
						cmnnCdDsNm = cdData.cmnnCdDs;
					}
				});
                
                var epliogueId = data.epilogueId + '_' + data.epilogueScCd;
                var gndrNm = Number(data.gndrCd) % 2 === 0 ? '여자' : '남자';

				listReviewLi += '<li>';
				listReviewLi += '	<strong class="tit">' + data.rrsnGoodNm + ' / <span>' + cmnnCdDsNm + '</span></strong>';
				listReviewLi += '	<div class="desc">';
				listReviewLi += '       <a href="javascript:HPCE010S1.fn_onclick_detail(\''+ epliogueId + '\');">'+ contents + '</a>';
				listReviewLi += '   </div>';
				listReviewLi += '  	<div class="addition">';
				listReviewLi += '		<div class="info_addition">';
				listReviewLi += '			<div class="area_count">평점<span class="num">' + avgGrade + '</span></div>';
				listReviewLi += '			<strong class="name">' + data.mask_cstHanNm + ' / ' + data.entAge + '세 / ' + gndrNm + ' <span class="date">' + util.setDotFmDate(data.frstRgiYmd) + '</span></strong>';
				listReviewLi += '	    </div>';
				listReviewLi += '   </div>';
				listReviewLi += '</li>';
			}

		    $(".list_review").append(listReviewLi);

		    $('.review_area>.list_review').css ('width', $('.review_area>.list_review>li').length * 56);
		    $('div.review_btn>button.next').click ();
		    ajaxLoading = true;
		},

		 // 미리보기 레이어팝업
		fn_onclick_popup : function(data){

			if(util.chkReturn(data, 's') != ''){

				var epilogueId = data.split('_')[0];
				var epilogueScCd = data.split('_')[1];

			}

			 var option = {
		             id : 'detailView',
		             location : 'external',
		             content : 'content1',
		             width: "650",
		             height: "650",
		             url : "/lifesquare/ls/HPLD01P0.dev?epilogueId="+epilogueId + "&epilogueScCd=" + epilogueScCd
	//		              url : "/lifesquare/ls/HPLD01P0.dev?jpId="+jpId


		     };
		     PageUtil.openPopup(option);
//		     return false;
		 },

		
		//상세조회 페이지이동
		fn_onclick_detail : function (data){

			var nextData = new Object();
			if(util.chkReturn(data, 's') != ''){

				nextData.epilogueId 	= data.split('_')[0];
				nextData.epilogueScCd 	= data.split('_')[1];

			}

			// GET방식으로 SUBMIT
//			PageUtil.movePage("/innovation/ip/HPIP101S1", nextData);
			PageUtil.movePage("/innovation/ip/HPIP101S1", nextData, undefined, "GET");
		},

		/**
		 * 폼 데이터를 OBJECT형태로 반환
		 *
		 * @input : string selector
		 * @output : object object
		 * */
		getFormDataObject : function (selector) {

			var $form = $(selector)
			, returnObject = {};

			// INPUT 데이터
			$.each ($form.serializeArray (), function (idx, data) {

				returnObject[ data.name ] = data.value;
			});

			return returnObject;
		},

		/**
		 *  사용자 환경 진단 안내 팝업
		 */
		userOsBrowser : (function () {

			var _private = { chkType : '' }, _public = {};


			_private.chkOs = function () {

				var osType = userOS;

				// 윈도우
				if ( osType.indexOf('Windows') > -1 ) {
					if ( osType.indexOf('Vista') > -1 || osType.indexOf('XP') > -1  ) {
						_private.chkType = 'oldOs';
					} else {
						_private.chkBrowser();
					}
				// 맥
				} else if ( osType.indexOf('Mac') > -1 ) {
					_private.chkMac();
				// 기타 운영체제
				} else {
					_private.chkType = 'otherOs';
				}

			};

			_private.chkBrowser = function () {

				var browserType = userBrowser;
				var browserVer  = util.Number(userBrowserVer);

				// Edge 13
				if ( browserType.indexOf('Edge') > -1 ) {
					if ( browserVer < 13 ) {
						_private.chkType = 'oldBrowser';
					}
				// IE Ver 9 미만
				} else if ( browserType.indexOf('Explorer') > -1 ) {
					if ( browserVer < 9 ) {
						_private.chkType = 'oldBrowser';
					}
				// chrome 46
				} else if ( browserType.indexOf('Chrome') > -1 ){
					if ( browserVer < 46 ) {
						_private.chkType = 'oldBrowser';
					}
				// 기타 브라우져
				} else {
					_private.chkType = 'otherBrowser';
				}
			};


			_private.chkMac = function () {

				var MacOs		= util.replaceAll(util.mTrim(navigator.userAgent.toUpperCase()), '_', '.')
				, startStr		= MacOs.indexOf('MACOSX')+6
				, MacOsVer		= util.Number(MacOs.substring(startStr, startStr+4))
				, browserType	= userBrowser
				, browserVer	= util.Number(userBrowserVer);

				if ( MacOsVer >= 10.8 || MacOsVer == 10.1 ) {
					// 사파리
					if ( browserType.indexOf('Safari') > -1 ) {
						if ( browserVer < 9.0) {
							_private.chkType = 'oldBrowser';
						}
					// 기타 브라우저	(Chrome 제외)
					}else if ( browserType.indexOf('Chrome')  < 0 ){
						_private.chkType = 'otherBrowser';
					}
				}else {
					_private.chkType = 'oldOs';
				}

			},

			/**
			 * 초기화
			 * */
			_public.init = function () {

				_private.chkOs ();
				if ( _private.chkType != '' ) {
					if ( util.getCookie('HPCC180P1_CHK') == '' ) {
						window.open('/common/cc/HPCC180P1.dev?chkType=' + _private.chkType ,'7days', 'location=no,scrollbars=yes,menubar=no,toolbar=no,resizable=yes, width=830, height=504, top=200, left=570', '_blank');
					}
				}

			};

			return _public;

		}()),
		/**
		 * 유효성 체크
		 */
		// 휴대전화번호 체크
		checkValidate  : function(data){

			if($("#hndTphArno").val()==""){
				alert("휴대전화번호를 확인해주세요.");
				$("#hndTphArno").val("010");
				$('#hndTphArno').fakeselect();
				$("#hndTphArno").focus();
				return false;
			}

			if($("#hndTphno1").val()==""){
				alert("휴대전화번호를 입력해주세요.");
				$("#hndTphno1").focus();
				return false;
			}


			if($("#hndTphno2").val()==""){
				alert("휴대전화번호를 입력해주세요.");
				$("#hndTphno2").focus();
				return false;
			}

			if (util.isDigit($("#hndTphArno").val()+$("#hndTphno1").val()+$("#hndTphno2").val()) == false) {
				alert("휴대전화번호를 확인해주세요.");
				$("#hndTphArno").val("010");
				$("#hndTphno1").val("");
				$("#hndTphno2").val("");
				return false;
			}

			return true;
		},

		checkValidate_barun  : function(data){

			if($("#selectCellphone").val()==""){
				alert("휴대전화번호를 확인해주세요.");
				$("#selectCellphone").val("010");
				$('#selectCellphone').fakeselect();
				$("#selectCellphone").focus();
				return false;
			}

			if($("#textCellphone").val()==""){
				alert("휴대전화번호를 입력해주세요.");
				$("#textCellphone").focus();
				return false;
			}

			if (util.isDigit($("#selectCellphone").val()+$("#textCellphone").val()) == false) {
				alert("휴대전화번호를 확인해주세요.");
				$("#selectCellphone").val("010");
				$("#textCellphone").val("");
				return false;
			}

			return true;
		},

		fn_sendSms : function() {

			var paramObj = new Object();
			paramObj.hndTphArno =  $('#hndTphArno').val();
			paramObj.hndTphKukno = $('#hndTphno1').val();
			paramObj.hndTphIdvno = $('#hndTphno2').val();

			var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
			tranProp.url        = '/products/pa/HPPA500S1';           		// 트랜잭션 Url
			tranProp.tradeKey   = 'tradekey_sendSms';						// 트랜잭션 TradeKey
			tranProp.params     = paramObj;                      			// 트랜잭션 Parameter
			tranProp.success    = HPCE010S1.successCallBackSendSms; 		// Success Callback
			tranProp.failure    = HPCE010S1.failureCallbackSendSms;			// Failure Callback

			// 트랜잭션 실행
			transaction.callTran(tranProp);
		},

		successCallBackSendSms : function (data) {
			alert("정상적 발송되었습니다.");
		},

		fn_sendSms_barun : function() {

			var phoneMiddle = "";
			var phonelast = "";

			if ( $("#textCellphone").val().length == 7 ) {
				phoneMiddle = $("#textCellphone").val().substring(0,3);
				phonelast = $("#textCellphone").val().substring(3);
			} else if ( $("#textCellphone").val().length == 8 ) {
				phoneMiddle = $("#textCellphone").val().substring(0,4);
				phonelast = $("#textCellphone").val().substring(4);
			}

			var paramObj = new Object();

			paramObj.hndTphArno       		= $('#selectCellphone').val();
			paramObj.hndTphKukno      	    = phoneMiddle;
			paramObj.hndTphIdvno      		= phonelast;
			paramObj.fridNm					= "";
			paramObj.insConNo 		  		= "00000000000";
	        paramObj.ntleCd           		= "S097";				// 안내장 코드
	        paramObj.smsPmlYn         		= "N"; 					// "N"   LMS일경우 N값 셋팅
	        paramObj.lmsTitlText      		= "라이프플래닛 안내";    	// LMS일경우 LMS용 제목내용 셋팅
	        paramObj.gubun			  		= "single";						// 구분 단일: single , 다중: multi , 친구 : frid
	        paramObj.notiTextItemDataText   = "";  					// 추가안내내용 "a,b,c"
	        paramObj.notiTextCndt_cnt 		= 1;							// 안내내용발생건수
	        paramObj.url 			  		= "/analysis/na/NA01000S.dev";	// "MWCE010S1"

			var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
			tranProp.url        = '/common/cc/HPCommonUtil';           		// 트랜잭션 Url
			tranProp.tradeKey   = 'tradekey_sendSms';						// 트랜잭션 TradeKey
			tranProp.params     = paramObj;                      			// 트랜잭션 Parameter
			tranProp.success    = HPCE010S1.successCallBackSendSms; 		// Success Callback
			tranProp.failure    = HPCE010S1.failureCallbackSendSms;			// Failure Callback

			// 트랜잭션 실행
			transaction.callTran(tranProp);
		},


		/**
		 * 조회 AJAX 실패 Callback
		 */
		failureCallback : function(data) {
			// TODO : Failure 후처리 작성부
			logger.alert(data.outData.ERROR_MSG);
		},

		/**
		 * 전화상담/간편가입예약
		 */
		fnHPCT103P1 : function(){
			var option = {
					type : "modal",
					id : 'detailView',
					location : 'external',
					content : 'content1',
					url : "/contact/ct/HPCT103P1.dev",
					width: 750,
					height: 785
				};

			PageUtil.openPopup(option);
		},
		/**
		 * 이메일 상담예약
		 */
		fnHPCT131P1 : function(){
			HPCE010S1.objParam = new Object();//초기화
			var tranProp 		= util.clone(transaction.TRAN_COMM_PROP);	// 트랜잭션 기본 객체 복사
			tranProp.url        = '/common/view/HOLYDAYINFO';           		// 트랜잭션 Url
			tranProp.tradeKey   = 'HOLIDAY_INFO';       						// 트랜잭션 TradeKey
			tranProp.params     = HPCE010S1.objParam;            			// 트랜잭션 Parameter
			tranProp.success    = HPCE010S1.ajaxCallBackHolidayInfo;  			// Success Callback
			tranProp.failure    = HPCE010S1.failureCallback;  		// Failure Callback

			// 트랜잭션 실행
			transaction.callTran(tranProp);
		},
		/**
		 * AJAX 성공 CALLBACK  - 이메일상담 관련& 휴일정보
		 */
		ajaxCallBackHolidayInfo : function(response){

			objCutData = {};

			objCutData = response.outData;

			var option = {
					type : "modal",
					id : 'detailView',
					location : 'external',
					content : 'content1',
					url : "/contact/ct/HPCT131P1.dev",
					height : 720
			};

			PageUtil.openPopup(option);


		},
};