"use client";

import { cn } from "@acme/ui";
import { buttonVariants } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "@acme/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export function Actions() {
  const comingSoon = () => {
    toast.info("This feature is coming soon.", {
      position: "bottom-center",
      duration: 1000,
    });
  };

  return (
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
          <Button variant="outline" className="rounded-full hidden md:flex">
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
              <p className="text-xl text-muted-foreground/60">Coming Soon</p>
            </div>
            <div className="flex flex-row gap-3 items-end">
              <Button
                variant="outline"
                className="bg-emerald-400 text-background hover:text-background/80 w-full"
                onClick={comingSoon}
              >
                Copy PNG
              </Button>
              <Button variant="outline" className="w-full" onClick={comingSoon}>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                Tweet
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
