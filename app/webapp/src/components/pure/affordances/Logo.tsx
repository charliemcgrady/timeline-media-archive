import React from "react";
import { Tooltip, useTheme } from "@material-ui/core";
import logoSrc from "~/components/pure/affordances/img/logo.png";
import { useMapPageLayout } from "~/components/media/view/browser/useMapPageLayout";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const Logo: React.FunctionComponent<{}> = () => {
  const theme = useTheme();
  const layout = useMapPageLayout();
  const { setAppliedFilter } = useAppliedFilter();

  return (
    <Tooltip title="Reset Archive">
      <img
        src={logoSrc}
        style={{
          cursor: "pointer",
          width: layout.navHeight - theme.spacing(1)
        }}
        onClick={() => {
          setAppliedFilter({ activeMediaId: undefined });
          const redirectWindow: any = window;
          redirectWindow.location = "/media";
        }}
      />
    </Tooltip>
  );
};

export default Logo;
