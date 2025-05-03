import { useIsDesktop } from "../../useIsDesktop";
import { CSSProperties } from "react";
import { useTheme } from "@material-ui/core";

export const useMapPageLayout = () => {
  const isDesktop = useIsDesktop();
  const theme = useTheme();

  const navHeight = 48;

  const leftPanel = {
    float: isDesktop ? "left" : undefined,
    position: isDesktop ? undefined : "fixed",
    bottom: isDesktop ? undefined : 0,
    height: isDesktop
      ? window.innerHeight - navHeight
      : window.innerHeight - navHeight,
    width: isDesktop ? (6.5 * window.innerWidth) / 10 - 10 : window.innerWidth
  };

  const mapResultsHeight = isDesktop ? 100 : 0;

  const map = {
    width: leftPanel.width,
    height: leftPanel.height
  };

  const mapResults = {
    height: mapResultsHeight,
    width: leftPanel.width,
    overflowY: "scroll",
    marginTop: map.height
  };

  const rightPanel = {
    float: "right",
    height: isDesktop ? leftPanel.height : (2 * window.innerHeight) / 3,
    width: isDesktop
      ? window.innerWidth - leftPanel.width - 10
      : window.innerWidth,
    overflowY: "scroll"
  };

  return {
    leftPanel: leftPanel as CSSProperties,
    rightPanel: rightPanel as CSSProperties,
    mapResults: mapResults as CSSProperties,
    map: map as CSSProperties,
    activeStory: {
      top: window.innerHeight - 100,
      position: "absolute",
      backgroundColor: "white",
      boxShadow: theme.shadows[10]
    } as CSSProperties,
    navHeight
  };
};
