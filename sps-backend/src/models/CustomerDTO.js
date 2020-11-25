'user strict';

// Task object constructor
const Customer = function (customer) { // 대상자 (수혜자)
    /*
    id          int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email       varchar(255) NOT NULL,
    name        varchar(255) NOT NULL,
    active      BOOLEAN DEFAULT false,
    created_at  DATE
    */

    this.id = customer.id; 
    this.email = customer.email; 
    this.name = customer.name;
    this.active = customer.active;
    this.created_at = new Date(); // 생성된 날짜
};

module.exports = Customer;