const tables = require("../../tables");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { generateToken } = require("../../Middlewares/auth");

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

    const verificationToken = jwt.sign(
      { email: user.email, isValidated: user.isValidated },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const validationLink = `http://localhost:3994/api/users/verify/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Veuillez verifier votre compte",
      text: `Veuillez cliquer sur le lien suivant pour verifier votre compte: ${validationLink}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ id: createdUser.insertId, ...user });
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Veuillez fournir un email et un mot de passe" });
    }
    const user = await tables.users.findUserByEmail(req.body.email);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Identifiants incorrect ou Compte non vérifié !" });
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      req.body.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = generateToken(user);
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
        isValidated: user.isValidated,
      },
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const validateUser = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await tables.users.findUserByEmail(decoded.email);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (user.isValidated) {
      return res.status(400).json({ message: "Compte déjà validé." });
    }

    await tables.users.updateUser(user.id, { isValidated: true });

    return res.status(200).json({ message: "Compte validé avec succès." });
  } catch (error) {
    console.error("Erreur validation:", error.message);
    return res.status(400).json({ message: "Token invalide ou expiré." });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await tables.users.findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec cet e-mail." });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3994/api/users/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Réinitialisation du mot de passe",
      text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);


    return res.json({
      message: "Un lien de réinitialisation a été envoyé à votre boite mail.",
    });
  } catch (err) {
    return next(err);
  }
};

// Réinitialisation du mot de passe
const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const hashedPassword = await argon2.hash(newPassword);
    await tables.users.updateUser(decoded.id, { password: hashedPassword });

    res.json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browseUsers,
  readOneUser,
  editUser,
  addUser,
  deleteUser,
  login,
  validateUser,
  forgotPassword,
  resetPassword,
};
