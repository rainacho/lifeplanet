/* ============================================================================
 * LIFEPLANET Mobile Web Marketing System
 * 
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * AUTHOR      : 권대준, djkwon@kico.co.kr
 * FILE INFO   : message.js, /resources/js/
 * DESCRIPTION : message를 처리를 위한 파일
 * ============================================================================
 * Revision History
 * Author   Date            Description
 * ------   ----------      ---------------------------------------------------
 * 권대준  	2014-11-20		initial version
 * ========================================================================== */

var mwMessageDefine = (function() {
	var _public 	= {};
	var _private 	= {};
	
	/***************************************************************************
	 * [메세지 추가 영역]
	 * 1) 메세지는 메세지 코드에 맞게 문자열로 작성 합니다.
	 * 2) 전달 값이 있는 경우 대체문자열 [@] 를 중간에 삽입 합니다.
	 * 3) Arguments는 Array 형대로 전달 받습니다.
	 * 
	 * [메세지 구분]
	 *   - 공통       : COM
	 *   - 정합성체크 : VLD
	 *   - 고객센터   : CON
	 *   - 상품       : PRO
	 *   - 라플광장   : LIF
	 *   - 마이페이지 : MYP
	 *   - 관리자     : ADM		
	 **************************************************************************/
	_private  = {
		
		//---------------------------------------------------------------------
		// [공통] 메시지 영역
		//---------------------------------------------------------------------	
		'COM001' : '정상 처리 되었습니다.',	
		'COM002' : '[@] 고객님 환영 합니다.',
		'COM003' : '[@]는 [@]보다 클 수 없습니다.',
		'COM004' : '정상적으로 저장 되었습니다.',
		'COM005' : '저장에 실패하였습니다.',
		'COM006' : '정상적으로 수정 되었습니다.',
		'COM007' : '정상적으로 삭제 되었습니다.',
		'COM008' : '하나 이상 선택해야 합니다.',
		'COM009' : '인자값이 부적절 합니다.' , 
		'COM010' : '통신 중 에러가 발생했습니다.' , 
		'COM011' : '로그아웃 하시겠습니까?' , 
		'COM012' : '[@]이 [@]로 발송되었습니다.',
		'COM013' : '메뉴 준비 중 입니다.',
		'COM014' : '올바른 날짜를 입력하여 주십시요.',
		'COM015' : '이동할 URL이 설정되지 않았습니다.',
		'COM016' : '오픈 할 URL이 설정되지 않았습니다.',
		'COM017' : '팝업이 차단 되어 있습니다.\n원활한 서비스를 위해 팝업차단을 허용해 주세요.',
		'COM018' : '올바른 파라메타를 입력해 주십시오.',
		'COM019' : '조회기간은 금일 이후로 선택할 수 없습니다.',
		
		'COM100' : 'V3 설치를 위해 스토어로 이동 합니다.' , 
		'COM101' : '공인인증 모듈은 스마트폰에서만 작동 가능 합니다.' , 
		'COM102' : '현재 테스트 단계이며, 공인인증 모듈은 PASS 됩니다.' , 
		'COM103' : '인증이 취소 되었습니다.' , 
		'COM104' : '등록된 공인인증서가 없습니다.' , 
		'COM105' : '보안 모듈 구동에 실패하였습니다. 어플리케이션을 종료합니다.' , 
		'COM106' : '공통 코드가 존재하지 않습니다.' , 
		'COM107' : '유효한 전화번호 길이가 아닙니다.' , 
		'COM108' : '경로는 반드시 문자열로 전달 해야 합니다.' , 
		'COM109' : '전달값은 반드시 문자열로 전달 해야 합니다.' , 
		'COM110' : '페이지 로딩에 실패 하였습니다.' , 
		'COM111' : '이 기능은 모바일에서만 사용할 수 있습니다.' , 
		'COM112' : '지원하지 않는 SNS입니다.' ,
		
		//---------------------------------------------------------------------
		// [정합성체크] 메시지 영역
		//---------------------------------------------------------------------	
		
		'VLD001' : '[@] (은)는 필수 입력값 입니다.',
		'VLD002' : '[@]글자 이상은 입력할 수 없습니다.',
		'VLD003' : '적어도 [@]글자 이상은 입력해야 합니다.',
		'VLD004' : '[@]글자 이상 [@]글자 이하로 입력해 주세요.',
		'VLD005' : '[@] 이하로 입력해 주세요.',
		'VLD006' : '[@] 이상으로 입력해 주세요.',
		'VLD007' : '[@]에서 [@] 사이의 값을 입력하세요.',
		'VLD008' : '값이 서로 다릅니다.',
		'VLD009' : '날짜가 잘못 입력 되었습니다.',
		'VLD010' : '숫자만 입력하세요.',
		'VLD011' : '한글만 입력하세요.',
		'VLD012' : '영문만 입력하세요.',
		'VLD013' : '유효하지 않은 이메일 입니다.',
		'VLD014' : '유효하지 않은 이메일 앞자리  입니다.',
		'VLD015' : '유효하지 않은 이메일 뒷자리  입니다.',
		'VLD016' : '유효하지 않은 주민번호 입니다.',
		'VLD017' : '휴대전화 1번째 자리는 3~4자리 입니다.',
		'VLD018' : '휴대전화 2번째 자리는 3~4자리 입니다.',
		'VLD019' : '휴대전화 3번째 자리는 4자리 입니다.',
		'VLD020' : 'URL을 올바로 입력하세요.',
		'VLD021' : '8~15자 사이 영문 대소문자로 구성되어 있어야 하며\n4회이상 연속된 문자나 숫자 또는 동일한 문자 또는 숫자는 사용할수 없습니다.',
		'VLD022' : '입력된 성명(이름)을 확인하여 주십시오.' ,
		'VLD023' : '선택된 파일이 없습니다. 1개 이상의 파일을 선택해 주세요.' ,
		'VLD024' : '선택된 이미지파일이 5개 초과입니다. PDF로 변환하거나 \n팩스/우편으로 제출해주세요.' ,
		'VLD025' : '휴대전화 자릿수는 7~8자리 입니다.',
		'VLD026' : '조회시작일이 조회종료일 이후 입니다.',
		'VLD027' : '조회기간을 1년 이내로 설정해 주세요.',
		'VLD028' : '형식이 잘못외었습니다.(예시(생일) : 8101011 또는 8101011234567',
		'VLD029' : '조회시작일이 현재일보다 커질 수 없습니다.',
		'VLD030' : '특수문자는 입력이 불가능합니다.',
		'VLD031' : '이메일의 최대 입력값은 30자입니다.',
		'VLD032' : '성별 코드를 확인해주세요.',

		//---------------------------------------------------------------------
		// [고객센터] 메시지 영역
		//---------------------------------------------------------------------	
		
		'CON001' : '개인(신용)정보의 수집, 이용에 동의해주세요^^',
		'CON002' : '1개 이상의 건강검진표를\n등록해 주세요',
		'CON003' : '5개 이상은 등록할 수 없습니다.',
		
		//---------------------------------------------------------------------
		// [상품] 메시지 영역
		//---------------------------------------------------------------------
		
		//---------------------------------------------------------------------
		// [라플광장] 메시지 영역
		//---------------------------------------------------------------------
		
		//---------------------------------------------------------------------
		// [마이페이지] 메시지 영역
		//---------------------------------------------------------------------
		
		//내정보수정 > 마케팅 수신 변경
		'MYP001' : '마케팅 수신여부를 선택해 주세요.',
		'MYP002' : '가입권유 연락을 선택해 주세요.',
		'MYP003' : '개인(신용)정보의 보유·이용기간을 선택해 주세요.',
		
		//내정보수정 > 비밀번호 관리
		'MYP004' : '비밀번호를 입력해 주세요.',
		'MYP005' : '비밀번호 확인을 입력해 주세요.',
		'MYP006' : '현재 비밀번호를 입력해 주세요.',
		'MYP007' : '변경할 비밀번호를 입력해 주세요.',
		'MYP008' : '변경할 비밀번호 확인을 입력해 주세요.',
		'MYP009' : '비밀번호를 먼저 등록해 주세요.',
		'MYP010' : '올바른 숫자가 아닙니다.',
		'MYP011' : '비밀번호는 4자리로 설정해 주세요.',
		'MYP012' : '주민등록번호와 동일한 비밀번호는 사용할 수 없습니다.',
		'MYP013' : '생년월일과 동일한 비밀번호는 사용할 수 없습니다.',
		'MYP014' : '자택전화번호와 동일한 비밀번호는 사용할 수 없습니다.',
		'MYP015' : '직장전화번호와 동일한 비밀번호는 사용할 수 없습니다.',
		'MYP016' : '휴대전화번호와 동일한 비밀번호는 사용할 수 없습니다.',
		'MYP017' : '연속된 비밀번호는 사용할 수 없습니다.',
		'MYP018' : '연속된 비밀번호는 사용할 수 없습니다.',
		'MYP019' : '동일한 숫자는 사용할 수 없습니다.',
		'MYP020' : '미등록고객 입니다. 변경할 수 없습니다.',
		'MYP021' : '구간암호복호화처리오류입니다.',
		'MYP022' : '암호화처리오류입니다.',
		'MYP023' : '최근(3회) 사용하셨던 비밀번호는 등록하실수 없습니다.',
		
		//활동내역조회 > 발송내역/개인정보이용.제공현황
		'MYP024' : '계약을 선택해주세요.',
		'MYP025' : '현재날짜 이후로는 조회를 할 수 없습니다.',
		'MYP026' : '조회 시작 날짜가 더 빨라야 합니다.',
		'MYP027' : '발송매체를 체크해주세요.',
		'MYP028' : '발송업무를 체크해주세요.',
		
		//내정보수정 > 연락처수정
		'MYP029' : '휴대전화 본인인증을 해 주세요.',
		'MYP030' : '수정할 항목을 입력하고 수정하기 버튼을 눌러주세요.',
		
		//보험금신청 > 보험금신청
		'MYP031' : '피보험자를 선택하세요.',
		'MYP032' : '태아의 경우 태아등재 후 보험금 신청이 가능합니다.' +
				'태아등재는 마이페이지 > 계약조회/변경 메뉴에서 가능합니다.' +
				'궁금한 사항이 있으시면 고객센터(1566-0999)로 문의하여 주시기 바랍니다.',
		'MYP033' : '질병(재해)내용은 100자까지 입력하실 수 있습니다.',
		'MYP034' : '청구사유를 선택해 주세요.',
		'MYP035' : '발생원인을 선택해 주세요.',
		'MYP036' : '발병/사고 일시를 입력해 주세요.',
		'MYP037' : '발생/사고 장소를 선택해 주세요.',
		'MYP038' : '피보험자와의 관계를 선택해 주세요.',
		'MYP039' : '개인(신용)정보의 수집, 이용에 관한 사항에 동의해 주세요.',
		'MYP040' : '개인(신용)정보의 조회에 관한 사항에 동의해주세요.',
		'MYP041' : '개인(신용)정보의 제공에 관한 사항에 동의해주세요.',
		'MYP042' : '민감정보의 처리에 관한 사항에 동의해 주세요.',
		'MYP043' : '고유식별정보의 처리에 관한 사항에 동의해 주세요.',
		'MYP044' : '타친권자협의에 동의해 주세요.',
		'MYP045' : '동의 버튼을 클릭해 주세요.',
		'MYP046' : '고객정보가 없습니다. 고객센터로 문의해 주세요.',
		'MYP047' : '결과 처리 중 오류가 발생했습니다. 고객센터로 문의해 주세요.',
		'MYP048' : '파일 업로드를 실패했습니다.',
		
		//보험금신청 > 보험금신청목록
		'MYP049' : '조회기간을 다시 설정해 주세요.',
		'MYP050' : '지급금이 없는 경우는 상세내역정보를 제공하지 않습니다.',
		
		//보험금신청 > 연금수령
		'MYP051' : '신청할 연금보험을 선택해 주세요',
		'MYP052' : '연금수령할 항목을 선택해주세요.',
		'MYP053' : '수령할 금액이 0원 입니다.',
		
		//보험계약철회 > 청약철회
		'MYP054' : '결제취소 이유를 선택해 주세요.',
		'MYP055' : '청약철회 이유를 선택해 주세요.',
		'MYP056' : '기타 이유를 작성해 주세요.',
		'MYP057' : '자동이체 계좌 정보가 존재하지 않아 결제취소를 하실 수 없습니다.',
		'MYP058' : '자동이체 계좌 정보가 존재하지 않아 청약철회를 하실 수 없습니다.',
		
		//보험계약철회 > 책임보상신청
		'MYP059' : '책임보상신청 이유를 선택해 주세요.',
		'MYP060' : '자동이체 계좌 정보가 존재하지 않아 책임보상신청을 하실 수 없습니다.',
		
		//보험계약조회 > 페이스메이커
		'MYP061' : '최소 목표금액은 [@]만원 입니다. 범위에 맞게 설정해 주세요.',
		'MYP062' : '최대 목표금액은 [@]만원 입니다. 범위에 맞게 설정해 주세요.',
		'MYP063' : '최소 목표설정 기간은 [@]년 [@]개월입니다. 범위에 맞게 설정해 주세요.',
		'MYP064' : '최대 목표설정 기간은 [@]년 [@]개월입니다. 범위에 맞게 설정해 주세요.',
		'MYP065' : '가입 되었습니다.',
		'MYP066' : '비정상 처리 되었습니다. 다시 시도해 주시기 바랍니다.',
		'MYP067' : '최소 목표금액은 [@]원 입니다.',
		'MYP068' : '최대 목표금액은 [@]원 입니다.',
		'MYP069' : '처리 실패 하였습니다. 다시 조정하여 주십시요.',
		'MYP070' : '정상처리 되었습니다.',
		'MYP071' : '취소할 계약을 선택해 주세요.',
		'MYP072' : '비정상 처리 되었습니다. 다시 시도해 주시기 바랍니다.',
		
		//보험계약조회 > 인수특약신청
		'MYP073' : '특별조건부(인수)특약 신청서을 확인해 주세요.',
		'MYP074' : '동의여부를 선택해 주세요.',
		'MYP075' : '전자서명용 청약서가 생성되지 않았습니다.\n잠시 후 다시 시도해 주세요.',
		'MYP076' : '정상적으로 파일이 생성되지 않았습니다.\n다시 시도해 주세요.',
		'MYP077' : '특별조건부(인수)특약 신청서을 확인해 주세요.',
		'MYP078' : '정상적으로 처리되었습니다.',
		
		//보험계약조회 > 납입내역조회 > 이메일 영수증 발행
		'MYP079' : '등록하신 이메일로 영수증이 발송되었습니다.',
		
		//우편번호 검색
		'POST000' : '입력하신 [@] 존재하지 않습니다.\n확인 후 다시 입력해주세요.',
		'POST001' : '[@] [@]자 이상입력해주세요.',
		
		//---------------------------------------------------------------------
		// [관리자] 메시지 영역
		//---------------------------------------------------------------------
		
		'ADM999' : '사용하지 않는 메시지-마지막 콤마 오류 방지용'
	};
	
	/***************************************************************************
	 * [메세지 출력 함수 영역]
	 * 1) 해당함수는 직접 호출하여 사용하지 않습니다.
	 * 2) 메세지 사용은 message.getMsg(msgId, args); 를 이용하여 호출 합니다.
	 **************************************************************************/
	_public.getMsg = function(msgId) {
		return _private[msgId];
	};
	
	return _public;
})();