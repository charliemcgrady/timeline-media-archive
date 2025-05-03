import React, { FunctionComponent } from "react";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import TagIcon from "@material-ui/icons/LocalOffer";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import * as Widget from "~/rgb-commons/types/widgets";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import {
  photosToPhotoswipeItems,
  openPhotoswipe
} from "../../photoswipe/photoswipeUtils";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-block"
    },
    icon: {
      marginTop: -25,
      marginRight: -10,
      paddingRight: 8,
      color: "black",
      "& .MuiSvgIcon-root": {
        fontSize: "2.05rem"
      }
    }
  })
);

const ViewTagsIcon: FunctionComponent<{
  photo: Widget.MediaGrid.RequiredMediaConfig;
  className?: string;
}> = ({ photo, className }) => {
  const { tags: tagState, media: mediaState } = useSelector(
    (state: AppState) => state.userData
  );
  const { tagMap, mediaIdToTagIds } = tagState;

  const { setAppliedFilter, mediaIds } = useAppliedFilter();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (
    event: React.MouseEvent<EventTarget>,
    tagId?: string
  ) => {
    if (tagId) {
      const { items, startingIndex } = photosToPhotoswipeItems(
        shuffleArray(
          tagMap[tagId].mediaIds
            .filter(mediaId => mediaIds.eligible.includes(mediaId))
            .map(mediaId => mediaState.mediaMap[mediaId])
        ),
        photo.id
      );
      openPhotoswipe(items, startingIndex, (id: string) => {
        setAppliedFilter({ activeMediaId: id });
      });
    }

    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {mediaIdToTagIds[photo.id] && (
        <div className={`${classes.root} ${className}`}>
          <div>
            <Tooltip title="View tags" placement="left">
              <IconButton
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.icon}
              >
                <TagIcon />
              </IconButton>
            </Tooltip>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow">
                        {mediaIdToTagIds[photo.id].map(tagId => (
                          <MenuItem onClick={evt => handleClose(evt, tagId)}>
                            {tagMap[tagId].label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      )}
    </>
  );
};

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default ViewTagsIcon;
