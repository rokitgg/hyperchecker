import { ProtocolCard, type ProtocolCardProps } from "./protocol-card";
import { Skeleton } from "@acme/ui/skeleton";
import { api } from "@acme/api/clients/server";

export interface Protocol {
  name: string;
  title: string;
  description: string;
  avatar: string;
  avatarClassName?: string;
  url?: string;
  points?: number;
  pointsAlias?: string;
}

export async function Protocols({ address }: { address: string }) {
  const data = await api.get.points({
    address,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {data.map((protocol) => (
        <ProtocolCard
          key={protocol.name}
          protocol={protocol}
          backgroundImage={"/background.jpg"}
          link={protocol.ref}
        />
      ))}
    </div>
  );
}

export function ProtocolsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {Array.from({ length: 2 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Skeleton key={index} className="bg-input h-96 w-full rounded-md" />
      ))}
    </div>
  );
}
