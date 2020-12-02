
/* [프로시저] 디비 관리 유저 생성 ->  DB 생성 -> 유저에 권한 부여 */
DROP DATABASE IF EXISTS  spsProject;
DROP USER IF EXISTS  spsProject@localhost;
create user spsProject@localhost identified WITH mysql_native_password  by 'spsProject';
create database spsProject;
grant all privileges on spsProject.* to spsProject@localhost with grant option;
commit;

USE spsProject;

CREATE TABLE IF NOT EXISTS `customers` (
  id          int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email       varchar(255) NOT NULL,
  name        varchar(255) NOT NULL,
  active      BOOLEAN DEFAULT false,
  created_at  DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  users (
  id      	    VARCHAR(40) NOT NULL PRIMARY KEY,
  password 	    VARCHAR(100),
  name          VARCHAR(40),
  birthday      VARCHAR(20), -- /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/
  gender        TINYINT,
  login_type    VARCHAR(40),
  fin_account   VARCHAR(255),
  created_at    DATE,
  updated_at    DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  user_cards (
  id      	    VARCHAR(40) NOT NULL PRIMARY KEY,
  user_id 	    VARCHAR(100),
  name          VARCHAR(40),
  fin_card      VARCHAR(255),
  created_at    DATE,
  updated_at    DATE,
  FOREIGN KEY ( user_id ) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- CREATE TABLE  report (
--   id      	   		  INTEGER auto_increment PRIMARY KEY,  
--   report_comment      VARCHAR(300),
--   report_user_id      VARCHAR(100),
--   reported_user_id    VARCHAR(100),
--   report_review_id	  VARCHAR(60),
--   reported_date		  DATE,
--   reported_clear_date DATE,
--   FOREIGN KEY (report_user_id) REFERENCES users(id),
--   FOREIGN KEY (reported_user_id) REFERENCES users(id),
--   FOREIGN KEY (report_review_id) REFERENCES reviews(id)
-- );
