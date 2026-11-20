CREATE TABLE movies (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255) NULL,
    poster VARCHAR(255) NULL,
    original_poster VARCHAR(255) NULL,
    background VARCHAR(255) NULL,
    logo VARCHAR(255) NULL,
    original_logo VARCHAR(255) NULL,
    trailer VARCHAR(255) NULL,
    synopsis TEXT NULL,
    release_date DATE NULL,
    duration TIME NULL,
    SCREEN ENUM(
        'Cinema',
        'Streaming',
        'TV',
        'DVD'
    ) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
    movies (
        title,
        original_title,
        poster,
        original_poster,
        background,
        logo,
        original_logo,
        trailer,
        synopsis,
        release_date,
        duration,
        SCREEN
    )
VALUES (
        "Spider-Man",
        NULL,
        "https://image.tmdb.org/t/p/original/or6XJBVpcEbIkma0V9zshnbEtx4.jpg",
        NULL,
        "https://image.tmdb.org/t/p/original/g0gAtf7S7kKWHTCoeoiWrQqz5SF.jpg",
        "https://image.tmdb.org/t/p/original/j8wlgsvxP6YRBBEHzCE5ECW4JQd.png",
        NULL,
        "https://www.youtube.com/embed/OFijO5eH3ok?si=LILCMAgX5QkzLBTp",
        "Peter Parker est un adolescent ordinaire jusqu'à la morsure d'une araignée génétiquement modifiée. Cette morsure a renforcé sa force, son agilité, en plus d'acquérir sa capacité à grimper sur les murs, un sixième sens arachnéen, et tisser des toiles organiques. Il va devoir mettre tout ça en pratique pour affronter la criminalité et un ennemi coriace.",
        "2002-06-12",
        "02:01:00",
        "Cinema"
    ),
    (
        "Spider-Man 2",
        NULL,
        "https://image.tmdb.org/t/p/original/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg",
        NULL,
        "https://image.tmdb.org/t/p/original/l7YISsScUdvsyHoLlM7x4PIqbiA.jpg",
        "https://image.tmdb.org/t/p/original/qdQT0IXmpbhxZerwwX0HnDWE687.png",
        NULL,
        "https://www.youtube.com/embed/4ZIekwOMhdU?si=jQ_SN1B11H2Q3Fd9",
        "Peter Parker peine à joindre les deux bouts en tant qu'étudiant, photographe et Spider-Man. Et comme si ça ne suffisait pas, ses pouvoirs l'abandonnent, et le moment est mal choisi lorsque qu'un génie, victime de son expérience, devient une nouvelle menace sous le nom de Dr.Octopus.",
        "2004-07-14",
        "02:08:00",
        "Cinema"
    ),
    (
        "Spider-Man 3",
        NULL,
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
        NULL,
        "https://image.tmdb.org/t/p/original/Meej5GbiO06nxTydA4MeMvmXwv.jpg",
        "https://image.tmdb.org/t/p/original/qMoKekvYqvnnN3WSMBUrnPXQOgq.png",
        NULL,
        "https://www.youtube.com/embed/qK7nMGNlHgk?si=z0AFcIjijIK8EYS4",
        "Peter Parker réussit à vivre sa double vie, il devient le super-héros apprécié de tout New York, et il ne lui reste qu'une seule chose : Epouser Mary-Jane Watson. Mais sa vie prendra une autre tournure lorsqu'il découvre que l'assassin de son oncle est dans la nature, que son meilleur ami veut le tuer pour venger son père. Il va devoir les affronter, dans un nouveau costume noir crée par un symbiote.",
        "2007-05-01",
        "02:19:00",
        "Cinema"
    ),
    (
        "L'Affaire Bojarski",
        NULL,
        "https://image.tmdb.org/t/p/original/r60UQDxVX3ayqlvUDdjPWUfD3x4.jpg",
        NULL,
        "https://image.tmdb.org/t/p/original/gfNgt3QEfuDtRA0QRDVaxoNEqtt.jpg",
        "https://image.tmdb.org/t/p/original/8aZz7rWE0kBG6QxNO1vlNAkDcXE.png",
        NULL,
        "https://www.youtube.com/embed/lz4trma4mCU?si=2nfZdmph1zWVeHWy",
        "D'après une histoire vraie, Jan Bojarski, jeune ingénieur polonais se réfugie en France pendant la guerre. Après avoir essuyé de nombreux refus sur son dépôt de brevets de ses inventions, il utilise ses dons de d'imitations pour fabriquer des faux billets de banque. Ses activités attirent rapidement l'attention d'un inspecteur et ainsi commence une traque qui durera plusieurs années.",
        "2026-01-14",
        "02:08:00",
        "Cinema"
    ),
    (
        "Primate",
        NULL,
        "https://image.tmdb.org/t/p/original/46Qk0CAtmU0ubRtenDFA1pTiwtj.jpg",
        NULL,
        "https://image.tmdb.org/t/p/original/9uakM2woks0JV8HKIc4oatIVS88.jpg",
        "https://image.tmdb.org/t/p/original/3lrUfCP2ftPb3TKIX2SNSISFXq3.png",
        NULL,
        "https://www.youtube.com/embed/My8eVk5Zhoo?si=l-qevreBNy9RwjAM",
        "Ben est un chimpanzé d'une intelligence exceptionnelle. Mais un soir, alors que Lucy et ses amis passent la soirée chez elle, l'attitude de Ben devient change brutalement, à un point qu'il devient dangereux.",
        "2026-01-21",
        "01:29:00",
        "Cinema"
    ),
    (
        "Retour à Silent Hill",
        "Return to Silent Hill",
        "https://image.tmdb.org/t/p/original/n34IL1CF1A5i95pTYI3vtXeaBsg.jpg",
        "https://image.tmdb.org/t/p/original/4xf7KoifUAjMbhSRcjuZv4Eu0FQ.jpg",
        "https://image.tmdb.org/t/p/original/8F7QbPKQfoynSK8j7uVQPvVNZI.jpg",
        "https://image.tmdb.org/t/p/original/7JxcTzGDjAJ2sRjASn5LfbTxmPT.png",
        "https://image.tmdb.org/t/p/original/3HIQW3gW8Dhrfj2kTyVTwtJubU2.png",
        "https://www.youtube.com/embed/3YhZqeDYkEM?si=KTE_3DSV7pmkayjs",
        "James Sunderland, tourmenté par la perte de sa bien-aimée, reçoit une lettre de celle-ci qui lui demande de la rejoindre à Silent Hill. Pris par le désespoir, James décide de retourner dans cette ville pour vérifier si elle est réellement là-bas. Mais il sera confronté à de nombreux énigmes et aux créatures surnaturelles. Adaptation du célèbre jeux vidéo 'Silent Hill 2'.",
        "2026-02-04",
        "01:46:00",
        "Cinema"
    ),
    (
        "Gourou",
        NULL,
        "https://image.tmdb.org/t/p/original/gLEnkNw8BTudY3DpKICeqcxgrXV.jpg",
        NULL,
        "https://image.tmdb.org/t/p/original/t77v17Y74eIQDSITsBHtiySOGPr.jpg",
        "https://image.tmdb.org/t/p/original/9ChAMAppFCfZUPM3CdjmGXHRYCg.png",
        NULL,
        "https://www.youtube.com/embed/fJPl2vIVyQo?si=Kebwd9rF9sApM3Re",
        "Matthieu Vasseur, alias 'Matt', le célèbre coach en développement personnel de France, a une réputation partagée entre ses fans et les autorités qui remettent en question ses méthodes jugées douteuses voire sectaires.",
        "2026-01-28",
        "02:06:00",
        "Cinema"
    );

CREATE TABLE series (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255) NULL,
    poster VARCHAR(255) NULL,
    original_poster VARCHAR(255) NULL,
    background VARCHAR(255) NULL,
    logo VARCHAR(255) NULL,
    original_logo VARCHAR(255) NULL,
    trailer VARCHAR(255) NULL,
    beginning_date DATE NULL,
    ending_date DATE NULL,
    statut ENUM(
        'Prochainement',
        'En cours',
        'Fin de saison',
        'Achevée',
        'Inachevée'
    ) NOT NULL,
    average_episode_duration ENUM(
        '~ 20 - 30 min',
        '~ 30 - 45 min',
        '~ 45 - 60 min'
    ),
    nb_total_seasons INT NOT NULL,
    nb_total_episodes INT NOT NULL,
    SCREEN ENUM('TV', 'Streaming') NOT NULL,
    synopsis TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
    series (
        title,
        original_title,
        poster,
        original_poster,
        background,
        logo,
        original_logo,
        trailer,
        beginning_date,
        ending_date,
        statut,
        average_episode_duration,
        nb_total_seasons,
        nb_total_episodes,
        SCREEN,
        synopsis
    )
VALUES (
        "Malcolm",
        "Malcolm in the Middle",
        "https://image.tmdb.org/t/p/original/aRd5NJafhAAPXupmTamJGBXonSq.jpg",
        "https://image.tmdb.org/t/p/original/2epY7KDCEHwJw1H9TTRKUVer5S3.jpg",
        "https://image.tmdb.org/t/p/original/ponVeVEpjAoG35LY9aX9kfajlEd.jpg",
        "https://image.tmdb.org/t/p/original/zRW7kuxXsccKOmt7WQUCLadE3Zo.png",
        "https://image.tmdb.org/t/p/original/7aXcNVcQpKYkz07j6pmwyBBiRG3.png",
        "https://www.youtube.com/embed/huobWvHP7qg?si=FZIgcoCK9qOIfGlh",
        "2000-01-09",
        "2006-05-14",
        "Achevée",
        "~ 20 - 30 min",
        7,
        151,
        "TV",
        "Malcolm, un jeune garçon surdoué vit avec sa famille aussi banale que dysfonctionnelle, dans un monde où il se sent incompris, que ce soit chez lui, à l'école, ou ailleurs."
    ),
    (
        "Cobra Kai",
        NULL,
        "https://image.tmdb.org/t/p/original/aMiiVx3rVMMf8VzdcTXIH8PyE06.jpg",
        NULL,
        "https://image.tmdb.org/t/p/original/5NrSIzfcBOFI9HRGV4nRYgMGhDU.jpg",
        "https://image.tmdb.org/t/p/original/pkNOYbuOrm2CcyJcpqRLHN3ZW2m.png",
        NULL,
        "https://www.youtube.com/embed/lYGKnQaPEaY?si=aroZkwuP6HAFvhSn",
        "2018-05-02",
        "2025-02-13",
        "Achevée",
        "~ 30 - 45 min",
        6,
        65,
        "Streaming",
        "34 ans après sa défaite au tournoi de karaté, Johnny Lawrence, la cinquantaine vit une vie modeste mais à la dérive. Toujours hanté par son passé et confronté à son rival, Daniel Larusso, qui vit une vie paisible avec sa famille, Johnny décide de relancer le dojo 'Cobra Kai' pour retrouver un sens à sa vie."
    ),
    (
        "Yu-Gi-Oh!",
        "遊☆戯☆王デュエルモンスターズ",
        "https://image.tmdb.org/t/p/original/mM6c5ISlyKWtie2hGiZWo6hmlhU.jpg",
        "https://image.tmdb.org/t/p/original/gv3hNh1kgkedKyEJMiTRvYl46OQ.jpg",
        "https://image.tmdb.org/t/p/original/gJYZBM200Flldo6im3EEdXslR1j.jpg",
        "https://image.tmdb.org/t/p/original/sgZSJdgFU11RqT9GZEE4ZnWPm2G.png",
        "https://image.tmdb.org/t/p/original/cGnmj3eaGyLrLUzMmE8WoAAJeRy.png",
        "https://www.youtube.com/embed/bfELtLWydL0?si=zvSPBKOjT1I2bNI1",
        "2000-04-18",
        "2004-09-29",
        "Achevée",
        "~ 20 - 30 min",
        4,
        224,
        "TV",
        "Le jeune Yugi Mutou voit sa vie changer lorsqu'il assemble le puzzle millénaire, un artefact de plusieurs milliers d'années qui enferme l'esprit d'un pharaon. Depuis ce jour, le destin de Yugi et de ses amis et le sort de l'humanité se reposent sur un jeu de cartes nommé 'Duel Monsters'."
    );

CREATE TABLE seasons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    serie_id INT NOT NULL,
    season_number INT NOT NULL,
    season_poster VARCHAR(255) NULL,
    nb_episodes INT NULL,
    first_episode_date DATE NULL,
    last_episode_date DATE NULL,
    FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE CASCADE,
    UNIQUE (serie_id, season_number)
);

INSERT INTO
    seasons (
        serie_id,
        season_number,
        season_poster,
        nb_episodes,
        first_episode_date,
        last_episode_date
    )
VALUES (
        1,
        1,
        "https://image.tmdb.org/t/p/original/lnZ50D05WNk9Xk9fwjORRTQp8JP.jpg",
        16,
        "2000-01-09",
        "2000-05-21"
    ),
    (
        1,
        2,
        "https://image.tmdb.org/t/p/original/2coMBkg5mqaqdwfjWgibZTACQdj.jpg",
        25,
        "2000-10-05",
        "2001-05-20"
    ),
    (
        2,
        1,
        "https://image.tmdb.org/t/p/original/ylssltQhODJGbtox6h2JgOH6qjd.jpg",
        49,
        "2000-04-18",
        "2001-04-03"
    );

CREATE TABLE episodes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    serie_id INT NOT NULL,
    season_id INT NOT NULL,
    episode_number INT NOT NULL,
    episode_image VARCHAR(255) NULL,
    episode_title VARCHAR(255) NULL,
    episode_synopsis TEXT NULL,
    episode_air_date DATE NULL,
    episode_duration TIME NULL,
    FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE CASCADE,
    FOREIGN KEY (season_id) REFERENCES seasons (id) ON DELETE CASCADE,
    UNIQUE (serie_id, season_id, episode_number)
);

INSERT INTO
    episodes (
        serie_id,
        season_id,
        episode_number,
        episode_image,
        episode_title,
        episode_synopsis,
        episode_air_date,
        episode_duration
    )
VALUES (
        1,
        1,
        1,
        "https://image.tmdb.org/t/p/original/c4RC8fo5DilQjAKqsyCbJIdwjKX.jpg",
        "Je ne suis pas un monstre",
        "Malcolm est transféré, malgré lui, à l'école des surdoués que tout le monde appelle 'Les Têtes d'ampoules' suite à son quotient intellectuel incroyable. Ce qui contraint Malcolm car faire partie de cette classe changerait son quotidien à l'école en enfer.",
        "2000-01-09",
        "00:22:00"
    ),
    (
        1,
        1,
        2,
        "https://image.tmdb.org/t/p/original/oRXFOVvzfbcVGwPSF7MhnmduRjL.jpg",
        "Alerte rouge",
        "Loïs et Hal fête leur anniversaire de marriage, mais la soirée  ne sera pas de tout repos pour Loïs et les garçons à cause d'une robe brûlée et finie dans les toilettes.",
        "2000-01-16",
        "00:22:00"
    ),
    (
        2,
        1,
        1,
        "https://image.tmdb.org/t/p/original/uYXbZEtcQikL2Gh9uCErlmHw77f.jpg",
        "L'âme des cartes",
        "Yugi fait découvrir à ses amis le fameux jeu de cartes de 'Duel de Monstres'. Lorsque Yugi fait mention d'une carte rare détenue par son grand-père, un jeune homme veut la posséder, par n'importe quel moyen...",
        "2000-04-18",
        "00:22:00"
    ),
    (
        2,
        1,
        2,
        "https://image.tmdb.org/t/p/original/7m9cnAnOY4XH9J01zAuvRUoPBl9.jpg",
        "Le gant est jeté",
        "Maximilen Pegasus, fondateur d'Illusion Industriel et inventeur des Duel des monstres, invite Yugi à un duel, d'une manière insolite.",
        "2000-04-25",
        "00:22:00"
    );