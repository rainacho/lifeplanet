if (typeof jQuery === "undefined") alert("jQuery is not available!!!");

if (typeof Delfino === "undefined") {

var Delfino = {
    completes : {},
    completeHandle : 0,

    inited: false,

    addComplete:function(complete)
    {
        var handle = this.completeHandle++;
        this.completes[handle] = complete ;
        return handle;
    },
    getComplete:function(handle)
    {
        var complete = this.completes[handle];
        return complete;
    },

    isInstall:function (goInstall,completeCallback) {
        var ret = this.init(goInstall);
        if(completeCallback != undefined)
            completeCallback(ret);
    },

    /**
     * WizIn Delfino 초기화하기 위한 함수이다.
     */
    init:function(installCheck)
    {
        if(this.inited) return true;

        if(DCrypto == null) {
            if(DCrypto == null) {
                if (typeof installCheck != "undefined" && installCheck == false) return false;
                if (DelfinoConfig.installMessage.NO != "") {
                    alert(DelfinoConfig.installMessage.NO);
                }
                return false;
            }
        }
        if(DCrypto.init(installCheck)==false) return false;


        var config="";
        config += "IssuerCertFilter=";
        config += encodeURIComponent(DelfinoConfig.issuerCertFilter);
        config += "&PolicyOidCertFilter=";
        config += encodeURIComponent(DelfinoConfig.policyOidCertFilter);

        if(DelfinoConfig.hsmUsingDrivers!=null){
            config += "&hsm.usingDrivers=";
            config += encodeURIComponent(DelfinoConfig.hsmUsingDrivers);
        }

        if(DelfinoConfig.slmNPKIAuthLogging!=null){
            config += "&slmLoggingFunctionName=";
            config += encodeURIComponent(DelfinoConfig.slmNPKIAuthLogging);
        }
        if(DelfinoConfig.forceScreenKeyboard!=null){
            config += "&forceScreenKeyboard=";
            config += encodeURIComponent(DelfinoConfig.forceScreenKeyboard);
        }

        DCrypto.setConfig(config);
        this.inited = true;

        try{
            var properties = {};

            properties["cacheCertStore"] =DelfinoConfig.cacheCertStore;
            properties["certStoreFilter"] = DelfinoConfig.certStoreFilter;
            if( DelfinoConfig.prepareCertStore!=null ) properties["prepareCertStore"] = DelfinoConfig.prepareCertStore; //v1.2.3.0 over

            //alert(ubikeyConfig.enable+"\n"+ubikeyConfig.download+"\n"+ubikeyConfig.version);
            if(navigator.userAgent.match(/Mac OS X/i)) {
                properties["ubikey.enable"] =    ubikeyConfigMac.enable;
                properties["ubikey.download"] =  ubikeyConfigMac.download;
                properties["ubikey.version"] =   ubikeyConfigMac.version;
                properties["ubikey.update"] =    ubikeyConfigMac.update;
                properties["ubikey.securekeyboard"] =    ubikeyConfigMac.securekeyboard;
            }
            else if(navigator.userAgent.match(/Linux/i)) {
                properties["ubikey.enable"] =    ubikeyConfigLinux.enable;
                properties["ubikey.download"] =  ubikeyConfigLinux.download;
                properties["ubikey.version"] =   ubikeyConfigLinux.version;
                properties["ubikey.update"] =    ubikeyConfigLinux.update;
                properties["ubikey.securekeyboard"] =    ubikeyConfigLinux.securekeyboard;
            }
            else {
                properties["ubikey.enable"] =    ubikeyConfig.enable;
                if(navigator.platform == "Win64") {
                    properties["ubikey.download"] =  ubikeyConfig.download_x64;
                    properties["ubikey.version"] =   ubikeyConfig.version_x64;
                }
                else {
                    properties["ubikey.download"] =  ubikeyConfig.download;
                    properties["ubikey.version"] =   ubikeyConfig.version;
                }
                properties["ubikey.update"] =    ubikeyConfig.update;
                properties["ubikey.securekeyboard"] =    ubikeyConfig.securekeyboard;
            }

            //alert(mobisignConfig.enable+"\n"+mobisignConfig.download+"\n"+mobisignConfig.version);
            properties["mobisign.enable"] =  mobisignConfig.enable;
            properties["mobisign.download"] =mobisignConfig.download;
            properties["mobisign.version"] = mobisignConfig.version;
            properties["mobisign.sitecode"] = mobisignConfig.sitecode;
            properties["mobisign.aclist"] = mobisignConfig.aclist;

            if( DelfinoConfig.usim!=null ) {
                properties["usim.usingDrivers"] = DelfinoConfig.usim.usingDrivers;
                properties["usim.certSelector"] = DelfinoConfig.usim.certSelector;
                properties["usim.displayDataAtMobile"] = DelfinoConfig.usim.displayDataAtMobile;
                properties["usim.siteDomain"] = DelfinoConfig.usim.siteDomain;
                properties["usim.raon.siteCode"] = DelfinoConfig.usim.raon.siteCode;
                properties["usim.raon.displayDataAtMobile"] = DelfinoConfig.usim.raon.displayDataAtMobile;
                properties["usim.raon.download"] = DelfinoConfig.usim.raon.download;
                properties["usim.dream.download"] = DelfinoConfig.usim.dream.download;
                properties["usim.dream.displayDataAtMobile"] = DelfinoConfig.usim.dream.displayDataAtMobile;
                properties["usim.dream.host"] = DelfinoConfig.usim.dream.host;
                properties["usim.dream.port"] = DelfinoConfig.usim.dream.port;
                properties["usim.disableInHSM"] = DelfinoConfig.usim.disableInHSM;
            }

            if( DelfinoConfig.safehard!=null ) {
                properties["safehard.version"] = DelfinoConfig.safehard.version;
                properties["safehard.download"] = DelfinoConfig.safehard.download;
                properties["safehard.downloadNormal"] = DelfinoConfig.safehard.downloadNormal;
                properties["safehard.cloudUrl"] = DelfinoConfig.safehard.cloudUrl;
                properties["safehard.secureKeyboardConfig"] = JSON.stringify(DelfinoConfig.safehard.secureKeyboardConfig);
            }

            properties["securekeyboard.enable"] =secureKeyboardConfig.enable;
            properties["securekeyboard.product"] =secureKeyboardConfig.product;
            properties["uiType"] =DelfinoConfig.uiType;
            properties["enableCheckVid"] ="" + DelfinoConfig.enableCheckVid;
            properties["passwordCounter"] = DelfinoConfig.passwordCounter;
            properties["installError"] = DelfinoConfig.installError;

            if(DelfinoConfig.sitename!=null) properties["sitename"] = DelfinoConfig.sitename;

            this.setProperties(properties);

        }catch(e){ alert("Delfino.init()\n" + e); }

        if(DelfinoConfig.lang != null){
            this.setLang(DelfinoConfig.lang);
        }
        //else{
        //  this.setLang(_Delfino_SystemLang);
        //}


        return true;
    },
    setProperties:function(properties) {
        for(var key in properties) {
            if(typeof properties[key] !== "function"){
                DCrypto.setProperty(key, properties[key]);
            }
        }
    },

    /**
     * 공인인증서 로그인을 위한 전자서명데이터를 생성하여 서버로 전송한다.
     * @param {HTMLFormElement} form 서명할 내용을 가지고 있는 HTMLFormElement
     * @param {function} successCB  전자서명 성공시 전자서명 데이터를 직접받아서 처리할 때 사용하는 콜백 함수이다.
     *                              함수 형식은 successCB(pkcs7, vid_random)이다.
     *                              이 인자를 설정했을 경우에는 서명데이터를 서버로 전송하지 않는다.
     */

    generatePKCS7SignedDataSuccessCallback:null,
    generatePKCS7SignedDataErrorCallback:null,

    loginForm:function(form, successCB, errorCB)
    {
        this.inited = false; //로그인시 무조건 초기화 처리

        if(this.init() == false) return;

        this.generatePKCS7SignedDataSuccessCallback = successCB;
        this.generatePKCS7SignedDataErrorCallback = errorCB;
        if(this.generatePKCS7SignedDataSuccessCallback==null){
            if(jQuery("#Delfino_PKCS7_form").length==0){
                jQuery('body').append('<form id="Delfino_PKCS7_form"><input type="hidden" name="PKCS7"><input type="hidden" name="VID_RANDOM"></form>');
            }
            var pkcs7Form = jQuery("#Delfino_PKCS7_form")[0];

            pkcs7Form.method = form.method;
            pkcs7Form.action = form.action;
            pkcs7Form.target = form.target;
        }

        var data = jQuery(form).serialize();

        //alert(data);

        DCrypto.resetCertificate();

        this.loadLogoImage(DelfinoConfig.logoImageUrl);
        
        if(this.getModule() == "G2"){
            DCrypto.generatePKCS7SignedData(data, "Delfino_generatePKCS7SignedData_success_callback", "Delfino_error_callback", options);
            return;
        }
        
        //G3, G4
        var options = {};
        options.signedAttribute = "certStoreType";
        options.attributeAsData = true;
        options.resetCertificate = true;
        options.cacheCert = true;
            
        this.sign(data, function(result){
                if(result.status == 1){
                    Delfino_generatePKCS7SignedData_success_callback(result.signData, result.vidRandom);
                }
                else{
                    Delfino_error_callback(result.status, result.message);
                }
            }, options );
    },

    /**
     * PKCS#7 전자서명데이터를 생성하여 서버로 전송한다.
     * @param {HTMLFormElement} form 서명할 내용을 가지고 있는 HTMLFormElement
     * @param {function} successCB  전자서명 성공시 전자서명 데이터를 직접받아서 처리할 때 사용하는 콜백 함수이다.
     *                              함수 형식은 successCB(pkcs7, vid_random)이다.
     *                              이 인자를 설정했을 경우에는 서명데이터를 서버로 전송하지 않는다.
     *
     */

    signForm : function(form, successCB, errorCB)
    {
        if(this.init() == false) return;

        try{
            this.generatePKCS7SignedDataSuccessCallback = successCB;
            this.generatePKCS7SignedDataErrorCallback = errorCB;
            if(this.generatePKCS7SignedDataSuccessCallback==null){
                if(jQuery("#Delfino_PKCS7_form").length==0){
                    //alert("delfino_form not found");
                    jQuery('body').append('<form id="Delfino_PKCS7_form"><input type="hidden" name="PKCS7"><input type="hidden" name="VID_RANDOM"></form>');
                }
                var pkcs7Form = jQuery("#Delfino_PKCS7_form")[0];

                pkcs7Form.method = form.method;
                pkcs7Form.action = form.action;
                pkcs7Form.target = form.target;
            }

            var data = jQuery(form).serialize();
            var rselectTextarea = /^(?:select|textarea)/i;
            var rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;

            var formats = jQuery(form).map(function(){
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function(){
                return this.name && !this.disabled &&
                (this.checked || rselectTextarea.test(this.nodeName) ||
                rinput.test(this.type));
            }).map(function(i, elem){
                var val = jQuery(this).attr('format');

                return val == null ? null : {
                    name: elem.name,
                    value: val
                };
            }).get();

            var formatsParam = jQuery.param(formats);
            
            this.loadLogoImage(DelfinoConfig.logoImageUrl);            
            
            if(this.getModule() == "G2"){
                if(formatsParam.length>0){
                    data = data + "&" + "__USER_CONFIRM_FORMAT=" + encodeURIComponent(formatsParam) ;
                }
                DCrypto.generatePKCS7SignedData(data, "Delfino_generatePKCS7SignedData_success_callback", "Delfino_error_callback");
                return;
            }
            
            //G3, G4
            var options = {};
            options.signedAttribute = "certStoreType";
            options.attributeAsData = true;
            if(formatsParam.length>0){
                options.format = formatsParam;
            }
            options.dataType = "form-urlencoded";
            
            this.sign(data, function(result){
                    if(result.status == 1){
                        Delfino_generatePKCS7SignedData_success_callback(result.signData, result.vidRandom);
                    }
                    else{
                        Delfino_error_callback(result.status, result.message);
                    }
                }, options);
        }catch(e){
            alert("signForm:"+e);
        }
    },

    signKeyValue:function(keys, values, formats, delimeter, successCB, errorCB)
    {
        if(this.init() == false) return;

        if(successCB==null){
            alert("successCB can NOT be null");
            return;
        }
        if( keys == null ){
            alert("keys can NOT be null");
            return;
        }
        if( delimeter == null ){
            alert("delimeter can NOT be null");
            return;
        }

        var keyArray = keys.split(delimeter);
        var valueArray = values.split(delimeter);

        var formatArray = null;
        if(formats!=null && formats.length>0){
            formatArray = formats.split(delimeter);
        }

        if(keyArray.length != valueArray.length || (formatArray!=null && valueArray.length!= formatArray.length)){
            alert("signKeyValue invalid argument");
            return;
        }

        var data = "";
        var format = "";
        for(var i=0; i<keyArray.length; i++){
            if(data.length>0){
                data += "&";
            }
            data += encodeURIComponent(keyArray[i]);
            data += "=";
            data += encodeURIComponent(valueArray[i]);

            if(format.length>0){
                format += "&";
            }
            if (formatArray!=null) {

                format += encodeURIComponent(keyArray[i]);
                format += "=";
                format += encodeURIComponent(formatArray[i]);
            }
        }
        
        this.generatePKCS7SignedDataSuccessCallback = successCB;
        this.generatePKCS7SignedDataErrorCallback = errorCB;

        this.loadLogoImage(DelfinoConfig.logoImageUrl);		
        if(this.getModule() == "G2"){
            if(format.length>0){
                data = data + "&" + "__USER_CONFIRM_FORMAT=" + encodeURIComponent(format) ;
            }
            DCrypto.generatePKCS7SignedData(data, "Delfino_generatePKCS7SignedData_success_callback", "Delfino_error_callback");
            return;
        }
        
        //G3, G4
        var options = {};
        options.signedAttribute = "certStoreType";
        options.attributeAsData = true;
        if(format.length>0){
            options.format = format;
            options.signedAttribute += ",format";
        }
        options.dataType = "form-urlencoded";
        
        this.sign(data, function(result){
                if(result.status == 1){
                    Delfino_generatePKCS7SignedData_success_callback(result.signData, result.vidRandom);
                }
                else{
                    Delfino_error_callback(result.status, result.message);
                }
            }, options);
    },

    multiSignString : function(datas, delimeter, successCB, errorCB)
    {
        if(this.init() == false) return;
        
        this.generatePKCS7SignedDataSuccessCallback = successCB;
        this.generatePKCS7SignedDataErrorCallback = errorCB;

        this.loadLogoImage(DelfinoConfig.logoImageUrl);
        
        if(this.getModule() == "G2"){
            DCrypto.generateMultiPKCS7SignedData(datas, delimeter, "Delfino_generatePKCS7SignedData_success_callback", "Delfino_error_callback");
            return;
        }
        
        //G3, G4
        var options = {};
        options.multiSign = true;
        options.multiSignDelimiter = delimeter;
        options.signedAttribute = "signingTime";
        
        this.sign(data, function(result){
                if(result.status == 1){
                    Delfino_generatePKCS7SignedData_success_callback(result.signData, result.vidRandom);
                }
                else{
                    Delfino_error_callback(result.status, result.message);
                }
            }, options);		
        
    },


    /**
     * document.write를 이용해서 object 태그로 WizIn Delfino Plugin을 생성한다.
     */
    createObject:function()
    {
        document.write(DCrypto.getObjectTag());
    },

    /**
     * WizIn Delfino Plugin을 생성하기 위한 object tag 스트링을 리턴한다.
     * @return {String} object tag 스트링
     */
    getObjectTag:function()
    {
        return DCrypto.getObjectTag();
    },

    /**
     * 공인인증서 관리창을 띄운다.
     */
    manageCertificate:function(complete, options)
    {
        if(this.init() == false) return;
        if (typeof complete == "undefined") {
            DCrypto.manageCertificate();
        } else {
            options = options || {};
            var handle = this.addComplete(complete);
            DCrypto.manageCertificate(handle, JSON.stringify(options));
        }
    },

    loadLogoImage:function(url)
    {
        var logoImage = null;

        if(DCrypto.getVersion != null && typeof DelfinoConfig.logoImageUrl_428x81 != "undefined"){
            var version = DCrypto.getVersion();
            if(version!=null && version!=""){
                if(DC_compareVersion(version, "1.2.2.0") >= 0) {
                    var newImageUrl = DelfinoConfig.logoImageUrl_428x81;
                    logoImage = DC_get(newImageUrl);
                }
            }
        }
        if(logoImage==null){
            logoImage = DC_get(url);
        }
        if(logoImage!=null){
            DCrypto.setProperty("delfino.logoimage", logoImage);
        }
    },

    requestCertificate_complete_callback:null,
    requestCertificate:function(ca, referenceValue, secretValue, complete)
    {
        if(this.init() == false) return;

        //this.loadLogoImage(DelfinoConfig.logoImageUrl);

        this.requestCertificate_complete_callback = complete;
        var host;
        var port;
        if(ca == "yessign"){
            host = DelfinoConfig.yessignCaHost;
            port = DelfinoConfig.yessignCaPort;
        }
        else if(ca == "crosscert"){
            host = DelfinoConfig.crosscertCaHost;
            port = DelfinoConfig.crosscertCaPort;
        }
        else if(ca == "signkorea"){
            host = DelfinoConfig.signkoreaCaHost;
            port = DelfinoConfig.signkoreaCaPort;
        }
        else{
            alert("not supported ca:" + ca);
            return;
        }
        if(this.getModule() == "G2"){
            DCrypto.requestCertificate(ca, host, port, referenceValue, secretValue, "Delfino_requestCertificate_complete_callback");
            return;
        }
                
        var handle = this.addComplete(function(result){
            complete(result.status, result.message);            
        });
        var options = {};
        DCrypto.requestCertificate2(handle, ca, host, port, referenceValue, secretValue, JSON.stringify(options));
    },
    updateCertificate_complete_callback:null,
    updateCertificate:function(ca, complete)
    {
        if(this.init() == false) return;

        this.updateCertificate_complete_callback = complete;
        var host;
        var port;
        if(ca == "yessign"){
            host = DelfinoConfig.yessignCaHost;
            port = DelfinoConfig.yessignCaPort;
        }
        else if(ca == "crosscert"){
            host = DelfinoConfig.crosscertCaHost;
            port = DelfinoConfig.crosscertCaPort;
        }
        else if(ca == "signkorea"){
            host = DelfinoConfig.signkoreaCaHost;
            port = DelfinoConfig.signkoreaCaPort;
        }
        else{
            alert("not supported ca:" + ca);
            return;
        }
        if(this.getModule() == "G2"){
            DCrypto.updateCertificate(ca, host, port, "Delfino_updateCertificate_complete_callback");
            return;
        }
                
        var handle = this.addComplete(function(result){
            complete(result.status, result.message);
        });
        var options = {};
        
        DCrypto.updateCertificate2(handle, ca, host, port, JSON.stringify(options));
    },

    requestCertificate2:function(ca, referenceValue, secretValue, complete, options)
    {
        if(this.init() == false) return;

        var host;
        var port;
        if(ca == "yessign"){
            host = DelfinoConfig.yessignCaHost;
            port = DelfinoConfig.yessignCaPort;
        }
        else if(ca == "crosscert"){
            host = DelfinoConfig.crosscertCaHost;
            port = DelfinoConfig.crosscertCaPort;
        }
        else if(ca == "signkorea"){
            host = DelfinoConfig.signkoreaCaHost;
            port = DelfinoConfig.signkoreaCaPort;
        }
        else if(ca == "kica"){
            host = DelfinoConfig.kicaCaHost;
            port = DelfinoConfig.kicaCaPort;
        }
        else{
            alert("not supported ca:" + ca);
            return;
        }

        if(options == null) options = {};
        if(options.enableKmCert==null && DelfinoConfig.enableKmCert!=null) options.enableKmCert = DelfinoConfig.enableKmCert;

        var handle = this.addComplete(complete);
        DCrypto.requestCertificate2(handle, ca, host, port, referenceValue, secretValue, JSON.stringify(options));
    },

    updateCertificate2:function(ca, complete, options)
    {
        if(this.init() == false) return;

        this.loadLogoImage(DelfinoConfig.logoImageUrl);

        var host;
        var port;
        if(ca == "yessign"){
            host = DelfinoConfig.yessignCaHost;
            port = DelfinoConfig.yessignCaPort;
        }
        else if(ca == "crosscert"){
            host = DelfinoConfig.crosscertCaHost;
            port = DelfinoConfig.crosscertCaPort;
        }
        else if(ca == "signkorea"){
            host = DelfinoConfig.signkoreaCaHost;
            port = DelfinoConfig.signkoreaCaPort;
        }
        else if(ca == "kica"){
            host = DelfinoConfig.kicaCaHost;
            port = DelfinoConfig.kicaCaPort;
        }
        else{
            alert("not supported ca:" + ca);
            return;
        }

        if(options == null) options = {};
        if(options.enableKmCert==null && DelfinoConfig.enableKmCert!=null) options.enableKmCert = DelfinoConfig.enableKmCert;

        var handle = this.addComplete(complete);
        DCrypto.updateCertificate2(handle, ca, host, port, JSON.stringify(options));
    },

    setIssuerCertFilter:function(issuers)
    {
        try {
            DelfinoConfig.issuerCertFilter = issuers;
        } catch(e){ }

        if(this.init() == false) return;

        DCrypto.setProperty("IssuerCertFilter", issuers);
    },
    setPolicyOidCertFilter:function(policyOids)
    {
        try {
            DelfinoConfig.policyOidCertFilter = policyOids;
        } catch(e){ }

        if(this.init() == false) return;

        DCrypto.setProperty("PolicyOidCertFilter", policyOids);
    },
    resetCertificate : function()
    {
        if(this.init() == false) return;

        DCrypto.resetCertificate();
    },
    signData : function(data, successCB, errorCB)
    {
        if(this.init() == false) return;

        this.generatePKCS7SignedDataSuccessCallback = successCB;
        this.generatePKCS7SignedDataErrorCallback = errorCB;
        data = "__DATA=" + encodeURIComponent(data);
        this.loadLogoImage(DelfinoConfig.logoImageUrl);
        if(this.getModule() == "G2"){
            DCrypto.generatePKCS7SignedData(data, "Delfino_generatePKCS7SignedData_success_callback", "Delfino_error_callback");
            return;
        }
        
        //G3, G4
        var options = {};
        options.signedAttribute = "certStoreType";
        options.attributeAsData = true;
        
        this.sign(data, function(result){
                if(result.status == 1){
                    Delfino_generatePKCS7SignedData_success_callback(result.signData, result.vidRandom);
                }
                else{
                    Delfino_error_callback(result.status, result.message);
                }
            }, options);
        
    },
    importCertificate:function(options, complete)
    {
        if(this.init() == false) return;

        if ( typeof options === "function" ){
            var tmp = complete;
            complete = options;
            options = tmp;
        }

        var handle = this.addComplete(complete);
        var param="";

        if(options!=null){
            param = JSON.stringify(options);
        }

        DCrypto.importCertificate(handle, param);
    },
    exportCertificate:function(complete, options)
    {
        if(this.init() == false) return;

        if ( typeof options === "function" ){
            var tmp = complete;
            complete = options;
            options = tmp;
        }

        var handle = this.addComplete(complete);
        var param="";

        if(options!=null){
            param = JSON.stringify(options);
        }
        DCrypto.exportCertificate(handle, param);
    },
    importCertificateFromPC:function(complete)
    {
        if(this.init() == false) return;

        var handle = this.addComplete(complete);
        var transferInfo = DelfinoConfig.transferInfo;
        transferInfo = JSON.stringify(transferInfo);

        DCrypto.importCertificateFromPC(handle, transferInfo);
    },
    exportCertificateToPC:function(complete)
    {
        if(this.init() == false) return;

        var handle = this.addComplete(complete);
        var transferInfo = DelfinoConfig.transferInfo;
        transferInfo = JSON.stringify(transferInfo);

        DCrypto.exportCertificateToPC(handle, transferInfo);
    },

    setLang:function(lang){
        DelfinoConfig.lang = lang;

        if(this.init() == false) return;

        var langUrl="";
        if(lang == "KOR" || lang == "korean"){
            langUrl = DelfinoConfig.langUrl.koreanUrl;
            lang = "korean";
        }
        else if(lang == "ENG" || lang == "english"){
            langUrl = DelfinoConfig.langUrl.englishUrl;
            lang = "english";
        }
        else if(lang == "CHN" || lang == "chinese"){
            langUrl = DelfinoConfig.langUrl.chaneseUrl;
            lang = "chinese";
        }
        else if(lang == "JPN" || lang == "japanese"){
            langUrl = DelfinoConfig.langUrl.japaneseUrl;
            lang = "japanese";
        }

        jQuery.ajax({
            url: langUrl,
            async: false,
               dataType: 'text',
               success: function(data){
                   DCrypto.setLang(lang, data);
               }
        });
    },
    signForUpdateCertificate:function(data, complete){
        if(this.init() == false) return;
        this.sign(data, complete, {
                    cacheCertFilter:false,
                    cacheCert:true,
                    certStoreFilter:"CertUpdatable"
                    });
    },
    getMACAddress:function(complete){
        if(this.init(false) == false) return "";
        var macAddr = "";
        try{
            macAddr = DCrypto.getProperty("MACAddress");
        }catch(e){ }

        if (typeof(complete) == "function") {
            complete(macAddr); //handler와 동일하게 콜백처리
        } else {
            return macAddr;
        }
    },
    sign:function(data, complete, options){
        
        if(this.init() == false) return;
        this.loadLogoImage(DelfinoConfig.logoImageUrl);

        if( typeof data === "object"){
            if( data.nodeName!=null && data.nodeName.toLowerCase() === "form" ){
                data = jQuery(data).serialize();
            }
            else{
                data = data.data || "";
            }
        }
        options = options || {};
        if(options.addNonce==null) options.addNonce = true;
        if(options.delimiter) options.delimeter = options.delimiter;
        if(options.delimeter) options.delimiter = options.delimeter;
        if(options.multiSignDelimiter) options.multiSignDelimeter = options.multiSignDelimiter;
        if(options.multiSignDelimeter) options.multiSignDelimiter = options.multiSignDelimeter;
        if(options.closeOnError == null && DelfinoConfig.closeOnError!=null ) options.closeOnError = DelfinoConfig.closeOnError;
        if(DelfinoConfig.module=="G3" && window.location.protocol.toLowerCase()!="https:"){
            //options.vidRandom = true;
        }
        data = this._addNonce(data, options);
        if(data==null) return;

        if (typeof options.disableExpireFilter === "undefined") options.disableExpireFilter = DelfinoConfig.disableExpireFilter;
        if (typeof options.disableExpireWarn === "undefined") options.disableExpireWarn = DelfinoConfig.disableExpireWarn;
        
        if(options.addCertStoreType == null  && DelfinoConfig.addCertStoreType!=null ) options.addCertStoreType = DelfinoConfig.addCertStoreType;
        if(options.addCertStoreType){
            options.attributeAsData = true;
            if(options.signedAttribute == null){
                options.signedAttribute = "certStoreType";
            }
            else if(options.signedAttribute.indexOf("certStoreType")==-1){
                options.signedAttribute += ",certStoreType";
            }
        }

        var handle = this._addCompleteIfNeedToHex(options, complete);

        DCrypto.sign(handle, data, JSON.stringify(options));
    },
    _addCompleteIfNeedToHex:function(options, complete){
        var outputEncoding = options.outputEncoding || DelfinoConfig.outputEncoding;
        if(outputEncoding == null ||  outputEncoding != "hex"){
            return this.addComplete(complete);
        }

        delete options.outputEncoding;

        return this.addComplete(function(param) {
            if(param.status == 1 && param.signData != null){
                if(options.multiSign && options.multiSignDelimiter){
                    var multiSignData = "";
                    for(var signData in param.signData.split(options.multiSignDelimiter)){
                        if(multiSignData.length>0){
                            multiSignData += options.multiSignDelimiter;
                        }
                        multiSignData += DC_base64ToHex(signData);
                    }
                    param.signData = multiSignData;
                }
                else{
                    param.signData = DC_base64ToHex(param.signData);
                }
            }

            if(param.status == 1 && param.vidRandom != null){
                param.vidRandom = DC_base64ToHex(param.vidRandom);
            }

            complete(param);
        });
    },
    _addNonce:function(data, options){
        if(options.addNonce){
            var nonce = DelfinoConfig.nonce || this._getURL(DelfinoConfig.nonceUrl);
            if(nonce.length<20 || nonce.length>40){
                alert("전자서명 실패[nonce 오류]:" + nonce.length);
                return null;
            }
            if(data.length>0) data +="&";

            var nonceKeyName = DelfinoConfig.nonceKeyName || "delfinoNonce";
            data += nonceKeyName + "=" + encodeURIComponent(nonce);
        }
        return data;
    },
    _getURL:function(url){
        var response="";
        jQuery.ajax({
            url: url,
            async: false,
            dataType: 'text',
            success: function(data){
                response = data;
            }
        });
        response = response.replace(/^\s*/,'').replace(/\s*$/, '');

        return response;
    },
    importCertificateFromPKCS12:function(p12){
        DCrypto.importCertificateFromPKCS12(p12);
    },
    setCacheCertStore:function(cache){

        try {
            DelfinoConfig.cacheCertStore = cache?"true":"false";
        } catch(e){ }

        if(this.init() == false) return;

        DCrypto.setProperty("cacheCertStore", cache?"true":"false");
    },
    addSigner:function(data, complete, options){
        if(options==null){
            options = {};
        }
        options.dataType = "PKCS7";
        options.signedAttribute = "signingTime";
        this.sign(data, complete, options);
    },
    confirmSign:function(data, format, complete, options){
        options = options || {};
        options.format = format;
        if(!options.format){
            alert("missing 'format' parameter");
            return;
        }

        options.dataType = data.dataType || "form-urlencoded";
        if(options.dataType == "strings"){
            options.delimiter = options.delimiter || DelfinoConfig.stringsDelimiter;
            if(!options.delimiter){
                alert("missing 'delimiter' option or 'DelfinoConfig.stringsDelimiter' config" );
                return;
            }
            if(options.addNonce){
                alert("not supported addNonce option");
                return;
            }
        }
        options.attributeAsData = true;
        options.signedAttribute = "format";

        this.sign(data, complete, options);
    },
    login:function(data, complete, options){
        if(this.init() == false) return;
        this.resetCertificate();
        options = options || {};
        if(options.addNonce==null) options.addNonce = true;
        options.signedAttribute = "certStoreType";
        options.attributeAsData = true;

        options.resetCertificate = true;
        options.cacheCert = true;

        this.sign(data, complete, options);
    },
    multiSign:function(data, complete, options){
        options = options || {};
        options.multiSign = true;
        options.multiSignDelimiter = options.multiSignDelimiter || DelfinoConfig.multiSignDelimiter;
        if(options.signedAttribute==null)options.signedAttribute = "signingTime";

        if(!options.multiSignDelimiter){
            alert("missing 'multiSignDelimiter' option or 'DelfinoConfig.multiSignDelimiter' config" );
            return;
        }
        if(options.addNonce){
            alert("not supported addNonce option");
            return;
        }
        if( data.nodeName!=null && data.nodeName.toLowerCase() === "form" ){
            alert("not supported data type");
            return;
        }

        this.sign(data, complete, options);
    },
    isPasswordError:function(status){
        return status == -4008 || status == -1004 || status == -1403;
    },
    setModule:function(module){
        if(module==null){
            module = Delfino_readCookie("delfino.recentModule");
            if(module==null || module == ""){
                module = DelfinoConfig.module;
            }
        }

        if(module == "G2"){
            window.Delfino = DelfinoG2G4;
        }
        else if(module == "G3"){
            window.Delfino = DelfinoHandler;
        }
        else if(module == "G4"){
            window.Delfino = DelfinoG2G4;
        }

        if(module == "G2" || module == "G3" || module == "G4"){
            DC_setModule(module);
            Delfino.inited = false;
            if( DelfinoConfig.useRecentModule ){
                Delfino_createCookie("delfino.recentModule", module);
            }
        }
    },
    getModule:function(){
        return window.DC_module;
    },
    resetRecentModule:function(){
        Delfino_eraseCookie("delfino.recentModule");
    },
    isSupportedG4:function(){
        if(DC_browserInfo.MSIE){
            if(DC_compareVersion(DC_browserInfo.version,"10")>=0) return true;
            return false;
        }
        if(DC_browserInfo.Edge){
            return true;
        }
        if(DC_browserInfo.Chrome){
            if(DC_compareVersion(DC_browserInfo.version,"31")>=0) return true;
            return false;
        }
        if(DC_browserInfo.Firefox){
            if(DC_compareVersion(DC_browserInfo.version,"38")>=0) return true;
            return false;
        }
        if(DC_browserInfo.Safari){
            if(DC_compareVersion(DC_browserInfo.version,"7.1")>=0) return true;
            return false;
        }
        if(DC_browserInfo.Opera){
            if(DC_compareVersion(DC_browserInfo.version,"30")>=0) return true;
            return false;
        }
        return false;
    }
};

window.Delfino = Delfino;
window.DelfinoG2G4 = Delfino;

}

function Delfino_complete(handle, param){
    DC_enableBrowser();
    setTimeout(function(){
        var complete = Delfino.getComplete(handle);
        if(complete !=null){
            if(typeof param === "string") param = jQuery.parseJSON(param);

            if(param.status==1 && param.message=="가져오기 내보내기 성공."){
                complete(param);
                return;
            }

            if(param.cmd == "requestCertificate2" || param.cmd == "updateCertificate2"){
                //alert(param.message);
                if(param.status!=0){
                    if (param.status == 1 && param.message == "") param.message = "인증서가 정상적으로 발급/갱신 되었습니다.";
                    alert(param.message);
                }
                complete(param);
                return;
            }

            //2014.03.17 password err check
            if ((param.cmd == null || param.cmd == "sign") && param.status == 1 && ( param.signData == null || param.signData == "")) {
                param.status = 0;
                param.message = "Password error.";
            } else if (Delfino.isPasswordError(param.status) && DelfinoConfig.passwordError != true) {
                param.status = 0;
            }

            complete(param);
        }
    }, 1);
}

function Delfino_generatePKCS7SignedData_success_callback(pkcs7, vid_random){
    //2014.03.17 password err check
    if (pkcs7 == null || pkcs7 == "") {
        Delfino_error_callback(0, "Password error.");
        return;
    }

    if(Delfino.generatePKCS7SignedDataSuccessCallback==null){
        var pkcs7Form = jQuery("#Delfino_PKCS7_form")[0];
        pkcs7Form.PKCS7.value = pkcs7;
        pkcs7Form.VID_RANDOM.value = vid_random;
        pkcs7Form.submit();
    }
    else{
        Delfino.generatePKCS7SignedDataSuccessCallback(pkcs7, vid_random);
    }
}

function Delfino_error_callback(code, message) {
    if(Delfino.generatePKCS7SignedDataErrorCallback==null){
        if (code != 0){
            alert("error:"+code + ":" + message);
        }
    }
    else{
        Delfino.generatePKCS7SignedDataErrorCallback(code, message);
    }
}

function Delfino_requestCertificate_complete_callback(code , msg){
    setTimeout(function() {
        if(code!=0){
            if (code == 1 && (msg == "" || msg == "success"))  msg = "인증서가 정상적으로 발급되었습니다.";
            alert(msg);
        }
        if(Delfino.requestCertificate_complete_callback!=null){
            Delfino.requestCertificate_complete_callback(code, msg);
        }
    }, 1);
}

function Delfino_updateCertificate_complete_callback(code , msg){
    setTimeout(function() {
        if(code!=0){
            if (code == 1 && (msg == "" || msg == "success")) msg = "인증서 갱신에 성공했습니다.";
            alert(msg);
        }
        if(Delfino.updateCertificate_complete_callback!=null){
            Delfino.updateCertificate_complete_callback(code, msg);
        }
    }, 1);
}

function Delfino_createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }

    if (DelfinoConfig.multiDomain != "" && document.location.hostname.indexOf(DelfinoConfig.multiDomain) >= 0) {
        document.cookie = name+"="+value+expires+"; path=/; domain=" + DelfinoConfig.multiDomain;
    } else {
        document.cookie = name+"="+value+expires+"; path=/";
    }
}

function Delfino_readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return "";
}

function Delfino_eraseCookie(name) {
    Delfino_createCookie(name,"",-1);
}



var DelfinoHandler = DelfinoHandler || (function($){
    var _delfino = {};
    var _parent = Delfino;
    var _parentFuncs = ["setPolicyOidCertFilter", "setIssuerCertFilter", "setProperty", "resetCertificate", "loginForm", "sign","signData","addSigner","init","login","signForm","requestCertificate","requestCertificate2","updateCertificate","updateCertificate2","signKeyValue","multiSign","multiSignString","manageCertificate"];

    function backupParentFunctions() {
        for(var index in _parentFuncs) {
            var func = _parentFuncs[index];
            _parent["par_"+func] = _parent[func];
        }
    }

    backupParentFunctions();
    $.extend(true,_delfino,_parent);

    function createProxyFunctions() {
        for(var index in _parentFuncs) {
            var func = _parentFuncs[index];
            (function(func){
                _delfino[func] = function() {
                    DelfinoHandler.callWithInitHandler(func,arguments);
                };
            })(func);
        }
    }
    createProxyFunctions();



    /* createProxyFunctions가 잘 안되면 일일이 다할것
    _delfino.sign = function() {
        this.callWithInitHandler("sign",arguments);
    }
*/
    _delfino._handlerInit = false;
    _delfino.isHandlerInit = function() { return this._handlerInit; };
    _delfino.setHandlerInit = function(init) { this._handlerInit = init; };

    _delfino.callWithInitHandler = function(fnName,args)  {

        //-----------------------------------------------------------------------
        this._lastCallTime = this._lastCallTime || {};
        if(this._lastCallTime[fnName] != undefined && (fnName == "login" || fnName == "sign" )) {
            var elapsed = new Date() - this._lastCallTime[fnName];
            elapsed = Math.round(elapsed / 600);
            if(elapsed <=3) {
                //alert(fnName + ": 천천히 합시다 " +elapsed + " sec");
                return;
            }
        }
        this._lastCallTime[fnName] = new Date();
        //-----------------------------------------------------------------------

        var parentFnName = "par_"+fnName;

        this.initHandler({retryCount:0,execTimeout:1000,success:function(){
        //this.initHandler({retryCount:(DC_browserInfo.MSIE)?0:1,execTimeout:1000,success:function(){
            var fn = Delfino[parentFnName];
            fn.apply(Delfino,args);
        }});
    };

    _delfino.isInstall = function(goInstall,completeCallback) {
        function tempError(param) {
            if(goInstall == true)
                DCrypto.goInstallPage();
            else
                completeCallback(false);
        }
        function tempSuccess() {
            completeCallback(true);
        }
        delfino.handler.helper.isInstall({"ctx":{},"error":tempError,"success":tempSuccess});
    };

    _delfino.initHandler = function(ctx) {

        /* //WIZVERA_TEST_START
        var check_allTIME = new Date();
        var check_TIME = new Date();
        var check_MSG = "";
        //WIZVERA_TEST_END */

        if(this.isHandlerInit() == true) {
            if(ctx.success != undefined)
                ctx.success();
            return true;
        }

        if(ctx == undefined) ctx = {retryCount:3,execTimeout:2000};
        this._ctx = ctx;

        if(this._ctx.retryCount < 0) {
            delfino.handler.state.clear();
            if(ctx.goInstall != undefined && ctx.goInstall == false) return;
            DCrypto.goInstallPage();
            return;
        }
        this._ctx.retryCount--;

        delfino.handler.state.setState("init",true);
        function installCheckOk(ver) {

            /* //WIZVERA_TEST_START
            check_MSG += "initHandler[ installOK] " + Math.floor( (new Date()).getTime() - check_TIME.getTime() ) / 1000 + "\n";
            check_TIME = new Date();
            //WIZVERA_TEST_END */

            DcryptoHandlerData.version = ver;
            delfino.handler.state.setState("init",false);
            delfino.handler.state.setState("secure",true);

            Delfino.loadLogoImage(DelfinoConfig.logoImageUrl);
            Delfino.init(false);

            /* //WIZVERA_TEST_START
            check_MSG += "initHandler[    initOK] " + Math.floor( (new Date()).getTime() - check_TIME.getTime() ) / 1000 + "\n";
            check_TIME = new Date();
            //WIZVERA_TEST_END */

            (function(ctx){
                delfino.handler.secure.init({success:function(){

                    Delfino.setHandlerInit(true);
                    delfino.handler.state.clear();
                    if(ctx.success != undefined) {

                        /* //WIZVERA_TEST_START
                        check_MSG += "initHandler[secureOK] " + Math.floor( (new Date()).getTime() - check_TIME.getTime() ) / 1000 + "\n\n";
                        check_MSG += "initHandler[ALL_TIME] " + Math.floor( (new Date()).getTime() - check_allTIME.getTime() ) / 1000 + "\n";
                        if (document.location.href.indexOf("debug=on")>=0) alert(check_MSG);
                        //WIZVERA_TEST_END */

                        ctx.success();
                    }
                },error:function(){
                    delfino.handler.state.clear();
                }});
            })(this.ctx);
        }
        function installCheckError(param) {

            /* //WIZVERA_TEST_START
            check_MSG += "initHandler[notInstall] " + Math.floor( (new Date()).getTime() - check_TIME.getTime() ) / 1000 + "\n";
            if (document.location.href.indexOf("debug=on")>=0) alert(check_MSG);
            //WIZVERA_TEST_END */

            if(param.objver == "") {    //timeout , error
                if(ctx.retryCount < 0) {
                    delfino.handler.state.clear();
                    if(ctx.goInstall != undefined && ctx.goInstall == false) return;
                    DCrypto.goInstallPage();
                    return;
                }

                (function(ctx){
                    setTimeout(function(){Delfino.initHandler(ctx);},ctx.execTimeout);
                })(this.ctx);
                return;
            }
            else if (param.objver < param.confver) { //old version
                delfino.handler.state.clear();
                if(ctx.goInstall != undefined && ctx.goInstall == false) return;
                DCrypto.goInstallPage();
                return;
            }
            delfino.handler.state.setState("init", false);
        }

        (function(ctx){
            setTimeout(function() {
                delfino.handler.helper.isInstall({"ctx":ctx,"error":installCheckError,"success":installCheckOk});
            },1);
        })(this._ctx);
    };

    _delfino.init = function(installCheck) {
        if(installCheck == undefined)
            installCheck = true;

        if(this.inited) {
            return true;
        }


        return this.par_init(installCheck);

    };
    _delfino.getMACAddress = function(cb) {
        //var completeCallback = function(mac){ alert(mac); };
        //if (typeof(cb) != "function") cb = completeCallback;
        if (typeof(cb) != "function") return "";

        delfino.handler.getProperty("MACAddress",{}).onsuccess(function(res){
            if(res.res == 0) {
                cb(res.data);
            } else {
                cb("");
            }
        }).onerror(function(){
            cb("");
        }).invoke();
    };
    _delfino.setProperties = function(properties) {
        DCrypto.setPropertyJson(properties);
    };

    _delfino.setLang = function(lang){
        DelfinoConfig.lang = lang;

        var langUrl="";
        if(lang == "KOR" || lang == "korean"){
            langUrl = DelfinoConfig.langUrl.koreanUrl;
            lang = "korean";
        }
        else if(lang == "ENG" || lang == "english"){
            langUrl = DelfinoConfig.langUrl.englishUrl;
            lang = "english";
        }
        else if(lang == "CHN" || lang == "chinese"){
            langUrl = DelfinoConfig.langUrl.chaneseUrl;
            lang = "chinese";
        }
        else if(lang == "JPN" || lang == "japanese"){
            langUrl = DelfinoConfig.langUrl.japaneseUrl;
            lang = "japanese";
        }

        jQuery.ajax({
            url: langUrl,
            async: false,
               dataType: 'text',
               success: function(data){
                   DCrypto.setLang(lang, data);
               }
        });
    };

    return _delfino;
})(jQuery);

jQuery(document).ready(function() {
    try {
        if(Delfino.initHandler != undefined) {
            //Delfino.initHandler({retryCount:0,execTimeout:2000,goInstall:false});
        } else {
            Delfino.init(false);
        }
    } catch(e) {}
});

if( DelfinoConfig.useRecentModule ){
    Delfino.setModule();
}
else{
    Delfino.setModule(DelfinoConfig.module);
}