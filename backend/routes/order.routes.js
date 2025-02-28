import {Router} from "express"
import {getUserOrders, listOrders, placeOrder,verifyOrder,updateOrderStatus} from "../controllers/order.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js';
const router=Router();

router.route("/place-order").post(verifyJWT,placeOrder);
router.route("/verify").post(verifyOrder);
router.route("/user-orders").post(verifyJWT,getUserOrders);
router.route("/list-orders").get(listOrders);
router.route("/status").post(updateOrderStatus)
export default router;