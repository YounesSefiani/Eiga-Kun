const tables = require("../../tables");

// B - BREAD - BROWSE (READ ALL USERS)
const browseUsers = async (req, res) => {
    try {
        const users = await tables.users.readUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE USER
const readOneUser = async (req, res) => {
    const user = await tables.users.readUserId(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } else {
        res.json(user);
    }
};

// E - BREAD - EDIT USER
const editUser = async (req, res, next) => {
    const updateUser = req.body;
    const { id } = req.params;
    try {
        await tables.users.updateUser(id, updateUser);
        res.status(200).json({ ...updateUser, id: parseInt(id, 10) });
    } catch (error) {
        next(error);
    }
};

// A - BREAD - ADD USER
const addUser = async (req, res, next) => {
    const user = req.body;
    try {
        const createdUser = await tables.users.createUser(user);
        res.status(201).json({id: createdUser.insertId, ...user,  });
    } catch (error) {
        next(error);
    }
};

// D - BREAD - DELETE USER
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.users.deleteUser(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    browseUsers,
    readOneUser,
    editUser,
    addUser,
    deleteUser,
};