const argon2 = require("argon2");

const options = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  hashLength: 50,
};

const hash = async (password) => {
  try {
    return await argon2.hash(password, options);
  } catch (err) {
    console.error(err);
    throw new Error("erreur de hachage !");
  }
};

const verify = async (password, hashed) => {
  try {
    return await argon2.verify(hashed, password, options);
  } catch (error) {
    throw new Error("identifiants incorrect");
  }
};

module.exports = { hash, verify };
