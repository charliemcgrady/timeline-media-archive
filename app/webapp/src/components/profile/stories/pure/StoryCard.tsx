import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StoryConfig } from '~/rgb-commons/types/story-config';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

interface Props {
  story: StoryConfig;
}

const StoryCard: FunctionComponent<Props> = ({ story }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="h6">
          {story.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/stories/${story.id}`}>
          <Button size="small" color="primary">
            View
        </Button>
        </Link>
        <Link to={`/profile/stories/${story.id}`}>
          <Button size="small" color="primary">
            Edit
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default StoryCard;
