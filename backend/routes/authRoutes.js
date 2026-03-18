const express = require("express");
const { register, login } = require("../controllers/authController");

const routes = express.Router();

//Register
routes.post("/register", register);

//Login
routes.post("/login", login);

module.exports = routes;
