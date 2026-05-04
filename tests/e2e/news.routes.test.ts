import request from 'supertest';
import app from '../../src/app.js';
import { prismaMock } from '../setup.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

describe('News E2E Routes', () => {
  const prToken = jwt.sign(
    { id: '2', username: 'pr_admin', role: 'PR' },
    JWT_SECRET
  );

  it('GET /api/public/news - should return list of news', async () => {
    prismaMock.news.findMany.mockResolvedValue([]);
    const response = await request(app).get('/api/public/news');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/pr - should fail without token', async () => {
    const response = await request(app)
      .post('/api/pr')
      .send({ title: 'Unauthorized News' });
    expect(response.status).toBe(401);
  });

  it('POST /api/pr - should succeed with PR role', async () => {
    const mockNews = {
      id: '1',
      title: 'Success News',
      slug: 'success-news',
      shortDescription: 'desc',
      content: 'content',
      coverImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.news.findUnique.mockResolvedValue(null);
    prismaMock.news.create.mockResolvedValue(mockNews);

    const response = await request(app)
      .post('/api/pr')
      .set('Authorization', `Bearer ${prToken}`)
      .send({
        title: 'Success News',
        shortDescription: 'desc',
        content: 'content'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Success News');
  });

  it('POST /api/pr - should fail with MARKETING role', async () => {
    const marketingToken = jwt.sign(
      { id: '1', username: 'marketing_admin', role: 'MARKETING' },
      JWT_SECRET
    );
    const response = await request(app)
      .post('/api/pr')
      .set('Authorization', `Bearer ${marketingToken}`)
      .send({ title: 'Wrong Role' });
    
    expect(response.status).toBe(403);
  });
});
