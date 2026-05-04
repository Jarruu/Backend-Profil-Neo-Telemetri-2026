import { Router } from "express";
import { NewsController } from "../controllers/news.controller.js";
import { upload } from "../middlewares/upload.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Public Relations (PR) module for news and announcements
 */

/**
 * @swagger
 * /api/pr/dashboard:
 *   get:
 *     summary: PR Dashboard
 *     description: Retrieve total news count and recent activity.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved.
 */
router.get("/dashboard", authenticate, authorize(['PR']), NewsController.getDashboard);

/**
 * @swagger
 * /api/pr:
 *   post:
 *     summary: Create news article
 *     description: Create a new news article with a cover image.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - shortDescription
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               content:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: News created successfully.
 */
router.post("/", authenticate, authorize(['PR']), upload.single('coverImage'), NewsController.create);

/**
 * @swagger
 * /api/pr/{id}:
 *   put:
 *     summary: Update news article
 *     description: Update an existing news article by ID.
 *     tags: [News]
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
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               content:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: News updated successfully.
 */
router.put("/:id", authenticate, authorize(['PR']), upload.single('coverImage'), NewsController.update);

/**
 * @swagger
 * /api/pr/{id}:
 *   delete:
 *     summary: Delete news article
 *     description: Remove a news article by its ID.
 *     tags: [News]
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
 *         description: News deleted successfully.
 */
router.delete("/:id", authenticate, authorize(['PR']), NewsController.delete);

/**
 * @swagger
 * /api/pr:
 *   get:
 *     summary: List all news (PR internal)
 *     description: Retrieve all news articles for admin review.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: News list retrieved.
 */
router.get("/", authenticate, authorize(['PR']), NewsController.getAll);

/**
 * @swagger
 * /api/pr/{slug}:
 *   get:
 *     summary: Get news by slug (PR internal)
 *     description: Retrieve news details by slug for admin review.
 *     tags: [News]
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
 *         description: News details retrieved.
 */
router.get("/:slug", authenticate, authorize(['PR']), NewsController.getBySlug);

export default router;
