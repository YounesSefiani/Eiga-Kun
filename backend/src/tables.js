const MovieManager = require("./models/MoviesModels/MovieManager");
const SerieManager = require("./models/SeriesModels/SerieManager");
const SeasonManager = require("./models/SeriesModels/SeasonManager");
const EpisodeManager = require("./models/SeriesModels/EpisodeManager");
const GenreManager = require("./models/GenreManager");
const MovieGenreManager = require("./models/MoviesModels/MovieGenreManager");
const SerieGenreManager = require("./models/SeriesModels/SerieGenreManager");
const ThemeManager = require("./models/ThemeManager");
const MovieThemeManager = require("./models/MoviesModels/MovieThemeManager");
const SerieThemeManager = require("./models/SeriesModels/SerieThemeManager");
const StreamingManager = require("./models/StreamingManager");
const MovieStreamingManager = require("./models/MoviesModels/MovieStreamingManager");
const SerieStreamingManager = require("./models/SeriesModels/SerieStreamingManager");
const UniverseManager = require("./models/UniverseManager");
const MovieUniverseManager = require("./models/MoviesModels/MovieUniverseManager");
const SerieUniverseManager = require("./models/SeriesModels/SerieUniverseManager");
const SubUniverseManager = require("./models/SubUniverseManager");
const MovieSubUniverseManager = require("./models/MoviesModels/MovieSubUniverseManager");
const SerieSubUniverseManager = require("./models/SeriesModels/SerieSubUniverseManager");
const NationalityManager = require("./models/NationalityManager");
const MovieNationalityManager = require("./models/MoviesModels/MovieNationalityManager");
const SerieNationalityManager = require("./models/SeriesModels/SerieNationalityManager");
const PersonalityManager = require("./models/PersonalityManager");
const CastingManager = require("./models/CastingManager");
const UserManager = require("./models/UsersModels/UserManager");
const UserFavoritesManager = require("./models/UsersModels/UserFavoritesManager");
const UserReviewManager = require("./models/UsersModels/UserReviewManager");

const managers = [
    MovieManager,
    SerieManager,
    SeasonManager,
    EpisodeManager,
    GenreManager,
    MovieGenreManager,
    SerieGenreManager,
    ThemeManager,
    MovieThemeManager,
    SerieThemeManager,
    StreamingManager,
    MovieStreamingManager,
    SerieStreamingManager,
    NationalityManager,
    MovieNationalityManager,
    SerieNationalityManager,
    UniverseManager,
    MovieUniverseManager,
    SerieUniverseManager,
    SubUniverseManager,
    MovieSubUniverseManager,
    SerieSubUniverseManager,
    PersonalityManager,
    CastingManager,
    UserManager,
    UserFavoritesManager,
    UserReviewManager,
];

const tables = {};

managers.forEach((ManagerClass) => {
    const manager = new ManagerClass();
    tables[manager.table] = manager;
});

module.exports = new Proxy(tables, {
    get(obj, prop) {
        if (prop in obj) {
            return obj[prop];
        }
        throw new ReferenceError(`Table ${prop} does not exist. Did you register it in ${__filename}?`);
    },
});