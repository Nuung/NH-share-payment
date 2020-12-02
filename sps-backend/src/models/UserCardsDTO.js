'user strict';

// Task object constructor
const UserCard = function (user_card, isUpdate = false) { // 대상자 (수혜자)
    /*
    id      	    VARCHAR(40) NOT NULL PRIMARY KEY,
    user_id 	    VARCHAR(100),
    name            VARCHAR(40),
    fin_card        VARCHAR(255),
    created_at      DATE,
    updated_at      DATE,
    */

    if(Object.keys(user).length < 4) throw new Error("Check the number of value types");
    if (!isUpdate) {
        this.id = user_card.id; 
        this.user_id = user_card.user_id; 
        this.name = user_card.name;
        this.fin_card = user_card.fin_card;
        this.created_at = new Date().toJSON().slice(0, 19).replace('T', ' '); // 생성된 날짜
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' '); // 초기 생성될땐 생성 날짜와 동일하게         
    }
    else {
        this.id = user_card.id; 
        this.user_id = user_card.user_id; 
        this.name = user_card.name;
        this.fin_card = user_card.fin_card;
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' '); // 초기 생성될땐 생성 날짜와 동일하게                 
    }
};

module.exports = UserCard;