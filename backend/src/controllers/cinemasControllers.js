// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all cinemas from the database
    const cinemas = await tables.cinemas.readAll();

    // Respond with the cinemas in JSON format
    res.json(cinemas);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific cinema from the database based on the provided ID
    const cinema = await tables.cinemas.read(req.params.id);

    // If the cinema is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the cinema in JSON format
    if (cinema == null) {
      res.sendStatus(404);
    } else {
      res.json(cinema);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    await tables.cinemas.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the cinema data from the request body
  const cinemas = req.body;

  try {
    // Insert the cinema into the database
    const insertId = await tables.cinemas.create(cinemas);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted cinemas
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.cinemas.delete(req.params.id);
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
