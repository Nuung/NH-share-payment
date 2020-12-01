'use strict';
const express = require('express');
const axios = require("axios");
const router = express.Router();
const excelToJson = require('convert-excel-to-json');
const zeroList = excelToJson({ sourceFile: __dirname + '/zeropay.xlsx' })["Sheet1"]; // zero pay result xlsx
console.log(zeroList);

// Check every empty condtion
const isAllEmpty = (value) => {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

const parseDate = (str) => {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
    return new Date(y,m,d);
}

// random data
const randomDate = (start, end) => {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
}

// Add a leading 0 if the number is less than 10
const pad = ((number) => ((number < 10) ? "0" : "") + number.toString());

// Generate random minute in the day (1440 minutes in 24h)
const randomTime = () => {
    let r = Math.floor(Math.random() * 1440);
    let HH = pad(1 + (Math.floor(r / 60) % 12));
    let MM = pad(r % 60);
    return HH + "" + MM + "" + Math.floor(Math.random() * 100);
}

// 카드 승인 내역 fake datas
const makingRandomHistory = (startDate, endDate, randomStoreName) => {
    return {
        "CardAthzNo": Math.floor(Math.random() * (50000000 - 10000000) + 10000000), // 카드승인번호 ✅
        "Trdd": randomDate(parseDate(startDate), parseDate(endDate)), // 거래일자 ✅
        "Txtm": randomTime(), // 거래시각 ✅
        "Usam": Math.floor(Math.random() * 10000 + "00"), // 이용금액 ✅
        "AfstNoBrno": Math.floor(Math.random() * (300000000 - 100000000) + 100000000), // 가맹점사업자등록번호 ✅
        "AfstNo": Math.floor(Math.random() * (200000000 - 100000000) + 100000000), // 가맹점번호 ✅
        "AfstNm": randomStoreName['D'], // 가맹점명 ✅
        "AmslKnd": "1", // 매출종류 / 1:일시불 2:할부 3:현금서비스 6:해외일시불 7:해외할부 8:해외현금서비스
        "Tris": "00", // 할부기간
        "Ccyn": "0", // 취소여부
        "CnclYmd": "", // 취소일자
        "Crcd": "", // 통화코드
        "AcplUsam": "" // 현지이용금액
    }
}

//────────────────────────────────────────────────────────────────────────────────────────────//

// 거래 내역 조회
router.get('/', function (req, res, next) {
    res.render('simplepay');
});

// 카드 승인 내역 조회 
router.get('/card', function (req, res, next) {
    res.render('card');
});

router.post('/card', function (req, res, next) {

    console.log(req.body);
    // ------ Body vlaue chaeck
    if (req.body == null || isAllEmpty(req.body)) {
        const errorMessage = '리퀘스트 바디 값 체크'
        return res.status(400).json({ errorMessage })
    }

    if (isAllEmpty(req.body.Insymd) || isAllEmpty(req.body.Ineymd) || isAllEmpty(req.body.Dmcnt)) {
        const errorMessage = '시작날 / 끝날 / 카운트 값 체크'
        return res.status(400).json({ errorMessage })
    }

    // ------ Make Random Store Name List
    const startDate = req.body.Insymd; // for date random values
    const endDate = req.body.Ineymd;

    let REC = [];
    for (let i = 0; i < req.body.Dmcnt; i++) {
        try {
            const randomIndex = Math.floor(Math.random() * zeroList.length);
            REC.push(makingRandomHistory(startDate, endDate, zeroList[randomIndex]));            
        } catch (error) {
            console.log(error);
        }
    }


    // ------ Make Result JSON
    const resultJson = {
        "Header": {
            "ApiNm": req.body.Header['ApiNm'],
            "Tsymd": req.body.Header['Tsymd'],
            "Trtm": req.body.Header['Trtm'],
            "Iscd": req.body.Header['Iscd'],
            "FintechApsno": req.body.Header['FintechApsno'],
            "ApiSvcCd": req.body.Header['ApiSvcCd'],
            "IsTuno": req.body.Header['IsTuno'],
            "Rpcd": "00000",
            "Rsms ": "정상처리되었습니다"
        },
        "PageNo": "1",
        "Dmcnt": req.body.Dmcnt,
        "CtntDataYn": "N",
        "TotCnt": req.body.Dmcnt, // 총건수
        "Iqtcnt": req.body.Dmcnt, // 조회총건수
        "REC": REC
    };
    res.status(201).json(resultJson);
});


module.exports = router;
