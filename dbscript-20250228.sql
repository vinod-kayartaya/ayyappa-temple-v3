CREATE DATABASE  IF NOT EXISTS `templedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `templedb`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: templedb
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `cash_expenses`
--

DROP TABLE IF EXISTS `cash_expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_expenses` (
  `id` varchar(36) NOT NULL,
  `voucher_no` int NOT NULL,
  `voucher_date` date NOT NULL,
  `paid_to` varchar(200) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `purpose` varchar(500) NOT NULL,
  `approved_by` int DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL,
  `expense_type` varchar(10) NOT NULL DEFAULT 'VOUCHER',
  `category_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `voucher_no` (`voucher_no`),
  KEY `fk_cash_vouchers_approved_by` (`approved_by`),
  KEY `idx_expense_type` (`expense_type`),
  KEY `fk_cash_expenses_category` (`category_id`),
  CONSTRAINT `fk_cash_expenses_category` FOREIGN KEY (`category_id`) REFERENCES `expense_categories` (`id`),
  CONSTRAINT `fk_cash_vouchers_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`),
  CONSTRAINT `cash_expenses_chk_1` CHECK ((`expense_type` in (_utf8mb4'VOUCHER',_utf8mb4'RECEIPT')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_expenses`
--

LOCK TABLES `cash_expenses` WRITE;
/*!40000 ALTER TABLE `cash_expenses` DISABLE KEYS */;
INSERT INTO `cash_expenses` VALUES ('5964ff16-5a04-4379-8bcf-e70e9ed23674',296,'2025-02-26','Sushellamma',500.00,'Cleaning',1,'vinod','2025-02-26 20:31:54',NULL,NULL,'VOUCHER','3e41b14a-f4d2-11ef-9147-0242ac120002'),('5a8f58c4-11c8-4d73-ac8d-81a6807f0699',295,'2025-02-26','Sharadamma',500.00,'cleaning work',1,'vinod','2025-02-26 20:28:54','vinod','2025-02-26 20:29:17','VOUCHER','3e41b14a-f4d2-11ef-9147-0242ac120002'),('6f81ce6c-50fc-4147-b254-72057471cd6c',301,'2025-02-27','Aravinda',540.00,'Flowers',NULL,'vinod','2025-02-27 09:48:52','vinod','2025-02-27 09:49:02','VOUCHER','3e41b14a-f4d2-11ef-9147-0242ac120002'),('73856012-a604-4500-9ca7-4269120e455a',9982716,'2025-02-27','BESCOM',980.00,'Electricity bill',1,'vinod','2025-02-27 09:07:33','vinod','2025-02-27 12:23:21','RECEIPT','ec626c99-d9a6-481f-9fd1-ad8e31ca92bc'),('98f56215-53e6-4163-ab9b-483fda4d9668',293,'2025-02-26','Harish',290.00,'Auto rickshaw fare from bus stand',1,'vinod','2025-02-26 20:22:13','vinod','2025-02-26 20:27:07','VOUCHER','3e41b14a-f4d2-11ef-9147-0242ac120002'),('9ca73cbf-30f2-4256-bc95-1da9972e1a49',292,'2025-02-26','Kishore',3000.00,'Towards flowers (20 kg)',40,'vinod','2025-02-26 13:10:20','vinod','2025-02-26 20:21:32','VOUCHER','3e41b14a-f4d2-11ef-9147-0242ac120002'),('b415cad8-6f4e-4346-8bdf-b016d3f65c1b',300,'2025-02-27','Umesh',220.00,'Auto fare from Majestic busstand',1,'vinod','2025-02-27 09:07:09','vinod','2025-02-27 09:48:03','VOUCHER','3e41b14a-f4d2-11ef-9147-0242ac120002'),('ccfc7209-ba2e-4501-b1bd-dbf6a4eff56d',827173,'2025-02-27','Bangalore One',2909.00,'Water bill paid',1,'vinod','2025-02-27 09:24:08',NULL,NULL,'RECEIPT','3e41b14a-f4d2-11ef-9147-0242ac120002');
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
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_categories_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('5957f6e2-00ca-4a26-862f-b39a4946d57b',1,'Clothe items','Towels, shalyas etc','vinod','2025-02-17 07:16:39','vinod','2025-02-17 07:17:32'),('608faff0-aa1e-472f-9161-54f1d289d2f5',2,'Agarabatti box','Incense sticks (50 units)','vinod','2025-02-17 07:33:29','vinod','2025-02-17 07:33:45');
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
  `name` varchar(100) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deities`
--

LOCK TABLES `deities` WRITE;
/*!40000 ALTER TABLE `deities` DISABLE KEYS */;
INSERT INTO `deities` VALUES ('03f69e02-fc99-4319-9431-59444eb8c591','Lord Shiva','vinod','2025-02-17 09:23:50'),('440887ca-f6c7-4ffb-9f6a-716758a9c04d','Ayyappa Swamy','vinod','2025-02-17 09:18:58'),('484b4a48-c6b3-4e1b-8639-8b158eb6dc27','Lord Ganesh','vinod','2025-02-17 09:23:39'),('4adccead-4e3e-4f71-ab2b-0abf6512cda7','Hanuman','vinod','2025-02-17 09:23:55');
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
  `devotee_mobile_number` varchar(15) DEFAULT NULL,
  `vazhipadu_id` varchar(36) NOT NULL,
  `devotee_name` varchar(100) NOT NULL,
  `devotee_nakshtram` varchar(50) DEFAULT NULL,
  `deity_name` varchar(50) DEFAULT NULL,
  `nos` int NOT NULL DEFAULT '1',
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
INSERT INTO `devotee_offering_items` VALUES ('0981867d-b897-434b-aff9-a1df65f481a6',7,'','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Ravi Kumar','Ashwini','Ayyappa Swamy',1,201.00),('0ea3e93e-13da-4cf7-9055-294db96cd731',6,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Anu','Punarvasu','Lord Ganesh',1,201.00),('29a40897-f030-4853-9d83-917100b027f2',4,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Anu','Punarvasu','',1,201.00),('45d43c80-472a-44f7-ae78-753c41de6898',4,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','',1,201.00),('48088f1c-d69b-4b4b-9ce1-d51d6a175330',5,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','Ayyappa Swamy',1,201.00),('566f96e5-5565-483c-ae46-c5fed6868c43',1,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','Lord Ganesh',1,201.00),('57f8f59c-8978-4102-82a1-71d99ce4284e',2,'9880098800','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Rajesh','Ashwini','Ayyappa Swamy',1,201.00),('59ca7b47-5e5a-45f0-a181-fca02b73c858',13,'9900105805','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Sajana','Ashwini','Ayyappa Swamy',1,201.00),('6173acd8-db55-4b58-91de-051a44909be5',1,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Anu','Punarvasu','Lord Ganesh',1,201.00),('6ce4d2c5-1931-4bea-af2b-73310b9a5059',6,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','Lord Ganesh',1,201.00),('82ded14c-792e-4a47-a99f-3da2ed101121',12,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Anu','Punarvasu','',1,201.00),('91245e65-3fc2-4112-b6b2-94f21ff93925',19,'','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Kishore','Ashwini','Ayyappa Swamy',1,201.00),('9a932060-bae5-48bb-ad90-1c13b9669f80',12,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','',1,201.00),('b7020b5e-2507-4e0f-8fdb-d8589feea5b6',17,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','Ayyappa Swamy',1,201.00),('bd4826d0-7d9b-4b93-bf88-326094744ef2',8,'9880098800','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Rajesh','Ashwini','Ayyappa Swamy',1,201.00),('ca22e4b0-b8ef-493a-8a3a-95778f5d1e1e',11,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','Lord Ganesh',1,201.00),('d4b2ccdc-70eb-4556-9f1a-b89adede53ba',13,'9900105805','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Saju','Punarvasu','Ayyappa Swamy',1,201.00),('e20848af-68ba-4be1-a1b6-e0e0d6b4c4f5',9,'9880098800','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Rajesh','Ashwini','Ayyappa Swamy',1,201.00),('e389dfeb-520a-44c9-872d-6df58b981212',18,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Vinod','Jyeshtha','Lord Ganesh',1,201.00),('ede1b4fa-7271-49c7-979a-57bdadd47e72',3,'9880098800','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Rajesh','Ashwini','Ayyappa Swamy',1,201.00),('f23f9660-12fa-4f61-88e3-9eb3040b4357',10,'9880098800','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Rajesh','Ashwini','Ayyappa Swamy',1,201.00),('f2f2ab96-9314-482f-99a6-9936a6b036f1',5,'9731424784','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Shyam','Swati','Ayyappa Swamy',1,201.00),('fa7bc9f4-0aed-4950-b951-ae2e077a1bf4',16,'9900105805','fb93fc50-ba36-4f99-b8b2-1c2abf8972dc','Saju','Punarvasu','',1,201.00);
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
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devotee_offerings`
--

LOCK TABLES `devotee_offerings` WRITE;
/*!40000 ALTER TABLE `devotee_offerings` DISABLE KEYS */;
INSERT INTO `devotee_offerings` VALUES (1,'2025-02-18','2025-02-18','vinod','2025-02-18 11:20:30',NULL,NULL),(2,'2025-02-18','2025-02-18','vinod','2025-02-18 11:26:38',NULL,NULL),(3,'2025-02-18','2025-02-18','vinod','2025-02-18 15:25:00',NULL,NULL),(4,'2025-02-18','2025-02-18','vinod','2025-02-18 11:23:18',NULL,NULL),(5,'2025-02-22','2025-02-22','vinod','2025-02-22 07:52:41',NULL,NULL),(6,'2025-02-18','2025-02-20','vinod','2025-02-18 15:37:06',NULL,NULL),(7,'2025-02-18','2025-02-18','vinod','2025-02-18 15:27:26',NULL,NULL),(8,'2025-02-18','2025-02-18','vinod','2025-02-18 15:25:07',NULL,NULL),(9,'2025-02-18','2025-02-18','vinod','2025-02-18 11:24:59',NULL,NULL),(10,'2025-02-18','2025-02-18','vinod','2025-02-18 11:25:07',NULL,NULL),(11,'2025-02-18','2025-02-18','vinod','2025-02-18 11:08:25',NULL,NULL),(12,'2025-02-18','2025-02-18','vinod','2025-02-18 11:24:10',NULL,NULL),(13,'2025-02-22','2025-02-22','vinod','2025-02-22 07:55:18',NULL,NULL),(16,'2025-02-22','2025-02-22','vinod','2025-02-22 08:09:59',NULL,NULL),(17,'2025-02-22','2025-02-22','vinod','2025-02-22 08:10:22',NULL,NULL),(18,'2025-02-22','2025-02-22','vinod','2025-02-22 08:14:29',NULL,NULL),(19,'2025-02-22','2025-02-22','vinod','2025-02-22 08:20:11',NULL,NULL);
/*!40000 ALTER TABLE `devotee_offerings` ENABLE KEYS */;
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL,
  `last_updated_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_categories`
--

LOCK TABLES `expense_categories` WRITE;
/*!40000 ALTER TABLE `expense_categories` DISABLE KEYS */;
INSERT INTO `expense_categories` VALUES ('3e41b14a-f4d2-11ef-9147-0242ac120002','Others','Miscellaneous expenses','2025-02-27 06:15:29','system','2025-02-27 11:59:59','vinod'),('ec626c99-d9a6-481f-9fd1-ad8e31ca92bc','Electricity','Electricity bill payments','2025-02-27 12:01:28','vinod',NULL,NULL);
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
  `name` varchar(100) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offering_categories`
--

LOCK TABLES `offering_categories` WRITE;
/*!40000 ALTER TABLE `offering_categories` DISABLE KEYS */;
INSERT INTO `offering_categories` VALUES ('0a8e3337-f820-45ed-a7c5-d0c6e647e43c','Archana','vinod','2025-02-17 10:00:38',NULL,NULL),('d1a30026-933a-499e-b01f-d19aa0a9d648','Others','vinod','2025-02-17 10:00:44',NULL,NULL);
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
  `privilege` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `parent_privilege_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privileges`
--

LOCK TABLES `privileges` WRITE;
/*!40000 ALTER TABLE `privileges` DISABLE KEYS */;
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
  `name` varchar(100) NOT NULL,
  `unit` varchar(20) DEFAULT NULL,
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
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_products_code` (`code`),
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
INSERT INTO `products` VALUES ('e64cb52a-22f0-45d6-a510-65986f2c20d4',1001,'SVT black towel','NOS','b23e85a2-eed6-4ffa-b87c-c4ccc70b538b','5957f6e2-00ca-4a26-862f-b39a4946d57b',100.00,35.00,0.00,0.00,0.00,200,0,0,0,0,0,0,0,'vinod','2025-02-17 09:37:14','vinod','2025-02-17 09:47:14');
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','2024-08-19 12:51:36','system'),(7,'Guest','2025-02-17 15:09:39','vinod');
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`,`privilege_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_privileges`
--

LOCK TABLES `roles_privileges` WRITE;
/*!40000 ALTER TABLE `roles_privileges` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles_privileges` ENABLE KEYS */;
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
  `name` varchar(100) NOT NULL,
  `short_form` varchar(20) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `address` text,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `reorder_level` int DEFAULT NULL,
  `margin_percentage` decimal(5,2) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_suppliers_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES ('b23e85a2-eed6-4ffa-b87c-c4ccc70b538b',1,'SVT','EROD','Wholesale','Erode, Tamilnadu','9715479847','svt@xmpl.com',NULL,NULL,'vinod','2025-02-17 07:43:10','vinod','2025-02-17 09:50:50');
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
  `username` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `primary_email` varchar(255) DEFAULT NULL,
  `primary_phone` varchar(50) DEFAULT NULL,
  `secondary_email` varchar(255) DEFAULT NULL,
  `secondary_phone` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` blob,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `password_change_required` tinyint(1) DEFAULT '1',
  `password_last_changed` timestamp NULL DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vinod','Vinod','Kumar','vinod@vinod.co','9731424784','vinod@xmpl.com','','$2a$10$LbaSXXK2idaMzllQQ7D60eP506dDxKSq7w3nmLUcsNJhbtlmmNHyC',NULL,'2024-08-19 12:51:36','system',1,0,'2025-02-17 16:03:05','Administrator'),(40,'saju','Saju','Sudhakaran','saju.sudhakaran@cyblore.com','9900105805','','','$2a$10$33iIyyVAleopsFA2LbTL/OamGYrnV1DLTNULqkZ/XSae75tef8ekC',NULL,'2025-02-17 15:21:39','vinod',1,1,NULL,'CEO');
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,1,'2025-02-17 15:18:05','vinod'),(40,1,'2025-02-18 09:26:40','vinod');
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
  `vazhipadu_name` varchar(100) NOT NULL,
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
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_vazhipadu_code` (`code`),
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
INSERT INTO `vazhipadu` VALUES ('fb93fc50-ba36-4f99-b8b2-1c2abf8972dc',91,'Oil for Kodimaram',201.00,0,1,0,1,0,0,'d1a30026-933a-499e-b01f-d19aa0a9d648',1,1,NULL,NULL,'vinod','2025-02-17 13:52:51','vinod','2025-02-17 14:08:00');
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

-- Dump completed on 2025-02-28  8:17:43
