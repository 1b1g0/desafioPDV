const express = require("express");
const router = express();

const {
  registerUser,
  detailUser,
  editUser,
  listClient,
  registerClient,
  detailCustomer,
} = require("./controller/user.js");
const loginUser = require("./controller/login.js");
const {
  listCategories,
  registerProduct,
  editProduct,
  listProduct,
  detailProduct,
  deleteProduct,
} = require("./controller/product.js");
const { verifyToken } = require("./middleware/login.js");

router.post("/usuario", registerUser);
router.post("/login", loginUser);
router.get("/categoria", listCategories);

router.use(verifyToken);

router.get("/cliente", listClient);
router.put("/usuario", editUser);
router.get("/usuario", detailUser);
router.post("/produto", registerProduct);
router.put("/produto/:id", editProduct);
router.get("/produto", listProduct);
router.get("/produto/:id", detailProduct);
router.delete("/produto/:id", deleteProduct);
router.post("/cliente", registerClient);
router.get('/cliente/:id', detailCustomer)

module.exports = router;
