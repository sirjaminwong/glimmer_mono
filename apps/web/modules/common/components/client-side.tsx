"use client";

import { useState } from "react";
import { trpc } from "../../../app/trpc";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@repo/ui/components";
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
} from "../../../../../packages/ui/src/components/ui/alert-dialog";
import { Link, ThumbsDown, ThumbsUp } from "lucide-react";

export default function ClientSide() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button
        onClick={() => {
          if (!name || !email) return;
          trpc.user.userCreate.mutate({ name, email, screenName: name });
        }}
      >
        提交
      </button>
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Create Post </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="squad">Squad</Label>
                <Select>
                  <SelectTrigger id="squad">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div onClick={router.refresh}>reload</div>
      <Button variant={"ghost"} size={"sm"}>
        <ThumbsUp />
      </Button>
      <Button variant={"destructive"} size={"sm"}>
        <ThumbsDown />
      </Button>
      <Button variant={"link"} size={"sm"}>
        <Link />
      </Button>
      <Button variant={"outline"} size={"sm"}>
        <Link />
      </Button>
      <Button variant={"secondary"} size={"sm"}>
        <Link />
      </Button>
    </div>
  );
}
