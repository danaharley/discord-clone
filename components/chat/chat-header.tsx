import { Hash } from "lucide-react";

import { MobileToggle } from "@/components/mobile-toggle";

type ChatHeaderProps = {
  name: string;
  serverId: string;
  type: "channel" | "conversation";
  imageUrl?: string;
};

export const ChatHeader = ({
  name,
  serverId,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="flex h-12 items-center border-b-2 border-neutral-200 px-3 text-base font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}

      <p className="text-base font-semibold text-black dark:text-white">
        {name}
      </p>
    </div>
  );
};
