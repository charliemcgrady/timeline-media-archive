import { useState, useEffect } from "react";
import { SceneMetadata } from "./marzipanoUtils";

// HACK: The change event fires when the panorama is loaded initially.
//       Therefore, 2 change events equates to the user actually interacting
//       with the scene.
export const useShowInstructions = (
  activeScene: SceneMetadata | undefined
): boolean => {
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    if (activeScene) {
      activeScene.view.addEventListener("change", () => {
        if (interactionCount < 2) {
          setInteractionCount(interactionCount + 1);
        }
      });
    }
  });

  return interactionCount < 2;
};
