CREATE DATABASE library;
#DROP DATABASE library;
ALTER USER 'root'@'localhost' identified with mysql_native_password by 'root';

USE library;
CREATE TABLE IF NOT EXISTS `library`.`author`(7
	AId VARCHAR(6) PRIMARY KEY NOT NULL UNIQUE,
    AName VARCHAR(30),
    ABirth DATE CHECK (ABirth LIKE '____-__-__')
);

CREATE TABLE IF NOT EXISTS `library`.`book`(
	ISBNCode VARCHAR(13) PRIMARY KEY NOT NULL UNIQUE,
    Title VARCHAR(30),
    Publisher VARCHAR(30),
    Year INT,
    NumPage INT
);

CREATE TABLE IF NOT EXISTS `library`.`write`(
	AId VARCHAR(6) NOT NULL,
    ISBNCode VARCHAR(13) NOT NULL,
    PRIMARY KEY(AId, ISBNCode),
    FOREIGN KEY(AId) REFERENCES `library`.`author`(AId),
    FOREIGN KEY(ISBNCode) REFERENCES `library`.`book`(ISBNCode)
);

CREATE TABLE IF NOT EXISTS `library`.`branch`(
	BId VARCHAR(7) NOT NULL UNIQUE PRIMARY KEY,
    BName VARCHAR(25),
    BAddress VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS `library`.`book_copy`(
	ISBNCode VARCHAR(13) NOT NULL,
    CopyNumber INT NOT NULL UNIQUE,
    BId VARCHAR(7),
    PRIMARY KEY(ISBNCode, CopyNumber),
    FOREIGN KEY(ISBNCode) REFERENCES `library`.`book`(ISBNCode),
    FOREIGN KEY(BId) REFERENCES `library`.`branch`(BId)
);

CREATE TABLE IF NOT EXISTS `library`.`journal`(
	ISBNCode VARCHAR(13) NOT NULL PRIMARY KEY,
    PublishDate DATE CHECK (PublishDate LIKE '____-__-__'),
    FOREIGN KEY(ISBNCode) REFERENCES `library`.`book`(ISBNCode)
);

CREATE TABLE IF NOT EXISTS `library`.`educational`(
	ISBNCode VARCHAR(13) NOT NULL PRIMARY KEY,
    EduLevel VARCHAR(10),
    Refer VARCHAR(20),
    FOREIGN KEY(ISBNCode) REFERENCES `library`.`book`(ISBNCode)
);

CREATE TABLE IF NOT EXISTS `library`.`subject`(
	ISBNCode VARCHAR(13) NOT NULL PRIMARY KEY,
    Subject VARCHAR(15),
    FOREIGN KEY(ISBNCode) REFERENCES `library`.`educational`(ISBNCode)
);

CREATE TABLE IF NOT EXISTS `library`.`fiction`(
	ISBNCode VARCHAR(13) NOT NULL PRIMARY KEY,
    FOREIGN KEY(ISBNCode) REFERENCES `library`.`book`(ISBNCode) 
);

CREATE TABLE IF NOT EXISTS `library`.`genre`(
	ISBNCode VARCHAR(13) NOT NULL,
    Genre VARCHAR(15),
    PRIMARY KEY(ISBNCode, Genre),
    FOREIGN KEY(ISBNCode) REFERENCES `library`.`fiction`(ISBNCode) 
);

CREATE TABLE IF NOT EXISTS `library`.`admin`(
	UId VARCHAR(10) NOT NULL PRIMARY KEY,
    UName VARCHAR(25),
    UBirth DATE CHECK (UBirth LIKE '____-__-__'),
    UAddress VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS `library`.`librarian`(
	UId VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
    UName VARCHAR(25),
    UBirth DATE CHECK (UBirth LIKE '____-__-__'),
    UAddress VARCHAR(50),
	BId VARCHAR(7),
	FOREIGN KEY(BId) REFERENCES `library`.`branch`(BId)
);

CREATE TABLE IF NOT EXISTS `library`.`customer`(
	UId VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
    UName VARCHAR(25),
    UBirth DATE,
    UAddress VARCHAR(50),
    Instistuion VARCHAR(15),
    Phone INT
);

CREATE TABLE IF NOT EXISTS `library`.`record`(
	RId VARCHAR(20) NOT NULL UNIQUE,
    ISBNCode VARCHAR(13),
    CopyNumber INT,
    BDate DATE CHECK (BDate LIKE '____-__-__'),
    RDate DATE CHECK (RDate LIKE '____-__-__'),
    DueDate DATE CHECK (DueDate LIKE '____-__-__'), 
    UId VARCHAR(10) NOT NULL,
    PRIMARY KEY(RId, ISBNCode, CopyNumber),
	FOREIGN KEY(ISBNCode, CopyNumber) REFERENCES `library`.`book_copy`(ISBNCode, CopyNumber),
	FOREIGN KEY(UId) REFERENCES `library`.`customer`(UId)
);

DROP DATABASE library;

SELECT * FROM `library`.admin;
SELECT * FROM `library`.author;
SELECT * FROM `library`.book;
SELECT * FROM `library`.book_copy;
SELECT * FROM `library`.branch;
SELECT * FROM `library`.customer;
SELECT * FROM `library`.educational;
SELECT * FROM `library`.fiction;
SELECT * FROM `library`.genre;
SELECT * FROM `library`.journal;
SELECT * FROM `library`.librarian;
SELECT * FROM `library`.record;
SELECT * FROM `library`.subject;
SELECT * FROM `library`.`write`;

-- Insert admin
INSERT INTO `library`.admin
VALUES('a', 'Allison', '1999-07-18', 'street a'),
('b', 'Brooke', '2000-12-01', 'street b'),
('c', 'Scarlet', '1984-07-21', 'street c'),
('d', 'Teddy', '1983-10-02', 'street d'),
('e', 'Mohamed', '1999-02-17', 'street e')
;

-- Insert author
INSERT INTO `library`.author
VALUES('a1', 'Allison', '1997-08-17'),
('b1', 'Brooke', '2001-01-12'),
('c1', 'Scarlet', '1987-09-23'),
('d1', 'Teddy', '1993-11-05'),
('e1', 'Mohamed', '1997-04-15')
;

-- Insert book
INSERT INTO `library`.book
VALUES('9781234567897', 'The philosopher\'s stone', 'A', 1999, 1000),
('9781234567123', 'Chamber of Secrets', 'B', 2002, 1020),
('9781233486897', 'Prisoner of Azkaban', 'C', 2004, 1030),
('9781234566428', 'Goblet of Fire', 'D', 2005, 1050),
('9781234569845', 'Order of the Phoenix', 'E', 2007, 1203)
;

-- Insert fiction
INSERT INTO `library`.fiction
VALUES('1234567891234');

INSERT INTO `library`.fiction
VALUES('9781234567897'),
('9781234567123'),
('9781233486897'),
('9781234566428'),
('9781234569845');

INSERT INTO `library`.genre
VALUES('9781234567897','Adventure'),
('9781234567897','Teenage'),
('9781234567123','Adventure'),
('9781234567123','Teenage');

UPDATE `library`.book
SET Title = 'The philosopher stone'
WHERE ISBNCode = '9781234567897';

SELECT * FROM `library`.book
ORDER BY Publisher;

INSERT INTO `library`.book
VALUES('9781234567897', 'The philosopher\'s stone', 'A', 1999, 1000);

CREATE USER 'customer1'@'localhost' IDENTIFIED BY 'user_password';
GRANT SELECT ON `library`.* TO 'customer1'@'localhost';

CREATE USER 'librarian1'@'localhost' IDENTIFIED BY 'lib_password';
GRANT SELECT ON `library`.* TO 'librarian1'@'localhost';
GRANT INSERT ON `library`.* TO 'librarian1'@'localhost';