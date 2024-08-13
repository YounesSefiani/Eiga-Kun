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
  duration TIME,
  country VARCHAR(255),
  universe VARCHAR(255),
  subUniverse VARCHAR(255)
);

INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe, subUniverse)
VALUES ("Silent Hill", "https://image.tmdb.org/t/p/original/2I6UnjiJqmrYOzpsjIMjINcRSKF.jpg", "https://image.tmdb.org/t/p/original/fVxGOuEtac6By43qoVArpER2JCS.jpg", "https://image.tmdb.org/t/p/original/lzC2mzjGp09SbWyGf868tlrJ7Xs.png", "https://www.youtube.com/embed/EEuEavdbmhY?si=EkEccJfHHoxxaw-8", "De plus en plus souvent, la petite Sharon rêve d'une ville abandonnée, Silent Hill. Sa mère, Rose, décidée à comprendre l'étrange mal dont souffre son enfant, décide de l'accompagner sur place. Alors qu'elles pénètrent dans cet univers lugubre, Sharon disparaît. Rose se lance à sa poursuite, mais se rend vite compte que ce lieu étrange ne ressemble à rien de normal. Noyée dans le brouillard, peuplée d'étranges créatures, hantée par des ténèbres vivantes qui dévorent littéralement tout ce qu'elles touchent, cette dimension va peu à peu livrer ses terrifiants secrets... Avec l'aide de Cybil, de la police locale, Rose se jette dans une quête éperdue pour arracher sa fille au monde de Silent Hill. D'indices en épreuves, elle va découvrir tout ce que Sharon risque et ce qu'elle représente dans une malédiction qui dépasse tout... Adaptation cinématographique du jeu vidéo éponyme", "Horreur", "Jeux vidéo", "2006-04-26", "Cinéma", null, "2:05:00", "USA", "Silent Hill", null);
INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe, subUniverse)
VALUES ("L'Immensita", "https://www.themoviedb.org/t/p/original/xpCBosabexDxAxqg8NMbWR4b313.jpg", "https://www.themoviedb.org/t/p/original/bCTLIwTUm75rMzXKZ1iefCNTC1r.jpg", "https://image.tmdb.org/t/p/original/wagrDNTVuxtG2F3RQVhi9u7szv.png", "https://www.youtube.com/embed/pkN94C2PqLY?si=uJWigpY89bJN8VQD", "Rome dans les années 1970. Dans la vague des changements sociaux et culturels, Clara et Felice Borghetti ne s’aiment plus mais sont incapables de se quitter. Désemparée, Clara trouve refuge dans la relation complice qu’elle entretient avec ses trois enfants, en particulier avec l’aînée née dans un corps qui ne lui correspond pas. Faisant fi des jugements, Clara va insuffler de la fantaisie et leur transmettre le goût de la liberté, au détriment de l’équilibre familial…", "Drame", "Famille", "2023-01-11", "Cinéma", null, "1:39:00", "Italie", null, null);
INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe, subUniverse)
VALUES ("Les Rascals", "https://www.themoviedb.org/t/p/original/wLRLbM2llYKCWabFqcMCF8GycTR.jpg", "https://www.themoviedb.org/t/p/original/j7ISL9Szxc6LDT8peWmN7BscVO7.jpg", "https://image.tmdb.org/t/p/original/jp9YOKHJXVcX1jFnlEEap8iZWpk.png", "https://www.youtube.com/embed/thumLqwMIXs?si=DFzzEJxPLR6dt58C", "Les Rascals, une bande de jeunes de banlieue, profite de la vie insouciante des années 80. Chez un disquaire, l’un d’eux reconnait un skin qui l’avait agressé et décide de se faire justice lui-même. Témoin de la scène, la jeune sœur du skin se rapproche d’un étudiant extrémiste qui lui promet de se venger des Rascals. Alors que l’extrême droite gagne du terrain dans tout le pays, la bande d’amis est prise dans un engrenage. C’est la fin de l’innocence…", "Drame", "Faits réels", "2023-01-11", "Cinéma", null, "1:45:00", "France", null, null);
INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe, subUniverse)
VALUES ("Goodbye", "https://www.themoviedb.org/t/p/original/9w5mFsAX9YPI5IFOnd26q1RVStq.jpg", "https://www.themoviedb.org/t/p/original/5kmdAHM3gu1PLZafXCnMm0BE7n9.jpg", null, "https://www.youtube.com/embed/5NDn6IAHSaA?si=5Z9-nbtXR1Tiukln", "Roma est un jeune garçon qui vit à la campagne. Avec son ami d’enfance Toto ils se font appeler les « DonGlees » et ils organisent un petit spectacle de feu d’artifice tous les étés. A l’issue de sa première année de lycée, Toto revient de Tokyo où il étudie. Un nouveau venu, Drop, se joint aux DonGlees pour filmer avec son drone le spectacle vu du ciel. Mais cette fois-ci, rien ne va, les feux d’artifices ne fonctionnent pas et le drone est emporté par le vent. Au même moment, un feu de forêt se déclenche pour une cause indéterminée. La toile s’affole et blâme les DonGlees. Roma, Toto et Drop partent à la recherche du drone pour prouver leur innocence.", "Animation", "Voyage", "2023-01-18", "Cinéma", null, "1:35:00", "Japon", null, null);
INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe, subUniverse)
VALUES ("La Famille Asada", "https://www.themoviedb.org/t/p/original/eEOSiBnmm9q20W6hEkjpKGads2U.jpg", "https://www.themoviedb.org/t/p/original/2EGhE1LQwc1jiq9xbDYmGMs6Lns.jpg", "https://image.tmdb.org/t/p/original/zpHUg6ZrNujDL4oCEnuSA22Aynr.png", "https://player.vimeo.com/video/661441208?h=9eacc87eae", "Dans la famille Asada, chacun a un rêve secret : le père aurait aimé être pompier, le grand-frère pilote de formule 1 et la mère se serait bien imaginée en épouse de yakuza ! Masashi, lui, a réalisé le sien : devenir photographe. Grâce à son travail, il va permettre à chacun de réaliser que le bonheur est à portée de main.", "Drame", "Famille", "2023-01-25", "Cinéma", null, "2:07:00", "Japon", null, null);
INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe, subUniverse)
VALUES ("About Kim Sohee", "https://www.themoviedb.org/t/p/original/xMyRhSLUonwcSXwO0Hgv1KQCa3j.jpg", "https://www.themoviedb.org/t/p/original/nsuL8cSkS3Zzkr09X0LWminnOlZ.jpg", null, "https://www.youtube.com/embed/tG1fKlHakX4?si=JwcU1EP0xctbeFb5", "So-Hee, lycéenne qui travaille en apprentissage dans un centre d'appels, est impliquée dans une affaire. Le détective Yoo-Jin enquête sur l'affaire.", "Drame", "Société", "2023-02-08", "Cinéma", null, "2:15:00", "Corée du Sud", null, null);
INSERT INTO movies (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe, subUniverse)
VALUES ("The Batman", "https://image.tmdb.org/t/p/original/zlTMT3FnpAXDLrjgnDgsYxEdZeT.jpg", "https://image.tmdb.org/t/p/original/e66tM5YOawXLxhDAfWkR7sxpb3h.jpg", "https://image.tmdb.org/t/p/original/haibnO2TycgulXD1Fj7b94L9m9E.png", "https://www.youtube.com/embed/yimgJyWk2Dg?si=WsBIzcEy5CUfA2hd", "Depuis deux ans, Bruce Wayne vit une double vie. Le jour, il n'est rien d'autre que le riche milliardaire philanthrope de Gotham City. La nuit, il devient un justicier sombre et solitaire du nom de Batman. Mais son quotidien va vite changer lorsqu'il fera la rencontre d'une jeune femme aussi mystérieuse que séduisante, et affrontera un ennemi redoutable qui a un penchant bien tordu pour les énigmes.", "Thriller", "Super-Héros", "2022-03-02", "Cinéma", null, "2:55:00", "USA", "DC", "Batman");



CREATE TABLE personalities (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  image_src VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  deathdate DATE,
  origin VARCHAR(255) NOT NULL,
  bio TEXT,
  profession VARCHAR(255) NOT NULL
);

INSERT INTO personalities (fullname, image_src, birthdate, deathdate, origin, bio, profession)
VALUES ("Jodelle Ferland", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Jodelle_Ferland_%28medium_crop%29.jpg/600px-Jodelle%20Ferland%20%28medium%20crop%29.jpg", STR_TO_DATE("09-10-1994", "%d-%m-%Y"), null, "Canada", "Actrice Canadienne", "Actrice");
INSERT INTO personalities (fullname, image_src, birthdate, deathdate, origin, bio, profession)
VALUES ("Christophe Gans", "https://upload.wikimedia.org/wikipedia/commons/5/52/Christophe_Gans_2010.JPG", STR_TO_DATE("11-03-1960", "%d-%m-%Y"), null, "France", "Réalisateur français", "Réalisateur");
INSERT INTO personalities (fullname, image_src, birthdate, deathdate, origin, bio, profession)
VALUES ("Sean Bean", "https://fr.web.img2.acsta.net/pictures/15/07/20/17/45/031961.jpg", STR_TO_DATE("17-04-1959", "%d-%m-%Y"), null, "Angleterre", "Acteur Britannique", "Acteur");
INSERT INTO personalities (fullname, image_src, birthdate, deathdate, origin, bio, profession)
VALUES ("Radha Mitchell", "https://image.tmdb.org/t/p/original/ctC7epg65XgUol62d1UAoyGvNKm.jpg", STR_TO_DATE("12-11-1973", "%d-%m-%Y"), null, "Australie", "Actrice australienne", "Actrice");

CREATE TABLE movieCasting (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  movie_id INT,
  personality_id INT,
  side ENUM("Acting", "Realisation") NOT NULL,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

INSERT INTO movieCasting (movie_id, personality_id, side, role)
VALUES (1, 2, "Realisation", "Réalisateur"),
(1, 3, "Acting", "Christopher Da Silva"),
(1, 4, "Acting", "Rose Da Silva"),
(1, 1, "Acting", "Sharon / Alessa");

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
  seasons INT,
  episodes INT,
  country VARCHAR(255),
  screen ENUM('TV', 'Streaming'),
  streaming ENUM('Netflix', 'Disney +', 'Amazon Prime Vidéo', 'Paramount +', 'Apple TV', 'Salto', 'OCS', 'Canal +')
);

CREATE TABLE seasons (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  serie_id INT,
  season_number INT,
  poster VARCHAR(255),
  first_episode_date DATE,
  last_episode_date DATE,
  synopsis TEXT,
  episodes INT,
  FOREIGN KEY (serie_id) REFERENCES series(id)
);

CREATE TABLE episodes (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  serie_id INT,
  season_id INT,
  episode_number INT,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  release_date DATE,
  synopsis TEXT,
  FOREIGN KEY (season_id) REFERENCES seasons(id),
  FOREIGN KEY (serie_id) REFERENCES series(id)
);

CREATE TABLE serieCasting (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  serie_id INT,
  personality_id INT,
  side ENUM("Acting", "Realisation") NOT NULL,
  role VARCHAR(255) NOT NULL,
  presence VARCHAR(255) NOT NULL,
  FOREIGN KEY (serie_id) REFERENCES series(id) ON DELETE CASCADE,
  FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

INSERT INTO series (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, ending_date, statut, seasons, episodes, country, screen, streaming, universe)
VALUES ("Dark Matter", "https://image.tmdb.org/t/p/original/15ixZmlRK7klRC84oLKUw6WehMa.jpg", "https://image.tmdb.org/t/p/original/4wwWDjLfJVMt2hh8DIa2rzEx5VS.jpg", "https://image.tmdb.org/t/p/original/w8IeXqvHQ85sAWWx7LYbzwJH7xI.png", "https://www.youtube.com/embed/1TqwBlTQfTg?si=Yj50d5jF0udzMV17", "Six personnes se réveillent à bord d'un vaisseau spatial livré à lui-même. Elles n'ont aucun souvenir de leur passé, ni de leur identité. Aidés par un androïde, ces six nouveaux membres d'équipage vont tenter de survivre à travers l'espace et de comprendre pourquoi ils sont là et surtout, connaître qui ils sont...", "Science-Fiction", "Voyages", STR_TO_DATE("09-06-2017", "%d-%m-%Y"), STR_TO_DATE("25-08-2017", "%d-%m-%Y"), "Inachevée", 3, 39, "USA", "TV", null, null);
INSERT INTO seasons (serie_id, season_number, poster, first_episode_date, last_episode_date, synopsis, episodes)
VALUES (1, 1, "https://image.tmdb.org/t/p/original/aUSrqHdIEtPWEjn8WPtqabn0g91.jpg", STR_TO_DATE("12-06-2015", "%d-%m-%Y"), STR_TO_DATE("28-08-2015", "%d-%m-%Y"), "Six personnes se réveillent dans un vaisseau spatial...", 13),
(1, 2, "https://image.tmdb.org/t/p/original/xzezF9uMh2TviyXeMmewJ9rPgSp.jpg", STR_TO_DATE("01-07-2016", "%d-%m-%Y"), STR_TO_DATE("16-09-2016", "%d-%m-%Y"), "Six personnes se réveillent dans un vaisseau spatial...", 13),
(1, 3, "https://image.tmdb.org/t/p/original/t5cN1LwdTeRe76kfnOpaCp3mvNV.jpg", STR_TO_DATE("09-06-2017", "%d-%m-%Y"), STR_TO_DATE("25-08-2017", "%d-%m-%Y"), "Six personnes se réveillent dans un vaisseau spatial...", 13);

INSERT INTO episodes (serie_id, season_id, episode_number, title, image, release_date, synopsis)
VALUES (1, 1, 1, "Episode 1", "https://image.tmdb.org/t/p/original/d5QdWO1thZ1FqiotLpBnXOsp1MI.jpg", "2015-06-12", "Six personnes sortent de stase pour constater qu'ils sont sur un vaisseau dans l'espace, mais ils n'ont aucune idée de qui ils sont. Ils sont ensuite attaqués par un androïde et plus tard par un autre vaisseau. Après s'être échappés, ils arrivent à la destination prévue du vaisseau : une colonie sur une planète en attente d'une cargaison d'armes comme celle qu'ils portent, pour se défendre contre une menace qui approche. Ils apprennent ensuite à partir des dossiers décryptés du vaisseau que cinq d'entre eux sont des meurtriers et ils ne sont pas, comme ils l'avaient cru, là pour aider les personnes en question : ils sont là pour les tuer.");

INSERT INTO serieCasting (serie_id, personality_id, side, role, presence)
VALUES (1, 1, "Acting", "Five", "Saison 1 à 3");

INSERT INTO series (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, ending_date, statut, seasons, episodes, country, screen, streaming, universe)
VALUES ("Moon Knight", "https://image.tmdb.org/t/p/original/YksR65as1ppF2N48TJAh2PLamX.jpg", "https://image.tmdb.org/t/p/original/ktNwklnBTGRf6eHUEATLsVch2ZZ.jpg", "https://image.tmdb.org/t/p/original/mLN1xD2VogrfT1WD1Ipg6wReHXR.png", "https://www.youtube.com/embed/Vb4Y8strcaI?si=zJO1pM3gYRKufBja", "Steven Grant, un simple employé de musée est confronté à un trouble dissociatif de l'identité, dont son double, Mark Spector, est un avatar du Dieu de la lune qui a fait de lui le super-héros : Moon Knight. Accompagnés du Dieu de la Lune, Khonshu, Marc Spector & Steven Grant doivent faire face à une menace d'un culte et de leur leader malfaisant.", "Science-Fiction", "Super-Héros", STR_TO_DATE("30-03-2022", "%d-%m-%Y"), STR_TO_DATE("04-05-2022", "%d-%m-%Y"), "Achevée", 1, 6, "USA", "Streaming", "Disney +", "Marvel");
INSERT INTO seasons (serie_id, season_number, poster, first_episode_date, last_episode_date, synopsis, episodes)
VALUES (2, 1, "https://image.tmdb.org/t/p/original/11keFudto4QrgrXChukexJwdHPe.jpg", STR_TO_DATE("30-03-2022", "%d-%m-%Y"), STR_TO_DATE("04-05-2022", "%d-%m-%Y"), "Steven Grant, un simple employé de musée est confronté à un trouble dissociatif de l'identité, dont son double, Mark Spector, est un avatar du Dieu de la lune qui a fait de lui le super-héros : Moon Knight. Accompagnés du Dieu de la Lune, Khonshu, Marc Spector & Steven Grant doivent faire face à une menace d'un culte et de leur leader malfaisant.", 6);
INSERT INTO episodes (serie_id, season_id, episode_number, title, image, release_date, synopsis)
VALUES (2, 1, 1, "Le mystère du poisson rouge", "https://image.tmdb.org/t/p/original/h88DZpKIDo66Tvt556HCvq2BdR0.jpg", "2022-03-30", "Steven découvre qu'il est peut-être un super-héros, mais qu'il est aussi habité par un mercenaire."),
(2, 1, 2, "Invoque le costume", "https://media.themoviedb.org/t/p/w160_and_h90_bestv2/6TIFQdMSSwpXORoRy3P3InoopJY.jpg", "2022-04-06", "Steven se retrouve vite embarqué dans la guerre des dieux avec une mystérieuse compagne."),
(2, 1, 3, "En toute amitié", "https://media.themoviedb.org/t/p/w160_and_h90_bestv2/eg1ENRRBsWj4Xxxaz0sXwkTeVN6.jpg", "2022-04-13", "Harrow a pris de l'avance, Marc et Layla se rendent au Caire en quête d'informations."),
(2, 1, 4, "Le tombeau", "https://media.themoviedb.org/t/p/w160_and_h90_bestv2/kneOHUwZVhwhaqPJmKO39dUJMCE.jpg", "2022-04-20", "Marc et Steven doivent trouver un équilibre face aux menaces surnaturelles qui les attendent."),
(2, 1, 5, "L'asile", "https://media.themoviedb.org/t/p/w160_and_h90_bestv2/3PRA4Ir76Js1VW41vSWqvdUicNw.jpg", "2022-04-27", "Marc et Steven revisitent leurs souvenirs afin de découvrir la vérité et avancer ensemble."),
(2, 1, 6, "Des dieux et des monstres", "https://media.themoviedb.org/t/p/w160_and_h90_bestv2/oYZWV7QuyqyWYgWvPjA26wM4bTQ.jpg", "2022-05-04", "Moon Knight se mêle à la bataille. Marc, Steven et Khonshu tentent ensemble d'arrêter Ammit.");



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