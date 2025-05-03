import { useState, useRef } from "react";
import { useTheme } from "@material-ui/core";
import { useLocation } from "react-router-dom";

export const useMediaHeight = () => {
  const location = useLocation();

  const locationKeyRef = useRef<string | undefined>(location.key);

  const initialLoadOfPage = locationKeyRef.current !== location.key;

  locationKeyRef.current = location.key;

  const theme = useTheme();
  const isDesktop = window.innerWidth > theme.breakpoints.width("md");

  const targetRowHeightThreshold = 200;
  let [targetRowHeight, setTargetRowHeight] = useState(
    targetRowHeightThreshold
  );

  if (initialLoadOfPage) {
    if (location.pathname === "/media/map") {
      if (isDesktop) {
        targetRowHeight = 100;
      } else {
        targetRowHeight = 40;
      }
    } else {
      targetRowHeight = targetRowHeightThreshold;
    }
  }

  return { targetRowHeight, setTargetRowHeight, targetRowHeightThreshold };
};
