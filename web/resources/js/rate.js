/*
 * Part : 상품안내 및 기타페이지 공시이율 관련 data
 */
//적용 이율 및 날짜타입 셋팅
function disclosureRate(){
	var rateInfo = globalVar.getParam("rateInfo");
	// 2018.03.23 이후 수정하지 않음
	$('[data-rate="date01"]').text(rateInfo.date01); //yyyy년 m월
	$('[data-rate="date02"]').text(rateInfo.date02); //yyyy년 m월
	$('[data-rate="rate01"]').text(rateInfo.rate01); //공통
	$('[data-rate="rate02"]').text(rateInfo.rate02); //종신
	$('[data-rate="rate03"]').text(rateInfo.rate03); //연금
	$('[data-rate="rate04"]').text(rateInfo.rate04); //연금저축
	$('[data-rate="rate05"]').text(rateInfo.rate05); //에듀케어
	$('[data-rate="rate06"]').text(rateInfo.rate06); //저축
	$('[data-rate="rate07"]').text(rateInfo.rate07); //평균공시이율
	$('[data-rate="rate08"]').text(rateInfo.rate08); //암보헝 평균
	$('[data-rate="rate09"]').text(rateInfo.rate09); //5대성인병 평균
	$('[data-rate="term02"]').text(rateInfo.term02);

	$('[data-rate="10004"]').text(rateInfo['10004']);	// 연금저축
	$('[data-rate="10050"]').text(rateInfo['10050']);	// e저축보험

	//2018.03.23 공통 선언 후 사용
	$('[data-rate="F01"]').text(rateInfo['F01']);			// 보장(무배당)
	$('[data-rate="F02"]').text(rateInfo['F02']);			// 저축(무배당)
	$('[data-rate="F12"]').text(rateInfo['F12']);       // 저축(무배당)(1개월)
	$('[data-rate="F03"]').text(rateInfo['F03']);			// 연금(무배당)
	$('[data-rate="F04"]').text(rateInfo['F04']);			// 연금저축(무배당)
	$('[data-rate="H01"]').text(rateInfo['H01']);			// 평균공시이율
	
	
	// 저축보험event 일자(고정)
	$('[data-rate="evntBaseDate"]').text('2020.10.20');	// e저축보험 이벤트기준일자

}

//이율 조회 및 데이터 글로벌변수에 저장
function setRateData(){

	var RATE_DATA = globalVar.getParam("RATE_DATA");

	var F01 , F02,  F03 , F04, H01, F12;

	if(RATE_DATA== undefined){
		 F01 = util.floor(Main.getRate('F','D','F01').flctIrat, 2);	// 공시이율4 보장 무배당
		 F02 = util.floor(Main.getRate('F','D','F02').flctIrat, 2);	// 공시이율4 저축 무배당
		 F12 = util.floor(Main.getRate('F','D','F12').flctIrat, 2);	// 공시이율4 저축 무배당(1개월)
		 F03 = util.floor(Main.getRate('F','D','F03').flctIrat, 2);	// 공시이율4 연금 무배당
		 F04 = util.floor(Main.getRate('F','D','F04').flctIrat, 2);	// 공시이율4 연금저축 무배당
		 H01 = util.floor(Main.getRate('H','Z','H01').flctIrat, 2);	// 평균 공시이율
	}else{
		 F01 = util.floor(RATE_DATA.f01, 2);	// 공시이율4 보장 무배당
		 F02 = util.floor(RATE_DATA.f02, 2);	// 공시이율4 저축 무배당
		 F12 = util.floor(RATE_DATA.f12, 2);	// 공시이율4 저축 무배당(1개월)
		 F03 = util.floor(RATE_DATA.f03, 2);	// 공시이율4 연금 무배당
		 F04 = util.floor(RATE_DATA.f04, 2);	// 공시이율4 연금저축 무배당
		 H01 = util.floor(RATE_DATA.h01, 2);	// 평균 공시이율
	}

	var date  = util.getDate();
	var year  = date.substring(0,4);
	var month = date.substring(4,6);

	var rateInfo = {};

	//날짜
	rateInfo.date01 = year + "년 " + parseInt(month) + "월";
	rateInfo.date02 = year + "." + parseInt(month);
	//이율
	rateInfo.rate01 = F02 + "%";	//공통
	rateInfo.rate02 = F01 + "%";	//종신
	rateInfo.rate03 = F03 + "%";	//연금
	rateInfo.rate04 = F04 + "%";	//연금저축
	rateInfo.rate05 = F02 + "%";	//에듀케어
	rateInfo.rate06 = F02 + "%";	//e저축보험Ⅱ
	rateInfo.rate07 = H01 + "%";	//평균공시이율

	rateInfo['10004'] = F04;			// 연금저축보험
	rateInfo['10050'] = F12;			// e저축보험

	// 공통으로 사용할 수 있도록 선언 2018.03.23
	rateInfo['F01'] = F01;			// 보장(무배당)
	rateInfo['F02'] = F02;			// 저축(무배당)
	rateInfo['F12'] = F12;			// 저축(무배당)(1개월)
	rateInfo['F03'] = F03;			// 연금(무배당)
	rateInfo['F04'] = F04;			// 연금저축(무배당)
	rateInfo['H01'] = H01;			// 평균공시이율

	//기타
	rateInfo.rate08 = "25.5%";
	rateInfo.rate09 = "20.9%";
	rateInfo.term02 = year + "년 1월부터 " + year + "년 12월까지";

	globalVar.setParam("rateInfo" ,rateInfo);
}

$(function(){
	// globalVar 변수에 이율정보가 없는 경우에 조회하여 세팅
	if(globalVar != undefined) {
		if(globalVar.getParam("rateInfo")==undefined){
			setRateData();
		}

		disclosureRate();
	}
});