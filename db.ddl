#@(#) script.ddl

DROP TABLE IF EXISTS Ticket;
DROP TABLE IF EXISTS Ordered_snack;
DROP TABLE IF EXISTS Subscription;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS Seat;
DROP TABLE IF EXISTS Order;
DROP TABLE IF EXISTS Snack;
DROP TABLE IF EXISTS Movie_hall;
DROP TABLE IF EXISTS Movie;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Administrator;
DROP TABLE IF EXISTS Snack_type;
DROP TABLE IF EXISTS Size;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Movie_theatre;
DROP TABLE IF EXISTS Chair_type;
CREATE TABLE Chair_type
(
	title varchar (255) NOT NULL,
	price integer NOT NULL,
	id integer NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Movie_theatre
(
	address varchar (255) NOT NULL,
	id integer NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE User
(
	name varchar (255) NOT NULL,
	surname varchar (255) NOT NULL,
	password varchar (255) NOT NULL,
	email varchar (255) NOT NULL,
	role varchar (255) NOT NULL,
	id integer NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Genre
(
	id integer NOT NULL,
	name char (15) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Genre(id, name) VALUES(1, 'Animation');
INSERT INTO Genre(id, name) VALUES(2, 'Detective');
INSERT INTO Genre(id, name) VALUES(3, 'Drama');
INSERT INTO Genre(id, name) VALUES(4, 'Historical');
INSERT INTO Genre(id, name) VALUES(5, 'War');
INSERT INTO Genre(id, name) VALUES(6, 'Comedy');
INSERT INTO Genre(id, name) VALUES(7, 'Science fiction');
INSERT INTO Genre(id, name) VALUES(8, 'Adventure');
INSERT INTO Genre(id, name) VALUES(9, 'Romance');
INSERT INTO Genre(id, name) VALUES(10, 'Horror');
INSERT INTO Genre(id, name) VALUES(11, 'Action');

CREATE TABLE Size
(
	id integer NOT NULL,
	name char (6) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Size(id, name) VALUES(1, 'large');
INSERT INTO Size(id, name) VALUES(2, 'medium');
INSERT INTO Size(id, name) VALUES(3, 'small');

CREATE TABLE Snack_type
(
	id integer NOT NULL,
	name char (5) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Snack_type(id, name) VALUES(1, 'Drink');
INSERT INTO Snack_type(id, name) VALUES(2, 'Other');
INSERT INTO Snack_type(id, name) VALUES(3, 'Sweet');
INSERT INTO Snack_type(id, name) VALUES(4, 'Salty');

CREATE TABLE Administrator
(
	id integer NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(id) REFERENCES User (id)
);

CREATE TABLE Client
(
	watched_movie_count integer NOT NULL,
	favourite_genre integer NOT NULL,
	id integer NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(favourite_genre) REFERENCES Genre (id),
	FOREIGN KEY(id) REFERENCES User (id)
);

CREATE TABLE Manager
(
	id integer NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(id) REFERENCES User (id)
);

CREATE TABLE Movie
(
	title varchar (255) NOT NULL,
	description varchar (255) NOT NULL,
	duration integer NOT NULL,
	start_date date NOT NULL,
	end_date date NOT NULL,
	price float NOT NULL,
	icon varchar (255) NOT NULL,
	genre integer NOT NULL,
	id integer NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(genre) REFERENCES Genre (id)
);

CREATE TABLE Movie_hall
(
	number integer NOT NULL,
	id integer NOT NULL,
	fk_Movie_theatre_id integer NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(fk_Movie_theatre_id) REFERENCES Movie_theatre (id)
);

CREATE TABLE Snack
(
	title varchar (255) NOT NULL,
	price float NOT NULL,
	type integer NOT NULL,
	size integer NOT NULL,
	id integer NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(type) REFERENCES Snack_type (id),
	FOREIGN KEY(size) REFERENCES Size (id)
);

CREATE TABLE Order
(
	date date NOT NULL,
	is_paid boolean NOT NULL,
	answer_date date NOT NULL,
	id integer NOT NULL,
	fk_Client_id integer NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT creates FOREIGN KEY(fk_Client_id) REFERENCES Client (id)
);

CREATE TABLE Seat
(
	row integer NOT NULL,
	number integer NOT NULL,
	id integer NOT NULL,
	fk_Movie_hall_id integer NOT NULL,
	fk_Chair_type_id integer NOT NULL,
	PRIMARY KEY(id, fk_Movie_hall_id),
	FOREIGN KEY(fk_Movie_hall_id) REFERENCES Movie_hall (id),
	CONSTRAINT turi FOREIGN KEY(fk_Chair_type_id) REFERENCES Chair_type (id)
);

CREATE TABLE Session
(
	start_time date NOT NULL,
	id integer NOT NULL,
	fk_Movie_id integer NOT NULL,
	fk_Movie_hall_id integer NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT is_shown FOREIGN KEY(fk_Movie_id) REFERENCES Movie (id),
	CONSTRAINT has FOREIGN KEY(fk_Movie_hall_id) REFERENCES Movie_hall (id)
);

CREATE TABLE Subscription
(
	text varchar (255) NOT NULL,
	number integer NOT NULL,
	is_sent boolean NOT NULL,
	answer_date date NOT NULL,
	id integer NOT NULL,
	fk_Movie_id integer NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT is_a_part FOREIGN KEY(fk_Movie_id) REFERENCES Movie (id)
);

CREATE TABLE Ordered_snack
(
	amount integer NOT NULL,
	id integer NOT NULL,
	fk_Snack_id integer NOT NULL,
	fk_Order_id integer NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT is_a_part_of FOREIGN KEY(fk_Snack_id) REFERENCES Snack (id),
	CONSTRAINT is_a_part FOREIGN KEY(fk_Order_id) REFERENCES Order (id)
);

CREATE TABLE Ticket
(
	amount integer NOT NULL,
	id integer NOT NULL,
	fk_Session_id integer NOT NULL,
	fk_Order_id integer NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT has FOREIGN KEY(fk_Session_id) REFERENCES Session (id),
	CONSTRAINT is_a_part_off FOREIGN KEY(fk_Order_id) REFERENCES Order (id)
);
