import { Router } from "express";
import * as worksController from "../controllers/WorksController";
import { verifyToken } from "../middlewares/verifyToken";
const route = Router();

route.get("/", worksController.getWork);
route.get("/:id", worksController.getWorkById);
route.post("/", verifyToken, worksController.postWork);
route.put("/:id", verifyToken, worksController.updateWork);
route.delete("/:id", verifyToken, worksController.deleteWork);

export default route;
