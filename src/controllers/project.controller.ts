import { Request, Response } from "express";
import { ProjectSchema } from "../schemas/project.schema.js";
import { ProjectService } from "../services/project.service.js";
import { z } from "zod";

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Management of Neo Telemetri projects and portfolios.
 */

export class ProjectController {
  /**
   * @swagger
   * /api/marketing/projects:
   *   get:
   *     summary: List all projects (Admin Only)
   *     description: Retrieve a list of all projects. Supports filtering by division.
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: division
   *         description: Filter projects by division.
   *         schema:
   *           type: string
   *           enum: [Programming, Multimedia, SKJ]
   *     responses:
   *       200:
   *         description: A list of projects.
   *       401:
   *         description: Unauthorized - Bearer token missing or invalid.
   *       403:
   *         description: Forbidden - Requires MARKETING role.
   */
  static async getAll(req: Request, res: Response) {
    try {
      const { division } = req.query;
      const projects = await ProjectService.getAll(division as string);
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/marketing/dashboard:
   *   get:
   *     summary: Project Analytics Dashboard
   *     description: Get statistical data about project counts globally and per division.
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Dashboard statistics retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 totalProjects:
   *                   type: integer
   *                   example: 42
   *                 divisions:
   *                   type: object
   *                   properties:
   *                     programming:
   *                       type: integer
   *                     multimedia:
   *                       type: integer
   *                     skj:
   *                       type: integer
   *       403:
   *         description: Forbidden - Requires MARKETING role.
   */
  static async getDashboard(req: Request, res: Response) {
    try {
      const stats = await ProjectService.getDashboard();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/marketing/projects/{slug}:
   *   get:
   *     summary: Retrieve detailed project information
   *     description: Get full details of a project using its slug.
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         description: URL-friendly identifier for the project.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Project details.
   *       404:
   *         description: Project not found.
   */
  static async getBySlug(req: Request, res: Response) {
    try {
      const project = await ProjectService.getBySlug(req.params.slug as string);
      res.json(project);
    } catch (error) {
      if ((error as Error).message === "Project not found") {
        return res.status(404).json({ error: (error as Error).message });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/marketing/projects:
   *   post:
   *     summary: Register a new project
   *     description: Create a new project entry with file upload support for the cover image and video.
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required: [name, description, division, category, creationDate]
   *             properties:
   *               name:
   *                 type: string
   *                 example: Neo Portfolio Website
   *               description:
   *                 type: string
   *                 example: A comprehensive profile website built for Neo Telemetri.
   *               division:
   *                 type: string
   *                 enum: ["Programming", "Multimedia", "SKJ"]
   *                 example: Programming
   *               category:
   *                 type: string
   *                 enum: ["Web", "Mobile", "ThreeD", "UI_UX", "VideoEditing", "ProxmoxVE", "Docker", "Nextcloud"]
   *                 example: Web
   *               projectLink:
   *                 type: string
   *                 format: uri
   *                 example: https://neotelemetri.com
   *               creationDate:
   *                 type: string
   *                 format: date
   *                 description: ISO 8601 date string.
   *                 example: "2024-03-25"
   *               coverImage:
   *                 type: string
   *                 format: binary
   *                 description: Project thumbnail image.
   *               video:
   *                 type: string
   *                 format: binary
   *                 description: Project video file.
   *     responses:
   *       201:
   *         description: Project created successfully.
   *       400:
   *         description: Validation error or malformed request.
   *       403:
   *         description: Forbidden - Only administrators with MARKETING role can create projects.
   */
  static async create(req: Request, res: Response) {
    try {
      const validatedData = ProjectSchema.parse(req.body);
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const coverImage = files?.coverImage?.[0]?.path;
      const video = files?.video?.[0]?.path;

      const project = await ProjectService.create(validatedData, { coverImage, video });
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/marketing/projects/{id}:
   *   put:
   *     summary: Update an existing project
   *     description: Modify details of a specific project by its ID. Re-uploading the cover image or video is optional.
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: UUID of the project to update.
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
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               division:
   *                 type: string
   *                 enum: ["Programming", "Multimedia", "SKJ"]
   *               category:
   *                 type: string
   *                 enum: ["Web", "Mobile", "ThreeD", "UI_UX", "VideoEditing", "ProxmoxVE", "Docker", "Nextcloud"]
   *               projectLink:
   *                 type: string
   *                 format: uri
   *               creationDate:
   *                 type: string
   *                 format: date
   *               coverImage:
   *                 type: string
   *                 format: binary
   *               video:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: Project updated successfully.
   *       404:
   *         description: Project not found.
   */
  static async update(req: Request, res: Response) {
    try {
      const validatedData = ProjectSchema.parse(req.body);
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const coverImage = files?.coverImage?.[0]?.path;
      const video = files?.video?.[0]?.path;

      const project = await ProjectService.update(req.params.id as string, validatedData, { coverImage, video });
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/marketing/projects/{id}:
   *   delete:
   *     summary: Remove a project
   *     description: Delete a project entry permanently.
   *     tags: [Projects]
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
   *         description: Project deleted successfully.
   *       401:
   *         description: Unauthorized.
   *       403:
   *         description: Forbidden.
   */
  static async delete(req: Request, res: Response) {
    try {
      await ProjectService.delete(req.params.id as string);
      res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(500).json({ error: error.message });
    }
  }
}
