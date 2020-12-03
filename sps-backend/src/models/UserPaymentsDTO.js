'user strict';

// Task object constructor
const UserPayment = function (user_id, card_id, user_payment, isHistory = true) {
    /*
    id      	  VARCHAR(40) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id 	  VARCHAR(40),
    card_id       VARCHAR(40) NOT NULL,
    CardAthzNo    VARCHAR(30) NOT NULL,
    Trdd          DATE,
    Txtm          TIME,
    Usam          VARCHAR(30),
    AfstNoBrno    VARCHAR(20),
    AfstNo        VARCHAR(30), -- 가맹점 번호 
    AfstNm        VARCHAR(100), -- 가맹점 명 
    AmslKnd       VARCHAR(2),
    Tris          VARCHAR(2),

    // not for payment histroy
    category      VARCHAR(10),
    created_at    DATE,
    */
    // this.id = user_card.id; - auto increment
    if (isHistory) {
        this.user_id = user_id;
        this.card_id = card_id;
        this.CardAthzNo = user_payment.CardAthzNo;
        this.Trdd = user_payment.Trdd; // DATE 임 명심
        this.Txtm = user_payment.Txtm; // TIME 임 명심
        this.Usam = user_payment.Usam; // 이용금액
        this.AfstNoBrno = user_payment.AfstNoBrno;
        this.AfstNo = user_payment.AfstNo;
        this.AfstNm = user_payment.AfstNm;
        this.AmslKnd = user_payment.AmslKnd;
        this.Tris = user_payment.Tris;
    }
    else {
        this.user_id = user_id;
        this.card_id = card_id;
        this.CardAthzNo = user_payment.CardAthzNo;
        this.Trdd = user_payment.Trdd; // DATE 임 명심
        this.Txtm = user_payment.Txtm; // TIME 임 명심
        this.Usam = user_payment.Usam; // 이용금액
        this.AfstNoBrno = user_payment.AfstNoBrno;
        this.AfstNo = user_payment.AfstNo;
        this.AfstNm = user_payment.AfstNm;
        this.AmslKnd = user_payment.AmslKnd;
        this.Tris = user_payment.Tris;
        this.category = user_payment.category;
        this.created_at = new Date().toJSON().slice(0, 19).replace('T', ' ');
    }
};

module.exports = UserPayment;