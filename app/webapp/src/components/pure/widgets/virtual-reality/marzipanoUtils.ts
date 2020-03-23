import Marzipano from "marzipano";
import * as Widget from "~/rgb-commons/types/widgets";
import { buildMarzipanoUrls } from "~/util/mediaUrls";

export type SceneMetadata = {
  data: Widget.VirtualReality.Scene;
  scene: Marzipano.Scene;
  view: Marzipano.RectilinearView;
};

const renderInitialScene = (
  scenes: Array<SceneMetadata>,
  setActiveScene: (scene: SceneMetadata) => void,
  initialViewParameters?: Widget.VirtualReality.InitialViewParameters
) => {
  if (!initialViewParameters || !initialViewParameters.target) {
    switchScene(scenes[0], setActiveScene);
  } else {
    const scene = findSceneById(initialViewParameters.target, scenes);
    if (!scene) {
      switchScene(scenes[0], setActiveScene);
    } else {
      switchScene(scene, setActiveScene, initialViewParameters);
    }
  }
};

export const switchScene = (
  config: SceneMetadata,
  setActiveScene: (scene: SceneMetadata) => void,
  initialViewParameters?: Widget.VirtualReality.InitialViewParameters
) => {
  config.view.setParameters(
    initialViewParameters || config.data.initialViewParameters
  );
  config.scene.switchTo();
  setActiveScene(config);
};

export const initializeViewer = (
  root: HTMLDivElement,
  config: Widget.VirtualReality.Metadata,
  setActiveScene: (scene: SceneMetadata) => void,
  initialViewParameters?: Widget.VirtualReality.InitialViewParameters
): { scenes: Array<SceneMetadata>; viewer: Marzipano.Viewer } => {
  const viewer = new Marzipano.Viewer(root, {
    controls: { scrollZoom: false }
  });
  const scenes: Array<SceneMetadata> = config.scenes.map(data => {
    const geometry = new Marzipano.CubeGeometry(data.levels);
    const { tilesUrl, previewUrl } = buildMarzipanoUrls(data.id);
    const source = Marzipano.ImageUrlSource.fromString(tilesUrl, {
      cubeMapPreviewUrl: previewUrl
    });

    const limiter = Marzipano.RectilinearView.limit.traditional(
      data.faceSize,
      (100 * Math.PI) / 180,
      (120 * Math.PI) / 180
    );

    const view = new Marzipano.RectilinearView(
      data.initialViewParameters,
      limiter
    );

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  renderInitialScene(scenes, setActiveScene, initialViewParameters);
  return { scenes, viewer };
};

export const findSceneById = (
  id: string,
  scenes: Array<SceneMetadata>
): SceneMetadata | undefined => {
  for (let i = 0; i < scenes.length; i++) {
    if (scenes[i].data.id === id) {
      return scenes[i];
    }
  }
  return undefined;
};
