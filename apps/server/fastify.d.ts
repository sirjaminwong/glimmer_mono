// fastify.d.ts
import './fastify';
import { User } from '@prisma/client';

declare module './fastify' {
  interface FastifyRequest {
    user?: Omit<User, 'password'>; // Adjust the type according to your user object structure
  }
}
