-- MySQL dump 10.13  Distrib 5.6.10, for osx10.8 (x86_64)
--
-- Host: localhost    Database: wedding-redesign_development
-- ------------------------------------------------------
-- Server version	5.6.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `biographies`
--

DROP TABLE IF EXISTS `biographies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biographies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biographies`
--

LOCK TABLES `biographies` WRITE;
/*!40000 ALTER TABLE `biographies` DISABLE KEYS */;
INSERT INTO `biographies` VALUES (1,'Nicole Kulick','<p>Born and raised in Columbus, Ohio. Supported by two loving parents, Dan and Donna Coontz.</p>\r\n  \r\n  <p>Extroverted. Enthusiastic. Hysterical. </p>\r\n  \r\n  <p><b>Likes:</b> farmer\'s markets, horror movies, and donuts.</p><p><b>Dislikes:</b> mean people, oatmeal, and <a target=\"_blank\" rel=\"nofollow\" href=\"http://en.wikipedia.org/wiki/Toilet_paper_orientation\">rolled-under toiletpaper</a></p>','2014-07-06 14:44:50','2014-07-08 10:32:09','GRAD SCHOOL STUDENT,  FUTURE SCHOOL COUNSELOR &  A BUNDLE OF AWESOME'),(2,'Craig Wermert','<p>Born and raised in <a target=\"_blank\" rel=\"nofollow\" href=\"http://en.wikipedia.org/wiki/Sidney,_Ohio\">Sidney, Ohio</a>. Son of two awesome and loving parents, Carl and Rosie Wermert.</p>\r\n\r\n<p>Amazing. Incredible. Humble.</p>\r\n\r\n<p><b>Likes:</b> music, bad horror movies, and writing code</p><p><b>Dislikes:</b> tomatoes, clowns, and Nicole\'s nightly impromptu serenades</p>','2014-07-06 14:45:21','2014-07-07 12:22:21','SOFTWARE DEVELOPER & TALL GUY');
/*!40000 ALTER TABLE `biographies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bootsy_image_galleries`
--

DROP TABLE IF EXISTS `bootsy_image_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bootsy_image_galleries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bootsy_resource_id` int(11) DEFAULT NULL,
  `bootsy_resource_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bootsy_image_galleries`
--

LOCK TABLES `bootsy_image_galleries` WRITE;
/*!40000 ALTER TABLE `bootsy_image_galleries` DISABLE KEYS */;
/*!40000 ALTER TABLE `bootsy_image_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bootsy_images`
--

DROP TABLE IF EXISTS `bootsy_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bootsy_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_gallery_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bootsy_images`
--

LOCK TABLES `bootsy_images` WRITE;
/*!40000 ALTER TABLE `bootsy_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `bootsy_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `resource_id` int(11) DEFAULT NULL,
  `resource_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_roles_on_name` (`name`),
  KEY `index_roles_on_name_and_resource_type_and_resource_id` (`name`,`resource_type`,`resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',NULL,NULL,'2014-05-26 11:14:00','2014-05-26 11:14:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20140525132847'),('20140525133220'),('20140525144426'),('20140526103626'),('20140526105031'),('20140526135111'),('20140526135112'),('20140705113829'),('20140705114113');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (1,'The Beginning','March, 2012','mail','<p>Who knew cupid would be real? OkCupid that is!</p>\r\n\r\n<p>Craig joined to see what would happen and meet new people.</p>\r\n\r\n<p>Nicole joined after a bit of peer pressure from her coworkers.</p>\r\n\r\n<p>She messaged him, he messaged back. And then, the awesomeness began.</p>','2014-05-25 14:54:23','2014-07-08 08:38:11'),(2,'First Date','A week later in March, 2012','heart','<p>After a few drinks,&nbsp;Craig parallel parking Nicole\'s car, and\r\nsome pizza at Plank\'s, they called it a night.&nbsp;By all accounts, the first\r\ndate was a success.&nbsp;</p>','2014-05-25 14:55:12','2014-07-06 15:33:37'),(3,'Craig Moves In','October, 2012','truck','<p><span>By this time, they were in love.&nbsp;<br>\r\n<br>\r\nDespite Nicole\'s hesitation regarding toilet seats left ajar&nbsp;and socks on the living\r\nroom floor,&nbsp;Craig packed up his belongings and moved in with Nicole. Craig\r\ntold her she had nothing to worry about.&nbsp;<i><b>Craig was right.</b></i></span></p>','2014-05-25 14:55:55','2014-07-08 08:40:30'),(4,'Awesome Quiet Time','October 2012 - March 2014','clock','<p>Other than day-to-day love and totally being awesome, not much\r\nhappened in their&nbsp;relationship during this period. Nicole went back to\r\nschool for her Master\'s degree, and Craig started working as a software\r\nengineer.&nbsp;</p>','2014-05-25 14:57:38','2014-07-06 15:35:02'),(5,'The Question','March 8th, 2014','diamond','<p>It was the biggest day of their lives (to this point, at least). Since\r\nthe two are romantics at heart, it went something like this...</p>\r\n\r\n<p><b>Nicole</b>: “What\'s wrong; do you have to poop?”</p>\r\n\r\n<p><b>Craig</b>: “No, I was actually wondering if you\'d marry me?”</p>\r\n\r\n<p><b>Nicole</b>: “Shut up! Are you kidding?!”</p>\r\n\r\n<p><b>Craig</b>: “…”</p>\r\n\r\n<b>Nicole</b>: “Yes!”<br>','2014-05-25 15:02:12','2014-07-06 15:35:19');
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `encrypted_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) NOT NULL DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_sign_in_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_email` (`email`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'craig@wermert.me','$2a$10$aa1NQqiG3A6yaj3nXjNTpOYBncmBBhlz8l7UTr7tOKR6BHIiOXVTa',NULL,NULL,NULL,10,'2014-07-07 09:48:46','2014-07-06 13:53:53','127.0.0.1','127.0.0.1','2014-05-26 11:12:24','2014-07-07 09:48:46',0),(2,'nkulick.14@gmail.com','$2a$10$qh4ssaCyVf66MA54WZk3muMXVQTahUwkjjgn01vPYZKhYdwga1DT2',NULL,NULL,NULL,2,'2014-07-06 15:09:18','2014-07-06 15:08:44','192.168.2.7','127.0.0.1','2014-07-06 15:08:44','2014-07-06 15:09:18',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_roles` (
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  KEY `index_users_roles_on_user_id_and_role_id` (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,1);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-12 11:53:59
