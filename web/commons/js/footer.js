/**
 * 메뉴경로 및 화면명 : footer 
 * 작성일 : 
 * 작성자 : 
 * 참  고 : 모든 화면에 jsp 인클루드되어 사용됨.
 *          docHead.jsp에 인클루드외어 있음
 * 변경이력 : 
 */

function setMoveLink(nKey) {
	
	if (nKey == 0){			//개인정보처리방침
		PageUtil.movePage("/information/HPFA01S1");
	} else if (nKey == 1){	//이용약관
		PageUtil.movePage("/information/HPFA01S4");
	} else if (nKey == 2){	//전자금융거래약관
		PageUtil.movePage("/information/HPFA01S5");
	} else if (nKey == 3){	//이메일 무단수집 거부
		PageUtil.movePage("/information/HPFA01S6");
	} else if (nKey == 4){	//e보험범죄신고
		PageUtil.movePage("/contact/dclr/HPCE02S0");
	} else if (nKey == 5){	//장애인 및 장기기증자 보험가입 차별신고
		PageUtil.movePage("/contact/dclr/HPCE04S0");
	} else if (nKey == 6){	//전자민원접수
		PageUtil.movePage("/contact/dclr/HPCE05S2");
	} else if (nKey == 7){	//개인정보취급방침
		PageUtil.movePage("/information/HPFA01S11");
	} else if (nKey == 8){	//개인신용정보.조회 시스템
		PageUtil.movePage("/mypage/my/HPMY300S1");
	} else if (nKey == 9){
		PageUtil.movePage("/information/HPFA01S14");
	}
	
}
