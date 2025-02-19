import {Router} from "express";
import { addFood, getAllFoodItems, removeFood } from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route("/add").post( upload.single("image"), addFood );
router.route("/food-list").get(getAllFoodItems);
router.route("/remove").post(removeFood);

export default router;