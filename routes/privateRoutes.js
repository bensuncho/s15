const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const mostrar = require("../controllers/privateControllers");

router.get("/mostrardatos", checkAuth, mostrar);

module.exports = router;
