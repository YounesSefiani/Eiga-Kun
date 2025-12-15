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