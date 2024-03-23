import { Badge, Camera } from "lucide-react";
import ClientSide from "../modules/common/components/client-side";
import { Button } from "@repo/ui/components";

export default async function Page(): Promise<JSX.Element> {
  return (
    <main>
      <h2 className="name text-3xl font-bold underline">test tailwind3333</h2>
      <Button size="lg" variant={"destructive"}>
        Button
      </Button>
      <Badge>Badge</Badge>

      <Camera color="red" size={48} />
      <ClientSide />
    </main>
  );
}
