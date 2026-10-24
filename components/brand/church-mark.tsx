import Image from "next/image";
import { cn } from "@/lib/utils";

/** The church's actual icon, with matching artwork on light and dark surfaces. */
export function ChurchMark({
  reversed = false,
  size = 64,
  className,
  priority = false,
}: {
  reversed?: boolean;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={reversed ? "/logo-icon-white.svg" : "/logo-icon-indigo.svg"}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0 object-contain", !reversed && "dark:brightness-0 dark:invert", className)}
    />
  );
}
