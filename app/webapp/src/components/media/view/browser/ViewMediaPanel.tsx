import React, { FunctionComponent, useRef, useEffect } from "react";
import NavigateMedia from "./nav/NavigateMedia";
import AllMedia from "./results/AllMedia";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import ViewStoryBubbles from "../ViewStoryBubbles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import TextWidget from "~/components/pure/widgets/text/TextWidget";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caption: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      maxHeight: 400,
      overflowY: "scroll",
      marginBottom: theme.spacing(4),
      fontSize: "1rem"
    }
  })
);

const ViewMediaPanel: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { mediaMap } = useSelector((state: AppState) => state.userData.media);
  const { appliedFilter } = useAppliedFilter();
  const mediaNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // console.log("In here");
    // console.log(mediaNavRef.current);
    // console.log(activeMediaIdRef.current !== appliedFilter.activeMediaId);
    // console.log();
    // if (
    //   appliedFilter.activeMediaId &&
    //   document.getElementById(appliedFilter.activeMediaId)
    // ) {
    //   console.log(
    //     document
    //       .getElementById(appliedFilter.activeMediaId)!
    //       .getBoundingClientRect().top
    //   );
    // if (
    //   appliedFilter.activeMediaId &&
    //   document.getElementById(appliedFilter.activeMediaId)
    // ) {
    //   document.getElementById("media-grid-scroll-anchor")!.scrollTop =
    //     document
    //       .getElementById(appliedFilter.activeMediaId)!
    //       .getBoundingClientRect().top - 350;
    //   // document.getElementById("media-grid-scroll-anchor")!.scrollTop =
    //   //   document
    //   //     .getElementById(appliedFilter.activeMediaId)!
    //   //     .getBoundingClientRect().top - 350;
    // }
    // }
    // if (
    //   mediaNavRef.current &&
    //   activeMediaIdRef.current !== appliedFilter.activeMediaId
    // ) {
    //   mediaNavRef.current.scrollIntoView();
    // }
    // activeMediaIdRef.current = appliedFilter.activeMediaId;
  }, []);

  useEffect(() => {
    if (document.getElementById("media-browser-right-panel")) {
      document.getElementById("media-browser-right-panel")!.scrollTo(0, 0);
    }
  });
  const classes = useStyles();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div ref={mediaNavRef}>
        <NavigateMedia />
        {appliedFilter.activeMediaId &&
          mediaMap[appliedFilter.activeMediaId].caption && (
            <TextWidget
              className={classes.caption}
              metadata={{
                html: mediaMap[appliedFilter.activeMediaId].caption!
              }}
            />
          )}
      </div>
      {appliedFilter.activeMediaId && (
        <ViewStoryBubbles
          onClick={id => history.push(`/stories/${id}?returnTo=/explore`)}
        />
      )}
      <AllMedia />
    </div>
  );
};

export default ViewMediaPanel;
