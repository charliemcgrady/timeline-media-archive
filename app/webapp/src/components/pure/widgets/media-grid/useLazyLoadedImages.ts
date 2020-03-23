import { useEffect, useState } from "react";

export default (mediaIds: Array<string>) => {
  const [imageContainer, setImageContainer] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    if (imageContainer) {
      var lazyImages = [].slice.call(imageContainer.querySelectorAll("img"));

      if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target as HTMLImageElement;
              lazyImage.src = lazyImage.dataset.src as string;
              lazyImage.classList.remove("lazy");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });

        lazyImages.forEach(function(lazyImage: HTMLImageElement) {
          lazyImageObserver.observe(lazyImage);
        });
      } else {
        // Possibly fall back to a more compatible method here
      }
    }
  }, [imageContainer, mediaIds]);

  return [setImageContainer];
};
