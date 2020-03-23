import React, { FunctionComponent } from "react";
import JustifiedLayoutFactory from "~/components/pure/widgets/media-grid/JustifiedLayoutFactory";
import FullHeightLayoutFactory from "~/components/pure/widgets/media-grid/FullHeightLayoutFactory";
import useLazyLoadedImages from "~/components/pure/widgets/media-grid/useLazyLoadedImages";
import {
  openPhotoswipe,
  photosToPhotoswipeItems
} from "~/components/pure/widgets/photoswipe/photoswipeUtils";
import * as Widget from "~/rgb-commons/types/widgets";
import JustifiedMediaGrid from "./JustifiedMediaGrid";
import MediaFeed from "./MediaFeed";

export interface Props {
  metadata: Widget.MediaGrid.Metadata;
  media: Array<Widget.MediaGrid.RequiredMediaConfig>;
  disabledMediaIds?: Array<string>;
  containerWidth?: number;
  onMediaClicked?: (id: string) => void;
  className?: string;
}

const justifiedLayout = new JustifiedLayoutFactory();
const fullHeightLayout = new FullHeightLayoutFactory();

const MediaGrid: FunctionComponent<Props> = ({
  media,
  metadata = {
    containerWidth: window.innerWidth
  } as Widget.MediaGrid.Metadata,
  className = "",
  disabledMediaIds = [],
  onMediaClicked = (id: string) => {
    const { items, startingIndex } = photosToPhotoswipeItems(media, id);
    openPhotoswipe(items, startingIndex);
  }
}) => {
  const layout = metadata.makePhotosFullHeight
    ? fullHeightLayout.calculate(media, metadata)
    : justifiedLayout.calculate(media, metadata);
  const [setImageContainer] = useLazyLoadedImages(media.map(m => m.id));

  return (
    <>
      {metadata.makePhotosFullHeight ? (
        <MediaFeed
          {...{
            onMediaClicked,
            className,
            media,
            metadata,
            layout,
            setImageContainer,
            disabledMediaIds
          }}
        />
      ) : (
        <JustifiedMediaGrid
          {...{
            onMediaClicked,
            className,
            media,
            metadata,
            layout,
            setImageContainer,
            disabledMediaIds
          }}
        />
      )}
    </>
  );
};

export default MediaGrid;
