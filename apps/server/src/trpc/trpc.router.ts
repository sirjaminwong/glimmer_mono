import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { TrpcService } from '@server/trpc/trpc.service';
import { createContext } from './context';

import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { PrismaService } from 'src/prisma.service';

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
      .query(async ({ input }) => {
        const { screenName } = input;
        const user = await this.prisma.user.findUnique({
          where: {
            screenName,
          },
        });
        return {
          user: user,
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

  appRouter = this.trpc.router({
    user: this.userRouter,
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

export type AppRouter = TrpcRouter[`appRouter`];
