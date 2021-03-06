-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 20, 2022 at 01:02 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psa_kino_teatras`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_User_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_User_id` (`fk_User_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chair_type`
--

DROP TABLE IF EXISTS `chair_type`;
CREATE TABLE IF NOT EXISTS `chair_type` (
  `title` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `price` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `chair_type`
--

INSERT INTO `chair_type` (`title`, `price`, `id`) VALUES
('VIP', 5, 1),
('Normal', 0, 2),
('Comfy', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `watched_movie_count` int(11) NOT NULL,
  `favourite_genre` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_User_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `favourite_genre` (`favourite_genre`),
  KEY `fk_User_id` (`fk_User_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`watched_movie_count`, `favourite_genre`, `id`, `fk_User_id`) VALUES
(0, 5, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
CREATE TABLE IF NOT EXISTS `genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(15) COLLATE utf8_lithuanian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`) VALUES
(1, 'Animation'),
(2, 'Detective'),
(3, 'Drama'),
(4, 'Historical'),
(5, 'War'),
(6, 'Comedy'),
(7, 'Science fiction'),
(8, 'Adventure'),
(9, 'Romance'),
(10, 'Horror'),
(11, 'Action');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
CREATE TABLE IF NOT EXISTS `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_User_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_User_id` (`fk_User_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
CREATE TABLE IF NOT EXISTS `movie` (
  `title` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `duration` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` float NOT NULL,
  `icon` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `genre` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `genre` (`genre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`title`, `description`, `duration`, `start_date`, `end_date`, `price`, `icon`, `genre`, `id`) VALUES
('SHREK', 'good', 40, '2022-05-05', '2022-05-21', 3, '1653004563499.jpg', 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `movie_hall`
--

DROP TABLE IF EXISTS `movie_hall`;
CREATE TABLE IF NOT EXISTS `movie_hall` (
  `number` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Movie_theatre_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Movie_theatre_id` (`fk_Movie_theatre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `movie_hall`
--

INSERT INTO `movie_hall` (`number`, `id`, `fk_Movie_theatre_id`) VALUES
(420, 19, 7);

-- --------------------------------------------------------

--
-- Table structure for table `movie_theatre`
--

DROP TABLE IF EXISTS `movie_theatre`;
CREATE TABLE IF NOT EXISTS `movie_theatre` (
  `address` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `movie_theatre`
--

INSERT INTO `movie_theatre` (`address`, `id`) VALUES
('Studentu 67', 7);

-- --------------------------------------------------------

--
-- Table structure for table `ordered_snack`
--

DROP TABLE IF EXISTS `ordered_snack`;
CREATE TABLE IF NOT EXISTS `ordered_snack` (
  `amount` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Snack_id` int(11) NOT NULL,
  `fk_Order_table_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `is_a_part_of` (`fk_Snack_id`),
  KEY `is_a_part` (`fk_Order_table_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `ordered_snack`
--

INSERT INTO `ordered_snack` (`amount`, `id`, `fk_Snack_id`, `fk_Order_table_id`) VALUES
(42, 2, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
CREATE TABLE IF NOT EXISTS `order_table` (
  `order_date` date NOT NULL,
  `is_paid` tinyint(1) DEFAULT NULL,
  `answer_date` date DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Client_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creates` (`fk_Client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`order_date`, `is_paid`, `answer_date`, `id`, `fk_Client_id`) VALUES
('0001-01-01', 0, '2022-05-20', 6, 0),
('2022-05-19', NULL, NULL, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
CREATE TABLE IF NOT EXISTS `seat` (
  `row` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Movie_hall_id` int(11) NOT NULL,
  `fk_Chair_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`fk_Movie_hall_id`),
  KEY `fk_Movie_hall_id` (`fk_Movie_hall_id`),
  KEY `turi` (`fk_Chair_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`row`, `number`, `id`, `fk_Movie_hall_id`, `fk_Chair_type_id`) VALUES
(0, 0, 193, 19, 2),
(2, 2, 194, 19, -1),
(2, 3, 195, 19, -1),
(2, 4, 196, 19, -1),
(2, 5, 197, 19, -1),
(2, 6, 198, 19, -1),
(2, 7, 199, 19, 3),
(2, 8, 200, 19, -1),
(2, 9, 201, 19, 1),
(2, 10, 202, 19, -1),
(2, 1, 203, 19, -1),
(2, 11, 204, 19, -1),
(3, 1, 205, 19, -1),
(3, 2, 206, 19, -1),
(3, 3, 207, 19, -1),
(3, 4, 208, 19, -1),
(3, 5, 209, 19, -1),
(3, 6, 210, 19, -1),
(3, 7, 211, 19, -1),
(3, 8, 212, 19, 1),
(3, 9, 213, 19, -1),
(3, 0, 214, 19, -1),
(2, 0, 215, 19, -1),
(1, 11, 216, 19, -1),
(1, 10, 217, 19, 1),
(0, 1, 218, 19, -1),
(0, 2, 219, 19, -1),
(0, 3, 220, 19, -1),
(0, 4, 221, 19, -1),
(0, 5, 222, 19, -1),
(0, 6, 223, 19, -1),
(0, 7, 224, 19, -1),
(0, 8, 225, 19, -1),
(0, 9, 226, 19, -1),
(0, 10, 227, 19, -1),
(0, 11, 228, 19, 1),
(1, 0, 229, 19, -1),
(1, 1, 230, 19, -1),
(1, 2, 231, 19, -1),
(1, 3, 232, 19, -1),
(1, 4, 233, 19, -1),
(1, 5, 234, 19, -1),
(1, 6, 235, 19, -1),
(1, 7, 236, 19, -1),
(1, 8, 237, 19, 3),
(1, 9, 238, 19, -1),
(3, 10, 239, 19, -1),
(3, 11, 240, 19, -1);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `start_time` time NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Movie_id` int(11) NOT NULL,
  `fk_Movie_hall_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `is_shown` (`fk_Movie_id`),
  KEY `has` (`fk_Movie_hall_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`start_time`, `id`, `fk_Movie_id`, `fk_Movie_hall_id`) VALUES
('00:00:00', 3, 10, 19);

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
CREATE TABLE IF NOT EXISTS `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(6) COLLATE utf8_lithuanian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `name`) VALUES
(1, 'large'),
(2, 'medium'),
(3, 'small');

-- --------------------------------------------------------

--
-- Table structure for table `snack`
--

DROP TABLE IF EXISTS `snack`;
CREATE TABLE IF NOT EXISTS `snack` (
  `title` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `price` float NOT NULL,
  `type` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `size` (`size`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `snack`
--

INSERT INTO `snack` (`title`, `price`, `type`, `size`, `id`) VALUES
('Onjon', 1, 3, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `snack_type`
--

DROP TABLE IF EXISTS `snack_type`;
CREATE TABLE IF NOT EXISTS `snack_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(5) COLLATE utf8_lithuanian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `snack_type`
--

INSERT INTO `snack_type` (`id`, `name`) VALUES
(1, 'Drink'),
(2, 'Other'),
(3, 'Sweet'),
(4, 'Salty');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
CREATE TABLE IF NOT EXISTS `subscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_sent` tinyint(1) DEFAULT NULL,
  `answer_date` date DEFAULT NULL,
  `fk_Movie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Movie_id` (`fk_Movie_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `is_sent`, `answer_date`, `fk_Movie_id`) VALUES
(9, 0, NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Session_id` int(11) NOT NULL,
  `fk_Order_table_id` int(11) NOT NULL,
  `fk_Seat_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `has` (`fk_Session_id`),
  KEY `is_a_part_off` (`fk_Order_table_id`),
  KEY `fk_Seat_id` (`fk_Seat_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `fk_Session_id`, `fk_Order_table_id`, `fk_Seat_id`) VALUES
(1, 3, 5, 193);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `surname` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `surname`, `password`, `email`, `id`) VALUES
('John', 'Deere', '123', 'email@email.com', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
