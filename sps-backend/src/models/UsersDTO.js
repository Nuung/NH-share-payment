'user strict';

// Task object constructor
const User = function (user, isUpdate = false) { // 대상자 (수혜자)
    /*
    id      	    VARCHAR(40) NOT NULL PRIMARY KEY,
    password 	    VARCHAR(100),
    name          VARCHAR(40),
    birthday      VARCHAR(20), -- /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/
    gender        TINYINT,
    login_type    VARCHAR(40)
    fin_account   VARCHAR(300)
    created_at    DATE,
    updated_at    DATE,
    */

    if(Object.keys(user).length < 6) throw new Error("Check the number of user types");
    if (!isUpdate) {
        this.id = user.id; 
        this.password = user.password; 
        this.name = user.name;
        this.birthday = user.birthday;
        this.gender = user.gender;
        this.login_type = user.login_type;
        this.fin_account = user.fin_account;
        this.created_at = new Date().toJSON().slice(0, 19).replace('T', ' '); // 생성된 날짜
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' '); // 초기 생성될땐 생성 날짜와 동일하게         
    }
    else {
        this.id = user.id; 
        this.password = user.password; 
        this.name = user.name;
        this.birthday = user.birthday;
        this.gender = user.gender;
        this.login_type = user.login_type;
        this.fin_account = user.fin_account;
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' '); // 초기 생성될땐 생성 날짜와 동일하게                 
    }
};

module.exports = User;