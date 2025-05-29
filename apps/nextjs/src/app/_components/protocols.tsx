import { ProtocolCard, type ProtocolCardProps } from "./protocol-card";
import { Skeleton } from "@acme/ui/skeleton";
import { api } from "@acme/api/clients/server";

export interface Protocol {
  name: string;
  title: string;
  description: string;
  avatar: string;
  url?: string;
  points?: number;
  pointsAlias?: string;
}

const items: ProtocolCardProps[] = [
  {
    protocol: {
      name: "HyperBeat",
      title: "HyperBeat",
      description:
        "Automated vaults that optimize your returns from top DeFi protocols with just one click.",
      avatar: "/protocols/hyperbeat.svg",
      url: "app.hyperbeat.org",
      points: 100,
      pointsAlias: "Hearts",
    },
    backgroundImage: "/background.jpg",
    link: "https://app.hyperbeat.org/earn?referral=8CD75D20",
  },
];

export async function Protocols({ address }: { address: string }) {
  const data = await api.get.points({
    address,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
      <Skeleton className="bg-input h-96 w-80 rounded-md" />
    </div>
  );
}
