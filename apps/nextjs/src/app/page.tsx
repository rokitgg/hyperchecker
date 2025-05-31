"use client";

import { Input } from "@acme/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@acme/ui/form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { getAddress, isAddress } from "viem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, Search } from "lucide-react";
import { Button } from "@acme/ui/button";
import { useState } from "react";

const formSchema = z.object({
  address: z
    .string()
    .refine(
      (address) =>
        address === "" || address.endsWith(".hl") || isAddress(address),
      {
        message: "Please provide a valid EVM address or Hyperliquid name.",
      },
    ),
});

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { address: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (!values.address) {
      return form.setError("address", {
        message: "Please provide a valid input.",
      });
    }

    const checksummedAddress = getAddress(values.address);

    router.push(`/address/${checksummedAddress}`);
  }

  return (
    <main className="container h-screen py-32">
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 flex justify-center">
          <div className="relative w-[600px] h-48 flex items-center justify-center">
            <Image
              src="/blob_green.gif"
              alt="Hyperliquid"
              width={96}
              height={96}
              unoptimized
              className="absolute z-10 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 blur-2xl rounded-full opacity-10" />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-3xl justify-center items-center gap-8">
          <h1 className="text-5xl text-balance text-center font-extrabold tracking-tight sm:text-[5rem] w-full">
            <span className="text-emerald-400">HyperEVM</span> Checker
          </h1>

          <Form {...form}>
            <form
              className="max-w-full md:max-w-lg w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <div className="relative">
                        <Input
                          autoFocus
                          className="h-12 rounded-full px-4 w-full ps-9 pe-9 disabled:opacity-50"
                          disabled={form.formState.isSubmitting}
                          placeholder="Search wallet address"
                          {...field}
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <Search size={16} />
                        </div>
                        <Button
                          variant="link"
                          size="icon"
                          className="group absolute inset-y-0 end-2 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 rounded-full"
                          aria-label="Submit search"
                          type="submit"
                          disabled={form.formState.isSubmitting}
                        >
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <ArrowRight
                              size={16}
                              aria-hidden="true"
                              className="text-emerald-400 group-hover:text-emerald-600 transition-colors"
                            />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage className="text-center pt-1" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
