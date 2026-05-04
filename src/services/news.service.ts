import { prisma } from "../lib/db.js";

const generateSlug = (title: string) => {
  return title.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export class NewsService {
  static async getAll() {
    return await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getBySlug(slug: string) {
    const news = await prisma.news.findUnique({
      where: { slug }
    });
    if (!news) throw new Error("News not found");
    return news;
  }

  static async create(data: any, filePath: string | undefined) {
    const slug = generateSlug(data.title);
    
    const existing = await prisma.news.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    return await prisma.news.create({
      data: {
        title: data.title,
        slug: finalSlug,
        shortDescription: data.shortDescription,
        content: data.content,
        coverImage: filePath || null
      }
    });
  }

  static async update(id: string, data: any, filePath: string | undefined) {
    const updateData: any = {
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
    };

    if (filePath) {
      updateData.coverImage = filePath;
    }

    return await prisma.news.update({
      where: { id },
      data: updateData
    });
  }

  static async delete(id: string) {
    return await prisma.news.delete({ where: { id } });
  }

  static async getDashboard() {
    const totalNews = await prisma.news.count();
    const latestNews = await prisma.news.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    return {
      totalNews,
      latestNews
    };
  }
}
