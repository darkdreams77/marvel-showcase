import type { PropsWithChildren } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

type SplitLayoutProps = PropsWithChildren<{
  backgroundImg: string;
}>;

export const SplitLayout = ({ backgroundImg, children }: SplitLayoutProps) => {
  const isMobile = useIsMobile(1024);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full h-100 lg:w-1/2 lg:h-[calc(100vh-128px)] relative">
        <img
          src={backgroundImg}
          className="object-cover w-full max-h-full min-h-full opacity-20"
        />
        {isMobile && <div className="marvel-overlay absolute inset-0"></div>}
      </div>
      <div className="lg:w-1/2 lg:h-full px-6 pt-4 pb-10 md:px-20 md:py-16 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};
