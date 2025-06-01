import { Badge } from "@acme/ui/badge";
import { Info } from "lucide-react";
import { HypePoints } from "~/app/_components/hype-points";
import { Protocols, ProtocolsSkeleton } from "~/app/_components/protocols";
import { isAddress } from "viem";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Image from "next/image";
import { Address } from "./_components/address";
import { Actions } from "./_components/actions";
import { Alert, AlertDescription, AlertTitle } from "@acme/ui/alert";

export default async function AddressPage({
  params,
}: { params: Promise<{ address: string }> }) {
  const { address } = await params;

  if (!isAddress(address) && !address.endsWith(".hl")) {
    return notFound();
  }

  return (
    <main className="container h-screen py-12">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-row gap-3 w-full justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Address Overview
            </h1>
            <Badge variant="outline" className="rounded-full space-x-2">
              <Image
                src="/hype.png"
                alt="HyperEvm"
                width={16}
                height={16}
                className="rounded-full"
              />
              <span className="text-sm font-medium">HyperEVM</span>
            </Badge>
          </div>
          <Alert className="max-w-lg">
            <Info className="w-4 h-4" />
            <AlertTitle className="font-semibold">Disclaimer</AlertTitle>
            <AlertDescription className="text-muted-foreground text-balance">
              Some protocols may arise issues with their API which will be fixed
              as soon as possible. More protocols will be added in the near
              future.
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex flex-row gap-3 w-full justify-between items-center">
          <Address address={address} />
          <Actions />
        </div>
        <HypePoints />
        <div className="flex flex-col gap-3 w-full justify-start items-start pb-12">
          <h2 className="text-2xl font-semibold text-foreground">
            Protocol Points
          </h2>
          <Suspense fallback={<ProtocolsSkeleton />}>
            <Protocols address={address} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
