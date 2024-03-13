import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from '@server/trpc/trpc.router';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
