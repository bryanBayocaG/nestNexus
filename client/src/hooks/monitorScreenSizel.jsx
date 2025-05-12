import { useState, useEffect } from "react";

export const useTailwindBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("");

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setBreakpoint("xs");
    } else if (width < 768) {
      setBreakpoint("sm");
    } else if (width < 1024) {
      setBreakpoint("md");
    } else if (width < 1280) {
      setBreakpoint("lg");
    } else if (width < 1536) {
      setBreakpoint("xl");
    } else {
      setBreakpoint("2xl");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
