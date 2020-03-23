import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import TimeSilder from "./TimeSlider";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: theme.breakpoints.width("md"),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    }
  })
);

const FilterByTime: React.FunctionComponent<{}> = () => {
  const { mediaMap } = useSelector((state: AppState) => state.userData.media);

  const { mediaIds, setAppliedFilter, appliedFilter } = useAppliedFilter();
  const activeMediaIdRef = useRef(appliedFilter.activeMediaId);

  const [timeline, setTimeline] = useState<TimeSilder | undefined>(undefined);

  useLayoutEffect(() => {
    if (mediaIds.unfiltered.length > 0 && !timeline) {
      const element = document.querySelector("#media-timeline");

      setTimeline(
        new TimeSilder({
          rootElementSelector: "#media-timeline",
          data: mediaIds.eligible.map(id => mediaMap[id]),
          onMediaIdSelected: id => setAppliedFilter({ activeMediaId: id }),
          width: element ? element.scrollWidth : undefined
        })
      );
    }
  });

  useEffect(() => {
    if (timeline && activeMediaIdRef.current !== appliedFilter.activeMediaId) {
      timeline.setActiveMediaId(appliedFilter.activeMediaId);
    }
    activeMediaIdRef.current = appliedFilter.activeMediaId;
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div id="media-timeline" />
    </div>
  );
};

export default FilterByTime;
