import { Badge } from "@acme/ui/badge";
import { Button, buttonVariants } from "@acme/ui/button";
import { Copy, ExternalLink, Eye } from "lucide-react";
import { HypePoints } from "~/app/_components/hype-points";
import { Protocols, ProtocolsSkeleton } from "~/app/_components/protocols";
import { isAddress } from "viem";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@acme/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@acme/ui/dialog";
import Link from "next/link";
import Image from "next/image";

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
        <div className="flex flex-row gap-3 w-full justify-start items-center">
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
        <div className="flex flex-row gap-3 w-full justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <h2 className="text-3xl font-bold text-foreground">
              {`${address.slice(0, 8)}...${address.slice(-6)}`}
            </h2>
            <div className="flex flex-row items-center">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Copy className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Eye className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full py-5",
              )}
            >
              Check Another Address
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  Share
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl h-96">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-foreground">
                    Share Your Points
                  </DialogTitle>
                  <DialogDescription>
                    Let everyone know how active you've been on HyperEVM.
                  </DialogDescription>
                  <div className="flex justify-center items-center h-full">
                    <p className="text-xl text-muted-foreground/60">
                      Coming Soon
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-end">
                    <Button
                      variant="outline"
                      className="bg-emerald-400 text-background hover:text-background/80 w-full"
                    >
                      Copy PNG
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      Tweet
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
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
