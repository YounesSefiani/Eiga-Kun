const MovieManager = require("./models/MovieManager");
const SerieManager = require("./models/SerieManager");
const SeasonManager = require("./models/SeasonManager");
const EpisodeManager = require("./models/EpisodeManager");
const PersonalityManager = require("./models/PersonalityManager");
const CastingManager = require("./models/CastingManager");

const managers = [
    MovieManager,
    SerieManager,
    SeasonManager,
    EpisodeManager,
    PersonalityManager,
    CastingManager,
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
        throw new Error(`Table "${prop}" does not exist. Did you register it in ${__filename}?`);
    }
});