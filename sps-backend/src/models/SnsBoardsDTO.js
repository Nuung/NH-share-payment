'user strict';

// Task object constructor
const SnsBoard = function (sns_board, isUpdate = false) {
    /*
    id      	    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id 	    VARCHAR(40) NOT NULL,
    title           VARCHAR(40),
    content         TEXT,
    great           INT(4) UNSIGNED,
    disgreat        INT(4) UNSIGNED,
    tags            VARCHAR(40),  
    created_at      DATE,
    updated_at      DATE,
    */
    if(!isUpdate) { // created First and not a update
        this.id = sns_board.id;
        this.user_id = sns_board.user_id;
        this.title = sns_board.title;
        this.content = sns_board.content;
        this.great = sns_board.great;
        this.disgreat = sns_board.disgreat;
        this.tags = sns_board.tags;
        this.created_at = new Date().toJSON().slice(0, 19).replace('T', ' ');
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' ');
    }
    else {
        this.id = sns_board.id;
        this.user_id = sns_board.user_id;
        this.title = sns_board.title;
        this.content = sns_board.content;
        this.great = sns_board.great;
        this.disgreat = sns_board.disgreat;
        this.tags = sns_board.tags;
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' ');
    }
};

module.exports = UserPayment;