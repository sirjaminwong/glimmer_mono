import { Ad } from "./ad";
import { Ads } from "./ads";
import { Suspense, use } from "react";
import { NavItem } from "./nav-item";
import { trpc } from "../../../../app/trpc";

export default function Nav() {
  const squads = use(trpc.squad.getAllSquads.query());

  return (
    <nav className="w-56 flex-none border-r border-slate-500 flex flex-col p-2">
      <div className="flex-auto">
        <div className="text-lg mb-2">Squads</div>
        <div className="pl-6">
          {squads.map(({ id, name }) => (
            <NavItem key={id} href={`/squad/${id}`}>
              {name}
            </NavItem>
          ))}
        </div>
      </div>
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Ad name="test" />
        </Suspense>
        <Suspense fallback={<div>loading...</div>}>
          <Ads name="test" />
        </Suspense>
      </div>
    </nav>
  );
}
