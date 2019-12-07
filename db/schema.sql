DROP DATABASE cliks_db;
CREATE DATABASE cliks_db;

USE cliks_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255),
    picture VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE academic_info (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    profession VARCHAR(255),
    academic_degree VARCHAR(255),
    degree_field VARCHAR(255),
    academic_institution VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES users (id),
    PRIMARY KEY(id)
);

CREATE TABLE user_Location (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    city VARCHAR(255),
    user_state VARCHAR(255),
    country VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES users (id),
    PRIMARY KEY(id)
);

CREATE TABLE coolest_thing (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    coolest_thing_done VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES users (id),
    PRIMARY KEY(id)
);

CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT,
    ques VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE scores (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer INT NOT NULL,
    FOREIGN KEY(question_id) REFERENCES questions (id),
    FOREIGN KEY(user_id) REFERENCES users (id),
    PRIMARY KEY(id)
);

-- CREATE TABLE matches (
--     score1 INT NOT NULL,
--     score2 INT NOT NULL,
--     matches INT NOT NULL
-- );

-- INSERT INTO matches (score1, score2, matches)
-- SELECT
-- 	score1,
-- 	score2,
-- 	count(score1.question_id) 'matches'
-- FROM
-- 	scores as score1,
-- 	scores as score2
-- WHERE
-- 	score1.question_id = score2.question_id
-- 	AND score1.answer = score2.answer
-- 	AND score1 != score2
-- GROUP BY
-- 	score1,
-- 	score2
-- ORDER BY
-- 	matches desc;
