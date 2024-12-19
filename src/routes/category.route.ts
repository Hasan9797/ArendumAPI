import { Router } from "express";

import categoryController from "@/controllers/admin/category.controller";

const router = Router();

router.get("/", categoryController.getCategory);

router.post("/add", categoryController.createCategory);

router.put("/update/:id", categoryController.updateCategory);

router.delete("/delete/:id", categoryController.deleteCategory);

export default router;