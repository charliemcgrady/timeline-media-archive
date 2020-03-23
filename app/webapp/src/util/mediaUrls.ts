const cloudfrontKey = "d2pov828hctke7";

export enum Size {
  ExtraSmall = "ExtraSmall",
  Small = "Small",
  Medium = "Medium",
  Large = "Large"
}

export const buildImageUrl = (id: string, size: Size) => {
  const keyPrefix = `rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d/${id}/${id}`;
  let suffix = "_sm.jpg";
  if (size === Size.Medium) {
    suffix = "_md.jpg";
  } else if (size === Size.Large) {
    suffix = "_lg.jpg";
  } else if (size === Size.ExtraSmall) {
    suffix = "_xs.jpg";
  }
  return `https://${cloudfrontKey}.cloudfront.net/${keyPrefix}${suffix}`;
};

export const buildMarzipanoUrls = (id: string) => {
  const keyPrefix = `rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d/${id}/marzipano-assets`;
  return {
    tilesUrl: `https://${cloudfrontKey}.cloudfront.net/${keyPrefix}/{z}/{f}/{y}/{x}.jpg`,
    previewUrl: `https://${cloudfrontKey}.cloudfront.net/${keyPrefix}/preview.jpg`
  };
};
