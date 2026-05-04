import { ProjectService } from '../../src/services/project.service.js';
import { prismaMock } from '../setup.js';

describe('ProjectService', () => {
  it('should create a project with correct data', async () => {
    const mockData = {
      name: 'Test Project',
      description: 'Test Description',
      division: 'Multimedia' as const,
      category: 'ThreeD' as const,
      projectLink: 'https://test.com',
      creationDate: new Date(),
    };

    const mockResult = {
      id: '1',
      slug: 'test-project',
      ...mockData,
      coverImage: 'image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.project.findUnique.mockResolvedValue(null);
    prismaMock.project.create.mockResolvedValue(mockResult);

    const result = await ProjectService.create(mockData, 'image.jpg');

    expect(result).toBeDefined();
    expect(result.name).toBe('Test Project');
    expect(prismaMock.project.create).toHaveBeenCalled();
  });

  it('should get all projects', async () => {
    prismaMock.project.findMany.mockResolvedValue([]);
    const result = await ProjectService.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(prismaMock.project.findMany).toHaveBeenCalled();
  });
});
