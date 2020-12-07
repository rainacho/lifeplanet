/**
 * (C) Copyright AhnLab, Inc.
 *
 * Any part of this source code can not be copied with
 * any method without prior written permission from
 * the author or authorized person.
 *
 * @version		$Revision: 13464 $
 *
 */

var $ASTX2_CUST =
{
	// ASTX2_CUST defined values
	URL_GET_INIT  : 101,
	URL_GET_CERT  : 102,
	URL_GET_STAMP : 103,
	URL_CHK_STAMP : 104,

	getURL: function(type)
	{
		//<protocol>//<hostname>:<port>
		var result = window.location.protocol+'//'+window.location.hostname+':'+window.location.port;

		switch(type)
		{
			case this.URL_GET_INIT :
				result += '/commons/3rd-party/ahnlab/do_get_init.jsp';
			break;
			case this.URL_GET_CERT :
				result += '/commons/3rd-party/ahnlab/do_get_cert.jsp';
			break;
			case this.URL_GET_STAMP :
				result += '/commons/3rd-party/ahnlab/do_get_stamp.jsp';
			break;
			case this.URL_CHK_STAMP :
				result += '/commons/3rd-party/ahnlab/do_chk_stamp.jsp';
			break;
		} // end of switch

		return result;
	},

	getErrorMessage: function(errno)
	{
		var message = '';

		switch(errno)
		{
			case $ASTX2_CONST.ERROR_FAILED:			// 101
				message = "내부 오류가 발생하였습니다.";
			break;
			case $ASTX2_CONST.ERROR_NOINIT:			// 102
				message = "초기화가 필요합니다.";
			break;
			case $ASTX2_CONST.ERROR_NOTINST:		// 103
				message = "설치되어 있지 않습니다.";
			break;
			case $ASTX2_CONST.ERROR_NOTSUPPORTED:	// 104
				message = "지원하지 않는 OS입니다.";
			break;
			case $ASTX2_CONST.ERROR_NOCONNECT:		// 105
				message = "서버 연결에 실패하였습니다.";
			break;
			case $ASTX2_CONST.ERROR_NCK:			// 106
				message = "서버(ASTx) 응답 실패입니다.";
			break;
			case $ASTX2_CONST.ERROR_ERR:			// 107
				message = "서버(ASTx) 내부 오류입니다.";
			break;
			case $ASTX2_CONST.ERROR_NSP:			// 108
				message = "지원하지 되지 않는 환경입니다.";
			break;
		} // end of switch

		return message;
	},

	errorAbort: function(errno)
	{
		alert(this.getErrorMessage(errno));
	}
};
