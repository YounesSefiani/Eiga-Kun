const MovieManager = require("./models/MovieManager");
const SerieManager = require("./models/SeriesModels/SerieManager");
const SeasonManager = require("./models/SeriesModels/SeasonManager");
const EpisodeManager = require("./models/SeriesModels/EpisodeManager");
const PersonalityManager = require("./models/PersonalityManager");
const CastingManager = require("./models/CastingManager");
const UserManager = require("./models/UsersModels/UserManager");

const managers = [
    MovieManager,
    SerieManager,
    SeasonManager,
    EpisodeManager,
    PersonalityManager,
    CastingManager,
    UserManager,
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