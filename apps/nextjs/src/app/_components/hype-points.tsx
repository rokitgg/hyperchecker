import { cn } from "@acme/ui";
import { TrendingUp } from "lucide-react";
import Image from "next/image";

const item = {
  title: "Hype Season 3",
  meta: "TBA",
  description:
    "Your Hyperliquid points will be displayed here once the season starts.",
  icon: (
    <Image
      src="/hype.png"
      alt="HyperEvm"
      width={32}
      height={32}
      className="rounded-full object-cover object-center"
    />
  ),
  status: "Not Live",
  tags: ["Statistics", "Reports", "AI"],
  colSpan: 2,
  hasPersistentHover: true,
};

export function HypePoints() {
  return (
    <div
      className={cn(
        "w-full group relative px-4 py-6 rounded-xl overflow-hidden transition-all duration-300",
        "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
        "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
        "hover:-translate-y-0.5 will-change-transform",
        item.colSpan || "col-span-1",
        item.colSpan === 2 ? "md:col-span-2" : "",
        {
          "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5":
            item.hasPersistentHover,
          "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]":
            item.hasPersistentHover,
        },
      )}
    >
      <div
        className={`absolute inset-0 ${
          item.hasPersistentHover
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        } transition-opacity duration-300`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
      </div>

      <div className="relative flex flex-col space-y-3">
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
            {item.icon}
          </div>
          <span
            className={cn(
              "text-xs font-medium px-4 py-2 rounded-lg backdrop-blur-sm",
              "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
              "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20",
            )}
          >
            {item.status || "Active"}
          </span>
        </div>

        <div className="flex flex-row w-full justify-between items-end">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-4xl">
              {item.title}
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                {item.meta}
              </span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">
              {item.description}
            </p>
          </div>
          <div className="flex flex-row gap-1.5 items-end translate-y-3">
            <h2 className="font-bold text-muted-foreground text-xl md:text-6xl text-gray-50 relative z-10">
              0
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425] mb-2">
              Season Points
            </p>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
          item.hasPersistentHover
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        } transition-opacity duration-300`}
      />
    </div>
  );
}
