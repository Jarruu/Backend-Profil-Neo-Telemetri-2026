import { NewsService } from '../../src/services/news.service.js';
import { prismaMock } from '../setup.js';

describe('NewsService', () => {
  it('should create a news article with correct data', async () => {
    const mockData = {
      title: 'Test News Title',
      shortDescription: 'Short description for test',
      content: '<p>Full content for test</p>',
    };

    const mockResult = {
      id: 'news-1',
      slug: 'test-news-title',
      ...mockData,
      coverImage: 'news-image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.news.findUnique.mockResolvedValue(null);
    prismaMock.news.create.mockResolvedValue(mockResult);

    const result = await NewsService.create(mockData, 'news-image.jpg');

    expect(result).toBeDefined();
    expect(result.title).toBe('Test News Title');
    expect(result.slug).toBe('test-news-title');
    expect(prismaMock.news.create).toHaveBeenCalled();
  });

  it('should get news dashboard stats', async () => {
    prismaMock.news.count.mockResolvedValue(10);
    prismaMock.news.findMany.mockResolvedValue([]);

    const stats = await NewsService.getDashboard();

    expect(stats.totalNews).toBe(10);
    expect(Array.isArray(stats.latestNews)).toBe(true);
  });
});
