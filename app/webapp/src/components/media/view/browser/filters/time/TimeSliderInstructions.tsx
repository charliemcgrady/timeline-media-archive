import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Divider,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";

const getWidth = () => Math.min(window.innerWidth - 100, 500);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
      width: getWidth(),
      marginRight: "auto",
      marginLeft: "auto",
      "& .MuiExpansionPanelSummary-root": {
        height: 30,
        minHeight: 30
      }
    },
    summary: {
      fontSize: "0.8rem"
    },
    instructions: {
      maxWidth: getWidth() - 75,
      textAlign: "center",
      fontSize: 12,
      fontStyle: "italic",
      marginBottom: theme.spacing(1),
      "& > div": {
        marginBottom: 3,
        maxWidth: getWidth() - 75
      },
      "& > img": {
        marginBottom: 15,
        width: "auto",
        maxWidth: getWidth() - 75
      }
    }
  })
);

const TimeSliderInstructions: React.FunctionComponent<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel
        defaultExpanded={false}
        TransitionProps={{ unmountOnExit: true }}
      >
        <ExpansionPanelSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
        >
          <i>How do I use the timeline?</i>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          <div className={classes.instructions}>
            <div>
              Click-and-drag the grey area to select photos based on time.
            </div>
            <img src="https://charliemcgrady-webapp-manually-managed-assets.s3-us-west-2.amazonaws.com/timeline-instructions/selection.gif" />
            <div>Drag this selection to pan over time.</div>
            <img src="https://charliemcgrady-webapp-manually-managed-assets.s3-us-west-2.amazonaws.com/timeline-instructions/pan.gif" />
            <div>Scroll, pinch or double-tap the grey area to zoom.</div>
            <img src="https://charliemcgrady-webapp-manually-managed-assets.s3-us-west-2.amazonaws.com/timeline-instructions/zoom.gif" />
            <div>Tap outside of the selection to reset the filter.</div>
            <img src="https://charliemcgrady-webapp-manually-managed-assets.s3-us-west-2.amazonaws.com/timeline-instructions/cancel.gif" />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default TimeSliderInstructions;
