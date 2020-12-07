/*
 * Transkey
 * Copyright(c) 2011, Lumensoft.
 * 
 */


function BarrettMu(m){this.modulus=ab(m);this.k=bb(this.modulus)+1;var cb=new BigInt();cb.digits[2*this.k]=1;this.mu=db(cb,this.modulus);this.bkplus1=new BigInt();this.bkplus1.digits[this.k+1]=1;this.modulo=BarrettMu_modulo;this.multiplyMod=BarrettMu_multiplyMod;this.powMod=BarrettMu_powMod;}
function BarrettMu_modulo(x){var eb=fb(x,this.k-1);var gb=hb(eb,this.mu);var ib=fb(gb,this.k+1);var jb=kb(x,this.k+1);var lb=hb(ib,this.modulus);var mb=kb(lb,this.k+1);var r=nb(jb,mb);if(r.isNeg){r=ob(r,this.bkplus1);}
var pb=qb(r,this.modulus)>=0;while(pb){r=nb(r,this.modulus);pb=qb(r,this.modulus)>=0;}
return r;}
function BarrettMu_multiplyMod(x,y){var rb=hb(x,y);return this.modulo(rb);}
function BarrettMu_powMod(x,y){var sb=new BigInt();sb.digits[0]=1;var a=x;var k=y;while(true){if((k.digits[0]&1)!=0)
sb=this.multiplyMod(sb,a);k=tb(k,1);if(k.digits[0]==0&&bb(k)==0)
break;a=this.multiplyMod(a,a);}
return sb;}
var ub=2;var vb=16;var wb=vb;var xb=1<<16;var yb=xb>>>1;var zb=xb*xb;var $b=xb-1;var _b=9999999999999998;var ac;var ZERO_ARRAY;var bc,cc;function setMaxDigits(ec){ac=ec;ZERO_ARRAY=new Array(ac);for(var fc=0;fc<ZERO_ARRAY.length;fc++)
ZERO_ARRAY[fc]=0;bc=new BigInt();cc=new BigInt();cc.digits[0]=1;}
setMaxDigits(20);var gc=15;var hc=ic(1000000000000000);function BigInt(jc){if(typeof jc=="boolean"&&jc==true){this.digits=null;}else{this.digits=ZERO_ARRAY.slice(0);}
this.isNeg=false;}
function kc(s){var lc=s.charAt(0)=='-';var i=lc?1:0;var sb;while(i<s.length&&s.charAt(i)=='0')
++i;if(i==s.length){sb=new BigInt();}else{var mc=s.length-i;var nc=mc%gc;if(nc==0)
nc=gc;sb=ic(Number(s.substr(i,nc)));i+=nc;while(i<s.length){sb=ob(hb(sb,hc),ic(Number(s.substr(i,gc))));i+=gc;}
sb.isNeg=lc;}
return sb;}
function ab(oc){var sb=new BigInt(true);sb.digits=oc.digits.slice(0);sb.isNeg=oc.isNeg;return sb;}
function ic(i){var sb=new BigInt();sb.isNeg=i<0;i=Math.abs(i);var j=0;while(i>0){sb.digits[j++]=i&$b;i=Math.floor(i/xb);}
return sb;}
function pc(s){var sb="";for(var i=s.length-1;i>-1;--i){sb+=s.charAt(i);}
return sb;}
var qc=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');function rc(x,sc){var b=new BigInt();b.digits[0]=sc;var tc=uc(x,b);var sb=qc[tc[1].digits[0]];while(qb(tc[0],bc)==1){tc=uc(tc[0],b);vc=tc[1].digits[0];sb+=qc[tc[1].digits[0]];}
return(x.isNeg?"-":"")+pc(sb);}
function wc(x){var b=new BigInt();b.digits[0]=10;var tc=uc(x,b);var sb=String(tc[1].digits[0]);while(qb(tc[0],bc)==1){tc=uc(tc[0],b);sb+=String(tc[1].digits[0]);}
return(x.isNeg?"-":"")+pc(sb);}
var xc=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');function yc(n){var zc=0xf;var sb="";for(i=0;i<4;++i){sb+=xc[n&zc];n>>>=4;}
return pc(sb);}
function $c(x){var sb="";var n=bb(x);for(var i=bb(x);i>-1;--i){sb+=yc(x.digits[i]);}
return sb;}
function _c(c){var ZERO=48;var NINE=ZERO+9;var ad=97;var bd=ad+25;var cd=65;var dd=65+25;var sb;if(c>=ZERO&&c<=NINE){sb=c-ZERO;}else if(c>=cd&&c<=dd){sb=10+c-cd;}else if(c>=ad&&c<=bd){sb=10+c-ad;}else{sb=0;}
return sb;}
function ed(s){var sb=0;var fd=Math.min(s.length,4);for(var i=0;i<fd;++i){sb<<=4;sb|=_c(s.charCodeAt(i))}
return sb;}
function gd(s){var sb=new BigInt();var fd=s.length;for(var i=fd,j=0;i>0;i-=4,++j){sb.digits[j]=ed(s.substr(Math.max(i-4,0),Math.min(i,4)));}
return sb;}
function hd(s,sc){var lc=s.charAt(0)=='-';var id=lc?1:0;var sb=new BigInt();var jd=new BigInt();jd.digits[0]=1;for(var i=s.length-1;i>=id;i--){var c=s.charCodeAt(i);var vc=_c(c);var kd=ld(jd,vc);sb=ob(sb,kd);jd=ld(jd,sc);}
sb.isNeg=lc;return sb;}
function md(b){return(b.isNeg?"-":"")+b.digits.join(" ");}
function ob(x,y){var sb;if(x.isNeg!=y.isNeg){y.isNeg=!y.isNeg;sb=nb(x,y);y.isNeg=!y.isNeg;}else{sb=new BigInt();var c=0;var n;for(var i=0;i<x.digits.length;++i){n=x.digits[i]+y.digits[i]+c;sb.digits[i]=n%xb;c=Number(n>=xb);}
sb.isNeg=x.isNeg;}
return sb;}
function nb(x,y){var sb;if(x.isNeg!=y.isNeg){y.isNeg=!y.isNeg;sb=ob(x,y);y.isNeg=!y.isNeg;}else{sb=new BigInt();var n,c;c=0;for(var i=0;i<x.digits.length;++i){n=x.digits[i]-y.digits[i]+c;sb.digits[i]=n%xb;if(sb.digits[i]<0)
sb.digits[i]+=xb;c=0-Number(n<0);}
if(c==-1){c=0;for(var i=0;i<x.digits.length;++i){n=0-sb.digits[i]+c;sb.digits[i]=n%xb;if(sb.digits[i]<0)
sb.digits[i]+=xb;c=0-Number(n<0);}
sb.isNeg=!x.isNeg;}else{sb.isNeg=x.isNeg;}}
return sb;}
function bb(x){var sb=x.digits.length-1;while(sb>0&&x.digits[sb]==0)
--sb;return sb;}
function nd(x){var n=bb(x);var d=x.digits[n];var m=(n+1)*wb;var sb;for(sb=m;sb>m-wb;--sb){if((d&0x8000)!=0)
break;d<<=1;}
return sb;}
function hb(x,y){var sb=new BigInt();var c;var n=bb(x);var t=bb(y);var u,od,k;for(var i=0;i<=t;++i){c=0;k=i;for(j=0;j<=n;++j,++k){od=sb.digits[k]+x.digits[j]*y.digits[i]+c;sb.digits[k]=od&$b;c=od>>>vb;}
sb.digits[i+n+1]=c;}
sb.isNeg=x.isNeg!=y.isNeg;return sb;}
function ld(x,y){var n,c,od;sb=new BigInt();n=bb(x);c=0;for(var j=0;j<=n;++j){od=sb.digits[j]+x.digits[j]*y+c;sb.digits[j]=od&$b;c=od>>>vb;}
sb.digits[1+n]=c;return sb;}
function pd(qd,rd,sd,td,n){var m=Math.min(rd+n,qd.length);for(var i=rd,j=td;i<m;++i,++j){sd[j]=qd[i];}}
var ud=new Array(0x0000,0x8000,0xC000,0xE000,0xF000,0xF800,0xFC00,0xFE00,0xFF00,0xFF80,0xFFC0,0xFFE0,0xFFF0,0xFFF8,0xFFFC,0xFFFE,0xFFFF);function vd(x,n){var mc=Math.floor(n/wb);var sb=new BigInt();pd(x.digits,0,sb.digits,mc,sb.digits.length-mc);var wd=n%wb;var xd=wb-wd;for(var i=sb.digits.length-1,yd=i-1;i>0;--i,--yd){sb.digits[i]=((sb.digits[i]<<wd)&$b)|((sb.digits[yd]&ud[wd])>>>(xd));}
sb.digits[0]=((sb.digits[i]<<wd)&$b);sb.isNeg=x.isNeg;return sb;}
var zd=new Array(0x0000,0x0001,0x0003,0x0007,0x000F,0x001F,0x003F,0x007F,0x00FF,0x01FF,0x03FF,0x07FF,0x0FFF,0x1FFF,0x3FFF,0x7FFF,0xFFFF);function tb(x,n){var mc=Math.floor(n/wb);var sb=new BigInt();pd(x.digits,mc,sb.digits,0,x.digits.length-mc);var wd=n%wb;var $d=wb-wd;for(var i=0,yd=i+1;i<sb.digits.length-1;++i,++yd){sb.digits[i]=(sb.digits[i]>>>wd)|((sb.digits[yd]&zd[wd])<<$d);}
sb.digits[sb.digits.length-1]>>>=wd;sb.isNeg=x.isNeg;return sb;}
function _d(x,n){var sb=new BigInt();pd(x.digits,0,sb.digits,n,sb.digits.length-n);return sb;}
function fb(x,n){var sb=new BigInt();pd(x.digits,n,sb.digits,0,sb.digits.length-n);return sb;}
function kb(x,n){var sb=new BigInt();pd(x.digits,0,sb.digits,0,n);return sb;}
function qb(x,y){if(x.isNeg!=y.isNeg){return 1-2*Number(x.isNeg);}
for(var i=x.digits.length-1;i>=0;--i){if(x.digits[i]!=y.digits[i]){if(x.isNeg){return 1-2*Number(x.digits[i]>y.digits[i]);}else{return 1-2*Number(x.digits[i]<y.digits[i]);}}}
return 0;}
function uc(x,y){var ae=nd(x);var be=nd(y);var ce=y.isNeg;var q,r;if(ae<be){if(x.isNeg){q=ab(cc);q.isNeg=!y.isNeg;x.isNeg=false;y.isNeg=false;r=nb(y,x);x.isNeg=true;y.isNeg=ce;}else{q=new BigInt();r=ab(x);}
return new Array(q,r);}
q=new BigInt();r=x;var t=Math.ceil(be/wb)-1;var de=0;while(y.digits[t]<yb){y=vd(y,1);++de;++be;t=Math.ceil(be/wb)-1;}
r=vd(r,de);ae+=de;var n=Math.ceil(ae/wb)-1;var b=_d(y,n-t);while(qb(r,b)!=-1){++q.digits[n-t];r=nb(r,b);}
for(var i=n;i>t;--i){var ee=(i>=r.digits.length)?0:r.digits[i];var fe=(i-1>=r.digits.length)?0:r.digits[i-1];var ge=(i-2>=r.digits.length)?0:r.digits[i-2];var he=(t>=y.digits.length)?0:y.digits[t];var ie=(t-1>=y.digits.length)?0:y.digits[t-1];if(ee==he){q.digits[i-t-1]=$b;}else{q.digits[i-t-1]=Math.floor((ee*xb+fe)/he);}
var je=q.digits[i-t-1]*((he*xb)+ie);var ke=(ee*zb)+((fe*xb)+ge);while(je>ke){--q.digits[i-t-1];je=q.digits[i-t-1]*((he*xb)|ie);ke=(ee*xb*xb)+((fe*xb)+ge);}
b=_d(y,i-t-1);r=nb(r,ld(b,q.digits[i-t-1]));if(r.isNeg){r=ob(r,b);--q.digits[i-t-1];}}
r=tb(r,de);q.isNeg=x.isNeg!=ce;if(x.isNeg){if(ce){q=ob(q,cc);}else{q=nb(q,cc);}
y=tb(y,de);r=nb(y,r);}
if(r.digits[0]==0&&bb(r)==0)
r.isNeg=false;return new Array(q,r);}
function db(x,y){return uc(x,y)[0];}
function le(x,y){return uc(x,y)[1];}
function me(x,y,m){return le(hb(x,y),m);}
function ne(x,y){var sb=cc;var a=x;while(true){if((y&1)!=0)
sb=hb(sb,a);y>>=1;if(y==0)
break;a=hb(a,a);}
return sb;}
function oe(x,y,m){var sb=cc;var a=x;var k=y;while(true){if((k.digits[0]&1)!=0)
sb=me(sb,a,m);k=tb(k,1);if(k.digits[0]==0&&bb(k)==0)
break;a=me(a,a,m);}
return sb;}
var GenKey=function(){var pe="";var qe=0;var re=10325476;var se="";function S4(){te=new Date();ue=te.getSeconds();return((1+Math.random(ue))*parseInt('10000',16)).toString(16).substring(1,5);};this.GenerateKey=function(ve){var we=ve/(8*4);var xe='';for(var i=0;i<we;i++){xe+=S4();}
return xe;};this.tk_sh1prng=function(){return ye();};this.tk_getrnd_int=function(){return ze();}
function $e(ec){re+=ec;}
function _e(){te=new Date();Xseed1=te.getSeconds();Xseed2=te.getMilliseconds();var ue=Xseed2+screen.height.toString()+screen.colorDepth.toString()+screen.availWidth.toString()+screen.availHeight.toString()+history.length.toString()+Xseed1.toString()
+navigator.plugins.length+re+Xseed2.toString();return ue;}
function ye(){te=new Date();if(!qe){pe=bf(_e());qe=1;}
XSEEDj=te.getSeconds()+te.getMilliseconds();var cf=XSEEDj+pe+se+1;se=bf(cf);return se;}
function df(length){var ef="";var ff=0;if(length<20){ef=ye();ef=ef.substring(0,length*2);return ef;}else{for(i=0;i<parseInt(length/20);i++){ef+=ye();}
if(length%20){gf=ye();ef+=gf.substring(0,(length%20)*2);}}
return ef;}
function ze(){var ef="";ff=0;ef=ye();ef=ef.substring(0,8);ff=parseInt(ef,16);return ff;}
function bf(hf){function jf(n,s){var kf=(n<<s)|(n>>>(32-s));return kf;};function lf(mf){var nf="";var i;var of;var pf;for(i=0;i<=6;i+=2){of=(mf>>>(i*4+4))&0x0f;pf=(mf>>>(i*4))&0x0f;nf+=of.toString(16)+pf.toString(16);}
return nf;};function qf(mf){var nf="";var i;var v;for(i=7;i>=0;i--){v=(mf>>>(i*4))&0x0f;nf+=v.toString(16);}
return nf;};function Utf8Encode(rf){var sf="";for(var n=0;n<rf.length;n++){var c=rf.charCodeAt(n);if(c<128){sf+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){sf+=String.fromCharCode((c>>6)|192);sf+=String.fromCharCode((c&63)|128);}else{sf+=String.fromCharCode((c>>12)|224);sf+=String.fromCharCode(((c>>6)&63)|128);sf+=String.fromCharCode((c&63)|128);}}
return sf;};var tf;var i,j;var W=new Array(80);var H0=0x67452301;var H1=0xEFCDAB89;var H2=0x98BADCFE;var H3=0x10325476;var H4=0xC3D2E1F0;var A,B,C,D,E;var uf;hf=Utf8Encode(hf);var vf=hf.length;var wf=new Array();for(i=0;i<vf-3;i+=4){j=hf.charCodeAt(i)<<24|hf.charCodeAt(i+1)<<16|hf.charCodeAt(i+2)<<8|hf.charCodeAt(i+3);wf.push(j);}
switch(vf%4){case 0:i=0x080000000;break;case 1:i=hf.charCodeAt(vf-1)<<24|0x0800000;break;case 2:i=hf.charCodeAt(vf-2)<<24|hf.charCodeAt(vf-1)<<16|0x08000;break;case 3:i=hf.charCodeAt(vf-3)<<24|hf.charCodeAt(vf-2)<<16|hf.charCodeAt(vf-1)<<8|0x80;break;}
wf.push(i);while((wf.length%16)!=14)
wf.push(0);wf.push(vf>>>29);wf.push((vf<<3)&0x0ffffffff);for(tf=0;tf<wf.length;tf+=16){for(i=0;i<16;i++)
W[i]=wf[tf+i];for(i=16;i<=79;i++)
W[i]=jf(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){uf=(jf(A,5)+((B&C)|(~B&D))+E+W[i]+0x5A827999)&0x0ffffffff;E=D;D=C;C=jf(B,30);B=A;A=uf;}
for(i=20;i<=39;i++){uf=(jf(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&0x0ffffffff;E=D;D=C;C=jf(B,30);B=A;A=uf;}
for(i=40;i<=59;i++){uf=(jf(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+0x8F1BBCDC)&0x0ffffffff;E=D;D=C;C=jf(B,30);B=A;A=uf;}
for(i=60;i<=79;i++){uf=(jf(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&0x0ffffffff;E=D;D=C;C=jf(B,30);B=A;A=uf;}
H0=(H0+A)&0x0ffffffff;H1=(H1+B)&0x0ffffffff;H2=(H2+C)&0x0ffffffff;H3=(H3+D)&0x0ffffffff;H4=(H4+E)&0x0ffffffff;}
var uf=qf(H0)+qf(H1)+qf(H2)+qf(H3)+qf(H4);return uf.toLowerCase();}};function RSAKeyPair(yf,zf,$f){this.e=gd(yf);this.d=gd(zf);this.m=gd($f);this.chunkSize=2*bb(this.m);this.radix=16;this.barrett=new BarrettMu(this.m);}
function _f(n){return(n<10?"0":"")+String(n);}
function encryptedString(xe,s){var a=new Array();var fd=s.length;var i=0;while(i<fd){a[i]=s.charCodeAt(i);i++;}
while(a.length%xe.chunkSize!=0){a[i++]=0;}
var bg=a.length;var sb="";var j,k,cg;for(i=0;i<bg;i+=xe.chunkSize){cg=new BigInt();j=0;for(k=i;k<i+xe.chunkSize;++j){cg.digits[j]=a[k++];cg.digits[j]+=a[k++]<<8;}
var dg=xe.barrett.powMod(cg,xe.e);var text=xe.radix==16?$c(dg):rc(dg,xe.radix);sb+=text+" ";}
return sb.substring(0,sb.length-1);}
function eg(xe,s){var fg=s.split(" ");var sb="";var i,j,cg;for(i=0;i<fg.length;++i){var oc;if(xe.radix==16){oc=gd(fg[i]);}else{oc=hd(fg[i],xe.radix);}
cg=xe.barrett.powMod(oc,xe.d);for(j=0;j<=bb(cg);++j){sb+=String.fromCharCode(cg.digits[j]&255,cg.digits[j]>>8);}}
if(sb.charCodeAt(sb.length-1)==0){sb=sb.substring(0,sb.length-1);}
return sb;}
var Seed={};var ENDIAN=1;Seed.GetB0=function(A){return(0x000000ff&(A));}
Seed.GetB1=function(A){return(0x000000ff&((A)>>>8));}
Seed.GetB2=function(A){return(0x000000ff&((A)>>>16));}
Seed.GetB3=function(A){return(0x000000ff&((A)>>>24));}
Seed.Endian=function(gg){ENDIAN=gg;}
Seed.EndianChange=function(hg){hg[0]=(hg[0]>>>24)|(hg[0]<<24)|((hg[0]<<8)&0x00ff0000)|((hg[0]>>>8)&0x0000ff00);}
Seed.EndianChange=function(hg){return(hg>>>24)|(hg<<24)|((hg<<8)&0x00ff0000)|((hg>>>8)&0x0000ff00);}
Seed.SeedRound=function(L0,L1,R0,R1,K){var T0,T1;var T00=0,T11=0;T0=R0[0]^K[0];T1=R1[0]^K[1];T1^=T0;T00=(T0<0)?(T0&0x7fffffff)|(0x80000000):(T0);T1=Seed.SS0[Seed.GetB0(T1)]^Seed.SS1[Seed.GetB1(T1)]^Seed.SS2[Seed.GetB2(T1)]^Seed.SS3[Seed.GetB3(T1)];T11=(T1<0)?(T1&0x7fffffff)|(0x80000000):(T1);T00+=T11;T0=Seed.SS0[Seed.GetB0(T00)]^Seed.SS1[Seed.GetB1(T00)]^Seed.SS2[Seed.GetB2(T00)]^Seed.SS3[Seed.GetB3(T00)];T00=(T0<0)?(T0&0x7fffffff)|(0x80000000):(T0);T11+=T00;T1=Seed.SS0[Seed.GetB0(T11)]^Seed.SS1[Seed.GetB1(T11)]^Seed.SS2[Seed.GetB2(T11)]^Seed.SS3[Seed.GetB3(T11)];T11=(T1<0)?(T1&0x7fffffff)|(0x80000000):(T1);T00+=T11;L0[0]^=T00;L1[0]^=T11;}
Seed.SeedEncrypt=function(ig,jg,kg){var L0=new Array(1);var L1=new Array(1);var R0=new Array(1);var R1=new Array(1);L0[0]=0x0;L1[0]=0x0;R0[0]=0x0;R1[0]=0x0;var K=new Array(2);var lg=0;L0[0]=(ig[0]&0x000000ff);L0[0]=((L0[0])<<8)^(ig[1]&0x000000ff);L0[0]=((L0[0])<<8)^(ig[2]&0x000000ff);L0[0]=((L0[0])<<8)^(ig[3]&0x000000ff);L1[0]=(ig[4]&0x000000ff);L1[0]=((L1[0])<<8)^(ig[5]&0x000000ff);L1[0]=((L1[0])<<8)^(ig[6]&0x000000ff);L1[0]=((L1[0])<<8)^(ig[7]&0x000000ff);R0[0]=(ig[8]&0x000000ff);R0[0]=((R0[0])<<8)^(ig[9]&0x000000ff);R0[0]=((R0[0])<<8)^(ig[10]&0x000000ff);R0[0]=((R0[0])<<8)^(ig[11]&0x000000ff);R1[0]=(ig[12]&0x000000ff);R1[0]=((R1[0])<<8)^(ig[13]&0x000000ff);R1[0]=((R1[0])<<8)^(ig[14]&0x000000ff);R1[0]=((R1[0])<<8)^(ig[15]&0x000000ff);if(!ENDIAN){EndianChange(L0);EndianChange(L1);EndianChange(R0);EndianChange(R1);}
K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(L0,L1,R0,R1,K);K[0]=jg[lg++];K[1]=jg[lg++];Seed.SeedRound(R0,R1,L0,L1,K);if(!ENDIAN){EndianChange(L0);EndianChange(L1);EndianChange(R0);EndianChange(R1);}
for(var i=0;i<4;i++){kg[i]=(((R0[0])>>>(8*(3-i)))&0xff);kg[4+i]=(((R1[0])>>>(8*(3-i)))&0xff);kg[8+i]=(((L0[0])>>>(8*(3-i)))&0xff);kg[12+i]=(((L1[0])>>>(8*(3-i)))&0xff);}}
Seed.SeedDecrypt=function(ig,jg,kg){var L0=new Array(1);var L1=new Array(1);var R0=new Array(1);var R1=new Array(1);var K=new Array(2);L0[0]=0x0;L1[0]=0x0;R0[0]=0x0;R1[0]=0x0;var lg=31;L0[0]=(ig[0]&0x000000ff);L0[0]=((L0[0])<<8)^(ig[1]&0x000000ff);L0[0]=((L0[0])<<8)^(ig[2]&0x000000ff);L0[0]=((L0[0])<<8)^(ig[3]&0x000000ff);L1[0]=(ig[4]&0x000000ff);L1[0]=((L1[0])<<8)^(ig[5]&0x000000ff);L1[0]=((L1[0])<<8)^(ig[6]&0x000000ff);L1[0]=((L1[0])<<8)^(ig[7]&0x000000ff);R0[0]=(ig[8]&0x000000ff);R0[0]=((R0[0])<<8)^(ig[9]&0x000000ff);R0[0]=((R0[0])<<8)^(ig[10]&0x000000ff);R0[0]=((R0[0])<<8)^(ig[11]&0x000000ff);R1[0]=(ig[12]&0x000000ff);R1[0]=((R1[0])<<8)^(ig[13]&0x000000ff);R1[0]=((R1[0])<<8)^(ig[14]&0x000000ff);R1[0]=((R1[0])<<8)^(ig[15]&0x000000ff);if(!ENDIAN){EndianChange(L0);EndianChange(L1);EndianChange(R0);EndianChange(R1);}
K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(R0,R1,L0,L1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(R0,R1,L0,L1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(R0,R1,L0,L1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(R0,R1,L0,L1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(R0,R1,L0,L1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(R0,R1,L0,L1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(R0,R1,L0,L1,K);K[1]=jg[lg--];K[0]=jg[lg--];Seed.SeedRound(L0,L1,R0,R1,K);K[1]=jg[lg--];K[0]=jg[lg];Seed.SeedRound(R0,R1,L0,L1,K);if(!ENDIAN){EndianChange(L0);EndianChange(L1);EndianChange(R0);EndianChange(R1);}
for(var i=0;i<4;i++){kg[i]=(((R0[0])>>>(8*(3-i)))&0xff);kg[4+i]=(((R1[0])>>>(8*(3-i)))&0xff);kg[8+i]=(((L0[0])>>>(8*(3-i)))&0xff);kg[12+i]=(((L1[0])>>>(8*(3-i)))&0xff);}}
Seed.EncRoundKeyUpdate0=function(K,A,B,C,D,Z){var T0,T1;var T00,T11;T0=A[0];A[0]=(A[0]>>>8)^(B[0]<<24);B[0]=(B[0]>>>8)^(T0<<24);T00=A[0]+C[0]-Seed.KC[Z];T11=B[0]+Seed.KC[Z]-D[0];K[0]=Seed.SS0[Seed.GetB0(T00)]^Seed.SS1[Seed.GetB1(T00)]^Seed.SS2[Seed.GetB2(T00)]^Seed.SS3[Seed.GetB3(T00)];K[1]=Seed.SS0[Seed.GetB0(T11)]^Seed.SS1[Seed.GetB1(T11)]^Seed.SS2[Seed.GetB2(T11)]^Seed.SS3[Seed.GetB3(T11)];}
Seed.EncRoundKeyUpdate1=function(K,A,B,C,D,Z){var T0,T1;var T00,T11;T0=C[0];C[0]=(C[0]<<8)^(D[0]>>>24);D[0]=(D[0]<<8)^(T0>>>24);T00=A[0]+C[0]-Seed.KC[Z];T11=B[0]+Seed.KC[Z]-D[0];K[0]=Seed.SS0[Seed.GetB0(T00)]^Seed.SS1[Seed.GetB1(T00)]^Seed.SS2[Seed.GetB2(T00)]^Seed.SS3[Seed.GetB3(T00)];K[1]=Seed.SS0[Seed.GetB0(T11)]^Seed.SS1[Seed.GetB1(T11)]^Seed.SS2[Seed.GetB2(T11)]^Seed.SS3[Seed.GetB3(T11)];}
Seed.SeedRoundKey=function(jg,mg){var A=new Array(1);var B=new Array(1);var C=new Array(1);var D=new Array(1);var K=new Array(2);var T0,T1;var lg=2;A[0]=(mg[0]&0x000000ff);A[0]=(A[0]<<8)^(mg[1]&0x000000ff);A[0]=(A[0]<<8)^(mg[2]&0x000000ff);A[0]=(A[0]<<8)^(mg[3]&0x000000ff);B[0]=(mg[4]&0x000000ff);B[0]=(B[0]<<8)^(mg[5]&0x000000ff);B[0]=(B[0]<<8)^(mg[6]&0x000000ff);B[0]=(B[0]<<8)^(mg[7]&0x000000ff);C[0]=(mg[8]&0x000000ff);C[0]=(C[0]<<8)^(mg[9]&0x000000ff);C[0]=(C[0]<<8)^(mg[10]&0x000000ff);C[0]=(C[0]<<8)^(mg[11]&0x000000ff);D[0]=(mg[12]&0x000000ff);D[0]=(D[0]<<8)^(mg[13]&0x000000ff);D[0]=(D[0]<<8)^(mg[14]&0x000000ff);D[0]=(D[0]<<8)^(mg[15]&0x000000ff);if(!ENDIAN){A[0]=EndianChange(A[0]);B[0]=EndianChange(B[0]);C[0]=EndianChange(C[0]);D[0]=EndianChange(D[0]);}
T0=A[0]+C[0]-Seed.KC[0];T1=B[0]-D[0]+Seed.KC[0];jg[0]=Seed.SS0[Seed.GetB0(T0)]^Seed.SS1[Seed.GetB1(T0)]^Seed.SS2[Seed.GetB2(T0)]^Seed.SS3[Seed.GetB3(T0)];jg[1]=Seed.SS0[Seed.GetB0(T1)]^Seed.SS1[Seed.GetB1(T1)]^Seed.SS2[Seed.GetB2(T1)]^Seed.SS3[Seed.GetB3(T1)];Seed.EncRoundKeyUpdate0(K,A,B,C,D,1);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate1(K,A,B,C,D,2);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate0(K,A,B,C,D,3);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate1(K,A,B,C,D,4);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate0(K,A,B,C,D,5);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate1(K,A,B,C,D,6);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate0(K,A,B,C,D,7);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate1(K,A,B,C,D,8);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate0(K,A,B,C,D,9);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate1(K,A,B,C,D,10);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate0(K,A,B,C,D,11);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate1(K,A,B,C,D,12);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate0(K,A,B,C,D,13);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate1(K,A,B,C,D,14);jg[lg++]=K[0];jg[lg++]=K[1];Seed.EncRoundKeyUpdate0(K,A,B,C,D,15);jg[lg++]=K[0];jg[lg++]=K[1];}
Seed.SeedXor=function(kg,ng,og){var i=0;for(i=0;i<16;i++){kg[i]=(ng[i]^og[i]);}}
Seed.SeedSetKey=function(jg,xe){Seed.SeedRoundKey(jg,xe);}
Seed.ArrayCopy=function(pg,qg,rg,sg,tg){for(var i=qg;i<(qg+tg);i++){rg[sg++]=pg[i];}}
Seed.SeedEncryptEcb=function(kg,ig,jg){Seed.SeedEncrypt(ig,jg,kg);}
Seed.SeedDecryptEcb=function(kg,ig,jg){Seed.SeedDecrypt(ig,jg,kg);}
Seed.SeedEncryptCbc=function(jg,ug,ig,tg,kg){var i,vg,wg;vg=tg/16;wg=tg%16;var xg=new Array(vg*16+wg);var yg=new Array(16);var Input=new Array(16);var zg=new Array(16);Seed.ArrayCopy(ug,0,zg,0,16);for(i=0;i<vg;i++){Seed.ArrayCopy(ig,i*16,Input,0,16);Seed.SeedXor(yg,Input,zg);Seed.SeedEncryptEcb(yg,yg,jg);Seed.ArrayCopy(yg,0,xg,i*16,16);}
if(wg!=0){Seed.ArrayCopy(ig,i*16,xg,i*16,wg);}
Seed.ArrayCopy(xg,0,kg,0,vg*16+wg);}
Seed.SeedDecryptCbc=function(jg,ug,ig,tg,kg){var i,vg,wg;vg=tg/16;wg=tg%16;var xg=new Array(16*vg);var yg=new Array(16);var Input=new Array(16);var zg=new Array(16);Seed.ArrayCopy(ug,0,zg,0,16);for(i=0;i<vg;i++){Seed.ArrayCopy(ig,i*16,Input,0,16);Seed.SeedDecryptEcb(yg,Input,jg);Seed.SeedXor(yg,yg,zg);Seed.ArrayCopy(yg,0,xg,i*16,16);}
if(wg!=0){Seed.ArrayCopy(ig,i*16,xg,i*16,wg);}
Seed.ArrayCopy(xg,0,kg,0,vg*16+wg);}
Seed.SS0=[0x2989a1a8,0x05858184,0x16c6d2d4,0x13c3d3d0,0x14445054,0x1d0d111c,0x2c8ca0ac,0x25052124,0x1d4d515c,0x03434340,0x18081018,0x1e0e121c,0x11415150,0x3cccf0fc,0x0acac2c8,0x23436360,0x28082028,0x04444044,0x20002020,0x1d8d919c,0x20c0e0e0,0x22c2e2e0,0x08c8c0c8,0x17071314,0x2585a1a4,0x0f8f838c,0x03030300,0x3b4b7378,0x3b8bb3b8,0x13031310,0x12c2d2d0,0x2ecee2ec,0x30407070,0x0c8c808c,0x3f0f333c,0x2888a0a8,0x32023230,0x1dcdd1dc,0x36c6f2f4,0x34447074,0x2ccce0ec,0x15859194,0x0b0b0308,0x17475354,0x1c4c505c,0x1b4b5358,0x3d8db1bc,0x01010100,0x24042024,0x1c0c101c,0x33437370,0x18889098,0x10001010,0x0cccc0cc,0x32c2f2f0,0x19c9d1d8,0x2c0c202c,0x27c7e3e4,0x32427270,0x03838380,0x1b8b9398,0x11c1d1d0,0x06868284,0x09c9c1c8,0x20406060,0x10405050,0x2383a3a0,0x2bcbe3e8,0x0d0d010c,0x3686b2b4,0x1e8e929c,0x0f4f434c,0x3787b3b4,0x1a4a5258,0x06c6c2c4,0x38487078,0x2686a2a4,0x12021210,0x2f8fa3ac,0x15c5d1d4,0x21416160,0x03c3c3c0,0x3484b0b4,0x01414140,0x12425250,0x3d4d717c,0x0d8d818c,0x08080008,0x1f0f131c,0x19899198,0x00000000,0x19091118,0x04040004,0x13435350,0x37c7f3f4,0x21c1e1e0,0x3dcdf1fc,0x36467274,0x2f0f232c,0x27072324,0x3080b0b0,0x0b8b8388,0x0e0e020c,0x2b8ba3a8,0x2282a2a0,0x2e4e626c,0x13839390,0x0d4d414c,0x29496168,0x3c4c707c,0x09090108,0x0a0a0208,0x3f8fb3bc,0x2fcfe3ec,0x33c3f3f0,0x05c5c1c4,0x07878384,0x14041014,0x3ecef2fc,0x24446064,0x1eced2dc,0x2e0e222c,0x0b4b4348,0x1a0a1218,0x06060204,0x21012120,0x2b4b6368,0x26466264,0x02020200,0x35c5f1f4,0x12829290,0x0a8a8288,0x0c0c000c,0x3383b3b0,0x3e4e727c,0x10c0d0d0,0x3a4a7278,0x07474344,0x16869294,0x25c5e1e4,0x26062224,0x00808080,0x2d8da1ac,0x1fcfd3dc,0x2181a1a0,0x30003030,0x37073334,0x2e8ea2ac,0x36063234,0x15051114,0x22022220,0x38083038,0x34c4f0f4,0x2787a3a4,0x05454144,0x0c4c404c,0x01818180,0x29c9e1e8,0x04848084,0x17879394,0x35053134,0x0bcbc3c8,0x0ecec2cc,0x3c0c303c,0x31417170,0x11011110,0x07c7c3c4,0x09898188,0x35457174,0x3bcbf3f8,0x1acad2d8,0x38c8f0f8,0x14849094,0x19495158,0x02828280,0x04c4c0c4,0x3fcff3fc,0x09494148,0x39093138,0x27476364,0x00c0c0c0,0x0fcfc3cc,0x17c7d3d4,0x3888b0b8,0x0f0f030c,0x0e8e828c,0x02424240,0x23032320,0x11819190,0x2c4c606c,0x1bcbd3d8,0x2484a0a4,0x34043034,0x31c1f1f0,0x08484048,0x02c2c2c0,0x2f4f636c,0x3d0d313c,0x2d0d212c,0x00404040,0x3e8eb2bc,0x3e0e323c,0x3c8cb0bc,0x01c1c1c0,0x2a8aa2a8,0x3a8ab2b8,0x0e4e424c,0x15455154,0x3b0b3338,0x1cccd0dc,0x28486068,0x3f4f737c,0x1c8c909c,0x18c8d0d8,0x0a4a4248,0x16465254,0x37477374,0x2080a0a0,0x2dcde1ec,0x06464244,0x3585b1b4,0x2b0b2328,0x25456164,0x3acaf2f8,0x23c3e3e0,0x3989b1b8,0x3181b1b0,0x1f8f939c,0x1e4e525c,0x39c9f1f8,0x26c6e2e4,0x3282b2b0,0x31013130,0x2acae2e8,0x2d4d616c,0x1f4f535c,0x24c4e0e4,0x30c0f0f0,0x0dcdc1cc,0x08888088,0x16061214,0x3a0a3238,0x18485058,0x14c4d0d4,0x22426260,0x29092128,0x07070304,0x33033330,0x28c8e0e8,0x1b0b1318,0x05050104,0x39497178,0x10809090,0x2a4a6268,0x2a0a2228,0x1a8a9298];Seed.SS1=[0x38380830,0xe828c8e0,0x2c2d0d21,0xa42686a2,0xcc0fcfc3,0xdc1eced2,0xb03383b3,0xb83888b0,0xac2f8fa3,0x60204060,0x54154551,0xc407c7c3,0x44044440,0x6c2f4f63,0x682b4b63,0x581b4b53,0xc003c3c3,0x60224262,0x30330333,0xb43585b1,0x28290921,0xa02080a0,0xe022c2e2,0xa42787a3,0xd013c3d3,0x90118191,0x10110111,0x04060602,0x1c1c0c10,0xbc3c8cb0,0x34360632,0x480b4b43,0xec2fcfe3,0x88088880,0x6c2c4c60,0xa82888a0,0x14170713,0xc404c4c0,0x14160612,0xf434c4f0,0xc002c2c2,0x44054541,0xe021c1e1,0xd416c6d2,0x3c3f0f33,0x3c3d0d31,0x8c0e8e82,0x98188890,0x28280820,0x4c0e4e42,0xf436c6f2,0x3c3e0e32,0xa42585a1,0xf839c9f1,0x0c0d0d01,0xdc1fcfd3,0xd818c8d0,0x282b0b23,0x64264662,0x783a4a72,0x24270723,0x2c2f0f23,0xf031c1f1,0x70324272,0x40024242,0xd414c4d0,0x40014141,0xc000c0c0,0x70334373,0x64274763,0xac2c8ca0,0x880b8b83,0xf437c7f3,0xac2d8da1,0x80008080,0x1c1f0f13,0xc80acac2,0x2c2c0c20,0xa82a8aa2,0x34340430,0xd012c2d2,0x080b0b03,0xec2ecee2,0xe829c9e1,0x5c1d4d51,0x94148490,0x18180810,0xf838c8f0,0x54174753,0xac2e8ea2,0x08080800,0xc405c5c1,0x10130313,0xcc0dcdc1,0x84068682,0xb83989b1,0xfc3fcff3,0x7c3d4d71,0xc001c1c1,0x30310131,0xf435c5f1,0x880a8a82,0x682a4a62,0xb03181b1,0xd011c1d1,0x20200020,0xd417c7d3,0x00020202,0x20220222,0x04040400,0x68284860,0x70314171,0x04070703,0xd81bcbd3,0x9c1d8d91,0x98198991,0x60214161,0xbc3e8eb2,0xe426c6e2,0x58194951,0xdc1dcdd1,0x50114151,0x90108090,0xdc1cccd0,0x981a8a92,0xa02383a3,0xa82b8ba3,0xd010c0d0,0x80018181,0x0c0f0f03,0x44074743,0x181a0a12,0xe023c3e3,0xec2ccce0,0x8c0d8d81,0xbc3f8fb3,0x94168692,0x783b4b73,0x5c1c4c50,0xa02282a2,0xa02181a1,0x60234363,0x20230323,0x4c0d4d41,0xc808c8c0,0x9c1e8e92,0x9c1c8c90,0x383a0a32,0x0c0c0c00,0x2c2e0e22,0xb83a8ab2,0x6c2e4e62,0x9c1f8f93,0x581a4a52,0xf032c2f2,0x90128292,0xf033c3f3,0x48094941,0x78384870,0xcc0cccc0,0x14150511,0xf83bcbf3,0x70304070,0x74354571,0x7c3f4f73,0x34350531,0x10100010,0x00030303,0x64244460,0x6c2d4d61,0xc406c6c2,0x74344470,0xd415c5d1,0xb43484b0,0xe82acae2,0x08090901,0x74364672,0x18190911,0xfc3ecef2,0x40004040,0x10120212,0xe020c0e0,0xbc3d8db1,0x04050501,0xf83acaf2,0x00010101,0xf030c0f0,0x282a0a22,0x5c1e4e52,0xa82989a1,0x54164652,0x40034343,0x84058581,0x14140410,0x88098981,0x981b8b93,0xb03080b0,0xe425c5e1,0x48084840,0x78394971,0x94178793,0xfc3cccf0,0x1c1e0e12,0x80028282,0x20210121,0x8c0c8c80,0x181b0b13,0x5c1f4f53,0x74374773,0x54144450,0xb03282b2,0x1c1d0d11,0x24250521,0x4c0f4f43,0x00000000,0x44064642,0xec2dcde1,0x58184850,0x50124252,0xe82bcbe3,0x7c3e4e72,0xd81acad2,0xc809c9c1,0xfc3dcdf1,0x30300030,0x94158591,0x64254561,0x3c3c0c30,0xb43686b2,0xe424c4e0,0xb83b8bb3,0x7c3c4c70,0x0c0e0e02,0x50104050,0x38390931,0x24260622,0x30320232,0x84048480,0x68294961,0x90138393,0x34370733,0xe427c7e3,0x24240420,0xa42484a0,0xc80bcbc3,0x50134353,0x080a0a02,0x84078783,0xd819c9d1,0x4c0c4c40,0x80038383,0x8c0f8f83,0xcc0ecec2,0x383b0b33,0x480a4a42,0xb43787b3];Seed.SS2=[0xa1a82989,0x81840585,0xd2d416c6,0xd3d013c3,0x50541444,0x111c1d0d,0xa0ac2c8c,0x21242505,0x515c1d4d,0x43400343,0x10181808,0x121c1e0e,0x51501141,0xf0fc3ccc,0xc2c80aca,0x63602343,0x20282808,0x40440444,0x20202000,0x919c1d8d,0xe0e020c0,0xe2e022c2,0xc0c808c8,0x13141707,0xa1a42585,0x838c0f8f,0x03000303,0x73783b4b,0xb3b83b8b,0x13101303,0xd2d012c2,0xe2ec2ece,0x70703040,0x808c0c8c,0x333c3f0f,0xa0a82888,0x32303202,0xd1dc1dcd,0xf2f436c6,0x70743444,0xe0ec2ccc,0x91941585,0x03080b0b,0x53541747,0x505c1c4c,0x53581b4b,0xb1bc3d8d,0x01000101,0x20242404,0x101c1c0c,0x73703343,0x90981888,0x10101000,0xc0cc0ccc,0xf2f032c2,0xd1d819c9,0x202c2c0c,0xe3e427c7,0x72703242,0x83800383,0x93981b8b,0xd1d011c1,0x82840686,0xc1c809c9,0x60602040,0x50501040,0xa3a02383,0xe3e82bcb,0x010c0d0d,0xb2b43686,0x929c1e8e,0x434c0f4f,0xb3b43787,0x52581a4a,0xc2c406c6,0x70783848,0xa2a42686,0x12101202,0xa3ac2f8f,0xd1d415c5,0x61602141,0xc3c003c3,0xb0b43484,0x41400141,0x52501242,0x717c3d4d,0x818c0d8d,0x00080808,0x131c1f0f,0x91981989,0x00000000,0x11181909,0x00040404,0x53501343,0xf3f437c7,0xe1e021c1,0xf1fc3dcd,0x72743646,0x232c2f0f,0x23242707,0xb0b03080,0x83880b8b,0x020c0e0e,0xa3a82b8b,0xa2a02282,0x626c2e4e,0x93901383,0x414c0d4d,0x61682949,0x707c3c4c,0x01080909,0x02080a0a,0xb3bc3f8f,0xe3ec2fcf,0xf3f033c3,0xc1c405c5,0x83840787,0x10141404,0xf2fc3ece,0x60642444,0xd2dc1ece,0x222c2e0e,0x43480b4b,0x12181a0a,0x02040606,0x21202101,0x63682b4b,0x62642646,0x02000202,0xf1f435c5,0x92901282,0x82880a8a,0x000c0c0c,0xb3b03383,0x727c3e4e,0xd0d010c0,0x72783a4a,0x43440747,0x92941686,0xe1e425c5,0x22242606,0x80800080,0xa1ac2d8d,0xd3dc1fcf,0xa1a02181,0x30303000,0x33343707,0xa2ac2e8e,0x32343606,0x11141505,0x22202202,0x30383808,0xf0f434c4,0xa3a42787,0x41440545,0x404c0c4c,0x81800181,0xe1e829c9,0x80840484,0x93941787,0x31343505,0xc3c80bcb,0xc2cc0ece,0x303c3c0c,0x71703141,0x11101101,0xc3c407c7,0x81880989,0x71743545,0xf3f83bcb,0xd2d81aca,0xf0f838c8,0x90941484,0x51581949,0x82800282,0xc0c404c4,0xf3fc3fcf,0x41480949,0x31383909,0x63642747,0xc0c000c0,0xc3cc0fcf,0xd3d417c7,0xb0b83888,0x030c0f0f,0x828c0e8e,0x42400242,0x23202303,0x91901181,0x606c2c4c,0xd3d81bcb,0xa0a42484,0x30343404,0xf1f031c1,0x40480848,0xc2c002c2,0x636c2f4f,0x313c3d0d,0x212c2d0d,0x40400040,0xb2bc3e8e,0x323c3e0e,0xb0bc3c8c,0xc1c001c1,0xa2a82a8a,0xb2b83a8a,0x424c0e4e,0x51541545,0x33383b0b,0xd0dc1ccc,0x60682848,0x737c3f4f,0x909c1c8c,0xd0d818c8,0x42480a4a,0x52541646,0x73743747,0xa0a02080,0xe1ec2dcd,0x42440646,0xb1b43585,0x23282b0b,0x61642545,0xf2f83aca,0xe3e023c3,0xb1b83989,0xb1b03181,0x939c1f8f,0x525c1e4e,0xf1f839c9,0xe2e426c6,0xb2b03282,0x31303101,0xe2e82aca,0x616c2d4d,0x535c1f4f,0xe0e424c4,0xf0f030c0,0xc1cc0dcd,0x80880888,0x12141606,0x32383a0a,0x50581848,0xd0d414c4,0x62602242,0x21282909,0x03040707,0x33303303,0xe0e828c8,0x13181b0b,0x01040505,0x71783949,0x90901080,0x62682a4a,0x22282a0a,0x92981a8a];Seed.SS3=[0x08303838,0xc8e0e828,0x0d212c2d,0x86a2a426,0xcfc3cc0f,0xced2dc1e,0x83b3b033,0x88b0b838,0x8fa3ac2f,0x40606020,0x45515415,0xc7c3c407,0x44404404,0x4f636c2f,0x4b63682b,0x4b53581b,0xc3c3c003,0x42626022,0x03333033,0x85b1b435,0x09212829,0x80a0a020,0xc2e2e022,0x87a3a427,0xc3d3d013,0x81919011,0x01111011,0x06020406,0x0c101c1c,0x8cb0bc3c,0x06323436,0x4b43480b,0xcfe3ec2f,0x88808808,0x4c606c2c,0x88a0a828,0x07131417,0xc4c0c404,0x06121416,0xc4f0f434,0xc2c2c002,0x45414405,0xc1e1e021,0xc6d2d416,0x0f333c3f,0x0d313c3d,0x8e828c0e,0x88909818,0x08202828,0x4e424c0e,0xc6f2f436,0x0e323c3e,0x85a1a425,0xc9f1f839,0x0d010c0d,0xcfd3dc1f,0xc8d0d818,0x0b23282b,0x46626426,0x4a72783a,0x07232427,0x0f232c2f,0xc1f1f031,0x42727032,0x42424002,0xc4d0d414,0x41414001,0xc0c0c000,0x43737033,0x47636427,0x8ca0ac2c,0x8b83880b,0xc7f3f437,0x8da1ac2d,0x80808000,0x0f131c1f,0xcac2c80a,0x0c202c2c,0x8aa2a82a,0x04303434,0xc2d2d012,0x0b03080b,0xcee2ec2e,0xc9e1e829,0x4d515c1d,0x84909414,0x08101818,0xc8f0f838,0x47535417,0x8ea2ac2e,0x08000808,0xc5c1c405,0x03131013,0xcdc1cc0d,0x86828406,0x89b1b839,0xcff3fc3f,0x4d717c3d,0xc1c1c001,0x01313031,0xc5f1f435,0x8a82880a,0x4a62682a,0x81b1b031,0xc1d1d011,0x00202020,0xc7d3d417,0x02020002,0x02222022,0x04000404,0x48606828,0x41717031,0x07030407,0xcbd3d81b,0x8d919c1d,0x89919819,0x41616021,0x8eb2bc3e,0xc6e2e426,0x49515819,0xcdd1dc1d,0x41515011,0x80909010,0xccd0dc1c,0x8a92981a,0x83a3a023,0x8ba3a82b,0xc0d0d010,0x81818001,0x0f030c0f,0x47434407,0x0a12181a,0xc3e3e023,0xcce0ec2c,0x8d818c0d,0x8fb3bc3f,0x86929416,0x4b73783b,0x4c505c1c,0x82a2a022,0x81a1a021,0x43636023,0x03232023,0x4d414c0d,0xc8c0c808,0x8e929c1e,0x8c909c1c,0x0a32383a,0x0c000c0c,0x0e222c2e,0x8ab2b83a,0x4e626c2e,0x8f939c1f,0x4a52581a,0xc2f2f032,0x82929012,0xc3f3f033,0x49414809,0x48707838,0xccc0cc0c,0x05111415,0xcbf3f83b,0x40707030,0x45717435,0x4f737c3f,0x05313435,0x00101010,0x03030003,0x44606424,0x4d616c2d,0xc6c2c406,0x44707434,0xc5d1d415,0x84b0b434,0xcae2e82a,0x09010809,0x46727436,0x09111819,0xcef2fc3e,0x40404000,0x02121012,0xc0e0e020,0x8db1bc3d,0x05010405,0xcaf2f83a,0x01010001,0xc0f0f030,0x0a22282a,0x4e525c1e,0x89a1a829,0x46525416,0x43434003,0x85818405,0x04101414,0x89818809,0x8b93981b,0x80b0b030,0xc5e1e425,0x48404808,0x49717839,0x87939417,0xccf0fc3c,0x0e121c1e,0x82828002,0x01212021,0x8c808c0c,0x0b13181b,0x4f535c1f,0x47737437,0x44505414,0x82b2b032,0x0d111c1d,0x05212425,0x4f434c0f,0x00000000,0x46424406,0xcde1ec2d,0x48505818,0x42525012,0xcbe3e82b,0x4e727c3e,0xcad2d81a,0xc9c1c809,0xcdf1fc3d,0x00303030,0x85919415,0x45616425,0x0c303c3c,0x86b2b436,0xc4e0e424,0x8bb3b83b,0x4c707c3c,0x0e020c0e,0x40505010,0x09313839,0x06222426,0x02323032,0x84808404,0x49616829,0x83939013,0x07333437,0xc7e3e427,0x04202424,0x84a0a424,0xcbc3c80b,0x43535013,0x0a02080a,0x87838407,0xc9d1d819,0x4c404c0c,0x83838003,0x8f838c0f,0xcec2cc0e,0x0b33383b,0x4a42480a,0x87b3b437];Seed.KC=[0x9e3779b9,0x3c6ef373,0x78dde6e6,0xf1bbcdcc,0xe3779b99,0xc6ef3733,0x8dde6e67,0x1bbcdccf,0x3779b99e,0x6ef3733c,0xdde6e678,0xbbcdccf1,0x779b99e3,0xef3733c6,0xde6e678d,0xbcdccf1b];var $g,_g,ah,bh,ch;function dh(x,i){x=document.body||null;_g=x&&typeof x.insertAdjacentHTML!="undefined"&&document.createElement;bh=(x&&!_g&&typeof x.appendChild!="undefined"&&typeof document.createRange!="undefined"&&typeof(i=document.createRange()).setStartBefore!="undefined"&&typeof i.createContextualFragment!="undefined");ah=_g&&document.all&&!window.opera;ch=bh&&typeof x.style.MozOpacity!="undefined";$g=!!(_g||bh);}
function eh(){var x=this.wnd.document.createRange();x.setStartBefore(this.cnv);x=x.createContextualFragment(ah?this._htmRpc():this.htm);if(this.cnv)
this.cnv.appendChild(x);this.htm="";}
function fh(){if(this.cnv)
this.cnv.insertAdjacentHTML("BeforeEnd",ah?this._htmRpc():this.htm);this.htm="";}
function gh(){this.wnd.document.write(ah?this._htmRpc():this.htm);this.htm='';}
function hh(){;}
function ih(x,y,w,h){this.htm+='<div style="position:absolute;'+'left:'+x+'px;'+'top:'+y+'px;'+'width:'+w+'px;'+'height:'+h+'px;'+'clip:rect(0,'+w+'px,'+h+'px,0);'
+'background-color:'+this.color+(!ch?';overflow:hidden':'')+';"><\/div>';}
function jh(x,y,w,h){this.htm+='%%'+this.color+';'+x+';'+y+';'+w+';'+h+';';}
function kh(x,y,w,h){this.htm+='<div style="position:absolute;'+'border-left:'+w+'px solid '+this.color+';'+'left:'+x+'px;'+'top:'+y+'px;'+'width:0px;'+'height:'+h+'px;'
+'clip:rect(0,'+w+'px,'+h+'px,0);'+'background-color:'+this.color+(!ch?';overflow:hidden':'')+';"><\/div>';}
var lh=/%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;function mh(){return this.htm.replace(lh,'<div style="overflow:hidden;position:absolute;background-color:'+'$1;left:$2;top:$3;width:$4;height:$5"></div>\n');}
function nh(){return this.htm.replace(lh,'<div style="overflow:hidden;position:absolute;background-color:'+'$1;left:$2;top:$3;width:$4;height:$5;border-left:$4px solid $1"></div>\n');}
function oh(ph,qh,rh,sh){if(ph>rh){var th=rh;var uh=sh;rh=ph;sh=qh;ph=th;qh=uh;}
var vh=rh-ph,wh=Math.abs(sh-qh),x=ph,y=qh,xh=(qh>sh)?-1:1;if(vh>=wh){var yh=wh<<1,zh=yh-(vh<<1),p=yh-vh,$h=x;while(vh>0){--vh;++x;if(p>0){this._mkDiv($h,y,x-$h,1);y+=xh;p+=zh;$h=x;}else
p+=yh;}
this._mkDiv($h,y,rh-$h+1,1);}else{var yh=vh<<1,zh=yh-(wh<<1),p=yh-wh,_h=y;if(sh<=qh){while(wh>0){--wh;if(p>0){this._mkDiv(x++,y,1,_h-y+1);y+=xh;p+=zh;_h=y;}else{y+=xh;p+=yh;}}
this._mkDiv(rh,sh,1,_h-sh+1);}else{while(wh>0){--wh;y+=xh;if(p>0){this._mkDiv(x++,_h,1,y-_h);p+=zh;_h=y;}else
p+=yh;}
this._mkDiv(rh,_h,1,sh-_h+1);}}}
function ai(ph,qh,rh,sh){if(ph>rh){var th=rh;var uh=sh;rh=ph;sh=qh;ph=th;qh=uh;}
var vh=rh-ph,wh=Math.abs(sh-qh),x=ph,y=qh,xh=(qh>sh)?-1:1;var s=this.stroke;if(vh>=wh){if(vh>0&&s-3>0){var bi=(s*vh*Math.sqrt(1+wh*wh/(vh*vh))-vh-(s>>1)*wh)/vh;bi=(!(s-4)?Math.ceil(bi):Math.round(bi))+1;}else
var bi=s;var ci=Math.ceil(s/2);var yh=wh<<1,zh=yh-(vh<<1),p=yh-vh,$h=x;while(vh>0){--vh;++x;if(p>0){this._mkDiv($h,y,x-$h+ci,bi);y+=xh;p+=zh;$h=x;}else
p+=yh;}
this._mkDiv($h,y,rh-$h+ci+1,bi);}else{if(s-3>0){var bi=(s*wh*Math.sqrt(1+vh*vh/(wh*wh))-(s>>1)*vh-wh)/wh;bi=(!(s-4)?Math.ceil(bi):Math.round(bi))+1;}else
var bi=s;var ci=Math.round(s/2);var yh=vh<<1,zh=yh-(wh<<1),p=yh-wh,_h=y;if(sh<=qh){++ci;while(wh>0){--wh;if(p>0){this._mkDiv(x++,y,bi,_h-y+ci);y+=xh;p+=zh;_h=y;}else{y+=xh;p+=yh;}}
this._mkDiv(rh,sh,bi,_h-sh+ci);}else{while(wh>0){--wh;y+=xh;if(p>0){this._mkDiv(x++,_h,bi,y-_h+ci);p+=zh;_h=y;}else
p+=yh;}
this._mkDiv(rh,_h,bi,sh-_h+ci+1);}}}
function di(ph,qh,rh,sh){if(ph>rh){var th=rh;var uh=sh;rh=ph;sh=qh;ph=th;qh=uh;}
var vh=rh-ph,wh=Math.abs(sh-qh),x=ph,y=qh,xh=(qh>sh)?-1:1,ei=true;if(vh>=wh){var yh=wh<<1,zh=yh-(vh<<1),p=yh-vh;while(vh>0){--vh;if(ei)
this._mkDiv(x,y,1,1);ei=!ei;if(p>0){y+=xh;p+=zh;}else
p+=yh;++x;}}else{var yh=vh<<1,zh=yh-(wh<<1),p=yh-wh;while(wh>0){--wh;if(ei)
this._mkDiv(x,y,1,1);ei=!ei;y+=xh;if(p>0){++x;p+=zh;}else
p+=yh;}}
if(ei)
this._mkDiv(x,y,1,1);}
function fi(gi,top,hi,ii){var a=(++hi)>>1,b=(++ii)>>1,ji=hi&1,ki=ii&1,li=gi+a,mi=top+b,x=0,y=b,$h=0,_h=b,ni=(a*a)<<1,oi=ni<<1,pi=(b*b)<<1,qi=pi<<1,ri=(ni>>1)*(1-(b<<1))+pi,si=(pi>>1)-ni*((b<<1)-1),w,h;while(y>0){if(ri<0){ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){ri+=pi*((x<<1)+3)-oi*(y-1);si+=qi*(++x)-ni*(((y--)<<1)-3);w=x-$h;h=_h-y;if((w&2)&&(h&2)){this._mkOvQds(li,mi,x-2,y+2,1,1,ji,ki);this._mkOvQds(li,mi,x-1,y+1,1,1,ji,ki);}else
this._mkOvQds(li,mi,x-1,_h,w,h,ji,ki);$h=x;_h=y;}else{si-=ni*((y<<1)-3);ri-=oi*(--y);}}
w=a-$h+1;h=(_h<<1)+ki;y=mi-_h;this._mkDiv(li-a,y,w,h);this._mkDiv(li+$h+ji-1,y,w,h);}
function ti(gi,top,hi,ii){var s=this.stroke;hi+=s+1;ii+=s+1;var a=hi>>1,b=ii>>1,ji=hi&1,ki=ii&1,li=gi+a,mi=top+b,x=0,y=b,ni=(a*a)<<1,oi=ni<<1,pi=(b*b)<<1,qi=pi<<1,ri=(ni>>1)*(1-(b<<1))
+pi,si=(pi>>1)-ni*((b<<1)-1);if(s-4<0&&(!(s-2)||hi-51>0&&ii-51>0)){var $h=0,_h=b,w,h,ui;while(y>0){if(ri<0){ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){ri+=pi*((x<<1)+3)-oi*(y-1);si+=qi*(++x)-ni*(((y--)<<1)-3);w=x-$h;h=_h-y;if(w-1){ui=w+1+(s&1);h=s;}else if(h-1){ui=s;h+=1+(s&1);}else
ui=h=s;this._mkOvQds(li,mi,x-1,_h,ui,h,ji,ki);$h=x;_h=y;}else{si-=ni*((y<<1)-3);ri-=oi*(--y);}}
this._mkDiv(li-a,mi-_h,s,(_h<<1)+ki);this._mkDiv(li+a+ji-s,mi-_h,s,(_h<<1)+ki);}else{var vi=(hi-(s<<1))>>1,wi=(ii-(s<<1))>>1,xi=0,yi=wi,zi=(vi*vi)<<1,$i=zi<<1,_i=(wi*wi)<<1,aj=_i<<1,bj=(zi>>1)*(1-(wi<<1))+_i,cj=(_i>>1)
-zi*((wi<<1)-1),dj=new Array(),ej=new Array(),fj=new Array();dj[0]=0;ej[0]=b;fj[0]=wi-1;while(y>0){if(ri<0){dj[dj.length]=x;ej[ej.length]=y;ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){dj[dj.length]=x;ri+=pi*((x<<1)+3)-oi*(y-1);si+=qi*(++x)-ni*(((y--)<<1)-3);ej[ej.length]=y;}else{si-=ni*((y<<1)-3);ri-=oi*(--y);}
if(yi>0){if(bj<0){bj+=_i*((xi<<1)+3);cj+=aj*(++xi);fj[fj.length]=yi-1;}else if(cj<0){bj+=_i*((xi<<1)+3)-$i*(yi-1);cj+=aj*(++xi)-zi*(((yi--)<<1)-3);fj[fj.length]=yi-1;}else{cj-=zi*((yi<<1)-3);bj-=$i*(--yi);fj[fj.length-1]--;}}}
var $h=-ji,_h=b,gj=fj[0],l=dj.length,w,h;for(var i=0;i<l;i++){if(typeof fj[i]!="undefined"){if(fj[i]<gj||ej[i]<_h){x=dj[i];this._mkOvQds(li,mi,x,_h,x-$h,_h-gj,ji,ki);$h=x;_h=ej[i];gj=fj[i];}}else{x=dj[i];this._mkDiv(li-x,mi-_h,1,(_h<<1)+ki);this._mkDiv(li+$h+ji,mi-_h,1,(_h<<1)+ki);$h=x;_h=ej[i];}}
this._mkDiv(li-a,mi-_h,1,(_h<<1)+ki);this._mkDiv(li+$h+ji,mi-_h,1,(_h<<1)+ki);}}
function hj(gi,top,hi,ii){var a=(++hi)>>1,b=(++ii)>>1,ji=hi&1,ki=ii&1,ij=ki^1,li=gi+a,mi=top+b,x=0,y=b,ni=(a*a)<<1,oi=ni<<1,pi=(b*b)<<1,qi=pi<<1,ri=(ni>>1)*(1-(b<<1))+pi,si=(pi>>1)-ni*((b<<1)-1),ei=true;while(y>0){if(ri<0){ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){ri+=pi*((x<<1)+3)-oi*(y-1);si+=qi*(++x)-ni*(((y--)<<1)-3);}else{si-=ni*((y<<1)-3);ri-=oi*(--y);}
if(ei&&y>=ij)
this._mkOvQds(li,mi,x,y,1,1,ji,ki);ei=!ei;}}
function jj(x,y,w,h){var s=this.stroke;this._mkDiv(x,y,w,s);this._mkDiv(x+w,y,s,h);this._mkDiv(x,y+h,w+s,s);this._mkDiv(x,y+s,s,h-s);}
function kj(x,y,w,h){this.drawLine(x,y,x+w,y);this.drawLine(x+w,y,x+w,y+h);this.drawLine(x,y+h,x+w,y+h);this.drawLine(x,y,x,y+h);}
function lj(){this.PLAIN='font-weight:normal;';this.BOLD='font-weight:bold;';this.ITALIC='font-style:italic;';this.ITALIC_BOLD=this.ITALIC+this.BOLD;this.BOLD_ITALIC=this.ITALIC_BOLD;}
var Font=new lj();function mj(){this.DOTTED=-1;}
var Stroke=new mj();function jsGraphics(oj,pj){this.setColor=function(x){this.color=x.toLowerCase();};this.setStroke=function(x){this.stroke=x;if(!(x+1)){this.drawLine=di;this._mkOv=hj;this.drawRect=kj;}else if(x-1>0){this.drawLine=ai;this._mkOv=ti;this.drawRect=jj;}else{this.drawLine=oh;this._mkOv=fi;this.drawRect=jj;}};this.setPrintable=function(qj){this.printable=qj;if(ah){this._mkDiv=jh;this._htmRpc=qj?nh:mh;}else
this._mkDiv=qj?kh:ih;};this.setFont=function(rj,sj,tj){this.ftFam=rj;this.ftSz=sj;this.ftSty=tj||Font.PLAIN;};this.drawPolyline=this.drawPolyLine=function(x,y){for(var i=x.length-1;i;){--i;this.drawLine(x[i],y[i],x[i+1],y[i+1]);}};this.fillRect=function(x,y,w,h){this._mkDiv(x,y,w,h);};this.drawPolygon=function(x,y){this.drawPolyline(x,y);this.drawLine(x[x.length-1],y[x.length-1],x[0],y[0]);};this.drawEllipse=this.drawOval=function(x,y,w,h){this._mkOv(x,y,w,h);};this.fillEllipse=this.fillOval=function(gi,top,w,h){var a=w>>1,b=h>>1,ji=w&1,ki=h&1,li=gi+a,mi=top+b,x=0,y=b,_h=b,ni=(a*a)<<1,oi=ni<<1,pi=(b*b)<<1,qi=pi<<1,ri=(ni>>1)*(1-(b<<1))+pi,si=(pi>>1)-ni*((b<<1)-1),uj,vj,wj;if(w)
while(y>0){if(ri<0){ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){ri+=pi*((x<<1)+3)-oi*(y-1);uj=li-x;vj=(x<<1)+ji;si+=qi*(++x)-ni*(((y--)<<1)-3);wj=_h-y;this._mkDiv(uj,mi-_h,vj,wj);this._mkDiv(uj,mi+y+ki,vj,wj);_h=y;}else{si-=ni*((y<<1)-3);ri-=oi*(--y);}}
this._mkDiv(li-a,mi-_h,w,(_h<<1)+ki);};this.fillArc=function(xj,yj,zj,$j,_j,ak){var a=zj>>1,b=$j>>1,bk=(zj&1)|(($j&1)<<16),li=xj+a,mi=yj+b,x=0,y=b,$h=x,_h=y,ni=(a*a)<<1,oi=ni<<1,pi=(b*b)<<1,qi=pi<<1,ri=(ni>>1)*(1-(b<<1))+pi,si=(pi>>1)-ni*((b<<1)-1),ck,dk,ek,fk,gk=(1<<(Math.floor((_j%=360.0)/180.0)<<3))|(2<<(Math.floor((ak%=360.0)/180.0)<<3))|((_j>=ak)<<16),hk=new Array(b+1),ik=new Array(b+1);_j*=Math.PI/180.0;ak*=Math.PI/180.0;ck=li+Math.round(a*Math.cos(_j));dk=mi+Math.round(-b*Math.sin(_j));jk(hk,li,mi,ck,dk);ek=li+Math.round(a*Math.cos(ak));fk=mi+Math.round(-b*Math.sin(ak));jk(ik,li,mi,ek,fk);while(y>0){if(ri<0){ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){ri+=pi*((x<<1)+3)-oi*(y-1);$h=x;si+=qi*(++x)-ni*(((y--)<<1)-3);this._mkArcDiv($h,y,_h,li,mi,bk,hk,ik,gk);_h=y;}else{si-=ni*((y<<1)-3);ri-=oi*(--y);if(y&&(hk[y]!=hk[y-1]||ik[y]!=ik[y-1])){this._mkArcDiv(x,y,_h,li,mi,bk,hk,ik,gk);$h=x;_h=y;}}}
this._mkArcDiv(x,0,_h,li,mi,bk,hk,ik,gk);if(bk>>16){if(gk>>16){var uj=(dk<=mi||fk>mi)?(li-x):li;this._mkDiv(uj,mi,x+li-uj+(bk&0xffff),1);}else if((gk&0x01)&&fk>mi)
this._mkDiv(li-x,mi,x,1);}};this.fillPolygon=function(e,name,kk,lk){var mk=document.getElementById(name+'_btnClickDiv');var nk=document.getElementById(name+'_fakeBtnClickDiv');if(e){mk.style.left=kk[0];mk.style.top=lk[0];mk.style.zIndex="3";mk.style.visibility="visible";}else{mk.style.pixelLeft=kk[0];mk.style.pixelTop=lk[0];mk.style.zIndex="3";mk.style.visibility="visible";}
var ok,pk,qk;ok=document.getElementById(name+"_layoutLower");pk=document.getElementById(name+"_layoutUpper");qk=document.getElementById(name+"_layoutSingle");var rk;rk=document.getElementById(name+'_fakeMouseDiv');if(rk.style.visibility=="visible"){if(ok!=null||pk!=null){if(ok.style.visibility=="visible"||pk.style.visibility=="visible"){if(e){nk.style.left=290+(290-kk[0]-36);nk.style.top=lk[0];nk.style.zIndex="3";nk.style.visibility="visible";}else{nk.style.pixelLeft=290+(290-kk[0]-36);nk.style.pixelTop=lk[0];nk.style.zIndex="3";nk.style.visibility="visible";}}}else if(qk!=null){if(qk.style.visibility=="visible"){if(e){nk.style.left=124+(124-kk[0]-36);nk.style.top=lk[0];nk.style.visibility="visible";}else{nk.style.pixelLeft=124+(124-kk[0]-36);nk.style.pixelTop=lk[0];nk.style.visibility="visible";}}}}};this.drawString=function(sk,x,y){this.htm+='<div style="position:absolute;white-space:nowrap;'+'left:'+x+'px;'+'top:'+y+'px;'+'font-family:'+this.ftFam+';'+'font-size:'+this.ftSz+';'+'color:'
+this.color+';'+this.ftSty+'">'+sk+'<\/div>';};this.drawStringRect=function(sk,x,y,hi,tk){this.htm+='<div style="position:absolute;overflow:hidden;'+'left:'+x+'px;'+'top:'+y+'px;'+'width:'+hi+'px;'+'text-align:'+tk+';'+'font-family:'+this.ftFam+';'
+'font-size:'+this.ftSz+';'+'color:'+this.color+';'+this.ftSty+'">'+sk+'<\/div>';};this.drawImage=function(uk,x,y,w,h,a){this.htm+='<div style="position:absolute;'+'left:'+x+'px;'+'top:'+y+'px;'+(w?('width:'+w+'px;'):'')+(h?('height:'+h+'px;'):'')+'">'+'<img src="'+uk
+'"'+(w?(' width="'+w+'"'):'')+(h?(' height="'+h+'"'):'')+(a?(' '+a):'')+'>'+'<\/div>';};this.clear=function(){this.htm="";if(this.cnv)
this.cnv.innerHTML="";};this._mkOvQds=function(li,mi,x,y,w,h,ji,ki){var uj=li-x,vk=li+x+ji-w,he=mi-y,wk=mi+y+ki-h;if(vk>uj+w){this._mkDiv(vk,he,w,h);this._mkDiv(vk,wk,w,h);}else
w=vk-uj+w;this._mkDiv(uj,he,w,h);this._mkDiv(uj,wk,w,h);};this._mkArcDiv=function(x,y,_h,li,mi,bk,hk,ik,gk){var xk=li+x+(bk&0xffff),sh,h=_h-y,uj,vk,w;if(!h)
h=1;x=li-x;if(gk&0xff0000){sh=mi-y-h;if(gk&0x00ff){if(gk&0x02){uj=Math.max(x,ik[y]);w=xk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}
if(gk&0x01){vk=Math.min(xk,hk[y]);w=vk-x;if(w>0)
this._mkDiv(x,sh,w,h);}}else
this._mkDiv(x,sh,xk-x,h);sh=mi+y+(bk>>16);if(gk&0xff00){if(gk&0x0100){uj=Math.max(x,hk[y]);w=xk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}
if(gk&0x0200){vk=Math.min(xk,ik[y]);w=vk-x;if(w>0)
this._mkDiv(x,sh,w,h);}}else
this._mkDiv(x,sh,xk-x,h);}else{if(gk&0x00ff){if(gk&0x02)
uj=Math.max(x,ik[y]);else
uj=x;if(gk&0x01)
vk=Math.min(xk,hk[y]);else
vk=xk;sh=mi-y-h;w=vk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}
if(gk&0xff00){if(gk&0x0100)
uj=Math.max(x,hk[y]);else
uj=x;if(gk&0x0200)
vk=Math.min(xk,ik[y]);else
vk=xk;sh=mi+y+(bk>>16);w=vk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}}};this.setStroke(1);this.setFont("verdana,geneva,helvetica,sans-serif","12px",Font.PLAIN);this.color="#000000";this.htm="";this.wnd=pj||window;if(!$g)
dh();if($g){if(oj){if(typeof(oj)=="string")
this.cont=document.all?(this.wnd.document.all[oj]||null):document.getElementById?(this.wnd.document.getElementById(oj)||null):null;else if(oj==window.document)
this.cont=document.getElementsByTagName("body")[0];else
this.cont=oj;this.cnv=this.wnd.document.createElement("div");this.cnv.style.fontSize=0;this.cont.appendChild(this.cnv);this.paint=bh?eh:fh;}else
this.paint=gh;}else
this.paint=hh;this.setPrintable(false);}
function jk(yk,ph,qh,rh,sh){var vh=Math.abs(rh-ph),wh=Math.abs(sh-qh),x=ph,y=qh,zk=(ph>rh)?-1:1,xh=(qh>sh)?-1:1,p,i=0;if(vh>=wh){var yh=wh<<1,zh=yh-(vh<<1);p=yh-vh;while(vh>0){--vh;if(p>0){yk[i++]=x;y+=xh;p+=zh;}else
p+=yh;x+=zk;}}else{var yh=vh<<1,zh=yh-(wh<<1);p=yh-wh;while(wh>0){--wh;y+=xh;yk[i++]=x;if(p>0){x+=zk;p+=zh;}else
p+=yh;}}
for(var tg=yk.length,i=tg-i;i;)
yk[tg-(i--)]=x;};function $k(x,y){return(x-y);}
function _k(oj,pj){this.setColor=function(x){this.color=x.toLowerCase();};this.setStroke=function(x){this.stroke=x;if(!(x+1)){this.drawLine=di;this._mkOv=hj;this.drawRect=kj;}else if(x-1>0){this.drawLine=ai;this._mkOv=ti;this.drawRect=jj;}else{this.drawLine=oh;this._mkOv=fi;this.drawRect=jj;}};this.setPrintable=function(qj){this.printable=qj;if(ah){this._mkDiv=jh;this._htmRpc=qj?nh:mh;}else
this._mkDiv=qj?kh:ih;};this.setFont=function(rj,sj,tj){this.ftFam=rj;this.ftSz=sj;this.ftSty=tj||Font.PLAIN;};this.drawPolyline=this.drawPolyLine=function(x,y){for(var i=x.length-1;i;){--i;this.drawLine(x[i],y[i],x[i+1],y[i+1]);}};this.fillRect=function(x,y,w,h){this._mkDiv(x,y,w,h);};this.drawPolygon=function(x,y){this.drawPolyline(x,y);this.drawLine(x[x.length-1],y[x.length-1],x[0],y[0]);};this.drawEllipse=this.drawOval=function(x,y,w,h){this._mkOv(x,y,w,h);};this.fillEllipse=this.fillOval=function(gi,top,w,h){var a=w>>1,b=h>>1,ji=w&1,ki=h&1,li=gi+a,mi=top+b,x=0,y=b,_h=b,ni=(a*a)<<1,oi=ni<<1,pi=(b*b)<<1,qi=pi<<1,ri=(ni>>1)*(1-(b<<1))+pi,si=(pi>>1)-ni*((b<<1)-1),uj,vj,wj;if(w)
while(y>0){if(ri<0){ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){ri+=pi*((x<<1)+3)-oi*(y-1);uj=li-x;vj=(x<<1)+ji;si+=qi*(++x)-ni*(((y--)<<1)-3);wj=_h-y;this._mkDiv(uj,mi-_h,vj,wj);this._mkDiv(uj,mi+y+ki,vj,wj);_h=y;}else{si-=ni*((y<<1)-3);ri-=oi*(--y);}}
this._mkDiv(li-a,mi-_h,w,(_h<<1)+ki);};this.fillArc=function(xj,yj,zj,$j,_j,ak){var a=zj>>1,b=$j>>1,bk=(zj&1)|(($j&1)<<16),li=xj+a,mi=yj+b,x=0,y=b,$h=x,_h=y,ni=(a*a)<<1,oi=ni<<1,pi=(b*b)<<1,qi=pi<<1,ri=(ni>>1)*(1-(b<<1))+pi,si=(pi>>1)-ni*((b<<1)-1),ck,dk,ek,fk,gk=(1<<(Math.floor((_j%=360.0)/180.0)<<3))|(2<<(Math.floor((ak%=360.0)/180.0)<<3))|((_j>=ak)<<16),hk=new Array(b+1),ik=new Array(b+1);_j*=Math.PI/180.0;ak*=Math.PI/180.0;ck=li+Math.round(a*Math.cos(_j));dk=mi+Math.round(-b*Math.sin(_j));jk(hk,li,mi,ck,dk);ek=li+Math.round(a*Math.cos(ak));fk=mi+Math.round(-b*Math.sin(ak));jk(ik,li,mi,ek,fk);while(y>0){if(ri<0){ri+=pi*((x<<1)+3);si+=qi*(++x);}else if(si<0){ri+=pi*((x<<1)+3)-oi*(y-1);$h=x;si+=qi*(++x)-ni*(((y--)<<1)-3);this._mkArcDiv($h,y,_h,li,mi,bk,hk,ik,gk);_h=y;}else{si-=ni*((y<<1)-3);ri-=oi*(--y);if(y&&(hk[y]!=hk[y-1]||ik[y]!=ik[y-1])){this._mkArcDiv(x,y,_h,li,mi,bk,hk,ik,gk);$h=x;_h=y;}}}
this._mkArcDiv(x,0,_h,li,mi,bk,hk,ik,gk);if(bk>>16){if(gk>>16){var uj=(dk<=mi||fk>mi)?(li-x):li;this._mkDiv(uj,mi,x+li-uj+(bk&0xffff),1);}else if((gk&0x01)&&fk>mi)
this._mkDiv(li-x,mi,x,1);}};this.fillPolygon=function(kk,lk){var i;var y;var al,bl;var ph,qh;var rh,sh;var cl,dl;var el;var n=kk.length;if(!n)
return;al=lk[0];bl=lk[0];for(i=1;i<n;i++){if(lk[i]<al)
al=lk[i];if(lk[i]>bl)
bl=lk[i];}
for(y=al;y<=bl;y++){var fl=new Array();el=0;for(i=0;i<n;i++){if(!i){cl=n-1;dl=0;}else{cl=i-1;dl=i;}
qh=lk[cl];sh=lk[dl];if(qh<sh){ph=kk[cl];rh=kk[dl];}else if(qh>sh){sh=lk[cl];qh=lk[dl];rh=kk[cl];ph=kk[dl];}else
continue;if((y>=qh)&&(y<sh))
fl[el++]=Math.round((y-qh)*(rh-ph)/(sh-qh)+ph);else if((y==bl)&&(y>qh)&&(y<=sh))
fl[el++]=Math.round((y-qh)*(rh-ph)/(sh-qh)+ph);}
fl.sort($k);for(i=0;i<el;i+=2)
this._mkDiv(fl[i],y,fl[i+1]-fl[i]+1,1);}};this.drawString=function(sk,x,y){this.htm+='<div style="position:absolute;white-space:nowrap;'+'left:'+x+'px;'+'top:'+y+'px;'+'font-family:'+this.ftFam+';'+'font-size:'+this.ftSz+';'+'color:'
+this.color+';'+this.ftSty+'">'+sk+'<\/div>';};this.drawStringRect=function(sk,x,y,hi,tk){this.htm+='<div style="position:absolute;overflow:hidden;'+'left:'+x+'px;'+'top:'+y+'px;'+'width:'+hi+'px;'+'text-align:'+tk+';'+'font-family:'+this.ftFam+';'
+'font-size:'+this.ftSz+';'+'color:'+this.color+';'+this.ftSty+'">'+sk+'<\/div>';};this.drawImage=function(uk,x,y,w,h,a){this.htm+='<div style="position:absolute;'+'left:'+x+'px;'+'top:'+y+'px;'+(w?('width:'+w+'px;'):'')+(h?('height:'+h+'px;'):'')+'">'+'<img src="'+uk
+'"'+(w?(' width="'+w+'"'):'')+(h?(' height="'+h+'"'):'')+(a?(' '+a):'')+'>'+'<\/div>';};this.clear=function(){this.htm="";if(this.cnv)
this.cnv.innerHTML="";};this._mkOvQds=function(li,mi,x,y,w,h,ji,ki){var uj=li-x,vk=li+x+ji-w,he=mi-y,wk=mi+y+ki-h;if(vk>uj+w){this._mkDiv(vk,he,w,h);this._mkDiv(vk,wk,w,h);}else
w=vk-uj+w;this._mkDiv(uj,he,w,h);this._mkDiv(uj,wk,w,h);};this._mkArcDiv=function(x,y,_h,li,mi,bk,hk,ik,gk){var xk=li+x+(bk&0xffff),sh,h=_h-y,uj,vk,w;if(!h)
h=1;x=li-x;if(gk&0xff0000){sh=mi-y-h;if(gk&0x00ff){if(gk&0x02){uj=Math.max(x,ik[y]);w=xk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}
if(gk&0x01){vk=Math.min(xk,hk[y]);w=vk-x;if(w>0)
this._mkDiv(x,sh,w,h);}}else
this._mkDiv(x,sh,xk-x,h);sh=mi+y+(bk>>16);if(gk&0xff00){if(gk&0x0100){uj=Math.max(x,hk[y]);w=xk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}
if(gk&0x0200){vk=Math.min(xk,ik[y]);w=vk-x;if(w>0)
this._mkDiv(x,sh,w,h);}}else
this._mkDiv(x,sh,xk-x,h);}else{if(gk&0x00ff){if(gk&0x02)
uj=Math.max(x,ik[y]);else
uj=x;if(gk&0x01)
vk=Math.min(xk,hk[y]);else
vk=xk;sh=mi-y-h;w=vk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}
if(gk&0xff00){if(gk&0x0100)
uj=Math.max(x,hk[y]);else
uj=x;if(gk&0x0200)
vk=Math.min(xk,ik[y]);else
vk=xk;sh=mi+y+(bk>>16);w=vk-uj;if(w>0)
this._mkDiv(uj,sh,w,h);}}};this.setStroke(1);this.setFont("verdana,geneva,helvetica,sans-serif","12px",Font.PLAIN);this.color="#000000";this.htm="";this.wnd=pj||window;if(!$g)
dh();if($g){if(oj){if(typeof(oj)=="string")
this.cont=document.all?(this.wnd.document.all[oj]||null):document.getElementById?(this.wnd.document.getElementById(oj)||null):null;else if(oj==window.document)
this.cont=document.getElementsByTagName("body")[0];else
this.cont=oj;this.cnv=this.wnd.document.createElement("div");this.cnv.style.fontSize=0;this.cont.appendChild(this.cnv);this.paint=bh?eh:fh;}else
this.paint=gh;}else
this.paint=hh;this.setPrintable(false);}
