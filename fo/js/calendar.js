var lunarInfo=new Array(
        0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2,
        0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd255, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977,
        0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970,
        0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f,
        0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557,
        0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0,
        0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0,
        0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6,
        0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570,
        0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0,
        0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5,
        0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930,
        0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530,
        0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45,
        0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0,
        0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef,
        0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4,
        0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0,
        0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260,
        0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252,
        0xd520);

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);

var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");

var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");

var Gan1=new Array(
    '甲子乙丑丙寅丁卯戊辰己巳庚午辛未壬申癸酉甲戌乙亥','丙子丁丑戊寅己卯庚辰辛巳壬午癸未甲申乙酉丙戌丁亥',
    '戊子己丑庚寅辛卯壬辰癸巳甲午乙未丙申丁酉戊戌己亥','庚子辛丑壬寅癸卯甲辰乙巳丙午丁未戊申己酉庚戌辛亥',
    '壬子癸丑甲寅乙卯丙辰丁巳戊午己未庚申辛酉壬戌癸亥','甲子乙丑丙寅丁卯戊辰己巳庚午辛未壬申癸酉甲戌乙亥',
    '丙子丁丑戊寅己卯庚辰辛巳壬午癸未甲申乙酉丙戌丁亥','戊子己丑庚寅辛卯壬辰癸巳甲午乙未丙申丁酉戊戌己亥',
    '庚子辛丑壬寅癸卯甲辰乙巳丙午丁未戊申己酉庚戌辛亥','壬子癸丑甲寅乙卯丙辰丁巳戊午己未庚申辛酉壬戌癸亥');

var Gan2=new Array(
    '1金匮1天德2白虎1玉堂2天牢2玄武1司命2勾陈1青龙1明堂2天刑2朱雀',
    '2天刑2朱雀1金匮1天德2白虎1玉堂2天牢2玄武1司命2勾陈1青龙1明堂',
    '1青龙1明堂2天刑2朱雀1金匮1天德2白虎1玉堂2天牢2玄武1司命2勾陈',
    '1司命2勾陈1青龙1明堂2天刑2朱雀1金匮1天德2白虎1玉堂2天牢2玄武',
    '2天牢2玄武1司命2勾陈1青龙1明堂2天刑2朱雀1金匮1天德2白虎1玉堂',
    '2白虎1玉堂2天牢2玄武1司命2勾陈1青龙1明堂2天刑2朱雀1金匮1天德',
    '1金匮1天德2白虎1玉堂2天牢2玄武1司命2勾陈1青龙1明堂2天刑2朱雀',
    '2天刑2朱雀1金匮1天德2白虎1玉堂2天牢2玄武1司命2勾陈1青龙1明堂',
    '1青龙1明堂2天刑2朱雀1金匮1天德2白虎1玉堂2天牢2玄武1司命2勾陈',
    '1司命2勾陈1青龙1明堂2天刑2朱雀1金匮1天德2白虎1玉堂2天牢2玄武',
    '2天牢2玄武1司命2勾陈1青龙1明堂2天刑2朱雀1金匮1天德2白虎1玉堂',
    '2白虎1玉堂2天牢2玄武1司命2勾陈1青龙1明堂2天刑2朱雀1金匮1天德');

var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");

var STA=new Array(
    "摩蝎座：12 . 22—01 . 19","水瓶座：01 . 20—02 . 18","双鱼座：02 . 19—03 . 20","白羊座：03 . 21—04 . 19",
    "金牛座：04 . 20—05 . 20","双子座：05 . 21—06 . 20","巨蟹座：06 . 21—07 . 21","狮子座：07 . 22—08 . 22",
    "处女座：08 . 23—09 . 22","天秤座：09 . 23—10 . 22","天蝎座：10 . 23—11 . 21","射手座：11 . 22—12 . 21");

var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);

var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');

var nStr2 = new Array('初','十','廿','卅','□');

/*****************************************************************************
黄历宜忌计算
*****************************************************************************/
var jcName0 = new Array('建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭');
var jcName1 = new Array('闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开');
var jcName2 = new Array('开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收');
var jcName3 = new Array('收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成');
var jcName4 = new Array('成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危');
var jcName5 = new Array('危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破');
var jcName6 = new Array('破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执');
var jcName7 = new Array('执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定');
var jcName8 = new Array('定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平');
var jcName9 = new Array('平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满');
var jcName10 = new Array('满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除');
var jcName11 = new Array('除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建');

var jcrjxy = new Array(
    '出行.上任.会友.上书.见工','除服.疗病.出行.拆卸.入宅',
    '祈福.祭祀.结亲.开市.交易','祭祀.修填.涂泥.余事勿取',
    '易.立券.会友.签约.纳畜','祈福.祭祀.求子.结婚.立约',
    '求医.赴考.祭祀.余事勿取','经营.交易.求官.纳畜.动土',
    '祈福.入学.开市.求医.成服','祭祀.求财.签约.嫁娶.订盟',
    '疗病.结婚.交易.入仓.求职','祭祀.交易.收财.安葬'
    );

var jcrjxj = new Array(
    '动土.开仓.嫁娶.纳采','求官.上任.开张.搬家.探病',
    '服药.求医.栽种.动土.迁移','移徙.入宅.嫁娶.开市.安葬',
    '种植.置业.卖田.掘井.造船','开市.交易.搬家.远行',
    '动土.出行.移徙.开市.修造','登高.行船.安床.入宅.博彩',
    '词讼.安门.移徙','开市.安床.安葬.入宅.破土',
    '安葬.动土.针灸','宴会.安床.出行.嫁娶.移徙'
    );

function jcrt(d) {
    var jcrjxt;
    if (d == '建') jcrjxt = yj0 + jcrjxy[0] + '&nbsp; ' + yj1 + jcrjxj[0];
    if (d == '除') jcrjxt = yj0 + jcrjxy[1] + '&nbsp; ' + yj1 + jcrjxj[1];
    if (d == '满') jcrjxt = yj0 + jcrjxy[2] + '&nbsp; ' + yj1 + jcrjxj[2];
    if (d == '平') jcrjxt = yj0 + jcrjxy[3] + '&nbsp; ' + yj1 + jcrjxj[3];
    if (d == '定') jcrjxt = yj0 + jcrjxy[4] + '&nbsp; ' + yj1 + jcrjxj[4];
    if (d == '执') jcrjxt = yj0 + jcrjxy[5] + '&nbsp; ' + yj1 + jcrjxj[5];
    if (d == '破') jcrjxt = yj0 + jcrjxy[6] + '&nbsp; ' + yj1 + jcrjxj[6];
    if (d == '危') jcrjxt = yj0 + jcrjxy[7] + '&nbsp; ' + yj1 + jcrjxj[7];
    if (d == '成') jcrjxt = yj0 + jcrjxy[8] + '&nbsp; ' + yj1 + jcrjxj[8];
    if (d == '收') jcrjxt = yj0 + jcrjxy[9] + '&nbsp; ' + yj1 + jcrjxj[9];
    if (d == '开') jcrjxt = yj0 + jcrjxy[10] + '&nbsp; ' + yj1 + jcrjxj[10];
    if (d == '闭') jcrjxt = yj0 + jcrjxy[11] + '&nbsp; ' + yj1 + jcrjxj[11];
    return(jcrjxt);
}

function jcr(d) {
    var jcrjx;
    if (d == '建') jcrjx = {y:jcrjxy[0], j:jcrjxj[0]};
    if (d == '除') jcrjx = {y:jcrjxy[1], j:jcrjxj[1]};
    if (d == '满') jcrjx = {y:jcrjxy[2], j:jcrjxj[2]};
    if (d == '平') jcrjx = {y:jcrjxy[3], j:jcrjxj[3]};
    if (d == '定') jcrjx = {y:jcrjxy[4], j:jcrjxj[4]};
    if (d == '执') jcrjx = {y:jcrjxy[5], j:jcrjxj[5]};
    if (d == '破') jcrjx = {y:jcrjxy[6], j:jcrjxj[6]};
    if (d == '危') jcrjx = {y:jcrjxy[7], j:jcrjxj[7]};
    if (d == '成') jcrjx = {y:jcrjxy[8], j:jcrjxj[8]};
    if (d == '收') jcrjx = {y:jcrjxy[9], j:jcrjxj[9]};
    if (d == '开') jcrjx = {y:jcrjxy[10], j:jcrjxj[10]};
    if (d == '闭') jcrjx = {y:jcrjxy[11], j:jcrjxj[11]};
    return(jcrjx);
}

function cyclical2(num, num2) {
    if (num == 0) return(jcName0[num2]);
    if (num == 1) return(jcName1[num2]);
    if (num == 2) return(jcName2[num2]);
    if (num == 3) return(jcName3[num2]);
    if (num == 4) return(jcName4[num2]);
    if (num == 5) return(jcName5[num2]);
    if (num == 6) return(jcName6[num2]);
    if (num == 7) return(jcName7[num2]);
    if (num == 8) return(jcName8[num2]);
    if (num == 9) return(jcName9[num2]);
    if (num == 10) return(jcName10[num2]);
    if (num == 11) return(jcName11[num2]);
}

function CalConv2(yy, mm, dd, y, d, m, dt, nm) {
    var dy = d + '' + dd
    if ((yy == 0 && dd == 6) || (yy == 6 && dd == 0) || (yy == 1 && dd == 7) || (yy == 7 && dd == 1) || (yy == 2 && dd == 8) || (yy == 8 && dd == 2) || (yy == 3 && dd == 9) || (yy == 9 && dd == 3) || (yy == 4 && dd == 10) || (yy == 10 && dd == 4) || (yy == 5 && dd == 11) || (yy == 11 && dd == 5)) {
        return '<FONT color="#0000A0">日值岁破 大事不宜</font>';
    }
    else if ((mm == 0 && dd == 6) || (mm == 6 && dd == 0) || (mm == 1 && dd == 7) || (mm == 7 && dd == 1) || (mm == 2 && dd == 8) || (mm == 8 && dd == 2) || (mm == 3 && dd == 9) || (mm == 9 && dd == 3) || (mm == 4 && dd == 10) || (mm == 10 && dd == 4) || (mm == 5 && dd == 11) || (mm == 11 && dd == 5)) {
        return '<FONT color="#0000A0">日值月破 大事不宜</font>';
    }
    else if ((y == 0 && dy == '911') || (y == 1 && dy == '55') || (y == 2 && dy == '111') || (y == 3 && dy == '75') || (y == 4 && dy == '311') || (y == 5 && dy == '95') || (y == 6 && dy == '511') || (y == 7 && dy == '15') || (y == 8 && dy == '711') || (y == 9 && dy == '35')) {
        return '<FONT color="#0000A0">日值上朔 大事不宜</font>';
    }
    else if ((m == 1 && dt == 13) || (m == 2 && dt == 11) || (m == 3 && dt == 9) || (m == 4 && dt == 7) || (m == 5 && dt == 5) || (m == 6 && dt == 3) || (m == 7 && dt == 1) || (m == 7 && dt == 29) || (m == 8 && dt == 27) || (m == 9 && dt == 25) || (m == 10 && dt == 23) || (m == 11 && dt == 21) || (m == 12 && dt == 19)) {
        return '<FONT color="#0000A0">日值杨公十三忌 大事不宜</font>';
    }
    else {
        return 0;
    }
}

/*****************************************************************************
日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
    return(sum+leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return( (lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29);
    else return(0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
    var lm = lunarInfo[y - 1900] & 0xf;
    return(lm == 0xf ? 0 : lm);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y,m) {
    return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}

//====================================== 算出农历, 传入日期控件, 返回农历日期控件, 该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {
    var i, leap=0, temp=0;
    var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
    for(i=1900; i<2100 && offset>0; i++) {
        temp=lYearDays(i);
        offset-=temp;
    }
    if(offset<0) {
        offset+=temp;
        i--;
    }
    this.year = i;
    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;
    for(i=1; i<13 && offset>0; i++) {
    //闰月
        if(leap>0 && i==(leap+1) && this.isLeap==false){
            --i;
            this.isLeap = true;
            temp = leapDays(this.year);
        }
        else{
            temp = monthDays(this.year, i);
        }
    //解除闰月
        if(this.isLeap==true && i==(leap+1)) this.isLeap = false;
        offset -= temp;
    }
    if(offset==0 && leap>0 && i==leap+1)
    if(this.isLeap){
        this.isLeap = false;
    }
    else{
        this.isLeap = true;
        --i;
    }
    if(offset<0){
        offset += temp;
        --i;
    }
    this.month = i;
    this.day = offset + 1;
}

//==============================返回公历 y年某m+1月的天数
function solarDays(y,m) {
    if(m==1)
    return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
    else
    return(solarMonth[m]);
}

//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return(Gan[num%10]+Zhi[num%12]);
}

//============================== 阴历属性
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {
    this.isToday = false;
    //瓣句
    this.sYear = sYear;    //公元年4位数字
    this.sMonth = sMonth;  //公元月数字
    this.sDay = sDay;      //公元日数字
    this.week = week;      //星期, 1个中文
    //农历
    this.lYear = lYear;    //公元年4位数字
    this.lMonth = lMonth;  //农历月数字
    this.lDay = lDay;      //农历日数字
    this.isLeap = isLeap;  //是否为农历闰月?
    //八字
    this.cYear = cYear;    //年柱, 2个中文
    this.cMonth = cMonth;  //月柱, 2个中文
    this.cDay = cDay;      //日柱, 2个中文
    this.color = '';
    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = '';    //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
    var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
    return(offDate.getUTCDate());
}

function cyclical3(num) {
   return(Gan1[num%10])
}

function cyclical4(num) {
   return(Gan2[num%12])
}

function calendar(y,m) {
    var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3, lM2, lY2, lD2, xs, fs, cs;
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    sDObj = new Date(y,m,1,0,0,0,0);    //当月一日日期
    this.length = solarDays(y,m);       //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几
    ////////年柱 1900年立春后为庚子年(60进制36)
    if(m<2) cY=cyclical(y-1900+36-1);
    else cY=cyclical(y-1900+36);
    var term2=sTerm(y,2); //立春日期
    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = sTerm(y,m*2) //返回当月「节」为几日开始
    cM = cyclical((y-1900)*12+m+12);
    lM2 = (y - 1900) * 12 + m + 12;
    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;
    for(var i=0;i<this.length;i++) {
        if(lD>lX) {
            sDObj = new Date(y,m,i+1);    //当月一日日期
            lDObj = new Lunar(sDObj);     //农历
            lY = lDObj.year;              //农历年
            lM = lDObj.month;             //农历月
            lD = lDObj.day;               //农历日
            lL = lDObj.isLeap;            //农历是否闰月
            lX = lL? leapDays(lY): monthDays(lY,lM); //农历当月最后一天
            if(n==0) firstLM = lM;
            lDPOS[n++] = i-lD+1;
        }
        //依节气调整二月分的年柱, 以立春为界
        if(m==1 && (i+1)==term2) {
            cY = cyclical(y - 1900 + 36);
            lY2 = (y - 1900 + 36);
        }
        //依节气月柱, 以「节」为界
        if((i+1)==firstNode) {
            cM = cyclical((y - 1900) * 12 + m + 13);
            lM2 = (y - 1900) * 12 + m + 13;
        }
        //日柱
        cD = cyclical(dayCyclical+i);
        lD2 = (dayCyclical + i);
        //sYear,sMonth,sDay,week,
        //lYear,lMonth,lDay,isLeap,
        //cYear,cMonth,cDay
        this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],lY, lM, lD++, lL,cY ,cM, cD );
        this[i].sgz5 = CalConv2(lY2 % 12, lM2 % 12, (lD2) % 12, lY2 % 10, (lD2) % 10, lM, lD - 1, m + 1);
        this[i].sgz3 = cyclical2(lM2 % 12, (lD2) % 12);
        this[i].dGz = cyclical3(lD2);
        this[i].sgz = cyclical4(lD2);
        //喜神、福神、财神位
        if((lD2)%10==0 || (lD2)%10==5){xs='东北';}
            else if((lD2)%10==1 || (lD2)%10==6){xs='西北';}
            else if((lD2)%10==2 || (lD2)%10==7){xs='西南';}
            else if((lD2)%10==3 || (lD2)%10==8){xs='正南';}
            else if((lD2)%10==4 || (lD2)%10==9){xs='东南';}
        if((lD2)%10==0 || (lD2)%10==1){fs='东南';}
            else if((lD2)%10==2 || (lD2)%10==3){fs='正东';}
            else if((lD2)%10==4){fs='正北';}
            else if((lD2)%10==5){fs='正南';}
            else if((lD2)%10==6 || (lD2)%10==7){fs='西南';}
            else if((lD2)%10==8){fs='西北';}
            else if((lD2)%10==9){fs='正西';}
        if((lD2)%10==0 || (lD2)%10==1){cs='东北';}
            else if((lD2)%10==2 || (lD2)%10==3){cs='西南';}
            else if((lD2)%10==4 || (lD2)%10==5){cs='正北';}
            else if((lD2)%10==6 || (lD2)%10==7){cs='正东';}
            else if((lD2)%10==8 || (lD2)%10==9){cs='正南';}
        this[i].xsfw ='<font color="#800080">\u25C7喜神：</font>'+xs;
        this[i].fsfw ='<font color="#800080">\u25C7福神：</font>'+fs;
        this[i].csfw ='<font color="#800080">\u25C7财神：</font>'+cs;
    }

    //今日
    if(y==tY && m==tM) this[tD-1].isToday = true;
}

//====================== 中文日期
function cDay(d){
    var s;
    switch (d) {
        case 10: s = '初十'; break;
        case 20: s = '二十'; break;
        case 30: s = '三十'; break;
        break;
        default :
            s = nStr2[Math.floor(d/10)];
            s += nStr1[d%10];
    }
    return(s);
}

///////////////////////////////////////////////////////////////////////////////
var cld,SCT,SCTS,SJT,RCT;
var rymdwT,rfromtdT,rdateT,rnlwT,rjznT,rjryjT,rjyT;
function drawCld(SY,SM) {
    var sD, yj, cld = new calendar(SY,SM);
    for(i=0;i<42;i++) {
        sD = i - cld.firstWeek;
        if(sD>-1 && sD<cld.length) {
            if(cld[sD].isToday) { break; }
        }
    }

    yj = jcr(cld[sD].sgz3);

    return {
        yi : yj.y,
        ji : yj.j,
        y  : cld[sD].sYear,
        m  : cld[sD].sMonth,
        d  : cld[sD].sDay,
        w  : cld[sD].week,
        nm : '农历'+(cld[sD].isLeap?'&nbsp;闰':'&nbsp;')+FormatLunarMonth(cld[sD].lMonth)+'月',
        nd : FormatLunarDay(cld[sD].lDay),
        gy : cld[sD].cYear,
        gm : cld[sD].cMonth,
        gd : cld[sD].cDay,
        sx : Animals[(SY-4)%12]
    };
}

var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();

//////////////////////////////////////////////////////////////////////////////

// 将农历iLunarMonth月格式化成农历表示的字符串
function FormatLunarMonth(iLunarMonth) {
    var szText = new String("正二三四五六七八九十冬腊");
    var strMonth = szText.substr(iLunarMonth - 1, 1);
    return strMonth;
}

// 将农历iLunarDay日格式化成农历表示的字符串
function FormatLunarDay(iLunarDay) {
    var szText1 = new String("初十廿三");
    var szText2 = new String("一二三四五六七八九十");
    var strDay;
    if ((iLunarDay != 20) && (iLunarDay != 30)) {
        strDay = szText1.substr((iLunarDay - 1) / 10, 1) + szText2.substr((iLunarDay - 1) % 10, 1);
    }
    else if (iLunarDay != 20) {
        strDay = szText1.substr(iLunarDay / 10, 1) + "十";
    }
    else {
        strDay = "二十";
    }
    return strDay;
}

window.calendar = drawCld(tY,tM);
