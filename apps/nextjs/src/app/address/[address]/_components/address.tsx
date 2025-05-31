"use client";

import { Button } from "@acme/ui/button";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { useCopyToClipboard } from "~/lib/hooks/use-clipboard";
import { toast } from "sonner";
import { useState } from "react";

export function Address({ address }: { address: string }) {
  const [copiedText, copy, setCopiedText] = useCopyToClipboard();
  const [hidden, setHidden] = useState(false);

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Address copied to clipboard.", {
          duration: 1000,
        });
        setTimeout(() => {
          setCopiedText(null);
        }, 1000);
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      });
  };

  const handleHide = () => {
    setHidden(!hidden);
  };

  return (
    <div className="flex flex-row gap-3 items-center">
      <h2 className="text-3xl font-bold text-foreground">
        {hidden
          ? "*".repeat(17)
          : `${address.slice(0, 8)}...${address.slice(-6)}`}
      </h2>
      <div className="flex flex-row items-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleCopy(address)}
        >
          {copiedText ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleHide}
        >
          {hidden ? (
            <EyeOff className="w-4 h-4 text-rose-600" />
          ) : (
            <Eye className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
