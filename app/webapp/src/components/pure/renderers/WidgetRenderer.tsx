import React, { FunctionComponent } from "react";
import TextWidget from "~/components/pure/widgets/text/TextWidget";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import * as Widget from "~/rgb-commons/types/widgets";
import { RequiredMediaConfig } from "~/rgb-commons/types/widgets/media-grid";
import VirtualRealityWidget from "~/components/pure/widgets/virtual-reality/VirtualRealityWidget";

interface Props {
  widget: Widget.WidgetConfig;
  media: Record<string, RequiredMediaConfig>;
}

const WidgetRenderer: FunctionComponent<Props> = ({ widget, media }) => {
  if (widget.type === Widget.WidgetType.Text) {
    return <TextWidget metadata={widget.metadata as Widget.Text.Metadata} />;
  } else if (widget.type === Widget.WidgetType.MediaGrid && widget.media) {
    const metadata = widget.metadata as Widget.MediaGrid.Metadata;
    const mediaList = widget.media.map(
      m => media[m.id] as Widget.MediaGrid.RequiredMediaConfig
    );
    return <MediaGrid metadata={metadata} media={mediaList} />;
  } else if (widget.type === Widget.WidgetType.VirtualReality && widget.media) {
    const metadata = widget.metadata as Widget.VirtualReality.Metadata;
    const mediaList = widget.media.map(
      m => media[m.id] as Widget.VirtualReality.RequiredMediaConfig
    );
    return <VirtualRealityWidget metadata={metadata} media={mediaList} />;
  } else {
    return <span />;
  }
};

export default WidgetRenderer;
