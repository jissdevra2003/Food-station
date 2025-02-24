import Router from "express";
import { getCart, removeFromCart,addToCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router();

router.route("/add").post(verifyJWT,addToCart);
router.route("/remove").post(verifyJWT,removeFromCart);
router.route("/get-cart").get(verifyJWT,getCart);


export default router;