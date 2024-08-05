import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const router = Router()

router.get(`/`, MovieController.getAll)
router.get(`/:id`, MovieController.getById)

router.post(`/:id`, MovieController.create)
router.delete(`/:id`, MovieController.delete)
router.patch(`/:id`, MovieController.patch)