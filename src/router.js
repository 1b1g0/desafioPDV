const express = require("express");
const router = express();

const {
  registerUser,
  detailUser,
  editUser,
  listClient,
  registerClient,
  detailCustomer,
  editClient,
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
const validateBody = require("./middleware/validate-body.js");
const userSchema = require("./schemas/user.js");
const loginSchema = require("./schemas/login.js");
const productSchema = require("./schemas/product.js");
const clientSchema = require("./schemas/client.js");

router.post("/usuario", validateBody(userSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);
router.get("/categoria", listCategories);

router.use(verifyToken);

router.put("/usuario", validateBody(userSchema), editUser);
router.get("/usuario", detailUser);
router.post("/produto", validateBody(productSchema), registerProduct);
router.put("/produto/:id", validateBody(productSchema), editProduct);
router.get("/produto", listProduct);
router.get("/produto/:id", detailProduct);
router.delete("/produto/:id", deleteProduct);
router.get("/cliente", listClient);
router.post("/cliente", validateBody(clientSchema), registerClient);
router.put("cliente/:id", editClient);
router.get("/cliente/:id", detailCustomer);

module.exports = router;
