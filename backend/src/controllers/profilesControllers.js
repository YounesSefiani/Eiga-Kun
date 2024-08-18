// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all profiles from the database
    const profiles = await tables.profils.readAll();

    // Respond with the profiles in JSON format
    res.json(profiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific profile from the database based on the provided ID
    const profile = await tables.profils.read(req.params.id);

    // If the profile is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the profile in JSON format
    if (profile == null) {
      res.sendStatus(404);
    } else {
      res.json(profile);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    await tables.profils.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the profile data from the request body
  const profile = req.body;

  try {
    // Insert the profile into the database
    const insertId = await tables.profils.create(profile);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted profile
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.profils.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
