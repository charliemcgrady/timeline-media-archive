import React, { FunctionComponent } from "react";
import RatingFilter from "./rating/RatingFilter";
import PopoverButton from "~/components/pure/affordances/PopoverButton";
import { Container, makeStyles, Theme, createStyles } from "@material-ui/core";
import DateFilter from "./date/DateFilter";
import ResetFilters from "./ResetFilters";
import { useIsViewingMap } from "../../../useIsViewingMap";

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
  const viewingMap = useIsViewingMap();

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <PopoverButton
        title="Rating"
        className={classes.filter}
        demphasized={viewingMap}
      >
        <RatingFilter />
      </PopoverButton>
      <PopoverButton
        title="Date"
        className={classes.filter}
        demphasized={viewingMap}
      >
        <DateFilter />
      </PopoverButton>
      <ResetFilters />
    </Container>
  );
};

export default ButtonGroupFilters;
