CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  poster VARCHAR(255),
  background VARCHAR(255),
  logo VARCHAR(255),
  trailer VARCHAR(255),
  synopsis TEXT,
  genre VARCHAR(255),
  theme VARCHAR(255),
  release_date DATE,
  screen ENUM('Cinéma', 'TV', 'DVD', 'Streaming'),
  streaming ENUM('Netflix', 'Disney +', 'Amazon Prime Vidéo', 'Paramount +', 'Apple TV', 'Salto', 'OCS', 'Canal +'),
  duration VARCHAR(255),
  country VARCHAR(255),
  universe VARCHAR(255)
);

INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe)
VALUES ("Silent Hill", "https://image.tmdb.org/t/p/original/2I6UnjiJqmrYOzpsjIMjINcRSKF.jpg", "https://image.tmdb.org/t/p/original/fVxGOuEtac6By43qoVArpER2JCS.jpg", "https://image.tmdb.org/t/p/original/lzC2mzjGp09SbWyGf868tlrJ7Xs.png", "https://youtu.be/EEuEavdbmhY", "De plus en plus souvent, la petite Sharon rêve d'une ville abandonnée, Silent Hill. Sa mère, Rose, décidée à comprendre l'étrange mal dont souffre son enfant, décide de l'accompagner sur place. Alors qu'elles pénètrent dans cet univers lugubre, Sharon disparaît. Rose se lance à sa poursuite, mais se rend vite compte que ce lieu étrange ne ressemble à rien de normal. Noyée dans le brouillard, peuplée d'étranges créatures, hantée par des ténèbres vivantes qui dévorent littéralement tout ce qu'elles touchent, cette dimension va peu à peu livrer ses terrifiants secrets... Avec l'aide de Cybil, de la police locale, Rose se jette dans une quête éperdue pour arracher sa fille au monde de Silent Hill. D'indices en épreuves, elle va découvrir tout ce que Sharon risque et ce qu'elle représente dans une malédiction qui dépasse tout... Adaptation cinématographique du jeu vidéo éponyme", "Horreur", "Jeux vidéo", STR_TO_DATE("26-04-2006", "%d-%m-%Y"), "Cinéma", null, "2h05", "USA", null );


CREATE TABLE personalities (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  image_src VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  origin VARCHAR(255) NOT NULL,
  deathdate DATE,
  bio TEXT,
  statut ENUM('Actif.ve', 'Retraité.e', 'Décédé.e'),
  profession ENUM('Acteur', 'Actrice', 'Réalisateur', 'Réalisatrice', 'Scénariste', 'Producteur', 'Productrice')
);

INSERT INTO personalities (firstname, lastname, image_src, birthdate, origin, bio, statut, profession)
VALUES ("Jodelle", "Ferland", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Jodelle_Ferland_%28medium_crop%29.jpg/600px-Jodelle%20Ferland%20%28medium%20crop%29.jpg", STR_TO_DATE("09-10-1994", "%d-%m-%Y"), "Canada", "Actrice Canadienne", "Actif.ve", "Actrice");
INSERT INTO personalities(firstname, lastname, image_src, birthdate, origin, bio, statut, profession)
VALUES ("Christophe", "Gans", "https://upload.wikimedia.org/wikipedia/commons/5/52/Christophe_Gans_2010.JPG", STR_TO_DATE("11-03-1960", "%d-%m-%Y"), "France", "Réalisateur français", "Actif.ve", "Réalisateur");
INSERT INTO personalities(firstname, lastname, image_src, birthdate, origin, bio, statut, profession)
VALUES ("Sean", "Bean", "https://fr.web.img2.acsta.net/pictures/15/07/20/17/45/031961.jpg", STR_TO_DATE("17-04-1959", "%d-%m-%Y"), "Angleterre", "Acteur Britannique", "Actif.ve", "Acteur" );
INSERT INTO personalities(firstname, lastname, image_src, birthdate, origin, bio, statut, profession)
VALUES ("Radha", "Mitchell", "https://image.tmdb.org/t/p/original/ctC7epg65XgUol62d1UAoyGvNKm.jpg", STR_TO_DATE("12-11-1973", "%d-%m-%Y"), "Australie", "Actrice australienne", "Actif.ve", "Actrice");
CREATE TABLE movieCasting (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  movie_id INT,
  personality_id INT,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

INSERT INTO movieCasting (movie_id, personality_id, role)
VALUES (1, 1, "Sharon / Alessa");
INSERT INTO movieCasting (movie_id, personality_id, role)
VALUES (1, 3, "Christopher Da Silva");
INSERT INTO moviecasting (movie_id, personality_id, role)
VALUES (1, 4, "Rose Da Silva");

CREATE TABLE directorMovie (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  movie_id INT,
  personality_id INT,
  profession ENUM('Réalisateur', 'Réalisatrice', 'Scénariste', 'Producteur', 'Productrice'),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);
INSERT INTO directorMovie (movie_id, personality_id, profession)
VALUES (1, 2, 'Réalisateur');

CREATE TABLE series (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  poster VARCHAR(255),
  background VARCHAR(255),
  logo VARCHAR(255),
  trailer VARCHAR(255),
  synopsis TEXT,
  genre VARCHAR(255),
  theme VARCHAR(255),
  universe VARCHAR(255),
  release_date DATE,
  ending_date DATE,
  statut ENUM('En cours', 'Achevée', 'Inachevée'),
  seasons VARCHAR(255),
  episodes VARCHAR(255),
  country VARCHAR(255),
  director VARCHAR(255),
  screen ENUM('TV', 'Streaming'),
  streaming ENUM('Netflix', 'Disney +', 'Amazon Prime Vidéo', 'Paramount +', 'Apple TV', 'Salto', 'OCS', 'Canal +')
);

CREATE TABLE seasons (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  series_id INT,
  season_number INT,
  first_episode_date DATE,
  last_episode_date DATE,
  synopsis TEXT,
  episodes_count INT,
  FOREIGN KEY (series_id) REFERENCES series(id)
);

CREATE TABLE episodes (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  season_id INT,
  episode_number INT,
  title VARCHAR(255) NOT NULL,
  release_date DATE,
  synopsis TEXT,
  FOREIGN KEY (season_id) REFERENCES seasons(id)
);

INSERT INTO series (title, director, poster, background, logo, trailer, synopsis, genre, release_date, ending_date, screen, statut, streaming, seasons, episodes, country, universe)
VALUES ("Dark Matter", "Paul Mullie" "Joseph Mallozzi", "https://image.tmdb.org/t/p/original/oWYOFBvIMkW64n51uD4mdje6k2u.jpg", "https://image.tmdb.org/t/p/original/4wwWDjLfJVMt2hh8DIa2rzEx5VS.jpg", "https://image.tmdb.org/t/p/original/w8IeXqvHQ85sAWWx7LYbzwJH7xI.png", "https://youtu.be/asNlmlj-Dxs", "Six personnes se réveillent à bord d'un vaisseau spatial livré à lui-même. Elles n'ont aucun souvenir de leur passé, ni de leur identité. Aidés par un androïde, ces six nouveaux membres d'équipage vont tenter de survivre à travers l'espace et de comprendre pourquoi ils sont là et surtout, connaître qui ils sont...", "Science-Fiction", STR_TO_DATE("09-06-2017", "%d-%m-%Y"), STR_TO_DATE("25-08-2017", "%d-%m-%Y"), "TV", "Inachevée", null, "3", "39", "USA", null);

INSERT INTO seasons (series_id, season_number, first_episode_date, last_episode_date, synopsis, episodes_count)
VALUES (1, 1, STR_TO_DATE("12-06-2015", "%d-%m-%Y"), STR_TO_DATE("28-08-2015", "%d-%m-%Y"), "Six personnes se réveillent dans un vaisseau spatial...", 13);

CREATE TABLE serieCasting (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  serie_id INT,
  personality_id INT,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (serie_id) REFERENCES series(id) ON DELETE CASCADE,
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

INSERT INTO serieCasting (serie_id, personality_id, role)
VALUES (1, 1, 'Five');

CREATE TABLE directorSerie (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  serie_id INT,
  personality_id INT,
  FOREIGN KEY (serie_id) REFERENCES series(id) ON DELETE CASCADE,
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

CREATE TABLE cinemas (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  coordonnes_x DECIMAL(10,6) NOT NULL,
  coordonnes_y DECIMAL(9,6) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  website VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);

INSERT INTO cinemas (name, coordonnes_x, coordonnes_y, city, address, website, image)
VALUES ("Cinéma Eldorado", 47.31459, 5.04877, "Dijon", "21 rue Alfred de Musset", "https://cinemaeldorado.wordpress.com/", "https://dijon-actualites.fr/wp-content/uploads/2023/12/80l064411.jpg");

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
  CONSTRAINT fk_profil_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (mail, password, role)
VALUES ("sam.lake@hotmail.fr", "12345678", "User");
SET @user_id = LAST_INSERT_ID();
INSERT INTO profils (pseudo, firstname, lastname, gender, birthdate, postalCode, city, image, user_id)
VALUES ("Remedy4Life", "Sam", "Lake", "Male", STR_TO_DATE("04-03-1972", "%d-%m-%Y"), "21000", "Dijon", "https://upload.wikimedia.org/wikipedia/commons/2/24/Sam_Lake-MichaelF%C3%B6rtsch.jpg", @user_id);

CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  content LONGTEXT NULL,
  image_src VARCHAR(255) NOT NULL,
  image_alt VARCHAR(255) NOT NULL,
  caption VARCHAR(255) NULL,
  category ENUM("Article", "Anecdote", "Critique", "Chronicles") NOT NULL,
  CONSTRAINT fk_article_by_author FOREIGN KEY (author_id) REFERENCES profils(id)
);

INSERT INTO articles (title, description, author_id, created_at, content, image_src, image_alt, caption, category)
VALUES ("Un article", "Ceci est un article", 1, "2024-02-26", "Voici un article écrit aujourd'hui", "https://pbs.twimg.com/profile_images/528993730678620160/pO08oacY_400x400.jpeg", "Article Random", "Ceci est une photo random", "Chronicles");