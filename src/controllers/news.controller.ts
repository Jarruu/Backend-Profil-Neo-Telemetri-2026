import { Request, Response } from "express";
import { NewsSchema } from "../schemas/news.schema.js";
import { NewsService } from "../services/news.service.js";
import { z } from "zod";

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Management of Neo Telemetri news and announcements.
 */

export class NewsController {
  /**
   * @swagger
   * /api/pr/news:
   *   get:
   *     summary: List all news (Admin Only)
   *     description: Retrieve a list of all news articles.
   *     tags: [News]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of news articles.
   *       401:
   *         description: Unauthorized.
   *       403:
   *         description: Forbidden - Requires PR role.
   */
  static async getAll(req: Request, res: Response) {
    try {
      const news = await NewsService.getAll();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/pr/dashboard:
   *   get:
   *     summary: News Dashboard Stats
   *     description: Get statistical data about news counts and recent articles.
   *     tags: [News]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: News statistics retrieved successfully.
   *       403:
   *         description: Forbidden - Requires PR role.
   */
  static async getDashboard(req: Request, res: Response) {
    try {
      const stats = await NewsService.getDashboard();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/pr/news/{slug}:
   *   get:
   *     summary: Retrieve news article details
   *     description: Get full content of a news article using its slug.
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
   *         description: News article details.
   *       404:
   *         description: News not found.
   */
  static async getBySlug(req: Request, res: Response) {
    try {
      const news = await NewsService.getBySlug(req.params.slug as string);
      res.json(news);
    } catch (error) {
      if ((error as Error).message === "News not found") {
        return res.status(404).json({ error: (error as Error).message });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/pr/news:
   *   post:
   *     summary: Create a new news article
   *     description: Publish a new news article with an optional cover image.
   *     tags: [News]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required: [title, shortDescription, content]
   *             properties:
   *               title:
   *                 type: string
   *                 example: Neo Telemetri Wins National Competition
   *               shortDescription:
   *                 type: string
   *                 example: Our programming team secured first place in the 2024 Hackathon.
   *               content:
   *                 type: string
   *                 description: Full HTML or Markdown content of the article.
   *               coverImage:
   *                 type: string
   *                 format: binary
   *     responses:
   *       201:
   *         description: News article created successfully.
   *       400:
   *         description: Validation error.
   *       403:
   *         description: Forbidden - Only administrators with PR role can publish news.
   */
  static async create(req: Request, res: Response) {
    try {
      const validatedData = NewsSchema.parse(req.body);
      const news = await NewsService.create(validatedData, req.file?.path);
      res.status(201).json(news);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/pr/news/{id}:
   *   put:
   *     summary: Update a news article
   *     description: Modify details of a specific news article by its ID.
   *     tags: [News]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
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
   *       404:
   *         description: News not found.
   */
  static async update(req: Request, res: Response) {
    try {
      const validatedData = NewsSchema.parse(req.body);
      const news = await NewsService.update(req.params.id as string, validatedData, req.file?.path);
      res.json(news);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/pr/news/{id}:
   *   delete:
   *     summary: Delete a news article
   *     tags: [News]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       204:
   *         description: News deleted successfully.
   *       401:
   *         description: Unauthorized.
   *       403:
   *         description: Forbidden.
   */
  static async delete(req: Request, res: Response) {
    try {
      await NewsService.delete(req.params.id as string);
      res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "News not found" });
      }
      res.status(500).json({ error: error.message });
    }
  }
}
