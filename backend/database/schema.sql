CREATE TABLE
    movies (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        title VARCHAR(255) NOT NULL,
        poster VARCHAR(255) NULL,
        background VARCHAR(255) NULL,
        logo VARCHAR(255) NULL,
        trailer VARCHAR(255) NULL,
        synopsis TEXT NULL,
        genre VARCHAR(255) NULL,
        theme VARCHAR(255) NULL,
        release_date DATE NULL,
        screen ENUM ('Cinema', 'TV', 'DVD', 'Streaming') NULL,
        streaming VARCHAR(255) NULL,
        original VARCHAR(255) NULL,
        duration TIME NULL,
        country VARCHAR(255) NULL,
        universe VARCHAR(255) NULL,
        subUniverse VARCHAR(255) NULL
    );

INSERT INTO
    movies (
        title,
        poster,
        background,
        logo,
        trailer,
        synopsis,
        genre,
        theme,
        release_date,
        screen,
        streaming,
        original,
        duration,
        country,
        universe,
        subUniverse
    )
VALUES
    (
        "Silent Hill",
        "https://image.tmdb.org/t/p/original/2I6UnjiJqmrYOzpsjIMjINcRSKF.jpg",
        "https://image.tmdb.org/t/p/original/fVxGOuEtac6By43qoVArpER2JCS.jpg",
        "https://image.tmdb.org/t/p/original/lzC2mzjGp09SbWyGf868tlrJ7Xs.png",
        "https://www.youtube.com/embed/EEuEavdbmhY?si=EkEccJfHHoxxaw-8",
        "De plus en plus souvent, la petite Sharon rêve d'une ville abandonnée, Silent Hill. Sa mère, Rose, décidée à comprendre l'étrange mal dont souffre son enfant, décide de l'accompagner sur place. Alors qu'elles pénètrent dans cet univers lugubre, Sharon disparaît. Rose se lance à sa poursuite, mais se rend vite compte que ce lieu étrange ne ressemble à rien de normal. Noyée dans le brouillard, peuplée d'étranges créatures, hantée par des ténèbres vivantes qui dévorent littéralement tout ce qu'elles touchent, cette dimension va peu à peu livrer ses terrifiants secrets... Avec l'aide de Cybil, de la police locale, Rose se jette dans une quête éperdue pour arracher sa fille au monde de Silent Hill. D'indices en épreuves, elle va découvrir tout ce que Sharon risque et ce qu'elle représente dans une malédiction qui dépasse tout... Adaptation cinématographique du jeu vidéo éponyme",
        "Horreur",
        "Adaptation, Jeux vidéo, Mystères",
        "2006-04-26",
        "Cinéma",
        null,
        null,
        "2:05:00",
        "USA, France",
        "Silent Hill",
        null
    );

CREATE TABLE
    series (
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
        subUniverse VARCHAR(255),
        beginning_date DATE,
        ending_date DATE,
        serie_average_duration VARCHAR(255),
        statut ENUM (
            'En cours',
            'Terminée',
            'Fin de saison',
            'Annulée'
        ) NULL,
        nbSeasons INT,
        seasons INT,
        nbEpisodesSerie INT,
        episodes INT,
        duration VARCHAR(255),
        country VARCHAR(255),
        screen ENUM ('TV', 'Streaming'),
        streaming VARCHAR(255),
        original VARCHAR(255)
    );

INSERT INTO
    series (
        title,
        poster,
        background,
        logo,
        trailer,
        synopsis,
        genre,
        theme,
        universe,
        subUniverse,
        beginning_date,
        ending_date,
        serie_average_duration,
        statut,
        nbSeasons,
        seasons,
        nbEpisodesSerie,
        episodes,
        country,
        screen,
        streaming,
        original
    )
VALUES
    (
        "Marvel's Daredevil",
        "https://image.tmdb.org/t/p/original/doJ6axLfzLCDaPqFSSHjaSTYKb2.jpg",
        "https://image.tmdb.org/t/p/original/rZ1ynks9dDkIR87KGNfhZFHfEgj.jpg",
        "https://image.tmdb.org/t/p/original/jbYIbMDDMP6gTA4VjBfoMDJ3L85.png",
        "https://www.youtube.com/embed/-g8fSUNeYIE?si=oy9p_w--BZUydVx0",
        "Victime d'un accident sur la route pendant son enfance, Matt Murdock perd la vue mais ses sens se sont décuplés d'une grande ampleur. Aujourd'hui, Matt Murdock partage une double vie et combat pour la justice de deux manières. Avocat de jour, et justicier masqué de nuit sous le nom de Daredevil.",
        "Action / Thriller",
        "Super-Héros / Enquêtes",
        "Marvel",
        "Daredevil",
        "2015-04-10",
        "2018-10-19",
        "~ 45 - 60 minutes",
        "Terminée",
        "3",
        null,
        "39",
        null,
        "USA",
        "TV",
        "Disney +",
        "Netflix"
    );

CREATE TABLE
    seasons (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        serie_id INT NOT NULL,
        season_number INT NOT NULL,
        poster VARCHAR(255) NULL,
        nbEpisodesSeason INT NULL,
        episodes INT,
        first_episode_date DATE NULL,
        last_episode_date DATE NULL,
        FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE CASCADE
    );

INSERT INTO
    seasons (
        serie_id,
        season_number,
        poster,
        nbEpisodesSeason,
        episodes,
        first_episode_date,
        last_episode_date
    )
VALUES
    (
        1,
        1,
        "https://image.tmdb.org/t/p/original/mFg28Xslo8sMMRft7gxqVudCwkj.jpg",
        13,
        null,
        "2015-04-10",
        "2015-04-10"
    );

CREATE TABLE
    episodes (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        serie_id INT NOT NULL,
        season_id INT NOT NULL,
        episode_number INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        episode_image VARCHAR(255) NULL,
        synopsis TEXT NULL,
        release_date DATE NULL,
        duration TIME NULL,
        FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE CASCADE,
        FOREIGN KEY (season_id) REFERENCES seasons (id) ON DELETE CASCADE
    );

INSERT INTO
    episodes (
        serie_id,
        season_id,
        episode_number,
        title,
        episode_image,
        synopsis,
        release_date,
        duration
    )
VALUES
    (
        1,
        1,
        1,
        "Sur le ring",
        "https://image.tmdb.org/t/p/original/kmZIhYleXiEFzy9olqMMSoQ0a72.jpg",
        "Matt Murdock et Foggy Nelson prennent la défense d'une femme accusée d'un meurtre.",
        "2015-04-10",
        "00:53:00"
    );

CREATE TABLE
    personalities (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        picture VARCHAR(255) NULL,
        birthdate DATE NOT NULL,
        deathdate DATE NULL,
        nationality VARCHAR(255) NULL,
        profession VARCHAR(255) NULL,
        notable_works TEXT NULL,
        sexe ENUM (
            'Male',
            'Female',
            'Non-binary',
            'Transgender',
            'Other'
        ) NOT NULL,
        biography TEXT NULL
    );

INSERT INTO
    personalities (
        fullname,
        picture,
        birthdate,
        deathdate,
        nationality,
        profession,
        notable_works,
        sexe,
        biography
    )
VALUES
    (
        "Jodelle Ferland",
        "https://image.tmdb.org/t/p/original/6rO3WF9VWfQOpVA7LtbriJmHH7N.jpg",
        "1994-10-09",
        NULL,
        "Canadienne",
        "Actrice",
        "Silent Hill, Tideland, Twilight, chapitre 3 : Hésitation",
        "Female",
        "Actrice de la série Silent Hill"
    );

    INSERT INTO
    personalities (
        fullname,
        picture,
        birthdate,
        deathdate,
        nationality,
        profession,
        notable_works,
        sexe,
        biography
    )
VALUES
    (
        "Charlie Cox",
        "https://image.tmdb.org/t/p/original/gljtAYH5wzyrHRI87eHn6RoqTHo.jpg",
        "1982-12-15",
        NULL,
        "Britannique",
        "Acteur",
        "Marvel's Daredevil, Daredevil : Born Again, Marvel's Defenders",
        "Male",
        "Acteur de la série Marvel's Daredevil"
    );

CREATE TABLE
    castings (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        personality_id INT NOT NULL,
        movie_id INT NULL,
        serie_id INT NULL,
        role VARCHAR(255) NOT NULL,
        side ENUM ('Acting', 'Directing') NOT NULL,
        presence VARCHAR(255) NULL,
        FOREIGN KEY (personality_id) REFERENCES personalities (id) ON DELETE CASCADE,
        FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
        FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE CASCADE
    );

INSERT INTO
    castings (
        personality_id,
        movie_id,
        serie_id,
        role,
        side,
        presence
    )
VALUES
    (
        1,
        1,
        NULL,
        "Sharon DaSilva / Alessa Gillespie",
        "Acting",
        NULL
    );

    INSERT INTO
    castings (
        personality_id,
        movie_id,
        serie_id,
        role,
        side,
        presence
    )
VALUES
    (
        2,
        NULL,
        1,
        "Matt Murdock / Daredevil",
        "Acting",
        "Saison 1 à 3"
    );

CREATE TABLE
    users (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        birthdate DATE NOT NULL,
        avatar VARCHAR(255) NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM ('user', 'admin') DEFAULT 'user',
        isValidated BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

INSERT INTO
    users (username, birthdate, avatar, email, password)
VALUES
    (
        "User123",
        "1990-05-15",
        "https://m.media-amazon.com/images/M/MV5BNzg5YzY4YmYtNWQ2OC00M2U5LWI1YWQtYmU0NmIwZjJhZmIzXkEyXkFqcGdeQXZ3ZXNsZXk@._V1_.jpg",
        "7BzjI@example.com",
        "hashed_password_here"
    );

CREATE TABLE
    userFavorites (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_id INT NOT NULL,
        movie_id INT NULL,
        serie_id INT NULL,
        personality_id INT NULL,
        status ENUM (
            "liked",
            "favorite",
            "seen",
            "toWatch",
            "isWatching"
        ) NOT NULL,
        UNIQUE (user_id, movie_id, status),
        UNIQUE (user_id, serie_id, status),
        UNIQUE (user_id, personality_id, status),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
        FOREIGN KEY (serie_id) REFERENCES series(id) ON DELETE CASCADE,
        FOREIGN KEY (personality_id) REFERENCES personalities(id) ON DELETE CASCADE
    );

    INSERT INTO 
    userFavorites (user_id, movie_id, status)
VALUES
    ("1", "1", "favorite");

CREATE TABLE
    userReviews (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_id INT NOT NULL,
        movie_id INT NULL,
        serie_id INT NULL,
        personality_id INT NULL,
        rating INT CHECK (
            rating >= 1
            AND rating <= 10
        ) NULL,
        review TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
        FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE CASCADE,
        FOREIGN KEY (personality_id) REFERENCES personalities (id) ON DELETE CASCADE
    );

/* --- MOVIES INSERTS --- */
INSERT INTO
    userReviews (user_id, movie_id, rating, review)
VALUES
    ("1", "1", "10", "Un film fantastique !");