CREATE TABLE `user_info` (
  `id`              VARCHAR(36) NOT NULL,
  `username`        VARCHAR(20) NOT NULL,
  `password`        VARCHAR(50) NOT NULL,
  `gender`          VARCHAR(1)  DEFAULT NULL,
  `nick`            VARCHAR(30) DEFAULT NULL,
  `register_date`   VARCHAR(20) NOT NULL,
  `last_login_date` VARCHAR(20) DEFAULT NULL,
  `true_name_cert`  VARCHAR(1)  DEFAULT NULL,
  `true_name`       VARCHAR(10) DEFAULT NULL,
  `phone_number`    VARCHAR(15) DEFAULT NULL,
  `email`           VARCHAR(30) DEFAULT NULL,
  `status`          VARCHAR(1)  NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


CREATE TABLE `live_info` (
  `id`         VARCHAR(36) NOT NULL,
  `user_id`    VARCHAR(36) NOT NULL,
  `start_time` VARCHAR(20) NOT NULL,
  `end_time`   VARCHAR(20) DEFAULT NULL,
  `streamcode` VARCHAR(36) NOT NULL,
  `status`     VARCHAR(1)  NOT NULL,
  `live_name`  VARCHAR(40) NOT NULL,
  `password`   VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_id` (`user_id`),
  CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


CREATE ALGORITHM = UNDEFINED
  SQL SECURITY DEFINER VIEW `live_list` AS
  SELECT
    `a`.`username`   AS `username`,
    `a`.`true_name`  AS `true_name`,
    `b`.`start_time` AS `start_time`,
    `b`.`streamcode` AS `streamcode`,
    `b`.`status`     AS `status`,
    `b`.`live_name`  AS `live_name`,
    `b`.`password`   AS `password`
  FROM (`user_info` `a`
    JOIN `live_info` `b`)
  WHERE (`a`.`id` = `b`.`user_id`);