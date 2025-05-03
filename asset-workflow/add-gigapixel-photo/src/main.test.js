const main = require("../dist/main.js");
main
  .handler({
    gigapixelId: "rgb.gigapixelphoto.v1.05307325-d4e0-4d9e-be9e-5574a4199990",
    zipUrl: {
      key: "nile-mosaic-1551982431171-5.zip",
      bucket: "charliemcgrady-temp-media-prod"
    },
    gigapixelKey: "nile-mosaic-1551982431171-5",
    ownerId: "rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d"
  })
  .then(() => {
    console.log("Successfully ran");
  });
