const express = require("express");
const router = express();

const { registerUser, detailUser, editUser } = require("./controller/user.js");
const loginUser = require("./controller/login.js");
const { listCategories, registerProduct, editProduct, listProduct } = require("./controller/product.js");
const { verifyToken } = require("./middleware/login.js");

router.post("/usuario", registerUser);
router.post("/login", loginUser);
router.get("/categoria", listCategories);

router.use(verifyToken);

router.put("/usuario", editUser);
router.get("/usuario", detailUser);
router.post("/produto", registerProduct);
router.put("/produto/:id", editProduct);
router.get("/produto", listProduct)

module.exports = router;
