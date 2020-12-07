/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : mw.commData.js, /resources/js/
 * DESCRIPTION : 공통으로 사용되는 코드 집합
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2014-12-30		initial version
 * ========================================================================== */

/******************************************************************************
 *
 * [[ 공통 코드 ]]
 * 
 * 1) 사용 방법
 * 
 * commonData.getCode('telCode1'); 와 같이 id 값을 입력하여 공통코드를 취득한다.
 * 
 * 2) 코드 목록
 *  
 * telCode		             : 지역 번호(국내)
 * cellCode		             : 이동통신 번호(국내)
 * allTelCode	             : 이동통신 번호(국내)  +  이동통신 번호(국내)
 * emailCode	             : 이메일
 * categoryCode	             : 카테고리 코드
 * hourCode	                 : 시간 코드
 * minCode	                 : 분 코드
 * cardMonth	             : 카드 월 코드
 * cardYear	                 : 카드 년 코드
 * applyPath	             : 모집경로 코드
 * militaryKind	             : 군별 코드
 * militaryStat	             : 병역구분 코드
 * disabledSection	         : 산재구분 코드
 * disabledKind	             : 장애구분 코드
 * disabledKindLevel	     : 장애등급 코드
 * severeYn	                 : 중증여부 코드
 * lastEdu	                 : 학력 코드
 * lastEduStat	             : 학력상태 코드
 * schoolArea	             : 학교지역 코드
 * postArea	                 : 우편 지역 코드
 * postAreaSeoul	         : 우편 서울 코드
 * postAreaBusan	         : 우편 부산 코드
 * postAreaDaegu	         : 우편 대구 코드
 * postAreaIncheon	         : 우편 인천 코드
 * postAreaGwangju	         : 우편 광주 코드
 * postAreaDaejeon	         : 우편 대전 코드
 * postAreaUlsan	         : 우편 울산 코드
 * postAreaGangwondo	     : 우편 강원도 코드
 * postAreaGyeonggido	     : 우편 경기도 코드
 * postAreaGyeongsangnamdo	 : 우편 경남 코드
 * postAreaGyeongsangbukdo	 : 우편 경북 코드
 * postAreaJeonlanamdo	     : 우편 전남 코드
 * postAreaJeonlabukdo	     : 우편 전북 코드
 * postAreaChungcheongbukdo	 : 우편 충북 코드
 * postAreaJejudo	         : 우편 제주 코드
 * empStat	                 : 고용형태 코드
 * licenceGrade	             : 자격등급 코드
 * languageKind	             : 언어 종류 코드
 * testKind	                 : 시험 종류 코드
 * testGrade	             : 시험 등급 코드
 * familyRtn	             : 가족관계 코드
 * 
 *****************************************************************************/


/**
 * 공통으로 사용되는 코드 집합
 */
var commonData = (function() {
	var _public = {};
	var _private = {};
	
	var date = util.getDate();
	var dateFullYear = Number(date.substring(0,4));
	
	/**
	 * 지역 번호(국내)
	 * 추후 공통코드에서 가져오도록 변경 
	 */
	_private.telCode = [
			{'cmnnCd':'02',		'cmnnCdHanNm':'02'},
			{'cmnnCd':'031',	'cmnnCdHanNm':'031'},
			{'cmnnCd':'032',	'cmnnCdHanNm':'032'},
			{'cmnnCd':'033',	'cmnnCdHanNm':'033'},
			{'cmnnCd':'041',	'cmnnCdHanNm':'041'},
			{'cmnnCd':'042',	'cmnnCdHanNm':'042'},
			{'cmnnCd':'043',	'cmnnCdHanNm':'043'},
			{'cmnnCd':'044',	'cmnnCdHanNm':'044'},
			{'cmnnCd':'051',	'cmnnCdHanNm':'051'},
			{'cmnnCd':'052',	'cmnnCdHanNm':'052'},
			{'cmnnCd':'053',	'cmnnCdHanNm':'053'},
			{'cmnnCd':'054',	'cmnnCdHanNm':'054'},
			{'cmnnCd':'055',	'cmnnCdHanNm':'055'},
			{'cmnnCd':'061',	'cmnnCdHanNm':'061'},
			{'cmnnCd':'062',	'cmnnCdHanNm':'062'},
			{'cmnnCd':'063',	'cmnnCdHanNm':'063'},
			{'cmnnCd':'064',	'cmnnCdHanNm':'064'},
			{'cmnnCd':'070',	'cmnnCdHanNm':'070'},
			{'cmnnCd':'0502',	'cmnnCdHanNm':'0502'},
			{'cmnnCd':'0503',	'cmnnCdHanNm':'0503'},
			{'cmnnCd':'0504',	'cmnnCdHanNm':'0504'},
			{'cmnnCd':'0505',	'cmnnCdHanNm':'0505'},
			{'cmnnCd':'0507',	'cmnnCdHanNm':'0507'}
			
	];
	
	/**
	 * 이동통신 번호 국내
	 */
	_private.cellCode = [
 			{'cmnnCd':'010',	'cmnnCdHanNm':'010'},
			{'cmnnCd':'011',	'cmnnCdHanNm':'011'},
			{'cmnnCd':'016',	'cmnnCdHanNm':'016'},
			{'cmnnCd':'017',	'cmnnCdHanNm':'017'},
			{'cmnnCd':'018',	'cmnnCdHanNm':'018'},
			{'cmnnCd':'019',	'cmnnCdHanNm':'019'}
	];
	
	/**
	 * 이동통신 회사 국내
	 */
	_private.cellCompanyCode = [
	        {'cmnnCd':'empty',  'cmnnCdHanNm':'선택'},
 			{'cmnnCd':'skt',	'cmnnCdHanNm':'SKT'},
			{'cmnnCd':'kt' ,	'cmnnCdHanNm':'KT'},
			{'cmnnCd':'lgt',	'cmnnCdHanNm':'LGT'},
			{'cmnnCd':'sktAl',	'cmnnCdHanNm':'SKT알뜰폰'	},
			{'cmnnCd':'ktAl',	'cmnnCdHanNm':'KT알뜰폰'	},
			{'cmnnCd':'lgtAl',	'cmnnCdHanNm':'LGT알뜰폰'	}
	];
	
	/**
	 * 이동통신 회사 국내(청약)
	 */
	_private.cellCompanyCodeInsu = [
	                            {'cmnnCd':'',  'cmnnCdHanNm':'통신사 선택'},
	                            {'cmnnCd':'01',	    'cmnnCdHanNm':'SKT'},
	                            {'cmnnCd':'02' ,	'cmnnCdHanNm':'KT'},
	                            {'cmnnCd':'03',		'cmnnCdHanNm':'LGT'},
	                            {'cmnnCd':'04',		'cmnnCdHanNm':'SKT알뜰폰'	},
	                            {'cmnnCd':'05',		'cmnnCdHanNm':'KT알뜰폰'	},
	                            {'cmnnCd':'06',		'cmnnCdHanNm':'LGT알뜰폰'	}
	 ];
	
	/**
	 * 이메일 코드
	 */
	_private.emailCode = [
            {'cmnnCd':'직접입력',			'cmnnCdHanNm':'직접입력'},
 			{'cmnnCd':'naver.com',		'cmnnCdHanNm':'naver.com'},
 			{'cmnnCd':'gmail.com',		'cmnnCdHanNm':'gmail.com'},
 			{'cmnnCd':'daum.net',		'cmnnCdHanNm':'daum.net'},
 			{'cmnnCd':'nate.com',		'cmnnCdHanNm':'nate.com'},
 			{'cmnnCd':'empal.com',		'cmnnCdHanNm':'empal.com'},
 			{'cmnnCd':'chol.com',		'cmnnCdHanNm':'chol.com'},
 			{'cmnnCd':'hotmail.com',	'cmnnCdHanNm':'hotmail.com'},
 			{'cmnnCd':'msn.com',		'cmnnCdHanNm':'msn.com'},
 			{'cmnnCd':'me.com',			'cmnnCdHanNm':'me.com'}
 	];
	
	/**
	 * 카테고리 코드
	 */
	_private.categoryCode = [
 	        {'cmnnCd':'01',		'cmnnCdHanNm':'상품'},
	        {'cmnnCd':'02',		'cmnnCdHanNm':'가입/철회'},
	        {'cmnnCd':'03',		'cmnnCdHanNm':'유지/변경/해지'},
	        {'cmnnCd':'04',		'cmnnCdHanNm':'보험료납입/대출'},
	        {'cmnnCd':'05',		'cmnnCdHanNm':'보험금신청'},
	        {'cmnnCd':'06',		'cmnnCdHanNm':'홈페이지이용'}
	];
	
	/**
	 * 시간 코드
	 */
	_private.hourCode = [
            {'cmnnCd':'00', 'cmnnCdHanNm':'00'},
			{'cmnnCd':'01', 'cmnnCdHanNm':'01'},
			{'cmnnCd':'02', 'cmnnCdHanNm':'02'},
			{'cmnnCd':'03', 'cmnnCdHanNm':'03'},
			{'cmnnCd':'04', 'cmnnCdHanNm':'04'},
			{'cmnnCd':'05', 'cmnnCdHanNm':'05'},
			{'cmnnCd':'06', 'cmnnCdHanNm':'06'},
			{'cmnnCd':'07', 'cmnnCdHanNm':'07'},
			{'cmnnCd':'08', 'cmnnCdHanNm':'08'},
			{'cmnnCd':'09', 'cmnnCdHanNm':'09'},
			{'cmnnCd':'10', 'cmnnCdHanNm':'10'},
			{'cmnnCd':'11', 'cmnnCdHanNm':'11'},
			{'cmnnCd':'12', 'cmnnCdHanNm':'12'},
			{'cmnnCd':'13', 'cmnnCdHanNm':'13'},
			{'cmnnCd':'14', 'cmnnCdHanNm':'14'},
			{'cmnnCd':'15', 'cmnnCdHanNm':'15'},
			{'cmnnCd':'16', 'cmnnCdHanNm':'16'},
			{'cmnnCd':'17', 'cmnnCdHanNm':'17'},
			{'cmnnCd':'18', 'cmnnCdHanNm':'18'},
			{'cmnnCd':'19', 'cmnnCdHanNm':'19'},
			{'cmnnCd':'20', 'cmnnCdHanNm':'20'},
			{'cmnnCd':'21', 'cmnnCdHanNm':'21'},
			{'cmnnCd':'22', 'cmnnCdHanNm':'22'},
			{'cmnnCd':'23', 'cmnnCdHanNm':'23'}
    ];
	
	/**
	 * 분 코드
	 */
	_private.minCode = [
           	{'cmnnCd':'00', 'cmnnCdHanNm':'00'},
			{'cmnnCd':'01', 'cmnnCdHanNm':'01'},
			{'cmnnCd':'02', 'cmnnCdHanNm':'02'},
			{'cmnnCd':'03', 'cmnnCdHanNm':'03'},
			{'cmnnCd':'04', 'cmnnCdHanNm':'04'},
			{'cmnnCd':'05', 'cmnnCdHanNm':'05'},
			{'cmnnCd':'06', 'cmnnCdHanNm':'06'},
			{'cmnnCd':'07', 'cmnnCdHanNm':'07'},
			{'cmnnCd':'08', 'cmnnCdHanNm':'08'},
			{'cmnnCd':'09', 'cmnnCdHanNm':'09'},
			{'cmnnCd':'10', 'cmnnCdHanNm':'10'},
			{'cmnnCd':'11', 'cmnnCdHanNm':'11'},
			{'cmnnCd':'12', 'cmnnCdHanNm':'12'},
			{'cmnnCd':'13', 'cmnnCdHanNm':'13'},
			{'cmnnCd':'14', 'cmnnCdHanNm':'14'},
			{'cmnnCd':'15', 'cmnnCdHanNm':'15'},
			{'cmnnCd':'16', 'cmnnCdHanNm':'16'},
			{'cmnnCd':'17', 'cmnnCdHanNm':'17'},
			{'cmnnCd':'18', 'cmnnCdHanNm':'18'},
			{'cmnnCd':'19', 'cmnnCdHanNm':'19'},
			{'cmnnCd':'20', 'cmnnCdHanNm':'20'},
			{'cmnnCd':'21', 'cmnnCdHanNm':'21'},
			{'cmnnCd':'22', 'cmnnCdHanNm':'22'},
			{'cmnnCd':'23', 'cmnnCdHanNm':'23'},
			{'cmnnCd':'24', 'cmnnCdHanNm':'24'},
			{'cmnnCd':'25', 'cmnnCdHanNm':'25'},
			{'cmnnCd':'26', 'cmnnCdHanNm':'26'},
			{'cmnnCd':'27', 'cmnnCdHanNm':'27'},
			{'cmnnCd':'28', 'cmnnCdHanNm':'28'},
			{'cmnnCd':'29', 'cmnnCdHanNm':'29'},
			{'cmnnCd':'30', 'cmnnCdHanNm':'30'},
			{'cmnnCd':'31', 'cmnnCdHanNm':'31'},
			{'cmnnCd':'32', 'cmnnCdHanNm':'32'},
			{'cmnnCd':'33', 'cmnnCdHanNm':'33'},
			{'cmnnCd':'34', 'cmnnCdHanNm':'34'},
			{'cmnnCd':'35', 'cmnnCdHanNm':'35'},
			{'cmnnCd':'36', 'cmnnCdHanNm':'36'},
			{'cmnnCd':'37', 'cmnnCdHanNm':'37'},
			{'cmnnCd':'38', 'cmnnCdHanNm':'38'},
			{'cmnnCd':'39', 'cmnnCdHanNm':'39'},
			{'cmnnCd':'40', 'cmnnCdHanNm':'40'},
			{'cmnnCd':'41', 'cmnnCdHanNm':'41'},
			{'cmnnCd':'42', 'cmnnCdHanNm':'42'},
			{'cmnnCd':'43', 'cmnnCdHanNm':'43'},
			{'cmnnCd':'44', 'cmnnCdHanNm':'44'},
			{'cmnnCd':'45', 'cmnnCdHanNm':'45'},
			{'cmnnCd':'46', 'cmnnCdHanNm':'46'},
			{'cmnnCd':'47', 'cmnnCdHanNm':'47'},
			{'cmnnCd':'48', 'cmnnCdHanNm':'48'},
			{'cmnnCd':'49', 'cmnnCdHanNm':'49'},
			{'cmnnCd':'50', 'cmnnCdHanNm':'50'},
			{'cmnnCd':'51', 'cmnnCdHanNm':'51'},
			{'cmnnCd':'52', 'cmnnCdHanNm':'52'},
			{'cmnnCd':'53', 'cmnnCdHanNm':'53'},
			{'cmnnCd':'54', 'cmnnCdHanNm':'54'},
			{'cmnnCd':'55', 'cmnnCdHanNm':'55'},
			{'cmnnCd':'56', 'cmnnCdHanNm':'56'},
			{'cmnnCd':'57', 'cmnnCdHanNm':'57'},
			{'cmnnCd':'58', 'cmnnCdHanNm':'58'},
			{'cmnnCd':'59', 'cmnnCdHanNm':'59'}
   ];
	
	/**
	 * 카드 월 코드
	 */
	_private.cardMonth = [
            {'cmnnCd':'01',	'cmnnCdHanNm':'01'},
            {'cmnnCd':'02', 'cmnnCdHanNm':'02'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'03'},
            {'cmnnCd':'04', 'cmnnCdHanNm':'04'},
            {'cmnnCd':'05',	'cmnnCdHanNm':'05'},
            {'cmnnCd':'06',	'cmnnCdHanNm':'06'},
            {'cmnnCd':'07', 'cmnnCdHanNm':'07'},
            {'cmnnCd':'08',	'cmnnCdHanNm':'08'},
            {'cmnnCd':'09', 'cmnnCdHanNm':'09'},
            {'cmnnCd':'10',	'cmnnCdHanNm':'10'},
            {'cmnnCd':'11', 'cmnnCdHanNm':'11'},
            {'cmnnCd':'12',	'cmnnCdHanNm':'12'}
    ];
	
	/**
	 * 카드 년 코드
	 */
	_private.cardYear = [
            {'cmnnCd':(dateFullYear+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+1+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+1+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+2+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+2+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+3+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+3+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+4+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+4+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+5+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+5+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+6+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+6+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+7+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+7+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+8+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+8+"").substring(2,4)},
            {'cmnnCd':(dateFullYear+9+"").substring(2,4),'cmnnCdHanNm':(dateFullYear+9+"").substring(2,4)}
    ];
	
	/**
	 * 모집경로 코드
	 */
	_private.applyPath = [
            {'cmnnCd':'01',	'cmnnCdHanNm':'라이프 를래닛 페이지 공고문'},
            {'cmnnCd':'02', 'cmnnCdHanNm':'네이버 배너 광고'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'타 취업 사이트'},
            {'cmnnCd':'04', 'cmnnCdHanNm':'학교(취업게시판/채용설명회)'},
            {'cmnnCd':'05',	'cmnnCdHanNm':'전문지 지면광고'},
            {'cmnnCd':'06',	'cmnnCdHanNm':'행사(경진대회/채용박람회 등)'},
            {'cmnnCd':'07',	'cmnnCdHanNm':'직원 소개 및 추천'},
            {'cmnnCd':'07',	'cmnnCdHanNm':'교수추천'},
            {'cmnnCd':'07',	'cmnnCdHanNm':'헤드헌팅 업체'},
            {'cmnnCd':'08',	'cmnnCdHanNm':'기타'}
    ];
	
	/**
	 * 군별 코드
	 */
	_private.militaryKind = [
            {'cmnnCd':'00',	'cmnnCdHanNm':'해당없음'},
            {'cmnnCd':'01',	'cmnnCdHanNm':'육군'},
            {'cmnnCd':'02', 'cmnnCdHanNm':'해군'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'공군'},
            {'cmnnCd':'04', 'cmnnCdHanNm':'해병'},
            {'cmnnCd':'05',	'cmnnCdHanNm':'전경'},
            {'cmnnCd':'06',	'cmnnCdHanNm':'의경'},
            {'cmnnCd':'07',	'cmnnCdHanNm':'공익'},
            {'cmnnCd':'08',	'cmnnCdHanNm':'기타'}
    ];
	
	/**
	 * 병역구분 코드
	 */
	_private.militaryStat = [
            {'cmnnCd':'00',	'cmnnCdHanNm':'해당없음'},
            {'cmnnCd':'01',	'cmnnCdHanNm':'만기제대'},
            {'cmnnCd':'02', 'cmnnCdHanNm':'제대 기타'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'복무중'},
            {'cmnnCd':'04', 'cmnnCdHanNm':'병력특례 복무완료'},
            {'cmnnCd':'05',	'cmnnCdHanNm':'병역특례 복무중(전문)'},
            {'cmnnCd':'06', 'cmnnCdHanNm':'병역특례 복무중(산업)'},
            {'cmnnCd':'07',	'cmnnCdHanNm':'군미필'},
            {'cmnnCd':'08',	'cmnnCdHanNm':'면제'}
    ];
	
	/**
	 * 산재구분 코드
	 */
	_private.disabledSection = [
            {'cmnnCd':'00',	'cmnnCdHanNm':'해당없음'},
            {'cmnnCd':'01', 'cmnnCdHanNm':'일반'},
            {'cmnnCd':'02',	'cmnnCdHanNm':'산업재해'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'보훈'}
    ];
	
	/**
	 * 장애구분 코드
	 */
	_private.disabledKind = [
			{'cmnnCd':'00',	'cmnnCdHanNm':'해당없음'},
			{'cmnnCd':'01',	'cmnnCdHanNm':'지체장애'},
			{'cmnnCd':'02', 'cmnnCdHanNm':'뇌병변장애'},
			{'cmnnCd':'03',	'cmnnCdHanNm':'시각장애'},
			{'cmnnCd':'04',	'cmnnCdHanNm':'청각장애'},
			{'cmnnCd':'05', 'cmnnCdHanNm':'언어장애'},
			{'cmnnCd':'06',	'cmnnCdHanNm':'지적장애'},
			{'cmnnCd':'07',	'cmnnCdHanNm':'자폐성장애'},
			{'cmnnCd':'08', 'cmnnCdHanNm':'정신장애'},
			{'cmnnCd':'09',	'cmnnCdHanNm':'신장장애'},
			{'cmnnCd':'10', 'cmnnCdHanNm':'심장장애'},
			{'cmnnCd':'11',	'cmnnCdHanNm':'호흡기장애'},
			{'cmnnCd':'12',	'cmnnCdHanNm':'간장애'},
			{'cmnnCd':'13', 'cmnnCdHanNm':'안면변형장애'},
			{'cmnnCd':'14',	'cmnnCdHanNm':'장루-요루장애'},
			{'cmnnCd':'15',	'cmnnCdHanNm':'간질장애'}
	];
	
	/**
	 * 장애등급 코드
	 */
	_private.disabledKindLevel = [
			{'cmnnCd':'00',	'cmnnCdHanNm':'해당없음'},
			{'cmnnCd':'01',	'cmnnCdHanNm':'1등급'},
			{'cmnnCd':'02', 'cmnnCdHanNm':'2등급'},
			{'cmnnCd':'03',	'cmnnCdHanNm':'3등급'},
			{'cmnnCd':'04',	'cmnnCdHanNm':'4등급'},
			{'cmnnCd':'05', 'cmnnCdHanNm':'5등급'},
			{'cmnnCd':'06',	'cmnnCdHanNm':'6등급'},
			{'cmnnCd':'07',	'cmnnCdHanNm':'7등급'},
			{'cmnnCd':'08', 'cmnnCdHanNm':'8등급'},
			{'cmnnCd':'09',	'cmnnCdHanNm':'9등급'},
			{'cmnnCd':'10', 'cmnnCdHanNm':'10등급'},
			{'cmnnCd':'11',	'cmnnCdHanNm':'11등급'},
			{'cmnnCd':'12',	'cmnnCdHanNm':'12등급'},
			{'cmnnCd':'13', 'cmnnCdHanNm':'13등급'},
			{'cmnnCd':'14',	'cmnnCdHanNm':'14등급'}
	];
	
	/**
	 * 중증여부 코드
	 */
	_private.severeYn = [
			{'cmnnCd':'00',	'cmnnCdHanNm':'해당없음'},
			{'cmnnCd':'Y',	'cmnnCdHanNm':'중증대상'},
			{'cmnnCd':'N',	'cmnnCdHanNm':'중증비대상'}
	];
	
	/**
	 * 학력 코드
	 */
	_private.lastEdu = [
            {'cmnnCd':'00',	'cmnnCdHanNm':'고등학교'},
            {'cmnnCd':'01', 'cmnnCdHanNm':'대학(2,3년)'},
            {'cmnnCd':'02',	'cmnnCdHanNm':'대학교(4년)'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'대학원'}
    ];
	
	/**
	 * 학력상태 코드
	 */
	_private.lastEduStat = [
            {'cmnnCd':'01',	'cmnnCdHanNm':'졸업'},
            {'cmnnCd':'02', 'cmnnCdHanNm':'졸업예정'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'수료'},
            {'cmnnCd':'04', 'cmnnCdHanNm':'중퇴'}
    ];
	
	/**
	 * 학교지역 코드
	 */
	_private.schoolArea = [
            {'cmnnCd':'01',	'cmnnCdHanNm':'서울'},
            {'cmnnCd':'02',	'cmnnCdHanNm':'인천'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'부산'},
            {'cmnnCd':'04',	'cmnnCdHanNm':'대전'},
            {'cmnnCd':'05',	'cmnnCdHanNm':'광주'},
            {'cmnnCd':'06',	'cmnnCdHanNm':'부산'},
            {'cmnnCd':'07',	'cmnnCdHanNm':'울산'},
            {'cmnnCd':'08',	'cmnnCdHanNm':'경기도'},
            {'cmnnCd':'09',	'cmnnCdHanNm':'강원도'},
            {'cmnnCd':'10',	'cmnnCdHanNm':'경상남도'},
            {'cmnnCd':'11',	'cmnnCdHanNm':'경상북도'},
            {'cmnnCd':'12',	'cmnnCdHanNm':'전라남도'},
            {'cmnnCd':'13',	'cmnnCdHanNm':'전라북도'},
            {'cmnnCd':'14',	'cmnnCdHanNm':'충청남도'},
            {'cmnnCd':'15',	'cmnnCdHanNm':'충청북도'},
            {'cmnnCd':'16',	'cmnnCdHanNm':'제주특별자치도'},
            {'cmnnCd':'17',	'cmnnCdHanNm':'아시아'},
            {'cmnnCd':'18',	'cmnnCdHanNm':'북미'},
            {'cmnnCd':'19',	'cmnnCdHanNm':'중남미'},
            {'cmnnCd':'20',	'cmnnCdHanNm':'유럽'},
            {'cmnnCd':'21',	'cmnnCdHanNm':'오세아니아'},
            {'cmnnCd':'22',	'cmnnCdHanNm':'아프리카'}
    ];
	
	/**
	 * 우편 지역 코드
	 */
	_private.postArea = [
            {'cmnnCd':'서울',			'cmnnCdHanNm':'서울특별시'},
            {'cmnnCd':'부산',			'cmnnCdHanNm':'부산광역시'},
            {'cmnnCd':'대구',			'cmnnCdHanNm':'대구광역시'},
            {'cmnnCd':'인천',			'cmnnCdHanNm':'인천광역시'},
            {'cmnnCd':'광주',			'cmnnCdHanNm':'광주광역시'},
            {'cmnnCd':'대전',			'cmnnCdHanNm':'대전광역시'},
            {'cmnnCd':'울산',			'cmnnCdHanNm':'울산광역시'},
            {'cmnnCd':'세종특별자치시',	'cmnnCdHanNm':'세종특별자치시'},
            {'cmnnCd':'강원',			'cmnnCdHanNm':'강원도'},
            {'cmnnCd':'경기도',			'cmnnCdHanNm':'경기도'},
            {'cmnnCd':'경상남도',		'cmnnCdHanNm':'경상남도'},
            {'cmnnCd':'경상북도',		'cmnnCdHanNm':'경상북도'},
            {'cmnnCd':'전라남도',		'cmnnCdHanNm':'전라남도'},
            {'cmnnCd':'전라북도',		'cmnnCdHanNm':'전라북도'},
            {'cmnnCd':'충청남도',		'cmnnCdHanNm':'충청남도'},
            {'cmnnCd':'충청북도',		'cmnnCdHanNm':'충청북도'},
            {'cmnnCd':'제주특별자치도',	'cmnnCdHanNm':'제주특별자치도'}
    ];
	
	/**
	 * 우편 서울 코드
	 */
	_private.postAreaSeoul = [
            {'cmnnCd':'00',       'cmnnCdHanNm':'전체'},
            {'cmnnCd':'강남구',   'cmnnCdHanNm':'강남구'},
            {'cmnnCd':'강동구',   'cmnnCdHanNm':'강동구'},
            {'cmnnCd':'강북구',   'cmnnCdHanNm':'강북구'},
            {'cmnnCd':'강서구',   'cmnnCdHanNm':'강서구'},
            {'cmnnCd':'관악구',   'cmnnCdHanNm':'관악구'},
            {'cmnnCd':'광진구',   'cmnnCdHanNm':'광진구'},
            {'cmnnCd':'구로구',   'cmnnCdHanNm':'구로구'},
            {'cmnnCd':'금천구',   'cmnnCdHanNm':'금천구'},
            {'cmnnCd':'노원구',   'cmnnCdHanNm':'노원구'},
            {'cmnnCd':'도봉구',   'cmnnCdHanNm':'도봉구'},
            {'cmnnCd':'동대문구', 'cmnnCdHanNm':'동대문구'},
            {'cmnnCd':'동작구',   'cmnnCdHanNm':'동작구'},
            {'cmnnCd':'마포구',   'cmnnCdHanNm':'마포구'},
            {'cmnnCd':'서대문구', 'cmnnCdHanNm':'서대문구'},
            {'cmnnCd':'서초구',   'cmnnCdHanNm':'서초구'},
            {'cmnnCd':'성동구',   'cmnnCdHanNm':'성동구'},
            {'cmnnCd':'성북구',   'cmnnCdHanNm':'성북구'},
            {'cmnnCd':'송파구',   'cmnnCdHanNm':'송파구'},
            {'cmnnCd':'양천구',   'cmnnCdHanNm':'양천구'},
            {'cmnnCd':'영등포구', 'cmnnCdHanNm':'영등포구'},
            {'cmnnCd':'용산구',   'cmnnCdHanNm':'용산구'},
            {'cmnnCd':'은평구',   'cmnnCdHanNm':'은평구'},
            {'cmnnCd':'종로구',   'cmnnCdHanNm':'종로구'},
            {'cmnnCd':'중구',     'cmnnCdHanNm':'중구'},
            {'cmnnCd':'중랑구',   'cmnnCdHanNm':'중랑구'}
    ];
	
	/**
	 * 우편 부산 코드
	 */
	_private.postAreaBusan = [
            {'cmnnCd':'00',       'cmnnCdHanNm':'전체'},
            {'cmnnCd':'강서구',   'cmnnCdHanNm':'강서구'},
            {'cmnnCd':'금정구',   'cmnnCdHanNm':'금정구'},
            {'cmnnCd':'기장군',   'cmnnCdHanNm':'기장군'},
            {'cmnnCd':'남구',     'cmnnCdHanNm':'남구'},
            {'cmnnCd':'동구',     'cmnnCdHanNm':'동구'},
            {'cmnnCd':'동래구',   'cmnnCdHanNm':'동래구'},
            {'cmnnCd':'부산진구', 'cmnnCdHanNm':'부산진구'},
            {'cmnnCd':'북구',     'cmnnCdHanNm':'북구'},
            {'cmnnCd':'사상구',   'cmnnCdHanNm':'사상구'},
            {'cmnnCd':'사하구',   'cmnnCdHanNm':'사하구'},
            {'cmnnCd':'서구',     'cmnnCdHanNm':'서구'},
            {'cmnnCd':'수영구',   'cmnnCdHanNm':'수영구'},
            {'cmnnCd':'연제구',   'cmnnCdHanNm':'연제구'},
            {'cmnnCd':'영도구',   'cmnnCdHanNm':'영도구'},
            {'cmnnCd':'중구',     'cmnnCdHanNm':'중구'},
            {'cmnnCd':'해운대구', 'cmnnCdHanNm':'해운대구'}
    ];
	
	/**
	 * 우편 대구 코드
	 */
	_private.postAreaDaegu = [
            {'cmnnCd':'00',       'cmnnCdHanNm':'전체'},
            {'cmnnCd':'남구',     'cmnnCdHanNm':'남구'},
            {'cmnnCd':'달서구',   'cmnnCdHanNm':'달서구'},
            {'cmnnCd':'달성군',   'cmnnCdHanNm':'달성군'},
            {'cmnnCd':'동구',     'cmnnCdHanNm':'동구'},
            {'cmnnCd':'북구',     'cmnnCdHanNm':'북구'},
            {'cmnnCd':'서구',     'cmnnCdHanNm':'서구'},
            {'cmnnCd':'수성구',   'cmnnCdHanNm':'수성구'},
            {'cmnnCd':'중구',     'cmnnCdHanNm':'중구'}
    ];
	
	/**
	 * 우편 인천 코드
	 */
	_private.postAreaIncheon = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'강화군', 'cmnnCdHanNm':'강화군'},
            {'cmnnCd':'계양구', 'cmnnCdHanNm':'계양구'},
            {'cmnnCd':'남구',   'cmnnCdHanNm':'남구'},
            {'cmnnCd':'남동구', 'cmnnCdHanNm':'남동구'},
            {'cmnnCd':'동구',   'cmnnCdHanNm':'동구'},
            {'cmnnCd':'부평구', 'cmnnCdHanNm':'부평구'},
            {'cmnnCd':'서구',   'cmnnCdHanNm':'서구'},
            {'cmnnCd':'연수구', 'cmnnCdHanNm':'연수구'},
            {'cmnnCd':'옹진군', 'cmnnCdHanNm':'옹진군'},
            {'cmnnCd':'중구',   'cmnnCdHanNm':'중구'}
    ];
	
	/**
	 * 우편 광주 코드
	 */
	_private.postAreaGwangju = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'광산구', 'cmnnCdHanNm':'광산구'},
            {'cmnnCd':'남구',   'cmnnCdHanNm':'남구'},
            {'cmnnCd':'동구',   'cmnnCdHanNm':'동구'},
            {'cmnnCd':'북구',   'cmnnCdHanNm':'북구'},
            {'cmnnCd':'서구',   'cmnnCdHanNm':'서구'}
    ];
	
	/**
	 * 우편 대전 코드
	 */
	_private.postAreaDaejeon = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'대덕구', 'cmnnCdHanNm':'대덕구'},
            {'cmnnCd':'동구',   'cmnnCdHanNm':'동구'},
            {'cmnnCd':'서구',   'cmnnCdHanNm':'서구'},
            {'cmnnCd':'유성구', 'cmnnCdHanNm':'유성구'},
            {'cmnnCd':'중구',   'cmnnCdHanNm':'중구'}
    ];
	
	/**
	 * 우편 울산 코드
	 */
	_private.postAreaUlsan = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'남구',   'cmnnCdHanNm':'남구'},
            {'cmnnCd':'동구',   'cmnnCdHanNm':'동구'},
            {'cmnnCd':'북구',   'cmnnCdHanNm':'북구'},
            {'cmnnCd':'울주군', 'cmnnCdHanNm':'울주군'},
            {'cmnnCd':'중구',   'cmnnCdHanNm':'중구'}
    ];
	
	/**
	 * 우편 강원도 코드
	 */
	_private.postAreaGangwondo = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'강릉시', 'cmnnCdHanNm':'강릉시'},
            {'cmnnCd':'고성군', 'cmnnCdHanNm':'고성군'},
            {'cmnnCd':'동해시', 'cmnnCdHanNm':'동해시'},
            {'cmnnCd':'삼척시', 'cmnnCdHanNm':'삼척시'},
            {'cmnnCd':'속초시', 'cmnnCdHanNm':'속초시'},
            {'cmnnCd':'양구군', 'cmnnCdHanNm':'양구군'},
            {'cmnnCd':'양양군', 'cmnnCdHanNm':'양양군'},
            {'cmnnCd':'영월군', 'cmnnCdHanNm':'영월군'},
            {'cmnnCd':'원주시', 'cmnnCdHanNm':'원주시'},
            {'cmnnCd':'인제군', 'cmnnCdHanNm':'인제군'},
            {'cmnnCd':'정선군', 'cmnnCdHanNm':'정선군'},
            {'cmnnCd':'철원군', 'cmnnCdHanNm':'철원군'},
            {'cmnnCd':'춘천시', 'cmnnCdHanNm':'춘천시'},
            {'cmnnCd':'태백시', 'cmnnCdHanNm':'태백시'},
            {'cmnnCd':'평창군', 'cmnnCdHanNm':'평창군'},
            {'cmnnCd':'홍천군', 'cmnnCdHanNm':'홍천군'},
            {'cmnnCd':'화천군', 'cmnnCdHanNm':'화천군'},
            {'cmnnCd':'횡성군', 'cmnnCdHanNm':'횡성군'}
    ];
	
	/**
	 * 우편 경기도 코드
	 */
	_private.postAreaGyeonggido = [
            {'cmnnCd':'00',     			'cmnnCdHanNm':'전체'},
            {'cmnnCd':'가평군', 			'cmnnCdHanNm':'가평군'},
            {'cmnnCd':'고양시 덕양구', 		'cmnnCdHanNm':'고양시 덕양구'},
            {'cmnnCd':'고양시 일산동구',	'cmnnCdHanNm':'고양시 일산동구'},
            {'cmnnCd':'고양시 일산서구', 	'cmnnCdHanNm':'고양시 일산서구'},
            {'cmnnCd':'과천시', 			'cmnnCdHanNm':'과천시'},
            {'cmnnCd':'광명시', 			'cmnnCdHanNm':'광명시'},
            {'cmnnCd':'광주시', 			'cmnnCdHanNm':'광주시'},
            {'cmnnCd':'구리시', 			'cmnnCdHanNm':'구리시'},
            {'cmnnCd':'군포시', 			'cmnnCdHanNm':'군포시'},
            {'cmnnCd':'김포시', 			'cmnnCdHanNm':'김포시'},
            {'cmnnCd':'남양주시', 			'cmnnCdHanNm':'남양주시'},
            {'cmnnCd':'동두천시', 			'cmnnCdHanNm':'동두천시'},
            {'cmnnCd':'부천시 소사구', 		'cmnnCdHanNm':'부천시 소사구'},
            {'cmnnCd':'부천시 오정구', 		'cmnnCdHanNm':'부천시 오정구'},
            {'cmnnCd':'부천시 원미구', 		'cmnnCdHanNm':'부천시 원미구'},
            {'cmnnCd':'성남시 분당구', 		'cmnnCdHanNm':'성남시 분당구'},
            {'cmnnCd':'성남시 수정구', 		'cmnnCdHanNm':'성남시 수정구'},
            {'cmnnCd':'성남시 중원구', 		'cmnnCdHanNm':'성남시 중원구'},
            {'cmnnCd':'수원시 권선구', 		'cmnnCdHanNm':'수원시 권선구'},
            {'cmnnCd':'수원시 영통구', 		'cmnnCdHanNm':'수원시 영통구'},
            {'cmnnCd':'수원시 장안구', 		'cmnnCdHanNm':'수원시 장안구'},
            {'cmnnCd':'수원시 팔달구', 		'cmnnCdHanNm':'수원시 팔달구'},
            {'cmnnCd':'시흥시',   			'cmnnCdHanNm':'시흥시'},
            {'cmnnCd':'안산시 단원구', 		'cmnnCdHanNm':'안산시 단원구'},
            {'cmnnCd':'안산시 상록구', 		'cmnnCdHanNm':'안산시 상록구'},
            {'cmnnCd':'안성시', 			'cmnnCdHanNm':'안성시'},
            {'cmnnCd':'안양시 동안구', 		'cmnnCdHanNm':'안양시 동안구'},
            {'cmnnCd':'안양시 만안구', 		'cmnnCdHanNm':'안양시 만안구'},
            {'cmnnCd':'양주시',   			'cmnnCdHanNm':'양주시'},
            {'cmnnCd':'양평군',   			'cmnnCdHanNm':'양평군'},
            {'cmnnCd':'여주시',   			'cmnnCdHanNm':'여주시'},
            {'cmnnCd':'연천군',   			'cmnnCdHanNm':'연천군'},
            {'cmnnCd':'오산시',   			'cmnnCdHanNm':'오산시'},
            {'cmnnCd':'용인시 기흥구',		'cmnnCdHanNm':'용인시 기흥구'},
            {'cmnnCd':'용인시 수지구',		'cmnnCdHanNm':'용인시 수지구'},
            {'cmnnCd':'용인시 처인구', 		'cmnnCdHanNm':'용인시 처인구'},
            {'cmnnCd':'의왕시',   			'cmnnCdHanNm':'의왕시'},
            {'cmnnCd':'의정부시', 			'cmnnCdHanNm':'의정부시'},
            {'cmnnCd':'이천시',    			'cmnnCdHanNm':'이천시'},
            {'cmnnCd':'파주시',    			'cmnnCdHanNm':'파주시'},
            {'cmnnCd':'평택시',    			'cmnnCdHanNm':'평택시'},
            {'cmnnCd':'포천시',    			'cmnnCdHanNm':'포천시'},
            {'cmnnCd':'하남시',   			'cmnnCdHanNm':'하남시'},
            {'cmnnCd':'화성시',   			'cmnnCdHanNm':'화성시'}
    ];
	
	/**
	 * 우편 경남 코드
	 */
	_private.postAreaGyeongsangnamdo = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'거제시', 'cmnnCdHanNm':'거제시'},
            {'cmnnCd':'거창군', 'cmnnCdHanNm':'거창군'},
            {'cmnnCd':'고성군', 'cmnnCdHanNm':'고성군'},
            {'cmnnCd':'삼척시', 'cmnnCdHanNm':'김해시'},
            {'cmnnCd':'남해군', 'cmnnCdHanNm':'남해군'},
            {'cmnnCd':'밀양시', 'cmnnCdHanNm':'밀양시'},
            {'cmnnCd':'사천시', 'cmnnCdHanNm':'사천시'},
            {'cmnnCd':'산청군', 'cmnnCdHanNm':'산청군'},
            {'cmnnCd':'양산시', 'cmnnCdHanNm':'양산시'},
            {'cmnnCd':'의령군', 'cmnnCdHanNm':'의령군'},
            {'cmnnCd':'진주시', 'cmnnCdHanNm':'진주시'},
            {'cmnnCd':'창녕군', 'cmnnCdHanNm':'창녕군'},
            {'cmnnCd':'창원시 마산합포구', 'cmnnCdHanNm':'창원시 마산합포구'},
            {'cmnnCd':'창원시 마산회원구', 'cmnnCdHanNm':'창원시 마산회원구'},
            {'cmnnCd':'창원시 성산구', 'cmnnCdHanNm':'창원시 성산구'},
            {'cmnnCd':'창원시 의창구', 'cmnnCdHanNm':'창원시 의창구'},
            {'cmnnCd':'창원시 진해구', 'cmnnCdHanNm':'창원시 진해구'},
            {'cmnnCd':'통영시', 'cmnnCdHanNm':'통영시'},
            {'cmnnCd':'하동군', 'cmnnCdHanNm':'하동군'},
            {'cmnnCd':'함안군', 'cmnnCdHanNm':'함안군'},
            {'cmnnCd':'함양군', 'cmnnCdHanNm':'함양군'},
            {'cmnnCd':'합천군', 'cmnnCdHanNm':'합천군'}
    ];
	
	/**
	 * 우편 경북 코드
	 */
	_private.postAreaGyeongsangbukdo = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'경산시', 'cmnnCdHanNm':'경산시'},
            {'cmnnCd':'경주시', 'cmnnCdHanNm':'경주시'},
            {'cmnnCd':'고령군', 'cmnnCdHanNm':'고령군'},
            {'cmnnCd':'구미시', 'cmnnCdHanNm':'구미시'},
            {'cmnnCd':'군위군', 'cmnnCdHanNm':'군위군'},
            {'cmnnCd':'김천시', 'cmnnCdHanNm':'김천시'},
            {'cmnnCd':'문경시', 'cmnnCdHanNm':'문경시'},
            {'cmnnCd':'봉화군', 'cmnnCdHanNm':'봉화군'},
            {'cmnnCd':'상주시', 'cmnnCdHanNm':'상주시'},
            {'cmnnCd':'성주군', 'cmnnCdHanNm':'성주군'},
            {'cmnnCd':'안동시', 'cmnnCdHanNm':'안동시'},
            {'cmnnCd':'영덕군', 'cmnnCdHanNm':'영덕군'},
            {'cmnnCd':'영양군', 'cmnnCdHanNm':'영양군'},
            {'cmnnCd':'영주시', 'cmnnCdHanNm':'영주시'},
            {'cmnnCd':'영천시', 'cmnnCdHanNm':'영천시'},
            {'cmnnCd':'예천군', 'cmnnCdHanNm':'예천군'},
            {'cmnnCd':'울릉군', 'cmnnCdHanNm':'울릉군'},
            {'cmnnCd':'울진군', 'cmnnCdHanNm':'울진군'},
            {'cmnnCd':'의성군', 'cmnnCdHanNm':'의성군'},
            {'cmnnCd':'청도군', 'cmnnCdHanNm':'청도군'},
            {'cmnnCd':'청송군', 'cmnnCdHanNm':'청송군'},
            {'cmnnCd':'칠곡군', 'cmnnCdHanNm':'칠곡군'},
            {'cmnnCd':'포항시 남구', 'cmnnCdHanNm':'포항시 남구'},
            {'cmnnCd':'포항시 북구', 'cmnnCdHanNm':'포항시 북구'}
    ];
	
	/**
	 * 우편 전남 코드
	 */
	_private.postAreaJeonlanamdo = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'강진군', 'cmnnCdHanNm':'강진군'},
            {'cmnnCd':'고흥군', 'cmnnCdHanNm':'고흥군'},
            {'cmnnCd':'곡성군', 'cmnnCdHanNm':'곡성군'},
            {'cmnnCd':'광양시', 'cmnnCdHanNm':'광양시'},
            {'cmnnCd':'구례군', 'cmnnCdHanNm':'구례군'},
            {'cmnnCd':'나주시', 'cmnnCdHanNm':'나주시'},
            {'cmnnCd':'담양군', 'cmnnCdHanNm':'담양군'},
            {'cmnnCd':'목포시', 'cmnnCdHanNm':'목포시'},
            {'cmnnCd':'무안군', 'cmnnCdHanNm':'무안군'},
            {'cmnnCd':'보성군', 'cmnnCdHanNm':'보성군'},
            {'cmnnCd':'순천시', 'cmnnCdHanNm':'순천시'},
            {'cmnnCd':'신안군', 'cmnnCdHanNm':'신안군'},
            {'cmnnCd':'여수시', 'cmnnCdHanNm':'여수시'},
            {'cmnnCd':'영광군', 'cmnnCdHanNm':'영광군'},
            {'cmnnCd':'영암군', 'cmnnCdHanNm':'영암군'},
            {'cmnnCd':'완도군', 'cmnnCdHanNm':'완도군'},
            {'cmnnCd':'장성군', 'cmnnCdHanNm':'장성군'},
            {'cmnnCd':'장흥군', 'cmnnCdHanNm':'장흥군'},
            {'cmnnCd':'진도군', 'cmnnCdHanNm':'진도군'},
            {'cmnnCd':'함평군', 'cmnnCdHanNm':'함평군'},
            {'cmnnCd':'해남군', 'cmnnCdHanNm':'해남군'},
            {'cmnnCd':'화순군', 'cmnnCdHanNm':'화순군'}
    ];
	
	/**
	 * 우편 전북 코드
	 */
	_private.postAreaJeonlabukdo = [
            {'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
            {'cmnnCd':'고창군', 'cmnnCdHanNm':'고창군'},
            {'cmnnCd':'군산시', 'cmnnCdHanNm':'군산시'},
            {'cmnnCd':'김제시', 'cmnnCdHanNm':'김제시'},
            {'cmnnCd':'남원시', 'cmnnCdHanNm':'남원시'},
            {'cmnnCd':'무주군', 'cmnnCdHanNm':'무주군'},
            {'cmnnCd':'부안군', 'cmnnCdHanNm':'부안군'},
            {'cmnnCd':'순창군', 'cmnnCdHanNm':'순창군'},
            {'cmnnCd':'완주군', 'cmnnCdHanNm':'완주군'},
            {'cmnnCd':'익산시', 'cmnnCdHanNm':'익산시'},
            {'cmnnCd':'임실군', 'cmnnCdHanNm':'임실군'},
            {'cmnnCd':'장수군', 'cmnnCdHanNm':'장수군'},
            {'cmnnCd':'전주시 덕진구', 'cmnnCdHanNm':'전주시 덕진구'},
            {'cmnnCd':'전주시 완산구', 'cmnnCdHanNm':'전주시 완산구'},
            {'cmnnCd':'정읍시', 'cmnnCdHanNm':'정읍시'},
            {'cmnnCd':'진안군', 'cmnnCdHanNm':'진안군'}
    ];
	
	/**
	 * 우편 충북 코드
	 */
	_private.postAreaChungcheongbukdo = [
			{'cmnnCd':'00',     'cmnnCdHanNm':'전체'},
			{'cmnnCd':'괴산군', 'cmnnCdHanNm':'괴산군'},
			{'cmnnCd':'단양군', 'cmnnCdHanNm':'단양군'},
			{'cmnnCd':'보은군', 'cmnnCdHanNm':'보은군'},
			{'cmnnCd':'영동군', 'cmnnCdHanNm':'영동군'},
			{'cmnnCd':'옥천군', 'cmnnCdHanNm':'옥천군'},
			{'cmnnCd':'음성군', 'cmnnCdHanNm':'음성군'},
			{'cmnnCd':'제천시', 'cmnnCdHanNm':'제천시'},
			{'cmnnCd':'증평군', 'cmnnCdHanNm':'증평군'},
			{'cmnnCd':'진천군', 'cmnnCdHanNm':'진천군'},
			{'cmnnCd':'청원군', 'cmnnCdHanNm':'청원군'},
			{'cmnnCd':'청주시 상당구', 'cmnnCdHanNm':'청주시 상당구'},
			{'cmnnCd':'청주시 흥덕구', 'cmnnCdHanNm':'청주시 흥덕구'},
			{'cmnnCd':'충주시', 'cmnnCdHanNm':'충주시'}
	];
	
	/**
	 * 우편 제주 코드
	 */
	_private.postAreaJejudo = [
            {'cmnnCd':'00',       'cmnnCdHanNm':'전체'},
            {'cmnnCd':'서귀포시', 'cmnnCdHanNm':'서귀포시'},
            {'cmnnCd':'제주시',   'cmnnCdHanNm':'제주시'}
    ];
	
	/**
	 * 고용형태 코드
	 */
	_private.empStat = [
            {'cmnnCd':'01',	'cmnnCdHanNm':'정규직'},
            {'cmnnCd':'02', 'cmnnCdHanNm':'비정규직'},
            {'cmnnCd':'03',	'cmnnCdHanNm':'아르바이트'},
            {'cmnnCd':'04', 'cmnnCdHanNm':'기타'}
	];
	
	/**
	 * 자격등급 코드
	 */
	_private.licenceGrade = [
			{'cmnnCd':'1','cmnnCdHanNm':'1급'},
			{'cmnnCd':'2','cmnnCdHanNm':'2급'},
			{'cmnnCd':'3','cmnnCdHanNm':'3급'}
	];
	
	/**
	 * 언어 종류 코드
	 */
	_private.languageKind = [
			{'cmnnCd':'en','cmnnCdHanNm':'영어'},
			{'cmnnCd':'ch','cmnnCdHanNm':'중국어'},
			{'cmnnCd':'jp','cmnnCdHanNm':'일본어'}
	];
	
	/**
	 * 시험 종류 코드
	 */
	_private.testKind=[
			{'cmnnCd':'01','cmnnCdHanNm':'TOEIC'},
			{'cmnnCd':'02','cmnnCdHanNm':'TOEFL'},       
			{'cmnnCd':'03','cmnnCdHanNm':'JPT'},         
			{'cmnnCd':'04','cmnnCdHanNm':'TEPS'},        
			{'cmnnCd':'05','cmnnCdHanNm':'IELTS'},       
			{'cmnnCd':'06','cmnnCdHanNm':'TESOL'},       
			{'cmnnCd':'07','cmnnCdHanNm':'HSK'},         
			{'cmnnCd':'08','cmnnCdHanNm':'TOEFL-CBT'},   
			{'cmnnCd':'09','cmnnCdHanNm':'JLPT'}        
	];
	
	/**
	 * 시험 등급 코드
	 */
	_private.testGrade = [
			{'cmnnCd':'A', 'cmnnCdHanNm':'A급'},
			{'cmnnCd':'B', 'cmnnCdHanNm':'B급'},
			{'cmnnCd':'C', 'cmnnCdHanNm':'C급'},
			{'cmnnCd':'D', 'cmnnCdHanNm':'D급'},
			{'cmnnCd':'E', 'cmnnCdHanNm':'E급'},
			{'cmnnCd':'F', 'cmnnCdHanNm':'F급'},
			{'cmnnCd':'01', 'cmnnCdHanNm':'1급'},
			{'cmnnCd':'02', 'cmnnCdHanNm':'2급'},
			{'cmnnCd':'03', 'cmnnCdHanNm':'3급'},
			{'cmnnCd':'04', 'cmnnCdHanNm':'4급'},
			{'cmnnCd':'05', 'cmnnCdHanNm':'5급'},
			{'cmnnCd':'06', 'cmnnCdHanNm':'6급'},
			{'cmnnCd':'07', 'cmnnCdHanNm':'7급'},
			{'cmnnCd':'08', 'cmnnCdHanNm':'8급'},
			{'cmnnCd':'09', 'cmnnCdHanNm':'9급'},
			{'cmnnCd':'10', 'cmnnCdHanNm':'10급'},
			{'cmnnCd':'11', 'cmnnCdHanNm':'11급'}
    ];
	
	/**
	 * 가족관계 코드
	 */
	_private.familyRtn = [
			{'cmnnCd':'01', 'cmnnCdHanNm':'조부'},
			{'cmnnCd':'02', 'cmnnCdHanNm':'조모'},
			{'cmnnCd':'03', 'cmnnCdHanNm':'외조부'},
			{'cmnnCd':'04', 'cmnnCdHanNm':'외조모'},
			{'cmnnCd':'05', 'cmnnCdHanNm':'부'},
			{'cmnnCd':'06', 'cmnnCdHanNm':'모'},
			{'cmnnCd':'07', 'cmnnCdHanNm':'배우자'},
			{'cmnnCd':'08', 'cmnnCdHanNm':'아들'},
			{'cmnnCd':'09', 'cmnnCdHanNm':'딸'},
			{'cmnnCd':'10', 'cmnnCdHanNm':'형(오빠)'},
			{'cmnnCd':'11', 'cmnnCdHanNm':'제(남동생)'},
			{'cmnnCd':'12', 'cmnnCdHanNm':'자(누나/언니)'},
			{'cmnnCd':'13', 'cmnnCdHanNm':'매(여동생)'},
			{'cmnnCd':'14', 'cmnnCdHanNm':'배우자조부'},
			{'cmnnCd':'15', 'cmnnCdHanNm':'배우자조모'},
			{'cmnnCd':'16', 'cmnnCdHanNm':'손자'},
			{'cmnnCd':'17', 'cmnnCdHanNm':'손녀'},
			{'cmnnCd':'18', 'cmnnCdHanNm':'배우자형제'},
			{'cmnnCd':'19', 'cmnnCdHanNm':'배우자자매'},
			{'cmnnCd':'20', 'cmnnCdHanNm':'위탁아동'},
			{'cmnnCd':'21', 'cmnnCdHanNm':'기초수급자'},
			{'cmnnCd':'22', 'cmnnCdHanNm':'기타'}
    ];

	/**
	 * 거래목적
	 */
	_private.traPrpsCd = [
		{'cmnnCd':'00', 'cmnnCdHanNm':'선택'},
		{'cmnnCd':'01', 'cmnnCdHanNm':'가족보장'},
		{'cmnnCd':'02', 'cmnnCdHanNm':'노후준비'},
		{'cmnnCd':'03', 'cmnnCdHanNm':'상속준비'},
		{'cmnnCd':'04', 'cmnnCdHanNm':'자녀양육'},
		{'cmnnCd':'05', 'cmnnCdHanNm':'저축'},
		{'cmnnCd':'06', 'cmnnCdHanNm':'부채면제'},
		{'cmnnCd':'99', 'cmnnCdHanNm':'기타'}
	];

	/**
	 * 거래자금의 원천 및 출처
	 */
	_private.traFuncOrgsCd = [
		{'cmnnCd':'00', 'cmnnCdHanNm':'선택'},
		{'cmnnCd':'01', 'cmnnCdHanNm':'근로 및 연금소득'},
		{'cmnnCd':'02', 'cmnnCdHanNm':'퇴직소득'},
		{'cmnnCd':'03', 'cmnnCdHanNm':'사업소득'},
		{'cmnnCd':'04', 'cmnnCdHanNm':'부동산 임대소득'},
		{'cmnnCd':'05', 'cmnnCdHanNm':'부동산 양도소득'},
		{'cmnnCd':'06', 'cmnnCdHanNm':'금융소득'},
		{'cmnnCd':'07', 'cmnnCdHanNm':'상속, 증여'},
		{'cmnnCd':'08', 'cmnnCdHanNm':'일시재산양도로 인한 소득'},
		{'cmnnCd':'09', 'cmnnCdHanNm':'기타'}
	];

	/**
	 *  발급기관
	 */
	_private.scpsProoIssCd = [
		{'cmnnCd' :'서울출입국관리사무소장'     ,'cmnnCdHanNm':'서울출입국관리사무소장'     }, 
		{'cmnnCd' :'인천공항출입국관리사무소장'	,'cmnnCdHanNm':'인천공항출입국관리사무소장'	},
		{'cmnnCd' :'서울남부출입국관리사무소장'	,'cmnnCdHanNm':'서울남부출입국관리사무소장'	},
		{'cmnnCd' :'부산출입국관리사무소장'	,'cmnnCdHanNm':'부산출입국관리사무소장'	    },
		{'cmnnCd' :'인천출입국관리사무소장'	,'cmnnCdHanNm':'인천출입국관리사무소장'	    },
		{'cmnnCd' :'김해출입국관리사무소장'     ,'cmnnCdHanNm':'김해출입국관리사무소장'     },
		{'cmnnCd' :'수원출입국관리사무소장'	,'cmnnCdHanNm':'수원출입국관리사무소장'	    },
		{'cmnnCd' :'제주출입국관리사무소장'	,'cmnnCdHanNm':'제주출입국관리사무소장'	    },
		{'cmnnCd' :'대구출입국관리사무소장'	,'cmnnCdHanNm':'대구출입국관리사무소장'	    },
		{'cmnnCd' :'대전출입국관리사무소장'	,'cmnnCdHanNm':'대전출입국관리사무소장'	    },
		{'cmnnCd' :'여수출입국관리사무소장'	,'cmnnCdHanNm':'여수출입국관리사무소장'	    },
		{'cmnnCd' :'양주출입국관리사무소장' 	,'cmnnCdHanNm':'양주출입국관리사무소장' 	},
		{'cmnnCd' :'울산출입국관리사무소장'	,'cmnnCdHanNm':'울산출입국관리사무소장'	    },
		{'cmnnCd' :'김포출입국관리사무소장'	,'cmnnCdHanNm':'김포출입국관리사무소장'	    },
		{'cmnnCd' :'광주출입국관리사무소장'	,'cmnnCdHanNm':'광주출입국관리사무소장'	    },
		{'cmnnCd' :'창원출입국관리사무소장'	,'cmnnCdHanNm':'창원출입국관리사무소장'	    },
		{'cmnnCd' :'춘천출입국관리사무소장'	,'cmnnCdHanNm':'춘천출입국관리사무소장'	    },
		{'cmnnCd' :'청주출입국관리사무소장'     ,'cmnnCdHanNm':'청주출입국관리사무소장'     },
		{'cmnnCd' :'전주출입국관리사무소장'	,'cmnnCdHanNm':'전주출입국관리사무소장'	    }
	];
	
	/**
	 *  운전면허
	 */
	_private.vhclDrvLicCd = [
		{'cmnnCd' :'11'	  , 'cmnnCdHanNm' :'11'   },
		{'cmnnCd' :'서울' , 'cmnnCdHanNm' :'서울' },
		{'cmnnCd' :'12'	  , 'cmnnCdHanNm' :'12'   },
		{'cmnnCd' :'부산' , 'cmnnCdHanNm' :'부산' },
		{'cmnnCd' :'13'	  , 'cmnnCdHanNm' :'13'   },
		{'cmnnCd' :'경기' , 'cmnnCdHanNm' :'경기' },
		{'cmnnCd' :'14'	  , 'cmnnCdHanNm' :'14'   },
		{'cmnnCd' :'강원' , 'cmnnCdHanNm' :'강원' },
		{'cmnnCd' :'15'	  , 'cmnnCdHanNm' :'15'   },
		{'cmnnCd' :'충북' , 'cmnnCdHanNm' :'충북' },
		{'cmnnCd' :'16'	  , 'cmnnCdHanNm' :'16'   },
		{'cmnnCd' :'충남' , 'cmnnCdHanNm' :'충남' },
		{'cmnnCd' :'17'	  , 'cmnnCdHanNm' :'17'   },
		{'cmnnCd' :'전북' , 'cmnnCdHanNm' :'전북' },
		{'cmnnCd' :'18'	  , 'cmnnCdHanNm' :'18'   },
		{'cmnnCd' :'전남' , 'cmnnCdHanNm' :'전남' },
		{'cmnnCd' :'광주' , 'cmnnCdHanNm' :'광주' },
		{'cmnnCd' :'19'	  , 'cmnnCdHanNm' :'19'   },
		{'cmnnCd' :'경북' , 'cmnnCdHanNm' :'경북' },
		{'cmnnCd' :'20'	  , 'cmnnCdHanNm' :'20'   },
		{'cmnnCd' :'경남' , 'cmnnCdHanNm' :'경남' },
		{'cmnnCd' :'21'	  , 'cmnnCdHanNm' :'21'   },
		{'cmnnCd' :'제주' , 'cmnnCdHanNm' :'제주' },
		{'cmnnCd' :'22'	  , 'cmnnCdHanNm' :'22'   },
		{'cmnnCd' :'대구' , 'cmnnCdHanNm' :'대구' },
		{'cmnnCd' :'23'	  , 'cmnnCdHanNm' :'23'   },
		{'cmnnCd' :'인천' , 'cmnnCdHanNm' :'인천' },
		{'cmnnCd' :'24'	  , 'cmnnCdHanNm' :'24'   },
		{'cmnnCd' :'25'	  , 'cmnnCdHanNm' :'25'   },
		{'cmnnCd' :'대전' , 'cmnnCdHanNm' :'대전' },
		{'cmnnCd' :'26'	  , 'cmnnCdHanNm' :'26'   },
		{'cmnnCd' :'울산' , 'cmnnCdHanNm' :'울산' },
		{'cmnnCd' :'28'	  , 'cmnnCdHanNm' :'28'   },
		{'cmnnCd' :'경기남부' , 'cmnnCdHanNm' :'경기남부' },
		{'cmnnCd' :'경기북부' , 'cmnnCdHanNm' :'경기북부' }
	 ];
	
	
	
	/**
	 *  월소득
	 */
	_private.mmIncAmtCd = [
		{'cmnnCd' : "100"  , 'cmnnCdHanNm' :  "100만원 이하"                   },
		{'cmnnCd' :  "125" , 'cmnnCdHanNm' : "101만원 이상 ~ 150만원 이하"    },
		{'cmnnCd' :  "175" , 'cmnnCdHanNm' : "151만원 이상 ~ 200만원 이하"    },
		{'cmnnCd' :  "225" , 'cmnnCdHanNm' : "201만원 이상 ~ 250만원 이하"    },
		{'cmnnCd' :  "275" , 'cmnnCdHanNm' : "251만원 이상 ~ 300만원 이하"    },
		{'cmnnCd' :  "325" , 'cmnnCdHanNm' : "301만원 이상 ~ 350만원 이하"    },
		{'cmnnCd' :  "375" , 'cmnnCdHanNm' : "351만원 이상 ~ 400만원 이하"    },
		{'cmnnCd' :  "425" , 'cmnnCdHanNm' : "401만원 이상 ~ 450만원 이하"    },
		{'cmnnCd' :  "475" , 'cmnnCdHanNm' : "451만원 이상 ~ 500만원 이하"    },
		{'cmnnCd' :  "525" , 'cmnnCdHanNm' : "501만원 이상 ~ 550만원 이하"    },
		{'cmnnCd' :  "575" , 'cmnnCdHanNm' : "551만원 이상 ~ 600만원 이하"    },
		{'cmnnCd' :  "625" , 'cmnnCdHanNm' : "601만원 이상 ~ 650만원 이하"    },
		{'cmnnCd' :  "675" , 'cmnnCdHanNm' : "651만원 이상 ~ 700만원 이하"    },
		{'cmnnCd' :  "725" , 'cmnnCdHanNm' : "701만원 이상 ~ 750만원 이하"    },
		{'cmnnCd' :  "775" , 'cmnnCdHanNm' : "751만원 이상 ~ 800만원 이하"    },
		{'cmnnCd' :  "825" , 'cmnnCdHanNm' : "801만원 이상 ~ 850만원 이하"    },
		{'cmnnCd' :  "875" , 'cmnnCdHanNm' : "851만원 이상 ~ 900만원 이하"    },
		{'cmnnCd' :  "925" , 'cmnnCdHanNm' : "901만원 이상 ~ 950만원 이하"    },
		{'cmnnCd' :  "975" , 'cmnnCdHanNm' : "951만원 이상 ~ 1000만원 이하"   },
		{'cmnnCd' :  "1000", 'cmnnCdHanNm' : "1001만원 이상"		      }
	 ];
	
	
	/**
	 * 총 자산
	 */
	_private.totAsstCd = [
	                      {'cmnnCd':'00', 'cmnnCdHanNm':'선택'},
	                      {'cmnnCd':'01', 'cmnnCdHanNm':'3억 미만'},
	                      {'cmnnCd':'02', 'cmnnCdHanNm':'3억~5억'},
	                      {'cmnnCd':'03', 'cmnnCdHanNm':'5억~10억'},
	                      {'cmnnCd':'04', 'cmnnCdHanNm':'10억 이상'}
	 ];
	
	
	/**
	 * 담배 회수
	 */
	_private.smokCnt = [
	                      {'cmnnCd':"10", 'cmnnCdHanNm':"10개비 이하"},
	                      {'cmnnCd':"20", 'cmnnCdHanNm':"20개비 이하"},
	                      {'cmnnCd':"30", 'cmnnCdHanNm':"30개비 이하"},
	                      {'cmnnCd':"40", 'cmnnCdHanNm':"40개비 이하"},
	                      {'cmnnCd':"41", 'cmnnCdHanNm':"41개비 이상"}
	                   ];
	
	
	/**
	 * 음주 주 몇회 
	 */
	_private.pwkDrnkTicn = [
	                   {'cmnnCd':"1",'cmnnCdHanNm':"1회" },
	                   {'cmnnCd':"2",'cmnnCdHanNm':"2회" },
	                   {'cmnnCd':"3",'cmnnCdHanNm':"3회" },
	                   {'cmnnCd':"4",'cmnnCdHanNm':"4회" },
	                   {'cmnnCd':"5",'cmnnCdHanNm':"5회" },
	                   {'cmnnCd':"6",'cmnnCdHanNm':"6회" },
	                   {'cmnnCd':"7",'cmnnCdHanNm':"7회" }
	                   ];
	
	/**
	 * 음주 회당 몇병
	 */
	_private.drnkBtlCnt = [
	                    {'cmnnCd':"1",'cmnnCdHanNm':"1병 이하"},
	                    {'cmnnCd':"2",'cmnnCdHanNm':"2병 이하"},
	                    {'cmnnCd':"3",'cmnnCdHanNm':"3병 이하"},
	                    {'cmnnCd':"4",'cmnnCdHanNm':"3병 초과"}
	                    ];
	
	
	/**
	 * code id로 코드 취득
	 * @param codeId
	 * @returns
	 */
	_public.getCode = function(codeId) {
		var code = _private[codeId];
		
		if (util.isNull(code)){
			logger.alert('코드가 존재하지 않습니다.');
			return;
		} else {
			return code;
		}
		
	};
	
	return _public;
})();

