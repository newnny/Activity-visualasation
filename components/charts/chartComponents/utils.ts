import React, { useState, useEffect, useLayoutEffect } from "react";

export const callAccessor = (accessor: any, d: [], i: number) =>
  typeof accessor === "function" ? accessor(d, i) : accessor;

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
  const getDimensions = () => {
    return {
      width: targetRef.current ? window.innerWidth * 0.8 : 0,
      height: targetRef.current ? window.innerHeight / 3 : 0,
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    setDimensions(getDimensions());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
};
