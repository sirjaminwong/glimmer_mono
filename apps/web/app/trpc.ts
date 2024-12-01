import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@server/trpc/trpc.router";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc", // you should update this to use env variables
    }),
  ],
});
