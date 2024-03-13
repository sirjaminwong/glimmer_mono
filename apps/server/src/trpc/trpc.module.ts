import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TrpcService, TrpcRouter, PrismaService],
})
export class TrpcModule {}
