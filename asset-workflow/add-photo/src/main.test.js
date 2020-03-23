const main = require("../dist/main.js");
main
  .handler({
    photoId: "rgb.photo.v1.6f5b6b6a-f9ce-4b57-a6e0-46d752253334",
    primaryJpegUrl: {
      key: "DSC01571.jpg",
      bucket: "charliemcgrady-temp-media-prod"
    },
    originalFiles: [
      {
        bucket: "charliemcgrady-temp-media-prod",
        key: "DSC01571.arw",
        filename: "DSC01571.arw"
      },
      {
        bucket: "charliemcgrady-temp-media-prod",
        key: "DSC01571.jpg",
        filename: "DSC01571.jpg"
      },
      {
        bucket: "charliemcgrady-temp-media-prod",
        key: "DSC01571.xmp",
        filename: "DSC01571.xmp"
      }
    ],
    ownerId: "rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d"
  })
  .then(() => {
    console.log("Successfully ran");
  });
