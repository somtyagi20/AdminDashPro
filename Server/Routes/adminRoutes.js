import { Router } from "express";
import { upload } from "../Middlewares/multer.js";
import { verifyJWT } from "../Middlewares/auth.js";

const router = Router();

//Auth routes
import {
  register,
  login,
  uploadProfilePic,
  logOutUser,
  refreshAccessToken,
} from "../Controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/uploadProfilePic")
  .post(verifyJWT, upload.single("profile_pic"), uploadProfilePic);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refreshAccessToken").post(refreshAccessToken);

//Customer routes
import {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../Controllers/customerController.js";

router.route("/createCustomer").post(verifyJWT, createCustomer);
router.route("/getCustomers").get(verifyJWT, getCustomers);
router.route("/getCustomer").get(verifyJWT, getCustomer);
router.route("/updateCustomer").post(verifyJWT, updateCustomer);
router.route("/deleteCustomer").delete(verifyJWT, deleteCustomer);

//Order routes
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../Controllers/orderController.js";

router.route("/createOrder").post(verifyJWT, createOrder);
router.route("/getOrders").get(verifyJWT, getOrders);
router.route("/getOrder").get(verifyJWT, getOrder);
router.route("/updateOrder").post(verifyJWT, updateOrder);
router.route("/deleteOrder").delete(verifyJWT, deleteOrder);

//Shipping routes
import {
  createShippingInfo,
  getShippingInfos,
  getShippingInfo,
  updateShippingInfo,
} from "../Controllers/shippingInfoController.js";

router.route("/createShippingInfo").post(verifyJWT, createShippingInfo);
router.route("/getShippingInfos").get(verifyJWT, getShippingInfos);
router.route("/getShippingInfo").get(verifyJWT, getShippingInfo);
router.route("/updateShippingInfo").post(verifyJWT, updateShippingInfo);

export default router;
