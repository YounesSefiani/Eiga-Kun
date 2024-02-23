const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import personalitiesControllers module for handling personalities-related operations
const personalitiesControllers = require("./controllers/personalitiesControllers");

// Route to get a list of personalitiess
router.get("/personalities", personalitiesControllers.browse);

// Route to get a specific personality by ID
router.get("/personalities/:id", personalitiesControllers.read);

// Route to add a new personality
router.post("/personalities", personalitiesControllers.add);

// Route to update a personality
router.put("/personalities/:id", personalitiesControllers.edit);

// Route to delete a personality
router.delete("/personalities/:id", personalitiesControllers.destroy);

/* ************************************************************************* */

module.exports = router;
