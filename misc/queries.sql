-- Створення таблиці
CREATE TABLE `genitive` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nominative` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomhtml` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genitive` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Вибір записів із html у полі nominative (html має бути тільки у nomhtml)
SELECT * FROM genitive WHERE nominative LIKE '%<%';

UPDATE genitive SET nomhtml = nominative WHERE nominative LIKE '%<%';