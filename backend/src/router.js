const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* *********************************MOVIES**************************************** */

// Import itemControllers module for handling item-related operations
const moviesControllers = require("./controllers/moviesControllers");

// Route to get a list of items
router.get("/movies", moviesControllers.browse);

// Route to get a specific item by ID
router.get("/movies/:id", moviesControllers.read);

// Route to add a new movie
router.post("/movies", moviesControllers.add);

// Route to update a movie
router.put("/movies/:id", moviesControllers.edit);

// Route to delete a movie
router.delete("/movies/:id", moviesControllers.destroy);

/* *********************************PERSONALITIES**************************************** */

// Import itemControllers module for handling item-related operations
const personalitiesControllers = require("./controllers/personalitiesControllers");

// Route to get a list of items
router.get("/personalities", personalitiesControllers.browse);

// Route to get a specific item by ID
router.get("/personalities/:id", personalitiesControllers.read);

// Route to add a new movie
router.post("/personalities", personalitiesControllers.add);

// Route to update a movie
router.put("/personalities/:id", personalitiesControllers.edit);

// Route to delete a movie
router.delete("/personalities/:id", personalitiesControllers.destroy);

module.exports = router;
