import React, { FunctionComponent } from "react";
import { Media, MediaMap } from "~/rgb-commons/types/media";
import { TextField } from "@material-ui/core";

const EditMediaDescription: FunctionComponent<{
  media: Media;
  mediaMap: MediaMap;
  setMediaMap: (map: MediaMap) => void;
  className?: string;
}> = ({ media, mediaMap, setMediaMap, className = "" }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaMap({
      ...mediaMap,
      [media.id]: {
        ...media,
        caption: event.target.value
      }
    });
  };

  return (
    <div className={className}>
      <TextField
        label="Caption"
        value={media.caption || ""}
        onChange={onChange}
        variant="outlined"
        size="small"
        multiline
        fullWidth
      />
    </div>
  );
};

export default EditMediaDescription;
