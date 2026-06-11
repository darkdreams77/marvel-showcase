import type { PropsWithChildren } from "react";
import { cn } from "../../helpers/cn";

export const Container = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("max-w-7xl mx-auto", className ? className : "")}>
      {children}
    </div>
  );
};
