CREATE TABLE movies (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255) NULL,
    poster VARCHAR(255) NULL,
    background VARCHAR(255) NULL,
    logo VARCHAR(255) NULL,
    original_logo VARCHAR(255) NULL,
    trailer VARCHAR(255) NULL,
    release_date DATE NULL,
    duration TIME NULL,
    screen ENUM(
        'Cinema',
        'TV',
        'DVD',
        'Streaming'
    ) NOT NULL,
    synopsis TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
    movies (
        title,
        original_title,
        poster,
        background,
        logo,
        original_logo,
        trailer,
        release_date,
        duration,
        screen,
        synopsis
    )
VALUES (
        "Spider-Man",
        NULL,
        "https://image.tmdb.org/t/p/original/kjdJntyBeEvqm9w97QGBdxPptzj.jpg",
        "https://image.tmdb.org/t/p/original/xm32oa80boMP87REhDua3X5DNpI.jpg",
        "https://image.tmdb.org/t/p/original/kNPXwReF35JpWBqGw8HadykznPT.png",
        NULL,
        "https://www.youtube.com/embed/OFijO5eH3ok?si=1u3_nfJvOBZ71dNk",
        "2002-06-12",
        "02:01:00",
        "Cinéma",
        "Peter Parker est un adolescent et un brillant élève et vit avec sa tante May et son Oncle Ben. Suite à une morsure d'une araignée génétiquement modifiée, Peter subit une transformation soudaine. Sa force et son agilité accrues, un sixième sens arachnéen, et des toiles organiques qui sortent des poignées. Il va devoir mettre toutes ses capacités pour faire régner la justice, et affronter un puissant ennemi. Le tout, sous un nouveau nom : Spider-Man."
    ),
    (
        "Spider-Man 2",
        NULL,
        "https://image.tmdb.org/t/p/original/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg",
        "https://image.tmdb.org/t/p/original/l7YISsScUdvsyHoLlM7x4PIqbiA.jpg",
        "https://image.tmdb.org/t/p/original/mSYIoj4eNWMDdxaTIf7xzDqvYDm.png",
        NULL,
        "https://www.youtube.com/embed/4ZIekwOMhdU?si=lYTFVANv_uQBK0RG",
        "2004-07-14",
        "02:08:00",
        "Cinéma",
        "Le quotidien de Peter Parker est difficile à gérer, entre ses études, son travail, sa vie social et sa seconde vie en tant que Spider-Man, protecteur de New-York. Et comme ça ne suffisait pas, ses pouvoirs lui font défaut, et une nouvelle menace débarque. Un docteur autrefois bienveillant voit sa vie changer à cause d'une expérience qui a mal tournée, faisant de lui, le terrifiant Dr.Octopus."
    ),
    (
        "Spider-Man 3",
        NULL,
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
        "https://image.tmdb.org/t/p/original/ebDTKlQFaVEExiytkl8AlzM57vj.jpg",
        "https://image.tmdb.org/t/p/original/xYaPsUe7IxlXL4VsRe7lTz6RSbE.png",
        NULL,
        "https://www.youtube.com/embed/qK7nMGNlHgk?si=j-zS7DyF8ZIWdR7Z",
        "2007-05-01",
        "02:19:00",
        "Cinéma",
        "Peter Parker ne souhaite qu'une chose : épouser sa bien-aimée Mary Jane Watson. Alors qu'il se préparer à faire sa demande, il doit faire face à l'homme qui a tué son oncle, son ancien meilleur ami qui est au courant de tout et veut venger la mort de son père. Et affronter son plus grand ennemi : lui-même, alors qu'il est sous l'influence d'un costume noir crée par un symbiote."
    );