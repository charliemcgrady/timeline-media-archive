import React, { useState, useEffect, FunctionComponent } from "react";
import { SceneMetadata, initializeViewer } from "./marzipanoUtils";
import * as Widget from "~/rgb-commons/types/widgets";
import MarzipanoContainerElement from "./pure/MarzipanoContainerElement";
import { useShowInstructions } from "./useShowInstructions";
import Marzipano from "marzipano";

export interface Props {
  metadata: Widget.VirtualReality.Metadata;
  media: Array<Widget.VirtualReality.RequiredMediaConfig>;
  setViewer?: (viewer: Marzipano.Viewer) => void;
}

const VirtualReality: FunctionComponent<Props> = ({
  metadata,
  media,
  setViewer = () => {}
}) => {
  let panoRef = React.createRef<HTMLDivElement>();

  const [scenes, setScenes] = useState<Array<SceneMetadata>>([]);
  const [activeScene, setActiveScene] = useState<SceneMetadata | undefined>(
    undefined
  );
  const showInstructions = useShowInstructions(activeScene);

  useEffect(() => {
    // Initialize the viewer when the DOM has been set up
    if (!panoRef.current || scenes.length > 0) return;
    const viewConfig = initializeViewer(
      panoRef.current,
      metadata,
      setActiveScene
    );
    setScenes(viewConfig.scenes);
    setViewer(viewConfig.viewer);
  });

  return (
    <MarzipanoContainerElement
      width={metadata.width}
      height={metadata.height}
      panoRef={panoRef}
      showInstructions={showInstructions}
    />
  );
};

export default VirtualReality;
