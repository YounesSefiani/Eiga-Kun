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

INSERT INTO movies (title, poster, background, logo, trailer, synopsis, director, genre, theme, release_date, screen, streaming, duration, country, universe)
VALUES ("Silent Hill", "https://image.tmdb.org/t/p/original/ypm4vjs1x8w1GRidpTE3udLZCnS.jpg", "https://image.tmdb.org/t/p/original/fVxGOuEtac6By43qoVArpER2JCS.jpg", "https://image.tmdb.org/t/p/original/lzC2mzjGp09SbWyGf868tlrJ7Xs.png", "https://youtu.be/EEuEavdbmhY", "De plus en plus souvent, la petite Sharon rêve d'une ville abandonnée, Silent Hill. Sa mère, Rose, décidée à comprendre l'étrange mal dont souffre son enfant, décide de l'accompagner sur place. Alors qu'elles pénètrent dans cet univers lugubre, Sharon disparaît. Rose se lance à sa poursuite, mais se rend vite compte que ce lieu étrange ne ressemble à rien de normal. Noyée dans le brouillard, peuplée d'étranges créatures, hantée par des ténèbres vivantes qui dévorent littéralement tout ce qu'elles touchent, cette dimension va peu à peu livrer ses terrifiants secrets... Avec l'aide de Cybil, de la police locale, Rose se jette dans une quête éperdue pour arracher sa fille au monde de Silent Hill. D'indices en épreuves, elle va découvrir tout ce que Sharon risque et ce qu'elle représente dans une malédiction qui dépasse tout...", "Christophe Gans", "Horreur", "Jeux Vidéo", "2006-04-26", "Cinéma", null, "2h05", "USA", null );

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

INSERT INTO personalities (firstname, lastname, image_src, birthdate, bio, statut)
VALUES ("Sean", "Bean", "https://fr.web.img2.acsta.net/pictures/15/07/20/17/45/031961.jpg", STR_TO_DATE("17-04-1969", "%d-%m-%Y"), "Mort plusieurs fois", 'Actif.ve');

CREATE TABLE moviePersonalities (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  movie_id INT,
  personality_id INT,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

INSERT INTO moviepersonalities (movie_id, personality_id, role)
VALUES (1, 1, 'Sharon/Alessa');

INSERT INTO moviepersonalities(movie_id, personality_id, role)
VALUES (1, 2, 'Christopher Da Silva');

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