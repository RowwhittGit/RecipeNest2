const express = require("express");
const { listChefs } = require("../controllers/user.controller");
const optionalAuth = require("../middleware/optionalAuth");

const router = express.Router();

router.get("/chefs", optionalAuth, listChefs);

module.exports = router;
