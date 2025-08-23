import { useState, useEffect, useCallback } from "react";

type UseElementDimensionsOptions = {
  h?: string;
  w?: string;
};

export const useElementDimensions = ({
  h,
  w,
}: UseElementDimensionsOptions = {}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [element, setElement] = useState<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const updateSize = () => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      setSize({ width, height });

      if (h) {
        document.documentElement.style.setProperty(h, `${height}px`);
      }

      if (w) {
        document.documentElement.style.setProperty(w, `${width}px`);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [element, h, w]);

  return { ref, ...size };
};
