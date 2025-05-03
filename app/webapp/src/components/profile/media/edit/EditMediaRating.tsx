import React, { FunctionComponent } from "react";
import { Media, MediaMap } from "~/rgb-commons/types/media";
import Rating from "@material-ui/lab/Rating";

const EditMediaRating: FunctionComponent<{
  media: Media;
  mediaMap: MediaMap;
  setMediaMap: (map: MediaMap) => void;
}> = ({ media, mediaMap, setMediaMap }) => {
  return (
    <Rating
      name="media-rating"
      value={media.rating}
      onChange={(event, rating) => {
        if (rating) {
          setMediaMap({
            ...mediaMap,
            [media.id]: {
              ...media,
              rating
            }
          });
        }
      }}
    />
  );
};

export default EditMediaRating;
