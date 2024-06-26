/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const PersonalitiesManager = require("./models/PersonalitiesManager");
const MoviesManager = require("./models/MoviesManager");
const SeriesManager = require("./models/SeriesManager");
const UsersManager = require("./models/UsersManager");
const ProfilsManager = require("./models/ProfilsManager");
const ArticlesManager = require("./models/ArticlesManager");
const CinemasManager = require("./models/CinemasManager");
const MovieCastingManager = require("./models/MovieCastingManager");

const managers = [
  PersonalitiesManager,
  MoviesManager,
  SeriesManager,
  UsersManager,
  ProfilsManager,
  ArticlesManager,
  CinemasManager,
  MovieCastingManager,
  // Add other managers here
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
