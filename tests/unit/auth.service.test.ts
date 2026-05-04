import { AuthService } from '../../src/services/auth.service.js';
import { prismaMock } from '../setup.js';
import bcrypt from 'bcryptjs';

describe('AuthService', () => {
  it('should login successfully with correct credentials', async () => {
    const mockAdmin = {
      id: '1',
      username: 'admin',
      email: 'admin@neotelemetri.com',
      password: await bcrypt.hash('password123', 10),
      role: 'MARKETING' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.admin.findFirst.mockResolvedValue(mockAdmin);

    const result = await AuthService.login('admin', 'password123');

    expect(result).toBeDefined();
    expect(result.admin.username).toBe('admin');
    expect(result.token).toBeDefined();
  });

  it('should throw error with incorrect password', async () => {
    const mockAdmin = {
      id: '1',
      username: 'admin',
      email: 'admin@neotelemetri.com',
      password: await bcrypt.hash('password123', 10),
      role: 'MARKETING' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.admin.findFirst.mockResolvedValue(mockAdmin);

    await expect(AuthService.login('admin', 'wrongpassword'))
      .rejects.toThrow('Invalid username, email, or password');
  });
});
