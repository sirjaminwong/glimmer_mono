import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { TrpcService } from '@server/trpc/trpc.service';
import { createContext } from './context';

import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly prisma: PrismaService,
  ) {}

  userRouter = this.trpc.router({
    getUser: this.trpc.procedure
      .input(
        z.object({
          screenName: z.string(),
        }),
      )
      .output(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(async ({ input }) => {
        const { screenName } = input;
        const user = await this.prisma.user.findUnique({
          where: {
            screenName,
          },
        });
        return {
          name: user?.name,
        };
      }),

    userCreate: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
          screenName: z.string(),
          email: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const { name } = input;
        const user = await this.prisma.user.create({
          data: {
            name: name || input.screenName,
            screenName: input.screenName,
            email: input.email,
          },
        });
        return {
          user: user,
        };
      }),
  });

  postRouter = this.trpc.router({
    getPosts: this.trpc.procedure
      .input(
        z.object({
          userId: z.string().optional(),
          squadId: z.string().optional(),
        }),
      )
      .query(async ({ input }) => {
        return await this.prisma.post.findMany({
          where: {
            authorId: input.userId,
            squadId: input.squadId,
          },
        });
      }),

    getPost: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const post = await this.prisma.post.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!post) {
          throw new Error('Post not found');
        }
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          originalLink: post.originalLink,
        };
      }),

    postCreate: this.trpc.procedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          originalLink: z.string(),
          authorId: z.string(),
          squadId: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const post = await this.prisma.post.create({
          data: input,
        });
        return {
          post: post,
        };
      }),

    vote: this.trpc.procedure
      .input(
        z.object({
          postId: z.string(),
          userId: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const post = await this.prisma.post.update({
          where: {
            id: input.postId,
          },
          data: {
            upvotes: {
              increment: 1,
            },
          },
        });
        return {
          count: post.upvotes,
        };
      }),
  });

  squadRouter = this.trpc.router({
    getAllSquads: this.trpc.procedure.query(async () => {
      const squads = await this.prisma.squad.findMany();
      return squads;
    }),

    getSquad: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .output(
        z.object({
          name: z.string(),
          description: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const squad = await this.prisma.squad.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!squad) {
          throw new Error('Squad not found');
        }
        return {
          name: squad?.name,
          description: squad?.description,
        };
      }),

    create: this.trpc.procedure
      .input(
        z.object({
          name: z.string(),
          description: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const squad = await this.prisma.squad.create({
          data: {
            name: input.name,
            description: input.description,
          },
        });
        return {
          squad: squad,
        };
      }),
  });

  appRouter = this.trpc.router({
    user: this.userRouter,
    squad: this.squadRouter,
    post: this.postRouter,
  });

  async applyMiddleware(app: NestFastifyApplication) {
    app.register(fastifyTRPCPlugin, {
      prefix: '/trpc',
      trpcOptions: {
        router: this.appRouter,
        createContext,
        onError({ path, error }) {
          // report to error monitoring
          console.error(`Error in tRPC handler on path '${path}':`, error);
        },
      } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
    });
  }
}

export type AppRouter = TrpcRouter['appRouter'];
