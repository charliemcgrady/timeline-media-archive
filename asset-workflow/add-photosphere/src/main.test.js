const main = require("../dist/main.js");
main
  .handler({
    photosphereId: "rgb.photosphere.v1.05307325-d4e0-4d9e-be9e-5574a4199998",
    zipUrl: {
      key: "0-pano_20200122_141530.zip",
      bucket: "charliemcgrady-temp-media-prod"
    },
    marzipanoKey: "0-pano_20200122_141530",
    ownerId: "rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d"
  })
  .then(() => {
    console.log("Successfully ran");
  });
