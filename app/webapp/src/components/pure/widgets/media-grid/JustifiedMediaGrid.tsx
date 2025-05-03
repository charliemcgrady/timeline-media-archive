import React, { FunctionComponent, CSSProperties } from "react";
import Placeholder from "~/components/pure/widgets/media-grid/Placeholder";
import Image from "~/components/pure/widgets/media-grid/Image";
import * as Widget from "~/rgb-commons/types/widgets";

const JustifiedMediaGrid: FunctionComponent<{
  metadata: Widget.MediaGrid.Metadata;
  media: Array<Widget.MediaGrid.RequiredMediaConfig>;
  layout: Widget.MediaGrid.LayoutMetadata;
  onMediaClicked: (id: string) => void;
  className: string;
  disabledMediaIds: Array<string>;
  setImageContainer: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
}> = ({
  metadata,
  layout,
  media,
  className,
  disabledMediaIds = [],
  onMediaClicked,
  setImageContainer
}) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width:
          media.length > 0
            ? metadata.containerWidth
              ? metadata.containerWidth
              : window.innerWidth
            : 0,
        height: media.length > 0 ? layout.containerHeight : 0
      }}
      ref={setImageContainer}
    >
      {layout.boxes.map((params: Widget.MediaGrid.LayoutParams, i: number) => {
        // Hardcoded to photos for now. Eventually, this grid will support multiple media types
        const photo = media[i];
        if (!photo) return;

        const layoutStyle: CSSProperties = {
          position: "absolute",
          width: params.width,
          height: params.height,
          top: params.top,
          left: params.left
        };

        const disabled = disabledMediaIds.includes(photo.id);

        return (
          <div key={photo.id}>
            <Placeholder
              dominantColorHex={photo.dominantColorHex}
              layoutStyle={layoutStyle}
              disabled={disabled}
            />
            <Image
              id={photo.id}
              targetPhotoHeight={params.height}
              layoutStyle={layoutStyle}
              onClick={onMediaClicked}
              disabled={disabled}
            />
          </div>
        );
      })}
    </div>
  );
};

export default JustifiedMediaGrid;
