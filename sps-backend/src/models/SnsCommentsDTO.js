'user strict';

// Task object constructor
const SnsComment = function (sns_comment, isUpdate = false) {
    /*
    id      	    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id 	    VARCHAR(40) NOT NULL,
    board_id        INT NOT NULL,  
    content         TEXT,
    created_at      DATE,
    updated_at      DATE,
    */
    if(!isUpdate) { // created First and not a update
        // this.id = sns_comment.id;
        this.user_id = sns_comment.user_id;
        this.board_id = sns_comment.board_id;
        this.content = sns_comment.content;
        this.created_at = new Date().toJSON().slice(0, 19).replace('T', ' ');
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' ');
    }
    else {
        // this.id = sns_comment.id;
        this.user_id = sns_comment.user_id;
        this.board_id = sns_comment.board_id;
        this.content = sns_comment.content;
        this.updated_at = new Date().toJSON().slice(0, 19).replace('T', ' ');
    }
};

module.exports = SnsComment;