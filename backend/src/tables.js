const MovieManager = require("./models/MovieManager");
const SerieManager = require("./models/SeriesModels/SerieManager");
const SeasonManager = require("./models/SeriesModels/SeasonManager");
const EpisodeManager = require("./models/SeriesModels/EpisodeManager");
const GenreManager = require("./models/GenreManager");
const MovieGenreManager = require("./models/MovieGenreManager");
const SerieGenreManager = require("./models/SerieGenreManager");
const ThemeManager = require("./models/ThemeManager");
const MovieThemeManager = require("./models/MovieThemeManager");
const SerieThemeManager = require("./models/SerieThemeManager");
const UniverseManager = require("./models/UniverseManager");
const MovieUniverseManager = require("./models/MovieUniverseManager");
const SerieUniverseManager = require("./models/SerieUniverseManager");
const SubUniverseManager = require("./models/SubUniverseManager");
const MovieSubUniverseManager = require("./models/MovieSubUniverseManager");
const SerieSubUniverseManager = require("./models/SerieSubUniverseManager");
const NationalityManager = require("./models/NationalityManager");
const MovieNationalityManager = require("./models/MovieNationalityManager");
const SerieNationalityManager = require("./models/SerieNationalityManager");
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