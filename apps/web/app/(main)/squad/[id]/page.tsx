import { use } from "react";
import { trpc } from "../../../trpc";
import { PostCard } from "../../../../modules/post/components/post-card";

export default function Page({ params }: { params: { id: string } }) {
  const squad = use(trpc.squad.getSquad.query({ id: params.id }));
  const posts = use(trpc.post.getPosts.query({ squadId: params.id }));

  return (
    <div>
      <div className="h-30 border-b p-6 border-orange-800">
        <h2 className="text-2xl">{squad.name}</h2>
        <div className="mt-6 w-full text-center">{squad.description}</div>
      </div>

      <div className="flex justify-center p-4">
        <div className="inline-grid justify-item-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
