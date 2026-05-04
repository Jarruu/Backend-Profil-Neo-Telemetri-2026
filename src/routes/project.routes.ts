import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { upload } from "../middlewares/upload.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Marketing module for project portfolio management
 */

/**
 * @swagger
 * /api/marketing/dashboard:
 *   get:
 *     summary: Marketing Dashboard
 *     description: Retrieve total projects and division statistics.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved.
 */
router.get("/dashboard", authenticate, authorize(['MARKETING']), ProjectController.getDashboard);

/**
 * @swagger
 * /api/marketing:
 *   post:
 *     summary: Create project
 *     description: Add a new project to the portfolio with an optional cover image.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - division
 *               - category
 *               - creationDate
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               division:
 *                 type: string
 *                 enum: [Programming, Multimedia, SKJ]
 *               category:
 *                 type: string
 *                 enum: ["Web", "Mobile", "ThreeD", "UI_UX", "VideoEditing", "ProxmoxVE", "Docker", "Nextcloud"]

 *               projectLink:
 *                 type: string
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Project created successfully.
 */
router.post("/", authenticate, authorize(['MARKETING']), upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.create);

/**
 * @swagger
 * /api/marketing/{id}:
 *   put:
 *     summary: Update project
 *     description: Update an existing project's details, image, or video.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               division:
 *                 type: string
 *                 enum: [Programming, Multimedia, SKJ]
 *               category:
 *                 type: string
 *                 enum: ["Web", "Mobile", "ThreeD", "UI_UX", "VideoEditing", "ProxmoxVE", "Docker", "Nextcloud"]
 *               projectLink:
 *                 type: string
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Project updated successfully.
 */
router.put("/:id", authenticate, authorize(['MARKETING']), upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.update);

/**
 * @swagger
 * /api/marketing/{id}:
 *   delete:
 *     summary: Delete project
 *     description: Remove a project from the portfolio.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully.
 */
router.delete("/:id", authenticate, authorize(['MARKETING']), ProjectController.delete);

/**
 * @swagger
 * /api/marketing:
 *   get:
 *     summary: List all projects (Admin view)
 *     description: Retrieve all projects for marketing team review.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Full project list retrieved.
 */
router.get("/", authenticate, authorize(['MARKETING']), ProjectController.getAll);

/**
 * @swagger
 * /api/marketing/{slug}:
 *   get:
 *     summary: Get project details (Admin view)
 *     description: Retrieve full project details by slug for marketing team review.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details retrieved.
 */
router.get("/:slug", authenticate, authorize(['MARKETING']), ProjectController.getBySlug);

export default router;
