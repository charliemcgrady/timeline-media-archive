import React, { FunctionComponent } from "react";
import { WidgetConfig } from '~/rgb-commons/types/widgets';
import { Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import { StoryConfig } from '~/rgb-commons/types/story-config';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {
  widget: WidgetConfig;
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      float: "right",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    footerButton: {
      marginLeft: theme.spacing(2)
    }
  }),
);

const EditWidgetFooter: FunctionComponent<Props> = ({
  widget,
  story,
  setStory,
  history
}) => {
  const onDone = () => {
    const newStory = Object.assign({}, story);
    newStory.widgets = story.widgets.map(w => {
      if (w.id === widget.id) {
        return widget;
      } else {
        return w;
      }
    });
    setStory(newStory);
    history.push(`/profile/stories/${story.id}`);
  };

  // Go back to story edit page without persisting the draft story
  const onCancel = () => history.push(`/profile/stories/${story.id}`);

  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Button
        className={classes.footerButton}
        variant="outlined"
        onClick={onCancel}
      >
        Cancel
          </Button>
      <Button
        className={classes.footerButton}
        variant="contained"
        color="primary"
        onClick={onDone}
      >
        Done
          </Button>
    </div>
  );
}

export default withRouter(EditWidgetFooter);
