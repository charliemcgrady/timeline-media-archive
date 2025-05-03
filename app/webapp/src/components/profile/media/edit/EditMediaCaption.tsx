import React, { FunctionComponent } from "react";
import { Media, MediaMap } from "~/rgb-commons/types/media";
import QuillEditor from "../../stories/edit-story/edit-widget/text/QuillEditor";

const EditMediaDescription: FunctionComponent<{
  media: Media;
  mediaMap: MediaMap;
  setMediaMap: (map: MediaMap) => void;
  className?: string;
}> = ({ media, mediaMap, setMediaMap, className = "" }) => {
  const onChange = (html: string) => {
    setMediaMap({
      ...mediaMap,
      [media.id]: {
        ...media,
        caption: html
      }
    });
  };

  return (
    <div className={className}>
      <QuillEditor onChange={onChange} html={media.caption || ""} />
    </div>
  );
};

export default EditMediaDescription;
