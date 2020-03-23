import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import { Size, buildImageUrl } from "~/util/mediaUrls";

interface PhotoswipeItem {
  src: string;
  w: number;
  h: number;
}

const openPhotoswipe = (
  items: Array<PhotoswipeItem>,
  startingIndex?: number
) => {
  const photoswipeElement = document.querySelectorAll(".pswp")[0];
  const options = {
    index: startingIndex || 0
  };

  const photoswipe = new PhotoSwipe(
    photoswipeElement as HTMLElement,
    PhotoSwipeUI_Default,
    items,
    options
  );

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
        h: photo.height
      };
    }
  );

  return {
    items,
    startingIndex
  };
};

export { openPhotoswipe, photosToPhotoswipeItems };
