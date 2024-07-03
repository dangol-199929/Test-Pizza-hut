import { cn } from "@/shared/utils/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted bg-[#ddd]", className)}
      {...props}
    />
  );
}

export { Skeleton };
