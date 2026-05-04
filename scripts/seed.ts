import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/db.js';

async function main() {
  console.log('--- Starting Unified Seed ---');

  // 1. Seed Admins
  const password = '#Neoters2026';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admins = [
    { username: 'marketing_admin', email: 'marketing@neotelemetri.com', role: 'MARKETING' as const },
    { username: 'pr_admin', email: 'pr@neotelemetri.com', role: 'PR' as const },
  ];

  console.log('Seeding Admins...');
  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { username: admin.username },
      update: { 
        email: admin.email,
        password: hashedPassword, 
        role: admin.role 
      },
      create: {
        username: admin.username,
        email: admin.email,
        password: hashedPassword,
        role: admin.role,
      },
    });
    console.log(`- Admin seeded: ${admin.username} (${admin.role})`);
  }

  // 2. Seed Projects (Marketing)
  const projects = [
    {
      name: 'Neo E-Commerce Platform',
      slug: 'neo-e-commerce-platform',
      description: 'A robust e-commerce platform built with modern technologies to handle high traffic and transactions.',
      division: 'Programming' as const,
      category: 'Web' as const,
      projectLink: 'https://github.com/neotelemetri/ecommerce',
      creationDate: new Date('2024-01-15'),
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
    },
    {
      name: 'Marketing Portfolio App',
      slug: 'marketing-portfolio-app',
      description: 'A mobile application for showcasing marketing achievements and case studies.',
      division: 'Multimedia' as const,
      category: 'UI_UX' as const,
      projectLink: 'https://play.google.com/store',
      creationDate: new Date('2024-02-10'),
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
    },
    {
      name: 'Campus Network Security',
      slug: 'campus-network-security',
      description: 'Implementation of high-speed Wi-Fi 6 across the entire campus and modernization of server racks.',
      division: 'SKJ' as const,
      category: 'ProxmoxVE' as const,
      projectLink: 'https://neotelemetri.com/skj',
      creationDate: new Date('2024-03-05'),
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
    },
  ];

  console.log('\nSeeding Projects...');
  for (const projectData of projects) {
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: projectData,
      create: projectData,
    });
    console.log(`- Project seeded: ${projectData.name}`);
  }

  // 3. Seed News (PR)
  const news = [
    {
      title: 'Neo Telemetri Wins National Hackathon 2024',
      slug: 'neo-telemetri-wins-national-hackathon-2024',
      shortDescription: 'Our programming team secured first place in the biggest national hackathon.',
      content: 'Neo Telemetri programming team has achieved a significant milestone by winning the 2024 National Hackathon. The team developed an innovative solution for urban mobility using AI and IoT technologies.',
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
    },
    {
      title: 'New Multimedia Design Workshop Series',
      slug: 'new-multimedia-design-workshop-series',
      shortDescription: 'Join our upcoming workshop series to learn about the latest trends in UI/UX and 3D design.',
      content: 'The Multimedia division is launching a new series of workshops aimed at enhancing design skills among students. The workshops will cover Figma, Blender, and the latest UI/UX principles.',
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
    },
    {
      title: 'SKJ Division Upgrades Server Laboratory',
      slug: 'skj-division-upgrades-server-laboratory',
      shortDescription: 'Significant hardware and network infrastructure upgrades completed in the laboratory.',
      content: 'The Sistem Komputer & Jaringan (SKJ) division has successfully completed a total overhaul of the server laboratory. This upgrade includes high-speed fiber optic switches and new enterprise-grade servers.',
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
    },
  ];

  console.log('\nSeeding News...');
  for (const newsData of news) {
    await prisma.news.upsert({
      where: { slug: newsData.slug },
      update: newsData,
      create: newsData,
    });
    console.log(`- News seeded: ${newsData.title}`);
  }

  console.log('\n--- Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
