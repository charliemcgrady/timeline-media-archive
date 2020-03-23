import { useLocation } from "react-router-dom";

export const useIsViewingMap = () => {
  const location = useLocation();
  return location.pathname === "/media/map";
};
