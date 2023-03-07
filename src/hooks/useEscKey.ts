import { useCallback, useEffect } from "react";

const useEscKey = (callback: Function) => {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("keyup", handler, false);
    
    return () => {
      document.removeEventListener("keyup", handler, false);
    };
  }, [handler]);
};

export default useEscKey;
