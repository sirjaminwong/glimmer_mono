import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export const createContext = ({
  req,
  res,
}: CreateFastifyContextOptions): {
  req: CreateFastifyContextOptions['req'];
  res: CreateFastifyContextOptions['res'];
  user: { name: string | string[] };
} => {
  const user = { name: req.headers.username ?? 'anonymous' };
  return { req, res, user };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
