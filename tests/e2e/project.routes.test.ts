import request from 'supertest';
import app from '../../src/app.js';
import { prismaMock } from '../setup.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

describe('Project E2E Routes', () => {
  const adminToken = jwt.sign(
    { id: '1', username: 'marketing_admin', role: 'MARKETING' },
    JWT_SECRET
  );

  it('GET /api/public/projects - should return list of projects', async () => {
    prismaMock.project.findMany.mockResolvedValue([]);
    const response = await request(app).get('/api/public/projects');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/marketing - should fail without token', async () => {
    const response = await request(app)
      .post('/api/marketing')
      .send({ name: 'New Project' });
    expect(response.status).toBe(401);
  });

  it('POST /api/marketing - should fail with wrong role (PR)', async () => {
    const prToken = jwt.sign(
      { id: '2', username: 'pr_admin', role: 'PR' },
      JWT_SECRET
    );
    const response = await request(app)
      .post('/api/marketing')
      .set('Authorization', `Bearer ${prToken}`)
      .send({ name: 'New Project' });
    expect(response.status).toBe(403);
  });
});
