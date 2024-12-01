import { use } from "react";
import { trpc } from "../../../trpc";

export default function PostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const post = use(trpc.post.getPost.query({ id: params.id }));

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1>{post.title}</h1>
        <div className="mt-4">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>
      </article>
      {JSON.stringify(post)}
    </main>
  );
}
