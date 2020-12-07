/* ============================================================================
 * LIFEPLANET Channel System
 * Copyright ⓒ KYOBO LIFEPLANET INSURANCE COMPANY All Rights Reserved.
 * ============================================================================
 * DESCRIPTION : 라이프플래닛 웹로그/상품설계로그 (HP)
 * ========================================================================= */

var lifeplanetWeblog = (function() {

	var _public = {};
	var _private = {};

	//-----------------------------------------------
	// private 함수
	//-----------------------------------------------

	/*
	 * 공통 함수
	 */

	// 빈 배열인지 확인
	_private.isArrayEmpty = function(arr) {

		if(arr === undefined || arr === null){
			return true;
		} else if(!(arr instanceof Array) || arr.length === 0){
			return true;
		}

		return false;
	}


	// ajax 호출
	_private.callAjax = function(param){

		$.ajax({
			type: 'POST',
			url: '/common/cc/LifeplanetWeblog.ajax',
			data: {JSON_DATA : JSON.stringify(param)},
			dataType: 'text',
			success: function(data, resStatus) {
				logger.info("lifeplanetWeblog success\n" +
							"- data: " + data + "\n" +
							"- resStatus: " + resStatus);
			},
			error: function(xhr, resStatus, err) {
				logger.error("lifeplanetWeblog error\n" +
							"- xhr response: " + xhr.responseText + "\n" +
							"- resStatus: " + resStatus + "\n" +
							"- err: " + err);
			}
		});
	}


	/*
	 * 라이프플래닛 웹로그 private 함수
	 */

	// 라이프플래닛 웹로그 파라미터 설정
	_private.setWeblogParam = function(hmpgInfoSaveScCd, hmpgDalIdScCd) {

		var param  = new Object();

		var scrnIdAndQueryStr = window.location.href.split('/').splice(-1)[0];
		var scrnId   = util.nvl(scrnIdAndQueryStr.split('?')[0], '');
		var queryStr = util.nvl(scrnIdAndQueryStr.split('?')[1], '');
		var hmpgParamText = '';

		try{
			hmpgParamText = decodeURI(queryStr);
		} catch(e){
			hmpgParamText = queryStr;
		}

		param = {
			tradeKey	  	 : 'insertWeblog',
			hpScrnId	  	 : scrnId,
			hmpgParamText 	 : hmpgParamText,
			hmpgInfoSaveScCd : hmpgInfoSaveScCd,
			hmpgDalIdScCd 	 : hmpgDalIdScCd
		}

		return param;
	}


	// 라이프플래닛 웹로그 저장
	_private.insertWeblog = function(hmpgInfoSaveScCd, hmpgDalIdScCd) {
		var param = _private.setWeblogParam(hmpgInfoSaveScCd, hmpgDalIdScCd); // ajax 파라미터 설정
		_private.callAjax(param); // call Ajax
	}


	/*
	 * 라이프플래닛 상품설계로그 private 함수
	 */

	// 상품설계정보(spb_data_arr) 생성
	_private.makeSpbDataArr = function() {

		var spb_dom_data = document.getElementById('hidden_input').querySelectorAll('[id^=spb]');

		if(spb_dom_data.length === 0){
			throw '상품설계정보가 없습니다.';
		}

		var spb_data = new Object();

		for(var i = 0; i < spb_dom_data.length; i++) {

			var key = spb_dom_data[i].getAttribute('id');
			var val = spb_dom_data[i].getAttribute('value');

			spb_data[key] = val;
		}

		return [spb_data];
	}


	// 상품설계정보(spb_data_arr) 반환
	_private.getSpbDataArr = function() {

		var global_spb_data_arr = globalVar.getParam('spb_data_arr');

		if(_private.isArrayEmpty(global_spb_data_arr)){
			throw '상품설계정보가 없습니다.';
		} else {
			return JSON.parse(JSON.stringify(global_spb_data_arr)); // 상품설계정보 deep-copy
		}
	}


	// 상품설계정보에 개인정보저장결과 데이터 추가
	_private.addIndvInfoSaveRsltToSpbDataArr = function(spb_data_arr, indvInfoSaveRslt) {

		var new_spb_data_arr = [];

		if(spb_data_arr.length !== indvInfoSaveRslt.length) {
			throw '상품설계정보와 개인정보저장결과가 서로 매칭되지 않습니다.';
		}

		// 상품설계정보의 상품코드와 매칭되는 개인정보저장결과 탐색
		for(var i = 0; i < spb_data_arr.length; i++) {

			var spb_data = spb_data_arr[i];

			var indvInfo = indvInfoSaveRslt.filter(function(item){
				return item.goodCd === spb_data.spb_goodCd;
			});

			if(_private.isArrayEmpty(indvInfo)) {
				throw '상품설계정보와 개인정보저장결과가 서로 매칭되지 않습니다.';
			}

			spb_data.spb_entPlnno = indvInfo[0].entPlnno;	// 가입설계번호
			spb_data.spb_insConno = indvInfo[0].insConno;	// 가입증서번호

			new_spb_data_arr.push(spb_data);
		}

		return new_spb_data_arr;
	}


	// 상품설계로그 파라미터 설정
	_private.setGoodDsgnLogParam = function(spb_data_arr) {

		var param  = new Object();

		param = {
			spb_data_arr : spb_data_arr,
			tradeKey : 'insertGoodDsgnLog'
		};

		return param;
	}


	//-----------------------------------------------
	// public 함수
	//-----------------------------------------------

	/**
	 * 라이프플래닛 웹로그 public 함수
	 */

	// 페이지 Load 시, 라이프플래닛 웹로그 저장
	_public.insertPageLoadWeblog = function(hmpgDalIdScCd) {

		var hmpgInfoSaveScCd = '01';

		if(hmpgDalIdScCd === undefined || hmpgDalIdScCd === null) {
			hmpgDalIdScCd = '';
		}

		_private.insertWeblog(hmpgInfoSaveScCd, hmpgDalIdScCd);
	}


	// 클릭 시, 라이프플래닛 웹로그 저장
	_public.insertClickWeblog = function(hmpgDalIdScCd) {

		var hmpgInfoSaveScCd = '02';

		if(hmpgDalIdScCd === undefined || hmpgDalIdScCd === null) {
			hmpgDalIdScCd = '';
		}

		_private.insertWeblog(hmpgInfoSaveScCd, hmpgDalIdScCd);
	}


	/**
	 * 라이프플래닛 상품설계로그 public 함수
	 */

	// 상품설계정보(spb_good_arr) 저장
	// indvInfoSaveRslt가 파라미터로 주어지지 않으면 spb_data_arr 변경 없이 로그 적재
	_public.insertGoodDsgnLog = function(indvInfoSaveRslt) {

		try{
			var spb_data_arr = _private.getSpbDataArr(); // globalVar에 있는 상품설계정보

			if(!_private.isArrayEmpty(indvInfoSaveRslt)) { // 개인정보저장결과가 있는 경우 상품설계정보 수정
				spb_data_arr = _private.addIndvInfoSaveRsltToSpbDataArr(spb_data_arr, indvInfoSaveRslt);
			}

			var param = _private.setGoodDsgnLogParam(spb_data_arr); // ajax 파라미터 설정
			_private.callAjax(param); // call Ajax

		} catch(e){
			logger.error(e);
		}
	}


	// 보험료 계산 결과 저장
	_public.insertGoodDsgnCalcLog = function() {

		try{
			var spb_data_arr = _private.makeSpbDataArr(); // 상품설계정보 생성

			var param = _private.setGoodDsgnLogParam(spb_data_arr); // ajax 파라미터 설정
			_private.callAjax(param); // call Ajax
			webLog.runDsPDFunc(spb_data_arr);  //Data Story 웹로그 저장

		} catch(e){
			logger.error(e);
		}
	}

	return _public;

})();