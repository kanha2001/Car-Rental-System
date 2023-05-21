const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrders,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRole,
  authorizeRoles,
} = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles, getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles, updateOrders)
  .delete(isAuthenticatedUser, authorizeRoles, deleteOrder);
module.exports = router;
