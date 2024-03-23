import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@repo/ui/components";
import { Link, Eye } from "lucide-react";
import { Vote } from "./vote";

export const PostCard = ({
  post,
}: {
  post: {
    id: string;
    title: string;
    content: string | null;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    squadId: string | null;
    originalLink: string;
    authorId: string;
    upvotes: number;
    views: number;
    published: boolean;
  };
}) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="truncate">{post.title}</CardTitle>
        <CardDescription className="truncate">
          <span>{post.title}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-46">
        <span className="line-clamp-5">{post.content}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Vote postId={post.id} initCount={post.upvotes} />
        </Button>
        <Button variant="ghost" size="sm">
          <Eye size="20" />
          {post.views}
        </Button>
        <Button variant="ghost" size="sm">
          <Link size="20" />
        </Button>
      </CardFooter>
    </Card>
  );
};
