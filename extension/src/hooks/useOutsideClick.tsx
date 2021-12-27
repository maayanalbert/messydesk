import { useEffect } from "react";

export function useOutsideClick(
  ref: React.MutableRefObject<any>,
  callback: (e?: MouseEvent) => void,
  dependencies?: any[]
) {
  useEffect(() => {
    const handleCallback = (event: MouseEvent) => {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleCallback);
    return () => {
      document.removeEventListener("mousedown", handleCallback);
    };
  }, [ref, ...(dependencies ? dependencies : [])]);
}
