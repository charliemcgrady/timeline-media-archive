import { useEffect } from "react";
import { Media, MediaLocationMap } from "~/rgb-commons/types/media";
import { History } from "history";
import { useDispatch } from "react-redux";
import { mediaActions } from "~/redux/actions";

export const useMediaNavigation = (
  history: History,
  media: Media,
  draftMediaLocationMap: MediaLocationMap,
  mediaOrder: Array<string>
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // Right key pressed. Go to the next media in the list.
      if (event.keyCode === 39) {
        const currentMediaIndex = mediaOrder.indexOf(media.id);
        if (currentMediaIndex > -1) {
          const nextIndex =
            currentMediaIndex === mediaOrder.length - 1
              ? 0
              : currentMediaIndex + 1;
          history.push(`/profile/media/${mediaOrder[nextIndex]}`);
        }
      }
      // Left key pressed. Go to the previous media in the list.
      if (event.keyCode === 37) {
        const currentMediaIndex = mediaOrder.indexOf(media.id);
        if (currentMediaIndex > -1) {
          const nextIndex =
            currentMediaIndex === 0
              ? mediaOrder.length - 1
              : currentMediaIndex - 1;
          history.push(`/profile/media/${mediaOrder[nextIndex]}`);
        }
      }
      if (event.keyCode === 13) {
        dispatch(mediaActions.saveMedia(media, draftMediaLocationMap));
      }
      if (event.keyCode === 27) {
        history.push(`/profile/media/`);
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  });
};
