import { jest, beforeEach } from '@jest/globals';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client'
import { setPrisma } from '../src/lib/db.js';

// Create the mock instance
export const prismaMock = mockDeep<PrismaClient>();

// Manually set the mock
setPrisma(prismaMock);

beforeEach(() => {
  mockReset(prismaMock);
});
