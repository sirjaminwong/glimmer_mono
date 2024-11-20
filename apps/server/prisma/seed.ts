import { PrismaClient } from '@prisma/client';

const mockUsers = [
  {
    email: 'sirjaminwong@gmail.com',
    name: 'jamin',
    screenName: 'jaminst',
  },
  {
    email: 'user1@gmail.com',
    name: 'user1',
    screenName: 'user1',
  },
  {
    email: 'user2@gmail.com',
    name: 'user2',
    screenName: 'user2',
  },
  {
    email: 'user3@gmail.com',
    name: 'user3',
    screenName: 'user3',
  },
  {
    email: 'user4@gmail.com',
    name: 'user4',
    screenName: 'user4',
  },
];

const mockSquads = [
  {
    name: 'React',
    description:
      'The official daily.dev React community. Led by thought leaders and React experts. Stay tuned for insights, news and discussions.',
    tags: ['react', 'javascript', 'frontend'],
  },
  {
    name: 'AI',
    description:
      'The official daily.dev AI community. Led by thought leaders and AI experts. Stay tuned for insights, news and discussions.',
    tags: ['ai', 'machine-learning', 'data-science'],
  },
  {
    name: 'Node.js developers',
    description:
      "A community for Node.js developers. Let's share our knowledge and help each other.",
    tags: ['node', 'javascript', 'backend'],
  },
  {
    name: 'Angular',
    description:
      'The official daily.dev Angular community. Led by thought leaders and Angular experts. Stay tuned for insights, news and discussions.',
    tags: ['angular', 'javascript', 'frontend'],
  },
];

const mockPosts = [
  {
    title: 'The 3 Most Powerful Functions in JavaScript',
    content:
      'Learn about the map(), filter(), and reduce() functions in JavaScript and how they can help you write cleaner and more concise code.',
    originalLink: 'https://nextjs.org/',
  },
  {
    title: 'Learn TypeScript for Practical Projects',
    content:
      'Learn TypeScript for Practical Projects with a course on the freeCodeCamp.org YouTube channel. TypeScript is a popular programming language that adds static types to JavaScript, improving code robustness and readability. The course covers basic concepts, objects and functions, aliases and interfaces, tuples and enums, type guards, generics, fetching data, classes, and React development with TypeScript. The course is taught by John Smilga, known for his hands-on teaching approach.',
    originalLink: 'https://docs.nestjs.com/modules',
  },
  {
    title: 'How to Build a REST API with Nest.js',
    content:
      'Learn how to build a REST API with Nest.js, a Node.js framework. Nest.js is a progressive Node.js framework that is known for its reliability, speed, and scalability. The tutorial covers setting up a Nest.js project, creating a controller, creating a service, and creating a module. The tutorial also covers creating a RESTful API with Nest.js, including creating routes, handling requests, and returning responses. The tutorial is taught by Traversy Media, known for its practical web development tutorials.',
    originalLink: 'https://docs.nestjs.com/modules',
  },
  {
    title: 'Storybook 8',
    content:
      'Storybook is the industry standard UI tool for building, testing, and documenting components and pages. It’s used by thousands of teams globally, integrates with all major JavaScript frameworks, and combines with most leading design and developer tools.',
    originalLink: 'https://storybook.js.org/blog/storybook-8/',
  },
];

const prisma = new PrismaClient();

function createUsers() {
  return prisma.user.createMany({
    data: mockUsers,
  });
}

async function createSquads(userId: string) {
  for (const squad of mockSquads) {
    await prisma.squad.create({
      data: {
        name: squad.name,
        description: squad.description,
        members: {
          create: {
            role: 'OWNER',
            user: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
    });
  }
}

async function createPosts(userId: string, squadId: string) {
  return prisma.post.createMany({
    data: mockPosts.map((post) => ({
      title: post.title,
      content: post.content,
      originalLink: post.originalLink,
      authorId: userId,
      squadId: squadId,
    })),
  });
}

async function main() {
  const seedCreated = !!(await prisma.user.findFirst({
    where: {
      email: mockUsers[0].email,
    },
  }));

  if (seedCreated) {
    console.log('Seed data already exists');
    return;
  }

  await createUsers();

  const firstUser = await prisma.user.findFirst({
    where: {
      email: mockUsers[0].email,
    },
  });

  if (!firstUser) {
    throw new Error('First user not found');
  }

  await createSquads(firstUser.id);

  const firstSquad = await prisma.squad.findFirst({
    where: {
      name: mockSquads[0].name,
    },
  });

  if (!firstSquad) {
    throw new Error('First squad not found');
  }

  await createPosts(firstUser.id, firstSquad.id);

  console.log('Seed data created');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
