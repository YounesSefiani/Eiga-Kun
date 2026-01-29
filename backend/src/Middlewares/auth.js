const argon2 = require("argon2");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const tables = require("../tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
  hashLength: 32,
};

const hashPassword = (req, res, next) => {
  if (
    typeof req.body.password === "string" &&
    req.body.password.trim() !== ""
  ) {
    argon2
      .hash(req.body.password, hashingOptions)
      .then((hashedPassword) => {
        req.body.password = hashedPassword;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    delete req.body.password;
    next();
  }
};

const updateHashPassword = async (req, res, next) => {
  try {
    // Si pas de nouveau mot de passe, on passe au middleware suivant
    if (!req.body.password || req.body.password.trim() === "") {
      delete req.body.password;
      return next();
    }

    if (!req.body.currentPassword) {
      return res
        .status(400)
        .json({ error: "Veuillez entrer votre mot de passe actuel" });
    }

    const user = await tables.users.readUserId(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const isMatch = await argon2.verify(
      user.password,
      req.body.currentPassword
    );
    if (!isMatch) {
      return res.status(401).json({ error: "Mot de passe actuel incorrect" });
    }

    try {
      req.body.password = await argon2.hash(req.body.password, hashingOptions);
      next();
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const validateUserForm = (req, res, next) => {
  // Calculer la date minimum pour avoir 18 ans
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const schema = joi.object({
    username: joi.string().min(3).max(15).required().messages({
      "string.min": "Le nom d'utilisateur doit contenir au moins 3 caractères",
      "string.max": "Le nom d'utilisateur ne peut pas dépasser 15 caractères",
      "any.required": "Le nom d'utilisateur est requis",
    }),
    email: joi.string().email().required().messages({
      "string.email": "L'email doit être valide",
      "any.required": "L'email est requis",
    }),
    birthdate: joi.date().max(minDate).required().messages({
      "date.base": "La date de naissance doit être valide",
      "date.max": "Vous devez avoir au moins 18 ans pour vous inscrire",
      "any.required": "La date de naissance est requise",
    }),
    avatar: joi.string().optional().allow(null, ""),
    password: joi
      .string()
      .min(8)
      .max(16)
      .pattern(/[a-z]/, "minuscule")
      .pattern(/[A-Z]/, "majuscule")
      .pattern(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "special")
      .required()
      .messages({
        "string.min": "Le mot de passe doit contenir au moins 8 caractères",
        "string.max": "Le mot de passe ne peut pas dépasser 16 caractères",
        "string.pattern.name":
          "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un caractère spécial",
      }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
      "any.only": "Les mots de passe ne se correspondent pas",
      "any.required": "La confirmation du mot de passe est requise",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ error: errorMessages.join(" // ") });
  }
  next();
};

const generateToken = (user) => {
  const payload = {
    sub: user.id,
    username: user.username,
    avatar: user.avatar,
    email: user.email,
    role: user.role,
    isValidated: user.isValidated,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
  try {
    // Vérifier d'abord dans l'en-tête Authorization
    let token = null;
    const authHeader = req.get("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      [, token] = authHeader.split(" ");
    }

    // Si pas de token dans Authorization, vérifier dans les cookies
    if (!token && req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken;
    }

    // Si toujours pas de token, vérifier dans le corps de la requête
    if (!token && req.body && req.body.token) {
      token = req.body.token;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decodedToken.sub,
      mail: decodedToken.mail,
      username: decodedToken.username,
      avatar: decodedToken.avatar,
      role: decodedToken.role,
    };

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res
      .status(401)
      .json({ message: `Invalid or expired token: ${err.message}` });
  }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

module.exports = {
  hashPassword,
  updateHashPassword,
  validateUserForm,
  generateToken,
  verifyToken,
    transporter,
};
