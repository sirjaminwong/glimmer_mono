export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("postPage", params, searchParams);
  return <div>postPage</div>;
}
