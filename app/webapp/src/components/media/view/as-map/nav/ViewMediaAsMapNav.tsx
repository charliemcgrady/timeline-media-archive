import React from "react";
import { Button } from "@material-ui/core";
import NavBar from "~/components/pure/affordances/NavBar";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

interface Props extends RouteComponentProps<{}> {}

const ViewMediaAsMapNav: React.FunctionComponent<Props> = ({
  history,
  children
}) => {
  const { appliedFilter } = useAppliedFilter();
  return (
    <NavBar
      rightSlot={
        <Button
          color="inherit"
          onClick={() =>
            history.push(
              appliedFilter.activeMediaId
                ? `/media?activeMediaId=${appliedFilter.activeMediaId}`
                : "media"
            )
          }
        >
          {appliedFilter.activeMediaId ? "View In Feed" : "View Feed"}
        </Button>
      }
    >
      {children}
    </NavBar>
  );
};

export default withRouter(ViewMediaAsMapNav);
