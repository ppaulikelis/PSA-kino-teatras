-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 08, 2022 at 04:57 PM
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `watched_movie_count` int(11) NOT NULL,
  `favourite_genre` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `favourite_genre` (`favourite_genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie_theatre`
--

DROP TABLE IF EXISTS `movie_theatre`;
CREATE TABLE IF NOT EXISTS `movie_theatre` (
  `address` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `surname` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
