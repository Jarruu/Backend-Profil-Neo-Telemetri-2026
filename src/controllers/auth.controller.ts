import { Request, Response } from 'express';
import { loginSchema } from '../schemas/auth.schema.js';
import { AuthService } from '../services/auth.service.js';
import { z } from 'zod';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Admin authentication and token management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate Admin
 *     description: Login with username or email and password to receive a JWT token for accessing protected routes.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Username or Email address
 *                 example: marketing_admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: neotelemetri
 *     responses:
 *       200:
 *         description: Login successful. Returns JWT token and admin profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [MARKETING, PR]
 *       400:
 *         description: Validation error in request body.
 *       401:
 *         description: Invalid credentials provided.
 *       500:
 *         description: Internal server error.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { identifier, password } = validatedData;

    const result = await AuthService.login(identifier, password);

    res.json({
      message: 'Login successful',
      ...result
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    if (error.message.includes('Invalid username, email, or password')) {
      return res.status(401).json({ message: error.message });
    }
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
