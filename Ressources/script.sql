CREATE DATABASE mdd_db;
USE mdd_db;
CREATE TABLE `TOPICS` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(40)
);

CREATE TABLE `POSTS` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(50),
  `text` VARCHAR(2000),
  `topic_id` BIGINT,
  `user_id` BIGINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `COMMENTS` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `text` VARCHAR(2000),
  `post_id` BIGINT,
  `user_id` BIGINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `USERS` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_name` VARCHAR(100),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `SUBSCRIBE` (
  `user_id` BIGINT, 
  `topic_id` BIGINT
);

ALTER TABLE `POSTS` ADD FOREIGN KEY (`topic_id`) REFERENCES `TOPICS` (`id`);
ALTER TABLE `POSTS` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `COMMENTS` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `COMMENTS` ADD FOREIGN KEY (`post_id`) REFERENCES `POSTS` (`id`);
ALTER TABLE `SUBSCRIBE` ADD FOREIGN KEY (`topic_id`) REFERENCES `TOPICS` (`id`);
ALTER TABLE `SUBSCRIBE` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);


INSERT INTO TOPICS (name)
VALUES ('Java'),
       ('Python'),
       ('Angular'),
       ('React'),
       ('Javascript');


INSERT INTO USERS (user_name, email, password)
VALUES ('Admin', 'email@email.com', 'admin'),
       ('Abra Racourcix', 'racourcix@email.com', 'racourcix'),
       ('Abra Cadabra', 'cadabra@email.com', 'cadabra'); 

create user 'mdd_user'@'%' identified by '123456';
grant all on mdd_db.* to 'user'@'%';
