const apiRoutes = require("express").Router();
const userController = require("../controller/user");
const adminController = require("../controller/admin");
const uploads = require("../middleware/multer");
const { auth, adminAuth } = require("../middleware/auth");

apiRoutes.get("/", (req, res) => {
  res.send("Hello Backend...");
});

/* AUTH */
apiRoutes.post("/regdata", userController.regDataController);
apiRoutes.post("/loginuser", userController.loginDataController);

/* ADMIN */
apiRoutes.post(
  "/addadminproduct",
  adminAuth,
  uploads.single("image"),
  adminController.addadminProductController,
);

apiRoutes.get(
  "/getproduct",
  adminAuth,
  adminController.getAllProductController,
);
apiRoutes.delete(
  "/productdelete/:abc",
  adminAuth,
  adminController.deleteProductController,
);
apiRoutes.get(
  "/order-stats",
  adminAuth,
  adminController.adminOrderStatsController,
);
apiRoutes.get(
  "/editvaluedata/:abc",
  adminAuth,
  adminController.editValueDataController,
);
apiRoutes.post(
  "/productupdate/:abc",
  adminAuth,
  adminController.productUpdateController,
);
apiRoutes.get(
  "/userallquery",
  adminAuth,
  adminController.userAllQueryController,
);
apiRoutes.delete(
  "/querydelete/:abc",
  adminAuth,
  adminController.queryDeleteController,
);
apiRoutes.get(
  "/querysingledata/:abc",
  adminAuth,
  adminController.querySingleDataController,
);
apiRoutes.post(
  "/mailreply/:abc",
  adminAuth,
  adminController.mailReplyController,
);

/* USER */
apiRoutes.get("/userproducts", userController.userProductController);
apiRoutes.get("/product/:id", userController.getSingleProductController);
apiRoutes.post("/userquery", userController.userQueryController);
apiRoutes.get("/search", userController.searchController);
apiRoutes.post("/cart/save", auth, userController.saveCartDataController);
apiRoutes.get("/cart/:id", auth, userController.getCartController);
apiRoutes.post("/order/place", auth, userController.placeOrder);
apiRoutes.get("/orders/my", auth, userController.getUserOrders);

module.exports = apiRoutes;
