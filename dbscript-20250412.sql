-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: templedb
-- ------------------------------------------------------
-- Server version	8.4.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill_sequence`
--

DROP TABLE IF EXISTS `bill_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_sequence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_used` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_sequence`
--

LOCK TABLES `bill_sequence` WRITE;
/*!40000 ALTER TABLE `bill_sequence` DISABLE KEYS */;
INSERT INTO `bill_sequence` VALUES (1,'2025-04-08 13:07:23'),(2,'2025-03-25 16:44:09'),(3,'2025-04-06 11:11:09'),(4,'2025-04-08 13:06:24');
/*!40000 ALTER TABLE `bill_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash_expenses`
--

DROP TABLE IF EXISTS `cash_expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_expenses` (
  `id` varchar(36) NOT NULL,
  `voucher_no` int NOT NULL,
  `voucher_date` date NOT NULL,
  `paid_to` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `purpose` text NOT NULL,
  `approved_by` int DEFAULT NULL,
  `expense_type` varchar(20) NOT NULL,
  `category_id` varchar(36) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `voucher_no` (`voucher_no`),
  KEY `approved_by` (`approved_by`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `cash_expenses_ibfk_1` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`),
  CONSTRAINT `cash_expenses_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `expense_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_expenses`
--

LOCK TABLES `cash_expenses` WRITE;
/*!40000 ALTER TABLE `cash_expenses` DISABLE KEYS */;
INSERT INTO `cash_expenses` VALUES ('47543b92-08de-11f0-99d0-d2919aa33763',1,'2025-03-24','KSEB',5000.00,'Monthly electricity bill',1,'VOUCHER','47466c9f-08de-11f0-99d0-d2919aa33763','system','2025-03-24 18:32:02',NULL,NULL),('475444c8-08de-11f0-99d0-d2919aa33763',2,'2025-03-24','KWA',2000.00,'Monthly water bill',1,'VOUCHER','47467124-08de-11f0-99d0-d2919aa33763','system','2025-03-24 18:32:02',NULL,NULL);
/*!40000 ALTER TABLE `cash_expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('47429586-08de-11f0-99d0-d2919aa33763',1,'Prasad Items','Items used for temple prasad','system','2025-03-24 18:32:01',NULL,NULL),('47429b1e-08de-11f0-99d0-d2919aa33763',2,'Pooja Items','Items used for daily pooja','system','2025-03-24 18:32:01',NULL,NULL),('47429e42-08de-11f0-99d0-d2919aa33763',3,'Temple Decorations','Items used for temple decoration','system','2025-03-24 18:32:01',NULL,NULL),('47429f00-08de-11f0-99d0-d2919aa33763',4,'Food Items','Items used for temple kitchen','system','2025-03-24 18:32:01',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deities`
--

DROP TABLE IF EXISTS `deities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deities` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deities`
--

LOCK TABLES `deities` WRITE;
/*!40000 ALTER TABLE `deities` DISABLE KEYS */;
INSERT INTO `deities` VALUES ('474490ba-08de-11f0-99d0-d2919aa33763','Lord Ayyappa','system','2025-03-24 18:32:01'),('474492b2-08de-11f0-99d0-d2919aa33763','Lord Ganesha','system','2025-03-24 18:32:01'),('474493c7-08de-11f0-99d0-d2919aa33763','Goddess Lakshmi','system','2025-03-24 18:32:01'),('474493f8-08de-11f0-99d0-d2919aa33763','Lord Shiva','system','2025-03-24 18:32:01'),('4744941b-08de-11f0-99d0-d2919aa33763','Goddess Parvati','system','2025-03-24 18:32:01');
/*!40000 ALTER TABLE `deities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devotee_offering_items`
--

DROP TABLE IF EXISTS `devotee_offering_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devotee_offering_items` (
  `id` varchar(36) NOT NULL,
  `devotee_offering_id` bigint NOT NULL,
  `devotee_mobile_number` varchar(20) DEFAULT NULL,
  `vazhipadu_id` varchar(36) NOT NULL,
  `devotee_name` varchar(255) NOT NULL,
  `devotee_nakshtram` varchar(100) DEFAULT NULL,
  `deity_name` varchar(255) DEFAULT NULL,
  `nos` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `devotee_offering_id` (`devotee_offering_id`),
  KEY `vazhipadu_id` (`vazhipadu_id`),
  CONSTRAINT `devotee_offering_items_ibfk_1` FOREIGN KEY (`devotee_offering_id`) REFERENCES `devotee_offerings` (`id`),
  CONSTRAINT `devotee_offering_items_ibfk_2` FOREIGN KEY (`vazhipadu_id`) REFERENCES `vazhipadu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devotee_offering_items`
--

LOCK TABLES `devotee_offering_items` WRITE;
/*!40000 ALTER TABLE `devotee_offering_items` DISABLE KEYS */;
INSERT INTO `devotee_offering_items` VALUES ('070bdd89-13a4-4d10-a741-f4a621b64bbe',3,'9731424784','474e581c-08de-11f0-99d0-d2919aa33763','Vinod','Jyeshtha','Lord Ganesha',1,50.00),('0b1b0327-2e22-4a14-8fce-ba47e0c36856',4,'9844012345','474e581c-08de-11f0-99d0-d2919aa33763','Kiran','Vishakha','Lord Ayyappa',1,50.00),('41f096ba-a8f2-4124-a7f1-847b9df48cb4',7,'9900105805','474e60ca-08de-11f0-99d0-d2919aa33763','Saju','Punarvasu','Lord Ayyappa',1,100.00),('47599a4a-08de-11f0-99d0-d2919aa33763',1,'9876543219','474e581c-08de-11f0-99d0-d2919aa33763','Arun Kumar','Ashwini','Lord Ayyappa',1,50.00),('4759a66f-08de-11f0-99d0-d2919aa33763',1,'9876543220','474e60ca-08de-11f0-99d0-d2919aa33763','Meera Devi','Bharani','Lord Ayyappa',1,100.00),('4759bbd7-08de-11f0-99d0-d2919aa33763',2,'9876543221','474e63f3-08de-11f0-99d0-d2919aa33763','Krishna Menon','Krittika','Lord Ayyappa',1,1000.00),('4a93084d-dde1-435f-acb6-66368a8c8c95',5,'9731424784','474e60ca-08de-11f0-99d0-d2919aa33763','Vinod','Jyeshtha','Lord Ayyappa',1,100.00),('5b994467-4c79-4c6c-ac4c-653fc3064f84',6,'9731424784','474e60ca-08de-11f0-99d0-d2919aa33763','Vinod','Jyeshtha','Lord Ayyappa',1,100.00),('5bb8220b-e5b1-4378-8f6e-58eda65b55f9',3,'9731424784','474e581c-08de-11f0-99d0-d2919aa33763','Anupama','Punarvasu','Lord Ganesha',1,50.00),('688a73d5-ab14-4b8f-b38e-3d9aa90daafc',10,'9731424784','474e581c-08de-11f0-99d0-d2919aa33763','Anupama','Punarvasu','Lord Ayyappa',1,50.00),('77029072-c05b-42fe-a3d9-6584e4e6f293',8,'9731424784','474e581c-08de-11f0-99d0-d2919aa33763','Anupama','Punarvasu','Lord Ayyappa',3,150.00),('86887c92-3a25-42e9-a02c-2ebfbaeb9f83',9,'9731424784','474e581c-08de-11f0-99d0-d2919aa33763','Vinod','Jyeshtha','Lord Ganesha',1,50.00),('8f87518c-d556-41f7-acdd-46c9d0f786e2',4,'9844012345','474e581c-08de-11f0-99d0-d2919aa33763','Kishore','Purva Phalguni','Lord Ganesha',1,50.00),('c3eb52a6-8b16-4c08-b513-4cc25ccf97c2',10,'9731424784','474e581c-08de-11f0-99d0-d2919aa33763','Vinod','Jyeshtha','Lord Ayyappa',1,50.00),('c6fec5a2-4ad2-4b87-8979-7906336fd88b',8,'9731424784','474e60ca-08de-11f0-99d0-d2919aa33763','Vinod','Jyeshtha','Lord Ganesha',3,300.00),('efe2dea4-994f-4edf-a360-ca47ad5092d0',5,'9731424784','474e60ca-08de-11f0-99d0-d2919aa33763','Anupama','Punarvasu','Lord Ayyappa',1,100.00);
/*!40000 ALTER TABLE `devotee_offering_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devotee_offerings`
--

DROP TABLE IF EXISTS `devotee_offerings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devotee_offerings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_date` date NOT NULL,
  `offering_date` date NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devotee_offerings`
--

LOCK TABLES `devotee_offerings` WRITE;
/*!40000 ALTER TABLE `devotee_offerings` DISABLE KEYS */;
INSERT INTO `devotee_offerings` VALUES (1,'2025-03-24','2025-03-24','system','2025-03-24 18:32:02',NULL,NULL),(2,'2025-03-24','2025-03-24','system','2025-03-24 18:32:02',NULL,NULL),(3,'2025-04-03','2025-04-03','vinod','2025-04-03 19:09:00',NULL,NULL),(4,'2025-04-03','2025-04-03','vinod','2025-04-03 19:17:39',NULL,NULL),(5,'2025-04-03','2025-04-03','vinod','2025-04-03 20:02:17',NULL,NULL),(6,'2025-04-03','2025-04-03','vinod','2025-04-03 20:26:31',NULL,NULL),(7,'2025-04-03','2025-04-03','vinod','2025-04-03 20:33:59',NULL,NULL),(8,'2025-04-03','2025-04-03','vinod','2025-04-03 20:56:51','vinod','2025-04-03 21:22:05'),(9,'2025-04-03','2025-04-05','vinod','2025-04-03 20:57:39',NULL,NULL),(10,'2025-04-12','2025-04-12','vinod','2025-04-12 08:56:01',NULL,NULL);
/*!40000 ALTER TABLE `devotee_offerings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_categories`
--

DROP TABLE IF EXISTS `donation_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_categories`
--

LOCK TABLES `donation_categories` WRITE;
/*!40000 ALTER TABLE `donation_categories` DISABLE KEYS */;
INSERT INTO `donation_categories` VALUES ('47502a55-08de-11f0-99d0-d2919aa33763','Regular Donation','Regular temple donations','system','2025-03-24 18:32:02',NULL,NULL),('47502cf5-08de-11f0-99d0-d2919aa33763','Special Donation','Special occasion donations','system','2025-03-24 18:32:02',NULL,NULL),('47502f1e-08de-11f0-99d0-d2919aa33763','Construction Donation','Temple construction donations','system','2025-03-24 18:32:02',NULL,NULL),('47502fca-08de-11f0-99d0-d2919aa33763','Annadanam','Food donation','system','2025-03-24 18:32:02',NULL,NULL);
/*!40000 ALTER TABLE `donation_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `id` varchar(36) NOT NULL,
  `donation_category_id` varchar(36) NOT NULL,
  `devotee_name` varchar(100) NOT NULL,
  `devotee_phone` varchar(20) DEFAULT NULL,
  `devotee_email` varchar(100) DEFAULT NULL,
  `devotee_address` text,
  `amount` decimal(10,2) NOT NULL,
  `payment_mode` varchar(20) NOT NULL,
  `payment_reference` varchar(100) DEFAULT NULL,
  `receipt_number` varchar(50) DEFAULT NULL,
  `donation_date` date NOT NULL,
  `remarks` text,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `donation_category_id` (`donation_category_id`),
  CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`donation_category_id`) REFERENCES `donation_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES ('47522461-08de-11f0-99d0-d2919aa33763','47502a55-08de-11f0-99d0-d2919aa33763','Ramesh Kumar','9876543217','ramesh@email.com','Kerala',1000.00,'CASH',NULL,'RCP001','2025-03-24','Regular monthly donation','system','2025-03-24 18:32:02',NULL,NULL),('475231ba-08de-11f0-99d0-d2919aa33763','47502cf5-08de-11f0-99d0-d2919aa33763','Suresh Nair','9876543218','suresh@email.com','Tamil Nadu',5000.00,'BANK_TRANSFER','TRX001','RCP002','2025-03-24','Special festival donation','system','2025-03-24 18:32:02',NULL,NULL);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_categories`
--

DROP TABLE IF EXISTS `expense_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_categories`
--

LOCK TABLES `expense_categories` WRITE;
/*!40000 ALTER TABLE `expense_categories` DISABLE KEYS */;
INSERT INTO `expense_categories` VALUES ('47466c9f-08de-11f0-99d0-d2919aa33763','Electricity','Temple electricity expenses','system','2025-03-24 18:32:02',NULL,NULL),('47467124-08de-11f0-99d0-d2919aa33763','Water','Temple water expenses','system','2025-03-24 18:32:02',NULL,NULL),('474673be-08de-11f0-99d0-d2919aa33763','Staff Salary','Temple staff salary','system','2025-03-24 18:32:02',NULL,NULL),('4746748f-08de-11f0-99d0-d2919aa33763','Maintenance','Temple maintenance expenses','system','2025-03-24 18:32:02',NULL,NULL),('47467511-08de-11f0-99d0-d2919aa33763','Food Items','Temple kitchen expenses','system','2025-03-24 18:32:02',NULL,NULL);
/*!40000 ALTER TABLE `expense_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offering_categories`
--

DROP TABLE IF EXISTS `offering_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offering_categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offering_categories`
--

LOCK TABLES `offering_categories` WRITE;
/*!40000 ALTER TABLE `offering_categories` DISABLE KEYS */;
INSERT INTO `offering_categories` VALUES ('474864db-08de-11f0-99d0-d2919aa33763','Daily Offerings','system','2025-03-24 18:32:02',NULL,NULL),('47488677-08de-11f0-99d0-d2919aa33763','Special Offerings','system','2025-03-24 18:32:02',NULL,NULL),('4748883b-08de-11f0-99d0-d2919aa33763','Festival Offerings','system','2025-03-24 18:32:02',NULL,NULL),('4748887b-08de-11f0-99d0-d2919aa33763','Monthly Offerings','system','2025-03-24 18:32:02',NULL,NULL),('4748889e-08de-11f0-99d0-d2919aa33763','Annual Offerings','system','2025-03-24 18:32:02',NULL,NULL);
/*!40000 ALTER TABLE `offering_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privileges`
--

DROP TABLE IF EXISTS `privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilege` varchar(255) DEFAULT NULL,
  `description` text,
  `parent_privilege_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privileges`
--

LOCK TABLES `privileges` WRITE;
/*!40000 ALTER TABLE `privileges` DISABLE KEYS */;
INSERT INTO `privileges` VALUES (1,'USER_MANAGEMENT','Manage users and their roles',NULL,'2025-03-24 18:32:01','system'),(2,'ROLE_MANAGEMENT','Manage roles and privileges',NULL,'2025-03-24 18:32:01','system'),(3,'INVENTORY_MANAGEMENT','Manage temple inventory',NULL,'2025-03-24 18:32:01','system'),(4,'OFFERING_MANAGEMENT','Manage temple offerings',NULL,'2025-03-24 18:32:01','system'),(5,'DONATION_MANAGEMENT','Manage donations',NULL,'2025-03-24 18:32:01','system'),(6,'EXPENSE_MANAGEMENT','Manage expenses',NULL,'2025-03-24 18:32:01','system'),(7,'REPORT_VIEW','View reports',NULL,'2025-03-24 18:32:01','system');
/*!40000 ALTER TABLE `privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `supplier_id` varchar(36) DEFAULT NULL,
  `category_id` varchar(36) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost_price` decimal(10,2) NOT NULL,
  `commission_percentage` decimal(5,2) DEFAULT NULL,
  `tax_percentage` decimal(5,2) DEFAULT NULL,
  `ast_percentage` decimal(5,2) DEFAULT NULL,
  `opening_stock` int DEFAULT '0',
  `issued` int DEFAULT '0',
  `received` int DEFAULT '0',
  `damaged` int DEFAULT '0',
  `sales_returned` int DEFAULT '0',
  `purchases_returned` int DEFAULT '0',
  `blocked` int DEFAULT '0',
  `quantity_in_stock` int DEFAULT '0',
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `supplier_id` (`supplier_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('474c3963-08de-11f0-99d0-d2919aa33763',1,'Camphor','KG','4749ef1e-08de-11f0-99d0-d2919aa33763','47429b1e-08de-11f0-99d0-d2919aa33763',1000.00,800.00,5.00,18.00,0.00,100,0,0,0,0,0,0,-4,'system','2025-03-24 18:32:02',NULL,'2025-04-08 13:06:24'),('474c410f-08de-11f0-99d0-d2919aa33763',2,'Ghee','KG','4749f683-08de-11f0-99d0-d2919aa33763','47429586-08de-11f0-99d0-d2919aa33763',800.00,600.00,5.00,18.00,0.00,50,0,0,0,0,0,0,-5,'system','2025-03-24 18:32:02',NULL,'2025-04-08 13:07:23'),('474c44c8-08de-11f0-99d0-d2919aa33763',3,'Rice','KG','4749f773-08de-11f0-99d0-d2919aa33763','47429f00-08de-11f0-99d0-d2919aa33763',40.00,35.00,5.00,5.00,0.00,1000,0,0,0,0,0,0,0,'system','2025-03-24 18:32:02',NULL,'2025-03-25 16:45:15');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','system','2025-03-24 18:32:01'),(2,'TEMPLE_ADMIN','system','2025-03-24 18:32:01'),(3,'ACCOUNTANT','system','2025-03-24 18:32:01'),(4,'CASHIER','system','2025-03-24 18:32:01'),(5,'STORE_KEEPER','system','2025-03-24 18:32:01');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_privileges`
--

DROP TABLE IF EXISTS `roles_privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_privileges` (
  `role_id` int NOT NULL,
  `privilege_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`privilege_id`),
  KEY `privilege_id` (`privilege_id`),
  CONSTRAINT `roles_privileges_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `roles_privileges_ibfk_2` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_privileges`
--

LOCK TABLES `roles_privileges` WRITE;
/*!40000 ALTER TABLE `roles_privileges` DISABLE KEYS */;
INSERT INTO `roles_privileges` VALUES (1,1),(1,2),(1,3),(2,3),(5,3),(1,4),(2,4),(4,4),(1,5),(2,5),(3,5),(4,5),(1,6),(2,6),(3,6),(1,7),(2,7),(3,7),(4,7),(5,7);
/*!40000 ALTER TABLE `roles_privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_items`
--

DROP TABLE IF EXISTS `sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_items` (
  `id` varchar(36) NOT NULL,
  `sale_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_id` (`sale_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sale_items_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`),
  CONSTRAINT `sale_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_items`
--

LOCK TABLES `sale_items` WRITE;
/*!40000 ALTER TABLE `sale_items` DISABLE KEYS */;
INSERT INTO `sale_items` VALUES ('23507d15-e486-46c8-852e-0be9e8bec312','2833e6ef-1146-4157-a1ce-e36415e83022','474c410f-08de-11f0-99d0-d2919aa33763',2,800.00,1600.00),('34ba7b08-0da3-4db9-817a-e51de74031b3','4651a4fb-a91d-44f1-bc6f-dadfaf5f0841','474c3963-08de-11f0-99d0-d2919aa33763',2,1000.00,2000.00),('48d7cad7-12c3-40b8-b493-c8c4f237fdbb','65a334e8-b19c-45ae-b79c-f84fd474cc77','474c3963-08de-11f0-99d0-d2919aa33763',1,1000.00,1000.00),('4dbac4a9-4896-41ff-905b-8cef66329e46','65a334e8-b19c-45ae-b79c-f84fd474cc77','474c410f-08de-11f0-99d0-d2919aa33763',2,800.00,1600.00),('a95f08ae-e69b-42a0-a5e3-e08a089d7394','4358836d-469e-42cf-a63c-b45eafabb40d','474c410f-08de-11f0-99d0-d2919aa33763',1,800.00,800.00),('f0d73c74-8df7-4f87-92e2-36a092b2a1f4','4358836d-469e-42cf-a63c-b45eafabb40d','474c3963-08de-11f0-99d0-d2919aa33763',1,1000.00,1000.00);
/*!40000 ALTER TABLE `sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` varchar(36) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_mobile` varchar(20) DEFAULT NULL,
  `sale_date` datetime NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  `bill_number` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_sales_bill_number` (`bill_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES ('2833e6ef-1146-4157-a1ce-e36415e83022','Vishal Kumar','9879879876','2025-04-08 07:37:22',1600.00,'vinod','2025-04-08 13:07:23',NULL,NULL,'00004'),('4358836d-469e-42cf-a63c-b45eafabb40d','Kishore Kumar','9090898972','2025-03-25 11:14:08',1800.00,'vinod','2025-03-25 16:44:09',NULL,NULL,'00001'),('4651a4fb-a91d-44f1-bc6f-dadfaf5f0841','Ravi','9878787676','2025-04-06 05:41:08',2000.00,'vinod','2025-04-06 11:11:09',NULL,NULL,'00002'),('65a334e8-b19c-45ae-b79c-f84fd474cc77','Anil Kumar','9898767654','2025-04-08 07:36:23',2600.00,'vinod','2025-04-08 13:06:24',NULL,NULL,'00003');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_form` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `address` text,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `reorder_level` int DEFAULT NULL,
  `margin_percentage` decimal(5,2) DEFAULT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES ('4749ef1e-08de-11f0-99d0-d2919aa33763',1,'Sri Krishna Traders','SKT','Wholesaler','Temple Street, Thiruvananthapuram','9876543214','skt@traders.com',100,10.00,'system','2025-03-24 18:32:02',NULL,NULL),('4749f683-08de-11f0-99d0-d2919aa33763',2,'Devi Enterprises','DE','Wholesaler','Market Road, Kochi','9876543215','de@enterprises.com',100,12.00,'system','2025-03-24 18:32:02',NULL,NULL),('4749f773-08de-11f0-99d0-d2919aa33763',3,'Ganesh Suppliers','GS','Wholesaler','Main Road, Kollam','9876543216','gs@suppliers.com',100,15.00,'system','2025-03-24 18:32:02',NULL,NULL);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `primary_email` varchar(255) DEFAULT NULL,
  `primary_phone` varchar(20) DEFAULT NULL,
  `secondary_email` varchar(255) DEFAULT NULL,
  `secondary_phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` longblob,
  `created_at` datetime NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `password_change_required` tinyint(1) DEFAULT '1',
  `password_last_changed` datetime DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vinod','Vinod','Kumar','vinod@vinod.co','9876543210',NULL,NULL,'$2a$10$OFeh/XAKVzDpa4DySWN/JuK.GH6S4yQmMbjNxpkluVfcVn4FB0Rn2',NULL,'2025-03-24 18:32:01','system',1,0,'2025-03-25 00:02:37','Temple Administrator'),(2,'priya','Priya','Sharma','priya@temple.com','9876543211',NULL,NULL,'$2a$10$rDmGcWxNxNxNxNxNxNxNxO',NULL,'2025-03-24 18:32:01','system',1,1,NULL,'Accountant'),(3,'rajesh','Rajesh','Verma','rajesh@temple.com','9876543212',NULL,NULL,'$2a$10$rDmGcWxNxNxNxNxNxNxNxO',NULL,'2025-03-24 18:32:01','system',1,1,NULL,'Cashier'),(4,'anita','Anita','Patel','anita@temple.com','9876543213',NULL,NULL,'$2a$10$rDmGcWxNxNxNxNxNxNxNxO',NULL,'2025-03-24 18:32:01','system',1,1,NULL,'Store Keeper');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,1,'system','2025-03-24 18:32:01'),(2,3,'system','2025-03-24 18:32:01'),(3,4,'system','2025-03-24 18:32:01'),(4,5,'system','2025-03-24 18:32:01');
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vazhipadu`
--

DROP TABLE IF EXISTS `vazhipadu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vazhipadu` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `vazhipadu_name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `daily_count` int DEFAULT NULL,
  `time_am_pm` int DEFAULT NULL,
  `times_per_day` int DEFAULT NULL,
  `days` int DEFAULT NULL,
  `blocking` tinyint(1) DEFAULT '0',
  `seasonal` tinyint(1) DEFAULT '0',
  `offering_category_id` varchar(36) DEFAULT NULL,
  `receipt` tinyint(1) DEFAULT '1',
  `booking_required` tinyint(1) DEFAULT '0',
  `account_head_id` int DEFAULT NULL,
  `account_sub_head_id` int DEFAULT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `offering_category_id` (`offering_category_id`),
  KEY `account_head_id` (`account_head_id`),
  KEY `account_sub_head_id` (`account_sub_head_id`),
  CONSTRAINT `vazhipadu_ibfk_1` FOREIGN KEY (`offering_category_id`) REFERENCES `offering_categories` (`id`),
  CONSTRAINT `vazhipadu_ibfk_2` FOREIGN KEY (`account_head_id`) REFERENCES `users` (`id`),
  CONSTRAINT `vazhipadu_ibfk_3` FOREIGN KEY (`account_sub_head_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vazhipadu`
--

LOCK TABLES `vazhipadu` WRITE;
/*!40000 ALTER TABLE `vazhipadu` DISABLE KEYS */;
INSERT INTO `vazhipadu` VALUES ('474e581c-08de-11f0-99d0-d2919aa33763',1,'Archana',50.00,100,1,2,1,0,0,'474864db-08de-11f0-99d0-d2919aa33763',1,0,1,2,'system','2025-03-24 18:32:02',NULL,NULL),('474e60ca-08de-11f0-99d0-d2919aa33763',2,'Sahasranama Archana',100.00,50,1,1,1,0,0,'474864db-08de-11f0-99d0-d2919aa33763',1,0,1,2,'system','2025-03-24 18:32:02',NULL,NULL),('474e63f3-08de-11f0-99d0-d2919aa33763',3,'Ganapathy Homam',1000.00,10,1,1,1,1,0,'47488677-08de-11f0-99d0-d2919aa33763',1,1,1,2,'system','2025-03-24 18:32:02',NULL,NULL);
/*!40000 ALTER TABLE `vazhipadu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-12 10:13:26
