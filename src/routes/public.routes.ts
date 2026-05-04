import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { NewsController } from "../controllers/news.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Unauthenticated endpoints for public website content.
 */

/**
 * @swagger
 * /api/public/projects:
 *   get:
 *     summary: Retrieve all projects for public view
 *     description: Fetch a full list of projects. Ideal for the main website portfolio page.
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of projects.
 */
router.get("/projects", ProjectController.getAll);

/**
 * @swagger
 * /api/public/projects/{slug}:
 *   get:
 *     summary: Get project details for public view
 *     description: Retrieve comprehensive details of a specific project by its slug.
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details retrieved successfully.
 *       404:
 *         description: Project not found.
 */
router.get("/projects/:slug", ProjectController.getBySlug);

/**
 * @swagger
 * /api/public/news:
 *   get:
 *     summary: Retrieve all news for public view
 *     description: Fetch a list of all news articles.
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of news articles.
 */
router.get("/news", NewsController.getAll);

/**
 * @swagger
 * /api/public/news/{slug}:
 *   get:
 *     summary: Get news article details for public view
 *     description: Retrieve the full content of a news article by its slug.
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News article retrieved successfully.
 *       404:
 *         description: News article not found.
 */
router.get("/news/:slug", NewsController.getBySlug);

export default router;
