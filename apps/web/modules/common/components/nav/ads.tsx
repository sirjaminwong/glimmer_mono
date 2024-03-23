import Link from "next/link";
import { trpc } from "../../../../app/trpc";
import { use } from "react";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getData = async () => {
  await wait(1000);
  const data = await trpc.user.getUser.query({ screenName: "jaminst" });
  return data;
};

export const Ads = ({ name }: { name: string }) => {
  const data = use(getData());

  return (
    <div>
      <Link href={"https://app.daily.dev/"} target="_blank">
        长和落日圆 {new Date().valueOf()} {name} {JSON.stringify(data)}
      </Link>
    </div>
  );
};
