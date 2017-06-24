CREATE TABLE `technology` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(1000),
  PRIMARY KEY (`id`)
);

CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `technology_id` int(11) NOT NULL,
  `information` varchar(2000),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`technology_id`)
        REFERENCES `technology` (`id`)
);

INSERT INTO `technology` (name,description) values
        ('JavaScript', 'An object-oriented language used to create dynamic and interactive web pages');

INSERT INTO `topic` (name, technology_id, information) values
        ('JQuery', 1, 'A JavaScript library that makes it easier to use JS. Simplifies traversing HTML docs and DOM manipulation.');

INSERT INTO `topic` (name, technology_id, information) values
        ('REST',1, 'Representational State Transfer, an architecture that suggests using HTTP methods to interact with a database.');

INSERT INTO `topic` (name, technology_id, information) values
        ('AJAX',1, 'Asynchronous JavaScript and XML, a method of exchanging data with a server while updating the contents of a webpage.');
