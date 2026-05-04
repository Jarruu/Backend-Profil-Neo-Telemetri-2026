import { prisma } from "../lib/db.js";

const generateSlug = (name: string) => {
  return name.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export class ProjectService {
  static async getAll(division?: string) {
    return await prisma.project.findMany({
      where: division ? { division: division as any } : {},
      orderBy: { creationDate: 'desc' }
    });
  }

  static async getBySlug(slug: string) {
    const project = await prisma.project.findUnique({
      where: { slug }
    });
    if (!project) throw new Error("Project not found");
    return project;
  }

  static async create(data: any, filePath: string | undefined) {
    const slug = generateSlug(data.name);
    
    const existing = await prisma.project.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    return await prisma.project.create({
      data: {
        name: data.name,
        slug: finalSlug,
        description: data.description,
        division: data.division,
        category: data.category,
        projectLink: data.projectLink || null,
        creationDate: data.creationDate,
        coverImage: filePath || null
      }
    });
  }

  static async update(id: string, data: any, filePath: string | undefined) {
    const updateData: any = {
      name: data.name,
      description: data.description,
      division: data.division,
      category: data.category,
      projectLink: data.projectLink || null,
      creationDate: data.creationDate,
    };

    if (filePath) {
      updateData.coverImage = filePath;
    }

    return await prisma.project.update({
      where: { id },
      data: updateData
    });
  }

  static async delete(id: string) {
    return await prisma.project.delete({ where: { id } });
  }

  static async getDashboard() {
    const totalProjects = await prisma.project.count();
    const programming = await prisma.project.count({ where: { division: 'Programming' } });
    const multimedia = await prisma.project.count({ where: { division: 'Multimedia' } });
    const skj = await prisma.project.count({ where: { division: 'SKJ' } });

    return {
      totalProjects,
      divisions: {
        programming,
        multimedia,
        skj
      }
    };
  }
}
