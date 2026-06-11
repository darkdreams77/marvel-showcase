/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import type { DependencyList } from "react";

const isAsyncGenerator = (v: any): v is AsyncGenerator => {
  return Object.prototype.toString.call(v) === "[object AsyncGenerator]";
};

function useAsyncEffect(
  effect: () => Promise<void> | AsyncGenerator<void, void, void>,
  deps?: DependencyList,
) {
  useEffect(() => {
    const task = effect();
    let isCancelled = false;

    void (async () => {
      if (isAsyncGenerator(task)) {
        for await (const _ of task) {
          if (isCancelled) {
            break;
          }
        }
      } else {
        await task;
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, deps);
}
export default useAsyncEffect;
