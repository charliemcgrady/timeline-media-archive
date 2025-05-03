import React, { FunctionComponent } from "react";
import RatingFilter from "./rating/RatingFilter";
import PopoverButton from "~/components/pure/affordances/PopoverButton";
import { Container, makeStyles, Theme, createStyles } from "@material-ui/core";
import DateFilter from "./date/DateFilter";
import ResetFilters from "./ResetFilters";

import { useMediaView } from "~/components/media/useMediaView";
import { ViewType } from "~/components/media/view-type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center"
    },
    filter: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      color: "black",
      borderColor: "black"
    }
  })
);

const ButtonGroupFilters: FunctionComponent<{}> = () => {
  const mediaView = useMediaView();

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <PopoverButton
        title="Rating"
        className={classes.filter}
        demphasized={mediaView.toString() === ViewType.BROWSER.toString()}
      >
        <RatingFilter />
      </PopoverButton>
      <PopoverButton
        title="Date"
        className={classes.filter}
        demphasized={mediaView.toString() === ViewType.BROWSER.toString()}
      >
        <DateFilter />
      </PopoverButton>
      <ResetFilters />
    </Container>
  );
};

export default ButtonGroupFilters;
