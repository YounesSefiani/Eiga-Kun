CREATE TABLE
    movies (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        title VARCHAR(255) NOT NULL,
        poster VARCHAR(255) NULL,
        background VARCHAR(255) NULL,
        logo VARCHAR(255) NULL,
        trailer VARCHAR(255) NULL,
        synopsis TEXT NULL,
        genre INT NULL,
        theme INT NULL,
        release_date DATE NULL,
        screen ENUM ('Cinema', 'TV', 'DVD', 'Streaming') NULL,
        streaming VARCHAR(255) NULL,
        original VARCHAR(255) NULL,
        duration TIME NULL,
        nationality INT NULL,
        universe INT NULL,
        subUniverse INT NULL
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
        nationality,
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
        7,
        5,
        "2006-04-26",
        "Cinéma",
        null,
        null,
        "2:05:00",
        1,
        null,
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
            'Prochaine saison à venir',
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
        season_poster VARCHAR(255) NULL,
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
        season_poster,
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
    genres (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL UNIQUE,
        imageGenre VARCHAR(255) NULL
    );

INSERT INTO
    genres (name, imageGenre)
VALUES
    (
        "Action",
        "https://image.tmdb.org/t/p/original/r17jFHAemzcWPPtoO0UxjIX0xas.jpg"
    ),
    (
        "Aventure",
        "https://image.tmdb.org/t/p/original/9lm7drIvSPANclGcbVUYJlK4ivh.jpg"
    ),
    (
        "Comédie",
        "https://image.tmdb.org/t/p/original/bQlw59HncOXX9alFlOYKHAvSnm.jpg"
    ),
    (
        "Musical",
        "https://image.tmdb.org/t/p/original/qhRbhkw9aQMM3uqCt1F06vz5xXu.jpg"
    ),
    (
        "Romance",
        "https://image.tmdb.org/t/p/original/sCzcYW9h55WcesOqA12cgEr9Exw.jpg"
    ),
    (
        "Drame",
        "https://image.tmdb.org/t/p/original/esIkb7Wkfk016ZNpqX24w0gbgkb.jpg"
    ),
    (
        "Horreur",
        "https://image.tmdb.org/t/p/original/7sK1fJTh6ndhI7gRg1L9VS4260r.jpg"
    ),
    (
        "Fantastique",
        "https://image.tmdb.org/t/p/original/pZIiPOoNhhzVpBuVEpDK7vbBz4l.jpg"
    ),
    (
        "Science-Fiction",
        "https://image.tmdb.org/t/p/original/h3HsfV8Kn9Sz2QWUYYdP5ya23hx.jpg"
    ),
    (
        "Thriller",
        "https://image.tmdb.org/t/p/original/8eihUxjQsJ7WvGySkVMC0EwbPAD.jpg"
    ),
    (
        "Animation",
        "https://image.tmdb.org/t/p/original/19SRdYFaxTbqG8rc9CpXmfLpPoM.jpg"
    ),
    (
        "Documentaire",
        "https://image.tmdb.org/t/p/original/f589RGsnKpDvHu9qvELM6LZBEbG.jpg"
    ),
    (
        "Western",
        "https://image.tmdb.org/t/p/original/x4biAVdPVCghBlsVIzB6NmbghIz.jpg"
    ),
    (
        "Biopic",
        "https://image.tmdb.org/t/p/original/bBdYxkiDVGjKHmlyGa5WG1EVTI4.jpg"
    ),
    (
        "Guerre",
        "https://image.tmdb.org/t/p/original/z2NFCCvH3joRoTWHuNDS499FypC.jpg"
    );

CREATE TABLE
    themes (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL UNIQUE,
        imageTheme VARCHAR(255) NULL
    );

INSERT INTO
    themes (name, imageTheme)
VALUES
    (
        "Super-Héros",
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg"
    ),
    (
        "Arts Martiaux",
        "https://image.tmdb.org/t/p/original/b9G01LQzVhxgxdFOgopYlShM4L5.jpg"
    ),
    (
        "Enquêtes",
        "https://image.tmdb.org/t/p/original/i5H7zusQGsysGQ8i6P361Vnr0n2.jpg"
    ),
    (
        "Adaptation de livres",
        "https://image.tmdb.org/t/p/original/gEHDCtR9PNZvLG70sFBYJCFznRY.jpg"
    ),
    (
        "Adaptation de jeux vidéos",
        "https://image.tmdb.org/t/p/original/WcmrlndXAPw3a2l9VJw9hHeKOo.jpg"
    ),
    (
        "Adaptation de bande dessinés",
        "https://image.tmdb.org/t/p/original/1FxwuCdaMmCEsl3hSlafKRHR8Th.jpg"
    ),
    (
        "Paranormal",
        "https://image.tmdb.org/t/p/original/1AXNgpcJ4Ks4vZ6MlpyyRNw5OGD.jpg"
    ),
    (
        "Voyages",
        "https://image.tmdb.org/t/p/original/m4TUa2ciEWSlk37rOsjiSIvZDXE.jpg"
    ),
    (
        "Adaptation de comics",
        "https://image.tmdb.org/t/p/original/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg"
    ),
    (
        "Found-Footage",
        "https://image.tmdb.org/t/p/original/xs0A4iWEg0cy65hBTyJRLrA3kNS.jpg"
    ),
    (
        "Peplum",
        "https://image.tmdb.org/t/p/original/jhk6D8pim3yaByu1801kMoxXFaX.jpg"
    );

CREATE TABLE
    universes (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL UNIQUE,
        imageUniverse VARCHAR(255) NULL
    );

INSERT INTO
    universes (name, imageUniverse)
VALUES
    (
        "Marvel",
        "https://upload.wikimedia.org/wikipedia/commons/9/90/Marvel_Studios_logo.jpg?utm_source=fr.wikipedia.org&utm_campaign=index&utm_content=original"
    ),
    (
        "DC",
        "https://sm.ign.com/ign_fr/news/d/dc-studios/dc-studios-logo-has-been-revealed-and-its-a-nod-to-a-classic_7he9.jpg"
    ),
    (
        "Harry Potter",
        "https://image.tmdb.org/t/p/original/zNV7PLIKRaqi7zXNKYljyAaVShZ.png"
    ),
    (
        "Star Wars",
        "https://image.tmdb.org/t/p/original/uuYGkf8rGl7nJ92jaXt7f9plL4p.png"
    ),
    (
        "Terminator",
        "https://image.tmdb.org/t/p/original/ipgDUr7fD8adbqHfCssloIultfN.png"
    );

CREATE TABLE
    subUniverses (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        universe_id INT NOT NULL,
        name VARCHAR(255) NOT NULL UNIQUE,
        imageSubUniverse VARCHAR(255) NULL,
        FOREIGN KEY (universe_id) REFERENCES universes (id) ON DELETE CASCADE
    );

INSERT INTO
    subUniverses (universe_id, name, imageSubUniverse)
VALUES
    (
        1,
        "Spider-Man",
        "https://image.tmdb.org/t/p/original/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg"
    ),
    (
        1,
        "Daredevil",
        "https://image.tmdb.org/t/p/original/jy8zlPPD3LQZa2Cq41iRg6IXD7u.jpg"
    ),
    (
        1,
        "Avengers",
        "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"
    ),
    (
        2,
        "Batman",
        "https://image.tmdb.org/t/p/original/zlsaQEE26TS34ziXAiNIAqa0MLX.jpg"
    ),
    (
        2,
        "Superman",
        "https://image.tmdb.org/t/p/original/bWZwiaJSXwYILxi3bE5Quwy5UXC.jpg"
    );

CREATE TABLE
    nationalities (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL UNIQUE,
        code VARCHAR(10) NULL,
        imageNationality VARCHAR(255) NULL
    );

INSERT INTO
    nationalities (name, code, imageNationality)
VALUES
    (
        "France",
        "fr",
        "https://www.drapeauxdespays.fr/data/flags/w580/fr.webp"
    ),
    (
        "USA",
        "us",
        "https://www.drapeauxdespays.fr/data/flags/w580/us.webp"
    ),
    (
        "Canada",
        "ca",
        "https://www.drapeauxdespays.fr/data/flags/w580/ca.webp"
    ),
    (
        "Royaume-Uni",
        "gb",
        "https://www.drapeauxdespays.fr/data/flags/w580/gb.webp"
    ),
    (
        "Allemagne",
        "de",
        "https://www.drapeauxdespays.fr/data/flags/w580/de.webp"
    ),
    (
        "Italie",
        "it",
        "https://www.drapeauxdespays.fr/data/flags/w580/it.webp"
    ),
    (
        "Espagne",
        "es",
        "https://www.drapeauxdespays.fr/data/flags/w580/es.webp"
    ),
    (
        "Japon",
        "jp",
        "https://www.drapeauxdespays.fr/data/flags/w580/jp.webp"
    ),
    (
        "Chine",
        "cn",
        "https://www.drapeauxdespays.fr/data/flags/w580/cn.webp"
    ),
    (
        "Inde",
        "in",
        "https://www.drapeauxdespays.fr/data/flags/w580/in.webp"
    ),
    (
        "Brésil",
        "br",
        "https://www.drapeauxdespays.fr/data/flags/w580/br.webp"
    ),
    (
        "Australie",
        "au",
        "https://www.drapeauxdespays.fr/data/flags/w580/au.webp"
    ),
    (
        "Russie",
        "ru",
        "https://www.drapeauxdespays.fr/data/flags/w580/ru.webp"
    ),
    (
        "Mexique",
        "mx",
        "https://www.drapeauxdespays.fr/data/flags/w580/mx.webp"
    ),
    (
        "Argentine",
        "ar",
        "https://www.drapeauxdespays.fr/data/flags/w580/ar.webp"
    ),
    (
        "Afrique du Sud",
        "za",
        "https://www.drapeauxdespays.fr/data/flags/w580/za.webp"
    ),
    (
        "Corée du Sud",
        "kr",
        "https://www.drapeauxdespays.fr/data/flags/w580/kr.webp"
    ),
    (
        "Turquie",
        "tr",
        "https://www.drapeauxdespays.fr/data/flags/w580/tr.webp"
    ),
    (
        "Pays-Bas",
        "nl",
        "https://www.drapeauxdespays.fr/data/flags/w580/nl.webp"
    ),
    (
        "Suède",
        "se",
        "https://www.drapeauxdespays.fr/data/flags/w580/se.webp"
    );

ALTER TABLE movies
    ADD FOREIGN KEY (genre) REFERENCES genres (id) ON DELETE SET NULL,
    ADD FOREIGN KEY (theme) REFERENCES themes (id) ON DELETE SET NULL,
    ADD FOREIGN KEY (nationality) REFERENCES nationalities (id) ON DELETE SET NULL,
    ADD FOREIGN KEY (universe) REFERENCES universes (id) ON DELETE SET NULL,
    ADD FOREIGN KEY (subUniverse) REFERENCES subUniverses (id) ON DELETE SET NULL;

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
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
        FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE CASCADE,
        FOREIGN KEY (personality_id) REFERENCES personalities (id) ON DELETE CASCADE
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