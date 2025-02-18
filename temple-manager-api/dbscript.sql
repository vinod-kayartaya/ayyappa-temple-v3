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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `privileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilege` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `parent_privilege_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles_privileges` (
  `role_id` int NOT NULL,
  `privilege_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`,`privilege_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50),
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_categories_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `suppliers` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `short_form` varchar(20),
  `type` varchar(50),
  `address` text,
  `phone` varchar(50),
  `email` varchar(255),
  `reorder_level` int,
  `margin_percentage` decimal(5,2),
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50),
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_suppliers_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `deities` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `unit` varchar(20),
  `supplier_id` varchar(36),
  `category_id` varchar(36),
  `price` decimal(10,2) NOT NULL,
  `cost_price` decimal(10,2) NOT NULL,
  `commission_percentage` decimal(5,2),
  `tax_percentage` decimal(5,2),
  `ast_percentage` decimal(5,2),
  `opening_stock` int DEFAULT 0,
  `issued` int DEFAULT 0,
  `received` int DEFAULT 0,
  `damaged` int DEFAULT 0,
  `sales_returned` int DEFAULT 0,
  `purchases_returned` int DEFAULT 0,
  `blocked` int DEFAULT 0,
  `quantity_in_stock` int DEFAULT 0,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50),
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_products_code` (`code`),
  FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `offering_categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50),
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vazhipadu` (
  `id` varchar(36) NOT NULL,
  `code` int NOT NULL,
  `vazhipadu_name` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `daily_count` int,
  `time_am_pm` int,
  `times_per_day` int,
  `days` int,
  `blocking` boolean DEFAULT false,
  `seasonal` boolean DEFAULT false,
  `offering_category_id` varchar(36),
  `receipt` boolean DEFAULT true,
  `booking_required` boolean DEFAULT false,
  `account_head_id` varchar(36),
  `account_sub_head_id` varchar(36),
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` varchar(50),
  `last_updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_vazhipadu_code` (`code`),
  FOREIGN KEY (`offering_category_id`) REFERENCES `offering_categories` (`id`),
  FOREIGN KEY (`account_head_id`) REFERENCES `account_heads` (`id`),
  FOREIGN KEY (`account_sub_head_id`) REFERENCES `account_sub_heads` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` VALUES (1,'vinod','Vinod','Kumar','vinod@vinod.co','9731424784','vinod@xmpl.com',NULL,'$2a$10$MofSKsvSo4wztThSo5/TAuu8gjUDmIqKV/H6eI7puLF//oawWbqVC',NULL,'2024-08-19 12:51:36','system',1,0,'2024-09-16 10:21:54','Administrator');

INSERT INTO `roles` VALUES (1,'ADMIN','2024-08-19 12:51:36','system');

INSERT INTO `users_roles` VALUES (1,1,'2024-08-19 12:51:36','system');

CREATE TABLE devotee_offerings (
    id VARCHAR(36) PRIMARY KEY,
    transaction_date DATE NOT NULL,
    offering_date DATE NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_updated_by VARCHAR(50),
    last_updated_at TIMESTAMP
);

CREATE TABLE devotee_offering_items (
    id VARCHAR(36) PRIMARY KEY,
    devotee_offering_id VARCHAR(36) NOT NULL,
    devotee_mobile_number VARCHAR(15),
    vazhipadu_id VARCHAR(36) NOT NULL,
    devotee_name VARCHAR(100) NOT NULL,
    devotee_nakshtram VARCHAR(50),
    deity_name VARCHAR(50),
    nos INTEGER NOT NULL DEFAULT 1,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (devotee_offering_id) REFERENCES devotee_offerings(id),
    FOREIGN KEY (vazhipadu_id) REFERENCES vazhipadu(id)
);