import { useTheme } from "@material-ui/core";

export const useIsDesktop = () => {
  const theme = useTheme();
  return window.innerWidth > theme.breakpoints.width("md");
};
