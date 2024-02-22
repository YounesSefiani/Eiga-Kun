CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  poster VARCHAR(255),
  background VARCHAR(255),
  logo VARCHAR(255),
  trailer VARCHAR(255),
  synopsis TEXT,
  director VARCHAR(255),
  genre VARCHAR(255),
  theme VARCHAR(255),
  release_date DATE,
  screen ENUM('Cinéma', 'TV', 'DVD', 'Streaming'),
  streaming ENUM('Netflix', 'Disney +', 'Amazon Prime Vidéo', 'Paramount +', 'Apple TV', 'Salto', 'OCS', 'Canal +'),
  duration VARCHAR(255),
  country VARCHAR(255),
  universe VARCHAR(255)
);

CREATE TABLE personalities (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  image_src VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  deathdate DATE,
  bio TEXT,
  statut ENUM('Actif.ve', 'Retraité.e', 'Décédé.e')
);

INSERT INTO personalities (firstname, lastname, image_src, birthdate, bio, statut)
VALUES ("Jodelle", "Ferland", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Jodelle_Ferland_%28medium_crop%29.jpg/600px-Jodelle%20Ferland%20%28medium%20crop%29.jpg", STR_TO_DATE("09-10-1994", "%d-%m-%Y"), "Actrice Canadienne", "Actif.ve");

CREATE TABLE moviePersonalities (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  movie_id INT,
  personality_id INT,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

CREATE TABLE series (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  poster VARCHAR(255),
  background VARCHAR(255),
  logo VARCHAR(255),
  trailer VARCHAR(255),
  synopsis VARCHAR(255),
  genre VARCHAR(255),
  universe VARCHAR(255),
  release_date DATE,
  ending_date DATE,
  status ENUM('En cours', 'Achevée', 'Inachevée'),
  seasons VARCHAR(255),
  episodes VARCHAR(255),
  country VARCHAR(255),
  director VARCHAR(255),
  screen ENUM('TV', 'Streaming'),
  streaming ENUM('Netflix', 'Disney +', 'Amazon Prime Vidéo', 'Paramount +', 'Apple TV', 'Salto', 'OCS', 'Canal +')
);

CREATE TABLE seriePersonalities (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  serie_id INT,
  personality_id INT,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (serie_id) REFERENCES series(id),
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

CREATE TABLE cinemas (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  coordonnes_x DECIMAL(10,6) NOT NULL,
  coordonnes_y DECIMAL(9,6) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  website VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  mail VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('User', 'Admin') DEFAULT 'User'
);

CREATE TABLE profils (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  pseudo VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  postalCode VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  user_id INT NOT NULL,
  CONSTRAINT fk_profil_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  content LONGTEXT NULL,
  image_src VARCHAR(255) NOT NULL,
  image_alt VARCHAR(255) NOT NULL,
  caption VARCHAR(255) NOT NULL,
  category ENUM("Article", "Anecdote", "Critique", "Chronicles") NOT NULL,
  CONSTRAINT fk_article_by_author FOREIGN KEY (author_id) REFERENCES profils(id)

)