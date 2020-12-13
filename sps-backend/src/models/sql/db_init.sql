
/* [프로시저] 디비 관리 유저 생성 ->  DB 생성 -> 유저에 권한 부여 */
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '루트비밀번호';

DROP DATABASE IF EXISTS  spsProject;
DROP USER IF EXISTS  spsProject@localhost;
create user spsProject@localhost identified WITH mysql_native_password  by 'spsProject';
create database spsProject;
grant all privileges on spsProject.* to spsProject@localhost with grant option;
commit;

USE spsProject;

-- "TEST DATA BASE"
-- CREATE TABLE IF NOT EXISTS `customers` (
--   id          int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   email       varchar(255) NOT NULL,
--   name        varchar(255) NOT NULL,
--   active      BOOLEAN DEFAULT false,
--   created_at  DATE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  users (
  id      	    VARCHAR(40) NOT NULL PRIMARY KEY,
  password 	    VARCHAR(100),
  name          VARCHAR(40),
  birthday      VARCHAR(20), 
  gender        TINYINT,
  login_type    VARCHAR(40),
  fin_account   VARCHAR(255),
  family        TINYINT UNSIGNED,
  budget        INT UNSIGNED,
  created_at    DATE,
  updated_at    DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  user_cards (
  id      	    VARCHAR(40) NOT NULL PRIMARY KEY,
  user_id 	    VARCHAR(40) NOT NULL,
  name          VARCHAR(40),
  fin_card      VARCHAR(255),
  created_at    DATE,
  updated_at    DATE,
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  user_payment_history (
  id      	    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id 	    VARCHAR(40) NOT NULL,
  card_id       VARCHAR(40) NOT NULL,
  CardAthzNo    VARCHAR(30) NOT NULL,
  Trdd          DATE,
  Txtm          TIME,
  Usam          VARCHAR(30),
  AfstNoBrno    VARCHAR(20),
  AfstNo        VARCHAR(30), 
  AfstNm        VARCHAR(100),
  AmslKnd       VARCHAR(2),
  Tris          VARCHAR(2),
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY ( card_id ) REFERENCES user_cards(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  user_payments (
  id      	    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id 	    VARCHAR(40) NOT NULL,
  card_id       VARCHAR(40) NOT NULL,
  CardAthzNo    VARCHAR(30) NOT NULL,
  Trdd          DATE,
  Txtm          TIME,
  Usam          VARCHAR(30),
  AfstNoBrno    VARCHAR(20),
  AfstNo        VARCHAR(30),
  AfstNm        VARCHAR(100),
  AmslKnd       VARCHAR(2),
  Tris          VARCHAR(2),
  category      VARCHAR(10),
  created_at    DATE,
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY ( card_id ) REFERENCES user_cards(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE same_cluster_user(
  user_id        VARCHAR(40) NOT NULL,
  user_id_same        VARCHAR(40) NOT NULL,
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  sns_boards (
  id      	    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id 	    VARCHAR(40) NOT NULL,
  title         VARCHAR(40),
  content       TEXT,
  great          INT(4) UNSIGNED,
  disgreat       INT(4) UNSIGNED,
  tags          VARCHAR(40),  
  created_at    DATE,
  updated_at    DATE,
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE  sns_board_likes (
  id      	    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id 	    VARCHAR(40) NOT NULL,
  board_id      INT NOT NULL,  
  created_at    DATE,
  updated_at    DATE,
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY ( board_id ) REFERENCES sns_boards(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  sns_board_comments (
  id      	    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id 	    VARCHAR(40) NOT NULL,
  board_id      INT NOT NULL,  
  content       TEXT,
  created_at    DATE,
  updated_at    DATE,
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY ( board_id ) REFERENCES sns_boards(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;