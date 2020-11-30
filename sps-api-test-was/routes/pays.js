const express = require('express');
const axios = require("axios");
const router = express.Router();

// Check every empty condtion
const isAllEmpty = (value) => {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

const makingRandomHistory = () => {
    const test = {
        "CardAthzNo": "40927800", // 카드승인번호
        "Trdd": "20191105", // 거래일자
        "Txtm": "154038", // 거래시각
        "Usam": "100", // 이용금액 
        "AfstNoBrno": "2936400278", // 가맹점사업자등록번호 
        "AfstNo": "146862942", // 가맹점번호
        "AfstNm": "박찬늘", // 가맹점명
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
    const tempJson = {
        "Header": {
            "ApiNm": "InquireCorporationCardAuthorizationHistory",
            "Tsymd": "20201201",
            "Trtm": "111045",
            "Iscd": "000510",
            "FintechApsno": "001",
            "ApiSvcCd": "CardInfo",
            "IsTuno": "201510140000000001",
            "Rpcd": "00000",
            "Rsms ": "정상처리되었습니다"
        },
        "PageNo": "1",
        "Dmcnt": "15",
        "CtntDataYn": "N",
        "TotCnt": "15", // 총건수
        "Iqtcnt": "15", // 조회총건수
        "REC": [
            {
                "CardAthzNo": "40927800", // 카드승인번호
                "Trdd": "20191105", // 거래일자
                "Txtm": "154038", // 거래시각
                "Usam": "100", // 이용금액 
                "AfstNoBrno": "2936400278", // 가맹점사업자등록번호 
                "AfstNo": "146862942", // 가맹점번호
                "AfstNm": "박찬늘", // 가맹점명
                "AmslKnd": "1", // 매출종류 / 1:일시불 2:할부 3:현금서비스 6:해외일시불 7:해외할부 8:해외현금서비스
                "Tris": "00", // 할부기간
                "Ccyn": "0", // 취소여부
                "CnclYmd": "", // 취소일자
                "Crcd": "", // 통화코드
                "AcplUsam": "" // 현지이용금액
            },
            {
                "CardAthzNo": "41111111",
                "Trdd": "20191107",
                "Txtm": "123100",
                "Usam": "18100",
                "AfstNoBrno": "2936400279",
                "AfstNo": "146862943",
                "AfstNm": "교촌치킨",
                "AmslKnd": "1",
                "Tris": "00",
                "Ccyn": "0",
                "CnclYmd": "",
                "Crcd": "",
                "AcplUsam": ""
            },
            {
                "CardAthzNo": "41111112",
                "Trdd": "20191108",
                "Txtm": "124450",
                "Usam": "36000",
                "AfstNoBrno": "2936400280",
                "AfstNo": "146862944",
                "AfstNm": "도미노피자",
                "AmslKnd": "1",
                "Tris": "00",
                "Ccyn": "0",
                "CnclYmd": "",
                "Crcd": "",
                "AcplUsam": ""
            },
            {
                "CardAthzNo": "41111113",
                "Trdd": "20191108",
                "Txtm": "193000",
                "Usam": "100000",
                "AfstNoBrno": "2936400281",
                "AfstNo": "146862945",
                "AfstNm": "새마을식당",
                "AmslKnd": "1",
                "Tris": "00",
                "Ccyn": "0",
                "CnclYmd": "",
                "Crcd": "",
                "AcplUsam": ""
            },
            {
                "CardAthzNo": "41111114",
                "Trdd": "20191109",
                "Txtm": "113000",
                "Usam": "5100",
                "AfstNoBrno": "2936400282",
                "AfstNo": "146862946",
                "AfstNm": "홍루이젠",
                "AmslKnd": "1",
                "Tris": "00",
                "Ccyn": "0",
                "CnclYmd": "",
                "Crcd": "",
                "AcplUsam": ""
            },
            {
                "CardAthzNo": "41111115",
                "Trdd": "20191109",
                "Txtm": "182000",
                "Usam": "6000",
                "AfstNoBrno": "2936400283",
                "AfstNo": "146862947",
                "AfstNm": "할머니국밥",
                "AmslKnd": "1",
                "Tris": "00",
                "Ccyn": "0",
                "CnclYmd": "",
                "Crcd": "",
                "AcplUsam": ""
            }
        ]
    };
    res.json(tempJson);
});


module.exports = router;
