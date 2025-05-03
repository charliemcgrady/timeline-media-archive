import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import { Size, buildImageUrl } from "~/rgb-commons/util/mediaUrls";
import { parse, stringify } from "query-string";

interface PhotoswipeItem {
  src: string;
  w: number;
  h: number;
  pid: string;
}

const openPhotoswipe = (
  items: Array<PhotoswipeItem>,
  startingIndex?: number,
  beforeChange?: (id: string) => void
) => {
  const photoswipeElement = document.querySelectorAll(".pswp")[0];
  const options = {
    index: startingIndex || 0,
    history: false
  };

  const photoswipe = new PhotoSwipe(
    photoswipeElement as HTMLElement,
    PhotoSwipeUI_Default,
    items,
    options
  );

  photoswipe.listen("beforeChange", () => {
    const qs = parse(location.search);
    qs.activeMediaId = photoswipe.currItem.pid;
    history.pushState({}, "", `${location.pathname}?${stringify(qs)}`);
    if (beforeChange) {
      beforeChange(photoswipe.currItem.pid);
    }
  });

  photoswipe.init();
};

const photosToPhotoswipeItems = (
  photos: Array<{ id: string; width: number; height: number }>,
  indexPhotoId?: string
) => {
  let startingIndex;
  const items: Array<PhotoswipeItem> = photos.map(
    (photo, i: number): PhotoswipeItem => {
      if (indexPhotoId && photo.id === indexPhotoId) {
        startingIndex = i;
      }
      return {
        src: buildImageUrl(photo.id, Size.Large),
        w: photo.width,
        h: photo.height,
        pid: photo.id
      };
    }
  );

  return {
    items,
    startingIndex
  };
};

export { openPhotoswipe, photosToPhotoswipeItems };
