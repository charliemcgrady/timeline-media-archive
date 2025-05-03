const main = require("../dist/main.js");
main
  .handler({
    photoId: "rgb.photo.v1.5d9603b8-65e5-4557-aa47-126eb1b1a781",
    primaryJpegUrl: {
      key: "DSCF0059.jpg",
      bucket: "charliemcgrady-temp-media-prod"
    },
    originalFiles: [
      {
        bucket: "charliemcgrady-temp-media-prod",
        key: "DSCF0059.jpg",
        filename: "DSCF0059.jpg"
      }
    ],
    ownerId: "rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d"
  })
  .then(() => {
    console.log("Successfully ran");
  });
