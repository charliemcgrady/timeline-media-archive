import { useLocation } from "react-router-dom";
import { ViewType } from "./view-type";

export const useMediaView = () => {
  const location = useLocation();
  if (location.pathname === "/media/map") {
    return ViewType.BROWSER;
  } else if (location.pathname === "/media/feed") {
    return ViewType.FEED;
  } else return ViewType.FEED;
};
