CREATE DATABASE mdd_db;
USE mdd_db;
CREATE TABLE `TOPICS` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(40),
  `description` VARCHAR(2000)
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


INSERT INTO TOPICS (name, description)
VALUES ('Java', 'Learn dev skills in Java'),
       ('Python', 'Learn dev skills in Python'),
       ('Angular', 'Learn dev skills in Angular'),
       ('React', 'Learn dev skills in React'),
       ('Javascript', 'Learn dev skills in Javascript');


INSERT INTO USERS (user_name, email, password)
VALUES ('Admin', 'email@email.com', '$2a$10$dDF9/zu4MCdtlnfyp0L8r.NHPfa0Ws/eoMf34UaYgHDNPyPrI6wf2'),
       ('Abra Racourcix', 'racourcix@email.com', '$2a$10$iIHdDaaliMRr8XmTKxQHKuX/3PIoam7qoDiGAcmWWmjifrLUzrFR2'),
       ('Abra Cadabra', 'cadabra@email.com', '$2a$10$RatjRybjvHpq9y5u8F4Lm.o5Zk3xLKK9OlcJGEwyis4PQceh030eK'); 

create user 'mdd_user'@'%' identified by '123456';
grant all on mdd_db.* to 'mdd_user'@'%';
