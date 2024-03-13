import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TrpcService } from 'src/trpc/trpc.service';
import { z } from 'zod';

@Injectable()
export class UserTrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly prisma: PrismaService,
  ) {}
  getUser = this.trpc.procedure
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
    });
  userCreate = this.trpc.procedure
    .input(
      z.object({
        name: z.string().optional(),
        screenName: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, screenName } = input;
      const user = await this.prisma.user.create({
        data: {
          name: name || screenName,
          screenName,
          email: input.email,
        },
      });
      return {
        user: user,
      };
    });
}
