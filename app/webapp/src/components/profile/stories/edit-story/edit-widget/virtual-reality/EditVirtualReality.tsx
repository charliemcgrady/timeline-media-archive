import React, { FunctionComponent, useState } from "react";
import { WidgetConfig, VirtualReality } from "~/rgb-commons/types/widgets";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import SelectScene from "./SelectScene";
import VirtualRealityWidget from "~/components/pure/widgets/virtual-reality/VirtualRealityWidget";
import EditInitialView from "./EditInitialView";
import Marzipano from "marzipano";

interface Props {
  story: StoryConfig;
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
  setStory: (story: StoryConfig) => void;
}

const EditVirtualReality: FunctionComponent<Props> = ({
  story,
  widget,
  setWidget,
  setStory
}) => {
  const metadata = widget.metadata as VirtualReality.Metadata;

  const [viewer, setViewer] = useState<Marzipano.Viewer | undefined>(undefined);

  return (
    <div>
      {metadata.scenes.length === 0 ? (
        <SelectScene {...{ story, widget, setWidget, setStory }} />
      ) : (
        <>
          <EditInitialView
            {...{
              story,
              widget,
              setWidget,
              setStory,
              sceneId: metadata.scenes[0].id,
              view: viewer && viewer.view() ? viewer.view() : undefined
            }}
          />
          <VirtualRealityWidget
            {...{ metadata: metadata, media: widget.media!, setViewer }}
          />
        </>
      )}
    </div>
  );
};

export default EditVirtualReality;
