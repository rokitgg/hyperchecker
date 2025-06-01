"use client";

import { cn } from "@acme/ui";
import Image from "next/image";

import type { ProtocolOutput } from "@acme/api/types/outputs";
import Link from "next/link";

export interface ProtocolCardProps {
  className?: string;
  backgroundImage?: string;
  protocol: ProtocolOutput;
  link?: string;
}

export const ProtocolCard = ({
  className,
  backgroundImage,
  protocol,
  link,
}: ProtocolCardProps) => {
  return (
    <Link href={link || "/"} className="max-w-full w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl flex flex-col justify-between p-4 bg-cover",
          className,
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black/50 group-hover/card:bg-black opacity-60" />
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height={32}
            width={32}
            alt={`${protocol.name}'s avatar`}
            src={protocol.avatar}
            className={cn(
              "h-10 w-10 p-1 rounded-full border-0 object-center",
              protocol.avatarClassName,
            )}
          />
          <div className="flex flex-col">
            <p className="font-normal text-lg text-gray-50 relative z-10">
              {protocol.title}
            </p>
            {protocol.url && (
              <p className="text-sm text-gray-400">{protocol.url}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-1.5 items-end translate-y-3">
            <h2 className="font-bold text-foreground text-6xl text-foreground relative z-10">
              {protocol.points}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425] mb-2">
              {protocol.pointsAlias || "Points"}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
              {protocol.title}
            </h1>
            <p className="font-normal text-sm text-gray-50 relative z-10 my-2">
              {protocol.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
