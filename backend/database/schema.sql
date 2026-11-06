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
    );