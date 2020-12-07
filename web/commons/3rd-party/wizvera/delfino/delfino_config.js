var _Delfino_Base = window.location.protocol + "//" + window.location.host + "/commons/3rd-party/wizvera/delfino";
var _Delfino_Svc  = window.location.protocol + "//" + window.location.host + "/commons/3rd-party/wizvera/delfino/svc";
var _Delfino_Down = _Delfino_Base + "/down";
//_Delfino_Down = "http://help.wizvera.com/svc/wizvera/delfino_test";


var _Delfino_SystemMode = "real"; //"test", "real"
var _Delfino_SystemLang = "KOR";  //"KOR", "ENG", "CHN", "JPN"
var _Delfino_ModuleType = "";     //"G2", "G3", "G4"
if (typeof _SITE_SystemMode != "undefined") _Delfino_SystemMode = _SITE_SystemMode;
if (typeof _SITE_SystemLang != "undefined") _Delfino_SystemLang = _SITE_SystemLang;
if (typeof _SITE_ModuleType != "undefined") _Delfino_ModuleType = _SITE_ModuleType;

var DelfinoConfig = {
    multiDomain : "", //".wizvera.com",
    uiType : "", //"senior",

    version : { //설치버전
        WinIE   : "2,1,0,2",
        WinMoz  : "2.1.0.2",
        Mac     : "2.1.0.2",
        Linux   : "2.1.0.2"
    },
    version_update : { //업데이트버전(외부에서 설정된 확률로 업데이트 처리)
        WinIE   : "2,1,0,2",
        WinMoz  : "2.1.0.2",
        Mac     : "2.1.0.2",
        Linux   : "2.1.0.2"
    },
    version_g3 : { //V3 URL 핸들러
        WinIE   : "3,1,2,1",
        WinMoz  : "3,1,2,1",
        Mac     : "3,1,1,1",
        Linux   : "3,1,1,1"
    },
    mimeType : { //object MimeType
        WinIE   : "CLSID:BAE6E050-BFA0-4bea-B62D-2D9F75E51084",
        WinMoz  : "application/x-dolphinobj",
        Mac     : "application/x-dolphinobj",
        Linux   : "application/x-dolphinobj"
    },
    installPage_org : { //설치페이지
        WinIE   : _Delfino_Base + "/install/install_handler.html?sys=WinIE",
        WinMoz  : _Delfino_Base + "/install/install_handler.html?sys=WinMoz",
        Mac     : _Delfino_Base + "/install/install_handler.html?sys=Mac",
        Linux   : _Delfino_Base + "/install/install_handler.html?sys=Linux",
        iOS     : _Delfino_Base + "/install/install_handler.html?sys=iOS",
        Android : _Delfino_Base + "/install/install_handler.html?sys=Android"
    },
    installPage : { //통합설치페이지
        WinIE   : "/common/cc/HPCC100S1.dev?P_name=DelfinoG3",
        WinMoz  : "/common/cc/HPCC100S1.dev?P_name=DelfinoG3",
        Mac     : "/common/cc/HPCC100S1.dev?P_name=DelfinoG3",
        Linux   : "/common/cc/HPCC100S1.dev?P_name=DelfinoG3",
        iOS     : _Delfino_Base + "/install/install_multi.html?sys=iOS",
        Android : _Delfino_Base + "/install/install_multi.html?sys=Android"
    },
    installPage_g3 : {
        url : _Delfino_Base + "/install/install_g4_native.html?P_name=Delfino&module=G3&url=close",
        width : 800,
        height : 600
    },
    installPkg : { //다운로드 모듈
        Cab32   : _Delfino_Down + "/delfino.cab",
        Cab64   : _Delfino_Down + "/delfino-x64.cab",
        Win32   : _Delfino_Down + "/delfino.exe",
        Win64   : _Delfino_Down + "/delfino-x64.exe",

        Mac32   : _Delfino_Down + "/delfino.pkg",
        Mac64   : _Delfino_Down + "/delfino.pkg",
        Dev32   : _Delfino_Down + "/delfino_i386.deb",
        Dev64   : _Delfino_Down + "/delfino_amd64.deb",
        Rpm32   : _Delfino_Down + "/delfino.i386.rpm",
        Rpm64   : _Delfino_Down + "/delfino.x86_64.rpm",

        iOS     : "https://itunes.apple.com/kr/app/delpino/id664995020?mt=8&uo=4",
        Android : "market://details?id=com.wizvera.dolphin"
    },
    installPkg_g3 : { //다운로드 모듈
        Cab32   : "",
        Cab64   : "",
        Win32   : _Delfino_Down + "/delfino-g3.exe",
        Win64   : _Delfino_Down + "/delfino-g3.exe",

        Mac32   : _Delfino_Down + "/delfino-g3.pkg",
        Mac64   : _Delfino_Down + "/delfino-g3.pkg",
        Dev32   : _Delfino_Down + "/delfino-g3_i386.deb",
        Dev64   : _Delfino_Down + "/delfino-g3_amd64.deb",
        Rpm32   : _Delfino_Down + "/delfino-g3.i386.rpm",
        Rpm64   : _Delfino_Down + "/delfino-g3.x86_64.rpm",

        iOS     : "https://itunes.apple.com/kr/app/delpino/id664995020?mt=8&uo=4",
        Android : "market://details?id=com.wizvera.dolphin"
    },


    /** 로고이미지 URL 설정: size(428x81) */
    logoImageUrl :        _Delfino_Base + "/sitelogo/delfino_logo.html",
    //logoImageUrl_428x81 : _Delfino_Base + "/sitelogo/delfino_logo_428x81.html",
    logoImageUrl_html5  : _Delfino_Base + "/sitelogo/delfino_logo.png",


    /** 미설치시 설치확인(confirm)을 위한 메시지 ""일경우 메시지 없이 설치페이지로 이동함 */
    installMessage : {
        NO      : "공인인증 거래가 지원되지 않는 환경에서 접속하셨습니다.",
        PC      : "공인인증프로그램을 설치하셔야만 이용이 가능한 서비스입니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.",
        Mobile  : "전용 브라우저를 사용하여야만 이용이 가능한 서비스입니다.\n[승인]을 선택하시면 전용 브라우저가 실행(설치)됩니다."
    },


    /** 인증서 선택창에서 저장매체 캐쉬 설정(필요시 하단에서 도메인별로 설정) */
    cacheCertStore : "false",

    /** 인증서 선택창에서 저장매체 enable/disable(LOCAL_DISK|REMOVABLE_DISK|TOKEN|HSM|PHONE|USIM|SWHSM)*/
    certStoreFilter : "",
    prepareCertStore : "",

    disableExpireFilter : true,  //만료된 인증서 보이기
    disableExpireWarn   : false, //만료된 인증서 경고툴팁 안보이기

    /** 인증서 선택창에서 인증서 필터링 위한 인증서 발급자 DN 설정.
     * '|'로 구분하여 여러개를 설정. */
    issuerCertFilter : "CN=CrossCert Certificate Authority,OU=AccreditedCA,O=CrossCert,C=KR|"
                      +"CN=signGATE CA4,OU=AccreditedCA,O=KICA,C=KR|"
                      +"CN=CrossCertCA2,OU=AccreditedCA,O=CrossCert,C=KR|"
                      +"CN=SignKorea CA,OU=AccreditedCA,O=SignKorea,C=KR|"
                      +"CN=TradeSignCA,OU=AccreditedCA,O=TradeSign,C=KR|"
                      +"CN=NCASignCA,OU=AccreditedCA,O=NCASign,C=KR|"
                      +"CN=yessignCA Class 1,OU=AccreditedCA,O=yessign,C=kr|"
                      +"CN=yessignCA Class 2,OU=AccreditedCA,O=yessign,C=kr|"
                      +"CN=CrossCertCA3,OU=AccreditedCA,O=CrossCert,C=KR|"
                      +"CN=SignKorea CA3,OU=AccreditedCA,O=SignKorea,C=KR|"
                      +"CN=signGATE CA5,OU=AccreditedCA,O=KICA,C=KR|"
                      +"CN=TradeSignCA3,OU=AccreditedCA,O=TradeSign,C=KR|"
                      +"CN=signGATE CA2,OU=AccreditedCA,O=KICA,C=KR|"
                      +"CN=TradeSignCA2,OU=AccreditedCA,O=TradeSign,C=KR|"
                      +"CN=KISA RootCA 1,OU=Korea Certification Authority Central,O=KISA,C=KR|"
                      +"CN=KISA RootCA 4,OU=Korea Certification Authority Central,O=KISA,C=KR|"
                      +"CN=yessignCA,OU=AccreditedCA,O=yessign,C=kr|"
                      +"CN=SignKorea CA2,OU=AccreditedCA,O=SignKorea,C=KR|"
                      +"CN=INIPASS CA,OU=AccreditedCA,O=INIPASS,C=KR|",

    //test
    issuerCertFilter_test : "CN=SignKorea Test CA,OU=LicensedCA,O=SignKorea,C=KR|"
                        +"CN=3280TestCAServer,OU=AccreditedCA,O=CrossCert,C=KR|"
                        +"CN=signGATE FTCA04,OU=AccreditedCA,O=KICA,C=KR|"
                        +"CN=TestTradeSignCA,OU=AccreditedCA,O=TradeSign,C=KR|"
                        +"CN=yessignCA-Test Class 1,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=SignKorea Test CA2,OU=AccreditedCA,O=SignKorea,C=KR|"
                        +"CN=SignKorea Test CA3,OU=AccreditedCA,O=SignKorea,C=KR|"
                        +"CN=yessignCA-TEST,OU=LicensedCA,O=yessign,C=kr|"
                        +"CN=signGATE FTCA02,OU=AccreditedCA,O=KICA,C=KR|"
                        +"CN=yessignCA-TEST,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=SignKorea Test CA,OU=AccreditedCA,O=SignKorea,C=KR|"
                        +"CN=TradeSignCA2009Test2,OU=AccreditedCA,O=TradeSign,C=KR|"
                        +"CN=CrossCertTestCA2,OU=AccreditedCA,O=CrossCert,C=KR|"
                        +"CN=CrossCertTestCA3,OU=AccreditedCA,O=CrossCert,C=KR|"
                        +"CN=NCATESTSign,OU=licensedCA,O=NCASign,C=KR|"
                        +"CN=CrossCertTestCA,OU=AccreditedCA,O=CrossCert,C=KR|"
                        +"CN=yessignCA-Test Class 0,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=yessignCA-Test Class 2,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=INIPASS TEST CA 2,OU=AccreditedCA,O=INIPASS,C=KR|",


    /** 인증서 선택창에서 인증서 필터링 위한 인증서 정책 OID 설정.
     * '|'로 구분하여 여러개를 설정. */
    policyOidCertFilter : ""
                        //상호연동(10)
                        +"1.2.410.200005.1.1.1|"	// 금결원,   개인, 상호연동
                        +"1.2.410.200005.1.1.5|"	// 금결원,   법인, 상호연동
                        +"1.2.410.200004.5.1.1.5|"	// 코스콤,   개인, 상호연동
                        +"1.2.410.200004.5.1.1.7|"	// 코스콤,   법인, 상호연동
                        +"1.2.410.200004.5.2.1.2|"	// 정보인증, 개인, 상호연동
                        +"1.2.410.200004.5.2.1.1|"	// 정보인증, 법인, 상호연동
                        +"1.2.410.200004.5.4.1.1|"	// 전자인증, 개인, 상호연동
                        +"1.2.410.200004.5.4.1.2|"	// 전자인증, 법인, 상호연동
                        +"1.2.410.200012.1.1.1|"	// 무역정보, 개인, 상호연동
                        +"1.2.410.200012.1.1.3|"	// 무역정보, 법인, 상호연동
                        +"1.2.410.200004.5.5.1.1|"	// 이니텍,   개인, 상호연동
                        +"1.2.410.200004.5.5.1.2|"	// 이니텍,   법인, 상호연동

                        //은행,보험,카드,민원(2)
                        +"1.2.410.200005.1.1.4|"     //금결원,   개인, 용도제한(은행/보험/카드/민원)
                        +"1.2.410.200005.1.1.2|"     //금결원,   법인, 용도제한(은행/보험/카드/민원)

                        /* //은행(4)
                        +"1.2.410.200005.1.1.6.1|"   //금결원,   법인, 용도제한(기업뱅킹)
                        +"1.2.410.200004.5.2.1.7.1|" //정보인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200004.5.4.1.101|" //전자인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200012.1.1.101|"   //무역정보, 법인, 용도제한(은행/보험/민원) *별도협의필요*
                        */

                        /* //카드(7)
                        +"1.2.410.200004.5.1.1.9.2|" //코스콤,   개인, 용도제한(카드)
                        +"1.2.410.200004.5.2.1.7.3|" //정보인증, 개인, 용도제한(카드)
                        +"1.2.410.200004.5.2.1.7.1|" //정보인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200004.5.4.1.103|" //전자인증, 개인, 용도제한(카드)
                        //+"1.2.410.200012.1.1.105|"   //무역정보, 개인, 용도제한(카드) *별도협의필요*
                        //+"1.2.410.200012.1.1.103|"   //무역정보, 개인, 용도제한(증권/카드) *별도협의필요*
                        //+"1.2.410.200004.5.1.1.12.908|" //코스콤, 법인, 용도제한(신한카드세금계산서결제전용)
                        */

                        //보험(4)
                        +"1.2.410.200004.5.1.1.9|"   //코스콤,   개인, 용도제한(증권/보험/민원)
                        +"1.2.410.200004.5.2.1.7.1|" //정보인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200004.5.4.1.101|" //전자인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200012.1.1.101|"   //무역정보, 법인, 용도제한(은행/보험/민원) *별도협의필요*
                       

                        //증권(4)
                        +"1.2.410.200004.5.1.1.9|"   //코스콤,   개인, 용도제한(증권/보험/민원)
                        +"1.2.410.200004.5.2.1.7.2|" //정보인증, 개인, 용도제한(증권)
                        +"1.2.410.200004.5.4.1.102|" //전자인증, 개인, 용도제한(증권)
                        //+"1.2.410.200012.1.1.103|"   //무역정보, 개인, 용도제한(증권/카드) *별도협의필요*
                        

                        /* //기타(4)
                        +"1.2.410.200004.5.2.1.5001|"	// 정보인증, 법인, 용도제한(세금계산서-국세청)
                        +"1.2.410.200004.5.2.1.6.257|"	// 정보인증, 법인, 용도제한(세금계산서-일반)
                        +"1.2.410.200004.5.4.1.104|"	// 전자인증, 개인, 용도제한(민원)
                        +"1.2.410.200005.1.1.6.8|"		// 금결원,   법인, 용도제한(세금계산서)
                        +"1.2.410.200004.5.5.1.3.1|"	// 이니텍,   개인, 제휴기관용
						+"1.2.410.200004.5.5.1.4.1|"	// 이니텍,   개인, 제휴기관용
						+"1.2.410.200004.5.5.1.4.2|"	// 이니텍,   개인, 전자세금용
                        */
                        ,

    //real ca
    yessignCaHost : "203.233.91.71",
    yessignCaPort : 4512,
    crosscertCaHost : "211.192.169.90",
    crosscertCaPort : 4512,
    signkoreaCaHost : "210.207.195.100",
    signkoreaCaPort : 4099,
    kicaCaHost : "211.35.96.43",
    kicaCaPort : 4502,


    //test ca
    yessignCaHost_test : "203.233.91.231",    //금융결제원
    yessignCaPort_test : 4512,
    crosscertCaHost_test : "211.180.234.201", //전자인증
    crosscertCaPort_test : 4512,
    signkoreaCaHost_test : "211.175.81.101",  //코스콤
    signkoreaCaPort_test : 4099,
    kicaCaHost_test : "211.35.96.115",        //정보인증
    kicaCaPort_test : 4502,

    hsmUsingDrivers : "XecureHSM:1.0.0.0",//"XecureHSM:1.0.0.0|Vid_04e8&Pid_0007"
    forceScreenKeyboard: false,

    passwordError: false,
    passwordCounter : "5",
    closeOnError: false,
    enableCheckVid : false,
    installError: false,

    stringsDelimiter : ":",
    multiSignDelimiter : "|",
    nonceUrl : _Delfino_Svc + "/delfino_nonce.jsp",
    nonce : null ,
    nonceKeyName : "delfinoNonce",

    mobileUrlHandlerType : true,
    mobileCloseHtml : _Delfino_Base + "/mobile_close.html", //frame환경에서 ios용 close.html
    processingImageUrl : _Delfino_Base + "/sitelogo/delfino_processing.gif",
    mobileUrlHandlerServerUrl : _Delfino_Svc + "/secureDataHandler.jsp",
    mobileProviderName : "wizvera", //"kbstar"

    //urlHanlderServerUrl : _Delfino_Svc + "/delfino_handler.jsp",
    handlerBlankUrl : _Delfino_Base + "/handler_blank.html", //iframe용 src페이지(IE 6전용)

    sitename : "WIZVERA(위즈베라)",
    useRecentModule : false, //최근 setModule로 설정한 module사용

    //서명시 서명데이터에 certCertType을 추가
    //addCertStoreType : true,

end : "end"};

DelfinoConfig.version_g2 = DelfinoConfig.version;
DelfinoConfig.installPkg_g2 = DelfinoConfig.installPkg;

//G4설정
DelfinoConfig.g4 = {};
DelfinoConfig.g4.signServerUrl = "https://sign.wizvera.com/delfino4html/web";
//DelfinoConfig.g4.signServerUrl = window.location.protocol + "//" + window.location.host + "/wizvera/delfino4html";

/** 인증서 선택창에서 저장매체 enable/disable(BROWSER|FIND_CERT|LOCAL_DISK|TOKEN|HSM|PHONE|USIM|SWHSM)*/
DelfinoConfig.g4.certStoreFilter = DelfinoConfig.certStoreFilter; //"BROWSER|FIND_CERT|LOCAL_DISK";
DelfinoConfig.g4.prepareCertStore = DelfinoConfig.prepareCertStore; //"USIM|SWHSM";

DelfinoConfig.g4.certConverter = {
    Win   : _Delfino_Down + "/CertConverter.exe",
    Mac   : _Delfino_Down + "/CertConverter.dmg",
    Linux32   : _Delfino_Down + "/CertConverter_32.tgz",
    Linux64   : _Delfino_Down + "/CertConverter_64.tgz"
};
DelfinoConfig.outputEncoding = "hex"; //base64, hex

//휴대폰 가져오기/내보내기 설정
DelfinoConfig.transferInfo = {
    provider : "crosscert",
    host : "211.192.169.44",
    port : 443,
    csrKey : "1892D918",
    importInfoUrl : _Delfino_Base + "/sitelogo/delfino_import.png",
    exportInfoUrl : _Delfino_Base + "/sitelogo/delfino_export.png"
};

DelfinoConfig.langUrl = {
    koreanUrl : _Delfino_Base + "/lang/delfino_lang_korean.js?20150825",
    englishUrl :_Delfino_Base + "/lang/delfino_lang_english.js?20150825",
    chaneseUrl :_Delfino_Base + "/lang/delfino_lang_chinese.js?20150825",
    japaneseUrl :_Delfino_Base + "/lang/delfino_lang_japanese.js?20150825"
};
DelfinoConfig.langUrl_b64 = {
    koreanUrl : _Delfino_Base + "/lang/delfino_lang_korean_b64.js?20150825",
    englishUrl :_Delfino_Base + "/lang/delfino_lang_english_b64.js?20150825",
    chaneseUrl :_Delfino_Base + "/lang/delfino_lang_chinese_b64.js?20150825",
    japaneseUrl :_Delfino_Base + "/lang/delfino_lang_japanese_b64.js?20150825"
};
DelfinoConfig.lang = _Delfino_SystemLang;
DelfinoConfig.langUrl = DelfinoConfig.langUrl_b64;

var ubikeyConfig = {
    enable: "true",
    download: "http://" + window.location.host + "/commons/3rd-party/infovine/download.html",
    version: "1,3,0,7",
    download_x64: "http://" + window.location.host + "/commons/3rd-party/infovine/download.html",
    version_x64: "1,3,0,7",
    update: "LIFEPLANET|NULL",
    securekeyboard: "WIZVERA|AHNLABST"
};

var ubikeyConfigMac = {
    enable: "false",
    download: "http://test.ubikey.co.kr/infovine/mac/1002/download.html",
    version: "v.1,0,0,2",
    update: "KBSTAR_WIZVERA|NULL",
    securekeyboard: ""//WIZVERA|SOFTCAMP"
};

var ubikeyConfigLinux = {
    enable: "false",
    download: "http://demo.wizvera.com/down/infovine/download_linux.html",
    version: "1,0,0,2",
    update: "KBSTAR_WIZVERA|NULL",
    securekeyboard: ""//WIZVERA|SOFTCAMP"
};

var mobisignConfig = {
    enable:     "true",
    download:   "http://www.mobisign.kr/mobisigndll.htm",
    //download: "http://demo.wizvera.com/down/lumensoft/mobisign.html",
    version:    "5,0,4,4",
    sitecode:   "5030040",
    aclist:     "34;yessignCA;1.2.410.200005.1.1.1;yessignCA;1.2.410.200005.1.1.5;yessignCA;1.2.410.200005.1.1.4;yessignCA;1.2.410.200005.1.1.2;yessignCA;1.2.410.200005.1.1.6.1;yessignCA Class 1;1.2.410.200005.1.1.1;yessignCA Class 1;1.2.410.200005.1.1.5;yessignCA Class 1;1.2.410.200005.1.1.4;yessignCA Class 1;1.2.410.200005.1.1.2;yessignCA Class 1;1.2.410.200005.1.1.6.1;signGATE CA;1.2.410.200004.5.2.1.2;signGATE CA;1.2.410.200004.5.2.1.1;signGATE CA;1.2.410.200004.5.2.1.7.1;signGATE CA4;1.2.410.200004.5.2.1.2;signGATE CA4;1.2.410.200004.5.2.1.1;signGATE CA4;1.2.410.200004.5.2.1.7.1;SignKorea CA;1.2.410.200004.5.1.1.5;SignKorea CA;1.2.410.200004.5.1.1.7;SignKorea CA2;1.2.410.200004.5.1.1.5;SignKorea CA2;1.2.410.200004.5.1.1.7;NCASign CA;1.2.410.200004.5.3.1.2;NCASign CA;1.2.410.200004.5.3.1.9;CrossCert Certificate Authority;1.2.410.200004.5.4.1.1;CrossCert Certificate Authority;1.2.410.200004.5.4.1.2;CrossCert Certificate Authority;1.2.410.200004.5.4.1.101;CrossCertCA2;1.2.410.200004.5.4.1.1;CrossCertCA2;1.2.410.200004.5.4.1.2;CrossCertCA2;1.2.410.200004.5.4.1.101;TradeSignCA;1.2.410.200012.1.1.1;TradeSignCA;1.2.410.200012.1.1.3;TradeSignCA;1.2.410.200012.1.1.101;TradeSignCA2;1.2.410.200012.1.1.1;TradeSignCA2;1.2.410.200012.1.1.3;TradeSignCA2;1.2.410.200012.1.1.101;",
    aclist_test:"42;yessignCA-TEST;1.2.410.200005.1.1.1;yessignCA-TEST;1.2.410.200005.1.1.2;yessignCA-TEST;1.2.410.200005.1.1.4;yessignCA-TEST;1.2.410.200005.1.1.6.1;SignGateFTCA CA;1.2.410.200004.2.201;SignGateFTCA CA;1.2.410.200004.5.2.1.7.1;signGATE FTCA02;1.2.410.200004.2.201;signGATE FTCA02;1.2.410.200004.5.2.1.7.1;signGATE FTCA02;1.2.410.200004.2.202;SignKorea Test CA;1.2.410.200004.5.1.1.7;SignKorea Test CA;1.2.410.200004.5.1.1.5;NCATESTSign;1.2.410.200004.5.3.1.2;NCATESTSign;1.2.410.200004.5.3.1.9;CrossCertCA-Test2;1.2.410.200004.5.4.1.1;CrossCertCA-Test2;1.2.410.200004.5.4.1.2;CrossCertCA-Test2;1.2.410.200004.5.4.1.101;TestTradeSignCA;1.2.410.200012.1.1.3;TestTradeSignCA;1.2.410.200012.1.1.1;TestTradeSignCA;1.2.410.200012.1.1.101;yessignCA-Test Class 0;1.2.410.200005.1.1.1;yessignCA-Test Class 0;1.2.410.200005.1.1.2;yessignCA-Test Class 0;1.2.410.200005.1.1.4;yessignCA-Test Class 0;1.2.410.200005.1.1.5;yessignCA-Test Class 0;1.2.410.200005.1.1.6.1;yessignCA-Test Class 0;1.2.410.200005.1.1.6.8;yessignCA-Test Class 1;1.2.410.200005.1.1.1;yessignCA-Test Class 1;1.2.410.200005.1.1.2;yessignCA-Test Class 1;1.2.410.200005.1.1.4;yessignCA-Test Class 1;1.2.410.200005.1.1.5;yessignCA-Test Class 1;1.2.410.200005.1.1.6.1;yessignCA-Test Class 1;1.2.410.200005.1.1.6.8;signGATE FTCA04;1.2.410.200004.2.201;signGATE FTCA04;1.2.410.200004.5.2.1.7.1;signGATE FTCA04;1.2.410.200004.2.202;SignKorea Test CA2;1.2.410.200004.5.1.1.7;SignKorea Test CA2;1.2.410.200004.5.1.1.5;CrossCertTestCA2;1.2.410.200004.5.4.1.1;CrossCertTestCA2;1.2.410.200004.5.4.1.2;CrossCertTestCA2;1.2.410.200004.5.4.1.101;TradeSignCA2009Test2;1.2.410.200012.1.1.3;TradeSignCA2009Test2;1.2.410.200012.1.1.1;TradeSignCA2009Test2;1.2.410.200012.1.1.101;"
};

//Ax-Plugin : npkcx, scsk, touchenkey
//Non-Plugin: nosk, npkfx, astx
var secureKeyboardConfig = {
    enable:     "true",
    product:    "astx"
};

//Windows 10 일경우 물리키보드 사용안함
//if (navigator.userAgent.indexOf("Windows NT 10") > 0) secureKeyboardConfig.enable = "false";

//스마트인증
DelfinoConfig.usim = {
    //usingDrivers : "USIM_0001|USIM_0002",
    //usingDrivers : "",
	usingDrivers : "USIM_0001",
    certSelector : "mobile",
    displayDataAtMobile : false,
    siteDomain : "www.wizvera.com",
    disableInHSM : false,
    raon : { download: "http://www.usimcert.com/popup/pop_install.php", siteCode : "608050101", displayDataAtMobile : false },
    dream : { download: "http://ids.smartcert.kr", host : "center.smartcert.kr", port : "443", displayDataAtMobile : true }
};

//소프트토큰
DelfinoConfig.safehard = {
    version:    "1,0,1,5",
    download:   "http://download.safehard.co.kr/install/install.html",
    downloadNormal: "http://download.safehard.co.kr/install/install_normal.html",
    cloudUrl:   "http://cloud.safehard.co.kr/safeHardRelayServer/safeHardReq.do",
    secureKeyboardConfig : secureKeyboardConfig
};

//개발모드  설정
if (_Delfino_SystemMode == "test") {
    DelfinoConfig.issuerCertFilter = DelfinoConfig.issuerCertFilter_test;
    DelfinoConfig.yessignCaHost = DelfinoConfig.yessignCaHost_test;
    DelfinoConfig.yessignCaPort = DelfinoConfig.yessignCaPort_test;
    DelfinoConfig.crosscertCaPort = DelfinoConfig.crosscertCaPort_test;
    DelfinoConfig.crosscertCaHost = DelfinoConfig.crosscertCaHost_test;
    DelfinoConfig.signkoreaCaHost = DelfinoConfig.signkoreaCaHost_test;
    DelfinoConfig.signkoreaCaPort = DelfinoConfig.signkoreaCaPort_test;
    DelfinoConfig.kicaCaHost = DelfinoConfig.kicaCaHost_test;
    DelfinoConfig.kicaCaPort = DelfinoConfig.kicaCaPort_test;
    mobisignConfig.aclist = mobisignConfig.aclist_test;
}
//alert(_Delfino_SystemMode + "\n" + DelfinoConfig.issuerCertFilter);


//모바일 구분(iOS, Android)
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {

}
else if(navigator.userAgent.match(/Android/i)){
    DelfinoConfig.installMessage.Mobile = "전용 브라우저를 사용하여야만 이용이 가능한 서비스입니다.\n[확인]을 선택하시면 전용 브라우저가 실행(설치)됩니다.";
}

//다국어 적용
if (_Delfino_SystemLang == "ENG") {
    DelfinoConfig.installMessage.NO = "Certification in an environment that does not support transactions have access.";
    DelfinoConfig.installMessage.PC = "This service is available only after installation of the security program. Selecting \n[Confirm] will connect you to the installation page.";
    DelfinoConfig.installMessage.Mobile = "This service is available only when using a dedicated browser. Selecting \n[Approve] will open (install) the browser.";
    if(navigator.userAgent.match(/Android/i))
        DelfinoConfig.installMessage.Mobile = "This service is available only when using a dedicated browser. Selecting \n[Confirm] will open (install) the browser.";
} else if (_Delfino_SystemLang == "CHN") {
    DelfinoConfig.installMessage.NO = "Certification in an environment that does not support transactions have access.";
    DelfinoConfig.installMessage.PC = "安装安全程序后方可使用的服务。\n点击[确认]，则将进入安装页面。";
    DelfinoConfig.installMessage.Mobile = "使用专用浏览器方可使用的服务。\n点击[批准]，则将运行（安装）专用浏览器。";
    if(navigator.userAgent.match(/Android/i))
        DelfinoConfig.installMessage.Mobile = "使用专用浏览器方可使用的服务。\n点击[确认]，则将运行（安装）专用浏览器。";
} else if (_Delfino_SystemLang == "JPN") {
    DelfinoConfig.installMessage.NO = "Certification in an environment that does not support transactions have access.";
    DelfinoConfig.installMessage.PC = "セキュリティプログラムをインストールしなければ、ご利用できないサービスです。\n[確認]を選択すると、インストールページにアクセスされます。";
    DelfinoConfig.installMessage.Mobile = "専用ブラウザをご利用しなければ、ご利用できないサービスです。\n[承認]を選択すると、専用ブラウザが実行(インストール)されます。";
    if(navigator.userAgent.match(/Android/i))
        DelfinoConfig.installMessage.Mobile = "専用ブラウザをご利用しなければ、ご利用できないサービスです。\n[確認]を選択すると、専用ブラウザが実行(インストール)されます。";
}

//도메인별로 저장매체 캐쉬 설정
if (document.location.hostname.indexOf("wizvera.com") >= 0) {
    //DelfinoConfig.cacheCertStore = "true";
} else if (document.location.hostname.indexOf("obiz.kbstar.com") >= 0) {
    DelfinoConfig.cacheCertStore = "true";
} else {
    DelfinoConfig.cacheCertStore = "false";
}

//senior 설정
//if (document.location.hostname.indexOf("wizvera.com") >= 0) DelfinoConfig.uiType = "senior";


/*
 *  WizIN-Delfino 동작방식 설정
 * - G2: plug-in, G3: handler, G4: html5
 * - 접속브라우저 확인 후 최종값이 문자열로 설정됨
 * - 외부에서 _SITE_ModuleType(_Delfino_ModuleType)값이 설정되어 있을 경우 업무 설정값을 우선으로 사용됨
*/
if (_Delfino_ModuleType != "") {
    DelfinoConfig.module = _Delfino_ModuleType;
} else {
    DelfinoConfig.module = {};
    DelfinoConfig.module.all = "G3";

    DelfinoConfig.module.win32 = {};
    //DelfinoConfig.module.win32.all = "G3";
    //DelfinoConfig.module.win32.edge = "G3";
    //DelfinoConfig.module.win32.chrome = "G3";
    //DelfinoConfig.module.win32.firefox = "G3";
    //DelfinoConfig.module.win32.opera = "G3";
    //DelfinoConfig.module.win32.safari = "G3";
    //DelfinoConfig.module.win32.msie = "G2";
    //DelfinoConfig.module.win32.msie06 = "G2";
    //DelfinoConfig.module.win32.msie07 = "G2";
    //DelfinoConfig.module.win32.msie08 = "G2";
    //DelfinoConfig.module.win32.msie09 = "G2";
    //DelfinoConfig.module.win32.msie10 = "G2";
    //DelfinoConfig.module.win32.msie11 = "G2";

    DelfinoConfig.module.win64 = {};
    //DelfinoConfig.module.win64.all = "G3";
    //DelfinoConfig.module.win64.edge = "G3";
    //DelfinoConfig.module.win64.chrome = "G3";

    DelfinoConfig.module.mac = {};
    //DelfinoConfig.module.mac.all = "G4";
    //DelfinoConfig.module.mac.chrome = "G4";
    //DelfinoConfig.module.mac.firefox = "G4";
    //DelfinoConfig.module.mac.opera = "G4";
    //DelfinoConfig.module.mac.safari = "G4";

    DelfinoConfig.module.linux = {};
    //DelfinoConfig.module.linux.all = "G4";
    //DelfinoConfig.module.linux.chrome = "G4";
    //DelfinoConfig.module.linux.firefox = "G4";
    //DelfinoConfig.module.linux.opera = "G4";

    DelfinoConfig.module.mobile = {};
    //DelfinoConfig.module.mobile.all = "G4";
}

/* //WIZVERA_TEST_START
if (typeof DelfinoConfig.module != "string") {
    if (document.location.hostname.indexOf("demo.wizvera.com") >= 0)  DelfinoConfig.module.all = "G2";
    if (document.location.hostname.indexOf("help.wizvera.com") >= 0)  DelfinoConfig.module.all = "G2";
    if (document.location.hostname.indexOf("ts2.wizvera.com") >= 0)   DelfinoConfig.module.all = "G2";
    if (document.location.hostname.indexOf("test2.wizvera.com") >= 0) DelfinoConfig.module.all = "G2";
    if (document.location.hostname.indexOf("demo2.wizvera.com") >= 0) DelfinoConfig.module.all = "G3";
    if (document.location.hostname.indexOf("help2.wizvera.com") >= 0) DelfinoConfig.module.all = "G3";
    if (document.location.hostname.indexOf("ts.wizvera.com") >= 0)    DelfinoConfig.module.all = "G3";
    if (document.location.hostname.indexOf("test.wizvera.com") >= 0)  DelfinoConfig.module.all = "G3";
    if (document.location.hostname.indexOf("wizvera.com") >= 0) DelfinoConfig.module.mobile.all = "G4";
    if (DelfinoConfig.module == "G2") {
        DelfinoConfig.forceScreenKeyboard = false;
        secureKeyboardConfig.enable = "true";
        secureKeyboardConfig.product = "scsk";
    }
}
//WIZVERA_TEST_END */


