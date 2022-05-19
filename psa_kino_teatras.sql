-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 19, 2022 at 11:24 AM
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
(0, 1, 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`title`, `description`, `duration`, `start_date`, `end_date`, `price`, `icon`, `genre`, `id`) VALUES
('shriek', 'dasdasdasd', 40, '2022-05-13', '2022-05-19', 40, '1652657851716.jpg', 1, 9);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `movie_hall`
--

INSERT INTO `movie_hall` (`number`, `id`, `fk_Movie_theatre_id`) VALUES
(0, 1, 2),
(10, 2, 2),
(69, 3, 2),
(40, 5, 2),
(67, 6, 2),
(14, 7, 2),
(55, 8, 2),
(79, 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `movie_theatre`
--

DROP TABLE IF EXISTS `movie_theatre`;
CREATE TABLE IF NOT EXISTS `movie_theatre` (
  `address` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `movie_theatre`
--

INSERT INTO `movie_theatre` (`address`, `id`) VALUES
('test', 2),
('huh', 3);

-- --------------------------------------------------------

--
-- Table structure for table `ordered_snack`
--

DROP TABLE IF EXISTS `ordered_snack`;
CREATE TABLE IF NOT EXISTS `ordered_snack` (
  `amount` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `fk_Snack_id` int(11) NOT NULL,
  `fk_Order_table_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `is_a_part_of` (`fk_Snack_id`),
  KEY `is_a_part` (`fk_Order_table_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
CREATE TABLE IF NOT EXISTS `order_table` (
  `order_date` date NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `answer_date` date NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Client_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creates` (`fk_Client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`row`, `number`, `id`, `fk_Movie_hall_id`, `fk_Chair_type_id`) VALUES
(0, 0, 1, 9, 3),
(2, 2, 2, 9, -1),
(2, 3, 3, 9, -1),
(2, 4, 4, 9, -1),
(2, 5, 5, 9, -1),
(2, 6, 6, 9, -1),
(2, 7, 7, 9, -1),
(2, 8, 8, 9, -1),
(2, 9, 9, 9, -1),
(2, 10, 10, 9, -1),
(2, 1, 11, 9, -1),
(2, 11, 12, 9, -1),
(3, 1, 13, 9, -1),
(3, 2, 14, 9, -1),
(3, 3, 15, 9, -1),
(3, 4, 16, 9, -1),
(3, 5, 17, 9, -1),
(3, 6, 18, 9, -1),
(3, 7, 19, 9, -1),
(3, 8, 20, 9, -1),
(3, 9, 21, 9, -1),
(3, 0, 22, 9, -1),
(2, 0, 23, 9, -1),
(1, 11, 24, 9, -1),
(1, 10, 25, 9, -1),
(0, 1, 26, 9, 1),
(0, 2, 27, 9, 2),
(0, 3, 28, 9, 3),
(0, 4, 29, 9, -1),
(0, 5, 30, 9, -1),
(0, 6, 31, 9, -1),
(0, 7, 32, 9, -1),
(0, 8, 33, 9, -1),
(0, 9, 34, 9, -1),
(0, 10, 35, 9, -1),
(0, 11, 36, 9, -1),
(1, 0, 37, 9, -1),
(1, 1, 38, 9, -1),
(1, 2, 39, 9, -1),
(1, 3, 40, 9, -1),
(1, 4, 41, 9, -1),
(1, 5, 42, 9, -1),
(1, 6, 43, 9, -1),
(1, 7, 44, 9, -1),
(1, 8, 45, 9, -1),
(1, 9, 46, 9, -1),
(3, 10, 47, 9, -1),
(3, 11, 48, 9, -1);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `start_time` date NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_Movie_id` int(11) NOT NULL,
  `fk_Movie_hall_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `is_shown` (`fk_Movie_id`),
  KEY `has` (`fk_Movie_hall_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `is_sent`, `answer_date`, `fk_Movie_id`) VALUES
(1, 0, NULL, 5),
(2, 0, NULL, 6),
(3, 0, NULL, 7),
(4, 0, NULL, 8),
(5, 0, NULL, 9),
(6, 0, NULL, 10),
(7, 0, NULL, 11),
(8, 0, NULL, 12);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `amount` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `fk_Session_id` int(11) NOT NULL,
  `fk_Order_table_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `has` (`fk_Session_id`),
  KEY `is_a_part_off` (`fk_Order_table_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
