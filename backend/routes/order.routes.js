import {Router} from "express"
import {placeOrder} from "../controllers/order.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js';
const router=Router();

router.route("/place-order").post(verifyJWT,placeOrder);

export default router;