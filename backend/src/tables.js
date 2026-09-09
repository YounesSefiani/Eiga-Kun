const MovieManager = require("./models/MovieManager");
const SerieManager = require("./models/SeriesModels/SerieManager");
const SeasonManager = require("./models/SeriesModels/SeasonManager");
const EpisodeManager = require("./models/SeriesModels/EpisodeManager");
const GenreManager = require("./models/GenreManager");
const ThemeManager = require("./models/ThemeManager");
const UniverseManager = require("./models/UniverseManager");
const SubUniverseManager = require("./models/SubUniverseManager");
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
    ThemeManager,
    UniverseManager,
    SubUniverseManager,
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