CREATE DATABASE library;
#DROP DATABASE library;
ALTER USER 'root'@'localhost' identified with mysql_native_password by 'root';

USE library;
CREATE TABLE IF NOT EXISTS `library`.`author`(
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
    CopyNumber INT NOT NULL,
    BId VARCHAR(7),
    Available INT,
    PRIMARY KEY(ISBNCode, CopyNumber),
    CONSTRAINT fk_bcopy_book FOREIGN KEY(ISBNCode) REFERENCES `library`.`book`(ISBNCode) ON DELETE CASCADE,
    CONSTRAINT fk_bcopy_branch FOREIGN KEY(BId) REFERENCES `library`.`branch`(BId) ON DELETE SET NULL
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
	ISBNCode VARCHAR(13) NOT NULL,
    `Subject` VARCHAR(15),
	PRIMARY KEY (ISBNCode, `Subject`),
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
	CONSTRAINT fk_record_bcopy FOREIGN KEY(ISBNCode, CopyNumber) REFERENCES `library`.`book_copy`(ISBNCode, CopyNumber) ON DELETE CASCADE,
	CONSTRAINT fk_record_customer FOREIGN KEY(UId) REFERENCES `library`.`customer`(UId) ON DELETE CASCADE
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
SELECT * FROM `library`.`subject`;
SELECT * FROM `library`.`write`;

-- Insert admin
INSERT INTO `library`.admin
VALUES('a', 'Allison', '1999-07-18', 'street a'),
('b', 'Brooke', '2000-12-01', 'street b'),
('c', 'Scarlet', '1984-07-21', 'street c'),
('d', 'Teddy', '1983-10-02', 'street d'),
('e', 'Mohamed', '1999-02-17', 'street e')
;

-- Insert customer 
INSERT INTO `library`.customer
VALUES('c1', 'Khanh Tran', '2000-10-10', 'HCM', 'HCMUT', 120120120),
('c2', 'An Le', '2000-11-11', 'Avenue St., HCM', 'HCMUT', 97213145),
('c3', 'Michael Lytorhiss', '1984-01-03', 'New Rd., NYC', NULL, 22131565),
('c4', 'John Doe', '1992-10-03', 'Lorem Ipsum, Dolor', 'UAEU', NULL)
;

-- Insert branches
INSERT INTO `library`.branch
VALUES('b1', 'Center Library', '10 DVA St., Dist. 1'),
('b2', 'Maple Downtown', '213 Maple St., Dist. Canon'),
('b3', 'National Univ. Library', '1 George W. James St., Dist. 9')
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

INSERT INTO `library`.book_copy
VALUES('9781234567897', 1, 'b1', 1),
('9781234567897', 2, 'b1', 1),
('9781234567897', 3, 'b3', 1),
('9781234567123', 1, 'b1', 1),
('9781234567123', 2, 'b2', 1),
('9781233486897', 1, 'b1', 1),
('9781234566428', 1, 'b1', 1),
('9781234566428', 2, 'b1', 0)
;

-- Insert write 
INSERT INTO `library`.`write`
VALUES('a1', '9781234567897'),
('b1', '9781234567897'),
('b1', '9781234566428'),
('b1', '9781234569845'),
('c1', '9781234566428'),
('d1', '9781234566428');

-- Insert fiction
INSERT INTO `library`.fiction
VALUES('9781234567897'),
('9781234567123'),
('9781233486897'),
('9781234566428'),
('9781234569845');

-- Insert some genres
INSERT INTO `library`.genre
VALUES('9781234567897','Adventure'),
('9781234567897','Teenage'),
('9781234567123','Adventure'),
('9781234567123','Teenage');

-- Insert in other categories	
INSERT INTO `library`.educational 
VALUES ('9781234567897', 'Secondary', 'UK'),
('9781234569845', 'Research', 'US')
;

INSERT INTO `library`.`subject`
VALUES ('9781234567897', 'Literature'),
('9781234567897', 'Chemistry'),
('9781234569845', 'Philosophy');

INSERT INTO `library`.journal 
VALUE ('9781234566428', '1999-12-12');

-- Update book
UPDATE `library`.book
SET Title = 'The philosopher stone'
WHERE ISBNCode = '9781234567897';

SELECT * FROM `library`.book
ORDER BY Publisher;

-- ################################################################################################################## --
-- Tuning and manipulation

-- Create View bookview (for general book list)
CREATE OR REPLACE VIEW bookview AS SELECT b.ISBNCode, b.Title, b.Publisher, b.Year, b.NumPage, GROUP_CONCAT(a.AName) AS `Authors`
	FROM `library`.book b 
    LEFT JOIN `library`.`write` w ON b.ISBNCode = w.ISBNCode 
    LEFT JOIN `library`.author a ON w.AId = a.AId
    GROUP BY b.ISBNCode;

SELECT * FROM bookview;

-- Subview for different types of book
CREATE OR REPLACE VIEW fictionview 
AS SELECT b.ISBNCode, b.Title, b.Publisher, b.Year, b.NumPage, b.Authors, GROUP_CONCAT(g.Genre) AS Genres
	FROM bookview b
    JOIN `library`.fiction f ON b.ISBNCode = f.ISBNCode
    LEFT JOIN `library`.genre g ON f.ISBNCode = g.ISBNCode GROUP BY b.ISBNCode;
SELECT * FROM fictionview;
    
CREATE OR REPLACE VIEW journalview 
AS SELECT b.ISBNCode, b.Title, b.Publisher, b.Year, b.NumPage, b.Authors, j.PublishDate
	FROM bookview b
    JOIN `library`.journal j ON b.ISBNCode = j.ISBNCode GROUP BY b.ISBNCode;
SELECT * FROM journalview;
    
CREATE OR REPLACE VIEW educationview 
AS SELECT b.ISBNCode, b.Title, b.Publisher, b.Year, b.NumPage, b.Authors, e.EduLevel, e.Refer, GROUP_CONCAT(s.Subject) AS Subjects
	FROM bookview b
    JOIN `library`.educational e ON b.ISBNCode = e.ISBNCode 
    LEFT JOIN `library`.`subject` s ON b.ISBNCode = s.ISBNCode GROUP BY b.ISBNCode;
SELECT * FROM educationview;
    
    
-- Triggers 
-- On inserting and updating in record - reset book copy availability
DELIMITER //
DROP TRIGGER IF EXISTS before_insert_record //
CREATE TRIGGER before_insert_record
	BEFORE INSERT ON `library`.record
	FOR EACH ROW
BEGIN
	DECLARE msg VARCHAR(128);
	IF ( (SELECT MAX(Available) FROM `library`.book_copy WHERE book_copy.CopyNumber = NEW.CopyNumber AND book_copy.ISBNCode = NEW.ISBNCode) = 0)
		THEN
        SET msg = concat('Record insertion error: Book Copy is not available: ', cast(NEW.ISBNCode AS CHAR), ', ', cast(NEW.CopyNumber AS CHAR));
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
	ELSE 
		IF ( (SELECT COUNT(*) FROM `library`.educational e WHERE e.ISBNCode = NEW.ISBNCode AND e.EduLevel = 'Research' > 0) 
		 AND (SELECT MAX(Institution) FROM `library`.Customer c WHERE c.UId = NEW.UId = NULL))
			THEN 
				SET msg = concat('Record insertion error: Customer is not allowed to access research material ', cast(NEW.ISBNCode AS CHAR), ', ', cast(NEW.UId AS CHAR));
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
            ELSE 
				UPDATE `library`.book_copy SET Available = 0 WHERE book_copy.CopyNumber = NEW.CopyNumber AND book_copy.ISBNCode = NEW.ISBNCode;
			END IF;
	END IF;
END
//

DROP TRIGGER IF EXISTS before_insert_customer //
CREATE TRIGGER before_insert_customer
	BEFORE INSERT ON `library`.customer
	FOR EACH ROW
BEGIN
	DECLARE msg VARCHAR(128);
    IF ( DATEDIFF(CURDATE(), DATE(NEW.UBirth)) < (15 * 365 + 3)) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: To register customer must be over 15 years old!';
	END IF;
END
//

DELIMITER;

-- Test trigger insert record
SELECT * FROM book_copy;
INSERT INTO `library`.`record`
VALUE('1', '9781234567897', 1, '2020-10-10', '2022-10-10', '2020-10-24', 'c1');
INSERT INTO `library`.`record`
VALUE('1', '9781234567897', 1, '2020-10-12', NULL, '2020-10-19', 'c2');

-- Test trigger insert customer 
INSERT INTO `library`.customer 
VALUE('c5', 'Lil Kidd', '2022-11-13', 'Street Gang', 'Pain', NULL);

-- Function
-- Built-in fuctions used: CONCAT, CAST, DATE, SYSDATE, COUNT, SUM, ... 

-- Get number of borrowed records from a book
DELIMITER //
DROP FUNCTION IF EXISTS popularity//
CREATE FUNCTION popularity (ISBN VARCHAR(13))
	RETURNS INTEGER DETERMINISTIC
BEGIN
	DECLARE res INTEGER;
    # If ISBN Code doesn't exist return -1 (for application handling)
	IF ( (SELECT COUNT(*) FROM `library`.book b WHERE b.ISBNCode = ISBN) = 0) THEN RETURN -1; 
	ELSE 
		SELECT COUNT(*) INTO res FROM `library`.record r WHERE r.ISBNCode = ISBN;
		RETURN res;
	END IF;
END
//
DELIMITER;


SELECT ISBNCode, Title, Publisher, popularity(ISBNCode) AS Popularity FROM `library`.book;
SELECT popularity('9781234567897');
SELECT popularity('9781234569845');
SELECT popularity('9781234569843');

SELECT * FROM bookview;



-- Procedures
-- Query record and return the number of overdue record from a customer
DELIMITER //
DROP PROCEDURE IF EXISTS getcopylist //
CREATE PROCEDURE getcopylist (ISBN VARCHAR(13))   
BEGIN 
	SELECT b.ISBNCode, b.Title, COUNT(cp.Available) AS Total, SUM(cp.Available) AS Available, br.BId AS Branch
		FROM `library`.book b
		JOIN `library`.book_copy cp ON b.ISBNCode = cp.ISBNCode AND b.ISBNCode = ISBN
		JOIN `library`.branch br ON cp.BId = br.BId
		GROUP BY br.BId;
END
//
DELIMITER ;

CALL getcopylist('9781234567897');

-- ### Detailed Book Information ### --
DELIMITER //
DROP PROCEDURE IF EXISTS getbookdetail //
CREATE PROCEDURE getbookdetail (ISBN VARCHAR(13))   
BEGIN 
	SELECT b.ISBNCode, b.Title, b.Publisher, b.`Year`, b.NumPage, b.Authors, IF(e.ISBNCode, 1, 0) AS Educational, e.EduLevel, e.Refer, e.Subjects, IF(f.ISBNCode, 1, 0) AS fiction, f.Genres, IF(j.ISBNCode, 1, 0) AS Journal, j.PublishDate  
	FROM bookview b 
    LEFT JOIN educationview e ON b.ISBNCode = e.ISBNCode
    LEFT JOIN fictionview f ON b.ISBNCode = f.ISBNCode
    LEFT JOIN journalview j ON b.ISBNCode = j.ISBNCode
    WHERE b.ISBNCode = ISBN
	GROUP BY b.ISBNCode;
END
//
DELIMITER ;

CALL getbookdetail('9781234567897');

SELECT * FROM book WHERE Title LIKE 'T%';
ALTER TABLE book ADD INDEX TitleSearch (Title);
SELECT * FROM book WHERE Title LIKE 'T%';

ALTER TABLE `library`.customer ADD INDEX NameSearch(UName, UBirth);

/*
DELIMITER //
DROP PROCEDURE IF EXISTS reviewrecord //
CREATE PROCEDURE reviewrecord (IN CustomerId VARCHAR(10), OUT ReturnCode VARCHAR(50), OUT Charge INTEGER)   
BEGIN 
	DECLARE DaysDued INTEGER; 
    DECLARE DiffDays INTEGER;
    SET DaysDued = 0;
END
//
DELIMITER ;
*/
    
INSERT INTO `library`.book
VALUES('9781234567897', 'The philosopher\'s stone', 'A', 1999, 1000);

-- ################################################################################################################## --
-- Security and Access control

CREATE USER 'customer1'@'localhost' IDENTIFIED BY 'user_password';
GRANT SELECT ON `library`.* TO 'customer1'@'localhost';

CREATE USER 'librarian1'@'localhost' IDENTIFIED BY 'lib_password';
GRANT SELECT ON `library`.* TO 'librarian1'@'localhost';
GRANT INSERT ON `library`.* TO 'librarian1'@'localhost';