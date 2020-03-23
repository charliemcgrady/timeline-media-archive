declare module "marzipano" {
  // https://www.marzipano.net/reference/Source.html
  interface Source {}

  // https://www.marzipano.net/reference/Geometry.html
  interface Geometry {}

  // https://www.marzipano.net/reference/View.html
  interface View {}

  // https://www.marzipano.net/reference/Viewer.html
  class Viewer {
    constructor(
      elem: HTMLDivElement,
      config?: {
        controls: {
          scrollZoom: boolean;
        };
      }
    );

    // https://www.marzipano.net/reference/Viewer.html#createScene
    createScene(config: {
      source: Source;
      geometry: Geometry;
      view: View;
      pinFirstLevel: boolean;
    }): Scene;

    scene(): Scene;

    view(): RectilinearView;

    getImageID(): string;
  }

  // https://www.marzipano.net/reference/Scene.html
  class Scene {
    constructor(viewer: Viewer, view: View);
    switchTo();
    hotspotContainer(): HotspotContainer;
  }

  // https://www.marzipano.net/reference/HotspotContainer.html
  class HotspotContainer {
    createHotspot(elem: HTMLDivElement, { yaw: number, pitch: number });
  }

  // https://www.marzipano.net/reference/CubeGeometry.html
  class CubeGeometry implements Geometry {
    constructor(levelPropertiesList: Array<Level>);
  }

  type Level = {
    tileSize: number;
    size: number;
    fallbackOnly?: boolean;
  };

  // https://www.marzipano.net/reference/ImageUrlSource.html
  class ImageUrlSource implements Source {
    static fromString(
      url: string,
      opts: ImageUrlSourceFromStringOptions
    ): Source;
  }

  type ImageUrlSourceFromStringOptions = {
    cubeMapPreviewUrl: string;
    cubeMapPreviewFaceOrder?: string;
  };

  // https://www.marzipano.net/reference/RectilinearView.html
  class RectilinearView implements View {
    constructor(params: RectilinearViewParams, limiter: RectilinearViewLimiter);

    setParameters(params: RectilinearViewParams);

    addEventListener(name: string, cb: (param: any) => void);

    removeEventListener(name: string, cb: (param: any) => void);

    yaw(): number;

    pitch(): number;

    fov(): number;

    // https://www.marzipano.net/reference/RectilinearView.limit.html
    static limit: RectilinearViewLimiter;
  }

  // https://www.marzipano.net/reference/RectilinearViewParams.html
  type RectilinearViewParams = {
    yaw?: number;
    pitch?: number;
    roll?: number;
    fov?: number;
  };

  // https://www.marzipano.net/reference/global.html#RectilinearViewLimiter
  type RectilinearViewLimiter = {
    traditional(maxResolution: number, maxVFov: number, maxHFox?: number);
  };
}
